export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function progressBetween(value: number, start: number, end: number): number {
  if (end <= start) {
    return value >= end ? 1 : 0;
  }

  return clamp((value - start) / (end - start), 0, 1);
}

export function easeOutQuint(value: number): number {
  const t = clamp(value, 0, 1);
  return 1 - (1 - t) ** 5;
}

export function easeInOutCubic(value: number): number {
  const t = clamp(value, 0, 1);

  if (t < 0.5) {
    return 4 * t ** 3;
  }

  return 1 - ((-2 * t + 2) ** 3) / 2;
}

export function fadeWindow(value: number, start: number, end: number, fadeMs = 520): number {
  const inProgress = progressBetween(value, start, start + fadeMs);
  const outProgress = 1 - progressBetween(value, end - fadeMs, end);
  return clamp(Math.min(inProgress, outProgress), 0, 1);
}

export function countTo(value: number, start: number, end: number, target: number): number {
  return Math.round(target * easeOutQuint(progressBetween(value, start, end)));
}
