import { runPrefixPredictabilityExperiment } from './predictability-experiment.js';
import { runAmbiguityPersistence } from './advanced-research.js';
import { buildPrefixFamilies } from './prefix-family-analysis.js';
import { analyzePrefixSuffixCoupling } from './prefix-suffix-coupling.js';
import { runPositionAwarePredictabilityExperiment, buildMarkdownTable } from './predictability-experiment.js';

function num(v) {
  return Number.isFinite(v) ? v.toFixed(4) : '0.0000';
}

function pct(v) {
  return `${(v * 100).toFixed(2)}%`;
}

function rowByLength(rows, length) {
  return rows.find((row) => row.prefixLength === length) ?? null;
}

function l2Distance(a, b) {
  const n = Math.max(a.length, b.length);
  let sum = 0;
  for (let i = 0; i < n; i += 1) {
    const av = a[i] ?? 0;
    const bv = b[i] ?? 0;
    const d = av - bv;
    sum += d * d;
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

export function analyzeDataset(entries) {
  return {
    predictability: runPrefixPredictabilityExperiment(entries, { filterKey: 'ALL' }),
    ambiguity: runAmbiguityPersistence(entries, { filterKey: 'ALL' }),
    families: buildPrefixFamilies(entries, { minPrefixLength: 1, maxPrefixLength: 6, topFamilyCount: 20, topTokensPerFamily: 10 }),
    coupling: analyzePrefixSuffixCoupling(entries, { topCouplingCount: 30, topDistItems: 10 }),
    positionAware: runPositionAwarePredictabilityExperiment(entries),
  };
}

function collectTopFamilyPrefixes(familyAnalysis, lengths = [2, 3], topN = 20) {
  const out = [];
  for (const section of familyAnalysis.byPrefixLength) {
    if (!lengths.includes(section.prefixLength)) continue;
    for (const row of section.topFamilies.slice(0, topN)) out.push(`${section.prefixLength}:${row.prefix}`);
  }
  return out;
}

function topSuffixSetsByPrefix(couplingChar2, topPrefixN = 20, topSuffixN = 5) {
  const groups = new Map();
  for (const row of couplingChar2.pairRows) {
    if (!groups.has(row.prefix)) groups.set(row.prefix, []);
    groups.get(row.prefix).push(row);
  }

  const prefixes = [...groups.entries()]
    .map(([prefix, rows]) => ({ prefix, total: rows.reduce((s, r) => s + r.count, 0), rows }))
    .sort((a, b) => b.total - a.total)
    .slice(0, topPrefixN);

  const out = new Map();
  for (const p of prefixes) {
    const suffixes = p.rows
      .sort((a, b) => b.count - a.count)
      .slice(0, topSuffixN)
      .map((r) => r.suffix);
    out.set(p.prefix, suffixes);
  }
  return out;
}

export function compareDatasets(datasetA, datasetB, options = {}) {
  const a = analyzeDataset(datasetA.entries);
  const b = analyzeDataset(datasetB.entries);

  const maxLenPredictability = Math.max(
    ...a.predictability.byPrefixLength.map((r) => r.prefixLength),
    ...b.predictability.byPrefixLength.map((r) => r.prefixLength),
  );

  const entropyRows = [];
  const ambiguityRows = [];
  for (let length = 1; length <= maxLenPredictability; length += 1) {
    const ap = rowByLength(a.predictability.byPrefixLength, length);
    const bp = rowByLength(b.predictability.byPrefixLength, length);
    entropyRows.push({
      prefixLength: length,
      entropyA: ap?.avgEntropy ?? 0,
      entropyB: bp?.avgEntropy ?? 0,
      entropyDiff: (ap?.avgEntropy ?? 0) - (bp?.avgEntropy ?? 0),
      candidatesA: ap?.avgCandidateCount ?? 0,
      candidatesB: bp?.avgCandidateCount ?? 0,
      candidateDiff: (ap?.avgCandidateCount ?? 0) - (bp?.avgCandidateCount ?? 0),
      top1Diff: (ap?.accuracy.top1 ?? 0) - (bp?.accuracy.top1 ?? 0),
      top3Diff: (ap?.accuracy.top3 ?? 0) - (bp?.accuracy.top3 ?? 0),
      top5Diff: (ap?.accuracy.top5 ?? 0) - (bp?.accuracy.top5 ?? 0),
    });

    const aa = rowByLength(a.ambiguity, length);
    const ba = rowByLength(b.ambiguity, length);
    ambiguityRows.push({
      prefixLength: length,
      ambiguityA: aa?.ambiguityRate ?? 0,
      ambiguityB: ba?.ambiguityRate ?? 0,
      ambiguityDiff: (aa?.ambiguityRate ?? 0) - (ba?.ambiguityRate ?? 0),
      uniqueResDiff: (aa?.uniqueResolutionRate ?? 0) - (ba?.uniqueResolutionRate ?? 0),
    });
  }

  const entropyL2 = l2Distance(
    entropyRows.map((r) => r.entropyA),
    entropyRows.map((r) => r.entropyB),
  );
  const candidatesL2 = l2Distance(
    entropyRows.map((r) => r.candidatesA),
    entropyRows.map((r) => r.candidatesB),
  );
  const top1L2 = l2Distance(
    entropyRows.map((r) => r.top1Diff + (rowByLength(b.predictability.byPrefixLength, r.prefixLength)?.accuracy.top1 ?? 0)),
    entropyRows.map((r) => rowByLength(b.predictability.byPrefixLength, r.prefixLength)?.accuracy.top1 ?? 0),
  );

  const familySetA = collectTopFamilyPrefixes(a.families, [2, 3], 20);
  const familySetB = collectTopFamilyPrefixes(b.families, [2, 3], 20);
  const familyJaccard = jaccard(familySetA, familySetB);

  const suffixMapA = topSuffixSetsByPrefix(a.coupling.char2, 20, 5);
  const suffixMapB = topSuffixSetsByPrefix(b.coupling.char2, 20, 5);
  const sharedPrefixes = [...suffixMapA.keys()].filter((p) => suffixMapB.has(p));
  const suffixJaccards = sharedPrefixes.map((prefix) => ({
    prefix,
    score: jaccard(suffixMapA.get(prefix), suffixMapB.get(prefix)),
  }));
  const suffixSimilarity =
    suffixJaccards.length > 0
      ? suffixJaccards.reduce((sum, item) => sum + item.score, 0) / suffixJaccards.length
      : 0;

  return {
    datasetA: datasetA.name,
    datasetB: datasetB.name,
    analysisA: a,
    analysisB: b,
    entropyRows,
    ambiguityRows,
    summary: {
      entropyL2,
      candidatesL2,
      top1L2,
      familyJaccard,
      suffixSimilarity,
    },
    suffixOverlapRows: suffixJaccards.sort((x, y) => y.score - x.score).slice(0, 20),
  };
}

export function renderMultiTranscriptionComparison(result) {
  const entropyTable = buildMarkdownTable(
    ['Prefix Length', `${result.datasetA} entropy`, `${result.datasetB} entropy`, 'diff', `${result.datasetA} candidates`, `${result.datasetB} candidates`, 'diff'],
    result.entropyRows.map((r) => [
      String(r.prefixLength),
      num(r.entropyA),
      num(r.entropyB),
      num(r.entropyDiff),
      num(r.candidatesA),
      num(r.candidatesB),
      num(r.candidateDiff),
    ]),
  );

  const ambiguityTable = buildMarkdownTable(
    ['Prefix Length', `${result.datasetA} ambiguity`, `${result.datasetB} ambiguity`, 'diff', 'unique-resolution diff'],
    result.ambiguityRows.map((r) => [
      String(r.prefixLength),
      pct(r.ambiguityA),
      pct(r.ambiguityB),
      pct(r.ambiguityDiff),
      pct(r.uniqueResDiff),
    ]),
  );

  const overlapTable = buildMarkdownTable(
    ['Metric', 'Score'],
    [
      ['Entropy curve L2', num(result.summary.entropyL2)],
      ['Candidate curve L2', num(result.summary.candidatesL2)],
      ['Top-1 accuracy L2', num(result.summary.top1L2)],
      ['Top prefix family overlap (Jaccard)', pct(result.summary.familyJaccard)],
      ['Suffix distribution similarity (avg Jaccard)', pct(result.summary.suffixSimilarity)],
    ],
  );

  const suffixOverlapTable = buildMarkdownTable(
    ['Prefix', 'Top suffix-set overlap'],
    result.suffixOverlapRows.map((row) => [row.prefix, pct(row.score)]),
  );

  return [
    '## Multi-Transcription Comparison',
    '',
    `Compared: ${result.datasetA} vs ${result.datasetB}`,
    '',
    '### Entropy / Candidate Difference by Prefix Length',
    entropyTable,
    '',
    '### Ambiguity Difference by Prefix Length',
    ambiguityTable,
    '',
    '### Family and Suffix Similarity Summary',
    overlapTable,
    '',
    '### Suffix Distribution Similarity (Top Prefixes)',
    suffixOverlapTable,
  ].join('\n');
}
