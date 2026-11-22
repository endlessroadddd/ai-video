# Short Asset React Template

This template is the default implementation host for the script-first short lane.

## Core implementation rules

- Build one short asset per project
- Use `16:9` as the default first-pass canvas
- Use React and CSS only
- Keep one primary motion per screen
- Keep copy short
- Prevent text overlap by design, not by late-stage patching
- Keep brand constraints visible in code comments, tokens, or config

## Expected follow-through

- Mirror the approved `complete-plan.json`
- Preserve `persistentConstraints`
- Build screens in `complete-plan.json` order, one screen at a time
- Wait for per-screen approval before implementing the next screen
- Validate in a real browser before marking the asset ready
