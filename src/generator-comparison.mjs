import fs from 'node:fs';
import path from 'node:path';

import { parseZl3bText } from './zl3b-parser.js';
import {
  compareGeneratedVsReal,
  renderGeneratedComparisonReport,
} from './prefix-suffix-generator.js';
import { runNullModelComparison, renderNullModelComparison } from './null-models.js';

function parseArgs(argv) {
  const args = argv.slice(2);
  const inputPath = args[0] ?? path.resolve(process.cwd(), 'ZL3b-n.txt');
  let prefixLength = 2;
  let seed = null;
  let generatedCount = null;
  let nullModels = null;

  for (let i = 1; i < args.length; i += 1) {
    if (args[i] === '--prefix-length') {
      const v = Number(args[i + 1]);
      if (v === 2 || v === 3) prefixLength = v;
      i += 1;
      continue;
    }
    if (args[i] === '--seed') {
      const v = Number(args[i + 1]);
      if (Number.isFinite(v)) seed = v;
      i += 1;
      continue;
    }
    if (args[i] === '--count') {
      const v = Number(args[i + 1]);
      if (Number.isFinite(v) && v > 0) generatedCount = Math.floor(v);
      i += 1;
      continue;
    }
    if (args[i] === '--null-models') {
      const v = args[i + 1] ?? '';
      if (v === 'all') {
        nullModels = ['frequency_shuffle', 'prefix_global_suffix', 'length_preserving'];
      } else if (v) {
        nullModels = v.split(',').map((x) => x.trim()).filter(Boolean);
      }
      i += 1;
    }
  }

  return { inputPath, prefixLength, seed, generatedCount, nullModels };
}

const { inputPath, prefixLength, seed, generatedCount, nullModels } = parseArgs(process.argv);
const raw = fs.readFileSync(inputPath, 'utf8');
const parsed = parseZl3bText(raw);

if (nullModels) {
  const result = runNullModelComparison(parsed.entries, {
    models: nullModels,
    prefixLength,
    seed: seed ?? 42,
  });
  console.log(renderNullModelComparison(result));
} else {
  const comparison = compareGeneratedVsReal(parsed.entries, {
    prefixLength,
    seed,
    generatedCount: generatedCount ?? parsed.entries.length,
  });

  console.log(renderGeneratedComparisonReport(comparison));
}
