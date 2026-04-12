# China Debt Dynamics PDF Generation

Use this workflow to generate publication-grade CDD PDFs from article JSON with the dedicated print template (`china-debt-dynamics-print.html`) and print stylesheet (`assets/css/cdd-article-print.css`).

## Generate a PDF asset

```bash
python3 scripts/generate_cdd_branded_pdf.py \
  assets/data/china-debt-dynamics-v10i1.json \
  pdfs/china-debt-dynamics-v10i1-redesigned.pdf
```

The generator renders the article through the print template and exports PDF through Chromium print emulation (Playwright), so typography, hierarchy, and page-break controls come from the same reusable print system.

## Prerequisites

```bash
pip install playwright
playwright install chromium
```

## Reuse for future issues

1. Add/update article content in `assets/data/*.json`.
2. Run the generator script with that JSON file and the target `pdfs/*.pdf` path.
3. Point article and archive PDF buttons directly to the generated PDF file.
4. Keep the shared print template and stylesheet as the single CDD PDF baseline; avoid per-article one-off print CSS.
