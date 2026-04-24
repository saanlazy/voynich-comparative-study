import fs from 'node:fs';
import path from 'node:path';

import { parseZl3bText } from './zl3b-parser.js';
import {
  runBaselineComparison,
  renderExperimentReport,
  renderEntropyLineChartSvg,
} from './predictability-experiment.js';

const args = process.argv.slice(2);
const inputPath = args[0] ?? path.resolve(process.cwd(), 'ZL3b-n.txt');

let svgPath = null;
for (let i = 1; i < args.length; i += 1) {
  if (args[i] === '--svg') {
    svgPath = args[i + 1] ?? null;
    i += 1;
  }
}

const rawText = fs.readFileSync(inputPath, 'utf8');
const parsed = parseZl3bText(rawText);

const comparison = runBaselineComparison(parsed.entries, {
  includeReversed: true,
  filterKey: 'ALL',
});

const report = renderExperimentReport(comparison);
console.log(report);

if (svgPath) {
  const svg = renderEntropyLineChartSvg(comparison);
  fs.writeFileSync(svgPath, svg);
  console.error(`Wrote SVG chart: ${svgPath}`);
}
