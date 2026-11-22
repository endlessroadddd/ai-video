export const TOTAL_DURATION_MS = 35_700;

export type ShotId = "S01" | "S02" | "S03a" | "S03b" | "S03c" | "S04a" | "S04b" | "S04c" | "S05";

export interface Shot {
  id: ShotId;
  label: string;
  startMs: number;
  endMs: number;
}

export const SHOTS: readonly Shot[] = [
  { id: "S01", label: "Opening pain points", startMs: 0, endMs: 4_700 },
  { id: "S02", label: "Setup and first spam hit", startMs: 4_700, endMs: 7_400 },
  { id: "S03a", label: "Open moderation panel", startMs: 7_400, endMs: 9_800 },
  { id: "S03b", label: "Manually add keyword", startMs: 9_800, endMs: 13_200 },
  { id: "S03c", label: "Variant slips through", startMs: 13_200, endMs: 19_000 },
  { id: "S04a", label: "Hunt the account manually", startMs: 19_000, endMs: 21_600 },
  { id: "S04b", label: "Confirm kick", startMs: 21_600, endMs: 24_300 },
  { id: "S04c", label: "New bots flood in", startMs: 24_300, endMs: 31_100 },
  { id: "S05", label: "Split-screen outro", startMs: 31_100, endMs: 35_700 },
];
