export type ClientChatRecordingChatScene = {
  prompt: string;
  reply: string;
  thinkingDurationMs: number;
};

export type ClientChatRecordingEvidenceScene = {
  route:
    | "/dashboard/event"
    | "/dashboard/user-list"
    | "/dashboard/knowledge-base";
  title: string;
  focus: string;
};

export type ClientChatRecordingBriefScene = {
  opportunity: string;
  whyItMatters: string;
  evidence: string;
  whoItAffects: string;
  recommendation: string;
  confidence: "high" | "medium" | "low";
};

export type ClientChatRecordingOutcomeScene = {
  shippedInHours: number;
  summary: string;
};

export type ClientChatRecordingAnalysisPlatform =
  | "discord"
  | "feishu"
  | "slack"
  | "telegram";

export type ClientChatRecordingAnalysisOrbitSlot =
  | "top"
  | "right"
  | "bottom"
  | "left";

export type ClientChatRecordingAnalysisMessageSlot =
  | "top-left"
  | "top-right"
  | "right"
  | "bottom-right"
  | "bottom-left"
  | "left";

export type ClientChatRecordingAnalysisLogo = {
  assetPath: string;
  label: string;
  platform: ClientChatRecordingAnalysisPlatform;
  slot: ClientChatRecordingAnalysisOrbitSlot;
};

export type ClientChatRecordingAnalysisMessage = {
  author: string;
  channel: string;
  id: string;
  launchOrder: number;
  platform: ClientChatRecordingAnalysisPlatform;
  slot: ClientChatRecordingAnalysisMessageSlot;
  text: string;
  tone: "request" | "edit" | "handoff" | "escalation";
};

export type ClientChatRecordingAnalysisScene = {
  centerLabel: string;
  dispatchDurationMs: number;
  evidenceDurationMs: number;
  handoffDurationMs: number;
  introDurationMs: number;
  logos: ClientChatRecordingAnalysisLogo[];
  messages: ClientChatRecordingAnalysisMessage[];
  orbitDurationMs: number;
  settleDurationMs: number;
  resolveDurationMs: number;
};

export type ClientChatRecordingWikiSource =
  | "official_doc"
  | "session_record"
  | "manual"
  | "web_crawl";

export type ClientChatRecordingWikiItem = {
  id: string;
  source: ClientChatRecordingWikiSource;
  summary: string;
  title: string;
  updatedAt: string;
};

export type ClientChatRecordingWikiTimings = {
  handoffDurationMs: number;
  ingestDurationMs: number;
  introDurationMs: number;
  extractPrimaryDurationMs: number;
  extractSecondaryDurationMs: number;
  highlightPrimaryDurationMs: number;
  highlightSecondaryDurationMs: number;
  luciusEnterDurationMs: number;
  maskDurationMs: number;
  scrollPrimaryDurationMs: number;
  scrollSecondaryDurationMs: number;
};

export type ClientChatRecordingWikiScene = {
  featuredIds: readonly [string, string];
  items: ReadonlyArray<ClientChatRecordingWikiItem>;
  timings: ClientChatRecordingWikiTimings;
};

export type ClientChatRecordingIntertitle = {
  copyDelayMs: number;
  copyInDurationMs: number;
  headline: string;
  holdDurationMs: number;
  kicker: string;
  outDurationMs: number;
  subline: string;
};

export type ClientChatRecordingIntertitles = {
  evidence: ClientChatRecordingIntertitle;
  signals: ClientChatRecordingIntertitle;
};

export type ClientChatRecordingBlankStageDurations = {
  evidenceDurationMs: number;
  signalsDurationMs: number;
};

export type ClientChatRecordingScenario = {
  name: "typed-intro";
  analysisScene: ClientChatRecordingAnalysisScene;
  blankStageDurations: ClientChatRecordingBlankStageDurations;
  chatScene: ClientChatRecordingChatScene;
  evidenceScenes: ClientChatRecordingEvidenceScene[];
  briefScene: ClientChatRecordingBriefScene;
  intertitles: ClientChatRecordingIntertitles;
  outcomeScene: ClientChatRecordingOutcomeScene;
  wikiScene: ClientChatRecordingWikiScene;
};

export type ClientChatRecordingCameraState = "wide" | "focus-chat";
export type ClientChatRecordingLayoutState = "docked" | "centered";

const CLIENT_CHAT_RECORDING_FAST_PREVIEW: boolean =
  import.meta.env.DEV &&
  String(import.meta.env.VITE_CHAT_RECORDING_FAST_PREVIEW || "").trim() ===
    "true";

const CLIENT_CHAT_RECORDING_TIMING_SCALE: number =
  CLIENT_CHAT_RECORDING_FAST_PREVIEW ? 0.58 : 1;

function scaleClientChatRecordingDuration(durationMs: number): number {
  return Math.max(0, Math.round(durationMs * CLIENT_CHAT_RECORDING_TIMING_SCALE));
}

