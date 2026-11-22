# Persistent Constraints Contract

Every script-first short asset must carry the same persistent constraints from planning through delivery.

`persistentConstraints` is mandatory in:

- `01-script/script-outline.md`
- `01-script/script-outline.json`
- `02-plan/complete-plan.md`
- `02-plan/complete-plan.json`
- `03-materials/material-needs.md`
- `03-materials/material-needs.json`
- `04-build/build-log.md`
- `05-review/asset-qa.md`

## Required structure

`persistentConstraints` must contain:

- `brandConstraints`
- `baseMotionConstraints`

## brandConstraints

`brandConstraints` must explicitly cover:

- `colorRoles`
- `typeRoles`
- `radiusRules`
- `backgroundRules`
- `graphicLanguage`
- `motionTone`
- `prohibitedPatterns`

These constraints come from the approved brand guideline, brand tokens, and application rules.

## baseMotionConstraints

`baseMotionConstraints` must explicitly preserve all of the following as active rules:

- `onePrimaryMotionPerScreen`
- `lessIsMore`
- `minimalCopy`
- `noTextOverlap`
- `singleProofPath`
- `quietlyConfidentMotion`

If any stage output fails to carry these constraints forward, that stage is invalid and must not pass its approval gate.
