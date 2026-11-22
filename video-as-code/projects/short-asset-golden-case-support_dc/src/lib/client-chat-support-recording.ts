import type {
  ClientChatMessage,
  ClientChatMessageAttachment,
} from "@/lib/services/client-chat-api";

export type ClientChatSupportRecordingHandoffStatus =
  | "reviewing"
  | "corrected";

export type ClientChatSupportRecordingHandoffSummaryItem = {
  label: string;
  value: string;
};

export type ClientChatSupportRecordingHandoffCard = {
  eyebrow: string;
  owner: string;
  reviewLabel: string;
  correctedLabel: string;
  steps: readonly [string, string, string];
  summaryItems: ReadonlyArray<ClientChatSupportRecordingHandoffSummaryItem>;
  title: string;
};

export type ClientChatSupportRecordingTimings = {
  betweenCollectionReplyAndDetailsMs: number;
  betweenCorrectedAndFinalReplyMs: number;
  betweenFinalReplyAndPraiseMs: number;
  betweenSolvedAndIssueMs: number;
  betweenVatIssueAndCollectionMs: number;
  endingHoldMs: number;
  handoffPendingMs: number;
  handoffResolveMs: number;
  handoffReviewMs: number;
  initialDelayMs: number;
  initialSendClickDurationMs: number;
  luciusCollectionThinkingMs: number;
  luciusFinalReplyThinkingMs: number;
  luciusFirstReplyThinkingMs: number;
  postFirstReplyHoldMs: number;
  postUserDetailsHoldMs: number;
};

export type ClientChatSupportRecordingScenario = {
  finalPraise: string;
  finalResolution: string;
  firstReply: string;
  firstUserPrompt: string;
  handoffCard: ClientChatSupportRecordingHandoffCard;
  handoffMessageContent: string;
  issueCollectionReply: string;
  issueDetailsMessage: string;
  issueDetailsMessageAttachments: ClientChatMessageAttachment[];
  issuePrompt: string;
  name: "golden-case";
  sessionTitle: string;
  solvedAcknowledgement: string;
  timings: ClientChatSupportRecordingTimings;
};

export type ClientChatSupportHandoffCardMessageRaw = {
  card: ClientChatSupportRecordingHandoffCard;
  status: ClientChatSupportRecordingHandoffStatus;
  type: "support_handoff_card";
};

export type ClientChatCelebrationBubbleVariant = "ribbon-firework";

export type ClientChatCelebrationBubbleIntensity = "subtle";

export type ClientChatFloatingEmojiKind =
  | "frustrated"
  | "party-popper"
  | "smile"
  | "sparkles"
  | "thumbs-up";

export type ClientChatFloatingEmojiAnchor = "end" | "start";

export type ClientChatFloatingEmojiSize = "lg" | "md" | "sm";

export type ClientChatFloatingEmojiMessageRaw = {
  anchor: ClientChatFloatingEmojiAnchor;
  delayMs: number;
  emoji: ClientChatFloatingEmojiKind;
  size: ClientChatFloatingEmojiSize;
  type: "floating_emoji";
};

export type ClientChatCelebrationBubbleMessageRaw = {
  floatingEmoji?: ClientChatFloatingEmojiMessageRaw;
  intensity: ClientChatCelebrationBubbleIntensity;
  type: "celebration_bubble";
  variant: ClientChatCelebrationBubbleVariant;
};

const CLIENT_CHAT_SUPPORT_RECORDING_FAST_PREVIEW: boolean =
  import.meta.env.DEV &&
  String(import.meta.env.VITE_CHAT_RECORDING_FAST_PREVIEW || "").trim() ===
    "true";

const CLIENT_CHAT_SUPPORT_RECORDING_TIMING_SCALE: number =
  CLIENT_CHAT_SUPPORT_RECORDING_FAST_PREVIEW ? 0.58 : 1;

function scaleClientChatSupportRecordingDuration(durationMs: number): number {
  return Math.max(
    0,
    Math.round(durationMs * CLIENT_CHAT_SUPPORT_RECORDING_TIMING_SCALE),
  );
}

function addClientChatSupportRecordingPause(
  durationMs: number,
  extraPauseMs = 0,
): number {
  return scaleClientChatSupportRecordingDuration(durationMs) + extraPauseMs;
}

