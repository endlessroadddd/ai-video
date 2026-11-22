# short-asset-language-richness preview app

## Commands

- `npm run dev`
- `npm run build`
- `npm run preview`

## Notes

- Default mode is a playlist loop across all 5 scenes.
- Single-scene preview is query-driven:
  - `?scene=s01-hook`
  - `?scene=s02-boring-contrast`
  - `?scene=s03-natural-chat`
  - `?scene=s04-wow-moment`
  - `?scene=s05-close`
- Scene 03 phase inspection:
  - `?scene=s03-natural-chat&phase=pending`
  - `?scene=s03-natural-chat&phase=streaming`
  - `?scene=s03-natural-chat&phase=resolved`

## Config

- `src/config/video.ts`
  - `VIDEO_WIDTH`
  - `VIDEO_HEIGHT`
  - `VIDEO_FPS`

`VIDEO_WIDTH` and `VIDEO_HEIGHT` default to `null`, which keeps preview sizing bound to the current window.
