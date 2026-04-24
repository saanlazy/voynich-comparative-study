import { computeEntropy } from './core.js';

function normalizeEntries(rawEntries) {
  return rawEntries
    .map((entry) => (typeof entry === 'string' ? { token: entry } : entry))
    .filter((entry) => typeof entry?.token === 'string' && entry.token.trim().length > 0)
    .map((entry) => ({ ...entry, token: entry.token.trim() }));
}

function addCount(map, key, amount = 1) {
  map.set(key, (map.get(key) ?? 0) + amount);
}

function mapToSortedRows(map) {
  return [...map.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.label.localeCompare(b.label);
    });
}

function buildCouplingForLength(entries, n, options = {}) {
  const minTokenLength = Math.max(options.minTokenLength ?? 1, n * 2);
  const topCouplingCount = options.topCouplingCount ?? 30;
  const topDistItems = options.topDistItems ?? 10;

  const pairCounts = new Map();
  const prefixTotals = new Map();
  const suffixTotals = new Map();
  const prefixToSuffix = new Map();
  const suffixToPrefix = new Map();

  for (const entry of entries) {
    const token = entry.token;
    if (token.length < minTokenLength) continue;

    const prefix = token.slice(0, n);
    const suffix = token.slice(-n);
    const key = `${prefix}\u0000${suffix}`;

    addCount(pairCounts, key);
    addCount(prefixTotals, prefix);
    addCount(suffixTotals, suffix);

    if (!prefixToSuffix.has(prefix)) prefixToSuffix.set(prefix, new Map());
    if (!suffixToPrefix.has(suffix)) suffixToPrefix.set(suffix, new Map());

    addCount(prefixToSuffix.get(prefix), suffix);
    addCount(suffixToPrefix.get(suffix), prefix);
  }

  const pairs = [...pairCounts.entries()].map(([key, count]) => {
    const [prefix, suffix] = key.split('\u0000');
    const prefixTotal = prefixTotals.get(prefix) ?? 0;
    const suffixTotal = suffixTotals.get(suffix) ?? 0;

    return {
      prefix,
      suffix,
      count,
      prefixTotal,
      suffixTotal,
      pSuffixGivenPrefix: prefixTotal > 0 ? count / prefixTotal : 0,
      pPrefixGivenSuffix: suffixTotal > 0 ? count / suffixTotal : 0,
    };
  });

  pairs.sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    if (b.pSuffixGivenPrefix !== a.pSuffixGivenPrefix) return b.pSuffixGivenPrefix - a.pSuffixGivenPrefix;
    if (a.prefix !== b.prefix) return a.prefix.localeCompare(b.prefix);
    return a.suffix.localeCompare(b.suffix);
  });

  const prefixStats = [...prefixToSuffix.entries()].map(([prefix, suffixMap]) => {
    const distribution = mapToSortedRows(suffixMap);
    const entropy = computeEntropy(distribution.map((row) => ({ token: row.label, frequency: row.count })));
    const total = prefixTotals.get(prefix) ?? 0;

    return {
      prefix,
      total,
      suffixEntropy: entropy,
      topSuffixes: distribution.slice(0, topDistItems),
      selectivityScore: total / (1 + entropy),
    };
  });

  prefixStats.sort((a, b) => {
    if (b.selectivityScore !== a.selectivityScore) return b.selectivityScore - a.selectivityScore;
    if (b.total !== a.total) return b.total - a.total;
    return a.prefix.localeCompare(b.prefix);
  });

  const suffixStats = [...suffixToPrefix.entries()].map(([suffix, prefixMap]) => {
    const distribution = mapToSortedRows(prefixMap);
    const entropy = computeEntropy(distribution.map((row) => ({ token: row.label, frequency: row.count })));
    const total = suffixTotals.get(suffix) ?? 0;

    return {
      suffix,
      total,
      prefixEntropy: entropy,
      topPrefixes: distribution.slice(0, topDistItems),
      selectivityScore: total / (1 + entropy),
    };
  });

  suffixStats.sort((a, b) => {
    if (b.selectivityScore !== a.selectivityScore) return b.selectivityScore - a.selectivityScore;
    if (b.total !== a.total) return b.total - a.total;
    return a.suffix.localeCompare(b.suffix);
  });

  return {
    n,
    pairRows: pairs,
    topCouplings: pairs.slice(0, topCouplingCount),
    selectivePrefixes: prefixStats.slice(0, topCouplingCount),
    selectiveSuffixes: suffixStats.slice(0, topCouplingCount),
  };
}

export function analyzePrefixSuffixCoupling(rawEntries, options = {}) {
  const entries = normalizeEntries(rawEntries);
  return {
    char2: buildCouplingForLength(entries, 2, options),
    char3: buildCouplingForLength(entries, 3, options),
  };
}

export function exportCouplingCsv(coupling, n = 2) {
  const source = n === 3 ? coupling.char3 : coupling.char2;
  const headers = [
    'prefix',
    'suffix',
    'count',
    'prefix_total',
    'suffix_total',
    'p_suffix_given_prefix',
    'p_prefix_given_suffix',
  ];

  const rows = source.pairRows.map((row) => [
    row.prefix,
    row.suffix,
    String(row.count),
    String(row.prefixTotal),
    String(row.suffixTotal),
    row.pSuffixGivenPrefix.toFixed(8),
    row.pPrefixGivenSuffix.toFixed(8),
  ]);

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
}
