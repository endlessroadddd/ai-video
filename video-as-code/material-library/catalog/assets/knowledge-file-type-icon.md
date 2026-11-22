---
{
  "id": "material-library/chat/knowledge-file-type-icon",
  "title": "Knowledge File Type Icon",
  "category": "chat",
  "summary": "Small file badge that turns extensions like PDF, DOC, TXT, and MD into compact visual markers for knowledge uploads and attachments.",
  "agentGoal": "Let the Agent reuse Knowledge File Type Icon when a script needs file type badge on attachment chip without rebuilding the surrounding chat layer from scratch.",
  "whenToUse": [
    "Use when a chat or dashboard scene needs to show file type at a glance without rendering a full document row.",
    "Use when the scene can afford a micro component layer on attachment chip."
  ],
  "avoidWhen": [
    "Avoid when the file itself is already represented by a richer card with filename, source, and metadata.",
    "Avoid when hero illustration."
  ],
  "keywords": [
    "file icon",
    "knowledge upload",
    "attachment badge",
    "pdf badge",
    "doc badge",
    "component",
    "knowledge",
    "utility"
  ],
  "matchKeywords": [
    "file type badge",
    "knowledge file icon",
    "attachment type icon",
    "knowledge attachment marker",
    "upload proof row",
    "attachment chip",
    "knowledge upload row",
    "proof card",
    "knowledge",
    "utility",
    "operational",
    "文件类型徽标",
    "知识附件标记",
    "上传证明行"
  ],
  "inputProps": [
    "fileName",
    "className",
    "style"
  ],
  "sourceProjects": [
    "projects/short-asset-golden-case-support"
  ],
  "previewRef": "material-library/showcase#knowledge-file-type-icon",
  "stability": "stable",
  "implementationRef": "material-library/src/chat/knowledge-file-type-icon.tsx",
  "sceneTypes": [
    "attachment",
    "knowledge",
    "upload"
  ],
  "styleFamilies": [
    "lucius-dashboard"
  ],
  "editableParts": [
    "extension mapping",
    "label text",
    "accent color",
    "size"
  ],
  "visualSignature": [
    "Small file badge that turns extensions like PDF, DOC, TXT, and MD into compact visual markers for knowledge uploads and attachments.",
    "Reads as a micro knowledge, utility, operational component layer rather than a generic chat widget.",
    "Most natural on attachment chip, knowledge upload row, proof card surfaces."
  ],
  "selectionSignals": [
    "Reach for it when a chat or dashboard scene needs to show file type at a glance without rendering a full document row.",
    "Best when the scene needs a micro knowledge layer on attachment chip.",
    "Choose it when the main shell or proof is already present and this asset should reinforce it."
  ],
  "compositionPatterns": [
    "Attach it to the message, toast, or local action that actually owns the beat.",
    "Keep the surrounding copy short so the conversational signal stays scannable.",
    "Usually staged next to Settings Section Shell, Assist Task Rich Text, and Support Handoff Card.",
    "Pair it with Settings Section Shell when the beat needs one more layer of context without replacing Knowledge File Type Icon."
  ],
  "pairWithIds": [
    "material-library/surfaces/settings-section-shell",
    "material-library/chat/assist-task-rich-text",
    "material-library/chat/support-handoff-card"
  ],
  "preferInsteadIds": [],
  "dos": [
    "Use Knowledge File Type Icon only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with extension mapping and label text while keeping core silhouette and readability grouping stable."
  ],
  "donts": [
    "Do not use it when the file itself is already represented by a richer card with filename, source, and metadata.",
    "Do not rewrite core silhouette and readability grouping in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Keep the surrounding shell readable before Knowledge File Type Icon enters.",
    "Knowledge File Type Icon should own one clear readable unit, not compete with a second proof block.",
    "Pair with Settings Section Shell if the next beat needs more context or follow-through."
  ],
  "narrativeRole": "component",
  "scriptTriggersEn": [
    "file type badge",
    "knowledge attachment marker",
    "upload proof row"
  ],
  "scriptTriggersZh": [
    "文件类型徽标",
    "知识附件标记",
    "上传证明行"
  ],
  "negativeTriggersEn": [
    "hero illustration",
    "large dashboard chart"
  ],
  "negativeTriggersZh": [
    "主视觉插画",
    "大型图表证据"
  ],
  "hostSurfaces": [
    "attachment chip",
    "knowledge upload row",
    "proof card"
  ],
  "toneTags": [
    "knowledge",
    "utility",
    "operational"
  ],
  "visualWeight": "micro",
  "informationDensity": "low",
  "dominance": "supporting",
  "reuseMode": "drop-in",
  "mutationCost": "low",
  "safeToChange": [
    "extension mapping",
    "label text",
    "accent color",
    "fileName",
    "className"
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
Knowledge File Type Icon is the right pick when a chat or dashboard scene needs to show file type at a glance without rendering a full document row. Visually it reads as small file badge that turns extensions like pdf, doc, txt, and md into compact visual markers for knowledge uploads and attachments, with a knowledge, utility, operational tone, and it sits best on attachment chip, knowledge upload row, proof card surfaces.

For matching, look for beats like file type badge / knowledge attachment marker or 文件类型徽标 / 知识附件标记. Pair it with Settings Section Shell and Assist Task Rich Text when the scene needs more context. Prefer a lighter alternative when the file itself is already represented by a richer card with filename, source, and metadata.

For adaptation, change extension mapping, label text, accent color, fileName, className first. Keep core silhouette, readability grouping, spacing rhythm stable so the asset still feels like the extracted original. Keep the component readable in one glance before adding secondary motion around it. If you change the structural grouping, it is no longer a light adaptation of this component.
