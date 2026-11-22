import { useEffect, useState, type CSSProperties } from "react";

import { communityGuildState, type SceneMode, type SceneView } from "./discord-ui-state";

const CHART_DRIFT_EMOJIS = [
  {
    emoji: "\u{1F928}",
    left: "2.6%",
    top: "12.4%",
    delay: "0s",
    duration: "8.4s",
    size: "30px",
    opacity: "0.24",
    driftX: "10px",
    driftY: "8px",
    rotate: "4deg",
  },
  {
    emoji: "\u{1F480}",
    right: "3.8%",
    top: "18%",
    delay: "0.9s",
    duration: "9.8s",
    size: "28px",
    opacity: "0.22",
    driftX: "-9px",
    driftY: "10px",
    rotate: "-5deg",
  },
  {
    emoji: "\u{1F4C9}",
    left: "4.8%",
    bottom: "13.2%",
    delay: "1.8s",
    duration: "8.9s",
    size: "28px",
    opacity: "0.2",
    driftX: "8px",
    driftY: "-9px",
    rotate: "3deg",
  },
  {
    emoji: "\u{1F620}",
    right: "7.2%",
    bottom: "18.6%",
    delay: "0.4s",
    duration: "10.8s",
    size: "30px",
    opacity: "0.23",
    driftX: "-12px",
    driftY: "-8px",
    rotate: "-4deg",
  },
  {
    emoji: "\u{1F62D}",
    right: "15.2%",
    top: "8.4%",
    delay: "1.6s",
    duration: "11.6s",
    size: "26px",
    opacity: "0.18",
    driftX: "-8px",
    driftY: "9px",
    rotate: "-3deg",
  },
  {
    emoji: "\u{1F611}",
    left: "13.2%",
    top: "28%",
    delay: "2.2s",
    duration: "9.6s",
    size: "24px",
    opacity: "0.17",
    driftX: "6px",
    driftY: "-8px",
    rotate: "2deg",
  },
  {
    emoji: "\u{1F624}",
    right: "12.6%",
    bottom: "8.8%",
    delay: "2.8s",
    duration: "9.2s",
    size: "26px",
    opacity: "0.19",
    driftX: "-7px",
    driftY: "-7px",
    rotate: "-4deg",
  },
  {
    emoji: "\u{1F616}",
    left: "8.2%",
    bottom: "5.8%",
    delay: "0.7s",
    duration: "10.4s",
    size: "22px",
    opacity: "0.16",
    driftX: "7px",
    driftY: "6px",
    rotate: "3deg",
  },
  {
    emoji: "\u{1F914}",
    right: "9.5%",
    top: "34%",
    delay: "1.3s",
    duration: "8.7s",
    size: "23px",
    opacity: "0.17",
    driftX: "-6px",
    driftY: "7px",
    rotate: "-2deg",
  },
] as const;

function buildChartPoints(values: readonly number[]) {
  const width = 800;
  const height = 320;
  const max = 280;
  const min = 0;

  return values.map((value, index) => {
    const x = (width / (values.length - 1)) * index;
    const y = height - ((value - min) / (max - min)) * height;
    return { value, x, y };
  });
}

