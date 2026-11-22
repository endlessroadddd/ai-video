---
{
  "id": "material-library/surfaces/proof-chip",
  "title": "Proof Chip",
  "category": "surfaces",
  "summary": "Small centered count chip used to mark how many proof points or receipts have been gathered.",
  "agentGoal": "Let the Agent reuse Proof Chip when a script needs proof count chip on center overlay without rebuilding the surrounding surfaces layer from scratch.",
  "whenToUse": [
    "Use when a scene needs a compact proof counter over a thread or device composition.",
    "Use when the scene can afford a micro proof layer on center overlay."
  ],
  "avoidWhen": [
    "Avoid when the count is not central to the beat or when the layout has no anchored center zone.",
    "Avoid when full readable proof module."
  ],
  "keywords": [
    "proof chip",
    "count badge",
    "receipt counter",
    "support proof",
    "proof",
    "counting",
    "minimal",
    "proof-heavy"
  ],
  "matchKeywords": [
    "proof count",
    "support badge",
    "receipt chip",
    "proof count chip",
    "receipt counter",
    "small evidence marker",
    "center overlay",
    "proof counter",
    "scene chrome",
    "counting",
    "minimal",
    "proof-heavy",
    "证明数量芯片",
    "收据计数器",
    "小型证据标识"
  ],
  "inputProps": [
    "count",
    "label",
    "style"
  ],
  "sourceProjects": [
    "projects/short-asset-thought-you-were-staff"
  ],
  "previewRef": "material-library/showcase#proof-chip",
  "stability": "stable",
  "implementationRef": "material-library/src/surfaces/proof-chip.tsx",
  "sceneTypes": [
    "proof",
    "summary",
    "overlay"
  ],
  "styleFamilies": [
    "lucius-light"
  ],
  "editableParts": [
    "count",
    "label",
    "position"
  ],
  "visualSignature": [
    "Small centered count chip used to mark how many proof points or receipts have been gathered.",
    "Reads as a micro counting, minimal, proof-heavy proof layer rather than a generic surfaces widget.",
    "Most natural on center overlay, proof counter, scene chrome surfaces."
  ],
  "selectionSignals": [
    "Reach for it when a scene needs a compact proof counter over a thread or device composition.",
    "Best when the scene needs a micro counting layer on center overlay.",
    "Choose it when the main shell or proof is already present and this asset should reinforce it."
  ],
  "compositionPatterns": [
    "Use it as frame chrome around one or two focal elements, not as a dense page clone.",
    "Let the shell establish context before a smaller proof element takes over.",
    "Usually staged next to Trend Chart, Support Handoff Card, and Chart Card Shell.",
    "Pair it with Trend Chart when the beat needs one more layer of context without replacing Proof Chip."
  ],
  "pairWithIds": [
    "material-library/data-display/trend-chart",
    "material-library/chat/support-handoff-card",
    "material-library/data-display/chart-card-shell"
  ],
  "preferInsteadIds": [
    "material-library/chat/reply-ready-toast"
  ],
  "dos": [
    "Use Proof Chip only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with count and label while keeping reading order and proof hierarchy stable."
  ],
  "donts": [
    "Do not use it when the count is not central to the beat or when the layout has no anchored center zone.",
    "Do not rewrite reading order and proof hierarchy in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Set the context first, then let Proof Chip carry the evidence beat.",
    "Hold on the proof long enough for the viewer to complete the main read.",
    "Prefer Reply Ready Toast when the count is not central to the beat or when the layout has no anchored center zone."
  ],
  "narrativeRole": "proof",
  "scriptTriggersEn": [
    "proof count chip",
    "receipt counter",
    "small evidence marker"
  ],
  "scriptTriggersZh": [
    "证明数量芯片",
    "收据计数器",
    "小型证据标识"
  ],
  "negativeTriggersEn": [
    "full readable proof module",
    "hero brand lockup"
  ],
  "negativeTriggersZh": [
    "完整可读证明模块",
    "主视觉品牌锁定"
  ],
  "hostSurfaces": [
    "center overlay",
    "proof counter",
    "scene chrome"
  ],
  "toneTags": [
    "counting",
    "minimal",
    "proof-heavy"
  ],
  "visualWeight": "micro",
  "informationDensity": "low",
  "dominance": "supporting",
  "reuseMode": "drop-in",
  "mutationCost": "low",
  "safeToChange": [
    "count",
    "label",
    "position",
    "numbers",
    "labels"
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
Proof Chip is the right pick when a scene needs a compact proof counter over a thread or device composition. Visually it reads as small centered count chip used to mark how many proof points or receipts have been gathered, with a counting, minimal, proof-heavy tone, and it sits best on center overlay, proof counter, scene chrome surfaces.

For matching, look for beats like proof count chip / receipt counter or 证明数量芯片 / 收据计数器. Pair it with Trend Chart and Support Handoff Card when the scene needs more context. Prefer Reply Ready Toast when the count is not central to the beat or when the layout has no anchored center zone.

For adaptation, change count, label, position, numbers, labels first. Keep reading order, proof hierarchy, core chart or card structure stable so the asset still feels like the extracted original. Give the viewer enough stillness to read the proof before transitioning away. If the evidence model changes completely, fork a new proof asset rather than bending this one beyond recognition.
