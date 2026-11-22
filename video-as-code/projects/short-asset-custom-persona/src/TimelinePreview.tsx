import { useEffect, useState } from "react";

import { CommunityScene } from "./CommunityScene";
import { PersonaCombinedScene } from "./PersonaCombinedScene";
import { TitleCardScene } from "./TitleCardScene";
import { type SceneView } from "./discord-ui-state";
import {
  closingSubtitleFragments,
  closingTitleFragments,
  openingTitleFragments,
  personaClosingKicker,
  personaKicker,
} from "./persona-data";

type TimelineSegment = {
  scene: SceneView | "b2-3";
  durationMs: number;
  startMs: number;
};

const TIMELINE_SEGMENTS: TimelineSegment[] = [
  { scene: "b1", durationMs: 3000, startMs: 0 },
  { scene: "b2-3", durationMs: 13000, startMs: 3000 },
  { scene: "b4", durationMs: 12000, startMs: 16000 },
  { scene: "b5", durationMs: 3000, startMs: 28000 },
];

const TOTAL_DURATION_MS = 31000;

function renderScene(scene: SceneView | "b2-3", playbackToken: number) {
  switch (scene) {
    case "b1":
      return (
        <TitleCardScene
          key={`b1-${playbackToken}`}
          kicker={personaKicker}
          mode="motion"
          outro
          titleFragments={openingTitleFragments}
        />
      );
    case "b2-3":
      return <PersonaCombinedScene key={`b2-3-${playbackToken}`} mode="motion" />;
    case "b4":
      return <CommunityScene chrome="clean" key={`b4-${playbackToken}`} mode="motion" />;
    case "b5":
      return (
        <TitleCardScene
          centeredOutro
          key={`b5-${playbackToken}`}
          kicker={personaClosingKicker}
          mode="motion"
          showChip
          subtitleFragments={closingSubtitleFragments}
          titleFragments={closingTitleFragments}
        />
      );
  }
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
      timeouts.push(
        window.setTimeout(() => {
          setActiveIndex(index + 1);
        }, segment.startMs),
      );
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