export const DEFAULT_CLIENT_CHAT_SUPPORT_RECORDING_SCENARIO: ClientChatSupportRecordingScenario =
  {
    name: "golden-case",
    sessionTitle: "Invoice PDF and VAT correction",
    firstUserPrompt: "I can't download the invoice PDF for my last payment.",
    firstReply: [
      "Open **Settings -> Billing -> Stripe invoices**, then choose the latest invoice and click **Download invoice**. 📄",
      "If the PDF button still does not appear, **refresh Billing once** and reopen the invoice list. That usually fixes it. 👍",
    ].join("\n\n"),
    solvedAcknowledgement: "**Solved**, thanks! 🙌",
    issuePrompt: "The **VAT number** on the invoice is wrong. 😣",
    issueCollectionReply: [
      "I can fix that. I just need **4 details** for billing review 👇",
      "",
      "- **Order ID**",
      "- **Billing email**",
      "- **Correct VAT number**",
      "- **A screenshot of the invoice**",
    ].join("\n"),
    issueDetailsMessage: [
      "**Order ID**: ORD-84721",
      "**Billing email**: nina@northstarlabs.io",
      "**Correct VAT number**: DE329114762",
      "Screenshot attached. 📸",
    ].join("\n"),
    issueDetailsMessageAttachments: [
      {
        content_type: "image/svg+xml",
        source: "golden-case",
        url: "/golden-case/invoice-vat-review.svg",
      },
    ],
    handoffMessageContent: "Escalated to Billing Supervisor",
    handoffCard: {
      eyebrow: "Billing handoff",
      owner: "Mia Chen · Billing Supervisor",
      reviewLabel: "Reviewing now",
      correctedLabel: "Corrected invoice ready",
      steps: ["Collected", "Handed off", "Corrected"],
      summaryItems: [
        {
          label: "Order ID",
          value: "ORD-84721",
        },
        {
          label: "Billing email",
          value: "nina@northstarlabs.io",
        },
        {
          label: "Correct VAT",
          value: "DE329114762",
        },
        {
          label: "Attachment",
          value: "1 attachment",
        },
      ],
      title: "Escalated to Billing Supervisor",
    },
    finalResolution:
      "Thanks. I handed this to Mia Chen in billing. The invoice has been **corrected** and a **fresh PDF** is ready in **Billing**. Refresh once and you should now see the **updated VAT number**. ✅",
    finalPraise: "Your customer service is **really good** ！！ 🙌",
    timings: {
      initialDelayMs: addClientChatSupportRecordingPause(320, 240),
      initialSendClickDurationMs: scaleClientChatSupportRecordingDuration(1280),
      luciusFirstReplyThinkingMs: addClientChatSupportRecordingPause(520, 1000),
      postFirstReplyHoldMs: addClientChatSupportRecordingPause(760, 1000),
      betweenSolvedAndIssueMs: addClientChatSupportRecordingPause(620, 1000),
      betweenVatIssueAndCollectionMs: addClientChatSupportRecordingPause(
        560,
        1000,
      ),
      luciusCollectionThinkingMs: addClientChatSupportRecordingPause(
        420,
        1000,
      ),
      betweenCollectionReplyAndDetailsMs: addClientChatSupportRecordingPause(
        700,
        1000,
      ),
      postUserDetailsHoldMs: addClientChatSupportRecordingPause(280, 720),
      handoffPendingMs: addClientChatSupportRecordingPause(260, 1200),
      handoffReviewMs: addClientChatSupportRecordingPause(1620, 800),
      handoffResolveMs: addClientChatSupportRecordingPause(420, 600),
      betweenCorrectedAndFinalReplyMs:
        addClientChatSupportRecordingPause(320, 1000),
      luciusFinalReplyThinkingMs: addClientChatSupportRecordingPause(
        320,
        1000,
      ),
      betweenFinalReplyAndPraiseMs: addClientChatSupportRecordingPause(
        620,
        1000,
      ),
      endingHoldMs: addClientChatSupportRecordingPause(1000, 320),
    },
  };

export function createClientChatSupportHandoffCardRaw(payload: {
  card: ClientChatSupportRecordingHandoffCard;
  status: ClientChatSupportRecordingHandoffStatus;
}): ClientChatSupportHandoffCardMessageRaw {
  return {
    type: "support_handoff_card",
    card: payload.card,
    status: payload.status,
  };
}

