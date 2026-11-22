export function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

export function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export function ramp(t: number, start: number, end: number) {
  return clamp01((t - start) / Math.max(1, end - start));
}

export function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
