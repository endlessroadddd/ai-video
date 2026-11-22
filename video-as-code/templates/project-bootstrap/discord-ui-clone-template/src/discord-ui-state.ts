export type DiscordMessageTone = "user" | "bot" | "system";

export type DiscordMessage = {
  id: string | number;
  author: string;
  text: string;
  tone: DiscordMessageTone;
  timestamp?: string;
  appBadge?: boolean;
  isTyping?: boolean;
};

export type ChannelSpec = {
  name: string;
  active?: boolean;
  voice?: boolean;
};

export type ChannelSection = {
  title: string;
  channels: readonly ChannelSpec[];
};

export type MemberGroup = {
  title: string;
  names: readonly string[];
  tone: string;
};

export type ServerSlot = {
  label: string;
  badge?: string;
  tone: "community" | "aux" | "muted" | "plus";
  selected?: boolean;
  badgeTone?: "default" | "small" | "wide";
};

export type SceneLink = {
  label: string;
  path: string;
  tone: "primary" | "success";
};

export type ProfileCard = {
  name: string;
  tag: string;
};

export type EscalatedTicket = {
  id: string;
  name: string;
  highlight: string;
  messages: readonly DiscordMessage[];
};

export type CommunityQuestion = {
  name: string;
  question: string;
};

export type PresenceMember = {
  name: string;
  appBadge?: boolean;
};

export const assignedStaffCopy = "Assigned to a staff member, please wait.";

// ── Community Guild Scenario ─────────────────────────────────────────────────
// Used by CommunityScene.tsx for the short video "AI has no personality" scenes.

export const communityGuildState = {
  homeServerLabel: "dc",
  guildName: "Moonrise Fans",
  activeChannel: "events",
  profile: { name: "mira_x", tag: "#7792" },
  serverSlots: [
    { label: "MF", badge: "", tone: "community", selected: true },
    { label: "GG", badge: "5", tone: "aux", badgeTone: "small" },
    { label: "+", tone: "plus" },
  ] as const satisfies readonly ServerSlot[],
  channelSections: [
    {
      title: "TEXT CHANNELS",
      channels: [
        { name: "announcements" },
        { name: "guild-hall" },
        { name: "events", active: true },
        { name: "roleplay" },
        { name: "gallery" },
      ],
    },
  ] as const satisfies readonly ChannelSection[],
  memberGroups: [
    {
      title: "ONLINE — 248",
      names: ["sakura_cos", "neo_blade", "hana_77", "luna_guild", "phantom_r", "yuki_003"],
      tone: "member-row--rose",
    },
  ] as const satisfies readonly MemberGroup[],

  /** Scene 02 — lively community, no AI yet */
  scene02Messages: [
    { id: "s2-1", author: "sakura_cos", timestamp: "Today at 8:14 PM", text: "How many people signed up for tonight?", tone: "user" },
    { id: "s2-2", author: "neo_blade",  timestamp: "Today at 8:14 PM", text: "Count me in!", tone: "user" },
    { id: "s2-3", author: "sakura_cos", timestamp: "Today at 8:14 PM", text: "!! let's go", tone: "user" },
    { id: "s2-4", author: "hana_77",    timestamp: "Today at 8:15 PM", text: "Is the guildmaster around today?", tone: "user" },
    { id: "s2-5", author: "neo_blade",  timestamp: "Today at 8:15 PM", text: "@Guildmaster you there?", tone: "user" },
  ] as const satisfies readonly DiscordMessage[],

  /** Scene 03 — AI breaks immersion (bot reply highlighted) */
  scene03Messages: [
    { id: "s3-1", author: "sakura_cos",  timestamp: "Today at 8:14 PM", text: "!! let's go", tone: "user" },
    { id: "s3-2", author: "neo_blade",   timestamp: "Today at 8:15 PM", text: "@Guildmaster you there?", tone: "user" },
    { id: "s3-3", author: "luna_guild",  timestamp: "Today at 8:16 PM", text: "Guildmaster, what time does tonight's event start?", tone: "user" },
    { id: "s3-4", author: "luna_guild",  timestamp: "Today at 8:16 PM", text: "And how many spots are left?", tone: "user" },
    { id: "s3-5", author: "Guildmaster", timestamp: "Today at 8:16 PM", text: "Hello! Your message has been received.", tone: "bot", appBadge: true },
    { id: "s3-6", author: "Guildmaster", timestamp: "Today at 8:16 PM", text: "I will follow up with you as soon as possible. Please stand by.", tone: "bot", appBadge: true },
  ] as const satisfies readonly DiscordMessage[],

  /** Scene 04 — user confusion, then silence */
  scene04Messages: [
    { id: "s4-0", author: "Guildmaster", timestamp: "Today at 8:16 PM", text: "I will follow up with you as soon as possible. Please stand by.", tone: "bot", appBadge: true },
    { id: "s4-1", author: "luna_guild",  timestamp: "Today at 8:16 PM", text: "?", tone: "user" },
    { id: "s4-2", author: "neo_blade",   timestamp: "Today at 8:16 PM", text: "is this a bot???", tone: "user" },
    { id: "s4-3", author: "sakura_cos",  timestamp: "Today at 8:16 PM", text: "guildmaster got replaced??", tone: "user" },
    { id: "s4-4", author: "hana_77",     timestamp: "Today at 8:17 PM", text: 'what does "follow up" even mean', tone: "user" },
  ] as const satisfies readonly DiscordMessage[],

  /** Scene 05a — names that left the server */
  exitNames: [
    "sakura_cos", "neo_blade", "hana_77", "luna_guild",
    "phantom_r", "yuki_003", "cheshire_x", "momo_312",
  ] as const,
} as const;

