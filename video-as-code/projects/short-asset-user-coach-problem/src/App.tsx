import { useEffect, useMemo, useRef, useState } from "react";
import { Hud } from "./components/Hud";
import { getShotForTime, SHOTS, TOTAL_DURATION_MS, type ShotId } from "./data/shots";
import { getInitialTime, getSearchFlag } from "./lib/query";
import { createTimeline, type TimelineController } from "./lib/timeline";
import { fadeWindow } from "./lib/math";
import { CostDashboardScene } from "./scenes/CostDashboardScene";
import { FloodScene } from "./scenes/FloodScene";
import { IgnoredDocsScene } from "./scenes/IgnoredDocsScene";
import { UserCoachScene } from "./scenes/UserCoachScene";

function getOpacity(currentMs: number, shotId: ShotId): number {
  const shot = SHOTS.find((item) => item.id === shotId);

  if (!shot) {
    return 0;
  }

  return fadeWindow(currentMs, shot.startMs, shot.endMs, 620);
}

export function App() {
  const initialMs = useMemo(() => getInitialTime(TOTAL_DURATION_MS), []);
  const showHud = useMemo(() => getSearchFlag("hud"), []);
  const [currentMs, setCurrentMs] = useState(initialMs);
  const [playing, setPlaying] = useState(true);
  const timelineRef = useRef<TimelineController | null>(null);

  useEffect(() => {
    const timeline = createTimeline({
      durationMs: TOTAL_DURATION_MS,
      loop: true,
      speed: 1,
      onTick: setCurrentMs,
    });

    timelineRef.current = timeline;

    if (initialMs > 0) {
      timeline.seek(initialMs);
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code !== "Space") {
        return;
      }

      event.preventDefault();
      const activeTimeline = timelineRef.current;

      if (!activeTimeline) {
        return;
      }

      if (activeTimeline.playing) {
        activeTimeline.pause();
        setPlaying(false);
      } else {
        activeTimeline.play();
        setPlaying(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      timeline.destroy();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [initialMs]);

  const currentShot = getShotForTime(currentMs);

  return (
    <main className="preview-shell">
      <div className="scene-stack" aria-label="User Coach problem scene preview">
        <FloodScene currentMs={currentMs} opacity={getOpacity(currentMs, "flood")} />
        <CostDashboardScene currentMs={currentMs} opacity={getOpacity(currentMs, "cost")} />
        <IgnoredDocsScene currentMs={currentMs} opacity={getOpacity(currentMs, "docs")} />
        <UserCoachScene currentMs={currentMs} opacity={getOpacity(currentMs, "coach")} />
      </div>

      {showHud ? (
        <Hud
          currentMs={currentMs}
          currentShot={currentShot}
          durationMs={TOTAL_DURATION_MS}
          onScrub={(nextMs) => {
            timelineRef.current?.seek(nextMs);
            setCurrentMs(nextMs);
          }}
          playing={playing}
        />
      ) : null}
    </main>
  );
}
