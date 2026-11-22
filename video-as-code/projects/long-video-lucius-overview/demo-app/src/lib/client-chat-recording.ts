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

export type ClientChatRecordingTextFrame = {
  content: string;
  delayMs: number;
};

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
      introDurationMs: scaleClientChatRecordingDuration(500),
      orbitDurationMs: scaleClientChatRecordingDuration(3200),
      dispatchDurationMs: scaleClientChatRecordingDuration(800),
      settleDurationMs: scaleClientChatRecordingDuration(1600),
      evidenceDurationMs: scaleClientChatRecordingDuration(4000),
      resolveDurationMs: scaleClientChatRecordingDuration(700),
      handoffDurationMs: scaleClientChatRecordingDuration(500),
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
          text: "Manual edit before send.",
          tone: "edit",
        },
        {
          author: "Ops handoff",
          channel: "CS pod sync",
          id: "feishu-handoff-pattern",
          launchOrder: 1,
          platform: "feishu",
          slot: "top-right",
          text: "Repeating handoff pattern.",
          tone: "handoff",
        },
        {
          author: "PM feedback",
          channel: "#product-signals",
          id: "slack-customize-request",
          launchOrder: 2,
          platform: "slack",
          slot: "right",
          text: "Review request.",
          tone: "request",
        },
        {
          author: "Escalation note",
          channel: "Ops escalation",
          id: "telegram-escalation",
          launchOrder: 3,
          platform: "telegram",
          slot: "bottom-right",
          text: "Escalation risk.",
          tone: "escalation",
        },
        {
          author: "Account review",
          channel: "#high-volume",
          id: "slack-high-volume-impact",
          launchOrder: 4,
          platform: "slack",
          slot: "bottom-left",
          text: "High-volume impact.",
          tone: "request",
        },
        {
          author: "Support ops",
          channel: "Draft quality",
          id: "discord-control-step",
          launchOrder: 5,
          platform: "discord",
          slot: "left",
          text: "Final control step.",
          tone: "edit",
        },
      ],
    },
    blankStageDurations: {
      signalsDurationMs: scaleClientChatRecordingDuration(600),
      evidenceDurationMs: scaleClientChatRecordingDuration(600),
    },
    wikiScene: {
      featuredIds: [
        "kb-pre-send-review",
        "kb-high-volume-accounts",
      ] as const,
      timings: {
        introDurationMs: scaleClientChatRecordingDuration(600),
        scrollPrimaryDurationMs: scaleClientChatRecordingDuration(2200),
        highlightPrimaryDurationMs: scaleClientChatRecordingDuration(1400),
        extractPrimaryDurationMs: scaleClientChatRecordingDuration(1100),
        scrollSecondaryDurationMs: scaleClientChatRecordingDuration(2100),
        highlightSecondaryDurationMs: scaleClientChatRecordingDuration(1500),
        extractSecondaryDurationMs: scaleClientChatRecordingDuration(1100),
        maskDurationMs: scaleClientChatRecordingDuration(350),
        luciusEnterDurationMs: scaleClientChatRecordingDuration(500),
        ingestDurationMs: scaleClientChatRecordingDuration(2000),
        handoffDurationMs: scaleClientChatRecordingDuration(500),
      },
      items: [
        {
          id: "kb-escalation-spikes",
          source: "session_record",
          title: "Escalations rise",
          summary: "Drafts need one last fix.",
          updatedAt: "Today · 08:52",
        },
        {
          id: "kb-operator-rewrites",
          source: "manual",
          title: "Repeating edits",
          summary: "Manual tone adjustments.",
          updatedAt: "Today · 09:04",
        },
        {
          id: "kb-handoff-patterns",
          source: "session_record",
          title: "Control point",
          summary: "Lightweight review needed.",
          updatedAt: "Today · 09:18",
        },
        {
          id: "kb-edge-case-customization",
          source: "official_doc",
          title: "Quick adjustments",
          summary: "One place to review.",
          updatedAt: "Today · 09:33",
        },
        {
          id: "kb-pre-send-review",
          source: "official_doc",
          title: "Review request",
          summary: "Pre-send review step.",
          updatedAt: "Today · 09:47",
        },
        {
          id: "kb-high-volume-accounts",
          source: "web_crawl",
          title: "Impact scope",
          summary: "Mostly high-volume accounts.",
          updatedAt: "Today · 10:01",
        },
        {
          id: "kb-resolution-impact",
          source: "session_record",
          title: "Fast intervention",
          summary: "Lowering escalation risk.",
          updatedAt: "Today · 10:16",
        },
        {
          id: "kb-adoption-signal",
          source: "manual",
          title: "Clear visibility",
          summary: "Visible edit history.",
          updatedAt: "Today · 10:29",
        },
        {
          id: "kb-priority-brief",
          source: "official_doc",
          title: "PM Recommendation",
          summary: "Add review before send.",
          updatedAt: "Today · 10:41",
        },
      ],
    },
    intertitles: {
      signals: {
        copyDelayMs: scaleClientChatRecordingDuration(1000),
        copyInDurationMs: scaleClientChatRecordingDuration(1000),
        kicker: "PRODUCT SIGNAL",
        headline: "The signal is there. It is just scattered.",
        subline: "Lucius connects the dots across support and ops.",
        holdDurationMs: scaleClientChatRecordingDuration(4000),
        outDurationMs: scaleClientChatRecordingDuration(800),
      },
      evidence: {
        copyDelayMs: scaleClientChatRecordingDuration(1000),
        copyInDurationMs: scaleClientChatRecordingDuration(1000),
        kicker: "PM PRIORITY",
        headline: "The pattern becomes a clear next step.",
        subline:
          "Lucius turns frontline work into a recommendation a PM can act on.",
        holdDurationMs: scaleClientChatRecordingDuration(4000),
        outDurationMs: scaleClientChatRecordingDuration(800),
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

export function buildClientChatRecordingTextFrames(
  text: string,
  reducedMotion: boolean,
  getCharacterDelay: (character: string, reducedMotion: boolean) => number,
  maxFrameDurationMs: number,
): ClientChatRecordingTextFrame[] {
  const characters = Array.from(text);
  if (characters.length === 0) {
    return [];
  }

  if (reducedMotion) {
    return [
      {
        content: text,
        delayMs: 0,
      },
    ];
  }

  const frames: ClientChatRecordingTextFrame[] = [];
  let nextContent = "";
  let pendingDelayMs = 0;
  const clampedMaxFrameDurationMs = Math.max(1, maxFrameDurationMs);

  characters.forEach((character, index) => {
    nextContent += character;
    pendingDelayMs += getCharacterDelay(character, reducedMotion);

    const isLastCharacter = index === characters.length - 1;
    const isHardPause = character === "\n" || /[.!?]/.test(character);
    const isSoftPause = /[,;:]/.test(character);
    const shouldFlush =
      isLastCharacter ||
      isHardPause ||
      pendingDelayMs >= clampedMaxFrameDurationMs ||
      (isSoftPause &&
        pendingDelayMs >= Math.round(clampedMaxFrameDurationMs * 0.66));

    if (!shouldFlush) {
      return;
    }

    frames.push({
      content: nextContent,
      delayMs: pendingDelayMs,
    });
    pendingDelayMs = 0;
  });

  return frames;
}
