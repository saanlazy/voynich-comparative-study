// Optional positional filters: if metadata is absent, only ALL will be meaningful.
const FILTERS = {
  ALL: () => true,
  LINE_INITIAL: (entry) => Boolean(entry.lineInitial),
  LINE_FINAL: (entry) => Boolean(entry.lineFinal),
  PARAGRAPH_INITIAL: (entry) => Boolean(entry.paragraphInitial),
};

function normalizeEntry(rawEntry) {
  if (typeof rawEntry === 'string') {
    return {
      token: rawEntry.trim(),
      lineInitial: false,
      lineFinal: false,
      paragraphInitial: false,
    };
  }

  return {
    token: String(rawEntry.token ?? '').trim(),
    lineInitial: Boolean(rawEntry.lineInitial),
    lineFinal: Boolean(rawEntry.lineFinal),
    paragraphInitial: Boolean(rawEntry.paragraphInitial),
  };
}

function addTokenFrequency(map, token) {
  map.set(token, (map.get(token) ?? 0) + 1);
}

export function buildPrefixIndex(frequencyMap) {
  const index = new Map();

  // Index every growing prefix so query lookup is O(1) by exact prefix string.
  for (const token of frequencyMap.keys()) {
    for (let i = 1; i <= token.length; i += 1) {
      const prefix = token.slice(0, i);
      if (!index.has(prefix)) index.set(prefix, []);
      index.get(prefix).push(token);
    }
  }

  return index;
}

export function buildSuffixIndex(frequencyMap) {
  const index = new Map();

  // Index every growing suffix so right-edge pattern matching avoids full scans.
  for (const token of frequencyMap.keys()) {
    for (let i = 1; i <= token.length; i += 1) {
      const suffix = token.slice(-i);
      if (!index.has(suffix)) index.set(suffix, []);
      index.get(suffix).push(token);
    }
  }

  return index;
}

function sortResultsByFrequency(results) {
  return results.sort((a, b) => {
    if (b.frequency !== a.frequency) return b.frequency - a.frequency;
    return a.token.localeCompare(b.token);
  });
}

function materializeResults(tokens, frequencyMap) {
  const rows = [];
  for (const token of tokens) {
    const frequency = frequencyMap.get(token);
    if (!frequency) continue;
    rows.push({ token, frequency });
  }
  return sortResultsByFrequency(rows);
}

export function searchPrefix(prefixIndex, frequencyMap, query) {
  if (!query) return materializeResults([...frequencyMap.keys()], frequencyMap);
  return materializeResults(prefixIndex.get(query) ?? [], frequencyMap);
}

export function searchSuffix(suffixIndex, frequencyMap, query) {
  if (!query) return materializeResults([...frequencyMap.keys()], frequencyMap);
  return materializeResults(suffixIndex.get(query) ?? [], frequencyMap);
}

export function searchContains(frequencyMap, query) {
  const rows = [];
  // MVP approach: simple full scan over unique tokens for substring mode.
  for (const [token, frequency] of frequencyMap.entries()) {
    if (!query || token.includes(query)) {
      rows.push({ token, frequency });
    }
  }
  return sortResultsByFrequency(rows);
}

export function computeEntropy(candidates) {
  // Shannon entropy over candidate probability distribution.
  const total = candidates.reduce((sum, item) => sum + item.frequency, 0);
  if (!total) return 0;

  let entropy = 0;
  for (const candidate of candidates) {
    const p = candidate.frequency / total;
    if (p > 0) entropy -= p * Math.log2(p);
  }

  return entropy;
}

export function computeMetrics(candidates) {
  const candidateCount = candidates.length;
  const totalFrequency = candidates.reduce((sum, item) => sum + item.frequency, 0);
  const entropy = computeEntropy(candidates);
  const top1Probability = totalFrequency > 0 ? (candidates[0]?.frequency ?? 0) / totalFrequency : 0;

  return {
    candidateCount,
    entropy,
    top1Probability,
    totalFrequency,
  };
}

function searchByMode(view, mode, query) {
  if (mode === 'PREFIX') return searchPrefix(view.prefixIndex, view.frequency, query);
  if (mode === 'SUFFIX') return searchSuffix(view.suffixIndex, view.frequency, query);
  return searchContains(view.frequency, query);
}

export function preprocessTokens(rawEntries) {
  const entries = rawEntries.map(normalizeEntry).filter((entry) => entry.token.length > 0);

  const views = new Map();
  for (const [filterKey, predicate] of Object.entries(FILTERS)) {
    const frequency = new Map();
    for (const entry of entries) {
      if (predicate(entry)) addTokenFrequency(frequency, entry.token);
    }

    views.set(filterKey, {
      frequency,
      prefixIndex: buildPrefixIndex(frequency),
      suffixIndex: buildSuffixIndex(frequency),
    });
  }

  return {
    entries,
    views,
  };
}

export function runSearch({ model, mode, query, filterKey }) {
  const view = model.views.get(filterKey) ?? model.views.get('ALL');
  const normalizedQuery = String(query ?? '').trim();

  const candidates = searchByMode(view, mode, normalizedQuery);
  const metrics = computeMetrics(candidates);
  const enriched = candidates.map((item, idx) => ({
    ...item,
    rank: idx + 1,
    probability: metrics.totalFrequency > 0 ? item.frequency / metrics.totalFrequency : 0,
  }));

  return {
    candidates: enriched,
    metrics,
  };
}

export function buildPredictabilitySeries({ model, mode, query, filterKey }) {
  const normalizedQuery = String(query ?? '').trim();
  const series = [];

  if (!normalizedQuery) {
    const { metrics } = runSearch({ model, mode, query: '', filterKey });
    series.push({ prefix: '', ...metrics });
    return series;
  }

  // Trace uncertainty shrinkage as the query grows one character at a time.
  for (let i = 1; i <= normalizedQuery.length; i += 1) {
    const partial = normalizedQuery.slice(0, i);
    const { metrics } = runSearch({ model, mode, query: partial, filterKey });
    series.push({ prefix: partial, ...metrics });
  }

  return series;
}

export function makeShuffledDataset(entries) {
  function shuffleToken(token) {
    const chars = token.split('');
    for (let i = chars.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join('');
  }

  return entries.map((entry) => {
    const normalized = normalizeEntry(entry);
    return {
      ...normalized,
      token: shuffleToken(normalized.token),
    };
  });
}
