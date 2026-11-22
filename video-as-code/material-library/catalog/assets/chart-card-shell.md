---
{
  "id": "material-library/data-display/chart-card-shell",
  "title": "Chart Card Shell",
  "category": "data-display",
  "summary": "Reusable card framing for charts, metrics, and proof snippets pulled from the demo dashboard primitives.",
  "agentGoal": "Let the Agent reuse Chart Card Shell when a script needs chart card wrapper on chart card without rebuilding the surrounding data-display layer from scratch.",
  "whenToUse": [
    "Use when a chart or metric needs a clear framed surface with title and supporting copy.",
    "Use when the scene can afford a medium shell layer on chart card."
  ],
  "avoidWhen": [
    "Avoid when the scene should feel full-bleed or cinematic rather than dashboard-like.",
    "Avoid when full-screen transition."
  ],
  "keywords": [
    "card",
    "chart",
    "metric",
    "dashboard",
    "shell",
    "proof-heavy",
    "structured"
  ],
  "matchKeywords": [
    "chart card",
    "metric card",
    "dashboard shell",
    "chart card wrapper",
    "metric proof shell",
    "dashboard card framing",
    "dashboard proof block",
    "metric shell",
    "proof-heavy",
    "dashboard",
    "structured",
    "图表卡片外壳",
    "指标证明壳层",
    "仪表盘卡片框架"
  ],
  "inputProps": [
    "Card",
    "CardHeader",
    "CardTitle",
    "CardDescription",
    "CardContent"
  ],
  "sourceProjects": [
    "projects/demo-app"
  ],
  "previewRef": "material-library/showcase#material-library-data-display-chart-card-shell",
  "stability": "stable",
  "implementationRef": "material-library/src/data-display/chart-card-shell.tsx",
  "sceneTypes": [
    "data",
    "proof"
  ],
  "styleFamilies": [
    "lucius-light"
  ],
  "editableParts": [
    "title",
    "description",
    "content"
  ],
  "visualSignature": [
    "Reusable card framing for charts, metrics, and proof snippets pulled from the demo dashboard primitives.",
    "Reads as a medium proof-heavy, dashboard, structured shell layer rather than a generic data-display widget.",
    "Most natural on chart card, dashboard proof block, metric shell surfaces."
  ],
  "selectionSignals": [
    "Reach for it when a chart or metric needs a clear framed surface with title and supporting copy.",
    "Best when the scene needs a medium proof-heavy layer on chart card.",
    "Choose it when this asset should carry the main readable beat."
  ],
  "compositionPatterns": [
    "Use it only when the proof itself moves the argument forward.",
    "Keep the data payload tight enough that the viewer can read it in one beat.",
    "Usually staged next to Trend Chart, Proof Chip, and Resolve Overlay.",
    "Pair it with Trend Chart when the beat needs one more layer of context without replacing Chart Card Shell."
  ],
  "pairWithIds": [
    "material-library/data-display/trend-chart",
    "material-library/surfaces/proof-chip",
    "material-library/surfaces/resolve-overlay"
  ],
  "preferInsteadIds": [
    "material-library/surfaces/proof-chip"
  ],
  "dos": [
    "Use Chart Card Shell only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with title and description while keeping frame geometry and chrome proportions stable."
  ],
  "donts": [
    "Do not use it when the scene should feel full-bleed or cinematic rather than dashboard-like.",
    "Do not rewrite frame geometry and chrome proportions in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Use Chart Card Shell to establish interface context in one glance.",
    "Keep the shell stable while proof or accent layers do the moment-to-moment work.",
    "Prefer Proof Chip when the scene should feel full-bleed or cinematic rather than dashboard-like."
  ],
  "narrativeRole": "shell",
  "scriptTriggersEn": [
    "chart card wrapper",
    "metric proof shell",
    "dashboard card framing"
  ],
  "scriptTriggersZh": [
    "图表卡片外壳",
    "指标证明壳层",
    "仪表盘卡片框架"
  ],
  "negativeTriggersEn": [
    "full-screen transition",
    "pure inline micro accent"
  ],
  "negativeTriggersZh": [
    "全屏转场",
    "纯内联微点缀"
  ],
  "hostSurfaces": [
    "chart card",
    "dashboard proof block",
    "metric shell"
  ],
  "toneTags": [
    "proof-heavy",
    "dashboard",
    "structured"
  ],
  "visualWeight": "medium",
  "informationDensity": "medium",
  "dominance": "primary",
  "reuseMode": "tweak-layout",
  "mutationCost": "medium",
  "safeToChange": [
    "title",
    "description",
    "content",
    "Card",
    "CardHeader"
  ],
  "keepFixed": [
    "frame geometry",
    "chrome proportions",
    "spacing rhythm"
  ],
  "adaptationNotes": [
    "Let the shell establish context, then layer proof or accents inside it.",
    "If the chrome hierarchy changes materially, promote that work into a new shell asset."
  ]
}
---
Chart Card Shell is the right pick when a chart or metric needs a clear framed surface with title and supporting copy. Visually it reads as reusable card framing for charts, metrics, and proof snippets pulled from the demo dashboard primitives, with a proof-heavy, dashboard, structured tone, and it sits best on chart card, dashboard proof block, metric shell surfaces.

For matching, look for beats like chart card wrapper / metric proof shell or 图表卡片外壳 / 指标证明壳层. Pair it with Trend Chart and Proof Chip when the scene needs more context. Prefer Proof Chip when the scene should feel full-bleed or cinematic rather than dashboard-like.

For adaptation, change title, description, content, Card, CardHeader first. Keep frame geometry, chrome proportions, spacing rhythm stable so the asset still feels like the extracted original. Let the shell establish context, then layer proof or accents inside it. If the chrome hierarchy changes materially, promote that work into a new shell asset.
