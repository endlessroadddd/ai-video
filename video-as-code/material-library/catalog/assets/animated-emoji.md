---
{
  "id": "material-library/chat/animated-emoji",
  "title": "Animated Emoji",
  "category": "chat",
  "summary": "Drop-in animated emoji using Noto assets with fallback handling.",
  "agentGoal": "Let the Agent reuse Animated Emoji when a script needs small chat celebration on chat bubble without rebuilding the surrounding chat layer from scratch.",
  "whenToUse": [
    "Use when a chat surface needs small emotional punctuations or reactions.",
    "Use when the scene can afford a micro accent layer on chat bubble."
  ],
  "avoidWhen": [
    "Avoid when the environment has no external asset access or needs strict offline support.",
    "Avoid when offline-only environment."
  ],
  "keywords": [
    "emoji",
    "reaction",
    "animated",
    "chat",
    "accent",
    "playful",
    "chat-native",
    "lightweight"
  ],
  "matchKeywords": [
    "animated emoji",
    "emoji reaction",
    "chat reaction",
    "small chat celebration",
    "quick emotional beat",
    "chat bubble",
    "reply toast",
    "micro reaction lane",
    "playful",
    "chat-native",
    "lightweight",
    "小型聊天庆祝反馈",
    "emoji 反应",
    "轻量情绪点"
  ],
  "inputProps": [
    "codepoint",
    "size",
    "reducedMotion"
  ],
  "sourceProjects": [
    "projects/short-asset-thought-you-were-staff"
  ],
  "previewRef": "material-library/showcase#animated-emoji",
  "stability": "stable",
  "implementationRef": "material-library/src/chat/animated-emoji.tsx",
  "sceneTypes": [
    "chat",
    "reaction"
  ],
  "styleFamilies": [
    "lucius-dark"
  ],
  "editableParts": [
    "codepoint",
    "size"
  ],
  "visualSignature": [
    "Drop-in animated emoji using Noto assets with fallback handling.",
    "Reads as a micro playful, chat-native, lightweight accent layer rather than a generic chat widget.",
    "Most natural on chat bubble, reply toast, micro reaction lane surfaces."
  ],
  "selectionSignals": [
    "Reach for it when a chat surface needs small emotional punctuations or reactions.",
    "Best when the scene needs a micro playful layer on chat bubble.",
    "Choose it when the main shell or proof is already present and this asset should reinforce it."
  ],
  "compositionPatterns": [
    "Attach it to the message, toast, or local action that actually owns the beat.",
    "Keep the surrounding copy short so the conversational signal stays scannable.",
    "Usually staged next to Floating Emoji Accent, Chat Bubble, and Celebration Particles.",
    "Pair it with Floating Emoji Accent when the beat needs one more layer of context without replacing Animated Emoji."
  ],
  "pairWithIds": [
    "material-library/chat/floating-emoji",
    "material-library/surfaces/chat-bubble",
    "material-library/chat/celebration-particles"
  ],
  "preferInsteadIds": [
    "material-library/chat/floating-emoji"
  ],
  "dos": [
    "Use Animated Emoji only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with codepoint and size while keeping compact footprint and single-beat timing stable."
  ],
  "donts": [
    "Do not use it when the environment has no external asset access or needs strict offline support.",
    "Do not rewrite compact footprint and single-beat timing in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Establish the local message or action first.",
    "Animated Emoji should land exactly on the beat that needs emotional punctuation.",
    "Prefer Floating Emoji Accent when the environment has no external asset access or needs strict offline support."
  ],
  "narrativeRole": "accent",
  "scriptTriggersEn": [
    "small chat celebration",
    "emoji reaction",
    "quick emotional beat"
  ],
  "scriptTriggersZh": [
    "小型聊天庆祝反馈",
    "emoji 反应",
    "轻量情绪点"
  ],
  "negativeTriggersEn": [
    "offline-only environment",
    "full-screen hero scene"
  ],
  "negativeTriggersZh": [
    "严格离线环境",
    "全屏主视觉场景"
  ],
  "hostSurfaces": [
    "chat bubble",
    "reply toast",
    "micro reaction lane"
  ],
  "toneTags": [
    "playful",
    "chat-native",
    "lightweight"
  ],
  "visualWeight": "micro",
  "informationDensity": "low",
  "dominance": "supporting",
  "reuseMode": "drop-in",
  "mutationCost": "low",
  "safeToChange": [
    "codepoint",
    "size",
    "accent copy",
    "timing offsets",
    "lightweight color treatment"
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
Animated Emoji is the right pick when a chat surface needs small emotional punctuations or reactions. Visually it reads as drop-in animated emoji using noto assets with fallback handling, with a playful, chat-native, lightweight tone, and it sits best on chat bubble, reply toast, micro reaction lane surfaces.

For matching, look for beats like small chat celebration / emoji reaction or 小型聊天庆祝反馈 / emoji 反应. Pair it with Floating Emoji Accent and Chat Bubble when the scene needs more context. Prefer Floating Emoji Accent when the environment has no external asset access or needs strict offline support.

For adaptation, change codepoint, size, accent copy, timing offsets, lightweight color treatment first. Keep compact footprint, single-beat timing, supporting-layer role stable so the asset still feels like the extracted original. Use accents as punctuation after the viewer already understands the local context. If the beat needs to carry the main proof, move up to a proof or shell asset instead.
