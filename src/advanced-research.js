import { preprocessTokens, runSearch } from './core.js';
import { buildBaselineDatasets, runPrefixPredictabilityExperiment } from './predictability-experiment.js';

const POSITION_SPECS = {
  all: { filterKey: 'ALL', predicate: () => true },
  lineInitial: { filterKey: 'LINE_INITIAL', predicate: (entry) => Boolean(entry.lineInitial) },
  paragraphInitial: { filterKey: 'PARAGRAPH_INITIAL', predicate: (entry) => Boolean(entry.paragraphInitial) },
  lineFinal: { filterKey: 'LINE_FINAL', predicate: (entry) => Boolean(entry.lineFinal) },
};

function normalizeEntries(rawEntries) {
  return rawEntries
    .map((entry) => (typeof entry === 'string' ? { token: entry } : entry))
    .filter((entry) => typeof entry?.token === 'string' && entry.token.trim().length > 0)
    .map((entry) => ({ ...entry, token: entry.token.trim() }));
}

function safeRatio(a, b) {
  if (!b) return 0;
  return a / b;
}

function median(values) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 1) return sorted[mid];
  return (sorted[mid - 1] + sorted[mid]) / 2;
}

export function buildNamedPredictabilityExperiments(rawEntries, options = {}) {
  const entries = normalizeEntries(rawEntries);
  const includeReversed = options.includeReversed ?? true;

  const named = {};

  for (const [subsetName, spec] of Object.entries(POSITION_SPECS)) {
    const evaluationEntries = entries.filter(spec.predicate);
    named[`voynich_${subsetName}`] = runPrefixPredictabilityExperiment(entries, {
      candidateEntries: entries,
      evaluationEntries,
      filterKey: spec.filterKey,
      topK: options.topK,
    });
  }

  const baselines = buildBaselineDatasets(entries, { includeReversed });
  named.shuffled_all = runPrefixPredictabilityExperiment(baselines.shuffled, { filterKey: 'ALL', topK: options.topK });
  if (baselines.reversed) {
    named.reversed_all = runPrefixPredictabilityExperiment(baselines.reversed, { filterKey: 'ALL', topK: options.topK });
  }

  return named;
}

export function computeReductionSlope(rows) {
  const transitions = [];

  for (let i = 0; i < rows.length - 1; i += 1) {
    const current = rows[i];
    const next = rows[i + 1];

    const deltaEntropy = current.avgEntropy - next.avgEntropy;
    const deltaCandidates = current.avgCandidateCount - next.avgCandidateCount;

    transitions.push({
      transition: `${current.prefixLength}->${next.prefixLength}`,
      fromPrefixLength: current.prefixLength,
      toPrefixLength: next.prefixLength,
      deltaEntropy,
      relativeEntropyReduction: current.avgEntropy > 0 ? deltaEntropy / current.avgEntropy : 0,
      deltaCandidateCount: deltaCandidates,
      relativeCandidateReduction: current.avgCandidateCount > 0 ? deltaCandidates / current.avgCandidateCount : 0,
    });
  }

  return transitions;
}

export function computeReductionSlopeBySeries(namedExperiments) {
  const result = {};
  for (const [seriesName, experiment] of Object.entries(namedExperiments)) {
    result[seriesName] = computeReductionSlope(experiment.byPrefixLength);
  }
  return result;
}

export function runAmbiguityPersistence(rawEntries, options = {}) {
  const candidateEntries = normalizeEntries(options.candidateEntries ?? rawEntries);
  const evaluationEntries = normalizeEntries(options.evaluationEntries ?? rawEntries);
  const filterKey = options.filterKey ?? 'ALL';

  const model = preprocessTokens(candidateEntries);
  const prefixCache = new Map();

  function searchPrefixCached(prefix) {
    if (!prefixCache.has(prefix)) {
      prefixCache.set(prefix, runSearch({ model, mode: 'PREFIX', query: prefix, filterKey }));
    }
    return prefixCache.get(prefix);
  }

  const byLength = new Map();

  for (const entry of evaluationEntries) {
    const token = entry.token;
    for (let length = 1; length <= token.length; length += 1) {
      const prefix = token.slice(0, length);
      const candidateCount = searchPrefixCached(prefix).metrics.candidateCount;

      const bucket = byLength.get(length) ?? {
        prefixLength: length,
        totalEvaluated: 0,
        uniqueResolved: 0,
        ambiguous: 0,
        ambiguousCounts: [],
      };

      bucket.totalEvaluated += 1;
      if (candidateCount === 1) bucket.uniqueResolved += 1;
      if (candidateCount > 1) {
        bucket.ambiguous += 1;
        bucket.ambiguousCounts.push(candidateCount);
      }

      byLength.set(length, bucket);
    }
  }

  return [...byLength.values()]
    .sort((a, b) => a.prefixLength - b.prefixLength)
    .map((row) => ({
      prefixLength: row.prefixLength,
      totalEvaluated: row.totalEvaluated,
      uniqueResolutionRate: safeRatio(row.uniqueResolved, row.totalEvaluated),
      ambiguityRate: safeRatio(row.ambiguous, row.totalEvaluated),
      avgAmbiguousCandidateCount: safeRatio(
        row.ambiguousCounts.reduce((sum, value) => sum + value, 0),
        row.ambiguousCounts.length,
      ),
      medianAmbiguousCandidateCount: median(row.ambiguousCounts),
    }));
}

export function runAmbiguityPersistenceBySeries(rawEntries, options = {}) {
  const entries = normalizeEntries(rawEntries);
  const includeReversed = options.includeReversed ?? true;

  const output = {};

  for (const [subsetName, spec] of Object.entries(POSITION_SPECS)) {
    const evalEntries = entries.filter(spec.predicate);
    output[`voynich_${subsetName}`] = runAmbiguityPersistence(entries, {
      candidateEntries: entries,
      evaluationEntries: evalEntries,
      filterKey: spec.filterKey,
    });
  }

  const baselines = buildBaselineDatasets(entries, { includeReversed });
  output.shuffled_all = runAmbiguityPersistence(baselines.shuffled, { filterKey: 'ALL' });
  if (baselines.reversed) {
    output.reversed_all = runAmbiguityPersistence(baselines.reversed, { filterKey: 'ALL' });
  }

  return output;
}

export function assignLengthBucket(tokenLength) {
  if (tokenLength <= 4) return 'short';
  if (tokenLength <= 7) return 'medium';
  return 'long';
}

export function runLengthControlledPredictability(rawEntries, options = {}) {
  const entries = normalizeEntries(rawEntries);
  const baselines = buildBaselineDatasets(entries, { includeReversed: options.includeReversed ?? true });

  const datasetMap = {
    voynich: baselines.voynich,
    shuffled: baselines.shuffled,
  };
  if (baselines.reversed) datasetMap.reversed = baselines.reversed;

  const output = {};
  for (const [datasetName, datasetEntries] of Object.entries(datasetMap)) {
    output[datasetName] = {};

    for (const bucket of ['short', 'medium', 'long']) {
      const bucketEntries = datasetEntries.filter((entry) => assignLengthBucket(entry.token.length) === bucket);

      output[datasetName][bucket] = {
        predictability: runPrefixPredictabilityExperiment(bucketEntries, { filterKey: 'ALL' }),
        ambiguity: runAmbiguityPersistence(bucketEntries, { filterKey: 'ALL' }),
        tokenCount: bucketEntries.length,
      };
    }
  }

  return output;
}
