import { runPrefixPredictabilityExperiment, buildMarkdownTable } from './predictability-experiment.js';
import { runAmbiguityPersistence } from './advanced-research.js';
import { buildPrefixFamilies } from './prefix-family-analysis.js';

function normalizeEntries(rawEntries) {
  return rawEntries
    .map((entry) => (typeof entry === 'string' ? { token: entry } : entry))
    .filter((entry) => typeof entry?.token === 'string' && entry.token.trim().length > 0)
    .map((entry) => ({ ...entry, token: entry.token.trim() }));
}

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

function weightedSample(rows, random) {
  const total = rows.reduce((sum, row) => sum + row.weight, 0);
  if (total <= 0) return rows[0]?.value ?? '';
  let r = random() * total;
  for (const row of rows) {
    r -= row.weight;
    if (r <= 0) return row.value;
  }
  return rows[rows.length - 1]?.value ?? '';
}

export function buildFrequencyPreservingShuffle(entries, seed = 42) {
  const random = mulberry32(seed);
  const normalized = normalizeEntries(entries);

  // Preserve per-type frequency but randomize each type's surface form by
  // shuffling characters within that type.
  const typeCounts = new Map();
  for (const entry of normalized) {
    typeCounts.set(entry.token, (typeCounts.get(entry.token) ?? 0) + 1);
  }

  const typeMap = new Map();
  for (const token of typeCounts.keys()) {
    const chars = shuffleArray(token.split(''), random);
    typeMap.set(token, chars.join(''));
  }

  return normalized.map((entry) => ({
    ...entry,
    token: typeMap.get(entry.token) ?? entry.token,
  }));
}

export function buildPrefixPreservingGlobalSuffixGenerator(entries, options = {}) {
  const normalized = normalizeEntries(entries);
  const random = mulberry32(options.seed ?? 42);
  const count = options.count ?? normalized.length;
  const prefixLength = options.prefixLength ?? 2;

  const prefixCounts = new Map();
  const suffixCounts = new Map();
  const posCounts = new Map();

  for (const e of normalized) {
    if (e.token.length < prefixLength) continue;
    const prefix = e.token.slice(0, prefixLength);
    const suffix = e.token.slice(-Math.min(2, e.token.length));
    prefixCounts.set(prefix, (prefixCounts.get(prefix) ?? 0) + 1);
    suffixCounts.set(suffix, (suffixCounts.get(suffix) ?? 0) + 1);

    if (!posCounts.has(prefix)) posCounts.set(prefix, { total: 0, lineInitial: 0, lineFinal: 0, paragraphInitial: 0 });
    const p = posCounts.get(prefix);
    p.total += 1;
    if (e.lineInitial) p.lineInitial += 1;
    if (e.lineFinal) p.lineFinal += 1;
    if (e.paragraphInitial) p.paragraphInitial += 1;
  }

  const prefixRows = [...prefixCounts.entries()].map(([value, weight]) => ({ value, weight }));
  const suffixRows = [...suffixCounts.entries()].map(([value, weight]) => ({ value, weight }));

  const out = [];
  for (let i = 0; i < count; i += 1) {
    const prefix = weightedSample(prefixRows, random);
    const suffix = weightedSample(suffixRows, random);
    const pos = posCounts.get(prefix) ?? { total: 1, lineInitial: 0, lineFinal: 0, paragraphInitial: 0 };

    out.push({
      token: `${prefix}${suffix}`,
      lineInitial: random() < pos.lineInitial / pos.total,
      lineFinal: random() < pos.lineFinal / pos.total,
      paragraphInitial: random() < pos.paragraphInitial / pos.total,
    });
  }

  return out;
}

export function buildLengthPreservingRandomGenerator(entries, options = {}) {
  const normalized = normalizeEntries(entries);
  const random = mulberry32(options.seed ?? 42);
  const count = options.count ?? normalized.length;

  const lengths = normalized.map((e) => e.token.length).filter((x) => x > 0);
  const lengthRows = Object.entries(lengths.reduce((m, len) => {
    m[len] = (m[len] ?? 0) + 1;
    return m;
  }, {})).map(([value, weight]) => ({ value: Number(value), weight }));

  const charCounts = new Map();
  for (const e of normalized) {
    for (const ch of e.token) charCounts.set(ch, (charCounts.get(ch) ?? 0) + 1);
  }
  const charRows = [...charCounts.entries()].map(([value, weight]) => ({ value, weight }));

  const posRates = {
    lineInitial: normalized.filter((e) => e.lineInitial).length / normalized.length,
    lineFinal: normalized.filter((e) => e.lineFinal).length / normalized.length,
    paragraphInitial: normalized.filter((e) => e.paragraphInitial).length / normalized.length,
  };

  const out = [];
  for (let i = 0; i < count; i += 1) {
    const len = weightedSample(lengthRows, random);
    let token = '';
    for (let j = 0; j < len; j += 1) token += weightedSample(charRows, random);

    out.push({
      token,
      lineInitial: random() < posRates.lineInitial,
      lineFinal: random() < posRates.lineFinal,
      paragraphInitial: random() < posRates.paragraphInitial,
    });
  }

  return out;
}

function rowByLength(rows, length) {
  return rows.find((r) => r.prefixLength === length) ?? null;
}

function l2Distance(a, b) {
  const n = Math.max(a.length, b.length);
  let sum = 0;
  for (let i = 0; i < n; i += 1) {
    const av = a[i] ?? 0;
    const bv = b[i] ?? 0;
    sum += (av - bv) ** 2;
  }
  return Math.sqrt(sum);
}

