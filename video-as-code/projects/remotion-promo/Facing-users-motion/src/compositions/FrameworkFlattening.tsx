import React from "react";
import {staticFile, useCurrentFrame} from "remotion";
import {SceneFrame, StageShell} from "../components/SceneFrame";
import {clamp01, floatProgress, mix, mixColor, ramp} from "../motion/primitives";
import {tokens} from "../theme/tokens";

type Point = {
  x: number;
  y: number;
};

type StatusTone = "idle" | "checking" | "resolved" | "needs-context" | "needs-handoff";

const legacyRows = [
  {count: 1, y: 150},
  {count: 2, y: 202},
  {count: 4, y: 258},
  {count: 6, y: 318}
] as const;

const sourceNodes = [
  {code: "DOC", label: "DOC", x: 680},
  {code: "CRM", label: "CRM", x: 770},
  {code: "CMTY", label: "CMTY", x: 860},
  {code: "FAQ", label: "FAQ", x: 950},
  {code: "EXP", label: "EXP", x: 1040}
] as const;

const pointOnPolyline = (points: readonly Point[], progress: number) => {
  if (points.length <= 1) {
    return points[0] ?? {x: 0, y: 0};
  }

  const clamped = clamp01(progress);
  const segments = points.slice(1).map((point, index) => {
    const previous = points[index];
    const length = Math.hypot(point.x - previous.x, point.y - previous.y);
    return {from: previous, to: point, length};
  });

  const totalLength = segments.reduce((sum, segment) => sum + segment.length, 0);
  const target = clamped * totalLength;
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

const statusTheme = (tone: StatusTone) => {
  switch (tone) {
    case "checking":
      return {
        bg: "rgba(236,231,248,0.98)",
        border: tokens.colors.primaryTintBorder,
        text: tokens.colors.primary
      };
    case "resolved":
      return {
        bg: "rgba(220,252,231,0.98)",
        border: tokens.colors.successBorder,
        text: tokens.colors.successText
      };
    case "needs-context":
      return {
        bg: "rgba(254,243,199,0.98)",
        border: tokens.colors.warningBorder,
        text: tokens.colors.warningText
      };
    case "needs-handoff":
      return {
        bg: "rgba(225,218,192,0.98)",
        border: "rgba(27,64,56,0.22)",
        text: tokens.colors.deepMoss
      };
    case "idle":
    default:
      return {
        bg: "rgba(255,255,255,0.96)",
        border: "rgba(214,208,221,0.96)",
        text: tokens.colors.muted
      };
  }
};

const laneChipStyle = (accent = false): React.CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  minHeight: 26,
  padding: "0 12px",
  borderRadius: 999,
  border: `1px solid ${accent ? tokens.colors.primaryTintBorder : "rgba(214,208,221,0.9)"}`,
  background: accent ? "rgba(245,241,255,0.98)" : "rgba(255,255,255,0.94)",
  color: accent ? tokens.colors.primary : tokens.colors.muted,
  fontFamily: tokens.fonts.mono,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.04em",
  textTransform: "uppercase"
});

const LegacyNode: React.FC<{
  active: number;
  scale?: number;
}> = ({active, scale = 1}) => {
  return (
    <div
      style={{
        width: 36 * scale,
        height: 36 * scale,
        borderRadius: "50%",
        background: mixColor(active, "rgba(249,247,241,0.98)", "rgba(242,236,226,0.98)"),
        border: `1px solid ${mixColor(active, "rgba(198,189,176,0.58)", "rgba(183,171,155,0.92)")}`,
        boxShadow: `0 10px 20px rgba(90,78,64,${mix(active, 0.02, 0.08)})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${mix(active, 0.92, 1)})`
      }}
    >
      <div
        style={{
          width: 11 * scale,
          height: 11 * scale,
          borderRadius: "50%",
          background: mixColor(active, "rgba(185,173,156,0.72)", "rgba(145,125,109,0.92)")
        }}
      />
    </div>
  );
};

