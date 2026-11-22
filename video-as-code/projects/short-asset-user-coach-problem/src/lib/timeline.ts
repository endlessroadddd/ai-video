export type TimelineController = {
  readonly playing: boolean;
  readonly t: number;
  play: () => void;
  pause: () => void;
  seek: (ms: number) => void;
  destroy: () => void;
};

export type TimelineOptions = {
  durationMs: number;
  loop: boolean;
  speed: number;
  onTick: (t: number) => void;
};

export function createTimeline(options: TimelineOptions): TimelineController {
  const maxStepMs = 100;
  let raf = 0;
  let playing = true;
  let destroyed = false;
  let pendingLoopReset = false;
  let baseT = 0;
  let lastNow = performance.now();

  const tick = (now: number) => {
    if (destroyed) {
      return;
    }

    const dt = Math.min(maxStepMs, Math.max(0, now - lastNow));
    lastNow = now;

    if (playing) {
      if (pendingLoopReset) {
        baseT = 0;
        pendingLoopReset = false;
      } else {
        baseT += dt * options.speed;
        if (options.loop && baseT >= options.durationMs) {
          baseT = options.durationMs;
          pendingLoopReset = true;
        } else if (!options.loop) {
          baseT = Math.min(options.durationMs, baseT);
        }
      }
    }

    options.onTick(baseT);
    if (options.loop || pendingLoopReset || baseT < options.durationMs) {
      raf = requestAnimationFrame(tick);
    }
  };

  const ctrl: TimelineController = {
    get playing() {
      return playing;
    },
    get t() {
      return baseT;
    },
    play() {
      if (destroyed || playing) {
        return;
      }

      playing = true;
      pendingLoopReset = false;
      lastNow = performance.now();
      raf = requestAnimationFrame(tick);
    },
    pause() {
      playing = false;
    },
    seek(ms: number) {
      baseT = Math.max(0, Math.min(options.durationMs, ms));
      pendingLoopReset = false;
      lastNow = performance.now();
      options.onTick(baseT);
    },
    destroy() {
      destroyed = true;
      if (raf) {
        cancelAnimationFrame(raf);
      }
    },
  };

  raf = requestAnimationFrame(tick);
  return ctrl;
}
