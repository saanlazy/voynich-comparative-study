import fs from 'node:fs';
import path from 'node:path';

import { parseZl3bText } from './zl3b-parser.js';
import { analyzeParsedDataset } from './zl3b-analysis.js';
import {
  runBaselineComparison,
  runPositionAwarePredictabilityExperiment,
  buildMarkdownTable,
  renderPositionAwareReport,
} from './predictability-experiment.js';
import { buildPrefixFamilies } from './prefix-family-analysis.js';
import { analyzePrefixSuffixCoupling, exportCouplingCsv } from './prefix-suffix-coupling.js';
import {
  buildNamedPredictabilityExperiments,
  computeReductionSlopeBySeries,
  runAmbiguityPersistenceBySeries,
  runLengthControlledPredictability,
} from './advanced-research.js';
import {
  analyzePrefixSpecificPredictability,
  computeFilteredPositionBiasRanking,
} from './prefix-specific-analysis.js';
import { loadTranscriptionFile } from './transcription-normalization.js';
import {
  compareDatasets,
  renderMultiTranscriptionComparison,
} from './multi-transcription-validation.js';
import {
  runNormalizationRobustness,
  renderNormalizationRobustness,
} from './normalization-robustness.js';
import { runNullModelComparison, renderNullModelComparison } from './null-models.js';
import {
  loadComparisonDatasets,
  runCrossDatasetComparison,
  renderCrossDatasetComparison,
} from './cross-dataset-comparison.js';
import {
  runSizeMatchedBootstrap,
  runPermutationSignificance,
  renderSizeMatchedSection,
  renderSignificanceSection,
  renderFinalRobustnessSummary,
} from './size-matched-significance.js';

function fmtNum(value) {
  return Number.isFinite(value) ? value.toFixed(4) : '0.0000';
}

function fmtPct(value) {
  return `${(value * 100).toFixed(2)}%`;
}

function rowByLength(experiment, length) {
  return experiment.byPrefixLength.find((row) => row.prefixLength === length) ?? null;
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const inputPath = args[0] ?? path.resolve(process.cwd(), 'ZL3b-n.txt');
  let couplingCsvPath = null;
  let couplingN = 2;
  let prefixSpecificJsonPath = null;
  let comparePath = null;
  let normalizeMode = null;
  const compareDatasetPaths = [];
  let sizeMatched = false;
  let permutations = 1000;

  for (let i = 1; i < args.length; i += 1) {
    if (args[i] === '--coupling-csv') {
      couplingCsvPath = args[i + 1] ?? null;
      i += 1;
      continue;
    }
    if (args[i] === '--coupling-n') {
      const n = Number(args[i + 1]);
      if (n === 2 || n === 3) couplingN = n;
      i += 1;
      continue;
    }
    if (args[i] === '--prefix-json') {
      prefixSpecificJsonPath = args[i + 1] ?? null;
      i += 1;
      continue;
    }
    if (args[i] === '--compare') {
      comparePath = args[i + 1] ?? null;
      i += 1;
      continue;
    }
    if (args[i] === '--normalize') {
      normalizeMode = args[i + 1] ?? null;
      i += 1;
      continue;
    }
    if (args[i] === '--compare-datasets') {
      for (let j = i + 1; j < args.length; j += 1) {
        const token = args[j];
        if (token.startsWith('--')) break;
        compareDatasetPaths.push(token);
        i = j;
      }
      continue;
    }
    if (args[i] === '--size-matched') {
      sizeMatched = true;
      continue;
    }
    if (args[i] === '--permutations') {
      const v = Number(args[i + 1]);
      if (Number.isFinite(v) && v > 0) permutations = Math.floor(v);
      i += 1;
    }
  }

  return { inputPath, couplingCsvPath, couplingN, prefixSpecificJsonPath, comparePath, normalizeMode, compareDatasetPaths, sizeMatched, permutations };
}

function renderCorpusSummary(parsed, analysis) {
  const topTokens = analysis.tokenFrequency.slice(0, 20);
  const topPatterns = analysis.repeatedPatterns.slice(0, 20);

  return [
    '## 1. Corpus Summary',
    '',
    `- Parsed entries: ${parsed.entries.length}`,
    `- Unique tokens: ${analysis.tokenFrequency.length}`,
    '',
    '### Top Tokens',
    buildMarkdownTable(
      ['Token', 'Frequency'],
      topTokens.map((row) => [row.label, String(row.count)]),
    ),
    '',
    '### Top Repeated Patterns',
    buildMarkdownTable(
      ['Pattern', 'Count'],
      topPatterns.map((row) => [row.label, String(row.count)]),
    ),
  ].join('\n');
}