const RoutePulse: React.FC<{
  points: readonly Point[];
  progress: number;
  color: string;
  radius?: number;
  visible?: number;
}> = ({points, progress, color, radius = 5, visible = 1}) => {
  const clamped = clamp01(progress);

  if (clamped <= 0.01 || clamped >= 0.99 || visible <= 0.01) {
    return null;
  }

  const point = pointOnPolyline(points, clamped);

  return (
    <div
      style={{
        position: "absolute",
        left: point.x,
        top: point.y,
        width: radius * 6,
        height: radius * 6,
        marginLeft: -radius * 3,
        marginTop: -radius * 3,
        pointerEvents: "none",
        opacity: visible
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: radius * 4.4,
          height: radius * 4.4,
          marginLeft: -radius * 2.2,
          marginTop: -radius * 2.2,
          borderRadius: "50%",
          background: `${color}22`
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: radius * 2,
          height: radius * 2,
          marginLeft: -radius,
          marginTop: -radius,
          borderRadius: "50%",
          background: color
        }}
      />
    </div>
  );
};

const SourceIngress: React.FC<{
  code: string;
  x: number;
  active: number;
  frame: number;
}> = ({code, x, active, frame}) => {
  const floatY = floatProgress(frame, 1.8, 100, x);

  return (
    <div
      style={{
        position: "absolute",
        left: x - 24,
        top: 74 + mix(active, 10, 0) + floatY,
        width: 48,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: active
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(236,231,248,0.98)",
          border: `1px solid ${tokens.colors.primaryTintBorder}`,
          color: tokens.colors.primary,
          fontFamily: tokens.fonts.mono,
          fontSize: code.length > 3 ? 10 : 11,
          fontWeight: 700,
          letterSpacing: "0.04em",
          boxShadow: `0 12px 24px rgba(100,79,184,${mix(active, 0.02, 0.08)})`
        }}
      >
        {code}
      </div>
    </div>
  );
};

const StatusCard: React.FC<{
  title: string;
  state: StatusTone;
  progress: number;
  x: number;
}> = ({title, state, progress, x}) => {
  const theme = statusTheme(state);

  return (
    <div
      style={{
        position: "absolute",
        left: x - 40,
        top: 380 + mix(progress, 12, 0),
        width: 80,
        minHeight: 56,
        padding: "8px 8px 8px",
        borderRadius: 16,
        border: `1px solid ${theme.border}`,
        background: theme.bg,
        boxShadow: `0 10px 18px rgba(41,40,48,${mix(progress, 0.02, 0.06)})`,
        opacity: progress
      }}
    >
      <div
        style={{
          color: tokens.colors.title,
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.03em",
          textTransform: "uppercase",
          textAlign: "center"
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 6,
          padding: "5px 4px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.62)",
          color: theme.text,
          fontFamily: tokens.fonts.mono,
          fontSize: state === "needs-context" || state === "needs-handoff" ? 8 : 9,
          fontWeight: 700,
          letterSpacing: "0.03em",
          textTransform: "uppercase",
          textAlign: "center"
        }}
      >
        {state === "needs-context"
          ? "Needs context"
          : state === "needs-handoff"
            ? "Needs handoff"
            : state === "checking"
              ? "Checking"
              : state === "resolved"
                ? "Resolved"
                : "Idle"}
      </div>
    </div>
  );
};

