---
{
  "id": "material-library/surfaces/feishu-chat-scene",
  "title": "Feishu Chat Scene",
  "category": "surfaces",
  "summary": "Full Feishu-like multi-panel chat environment with nav rail, channel list, message stream, typing state, and input area.",
  "agentGoal": "Let the Agent reuse Feishu Chat Scene when a script needs a full work-chat environment that can host real conversation beats, knowledge cards, and typing pauses without rebuilding platform chrome.",
  "whenToUse": [
    "Use when the frame needs to clearly read as an active Feishu-like work discussion environment.",
    "Use when the scene owns the screen and the platform context matters as much as the message content."
  ],
  "avoidWhen": [
    "Avoid when only one local message or card is needed.",
    "Avoid when the script should stay platform-agnostic or much lighter."
  ],
  "keywords": [
    "feishu scene",
    "work chat environment",
    "team discussion ui",
    "chat platform shell",
    "knowledge discussion scene"
  ],
  "matchKeywords": [
    "feishu chat scene",
    "work chat environment",
    "team discussion ui",
    "knowledge learned from discussion",
    "飞书聊天场景",
    "工作群环境",
    "团队讨论界面"
  ],
  "inputProps": [
    "chatTitle",
    "historyMessages",
    "messageTimeline",
    "onCardAction",
    "opacity",
    "participants",
    "t",
    "typingEndMs",
    "typingParticipantId",
    "typingStartMs"
  ],
  "sourceProjects": [
    "projects/short-assets-auto_learn_knowledge"
  ],
  "previewRef": "material-library/showcase#feishu-chat-scene",
  "stability": "beta",
  "implementationRef": "material-library/src/surfaces/feishu-chat-scene.tsx",
  "sceneTypes": [
    "environment",
    "chat",
    "discussion"
  ],
  "styleFamilies": [
    "feishu",
    "work-chat",
    "platform-shell"
  ],
  "editableParts": [
    "chatTitle",
    "historyMessages",
    "messageTimeline",
    "participants",
    "typing window"
  ],
  "visualSignature": [
    "Full work-chat window with left nav, chat list, message panel, tabs, and input area.",
    "Feels like a platform environment that can host multiple beats, not a single card or component.",
    "Best on full-scene work chat, discussion environment, and collaboration-tool surfaces."
  ],
  "selectionSignals": [
    "Reach for it when the audience must immediately recognize the work-chat platform context.",
    "Best when the scene needs multiple consecutive chat beats instead of one isolated component.",
    "Choose it when the platform itself should own the frame."
  ],
  "compositionPatterns": [
    "Use it as the opening environment before handoff into a dashboard, conclusion, or overlay.",
    "Populate it with Feishu Message, Feishu Card, and Typing Indicator rather than layering unrelated chat shells on top.",
    "Usually staged next to Auto Learn Fade Overlay, Feishu Card, and Knowledge Dashboard Scene."
  ],
  "pairWithIds": [
    "material-library/chat/feishu-message",
    "material-library/chat/feishu-card",
    "material-library/motion/auto-learn-fade-overlay"
  ],
  "preferInsteadIds": [
    "material-library/surfaces/chat-bubble",
    "material-library/surfaces/phone-frame"
  ],
  "dos": [
    "Use Feishu Chat Scene when the platform environment should be unmistakable.",
    "Change participants, messages, and pacing first while keeping the multi-panel shell intact."
  ],
  "donts": [
    "Do not collapse it into a tiny card-sized preview and expect it to read well.",
    "Do not mix in another platform's chrome unless you are intentionally forking a new environment."
  ],
  "scriptRecipe": [
    "Establish the team discussion environment.",
    "Let Feishu Chat Scene carry the back-and-forth plus the auto-learn card beat.",
    "Transition out with Auto Learn Fade Overlay once the viewer understands the platform context."
  ],
  "narrativeRole": "environment",
  "scriptTriggersEn": [
    "feishu chat scene",
    "work chat environment",
    "knowledge learned from discussion"
  ],
  "scriptTriggersZh": [
    "飞书聊天场景",
    "工作群环境",
    "团队讨论界面"
  ],
  "negativeTriggersEn": [
    "tiny isolated chat component",
    "platform agnostic shell"
  ],
  "negativeTriggersZh": [
    "小型局部聊天组件",
    "平台无关壳层"
  ],
  "hostSurfaces": [
    "full-scene work chat",
    "discussion environment",
    "collaboration-tool shell"
  ],
  "toneTags": [
    "collaborative",
    "platform-specific",
    "context-heavy"
  ],
  "visualWeight": "full-scene",
  "informationDensity": "high",
  "dominance": "scene-owning",
  "reuseMode": "tweak-copy",
  "mutationCost": "medium",
  "safeToChange": [
    "participants",
    "chat title",
    "message content",
    "typing window",
    "action labels"
  ],
  "keepFixed": [
    "multi-panel Feishu shell",
    "work-chat hierarchy",
    "discussion-environment layout"
  ],
  "adaptationNotes": [
    "Keep the left rail, chat list, and main thread relationship intact so the scene still reads as a platform environment.",
    "If you only need one message beat, step down to smaller chat assets instead of dragging this full environment into the scene."
  ]
}
---
Feishu Chat Scene is the full environment extraction from the auto-learn-knowledge short. It is the right choice when the audience needs to understand that the knowledge came from a real team discussion inside a work-chat platform.

For matching, think of moments like "show the discussion where the knowledge was learned" or "establish the work-chat environment before the structured answer appears." It is too heavy for small component beats, but very strong when the platform context is essential to the narrative.

For adaptation, change participants, messages, and timing first. Keep the left rail, chat list, header, thread, and input structure stable. That platform hierarchy is the core of the asset.
