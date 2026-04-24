# Voynich Comparative Statistical Study (Replication Package)

## Paper
- **Title:** Voynich Comparative Statistical Study
- **Author:** Chang (2026b)

## Description
This package provides a reproducible analysis environment for comparative statistical evaluation of the Voynich manuscript token system. It includes the full analysis source code, curated baseline datasets, generated paper figures, and replication outputs. The pipeline compares predictability, ambiguity persistence, and structural coupling across Voynich and external baselines.

## Data Sources
- **Voynich:** `data/ZL3b-n.txt` (ZL3b transcription)
- **English baseline:** `data/english.txt` (Project Gutenberg-derived corpus)
- **Latin baseline:** `data/latin.txt` (Project Gutenberg, ID 18837)
- **Structured baseline:** `data/json.txt` (synthetic JSON-like corpus)
- **Synthetic baseline:** `data/ngram.txt` (n-gram-like pseudo text)

## Preprocessing
- Lowercasing and token normalization are applied in the existing parser/loader modules.
- Tokens are analyzed with shared indexing and evaluation logic across datasets.
- Position metadata (line/paragraph initial/final) is preserved where available in the Voynich pipeline.

## Reproduction
Run from the package root:

```bash
bash run_all.sh
```

Equivalent commands:

```bash
node src/zl3b-report.mjs ZL3b-n.txt \
  --compare-datasets ./data/english.txt ./data/latin.txt ./data/json.txt ./data/ngram.txt \
  --size-matched \
  --normalize all \
  > outputs/final_report.md

node src/generator-comparison.mjs ZL3b-n.txt \
  --null-models all \
  > outputs/null_model_report.md
```

## Expected Outputs
- `outputs/final_report.md`: comparative report with cross-dataset, size-matched, and significance sections.
- `outputs/null_model_report.md`: null-model comparison report.
- `figures/entropy_decay.png`: entropy decay across prefix length.
- `figures/suffix_distribution.png`: ranked suffix concentration comparison.
- `figures/ambiguity_persistence.png`: ambiguity persistence vs null models.

## Notes for Clean Reproducibility
- All paths are relative to the package root.
- No absolute paths are required.
- Analysis logic is unchanged from the project source included in `src/`.

# Language-like Predictability and Structural Divergence in Voynich Tokens

This repository contains the full reproducible research pipeline for the study:

**"Language-like Predictability and Structural Divergence in Voynich Tokens: A Comparative Statistical Study"**

---

## Overview

This project investigates the statistical structure of Voynich Manuscript tokens using a reproducible computational framework.

Rather than attempting decipherment, the study evaluates:

- Entropy decay (predictability)
- Ambiguity persistence
- Prefix–suffix structural organization

Voynich text is compared against multiple baselines:

- Natural languages (English, Latin)
- Synthetic n-gram text
- Structured data (JSON)

---

## Key Findings

- Voynich text closely matches natural language in predictability (entropy & ambiguity correlations ≈ 0.95)
- However, it diverges structurally (low prefix-family overlap, constrained suffix distributions)
- Null models fail to reproduce ambiguity persistence

→ Suggesting a **hybrid structured symbolic system**

---

## Repository Structure

