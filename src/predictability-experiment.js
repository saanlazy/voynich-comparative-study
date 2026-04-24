import { preprocessTokens, runSearch, makeShuffledDataset } from './core.js';

export const POSITION_SUBSETS = {
  all: { label: 'All tokens', filterKey: 'ALL', predicate: () => true },
  lineInitial: { label: 'Line-initial only', filterKey: 'LINE_INITIAL', predicate: (entry) => Boolean(entry.lineInitial) },
  paragraphInitial: {
    label: 'Paragraph-initial only',
    filterKey: 'PARAGRAPH_INITIAL',
    predicate: (entry) => Boolean(entry.paragraphInitial),
  },
  lineFinal: { label: 'Line-final only', filterKey: 'LINE_FINAL', predicate: (entry) => Boolean(entry.lineFinal) },
};

function normalizeEntries(rawEntries) {
  return rawEntries
    .map((entry) => {
      if (typeof entry === 'string') return { token: entry };
      return entry;
    })
    .filter((entry) => typeof entry?.token === 'string' && entry.token.trim().length > 0)
    .map((entry) => ({ ...entry, token: entry.token.trim() }));
}

function safeRatio(numerator, denominator) {
  if (!denominator) return 0;
  return numerator / denominator;
}

function parseTopK(topK) {
  const k = topK ?? [1, 3, 5];
  return {
    top1K: k.includes(1) ? 1 : k[0] ?? 1,
    top3K: k.includes(3) ? 3 : k[1] ?? 3,
    top5K: k.includes(5) ? 5 : k[2] ?? 5,
  };
}

function aggregateByPrefixLength({ evaluationEntries, searchPrefixCached, top1K, top3K, top5K }) {
  const byLength = new Map();

  for (const entry of evaluationEntries) {
    const token = entry.token;
    for (let length = 1; length <= token.length; length += 1) {
      const prefix = token.slice(0, length);
      const search = searchPrefixCached(prefix);

      const rank = search.candidates.find((candidate) => candidate.token === token)?.rank ?? Infinity;
      const bucket = byLength.get(length) ?? {
        prefixLength: length,
        stepCount: 0,
        candidateCountSum: 0,
        entropySum: 0,
        top1Hits: 0,
        top3Hits: 0,
        top5Hits: 0,
      };

      bucket.stepCount += 1;
      bucket.candidateCountSum += search.metrics.candidateCount;
      bucket.entropySum += search.metrics.entropy;
      if (rank <= top1K) bucket.top1Hits += 1;
      if (rank <= top3K) bucket.top3Hits += 1;
      if (rank <= top5K) bucket.top5Hits += 1;

      byLength.set(length, bucket);
    }
  }

  return [...byLength.values()]
    .sort((a, b) => a.prefixLength - b.prefixLength)
    .map((row) => ({
      prefixLength: row.prefixLength,
      samples: row.stepCount,
      avgCandidateCount: safeRatio(row.candidateCountSum, row.stepCount),
      avgEntropy: safeRatio(row.entropySum, row.stepCount),
      accuracy: {
        top1: safeRatio(row.top1Hits, row.stepCount),
        top3: safeRatio(row.top3Hits, row.stepCount),
        top5: safeRatio(row.top5Hits, row.stepCount),
      },
    }));
}

export function runPrefixPredictabilityExperiment(rawEntries, options = {}) {
  const candidateEntries = normalizeEntries(options.candidateEntries ?? rawEntries);
  const evaluationEntries = normalizeEntries(options.evaluationEntries ?? rawEntries);
  const filterKey = options.filterKey ?? 'ALL';

  const model = preprocessTokens(candidateEntries);
  const mode = 'PREFIX';
  const { top1K, top3K, top5K } = parseTopK(options.topK);

  const prefixCache = new Map();
  function searchPrefixCached(prefix) {
    if (!prefixCache.has(prefix)) {
      prefixCache.set(prefix, runSearch({ model, mode, query: prefix, filterKey }));
    }
    return prefixCache.get(prefix);
  }

  const rows = aggregateByPrefixLength({
    evaluationEntries,
    searchPrefixCached,
    top1K,
    top3K,
    top5K,
  });

  return {
    datasetSize: evaluationEntries.length,
    uniqueTokenCount: new Set(evaluationEntries.map((entry) => entry.token)).size,
    byPrefixLength: rows,
  };
}

