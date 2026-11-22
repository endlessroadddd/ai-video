# Short Script Lane Gates

These gates apply to:

`output/<case-slug>/short-assets/<asset-slug>/`

## Gate 1: Script input ready

The script-first lane may enter `01-script/` only after these files exist:

- `output/<case-slug>/00-input/product-context.md`
- `output/<case-slug>/00-input/design-guideline.md`
- `output/<case-slug>/short-assets/<asset-slug>/00-concept/micro-concept.md`
- `output/<case-slug>/short-assets/<asset-slug>/00-concept/asset-metadata.json`

## Gate 2: Script approved

The lane may enter `02-plan/` only after:

- `output/<case-slug>/short-assets/<asset-slug>/01-script/script-outline.md` exists
- `output/<case-slug>/short-assets/<asset-slug>/01-script/script-outline.json` exists
- `output/<case-slug>/short-assets/<asset-slug>/01-script/approval.md` contains `- Status: APPROVED`

## Gate 3: Plan approved

The lane may enter `03-materials/` only after:

- `output/<case-slug>/02-constraints/style-constraints.json` exists
- `output/<case-slug>/short-assets/<asset-slug>/02-plan/complete-plan.md` exists
- `output/<case-slug>/short-assets/<asset-slug>/02-plan/complete-plan.json` exists
- `output/<case-slug>/short-assets/<asset-slug>/02-plan/approval.md` contains `- Status: APPROVED`

## Gate 4: Materials approved

The lane may enter `04-build/` only after:

- `output/<case-slug>/short-assets/<asset-slug>/03-materials/material-needs.md` exists
- `output/<case-slug>/short-assets/<asset-slug>/03-materials/material-needs.json` exists
- `output/<case-slug>/short-assets/<asset-slug>/03-materials/approval.md` contains `- Status: APPROVED`

## Gate 5: Screen-by-screen build order

Inside `04-build/`, implementation must proceed in the order defined by:

- `output/<case-slug>/short-assets/<asset-slug>/02-plan/complete-plan.json`

The first screen may begin only after Gate 4 is satisfied.

Every built screen must have:

- `output/<case-slug>/short-assets/<asset-slug>/04-build/screens/<screen-id>/build-notes.md`
- `output/<case-slug>/short-assets/<asset-slug>/04-build/screens/<screen-id>/approval.md`

The next screen may begin only after the previous screen's approval file contains:

- `- Status: APPROVED`

## Gate 6: Build reviewed

The lane may enter `05-review/` only after:

- `output/<case-slug>/short-assets/<asset-slug>/04-build/build-log.md` exists
- every screen listed in `02-plan/complete-plan.json` has `04-build/screens/<screen-id>/build-notes.md`
- every screen listed in `02-plan/complete-plan.json` has `04-build/screens/<screen-id>/approval.md` containing `- Status: APPROVED`

## Gate 7: Delivery ready

No script-first short asset is delivery-ready until:

- `output/<case-slug>/short-assets/<asset-slug>/05-review/asset-qa.md` exists
- the build still respects persistent brand constraints
- every screen still has one primary motion
- the final browser preview shows no text overlap
