---
{
  "id": "material-library/motion/dual-phone-resolve",
  "title": "Dual Phone Resolve",
  "category": "motion",
  "summary": "Two-phone squeeze and resolve transition that collapses a full chat exchange into a proof chip and Lucius resolve lockup.",
  "agentGoal": "Let the Agent reuse Dual Phone Resolve when a script needs a visible two-party conversation to compress into a final branded resolve without rebuilding the whole choreography from scratch.",
  "whenToUse": [
    "Use when the scene should start as a live conversation and then compress into one clear conclusion.",
    "Use when the handoff between dialogue, proof, and brand resolve should happen inside one continuous stage."
  ],
  "avoidWhen": [
    "Avoid when a lightweight overlay or a simple resolve line is enough.",
    "Avoid when the scene is not really about two-party chat tension and release."
  ],
  "keywords": [
    "dual phone",
    "resolve",
    "two phone transition",
    "chat collapse",
    "conversation resolve"
  ],
  "matchKeywords": [
    "two phone resolve",
    "chat to resolve transition",
    "conversation collapse",
    "staff reveal close",
    "双手机收束",
    "聊天收束转场",
    "对话压成结论"
  ],
  "inputProps": [
    "className",
    "phase",
    "progress",
    "timeMs",
    "summary",
    "proofCount",
    "proofLabel",
    "leftTitle",
    "leftAltTitle",
    "rightTitle",
    "transcript"
  ],
  "sourceProjects": [
    "projects/short-asset-thought-you-were-staff"
  ],
  "previewRef": "material-library/showcase#dual-phone-resolve",
  "stability": "beta",
  "implementationRef": "material-library/src/motion/staff-resolve-transition.tsx",
  "sceneTypes": [
    "transition",
    "resolve",
    "chat-close"
  ],
  "styleFamilies": [
    "chat-native",
    "lucius-light"
  ],
  "editableParts": [
    "transcript",
    "summary",
    "proof count",
    "proof label",
    "participant titles"
  ],
  "visualSignature": [
    "Two phone shells start apart, then squeeze toward center while a proof chip rises and a resolve lockup takes over.",
    "Reads as one continuous chat-to-conclusion transition, not as separate shells pasted next to a logo.",
    "Most natural on dual-chat stage, chat collapse close, and conversation resolve surfaces."
  ],
  "selectionSignals": [
    "Reach for it when the viewer should feel a conversation compressing into one final answer.",
    "Best when you need dialogue, proof, and resolve to live in the same shot instead of cutting across separate cards.",
    "Choose it when the beat benefits from visible squeeze and release, not just a final logo overlay."
  ],
  "compositionPatterns": [
    "Use it after the key exchange is already legible, then let the stage compress toward one branded resolve.",
    "Keep the proof chip and summary line short so the choreography remains the main event.",
    "Usually staged next to Phone Frame, Proof Chip, and Resolve Overlay."
  ],
  "pairWithIds": [
    "material-library/surfaces/phone-frame",
    "material-library/surfaces/proof-chip",
    "material-library/surfaces/resolve-overlay"
  ],
  "preferInsteadIds": [
    "material-library/surfaces/resolve-overlay",
    "material-library/chat/support-handoff-card"
  ],
  "dos": [
    "Use Dual Phone Resolve when the conversation itself is part of the emotional or product proof.",
    "Adapt transcript, summary, proof count, and titles first while keeping the squeeze-to-resolve choreography intact."
  ],
  "donts": [
    "Do not use it for scenes that only need a quick end card.",
    "Do not remove the compression beat and still call it this asset; the squeeze is the point."
  ],
  "scriptRecipe": [
    "Let the audience understand the conversation first.",
    "Start the squeeze once the key line has landed.",
    "Resolve into one short summary instead of adding fresh dense explanation on top of the collapse."
  ],
  "narrativeRole": "transition",
  "scriptTriggersEn": [
    "two phone resolve",
    "chat to resolve transition",
    "conversation collapse"
  ],
  "scriptTriggersZh": [
    "双手机收束",
    "聊天收束转场",
    "对话压成结论"
  ],
  "negativeTriggersEn": [
    "single card close",
    "non-chat scene"
  ],
  "negativeTriggersZh": [
    "单卡片收尾",
    "非聊天场景"
  ],
  "hostSurfaces": [
    "dual-chat stage",
    "chat collapse close",
    "conversation resolve"
  ],
  "toneTags": [
    "chat-native",
    "revealing",
    "conclusive"
  ],
  "visualWeight": "full-scene",
  "informationDensity": "medium",
  "dominance": "scene-owning",
  "reuseMode": "tweak-layout",
  "mutationCost": "medium",
  "safeToChange": [
    "transcript lines",
    "summary",
    "proof count",
    "proof label",
    "participant names",
    "phase or progress inputs"
  ],
  "keepFixed": [
    "two-phone squeeze choreography",
    "proof-chip rise",
    "resolve overlay handoff"
  ],
  "adaptationNotes": [
    "Keep the resolve sentence short enough that the visual compression still leads the beat.",
    "If the phones no longer squeeze into the resolve, this should become a different asset."
  ]
}
---
Dual Phone Resolve is for moments when the audience should see an actual conversation compress into one clear takeaway. The extracted stage preserves the original two-phone spacing, squeeze, proof-chip rise, and resolve-lockup handoff, so it feels like one continuous motion sentence instead of unrelated pieces stacked together.

For matching, look for beats like "chat to resolve transition", "the conversation collapses into the conclusion", or "we want the viewer to feel the handoff becoming a final answer." It is especially useful when dialogue itself matters, not just the final label. If the scene only needs a short branded resolve or a single proof block, choose a lighter asset instead.

For adaptation, change transcript copy, participant names, proof count, proof label, and summary first. Keep the squeeze choreography, proof-chip rise, and resolve timing envelope stable. Once the layout stops reading as two phones collapsing into a conclusion, it is no longer the same extracted transition.
