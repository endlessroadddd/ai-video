export function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

export function ramp(value: number, start: number, end: number): number {
  return clamp01((value - start) / Math.max(1, end - start));
}

export function mix(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function easeInCubic(value: number): number {
  const x = clamp01(value);
  return x * x * x;
}

export function easeOutCubic(value: number): number {
  const x = clamp01(value);
  return 1 - Math.pow(1 - x, 3);
}

export function easeOutQuint(value: number): number {
  const x = clamp01(value);
  return 1 - Math.pow(1 - x, 5);
}

export function easeInOutCubic(value: number): number {
  const x = clamp01(value);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
