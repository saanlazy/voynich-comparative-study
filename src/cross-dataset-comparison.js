import fs from 'node:fs';
import path from 'node:path';

import { analyzeDataset } from './multi-transcription-validation.js';
import { buildMarkdownTable } from './predictability-experiment.js';

function num(v) {
  return Number.isFinite(v) ? v.toFixed(4) : '0.0000';
}

function pct(v) {
  return `${(v * 100).toFixed(2)}%`;
}

function mean(values) {
  if (values.length === 0) return 0;
  return values.reduce((s, x) => s + x, 0) / values.length;
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

function jaccard(setA, setB) {
  const a = new Set(setA);
  const b = new Set(setB);
  const inter = [...a].filter((x) => b.has(x)).length;
  const union = new Set([...a, ...b]).size;
  return union > 0 ? inter / union : 0;
}

function tokenizeLine(line) {
  return line
    .toLowerCase()
    .split(/[^a-z0-9_]+/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function makeEntriesFromLines(lines) {
  const entries = [];
  let paragraphStart = true;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      paragraphStart = true;
      continue;
    }

    const tokens = tokenizeLine(trimmed);
    if (tokens.length === 0) continue;

    tokens.forEach((token, idx) => {
      entries.push({
        token,
        lineInitial: idx === 0,
        lineFinal: idx === tokens.length - 1,
        paragraphInitial: paragraphStart && idx === 0,
      });
    });

    paragraphStart = false;
  }

  return entries;
}

function loadNaturalLanguage(content) {
  const lines = content
    .split(/\r?\n/)
    .filter((line) => !line.trim().startsWith('***') && !line.trim().startsWith('Project Gutenberg'));
  return makeEntriesFromLines(lines);
}

function loadCsvLike(content) {
  const lines = content.split(/\r?\n/).map((line) => line.replace(/,/g, ' '));
  return makeEntriesFromLines(lines);
}

function flattenJson(value, out) {
  if (value == null) return;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    tokenizeLine(String(value)).forEach((t) => out.push(t));
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => flattenJson(item, out));
    return;
  }
  if (typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      tokenizeLine(String(k)).forEach((t) => out.push(t));
      flattenJson(v, out);
    }
  }
}

function loadJsonLike(content) {
  try {
    const parsed = JSON.parse(content);
    const tokens = [];
    flattenJson(parsed, tokens);
    return makeEntriesFromLines([tokens.join(' ')]);
  } catch {
    return makeEntriesFromLines(content.split(/\r?\n/));
  }
}

function loadCodeLike(content) {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.replace(/[^a-zA-Z0-9_]+/g, ' '));
  return makeEntriesFromLines(lines);
}

function buildCharNgramModel(text, n = 3) {
  const clean = text.toLowerCase().replace(/[^a-z ]+/g, ' ');
  const counts = new Map();
  for (let i = 0; i <= clean.length - n; i += 1) {
    const gram = clean.slice(i, i + n);
    counts.set(gram, (counts.get(gram) ?? 0) + 1);
  }
  return counts;
}

function generateFromNgramText(seedText, count, seed = 42, n = 3) {
  let t = seed >>> 0;
  function random() {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  }

  const model = buildCharNgramModel(seedText, n);
  const grams = [...model.entries()].map(([gram, weight]) => ({ gram, weight }));
  const total = grams.reduce((s, g) => s + g.weight, 0);

  function sampleGram() {
    let r = random() * total;
    for (const g of grams) {
      r -= g.weight;
      if (r <= 0) return g.gram;
    }
    return grams[grams.length - 1]?.gram ?? 'aaa';
  }

  const tokens = [];
  for (let i = 0; i < count; i += 1) {
    const g = sampleGram();
    tokens.push(g.replace(/\s+/g, '') || 'a');
  }
  return makeEntriesFromLines([tokens.join(' ')]);
}

