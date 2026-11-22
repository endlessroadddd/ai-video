---
{
  "id": "material-library/motion/curtain-knowledge-graph",
  "title": "Knowledge Graph Curtain",
  "category": "motion",
  "summary": "Curtain variant that animates capture-cluster-writeback panels with a Lucius workflow spine.",
  "agentGoal": "Let the Agent reuse Knowledge Graph Curtain when a script needs knowledge graph reveal on full-frame curtain without rebuilding the surrounding motion layer from scratch.",
  "whenToUse": [
    "Use when the story beat is about learning from conversations or turning threads into knowledge.",
    "Use when the scene can afford a full-scene proof layer on full-frame curtain."
  ],
  "avoidWhen": [
    "Avoid when the beat is purely operational or status-focused.",
    "Avoid when small inline proof."
  ],
  "keywords": [
    "knowledge",
    "graph",
    "cluster",
    "curtain",
    "proof",
    "analytical",
    "systemic",
    "proof-heavy"
  ],
  "matchKeywords": [
    "knowledge graph",
    "learn from conversations",
    "capture cluster publish",
    "knowledge graph reveal",
    "cluster conversations into knowledge",
    "capture cluster writeback stage",
    "full-frame curtain",
    "knowledge workflow stage",
    "capture-to-graph reveal",
    "analytical",
    "systemic",
    "proof-heavy",
    "知识图谱转场",
    "把聊天聚类成知识",
    "采集聚类回写场景"
  ],
  "inputProps": [
    "t",
    "start",
    "end",
    "threads",
    "themes",
    "knowledge"
  ],
  "sourceProjects": [
    "projects/short-assets-learn_from_conversations"
  ],
  "previewRef": "material-library/showcase#knowledge-graph-curtain",
  "stability": "beta",
  "implementationRef": "material-library/src/motion/curtains.tsx",
  "sceneTypes": [
    "knowledge",
    "support-proof"
  ],
  "styleFamilies": [
    "lucius-light"
  ],
  "editableParts": [
    "threads",
    "themes",
    "knowledge"
  ],
  "visualSignature": [
    "Curtain variant that animates capture-cluster-writeback panels with a Lucius workflow spine.",
    "Reads as a full-scene analytical, systemic, proof-heavy proof layer rather than a generic motion widget.",
    "Most natural on full-frame curtain, knowledge workflow stage, capture-to-graph reveal surfaces."
  ],
  "selectionSignals": [
    "Reach for it when the story beat is about learning from conversations or turning threads into knowledge.",
    "Best when the scene needs a full-scene analytical layer on full-frame curtain.",
    "Choose it when this asset needs to own the whole frame for a moment."
  ],
  "compositionPatterns": [
    "Use it to bridge or pace a scene change instead of carrying the whole story by itself.",
    "Let it hand off into a calmer proof or shell once the motion beat lands.",
    "Usually staged next to Timeline Controller, Easing Helpers, and Settings Section Shell.",
    "Pair it with Timeline Controller when the beat needs one more layer of context without replacing Knowledge Graph Curtain."
  ],
  "pairWithIds": [
    "material-library/motion/timeline",
    "material-library/motion/easing",
    "material-library/surfaces/settings-section-shell"
  ],
  "preferInsteadIds": [
    "material-library/motion/brand-transition-ring"
  ],
  "dos": [
    "Use Knowledge Graph Curtain only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with threads and themes while keeping reading order and proof hierarchy stable."
  ],
  "donts": [
    "Do not use it when the beat is purely operational or status-focused.",
    "Do not rewrite reading order and proof hierarchy in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Set the context first, then let Knowledge Graph Curtain carry the evidence beat.",
    "Hold on the proof long enough for the viewer to complete the main read.",
    "Prefer Brand Transition Ring when the beat is purely operational or status-focused."
  ],
  "narrativeRole": "proof",
  "scriptTriggersEn": [
    "knowledge graph reveal",
    "cluster conversations into knowledge",
    "capture cluster writeback stage"
  ],
  "scriptTriggersZh": [
    "知识图谱转场",
    "把聊天聚类成知识",
    "采集聚类回写场景"
  ],
  "negativeTriggersEn": [
    "small inline proof",
    "lightweight chat punctuation"
  ],
  "negativeTriggersZh": [
    "小型内联证明",
    "轻量聊天点缀"
  ],
  "hostSurfaces": [
    "full-frame curtain",
    "knowledge workflow stage",
    "capture-to-graph reveal"
  ],
  "toneTags": [
    "analytical",
    "systemic",
    "proof-heavy"
  ],
  "visualWeight": "full-scene",
  "informationDensity": "high",
  "dominance": "scene-owning",
  "reuseMode": "tweak-copy",
  "mutationCost": "medium",
  "safeToChange": [
    "threads",
    "themes",
    "knowledge",
    "t",
    "start"
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
Knowledge Graph Curtain is the right pick when the story beat is about learning from conversations or turning threads into knowledge. Visually it reads as curtain variant that animates capture-cluster-writeback panels with a lucius workflow spine, with a analytical, systemic, proof-heavy tone, and it sits best on full-frame curtain, knowledge workflow stage, capture-to-graph reveal surfaces.

For matching, look for beats like knowledge graph reveal / cluster conversations into knowledge or 知识图谱转场 / 把聊天聚类成知识. Pair it with Timeline Controller and Easing Helpers when the scene needs more context. Prefer Brand Transition Ring when the beat is purely operational or status-focused.

For adaptation, change threads, themes, knowledge, t, start first. Keep reading order, proof hierarchy, core chart or card structure stable so the asset still feels like the extracted original. Give the viewer enough stillness to read the proof before transitioning away. If the evidence model changes completely, fork a new proof asset rather than bending this one beyond recognition.
