---
{
  "id": "material-library/surfaces/settings-section-shell",
  "title": "Settings Section Shell",
  "category": "surfaces",
  "summary": "Reusable settings section wrapper and paired skeleton blocks for community lists and workgroup cards.",
  "agentGoal": "Let the Agent reuse Settings Section Shell when a script needs settings section shell on settings page without rebuilding the surrounding surfaces layer from scratch.",
  "whenToUse": [
    "Use when a dashboard or settings screen needs a consistent section title, action slot, and loading skeleton rhythm.",
    "Use when the scene can afford a medium shell layer on settings page."
  ],
  "avoidWhen": [
    "Avoid when the view is not a settings-style information panel or when loading state is not part of the scene.",
    "Avoid when chat-native conversation."
  ],
  "keywords": [
    "settings shell",
    "section shell",
    "skeleton",
    "community skeleton",
    "workgroup skeleton",
    "shell",
    "settings",
    "structured"
  ],
  "matchKeywords": [
    "settings section wrapper",
    "dashboard section shell",
    "settings skeleton list",
    "settings section shell",
    "integration panel wrapper",
    "admin list scaffold",
    "settings page",
    "integration panel",
    "admin surface",
    "settings",
    "structured",
    "product",
    "设置分区壳层",
    "集成面板包装",
    "管理列表骨架"
  ],
  "inputProps": [
    "title",
    "actions",
    "children",
    "rowCount",
    "cardCount"
  ],
  "sourceProjects": [
    "projects/short-asset-golden-case-support_dc"
  ],
  "previewRef": "material-library/showcase#settings-section-shell",
  "stability": "stable",
  "implementationRef": "material-library/src/surfaces/settings-section-shell.tsx",
  "sceneTypes": [
    "settings",
    "dashboard",
    "skeleton",
    "admin"
  ],
  "styleFamilies": [
    "lucius-dashboard"
  ],
  "editableParts": [
    "title",
    "action slot",
    "skeleton counts",
    "card density",
    "surface style"
  ],
  "visualSignature": [
    "Reusable settings section wrapper and paired skeleton blocks for community lists and workgroup cards.",
    "Reads as a medium settings, structured, product shell layer rather than a generic surfaces widget.",
    "Most natural on settings page, integration panel, admin surface surfaces."
  ],
  "selectionSignals": [
    "Reach for it when a dashboard or settings screen needs a consistent section title, action slot, and loading skeleton rhythm.",
    "Best when the scene needs a medium settings layer on settings page.",
    "Choose it when this asset should carry the main readable beat."
  ],
  "compositionPatterns": [
    "Use it as frame chrome around one or two focal elements, not as a dense page clone.",
    "Let the shell establish context before a smaller proof element takes over.",
    "Usually staged next to Knowledge File Type Icon, Assist Task Rich Text, and Proof Chip.",
    "Pair it with Knowledge File Type Icon when the beat needs one more layer of context without replacing Settings Section Shell."
  ],
  "pairWithIds": [
    "material-library/chat/knowledge-file-type-icon",
    "material-library/chat/assist-task-rich-text",
    "material-library/surfaces/proof-chip"
  ],
  "preferInsteadIds": [
    "material-library/data-display/chart-card-shell"
  ],
  "dos": [
    "Use Settings Section Shell only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with title and action slot while keeping frame geometry and chrome proportions stable."
  ],
  "donts": [
    "Do not use it when the view is not a settings-style information panel or when loading state is not part of the scene.",
    "Do not rewrite frame geometry and chrome proportions in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Use Settings Section Shell to establish interface context in one glance.",
    "Keep the shell stable while proof or accent layers do the moment-to-moment work.",
    "Prefer Chart Card Shell when the view is not a settings-style information panel or when loading state is not part of the scene."
  ],
  "narrativeRole": "shell",
  "scriptTriggersEn": [
    "settings section shell",
    "integration panel wrapper",
    "admin list scaffold"
  ],
  "scriptTriggersZh": [
    "设置分区壳层",
    "集成面板包装",
    "管理列表骨架"
  ],
  "negativeTriggersEn": [
    "chat-native conversation",
    "full-screen branded close"
  ],
  "negativeTriggersZh": [
    "聊天原生对话",
    "全屏品牌结尾"
  ],
  "hostSurfaces": [
    "settings page",
    "integration panel",
    "admin surface"
  ],
  "toneTags": [
    "settings",
    "structured",
    "product"
  ],
  "visualWeight": "medium",
  "informationDensity": "medium",
  "dominance": "primary",
  "reuseMode": "tweak-layout",
  "mutationCost": "medium",
  "safeToChange": [
    "title",
    "action slot",
    "skeleton counts",
    "actions",
    "interior content"
  ],
  "keepFixed": [
    "frame geometry",
    "chrome proportions",
    "spacing rhythm"
  ],
  "adaptationNotes": [
    "Let the shell establish context, then layer proof or accents inside it.",
    "If the chrome hierarchy changes materially, promote that work into a new shell asset."
  ]
}
---
Settings Section Shell is the right pick when a dashboard or settings screen needs a consistent section title, action slot, and loading skeleton rhythm. Visually it reads as reusable settings section wrapper and paired skeleton blocks for community lists and workgroup cards, with a settings, structured, product tone, and it sits best on settings page, integration panel, admin surface surfaces.

For matching, look for beats like settings section shell / integration panel wrapper or 设置分区壳层 / 集成面板包装. Pair it with Knowledge File Type Icon and Assist Task Rich Text when the scene needs more context. Prefer Chart Card Shell when the view is not a settings-style information panel or when loading state is not part of the scene.

For adaptation, change title, action slot, skeleton counts, actions, interior content first. Keep frame geometry, chrome proportions, spacing rhythm stable so the asset still feels like the extracted original. Let the shell establish context, then layer proof or accents inside it. If the chrome hierarchy changes materially, promote that work into a new shell asset.