export const DEFAULT_CLIENT_CHAT_RECORDING_SCENARIO: ClientChatRecordingScenario =
  {
    name: "typed-intro",
    analysisScene: {
      centerLabel: "Connecting the dots",
      introDurationMs: scaleClientChatRecordingDuration(320),
      orbitDurationMs: scaleClientChatRecordingDuration(2200),
      dispatchDurationMs: scaleClientChatRecordingDuration(540),
      settleDurationMs: scaleClientChatRecordingDuration(1080),
      evidenceDurationMs: scaleClientChatRecordingDuration(2800),
      resolveDurationMs: scaleClientChatRecordingDuration(480),
      handoffDurationMs: scaleClientChatRecordingDuration(340),
      logos: [
        {
          assetPath: "/platform-icons/discord.svg",
          label: "Discord",
          platform: "discord",
          slot: "top",
        },
        {
          assetPath: "/platform-icons/slack.svg",
          label: "Slack",
          platform: "slack",
          slot: "right",
        },
        {
          assetPath: "/platform-icons/telegram.svg",
          label: "Telegram",
          platform: "telegram",
          slot: "bottom",
        },
        {
          assetPath: "/platform-icons/feishu.svg",
          label: "Feishu",
          platform: "feishu",
          slot: "left",
        },
      ],
      messages: [
        {
          author: "Support lead",
          channel: "#billing-edge-cases",
          id: "discord-edge-review",
          launchOrder: 0,
          platform: "discord",
          slot: "top-left",
          text: "We still edit AI drafts before they go out.",
          tone: "edit",
        },
        {
          author: "Ops handoff",
          channel: "CS pod sync",
          id: "feishu-handoff-pattern",
          launchOrder: 1,
          platform: "feishu",
          slot: "top-right",
          text: "The same last-minute changes show up across handoffs.",
          tone: "handoff",
        },
        {
          author: "PM feedback",
          channel: "#product-signals",
          id: "slack-customize-request",
          launchOrder: 2,
          platform: "slack",
          slot: "right",
          text: "Can we review the draft before Lucius sends it?",
          tone: "request",
        },
        {
          author: "Escalation note",
          channel: "Ops escalation",
          id: "telegram-escalation",
          launchOrder: 3,
          platform: "telegram",
          slot: "bottom-right",
          text: "Escalations rise when the first reply is almost right.",
          tone: "escalation",
        },
        {
          author: "Account review",
          channel: "#high-volume",
          id: "slack-high-volume-impact",
          launchOrder: 4,
          platform: "slack",
          slot: "bottom-left",
          text: "This hits high-volume accounts the hardest.",
          tone: "request",
        },
        {
          author: "Support ops",
          channel: "Draft quality",
          id: "discord-control-step",
          launchOrder: 5,
          platform: "discord",
          slot: "left",
          text: "Teams trust Lucius. They want a final control step.",
          tone: "edit",
        },
      ],
    },
    blankStageDurations: {
      signalsDurationMs: scaleClientChatRecordingDuration(420),
      evidenceDurationMs: scaleClientChatRecordingDuration(420),
    },
    wikiScene: {
      featuredIds: [
        "kb-pre-send-review",
        "kb-high-volume-accounts",
      ] as const,
      timings: {
        introDurationMs: scaleClientChatRecordingDuration(420),
        scrollPrimaryDurationMs: scaleClientChatRecordingDuration(1500),
        highlightPrimaryDurationMs: scaleClientChatRecordingDuration(980),
        extractPrimaryDurationMs: scaleClientChatRecordingDuration(720),
        scrollSecondaryDurationMs: scaleClientChatRecordingDuration(1450),
        highlightSecondaryDurationMs: scaleClientChatRecordingDuration(1020),
        extractSecondaryDurationMs: scaleClientChatRecordingDuration(760),
        maskDurationMs: scaleClientChatRecordingDuration(220),
        luciusEnterDurationMs: scaleClientChatRecordingDuration(360),
        ingestDurationMs: scaleClientChatRecordingDuration(1400),
        handoffDurationMs: scaleClientChatRecordingDuration(320),
      },
      items: [
        {
          id: "kb-escalation-spikes",
          source: "session_record",
          title: "Escalations rise when drafts need one last fix",
          summary:
            "Cases escalate when the reply is close, but still needs a human correction.",
          updatedAt: "Today · 08:52",
        },
        {
          id: "kb-operator-rewrites",
          source: "manual",
          title: "The same pre-send edits keep repeating",
          summary:
            "Operators make similar changes around tone, scope, and edge cases.",
          updatedAt: "Today · 09:04",
        },
        {
          id: "kb-handoff-patterns",
          source: "session_record",
          title: "Teams want a control point, not a new workflow",
          summary:
            "Handoffs show trust in the draft, but not enough control before send.",
          updatedAt: "Today · 09:18",
        },
        {
          id: "kb-edge-case-customization",
          source: "official_doc",
          title: "Edge cases need quick customization before send",
          summary:
            "The gap is small: teams need one place to adjust the reply before it goes out.",
          updatedAt: "Today · 09:33",
        },
        {
          id: "kb-pre-send-review",
          source: "official_doc",
          title: "Repeated request: review the draft before send",
          summary:
            "Support and ops teams keep asking for a lightweight review step before Lucius sends the reply.",
          updatedAt: "Today · 09:47",
        },
        {
          id: "kb-high-volume-accounts",
          source: "web_crawl",
          title: "Impact is highest in high-volume accounts",
          summary:
            "The pattern is strongest where reply volume is highest, so the workflow gap matters more.",
          updatedAt: "Today · 10:01",
        },
        {
          id: "kb-resolution-impact",
          source: "session_record",
          title: "Fast intervention lowers escalation risk",
          summary:
            "A narrow control step reduces escalations without slowing the normal path.",
          updatedAt: "Today · 10:16",
        },
        {
          id: "kb-adoption-signal",
          source: "manual",
          title: "Adoption stays high when edits are visible",
          summary:
            "Teams want confidence and control together, not a heavier process.",
          updatedAt: "Today · 10:29",
        },
        {
          id: "kb-priority-brief",
          source: "official_doc",
          title: "PM-ready recommendation: add review before send",
          summary:
            "The strongest next step is a lightweight review and customization surface before send.",
          updatedAt: "Today · 10:41",
        },
      ],
    },
    intertitles: {
      signals: {
        copyDelayMs: scaleClientChatRecordingDuration(700),
        copyInDurationMs: scaleClientChatRecordingDuration(700),
        kicker: "PRODUCT SIGNAL",
        headline: "The signal is there. It is just scattered.",
        subline: "Lucius connects the dots across support and ops.",
        holdDurationMs: scaleClientChatRecordingDuration(3000),
        outDurationMs: scaleClientChatRecordingDuration(560),
      },
      evidence: {
        copyDelayMs: scaleClientChatRecordingDuration(700),
        copyInDurationMs: scaleClientChatRecordingDuration(700),
        kicker: "PM PRIORITY",
        headline: "The pattern becomes a clear next step.",
        subline:
          "Lucius turns frontline work into a recommendation a PM can act on.",
        holdDurationMs: scaleClientChatRecordingDuration(3000),
        outDurationMs: scaleClientChatRecordingDuration(560),
      },
    },
    chatScene: {
      prompt: "Based on this week's conversations, what should we prioritize next?",
      reply: [
        "One pattern keeps repeating: teams want a review step before Lucius sends the reply.",
        "Lucius can see it because the signal lives inside support edits, ops handoffs, and escalation notes, not in a single feedback thread.",
        "It matters most in high-volume accounts, where small workflow friction compounds quickly.",
        "I'd prioritize a lightweight review and customization step before send. That's a recommendation backed by real behavior, not a guess. I can pull the supporting conversations and affected accounts if you want to validate the scope.",
      ].join("\n\n"),
      thinkingDurationMs: scaleClientChatRecordingDuration(1350),
    },
    evidenceScenes: [
      {
        route: "/dashboard/event",
        title: "The signal lives inside operator edits",
        focus:
          "Repeated pre-send edits, handoffs, and escalations point to the same gap.",
      },
      {
        route: "/dashboard/user-list",
        title: "The impact is concentrated, not random",
        focus:
          "The pattern is strongest in high-volume accounts, where workflow friction compounds quickly.",
      },
      {
        route: "/dashboard/knowledge-base",
        title: "The recommendation stays traceable",
        focus:
          "Every conclusion links back to support behavior, ops context, and adopted guidance.",
      },
    ],
    briefScene: {
      opportunity: "Add a lightweight review and customization step before send.",
      whyItMatters:
        "Teams trust Lucius on the common path, but edge cases still need a fast human control point.",
      evidence:
        "The same need appears in repeated edits, escalation handoffs, and direct requests across weekly conversations.",
      whoItAffects:
        "The impact is highest in high-volume accounts, where small workflow friction compounds quickly.",
      recommendation:
        "Prioritize a narrow pre-send review surface before broader workflow changes.",
      confidence: "high",
    },
    outcomeScene: {
      shippedInHours: 24,
      summary:
        "The first version shipped in 24 hours. The speed surprised the client.",
    },
  };

export function getClientChatRecordingPromptDelay(
  character: string,
  reducedMotion: boolean,
): number {
  if (reducedMotion) {
    return 0;
  }

  if (character === " ") {
    return scaleClientChatRecordingDuration(18);
  }

  if (/[,;:]/.test(character)) {
    return scaleClientChatRecordingDuration(58);
  }

  if (/[.!?]/.test(character)) {
    return scaleClientChatRecordingDuration(84);
  }

  return scaleClientChatRecordingDuration(32);
}

export function getClientChatRecordingReplyDelay(
  character: string,
  reducedMotion: boolean,
): number {
  if (reducedMotion) {
    return 0;
  }

  if (character === " ") {
    return scaleClientChatRecordingDuration(12);
  }

  if (character === "\n") {
    return scaleClientChatRecordingDuration(180);
  }

  if (/[,;:]/.test(character)) {
    return scaleClientChatRecordingDuration(72);
  }

  if (/[.!?]/.test(character)) {
    return scaleClientChatRecordingDuration(108);
  }

  return scaleClientChatRecordingDuration(22);
}
