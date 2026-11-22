import { useEffect, useRef, useState } from "react";

type UsePlaybackClockOptions = {
  fps: number;
  isPlaying: boolean;
};

type UsePlaybackClockResult = {
  frame: number;
  jumpToFrame: (nextFrame: number) => void;
  reset: () => void;
};

export function usePlaybackClock(
  options: UsePlaybackClockOptions,
): UsePlaybackClockResult {
  const { fps, isPlaying } = options;
  const [frame, setFrame] = useState(0);
  const frameRef = useRef(0);
  const lastTimestampRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      lastTimestampRef.current = null;
      return;
    }

    const frameDurationMs = 1000 / fps;
    let animationFrameId = 0;

    const tick = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaMs = timestamp - lastTimestampRef.current;
      if (deltaMs >= frameDurationMs) {
        const framesToAdvance = Math.floor(deltaMs / frameDurationMs);
        frameRef.current += framesToAdvance;
        lastTimestampRef.current += framesToAdvance * frameDurationMs;
        setFrame(frameRef.current);
      }

      animationFrameId = window.requestAnimationFrame(tick);
    };

    animationFrameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [fps, isPlaying]);

  function jumpToFrame(nextFrame: number): void {
    frameRef.current = Math.max(0, Math.floor(nextFrame));
    lastTimestampRef.current = null;
    setFrame(frameRef.current);
  }

  function reset(): void {
    jumpToFrame(0);
  }

  return {
    frame,
    jumpToFrame,
    reset,
  };
}
