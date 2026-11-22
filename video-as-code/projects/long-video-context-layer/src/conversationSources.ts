import { fpsFrames, TIMING } from "./theme";

export type ChannelApp = "slack" | "discord" | "feishu" | "email";

export interface ConversationSource {
  app: ChannelApp;
  sender: string;
  initial: string;
  avatarBg: string;
  avatarFg: string;
  source: string;
  message: string;
  startFrame: number;
  xPct: number;
  yPct: number;
  impactXPct: number;
  side: "left" | "right";
}

export const APP_META: Record<
  ChannelApp,
  { name: string; logo: string; accent: string; surface: string }
> = {
  slack: {
    name: "Slack",
    logo: "channel-icons/slack.svg",
    accent: "#4a154b",
    surface: "#f7edf6",
  },
  discord: {
    name: "Discord",
    logo: "channel-icons/discord.svg",
    accent: "#5865f2",
    surface: "#eef0ff",
  },
  feishu: {
    name: "Feishu",
    logo: "channel-icons/feishu.svg",
    accent: "#3370ff",
    surface: "#edf4ff",
  },
  email: {
    name: "Email",
    logo: "channel-icons/email.svg",
    accent: "#d9822b",
    surface: "#fff4e6",
  },
};

export const SOURCE_PHASE_START = TIMING.stage1End;
export const SOURCE_ENTER_FRAMES = fpsFrames(16);
export const SOURCE_HOLD_FRAMES = fpsFrames(12);
export const SOURCE_EXIT_FRAMES = fpsFrames(20);
export const SOURCE_TOTAL_FRAMES =
  SOURCE_ENTER_FRAMES + SOURCE_HOLD_FRAMES + SOURCE_EXIT_FRAMES;

export const CONVERSATION_SOURCES: ConversationSource[] = [
  {
    app: "slack",
    sender: "Maya",
    initial: "M",
    avatarBg: "#eadcc5",
    avatarFg: "#1f2230",
    source: "Support thread",
    message: "This keeps coming up in onboarding.",
    startFrame: fpsFrames(0),
    xPct: 0.18,
    yPct: 0.25,
    impactXPct: 0.20,
    side: "left",
  },
  {
    app: "discord",
    sender: "Noah",
    initial: "N",
    avatarBg: "#5865f2",
    avatarFg: "#ffffff",
    source: "Community DM",
    message: "A customer asked the same thing again.",
    startFrame: fpsFrames(10),
    xPct: 0.82,
    yPct: 0.24,
    impactXPct: 0.80,
    side: "right",
  },
  {
    app: "feishu",
    sender: "Ava",
    initial: "A",
    avatarBg: "#bab2ff",
    avatarFg: "#1f2230",
    source: "Product decision",
    message: "We chose the simpler launch path.",
    startFrame: fpsFrames(20),
    xPct: 0.21,
    yPct: 0.43,
    impactXPct: 0.27,
    side: "left",
  },
  {
    app: "email",
    sender: "Eli",
    initial: "E",
    avatarBg: "#d9822b",
    avatarFg: "#ffffff",
    source: "Customer email",
    message: "They care most about response time.",
    startFrame: fpsFrames(30),
    xPct: 0.80,
    yPct: 0.43,
    impactXPct: 0.73,
    side: "right",
  },
  {
    app: "slack",
    sender: "Lena",
    initial: "L",
    avatarBg: "#5538c7",
    avatarFg: "#ffffff",
    source: "Sales call",
    message: "Pricing needs a clear rationale.",
    startFrame: fpsFrames(40),
    xPct: 0.16,
    yPct: 0.62,
    impactXPct: 0.18,
    side: "left",
  },
  {
    app: "feishu",
    sender: "Ren",
    initial: "R",
    avatarBg: "#3370ff",
    avatarFg: "#ffffff",
    source: "Meeting note",
    message: "The team agreed on Wednesday handoff.",
    startFrame: fpsFrames(50),
    xPct: 0.84,
    yPct: 0.62,
    impactXPct: 0.84,
    side: "right",
  },
  {
    app: "discord",
    sender: "Kai",
    initial: "K",
    avatarBg: "#f2e9da",
    avatarFg: "#312d3c",
    source: "Community reply",
    message: "The workaround was already proven.",
    startFrame: fpsFrames(60),
    xPct: 0.25,
    yPct: 0.16,
    impactXPct: 0.35,
    side: "left",
  },
  {
    app: "email",
    sender: "Iris",
    initial: "I",
    avatarBg: "#c46d8e",
    avatarFg: "#ffffff",
    source: "Partner email",
    message: "Send the migration summary first.",
    startFrame: fpsFrames(70),
    xPct: 0.75,
    yPct: 0.16,
    impactXPct: 0.65,
    side: "right",
  },
];

export const SOURCE_LAST_LOCAL_FRAME =
  Math.max(...CONVERSATION_SOURCES.map((source) => source.startFrame)) +
  SOURCE_TOTAL_FRAMES;

export const getSourceImpactFrame = (source: ConversationSource) =>
  SOURCE_PHASE_START + source.startFrame + SOURCE_TOTAL_FRAMES;
