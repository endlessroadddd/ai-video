export const INTEREST_QUESTION_HOLD_MS = 3000;
export const ENDING_QUESTION_INITIAL_DELAY_MS = 680;
export const ENDING_QUESTION_STAGGER_MS = 840;
export const ENDING_QUESTION_REVEAL_DURATION_MS = 420;
export const ENDING_POST_REVEAL_HOLD_MS = 3000;
export const ENDING_STAGE_START_MS = 25200 + INTEREST_QUESTION_HOLD_MS;
export const INTEREST_STAGE_END_MS = 25800 + INTEREST_QUESTION_HOLD_MS;
export const TOTAL_DURATION_MS =
  ENDING_STAGE_START_MS +
  ENDING_QUESTION_INITIAL_DELAY_MS +
  ENDING_QUESTION_STAGGER_MS * 2 +
  ENDING_QUESTION_REVEAL_DURATION_MS +
  ENDING_POST_REVEAL_HOLD_MS;

export type ChannelItem = {
  name: string;
  unread: number;
};

export type MessageItem = {
  author: string;
  body: string;
  meta: string;
  emphasis?: "warning";
  reactions?: ReadonlyArray<{
    count: number;
    emoji: string;
    hot?: boolean;
  }>;
};

export const CHANNELS: readonly ChannelItem[] = [
  { name: "general", unread: 27 },
  { name: "help", unread: 9 },
  { name: "feature-requests", unread: 14 },
  { name: "off-topic", unread: 33 },
  { name: "announcements", unread: 2 },
];

export const GENERAL_MESSAGES: readonly MessageItem[] = [
  {
    author: "June",
    meta: "10:41",
    body: "Is it just me or is the onboarding copy doing **too much** on the first screen?",
  },
  {
    author: "Avery",
    meta: "10:41",
    body: "No, same reaction here. I already know the product and still had to reread it.",
  },
  {
    author: "Mason",
    meta: "10:42",
    body: "Honestly the meme in #off-topic is somehow the clearest summary of today's deploy \u{1F602}",
  },
  {
    author: "Corey",
    meta: "10:42",
    body: "Can someone confirm if the workaround from this morning still **works**?",
  },
  {
    author: "Nina",
    meta: "10:42",
    body: "I keep seeing the **same setup question** come back, just worded differently.",
  },
  {
    author: "Theo",
    meta: "10:43",
    body: "Docs link again for anyone who missed it: **/connect/get-started**",
  },
  {
    author: "Rae",
    meta: "10:43",
    body: "I opened the docs, came back, and still was not sure which step happens **first**.",
  },
  {
    author: "Devon",
    meta: "10:43",
    body: "Wait, are people talking about the import issue or the connect issue?",
  },
  {
    author: "Kira",
    meta: "10:44",
    body: "Pretty sure it is **both**, which is why this channel feels impossible to scan.",
  },
  {
    author: "Omar",
    meta: "10:44",
    body: "Somebody should pin the latest answer before this turns into another 40 replies.",
  },
  {
    author: "Lena",
    meta: "10:45",
    body: "I answered this once already and now I cannot even find my own reply again.",
  },
  {
    author: "Felix",
    meta: "10:45",
    body: "General is moving so fast that every thread feels **brand new** every five minutes.",
  },
  {
    author: "Priya",
    meta: "10:46",
    body: "Same feature request, third phrasing today \u{1F605}",
  },
  {
    author: "Sam",
    meta: "10:46",
    body: "I thought there was a fix, but maybe that was only for **new workspaces**?",
  },
  {
    author: "Holly",
    meta: "10:47",
    body: "Search says there are answers, but I am still opening everything manually.",
  },
  {
    author: "Dae",
    meta: "10:47",
    body: "We have memes, bug reports, and feature asks in one scroll right now.",
  },
  {
    author: "Mira",
    meta: "10:48",
    body: "Not joking, I saw the important reply for like two seconds and then **lost it**.",
  },
  {
    author: "Ben",
    meta: "10:48",
    body: "Can we split this into actual themes or something?",
  },
  {
    author: "Zoe",
    meta: "10:48",
    body: "Every message feels urgent when it is all stacked together.",
  },
  {
    author: "Eli",
    meta: "10:49",
    body: "I am reading a lot and learning almost **nothing useful**.",
  },
];

