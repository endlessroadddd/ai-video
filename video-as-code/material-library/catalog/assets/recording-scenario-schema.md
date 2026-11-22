---
{
  "id": "material-library/chat/recording-scenario-schema",
  "title": "Recording Scenario Schema",
  "category": "chat",
  "summary": "Typed recording schema for chat intro, evidence routing, wiki ingest, intertitles, and outcome close from the demo-app recording flow.",
  "agentGoal": "Let the Agent reuse Recording Scenario Schema when a script needs chat recording flow on recording workflow without rebuilding the surrounding chat layer from scratch.",
  "whenToUse": [
    "Use when building a recorded walkthrough that needs a fixed sequence of chat, evidence, wiki, and outcome scenes.",
    "Use when the scene can afford a light helper layer on recording workflow."
  ],
  "avoidWhen": [
    "Avoid when the scene timing should stay fully freeform or be driven by live user input.",
    "Avoid when purely visual shell."
  ],
  "keywords": [
    "recording",
    "scenario",
    "chat walkthrough",
    "timeline data",
    "scene schema",
    "helper",
    "structural",
    "planning"
  ],
  "matchKeywords": [
    "chat recording schema",
    "recorded scenario data",
    "demo recording sequence",
    "chat recording flow",
    "analysis wiki evidence pipeline",
    "recording scenario schema",
    "recording workflow",
    "scenario schema",
    "script scaffold",
    "structural",
    "planning",
    "systemic",
    "聊天录制流程",
    "analysis wiki evidence 流程",
    "录制场景 schema"
  ],
  "inputProps": [
    "DEFAULT_CLIENT_CHAT_RECORDING_SCENARIO",
    "ClientChatRecordingScenario"
  ],
  "sourceProjects": [
    "projects/demo-app"
  ],
  "previewRef": "material-library/showcase#recording-scenario-schema",
  "stability": "stable",
  "implementationRef": "projects/demo-app/src/lib/client-chat-recording.ts",
  "sceneTypes": [
    "recording",
    "chat",
    "analysis",
    "wiki"
  ],
  "styleFamilies": [
    "lucius-dashboard"
  ],
  "editableParts": [
    "scene copy",
    "durations",
    "platform logos",
    "message samples",
    "wiki items"
  ],
  "visualSignature": [
    "Typed recording schema for chat intro, evidence routing, wiki ingest, intertitles, and outcome close from the demo-app recording flow.",
    "Reads as a light structural, planning, systemic helper layer rather than a generic chat widget.",
    "Most natural on recording workflow, scenario schema, script scaffold surfaces."
  ],
  "selectionSignals": [
    "Reach for it when building a recorded walkthrough that needs a fixed sequence of chat, evidence, wiki, and outcome scenes.",
    "Best when the scene needs a light structural layer on recording workflow.",
    "Choose it when the main shell or proof is already present and this asset should reinforce it."
  ],
  "compositionPatterns": [
    "Attach it to the message, toast, or local action that actually owns the beat.",
    "Keep the surrounding copy short so the conversational signal stays scannable.",
    "Usually staged next to Recording Route Shell, Support Handoff Card, and Table Primitive.",
    "Pair it with Recording Route Shell when the beat needs one more layer of context without replacing Recording Scenario Schema."
  ],
  "pairWithIds": [
    "material-library/surfaces/recording-route-shell",
    "material-library/chat/support-handoff-card",
    "material-library/data-display/table"
  ],
  "preferInsteadIds": [
    "material-library/surfaces/recording-route-shell"
  ],
  "dos": [
    "Use Recording Scenario Schema only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with scene copy and durations while keeping public contract and side-effect boundaries stable."
  ],
  "donts": [
    "Do not use it when the scene timing should stay fully freeform or be driven by live user input.",
    "Do not rewrite public contract and side-effect boundaries in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Wire Recording Scenario Schema into the motion or schema layer first.",
    "Use the helper to standardize behavior across multiple visible assets instead of improvising scene by scene.",
    "Prefer Recording Route Shell when the scene timing should stay fully freeform or be driven by live user input."
  ],
  "narrativeRole": "helper",
  "scriptTriggersEn": [
    "chat recording flow",
    "analysis wiki evidence pipeline",
    "recording scenario schema"
  ],
  "scriptTriggersZh": [
    "聊天录制流程",
    "analysis wiki evidence 流程",
    "录制场景 schema"
  ],
  "negativeTriggersEn": [
    "purely visual shell",
    "single isolated component"
  ],
  "negativeTriggersZh": [
    "纯视觉壳层",
    "单个孤立组件"
  ],
  "hostSurfaces": [
    "recording workflow",
    "scenario schema",
    "script scaffold"
  ],
  "toneTags": [
    "structural",
    "planning",
    "systemic"
  ],
  "visualWeight": "light",
  "informationDensity": "medium",
  "dominance": "supporting",
  "reuseMode": "tweak-layout",
  "mutationCost": "medium",
  "safeToChange": [
    "scene copy",
    "durations",
    "platform logos",
    "DEFAULT_CLIENT_CHAT_RECORDING_SCENARIO",
    "ClientChatRecordingScenario"
  ],
  "keepFixed": [
    "public contract",
    "side-effect boundaries",
    "timing or schema semantics"
  ],
  "adaptationNotes": [
    "Keep helpers predictable so visible assets can rely on them without scene-specific hacks.",
    "If the contract changes, version it instead of silently mutating the existing helper."
  ]
}
---
Recording Scenario Schema is the right pick when building a recorded walkthrough that needs a fixed sequence of chat, evidence, wiki, and outcome scenes. Visually it reads as typed recording schema for chat intro, evidence routing, wiki ingest, intertitles, and outcome close from the demo-app recording flow, with a structural, planning, systemic tone, and it sits best on recording workflow, scenario schema, script scaffold surfaces.

For matching, look for beats like chat recording flow / analysis wiki evidence pipeline or 聊天录制流程 / analysis wiki evidence 流程. Pair it with Recording Route Shell and Support Handoff Card when the scene needs more context. Prefer Recording Route Shell when the scene timing should stay fully freeform or be driven by live user input.

For adaptation, change scene copy, durations, platform logos, DEFAULT_CLIENT_CHAT_RECORDING_SCENARIO, ClientChatRecordingScenario first. Keep public contract, side-effect boundaries, timing or schema semantics stable so the asset still feels like the extracted original. Keep helpers predictable so visible assets can rely on them without scene-specific hacks. If the contract changes, version it instead of silently mutating the existing helper.
