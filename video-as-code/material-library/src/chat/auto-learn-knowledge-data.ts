import type {
  FeishuCardData,
  FeishuMessageData,
  FeishuParticipant,
} from "./feishu-primitives";

export type KnowledgeEntry = {
  after?: string;
  before?: string;
  id: string;
  isNew: boolean;
  source: string;
  summary: string;
  title: string;
  updatedAt: string;
};

export const AUTO_LEARN_PARTICIPANTS: Record<string, FeishuParticipant> = {
  lucius: {
    name: "Lucius",
    isBot: true,
    avatarType: "image",
    avatarSrc: "/brand/logo-mark-black.svg",
    avatarBg: "#ffffff",
  },
  sarah: {
    name: "Sarah",
    avatarType: "initials",
    avatarInitials: "S",
    color: "#e53e3e",
  },
  mike: {
    name: "Mike",
    avatarType: "initials",
    avatarInitials: "M",
    color: "#4f46e5",
  },
  linda: {
    name: "Linda",
    avatarType: "initials",
    avatarInitials: "L",
    color: "#7c3aed",
  },
  alex: {
    name: "Alex",
    avatarType: "initials",
    avatarInitials: "A",
    color: "#0ea5e9",
  },
};

export const AUTO_LEARN_FEISHU_CARD: FeishuCardData = {
  headerColor: "#5538C7",
  title: "Knowledge Base Updated",
  badge: "Auto-learned",
  fields: [
    {
      label: "Change 1",
      value: "Annual plan storage: 50GB to 200GB",
    },
    {
      label: "Change 2",
      value: "Monthly plan: Advanced API access enabled with a 1,000 call cap",
    },
    {
      label: "Change 3",
      value: "Enterprise tier: SSO and audit logs added",
    },
  ],
  actions: ["View Details", "Edit"],
};

export const AUTO_LEARN_HISTORY_MESSAGES: FeishuMessageData[] = [
  {
    id: "sys-1",
    sender: "system",
    type: "system",
    text: "Subscription Policy Discussion Group was created",
    showAt: 0,
  },
  {
    id: "h-1",
    sender: "mike",
    type: "text",
    text: "The new subscription policy draft is ready for review.",
    time: "14:20",
    showAt: 0,
  },
  {
    id: "h-2",
    sender: "sarah",
    type: "text",
    text: "Great, let me pull it up now.",
    time: "14:22",
    showAt: 0,
  },
  {
    id: "h-3",
    sender: "linda",
    type: "text",
    text: "I already checked the enterprise section. A lot changed this quarter.",
    time: "14:25",
    showAt: 0,
  },
];

export const AUTO_LEARN_SCRIPT_MESSAGES: FeishuMessageData[] = [
  {
    id: "s-1",
    sender: "sarah",
    type: "text",
    text: "Annual plan storage is moving from 50GB to 200GB, right?",
    time: "14:30",
    showAt: 2000,
  },
  {
    id: "s-2",
    sender: "mike",
    type: "text",
    text: "Yes, and monthly subscribers now get Advanced API access with a 1,000 call limit.",
    time: "14:31",
    showAt: 4000,
  },
  {
    id: "s-3",
    sender: "linda",
    type: "text",
    text: "Enterprise is adding SSO and audit logs. We need the knowledge base updated fast.",
    time: "14:32",
    showAt: 6000,
  },
  {
    id: "s-4",
    sender: "alex",
    type: "text",
    text: "Who is going to organize all of this? Last time formatting took forever.",
    time: "14:33",
    showAt: 8000,
  },
  {
    id: "s-5",
    sender: "lucius",
    type: "card",
    time: "14:34",
    showAt: 12000,
    cardGlow: true,
    card: AUTO_LEARN_FEISHU_CARD,
  },
  {
    id: "s-6",
    sender: "sarah",
    type: "text",
    text: "Wait, it organized everything by itself?",
    time: "14:34",
    showAt: 16000,
  },
  {
    id: "s-7",
    sender: "mike",
    type: "text",
    text: "That was instant. It understood the full context before I finished talking.",
    time: "14:35",
    showAt: 18000,
  },
  {
    id: "s-8",
    sender: "linda",
    type: "text",
    text: "@Lucius what are the new monthly subscriber benefits?",
    time: "14:35",
    showAt: 20000,
  },
  {
    id: "s-9",
    sender: "lucius",
    type: "text",
    text: "Monthly subscribers now have Advanced API access with a limit of 1,000 calls per month. This was just learned from the team discussion.",
    time: "14:35",
    showAt: 22000,
  },
];

export const AUTO_LEARN_KNOWLEDGE_ENTRIES: KnowledgeEntry[] = [
  {
    id: "k1",
    title: "Annual Plan - Storage Upgrade",
    summary: "Storage allocation for annual subscriptions increased from 50GB to 200GB.",
    source: "Feishu group chat / Auto-learned",
    updatedAt: "Just now",
    isNew: true,
    before: "Annual plan includes 50GB cloud storage.",
    after: "Annual plan includes 200GB cloud storage.",
  },
  {
    id: "k2",
    title: "Monthly Plan - Advanced API Access",
    summary: "Monthly subscribers now get Advanced API access with a 1,000 call monthly limit.",
    source: "Feishu group chat / Auto-learned",
    updatedAt: "Just now",
    isNew: true,
    before: "Monthly plan: Basic API access only.",
    after: "Monthly plan: Advanced API access with a 1,000 call cap.",
  },
  {
    id: "k3",
    title: "Enterprise Tier - SSO and Audit Logs",
    summary: "Enterprise tier now includes SSO and audit log functionality.",
    source: "Feishu group chat / Auto-learned",
    updatedAt: "Just now",
    isNew: true,
    before: "Enterprise tier: team management and priority support.",
    after: "Enterprise tier: team management, priority support, SSO, and audit logs.",
  },
  {
    id: "k4",
    title: "Refund Policy - Crypto Products",
    summary: "Standard refund policy for cryptocurrency-related product purchases.",
    source: "Document upload",
    updatedAt: "2 days ago",
    isNew: false,
  },
  {
    id: "k5",
    title: "Onboarding Flow - New Users",
    summary: "Step-by-step onboarding process for new subscriber accounts.",
    source: "Manual entry",
    updatedAt: "5 days ago",
    isNew: false,
  },
];