function jaccard(setA, setB) {
  const a = new Set(setA);
  const b = new Set(setB);
  const inter = [...a].filter((x) => b.has(x)).length;
  const union = new Set([...a, ...b]).size;
  return union > 0 ? inter / union : 0;
}

function analyze(entries) {
  return {
    predictability: runPrefixPredictabilityExperiment(entries, { filterKey: 'ALL' }),
    ambiguity: runAmbiguityPersistence(entries, { filterKey: 'ALL' }),
    families: buildPrefixFamilies(entries, { minPrefixLength: 1, maxPrefixLength: 6, topFamilyCount: 20, topTokensPerFamily: 10 }),
  };
}

export function runNullModelComparison(rawEntries, options = {}) {
  const entries = normalizeEntries(rawEntries);
  const models = options.models ?? ['frequency_shuffle', 'prefix_global_suffix', 'length_preserving'];

  const generated = {};
  if (models.includes('frequency_shuffle')) {
    generated.frequency_shuffle = buildFrequencyPreservingShuffle(entries, options.seed ?? 42);
  }
  if (models.includes('prefix_global_suffix')) {
    generated.prefix_global_suffix = buildPrefixPreservingGlobalSuffixGenerator(entries, {
      seed: (options.seed ?? 42) + 1,
      count: entries.length,
      prefixLength: options.prefixLength ?? 2,
    });
  }
  if (models.includes('length_preserving')) {
    generated.length_preserving = buildLengthPreservingRandomGenerator(entries, {
      seed: (options.seed ?? 42) + 2,
      count: entries.length,
    });
  }

  const real = analyze(entries);
  const modelAnalyses = {};
  for (const [name, modelEntries] of Object.entries(generated)) {
    modelAnalyses[name] = analyze(modelEntries);
  }

  const comparison = [];
  const realEntropy = real.predictability.byPrefixLength.map((r) => r.avgEntropy);
  const realCandidates = real.predictability.byPrefixLength.map((r) => r.avgCandidateCount);
  const realAmbiguity = real.ambiguity.map((r) => r.ambiguityRate);
  const realTopFamilies = real.families.byPrefixLength
    .filter((row) => row.prefixLength === 2 || row.prefixLength === 3)
    .flatMap((row) => row.topFamilies.slice(0, 10).map((f) => `${row.prefixLength}:${f.prefix}`));

  for (const [name, analysis] of Object.entries(modelAnalyses)) {
    const entropy = analysis.predictability.byPrefixLength.map((r) => r.avgEntropy);
    const candidates = analysis.predictability.byPrefixLength.map((r) => r.avgCandidateCount);
    const ambiguity = analysis.ambiguity.map((r) => r.ambiguityRate);

    const modelTopFamilies = analysis.families.byPrefixLength
      .filter((row) => row.prefixLength === 2 || row.prefixLength === 3)
      .flatMap((row) => row.topFamilies.slice(0, 10).map((f) => `${row.prefixLength}:${f.prefix}`));

    comparison.push({
      model: name,
      entropyL2: l2Distance(realEntropy, entropy),
      candidateL2: l2Distance(realCandidates, candidates),
      ambiguityL2: l2Distance(realAmbiguity, ambiguity),
      familyOverlap: jaccard(realTopFamilies, modelTopFamilies),
    });
  }

  return {
    real,
    generated,
    modelAnalyses,
    comparison,
  };
}

function num(v) {
  return Number.isFinite(v) ? v.toFixed(4) : '0.0000';
}

function pct(v) {
  return `${(v * 100).toFixed(2)}%`;
}

export function renderNullModelComparison(result) {
  const summaryTable = buildMarkdownTable(
    ['Model', 'Entropy decay diff (L2)', 'Candidate diff (L2)', 'Ambiguity diff (L2)', 'Prefix-family overlap'],
    result.comparison.map((row) => [
      row.model,
      num(row.entropyL2),
      num(row.candidateL2),
      num(row.ambiguityL2),
      pct(row.familyOverlap),
    ]),
  );

  const detailRows = [];
  const realRows = result.real.predictability.byPrefixLength;
  const maxLen = Math.max(...realRows.map((r) => r.prefixLength));
  const modelNames = Object.keys(result.modelAnalyses);

  for (let length = 1; length <= maxLen; length += 1) {
    const line = [String(length), num(rowByLength(realRows, length)?.avgEntropy ?? 0), num(rowByLength(result.real.ambiguity, length)?.ambiguityRate ?? 0)];
    for (const name of modelNames) {
      line.push(num(rowByLength(result.modelAnalyses[name].predictability.byPrefixLength, length)?.avgEntropy ?? 0));
      line.push(num(rowByLength(result.modelAnalyses[name].ambiguity, length)?.ambiguityRate ?? 0));
    }
    detailRows.push(line);
  }

  const headers = ['Prefix Length', 'Real entropy', 'Real ambiguity'];
  for (const name of modelNames) {
    headers.push(`${name} entropy`);
    headers.push(`${name} ambiguity`);
  }

  return [
    '## Null Model Comparison',
    '',
    '### Divergence Summary (Real vs Null)',
    summaryTable,
    '',
    '### Entropy / Ambiguity by Prefix Length',
    buildMarkdownTable(headers, detailRows),
  ].join('\n');
}
