export type TimelineController = {
  readonly playing: boolean;
  readonly t: number;
  readonly speed: number;
  play: () => void;
  pause: () => void;
  restart: () => void;
  seek: (ms: number) => void;
  destroy: () => void;
};

export type TimelineOptions = {
  durationMs: number;
  loop: boolean;
  speed: number;
  onTick: (t: number, ctrl: Pick<TimelineController, "restart" | "pause">) => void;
};

export function createTimeline(options: TimelineOptions): TimelineController {
  let raf = 0;
  let playing = true;
  let destroyed = false;
  let speed = options.speed;
  let baseT = 0;
  let lastNow = performance.now();

  const tick = (now: number) => {
    if (destroyed) return;

    const dt = Math.max(0, now - lastNow);
    lastNow = now;

    if (playing) {
      baseT += dt * speed;
      if (options.loop) baseT = baseT % options.durationMs;
      else baseT = Math.min(options.durationMs, baseT);
    }

    options.onTick(baseT, ctrl);
    if (options.loop || baseT < options.durationMs) raf = requestAnimationFrame(tick);
  };

  const ctrl: TimelineController = {
    get playing() {
      return playing;
    },
    get t() {
      return baseT;
    },
    get speed() {
      return speed;
    },
    play() {
      if (destroyed) return;
      playing = true;
      lastNow = performance.now();
      raf = requestAnimationFrame(tick);
    },
    pause() {
      playing = false;
    },
    restart() {
      baseT = 0;
      lastNow = performance.now();
      raf = requestAnimationFrame(tick);
    },
    seek(ms: number) {
      baseT = Math.max(0, Math.min(options.durationMs, ms));
      lastNow = performance.now();
      options.onTick(baseT, ctrl);
    },
    destroy() {
      destroyed = true;
      if (raf) cancelAnimationFrame(raf);
    },
  };

  raf = requestAnimationFrame(tick);
  return ctrl;
}

