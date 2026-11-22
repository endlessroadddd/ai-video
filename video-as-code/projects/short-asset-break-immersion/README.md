# Discord Scene App

Short-asset preview app for `short-asset-break-immersion`.

## Purpose

- Preview the Discord-style scene pack for the "AI breaks immersion" short.
- Switch between `S01` to `S05B`.
- Compare `static` vs `motion` states before export.

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## Query Params

- `scene=s01|s02|s03|s04|s05a|s05b`
- `mode=static|motion`
- `view=timeline`

Example:

- `dist/index.html?scene=s03&mode=motion`
- `dist/index.html?view=timeline`

## Notes

- The build uses `base: "./"` so the built `dist/index.html` can be opened through the wrapper HTML files in `../static-scenes/`.
- The loss chart is intentionally marked as illustrative and should not be treated as real client data.
- Timeline mode auto-plays the full 30-second sequence in motion mode and hides the debug scene navigation.
