---
{
  "id": "material-library/surfaces/discord-transcript-stage",
  "title": "Discord Transcript Stage",
  "category": "surfaces",
  "summary": "Data-driven Discord transcript stage that reveals messages by timeline and can land one narrative question on top.",
  "agentGoal": "Let the Agent reuse Discord Transcript Stage when a script needs progressive discord transcript on community transcript without rebuilding the surrounding surfaces layer from scratch.",
  "whenToUse": [
    "Use when a Discord scene needs timed message accumulation without hardcoding the whole scene file.",
    "Use when the scene can afford a heavy readable layer on community transcript."
  ],
  "avoidWhen": [
    "Avoid when the transcript is static and a single message card or bubble already covers the need.",
    "Avoid when one isolated message only."
  ],
  "keywords": [
    "discord transcript",
    "transcript stage",
    "message reveal",
    "progressive transcript",
    "surface",
    "discord-native",
    "narrative"
  ],
  "matchKeywords": [
    "discord transcript stage",
    "progressive discord transcript",
    "message reveal stage",
    "discord transcript stage",
    "community transcript",
    "message reveal surface",
    "timeline-driven chat",
    "signal transcript",
    "discord-native",
    "narrative",
    "Discord 转录场景",
    "消息逐条出现",
    "社区消息舞台"
  ],
  "inputProps": [
    "messages",
    "revealTimes",
    "currentMs",
    "tone",
    "questionText"
  ],
  "sourceProjects": [],
  "previewRef": "material-library/showcase#discord-transcript-stage",
  "stability": "stable",
  "implementationRef": "material-library/src/surfaces/discord-transcript-stage.tsx",
  "sceneTypes": [
    "discord",
    "community-chat",
    "narrative-transcript"
  ],
  "styleFamilies": [
    "discord-dark"
  ],
  "editableParts": [
    "messages",
    "revealTimes",
    "questionText",
    "tone"
  ],
  "visualSignature": [
    "Data-driven Discord transcript stage that reveals messages by timeline and can land one narrative question on top.",
    "Reads as a heavy discord-native, narrative surface layer rather than a generic chat widget.",
    "Most natural on community transcript, message reveal surface, signal transcript surfaces."
  ],
  "selectionSignals": [
    "Reach for it when the story needs a stack of messages to accumulate in time rather than appear all at once.",
    "Best when the scene needs a heavy discord-native layer on community transcript.",
    "Choose it when the transcript itself should carry the main readable beat."
  ],
  "compositionPatterns": [
    "Use it inside a larger Discord shell or on a full dark stage, not on a tiny card.",
    "Keep one focal transcript active at a time.",
    "Usually staged next to Discord Community Shell, Discord Message Card, and Discord Composer Bar.",
    "Pair it with Discord Community Shell when the beat needs one more layer of context without replacing Discord Transcript Stage."
  ],
  "pairWithIds": [
    "material-library/surfaces/discord-community-shell",
    "material-library/chat/discord-message-card",
    "material-library/chat/discord-composer-bar"
  ],
  "preferInsteadIds": [
    "material-library/chat/discord-message-card"
  ],
  "dos": [
    "Use Discord Transcript Stage only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with messages and revealTimes while keeping the transcript stack rhythm stable."
  ],
  "donts": [
    "Do not use it when the transcript is static and a single message card already covers the need.",
    "Do not rewrite transcript stack rhythm in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Decide what the transcript should reveal over time before you tune the shell around it.",
    "Use the optional question only when the transcript has already earned that overlay.",
    "Prefer Discord Message Card when the scene only needs one isolated message."
  ],
  "narrativeRole": "environment",
  "scriptTriggersEn": [
    "discord transcript stage",
    "message reveal stage",
    "progressive discord transcript"
  ],
  "scriptTriggersZh": [
    "Discord 转录场景",
    "消息逐条出现",
    "社区消息舞台"
  ],
  "negativeTriggersEn": [
    "one isolated message only",
    "static dashboard proof"
  ],
  "negativeTriggersZh": [
    "只有单条消息",
    "静态仪表盘证明"
  ],
  "hostSurfaces": [
    "community transcript",
    "message reveal surface",
    "signal transcript"
  ],
  "toneTags": [
    "discord-native",
    "narrative"
  ],
  "visualWeight": "heavy",
  "informationDensity": "high",
  "dominance": "primary",
  "reuseMode": "tweak-layout",
  "mutationCost": "medium",
  "safeToChange": [
    "messages",
    "revealTimes",
    "questionText",
    "tone"
  ],
  "keepFixed": [
    "transcript stack rhythm",
    "message-first readability",
    "bottom-up accumulation"
  ],
  "adaptationNotes": [
    "Keep the transcript readable frame by frame so later questions or proof layers still land cleanly.",
    "If several independent transcript regions need to animate at once, split them into multiple stages."
  ]
}
---
Discord Transcript Stage is the right pick when a Discord story depends on time-based message accumulation. It takes reusable data and reveal timing, so the narrative beat can change without copying a whole scene implementation.
