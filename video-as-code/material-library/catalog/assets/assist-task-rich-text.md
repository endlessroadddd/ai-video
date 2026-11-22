---
{
  "id": "material-library/chat/assist-task-rich-text",
  "title": "Assist Task Rich Text",
  "category": "chat",
  "summary": "Inline rich-text renderer that converts platform mentions into readable chips for Discord, Slack, Telegram, and Feishu event messages.",
  "agentGoal": "Let the Agent reuse Assist Task Rich Text when a script needs platform mentions in message copy on task message without rebuilding the surrounding chat layer from scratch.",
  "whenToUse": [
    "Use when raw event text includes platform mention syntax and the scene still needs to feel human-readable.",
    "Use when the scene can afford a light component layer on task message."
  ],
  "avoidWhen": [
    "Avoid when you need full markdown rendering or when message content should remain completely raw.",
    "Avoid when pure decorative copy."
  ],
  "keywords": [
    "mention parser",
    "rich text",
    "discord mention",
    "telegram mention",
    "feishu mention",
    "component",
    "operational",
    "platform-aware"
  ],
  "matchKeywords": [
    "event message rich text",
    "mention chip renderer",
    "assist task message text",
    "platform mentions in message copy",
    "task rich text",
    "cross-platform event renderer",
    "task message",
    "event feed",
    "cross-platform activity log",
    "operational",
    "platform-aware",
    "informational",
    "消息中的平台 mention",
    "任务富文本",
    "跨平台事件渲染"
  ],
  "inputProps": [
    "content",
    "platform",
    "eventUserId",
    "eventUserDisplayName",
    "className"
  ],
  "sourceProjects": [
    "projects/short-asset-golden-case-support"
  ],
  "previewRef": "material-library/showcase#assist-task-rich-text",
  "stability": "stable",
  "implementationRef": "material-library/src/chat/assist-task-rich-text.tsx",
  "sceneTypes": [
    "chat",
    "event-detail",
    "mention-heavy"
  ],
  "styleFamilies": [
    "lucius-dashboard"
  ],
  "editableParts": [
    "mention parsing",
    "platform colors",
    "chip copy",
    "text container style"
  ],
  "visualSignature": [
    "Inline rich-text renderer that converts platform mentions into readable chips for Discord, Slack, Telegram, and Feishu event messages.",
    "Reads as a light operational, platform-aware, informational component layer rather than a generic chat widget.",
    "Most natural on task message, event feed, cross-platform activity log surfaces."
  ],
  "selectionSignals": [
    "Reach for it when raw event text includes platform mention syntax and the scene still needs to feel human-readable.",
    "Best when the scene needs a light operational layer on task message.",
    "Choose it when the main shell or proof is already present and this asset should reinforce it."
  ],
  "compositionPatterns": [
    "Attach it to the message, toast, or local action that actually owns the beat.",
    "Keep the surrounding copy short so the conversational signal stays scannable.",
    "Usually staged next to Settings Section Shell, Knowledge File Type Icon, and Support Handoff Card.",
    "Pair it with Settings Section Shell when the beat needs one more layer of context without replacing Assist Task Rich Text."
  ],
  "pairWithIds": [
    "material-library/surfaces/settings-section-shell",
    "material-library/chat/knowledge-file-type-icon",
    "material-library/chat/support-handoff-card"
  ],
  "preferInsteadIds": [
    "material-library/chat/message-emphasis"
  ],
  "dos": [
    "Use Assist Task Rich Text only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with mention parsing and platform colors while keeping core silhouette and readability grouping stable."
  ],
  "donts": [
    "Do not use it when you need full markdown rendering or when message content should remain completely raw.",
    "Do not rewrite core silhouette and readability grouping in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Keep the surrounding shell readable before Assist Task Rich Text enters.",
    "Assist Task Rich Text should own one clear readable unit, not compete with a second proof block.",
    "Prefer Message Emphasis when you need full markdown rendering or when message content should remain completely raw."
  ],
  "narrativeRole": "component",
  "scriptTriggersEn": [
    "platform mentions in message copy",
    "task rich text",
    "cross-platform event renderer"
  ],
  "scriptTriggersZh": [
    "消息中的平台 mention",
    "任务富文本",
    "跨平台事件渲染"
  ],
  "negativeTriggersEn": [
    "pure decorative copy",
    "single plain text bubble"
  ],
  "negativeTriggersZh": [
    "纯装饰性文案",
    "单条纯文本气泡"
  ],
  "hostSurfaces": [
    "task message",
    "event feed",
    "cross-platform activity log"
  ],
  "toneTags": [
    "operational",
    "platform-aware",
    "informational"
  ],
  "visualWeight": "light",
  "informationDensity": "medium",
  "dominance": "supporting",
  "reuseMode": "tweak-copy",
  "mutationCost": "low",
  "safeToChange": [
    "mention parsing",
    "platform colors",
    "chip copy",
    "content",
    "platform"
  ],
  "keepFixed": [
    "core silhouette",
    "readability grouping",
    "spacing rhythm"
  ],
  "adaptationNotes": [
    "Keep the component readable in one glance before adding secondary motion around it.",
    "If you change the structural grouping, it is no longer a light adaptation of this component."
  ]
}
---
Assist Task Rich Text is the right pick when raw event text includes platform mention syntax and the scene still needs to feel human-readable. Visually it reads as inline rich-text renderer that converts platform mentions into readable chips for discord, slack, telegram, and feishu event messages, with a operational, platform-aware, informational tone, and it sits best on task message, event feed, cross-platform activity log surfaces.

For matching, look for beats like platform mentions in message copy / task rich text or 消息中的平台 mention / 任务富文本. Pair it with Settings Section Shell and Knowledge File Type Icon when the scene needs more context. Prefer Message Emphasis when you need full markdown rendering or when message content should remain completely raw.

For adaptation, change mention parsing, platform colors, chip copy, content, platform first. Keep core silhouette, readability grouping, spacing rhythm stable so the asset still feels like the extracted original. Keep the component readable in one glance before adding secondary motion around it. If you change the structural grouping, it is no longer a light adaptation of this component.
