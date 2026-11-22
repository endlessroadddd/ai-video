import {Easing, interpolate, interpolateColors, spring} from "remotion";

type SpringConfig = {
  damping?: number;
  stiffness?: number;
  mass?: number;
};

export type TimelineSpec<T extends string = string> = Record<T, readonly [number, number]>;

export const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

export const mix = (progress: number, from: number, to: number) =>
  interpolate(clamp01(progress), [0, 1], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

export const mixColor = (progress: number, from: string, to: string) =>
  interpolateColors(clamp01(progress), [0, 1], [from, to]);

export const ramp = (
  frame: number,
  start: number,
  end: number,
  from = 0,
  to = 1,
  easing: ((input: number) => number) | undefined = Easing.bezier(0.22, 1, 0.36, 1)
) => {
  // Guard against invalid input range where start >= end
  if (start >= end) {
    return frame < start ? from : to;
  }
  return interpolate(frame, [start, end], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing
  });
};

export const timelineProgress = <T extends string>(
  frame: number,
  spec: TimelineSpec<T>
): Record<T, number> => {
  const entries = (Object.entries(spec) as Array<[T, readonly [number, number]]>).map(([key, [start, end]]) => [
    key,
    ramp(frame, start, end)
  ]);

  return Object.fromEntries(entries) as Record<T, number>;
};

export const windowProgress = (progress: number, start: number, end: number) =>
  interpolate(progress, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1)
  });

export const springProgress = (
  frame: number,
  fps: number,
  delay = 0,
  config?: SpringConfig
) =>
  spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 18,
      stiffness: 180,
      mass: 0.9,
      ...config
    }
  });

export const popProgress = springProgress;

export const dockProgress = (frame: number, fps: number, delay = 0) =>
  springProgress(frame, fps, delay, {
    damping: 22,
    stiffness: 240,
    mass: 0.82
  });

export const settleProgress = (frame: number, fps: number, delay = 0) =>
  springProgress(frame, fps, delay, {
    damping: 15,
    stiffness: 140,
    mass: 0.92
  });

export const rippleProgress = (frame: number, start: number, duration: number) =>
  ramp(frame, start, start + duration, 0, 1, Easing.bezier(0.18, 0.88, 0.28, 1));

export const sweepProgress = (frame: number, start: number, end: number) =>
  ramp(frame, start, end, 0, 1, Easing.bezier(0.3, 0.02, 0.18, 1));

export const maskRevealProgress = (frame: number, start: number, end: number) =>
  ramp(frame, start, end, 0, 1, Easing.bezier(0.16, 1, 0.3, 1));

export const morphProgress = (frame: number, start: number, end: number) =>
  ramp(frame, start, end, 0, 1, Easing.bezier(0.3, 0, 0.2, 1));

export const compressProgress = (frame: number, start: number, end: number) =>
  ramp(frame, start, end, 0, 1, Easing.bezier(0.35, 0.02, 0.16, 1));

export const floatProgress = (
  frame: number,
  amplitude = 1,
  speed = 160,
  offset = 0
) => Math.sin(((frame + offset) / speed) * Math.PI * 2) * amplitude;

export const arcLift = (progress: number, amplitude = 20) =>
  Math.sin(clamp01(progress) * Math.PI) * amplitude;

export const staggerProgress = (
  progress: number,
  index: number,
  count: number,
  span = 0.26
) => {
  const safeCount = Math.max(1, count - 1);
  const start = (index / safeCount) * Math.max(0, 1 - span);
  return windowProgress(progress, start, Math.min(1, start + span));
};

export const typeReveal = (text: string, progress: number) =>
  text.slice(0, Math.max(0, Math.floor(text.length * clamp01(progress))));

export const blinkOpacity = (frame: number, speed = 8) =>
  Math.floor(frame / speed) % 2 === 0 ? 1 : 0.16;