export const escalationKeywordPool = [
  "HUMAN",
  "REFUND",
  "USELESS",
  "AGENT",
  "WTF",
  "BRAINDEAD",
  "JOKE",
  "HELP",
  "FAILED",
] as const;

export const discordHomeState = {
  homeServerLabel: "dc",
  guildName: "Support Circle",
  activeChannel: "payment-help",
  searchPlaceholder: "Search Support Circle",
  profile: {
    name: "russell",
    tag: "#9282",
  },
  sceneLinks: [
    {
      label: "View Supervisor Scenario",
      path: "/scenario",
      tone: "primary",
    },
    {
      label: "View User Scenario",
      path: "/user-scenario",
      tone: "success",
    },
  ] as const satisfies readonly SceneLink[],
  serverSlots: [
    { label: "SC", badge: "2", tone: "community", selected: true },
    { label: "HQ", badge: "1", tone: "aux", badgeTone: "small" },
    { label: "KB", badge: "8", tone: "muted", badgeTone: "wide" },
    { label: "AI", badge: "3", tone: "muted", badgeTone: "wide" },
    { label: "+", tone: "plus" },
  ] as const satisfies readonly ServerSlot[],
  channelSections: [
    {
      title: "TEXT CHANNELS",
      channels: [
        { name: "payment-help", active: true },
        { name: "account-help" },
        { name: "bug-reports" },
        { name: "faq" },
      ],
    },
    {
      title: "VOICE CHANNELS",
      channels: [{ name: "office-hours", voice: true }],
    },
    {
      title: "SUPPORT",
      channels: [
        { name: "support-ticket" },
        { name: "close-ticket" },
      ],
    },
  ] as const satisfies readonly ChannelSection[],
  memberGroups: [
    {
      title: "MODERATORS - 2",
      names: ["Mina", "Corey"],
      tone: "member-row--rose",
    },
    {
      title: "SUPPORT - 3",
      names: ["June", "Parker", "Theo"],
      tone: "member-row--violet",
    },
    {
      title: "MEMBERS - 4",
      names: ["Avery", "Mason", "Nina", "Sora"],
      tone: "member-row--cyan",
    },
  ] as const satisfies readonly MemberGroup[],
  initialMessages: [
    {
      id: 1,
      author: "Avery",
      timestamp: "Today at 8:33 PM",
      text: "My card keeps failing right after verification.",
      tone: "user",
    },
    {
      id: 2,
      author: "Support AI",
      timestamp: "Today at 8:34 PM",
      text: "Share the last checkout step you completed and any error text you saw. Include whether the charge is pending, failed, or looping.",
      tone: "bot",
      appBadge: true,
    },
  ] as const satisfies readonly DiscordMessage[],
  botReplies: [
    "Please share the exact error text you see after the payment step.",
    "Tell me whether the payment stays pending, fails, or loops back.",
    "If you can, send the last checkout step before it breaks.",
    "Please let me know whether verification succeeds before the failure happens.",
  ] as const,
} as const;

