import { computeEntropy } from './core.js';

function normalizeEntries(rawEntries) {
  return rawEntries
    .map((entry) => (typeof entry === 'string' ? { token: entry } : entry))
    .filter((entry) => typeof entry?.token === 'string' && entry.token.trim().length > 0)
    .map((entry) => ({ ...entry, token: entry.token.trim() }));
}

function familyRowsForLength(entries, prefixLength) {
  const families = new Map();

  for (const entry of entries) {
    const prefix = entry.token.slice(0, prefixLength);
    if (!families.has(prefix)) {
      families.set(prefix, {
        prefix,
        totalFrequency: 0,
        tokenFrequency: new Map(),
        suffixFrequency: new Map(),
        tokenLengthSum: 0,
        lineInitialCount: 0,
        paragraphInitialCount: 0,
        lineFinalCount: 0,
      });
    }

    const family = families.get(prefix);
    family.totalFrequency += 1;
    family.tokenLengthSum += entry.token.length;
    family.tokenFrequency.set(entry.token, (family.tokenFrequency.get(entry.token) ?? 0) + 1);
    const suffix = entry.suffix || entry.token.slice(-Math.min(2, entry.token.length));
    family.suffixFrequency.set(suffix, (family.suffixFrequency.get(suffix) ?? 0) + 1);
    if (entry.lineInitial) family.lineInitialCount += 1;
    if (entry.paragraphInitial) family.paragraphInitialCount += 1;
    if (entry.lineFinal) family.lineFinalCount += 1;
  }

  return [...families.values()].map((family) => {
    const tokenRows = [...family.tokenFrequency.entries()]
      .map(([token, frequency]) => ({ token, frequency }))
      .sort((a, b) => {
        if (b.frequency !== a.frequency) return b.frequency - a.frequency;
        return a.token.localeCompare(b.token);
      });

    const tokenEntropy = computeEntropy(tokenRows.map((item) => ({ token: item.token, frequency: item.frequency })));
    const topToken = tokenRows[0] ?? { token: '', frequency: 0 };
    const suffixRows = [...family.suffixFrequency.entries()]
      .map(([suffix, count]) => ({ suffix, count }))
      .sort((a, b) => {
        if (b.count !== a.count) return b.count - a.count;
        return a.suffix.localeCompare(b.suffix);
      });

    return {
      prefix: family.prefix,
      totalFrequency: family.totalFrequency,
      uniqueTokenCount: tokenRows.length,
      tokenEntropy,
      topToken: topToken.token,
      topTokenProbability: family.totalFrequency > 0 ? topToken.frequency / family.totalFrequency : 0,
      topTokens: tokenRows.slice(0, 5),
      avgTokenLength: family.totalFrequency > 0 ? family.tokenLengthSum / family.totalFrequency : 0,
      lineInitialRate: family.totalFrequency > 0 ? family.lineInitialCount / family.totalFrequency : 0,
      paragraphInitialRate: family.totalFrequency > 0 ? family.paragraphInitialCount / family.totalFrequency : 0,
      lineFinalRate: family.totalFrequency > 0 ? family.lineFinalCount / family.totalFrequency : 0,
      suffixDistribution: suffixRows.map((row) => ({
        suffix: row.suffix,
        count: row.count,
        probability: family.totalFrequency > 0 ? row.count / family.totalFrequency : 0,
      })),
      concentrationScore: family.totalFrequency / (1 + tokenEntropy),
      positionBiasScore:
        Math.max(
          family.totalFrequency > 0 ? family.paragraphInitialCount / family.totalFrequency : 0,
          family.totalFrequency > 0 ? family.lineFinalCount / family.totalFrequency : 0,
        ) * family.totalFrequency,
    };
  });
}

function rankLargest(rows, topN) {
  return [...rows]
    .sort((a, b) => {
      if (b.uniqueTokenCount !== a.uniqueTokenCount) return b.uniqueTokenCount - a.uniqueTokenCount;
      if (b.totalFrequency !== a.totalFrequency) return b.totalFrequency - a.totalFrequency;
      return a.prefix.localeCompare(b.prefix);
    })
    .slice(0, topN);
}

