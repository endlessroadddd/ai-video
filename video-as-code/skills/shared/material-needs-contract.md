# Material Needs Contract

The material needs document tells the user exactly what is already available and what is still required before a high-fidelity build can happen.

## Required top-level fields

Each `material-needs.json` must include:

- `persistentConstraints`
- `alreadyInRepo`
- `requiredFromUser`
- `optionalEnhancements`
- `uiReferences`
- `copyDependencies`
- `blockers`

## Required requiredFromUser fields

Each entry in `requiredFromUser` must include:

- `id`
- `type`
- `description`
- `whyNeeded`
- `usedInScreen`
- `requiredBeforeBuild`

## Writing rules

- Call out anything that affects brand fidelity.
- Call out anything that could force a screen to violate the one-primary-motion rule.
- Make blockers explicit instead of burying them in notes.
