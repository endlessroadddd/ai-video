import React from "react";
import {AbsoluteFill, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import {clamp01, mix} from "../motion/primitives";
import {
  SceneNode,
  SceneRoute,
  SceneTone,
  StructureSceneConfig
} from "../structure/scenes";
import {tokens} from "../theme/tokens";

const PAGE = {x: 160, y: 90, width: 1600, height: 900};

const toneStyles: Record<SceneTone, {bg: string; border: string; line: string}> = {
  primary: {bg: tokens.colors.primaryTintBg, border: tokens.colors.primaryTintBorder, line: "rgba(100,79,184,0.72)"},
  cool: {bg: "#f3f0eb", border: "#ddd7cf", line: "#7d7797"},
  warm: {bg: "#f3f0eb", border: "#ddd7cf", line: "#7d7797"},
  success: {bg: "#f3f0eb", border: "#ddd7cf", line: "#7d7797"},
  rose: {bg: "#f3f0eb", border: "#ddd7cf", line: "#7d7797"},
  neutral: {bg: "#f3f0eb", border: "#ddd7cf", line: "#7d7797"},
  orange: {bg: "#f8efe5", border: "rgba(171, 129, 91, 0.2)", line: "#ab815b"}
};

const parsePath = (d: string) => {
  const tokensRaw = d.match(/[A-Z]|-?\d*\.?\d+/g) ?? [];
  const points: Array<{x: number; y: number}> = [];
  let index = 0;
  let current = {x: 0, y: 0};

  while (index < tokensRaw.length) {
    const command = tokensRaw[index++];

    if (command === "M") {
      current = {x: Number(tokensRaw[index++]), y: Number(tokensRaw[index++])};
      points.push({...current});
      continue;
    }

    if (command === "H") {
      current = {x: Number(tokensRaw[index++]), y: current.y};
      points.push({...current});
      continue;
    }

    if (command === "V") {
      current = {x: current.x, y: Number(tokensRaw[index++])};
      points.push({...current});
    }
  }

  return points;
};

const pointAtPathProgress = (d: string, progress: number) => {
  const points = parsePath(d);

  if (points.length <= 1) {
    return points[0] ?? {x: 0, y: 0};
  }

  const segments = points.slice(1).map((point, index) => {
    const previous = points[index];
    const length = Math.abs(point.x - previous.x) + Math.abs(point.y - previous.y);
    return {from: previous, to: point, length};
  });

  const totalLength = segments.reduce((sum, segment) => sum + segment.length, 0);
  const target = clamp01(progress) * totalLength;
  let travelled = 0;

  for (const segment of segments) {
    if (travelled + segment.length >= target) {
      const local = segment.length === 0 ? 0 : (target - travelled) / segment.length;
      return {
        x: mix(local, segment.from.x, segment.to.x),
        y: mix(local, segment.from.y, segment.to.y)
      };
    }

    travelled += segment.length;
  }

  return segments[segments.length - 1]?.to ?? points[points.length - 1];
};

const phaseStrength = (progress: number, start: number, end: number) => {
  if (progress < start || progress > end) {
    return 0;
  }

  const local = (progress - start) / (end - start);
  return Math.sin(local * Math.PI);
};

const routeProgress = (progress: number, route: SceneRoute, index: number) => {
  const spacing = route.spacing ?? 0.16;

  if (route.mode === "loop") {
    if (progress < route.start || progress > route.end) {
      return null;
    }

    const local = (progress - route.start) / (route.end - route.start);
    const progressed = local * (route.laps || 1) - index * spacing;
    const wrapped = progressed - Math.floor(progressed);
    return route.reverse ? 1 - wrapped : wrapped;
  }

  const local = clamp01((progress - route.start) / (route.end - route.start));
  const eased = local < 0.5 ? 4 * local * local * local : 1 - Math.pow(-2 * local + 2, 3) / 2;
  const shifted = eased - index * spacing;

  if (shifted < 0 || shifted > 1) {
    return null;
  }

  return route.reverse ? 1 - shifted : shifted;
};

const routeVisibility = (progress: number, route: SceneRoute) => {
  if (route.mode === "loop") {
    return progress >= route.start && progress <= route.end ? 0.58 : 0;
  }

  const duration = route.end - route.start;
  return (
    clamp01((progress - route.start) / duration) *
    clamp01((route.end - progress) / duration) *
    4
  );
};

const findActivePhase = (scene: StructureSceneConfig, progress: number) =>
  scene.phases.find((phase) => progress >= phase.start && progress < phase.end) ??
  scene.phases[scene.phases.length - 1];

const nodeShapeStyle = (node: SceneNode, active: number): React.CSSProperties => {
  const tone = toneStyles[node.tone ?? "neutral"];
  const width = node.width ?? 220;
  const height = node.height ?? 70;
  const shape = node.shape ?? "terminal";
  const common: React.CSSProperties = {
    width,
    height,
    border: `1px solid ${tone.border}`,
    background: tone.bg,
    color: tokens.colors.title,
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "0 16px 0 14px",
    boxShadow: `0 6px 18px rgba(41,40,48,${mix(active, 0.04, 0.12)}), 0 1px 2px rgba(41,40,48,0.05)`,
    position: "relative",
    overflow: "hidden"
  };

  if (shape === "signal") {
    return {...common, borderRadius: 12};
  }

  if (shape === "panel") {
    return {
      ...common,
      borderRadius: 18,
      background: "linear-gradient(180deg, rgba(245,240,255,0.98), rgba(236,231,248,0.96))",
      boxShadow: `0 12px 28px rgba(100,79,184,${mix(active, 0.06, 0.14)}), 0 8px 18px rgba(41,40,48,0.08)`
    };
  }

  if (shape === "box") {
    return {...common, borderRadius: 14};
  }

  if (shape === "beam") {
    return {...common, borderRadius: 14, background: "#f4f1ea"};
  }

  if (shape === "bundle") {
    return {
      ...common,
      borderRadius: 14,
      background: "#f4f1ea",
      boxShadow: `10px 10px 0 -8px #f4f1ea, 16px 16px 0 -13px #ede8df, 0 6px 18px rgba(41,40,48,0.08)`
    };
  }

  if (shape === "rail") {
    return {
      ...common,
      borderRadius: 16,
      fontFamily: tokens.fonts.mono,
      fontSize: 13,
      background: "#f6f3ee"
    };
  }

  return {...common, borderRadius: 16};
};

export const StructureScene: React.FC<{scene: StructureSceneConfig}> = ({scene}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const progress = durationInFrames <= 1 ? 0 : frame / (durationInFrames - 1);
  const phase = findActivePhase(scene, progress);
  const pageIntro = clamp01(frame / 16);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${tokens.colors.canvas} 0%, ${tokens.colors.canvasAlt} 100%)`,
        fontFamily: tokens.fonts.body
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 28% 18%, rgba(100,79,184,0.10) 0%, rgba(100,79,184,0.02) 22%, transparent 42%), radial-gradient(circle at 76% 72%, rgba(100,79,184,0.08) 0%, rgba(100,79,184,0.02) 20%, transparent 40%)"
        }}
      />

      <div
        style={{
          position: "absolute",
          left: PAGE.x,
          top: PAGE.y,
          width: PAGE.width,
          height: PAGE.height,
          borderRadius: 36,
          overflow: "hidden",
          border: `1px solid ${tokens.colors.panelBorder}`,
          background: tokens.colors.canvas,
          boxShadow: "0 36px 80px rgba(41,40,48,0.14), 0 10px 24px rgba(41,40,48,0.06)",
          transform: `translateY(${mix(pageIntro, 22, 0)}px) scale(${mix(pageIntro, 0.985, 1)})`,
          opacity: pageIntro
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(214,208,202,0.72) 1px, transparent 1px), linear-gradient(to bottom, rgba(214,208,202,0.72) 1px, transparent 1px)",
            backgroundSize: "84px 84px",
            opacity: 0.32
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: -120,
            background:
              "radial-gradient(circle at 42% 38%, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.18) 26%, transparent 48%)"
          }}
        />

        <svg
          viewBox="0 0 1600 900"
          style={{position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible"}}
        >
          <defs>
            <marker id={`arrow-${scene.id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#7d7797" fillOpacity="0.6" />
            </marker>
          </defs>

          {scene.edges.map((edge) => (
            <path
              key={edge.id}
              d={edge.d}
              fill="none"
              stroke="#7d7797"
              strokeWidth={edge.weight}
              strokeLinecap="square"
              strokeLinejoin="miter"
              markerEnd={`url(#arrow-${scene.id})`}
              opacity={0.94}
            />
          ))}

          {scene.routes.map((route, routeIndex) => {
            const d = route.path ?? scene.edges.find((edge) => edge.id === route.pathRef)?.d;

            if (!d) {
              return null;
            }

            const glowOpacity = routeVisibility(progress, route);

            return (
              <React.Fragment key={`${route.pathRef ?? routeIndex}`}>
                <path
                  d={d}
                  fill="none"
                  stroke="rgba(100,79,184,0.40)"
                  strokeWidth={(route.radius ?? 5) * 2.6}
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  opacity={glowOpacity}
                />
                {Array.from({length: route.count ?? 2}).map((_, index) => {
                  const routePoint = routeProgress(progress, route, index);

                  if (routePoint == null) {
                    return null;
                  }

                  const point = pointAtPathProgress(d, routePoint);
                  const radius = route.radius ?? 5;

                  return (
                    <g key={index} transform={`translate(${point.x} ${point.y})`}>
                      <circle r={radius * 2.8} fill="rgba(100,79,184,0.16)" />
                      <circle r={radius} fill={tokens.colors.primary} />
                    </g>
                  );
                })}
              </React.Fragment>
            );
          })}
        </svg>

        {scene.ornaments.map((ornament, index) => {
          const tone = toneStyles[ornament.tone];
          const swayX = Math.sin(progress * Math.PI * 2 + index * 0.8) * 1.6;
          const swayY = Math.cos(progress * Math.PI * 2 + index * 0.6) * 1.2;
          return (
            <div
              key={`${ornament.kind}-${index}`}
              style={{
                position: "absolute",
                left: ornament.x,
                top: ornament.y,
                width: ornament.w,
                height: ornament.h,
                transform: `translate(-50%, -50%) translate(${swayX}px, ${swayY}px)`,
                borderRadius: 14,
                border: `1px solid ${ornament.tone === "primary" ? "rgba(100,79,184,0.18)" : "#e8e2d8"}`,
                background: ornament.tone === "primary" ? "rgba(236,231,248,0.22)" : "rgba(255,255,255,0.18)",
                boxShadow: ornament.tone === "primary" ? "inset 0 0 0 1px rgba(255,255,255,0.32)" : "none"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 18,
                  right: 18,
                  top: 48,
                  height: 1,
                  background: "rgba(212,208,202,0.96)"
                }}
              />
              {ornament.label ? (
                <div
                  style={{
                    position: "absolute",
                    left: 16,
                    top: 14,
                    minHeight: 22,
                    padding: "0 10px",
                    borderRadius: 8,
                    border: `1px solid ${tone.border}`,
                    background: tokens.colors.panel,
                    color: tokens.colors.muted,
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: tokens.fonts.mono,
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                    display: "inline-flex",
                    alignItems: "center"
                  }}
                >
                  {ornament.label}
                </div>
              ) : null}
            </div>
          );
        })}

        {scene.nodes.map((node, index) => {
          const active = (node.activity ?? []).reduce(
            (max, window) => Math.max(max, phaseStrength(progress, window[0], window[1])),
            0
          );
          const driftX = Math.sin(progress * Math.PI * 2 + index * 1.2) * 1.2;
          const driftY = Math.cos(progress * Math.PI * 2 + index * 0.9) * 1.6;

          return (
            <div
              key={node.id}
              style={{
                position: "absolute",
                left: node.x,
                top: node.y,
                transform: `translate(-50%, -50%) translate(${driftX}px, ${driftY}px) scale(${1 + active * 0.018})`,
                opacity: 0.94 + active * 0.06
              }}
            >
              <div style={nodeShapeStyle(node, active)}>
                {node.icon ? (
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: "0 0 auto",
                      fontFamily: tokens.fonts.mono,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      background: node.iconVariant === "accent" ? tokens.colors.primaryTintBg : "#4c4b69",
                      color: node.iconVariant === "accent" ? tokens.colors.primary : "#ffffff"
                    }}
                  >
                    {node.icon}
                  </div>
                ) : null}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: mix(active, 38, 140),
                    height: 3,
                    borderBottomLeftRadius: 999,
                    borderBottomRightRadius: 999,
                    background: node.tone === "primary" ? "rgba(100,79,184,0.72)" : "rgba(100,79,184,0.20)"
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    fontSize: node.shape === "rail" ? 14 : 16,
                    fontWeight: 600,
                    letterSpacing: "-0.03em",
                    color: tokens.colors.title,
                    whiteSpace: "nowrap"
                  }}
                >
                  {node.label}
                </div>
              </div>
            </div>
          );
        })}

        <div
          style={{
            position: "absolute",
            left: 34,
            top: 28,
            right: 34,
            display: "flex",
            alignItems: "flex-start",
            zIndex: 4
          }}
        >
          <div style={{maxWidth: 760}}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                minHeight: 38,
                padding: "0 16px",
                borderRadius: 999,
                border: `1px solid ${tokens.colors.panelBorder}`,
                background: tokens.colors.panel,
                color: tokens.colors.primary,
                fontSize: 12,
                fontWeight: 600,
                boxShadow: "0 1px 2px rgba(41,40,48,0.03)"
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: tokens.colors.primary
                }}
              />
              {scene.kicker}
            </div>
            <div
              style={{
                marginTop: 16,
                fontSize: 54,
                lineHeight: 1,
                letterSpacing: "-0.07em",
                color: tokens.colors.title,
                fontWeight: 600,
                maxWidth: 760
              }}
            >
              {scene.title}
            </div>
            <div
              style={{
                marginTop: 14,
                maxWidth: 720,
                fontSize: 20,
                lineHeight: 1.5,
                color: "#667085"
              }}
            >
              {scene.copy}
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 34,
            bottom: 36,
            display: "flex",
            alignItems: "center",
            gap: 16,
            zIndex: 4
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              minHeight: 36,
              padding: "0 14px",
              borderRadius: 999,
              border: `1px solid ${tokens.colors.primaryTintBorder}`,
              background: tokens.colors.primaryTintBg,
              color: tokens.colors.primary,
              fontSize: 13,
              fontWeight: 700,
              fontFamily: tokens.fonts.mono
            }}
          >
            {phase.label}
          </div>
          <div
            style={{
              maxWidth: 500,
              fontSize: 14,
              lineHeight: 1.55,
              color: tokens.colors.muted
            }}
          >
            {phase.copy}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 34,
            bottom: 34,
            display: "flex",
            alignItems: "center",
            gap: 12,
            zIndex: 4
          }}
        >
          <img src={staticFile("logo-mark-black.svg")} style={{width: 30, height: 30}} />
          <div
            style={{
              fontSize: 24,
              letterSpacing: "-0.05em",
              color: tokens.colors.title,
              fontWeight: 500
            }}
          >
            Lucius
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
