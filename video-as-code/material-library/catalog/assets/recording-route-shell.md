---
{
  "id": "material-library/surfaces/recording-route-shell",
  "title": "Recording Route Shell",
  "category": "surfaces",
  "summary": "Outer recording shell that applies camera and layout state around the demo chat page for `/chat/recording`.",
  "agentGoal": "Let the Agent reuse Recording Route Shell when a script needs chat recording route shell on recording route without rebuilding the surrounding surfaces layer from scratch.",
  "whenToUse": [
    "Use when a recorded chat needs one outer shell to coordinate camera mode, centered versus docked layout, and route-level chrome.",
    "Use when the scene can afford a heavy shell layer on recording route."
  ],
  "avoidWhen": [
    "Avoid when you only need an isolated chat widget without route shell behavior or document-level recording state.",
    "Avoid when simple isolated component."
  ],
  "keywords": [
    "recording shell",
    "route shell",
    "camera state",
    "layout shell",
    "shell",
    "recording",
    "product",
    "framed"
  ],
  "matchKeywords": [
    "chat recording shell",
    "route-level recording wrapper",
    "camera layout shell",
    "chat recording route shell",
    "camera-framed recording page",
    "recording layout wrapper",
    "recording route",
    "chat recording stage",
    "analysis page wrapper",
    "recording",
    "product",
    "framed",
    "聊天录制路由壳层",
    "带摄像头构图的录制页",
    "录制布局外壳"
  ],
  "inputProps": [
    "recordingScenario",
    "routeSessionId"
  ],
  "sourceProjects": [
    "projects/demo-app",
    "projects/short-asset-golden-case-support"
  ],
  "previewRef": "material-library/showcase#recording-route-shell",
  "stability": "beta",
  "implementationRef": "projects/demo-app/src/components/chat/client-chat-route-shell.tsx",
  "sceneTypes": [
    "recording",
    "route-shell",
    "chat-layout"
  ],
  "styleFamilies": [
    "lucius-dashboard"
  ],
  "editableParts": [
    "layout state",
    "camera state",
    "recording scenario binding",
    "extra shell widgets"
  ],
  "visualSignature": [
    "Outer recording shell that applies camera and layout state around the demo chat page for `/chat/recording`.",
    "Reads as a heavy recording, product, framed shell layer rather than a generic surfaces widget.",
    "Most natural on recording route, chat recording stage, analysis page wrapper surfaces."
  ],
  "selectionSignals": [
    "Reach for it when a recorded chat needs one outer shell to coordinate camera mode, centered versus docked layout, and route-level chrome.",
    "Best when the scene needs a heavy recording layer on recording route.",
    "Choose it when this asset should carry the main readable beat."
  ],
  "compositionPatterns": [
    "Use it as frame chrome around one or two focal elements, not as a dense page clone.",
    "Let the shell establish context before a smaller proof element takes over.",
    "Usually staged next to Recording Scenario Schema, Settings Section Shell, and Assist Task Rich Text.",
    "Pair it with Recording Scenario Schema when the beat needs one more layer of context without replacing Recording Route Shell."
  ],
  "pairWithIds": [
    "material-library/chat/recording-scenario-schema",
    "material-library/surfaces/settings-section-shell",
    "material-library/chat/assist-task-rich-text"
  ],
  "preferInsteadIds": [
    "material-library/surfaces/phone-frame"
  ],
  "dos": [
    "Use Recording Route Shell only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with layout state and camera state while keeping frame geometry and chrome proportions stable."
  ],
  "donts": [
    "Do not use it when you only need an isolated chat widget without route shell behavior or document-level recording state.",
    "Do not rewrite frame geometry and chrome proportions in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Use Recording Route Shell to establish interface context in one glance.",
    "Keep the shell stable while proof or accent layers do the moment-to-moment work.",
    "Prefer Phone Frame when you only need an isolated chat widget without route shell behavior or document-level recording state."
  ],
  "narrativeRole": "shell",
  "scriptTriggersEn": [
    "chat recording route shell",
    "camera-framed recording page",
    "recording layout wrapper"
  ],
  "scriptTriggersZh": [
    "聊天录制路由壳层",
    "带摄像头构图的录制页",
    "录制布局外壳"
  ],
  "negativeTriggersEn": [
    "simple isolated component",
    "lightweight phone shell"
  ],
  "negativeTriggersZh": [
    "简单孤立组件",
    "轻量手机壳"
  ],
  "hostSurfaces": [
    "recording route",
    "chat recording stage",
    "analysis page wrapper"
  ],
  "toneTags": [
    "recording",
    "product",
    "framed"
  ],
  "visualWeight": "heavy",
  "informationDensity": "medium",
  "dominance": "primary",
  "reuseMode": "heavy-adaptation",
  "mutationCost": "high",
  "safeToChange": [
    "layout state",
    "camera state",
    "recording scenario binding",
    "recordingScenario",
    "routeSessionId"
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
Recording Route Shell is the right pick when a recorded chat needs one outer shell to coordinate camera mode, centered versus docked layout, and route-level chrome. Visually it reads as outer recording shell that applies camera and layout state around the demo chat page for `/chat/recording`, with a recording, product, framed tone, and it sits best on recording route, chat recording stage, analysis page wrapper surfaces.

For matching, look for beats like chat recording route shell / camera-framed recording page or 聊天录制路由壳层 / 带摄像头构图的录制页. Pair it with Recording Scenario Schema and Settings Section Shell when the scene needs more context. Prefer Phone Frame when you only need an isolated chat widget without route shell behavior or document-level recording state.

For adaptation, change layout state, camera state, recording scenario binding, recordingScenario, routeSessionId first. Keep frame geometry, chrome proportions, spacing rhythm stable so the asset still feels like the extracted original. Let the shell establish context, then layer proof or accents inside it. If the chrome hierarchy changes materially, promote that work into a new shell asset.
