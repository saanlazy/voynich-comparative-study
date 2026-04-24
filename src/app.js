import {
  preprocessTokens,
  runSearch,
  buildPredictabilitySeries,
  makeShuffledDataset,
} from './core.js';
import { parseZl3bText } from './zl3b-parser.js';
import { analyzeParsedDataset } from './zl3b-analysis.js';
import { runPositionAwarePredictabilityExperiment } from './predictability-experiment.js';
import {
  buildNamedPredictabilityExperiments,
  computeReductionSlopeBySeries,
  runAmbiguityPersistenceBySeries,
} from './advanced-research.js';
import {
  analyzePrefixSpecificPredictability,
  collectPrefixSpecificHighlights,
} from './prefix-specific-analysis.js';

const state = {
  datasets: {
    sample: null,
    zl3b: null,
    shuffled: null,
    upload: null,
  },
  analyses: {
    zl3b: null,
  },
  activeModel: null,
};

const els = {
  queryInput: document.getElementById('queryInput'),
  modeSelect: document.getElementById('modeSelect'),
  datasetSelect: document.getElementById('datasetSelect'),
  fileInput: document.getElementById('fileInput'),
  uploadContainer: document.getElementById('uploadContainer'),
  resultsBody: document.getElementById('resultsBody'),
  metricsPanel: document.getElementById('metricsPanel'),
  tracePanel: document.getElementById('tracePanel'),
  analysisPanel: document.getElementById('analysisPanel'),
};

function formatPercent(value) {
  return `${(value * 100).toFixed(2)}%`;
}

function formatEntropy(value) {
  return Number.isFinite(value) ? value.toFixed(4) : '0.0000';
}

function getFilterKey() {
  const selected = document.querySelector('input[name="position"]:checked');
  return selected?.value ?? 'ALL';
}

function renderMetrics({ metrics, predictabilityScore, datasetName }) {
  const cards = [
    { label: 'Candidate count', value: String(metrics.candidateCount) },
    { label: 'Entropy (bits)', value: formatEntropy(metrics.entropy) },
    { label: 'Top-1 probability', value: formatPercent(metrics.top1Probability) },
    { label: 'Predictability score', value: formatEntropy(predictabilityScore) },
    { label: 'Dataset', value: datasetName },
  ];

  els.metricsPanel.innerHTML = cards
    .map(
      (card) =>
        `<article class="metric"><div class="label">${card.label}</div><div class="value">${card.value}</div></article>`,
    )
    .join('');
}

function renderResults(candidates) {
  const top = candidates.slice(0, 20);

  if (top.length === 0) {
    els.resultsBody.innerHTML = '<tr><td colspan="4">No candidates found for this query.</td></tr>';
    return;
  }

  els.resultsBody.innerHTML = top
    .map(
      (row) => `
        <tr>
          <td>${row.rank}</td>
          <td><strong>${row.token}</strong></td>
          <td>${row.frequency}</td>
          <td>${formatPercent(row.probability)}</td>
        </tr>
      `,
    )
    .join('');
}

function renderTrace(series) {
  if (series.length === 0) {
    els.tracePanel.innerHTML = '<div class="trace-row"><div>n/a</div><div>n/a</div><div>n/a</div></div>';
    return;
  }

  els.tracePanel.innerHTML = series
    .map(
      (step) => `
        <div class="trace-row">
          <div><span class="tag">${step.prefix || '(empty)'}</span></div>
          <div>count: ${step.candidateCount}</div>
          <div>entropy: ${formatEntropy(step.entropy)}</div>
        </div>
      `,
    )
    .join('');
}

function derivePredictabilityScore(series) {
  if (series.length <= 1) return 0;
  const start = series[0].entropy;
  const end = series[series.length - 1].entropy;
  return Math.max(0, start - end);
}

function activeDatasetLabel() {
  const key = els.datasetSelect.value;
  if (key === 'sample') return 'Sample EVA';
  if (key === 'zl3b') return 'Voynich ZL3b';
  if (key === 'shuffled') return 'Shuffled baseline';
  return 'Uploaded dataset';
}

function renderAnalysis() {
  const key = els.datasetSelect.value;
  const analysis = state.analyses[key];

  if (!analysis) {
    els.analysisPanel.innerHTML = 'No structural stats for this dataset.';
    return;
  }

  const strongestDrop = analysis.researchSummary.strongestEntropyDrop;
  const ambiguityThreshold = analysis.researchSummary.ambiguityBelow50PrefixLength;
  const largestFamilies = analysis.researchSummary.topLargestFamilies;
  const biasedFamilies = analysis.researchSummary.topPositionBiasedFamilies;

  els.analysisPanel.innerHTML = `
    <div class="trace-row"><div><strong>Strongest entropy drop</strong></div><div>${strongestDrop?.transition ?? 'n/a'}</div><div>ΔH=${formatEntropy(strongestDrop?.deltaEntropy ?? 0)}</div></div>
    <div class="trace-row"><div><strong>Ambiguity &lt; 50% point</strong></div><div>prefix length</div><div>${ambiguityThreshold ?? 'not reached'}</div></div>
    <div class="trace-row"><div><strong>Top 5 largest prefix families</strong></div><div></div><div></div></div>
    ${largestFamilies
      .map(
        (item) =>
          `<div class="trace-row"><div>L${item.prefixLength}:${item.prefix}</div><div>types:${item.uniqueTokenCount}</div><div>freq:${item.totalFrequency}</div></div>`,
      )
      .join('')}
    <div class="trace-row"><div><strong>Top 5 position-biased families</strong></div><div></div><div></div></div>
    ${biasedFamilies
      .map(
        (item) =>
          `<div class="trace-row"><div>L${item.prefixLength}:${item.prefix}</div><div>para:${formatPercent(item.paragraphInitialRate)}</div><div>final:${formatPercent(item.lineFinalRate)}</div></div>`,
      )
      .join('')}
  `;
}

