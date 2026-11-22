---
{
  "id": "material-library/surfaces/discord-question-stack-stage",
  "title": "Discord Question Stack Stage",
  "category": "surfaces",
  "summary": "Question stack stage for sequentially revealing 2 to 5 narrative prompts in a Discord-native closing beat.",
  "agentGoal": "Let the Agent reuse Discord Question Stack Stage when a script needs sequential closing questions on ending stage without rebuilding the surrounding surfaces layer from scratch.",
  "whenToUse": [
    "Use when a scene needs a clean sequential question reveal instead of a single headline.",
    "Use when the scene can afford a medium readable layer on ending stage."
  ],
  "avoidWhen": [
    "Avoid when a single statement is enough or when the closing beat should stay minimal.",
    "Avoid when one sentence only."
  ],
  "keywords": [
    "question stack",
    "closing questions",
    "sequential reveal",
    "ending stage",
    "surface",
    "narrative",
    "closing"
  ],
  "matchKeywords": [
    "question stack stage",
    "closing questions",
    "three-line question reveal",
    "sequential closing questions",
    "ending stage",
    "narrative close",
    "question beat",
    "stacked headline",
    "narrative",
    "closing",
    "问题栈",
    "结尾三问",
    "逐行问题出现"
  ],
  "inputProps": [
    "questions",
    "currentMs",
    "startMs",
    "initialDelayMs",
    "staggerMs",
    "revealDurationMs"
  ],
  "sourceProjects": [],
  "previewRef": "material-library/showcase#discord-question-stack-stage",
  "stability": "stable",
  "implementationRef": "material-library/src/surfaces/discord-question-stack-stage.tsx",
  "sceneTypes": [
    "ending",
    "question-close"
  ],
  "styleFamilies": [
    "discord-dark"
  ],
  "editableParts": [
    "questions",
    "initialDelayMs",
    "staggerMs",
    "revealDurationMs"
  ],
  "visualSignature": [
    "Question stack stage for sequentially revealing 2 to 5 narrative prompts in a Discord-native closing beat.",
    "Reads as a medium narrative closing surface layer rather than a generic text block.",
    "Most natural on ending stage, narrative close, question beat surfaces."
  ],
  "selectionSignals": [
    "Reach for it when the close needs multiple prompts that should land one by one.",
    "Best when the scene needs a medium narrative layer on ending stage.",
    "Choose it when the question progression itself carries the beat."
  ],
  "compositionPatterns": [
    "Use it on a calm background or inside a closing panel so the questions remain dominant.",
    "Keep the stack short and high-contrast.",
    "Usually staged next to Discord Noise Card Stage and Discord Transcript Stage.",
    "Pair it with Discord Noise Card Stage when the beat needs one more layer of context without replacing Discord Question Stack Stage."
  ],
  "pairWithIds": [
    "material-library/surfaces/discord-noise-card-stage",
    "material-library/surfaces/discord-transcript-stage"
  ],
  "preferInsteadIds": [
    "material-library/surfaces/resolve-overlay"
  ],
  "dos": [
    "Use Discord Question Stack Stage only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with question copy and stagger timing while keeping the sequential rhythm stable."
  ],
  "donts": [
    "Do not use it when a single statement is enough or when the closing beat should stay minimal.",
    "Do not rewrite the sequential rhythm in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Keep the questions short enough that each line can land in one glance.",
    "Hold long enough after the last reveal for the viewer to finish the read.",
    "Prefer Resolve Overlay when the ending should resolve into one single statement instead."
  ],
  "narrativeRole": "proof",
  "scriptTriggersEn": [
    "closing questions",
    "three-line question reveal",
    "question stack stage"
  ],
  "scriptTriggersZh": [
    "问题栈",
    "结尾三问",
    "逐行问题出现"
  ],
  "negativeTriggersEn": [
    "one sentence only",
    "busy multi-panel close"
  ],
  "negativeTriggersZh": [
    "只有一句话",
    "复杂多面板结尾"
  ],
  "hostSurfaces": [
    "ending stage",
    "narrative close",
    "question beat"
  ],
  "toneTags": [
    "narrative",
    "closing"
  ],
  "visualWeight": "medium",
  "informationDensity": "medium",
  "dominance": "primary",
  "reuseMode": "tweak-copy",
  "mutationCost": "low",
  "safeToChange": [
    "questions",
    "initialDelayMs",
    "staggerMs",
    "revealDurationMs"
  ],
  "keepFixed": [
    "sequential rhythm",
    "stack readability",
    "question-first hierarchy"
  ],
  "adaptationNotes": [
    "Give the viewer a beat to finish the last line before leaving the stage.",
    "If the copy turns into paragraphs, move back to a statement card or transcript overlay."
  ]
}
---
Discord Question Stack Stage is the right pick when the close needs several prompts to land one after another. It keeps the rhythm explicit and reusable instead of burying those timings inside a project scene file.
