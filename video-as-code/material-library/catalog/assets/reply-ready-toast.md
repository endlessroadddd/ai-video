---
{
  "id": "material-library/chat/reply-ready-toast",
  "title": "Reply Ready Toast",
  "category": "chat",
  "summary": "Compact ready-state toast for suggested replies or draft review handoffs.",
  "agentGoal": "Let the Agent reuse Reply Ready Toast when a script needs reply ready on chat thread without rebuilding the surrounding chat layer from scratch.",
  "whenToUse": [
    "Use when a chat scene needs a small confirmation that a reply, draft, or review artifact is ready.",
    "Use when the scene can afford a light component layer on chat thread."
  ],
  "avoidWhen": [
    "Avoid when the message needs to carry rich context or multiple actions.",
    "Avoid when full handoff proof card."
  ],
  "keywords": [
    "toast",
    "reply",
    "review",
    "chat",
    "component",
    "ready-state",
    "lightweight",
    "operational"
  ],
  "matchKeywords": [
    "reply ready toast",
    "draft ready",
    "review toast",
    "reply ready",
    "draft available",
    "small ready-state handoff",
    "chat thread",
    "toast lane",
    "suggested reply state",
    "ready-state",
    "lightweight",
    "operational",
    "回复已就绪",
    "草稿可查看",
    "小型 ready-state 交接"
  ],
  "inputProps": [
    "message",
    "actionLabel",
    "ariaLabel",
    "onView"
  ],
  "sourceProjects": [
    "projects/demo-app"
  ],
  "previewRef": "material-library/showcase#material-library-chat-reply-ready-toast",
  "stability": "stable",
  "implementationRef": "material-library/src/chat/reply-ready-toast.tsx",
  "sceneTypes": [
    "chat",
    "review"
  ],
  "styleFamilies": [
    "lucius-light"
  ],
  "editableParts": [
    "message",
    "actionLabel"
  ],
  "visualSignature": [
    "Compact ready-state toast for suggested replies or draft review handoffs.",
    "Reads as a light ready-state, lightweight, operational component layer rather than a generic chat widget.",
    "Most natural on chat thread, toast lane, suggested reply state surfaces."
  ],
  "selectionSignals": [
    "Reach for it when a chat scene needs a small confirmation that a reply, draft, or review artifact is ready.",
    "Best when the scene needs a light ready-state layer on chat thread.",
    "Choose it when the main shell or proof is already present and this asset should reinforce it."
  ],
  "compositionPatterns": [
    "Attach it to the message, toast, or local action that actually owns the beat.",
    "Keep the surrounding copy short so the conversational signal stays scannable.",
    "Usually staged next to Composer Shell, Chat Bubble, and Floating Emoji Accent.",
    "Pair it with Composer Shell when the beat needs one more layer of context without replacing Reply Ready Toast."
  ],
  "pairWithIds": [
    "material-library/surfaces/composer-shell",
    "material-library/surfaces/chat-bubble",
    "material-library/chat/floating-emoji"
  ],
  "preferInsteadIds": [
    "material-library/surfaces/proof-chip"
  ],
  "dos": [
    "Use Reply Ready Toast only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with message and actionLabel while keeping core silhouette and readability grouping stable."
  ],
  "donts": [
    "Do not use it when the message needs to carry rich context or multiple actions.",
    "Do not rewrite core silhouette and readability grouping in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Keep the surrounding shell readable before Reply Ready Toast enters.",
    "Reply Ready Toast should own one clear readable unit, not compete with a second proof block.",
    "Prefer Proof Chip when the message needs to carry rich context or multiple actions."
  ],
  "narrativeRole": "component",
  "scriptTriggersEn": [
    "reply ready",
    "draft available",
    "small ready-state handoff"
  ],
  "scriptTriggersZh": [
    "回复已就绪",
    "草稿可查看",
    "小型 ready-state 交接"
  ],
  "negativeTriggersEn": [
    "full handoff proof card",
    "high-density evidence panel"
  ],
  "negativeTriggersZh": [
    "完整交接证明卡",
    "高密度证据面板"
  ],
  "hostSurfaces": [
    "chat thread",
    "toast lane",
    "suggested reply state"
  ],
  "toneTags": [
    "ready-state",
    "lightweight",
    "operational"
  ],
  "visualWeight": "light",
  "informationDensity": "low",
  "dominance": "supporting",
  "reuseMode": "tweak-copy",
  "mutationCost": "low",
  "safeToChange": [
    "message",
    "actionLabel",
    "labels",
    "data values",
    "local state copy"
  ],
  "keepFixed": [
    "core silhouette",
    "readability grouping",
    "spacing rhythm"
  ],
  "adaptationNotes": [
    "Keep the component readable in one glance before adding secondary motion around it.",
    "If you change the structural grouping, it is no longer a light adaptation of this component."
  ]
}
---
Reply Ready Toast is the right pick when a chat scene needs a small confirmation that a reply, draft, or review artifact is ready. Visually it reads as compact ready-state toast for suggested replies or draft review handoffs, with a ready-state, lightweight, operational tone, and it sits best on chat thread, toast lane, suggested reply state surfaces.

For matching, look for beats like reply ready / draft available or 回复已就绪 / 草稿可查看. Pair it with Composer Shell and Chat Bubble when the scene needs more context. Prefer Proof Chip when the message needs to carry rich context or multiple actions.

For adaptation, change message, actionLabel, labels, data values, local state copy first. Keep core silhouette, readability grouping, spacing rhythm stable so the asset still feels like the extracted original. Keep the component readable in one glance before adding secondary motion around it. If you change the structural grouping, it is no longer a light adaptation of this component.
