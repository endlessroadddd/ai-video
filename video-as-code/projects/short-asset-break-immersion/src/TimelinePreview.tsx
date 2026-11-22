import { useEffect, useState } from "react";

import { CommunityScene } from "./CommunityScene";
import { LossChartScene } from "./LossChartScene";
import type { SceneView } from "./discord-ui-state";

type TimelineSegment = {
  durationMs: number;
  endMs: number;
  label: string;
  scene: SceneView;
  startMs: number;
};

const TIMELINE_SEGMENTS: TimelineSegment[] = [
  { scene: "s01", label: "S01 Establishing", durationMs: 4000, startMs: 0, endMs: 4000 },
  { scene: "s02", label: "S02 Question", durationMs: 4000, startMs: 4000, endMs: 8000 },
  { scene: "s03", label: "S03 Dry Reply", durationMs: 5000, startMs: 8000, endMs: 13000 },
  { scene: "s04", label: "S04 Silence", durationMs: 5000, startMs: 13000, endMs: 18000 },
  { scene: "s05a", label: "S05A Exit Feed", durationMs: 5000, startMs: 18000, endMs: 23000 },
  { scene: "s05b", label: "S05B Loss Chart", durationMs: 7000, startMs: 23000, endMs: 30000 },
];

const TOTAL_DURATION_MS = 30000;

function renderScene(scene: SceneView, playbackToken: number) {
  if (scene === "s05b") {
    return (
      <div className="timeline-shell__handoff">
        <div className="timeline-shell__handoff-bg">
          <CommunityScene
            chrome="clean"
            currentScene="s05a"
            key={`community-freeze-${playbackToken}`}
            mode="static"
          />
        </div>
        <div className="timeline-shell__handoff-chart">
          <LossChartScene
            chrome="clean"
            currentScene={scene}
            key={`chart-${playbackToken}`}
            mode="motion"
          />
        </div>
      </div>
    );
  }

  return (
    <CommunityScene
      chrome="clean"
      currentScene={scene}
      key={`community-${playbackToken}`}
      mode="motion"
    />
  );
}

export function TimelinePreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [playbackToken, setPlaybackToken] = useState(0);

  useEffect(() => {
    const timeouts: number[] = [];
    setActiveIndex(0);
    setIsFinished(false);

    TIMELINE_SEGMENTS.slice(1).forEach((segment, index) => {
      const timeout = window.setTimeout(() => {
        setActiveIndex(index + 1);
      }, segment.startMs);

      timeouts.push(timeout);
    });

    timeouts.push(
      window.setTimeout(() => {
        setIsFinished(true);
      }, TOTAL_DURATION_MS),
    );

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, [playbackToken]);

  const activeSegment = TIMELINE_SEGMENTS[activeIndex]!;

  return (
    <main className="timeline-shell">
      <div className="timeline-shell__stage">{renderScene(activeSegment.scene, playbackToken)}</div>

      {isFinished ? (
        <button
          aria-label="Replay full preview"
          className="timeline-shell__replay"
          onClick={() => setPlaybackToken((value) => value + 1)}
          type="button"
        >
          Replay
        </button>
      ) : null}
    </main>
  );
}
