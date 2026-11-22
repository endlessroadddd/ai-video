---
{
  "id": "material-library/chat/message-emphasis",
  "title": "Message Emphasis",
  "category": "chat",
  "summary": "Keyword emphasis helper that bolds the high-stress phrases from support messages using the original Discord-style treatment.",
  "agentGoal": "Let the Agent reuse Message Emphasis when a script needs stress the key phrase on support message without rebuilding the surrounding chat layer from scratch.",
  "whenToUse": [
    "Use when complaint or escalation text needs a few stress words to read faster on screen.",
    "Use when the scene can afford a micro accent layer on support message."
  ],
  "avoidWhen": [
    "Avoid when the copy is already visually dense or when every phrase would become emphasized.",
    "Avoid when the whole card is already the proof."
  ],
  "keywords": [
    "message emphasis",
    "highlight",
    "stress words",
    "support copy",
    "accent",
    "urgent",
    "reader-guiding",
    "support"
  ],
  "matchKeywords": [
    "highlight complaint text",
    "support message emphasis",
    "stress phrase styling",
    "stress the key phrase",
    "highlight user pain point",
    "support quote emphasis",
    "support message",
    "chat bubble",
    "quote block",
    "urgent",
    "reader-guiding",
    "support",
    "强调关键信息",
    "突出用户痛点",
    "support 引文强调"
  ],
  "inputProps": [
    "text",
    "className",
    "as"
  ],
  "sourceProjects": [
    "projects/short-asset-ai-heavy-catch-you"
  ],
  "previewRef": "material-library/showcase#message-emphasis",
  "stability": "stable",
  "implementationRef": "material-library/src/chat/message-emphasis.tsx",
  "sceneTypes": [
    "chat",
    "complaint",
    "escalation"
  ],
  "styleFamilies": [
    "discord-dark"
  ],
  "editableParts": [
    "patterns",
    "wrapper-tag",
    "copy"
  ],
  "visualSignature": [
    "Keyword emphasis helper that bolds the high-stress phrases from support messages using the original Discord-style treatment.",
    "Reads as a micro urgent, reader-guiding, support accent layer rather than a generic chat widget.",
    "Most natural on support message, chat bubble, quote block surfaces."
  ],
  "selectionSignals": [
    "Reach for it when complaint or escalation text needs a few stress words to read faster on screen.",
    "Best when the scene needs a micro urgent layer on support message.",
    "Choose it when the main shell or proof is already present and this asset should reinforce it."
  ],
  "compositionPatterns": [
    "Attach it to the message, toast, or local action that actually owns the beat.",
    "Keep the surrounding copy short so the conversational signal stays scannable.",
    "Usually staged next to Chat Bubble, Support Handoff Card, and Discord-Style Avatar.",
    "Pair it with Chat Bubble when the beat needs one more layer of context without replacing Message Emphasis."
  ],
  "pairWithIds": [
    "material-library/surfaces/chat-bubble",
    "material-library/chat/support-handoff-card",
    "material-library/chat/discord-avatar"
  ],
  "preferInsteadIds": [
    "material-library/chat/assist-task-rich-text"
  ],
  "dos": [
    "Use Message Emphasis only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with patterns and wrapper-tag while keeping compact footprint and single-beat timing stable."
  ],
  "donts": [
    "Do not use it when the copy is already visually dense or when every phrase would become emphasized.",
    "Do not rewrite compact footprint and single-beat timing in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Establish the local message or action first.",
    "Message Emphasis should land exactly on the beat that needs emotional punctuation.",
    "Prefer Assist Task Rich Text when the copy is already visually dense or when every phrase would become emphasized."
  ],
  "narrativeRole": "accent",
  "scriptTriggersEn": [
    "stress the key phrase",
    "highlight user pain point",
    "support quote emphasis"
  ],
  "scriptTriggersZh": [
    "强调关键信息",
    "突出用户痛点",
    "support 引文强调"
  ],
  "negativeTriggersEn": [
    "the whole card is already the proof",
    "copy is already short and scannable"
  ],
  "negativeTriggersZh": [
    "整张卡已经是证明主体",
    "文案已经足够短且易读"
  ],
  "hostSurfaces": [
    "support message",
    "chat bubble",
    "quote block"
  ],
  "toneTags": [
    "urgent",
    "reader-guiding",
    "support"
  ],
  "visualWeight": "micro",
  "informationDensity": "low",
  "dominance": "supporting",
  "reuseMode": "drop-in",
  "mutationCost": "low",
  "safeToChange": [
    "patterns",
    "wrapper-tag",
    "copy",
    "text",
    "className"
  ],
  "keepFixed": [
    "compact footprint",
    "single-beat timing",
    "supporting-layer role"
  ],
  "adaptationNotes": [
    "Use accents as punctuation after the viewer already understands the local context.",
    "If the beat needs to carry the main proof, move up to a proof or shell asset instead."
  ]
}
---
Message Emphasis is the right pick when complaint or escalation text needs a few stress words to read faster on screen. Visually it reads as keyword emphasis helper that bolds the high-stress phrases from support messages using the original discord-style treatment, with a urgent, reader-guiding, support tone, and it sits best on support message, chat bubble, quote block surfaces.

For matching, look for beats like stress the key phrase / highlight user pain point or 强调关键信息 / 突出用户痛点. Pair it with Chat Bubble and Support Handoff Card when the scene needs more context. Prefer Assist Task Rich Text when the copy is already visually dense or when every phrase would become emphasized.

For adaptation, change patterns, wrapper-tag, copy, text, className first. Keep compact footprint, single-beat timing, supporting-layer role stable so the asset still feels like the extracted original. Use accents as punctuation after the viewer already understands the local context. If the beat needs to carry the main proof, move up to a proof or shell asset instead.
