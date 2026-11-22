import { useEffect, useMemo, useRef, useState } from "react";
import { SEGMENT01_DURATION_MS } from "./data/segment01DocMiss";
import { SEGMENT02_DURATION_MS } from "./data/segment02TeamRevise";
import { Segment01DocMissScene } from "./scenes/Segment01DocMissScene";
import { Segment02TeamReviseScene } from "./scenes/Segment02TeamReviseScene";
import { LegacyPreview } from "./LegacyPreview";
import { createTimeline } from "./lib/timeline";
import { useDemoControls, useDemoRuntimeOptions } from "./lib/useDemoControls";
import { getSceneMode } from "./lib/query";
import type { SceneMode } from "./types";

const STORY_DURATION_MS = SEGMENT01_DURATION_MS + SEGMENT02_DURATION_MS;

function isLegacyEnabled() {
  return new URLSearchParams(window.location.search).get("legacy") === "1";
}

export function App() {
  const legacy = isLegacyEnabled();

  return legacy ? <LegacyPreview /> : <Segment01Preview />;
}

function Segment01Preview() {
  const runtime = useDemoRuntimeOptions();
  const mode = useMemo(() => getSceneMode(), []);
  const isAnimated = mode === "motion";
  const [playbackT, setPlaybackT] = useState(isAnimated ? 0 : STORY_DURATION_MS);
  const [playing, setPlaying] = useState(isAnimated);
  const playingRef = useRef(isAnimated);

  const ctrl = useMemo(() => {
    if (!isAnimated) return null;
    return createTimeline({
      durationMs: STORY_DURATION_MS,
      loop: runtime.loop,
      speed: runtime.speed,
      onTick: (t) => setPlaybackT(t),
    });
  }, [isAnimated, runtime.loop, runtime.speed]);

  const api = useMemo(() => {
    return {
      play: () => {
        if (!ctrl) return;
        playingRef.current = true;
        setPlaying(true);
        ctrl.play();
      },
      pause: () => {
        if (!ctrl) return;
        playingRef.current = false;
        setPlaying(false);
        ctrl.pause();
      },
      restart: () => {
        if (!ctrl) {
          setPlaybackT(STORY_DURATION_MS);
          return;
        }
        playingRef.current = true;
        setPlaying(true);
        ctrl.restart();
      },
      toggle: () => {
        if (!ctrl) return;
        if (playingRef.current) {
          playingRef.current = false;
          setPlaying(false);
          ctrl.pause();
        } else {
          playingRef.current = true;
          setPlaying(true);
          ctrl.play();
        }
      },
    };
  }, [ctrl]);

  useDemoControls(api);

  useEffect(() => {
    return () => ctrl?.destroy();
  }, [ctrl]);

  useEffect(() => {
    if (!isAnimated) {
      setPlaybackT(STORY_DURATION_MS);
      setPlaying(false);
      playingRef.current = false;
    }
  }, [isAnimated]);

  const activeSegment = playbackT < SEGMENT01_DURATION_MS ? "segment01" : "segment02";
  const sceneLocalT =
    activeSegment === "segment01" ? playbackT : Math.max(0, playbackT - SEGMENT01_DURATION_MS);

  return (
    <div
      className="preview-root"
      data-clean={runtime.clean ? "true" : "false"}
      data-playing={playing ? "true" : "false"}
    >
      <main className="preview-shell">
        <section className="preview-stage">
          {activeSegment === "segment01" ? (
            <Segment01DocMissScene t={sceneLocalT} mode={mode as SceneMode} />
          ) : (
            <Segment02TeamReviseScene t={sceneLocalT} mode={mode as SceneMode} />
          )}
        </section>
      </main>
    </div>
  );
}
