# Lucius Brand Rules

This directory is the repository-ready distillation of `Lucius Brand Guideline.pdf` (Version 1.1).

## Source of truth

- Source document: `C:\Users\ASUS\Downloads\Lucius Brand Guideline.pdf`
- Source version observed in the PDF: `Brand Guidelines Version 1.1`

If a future official brand guideline conflicts with any derived rule in this repository, the official guideline wins.

## What lives here

- `lucius-brand-guideline.md`
  - Index and usage policy for the brand rule set.
- `lucius-brand-tokens.json`
  - Machine-readable tokens and approved brand mappings.
- `lucius-brand-application-rules.md`
  - Human-readable, implementation-facing rules for product, marketing, and motion work in this repo.
- `lucius-brand-qa-checklist.md`
  - Review checklist for checking scenes and full sequences against the brand system.

## Core brand premise

Lucius should feel:

- Intelligent
- Collaborative
- Quietly Confident

The guideline consistently frames Lucius as an AI teammate rather than a detached automation tool. This affects not only logo use and typography, but also how visual systems, graphics, and product storytelling should feel.

## Rule hierarchy

1. Official PDF brand guideline
2. `lucius-brand-tokens.json`
3. `lucius-brand-application-rules.md`
4. QA enforcement in `lucius-brand-qa-checklist.md`

## Repository use policy

- Use the token file when a script or generator needs exact values.
- Use the application rules when building scenes, interfaces, landing pages, promo frames, and motion systems.
- Use the QA checklist during scene review and final sequence review.
