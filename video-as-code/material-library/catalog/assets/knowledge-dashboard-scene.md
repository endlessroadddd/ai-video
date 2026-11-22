---
{
  "id": "material-library/surfaces/knowledge-dashboard-scene",
  "title": "Knowledge Dashboard Scene",
  "category": "surfaces",
  "summary": "Full knowledge-base dashboard scene with sidebar, entry list, selected detail panel, before/after diff, and AI note footer.",
  "agentGoal": "Let the Agent reuse Knowledge Dashboard Scene when a script needs a full knowledge or documentation environment that shows what was learned and how it changed the stored content.",
  "whenToUse": [
    "Use when the scene should prove that new knowledge has been organized into a searchable system.",
    "Use when the frame needs a full product environment instead of a single chart or card."
  ],
  "avoidWhen": [
    "Avoid when only a tiny proof block is needed.",
    "Avoid when the scene is not about structured knowledge, docs, or systemized updates."
  ],
  "keywords": [
    "knowledge dashboard",
    "knowledge base scene",
    "documentation ui",
    "auto learned entries",
    "before after diff"
  ],
  "matchKeywords": [
    "knowledge dashboard scene",
    "knowledge base environment",
    "auto learned documentation ui",
    "before after knowledge diff",
    "知识库场景",
    "知识面板环境",
    "自动学习结果面板"
  ],
  "inputProps": [
    "detailElapsedMs",
    "entries",
    "opacity",
    "selectedId"
  ],
  "sourceProjects": [
    "projects/short-assets-auto_learn_knowledge"
  ],
  "previewRef": "material-library/showcase#knowledge-dashboard-scene",
  "stability": "beta",
  "implementationRef": "material-library/src/surfaces/knowledge-dashboard-scene.tsx",
  "sceneTypes": [
    "environment",
    "dashboard",
    "knowledge"
  ],
  "styleFamilies": [
    "lucius-light",
    "knowledge-dashboard",
    "product-shell"
  ],
  "editableParts": [
    "entries",
    "selectedId",
    "detail timing",
    "header labels"
  ],
  "visualSignature": [
    "Warm light dashboard with sidebar, searchable header, entry list, and right-side detail panel.",
    "Feels like a product knowledge system rather than a generic admin page.",
    "Best on knowledge base environment, documentation dashboard, and structured retrieval surfaces."
  ],
  "selectionSignals": [
    "Reach for it when the scene must prove that messy discussion became organized knowledge.",
    "Best when the viewer needs to see both the list of learned items and one selected detail.",
    "Choose it when the environment itself should communicate structure, retrieval, and change history."
  ],
  "compositionPatterns": [
    "Use it after a chat or ingestion scene so the dashboard reads like the destination of the learned knowledge.",
    "Let the right-side detail panel carry the final proof while the list provides system context.",
    "Usually staged next to Feishu Chat Scene, Auto Learn Fade Overlay, and Auto Learn Ending Overlay."
  ],
  "pairWithIds": [
    "material-library/surfaces/feishu-chat-scene",
    "material-library/motion/auto-learn-fade-overlay",
    "material-library/motion/auto-learn-ending-overlay"
  ],
  "preferInsteadIds": [
    "material-library/data-display/chart-card-shell",
    "material-library/data-display/table"
  ],
  "dos": [
    "Use Knowledge Dashboard Scene when the environment should demonstrate organization and retrieval, not just one metric.",
    "Adapt entries and selection timing first while preserving the list-to-detail structure."
  ],
  "donts": [
    "Do not flatten it into a single proof card.",
    "Do not overload the detail panel with unrelated UI modules."
  ],
  "scriptRecipe": [
    "Transition out of the source discussion.",
    "Reveal Knowledge Dashboard Scene as the place where new knowledge is now stored.",
    "Hold on the selected entry and diff long enough for the viewer to understand the change."
  ],
  "narrativeRole": "environment",
  "scriptTriggersEn": [
    "knowledge dashboard scene",
    "knowledge base environment",
    "before after knowledge diff"
  ],
  "scriptTriggersZh": [
    "知识库场景",
    "知识面板环境",
    "自动学习结果面板"
  ],
  "negativeTriggersEn": [
    "small inline proof",
    "chat-only beat"
  ],
  "negativeTriggersZh": [
    "小型内联证明",
    "纯聊天节奏"
  ],
  "hostSurfaces": [
    "knowledge base environment",
    "documentation dashboard",
    "structured retrieval surface"
  ],
  "toneTags": [
    "organized",
    "product-forward",
    "evidentiary"
  ],
  "visualWeight": "full-scene",
  "informationDensity": "high",
  "dominance": "scene-owning",
  "reuseMode": "tweak-layout",
  "mutationCost": "medium",
  "safeToChange": [
    "entries",
    "selected item",
    "detail timing",
    "labels",
    "sidebar navigation text"
  ],
  "keepFixed": [
    "sidebar to list to detail relationship",
    "knowledge-first dashboard hierarchy",
    "before-after proof panel"
  ],
  "adaptationNotes": [
    "Keep the environment focused on organized knowledge and change proof, not on arbitrary admin widgets.",
    "If only a small proof surface is needed, step down to a table or chart shell instead of dragging the whole dashboard in."
  ]
}
---
Knowledge Dashboard Scene is the destination environment in this extraction set. It shows what the system learned, where it is stored, and how the stored knowledge changed. That makes it much stronger than a simple proof card when the story is about organization and retrieval.

For matching, think of beats like "show the knowledge base after the conversation" or "prove that the learned information is now searchable and structured." It is not a small evidence widget. It is a full scene-owning environment.

For adaptation, change the entries, selection, and timing first. Keep the sidebar, list, and detail relationship stable. That structure is what makes the scene communicate "systemized knowledge" rather than just "another dashboard."
