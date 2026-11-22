---
{
  "id": "material-library/chat/feishu-message",
  "title": "Feishu Message Row",
  "category": "chat",
  "summary": "Feishu-style message row with avatar, sender meta, text or card payload, and motion-friendly enter state.",
  "agentGoal": "Let the Agent reuse Feishu Message Row when a script needs Feishu-native chat beats with controllable reveal timing and optional card payloads.",
  "whenToUse": [
    "Use when the scene needs a work-chat message row that can hold either plain text or a structured card.",
    "Use when message timing and reveal order matter more than a custom chat bubble look."
  ],
  "avoidWhen": [
    "Avoid when the scene belongs to another platform with a different chat visual language.",
    "Avoid when a generic bubble shell is enough and Feishu-specific chrome would be noise."
  ],
  "keywords": [
    "feishu message",
    "work chat row",
    "chat message row",
    "message reveal",
    "bot message"
  ],
  "matchKeywords": [
    "feishu message row",
    "work chat message reveal",
    "chat line with avatar and meta",
    "feishu bot message",
    "飞书消息行",
    "工作聊天消息",
    "聊天消息逐条出现"
  ],
  "inputProps": [
    "msg",
    "participant",
    "opacity",
    "translateY",
    "onCardAction"
  ],
  "sourceProjects": [
    "projects/short-assets-auto_learn_knowledge"
  ],
  "previewRef": "material-library/showcase#feishu-message",
  "stability": "stable",
  "implementationRef": "material-library/src/chat/feishu-primitives.tsx",
  "sceneTypes": [
    "chat",
    "message-stream",
    "work-chat"
  ],
  "styleFamilies": [
    "feishu",
    "work-chat"
  ],
  "editableParts": [
    "message text",
    "timestamp",
    "participant",
    "card payload",
    "reveal timing"
  ],
  "visualSignature": [
    "Left-aligned message row with avatar, sender line, timestamp, and either text or embedded card.",
    "Feels more like real collaboration software than like stylized chat bubbles.",
    "Best on Feishu chat, work discussion thread, and message-stream surfaces."
  ],
  "selectionSignals": [
    "Reach for it when the scene needs to read like real team chat instead of consumer messaging.",
    "Best when reveal timing matters and each message should step in as a unit.",
    "Choose it when some rows may become cards while others stay plain text."
  ],
  "compositionPatterns": [
    "Use it inside Feishu Chat Scene or in a compact card preview that demonstrates message cadence.",
    "Pair it with Typing Indicator and Feishu Card for a complete work-chat beat.",
    "Usually staged next to Feishu Card, Feishu Typing Indicator, and Feishu Chat Scene."
  ],
  "pairWithIds": [
    "material-library/chat/feishu-card",
    "material-library/chat/feishu-typing-indicator",
    "material-library/surfaces/feishu-chat-scene"
  ],
  "preferInsteadIds": [
    "material-library/surfaces/chat-bubble"
  ],
  "dos": [
    "Use Feishu Message Row when the platform context should feel like work chat.",
    "Adjust content, participant, and reveal timing first while preserving the row structure."
  ],
  "donts": [
    "Do not force it into consumer-chat scenes that need a different shell.",
    "Do not overload one row with too many nested proof elements."
  ],
  "scriptRecipe": [
    "Queue short lines in the order the audience should process them.",
    "Use Feishu Message Row for each step in the thread.",
    "Escalate to Feishu Card or a full scene only when the message needs more structure."
  ],
  "narrativeRole": "component",
  "scriptTriggersEn": [
    "feishu message row",
    "work chat message reveal",
    "feishu bot message"
  ],
  "scriptTriggersZh": [
    "飞书消息行",
    "工作聊天消息",
    "聊天消息逐条出现"
  ],
  "negativeTriggersEn": [
    "consumer dm bubble",
    "single proof card without chat context"
  ],
  "negativeTriggersZh": [
    "消费级私信气泡",
    "没有聊天上下文的单张证明卡"
  ],
  "hostSurfaces": [
    "feishu chat",
    "work discussion thread",
    "message stream"
  ],
  "toneTags": [
    "collaborative",
    "operational",
    "grounded"
  ],
  "visualWeight": "light",
  "informationDensity": "low",
  "dominance": "supporting",
  "reuseMode": "tweak-copy",
  "mutationCost": "low",
  "safeToChange": [
    "message text",
    "sender",
    "timestamp",
    "card payload",
    "reveal timing"
  ],
  "keepFixed": [
    "avatar-meta-message row structure",
    "work-chat spacing",
    "left-aligned collaboration-tool feel"
  ],
  "adaptationNotes": [
    "Preserve the row rhythm so successive messages still read as a believable chat stream.",
    "If the scene no longer needs Feishu-specific identity, switch to a more general shell."
  ]
}
---
Feishu Message Row is the base unit of the auto-learn work-chat scene. It is a better fit than a generic bubble when the script wants the audience to feel like they are watching a real team conversation inside a collaboration tool.

For matching, look for beats like "show the team conversation line by line" or "reveal a bot answer inside the work chat thread." The component is especially useful because it can handle both plain text and an embedded card without changing the overall row rhythm.

For adaptation, change text, sender, timestamp, and reveal timing first. Keep the avatar-meta-message row intact. That structure is what makes the component feel like Feishu rather than like a generic chat bubble.
