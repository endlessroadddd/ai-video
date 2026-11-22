export type MessageTone = "normal" | "spam" | "bypass";

export interface ChatMessage {
  id: string;
  author: string;
  body: string;
  meta: string;
  tone: MessageTone;
  enterMs: number;
  badge?: string;
}

export const CHAT_MESSAGES: readonly ChatMessage[] = [
  {
    id: "normal-01",
    author: "Alex",
    body: "Did anyone get a chance to review the v2 mockups?",
    meta: "10:42",
    tone: "normal",
    enterMs: 3_540,
  },
  {
    id: "normal-02",
    author: "Sam",
    body: "Just pushed a draft - feedback welcome.",
    meta: "10:43",
    tone: "normal",
    enterMs: 3_760,
  },
  {
    id: "normal-03",
    author: "Jordan",
    body: "LGTM overall, one nit on spacing.",
    meta: "10:43",
    tone: "normal",
    enterMs: 3_980,
  },
  {
    id: "spam-original",
    author: "airdrop_king",
    body: "FREE NITRO GIVEAWAY!! discord.gg/freenitr0 DM me fast!",
    meta: "10:44",
    tone: "spam",
    badge: "promo link",
    enterMs: 5_120,
  },
  {
    id: "bypass-01",
    author: "free_nitro_01",
    body: "F R E E  N 1 T R O  discord.gg/fre3nitr0",
    meta: "10:44",
    tone: "bypass",
    badge: "variant",
    enterMs: 14_160,
  },
  {
    id: "bypass-02",
    author: "boostdrop_live",
    body: "free boost drop in bio -> disc0rd.gg/boosts",
    meta: "10:45",
    tone: "bypass",
    badge: "variant",
    enterMs: 15_260,
  },
  {
    id: "bypass-03",
    author: "reward_queue",
    body: "claim rewards now - dis c o r d dot gg slash vault",
    meta: "10:45",
    tone: "bypass",
    badge: "variant",
    enterMs: 16_520,
  },
];
