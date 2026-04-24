function normalizeEntries(rawEntries) {
  return rawEntries
    .map((entry) => (typeof entry === 'string' ? { token: entry } : entry))
    .filter((entry) => typeof entry?.token === 'string' && entry.token.trim().length > 0)
    .map((entry) => ({ ...entry, token: entry.token.trim() }));
}

function addCount(map, key, amount = 1) {
  map.set(key, (map.get(key) ?? 0) + amount);
}

function median(values) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 1) return sorted[mid];
  return (sorted[mid - 1] + sorted[mid]) / 2;
}

function mean(values) {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function buildPrefixFamilies(rawEntries, options = {}) {
  const entries = normalizeEntries(rawEntries);
  const minPrefixLength = options.minPrefixLength ?? 1;
  const maxPrefixLength = options.maxPrefixLength ?? 6;
  const topFamilyCount = options.topFamilyCount ?? 20;
  const topTokensPerFamily = options.topTokensPerFamily ?? 10;

  const tokenFrequency = new Map();
  for (const entry of entries) addCount(tokenFrequency, entry.token);

  const byPrefixLength = [];

  for (let prefixLength = minPrefixLength; prefixLength <= maxPrefixLength; prefixLength += 1) {
    const families = new Map();

    for (const [token, frequency] of tokenFrequency.entries()) {
      const prefix = token.slice(0, prefixLength);
      if (!families.has(prefix)) {
        families.set(prefix, {
          prefix,
          tokenFrequency: new Map(),
          totalFrequency: 0,
        });
      }

      const family = families.get(prefix);
      family.tokenFrequency.set(token, frequency);
      family.totalFrequency += frequency;
    }

    const familyRows = [...families.values()].map((family) => {
      const tokenRows = [...family.tokenFrequency.entries()]
        .map(([token, frequency]) => ({ token, frequency }))
        .sort((a, b) => {
          if (b.frequency !== a.frequency) return b.frequency - a.frequency;
          return a.token.localeCompare(b.token);
        });

      return {
        prefix: family.prefix,
        uniqueTokenCount: tokenRows.length,
        totalFrequency: family.totalFrequency,
        topTokens: tokenRows.slice(0, topTokensPerFamily),
      };
    });

    familyRows.sort((a, b) => {
      if (b.uniqueTokenCount !== a.uniqueTokenCount) return b.uniqueTokenCount - a.uniqueTokenCount;
      if (b.totalFrequency !== a.totalFrequency) return b.totalFrequency - a.totalFrequency;
      return a.prefix.localeCompare(b.prefix);
    });

    const sizes = familyRows.map((row) => row.uniqueTokenCount);
    byPrefixLength.push({
      prefixLength,
      familyCount: familyRows.length,
      meanFamilySize: mean(sizes),
      medianFamilySize: median(sizes),
      maxFamilySize: sizes.length > 0 ? Math.max(...sizes) : 0,
      topFamilies: familyRows.slice(0, topFamilyCount),
    });
  }

  return {
    uniqueTokenCount: tokenFrequency.size,
    byPrefixLength,
  };
}