function renderGeneralPredictabilitySection(baseline) {
  const names = Object.keys(baseline.experiments);
  const headers = ['Prefix Length'];
  for (const name of names) {
    headers.push(`${name} entropy`);
    headers.push(`${name} candidates`);
    headers.push(`${name} top1`);
    headers.push(`${name} top3`);
    headers.push(`${name} top5`);
  }

  const rows = [];
  for (let length = 1; length <= baseline.maxPrefixLength; length += 1) {
    const values = [String(length)];
    for (const name of names) {
      const row = rowByLength(baseline.experiments[name], length);
      values.push(row ? fmtNum(row.avgEntropy) : '-');
      values.push(row ? fmtNum(row.avgCandidateCount) : '-');
      values.push(row ? fmtPct(row.accuracy.top1) : '-');
      values.push(row ? fmtPct(row.accuracy.top3) : '-');
      values.push(row ? fmtPct(row.accuracy.top5) : '-');
    }
    rows.push(values);
  }

  return ['## 2. General Predictability Experiment', buildMarkdownTable(headers, rows)].join('\n\n');
}

function renderPrefixFamilySection(familyAnalysis) {
  const summaryRows = familyAnalysis.byPrefixLength.map((row) => [
    String(row.prefixLength),
    String(row.familyCount),
    fmtNum(row.meanFamilySize),
    fmtNum(row.medianFamilySize),
    String(row.maxFamilySize),
  ]);

  const blocks = [
    '## 4. Prefix Family Size Distribution',
    buildMarkdownTable(
      ['Prefix Length', 'Family Count', 'Mean Family Size', 'Median Family Size', 'Max Family Size'],
      summaryRows,
    ),
  ];

  for (const row of familyAnalysis.byPrefixLength) {
    const topRows = row.topFamilies.map((family) => [
      family.prefix,
      String(family.uniqueTokenCount),
      String(family.totalFrequency),
      family.topTokens.map((tokenRow) => `${tokenRow.token}:${tokenRow.frequency}`).join(', '),
    ]);

    blocks.push(`### Prefix Length ${row.prefixLength} Top Families`);
    blocks.push(buildMarkdownTable(['Prefix', 'Unique Token Count', 'Total Frequency', 'Top Tokens'], topRows));
  }

  return blocks.join('\n\n');
}

function renderSlopeSection(slopes) {
  const blocks = ['## 5. Entropy and Candidate Reduction Slope'];

  for (const [seriesName, rows] of Object.entries(slopes)) {
    const tableRows = rows.map((row) => [
      row.transition,
      fmtNum(row.deltaEntropy),
      fmtPct(row.relativeEntropyReduction),
      fmtNum(row.deltaCandidateCount),
      fmtPct(row.relativeCandidateReduction),
    ]);

    blocks.push(`### ${seriesName}`);
    blocks.push(
      buildMarkdownTable(
        [
          'Prefix Transition',
          'delta_entropy',
          'relative_entropy_reduction',
          'delta_candidate_count',
          'relative_candidate_reduction',
        ],
        tableRows,
      ),
    );
  }

  return blocks.join('\n\n');
}

function renderAmbiguitySection(ambiguityBySeries) {
  const blocks = ['## 6. Ambiguity Persistence'];

  for (const [seriesName, rows] of Object.entries(ambiguityBySeries)) {
    blocks.push(`### ${seriesName}`);
    blocks.push(
      buildMarkdownTable(
        [
          'prefix_length',
          'total_evaluated',
          'unique_resolution_rate',
          'ambiguity_rate',
          'avg_ambiguous_candidate_count',
          'median_ambiguous_candidate_count',
        ],
        rows.map((row) => [
          String(row.prefixLength),
          String(row.totalEvaluated),
          fmtPct(row.uniqueResolutionRate),
          fmtPct(row.ambiguityRate),
          fmtNum(row.avgAmbiguousCandidateCount),
          fmtNum(row.medianAmbiguousCandidateCount),
        ]),
      ),
    );
  }

  return blocks.join('\n\n');
}

