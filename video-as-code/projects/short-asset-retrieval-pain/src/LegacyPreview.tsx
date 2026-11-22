import { useEffect, useMemo, useRef, useState } from "react";
import { SCENE_DURATIONS, TIMELINE_SEGMENTS, TOTAL_DURATION_MS } from "./data/story";
import { ClientRiskScene } from "./scenes/ClientRiskScene";
import { DocumentTweaksFailScene } from "./scenes/DocumentTweaksFailScene";
import { KnowledgeUpdatedScene } from "./scenes/KnowledgeUpdatedScene";
import { SourceCurrentScene } from "./scenes/SourceCurrentScene";
import { WrongAnswerScene } from "./scenes/WrongAnswerScene";
import { createTimeline } from "./lib/timeline";
import { useDemoControls, useDemoRuntimeOptions } from "./lib/useDemoControls";
import { getSceneId, getSceneMode, getViewMode } from "./lib/query";
import type { SceneId, SceneMode } from "./types";

function renderLegacyScene(sceneId: SceneId, t: number, mode: SceneMode) {
  switch (sceneId) {
    case "s01":
      return <KnowledgeUpdatedScene t={t} mode={mode} />;
    case "s02":
      return <WrongAnswerScene t={t} mode={mode} />;
    case "s03":
      return <SourceCurrentScene t={t} mode={mode} />;
    case "s04":
      return <DocumentTweaksFailScene t={t} mode={mode} />;
    case "s05":
      return <ClientRiskScene t={t} mode={mode} />;
  }
}

function getTimelineSegment(t: number) {
  const found = TIMELINE_SEGMENTS.find((segment) => t >= segment.startMs && t < segment.startMs + segment.durationMs);
  return found ?? TIMELINE_SEGMENTS[TIMELINE_SEGMENTS.length - 1]!;
}

export function LegacyPreview() {
  const runtime = useDemoRuntimeOptions();
  const view = useMemo(() => getViewMode(), []);
  const scene = useMemo(() => getSceneId(), []);
  const mode = useMemo(() => getSceneMode(), []);
  const isAnimated = view === "timeline" || mode === "motion";
  const durationMs = view === "timeline" ? TOTAL_DURATION_MS : SCENE_DURATIONS[scene];
  const [playbackT, setPlaybackT] = useState(isAnimated ? 0 : durationMs);
  const [playing, setPlaying] = useState(isAnimated);
  const playingRef = useRef(isAnimated);

  const ctrl = useMemo(() => {
    if (!isAnimated) return null;
    return createTimeline({
      durationMs,
      loop: runtime.loop,
      speed: runtime.speed,
      onTick: (t) => setPlaybackT(t),
    });
  }, [durationMs, isAnimated, runtime.loop, runtime.speed]);

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
          setPlaybackT(durationMs);
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
  }, [ctrl, durationMs]);

  useDemoControls(api);

  useEffect(() => {
    return () => ctrl?.destroy();
  }, [ctrl]);

  useEffect(() => {
    if (!isAnimated) {
      setPlaybackT(durationMs);
      setPlaying(false);
      playingRef.current = false;
    }
  }, [durationMs, isAnimated]);

  const activeSegment = view === "timeline" ? getTimelineSegment(playbackT) : null;
  const activeScene = activeSegment?.scene ?? scene;
  const sceneLocalT =
    view === "timeline" && activeSegment
      ? playbackT - activeSegment.startMs
      : isAnimated
        ? playbackT
        : SCENE_DURATIONS[scene];

  return (
    <div
      className="preview-root"
      data-clean={runtime.clean ? "true" : "false"}
      data-playing={playing ? "true" : "false"}
    >
      <main className="preview-shell">
        <section className="preview-stage">
          {renderLegacyScene(activeScene, sceneLocalT, view === "timeline" ? "motion" : mode)}
        </section>
      </main>
    </div>
  );
}
