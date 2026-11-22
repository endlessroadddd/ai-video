# short-asset-language-richness-wow 工程目录

React/Vite browser prototype for the Lucius short video `language-richness-wow`.

## Commands

```bash
npm run dev
npm run build
npm run preview
```

当前本地开发端口：`3025`。

## Routes

- `http://localhost:3025/?scene=b1`
- `http://localhost:3025/?scene=b2`
- `http://localhost:3025/?scene=b3`
- `http://localhost:3025/?scene=b4`
- `http://localhost:3025/?scene=b5`
- `http://localhost:3025/?scene=b6`
- `http://localhost:3025/?view=timeline`

## Scene Map

- B1: pure title opening, `No handoff request.`
- B2: `Language quality is designed.` explainer
- B3: user follow-up after issue solved
- B4: Lucius natural answer
- B5: praise and honest AI reveal
- B6: `wow.` closing KV

## Notes

- The prototype reuses the proven community UI and motion base from `short-asset-custom-persona`.
- B2 image-like parts are intentionally decomposed: person, paper grain, and sticky note can be replaced later by manually generated assets.
- Accurate text, cards, connectors, chat UI, routes, and timing are code-built.
- `npm run build` passes.
