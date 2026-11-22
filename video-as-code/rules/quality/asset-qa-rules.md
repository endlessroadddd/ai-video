# Asset QA Rules

Every completed script-first short asset must be checked against these rules before delivery.

Persistent brand constraints and base motion constraints are not optional review aids.
They must remain active from script through final browser preview.
No asset may enter final QA until every screen has already passed its own build approval.

## Hook clarity

- The hook is readable in the first second.
- The asset clearly serves a single `singleTakeaway`.
- The viewer can tell what the asset is about before the sequence is over.

## Single-motion discipline

- Every screen has one clear primary motion.
- Supporting state changes do not become a second competing visual action.
- The browser preview still reads as one motion focus per screen.

## Proof clarity

- The `proofShot` is visibly present instead of only implied in notes.
- Supporting proof is easy to identify without pausing excessively.
- Copy and motion reinforce the proof instead of distracting from it.

## Readability and pacing

- On-screen text is readable within the target duration.
- Copy stays minimal and follows a less-is-more principle.
- There is no text overlap in the real browser implementation.
- The beat order feels fast and legible, not rushed and overloaded.
- There is no dead time where the asset stops advancing the point.

## Design and brand fidelity

- Shared `style-constraints` and `persistentConstraints.brandConstraints` are respected.
- Lucius brand rules are respected when Lucius branding is in scope.
- Palette, typography roles, radius rules, background treatment, and graphic language stay coherent even at short-form speed.
- Motion tone stays quietly confident and avoids flashy competing animation.

## Technical quality

- No unnecessary overlap between major information blocks.
- No flicker, popping layers, or broken clipping.
- Motion feels intentional and smooth.
- The asset reads as one coherent sequence rather than unrelated fragments.
- The browser preview loads cleanly and shows no obvious console/runtime problems.
