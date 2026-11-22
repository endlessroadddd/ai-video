---
{
  "id": "material-library/chat/discord-message-card",
  "title": "Discord Message Card",
  "category": "chat",
  "summary": "Discord-native message card with author line, emphasized body copy, and optional reaction rail.",
  "agentGoal": "Let the Agent reuse Discord Message Card when a script needs discord transcript row on message list without rebuilding the surrounding chat layer from scratch.",
  "whenToUse": [
    "Use when a Discord scene needs one readable message unit with optional reactions and emphasis.",
    "Use when the scene can afford a light component layer on message list."
  ],
  "avoidWhen": [
    "Avoid when the scene needs a full transcript environment or when a simpler bubble already reads clearly.",
    "Avoid when single-line micro chip."
  ],
  "keywords": [
    "discord message",
    "message card",
    "transcript row",
    "reaction rail",
    "component",
    "discord-native",
    "readable",
    "structured"
  ],
  "matchKeywords": [
    "discord message card",
    "transcript row",
    "discord chat row",
    "message with reactions",
    "discord transcript row",
    "message list",
    "community transcript",
    "signal thread",
    "discord-native",
    "readable",
    "structured",
    "Discord 消息卡",
    "转录消息行",
    "带 reaction 的消息"
  ],
  "inputProps": [
    "author",
    "meta",
    "body",
    "emphasis",
    "reactions",
    "avatarVariant"
  ],
  "sourceProjects": [],
  "previewRef": "material-library/showcase#discord-message-card",
  "stability": "stable",
  "implementationRef": "material-library/src/chat/discord-message-card.tsx",
  "sceneTypes": [
    "discord",
    "community-chat",
    "transcript"
  ],
  "styleFamilies": [
    "discord-dark"
  ],
  "editableParts": [
    "author",
    "meta",
    "body",
    "reactions",
    "avatarVariant"
  ],
  "visualSignature": [
    "Discord-native message card with author line, emphasized body copy, and optional reaction rail.",
    "Reads as a light discord-native, readable, structured component layer rather than a generic chat widget.",
    "Most natural on message list, community transcript, signal thread surfaces."
  ],
  "selectionSignals": [
    "Reach for it when the scene needs one readable Discord message unit that can still carry reactions or emphasis.",
    "Best when the scene needs a light discord-native layer on message list.",
    "Choose it when the main shell or proof is already present and this asset should reinforce it."
  ],
  "compositionPatterns": [
    "Attach it to a transcript or shell that already establishes the platform context.",
    "Keep each card to one main point so the transcript stays scannable.",
    "Usually staged next to Discord-Style Avatar, Reaction Badge, and Discord Transcript Stage.",
    "Pair it with Discord Transcript Stage when the beat needs one more layer of context without replacing Discord Message Card."
  ],
  "pairWithIds": [
    "material-library/chat/discord-avatar",
    "material-library/chat/reaction-badge",
    "material-library/surfaces/discord-transcript-stage"
  ],
  "preferInsteadIds": [
    "material-library/surfaces/chat-bubble"
  ],
  "dos": [
    "Use Discord Message Card only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with body and reactions while keeping card hierarchy and readable spacing stable."
  ],
  "donts": [
    "Do not use it when the scene needs a full transcript environment or when a simpler bubble already reads clearly.",
    "Do not rewrite card hierarchy and readable spacing in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Land one readable message first, then let more cards accumulate around it if needed.",
    "Keep each card responsible for one signal, not the whole scene summary.",
    "Prefer Chat Bubble when the scene needs a looser or more minimal conversation rhythm."
  ],
  "narrativeRole": "component",
  "scriptTriggersEn": [
    "discord transcript row",
    "message with reactions",
    "discord message card"
  ],
  "scriptTriggersZh": [
    "Discord 消息卡",
    "带 reaction 的消息",
    "转录消息行"
  ],
  "negativeTriggersEn": [
    "single-line micro chip",
    "full community environment"
  ],
  "negativeTriggersZh": [
    "单行极小提示",
    "完整社区环境"
  ],
  "hostSurfaces": [
    "message list",
    "community transcript",
    "signal thread"
  ],
  "toneTags": [
    "discord-native",
    "readable",
    "structured"
  ],
  "visualWeight": "light",
  "informationDensity": "medium",
  "dominance": "supporting",
  "reuseMode": "drop-in",
  "mutationCost": "low",
  "safeToChange": [
    "author",
    "meta",
    "body",
    "reactions",
    "labels"
  ],
  "keepFixed": [
    "card hierarchy",
    "readable spacing",
    "message-first grouping"
  ],
  "adaptationNotes": [
    "Keep each card readable in one glance before adding extra chrome around it.",
    "If the grouping stops feeling like one message unit, fork a new transcript component instead."
  ]
}
---
Discord Message Card is the right pick when a Discord scene needs one readable message unit that can still carry reactions or emphasis. It works best once the platform context is already established and the transcript just needs a clean, reusable row structure.
