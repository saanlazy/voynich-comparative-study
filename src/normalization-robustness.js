import { parseTranscriptionWithMode, NORMALIZATION_MODES } from './transcription-normalization.js';
import { runPrefixPredictabilityExperiment, buildMarkdownTable } from './predictability-experiment.js';
import { runAmbiguityPersistence } from './advanced-research.js';
import { buildPrefixFamilies } from './prefix-family-analysis.js';

function num(v) {
  return Number.isFinite(v) ? v.toFixed(4) : '0.0000';
}

function pct(v) {
  return `${(v * 100).toFixed(2)}%`;
}

function rowByLength(rows, length) {
  return rows.find((row) => row.prefixLength === length) ?? null;
}

function mean(values) {
  if (values.length === 0) return 0;
  return values.reduce((s, x) => s + x, 0) / values.length;
}

function variance(values) {
  if (values.length === 0) return 0;
  const m = mean(values);
  return mean(values.map((x) => (x - m) ** 2));
}

function jaccard(setA, setB) {
  const a = new Set(setA);
  const b = new Set(setB);
  const inter = [...a].filter((x) => b.has(x)).length;
  const union = new Set([...a, ...b]).size;
  return union > 0 ? inter / union : 0;
}

function topPrefixes(familyAnalysis, prefixLength = 2, topN = 10) {
  const section = familyAnalysis.byPrefixLength.find((row) => row.prefixLength === prefixLength);
  if (!section) return [];
  return section.topFamilies.slice(0, topN).map((row) => row.prefix);
}

function suffixProfile(entries, topPrefixN = 10, topSuffixN = 5) {
  const prefixCounts = new Map();
  const suffixByPrefix = new Map();

  for (const entry of entries) {
    if (entry.token.length < 2) continue;
    const prefix = entry.token.slice(0, 2);
    const suffix = entry.suffix || entry.token.slice(-Math.min(2, entry.token.length));
    prefixCounts.set(prefix, (prefixCounts.get(prefix) ?? 0) + 1);
    if (!suffixByPrefix.has(prefix)) suffixByPrefix.set(prefix, new Map());
    const m = suffixByPrefix.get(prefix);
    m.set(suffix, (m.get(suffix) ?? 0) + 1);
  }

  const prefixes = [...prefixCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, topPrefixN)
    .map(([prefix]) => prefix);

  const out = new Map();
  for (const prefix of prefixes) {
    const suffixes = [...(suffixByPrefix.get(prefix)?.entries() ?? [])]
      .sort((a, b) => b[1] - a[1])
      .slice(0, topSuffixN)
      .map(([suffix]) => suffix);
    out.set(prefix, suffixes);
  }
  return out;
}

export function runNormalizationRobustness(rawText, options = {}) {
  const modes = options.modes ?? ['A', 'B', 'C', 'D'];
  const modeResults = {};

  for (const mode of modes) {
    const parsed = parseTranscriptionWithMode(rawText, mode);
    modeResults[mode] = {
      modeName: NORMALIZATION_MODES[mode] ?? mode,
      entries: parsed.entries,
      predictability: runPrefixPredictabilityExperiment(parsed.entries, { filterKey: 'ALL' }),
      ambiguity: runAmbiguityPersistence(parsed.entries, { filterKey: 'ALL' }),
      families: buildPrefixFamilies(parsed.entries, { minPrefixLength: 1, maxPrefixLength: 6, topFamilyCount: 20, topTokensPerFamily: 10 }),
    };
  }

  const maxLen = Math.max(
    ...Object.values(modeResults).map((result) =>
      Math.max(0, ...result.predictability.byPrefixLength.map((row) => row.prefixLength)),
    ),
  );

  const entropyVarianceRows = [];
  for (let length = 1; length <= maxLen; length += 1) {
    const vals = modes.map((mode) => rowByLength(modeResults[mode].predictability.byPrefixLength, length)?.avgEntropy ?? 0);
    entropyVarianceRows.push({ prefixLength: length, entropyVariance: variance(vals) });
  }

  const modePairs = [];
  for (let i = 0; i < modes.length; i += 1) {
    for (let j = i + 1; j < modes.length; j += 1) {
      modePairs.push([modes[i], modes[j]]);
    }
  }

  const familyStabilityRows = [];
  for (const [m1, m2] of modePairs) {
    const j2 = jaccard(topPrefixes(modeResults[m1].families, 2, 10), topPrefixes(modeResults[m2].families, 2, 10));
    const j3 = jaccard(topPrefixes(modeResults[m1].families, 3, 10), topPrefixes(modeResults[m2].families, 3, 10));
    familyStabilityRows.push({ pair: `${m1}-${m2}`, jaccardL2: j2, jaccardL3: j3, meanJaccard: (j2 + j3) / 2 });
  }

  const suffixStabilityRows = [];
  for (const [m1, m2] of modePairs) {
    const p1 = suffixProfile(modeResults[m1].entries, 10, 5);
    const p2 = suffixProfile(modeResults[m2].entries, 10, 5);
    const shared = [...p1.keys()].filter((prefix) => p2.has(prefix));
    const sims = shared.map((prefix) => jaccard(p1.get(prefix), p2.get(prefix)));
    suffixStabilityRows.push({ pair: `${m1}-${m2}`, suffixStability: mean(sims) });
  }

  return {
    modes,
    modeResults,
    entropyVarianceRows,
    familyStabilityRows,
    suffixStabilityRows,
    stabilityScores: {
      entropy: 1 / (1 + mean(entropyVarianceRows.map((row) => row.entropyVariance))),
      family: mean(familyStabilityRows.map((row) => row.meanJaccard)),
      suffix: mean(suffixStabilityRows.map((row) => row.suffixStability)),
    },
  };
}

export function renderNormalizationRobustness(result) {
  const entropyTable = buildMarkdownTable(
    ['Prefix Length', 'Entropy Variance'],
    result.entropyVarianceRows.map((row) => [String(row.prefixLength), num(row.entropyVariance)]),
  );

  const familyTable = buildMarkdownTable(
    ['Mode Pair', 'Top-10 overlap L2', 'Top-10 overlap L3', 'Mean overlap'],
    result.familyStabilityRows.map((row) => [row.pair, pct(row.jaccardL2), pct(row.jaccardL3), pct(row.meanJaccard)]),
  );

  const suffixTable = buildMarkdownTable(
    ['Mode Pair', 'Suffix distribution stability'],
    result.suffixStabilityRows.map((row) => [row.pair, pct(row.suffixStability)]),
  );

  const summary = buildMarkdownTable(
    ['Metric', 'Stability Score'],
    [
      ['Entropy curve stability', num(result.stabilityScores.entropy)],
      ['Prefix family stability', pct(result.stabilityScores.family)],
      ['Suffix distribution stability', pct(result.stabilityScores.suffix)],
    ],
  );

  return [
    '## Normalization Robustness',
    '',
    '### Entropy Curve Variance Across Modes',
    entropyTable,
    '',
    '### Prefix Family Stability (Top-10 Overlap)',
    familyTable,
    '',
    '### Suffix Distribution Stability',
    suffixTable,
    '',
    '### Stability Summary',
    summary,
  ].join('\n');
}
