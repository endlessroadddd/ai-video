---
{
  "id": "material-library/data-display/trend-chart",
  "title": "Trend Chart",
  "category": "data-display",
  "summary": "SVG trend chart with smooth path and optional inflection highlight.",
  "agentGoal": "Let the Agent reuse Trend Chart when a script needs trend proof chart on chart card without rebuilding the surrounding data-display layer from scratch.",
  "whenToUse": [
    "Use when the proof is a single trend line or drop-off.",
    "Use when the scene can afford a medium proof layer on chart card."
  ],
  "avoidWhen": [
    "Avoid when you need multiple series or a full analytics dashboard.",
    "Avoid when multi-series analytics suite."
  ],
  "keywords": [
    "chart",
    "trend",
    "line",
    "proof",
    "analytic",
    "proof-heavy"
  ],
  "matchKeywords": [
    "trend chart",
    "line chart",
    "drop-off",
    "trend proof chart",
    "single-series decline or lift",
    "highlight inflection point",
    "chart card",
    "metric panel",
    "dashboard proof",
    "analytic",
    "trend",
    "proof-heavy",
    "趋势证明图",
    "单序列下降或上升",
    "强调拐点"
  ],
  "inputProps": [
    "values",
    "highlightIndex",
    "max",
    "min"
  ],
  "sourceProjects": [
    "projects/short-asset-break-immersion"
  ],
  "previewRef": "material-library/showcase#trend-chart",
  "stability": "beta",
  "implementationRef": "material-library/src/data-display/trend-chart.tsx",
  "sceneTypes": [
    "data",
    "proof"
  ],
  "styleFamilies": [
    "lucius-dark"
  ],
  "editableParts": [
    "values",
    "highlightIndex"
  ],
  "visualSignature": [
    "SVG trend chart with smooth path and optional inflection highlight.",
    "Reads as a medium analytic, trend, proof-heavy proof layer rather than a generic data-display widget.",
    "Most natural on chart card, metric panel, dashboard proof surfaces."
  ],
  "selectionSignals": [
    "Reach for it when the proof is a single trend line or drop-off.",
    "Best when the scene needs a medium analytic layer on chart card.",
    "Choose it when this asset should carry the main readable beat."
  ],
  "compositionPatterns": [
    "Use it only when the proof itself moves the argument forward.",
    "Keep the data payload tight enough that the viewer can read it in one beat.",
    "Usually staged next to Chart Card Shell, Proof Chip, and Discord Loss Chart Scene.",
    "Pair it with Chart Card Shell when the beat needs one more layer of context without replacing Trend Chart."
  ],
  "pairWithIds": [
    "material-library/data-display/chart-card-shell",
    "material-library/surfaces/proof-chip",
    "material-library/data-display/discord-loss-chart-scene"
  ],
  "preferInsteadIds": [
    "material-library/surfaces/proof-chip"
  ],
  "dos": [
    "Use Trend Chart only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with values and highlightIndex while keeping reading order and proof hierarchy stable."
  ],
  "donts": [
    "Do not use it when you need multiple series or a full analytics dashboard.",
    "Do not rewrite reading order and proof hierarchy in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Set the context first, then let Trend Chart carry the evidence beat.",
    "Hold on the proof long enough for the viewer to complete the main read.",
    "Prefer Proof Chip when you need multiple series or a full analytics dashboard."
  ],
  "narrativeRole": "proof",
  "scriptTriggersEn": [
    "trend proof chart",
    "single-series decline or lift",
    "highlight inflection point"
  ],
  "scriptTriggersZh": [
    "趋势证明图",
    "单序列下降或上升",
    "强调拐点"
  ],
  "negativeTriggersEn": [
    "multi-series analytics suite",
    "decorative background graph"
  ],
  "negativeTriggersZh": [
    "多序列分析套件",
    "装饰性背景图线"
  ],
  "hostSurfaces": [
    "chart card",
    "metric panel",
    "dashboard proof"
  ],
  "toneTags": [
    "analytic",
    "trend",
    "proof-heavy"
  ],
  "visualWeight": "medium",
  "informationDensity": "medium",
  "dominance": "primary",
  "reuseMode": "tweak-copy",
  "mutationCost": "medium",
  "safeToChange": [
    "values",
    "highlightIndex",
    "numbers",
    "labels",
    "supporting annotations"
  ],
  "keepFixed": [
    "reading order",
    "proof hierarchy",
    "core chart or card structure"
  ],
  "adaptationNotes": [
    "Give the viewer enough stillness to read the proof before transitioning away.",
    "If the evidence model changes completely, fork a new proof asset rather than bending this one beyond recognition."
  ]
}
---
Trend Chart is the right pick when the proof is a single trend line or drop-off. Visually it reads as svg trend chart with smooth path and optional inflection highlight, with a analytic, trend, proof-heavy tone, and it sits best on chart card, metric panel, dashboard proof surfaces.

For matching, look for beats like trend proof chart / single-series decline or lift or 趋势证明图 / 单序列下降或上升. Pair it with Chart Card Shell and Proof Chip when the scene needs more context. Prefer Proof Chip when you need multiple series or a full analytics dashboard.

For adaptation, change values, highlightIndex, numbers, labels, supporting annotations first. Keep reading order, proof hierarchy, core chart or card structure stable so the asset still feels like the extracted original. Give the viewer enough stillness to read the proof before transitioning away. If the evidence model changes completely, fork a new proof asset rather than bending this one beyond recognition.