export function runPositionAwarePredictabilityExperiment(rawEntries, options = {}) {
  const entries = normalizeEntries(rawEntries);
  const subsetNames = options.subsetNames ?? ['all', 'lineInitial', 'paragraphInitial', 'lineFinal'];

  const subsets = {};
  for (const subsetName of subsetNames) {
    const spec = POSITION_SUBSETS[subsetName];
    if (!spec) continue;

    const evaluationEntries = entries.filter(spec.predicate);
    subsets[subsetName] = {
      subset: spec.label,
      filterKey: spec.filterKey,
      experiment: runPrefixPredictabilityExperiment(entries, {
        ...options,
        candidateEntries: entries,
        evaluationEntries,
        filterKey: spec.filterKey,
      }),
    };
  }

  const maxPrefixLength = Math.max(
    0,
    ...Object.values(subsets).map((item) =>
      Math.max(0, ...item.experiment.byPrefixLength.map((row) => row.prefixLength)),
    ),
  );

  return {
    subsets,
    maxPrefixLength,
  };
}

export function buildBaselineDatasets(rawEntries, options = {}) {
  const entries = normalizeEntries(rawEntries);
  const includeReversed = options.includeReversed ?? true;

  const baselines = {
    voynich: entries,
    shuffled: makeShuffledDataset(entries),
  };

  if (includeReversed) {
    baselines.reversed = entries.map((entry) => ({
      ...entry,
      token: entry.token.split('').reverse().join(''),
    }));
  }

  return baselines;
}

export function runBaselineComparison(rawEntries, options = {}) {
  const baselines = buildBaselineDatasets(rawEntries, options);

  const experiments = {};
  for (const [name, entries] of Object.entries(baselines)) {
    experiments[name] = runPrefixPredictabilityExperiment(entries, options);
  }

  const maxPrefixLength = Math.max(
    ...Object.values(experiments).map((experiment) =>
      Math.max(0, ...experiment.byPrefixLength.map((row) => row.prefixLength)),
    ),
  );

  return {
    experiments,
    maxPrefixLength,
  };
}

function pct(value) {
  return `${(value * 100).toFixed(2)}%`;
}

function num(value) {
  return Number.isFinite(value) ? value.toFixed(4) : '0.0000';
}

function rowByPrefix(experiment, prefixLength) {
  return experiment.byPrefixLength.find((row) => row.prefixLength === prefixLength) ?? null;
}

export function buildMarkdownTable(headers, rows) {
  const headerLine = `| ${headers.join(' | ')} |`;
  const sepLine = `| ${headers.map(() => '---').join(' | ')} |`;
  const body = rows.map((row) => `| ${row.join(' | ')} |`).join('\n');
  return [headerLine, sepLine, body].filter(Boolean).join('\n');
}

export function renderExperimentReport(comparison) {
  const { experiments, maxPrefixLength } = comparison;
  const names = Object.keys(experiments);

  const entropyHeaders = ['Prefix Length', ...names.map((name) => `${name} entropy`), ...names.map((name) => `${name} candidates`)];
  const entropyRows = [];
  for (let length = 1; length <= maxPrefixLength; length += 1) {
    const values = [String(length)];
    for (const name of names) {
      const row = rowByPrefix(experiments[name], length);
      values.push(row ? num(row.avgEntropy) : '-');
    }
    for (const name of names) {
      const row = rowByPrefix(experiments[name], length);
      values.push(row ? num(row.avgCandidateCount) : '-');
    }
    entropyRows.push(values);
  }

  const accuracyHeaders = ['Prefix Length'];
  for (const name of names) {
    accuracyHeaders.push(`${name} top1`);
    accuracyHeaders.push(`${name} top3`);
    accuracyHeaders.push(`${name} top5`);
  }

  const accuracyRows = [];
  for (let length = 1; length <= maxPrefixLength; length += 1) {
    const values = [String(length)];
    for (const name of names) {
      const row = rowByPrefix(experiments[name], length);
      values.push(row ? pct(row.accuracy.top1) : '-');
      values.push(row ? pct(row.accuracy.top3) : '-');
      values.push(row ? pct(row.accuracy.top5) : '-');
    }
    accuracyRows.push(values);
  }

  const v = experiments.voynich;
  const s = experiments.shuffled;
  const comparisonRows = [];
  if (v && s) {
    for (let length = 1; length <= maxPrefixLength; length += 1) {
      const vr = rowByPrefix(v, length);
      const sr = rowByPrefix(s, length);
      comparisonRows.push([
        String(length),
        vr ? num(vr.avgEntropy) : '-',
        sr ? num(sr.avgEntropy) : '-',
        vr ? pct(vr.accuracy.top1) : '-',
        sr ? pct(sr.accuracy.top1) : '-',
      ]);
    }
  }

  const sections = [
    '# Prefix Predictability Experiment Report',
    '',
    '## Prefix Length vs Entropy',
    buildMarkdownTable(entropyHeaders, entropyRows),
    '',
    '## Prefix Length vs Accuracy',
    buildMarkdownTable(accuracyHeaders, accuracyRows),
  ];

  if (comparisonRows.length > 0) {
    sections.push(
      '',
      '## Voynich vs Shuffled',
      buildMarkdownTable(
        ['Prefix Length', 'Voynich entropy', 'Shuffled entropy', 'Voynich top1', 'Shuffled top1'],
        comparisonRows,
      ),
    );
  }

  return sections.join('\n');
}

