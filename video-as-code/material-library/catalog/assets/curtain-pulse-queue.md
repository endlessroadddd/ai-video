---
{
  "id": "material-library/motion/curtain-pulse-queue",
  "title": "Pulse Queue Curtain",
  "category": "motion",
  "summary": "Queue-centric curtain variant tuned for one-command or one-to-many dispatch stories.",
  "agentGoal": "Let the Agent reuse Pulse Queue Curtain when a script needs queue pulse on full-frame curtain without rebuilding the surrounding motion layer from scratch.",
  "whenToUse": [
    "Use when a command fans out across channels, queues, or synchronized destinations.",
    "Use when the scene can afford a heavy proof layer on full-frame curtain."
  ],
  "avoidWhen": [
    "Avoid when the story beat is about analysis or synthesis rather than dispatch.",
    "Avoid when brand-only close."
  ],
  "keywords": [
    "queue",
    "pulse",
    "dispatch",
    "curtain",
    "proof",
    "throughput",
    "queue-based",
    "operational"
  ],
  "matchKeywords": [
    "queue curtain",
    "dispatch curtain",
    "one command queue",
    "queue pulse",
    "one-to-many dispatch proof",
    "pipeline throughput stage",
    "full-frame curtain",
    "queue proof stage",
    "dispatch pipeline view",
    "throughput",
    "queue-based",
    "operational",
    "队列脉冲",
    "一对多分发证明",
    "高吞吐流水线段"
  ],
  "inputProps": [
    "t",
    "start",
    "end",
    "zIndex"
  ],
  "sourceProjects": [
    "projects/short-assets-one_command_do_all"
  ],
  "previewRef": "material-library/showcase#material-library-motion-curtain-pulse-queue",
  "stability": "beta",
  "implementationRef": "material-library/src/motion/curtains.tsx",
  "sceneTypes": [
    "distribution",
    "ops"
  ],
  "styleFamilies": [
    "lucius-light"
  ],
  "editableParts": [
    "timing",
    "zIndex"
  ],
  "visualSignature": [
    "Queue-centric curtain variant tuned for one-command or one-to-many dispatch stories.",
    "Reads as a heavy throughput, queue-based, operational proof layer rather than a generic motion widget.",
    "Most natural on full-frame curtain, queue proof stage, dispatch pipeline view surfaces."
  ],
  "selectionSignals": [
    "Reach for it when a command fans out across channels, queues, or synchronized destinations.",
    "Best when the scene needs a heavy throughput layer on full-frame curtain.",
    "Choose it when this asset should carry the main readable beat."
  ],
  "compositionPatterns": [
    "Use it to bridge or pace a scene change instead of carrying the whole story by itself.",
    "Let it hand off into a calmer proof or shell once the motion beat lands.",
    "Usually staged next to Timeline Controller, Easing Helpers, and One Command Curtain.",
    "Pair it with Timeline Controller when the beat needs one more layer of context without replacing Pulse Queue Curtain."
  ],
  "pairWithIds": [
    "material-library/motion/timeline",
    "material-library/motion/easing",
    "material-library/motion/curtain-command-flow"
  ],
  "preferInsteadIds": [
    "material-library/motion/curtain-commit-pulse"
  ],
  "dos": [
    "Use Pulse Queue Curtain only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with timing and zIndex while keeping reading order and proof hierarchy stable."
  ],
  "donts": [
    "Do not use it when the story beat is about analysis or synthesis rather than dispatch.",
    "Do not rewrite reading order and proof hierarchy in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Set the context first, then let Pulse Queue Curtain carry the evidence beat.",
    "Hold on the proof long enough for the viewer to complete the main read.",
    "Prefer Commit Pulse Curtain when the story beat is about analysis or synthesis rather than dispatch."
  ],
  "narrativeRole": "proof",
  "scriptTriggersEn": [
    "queue pulse",
    "one-to-many dispatch proof",
    "pipeline throughput stage"
  ],
  "scriptTriggersZh": [
    "队列脉冲",
    "一对多分发证明",
    "高吞吐流水线段"
  ],
  "negativeTriggersEn": [
    "brand-only close",
    "tiny inline badge"
  ],
  "negativeTriggersZh": [
    "纯品牌收束",
    "极小内联徽标"
  ],
  "hostSurfaces": [
    "full-frame curtain",
    "queue proof stage",
    "dispatch pipeline view"
  ],
  "toneTags": [
    "throughput",
    "queue-based",
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
Pulse Queue Curtain is the right pick when a command fans out across channels, queues, or synchronized destinations. Visually it reads as queue-centric curtain variant tuned for one-command or one-to-many dispatch stories, with a throughput, queue-based, operational tone, and it sits best on full-frame curtain, queue proof stage, dispatch pipeline view surfaces.

For matching, look for beats like queue pulse / one-to-many dispatch proof or 队列脉冲 / 一对多分发证明. Pair it with Timeline Controller and Easing Helpers when the scene needs more context. Prefer Commit Pulse Curtain when the story beat is about analysis or synthesis rather than dispatch.

For adaptation, change timing, zIndex, t, start, numbers first. Keep reading order, proof hierarchy, core chart or card structure stable so the asset still feels like the extracted original. Give the viewer enough stillness to read the proof before transitioning away. If the evidence model changes completely, fork a new proof asset rather than bending this one beyond recognition.
