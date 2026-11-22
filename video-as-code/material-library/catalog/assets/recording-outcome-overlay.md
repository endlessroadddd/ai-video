---
{
  "id": "material-library/motion/recording-outcome-overlay",
  "title": "Recording Outcome Overlay",
  "category": "motion",
  "summary": "Full-screen outcome card overlay that lands the recording sequence on one shipped result and short summary.",
  "agentGoal": "Let the Agent reuse Recording Outcome Overlay when a script needs a clean outcome close after an analysis or evidence sequence without hand-building a new result card.",
  "whenToUse": [
    "Use when the scene should land on one shipped result with a clear summary sentence.",
    "Use when the outcome needs more weight than a small toast or inline badge."
  ],
  "avoidWhen": [
    "Avoid when the ending should stay purely branded with no card.",
    "Avoid when the result is too small or too provisional for a full outcome card."
  ],
  "keywords": [
    "outcome overlay",
    "result card",
    "recording close",
    "shipped result",
    "client outcome"
  ],
  "matchKeywords": [
    "recording outcome close",
    "shipped result overlay",
    "client outcome card",
    "结果落地卡",
    "录屏 outcome 收束",
    "最终结果 overlay"
  ],
  "inputProps": [
    "outcome",
    "kicker"
  ],
  "sourceProjects": [
    "projects/demo-app"
  ],
  "previewRef": "material-library/showcase#recording-outcome-overlay",
  "stability": "beta",
  "implementationRef": "material-library/src/motion/recording-overlays.tsx",
  "sceneTypes": [
    "transition",
    "outcome",
    "close"
  ],
  "styleFamilies": [
    "lucius-light",
    "recording-overlay"
  ],
  "editableParts": [
    "kicker",
    "headline number",
    "summary"
  ],
  "visualSignature": [
    "Centered translucent card over a soft matte with one large shipped-result headline and one short summary line.",
    "Reads as a clean product outcome, not as a proof-heavy dashboard.",
    "Most natural on outcome close, result reveal, and recording end-state surfaces."
  ],
  "selectionSignals": [
    "Reach for it when the audience should leave the sequence with one concrete shipped result.",
    "Best when the result deserves a full stop instead of fading back into product chrome.",
    "Choose it when the close should feel earned, concise, and product-forward."
  ],
  "compositionPatterns": [
    "Use it after analysis, evidence, or intertitle stages have already done the explaining.",
    "Keep the summary short so the outcome headline remains dominant.",
    "Usually staged next to Recording Intertitle Overlay, Resolve Overlay, and Reply Ready Toast."
  ],
  "pairWithIds": [
    "material-library/motion/recording-intertitle-overlay",
    "material-library/surfaces/resolve-overlay",
    "material-library/chat/reply-ready-toast"
  ],
  "preferInsteadIds": [
    "material-library/surfaces/resolve-overlay"
  ],
  "dos": [
    "Use Recording Outcome Overlay when the result is clear enough to state in one headline.",
    "Adapt kicker, outcome value, and summary first while keeping the centered card composition intact."
  ],
  "donts": [
    "Do not use it for tentative or ambiguous outcomes.",
    "Do not overload the summary with multiple claims."
  ],
  "scriptRecipe": [
    "Finish the explanation first.",
    "Land the shipped result in one large read.",
    "Exit before the outcome card starts competing with the next scene."
  ],
  "narrativeRole": "transition",
  "scriptTriggersEn": [
    "recording outcome close",
    "shipped result overlay",
    "client outcome card"
  ],
  "scriptTriggersZh": [
    "录屏 outcome 收束",
    "结果落地卡",
    "最终结果 overlay"
  ],
  "negativeTriggersEn": [
    "soft brand-only close",
    "tiny status update"
  ],
  "negativeTriggersZh": [
    "纯品牌柔和收尾",
    "很小的状态更新"
  ],
  "hostSurfaces": [
    "outcome close",
    "result reveal",
    "recording end-state"
  ],
  "toneTags": [
    "conclusive",
    "product-forward",
    "earned"
  ],
  "visualWeight": "heavy",
  "informationDensity": "low",
  "dominance": "primary",
  "reuseMode": "tweak-copy",
  "mutationCost": "low",
  "safeToChange": [
    "kicker",
    "outcome metric",
    "summary"
  ],
  "keepFixed": [
    "centered translucent card",
    "single-headline hierarchy",
    "short outcome cadence"
  ],
  "adaptationNotes": [
    "Keep the outcome headline concrete and numerically legible.",
    "If the close needs to feel more branded than product-card based, switch to Resolve Overlay instead."
  ]
}
---
Recording Outcome Overlay is the closing result card for the recording family. It is the right choice when the sequence has already done the work of explaining and now needs to land on one concrete shipped result. The extracted version preserves the original matte, centered translucent card, and short summary cadence.

For matching, think of beats like "show the shipped result", "land the final outcome", or "we need one last product-forward close." It works best after analysis or evidence-heavy scenes. If the ending should be softer, more branded, or less card-like, use Resolve Overlay instead.

For adaptation, change the kicker, metric, and summary first. Keep the centered card, single-headline hierarchy, and concise cadence stable. Once the card starts carrying multiple claims or too much proof detail, it stops functioning as a clean outcome close.
