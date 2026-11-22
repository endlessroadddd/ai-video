---
{
  "id": "material-library/chat/feishu-reaction",
  "title": "Feishu Reaction Chip",
  "category": "chat",
  "summary": "Tiny reaction chip with emoji and count for lightweight social proof inside a work-chat thread.",
  "agentGoal": "Let the Agent reuse Feishu Reaction Chip when a work-chat scene needs a tiny acknowledgement, agreement, or celebration beat without escalating to a larger animation.",
  "whenToUse": [
    "Use when the chat beat only needs a tiny visible acknowledgement.",
    "Use when a message should feel socially validated without interrupting the thread."
  ],
  "avoidWhen": [
    "Avoid when the moment needs a stronger celebratory layer.",
    "Avoid when the frame has no visible message context."
  ],
  "keywords": [
    "reaction chip",
    "emoji count",
    "chat acknowledgement",
    "feishu reaction",
    "tiny social proof"
  ],
  "matchKeywords": [
    "feishu reaction chip",
    "tiny chat acknowledgement",
    "emoji count chip",
    "work chat reaction",
    "飞书表情反馈",
    "小型聊天反馈",
    "表情计数气泡"
  ],
  "inputProps": [
    "emoji",
    "count",
    "opacity",
    "scale"
  ],
  "sourceProjects": [
    "projects/short-assets-auto_learn_knowledge"
  ],
  "previewRef": "material-library/showcase#feishu-reaction",
  "stability": "stable",
  "implementationRef": "material-library/src/chat/feishu-primitives.tsx",
  "sceneTypes": [
    "chat",
    "reaction",
    "micro-feedback"
  ],
  "styleFamilies": [
    "feishu",
    "work-chat"
  ],
  "editableParts": [
    "emoji",
    "count",
    "opacity",
    "scale"
  ],
  "visualSignature": [
    "Small rounded chip with one emoji and a tiny count.",
    "Reads as lightweight thread feedback, not as a major effect layer.",
    "Best on message edge, work-chat reaction rail, and micro-feedback surfaces."
  ],
  "selectionSignals": [
    "Reach for it when the moment needs acknowledgement but not spectacle.",
    "Best when the message is already doing the storytelling and the reaction is only a small accent.",
    "Choose it when a count matters more than a free-floating emoji effect."
  ],
  "compositionPatterns": [
    "Attach it to the message it belongs to or to a compact reaction row nearby.",
    "Pair it with Feishu Message or Feishu Chat Scene rather than using it as a lone center-stage element.",
    "Usually staged next to Feishu Message, Feishu Chat Scene, and Animated Emoji."
  ],
  "pairWithIds": [
    "material-library/chat/feishu-message",
    "material-library/surfaces/feishu-chat-scene",
    "material-library/chat/animated-emoji"
  ],
  "preferInsteadIds": [
    "material-library/chat/floating-emoji",
    "material-library/chat/celebration-particles"
  ],
  "dos": [
    "Use Feishu Reaction Chip as a tiny social proof layer.",
    "Change emoji and count first while keeping the chip compact."
  ],
  "donts": [
    "Do not promote it to the visual center of the scene.",
    "Do not stack so many chips that they compete with the main message."
  ],
  "scriptRecipe": [
    "Let the message land first.",
    "Add Feishu Reaction Chip as a quick acknowledgement.",
    "Escalate to Floating Emoji or Celebration Particles only if the emotion needs more energy."
  ],
  "narrativeRole": "accent",
  "scriptTriggersEn": [
    "tiny chat acknowledgement",
    "emoji count chip",
    "work chat reaction"
  ],
  "scriptTriggersZh": [
    "飞书表情反馈",
    "小型聊天反馈",
    "表情计数气泡"
  ],
  "negativeTriggersEn": [
    "big celebration burst",
    "no visible message context"
  ],
  "negativeTriggersZh": [
    "大型庆祝爆发",
    "没有消息上下文"
  ],
  "hostSurfaces": [
    "message edge",
    "work-chat reaction rail",
    "micro-feedback"
  ],
  "toneTags": [
    "light",
    "social",
    "affirming"
  ],
  "visualWeight": "micro",
  "informationDensity": "low",
  "dominance": "supporting",
  "reuseMode": "drop-in",
  "mutationCost": "low",
  "safeToChange": [
    "emoji",
    "count",
    "opacity",
    "scale"
  ],
  "keepFixed": [
    "compact chip silhouette",
    "emoji plus count structure",
    "message-adjacent usage"
  ],
  "adaptationNotes": [
    "If the feeling should be more emotional than social, switch to a stronger emoji asset.",
    "Keep it attached to a believable message context."
  ]
}
---
Feishu Reaction Chip is the smallest feedback asset in this extraction set. It works when the chat thread needs a little visible acknowledgement, but not enough to justify a larger floating emoji or particle layer.

For matching, think "small reaction," "work chat acknowledgement," or "show that others noticed this message." The count is part of the meaning, so this asset is stronger than a loose emoji when collective response matters.

For adaptation, change the emoji and count first. Keep the chip compact and message-adjacent. If it starts acting like a standalone effect, it loses the work-chat feel that makes it useful.
