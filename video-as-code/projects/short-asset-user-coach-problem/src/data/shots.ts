export type ShotId = "flood" | "cost" | "docs" | "coach";

export type Shot = {
  id: ShotId;
  label: string;
  startMs: number;
  endMs: number;
};

export const SHOTS: readonly Shot[] = [
  { id: "flood", label: "Shot 01 - The Flood", startMs: 0, endMs: 9000 },
  { id: "cost", label: "Shot 02 - The Cost", startMs: 9000, endMs: 20000 },
  { id: "docs", label: "Shot 03 - The Ignored Docs", startMs: 20000, endMs: 28000 },
  { id: "coach", label: "Shot 04 - User Coach", startMs: 28000, endMs: 37000 },
];

export const TOTAL_DURATION_MS = SHOTS[SHOTS.length - 1].endMs;

export function getShotForTime(currentMs: number): Shot {
  return SHOTS.find((shot) => currentMs >= shot.startMs && currentMs < shot.endMs) ?? SHOTS[0];
}

export function getLocalTime(currentMs: number, shotId: ShotId): number {
  const shot = SHOTS.find((item) => item.id === shotId);
  return Math.max(0, currentMs - (shot?.startMs ?? 0));
}
