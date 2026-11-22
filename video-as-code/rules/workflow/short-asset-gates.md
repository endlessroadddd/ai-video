# Short Asset Gates (Legacy)

This file documents the older beatboard-first short-asset flow.

New short assets should use:

`rules/workflow/short-script-lane-gates.md`

These gates apply to:

`output/<case-slug>/short-assets/<asset-slug>/`

## Gate 1: Concept ready

The short-asset lane may enter translation only after these files exist:

- `output/<case-slug>/00-input/product-context.md`
- `output/<case-slug>/00-input/design-guideline.md`
- `output/<case-slug>/short-assets/<asset-slug>/00-concept/micro-concept.md`
- `output/<case-slug>/short-assets/<asset-slug>/00-concept/asset-metadata.json`

## Gate 2: Beatboard ready

The short-asset lane may enter animatic generation only after these files exist:

- `output/<case-slug>/02-constraints/style-constraints.json`
- `output/<case-slug>/short-assets/<asset-slug>/01-translation/asset-brief.md`
- `output/<case-slug>/short-assets/<asset-slug>/01-translation/asset-brief.json`
- `output/<case-slug>/short-assets/<asset-slug>/02-beatboard/beatboard.md`
- `output/<case-slug>/short-assets/<asset-slug>/02-beatboard/beatboard.json`

## Gate 3: Animatic approved

The short-asset lane may enter build only after:

- `output/<case-slug>/short-assets/<asset-slug>/03-animatic/approval.md` exists
- `output/<case-slug>/short-assets/<asset-slug>/03-animatic/approval.md` contains `- Status: APPROVED`

The approval target for this stage is:

- beat keyframe review data
- rough sequence / animatic review data

## Gate 4: Build reviewed

The short-asset lane may enter delivery review only after:

- `output/<case-slug>/short-assets/<asset-slug>/04-build/build-log.md` exists

## Gate 5: Delivery ready

No short asset is final until:

- `output/<case-slug>/short-assets/<asset-slug>/05-review/asset-qa.md` is complete
- the asset still serves one clear takeaway, one clear proof path, and one clear hook