export function getClientChatSupportHandoffCardMessageRaw(
  message: ClientChatMessage,
): ClientChatSupportHandoffCardMessageRaw | null {
  const raw = message.raw;
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const candidate = raw as Partial<ClientChatSupportHandoffCardMessageRaw>;
  if (candidate.type !== "support_handoff_card") {
    return null;
  }

  if (!candidate.card || typeof candidate.card !== "object") {
    return null;
  }

  if (candidate.status !== "reviewing" && candidate.status !== "corrected") {
    return null;
  }

  return candidate as ClientChatSupportHandoffCardMessageRaw;
}

export function isClientChatSupportHandoffCardMessage(
  message: ClientChatMessage,
): boolean {
  return getClientChatSupportHandoffCardMessageRaw(message) !== null;
}

export function createClientChatCelebrationBubbleRaw(payload?: {
  floatingEmoji?: ClientChatFloatingEmojiMessageRaw;
  intensity?: ClientChatCelebrationBubbleIntensity;
  variant?: ClientChatCelebrationBubbleVariant;
}): ClientChatCelebrationBubbleMessageRaw {
  return {
    type: "celebration_bubble",
    floatingEmoji: payload?.floatingEmoji,
    intensity: payload?.intensity || "subtle",
    variant: payload?.variant || "ribbon-firework",
  };
}

export function getClientChatCelebrationBubbleMessageRaw(
  message: ClientChatMessage,
): ClientChatCelebrationBubbleMessageRaw | null {
  const raw = message.raw;
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const candidate = raw as Partial<ClientChatCelebrationBubbleMessageRaw>;
  if (candidate.type !== "celebration_bubble") {
    return null;
  }

  if (candidate.variant !== "ribbon-firework") {
    return null;
  }

  if (candidate.intensity !== "subtle") {
    return null;
  }

  return candidate as ClientChatCelebrationBubbleMessageRaw;
}

export function isClientChatCelebrationBubbleMessage(
  message: ClientChatMessage,
): boolean {
  return getClientChatCelebrationBubbleMessageRaw(message) !== null;
}

export function createClientChatFloatingEmojiRaw(payload: {
  anchor?: ClientChatFloatingEmojiAnchor;
  delayMs?: number;
  emoji: ClientChatFloatingEmojiKind;
  size?: ClientChatFloatingEmojiSize;
}): ClientChatFloatingEmojiMessageRaw {
  return {
    type: "floating_emoji",
    anchor: payload.anchor || "end",
    delayMs:
      typeof payload.delayMs === "number" && Number.isFinite(payload.delayMs)
        ? Math.max(0, Math.round(payload.delayMs))
        : 260,
    emoji: payload.emoji,
    size: payload.size || "md",
  };
}

function getClientChatFloatingEmojiRawCandidate(
  raw: unknown,
): Partial<ClientChatFloatingEmojiMessageRaw> | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const nestedCandidate = (
    raw as {
      floatingEmoji?: unknown;
    }
  ).floatingEmoji;
  if (nestedCandidate && typeof nestedCandidate === "object") {
    return nestedCandidate as Partial<ClientChatFloatingEmojiMessageRaw>;
  }

  return raw as Partial<ClientChatFloatingEmojiMessageRaw>;
}

export function getClientChatFloatingEmojiMessageRaw(
  message: ClientChatMessage,
): ClientChatFloatingEmojiMessageRaw | null {
  const candidate = getClientChatFloatingEmojiRawCandidate(message.raw);
  if (!candidate || candidate.type !== "floating_emoji") {
    return null;
  }

  if (candidate.anchor !== "start" && candidate.anchor !== "end") {
    return null;
  }

  if (
    candidate.size !== "sm" &&
    candidate.size !== "md" &&
    candidate.size !== "lg"
  ) {
    return null;
  }

  if (
    candidate.emoji !== "frustrated" &&
    candidate.emoji !== "party-popper" &&
    candidate.emoji !== "smile" &&
    candidate.emoji !== "sparkles" &&
    candidate.emoji !== "thumbs-up"
  ) {
    return null;
  }

  const delayMs =
    typeof candidate.delayMs === "number" && Number.isFinite(candidate.delayMs)
      ? Math.max(0, Math.round(candidate.delayMs))
      : 0;

  return {
    type: "floating_emoji",
    anchor: candidate.anchor,
    delayMs,
    emoji: candidate.emoji,
    size: candidate.size,
  };
}

export function isClientChatFloatingEmojiMessage(
  message: ClientChatMessage,
): boolean {
  return getClientChatFloatingEmojiMessageRaw(message) !== null;
}
