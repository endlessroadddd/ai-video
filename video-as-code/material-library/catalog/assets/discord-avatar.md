---
{
  "id": "material-library/chat/discord-avatar",
  "title": "Discord-Style Avatar",
  "category": "chat",
  "summary": "SVG-driven Discord-style avatar with preset colorways and robot variant.",
  "agentGoal": "Let the Agent reuse Discord-Style Avatar when a script needs discord avatar on message list without rebuilding the surrounding chat layer from scratch.",
  "whenToUse": [
    "Use when a chat scene needs friendly avatar identity without photo assets.",
    "Use when the scene can afford a light component layer on message list."
  ],
  "avoidWhen": [
    "Avoid when you already have branded avatar art or photos.",
    "Avoid when photoreal profile art."
  ],
  "keywords": [
    "avatar",
    "discord",
    "chat",
    "identity",
    "component",
    "discord-native",
    "social",
    "recognizable"
  ],
  "matchKeywords": [
    "discord avatar",
    "chat avatar",
    "robot avatar",
    "member identity chip",
    "chat identity marker",
    "message list",
    "member rail",
    "dm header",
    "discord-native",
    "social",
    "recognizable",
    "Discord 风格头像",
    "成员身份标识",
    "聊天身份标记"
  ],
  "inputProps": [
    "name",
    "size",
    "status"
  ],
  "sourceProjects": [
    "projects/short-assets-discord_dm_refund",
    "projects/short-asset-ai-heavy-catch-you",
    "projects/short-asset-break-immersion"
  ],
  "previewRef": "material-library/showcase#discord-avatar",
  "stability": "stable",
  "implementationRef": "material-library/src/chat/discord-avatar.tsx",
  "sceneTypes": [
    "community-chat",
    "support-thread"
  ],
  "styleFamilies": [
    "discord-dark"
  ],
  "editableParts": [
    "name",
    "status",
    "size"
  ],
  "visualSignature": [
    "SVG-driven Discord-style avatar with preset colorways and robot variant.",
    "Reads as a light discord-native, social, recognizable component layer rather than a generic chat widget.",
    "Most natural on message list, member rail, dm header surfaces."
  ],
  "selectionSignals": [
    "Reach for it when a chat scene needs friendly avatar identity without photo assets.",
    "Best when the scene needs a light discord-native layer on message list.",
    "Choose it when the main shell or proof is already present and this asset should reinforce it."
  ],
  "compositionPatterns": [
    "Attach it to the message, toast, or local action that actually owns the beat.",
    "Keep the surrounding copy short so the conversational signal stays scannable.",
    "Usually staged next to Avatar Presets, Chat Bubble, and Phone Frame.",
    "Pair it with Avatar Presets when the beat needs one more layer of context without replacing Discord-Style Avatar."
  ],
  "pairWithIds": [
    "material-library/chat/avatar-presets",
    "material-library/surfaces/chat-bubble",
    "material-library/surfaces/phone-frame"
  ],
  "preferInsteadIds": [],
  "dos": [
    "Use Discord-Style Avatar only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with name and status while keeping core silhouette and readability grouping stable."
  ],
  "donts": [
    "Do not use it when you already have branded avatar art or photos.",
    "Do not rewrite core silhouette and readability grouping in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Keep the surrounding shell readable before Discord-Style Avatar enters.",
    "Discord-Style Avatar should own one clear readable unit, not compete with a second proof block.",
    "Pair with Avatar Presets if the next beat needs more context or follow-through."
  ],
  "narrativeRole": "component",
  "scriptTriggersEn": [
    "discord avatar",
    "member identity chip",
    "chat identity marker"
  ],
  "scriptTriggersZh": [
    "Discord 风格头像",
    "成员身份标识",
    "聊天身份标记"
  ],
  "negativeTriggersEn": [
    "photoreal profile art",
    "brand logo lockup"
  ],
  "negativeTriggersZh": [
    "写实头像插图",
    "品牌 logo 锁定"
  ],
  "hostSurfaces": [
    "message list",
    "member rail",
    "dm header"
  ],
  "toneTags": [
    "discord-native",
    "social",
    "recognizable"
  ],
  "visualWeight": "light",
  "informationDensity": "low",
  "dominance": "supporting",
  "reuseMode": "drop-in",
  "mutationCost": "low",
  "safeToChange": [
    "name",
    "status",
    "size",
    "labels",
    "data values"
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
Discord-Style Avatar is the right pick when a chat scene needs friendly avatar identity without photo assets. Visually it reads as svg-driven discord-style avatar with preset colorways and robot variant, with a discord-native, social, recognizable tone, and it sits best on message list, member rail, dm header surfaces.

For matching, look for beats like discord avatar / member identity chip or Discord 风格头像 / 成员身份标识. Pair it with Avatar Presets and Chat Bubble when the scene needs more context. Prefer a lighter alternative when you already have branded avatar art or photos.

For adaptation, change name, status, size, labels, data values first. Keep core silhouette, readability grouping, spacing rhythm stable so the asset still feels like the extracted original. Keep the component readable in one glance before adding secondary motion around it. If you change the structural grouping, it is no longer a light adaptation of this component.
