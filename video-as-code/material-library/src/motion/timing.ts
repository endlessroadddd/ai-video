import { clamp01 } from "./easing";

export function progressBetween(value: number, start: number, end: number): number {
  if (end <= start) {
    return value >= end ? 1 : 0;
  }

  return clamp01((value - start) / (end - start));
}

export function fadeWindow(
  value: number,
  start: number,
  enterDurationMs: number,
  end: number,
  exitDurationMs: number,
): number {
  const fadeIn = progressBetween(value, start, start + enterDurationMs);
  const fadeOut = 1 - progressBetween(value, end - exitDurationMs, end);
  return clamp01(Math.min(fadeIn, fadeOut));
}