function renderPrefixSpecificSection(prefixSpecific) {
  const blocks = ['## 7. Prefix-Specific Predictability'];

  for (const section of prefixSpecific.byPrefixLength) {
    const baseCols = [
      'prefix',
      'total_frequency',
      'unique_token_count',
      'entropy',
      'top_token',
      'top_token_probability',
      'avg_token_length',
      'lineInitial_rate',
      'paragraphInitial_rate',
      'lineFinal_rate',
      'top5_tokens',
    ];

    function rowsOf(list) {
      return list.slice(0, 20).map((row) => [
        row.prefix,
        String(row.totalFrequency),
        String(row.uniqueTokenCount),
        fmtNum(row.tokenEntropy),
        row.topToken,
        fmtPct(row.topTokenProbability),
        fmtNum(row.avgTokenLength),
        fmtPct(row.lineInitialRate),
        fmtPct(row.paragraphInitialRate),
        fmtPct(row.lineFinalRate),
        row.topTokens.map((tokenRow) => `${tokenRow.token}:${tokenRow.frequency}`).join(', '),
      ]);
    }

    blocks.push(`### Prefix Length ${section.prefixLength} - Largest Families`);
    blocks.push(buildMarkdownTable(baseCols, rowsOf(section.largestFamilies)));

    blocks.push(`### Prefix Length ${section.prefixLength} - Most Concentrated Families`);
    blocks.push(buildMarkdownTable(baseCols, rowsOf(section.concentratedFamilies)));

    blocks.push(`### Prefix Length ${section.prefixLength} - Most Position-Biased Families`);
    blocks.push(buildMarkdownTable(baseCols, rowsOf(section.positionBiasedFamilies)));
  }

  return blocks.join('\n\n');
}

function renderFilteredPositionBiasSection(filteredPositionBias) {
  return [
    '### Filtered Position Bias Ranking (Prefix Length 2-3, Total Frequency >= 50)',
    buildMarkdownTable(
      [
        'rank',
        'prefix',
        'prefix_length',
        'total_frequency',
        'unique_token_count',
        'family_entropy',
        'position_bias',
        'paragraph_initial',
        'line_initial',
        'line_final',
        'P(suffix|prefix) top',
      ],
      filteredPositionBias.map((row, idx) => [
        String(idx + 1),
        row.prefix,
        String(row.prefixLength),
        String(row.totalFrequency),
        String(row.uniqueTokenCount),
        fmtNum(row.tokenEntropy),
        fmtPct(row.positionBias),
        fmtPct(row.paragraphInitialRate),
        fmtPct(row.lineInitialRate),
        fmtPct(row.lineFinalRate),
        row.suffixDistribution
          .map((item) => `${item.suffix}:${item.count} (${fmtPct(item.probability)})`)
          .join(', '),
      ]),
    ),
  ].join('\n\n');
}

function renderLengthControlledSection(lengthControlled) {
  const blocks = ['## 8. Length-Controlled Predictability'];

  for (const [datasetName, bucketMap] of Object.entries(lengthControlled)) {
    const entropyRows = [];
    const accuracyRows = [];
    const ambiguityRows = [];

    const maxPrefixLength = Math.max(
      0,
      ...Object.values(bucketMap).map((bucket) =>
        Math.max(0, ...bucket.predictability.byPrefixLength.map((row) => row.prefixLength)),
      ),
    );

    for (let length = 1; length <= maxPrefixLength; length += 1) {
      const ent = [String(length)];
      const acc = [String(length)];
      const amb = [String(length)];

      for (const bucket of ['short', 'medium', 'long']) {
        const pRow = bucketMap[bucket].predictability.byPrefixLength.find((row) => row.prefixLength === length);
        const aRow = bucketMap[bucket].ambiguity.find((row) => row.prefixLength === length);

        ent.push(pRow ? fmtNum(pRow.avgEntropy) : '-');
        ent.push(pRow ? fmtNum(pRow.avgCandidateCount) : '-');

        acc.push(pRow ? fmtPct(pRow.accuracy.top1) : '-');
        acc.push(pRow ? fmtPct(pRow.accuracy.top3) : '-');
        acc.push(pRow ? fmtPct(pRow.accuracy.top5) : '-');

        amb.push(aRow ? fmtPct(aRow.uniqueResolutionRate) : '-');
        amb.push(aRow ? fmtPct(aRow.ambiguityRate) : '-');
      }

      entropyRows.push(ent);
      accuracyRows.push(acc);
      ambiguityRows.push(amb);
    }

    blocks.push(`### Dataset: ${datasetName}`);
    blocks.push(
      buildMarkdownTable(
        [
          'prefix_length',
          'short_entropy',
          'short_candidates',
          'medium_entropy',
          'medium_candidates',
          'long_entropy',
          'long_candidates',
        ],
        entropyRows,
      ),
    );

    blocks.push(
      buildMarkdownTable(
        [
          'prefix_length',
          'short_top1',
          'short_top3',
          'short_top5',
          'medium_top1',
          'medium_top3',
          'medium_top5',
          'long_top1',
          'long_top3',
          'long_top5',
        ],
        accuracyRows,
      ),
    );

    blocks.push(
      buildMarkdownTable(
        [
          'prefix_length',
          'short_unique_resolution',
          'short_ambiguity',
          'medium_unique_resolution',
          'medium_ambiguity',
          'long_unique_resolution',
          'long_ambiguity',
        ],
        ambiguityRows,
      ),
    );
  }

  return blocks.join('\n\n');
}