function inferKind(filePath, content) {
  const name = path.basename(filePath).toLowerCase();
  if (name.includes('english') || name.includes('latin') || name.endsWith('.txt')) return 'natural';
  if (name.includes('ngram') || name.includes('synthetic') || name.includes('random')) return 'synthetic';
  if (name.endsWith('.json') || name.includes('json')) return 'structured_json';
  if (name.endsWith('.csv') || name.includes('csv')) return 'structured_csv';
  if (name.endsWith('.js') || name.endsWith('.py') || name.endsWith('.ts') || name.includes('code')) return 'structured_code';
  if (content.trim().startsWith('{') || content.trim().startsWith('[')) return 'structured_json';
  return 'natural';
}

function classLabel(kind) {
  if (kind.startsWith('natural')) return 'natural_language';
  if (kind.startsWith('structured')) return 'structured_data';
  if (kind.startsWith('synthetic')) return 'random_or_synthetic';
  return 'random_or_synthetic';
}

export function loadComparisonDataset(filePath, options = {}) {
  const content = fs.readFileSync(filePath, 'utf8');
  const kind = options.kind ?? inferKind(filePath, content);
  const name = options.name ?? path.basename(filePath);

  let entries;
  if (kind === 'natural') entries = loadNaturalLanguage(content);
  else if (kind === 'structured_json') entries = loadJsonLike(content);
  else if (kind === 'structured_csv') entries = loadCsvLike(content);
  else if (kind === 'structured_code') entries = loadCodeLike(content);
  else if (kind === 'synthetic') entries = generateFromNgramText(content, options.syntheticCount ?? 5000, options.seed ?? 42, 3);
  else entries = loadNaturalLanguage(content);

  return {
    name,
    kind,
    class: classLabel(kind),
    entries,
  };
}

export function loadComparisonDatasets(paths, options = {}) {
  return paths.map((p) => loadComparisonDataset(p, options));
}

function topFamilyPrefixSet(familyAnalysis, topN = 20, lengths = [2, 3]) {
  return familyAnalysis.byPrefixLength
    .filter((row) => lengths.includes(row.prefixLength))
    .flatMap((row) => row.topFamilies.slice(0, topN).map((f) => `${row.prefixLength}:${f.prefix}`));
}

function familySizeVector(familyAnalysis, prefixLength = 2, take = 20) {
  const row = familyAnalysis.byPrefixLength.find((x) => x.prefixLength === prefixLength);
  if (!row) return [];
  return row.topFamilies.slice(0, take).map((f) => f.uniqueTokenCount);
}

function positionBiasStrength(entries) {
  const n = entries.length || 1;
  const lineInitial = entries.filter((e) => e.lineInitial).length / n;
  const lineFinal = entries.filter((e) => e.lineFinal).length / n;
  return {
    lineInitial,
    lineFinal,
    strength: Math.max(lineInitial, lineFinal),
  };
}

function weightedMean(values, weights) {
  const total = weights.reduce((s, w) => s + w, 0);
  if (total <= 0) return 0;
  return values.reduce((s, v, i) => s + v * (weights[i] ?? 0), 0) / total;
}

function suffixConcentration(analysis) {
  const rows = analysis.coupling.char2.selectivePrefixes;
  if (!rows || rows.length === 0) return 0;
  const entropies = rows.map((r) => r.suffixEntropy);
  const weights = rows.map((r) => r.total);
  return weightedMean(entropies, weights);
}

function rowByLength(rows, length) {
  return rows.find((r) => r.prefixLength === length) ?? null;
}

function toSeries(rows, selector) {
  return rows.map((r) => selector(r));
}

function similarityScore(metrics) {
  const s1 = 1 / (1 + metrics.entropyL2);
  const s2 = (metrics.entropyCorr + 1) / 2;
  const s3 = 1 / (1 + metrics.ambiguityL2);
  const s4 = (metrics.ambiguityCorr + 1) / 2;
  const s5 = metrics.familyJaccard;
  const s6 = 1 / (1 + metrics.positionBiasDiff);
  const s7 = 1 / (1 + Math.abs(metrics.suffixEntropyDiff));

  return 0.22 * s1 + 0.14 * s2 + 0.18 * s3 + 0.10 * s4 + 0.16 * s5 + 0.10 * s6 + 0.10 * s7;
}

