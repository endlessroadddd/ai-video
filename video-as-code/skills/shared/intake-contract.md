# Intake Contract

All production work in this repository starts from three frozen inputs:

- `product-context`
- `design-guideline`
- `case-study`

These inputs must be written to:

- `output/<case-slug>/00-input/product-context.md`
- `output/<case-slug>/00-input/design-guideline.md`
- `output/<case-slug>/00-input/case-study.md`

## Contract rules

- Inputs are immutable snapshots for the duration of a production pass.
- If a source input changes, create a new pass or update the snapshot before continuing.
- Derived outputs must always reference the input snapshot path they were generated from.

## Reusable references vs. frozen snapshots

- Reusable source material can live under `assets/references/`.
- Repo-level references are allowed to aggregate PDFs, sales decks, interviews, or other upstream product material.
- A reusable reference is not a production input by itself.
- Before work starts on a case, the relevant reference material must be normalized and frozen into `output/<case-slug>/00-input/`.
- Sales material must be translated into stable product context before it becomes a frozen `product-context` input.

Current reusable product-context example:

- `assets/references/lucius-product-context.md`
- `assets/references/lucius-product-context.json`