export const supervisorScenarioState = {
  serverLabel: "HQ",
  serverBadge: "99+",
  guildName: "Support HQ",
  queueLabel: "ESCALATED QUEUE",
  channelName: "escalated-queue",
  assignee: {
    name: "Supervisor",
    tag: "#Admin",
  },
  botName: "Other AI Bot",
  tickets: [
    {
      id: "ticket-3921",
      name: "payment-failed",
      highlight: "REFUND",
      messages: [
        {
          id: "1-1",
          author: "Chris_G",
          timestamp: "Today at 9:01 AM",
          text: "Charged twice for Pro. Need refund.",
          tone: "user",
        },
        {
          id: "1-2",
          author: "Other AI Bot",
          timestamp: "Today at 9:01 AM",
          text: "You can manage your subscription in Settings.",
          tone: "bot",
          appBadge: true,
        },
        {
          id: "1-3",
          author: "Chris_G",
          timestamp: "Today at 9:05 AM",
          text: "Did you even read?! I want a REFUND!",
          tone: "user",
        },
        {
          id: "1-4",
          author: "Other AI Bot",
          timestamp: "Today at 9:05 AM",
          text: assignedStaffCopy,
          tone: "bot",
          appBadge: true,
        },
      ],
    },
    {
      id: "ticket-3922",
      name: "app-crashing",
      highlight: "HUMAN",
      messages: [
        {
          id: "2-1",
          author: "Sarah_Dev",
          timestamp: "Today at 9:15 AM",
          text: "Desktop app crashes on export.",
          tone: "user",
        },
        {
          id: "2-2",
          author: "Other AI Bot",
          timestamp: "Today at 9:15 AM",
          text: "Try reinstalling the app and restarting your machine.",
          tone: "bot",
          appBadge: true,
        },
        {
          id: "2-3",
          author: "Sarah_Dev",
          timestamp: "Today at 9:18 AM",
          text: "It is a desktop app. Get me a HUMAN.",
          tone: "user",
        },
        {
          id: "2-4",
          author: "Other AI Bot",
          timestamp: "Today at 9:18 AM",
          text: assignedStaffCopy,
          tone: "bot",
          appBadge: true,
        },
      ],
    },
    {
      id: "ticket-3923",
      name: "guest-invite",
      highlight: "TRASH",
      messages: [
        {
          id: "3-1",
          author: "AlexTheGreat",
          timestamp: "Today at 9:30 AM",
          text: "Invite guest without admin rights?",
          tone: "user",
        },
        {
          id: "3-2",
          author: "Other AI Bot",
          timestamp: "Today at 9:30 AM",
          text: "Guests are added as admins by default.",
          tone: "bot",
          appBadge: true,
        },
        {
          id: "3-3",
          author: "AlexTheGreat",
          timestamp: "Today at 9:32 AM",
          text: "Literally the opposite of what I asked. TRASH.",
          tone: "user",
        },
        {
          id: "3-4",
          author: "Other AI Bot",
          timestamp: "Today at 9:33 AM",
          text: assignedStaffCopy,
          tone: "bot",
          appBadge: true,
        },
      ],
    },
  ] as const satisfies readonly EscalatedTicket[],
  fakeWaveCount: 10,
  fakeWaveUserTemplate: "AI is useless. I need a {keyword} now.",
  waitReply: assignedStaffCopy,
  summary: {
    title: "Supervisor Reality Check",
    lines: [
      'Paid for "AI Support".',
      "Still escalates almost everything to a human.",
      "I am just a glorified router.",
    ],
  },
} as const;

export const userScenarioState = {
  homeServerLabel: "dc",
  guildName: "Support Circle",
  activeChannel: "payment-help",
  secondaryChannel: "bug-reports",
  profile: {
    name: "russell",
    tag: "#9282",
  },
  botName: "Support AI",
  introExchanges: [
    {
      user: "How to export MP4?",
      bot: "Click File > Export. Did this solve your issue?",
      delayMs: 1200,
    },
    {
      user: "No. Error code 503.",
      bot: "Please update to the latest version. Solved?",
      delayMs: 1200,
    },
    {
      user: "I AM updated. TRANSFER TO HUMAN.",
      bot: assignedStaffCopy,
      delayMs: 1800,
    },
  ] as const,
  communityUsers: [
    { name: "DevDan", question: "API key invalid after reset" },
    { name: "Sarah_G", question: "Billing page will not load" },
    { name: "MikeT", question: "Cannot invite members" },
    { name: "AlexW", question: "Sync stuck at 99%" },
    { name: "Lisa99", question: "Where is the refund button?" },
    { name: "TechBro", question: "Webhooks failing" },
  ] as const satisfies readonly CommunityQuestion[],
  communityBotReply: "Try clearing your cache. Solved?",
  escalationTemplate: "NO. I NEED A {keyword}.",
  waitReply: assignedStaffCopy,
  onlineMembers: [
    { name: "Support AI", appBadge: true },
    { name: "russell" },
    { name: "DevDan" },
    { name: "Sarah_G" },
    { name: "MikeT" },
    { name: "AlexW" },
    { name: "Lisa99" },
    { name: "TechBro" },
  ] as const satisfies readonly PresenceMember[],
  offlineMembers: [
    { name: "Chris_G" },
    { name: "AlexTheGreat" },
    { name: "Guest_404" },
  ] as const satisfies readonly PresenceMember[],
  summary: {
    title: "THE USER EXPERIENCE",
    steps: [
      "Ask a specific question",
      "Get generic AI boilerplate",
      "Beg for a human",
    ],
  },
} as const;
