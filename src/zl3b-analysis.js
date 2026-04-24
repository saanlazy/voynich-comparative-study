function addCount(map, key, amount = 1) {
  if (!key) return;
  map.set(key, (map.get(key) ?? 0) + amount);
}

function toSortedRows(map) {
  return [...map.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.label.localeCompare(b.label);
    });
}

export function computeTokenFrequency(entries) {
  const freq = new Map();
  for (const entry of entries) {
    addCount(freq, entry.token);
  }
  return toSortedRows(freq);
}

export function computePrefixSuffixBreakdown(entries) {
  const prefixCounts = new Map();
  const suffixCounts = new Map();

  for (const entry of entries) {
    addCount(prefixCounts, entry.prefix || '(none)');
    addCount(suffixCounts, entry.suffix || '(none)');
  }

  return {
    prefixes: toSortedRows(prefixCounts),
    suffixes: toSortedRows(suffixCounts),
  };
}

export function detectRepeatedPatterns(lineTokens, { minLength = 2, maxLength = 3, minCount = 2 } = {}) {
  const counts = new Map();

  for (const line of lineTokens) {
    const tokens = line.tokens;
    for (let size = minLength; size <= maxLength; size += 1) {
      if (tokens.length < size) continue;

      for (let i = 0; i <= tokens.length - size; i += 1) {
        const seq = tokens.slice(i, i + size).join(' ');
        addCount(counts, seq);
      }
    }
  }

  return toSortedRows(counts).filter((row) => row.count >= minCount);
}

export function analyzeParsedDataset({ entries, lineTokens }) {
  const tokenFrequency = computeTokenFrequency(entries);
  const breakdown = computePrefixSuffixBreakdown(entries);
  const repeatedPatterns = detectRepeatedPatterns(lineTokens, {
    minLength: 2,
    maxLength: 3,
    minCount: 2,
  });

  return {
    tokenFrequency,
    repeatedPatterns,
    prefixBreakdown: breakdown.prefixes,
    suffixBreakdown: breakdown.suffixes,
  };
}