function renderCouplingChunk(chunk, title) {
  return [
    `### ${title}`,
    'Top 30 strongest prefix→suffix couplings',
    buildMarkdownTable(
      ['prefix', 'suffix', 'count', 'p(suffix|prefix)', 'p(prefix|suffix)'],
      chunk.topCouplings.map((row) => [
        row.prefix,
        row.suffix,
        String(row.count),
        fmtNum(row.pSuffixGivenPrefix),
        fmtNum(row.pPrefixGivenSuffix),
      ]),
    ),
    'Top 30 most selective prefixes (high frequency + low suffix entropy)',
    buildMarkdownTable(
      ['prefix', 'total', 'suffix_entropy', 'top_suffixes'],
      chunk.selectivePrefixes.map((row) => [
        row.prefix,
        String(row.total),
        fmtNum(row.suffixEntropy),
        row.topSuffixes.map((item) => `${item.label}:${item.count}`).join(', '),
      ]),
    ),
    'Top 30 most selective suffixes (high frequency + low prefix entropy)',
    buildMarkdownTable(
      ['suffix', 'total', 'prefix_entropy', 'top_prefixes'],
      chunk.selectiveSuffixes.map((row) => [
        row.suffix,
        String(row.total),
        fmtNum(row.prefixEntropy),
        row.topPrefixes.map((item) => `${item.label}:${item.count}`).join(', '),
      ]),
    ),
  ].join('\n\n');
}

function renderCouplingSection(coupling) {
  return [
    '## 9. Prefix-Suffix Coupling',
    renderCouplingChunk(coupling.char2, '2-char Prefix -> 2-char Suffix'),
    renderCouplingChunk(coupling.char3, '3-char Prefix -> 3-char Suffix'),
  ].join('\n\n');
}

const { inputPath, couplingCsvPath, couplingN, prefixSpecificJsonPath, comparePath, normalizeMode, compareDatasetPaths, sizeMatched, permutations } = parseArgs(process.argv);
const raw = fs.readFileSync(inputPath, 'utf8');

const parsed = parseZl3bText(raw);
const analysis = analyzeParsedDataset(parsed);

const baseline = runBaselineComparison(parsed.entries, { includeReversed: true });
const positionAware = runPositionAwarePredictabilityExperiment(parsed.entries);
const familyAnalysis = buildPrefixFamilies(parsed.entries, {
  minPrefixLength: 1,
  maxPrefixLength: 6,
  topFamilyCount: 20,
  topTokensPerFamily: 10,
});
const namedExperiments = buildNamedPredictabilityExperiments(parsed.entries, { includeReversed: true });
const slopes = computeReductionSlopeBySeries(namedExperiments);
const ambiguityBySeries = runAmbiguityPersistenceBySeries(parsed.entries, { includeReversed: true });
const prefixSpecific = analyzePrefixSpecificPredictability(parsed.entries, {
  minPrefixLength: 1,
  maxPrefixLength: 4,
  topN: 20,
});
const filteredPositionBias = computeFilteredPositionBiasRanking(parsed.entries, {
  prefixLengths: [2, 3],
  minTotalFrequency: 50,
  topN: 20,
  suffixTopN: 8,
});
const lengthControlled = runLengthControlledPredictability(parsed.entries, { includeReversed: true });
const coupling = analyzePrefixSuffixCoupling(parsed.entries, { topCouplingCount: 30, topDistItems: 10 });
const nullModelResult = runNullModelComparison(parsed.entries, {
  models: ['frequency_shuffle', 'prefix_global_suffix', 'length_preserving'],
  prefixLength: 2,
  seed: 42,
});

