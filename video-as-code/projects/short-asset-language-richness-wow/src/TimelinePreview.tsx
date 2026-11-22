import { useEffect, useState } from "react";

import { CommunityScene } from "./CommunityScene";
import { LanguageQualityExplainerScene } from "./LanguageQualityExplainerScene";
import { TitleCardScene } from "./TitleCardScene";
import { type SceneView } from "./discord-ui-state";
import {
  closingKicker,
  closingTitleFragments,
  openingKicker,
  openingSubtitleFragments,
  openingTitleFragments,
} from "./language-richness-data";

type TimelineSegment = {
  scene: SceneView;
  durationMs: number;
  startMs: number;
};

const TIMELINE_SEGMENTS: TimelineSegment[] = [
  { scene: "b1", durationMs: 2800, startMs: 0 },
  { scene: "b2", durationMs: 9000, startMs: 2800 },
  { scene: "b5", durationMs: 21000, startMs: 11800 },
  { scene: "b6", durationMs: 5600, startMs: 32800 },
];

const TOTAL_DURATION_MS = TIMELINE_SEGMENTS.reduce(
  (total, segment) => Math.max(total, segment.startMs + segment.durationMs),
  0,
);

function renderScene(scene: SceneView, playbackToken: number) {
  switch (scene) {
    case "b1":
      return (
        <TitleCardScene
          key={`b1-${playbackToken}`}
          kicker={openingKicker}
          mode="motion"
          outro
          subtitleFragments={openingSubtitleFragments}
          titleFragments={openingTitleFragments}
          unifiedOpening
        />
      );
    case "b2":
      return <LanguageQualityExplainerScene key={`b2-${playbackToken}`} mode="motion" />;
    case "b3":
    case "b4":
    case "b5":
      return <CommunityScene beat="reveal" chrome="clean" key={`b5-${playbackToken}`} mode="motion" />;
    case "b6":
      return (
        <TitleCardScene
          centeredOutro
          key={`b6-${playbackToken}`}
          kicker={closingKicker}
          mode="motion"
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
