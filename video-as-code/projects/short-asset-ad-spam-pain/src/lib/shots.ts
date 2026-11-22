import { SHOTS, TOTAL_DURATION_MS, type Shot } from "../data/shots";

export function clampTimelineMs(ms: number): number {
  if (!Number.isFinite(ms)) {
    return 0;
  }

  return Math.min(Math.max(ms, 0), TOTAL_DURATION_MS);
}

export function getShotById(id: string | null | undefined): Shot | undefined {
  if (!id) {
    return undefined;
  }

  const normalized = id.trim().toLowerCase();
  return SHOTS.find((shot) => shot.id.toLowerCase() === normalized);
}

export function getShotForTime(currentMs: number): Shot {
  const clamped = clampTimelineMs(currentMs);
  return SHOTS.find((shot) => clamped >= shot.startMs && clamped < shot.endMs) ?? SHOTS[SHOTS.length - 1];
}

export function resolveStartMsFromSearch(search: string): number {
  const params = new URLSearchParams(search);
  const tParam = params.get("t");

  if (tParam) {
    return clampTimelineMs(Number(tParam));
  }

  const shot = getShotById(params.get("shot"));
  return shot?.startMs ?? 0;
}
