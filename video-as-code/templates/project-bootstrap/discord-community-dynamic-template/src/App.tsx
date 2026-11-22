import { useEffect, useState } from "react";
import { CommunityBlindScene } from "./scenes/CommunityBlindScene";
import { TOTAL_DURATION_MS } from "./data/communityBlind";
import { createTimeline } from "./lib/timeline";

function formatTime(ms: number): string {
  return `${(ms / 1000).toFixed(1)}s`;
}

export function App() {
  const [currentMs, setCurrentMs] = useState(0);
  const showHud = new URLSearchParams(window.location.search).get("hud") === "1";

  useEffect(() => {
    const timeline = createTimeline({
      durationMs: TOTAL_DURATION_MS,
      loop: true,
      speed: 1,
      onTick: (t) => {
        setCurrentMs(t);
      },
    });

    return () => {
      timeline.destroy();
    };
  }, []);

  return (
    <div className="preview-shell">
      <CommunityBlindScene currentMs={currentMs} />

      {showHud ? (
        <div className="preview-hud">
          <div className="preview-chip">short-asset-community-blind</div>
          <div className="preview-chip">Discord dark community scene</div>
          <div className="preview-chip">
            {formatTime(currentMs)} / {formatTime(TOTAL_DURATION_MS)}
          </div>
          <div className="preview-chip">Looping</div>
        </div>
      ) : null}
    </div>
  );
}
