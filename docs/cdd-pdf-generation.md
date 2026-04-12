# China Debt Dynamics PDF Generation

Use this workflow to generate a branded PDF directly from the current redesigned China Debt Dynamics article source (`assets/data/*.json`) and keep button wiring consistent.

## Generate a PDF asset

```bash
python3 scripts/generate_cdd_branded_pdf.py \
  assets/data/china-debt-dynamics-v10i1.json \
  pdfs/china-debt-dynamics-v10i1-redesigned.pdf
```

## Reuse for future issues

1. Ensure the redesigned article HTML reads content from a dedicated JSON file in `assets/data/` via `data-article-source`.
2. Run the generator script with that JSON file and a new output path in `pdfs/`.
3. Point article/index PDF buttons directly to the generated file path.
4. Keep `assets/css/cdd-article-template.css` print rules as the shared visual baseline for layout hierarchy, color palette, and spacing.
