/**
 * Clamp a number between min and max.
 */
export function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max);
}

/**
 * Calculate progress between start and end.
 */
export function progressBetween(v: number, start: number, end: number): number {
  if (v <= start) return 0;
  if (v >= end) return 1;
  return (v - start) / (end - start);
}

/**
 * Window fade function: fade in then fade out.
 */
export function fadeWindow(v: number, start: number, fadeIn: number, end: number, fadeOut: number): number {
  if (v < start || v > end) return 0;
  if (v < start + fadeIn) return progressBetween(v, start, start + fadeIn);
  if (v > end - fadeOut) return 1 - progressBetween(v, end - fadeOut, end);
  return 1;
}

/**
 * Ease out quintic.
 */
export function easeOutQuint(x: number): number {
  return 1 - Math.pow(1 - x, 5);
}

/**
 * Ease in out cubic.
 */
export function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
