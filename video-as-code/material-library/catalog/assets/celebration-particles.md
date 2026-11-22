---
{
  "id": "material-library/chat/celebration-particles",
  "title": "Celebration Particles",
  "category": "chat",
  "summary": "Lightweight confetti-style particles for success moments in chat UI.",
  "agentGoal": "Let the Agent reuse Celebration Particles when a script needs success confetti on chat thread without rebuilding the surrounding chat layer from scratch.",
  "whenToUse": [
    "Use when you need a short celebration burst without heavy animation tooling.",
    "Use when the scene can afford a medium accent layer on chat thread."
  ],
  "avoidWhen": [
    "Avoid in highly informational scenes where motion should be minimal.",
    "Avoid when quiet acknowledgement."
  ],
  "keywords": [
    "particles",
    "confetti",
    "celebration",
    "accent",
    "celebratory",
    "energetic",
    "success"
  ],
  "matchKeywords": [
    "confetti",
    "celebration particles",
    "success burst",
    "success confetti",
    "celebration burst",
    "high-energy confirmation beat",
    "chat thread",
    "success confirmation",
    "message lane",
    "celebratory",
    "energetic",
    "success",
    "成功彩屑",
    "庆祝粒子爆发",
    "高能确认时刻"
  ],
  "inputProps": [],
  "sourceProjects": [
    "projects/demo-app"
  ],
  "previewRef": "material-library/showcase#celebration-particles",
  "stability": "beta",
  "implementationRef": "material-library/src/chat/celebration-particles.tsx",
  "sceneTypes": [
    "chat",
    "celebration"
  ],
  "styleFamilies": [
    "lucius-dark"
  ],
  "editableParts": [],
  "visualSignature": [
    "Lightweight confetti-style particles for success moments in chat UI.",
    "Reads as a medium celebratory, energetic, success accent layer rather than a generic chat widget.",
    "Most natural on chat thread, success confirmation, message lane surfaces."
  ],
  "selectionSignals": [
    "Reach for it when you need a short celebration burst without heavy animation tooling.",
    "Best when the scene needs a medium celebratory layer on chat thread.",
    "Choose it when the main shell or proof is already present and this asset should reinforce it."
  ],
  "compositionPatterns": [
    "Attach it to the message, toast, or local action that actually owns the beat.",
    "Keep the surrounding copy short so the conversational signal stays scannable.",
    "Usually staged next to Floating Emoji Accent, Reply Ready Toast, and Chat Bubble.",
    "Pair it with Floating Emoji Accent when the beat needs one more layer of context without replacing Celebration Particles."
  ],
  "pairWithIds": [
    "material-library/chat/floating-emoji",
    "material-library/chat/reply-ready-toast",
    "material-library/surfaces/chat-bubble"
  ],
  "preferInsteadIds": [
    "material-library/chat/animated-emoji"
  ],
  "dos": [
    "Use Celebration Particles only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with accent copy and timing offsets while keeping compact footprint and single-beat timing stable."
  ],
  "donts": [
    "Do not use it when Avoid in highly informational scenes where motion should be minimal.",
    "Do not rewrite compact footprint and single-beat timing in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Establish the local message or action first.",
    "Celebration Particles should land exactly on the beat that needs emotional punctuation.",
    "Prefer Animated Emoji when Avoid in highly informational scenes where motion should be minimal."
  ],
  "narrativeRole": "accent",
  "scriptTriggersEn": [
    "success confetti",
    "celebration burst",
    "high-energy confirmation beat"
  ],
  "scriptTriggersZh": [
    "成功彩屑",
    "庆祝粒子爆发",
    "高能确认时刻"
  ],
  "negativeTriggersEn": [
    "quiet acknowledgement",
    "proof card that still needs reading time"
  ],
  "negativeTriggersZh": [
    "安静确认",
    "仍需阅读的证明卡片"
  ],
  "hostSurfaces": [
    "chat thread",
    "success confirmation",
    "message lane"
  ],
  "toneTags": [
    "celebratory",
    "energetic",
    "success"
  ],
  "visualWeight": "medium",
  "informationDensity": "low",
  "dominance": "supporting",
  "reuseMode": "tweak-copy",
  "mutationCost": "medium",
  "safeToChange": [
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
Celebration Particles is the right pick when you need a short celebration burst without heavy animation tooling. Visually it reads as lightweight confetti-style particles for success moments in chat ui, with a celebratory, energetic, success tone, and it sits best on chat thread, success confirmation, message lane surfaces.

For matching, look for beats like success confetti / celebration burst or 成功彩屑 / 庆祝粒子爆发. Pair it with Floating Emoji Accent and Reply Ready Toast when the scene needs more context. Prefer Animated Emoji when Avoid in highly informational scenes where motion should be minimal.

For adaptation, change accent copy, timing offsets, lightweight color treatment first. Keep compact footprint, single-beat timing, supporting-layer role stable so the asset still feels like the extracted original. Use accents as punctuation after the viewer already understands the local context. If the beat needs to carry the main proof, move up to a proof or shell asset instead.