function buildSmoothPath(points: Array<{ x: number; y: number }>) {
  if (!points.length) {
    return "";
  }

  return points
    .map((point, index, list) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`;
      }

      const previous = list[index - 1]!;
      const controlX = (previous.x + point.x) / 2;
      return `C ${controlX} ${previous.y} ${controlX} ${point.y} ${point.x} ${point.y}`;
    })
    .join(" ");
}

function navigate(scene: SceneView, mode: SceneMode) {
  const params = new URLSearchParams({
    scene,
    mode,
  });
  window.location.search = params.toString();
}

export function LossChartScene(props: {
  chrome?: "full" | "clean";
  currentScene: SceneView;
  mode: SceneMode;
}) {
  const { chrome = "full", currentScene, mode } = props;
  const finalImpactValue = Number.parseInt(communityGuildState.chartImpact, 10);
  const points = buildChartPoints(communityGuildState.activityTrend);
  const chartPath = buildSmoothPath(points);
  const areaPath = `${chartPath} L 800 320 L 0 320 Z`;
  const inflectionPoint = points[communityGuildState.activityInflectionIndex]!;
  const lastPoint = points[points.length - 1]!;
  const [impactValue, setImpactValue] = useState(mode === "motion" ? 0 : finalImpactValue);

  useEffect(() => {
    if (mode !== "motion") {
      setImpactValue(finalImpactValue);
      return;
    }

    setImpactValue(0);

    const delayMs = 1120;
    const durationMs = 920;
    const startAt = performance.now() + delayMs;
    let frameId = 0;

    const tick = (now: number) => {
      if (now < startAt) {
        frameId = window.requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min((now - startAt) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setImpactValue(Math.round(finalImpactValue * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [finalImpactValue, mode]);

  return (
    <main
      className={`page-shell page-shell--chart${mode === "motion" ? " page-shell--motion" : ""}${
        chrome === "clean" ? " page-shell--clean" : ""
      }`}
    >
      {chrome === "full" ? (
        <div className="scene-nav">
          <div className="scene-nav__group">
            {(["s01", "s02", "s03", "s04", "s05a", "s05b"] as SceneView[]).map((scene) => (
              <button
                className={`scene-nav__button${
                  scene === currentScene ? " scene-nav__button--active" : ""
                }${scene === "s05b" ? " scene-nav__button--chart" : ""}`}
                key={scene}
                onClick={() => navigate(scene, mode)}
                type="button"
              >
                {scene.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="scene-nav__group">
            <span className="scene-nav__mode-label">Mode</span>
            {(["static", "motion"] as SceneMode[]).map((sceneMode) => (
              <button
                className={`scene-nav__button${
                  sceneMode === mode ? " scene-nav__button--active" : ""
                }`}
                key={sceneMode}
                onClick={() => navigate(currentScene, sceneMode)}
                type="button"
              >
                {sceneMode}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <section className={`loss-card${mode === "motion" ? " loss-card--motion" : ""}`}>
        <div className="loss-card__emoji-drift" aria-hidden="true">
          {CHART_DRIFT_EMOJIS.map((item) => {
            const style = {
              ["--emoji-delay" as string]: item.delay,
              ["--emoji-duration" as string]: item.duration,
              ["--emoji-size" as string]: item.size,
              ["--emoji-opacity" as string]: item.opacity,
              ["--emoji-shift-x" as string]: item.driftX,
              ["--emoji-shift-y" as string]: item.driftY,
              ["--emoji-rotate" as string]: item.rotate,
              bottom: "bottom" in item ? item.bottom : undefined,
              left: "left" in item ? item.left : undefined,
              right: "right" in item ? item.right : undefined,
              top: "top" in item ? item.top : undefined,
            } as CSSProperties;

            return (
              <span
                className={`loss-card__emoji${mode === "motion" ? " loss-card__emoji--motion" : ""}`}
                key={`${item.emoji}-${item.delay}-${item.duration}`}
                style={style}
              >
                {item.emoji}
              </span>
            );
          })}
        </div>

        <div className="loss-card__header">
          <div className="loss-card__copy">
            <p className="loss-card__eyebrow">{communityGuildState.chartEyebrow}</p>
            <h1 className="loss-card__title">{communityGuildState.chartTitle}</h1>
          </div>
          <div className="loss-card__impact">
            <strong className={mode === "motion" ? "loss-card__impact-value loss-card__impact-value--motion" : "loss-card__impact-value"}>
              {impactValue}%
            </strong>
            <span>{communityGuildState.chartImpactNote}</span>
          </div>
        </div>

        <div className="loss-chart">
          <div className="loss-chart__stage">
            <div className="loss-chart__grid">
              {[260, 175, 90, 0].map((value, index) => (
                <div
                  className="loss-chart__grid-line"
                  key={value}
                  style={{ top: `${(index / 3) * 100}%` }}
                >
                  <span>{value}</span>
                </div>
              ))}
            </div>

            <svg className="loss-chart__svg" viewBox="0 0 800 320" preserveAspectRatio="xMinYMin meet">
              <defs>
                <linearGradient id="lossArea" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(237, 66, 69, 0.28)" />
                  <stop offset="100%" stopColor="rgba(237, 66, 69, 0.02)" />
                </linearGradient>
                <linearGradient id="lossLine" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#23a55a" />
                  <stop offset="46%" stopColor="#23a55a" />
                  <stop offset="58%" stopColor="#ed4245" />
                  <stop offset="100%" stopColor="#ed4245" />
                </linearGradient>
              </defs>

              <path
                className={mode === "motion" ? "loss-chart__area loss-chart__area--motion" : "loss-chart__area"}
                d={areaPath}
                fill="url(#lossArea)"
              />
              <path
                className={mode === "motion" ? "loss-chart__line loss-chart__line--motion" : "loss-chart__line"}
                d={chartPath}
                fill="none"
                stroke="url(#lossLine)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
              />

              <line
                className={mode === "motion" ? "loss-chart__guide loss-chart__guide--motion" : "loss-chart__guide"}
                stroke="rgba(237, 66, 69, 0.55)"
                strokeDasharray="8 6"
                strokeWidth="2"
                x1={inflectionPoint.x}
                x2={inflectionPoint.x}
                y1={0}
                y2={320}
              />

              <circle
                className={mode === "motion" ? "loss-chart__point loss-chart__point--motion loss-chart__point--start" : "loss-chart__point"}
                cx={points[0]!.x}
                cy={points[0]!.y}
                fill="#23a55a"
                r="6"
              />
              <circle
                className={mode === "motion" ? "loss-chart__pulse loss-chart__pulse--motion loss-chart__pulse--one" : "loss-chart__pulse"}
                cx={inflectionPoint.x}
                cy={inflectionPoint.y}
                fill="none"
                r="7"
                stroke="#ff4b4b"
                strokeWidth="2"
              />
              <circle
                className={mode === "motion" ? "loss-chart__pulse loss-chart__pulse--motion loss-chart__pulse--two" : "loss-chart__pulse"}
                cx={inflectionPoint.x}
                cy={inflectionPoint.y}
                fill="none"
                r="7"
                stroke="#ff4b4b"
                strokeWidth="2"
              />
              <circle
                className={mode === "motion" ? "loss-chart__point loss-chart__point--motion loss-chart__point--inflection" : "loss-chart__point"}
                cx={inflectionPoint.x}
                cy={inflectionPoint.y}
                fill="#ed4245"
                r="6"
              />
              <circle
                className={mode === "motion" ? "loss-chart__point loss-chart__point--motion loss-chart__point--last" : "loss-chart__point"}
                cx={lastPoint.x}
                cy={lastPoint.y}
                fill="#ed4245"
                r="7"
              />

              <rect
                className={mode === "motion" ? "loss-chart__inflection-pill loss-chart__inflection-pill--motion" : "loss-chart__inflection-pill"}
                fill="rgba(237, 66, 69, 0.16)"
                height="28"
                rx="8"
                width="116"
                x={inflectionPoint.x + 16}
                y="14"
              />
              <text
                className={mode === "motion" ? "loss-chart__inflection-label loss-chart__inflection-label--motion" : "loss-chart__inflection-label"}
                fill="#ff8e91"
                fontFamily="Inter, Segoe UI, sans-serif"
                fontSize="13"
                fontWeight="700"
                x={inflectionPoint.x + 74}
                y="32"
                textAnchor="middle"
              >
                AI goes live
              </text>

              <text
                className={mode === "motion" ? "loss-chart__point-value loss-chart__point-value--motion" : "loss-chart__point-value"}
                fill="#ff8e91"
                fontFamily="Inter, Segoe UI, sans-serif"
                fontSize="14"
                fontWeight="700"
                x={lastPoint.x - 4}
                y={lastPoint.y - 14}
                textAnchor="end"
              >
                {lastPoint.value}
              </text>
            </svg>
          </div>
        </div>

        <div className="loss-chart__labels">
          {communityGuildState.activityTrendLabels.map((label, index) => (
            <span
              className={index === communityGuildState.activityInflectionIndex ? "loss-chart__label loss-chart__label--highlight" : "loss-chart__label"}
              key={label}
            >
              {label}
            </span>
          ))}
        </div>

        <div className="loss-card__verdict">
          <strong>{communityGuildState.chartVerdict}</strong>
        </div>

        <div className="loss-card__footer">
          <div className="loss-card__metric">
            <strong>{communityGuildState.chartSummary}</strong>
            <span>{communityGuildState.chartSummaryNote}</span>
          </div>
          <div className="loss-card__metric loss-card__metric--muted">
            <strong>{communityGuildState.chartContextTitle}</strong>
            <span>{communityGuildState.chartContextNote}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
