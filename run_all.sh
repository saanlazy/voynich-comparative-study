#!/usr/bin/env bash
set -euo pipefail

mkdir -p outputs

node src/zl3b-report.mjs ZL3b-n.txt \
  --compare-datasets ./data/english.txt ./data/latin.txt ./data/json.txt ./data/ngram.txt \
  --size-matched \
  --normalize all \
  > outputs/final_report.md

node src/generator-comparison.mjs ZL3b-n.txt \
  --null-models all \
  > outputs/null_model_report.md
