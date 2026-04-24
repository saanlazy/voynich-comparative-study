import { runPrefixPredictabilityExperiment, buildMarkdownTable } from './predictability-experiment.js';
import { runAmbiguityPersistence } from './advanced-research.js';

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

export function buildPrefixSuffixGenerator(rawEntries, options = {}) {
  const entries = normalizeEntries(rawEntries);
  const prefixLength = options.prefixLength ?? 2;
  const minPrefixFrequency = options.minPrefixFrequency ?? 1;
  const fallbackSuffixLength = options.fallbackSuffixLength ?? 2;

  const random = Number.isFinite(options.seed) ? mulberry32(options.seed) : Math.random;

  const prefixCounts = new Map();
  const suffixCountsByPrefix = new Map();
  const positionStatsByPrefix = new Map();

  for (const entry of entries) {
    if (entry.token.length < prefixLength) continue;

    const prefix = entry.token.slice(0, prefixLength);
    const suffix = entry.suffix || entry.token.slice(-Math.min(fallbackSuffixLength, entry.token.length));

    prefixCounts.set(prefix, (prefixCounts.get(prefix) ?? 0) + 1);

    if (!suffixCountsByPrefix.has(prefix)) suffixCountsByPrefix.set(prefix, new Map());
    const suffixMap = suffixCountsByPrefix.get(prefix);
    suffixMap.set(suffix, (suffixMap.get(suffix) ?? 0) + 1);

    if (!positionStatsByPrefix.has(prefix)) {
      positionStatsByPrefix.set(prefix, { total: 0, lineInitial: 0, lineFinal: 0, paragraphInitial: 0 });
    }
    const pos = positionStatsByPrefix.get(prefix);
    pos.total += 1;
    if (entry.lineInitial) pos.lineInitial += 1;
    if (entry.lineFinal) pos.lineFinal += 1;
    if (entry.paragraphInitial) pos.paragraphInitial += 1;
  }

  const allowedPrefixes = [...prefixCounts.entries()]
    .filter(([, count]) => count >= minPrefixFrequency)
    .map(([prefix, count]) => ({ value: prefix, weight: count }));

  const suffixRowsByPrefix = new Map();
  for (const [prefix, suffixMap] of suffixCountsByPrefix.entries()) {
    const rows = [...suffixMap.entries()].map(([suffix, count]) => ({ value: suffix, weight: count }));
    suffixRowsByPrefix.set(prefix, rows);
  }

  function samplePrefix() {
    return weightedSample(allowedPrefixes, random);
  }

  function sampleSuffix(prefix) {
    const rows = suffixRowsByPrefix.get(prefix) ?? [];
    if (rows.length === 0) return '';
    return weightedSample(rows, random);
  }

  function samplePosition(prefix) {
    const pos = positionStatsByPrefix.get(prefix);
    if (!pos || pos.total <= 0) {
      return { lineInitial: false, lineFinal: false, paragraphInitial: false };
    }

    return {
      lineInitial: random() < pos.lineInitial / pos.total,
      lineFinal: random() < pos.lineFinal / pos.total,
      paragraphInitial: random() < pos.paragraphInitial / pos.total,
    };
  }

  function generateToken() {
    const prefix = samplePrefix();
    const suffix = sampleSuffix(prefix);
    return `${prefix}${suffix}`;
  }

  function generateEntries(count) {
    const out = [];
    for (let i = 0; i < count; i += 1) {
      const prefix = samplePrefix();
      const suffix = sampleSuffix(prefix);
      const token = `${prefix}${suffix}`;
      out.push({ token, ...samplePosition(prefix) });
    }
    return out;
  }

  return {
    prefixLength,
    prefixCount: allowedPrefixes.length,
    samplePrefix,
    sampleSuffix,
    generateToken,
    generateEntries,
  };
}

