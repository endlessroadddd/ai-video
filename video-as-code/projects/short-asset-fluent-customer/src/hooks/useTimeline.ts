import { useEffect, useRef, useState, useCallback } from "react";

interface UseTimelineOptions {
  durationMs: number;
  autoPlay?: boolean;
  loop?: boolean;
}

export function useTimeline({ durationMs, autoPlay = true, loop = false }: UseTimelineOptions) {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(autoPlay);
  const intervalRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const pausedAtRef = useRef<number>(0);
  const timeRef = useRef(0);

  const tick = useCallback(
    () => {
      const now = performance.now();
      if (!startRef.current) startRef.current = now - pausedAtRef.current;
      const elapsed = now - startRef.current;
      const t = Math.min(elapsed, durationMs);
      setTime(t);
      timeRef.current = t;

      if (elapsed >= durationMs) {
        if (loop) {
          startRef.current = now;
          pausedAtRef.current = 0;
        } else {
          setPlaying(false);
          pausedAtRef.current = durationMs;
        }
      }
    },
    [durationMs, loop]
  );

  useEffect(() => {
    if (playing) {
      startRef.current = 0;
      tick();
      intervalRef.current = window.setInterval(tick, 33);
    }
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [playing, tick]);

  const play = useCallback(() => {
    startRef.current = 0;
    pausedAtRef.current = timeRef.current;
    setPlaying(true);
  }, []);

  const pause = useCallback(() => {
    pausedAtRef.current = timeRef.current;
    setPlaying(false);
  }, []);

  const seek = useCallback(
    (t: number) => {
      const clamped = Math.max(0, Math.min(t, durationMs));
      setTime(clamped);
      timeRef.current = clamped;
      pausedAtRef.current = clamped;
      startRef.current = 0;
    },
    [durationMs]
  );

  const restart = useCallback(() => {
    setTime(0);
    timeRef.current = 0;
    pausedAtRef.current = 0;
    startRef.current = 0;
    setPlaying(true);
  }, []);

  return { time, playing, play, pause, seek, restart };
}
