---
{
  "id": "material-library/motion/curtain-commit-pulse",
  "title": "Commit Pulse Curtain",
  "category": "motion",
  "summary": "Short proof curtain that emphasizes commit activity and rollout momentum.",
  "agentGoal": "Let the Agent reuse Commit Pulse Curtain when a script needs commit pulse proof on full-frame curtain without rebuilding the surrounding motion layer from scratch.",
  "whenToUse": [
    "Use when the beat is about shipping, publishing, or turning gathered knowledge into visible execution.",
    "Use when the scene can afford a heavy proof layer on full-frame curtain."
  ],
  "avoidWhen": [
    "Avoid when the scene is centered on chat empathy or customer-facing emotional tone.",
    "Avoid when dense dashboard evidence."
  ],
  "keywords": [
    "commit",
    "pulse",
    "ship",
    "curtain",
    "proof",
    "momentum",
    "shipping",
    "operational"
  ],
  "matchKeywords": [
    "commit pulse",
    "shipping curtain",
    "publish motion",
    "commit pulse proof",
    "shipping momentum",
    "release activity beat",
    "full-frame curtain",
    "shipping proof beat",
    "commit activity stage",
    "momentum",
    "shipping",
    "operational",
    "commit 脉冲证明",
    "发版推进感",
    "上线活动脉冲"
  ],
  "inputProps": [
    "t",
    "start",
    "end",
    "zIndex"
  ],
  "sourceProjects": [
    "projects/short-assets-learn_from_conversations"
  ],
  "previewRef": "material-library/showcase#material-library-motion-curtain-commit-pulse",
  "stability": "beta",
  "implementationRef": "material-library/src/motion/curtains.tsx",
  "sceneTypes": [
    "shipping",
    "proof"
  ],
  "styleFamilies": [
    "lucius-light"
  ],
  "editableParts": [
    "timing",
    "zIndex"
  ],
  "visualSignature": [
    "Short proof curtain that emphasizes commit activity and rollout momentum.",
    "Reads as a heavy momentum, shipping, operational proof layer rather than a generic motion widget.",
    "Most natural on full-frame curtain, shipping proof beat, commit activity stage surfaces."
  ],
  "selectionSignals": [
    "Reach for it when the beat is about shipping, publishing, or turning gathered knowledge into visible execution.",
    "Best when the scene needs a heavy momentum layer on full-frame curtain.",
    "Choose it when this asset should carry the main readable beat."
  ],
  "compositionPatterns": [
    "Use it to bridge or pace a scene change instead of carrying the whole story by itself.",
    "Let it hand off into a calmer proof or shell once the motion beat lands.",
    "Usually staged next to Timeline Controller, Easing Helpers, and Proof Chip.",
    "Pair it with Timeline Controller when the beat needs one more layer of context without replacing Commit Pulse Curtain."
  ],
  "pairWithIds": [
    "material-library/motion/timeline",
    "material-library/motion/easing",
    "material-library/surfaces/proof-chip"
  ],
  "preferInsteadIds": [
    "material-library/motion/curtain-pulse-queue"
  ],
  "dos": [
    "Use Commit Pulse Curtain only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with timing and zIndex while keeping reading order and proof hierarchy stable."
  ],
  "donts": [
    "Do not use it when the scene is centered on chat empathy or customer-facing emotional tone.",
    "Do not rewrite reading order and proof hierarchy in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Set the context first, then let Commit Pulse Curtain carry the evidence beat.",
    "Hold on the proof long enough for the viewer to complete the main read.",
    "Prefer Pulse Queue Curtain when the scene is centered on chat empathy or customer-facing emotional tone."
  ],
  "narrativeRole": "proof",
  "scriptTriggersEn": [
    "commit pulse proof",
    "shipping momentum",
    "release activity beat"
  ],
  "scriptTriggersZh": [
    "commit 脉冲证明",
    "发版推进感",
    "上线活动脉冲"
  ],
  "negativeTriggersEn": [
    "dense dashboard evidence",
    "chat-native celebration"
  ],
  "negativeTriggersZh": [
    "高密度仪表盘证据",
    "聊天原生庆祝点缀"
  ],
  "hostSurfaces": [
    "full-frame curtain",
    "shipping proof beat",
    "commit activity stage"
  ],
  "toneTags": [
    "momentum",
    "shipping",
    "operational"
  ],
  "visualWeight": "heavy",
  "informationDensity": "medium",
  "dominance": "primary",
  "reuseMode": "tweak-copy",
  "mutationCost": "medium",
  "safeToChange": [
    "timing",
    "zIndex",
    "t",
    "start",
    "numbers"
  ],
  "keepFixed": [
    "reading order",
    "proof hierarchy",
    "core chart or card structure"
  ],
  "adaptationNotes": [
    "Give the viewer enough stillness to read the proof before transitioning away.",
    "If the evidence model changes completely, fork a new proof asset rather than bending this one beyond recognition."
  ]
}
---
Commit Pulse Curtain is the right pick when the beat is about shipping, publishing, or turning gathered knowledge into visible execution. Visually it reads as short proof curtain that emphasizes commit activity and rollout momentum, with a momentum, shipping, operational tone, and it sits best on full-frame curtain, shipping proof beat, commit activity stage surfaces.

For matching, look for beats like commit pulse proof / shipping momentum or commit 脉冲证明 / 发版推进感. Pair it with Timeline Controller and Easing Helpers when the scene needs more context. Prefer Pulse Queue Curtain when the scene is centered on chat empathy or customer-facing emotional tone.

For adaptation, change timing, zIndex, t, start, numbers first. Keep reading order, proof hierarchy, core chart or card structure stable so the asset still feels like the extracted original. Give the viewer enough stillness to read the proof before transitioning away. If the evidence model changes completely, fork a new proof asset rather than bending this one beyond recognition.
