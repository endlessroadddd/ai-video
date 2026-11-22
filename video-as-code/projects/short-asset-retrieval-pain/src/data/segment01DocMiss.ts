import type { LucideIcon } from "lucide-react";
import { FileText, ReceiptText, ScrollText, ShieldCheck } from "lucide-react";

export type Segment01DocTone = "violet" | "blue" | "teal" | "amber";

export type Segment01DocCard = {
  checkingLabel: string;
  failedLabel: string;
  icon: LucideIcon;
  id: string;
  title: string;
  tone: Segment01DocTone;
};

export const SEGMENT01_HEADLINE = "Enterprise AI can't hit the right knowledge in the docs.";

export const SEGMENT01_DURATION_MS = 24_800;

export const SEGMENT01_TIMINGS = {
  headlineIn: 0,
  headlineOut: 2_000,
  userPromptStart: 2_000,
  docCardsStart: 4_400,
  pulseStart: 5_200,
  pulseEnd: 8_400,
  cross1At: 8_900,
  cross2At: 9_700,
  cross3At: 10_500,
  cross4At: 11_500,
  aiAvatarStart: 12_600,
  aiReplyAt: 15_300,
  missHintAt: 16_500,
  userReaction1At: 19_100,
  userReaction2At: 20_500,
} as const;

export const SEGMENT01_AI_NAME = "Enterprise AI";
export const SEGMENT01_USER_NAME = "Northstar Ops";

export const SEGMENT01_USER_PROMPT =
  "Can we keep the current credit terms if we update this contract today?";

export const SEGMENT01_AI_REPLY =
  "According to the available documents, **the current credit terms will not remain** after this contract is updated.";

export const SEGMENT01_AI_MISS_HINT = "! No document knowledge hit";

export const SEGMENT01_USER_REACTIONS = [
  "Wait... what?? \u{1F633}\u{1F633} We literally updated the contract today. Why is it still answering with the old credit terms?!",
  "How can this miss every single source doc again \u{1F92F}\u{1F928} Are we seriously going to send this to a client like this?",
] as const;

export const SEGMENT01_DOC_CARDS: Segment01DocCard[] = [
  {
    id: "contract-amendment",
    title: "Contract amendment policy",
    checkingLabel: "Checking contract amendment policy...",
    failedLabel: "No hit",
    tone: "violet",
    icon: ScrollText,
  },
  {
    id: "credit-retention",
    title: "Credit retention rules",
    checkingLabel: "Checking credit retention rules...",
    failedLabel: "No hit",
    tone: "blue",
    icon: ShieldCheck,
  },
  {
    id: "billing-exception",
    title: "Billing exception memo",
    checkingLabel: "Checking billing exception memo...",
    failedLabel: "No hit",
    tone: "teal",
    icon: ReceiptText,
  },
  {
    id: "terms-addendum",
    title: "Enterprise terms addendum",
    checkingLabel: "Checking enterprise terms addendum...",
    failedLabel: "No hit",
    tone: "amber",
    icon: FileText,
  },
];
