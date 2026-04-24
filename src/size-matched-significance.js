import { runCrossDatasetComparison } from './cross-dataset-comparison.js';
import { runPrefixPredictabilityExperiment, buildMarkdownTable } from './predictability-experiment.js';
import { runAmbiguityPersistence } from './advanced-research.js';

function mulberry32(seed) {
  let t = seed >>> 0;
  return function random() {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleArray(arr, random) {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function mean(values) {
  if (values.length === 0) return 0;
  return values.reduce((s, x) => s + x, 0) / values.length;
}

function std(values) {
  if (values.length <= 1) return 0;
  const m = mean(values);
  const v = values.reduce((s, x) => s + (x - m) ** 2, 0) / (values.length - 1);
  return Math.sqrt(v);
}

function num(v) {
  return Number.isFinite(v) ? v.toFixed(4) : '0.0000';
}

function pct(v) {
  return `${(v * 100).toFixed(2)}%`;
}

function correlation(a, b) {
  const n = Math.min(a.length, b.length);
  if (n === 0) return 0;
  const xa = a.slice(0, n);
  const xb = b.slice(0, n);
  const ma = mean(xa);
  const mb = mean(xb);

  let nume = 0;
  let da = 0;
  let db = 0;
  for (let i = 0; i < n; i += 1) {
    const va = xa[i] - ma;
    const vb = xb[i] - mb;
    nume += va * vb;
    da += va * va;
    db += vb * vb;
  }
  if (da <= 0 || db <= 0) return 0;
  return nume / Math.sqrt(da * db);
}

function toSeries(rows, selector) {
  return rows.map((r) => selector(r));
}

function weightedSample(rows, random) {
  const total = rows.reduce((s, row) => s + row.weight, 0);
  if (total <= 0) return rows[0]?.value ?? '';
  let r = random() * total;
  for (const row of rows) {
    r -= row.weight;
    if (r <= 0) return row.value;
  }
  return rows[rows.length - 1]?.value ?? '';
}

function buildLengthPreservingNullDataset(referenceEntries, count, random) {
  const size = Math.min(count, referenceEntries.length);
  const lengths = referenceEntries.map((e) => e.token.length).filter((len) => len > 0);
  const lengthCounts = new Map();
  for (const len of lengths) lengthCounts.set(len, (lengthCounts.get(len) ?? 0) + 1);
  const lengthRows = [...lengthCounts.entries()].map(([value, weight]) => ({ value, weight }));

  const charCounts = new Map();
  for (const e of referenceEntries) {
    for (const ch of e.token) charCounts.set(ch, (charCounts.get(ch) ?? 0) + 1);
  }
  if (charCounts.size === 0) charCounts.set('a', 1);
  const charRows = [...charCounts.entries()].map(([value, weight]) => ({ value, weight }));

  const n = referenceEntries.length || 1;
  const positionRates = {
    lineInitial: referenceEntries.filter((e) => e.lineInitial).length / n,
    lineFinal: referenceEntries.filter((e) => e.lineFinal).length / n,
    paragraphInitial: referenceEntries.filter((e) => e.paragraphInitial).length / n,
  };

  const out = [];
  for (let i = 0; i < size; i += 1) {
    const len = Number(weightedSample(lengthRows, random)) || 1;
    let token = '';
    for (let j = 0; j < len; j += 1) token += String(weightedSample(charRows, random) ?? 'a');

    out.push({
      token,
      lineInitial: random() < positionRates.lineInitial,
      lineFinal: random() < positionRates.lineFinal,
      paragraphInitial: random() < positionRates.paragraphInitial,
    });
  }
  return out;
}

export function sampleWithoutReplacement(entries, count, random) {
  const n = Math.min(count, entries.length);
  if (n >= entries.length) return [...entries];
  const shuffled = shuffleArray(entries, random);
  return shuffled.slice(0, n);
}

function computeCoreMetrics(voynichEntries, datasetEntries, cached = null) {
  const vp = cached?.vp ?? runPrefixPredictabilityExperiment(voynichEntries, { filterKey: 'ALL' });
  const va = cached?.va ?? runAmbiguityPersistence(voynichEntries, { filterKey: 'ALL' });
  const dp = runPrefixPredictabilityExperiment(datasetEntries, { filterKey: 'ALL' });
  const da = runAmbiguityPersistence(datasetEntries, { filterKey: 'ALL' });

  const entropyCorr = correlation(
    toSeries(vp.byPrefixLength, (r) => r.avgEntropy),
    toSeries(dp.byPrefixLength, (r) => r.avgEntropy),
  );

  const ambiguityCorr = correlation(
    toSeries(va, (r) => r.ambiguityRate),
    toSeries(da, (r) => r.ambiguityRate),
  );

  // Compact similarity for significance testing over key metrics.
  const similarityScore = ((entropyCorr + 1) / 2) * 0.55 + ((ambiguityCorr + 1) / 2) * 0.45;

  return {
    entropyCorr,
    ambiguityCorr,
    similarityScore,
  };
}

export function runSizeMatchedBootstrap(voynichEntries, datasets, options = {}) {
  const random = mulberry32(options.seed ?? 42);
  const nBoot = options.bootstrapSamples ?? 3;

  const rows = [];
  for (const ds of datasets) {
    const sims = [];
    const ent = [];
    const amb = [];

    for (let i = 0; i < nBoot; i += 1) {
      const sampled = sampleWithoutReplacement(ds.entries, voynichEntries.length, random);
      const cmp = runCrossDatasetComparison(voynichEntries, [{ ...ds, entries: sampled }]);
      const r = cmp.rows[0];
      sims.push(r.similarityScore);
      ent.push(r.entropyCorr);
      amb.push(r.ambiguityCorr);
    }

    rows.push({
      dataset: ds.name,
      kind: ds.kind,
      sampleCount: Math.min(voynichEntries.length, ds.entries.length),
      similarityMean: mean(sims),
      similarityStd: std(sims),
      entropyCorrMean: mean(ent),
      entropyCorrStd: std(ent),
      ambiguityCorrMean: mean(amb),
      ambiguityCorrStd: std(amb),
    });
  }

  rows.sort((a, b) => b.similarityMean - a.similarityMean);
  return rows;
}

export function runPermutationSignificance(voynichEntries, datasets, options = {}) {
  const iterations = options.iterations ?? 1000;
  const random = mulberry32(options.seed ?? 4242);
  const cachedVoynich = {
    vp: runPrefixPredictabilityExperiment(voynichEntries, { filterKey: 'ALL' }),
    va: runAmbiguityPersistence(voynichEntries, { filterKey: 'ALL' }),
  };

  const rows = [];

  for (const ds of datasets) {
    const sampled = sampleWithoutReplacement(ds.entries, voynichEntries.length, random);
    const observed = computeCoreMetrics(voynichEntries, sampled, cachedVoynich);

    const nullEntropy = [];
    const nullAmbiguity = [];
    const nullSimilarity = [];

    for (let i = 0; i < iterations; i += 1) {
      // Use genuinely randomized null corpora (length/char-position preserving),
      // not order permutations of the same token multiset.
      const nullDataset = buildLengthPreservingNullDataset(sampled, sampled.length, random);
      const m = computeCoreMetrics(voynichEntries, nullDataset, cachedVoynich);
      nullEntropy.push(m.entropyCorr);
      nullAmbiguity.push(m.ambiguityCorr);
      nullSimilarity.push(m.similarityScore);
    }

    function stat(observedValue, nullValues) {
      const mu = mean(nullValues);
      const sd = std(nullValues);
      const epsilon = 1e-12;
      const invariant = sd < epsilon || nullValues.every((x) => Math.abs(x - nullValues[0]) < epsilon);
      const z = invariant ? null : (observedValue - mu) / sd;
      const extreme = invariant
        ? null
        : nullValues.filter((x) => Math.abs(x - mu) >= Math.abs(observedValue - mu)).length;
      const p = invariant ? null : (extreme + 1) / (nullValues.length + 1);
      return {
        observed: observedValue,
        nullMean: mu,
        nullStd: sd,
        zScore: z,
        pValue: p,
        invalid: invariant,
        nullHead: nullValues.slice(0, 10),
      };
    }

    rows.push({
      dataset: ds.name,
      entropyCorr: stat(observed.entropyCorr, nullEntropy),
      ambiguityCorr: stat(observed.ambiguityCorr, nullAmbiguity),
      similarityScore: stat(observed.similarityScore, nullSimilarity),
    });
  }

  return rows;
}

export function renderSizeMatchedSection(rows) {
  return [
    '## Size-Matched Comparison',
    '',
    buildMarkdownTable(
      [
        'Dataset',
        'Type',
        'Matched N',
        'Similarity (mean±std)',
        'Entropy Corr (mean±std)',
        'Ambiguity Corr (mean±std)',
      ],
      rows.map((r) => [
        r.dataset,
        r.kind,
        String(r.sampleCount),
        `${num(r.similarityMean)} ± ${num(r.similarityStd)}`,
        `${num(r.entropyCorrMean)} ± ${num(r.entropyCorrStd)}`,
        `${num(r.ambiguityCorrMean)} ± ${num(r.ambiguityCorrStd)}`,
      ]),
    ),
    '',
    'Stability interpretation: lower std indicates stronger robustness across size-matched bootstrap samples.',
  ].join('\n');
}

export function renderSignificanceSection(rows) {
  const metricRows = [];
  for (const row of rows) {
    for (const metric of ['entropyCorr', 'ambiguityCorr', 'similarityScore']) {
      const m = row[metric];
      metricRows.push([
        row.dataset,
        metric,
        num(m.observed),
        num(m.nullMean),
        num(m.nullStd),
        m.invalid ? 'invalid' : num(m.zScore),
        m.invalid ? '-' : num(m.pValue),
        m.invalid ? 'invalid (metric invariant under chosen null)' : m.pValue < 0.05 ? 'significant' : 'not-significant',
        m.nullHead.map((x) => num(x)).join(', '),
      ]);
    }
  }

  const allValid = rows.every((r) => !r.similarityScore.invalid && !r.entropyCorr.invalid && !r.ambiguityCorr.invalid);
  const allSignificant = allValid && rows.every(
    (r) => r.similarityScore.pValue < 0.05 && r.entropyCorr.pValue < 0.05 && r.ambiguityCorr.pValue < 0.05,
  );

  return [
    '## Statistical Significance',
    '',
    buildMarkdownTable(
      ['Dataset', 'Metric', 'Observed', 'Null Mean', 'Null Std', 'z-score', 'p-value', 'Interpretation', 'Null debug (first 10)'],
      metricRows,
    ),
    '',
    `Significance summary: ${
      allValid
        ? allSignificant
          ? 'all key comparisons are statistically significant'
          : 'some comparisons are not statistically significant'
        : 'some metrics are invalid under the chosen null and were not assigned p-values'
    }.`,
  ].join('\n');
}

export function renderFinalRobustnessSummary(sizeRows, sigRows) {
  const stable = sizeRows.every((r) => r.similarityStd <= 0.05);
  const significant = sigRows.every((r) => r.similarityScore.pValue < 0.05);

  return [
    '### Robustness Summary',
    `- Size control stability: ${stable ? 'stable after size matching' : 'some instability after size matching'}`,
    `- Statistical significance: ${significant ? 'differences remain significant' : 'some differences are not significant'}`,
  ].join('\n');
}