let multiTranscriptionSection = '## Multi-Transcription Comparison\\n\\nNo comparison dataset provided. Use `--compare <path>`.';
if (comparePath) {
  const compareParsed = loadTranscriptionFile(comparePath, 'A');
  const comparison = compareDatasets(
    { name: 'dataset_A', entries: parsed.entries },
    { name: 'dataset_B', entries: compareParsed.entries },
  );
  multiTranscriptionSection = renderMultiTranscriptionComparison(comparison);
}

let normalizationSection = '## Normalization Robustness\\n\\nNormalization robustness not requested. Use `--normalize all`.';
if (normalizeMode === 'all') {
  const robustness = runNormalizationRobustness(raw, { modes: ['A', 'B', 'C', 'D'] });
  normalizationSection = renderNormalizationRobustness(robustness);
}

let crossDatasetSection = '## Cross-Dataset Comparison\\n\\nNo external datasets provided. Use `--compare-datasets <path...>`.';
let sizeMatchedSection = '## Size-Matched Comparison\\n\\nSize-matched analysis not requested. Use `--size-matched` with `--compare-datasets`.';
let significanceSection = '## Statistical Significance\\n\\nSignificance testing not requested. Use `--size-matched` with `--compare-datasets`.';
let robustnessSummarySection = '### Robustness Summary\\n- Size control stability: n/a\\n- Statistical significance: n/a';
if (compareDatasetPaths.length > 0) {
  const datasets = loadComparisonDatasets(compareDatasetPaths);
  const cross = runCrossDatasetComparison(parsed.entries, datasets);
  crossDatasetSection = renderCrossDatasetComparison(cross);

  if (sizeMatched) {
    const sizeRows = runSizeMatchedBootstrap(parsed.entries, datasets, {
      bootstrapSamples: 3,
      seed: 20260424,
    });
    sizeMatchedSection = renderSizeMatchedSection(sizeRows);

    const sigRows = runPermutationSignificance(parsed.entries, datasets, {
      iterations: permutations,
      seed: 20260425,
    });
    significanceSection = renderSignificanceSection(sigRows);
    robustnessSummarySection = renderFinalRobustnessSummary(sizeRows, sigRows);
  }
}

const sections = [
  '# Voynich ZL3b Quantitative Report',
  '',
  renderCorpusSummary(parsed, analysis),
  '',
  renderGeneralPredictabilitySection(baseline),
  '',
  renderPositionAwareReport(positionAware),
  '',
  renderPrefixFamilySection(familyAnalysis),
  '',
  renderSlopeSection(slopes),
  '',
  renderAmbiguitySection(ambiguityBySeries),
  '',
  renderPrefixSpecificSection(prefixSpecific),
  '',
  renderFilteredPositionBiasSection(filteredPositionBias),
  '',
  renderLengthControlledSection(lengthControlled),
  '',
  renderCouplingSection(coupling),
  '',
  multiTranscriptionSection,
  '',
  normalizationSection,
  '',
  crossDatasetSection,
  '',
  sizeMatchedSection,
  '',
  significanceSection,
  '',
  robustnessSummarySection,
  '',
  renderNullModelComparison(nullModelResult),
];

console.log(sections.join('\n'));

if (couplingCsvPath) {
  const csv = exportCouplingCsv(coupling, couplingN);
  fs.writeFileSync(couplingCsvPath, csv);
  console.error(`Wrote CSV: ${couplingCsvPath} (n=${couplingN})`);
}

if (prefixSpecificJsonPath) {
  fs.writeFileSync(prefixSpecificJsonPath, JSON.stringify(prefixSpecific, null, 2));
  console.error(`Wrote JSON: ${prefixSpecificJsonPath}`);
}
