import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import AdSpamPainScene from "./scenes/AdSpamPainScene";
import { TOTAL_DURATION_MS } from "./data/shots";
import { createTimeline, type TimelineController } from "./lib/timeline";
import { getShotForTime, resolveStartMsFromSearch } from "./lib/shots";

export default function App() {
  const [currentMs, setCurrentMs] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timelineRef = useRef<TimelineController | null>(null);
  
  const showHud = useMemo(() => new URLSearchParams(window.location.search).get("hud") === "1", []);

  const togglePlayback = useCallback(() => {
    const tl = timelineRef.current;
    if (!tl) return;
    if (tl.playing) {
      tl.pause();
      setIsPlaying(false);
    } else {
      tl.play();
      setIsPlaying(true);
    }
  }, []);

  useEffect(() => {
    const timeline = createTimeline({
      durationMs: TOTAL_DURATION_MS,
      loop: true,
      speed: 1,
      onTick: (nextMs) => {
        setCurrentMs(nextMs);
      },
    });

    timelineRef.current = timeline;

    const startMs = resolveStartMsFromSearch(window.location.search);
    if (startMs > 0) {
      timeline.seek(startMs);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlayback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      timeline.destroy();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [togglePlayback]);

  const currentShot = getShotForTime(currentMs);

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    timelineRef.current?.seek(val);
    setCurrentMs(val);
  };

  return (
    <div className="app-shell">
      <AdSpamPainScene currentMs={currentMs} />

      {showHud ? (
        <div className="preview-hud">
          <div className="preview-hud__header">
            <div className="preview-hud__status">
              <span className={`status-dot ${isPlaying ? "is-playing" : "is-paused"}`} />
              <span>{isPlaying ? "PLAYING" : "PAUSED"}</span>
            </div>
            <div className="preview-hud__time">
              {(currentMs / 1000).toFixed(2)}s / {(TOTAL_DURATION_MS / 1000).toFixed(0)}s
            </div>
          </div>
          
          <input 
            type="range" 
            min={0} 
            max={TOTAL_DURATION_MS} 
            value={currentMs} 
            onChange={handleScrub}
            className="preview-hud__slider"
          />

          <div className="preview-hud__shot">
            {currentShot.id} | {currentShot.label}
          </div>
          <div className="preview-hud__hint">Press [Space] to pause</div>
        </div>
      ) : null}
    </div>
  );
}
