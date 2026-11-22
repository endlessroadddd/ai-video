---
{
  "id": "material-library/surfaces/chat-bubble",
  "title": "Chat Bubble",
  "category": "surfaces",
  "summary": "Reusable chat bubble shell with reveal controls and inline accessory support.",
  "agentGoal": "Let the Agent reuse Chat Bubble when a script needs chat exchange on chat thread without rebuilding the surrounding surfaces layer from scratch.",
  "whenToUse": [
    "Use for short-asset conversations where copy needs timed reveal or accent.",
    "Use when the scene can afford a light component layer on chat thread."
  ],
  "avoidWhen": [
    "Avoid if the scene uses a complex chat renderer already.",
    "Avoid when full community environment."
  ],
  "keywords": [
    "chat",
    "bubble",
    "message",
    "component",
    "chat-native",
    "conversational",
    "lucius"
  ],
  "matchKeywords": [
    "chat bubble",
    "message bubble",
    "chat exchange",
    "message-by-message reveal",
    "conversation shell",
    "chat thread",
    "message list",
    "phone shell",
    "chat-native",
    "conversational",
    "lucius",
    "聊天往返",
    "逐条消息 reveal",
    "对话气泡壳层"
  ],
  "inputProps": [
    "align",
    "tone",
    "text",
    "reveal",
    "textProgress",
    "subdued",
    "compact",
    "emojiCodepoint"
  ],
  "sourceProjects": [
    "projects/short-asset-thought-you-were-staff"
  ],
  "previewRef": "material-library/showcase#chat-bubble",
  "stability": "stable",
  "implementationRef": "material-library/src/surfaces/chat-bubble.tsx",
  "sceneTypes": [
    "chat",
    "support-thread"
  ],
  "styleFamilies": [
    "lucius-dark"
  ],
  "editableParts": [
    "copy",
    "tone",
    "alignment"
  ],
  "visualSignature": [
    "Reusable chat bubble shell with reveal controls and inline accessory support.",
    "Reads as a light chat-native, conversational, lucius component layer rather than a generic surfaces widget.",
    "Most natural on chat thread, message list, phone shell surfaces."
  ],
  "selectionSignals": [
    "Reach for it when Use for short-asset conversations where copy needs timed reveal or accent.",
    "Best when the scene needs a light chat-native layer on chat thread.",
    "Choose it when the main shell or proof is already present and this asset should reinforce it."
  ],
  "compositionPatterns": [
    "Use it as frame chrome around one or two focal elements, not as a dense page clone.",
    "Let the shell establish context before a smaller proof element takes over.",
    "Usually staged next to Discord-Style Avatar, Phone Frame, and Message Emphasis.",
    "Pair it with Discord-Style Avatar when the beat needs one more layer of context without replacing Chat Bubble."
  ],
  "pairWithIds": [
    "material-library/chat/discord-avatar",
    "material-library/surfaces/phone-frame",
    "material-library/chat/message-emphasis"
  ],
  "preferInsteadIds": [
    "material-library/chat/support-handoff-card"
  ],
  "dos": [
    "Use Chat Bubble only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with copy and tone while keeping core silhouette and readability grouping stable."
  ],
  "donts": [
    "Do not use it when Avoid if the scene uses a complex chat renderer already.",
    "Do not rewrite core silhouette and readability grouping in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Keep the surrounding shell readable before Chat Bubble enters.",
    "Chat Bubble should own one clear readable unit, not compete with a second proof block.",
    "Prefer Support Handoff Card when Avoid if the scene uses a complex chat renderer already."
  ],
  "narrativeRole": "component",
  "scriptTriggersEn": [
    "chat exchange",
    "message-by-message reveal",
    "conversation shell"
  ],
  "scriptTriggersZh": [
    "聊天往返",
    "逐条消息 reveal",
    "对话气泡壳层"
  ],
  "negativeTriggersEn": [
    "full community environment",
    "proof card with dense fields"
  ],
  "negativeTriggersZh": [
    "完整社区环境",
    "高密度字段证明卡"
  ],
  "hostSurfaces": [
    "chat thread",
    "message list",
    "phone shell"
  ],
  "toneTags": [
    "chat-native",
    "conversational",
    "lucius"
  ],
  "visualWeight": "light",
  "informationDensity": "low",
  "dominance": "supporting",
  "reuseMode": "tweak-copy",
  "mutationCost": "low",
  "safeToChange": [
    "copy",
    "tone",
    "alignment",
    "align",
    "labels"
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
Chat Bubble is the right pick when Use for short-asset conversations where copy needs timed reveal or accent. Visually it reads as reusable chat bubble shell with reveal controls and inline accessory support, with a chat-native, conversational, lucius tone, and it sits best on chat thread, message list, phone shell surfaces.

For matching, look for beats like chat exchange / message-by-message reveal or 聊天往返 / 逐条消息 reveal. Pair it with Discord-Style Avatar and Phone Frame when the scene needs more context. Prefer Support Handoff Card when Avoid if the scene uses a complex chat renderer already.

For adaptation, change copy, tone, alignment, align, labels first. Keep core silhouette, readability grouping, spacing rhythm stable so the asset still feels like the extracted original. Keep the component readable in one glance before adding secondary motion around it. If you change the structural grouping, it is no longer a light adaptation of this component.
