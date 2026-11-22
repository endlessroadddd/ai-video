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
  { author: "User A", meta: "10:41", body: "This is a generic message to fill the **general** channel loop." },
  { author: "User B", meta: "10:41", body: "Another placeholder text. The chatter is fast and dense." },
  { author: "User C", meta: "10:42", body: "Just dropping a test comment here to simulate noise \u{1F602}" },
  { author: "User D", meta: "10:42", body: "Replacing the hardcoded story with **pure template strings**." },
  { author: "User E", meta: "10:42", body: "Look at this fast-moving **simulated** feed." },
  { author: "User F", meta: "10:43", body: "Useful link placeholder: **/some-resource**" },
  { author: "User G", meta: "10:43", body: "Nobody can actually read this if it scrolls **this fast**." },
  { author: "User H", meta: "10:43", body: "Wait, are we still discussing the dummy topic?" },
  { author: "User I", meta: "10:44", body: "Pretty sure this is **exactly** what the design intended." },
  { author: "User J", meta: "10:44", body: "We need more placeholder text to keep the wall continuous." },
];

export const HELP_MESSAGES: readonly MessageItem[] = [
  { author: "User 1", meta: "11:02", body: "Seeing a **dummy error code** over here.", emphasis: "warning" },
  { author: "User 2", meta: "11:03", body: "Yep. Same **error pattern** here.", emphasis: "warning" },
  { author: "User 3", meta: "11:04", body: "I followed the placeholder steps and still hit the **blocker**.", emphasis: "warning" },
  { author: "User 4", meta: "11:05", body: "Tried the generic workaround. **No change**." },
  { author: "User 5", meta: "11:06", body: "Maybe this only happens for certain simulated users?" },
  { author: "User 6", meta: "11:07", body: "We are seeing this in multiple test instances. Definitely **widespread**.", emphasis: "warning" },
  { author: "User 7", meta: "11:08", body: "Just logging another phantom issue for the animation.", emphasis: "warning" },
  { author: "User 8", meta: "11:09", body: "Quick check: the temporary fix is also **fictional**." },
];

export const FEATURE_MESSAGES: readonly MessageItem[] = [
  {
    author: "Alpha", meta: "12:03", body: "We really need a feature that **solves the abstract problem**.",
    reactions: [{ emoji: "\u{1F525}", count: 42, hot: true }, { emoji: "\u{1F44C}", count: 19 }]
  },
  {
    author: "Beta", meta: "12:04", body: "I also vote for this generic but highly demanded capability.",
    reactions: [{ emoji: "\u{1F525}", count: 36, hot: true }, { emoji: "\u{1F928}", count: 18 }]
  },
  {
    author: "Gamma", meta: "12:05", body: "This would save us so much **fictional manual work**.",
    reactions: [{ emoji: "\u{1F525}", count: 44, hot: true }, { emoji: "\u{1F4AF}", count: 23 }]
  },
  {
    author: "Delta", meta: "12:06", body: "Would love to see this implemented in Q3.",
    reactions: [{ emoji: "\u{1F525}", count: 31, hot: true }, { emoji: "\u{1F44F}", count: 12 }]
  },
  {
    author: "Echo", meta: "12:07", body: "Please prioritize this **critical structural ask**.",
    reactions: [{ emoji: "\u{1F525}", count: 30, hot: true }, { emoji: "\u{1F914}", count: 17 }]
  },
];

export const QUESTION_STACK = [
  "Placeholder Question 1?",
  "Placeholder Question 2?",
  "Placeholder Question 3?",
] as const;