export function compareGeneratedVsReal(rawEntries, options = {}) {
  const entries = normalizeEntries(rawEntries);
  const generator = buildPrefixSuffixGenerator(entries, options);
  const generatedEntries = generator.generateEntries(options.generatedCount ?? entries.length);

  const realPredictability = runPrefixPredictabilityExperiment(entries, { filterKey: 'ALL' });
  const generatedPredictability = runPrefixPredictabilityExperiment(generatedEntries, { filterKey: 'ALL' });

  const realAmbiguity = runAmbiguityPersistence(entries, { filterKey: 'ALL' });
  const generatedAmbiguity = runAmbiguityPersistence(generatedEntries, { filterKey: 'ALL' });

  return {
    config: {
      prefixLength: generator.prefixLength,
      generatedCount: generatedEntries.length,
    },
    real: {
      entries,
      predictability: realPredictability,
      ambiguity: realAmbiguity,
    },
    generated: {
      entries: generatedEntries,
      predictability: generatedPredictability,
      ambiguity: generatedAmbiguity,
    },
  };
}

function num(value) {
  return Number.isFinite(value) ? value.toFixed(4) : '0.0000';
}

function pct(value) {
  return `${(value * 100).toFixed(2)}%`;
}

function rowByPrefixLength(rows, length) {
  return rows.find((row) => row.prefixLength === length) ?? null;
}

export function renderGeneratedComparisonReport(comparison) {
  const maxPrefixLength = Math.max(
    ...comparison.real.predictability.byPrefixLength.map((row) => row.prefixLength),
    ...comparison.generated.predictability.byPrefixLength.map((row) => row.prefixLength),
  );

  const entropyRows = [];
  for (let length = 1; length <= maxPrefixLength; length += 1) {
    const real = rowByPrefixLength(comparison.real.predictability.byPrefixLength, length);
    const generated = rowByPrefixLength(comparison.generated.predictability.byPrefixLength, length);

    entropyRows.push([
      String(length),
      real ? num(real.avgEntropy) : '-',
      generated ? num(generated.avgEntropy) : '-',
      real ? num(real.avgCandidateCount) : '-',
      generated ? num(generated.avgCandidateCount) : '-',
      real ? pct(real.accuracy.top1) : '-',
      generated ? pct(generated.accuracy.top1) : '-',
    ]);
  }

  const ambiguityRows = [];
  const maxAmbiguityLength = Math.max(
    ...comparison.real.ambiguity.map((row) => row.prefixLength),
    ...comparison.generated.ambiguity.map((row) => row.prefixLength),
  );

  for (let length = 1; length <= maxAmbiguityLength; length += 1) {
    const real = rowByPrefixLength(comparison.real.ambiguity, length);
    const generated = rowByPrefixLength(comparison.generated.ambiguity, length);

    ambiguityRows.push([
      String(length),
      real ? pct(real.ambiguityRate) : '-',
      generated ? pct(generated.ambiguityRate) : '-',
      real ? num(real.avgAmbiguousCandidateCount) : '-',
      generated ? num(generated.avgAmbiguousCandidateCount) : '-',
      real ? pct(real.uniqueResolutionRate) : '-',
      generated ? pct(generated.uniqueResolutionRate) : '-',
    ]);
  }

  return [
    '# Generated vs Real Comparison',
    '',
    `- Generator prefix length: ${comparison.config.prefixLength}`,
    `- Generated tokens: ${comparison.config.generatedCount}`,
    '',
    '## Entropy Curve (and candidate count)',
    buildMarkdownTable(
      [
        'Prefix Length',
        'Real entropy',
        'Generated entropy',
        'Real candidates',
        'Generated candidates',
        'Real top1',
        'Generated top1',
      ],
      entropyRows,
    ),
    '',
    '## Ambiguity Persistence',
    buildMarkdownTable(
      [
        'Prefix Length',
        'Real ambiguity rate',
        'Generated ambiguity rate',
        'Real avg ambiguous candidates',
        'Generated avg ambiguous candidates',
        'Real unique resolution',
        'Generated unique resolution',
      ],
      ambiguityRows,
    ),
  ].join('\n');
}