export function renderPositionAwareReport(positionExperiment) {
  const subsetNames = Object.keys(positionExperiment.subsets);
  const maxPrefixLength = positionExperiment.maxPrefixLength;

  const entropyRows = [];
  const candidateRows = [];
  const accuracyRows = [];

  for (let length = 1; length <= maxPrefixLength; length += 1) {
    const entropyLine = [String(length)];
    const candidateLine = [String(length)];
    const accuracyLine = [String(length)];

    for (const subsetName of subsetNames) {
      const row = rowByPrefix(positionExperiment.subsets[subsetName].experiment, length);
      entropyLine.push(row ? num(row.avgEntropy) : '-');
      candidateLine.push(row ? num(row.avgCandidateCount) : '-');
      accuracyLine.push(row ? pct(row.accuracy.top1) : '-');
      accuracyLine.push(row ? pct(row.accuracy.top3) : '-');
      accuracyLine.push(row ? pct(row.accuracy.top5) : '-');
    }

    entropyRows.push(entropyLine);
    candidateRows.push(candidateLine);
    accuracyRows.push(accuracyLine);
  }

  const entropyHeaders = ['Prefix Length', ...subsetNames.map((name) => `${name} entropy`)];
  const candidateHeaders = ['Prefix Length', ...subsetNames.map((name) => `${name} candidates`)];
  const accuracyHeaders = ['Prefix Length', ...subsetNames.flatMap((name) => [`${name} top1`, `${name} top3`, `${name} top5`])];

  return [
    '## Position-Aware Predictability',
    '',
    '### Prefix Length vs Entropy by Position',
    buildMarkdownTable(entropyHeaders, entropyRows),
    '',
    '### Prefix Length vs Candidate Count by Position',
    buildMarkdownTable(candidateHeaders, candidateRows),
    '',
    '### Prefix Length vs Top-k Accuracy by Position',
    buildMarkdownTable(accuracyHeaders, accuracyRows),
  ].join('\n');
}

export function renderEntropyLineChartSvg(comparison, options = {}) {
  const width = options.width ?? 760;
  const height = options.height ?? 280;
  const padding = 34;

  const { experiments, maxPrefixLength } = comparison;
  const names = Object.keys(experiments);
  const palette = ['#8a4f18', '#3366cc', '#cc5533', '#2a9d8f'];

  const allEntropy = [];
  for (const experiment of Object.values(experiments)) {
    for (const row of experiment.byPrefixLength) allEntropy.push(row.avgEntropy);
  }
  const maxEntropy = Math.max(1, ...allEntropy);

  const plotWidth = width - padding * 2;
  const plotHeight = height - padding * 2;

  function xForLength(length) {
    if (maxPrefixLength <= 1) return padding;
    return padding + ((length - 1) / (maxPrefixLength - 1)) * plotWidth;
  }

  function yForEntropy(entropy) {
    return padding + (1 - entropy / maxEntropy) * plotHeight;
  }

  const lines = names
    .map((name, idx) => {
      const exp = experiments[name];
      const points = exp.byPrefixLength
        .map((row) => `${xForLength(row.prefixLength)},${yForEntropy(row.avgEntropy)}`)
        .join(' ');
      return `<polyline fill="none" stroke="${palette[idx % palette.length]}" stroke-width="2" points="${points}" />`;
    })
    .join('\n');

  const legends = names
    .map(
      (name, idx) =>
        `<text x="${padding + idx * 160}" y="${height - 8}" fill="${palette[idx % palette.length]}" font-size="12">${name}</text>`,
    )
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect x="0" y="0" width="${width}" height="${height}" fill="#fffdf7"/>
  <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#666"/>
  <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="#666"/>
  ${lines}
  ${legends}
</svg>`;
}
