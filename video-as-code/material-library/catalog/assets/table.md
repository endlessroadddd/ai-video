---
{
  "id": "material-library/data-display/table",
  "title": "Table Primitive",
  "category": "data-display",
  "summary": "Neutral table layout with minimal styling and consistent cell spacing.",
  "agentGoal": "Let the Agent reuse Table Primitive when a script needs proof table on dashboard card without rebuilding the surrounding data-display layer from scratch.",
  "whenToUse": [
    "Use when a short asset needs structured tabular data or status lists.",
    "Use when the scene can afford a medium proof layer on dashboard card."
  ],
  "avoidWhen": [
    "Avoid when the scene only needs a single metric or chart.",
    "Avoid when story-driven full scene environment."
  ],
  "keywords": [
    "table",
    "data",
    "list",
    "proof",
    "structured",
    "operational",
    "neutral"
  ],
  "matchKeywords": [
    "table",
    "data grid",
    "status list",
    "proof table",
    "ops rows and status",
    "structured comparison list",
    "dashboard card",
    "ops panel",
    "structured",
    "operational",
    "neutral",
    "表格证明",
    "运营行状态",
    "结构化对比列表"
  ],
  "inputProps": [
    "Table",
    "TableHeader",
    "TableRow",
    "TableCell"
  ],
  "sourceProjects": [
    "projects/demo-app"
  ],
  "previewRef": "material-library/showcase#table",
  "stability": "stable",
  "implementationRef": "material-library/src/data-display/table.tsx",
  "sceneTypes": [
    "data",
    "status"
  ],
  "styleFamilies": [
    "lucius-dark"
  ],
  "editableParts": [
    "columns",
    "rows"
  ],
  "visualSignature": [
    "Neutral table layout with minimal styling and consistent cell spacing.",
    "Reads as a medium structured, operational, neutral proof layer rather than a generic data-display widget.",
    "Most natural on dashboard card, proof table, ops panel surfaces."
  ],
  "selectionSignals": [
    "Reach for it when a short asset needs structured tabular data or status lists.",
    "Best when the scene needs a medium structured layer on dashboard card.",
    "Choose it when this asset should carry the main readable beat."
  ],
  "compositionPatterns": [
    "Use it only when the proof itself moves the argument forward.",
    "Keep the data payload tight enough that the viewer can read it in one beat.",
    "Usually staged next to Chart Card Shell, Proof Chip, and Recording Scenario Schema.",
    "Pair it with Chart Card Shell when the beat needs one more layer of context without replacing Table Primitive."
  ],
  "pairWithIds": [
    "material-library/data-display/chart-card-shell",
    "material-library/surfaces/proof-chip",
    "material-library/chat/recording-scenario-schema"
  ],
  "preferInsteadIds": [
    "material-library/data-display/trend-chart"
  ],
  "dos": [
    "Use Table Primitive only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with columns and rows while keeping reading order and proof hierarchy stable."
  ],
  "donts": [
    "Do not use it when the scene only needs a single metric or chart.",
    "Do not rewrite reading order and proof hierarchy in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Set the context first, then let Table Primitive carry the evidence beat.",
    "Hold on the proof long enough for the viewer to complete the main read.",
    "Prefer Trend Chart when the scene only needs a single metric or chart."
  ],
  "narrativeRole": "proof",
  "scriptTriggersEn": [
    "proof table",
    "ops rows and status",
    "structured comparison list"
  ],
  "scriptTriggersZh": [
    "表格证明",
    "运营行状态",
    "结构化对比列表"
  ],
  "negativeTriggersEn": [
    "story-driven full scene environment",
    "tiny inline badge"
  ],
  "negativeTriggersZh": [
    "叙事型完整环境",
    "很小的内联徽标"
  ],
  "hostSurfaces": [
    "dashboard card",
    "proof table",
    "ops panel"
  ],
  "toneTags": [
    "structured",
    "operational",
    "neutral"
  ],
  "visualWeight": "medium",
  "informationDensity": "medium",
  "dominance": "primary",
  "reuseMode": "tweak-copy",
  "mutationCost": "low",
  "safeToChange": [
    "columns",
    "rows",
    "Table",
    "TableHeader",
    "numbers"
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
Table Primitive is the right pick when a short asset needs structured tabular data or status lists. Visually it reads as neutral table layout with minimal styling and consistent cell spacing, with a structured, operational, neutral tone, and it sits best on dashboard card, proof table, ops panel surfaces.

For matching, look for beats like proof table / ops rows and status or 表格证明 / 运营行状态. Pair it with Chart Card Shell and Proof Chip when the scene needs more context. Prefer Trend Chart when the scene only needs a single metric or chart.

For adaptation, change columns, rows, Table, TableHeader, numbers first. Keep reading order, proof hierarchy, core chart or card structure stable so the asset still feels like the extracted original. Give the viewer enough stillness to read the proof before transitioning away. If the evidence model changes completely, fork a new proof asset rather than bending this one beyond recognition.
