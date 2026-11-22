---
{
  "id": "material-library/chat/feishu-typing-indicator",
  "title": "Feishu Typing Indicator",
  "category": "chat",
  "summary": "Feishu-style typing row with avatar, name, and bouncing dots to imply an in-progress response inside work chat.",
  "agentGoal": "Let the Agent reuse Feishu Typing Indicator when a Feishu or work-chat scene needs a lightweight in-progress beat before the next message lands.",
  "whenToUse": [
    "Use when the next message should feel anticipated rather than instantly dropped in.",
    "Use when the scene needs a brief pause that still reads as active conversation."
  ],
  "avoidWhen": [
    "Avoid when the scene should feel immediate with no waiting beat.",
    "Avoid when the platform is not a work-chat environment."
  ],
  "keywords": [
    "typing indicator",
    "feishu typing",
    "work chat typing",
    "in progress reply",
    "chat pause"
  ],
  "matchKeywords": [
    "feishu typing indicator",
    "work chat waiting beat",
    "bot is typing",
    "in progress reply row",
    "飞书输入中",
    "工作聊天等待提示",
    "机器人正在输入"
  ],
  "inputProps": [
    "participant"
  ],
  "sourceProjects": [
    "projects/short-assets-auto_learn_knowledge"
  ],
  "previewRef": "material-library/showcase#feishu-typing-indicator",
  "stability": "stable",
  "implementationRef": "material-library/src/chat/feishu-primitives.tsx",
  "sceneTypes": [
    "chat",
    "pause",
    "anticipation"
  ],
  "styleFamilies": [
    "feishu",
    "work-chat"
  ],
  "editableParts": [
    "participant"
  ],
  "visualSignature": [
    "Short work-chat row with avatar, participant name, and three bouncing dots.",
    "Feels like a brief conversational hold, not a heavy animation beat.",
    "Best on Feishu chat, work-thread pause, and anticipation surfaces."
  ],
  "selectionSignals": [
    "Reach for it when the audience should expect an answer in the next beat.",
    "Best when the pause needs to feel active rather than dead.",
    "Choose it for short suspense inside a chat thread, not for a full transition."
  ],
  "compositionPatterns": [
    "Use it between two message rows, usually before a card or authoritative reply lands.",
    "Pair it with Feishu Message Row or Feishu Chat Scene so the platform context stays intact.",
    "Usually staged next to Feishu Message, Feishu Card, and Feishu Chat Scene."
  ],
  "pairWithIds": [
    "material-library/chat/feishu-message",
    "material-library/chat/feishu-card",
    "material-library/surfaces/feishu-chat-scene"
  ],
  "preferInsteadIds": [
    "material-library/chat/reply-ready-toast"
  ],
  "dos": [
    "Use Feishu Typing Indicator for brief anticipation beats inside work chat.",
    "Swap the participant identity first and keep the indicator short."
  ],
  "donts": [
    "Do not leave it on screen so long that it feels stalled.",
    "Do not use it as a replacement for a real transition."
  ],
  "scriptRecipe": [
    "Let the previous line land.",
    "Hold with Feishu Typing Indicator for a short active pause.",
    "Resolve quickly into the answer or card."
  ],
  "narrativeRole": "accent",
  "scriptTriggersEn": [
    "feishu typing indicator",
    "work chat waiting beat",
    "bot is typing"
  ],
  "scriptTriggersZh": [
    "飞书输入中",
    "工作聊天等待提示",
    "机器人正在输入"
  ],
  "negativeTriggersEn": [
    "immediate answer",
    "non-chat transition"
  ],
  "negativeTriggersZh": [
    "立即给出答案",
    "非聊天转场"
  ],
  "hostSurfaces": [
    "feishu chat",
    "work-thread pause",
    "anticipation beat"
  ],
  "toneTags": [
    "anticipatory",
    "lightweight",
    "conversational"
  ],
  "visualWeight": "micro",
  "informationDensity": "low",
  "dominance": "supporting",
  "reuseMode": "drop-in",
  "mutationCost": "low",
  "safeToChange": [
    "participant"
  ],
  "keepFixed": [
    "short active pause behavior",
    "three-dot indicator rhythm",
    "work-chat row format"
  ],
  "adaptationNotes": [
    "Keep this beat short so it still feels intentional.",
    "If the pause needs to carry meaning beyond anticipation, pick a stronger transition or overlay."
  ]
}
---
Feishu Typing Indicator is the tiny anticipation beat in this project family. It adds just enough delay to make the next message feel earned, without introducing a full transition or extra UI layer.

For matching, think of phrases like "bot is typing," "hold for the answer," or "give the chat one active pause." It is strongest inside a Feishu-native conversation and weakest when used as a generic waiting animation outside chat.

For adaptation, change the participant first and keep the pause short. The identity of the asset is the quick conversational suspense, not the dots themselves.