function renderAll() {
  if (!state.activeModel) return;

  const mode = els.modeSelect.value;
  const query = els.queryInput.value.trim();
  const filterKey = getFilterKey();

  const search = runSearch({
    model: state.activeModel,
    mode,
    query,
    filterKey,
  });

  const series = buildPredictabilitySeries({
    model: state.activeModel,
    mode,
    query,
    filterKey,
  });

  renderResults(search.candidates);
  renderTrace(series);
  renderMetrics({
    metrics: search.metrics,
    predictabilityScore: derivePredictabilityScore(series),
    datasetName: activeDatasetLabel(),
  });
  renderAnalysis();
}

function parseTextTokens(rawText) {
  return rawText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((token) => ({ token }));
}

function parseJsonTokens(rawJson) {
  const parsed = JSON.parse(rawJson);
  if (Array.isArray(parsed)) {
    return parsed;
  }
  if (Array.isArray(parsed.entries)) {
    return parsed.entries;
  }
  if (Array.isArray(parsed.tokens)) {
    return parsed.tokens;
  }
  throw new Error('JSON must be an array or include entries/tokens array.');
}

function activateDataset(key) {
  const model = state.datasets[key];
  if (!model) return;
  state.activeModel = model;
  renderAll();
}

async function loadSampleDataset() {
  const response = await fetch('./data/sample-eva-tokens.json');
  if (!response.ok) {
    throw new Error(`Dataset load failed: ${response.status}`);
  }

  const payload = await response.json();
  const entries = Array.isArray(payload.entries) ? payload.entries : payload;
  state.datasets.sample = preprocessTokens(entries);
  state.datasets.shuffled = preprocessTokens(makeShuffledDataset(entries));
}

async function loadZl3bDataset() {
  const response = await fetch('./ZL3b-n.txt');
  if (!response.ok) {
    throw new Error(`ZL3b load failed: ${response.status}`);
  }

  const rawText = await response.text();
  const parsed = parseZl3bText(rawText);
  state.datasets.zl3b = preprocessTokens(parsed.entries);
  const namedExperiments = buildNamedPredictabilityExperiments(parsed.entries, { includeReversed: true });
  const slopes = computeReductionSlopeBySeries(namedExperiments);
  const ambiguity = runAmbiguityPersistenceBySeries(parsed.entries, { includeReversed: true });
  const prefixSpecific = analyzePrefixSpecificPredictability(parsed.entries, {
    minPrefixLength: 1,
    maxPrefixLength: 4,
    topN: 20,
  });
  const highlights = collectPrefixSpecificHighlights(prefixSpecific, 5);
  const strongestEntropyDrop =
    (slopes.voynich_all ?? [])
      .slice()
      .sort((a, b) => b.deltaEntropy - a.deltaEntropy)[0] ?? null;
  const ambiguityBelow50PrefixLength =
    (ambiguity.voynich_all ?? []).find((row) => row.ambiguityRate < 0.5)?.prefixLength ?? null;

  state.analyses.zl3b = {
    structural: analyzeParsedDataset(parsed),
    positionAware: runPositionAwarePredictabilityExperiment(parsed.entries),
    researchSummary: {
      strongestEntropyDrop,
      ambiguityBelow50PrefixLength,
      topLargestFamilies: highlights.largestFamilies,
      topPositionBiasedFamilies: highlights.positionBiasedFamilies,
    },
  };
}

async function loadBuiltInDatasets() {
  await Promise.all([loadSampleDataset(), loadZl3bDataset()]);
  activateDataset('sample');
}

function bindEvents() {
  els.queryInput.addEventListener('input', renderAll);
  els.modeSelect.addEventListener('change', renderAll);

  document.querySelectorAll('input[name="position"]').forEach((radio) => {
    radio.addEventListener('change', renderAll);
  });

  els.datasetSelect.addEventListener('change', () => {
    const key = els.datasetSelect.value;
    els.uploadContainer.hidden = key !== 'upload';

    if (key === 'upload') {
      if (state.datasets.upload) activateDataset('upload');
      return;
    }

    activateDataset(key);
  });

  els.fileInput.addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const entries = file.name.toLowerCase().endsWith('.json')
      ? parseJsonTokens(text)
      : parseTextTokens(text);

    state.datasets.upload = preprocessTokens(entries);
    state.analyses.upload = null;
    activateDataset('upload');
  });
}

async function init() {
  bindEvents();
  await loadBuiltInDatasets();
}

init().catch((error) => {
  els.metricsPanel.innerHTML = `<article class="metric"><div class="label">Error</div><div class="value">${error.message}</div></article>`;
});
