import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createTimeline } from "./lib/timeline";
import { useDemoControls, useDemoRuntimeOptions } from "./lib/useDemoControls";
import { FeishuChat } from "./scenes/FeishuChat";
import { KnowledgeDashboard } from "./scenes/KnowledgeDashboard";

type Phase = "scene1" | "fade-out" | "scene2" | "ending";

const SCENE1_DURATION_MS = 60_000;

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}
function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}
function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
function ramp(t: number, start: number, end: number) {
  return clamp01((t - start) / Math.max(1, end - start));
}
function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const FADE_DURATION = 900;

export function App() {
  const runtime = useDemoRuntimeOptions();
  const [chatT, setChatT] = useState(0);
  const playingRef = useRef(true);

  const [phase, setPhase] = useState<Phase>("scene1");
  const [fadeElapsed, setFadeElapsed] = useState(0);
  const [endingElapsed, setEndingElapsed] = useState(0);

  // Scene 1 timeline — drives chat messages
  const ctrl = useMemo(() => {
    return createTimeline({
      durationMs: SCENE1_DURATION_MS,
      loop: false,
      speed: runtime.speed,
      onTick: (t) => setChatT(t),
    });
  }, [runtime.speed]);

  const api = useMemo(() => {
    const apiInner = {
      play: () => { playingRef.current = true; ctrl.play(); },
      pause: () => { playingRef.current = false; ctrl.pause(); },
      restart: () => {
        playingRef.current = true;
        ctrl.restart();
        setPhase("scene1");
        setFadeElapsed(0);
        setEndingElapsed(0);
      },
      toggle: () => { if (playingRef.current) apiInner.pause(); else apiInner.play(); },
    };
    return apiInner;
  }, [ctrl]);

  useDemoControls(api);
  useEffect(() => () => ctrl.destroy(), [ctrl]);

  // User clicks "View Details" on card → start fade
  const handleViewDetails = useCallback(() => {
    if (phase !== "scene1") return;
    ctrl.pause();
    setPhase("fade-out");
  }, [phase, ctrl]);

  // Fade-out timer
  useEffect(() => {
    if (phase !== "fade-out") return;
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const elapsed = performance.now() - start;
      setFadeElapsed(elapsed);
      if (elapsed < FADE_DURATION) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase("scene2");
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // KB detail auto-animation finished → start ending
  const handleDetailFullyShown = useCallback(() => {
    if (phase !== "scene2") return;
    setPhase("ending");
  }, [phase]);

  // Ending timer
  useEffect(() => {
    if (phase !== "ending") return;
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const elapsed = performance.now() - start;
      setEndingElapsed(elapsed);
      if (elapsed < 8000) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // Scene 1 opacity: fully visible until fade starts, then fades out
  const scene1Opacity = phase === "scene1" ? 1
    : phase === "fade-out" ? 1 - easeInOutCubic(clamp01(fadeElapsed / FADE_DURATION))
    : 0;

  // Scene 2 opacity: fades in after fade-out completes
  const scene2FadeIn = phase === "scene2" || phase === "ending" ? 1 : 0;
  const scene2FadeOut = phase === "ending" ? easeOutCubic(ramp(endingElapsed, 1500, 3000)) : 0;
  const scene2Opacity = scene2FadeIn * (1 - scene2FadeOut);

  // Ending overlay
  const endingBgOpacity = phase === "ending" ? easeOutCubic(ramp(endingElapsed, 1500, 3500)) : 0;
  const endingTextIn = phase === "ending" ? easeOutCubic(ramp(endingElapsed, 3500, 5500)) : 0;

  const showScene1 = phase === "scene1" || phase === "fade-out";
  const showScene2 = phase === "scene2" || phase === "ending";

  return (
    <div className="demoRoot">
      <div className="stage">
        {showScene1 && (
          <FeishuChat t={chatT} opacity={scene1Opacity} onViewDetails={handleViewDetails} />
        )}
        {showScene2 && (
          <KnowledgeDashboard opacity={scene2Opacity} onDetailFullyShown={handleDetailFullyShown} />
        )}
        {/* Fade overlay (no text) */}
        {phase === "fade-out" && (
          <div
            className="fade-overlay"
            style={{ opacity: easeInOutCubic(clamp01(fadeElapsed / FADE_DURATION)) }}
          />
        )}
        {endingBgOpacity > 0 && (
          <div className="ending-overlay" style={{ opacity: endingBgOpacity }}>
            <div
              className="ending-text"
              style={{
                opacity: endingTextIn,
                transform: `translateY(${mix(16, 0, endingTextIn)}px)`,
              }}
            >
              AI stores knowledge the way AI retrieves it best
              <br />
              — structured, connected, and always up to date.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
