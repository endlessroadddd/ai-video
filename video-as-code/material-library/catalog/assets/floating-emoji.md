---
{
  "id": "material-library/chat/floating-emoji",
  "title": "Floating Emoji Accent",
  "category": "chat",
  "summary": "Floating emoji accent with timed drift, useful for celebration or feedback beats.",
  "agentGoal": "Let the Agent reuse Floating Emoji Accent when a script needs floating reaction beat on chat thread without rebuilding the surrounding chat layer from scratch.",
  "whenToUse": [
    "Use when a reply needs a quick celebratory accent or a floating emoji cue.",
    "Use when the scene can afford a light accent layer on chat thread."
  ],
  "avoidWhen": [
    "Avoid if the scene already has multiple simultaneous motions.",
    "Avoid when dense proof stage."
  ],
  "keywords": [
    "emoji",
    "floating",
    "celebration",
    "accent",
    "playful",
    "buoyant",
    "chat-native"
  ],
  "matchKeywords": [
    "floating emoji",
    "emoji accent",
    "celebration",
    "floating reaction beat",
    "small celebratory drift",
    "chat feedback accent",
    "chat thread",
    "celebration beat",
    "message lane",
    "playful",
    "buoyant",
    "chat-native",
    "漂浮 emoji 反馈",
    "小型庆祝漂移",
    "聊天反馈点缀"
  ],
  "inputProps": [
    "raw.anchor",
    "raw.emoji",
    "raw.delayMs",
    "raw.size"
  ],
  "sourceProjects": [
    "projects/demo-app"
  ],
  "previewRef": "material-library/showcase#floating-emoji",
  "stability": "stable",
  "implementationRef": "material-library/src/chat/floating-emoji.tsx",
  "sceneTypes": [
    "chat",
    "celebration"
  ],
  "styleFamilies": [
    "lucius-dark"
  ],
  "editableParts": [
    "emoji",
    "timing"
  ],
  "visualSignature": [
    "Floating emoji accent with timed drift, useful for celebration or feedback beats.",
    "Reads as a light playful, buoyant, chat-native accent layer rather than a generic chat widget.",
    "Most natural on chat thread, celebration beat, message lane surfaces."
  ],
  "selectionSignals": [
    "Reach for it when a reply needs a quick celebratory accent or a floating emoji cue.",
    "Best when the scene needs a light playful layer on chat thread.",
    "Choose it when the main shell or proof is already present and this asset should reinforce it."
  ],
  "compositionPatterns": [
    "Attach it to the message, toast, or local action that actually owns the beat.",
    "Keep the surrounding copy short so the conversational signal stays scannable.",
    "Usually staged next to Animated Emoji, Celebration Particles, and Chat Bubble.",
    "Pair it with Animated Emoji when the beat needs one more layer of context without replacing Floating Emoji Accent."
  ],
  "pairWithIds": [
    "material-library/chat/animated-emoji",
    "material-library/chat/celebration-particles",
    "material-library/surfaces/chat-bubble"
  ],
  "preferInsteadIds": [
    "material-library/chat/animated-emoji"
  ],
  "dos": [
    "Use Floating Emoji Accent only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with emoji and timing while keeping compact footprint and single-beat timing stable."
  ],
  "donts": [
    "Do not use it when Avoid if the scene already has multiple simultaneous motions.",
    "Do not rewrite compact footprint and single-beat timing in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Establish the local message or action first.",
    "Floating Emoji Accent should land exactly on the beat that needs emotional punctuation.",
    "Prefer Animated Emoji when Avoid if the scene already has multiple simultaneous motions."
  ],
  "narrativeRole": "accent",
  "scriptTriggersEn": [
    "floating reaction beat",
    "small celebratory drift",
    "chat feedback accent"
  ],
  "scriptTriggersZh": [
    "漂浮 emoji 反馈",
    "小型庆祝漂移",
    "聊天反馈点缀"
  ],
  "negativeTriggersEn": [
    "dense proof stage",
    "full scene environment"
  ],
  "negativeTriggersZh": [
    "高密度证据段",
    "完整环境场景"
  ],
  "hostSurfaces": [
    "chat thread",
    "celebration beat",
    "message lane"
  ],
  "toneTags": [
    "playful",
    "buoyant",
    "chat-native"
  ],
  "visualWeight": "light",
  "informationDensity": "low",
  "dominance": "supporting",
  "reuseMode": "drop-in",
  "mutationCost": "low",
  "safeToChange": [
    "emoji",
    "timing",
    "raw.anchor",
    "raw.emoji",
    "accent copy"
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
Floating Emoji Accent is the right pick when a reply needs a quick celebratory accent or a floating emoji cue. Visually it reads as floating emoji accent with timed drift, useful for celebration or feedback beats, with a playful, buoyant, chat-native tone, and it sits best on chat thread, celebration beat, message lane surfaces.

For matching, look for beats like floating reaction beat / small celebratory drift or 漂浮 emoji 反馈 / 小型庆祝漂移. Pair it with Animated Emoji and Celebration Particles when the scene needs more context. Prefer Animated Emoji when Avoid if the scene already has multiple simultaneous motions.

For adaptation, change emoji, timing, raw.anchor, raw.emoji, accent copy first. Keep compact footprint, single-beat timing, supporting-layer role stable so the asset still feels like the extracted original. Use accents as punctuation after the viewer already understands the local context. If the beat needs to carry the main proof, move up to a proof or shell asset instead.
