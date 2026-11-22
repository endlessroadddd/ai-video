---
{
  "id": "material-library/chat/support-handoff-card",
  "title": "Support Handoff Card",
  "category": "chat",
  "summary": "Structured billing or support handoff card with owner, status, summary fields, and a three-step progress rail.",
  "agentGoal": "Let the Agent reuse Support Handoff Card when a script needs human handoff on chat thread without rebuilding the surrounding chat layer from scratch.",
  "whenToUse": [
    "Use when the scene needs to show a human handoff, escalation, or correction workflow inside chat.",
    "Use when the scene can afford a medium proof layer on chat thread."
  ],
  "avoidWhen": [
    "Avoid when the handoff is only implied and a simpler status badge would be enough.",
    "Avoid when handoff only implied."
  ],
  "keywords": [
    "handoff",
    "support",
    "billing",
    "card",
    "proof",
    "procedural",
    "proof-heavy"
  ],
  "matchKeywords": [
    "support handoff card",
    "billing escalation card",
    "handoff widget",
    "human handoff",
    "billing escalation",
    "structured correction workflow",
    "chat thread",
    "support proof card",
    "handoff lane",
    "support",
    "procedural",
    "proof-heavy",
    "人工交接",
    "账单升级处理",
    "结构化纠错流程"
  ],
  "inputProps": [
    "card",
    "status"
  ],
  "sourceProjects": [
    "projects/demo-app",
    "projects/short-asset-golden-case-support"
  ],
  "previewRef": "material-library/showcase#material-library-chat-support-handoff-card",
  "stability": "stable",
  "implementationRef": "material-library/src/chat/support-handoff-card.tsx",
  "sceneTypes": [
    "chat",
    "handoff",
    "support-proof"
  ],
  "styleFamilies": [
    "lucius-light"
  ],
  "editableParts": [
    "title",
    "owner",
    "summaryItems",
    "steps",
    "status labels"
  ],
  "visualSignature": [
    "Structured billing or support handoff card with owner, status, summary fields, and a three-step progress rail.",
    "Reads as a medium support, procedural, proof-heavy proof layer rather than a generic chat widget.",
    "Most natural on chat thread, support proof card, handoff lane surfaces."
  ],
  "selectionSignals": [
    "Reach for it when the scene needs to show a human handoff, escalation, or correction workflow inside chat.",
    "Best when the scene needs a medium support layer on chat thread.",
    "Choose it when this asset should carry the main readable beat."
  ],
  "compositionPatterns": [
    "Attach it to the message, toast, or local action that actually owns the beat.",
    "Keep the surrounding copy short so the conversational signal stays scannable.",
    "Usually staged next to Proof Chip, Settings Section Shell, and Knowledge File Type Icon.",
    "Pair it with Proof Chip when the beat needs one more layer of context without replacing Support Handoff Card."
  ],
  "pairWithIds": [
    "material-library/surfaces/proof-chip",
    "material-library/surfaces/settings-section-shell",
    "material-library/chat/knowledge-file-type-icon"
  ],
  "preferInsteadIds": [
    "material-library/chat/reply-ready-toast"
  ],
  "dos": [
    "Use Support Handoff Card only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with title and owner while keeping reading order and proof hierarchy stable."
  ],
  "donts": [
    "Do not use it when the handoff is only implied and a simpler status badge would be enough.",
    "Do not rewrite reading order and proof hierarchy in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Set the context first, then let Support Handoff Card carry the evidence beat.",
    "Hold on the proof long enough for the viewer to complete the main read.",
    "Prefer Reply Ready Toast when the handoff is only implied and a simpler status badge would be enough."
  ],
  "narrativeRole": "proof",
  "scriptTriggersEn": [
    "human handoff",
    "billing escalation",
    "structured correction workflow"
  ],
  "scriptTriggersZh": [
    "人工交接",
    "账单升级处理",
    "结构化纠错流程"
  ],
  "negativeTriggersEn": [
    "handoff only implied",
    "tiny status update"
  ],
  "negativeTriggersZh": [
    "交接只是被暗示",
    "只是很小的状态更新"
  ],
  "hostSurfaces": [
    "chat thread",
    "support proof card",
    "handoff lane"
  ],
  "toneTags": [
    "support",
    "procedural",
    "proof-heavy"
  ],
  "visualWeight": "medium",
  "informationDensity": "medium",
  "dominance": "primary",
  "reuseMode": "tweak-copy",
  "mutationCost": "medium",
  "safeToChange": [
    "title",
    "owner",
    "summaryItems",
    "card",
    "status"
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
Support Handoff Card is the right pick when the scene needs to show a human handoff, escalation, or correction workflow inside chat. Visually it reads as structured billing or support handoff card with owner, status, summary fields, and a three-step progress rail, with a support, procedural, proof-heavy tone, and it sits best on chat thread, support proof card, handoff lane surfaces.

For matching, look for beats like human handoff / billing escalation or 人工交接 / 账单升级处理. Pair it with Proof Chip and Settings Section Shell when the scene needs more context. Prefer Reply Ready Toast when the handoff is only implied and a simpler status badge would be enough.

For adaptation, change title, owner, summaryItems, card, status first. Keep reading order, proof hierarchy, core chart or card structure stable so the asset still feels like the extracted original. Give the viewer enough stillness to read the proof before transitioning away. If the evidence model changes completely, fork a new proof asset rather than bending this one beyond recognition.
