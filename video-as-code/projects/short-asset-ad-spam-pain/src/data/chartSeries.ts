export interface DataPointA {
  t: number;
  banned: number;
  blockRate: number;
}

export interface DataPointB {
  t: number;
  kicked: number;
  joined: number;
}

export const CHART_A_KEYFRAMES: DataPointA[] = [
  { t: 10_100,  banned: 47,  blockRate: 0.82 },
  { t: 13_800, banned: 89,  blockRate: 0.64 },
  { t: 16_800, banned: 118, blockRate: 0.50 },
  { t: 19_500, banned: 142, blockRate: 0.41 },
];

export const CHART_B_KEYFRAMES: DataPointB[] = [
  { t: 24_900, kicked: 12,  joined: 34 },
  { t: 26_900, kicked: 52,  joined: 280 },
  { t: 28_900, kicked: 88,  joined: 840 },
  { t: 31_600, kicked: 112, joined: 1850 },
];

export const FINAL_BANNED_KEYWORD_COUNT = CHART_A_KEYFRAMES[CHART_A_KEYFRAMES.length - 1].banned;
export const FINAL_BLOCK_RATE = CHART_A_KEYFRAMES[CHART_A_KEYFRAMES.length - 1].blockRate;
export const FINAL_KICKED_COUNT = CHART_B_KEYFRAMES[CHART_B_KEYFRAMES.length - 1].kicked;
export const FINAL_NEW_BOT_COUNT = CHART_B_KEYFRAMES[CHART_B_KEYFRAMES.length - 1].joined;