function classifyFromScore(score) {
  if (score >= 0.62) return 'A: similar to natural language';
  if (score >= 0.45) return 'B: similar to structured data';
  return 'C: similar to random/synthetic text';
}

export function runCrossDatasetComparison(voynichEntries, datasets) {
  const voynich = analyzeDataset(voynichEntries);
  const vEntropy = toSeries(voynich.predictability.byPrefixLength, (r) => r.avgEntropy);
  const vCandidates = toSeries(voynich.predictability.byPrefixLength, (r) => r.avgCandidateCount);
  const vTop1 = toSeries(voynich.predictability.byPrefixLength, (r) => r.accuracy.top1);
  const vAmb = toSeries(voynich.ambiguity, (r) => r.ambiguityRate);
  const vFamilySet = topFamilyPrefixSet(voynich.families, 20, [2, 3]);
  const vFamilyDist = familySizeVector(voynich.families, 2, 20);
  const vPos = positionBiasStrength(voynichEntries);
  const vSuffixEntropy = suffixConcentration(voynich);

  const rows = [];
  const byDataset = [];

  for (const ds of datasets) {
    const a = analyzeDataset(ds.entries);

    const entropy = toSeries(a.predictability.byPrefixLength, (r) => r.avgEntropy);
    const candidates = toSeries(a.predictability.byPrefixLength, (r) => r.avgCandidateCount);
    const top1 = toSeries(a.predictability.byPrefixLength, (r) => r.accuracy.top1);
    const amb = toSeries(a.ambiguity, (r) => r.ambiguityRate);
    const familySet = topFamilyPrefixSet(a.families, 20, [2, 3]);
    const familyDist = familySizeVector(a.families, 2, 20);
    const pos = positionBiasStrength(ds.entries);
    const suffixEntropy = suffixConcentration(a);

    const metrics = {
      entropyL2: l2Distance(vEntropy, entropy),
      entropyCorr: correlation(vEntropy, entropy),
      candidateL2: l2Distance(vCandidates, candidates),
      top1L2: l2Distance(vTop1, top1),
      ambiguityL2: l2Distance(vAmb, amb),
      ambiguityCorr: correlation(vAmb, amb),
      familyJaccard: jaccard(vFamilySet, familySet),
      familyDistCorr: correlation(vFamilyDist, familyDist),
      positionBiasDiff: Math.abs(vPos.strength - pos.strength),
      lineInitialDiff: Math.abs(vPos.lineInitial - pos.lineInitial),
      lineFinalDiff: Math.abs(vPos.lineFinal - pos.lineFinal),
      suffixEntropyDiff: suffixEntropy - vSuffixEntropy,
    };

    const score = similarityScore(metrics);
    const classification = classifyFromScore(score);

    rows.push({
      dataset: ds.name,
      kind: ds.kind,
      class: ds.class,
      ...metrics,
      similarityScore: score,
      classification,
    });

    // prefix-length detailed deltas for table
    const maxLen = Math.max(voynich.predictability.byPrefixLength.length, a.predictability.byPrefixLength.length);
    const detail = [];
    for (let len = 1; len <= maxLen; len += 1) {
      const vr = rowByLength(voynich.predictability.byPrefixLength, len);
      const dr = rowByLength(a.predictability.byPrefixLength, len);
      const va = rowByLength(voynich.ambiguity, len);
      const da = rowByLength(a.ambiguity, len);
      detail.push({
        prefixLength: len,
        entropyDiff: (vr?.avgEntropy ?? 0) - (dr?.avgEntropy ?? 0),
        ambiguityDiff: (va?.ambiguityRate ?? 0) - (da?.ambiguityRate ?? 0),
      });
    }

    byDataset.push({
      dataset: ds.name,
      detail,
      analysis: a,
    });
  }

  rows.sort((a, b) => b.similarityScore - a.similarityScore);

  const classGroups = {
    natural_language: rows.filter((r) => r.class === 'natural_language'),
    structured_data: rows.filter((r) => r.class === 'structured_data'),
    random_or_synthetic: rows.filter((r) => r.class === 'random_or_synthetic'),
  };

  const classMeans = Object.entries(classGroups).map(([name, arr]) => ({
    class: name,
    meanSimilarity: mean(arr.map((x) => x.similarityScore)),
  }));

  classMeans.sort((a, b) => b.meanSimilarity - a.meanSimilarity);

  return {
    rows,
    byDataset,
    classMeans,
    closestClass: classMeans[0]?.class ?? 'undetermined',
  };
}