const InlineLuciusNode: React.FC<{
  reveal: number;
  x: number;
  y: number;
}> = ({reveal, x, y}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x - 34,
        top: y - 34 + mix(reveal, 14, 0),
        width: 68,
        height: 68,
        borderRadius: "50%",
        border: `1px solid ${tokens.colors.primaryTintBorder}`,
        background: "linear-gradient(180deg, rgba(245,241,255,0.98), rgba(255,255,255,0.94))",
        boxShadow: `0 18px 34px rgba(100,79,184,${mix(reveal, 0.03, 0.09)}), 0 8px 18px rgba(41,40,48,0.05)`,
        opacity: reveal,
        transform: `scale(${mix(reveal, 0.88, 1)})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: "50%",
          border: `1px solid ${tokens.colors.primaryTintBorder}`,
          background: "rgba(255,255,255,0.78)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <img src={staticFile("logo-mark-black.svg")} style={{width: 24, height: 24}} />
      </div>
    </div>
  );
};

export const FrameworkFlattening: React.FC = () => {
  const frame = useCurrentFrame();

  const legacyReveal = ramp(frame, 28, 120);
  const pivotReveal = ramp(frame, 72, 142);
  const networkReveal = ramp(frame, 110, 192);
  const bridgeProgress = ramp(frame, 140, 218);
  const settleProgress = ramp(frame, 336, 430);
  const legacyDim = mix(settleProgress, 1, 0.58);
  const phaseTwoCopy = ramp(frame, 356, 430);
  const routerSweep = ramp(frame, 184, 308);
  const resolveSweep = ramp(frame, 352, 430);

  const pivotCenter = {x: 424, y: 270} as const;
  const routePath = [
    {x: 246, y: 270},
    {x: 742, y: 270}
  ] as const;

  return (
    <SceneFrame
      frame={frame}
      kicker="Facing users / Framework flattening"
      title="Flatten the stack. Route context to the edge."
      copy="Legacy support passes through layers. Lucius pulls docs, CRM, community and expert context into one routing core, then fans out one grounded state."
    >
      <StageShell
        label="Lucius edge routing"
        style={{
          left: 6,
          top: 6,
          width: 1208,
          height: 606
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 288,
            top: 60,
            bottom: 58,
            width: 1,
            background: "rgba(214,208,221,0.82)"
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 556,
            top: 60,
            bottom: 58,
            width: 1,
            background: "rgba(214,208,221,0.82)"
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 44,
            top: 76,
            width: 210,
            opacity: legacyReveal * legacyDim
          }}
        >
          <div style={laneChipStyle(false)}>Legacy lane</div>
          <div
            style={{
              marginTop: 14,
              color: tokens.colors.title,
              fontSize: 28,
              lineHeight: 1.04,
              letterSpacing: "-0.05em",
              fontWeight: 600
            }}
          >
            Layered relay.
            <br />
            Signal loses shape.
          </div>
          <div
            style={{
              marginTop: 12,
              color: tokens.colors.muted,
              fontSize: 14,
              lineHeight: 1.38
            }}
          >
            Messages pass through handoffs, management layers and manual relays before they reach the edge.
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 52,
            top: 198,
            width: 204,
            height: 230,
            opacity: legacyDim
          }}
        >
          {legacyRows.map((row, rowIndex) => {
            const rowReveal = ramp(frame, 32 + rowIndex * 18, 72 + rowIndex * 18) * legacyDim;

            return (
              <React.Fragment key={row.count}>
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: row.y,
                    width: 196,
                    marginLeft: -98,
                    display: "flex",
                    justifyContent: "center",
                    gap: row.count === 1 ? 0 : 28,
                    opacity: rowReveal,
                    transform: `translateY(${mix(rowReveal, 18, 0)}px)`
                  }}
                >
                  {Array.from({length: row.count}).map((_, index) => (
                    <LegacyNode key={index} active={rowReveal} scale={rowIndex === 0 ? 0.92 : 1} />
                  ))}
                </div>
                {rowIndex < legacyRows.length - 1 ? (
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: row.y + 38,
                      width: 1,
                      height: 26,
                      marginLeft: -0.5,
                      background:
                        "repeating-linear-gradient(to bottom, rgba(180,166,148,0.88) 0 5px, transparent 5px 10px)",
                      opacity: rowReveal
                    }}
                  />
                ) : null}
              </React.Fragment>
            );
          })}
        </div>

        <div
          style={{
            position: "absolute",
            left: 44,
            bottom: 58,
            width: 220,
            padding: "13px 14px 12px",
            borderRadius: 20,
            border: "1px solid rgba(213,202,189,0.94)",
            background: "linear-gradient(180deg, rgba(249,247,241,0.98), rgba(244,241,233,0.96))",
            boxShadow: "0 14px 28px rgba(74,68,54,0.06)",
            opacity: legacyReveal * legacyDim
          }}
        >
          <div
            style={{
              color: "rgba(111,91,74,0.88)",
              fontFamily: tokens.fonts.mono,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase"
            }}
          >
            Signal loss
          </div>
          <div
            style={{
              marginTop: 8,
              color: tokens.colors.title,
              fontSize: 14,
              lineHeight: 1.24,
              letterSpacing: "-0.02em",
              fontWeight: 600
            }}
          >
            More layers mean slower routing, thinner context and less precision at the edge.
          </div>
        </div>

        {sourceNodes.map((node, index) => (
          <SourceIngress
            key={node.code}
            code={node.code}
            x={node.x}
            active={ramp(frame, 112 + index * 12, 168 + index * 12)}
            frame={frame}
          />
        ))}

        <div
          style={{
            position: "absolute",
            left: 742,
            top: 220 + mix(networkReveal, 18, 0),
            width: 228,
            height: 92,
            opacity: networkReveal
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: -28,
              transform: "translateX(-50%)",
              ...laneChipStyle(true)
            }}
          >
            Grounding core
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 999,
              background: `linear-gradient(180deg, rgba(245,241,255,0.98), rgba(255,255,255,0.96)), radial-gradient(circle at 50% 50%, ${mixColor(
                resolveSweep,
                "rgba(236,231,248,0.34)",
                "rgba(100,79,184,0.16)"
              )} 0%, rgba(236,231,248,0.18) 52%, rgba(236,231,248,0.02) 100%)`,
              border: `1px solid ${tokens.colors.primaryTintBorder}`,
              boxShadow: `0 22px 42px rgba(100,79,184,${mix(networkReveal, 0.03, 0.08)}), 0 8px 16px rgba(41,40,48,0.04)`
            }}
          />
          <div
            style={{
              position: "absolute",
              left: mix(routerSweep, -54, 228),
              top: 14,
              width: 90,
              height: 64,
              borderRadius: 999,
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.14) 18%, rgba(255,255,255,0.72) 50%, rgba(255,255,255,0.14) 82%, rgba(255,255,255,0) 100%)",
              opacity: routerSweep > 0.02 && routerSweep < 0.98 ? 0.52 : 0,
              pointerEvents: "none"
            }}
          />

          {[0, 1, 2].map((index) => {
            const nodeReveal = ramp(frame, 170 + index * 14, 214 + index * 14);
            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: 24 + index * 64,
                  top: 16,
                  width: 54,
                  height: 54,
                  borderRadius: "50%",
                  background: "#253b57",
                  boxShadow: `0 16px 28px rgba(31,53,80,${mix(nodeReveal, 0.08, 0.2)})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: mixColor(nodeReveal, "rgba(236,231,248,0.88)", tokens.colors.primary),
                    color: nodeReveal > 0.64 ? "#fff" : tokens.colors.primary,
                    fontFamily: tokens.fonts.mono,
                    fontSize: 10,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {index === 1 ? "AI" : ""}
                </div>
              </div>
            );
          })}
        </div>

        {sourceNodes.map((node, index) => {
          const sourceProgress = ramp(frame, 220 + index * 12, 264 + index * 12);
          const outboundProgress = ramp(frame, 352 + index * 8, 396 + index * 8);
          const cardReveal = ramp(frame, 248 + index * 12, 300 + index * 12);
          const finalResolved = frame >= 366 + index * 8;

          let phaseOneState: StatusTone = "idle";
          if (frame >= 238 + index * 12) {
            phaseOneState =
              index === 0
                ? "checking"
                : index === 1
                  ? "resolved"
                  : index === 2
                    ? "needs-context"
                    : index === 3
                      ? "checking"
                      : "needs-handoff";
          }

          const state: StatusTone = finalResolved ? "resolved" : phaseOneState;

          return (
            <StatusCard
              key={node.code}
              title={node.code}
              state={state}
              progress={cardReveal}
              x={node.x}
            />
          );
        })}

        <div
          style={{
            position: "absolute",
            left: 724,
            bottom: 72,
            width: 264,
            opacity: networkReveal
          }}
        >
          <div
            style={{
              color: mixColor(phaseTwoCopy, tokens.colors.muted, tokens.colors.primary),
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              textAlign: "center"
            }}
          >
            {phaseTwoCopy < 0.4 ? "Every edge stays connected to the same core." : "One grounded route reaches every edge."}
          </div>
        </div>

        <svg viewBox="0 0 1208 606" style={{position: "absolute", inset: 0, overflow: "visible"}}>
          <polyline
            points={routePath.map((point) => `${point.x},${point.y}`).join(" ")}
            fill="none"
            stroke="rgba(125,119,151,0.22)"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <polyline
            points={routePath.map((point) => `${point.x},${point.y}`).join(" ")}
            fill="none"
            stroke="rgba(100,79,184,0.48)"
            strokeWidth={4.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={bridgeProgress}
          />

          {sourceNodes.map((node, index) => {
            const sourcePath = [
              {x: node.x, y: 152},
              {x: node.x, y: 226}
            ] as const;
            const statusPath = [
              {x: node.x, y: 318},
              {x: node.x, y: 374}
            ] as const;

            return (
              <React.Fragment key={node.code}>
                <polyline
                  points={sourcePath.map((point) => `${point.x},${point.y}`).join(" ")}
                  fill="none"
                  stroke="rgba(125,119,151,0.22)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points={statusPath.map((point) => `${point.x},${point.y}`).join(" ")}
                  fill="none"
                  stroke="rgba(125,119,151,0.22)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points={sourcePath.map((point) => `${point.x},${point.y}`).join(" ")}
                  fill="none"
                  stroke="rgba(100,79,184,0.42)"
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={ramp(frame, 184 + index * 12, 232 + index * 12)}
                />
                <polyline
                  points={statusPath.map((point) => `${point.x},${point.y}`).join(" ")}
                  fill="none"
                  stroke="rgba(92,158,107,0.46)"
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={ramp(frame, 350 + index * 8, 396 + index * 8)}
                />
              </React.Fragment>
            );
          })}
        </svg>

        <InlineLuciusNode reveal={pivotReveal} x={pivotCenter.x} y={pivotCenter.y} />

        <RoutePulse points={routePath} progress={bridgeProgress} color={tokens.colors.primary} radius={5.2} />

        {sourceNodes.map((node, index) => {
          const sourcePath = [
            {x: node.x, y: 152},
            {x: node.x, y: 226}
          ] as const;
          const statusPath = [
            {x: node.x, y: 318},
            {x: node.x, y: 374}
          ] as const;

          return (
            <React.Fragment key={`pulse-${node.code}`}>
              <RoutePulse
                points={sourcePath}
                progress={ramp(frame, 188 + index * 12, 236 + index * 12)}
                color={tokens.colors.primary}
                radius={4.6}
              />
              <RoutePulse
                points={statusPath}
                progress={ramp(frame, 352 + index * 8, 396 + index * 8)}
                color={tokens.colors.successText}
                radius={4.8}
              />
            </React.Fragment>
          );
        })}
      </StageShell>
    </SceneFrame>
  );
};

export default FrameworkFlattening;