export const HELP_MESSAGES: readonly MessageItem[] = [
  {
    author: "Russell",
    meta: "11:02",
    body: "Anyone else seeing **error 403** on /connect after reinstalling?",
    emphasis: "warning",
  },
  {
    author: "Parker",
    meta: "11:03",
    body: "Yep. Same **403** here. Fresh login did not help.",
    emphasis: "warning",
  },
  {
    author: "Lisa99",
    meta: "11:04",
    body: "I followed the docs step by step and still hit **403 on /connect**.",
    emphasis: "warning",
  },
  {
    author: "Mina",
    meta: "11:05",
    body: "Cleared cache, logged out, tried again. **No change**.",
  },
  {
    author: "ChrisG",
    meta: "11:06",
    body: "Maybe this only happens on **older workspaces**?",
  },
  {
    author: "Ishaan",
    meta: "11:07",
    body: "We are seeing the same thing on two legacy orgs. Definitely **not isolated**.",
    emphasis: "warning",
  },
  {
    author: "Jo",
    meta: "11:08",
    body: "Support already has three tickets with the exact same **403** wording.",
    emphasis: "warning",
  },
  {
    author: "TinaOps",
    meta: "11:09",
    body: "Quick check: workaround only helps brand-new workspaces. Older ones stay **blocked**.",
  },
  {
    author: "Marco",
    meta: "11:09",
    body: "Can someone pin one status update? This keeps **splitting** into new replies.",
  },
  {
    author: "Bella",
    meta: "11:10",
    body: "Adding another data point: old tenant import, then **403** right after connect.",
    emphasis: "warning",
  },
  {
    author: "Aaron",
    meta: "11:11",
    body: "We just hit it on staging too, so I do not think this is user error.",
  },
  {
    author: "Cass",
    meta: "11:12",
    body: "I thought I fixed mine, but it came back after refresh.",
  },
  {
    author: "Noor",
    meta: "11:13",
    body: "Same here. It works until reconnect, then **403** again.",
    emphasis: "warning",
  },
  {
    author: "Gabe",
    meta: "11:14",
    body: "The docs are fine, but they do not mention this specific failure mode.",
  },
  {
    author: "Yuki",
    meta: "11:15",
    body: "I am answering people one by one and it is literally the **same issue** every time.",
    emphasis: "warning",
  },
  {
    author: "Emma",
    meta: "11:16",
    body: "If someone has a real workaround, can you post the steps in one message?",
  },
  {
    author: "Victor",
    meta: "11:17",
    body: "Right now the thread looks like separate bugs, but it is clearly one cluster.",
  },
  {
    author: "Sera",
    meta: "11:18",
    body: "Another report from EU region. **403 /connect** on an existing workspace.",
    emphasis: "warning",
  },
];

export const FEATURE_MESSAGES: readonly MessageItem[] = [
  {
    author: "SarahDev",
    meta: "12:03",
    body: "I do not need more dashboards. I need one view that groups the **same blocker** together.",
    reactions: [
      { emoji: "\u{1F525}", count: 42, hot: true },
      { emoji: "\u{1F44C}", count: 19 },
    ],
  },
  {
    author: "DevDan",
    meta: "12:04",
    body: "Right now the only way to know what people want is to read the whole server like homework.",
    reactions: [
      { emoji: "\u{1F525}", count: 36, hot: true },
      { emoji: "\u{1F928}", count: 18 },
    ],
  },
  {
    author: "AlexW",
    meta: "12:05",
    body: "Signals are **everywhere**: replies, emoji, side threads, random +1s.",
    reactions: [
      { emoji: "\u{1F525}", count: 44, hot: true },
      { emoji: "\u{1F4AF}", count: 23 },
    ],
  },
  {
    author: "PriyaUI",
    meta: "12:06",
    body: "Would love requests grouped by **theme**, not just whoever posted first.",
    reactions: [
      { emoji: "\u{1F525}", count: 31, hot: true },
      { emoji: "\u{1F44F}", count: 12 },
    ],
  },
  {
    author: "NoahPM",
    meta: "12:07",
    body: "Reactions tell me what is loud, not what is actually becoming a **trend**.",
    reactions: [
      { emoji: "\u{1F525}", count: 30, hot: true },
      { emoji: "\u{1F914}", count: 17 },
    ],
  },
  {
    author: "Elena",
    meta: "12:08",
    body: "Every promising thread turns into another long scroll. We still need a **ranked signal view**.",
    reactions: [
      { emoji: "\u{1F525}", count: 35, hot: true },
      { emoji: "\u{1F4AF}", count: 21 },
    ],
  },
  {
    author: "KaiOps",
    meta: "12:09",
    body: "I can feel momentum, but I still cannot point to the **top ask** with confidence.",
    reactions: [
      { emoji: "\u{1F525}", count: 33, hot: true },
      { emoji: "\u{1F44C}", count: 17 },
    ],
  },
  {
    author: "Mona",
    meta: "12:10",
    body: "Half the demand is hiding in reply chains nobody opens.",
    reactions: [
      { emoji: "\u{1F525}", count: 27, hot: true },
      { emoji: "\u{1F440}", count: 15 },
    ],
  },
  {
    author: "Jared",
    meta: "12:11",
    body: "A request with 20 short comments can matter more than one post with 40 fire emojis.",
    reactions: [
      { emoji: "\u{1F525}", count: 25, hot: true },
      { emoji: "\u{1F4AC}", count: 14 },
    ],
  },
  {
    author: "Tessa",
    meta: "12:12",
    body: "It would be huge if repeated asks rolled up automatically instead of living in separate posts.",
    reactions: [
      { emoji: "\u{1F525}", count: 32, hot: true },
      { emoji: "\u{1F64C}", count: 13 },
    ],
  },
  {
    author: "Amir",
    meta: "12:13",
    body: "I keep screenshotting threads just to explain why people care about this one.",
    reactions: [
      { emoji: "\u{1F525}", count: 24, hot: true },
      { emoji: "\u{1F4F8}", count: 11 },
    ],
  },
  {
    author: "Chloe",
    meta: "12:14",
    body: "Please show **why now**, not just the total reaction count.",
    reactions: [
      { emoji: "\u{1F525}", count: 28, hot: true },
      { emoji: "\u{23F0}", count: 12 },
    ],
  },
  {
    author: "Benji",
    meta: "12:15",
    body: "We can see heat, but we still cannot see **direction**.",
    reactions: [
      { emoji: "\u{1F525}", count: 26, hot: true },
      { emoji: "\u{1F9ED}", count: 10 },
    ],
  },
  {
    author: "Rina",
    meta: "12:16",
    body: "Give me one list of what the community is actually pulling toward this week.",
    reactions: [
      { emoji: "\u{1F525}", count: 34, hot: true },
      { emoji: "\u{1F4CB}", count: 16 },
    ],
  },
];

export const QUESTION_STACK = [
  "What are they talking about?",
  "Where are they stuck?",
  "What do they care about?",
] as const;