export function renderCrossDatasetComparison(result) {
  const summaryTable = buildMarkdownTable(
    [
      'Dataset',
      'Type',
      'Entropy L2',
      'Entropy Corr',
      'Ambiguity L2',
      'Ambiguity Corr',
      'Family Jaccard',
      'Position Bias Diff',
      'Suffix Entropy Diff',
      'Similarity Score',
      'Classification',
    ],
    result.rows.map((r) => [
      r.dataset,
      r.kind,
      num(r.entropyL2),
      num(r.entropyCorr),
      num(r.ambiguityL2),
      num(r.ambiguityCorr),
      pct(r.familyJaccard),
      num(r.positionBiasDiff),
      num(r.suffixEntropyDiff),
      num(r.similarityScore),
      r.classification,
    ]),
  );

  const rankingTable = buildMarkdownTable(
    ['Rank', 'Dataset', 'Similarity Score'],
    result.rows.map((r, i) => [String(i + 1), r.dataset, num(r.similarityScore)]),
  );

  const classTable = buildMarkdownTable(
    ['Class', 'Mean Similarity'],
    result.classMeans.map((r) => [r.class, num(r.meanSimilarity)]),
  );

  const detailBlocks = [];
  for (const item of result.byDataset) {
    detailBlocks.push(`### ${item.dataset}: entropy/ambiguity difference by prefix length`);
    detailBlocks.push(
      buildMarkdownTable(
        ['Prefix Length', 'Entropy Diff (Voynich - dataset)', 'Ambiguity Diff (Voynich - dataset)'],
        item.detail.map((d) => [String(d.prefixLength), num(d.entropyDiff), num(d.ambiguityDiff)]),
      ),
    );
  }

  const english = result.rows.find((r) => r.dataset.toLowerCase().includes('english'));
  const latin = result.rows.find((r) => r.dataset.toLowerCase().includes('latin'));
  let languageConsistency = 'insufficient data (need both english and latin)';
  if (english && latin) {
    const diff = Math.abs(english.similarityScore - latin.similarityScore);
    const consistent = diff <= 0.10;
    languageConsistency = consistent
      ? `consistent across languages (|Δ similarity|=${num(diff)} <= 0.10)`
      : `potential language-specific effect (|Δ similarity|=${num(diff)} > 0.10)`;
  }

  let englishBias = 'not assessable';
  if (english && latin) {
    const dependsOnEnglish = english.similarityScore - latin.similarityScore > 0.15;
    englishBias = dependsOnEnglish ? 'possible English-specific dependence' : 'no strong English-specific dependence';
  }

  return [
    '## Cross-Dataset Comparison',
    '',
    '### Similarity Summary',
    summaryTable,
    '',
    '### Ranking by Similarity to Voynich',
    rankingTable,
    '',
    '### Class-Level Similarity',
    classTable,
    '',
    ...detailBlocks,
    '',
    `Natural-language robustness (English vs Latin): ${languageConsistency}.`,
    `English-specific structure check: ${englishBias}.`,
    '',
    `Final summary: Voynich is closest to: ${result.closestClass}`,
  ].join('\n');
}
