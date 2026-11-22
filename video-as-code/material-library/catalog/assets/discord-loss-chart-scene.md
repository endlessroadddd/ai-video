---
{
  "id": "material-library/data-display/discord-loss-chart-scene",
  "title": "Discord Loss Chart Scene",
  "category": "data-display",
  "summary": "Break-immersion chart stage with smooth trend line, inflection guide, animated impact counter, and ambient reaction emoji.",
  "agentGoal": "Let the Agent reuse Discord Loss Chart Scene when a script needs discord loss chart scene on discord proof stage without rebuilding the surrounding data-display layer from scratch.",
  "whenToUse": [
    "Use when you need a proof-heavy chart that still feels native to a Discord story world.",
    "Use when the scene can afford a heavy proof layer on discord proof stage."
  ],
  "avoidWhen": [
    "Avoid when the data display should stay neutral, brand-agnostic, or compact.",
    "Avoid when small inline chart."
  ],
  "keywords": [
    "loss chart",
    "discord chart",
    "impact counter",
    "inflection chart",
    "reaction emoji",
    "proof",
    "warning",
    "analytic"
  ],
  "matchKeywords": [
    "discord chart scene",
    "impact loss chart",
    "story chart card",
    "discord loss chart scene",
    "community churn proof",
    "decline story inside discord context",
    "discord proof stage",
    "chart scene",
    "community evidence scene",
    "warning",
    "analytic",
    "story-driven",
    "Discord 流失图场景",
    "社区流失证明",
    "放在 Discord 语境里的下降故事"
  ],
  "inputProps": [
    "chrome",
    "currentScene",
    "mode"
  ],
  "sourceProjects": [
    "projects/short-asset-break-immersion"
  ],
  "previewRef": "material-library/showcase#discord-loss-chart-scene",
  "stability": "beta",
  "implementationRef": "projects/short-asset-break-immersion/src/LossChartScene.tsx",
  "sceneTypes": [
    "chart",
    "proof",
    "discord",
    "impact"
  ],
  "styleFamilies": [
    "discord-dark",
    "chart-proof"
  ],
  "editableParts": [
    "trend values",
    "labels",
    "impact headline",
    "emoji drift",
    "verdict copy"
  ],
  "visualSignature": [
    "Break-immersion chart stage with smooth trend line, inflection guide, animated impact counter, and ambient reaction emoji.",
    "Reads as a heavy warning, analytic, story-driven proof layer rather than a generic data-display widget.",
    "Most natural on discord proof stage, chart scene, community evidence scene surfaces."
  ],
  "selectionSignals": [
    "Reach for it when you need a proof-heavy chart that still feels native to a Discord story world.",
    "Best when the scene needs a heavy warning layer on discord proof stage.",
    "Choose it when this asset should carry the main readable beat."
  ],
  "compositionPatterns": [
    "Use it only when the proof itself moves the argument forward.",
    "Keep the data payload tight enough that the viewer can read it in one beat.",
    "Usually staged next to Trend Chart, Chart Card Shell, and Discord Community Scene.",
    "Pair it with Trend Chart when the beat needs one more layer of context without replacing Discord Loss Chart Scene."
  ],
  "pairWithIds": [
    "material-library/data-display/trend-chart",
    "material-library/data-display/chart-card-shell",
    "material-library/surfaces/discord-community-scene"
  ],
  "preferInsteadIds": [
    "material-library/data-display/trend-chart"
  ],
  "dos": [
    "Use Discord Loss Chart Scene only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with trend values and labels while keeping reading order and proof hierarchy stable."
  ],
  "donts": [
    "Do not use it when the data display should stay neutral, brand-agnostic, or compact.",
    "Do not rewrite reading order and proof hierarchy in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Set the context first, then let Discord Loss Chart Scene carry the evidence beat.",
    "Hold on the proof long enough for the viewer to complete the main read.",
    "Prefer Trend Chart when the data display should stay neutral, brand-agnostic, or compact."
  ],
  "narrativeRole": "proof",
  "scriptTriggersEn": [
    "discord loss chart scene",
    "community churn proof",
    "decline story inside discord context"
  ],
  "scriptTriggersZh": [
    "Discord 流失图场景",
    "社区流失证明",
    "放在 Discord 语境里的下降故事"
  ],
  "negativeTriggersEn": [
    "small inline chart",
    "quiet brand close"
  ],
  "negativeTriggersZh": [
    "小型内联图表",
    "安静品牌结尾"
  ],
  "hostSurfaces": [
    "discord proof stage",
    "chart scene",
    "community evidence scene"
  ],
  "toneTags": [
    "warning",
    "analytic",
    "story-driven"
  ],
  "visualWeight": "heavy",
  "informationDensity": "high",
  "dominance": "primary",
  "reuseMode": "tweak-copy",
  "mutationCost": "medium",
  "safeToChange": [
    "trend values",
    "labels",
    "impact headline",
    "chrome",
    "currentScene"
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
Discord Loss Chart Scene is the right pick when you need a proof-heavy chart that still feels native to a Discord story world. Visually it reads as break-immersion chart stage with smooth trend line, inflection guide, animated impact counter, and ambient reaction emoji, with a warning, analytic, story-driven tone, and it sits best on discord proof stage, chart scene, community evidence scene surfaces.

For matching, look for beats like discord loss chart scene / community churn proof or Discord 流失图场景 / 社区流失证明. Pair it with Trend Chart and Chart Card Shell when the scene needs more context. Prefer Trend Chart when the data display should stay neutral, brand-agnostic, or compact.

For adaptation, change trend values, labels, impact headline, chrome, currentScene first. Keep reading order, proof hierarchy, core chart or card structure stable so the asset still feels like the extracted original. Give the viewer enough stillness to read the proof before transitioning away. If the evidence model changes completely, fork a new proof asset rather than bending this one beyond recognition.
