---
{
  "id": "material-library/chat/feishu-card",
  "title": "Feishu Knowledge Card",
  "category": "chat",
  "summary": "Feishu-style bot card with a colored rail, structured fields, optional badge, and action row for knowledge updates.",
  "agentGoal": "Let the Agent reuse Feishu Knowledge Card when a script needs a structured Feishu-native update card inside a chat scene without rebuilding card chrome from scratch.",
  "whenToUse": [
    "Use when a Feishu chat needs to show a structured update, extracted summary, or action-ready knowledge payload.",
    "Use when the beat should feel native to a work chat tool instead of like a floating dashboard card."
  ],
  "avoidWhen": [
    "Avoid when the message should read like plain conversational text.",
    "Avoid when the scene is not visually grounded in Feishu-like chat chrome."
  ],
  "keywords": [
    "feishu card",
    "knowledge update card",
    "work chat card",
    "bot card",
    "structured message"
  ],
  "matchKeywords": [
    "feishu knowledge card",
    "work chat update card",
    "structured bot message",
    "chat knowledge payload",
    "飞书知识卡片",
    "工作群更新卡片",
    "结构化聊天卡片"
  ],
  "inputProps": [
    "card",
    "glowing",
    "onActionClick"
  ],
  "sourceProjects": [
    "projects/short-assets-auto_learn_knowledge"
  ],
  "previewRef": "material-library/showcase#feishu-card",
  "stability": "stable",
  "implementationRef": "material-library/src/chat/feishu-primitives.tsx",
  "sceneTypes": [
    "chat",
    "knowledge-update",
    "structured-message"
  ],
  "styleFamilies": [
    "feishu",
    "work-chat"
  ],
  "editableParts": [
    "title",
    "badge",
    "fields",
    "actions",
    "headerColor"
  ],
  "visualSignature": [
    "Compact white work-chat card with a colored left rail, field labels, and button row.",
    "Feels like a bot-delivered knowledge or ops update inside chat, not like a dashboard widget.",
    "Best on Feishu chat, work chat thread, and structured in-message payload surfaces."
  ],
  "selectionSignals": [
    "Reach for it when the information is too structured for plain text but still belongs inside chat.",
    "Best when the update should feel operational and native to a collaboration tool.",
    "Choose it when the viewer should read a few labeled fields and maybe take one immediate action."
  ],
  "compositionPatterns": [
    "Place it after a short setup message so the card feels like the answer to the thread.",
    "Pair it with Feishu Message, Typing Indicator, or the full Feishu Chat Scene to preserve tool context.",
    "Usually staged next to Feishu Message, Feishu Chat Scene, and Knowledge Dashboard Scene."
  ],
  "pairWithIds": [
    "material-library/chat/feishu-message",
    "material-library/chat/feishu-typing-indicator",
    "material-library/surfaces/feishu-chat-scene"
  ],
  "preferInsteadIds": [
    "material-library/chat/support-handoff-card",
    "material-library/surfaces/settings-section-shell"
  ],
  "dos": [
    "Use Feishu Knowledge Card when the beat needs structure but should still live inside chat.",
    "Adapt field content and action labels first while preserving the compact chat-native frame."
  ],
  "donts": [
    "Do not use it for long paragraphs of explanation.",
    "Do not strip away the chat context if the card is supposed to read as a message."
  ],
  "scriptRecipe": [
    "Set up the problem in one or two short chat lines.",
    "Let Feishu Knowledge Card deliver the structured update.",
    "Hand off to a dashboard scene or a follow-up message if more proof is needed."
  ],
  "narrativeRole": "component",
  "scriptTriggersEn": [
    "feishu knowledge card",
    "work chat update card",
    "structured bot message"
  ],
  "scriptTriggersZh": [
    "飞书知识卡片",
    "工作群更新卡片",
    "结构化聊天卡片"
  ],
  "negativeTriggersEn": [
    "plain conversational reply",
    "non-chat dashboard proof"
  ],
  "negativeTriggersZh": [
    "普通对话回复",
    "非聊天仪表板证明"
  ],
  "hostSurfaces": [
    "feishu chat",
    "work chat thread",
    "structured in-message payload"
  ],
  "toneTags": [
    "operational",
    "structured",
    "work-chat-native"
  ],
  "visualWeight": "medium",
  "informationDensity": "medium",
  "dominance": "primary",
  "reuseMode": "tweak-copy",
  "mutationCost": "low",
  "safeToChange": [
    "title",
    "badge",
    "field labels",
    "field values",
    "action labels",
    "header color"
  ],
  "keepFixed": [
    "compact card footprint",
    "field-based reading order",
    "chat-native chrome"
  ],
  "adaptationNotes": [
    "Keep the number of fields limited so the card still scans like a message payload.",
    "If the content becomes a larger proof panel, graduate to a scene or dashboard asset instead."
  ]
}
---
Feishu Knowledge Card is the structured-message component for this project family. It is useful when plain chat text is not enough, but the content still belongs inside a work-chat thread rather than inside a separate dashboard or settings panel.

For matching, think of beats like "the bot posts a structured update" or "the team chat needs an action-ready knowledge card." It is strongest when the scene already reads as Feishu or work chat. If the frame is not chat-native, a different proof surface will usually fit better.

For adaptation, change the field content, button labels, and header color first. Keep the compact footprint, the labeled field order, and the message-like scale stable so the card still reads as an extracted original rather than a generic app card.