function rankConcentrated(rows, topN) {
  return [...rows]
    .sort((a, b) => {
      if (b.concentrationScore !== a.concentrationScore) return b.concentrationScore - a.concentrationScore;
      if (b.totalFrequency !== a.totalFrequency) return b.totalFrequency - a.totalFrequency;
      return a.prefix.localeCompare(b.prefix);
    })
    .slice(0, topN);
}

function rankPositionBiased(rows, topN) {
  return [...rows]
    .sort((a, b) => {
      if (b.positionBiasScore !== a.positionBiasScore) return b.positionBiasScore - a.positionBiasScore;
      if (b.paragraphInitialRate !== a.paragraphInitialRate) return b.paragraphInitialRate - a.paragraphInitialRate;
      if (b.lineFinalRate !== a.lineFinalRate) return b.lineFinalRate - a.lineFinalRate;
      return a.prefix.localeCompare(b.prefix);
    })
    .slice(0, topN);
}

export function analyzePrefixSpecificPredictability(rawEntries, options = {}) {
  const entries = normalizeEntries(rawEntries);
  const minPrefixLength = options.minPrefixLength ?? 1;
  const maxPrefixLength = options.maxPrefixLength ?? 4;
  const topN = options.topN ?? 20;

  const byPrefixLength = [];
  for (let prefixLength = minPrefixLength; prefixLength <= maxPrefixLength; prefixLength += 1) {
    const rows = familyRowsForLength(entries, prefixLength);

    byPrefixLength.push({
      prefixLength,
      largestFamilies: rankLargest(rows, topN),
      concentratedFamilies: rankConcentrated(rows, topN),
      positionBiasedFamilies: rankPositionBiased(rows, topN),
    });
  }

  return {
    byPrefixLength,
  };
}

export function computeFilteredPositionBiasRanking(rawEntries, options = {}) {
  const entries = normalizeEntries(rawEntries);
  const prefixLengths = options.prefixLengths ?? [2, 3];
  const minTotalFrequency = options.minTotalFrequency ?? 50;
  const topN = options.topN ?? 20;
  const suffixTopN = options.suffixTopN ?? 8;

  const merged = [];

  for (const prefixLength of prefixLengths) {
    const rows = familyRowsForLength(entries, prefixLength);
    for (const row of rows) {
      if (row.totalFrequency < minTotalFrequency) continue;

      const positionBias = Math.max(row.paragraphInitialRate, row.lineInitialRate, row.lineFinalRate);

      merged.push({
        ...row,
        prefixLength,
        positionBias,
        suffixDistribution: row.suffixDistribution.slice(0, suffixTopN),
      });
    }
  }

  merged.sort((a, b) => {
    if (b.positionBias !== a.positionBias) return b.positionBias - a.positionBias;
    if (b.totalFrequency !== a.totalFrequency) return b.totalFrequency - a.totalFrequency;
    if (b.tokenEntropy !== a.tokenEntropy) return b.tokenEntropy - a.tokenEntropy;
    return a.prefix.localeCompare(b.prefix);
  });

  return merged.slice(0, topN);
}

export function collectPrefixSpecificHighlights(prefixSpecific, topN = 5) {
  const allLargest = [];
  const allBiased = [];

  for (const section of prefixSpecific.byPrefixLength) {
    for (const row of section.largestFamilies) allLargest.push({ ...row, prefixLength: section.prefixLength });
    for (const row of section.positionBiasedFamilies) allBiased.push({ ...row, prefixLength: section.prefixLength });
  }

  allLargest.sort((a, b) => {
    if (b.uniqueTokenCount !== a.uniqueTokenCount) return b.uniqueTokenCount - a.uniqueTokenCount;
    if (b.totalFrequency !== a.totalFrequency) return b.totalFrequency - a.totalFrequency;
    return a.prefix.localeCompare(b.prefix);
  });

  allBiased.sort((a, b) => {
    if (b.positionBiasScore !== a.positionBiasScore) return b.positionBiasScore - a.positionBiasScore;
    if (b.paragraphInitialRate !== a.paragraphInitialRate) return b.paragraphInitialRate - a.paragraphInitialRate;
    if (b.lineFinalRate !== a.lineFinalRate) return b.lineFinalRate - a.lineFinalRate;
    return a.prefix.localeCompare(b.prefix);
  });

  return {
    largestFamilies: allLargest.slice(0, topN),
    positionBiasedFamilies: allBiased.slice(0, topN),
  };
}
