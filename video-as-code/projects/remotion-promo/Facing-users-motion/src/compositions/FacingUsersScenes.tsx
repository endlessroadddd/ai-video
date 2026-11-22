import React from "react";
import {Img, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import {clamp01, mix, mixColor, ramp} from "../motion/primitives";
import {SceneFrame, StageShell} from "../components/SceneFrame";
import {structureScenes} from "../structure/scenes";
import {tokens} from "../theme/tokens";

const loopWave = (frame: number, speed = 120, offset = 0) =>
  (Math.sin(((frame + offset) / speed) * Math.PI * 2) + 1) / 2;

const parsePath = (d: string) => {
  const tokensRaw = d.match(/[A-Z]|-?\\d*\\.?\\d+/g) ?? [];
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

const pointOnPolyline = (points: Array<{x: number; y: number}>, progress: number) => {
  if (points.length <= 1) {
    return points[0] ?? {x: 0, y: 0};
  }

  const segments = points.slice(1).map((point, index) => {
    const previous = points[index];
    const length = Math.hypot(point.x - previous.x, point.y - previous.y);
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

const chipStyle = (active = 0, accent = false): React.CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  minHeight: 24,
  padding: "0 10px",
  borderRadius: 999,
  border: `1px solid ${accent ? tokens.colors.primaryTintBorder : "rgba(214,208,221,0.96)"}`,
  background: accent ? "rgba(245,241,255,0.96)" : "rgba(255,255,255,0.94)",
  color: accent ? tokens.colors.primary : tokens.colors.muted,
  fontFamily: tokens.fonts.mono,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  boxShadow: `0 1px 2px rgba(41,40,48,${mix(active, 0.02, 0.06)})`
});

type NodeCardProps = {
  x: number;
  y: number;
  width: number;
  height?: number;
  label: string;
  icon: string;
  active?: number;
  accent?: boolean;
  dimmed?: boolean;
  subtle?: boolean;
  children?: React.ReactNode;
};

const NodeCard: React.FC<NodeCardProps> = ({
  x,
  y,
  width,
  height = 72,
  label,
  icon,
  active = 0,
  accent = false,
  dimmed = false,
  subtle = false,
  children
}) => {
  const background = accent
    ? "linear-gradient(180deg, rgba(247,243,255,0.98), rgba(238,232,251,0.98))"
    : subtle
      ? "linear-gradient(180deg, rgba(249,247,241,0.98), rgba(244,241,233,0.98))"
      : "rgba(255,255,255,0.98)";

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        minHeight: height,
        padding: "12px 14px",
        borderRadius: 20,
        border: `1px solid ${accent ? tokens.colors.primaryTintBorder : "rgba(214,208,221,0.96)"}`,
        background,
        boxShadow: accent
          ? `0 18px 38px rgba(100,79,184,${mix(active, 0.06, 0.14)}), 0 8px 18px rgba(41,40,48,0.06)`
          : `0 14px 28px rgba(41,40,48,${mix(active, 0.05, 0.10)}), 0 6px 14px rgba(41,40,48,0.05)`,
        opacity: dimmed ? mix(active, 0.4, 0.88) : 1
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: accent ? tokens.colors.primary : "#4c4b69",
            color: "#fff",
            fontFamily: tokens.fonts.mono,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.04em"
          }}
        >
          {icon}
        </div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: tokens.colors.title,
            letterSpacing: "-0.03em",
            whiteSpace: "nowrap"
          }}
        >
          {label}
        </div>
      </div>
      {children}
    </div>
  );
};

const RouteLayer: React.FC<{
  paths: Array<{d: string; glow: number; width?: number}>;
  pulses?: Array<{d: string; progress: number; radius?: number; visible?: number}>;
}> = ({paths, pulses = []}) => {
  return (
    <svg viewBox="0 0 1120 540" style={{position: "absolute", inset: 0, overflow: "visible"}}>
      {paths.map((path, index) => (
        <React.Fragment key={index}>
          <path
            d={path.d}
            fill="none"
            stroke="rgba(125,119,151,0.24)"
            strokeWidth={path.width ?? 2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={path.d}
            fill="none"
            stroke="rgba(100,79,184,0.48)"
            strokeWidth={(path.width ?? 2) * 2.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={path.glow}
          />
        </React.Fragment>
      ))}

      {pulses.map((pulse, index) => {
        if ((pulse.visible ?? 1) <= 0) {
          return null;
        }

        const point = pointAtPathProgress(pulse.d, pulse.progress);
        const radius = pulse.radius ?? 5;
        return (
          <g key={index} transform={`translate(${point.x} ${point.y})`} opacity={pulse.visible ?? 1}>
            <circle r={radius * 2.8} fill="rgba(100,79,184,0.16)" />
            <circle r={radius} fill={tokens.colors.primary} />
          </g>
        );
      })}
    </svg>
  );
};

const SweepBeam: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  progress: number;
  opacity?: number;
}> = ({x, y, width, height, progress, opacity = 1}) => {
  const visible = progress > 0.02 && progress < 0.98;

  if (!visible) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: x + mix(progress, -width * 0.28, width * 0.9),
        top: y,
        width: Math.max(48, width * 0.22),
        height,
        borderRadius: 999,
        background:
          "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 16%, rgba(255,255,255,0.72) 50%, rgba(255,255,255,0.12) 84%, rgba(255,255,255,0) 100%)",
        opacity,
        pointerEvents: "none"
      }}
    />
  );
};

const PulsePing: React.FC<{
  x: number;
  y: number;
  progress: number;
  radius?: number;
  color?: string;
}> = ({x, y, progress, radius = 6, color = tokens.colors.primary}) => {
  if (progress <= 0.02) {
    return null;
  }

  const wave = mix(progress, 0.6, 1.8);
  return (
    <div
      style={{
        position: "absolute",
        left: x - radius * 3,
        top: y - radius * 3,
        width: radius * 6,
        height: radius * 6,
        pointerEvents: "none"
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: radius * 2.2 * wave,
          height: radius * 2.2 * wave,
          borderRadius: "50%",
          border: `1px solid ${mixColor(progress, "rgba(100,79,184,0.24)", "rgba(100,79,184,0.06)")}`,
          transform: "translate(-50%, -50%)",
          opacity: mix(progress, 0.82, 0)
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: radius * 2,
          height: radius * 2,
          borderRadius: "50%",
          background: color,
          transform: "translate(-50%, -50%)",
          boxShadow: `0 0 0 ${radius * 1.6}px ${mixColor(progress, "rgba(100,79,184,0.10)", "rgba(100,79,184,0.02)")}`
        }}
      />
    </div>
  );
};

export const ReplyPulseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = (p: number) => p * (durationInFrames - 1);

  const inputDock = ramp(frame, t(0.10), t(0.28));
  const engineWake = ramp(frame, t(0.22), t(0.42));
  const processSweep = ramp(frame, t(0.28), t(0.48));
  const moduleBurst = ramp(frame, t(0.46), t(0.58));
  const moduleLive = ramp(frame, t(0.52), t(0.66));
  const replyFlow = ramp(frame, t(0.62), t(0.76));
  const replyReady = ramp(frame, t(0.74), t(0.90));
  const line1 = ramp(frame, t(0.72), t(0.82));
  const line2 = ramp(frame, t(0.76), t(0.86));
  const line3 = ramp(frame, t(0.80), t(0.90));
  const clusterShift = 18;
  const clusterDrop = 18;

  const engineBreath = loopWave(frame, 180, 24);
  const slotBreath = loopWave(frame, 140, 18);
  const moduleBreath = loopWave(frame, 136, 42);
  const replyBreath = loopWave(frame, 160, 44);

  const launchCardProgress = ramp(frame, t(0.08), t(0.22));
  const launchCardFade = ramp(frame, t(0.18), t(0.30), 1, 0);
  const pocketInsert = ramp(frame, t(0.18), t(0.34));
  const externalCardX = mix(launchCardProgress, 52 + clusterShift, 220 + clusterShift);
  const externalCardY = mix(launchCardProgress, 134 + clusterDrop, 180 + clusterDrop);
  const externalCardScale = mix(launchCardProgress, 1, 0.9);
  const pocketCardLeft = mix(pocketInsert, -90, 10);

  const toneX = mix(moduleBurst, 662 + clusterShift, 706 + clusterShift);
  const groundX = mix(moduleBurst, 662 + clusterShift, 706 + clusterShift);
  const topModuleY = 116 + clusterDrop;
  const bottomModuleY = 246 + clusterDrop;
  const moduleWidth = 148;
  const moduleHeight = 58;
  const moduleRightX = toneX + moduleWidth;
  const moduleCenterOffsetY = moduleHeight / 2;
  const topModuleCenterY = topModuleY + moduleCenterOffsetY;
  const bottomModuleCenterY = bottomModuleY + moduleCenterOffsetY;
  const mergeSpineX = 886;
  const mergeCenterY = (topModuleCenterY + bottomModuleCenterY) / 2;
  const replyEntryX = 900;
  const moduleOpacity = mix(moduleBurst, 0, 1);
  const moduleScale = mix(moduleBurst, 0.92, 1);

  const connectorToneMerge = `M${moduleRightX} ${topModuleCenterY} H${mergeSpineX} V${mergeCenterY} H${replyEntryX}`;
  const connectorGroundMerge = `M${moduleRightX} ${bottomModuleCenterY} H${mergeSpineX} V${mergeCenterY} H${replyEntryX}`;
  const connectorReply = `M${replyEntryX} ${mergeCenterY} H${replyEntryX + 16}`;

  return (
    <SceneFrame
      frame={frame}
      kicker={structureScenes.responseEngine.kicker}
      title={structureScenes.responseEngine.title}
      copy={structureScenes.responseEngine.copy}
    >
      <StageShell label="Lucius response engine">
        <RouteLayer
          paths={[
            {d: connectorToneMerge, glow: replyFlow * 0.66},
            {d: connectorGroundMerge, glow: replyFlow * 0.66},
            {d: connectorReply, glow: replyReady * 0.84}
          ]}
          pulses={[
            {d: connectorToneMerge, progress: replyFlow, visible: replyFlow > 0.02 && replyFlow < 0.98 ? 1 : 0},
            {d: connectorGroundMerge, progress: replyFlow, visible: replyFlow > 0.02 && replyFlow < 0.98 ? 1 : 0},
            {d: connectorReply, progress: replyReady, visible: replyReady > 0.02 && replyReady < 0.98 ? 1 : 0}
          ]}
        />

        <div
          style={{
            position: "absolute",
            left: 246 + clusterShift,
            top: 76 + clusterDrop,
            width: 452,
            height: 308,
            borderRadius: 30,
            border: `1px solid ${tokens.colors.primaryTintBorder}`,
            background: "linear-gradient(180deg, rgba(243,238,252,0.98), rgba(255,255,255,0.98))",
            boxShadow: `0 22px 48px rgba(100,79,184,${mix(engineWake, 0.06, 0.14 + engineBreath * 0.02)}), 0 10px 20px rgba(41,40,48,0.06)`
          }}
        >
          <div style={{position: "absolute", left: 22, top: 18, ...chipStyle(engineWake, true)}}>Lucius engine</div>
          <div
            style={{
              position: "absolute",
              left: 24,
              right: 24,
              top: 64,
              height: 1,
              background: "rgba(216,207,242,0.84)"
            }}
          />

          <div
            style={{
              position: "absolute",
              left: 26,
              top: 112,
              width: 164,
              height: 100,
              borderRadius: 22,
              border: `1px solid ${tokens.colors.primaryTintBorder}`,
              background: mixColor(inputDock, "rgba(255,255,255,0.82)", "rgba(245,241,255,0.98)"),
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.82), inset 0 0 0 1px rgba(100,79,184,${mix(inputDock, 0.02, 0.10)}), 0 12px 24px rgba(100,79,184,${mix(inputDock, 0.02, 0.05 + slotBreath * 0.02)})`
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 14,
                top: 12,
                fontFamily: tokens.fonts.mono,
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: mixColor(inputDock, "rgba(100,79,184,0.48)", tokens.colors.primary)
              }}
            >
              Input slot
            </div>
            <div
              style={{
                position: "absolute",
                left: 12,
                top: 42,
                width: 138,
                height: 26,
                borderRadius: 999,
                border: "1px solid rgba(218,211,238,0.82)",
                background: mixColor(
                  pocketInsert,
                  "linear-gradient(180deg, rgba(235,230,247,0.78), rgba(249,246,252,0.42))",
                  "linear-gradient(180deg, rgba(227,220,244,0.94), rgba(244,239,251,0.62))"
                ),
                boxShadow:
                  "inset 0 2px 8px rgba(100,79,184,0.14), inset 0 -1px 3px rgba(255,255,255,0.78)"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: pocketCardLeft,
                  top: 3,
                  width: 82,
                  height: 20,
                  padding: "0 6px",
                  borderRadius: 6,
                  border: "1px solid rgba(214,208,221,0.96)",
                  background: "linear-gradient(180deg, rgba(255,255,255,1), rgba(248,245,239,0.98))",
                  boxShadow: `0 4px 10px rgba(41,40,48,${mix(pocketInsert, 0.02, 0.05)}), inset 0 1px 0 rgba(255,255,255,0.84)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 7
                }}
              >
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 4,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#4c4b69",
                    color: "#fff",
                    fontFamily: tokens.fonts.mono,
                    fontSize: 7,
                    fontWeight: 700
                  }}
                >
                  IN
                </div>
                <div
                  style={{
                    flex: 1,
                    height: 3,
                    borderRadius: 999,
                    background: "rgba(100,79,184,0.16)"
                  }}
                />
              </div>
            </div>
          </div>

          <NodeCard x={214} y={114} width={212} height={88} label="Lucius reasoning" icon="AI" active={engineWake} accent>
            <div
              style={{
                marginTop: 12,
                display: "flex",
                flexDirection: "column",
                gap: 10
              }}
            >
              {[0.62, 0.48, 0.34].map((width, index) => {
                const fill = ramp(frame, t(0.30 + index * 0.03), t(0.50 + index * 0.03));
                return (
                  <div
                    key={index}
                    style={{
                      height: index === 0 ? 10 : 8,
                      borderRadius: 999,
                      background: index === 0 ? "rgba(100,79,184,0.24)" : "rgba(92,88,112,0.14)",
                      width: `${mix(fill, 18, width * 100)}%`
                    }}
                  />
                );
              })}
            </div>
          </NodeCard>

          <SweepBeam x={202 + clusterShift} y={110 + clusterDrop} width={224} height={96} progress={processSweep} opacity={0.74} />

        </div>

        <div
          style={{
            position: "absolute",
            left: externalCardX,
            top: externalCardY,
            width: 220,
            transform: `scale(${externalCardScale})`,
            transformOrigin: "0 50%",
            opacity: launchCardFade,
            zIndex: 6
          }}
        >
          <div
            style={{
              minHeight: 74,
              padding: "12px 14px",
              borderRadius: 20,
              border: "1px solid rgba(214,208,221,0.96)",
              background: "rgba(255,255,255,0.98)",
              boxShadow: `0 16px 30px rgba(41,40,48,${mix(launchCardProgress, 0.05, 0.10)}), 0 6px 14px rgba(41,40,48,0.04)`
            }}
          >
            <div style={{display: "flex", alignItems: "center", gap: 12}}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#4c4b69",
                  color: "#fff",
                  fontFamily: tokens.fonts.mono,
                  fontSize: 10,
                  fontWeight: 700
                }}
              >
                IN
              </div>
              <div style={{fontSize: 14, fontWeight: 600, letterSpacing: "-0.03em", color: tokens.colors.title}}>
                Incoming signal
              </div>
            </div>
            <div style={{marginTop: 8, ...chipStyle(1)}}>user ask</div>
          </div>
        </div>

        {[
          {x: toneX, y: topModuleY, label: "Human tone", icon: "TN", active: moduleLive},
          {x: groundX, y: bottomModuleY, label: "Grounded answer", icon: "CK", active: moduleLive}
        ].map((module) => (
          <div
            key={module.label}
            style={{
              position: "absolute",
              left: module.x,
              top: module.y,
              width: moduleWidth,
              minHeight: moduleHeight,
              padding: "10px 12px",
              borderRadius: 18,
              border: "1px solid rgba(214,208,221,0.96)",
              background: "rgba(255,255,255,0.98)",
              boxShadow: `0 12px 24px rgba(41,40,48,${mix(module.active, 0.03, 0.07 + moduleBreath * 0.015)}), 0 4px 10px rgba(41,40,48,0.04)`,
              opacity: moduleOpacity,
              transform: `scale(${moduleScale})`,
              transformOrigin: "0 50%"
            }}
          >
            <div style={{display: "flex", alignItems: "center", gap: 10}}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 10,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#4c4b69",
                  color: "#fff",
                  fontFamily: tokens.fonts.mono,
                  fontSize: 10,
                  fontWeight: 700
                }}
              >
                {module.icon}
              </div>
              <div style={{fontSize: 14, fontWeight: 600, color: tokens.colors.title, letterSpacing: "-0.03em"}}>
                {module.label}
              </div>
            </div>
            <div
              style={{
                marginTop: 8,
                height: 4,
                borderRadius: 999,
                background: mixColor(module.active, "rgba(100,79,184,0.08)", "rgba(100,79,184,0.22)"),
                transform: `scaleX(${mix(module.active, 0.12, 1)})`,
                transformOrigin: "0% 50%"
              }}
            />
            <PulsePing x={18} y={18} progress={module.active * (0.7 + loopWave(frame, 140, module.y) * 0.3)} radius={3.6} />
          </div>
        ))}

        <div
          style={{
            position: "absolute",
            left: 882 + clusterShift,
            top: 86 + clusterDrop,
            width: 168,
            height: 286,
            padding: "16px 16px 18px",
            borderRadius: 24,
            border: "1px solid rgba(214,207,195,1)",
            background: "linear-gradient(180deg, rgba(249,247,241,1), rgba(244,241,233,1))",
            boxShadow: `0 18px 36px rgba(74,68,54,${mix(replyReady, 0.06, 0.12 + replyBreath * 0.015)}), 0 8px 18px rgba(74,68,54,0.05)`
          }}
        >
          <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <div style={chipStyle(replyReady)}>Reply</div>
            <div style={chipStyle(replyReady, true)}>Ready</div>
          </div>

          <div style={{marginTop: 28, display: "flex", flexDirection: "column", gap: 14}}>
            <div style={{height: 16, borderRadius: 999, background: "rgba(100,79,184,0.24)", transform: `scaleX(${line1})`, transformOrigin: "0% 50%"}} />
            <div style={{height: 10, borderRadius: 999, background: "rgba(92,88,112,0.18)", transform: `scaleX(${line2})`, transformOrigin: "0% 50%"}} />
            <div style={{height: 10, width: "74%", borderRadius: 999, background: "rgba(92,88,112,0.18)", transform: `scaleX(${line3})`, transformOrigin: "0% 50%"}} />
          </div>
          <SweepBeam x={10} y={64} width={122} height={132} progress={replyFlow} opacity={0.56} />
        </div>
        <PulsePing x={replyEntryX} y={mergeCenterY} progress={replyFlow} radius={4.4} />
      </StageShell>
    </SceneFrame>
  );
};
export const FollowupTriggerScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = (p: number) => p * (durationInFrames - 1);

  const s1 = ramp(frame, t(0.14), t(0.24));
  const s2 = ramp(frame, t(0.18), t(0.28));
  const s3 = ramp(frame, t(0.22), t(0.32));
  const core = ramp(frame, t(0.24), t(0.42));
  const a1 = ramp(frame, t(0.48), t(0.60));
  const a2 = ramp(frame, t(0.56), t(0.68));
  const a3 = ramp(frame, t(0.64), t(0.78));
  const coreWave = loopWave(frame, 150, 18);
  const coreSweep = ramp(frame, t(0.30), t(0.52));

  const sourcePaths = [
    "M228 148 H360 V194 H426",
    "M228 252 H426",
    "M228 356 H360 V310 H426"
  ];
  const outputPaths = [
    "M694 252 H754 V136 H806",
    "M694 252 H806",
    "M694 252 H754 V364 H806"
  ];

  return (
    <SceneFrame
      frame={frame}
      kicker={structureScenes.eventTriggerMesh.kicker}
      title={structureScenes.eventTriggerMesh.title}
      copy={structureScenes.eventTriggerMesh.copy}
    >
      <StageShell label="Lucius trigger mesh">
        <RouteLayer
          paths={[
            {d: sourcePaths[0], glow: s1 * 0.8},
            {d: sourcePaths[1], glow: s2 * 0.8},
            {d: sourcePaths[2], glow: s3 * 0.8},
            {d: outputPaths[0], glow: a1 * 0.8},
            {d: outputPaths[1], glow: a2 * 0.8},
            {d: outputPaths[2], glow: a3 * 0.8}
          ]}
          pulses={[
            {d: sourcePaths[0], progress: s1, visible: s1 > 0.02 && s1 < 0.98 ? 1 : 0},
            {d: sourcePaths[1], progress: s2, visible: s2 > 0.02 && s2 < 0.98 ? 1 : 0},
            {d: sourcePaths[2], progress: s3, visible: s3 > 0.02 && s3 < 0.98 ? 1 : 0},
            {d: outputPaths[0], progress: a1, visible: a1 > 0.02 && a1 < 0.98 ? 1 : 0},
            {d: outputPaths[1], progress: a2, visible: a2 > 0.02 && a2 < 0.98 ? 1 : 0},
            {d: outputPaths[2], progress: a3, visible: a3 > 0.02 && a3 < 0.98 ? 1 : 0}
          ]}
        />

        <div style={{position: "absolute", left: 54, top: 110, display: "flex", flexDirection: "column", gap: 18}}>
          {[
            {label: "Silent user", icon: "SIG", active: s1},
            {label: "Anomaly spike", icon: "ALT", active: s2},
            {label: "Cold lead", icon: "CLD", active: s3}
          ].map((signal) => (
            <div
              key={signal.label}
              style={{
                width: 228,
                minHeight: 74,
                padding: "12px 14px",
                borderRadius: 20,
                border: "1px solid rgba(214,208,221,0.96)",
                background: "rgba(255,255,255,0.98)",
                boxShadow: `0 14px 26px rgba(41,40,48,${mix(signal.active, 0.04, 0.10)}), 0 6px 12px rgba(41,40,48,0.04)`,
                display: "flex",
                alignItems: "center",
                gap: 12,
                position: "relative"
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: mixColor(signal.active, "#b7e7d4", "#65bf98"),
                  boxShadow: `0 0 0 ${mix(signal.active, 4, 8)}px rgba(101,191,152,0.16)`
                }}
              />
              <PulsePing x={5} y={5} progress={signal.active * (0.68 + loopWave(frame, 110, signal.label.length * 13) * 0.32)} radius={3.4} color="#65bf98" />
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#4c4b69",
                  color: "#fff",
                  fontFamily: tokens.fonts.mono,
                  fontSize: 11,
                  fontWeight: 700
                }}
              >
                {signal.icon}
              </div>
              <div style={{fontSize: 16, fontWeight: 600, letterSpacing: "-0.03em", color: tokens.colors.title}}>
                {signal.label}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            left: 420,
            top: 98,
            width: 290,
            height: 308
          }}
        >
          {[0, 1, 2].map((ring) => {
            const size = 308 - ring * 58;
            const opacity = mix(core, 0.18 + ring * 0.06, 0.34 + ring * 0.1);
            return (
              <div
                key={ring}
                style={{
                  position: "absolute",
                  left: (290 - size) / 2,
                  top: (308 - size) / 2,
                  width: size,
                  height: size,
                  borderRadius: "50%",
                  border: `1.5px solid rgba(125,119,151,${opacity})`,
                  transform: `scale(${mix(core, 0.96, 1 + ring * 0.02 + coreWave * 0.015)})`
                }}
              />
            );
          })}

          <div
            style={{
              position: "absolute",
              left: 58,
              top: 88,
              width: 174,
              minHeight: 98,
              padding: "16px 16px 18px",
              borderRadius: 24,
              border: `1px solid ${tokens.colors.primaryTintBorder}`,
              background: "linear-gradient(180deg, rgba(243,238,252,0.98), rgba(255,255,255,0.98))",
              boxShadow: `0 18px 36px rgba(100,79,184,${mix(core, 0.06, 0.14)}), 0 8px 18px rgba(41,40,48,0.06)`
            }}
          >
            <div style={chipStyle(core, true)}>Lucius core</div>
            <div
              style={{
                marginTop: 16,
                minHeight: 54,
                padding: "0 14px",
                borderRadius: 18,
                border: `1px solid ${tokens.colors.primaryTintBorder}`,
                background: "rgba(245,241,255,0.98)",
                display: "flex",
                alignItems: "center",
                gap: 12
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 10,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: tokens.colors.primary,
                  color: "#fff",
                  fontFamily: tokens.fonts.mono,
                  fontSize: 10,
                  fontWeight: 700
                }}
              >
                AI
              </div>
              <div style={{fontSize: 15, fontWeight: 600, color: tokens.colors.title, letterSpacing: "-0.03em"}}>
                Lucius detects
              </div>
            </div>
            <SweepBeam x={18} y={50} width={138} height={42} progress={coreSweep} opacity={0.58} />
          </div>
        </div>

        <div style={{position: "absolute", left: 806, top: 80, display: "flex", flexDirection: "column", gap: 18}}>
          {[
            {label: "Follow-up queued", icon: "OUT", active: a1, state: "Queued"},
            {label: "Owner pinged", icon: "NTF", active: a2, state: "Live"},
            {label: "Research queued", icon: "RSH", active: a3, state: "Queued"}
          ].map((action) => (
            <div
              key={action.label}
              style={{
                width: 236,
                minHeight: 88,
                padding: "10px 12px",
                borderRadius: 22,
                border: "1px solid rgba(214,207,195,1)",
                background: "linear-gradient(180deg, rgba(249,247,241,1), rgba(244,241,233,1))",
                boxShadow: `0 16px 32px rgba(74,68,54,${mix(action.active, 0.04, 0.10)}), 0 8px 16px rgba(74,68,54,0.04)`,
                position: "relative"
              }}
            >
              <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12}}>
                <div style={chipStyle(action.active)}>Action</div>
                <div style={chipStyle(action.active, true)}>{action.state}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#4c4b69",
                    color: "#fff",
                    fontFamily: tokens.fonts.mono,
                    fontSize: 10,
                    fontWeight: 700
                  }}
                >
                  {action.icon}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: tokens.colors.title,
                    letterSpacing: "-0.03em"
                  }}
                >
                  {action.label}
                </div>
              </div>
              <div
                style={{
                  marginTop: 10,
                  height: 4,
                  borderRadius: 999,
                  background: mixColor(action.active, "rgba(100,79,184,0.08)", "rgba(100,79,184,0.22)"),
                  transform: `scaleX(${mix(action.active, 0.12, 1)})`,
                  transformOrigin: "0% 50%"
                }}
              />
            </div>
          ))}
        </div>
      </StageShell>
    </SceneFrame>
  );
};
export const WarmHandoffScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = (p: number) => p * (durationInFrames - 1);

  const loopProgress = ramp(frame, t(0.18), t(0.72));
  const learnActive = ramp(frame, t(0.24), t(0.38));
  const memoryActive = ramp(frame, t(0.38), t(0.52));
  const reuseActive = ramp(frame, t(0.52), t(0.66));
  const trust1 = ramp(frame, t(0.72), t(0.82));
  const trust2 = ramp(frame, t(0.80), t(0.90));
  const trust3 = ramp(frame, t(0.88), t(0.98));
  const memorySweep = ramp(frame, t(0.42), t(0.58));
  const trustLink = ramp(frame, t(0.64), t(0.82));
  const memoryWave = loopWave(frame, 170, 26);

  const orbitCx = 396;
  const orbitCy = 252;
  const orbitOuterR = 158;
  const orbitInnerR = 122;
  const orbitCircumference = 2 * Math.PI * orbitOuterR;
  const trustStartX = orbitCx + orbitOuterR;
  const trustPath = `M ${trustStartX} ${orbitCy} H 806`;
  const accentOffset = orbitCircumference * mix(memoryActive, 0.18, 0.08);
  const accentLength = orbitCircumference * 0.32;
  const tokenAngle = mix(loopProgress, Math.PI * 1.02, Math.PI * 3.02);
  const tokenPoint = {
    x: orbitCx + orbitOuterR * Math.cos(tokenAngle),
    y: orbitCy + orbitOuterR * Math.sin(tokenAngle)
  };

  return (
    <SceneFrame
      frame={frame}
      kicker={structureScenes.learningTrustLoop.kicker}
      title={structureScenes.learningTrustLoop.title}
      copy={structureScenes.learningTrustLoop.copy}
      >
        <StageShell label="Lucius learning loop">
          <svg viewBox="0 0 1120 540" style={{position: "absolute", inset: 0, overflow: "visible"}}>
            <circle
              cx={orbitCx}
              cy={orbitCy}
              r={orbitOuterR}
              fill="none"
              stroke="rgba(218,211,238,0.72)"
              strokeWidth={18}
              opacity={0.44}
            />
            <circle
              cx={orbitCx}
              cy={orbitCy}
              r={orbitOuterR}
              fill="none"
              stroke="rgba(125,119,151,0.16)"
              strokeWidth={1.6}
            />
            <circle
              cx={orbitCx}
              cy={orbitCy}
              r={orbitInnerR}
              fill="none"
              stroke="rgba(125,119,151,0.12)"
              strokeWidth={1.4}
              strokeDasharray="4 8"
            />
            <circle
              cx={orbitCx}
              cy={orbitCy}
              r={orbitOuterR}
              fill="none"
              stroke="rgba(100,79,184,0.42)"
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray={`${accentLength} ${orbitCircumference}`}
              strokeDashoffset={accentOffset}
              opacity={mix(memoryActive, 0.22, 0.88)}
              transform={`rotate(-90 ${orbitCx} ${orbitCy})`}
            />
            <path
              d={trustPath}
              fill="none"
              stroke="rgba(125,119,151,0.22)"
              strokeWidth={2}
              strokeLinecap="round"
            />
            <path
              d={trustPath}
              fill="none"
              stroke="rgba(100,79,184,0.34)"
              strokeWidth={3}
              strokeLinecap="round"
              opacity={trustLink * 0.8}
            />
            <g transform={`translate(${tokenPoint.x} ${tokenPoint.y})`} opacity={loopProgress < 0.02 ? 0 : 1}>
              <circle r={11} fill="rgba(100,79,184,0.12)" />
              <circle r={4.5} fill={tokens.colors.primary} />
            </g>
          </svg>

          <div
            style={{
              position: "absolute",
              left: 312,
              top: 200,
              width: 168,
              height: 104,
              borderRadius: 28,
              border: `1px solid ${tokens.colors.primaryTintBorder}`,
              background: "linear-gradient(180deg, rgba(243,238,252,0.98), rgba(255,255,255,0.98))",
              boxShadow: `0 18px 36px rgba(100,79,184,${mix(memoryActive, 0.04, 0.12 + memoryWave * 0.02)}), 0 8px 18px rgba(41,40,48,0.05)`,
              display: "flex",
              alignItems: "center",
            justifyContent: "center"
          }}
          >
            <div
              style={{
                width: 120,
                height: 50,
                borderRadius: 999,
                border: `1px solid ${tokens.colors.primaryTintBorder}`,
                background: "rgba(245,241,255,0.98)",
                color: tokens.colors.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "-0.03em"
              }}
            >
              Memory loop
            </div>
            <SweepBeam x={16} y={28} width={136} height={48} progress={memorySweep} opacity={0.54} />
          </div>

        <NodeCard x={52} y={216} width={164} label="Gap detected" icon="GAP" active={loopProgress} />
        <NodeCard x={308} y={84} width={176} label="Lucius learns" icon="AI" active={learnActive} accent />
        <NodeCard x={572} y={216} width={182} label="Memory updated" icon="DB" active={memoryActive} />
        <NodeCard x={305} y={348} width={182} label="Reusable memory" icon="MEM" active={reuseActive} />

        <div
          style={{
            position: "absolute",
            left: 806,
            top: 96,
            width: 236,
            height: 332,
            borderRadius: 28,
            border: `1px solid ${tokens.colors.primaryTintBorder}`,
            background: "linear-gradient(180deg, rgba(245,241,255,0.92), rgba(255,255,255,0.96))",
            boxShadow: "0 18px 36px rgba(100,79,184,0.08), 0 8px 16px rgba(41,40,48,0.04)"
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 38,
              top: 36,
              bottom: 36,
              width: 2,
              background: "rgba(125,119,151,0.28)"
            }}
          />

          {[
            {label: "Observe", progress: trust1, top: 54},
            {label: "Propose", progress: trust2, top: 148},
            {label: "Execute", progress: trust3, top: 242}
          ].map((step) => (
            <div
              key={step.label}
              style={{
                position: "absolute",
                left: 26,
                right: 20,
                top: step.top,
                display: "flex",
                alignItems: "center",
                gap: 14
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: mixColor(step.progress, "rgba(100,79,184,0.28)", tokens.colors.primary),
                  boxShadow: `0 0 0 ${mix(step.progress, 6, 10)}px rgba(100,79,184,0.12)`
                }}
              />
              <PulsePing x={12} y={12} progress={step.progress * (0.7 + loopWave(frame, 120, step.top) * 0.3)} radius={4} />
              <div
                style={{
                  minHeight: 40,
                  padding: "0 14px",
                  borderRadius: 999,
                  border: "1px solid rgba(214,208,221,0.96)",
                  background: "rgba(255,255,255,0.96)",
                  display: "inline-flex",
                  alignItems: "center",
                  color: tokens.colors.title,
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  boxShadow: `0 10px 22px rgba(41,40,48,${mix(step.progress, 0.02, 0.06)})`
                }}
              >
                {step.label}
              </div>
            </div>
          ))}
        </div>
      </StageShell>
    </SceneFrame>
  );
};

export const NetworkTransformationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = (p: number) => p * (durationInFrames - 1);

  // Animation phases
  const intro = ramp(frame, t(0), t(0.12));
  const hierarchyReveal = ramp(frame, t(0.08), t(0.28));
  const arrowReveal = ramp(frame, t(0.30), t(0.45));
  const networkReveal = ramp(frame, t(0.48), t(0.72));
  const pulseActive = ramp(frame, t(0.68), t(0.92));
  const flowActive = ramp(frame, t(0.75), t(0.95));
  
  const breath = loopWave(frame, 140, 30);
  const flowOffset = (frame % 60) / 60;
  
  // Hierarchy positions (pyramid, 4 levels: 1-2-3-4) - moved left by 20px
  const hierarchyLevels = [
    {level: 0, count: 1, y: 90, opacity: 1},
    {level: 1, count: 2, y: 170, opacity: 0.7},
    {level: 2, count: 3, y: 250, opacity: 0.45},
    {level: 3, count: 4, y: 330, opacity: 0.25}
  ];
  
  // Network positions (6 people around center) - moved right by 20px
  const networkRadius = 150;
  const networkCenterX = 300;
  const networkCenterY = 210;
  const networkNodes = Array.from({length: 6}, (_, i) => {
    const angle = (i * Math.PI * 2) / 6 - Math.PI / 2;
    return {
      x: networkCenterX + networkRadius * Math.cos(angle),
      y: networkCenterY + networkRadius * Math.sin(angle),
      angle
    };
  });

  return (
    <SceneFrame
      frame={frame}
      kicker=""
      title="从层级到网络"
      copy="信息直达每个人"
    >
      <StageShell label="">
        <div style={{position: "absolute", inset: 0, display: "flex", padding: "20px 40px"}}>
          {/* Left side - Hierarchy (Old/Dark) */}
          <div style={{flex: 1, position: "relative", opacity: mix(hierarchyReveal, 0, 1)}}>
            {/* Title above pyramid */}
            <div
              style={{
                position: "absolute",
                left: 100,
                top: 30,
                fontSize: 14,
                fontWeight: 700,
                color: "#9ca3af",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                opacity: intro
              }}
            >
              传统层级
            </div>
            
            {/* Hierarchy pyramid - moved left 20px */}
            <div style={{position: "absolute", left: 60, top: 70, width: 280, height: 360}}>
              {hierarchyLevels.map((level, levelIdx) => {
                const levelDelay = levelIdx * 0.05;
                const levelProgress = ramp(frame, t(0.10 + levelDelay), t(0.24 + levelDelay));
                const levelSpacing = 200 / (level.count + 1);
                
                return Array.from({length: level.count}, (_, nodeIdx) => {
                  const nodeX = 20 + levelSpacing * (nodeIdx + 1) - 20;
                  const nodeY = level.y;
                  const nodeProgress = ramp(frame, t(0.08 + levelDelay + nodeIdx * 0.02), t(0.20 + levelDelay + nodeIdx * 0.02));
                  
                  return (
                    <div
                      key={`h-${levelIdx}-${nodeIdx}`}
                      style={{
                        position: "absolute",
                        left: nodeX,
                        top: nodeY,
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        border: `1.5px solid ${mixColor(nodeProgress, "rgba(156,163,175,0.4)", `rgba(156,163,175,${level.opacity})`)}`,
                        background: "rgba(255,255,255,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: mix(nodeProgress, 0, level.opacity + 0.3),
                        transform: `translateY(${mix(nodeProgress, 15, 0)}px) scale(${mix(nodeProgress, 0.8, 1)})`
                      }}
                    >
                      {/* Person icon - fading color from top to bottom */}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="8" r="3.5" stroke={`rgba(156,163,175,${0.3 + level.opacity * 0.5})`} strokeWidth="1.5" fill="none"/>
                        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke={`rgba(156,163,175,${0.3 + level.opacity * 0.5})`} strokeWidth="1.5" fill="none"/>
                      </svg>
                    </div>
                  );
                });
              })}
              
              {/* Broken/dotted lines between levels - showing information decay */}
              <svg style={{position: "absolute", inset: 0, pointerEvents: "none", opacity: hierarchyReveal * 0.5}}>
                {/* Level 0 to 1 - solid but fading */}
                <line x1="120" y1="130" x2="76" y2="170" stroke="#d1d5db" strokeWidth="1" strokeDasharray="3 3" opacity="0.6"/>
                <line x1="120" y1="130" x2="164" y2="170" stroke="#d1d5db" strokeWidth="1" strokeDasharray="3 3" opacity="0.6"/>
                {/* Level 1 to 2 - more broken */}
                <line x1="76" y1="210" x2="52" y2="250" stroke="#d1d5db" strokeWidth="1" strokeDasharray="2 4" opacity="0.45"/>
                <line x1="76" y1="210" x2="100" y2="250" stroke="#d1d5db" strokeWidth="1" strokeDasharray="2 4" opacity="0.45"/>
                <line x1="164" y1="210" x2="140" y2="250" stroke="#d1d5db" strokeWidth="1" strokeDasharray="2 4" opacity="0.45"/>
                <line x1="164" y1="210" x2="188" y2="250" stroke="#d1d5db" strokeWidth="1" strokeDasharray="2 4" opacity="0.45"/>
                {/* Level 2 to 3 - most broken, barely visible */}
                <line x1="52" y1="290" x2="32" y2="330" stroke="#d1d5db" strokeWidth="1" strokeDasharray="1 5" opacity="0.3"/>
                <line x1="100" y1="290" x2="80" y2="330" stroke="#d1d5db" strokeWidth="1" strokeDasharray="1 5" opacity="0.3"/>
                <line x1="140" y1="290" x2="120" y2="330" stroke="#d1d5db" strokeWidth="1" strokeDasharray="1 5" opacity="0.3"/>
                <line x1="188" y1="290" x2="168" y2="330" stroke="#d1d5db" strokeWidth="1" strokeDasharray="1 5" opacity="0.3"/>
              </svg>
            </div>
            
            {/* Left bottom text - larger, warning color */}
            <div
              style={{
                position: "absolute",
                left: 40,
                bottom: 50,
                display: "flex",
                alignItems: "center",
                gap: 8,
                opacity: ramp(frame, t(0.3), t(0.45))
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12l7 7 7-7" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              <span style={{fontSize: 14, color: "#6b7280", fontWeight: 500}}>信息逐层衰减 · 决策链路过长</span>
            </div>
          </div>
          
          {/* Center - Arrow transition */}
          <div style={{width: 140, position: "relative", display: "flex", alignItems: "center", justifyContent: "center"}}>
            {/* Gradient arrow line */}
            <div
              style={{
                position: "absolute",
                width: 100,
                height: 3,
                background: `linear-gradient(90deg, #c4b5fd 0%, ${tokens.colors.primary} 50%, ${tokens.colors.luciusPurple} 100%)`,
                opacity: mix(arrowReveal, 0, 1),
                transform: `scaleX(${mix(arrowReveal, 0.3, 1)})`,
                borderRadius: 2
              }}
            />
            {/* Arrow head */}
            <div
              style={{
                position: "absolute",
                right: 14,
                width: 0,
                height: 0,
                borderTop: "8px solid transparent",
                borderBottom: "8px solid transparent",
                borderLeft: `12px solid ${tokens.colors.luciusPurple}`,
                opacity: mix(arrowReveal, 0, 1)
              }}
            />
            {/* Glow effect */}
            <div
              style={{
                position: "absolute",
                width: 100,
                height: 8,
                background: `linear-gradient(90deg, transparent 0%, ${tokens.colors.lavenderMist} 50%, transparent 100%)`,
                opacity: mix(arrowReveal, 0, 0.4) * (0.5 + breath * 0.3),
                filter: "blur(4px)"
              }}
            />
          </div>
          
          {/* Right side - Network (New/Bright) - moved right 20px */}
          <div style={{flex: 1, position: "relative", opacity: mix(networkReveal, 0, 1)}}>
            {/* Title above network */}
            <div
              style={{
                position: "absolute",
                left: 220,
                top: 30,
                fontSize: 14,
                fontWeight: 700,
                color: tokens.colors.primary,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                opacity: networkReveal
              }}
            >
              LUCIUS 网络
            </div>
            
            {/* Network visualization - moved right 20px */}
            <div style={{position: "absolute", left: 60, top: 70, width: 320, height: 360}}>
              {/* Outer glow ring */}
              <div
                style={{
                  position: "absolute",
                  left: networkCenterX - networkRadius - 30,
                  top: networkCenterY - networkRadius - 30,
                  width: (networkRadius + 30) * 2,
                  height: (networkRadius + 30) * 2,
                  borderRadius: "50%",
                  border: `2px solid ${tokens.colors.lavenderMist}`,
                  opacity: mix(networkReveal, 0, 0.25) * (0.6 + breath * 0.2),
                  boxShadow: `0 0 30px rgba(186,178,255,0.3)`
                }}
              />
              
              {/* Connection lines - thicker with glow */}
              <svg style={{position: "absolute", left: 0, top: 0, width: 400, height: 400}}>
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={tokens.colors.primary} stopOpacity="0.3"/>
                    <stop offset="100%" stopColor={tokens.colors.luciusPurple} stopOpacity="0.8"/>
                  </linearGradient>
                </defs>
                {networkNodes.map((node, i) => {
                  const lineProgress = ramp(frame, t(0.52 + i * 0.02), t(0.68 + i * 0.02));
                  return (
                    <g key={`line-${i}`}>
                      <line
                        x1={networkCenterX}
                        y1={networkCenterY}
                        x2={node.x}
                        y2={node.y}
                        stroke="url(#lineGrad)"
                        strokeWidth="3"
                        opacity={mix(lineProgress, 0, 0.85)}
                        strokeLinecap="round"
                      />
                      {/* Glow line */}
                      <line
                        x1={networkCenterX}
                        y1={networkCenterY}
                        x2={node.x}
                        y2={node.y}
                        stroke={tokens.colors.lavenderMist}
                        strokeWidth="8"
                        opacity={mix(lineProgress, 0, 0.2) * (0.5 + breath * 0.3)}
                        strokeLinecap="round"
                      />
                      {/* Flowing dot */}
                      <circle
                        r="4"
                        fill={tokens.colors.primary}
                        opacity={mix(flowActive, 0, 1)}
                      >
                        <animateMotion
                          dur="2s"
                          repeatCount="indefinite"
                          path={`M${networkCenterX} ${networkCenterY} L${node.x} ${node.y}`}
                          begin={`${i * 0.2}s`}
                        />
                      </circle>
                    </g>
                  );
                })}
              </svg>
              
              {/* Center LUCIUS node - larger with strong glow */}
              <div
                style={{
                  position: "absolute",
                  left: networkCenterX - 48,
                  top: networkCenterY - 48,
                  width: 96,
                  height: 96,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.luciusPurple} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `
                    0 0 0 ${12 + breath * 4}px rgba(100,79,184,${0.15 + breath * 0.1}),
                    0 0 60px rgba(85,56,199,${0.4 + breath * 0.15}),
                    0 12px 40px rgba(85,56,199,0.3)
                  `,
                  opacity: mix(networkReveal, 0, 1),
                  transform: `scale(${mix(networkReveal, 0.5, 1)})`,
                  zIndex: 10
                }}
              >
                {/* Inner glow */}
                <div
                  style={{
                    position: "absolute",
                    inset: 4,
                    borderRadius: "50%",
                    background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 60%)`
                  }}
                />
                <svg width="36" height="36" viewBox="0 0 24 24" fill="white" style={{zIndex: 1}}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              
              {/* Network nodes (people) - outlined with purple */}
              {networkNodes.map((node, i) => {
                const nodeProgress = ramp(frame, t(0.48 + i * 0.025), t(0.64 + i * 0.025));
                return (
                  <div
                    key={`net-${i}`}
                    style={{
                      position: "absolute",
                      left: node.x - 22,
                      top: node.y - 22,
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      border: `2.5px solid ${tokens.colors.primary}`,
                      background: "rgba(255,255,255,0.98)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: mix(nodeProgress, 0, 1),
                      transform: `scale(${mix(nodeProgress, 0.5, 1)})`,
                      boxShadow: `0 4px 16px rgba(100,79,184,0.25)`,
                      zIndex: 5
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="3.5" stroke={tokens.colors.primary} strokeWidth="1.8" fill="none"/>
                      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke={tokens.colors.primary} strokeWidth="1.8" fill="none"/>
                    </svg>
                  </div>
                );
              })}
              
              {/* Expanding pulse rings */}
              {[0, 1, 2].map((ring) => (
                <div
                  key={`pulse-${ring}`}
                  style={{
                    position: "absolute",
                    left: networkCenterX - networkRadius,
                    top: networkCenterY - networkRadius,
                    width: networkRadius * 2,
                    height: networkRadius * 2,
                    borderRadius: "50%",
                    border: `2px solid ${tokens.colors.primary}`,
                    opacity: mix(pulseActive, 0.5 - ring * 0.15, 0) * (1 - ((flowOffset + ring * 0.33) % 1)),
                    transform: `scale(${1 + ((flowOffset + ring * 0.33) % 1) * 0.4})`,
                    pointerEvents: "none"
                  }}
                />
              ))}
            </div>
            
            {/* Right bottom text - checkmark, brand color */}
            <div
              style={{
                position: "absolute",
                right: 40,
                bottom: 50,
                display: "flex",
                alignItems: "center",
                gap: 10,
                opacity: ramp(frame, t(0.7), t(0.88))
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: tokens.colors.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{fontSize: 14, color: tokens.colors.primary, fontWeight: 600}}>信息零衰减 · 人人可直达</span>
            </div>
          </div>
        </div>
      </StageShell>
    </SceneFrame>
  );
};

type KnowledgeEvidenceSource = "official" | "web" | "session" | "ops";

type KnowledgeEvidenceItem = {
  id: string;
  title: string;
  summary: string;
  updatedAt: string;
  source: KnowledgeEvidenceSource;
};

type KnowledgeEvidenceFragment = {
  x: number;
  y: number;
  width: number;
  height: number;
  delay: number;
  duration: number;
  rotate: number;
};

const knowledgeEvidenceItems: ReadonlyArray<KnowledgeEvidenceItem> = [
  {
    id: "handoff-cluster",
    title: "Escalation clusters around custom reply edge cases",
    summary: "Manual review appears most often when the reply is nearly right but the final wording still needs operator control.",
    updatedAt: "Today · 09:12",
    source: "session"
  },
  {
    id: "tone-variance",
    title: "High-value accounts ask for more control before send",
    summary: "Teams want a lightweight review step before an AI draft reaches a user, especially in regulated or high-touch contexts.",
    updatedAt: "Today · 09:24",
    source: "official"
  },
  {
    id: "rewrite-frequency",
    title: "Operators keep rewriting the same last-mile sections",
    summary: "Edits cluster around greetings, softeners, and confirmation lines rather than the core factual answer.",
    updatedAt: "Today · 09:36",
    source: "ops"
  },
  {
    id: "draft-review",
    title: "Repeated request: add a draft review step before send",
    summary: "Across support and ops conversations, teams explicitly ask for a lightweight review surface before Lucius sends the response.",
    updatedAt: "Today · 09:47",
    source: "official"
  },
  {
    id: "audit-scope",
    title: "Audit-sensitive teams pause on edge cases",
    summary: "The demand is strongest where visibility and accountability matter more than raw automation throughput.",
    updatedAt: "Today · 09:54",
    source: "web"
  },
  {
    id: "high-volume",
    title: "Impact is concentrated in high-volume accounts",
    summary: "The pattern is strongest where reply volume is highest, which makes the workflow gap more important than raw ticket count suggests.",
    updatedAt: "Today · 10:01",
    source: "web"
  },
  {
    id: "trust-ramp",
    title: "Trust increases after lightweight approval moments",
    summary: "A quick review step helps teams adopt more automation without feeling like control is being removed.",
    updatedAt: "Today · 10:08",
    source: "session"
  },
  {
    id: "brief-template",
    title: "PM brief points to review + customization before send",
    summary: "The product opportunity is not a full rewrite. It is a thin approval and customization layer at the last responsible moment.",
    updatedAt: "Today · 10:14",
    source: "ops"
  }
] as const;

const knowledgeEvidenceFeaturedIds = ["draft-review", "high-volume"] as const;

const knowledgeEvidenceFragments: ReadonlyArray<KnowledgeEvidenceFragment> = [
  {x: 18, y: 26, width: 48, height: 3, delay: 0, duration: 28, rotate: -6},
  {x: 86, y: 28, width: 30, height: 3, delay: 3, duration: 28, rotate: 4},
  {x: 24, y: 64, width: 56, height: 4, delay: 5, duration: 26, rotate: -2},
  {x: 98, y: 74, width: 42, height: 3, delay: 8, duration: 26, rotate: 6},
  {x: 26, y: 96, width: 44, height: 3, delay: 10, duration: 24, rotate: -3},
  {x: 84, y: 108, width: 34, height: 3, delay: 12, duration: 24, rotate: 3},
  {x: 22, y: 132, width: 52, height: 4, delay: 15, duration: 22, rotate: -5},
  {x: 92, y: 138, width: 28, height: 3, delay: 18, duration: 22, rotate: 8},
  {x: 38, y: 154, width: 18, height: 18, delay: 22, duration: 20, rotate: 0},
  {x: 84, y: 160, width: 20, height: 20, delay: 24, duration: 20, rotate: 0}
] as const;

const knowledgeEvidenceSourceLabel = (source: KnowledgeEvidenceSource) => {
  switch (source) {
    case "official":
      return "Official doc";
    case "web":
      return "Web crawl";
    case "session":
      return "Session record";
    case "ops":
      return "Ops note";
  }
};

const knowledgeEvidenceSourceStyle = (source: KnowledgeEvidenceSource): React.CSSProperties => {
  switch (source) {
    case "official":
      return {
        color: tokens.colors.primary,
        border: `1px solid ${tokens.colors.primaryTintBorder}`,
        background: "rgba(245,241,255,0.94)"
      };
    case "web":
      return {
        color: "#7f6851",
        border: "1px solid rgba(214,207,195,1)",
        background: "rgba(249,247,241,0.96)"
      };
    case "session":
      return {
        color: "#53627d",
        border: "1px solid rgba(209,216,230,0.92)",
        background: "rgba(247,249,252,0.98)"
      };
    case "ops":
      return {
        color: "#7a5b3f",
        border: "1px solid rgba(231,214,193,0.98)",
        background: "rgba(251,245,236,0.98)"
      };
  }
};

export const KnowledgeEvidenceScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = (p: number) => p * (durationInFrames - 1);

  const wikiIntro = ramp(frame, t(0.02), t(0.12));
  const wikiScroll = ramp(frame, t(0.12), t(0.30));
  const wikiHighlight = ramp(frame, t(0.30), t(0.44));
  const wikiExtract = ramp(frame, t(0.44), t(0.58));
  const wikiIngest = ramp(frame, t(0.58), t(0.80));
  const analysisResolve = ramp(frame, t(0.80), t(0.90));
  const analysisHandoff = ramp(frame, t(0.88), t(0.98));
  const line1 = ramp(frame, t(0.90), t(0.96));
  const line2 = ramp(frame, t(0.92), t(0.98));
  const line3 = ramp(frame, t(0.94), t(1.0));

  const breath = loopWave(frame, 180, 26);
  const pulse = loopWave(frame, 120, 10);

  const stageCenterX = 560;
  const stageCenterY = 276;

  const wikiFrame = {x: 92, y: 52, width: 936, height: 416};
  const wikiViewport = {
    x: wikiFrame.x + 32,
    y: wikiFrame.y + 138,
    width: wikiFrame.width - 64,
    height: 236
  };

  const cardHeight = 86;
  const cardGap = 14;
  const featuredIndices = knowledgeEvidenceFeaturedIds.map((featuredId) =>
    knowledgeEvidenceItems.findIndex((item) => item.id === featuredId)
  );
  const targetScrollOffset = Math.max(0, featuredIndices[0] * (cardHeight + cardGap) - 68);
  const listOffset = mix(wikiScroll, 0, targetScrollOffset);

  const luciusFocus = Math.max(wikiHighlight * 0.18, wikiExtract * 0.52, wikiIngest * 0.92, analysisResolve * 0.84);
  const luciusScale = mix(luciusFocus, 0.86, 1.04 + breath * 0.015);
  const matteVeil = Math.max(wikiExtract * 0.12, wikiIngest * 0.42, analysisResolve * 0.62, analysisHandoff * 0.78);
  const wikiChromeFade = mix(analysisHandoff, 1, 0.08);

  const extractedCards = featuredIndices.map((itemIndex, index) => {
    const finalWidth = 254;
    const originLeft = wikiViewport.x;
    const originTop = wikiViewport.y + itemIndex * (cardHeight + cardGap) - listOffset;
    const finalLeft = index === 0 ? 176 : 690;
    const finalTop = 182;
    return {
      ...knowledgeEvidenceItems[itemIndex],
      finalLeft,
      finalTop,
      finalWidth,
      originLeft,
      originTop
    };
  });

  const particles = extractedCards.flatMap((card, cardIndex) =>
    knowledgeEvidenceFragments.map((fragment, fragmentIndex) => {
      const startFrame = t(0.60) + fragment.delay;
      const endFrame = startFrame + fragment.duration;
      const progress = ramp(frame, startFrame, endFrame);
      const startLeft = card.finalLeft + 22 + fragment.x;
      const startTop = card.finalTop + 20 + fragment.y;
      return {
        id: `${card.id}-${fragmentIndex}`,
        progress,
        rotate: fragment.rotate,
        startLeft,
        startTop,
        width: fragment.width,
        height: fragment.height,
        fill:
          cardIndex === 0
            ? mixColor(progress, "rgba(100,79,184,0.16)", tokens.colors.primary)
            : mixColor(progress, "rgba(125,119,151,0.16)", tokens.colors.luciusPurple)
      };
    })
  );

  return (
    <SceneFrame
      frame={frame}
      kicker="Facing users / Knowledge evidence"
      title="Ground the reply in evidence."
      copy="Lucius scans the knowledge base, lifts the two signals that matter, and drafts from evidence instead of instinct."
    >
      <StageShell
        label="Knowledge evidence"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.985), rgba(247,244,238,0.985))"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 48%, rgba(100,79,184,0.065) 0%, rgba(100,79,184,0.02) 18%, transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0))",
            opacity: 0.9
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(250,248,244,0.96)",
            opacity: matteVeil,
            pointerEvents: "none"
          }}
        />

        <div
          style={{
            position: "absolute",
            left: wikiFrame.x,
            top: wikiFrame.y,
            width: wikiFrame.width,
            height: wikiFrame.height,
            borderRadius: 32,
            border: "1px solid rgba(214,208,221,0.82)",
            background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(249,247,242,0.98))",
            boxShadow: `0 24px 54px rgba(41,40,48,${mix(wikiIntro, 0.02, 0.08)}), 0 8px 18px rgba(41,40,48,0.04)`,
            opacity: wikiChromeFade * wikiIntro,
            transform: `translateY(${mix(wikiIntro, 20, 0)}px)`
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 30,
              top: 22,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              opacity: mix(wikiExtract, 1, 0.56)
            }}
          >
            <div
              style={{
                fontFamily: tokens.fonts.mono,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(100,79,184,0.56)"
              }}
            >
              Knowledge base
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: "-0.05em",
                  color: tokens.colors.title
                }}
              >
                Searchable evidence
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "rgba(107,114,128,0.84)"
                }}
              >
                {knowledgeEvidenceItems.length} items
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              right: 28,
              top: 22,
              height: 42,
              padding: "0 16px",
              borderRadius: 14,
              border: "1px solid rgba(214,208,221,0.88)",
              background: "rgba(255,255,255,0.74)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 600,
              color: "rgba(100,79,184,0.72)",
              opacity: mix(wikiExtract, 1, 0.36)
            }}
          >
            Upload
          </div>

          <div
            style={{
              position: "absolute",
              left: 30,
              right: 30,
              top: 92,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              opacity: mix(wikiExtract, 1, 0.48)
            }}
          >
            <div style={{display: "flex", alignItems: "center", gap: 12}}>
              <div style={{...chipStyle(0.8, true), minHeight: 34, padding: "0 14px"}}>All</div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "rgba(107,114,128,0.72)"
                }}
              >
                Docs
              </div>
            </div>
            <div
              style={{
                width: 302,
                height: 42,
                borderRadius: 16,
                border: "1px solid rgba(226,222,234,0.98)",
                background: "rgba(255,255,255,0.72)",
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
                color: "rgba(156,163,175,0.92)",
                fontSize: 14,
                fontWeight: 500
              }}
            >
              Search knowledge
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              left: wikiViewport.x - wikiFrame.x,
              top: 126,
              right: 32,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "rgba(107,114,128,0.68)",
              fontSize: 12,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              opacity: mix(wikiExtract, 1, 0.48)
            }}
          >
            <span>Priority focus</span>
            <span>Updated today</span>
          </div>

          <div
            style={{
              position: "absolute",
              left: wikiViewport.x - wikiFrame.x,
              top: wikiViewport.y - wikiFrame.y,
              width: wikiViewport.width,
              height: wikiViewport.height,
              overflow: "hidden",
              maskImage: "linear-gradient(180deg, transparent 0%, black 8%, black 92%, transparent 100%)"
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: -listOffset,
                width: "100%"
              }}
            >
              {knowledgeEvidenceItems.map((item, index) => {
                const isFeatured = knowledgeEvidenceFeaturedIds.includes(item.id as (typeof knowledgeEvidenceFeaturedIds)[number]);
                const isCloneSource = isFeatured && wikiExtract > 0.02;
                const sourceOpacity = isFeatured
                  ? mix(wikiExtract, 1, 0.08) * mix(analysisHandoff, 1, 0)
                  : mix(wikiHighlight, 1, 0.28) * mix(wikiExtract, 1, 0.18) * mix(analysisHandoff, 1, 0);

                return (
                  <div
                    key={item.id}
                    style={{
                      position: "absolute",
                      left: 0,
                      top: index * (cardHeight + cardGap),
                      width: "100%",
                      height: cardHeight,
                      padding: "16px 18px",
                      borderRadius: 22,
                      border: isFeatured
                        ? `1px solid ${mixColor(wikiHighlight, "rgba(214,208,221,0.92)", tokens.colors.primaryTintBorder)}`
                        : "1px solid rgba(229,225,235,0.94)",
                      background: "rgba(255,255,255,0.96)",
                      boxShadow: isFeatured
                        ? `0 18px 30px rgba(100,79,184,${mix(wikiHighlight, 0.04, 0.10)}), 0 8px 18px rgba(41,40,48,0.04)`
                        : "0 12px 22px rgba(41,40,48,0.04), 0 4px 10px rgba(41,40,48,0.03)",
                      opacity: sourceOpacity,
                      transform: `scale(${isFeatured ? mix(wikiHighlight, 1, 1.012) : 1})`,
                      filter: isCloneSource ? "saturate(0.92)" : "none"
                    }}
                  >
                    <div style={{display: "flex", justifyContent: "space-between", gap: 18}}>
                      <div style={{flex: 1, minWidth: 0}}>
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            lineHeight: 1.2,
                            letterSpacing: "-0.03em",
                            color: tokens.colors.title,
                            maxWidth: 520
                          }}
                        >
                          {item.title}
                        </div>
                        <div
                          style={{
                            marginTop: 10,
                            fontSize: 12,
                            lineHeight: 1.45,
                            color: "rgba(86,98,127,0.88)",
                            maxWidth: 630
                          }}
                        >
                          {item.summary}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: "rgba(107,114,128,0.72)",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {item.updatedAt}
                      </div>
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        left: 18,
                        bottom: 14,
                        minHeight: 28,
                        padding: "0 12px",
                        borderRadius: 999,
                        display: "inline-flex",
                        alignItems: "center",
                        fontFamily: tokens.fonts.mono,
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        ...knowledgeEvidenceSourceStyle(item.source)
                      }}
                    >
                      {knowledgeEvidenceSourceLabel(item.source)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: stageCenterX - 58,
            top: stageCenterY - 58,
            width: 116,
            height: 116,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.luciusPurple} 100%)`,
            boxShadow: `
              0 0 0 ${12 + breath * 6}px rgba(100,79,184,${0.08 + luciusFocus * 0.08}),
              0 20px 40px rgba(85,56,199,${0.12 + luciusFocus * 0.16}),
              0 8px 18px rgba(41,40,48,0.08)
            `,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: luciusFocus,
            transform: `scale(${luciusScale})`,
            zIndex: 12
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 5,
              borderRadius: "50%",
              background: "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.34) 0%, transparent 62%)"
            }}
          />
          <Img
            src={staticFile("logo-mark-black.svg")}
            style={{
              width: 38,
              height: 38,
              filter: "brightness(0) invert(1)",
              zIndex: 1
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            left: stageCenterX - 94,
            top: stageCenterY + 72,
            width: 188,
            textAlign: "center",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: mixColor(wikiExtract + wikiIngest * 0.6, "rgba(107,114,128,0.12)", "rgba(86,98,127,0.82)"),
            opacity: Math.max(wikiHighlight * 0.56, wikiExtract * 0.84, wikiIngest, analysisResolve * 0.84)
          }}
        >
          Analyzing signals
        </div>

        {extractedCards.map((card, index) => {
          const sourceLabel = knowledgeEvidenceSourceLabel(card.source);
          const left = mix(wikiExtract, card.originLeft, card.finalLeft);
          const top = mix(wikiExtract, card.originTop, card.finalTop);
          const shellOpacity = wikiExtract > 0.01 ? mix(analysisHandoff, 1, 0.06) : 0;
          const innerOpacity = mix(wikiIngest, 1, 0.18) * mix(analysisHandoff, 1, 0);
          return (
            <div
              key={card.id}
              style={{
                position: "absolute",
                left,
                top,
                width: card.finalWidth,
                minHeight: 188,
                padding: "16px 18px 18px",
                borderRadius: 24,
                border: `1px solid ${mixColor(wikiExtract, "rgba(214,208,221,0.96)", tokens.colors.primaryTintBorder)}`,
                background: "rgba(255,255,255,0.98)",
                boxShadow: `0 22px 34px rgba(41,40,48,${mix(wikiExtract, 0.02, 0.09)}), 0 8px 18px rgba(41,40,48,0.04)`,
                opacity: shellOpacity,
                transform: `scale(${mix(wikiExtract, 1, 1.015)})`,
                zIndex: 10 + index
              }}
            >
              <div style={{display: "flex", justifyContent: "space-between", gap: 12, opacity: innerOpacity}}>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    lineHeight: 1.22,
                    letterSpacing: "-0.03em",
                    color: tokens.colors.title,
                    maxWidth: 170
                  }}
                >
                  {card.title}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "rgba(107,114,128,0.68)",
                    whiteSpace: "nowrap"
                  }}
                >
                  {card.updatedAt}
                </div>
              </div>

              <div
                style={{
                  marginTop: 16,
                  fontSize: 13,
                  lineHeight: 1.52,
                  color: "rgba(86,98,127,0.82)",
                  opacity: innerOpacity
                }}
              >
                {card.summary}
              </div>

              <div
                style={{
                  marginTop: 18,
                  minHeight: 30,
                  padding: "0 12px",
                  borderRadius: 999,
                  display: "inline-flex",
                  alignItems: "center",
                  fontFamily: tokens.fonts.mono,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  opacity: innerOpacity,
                  ...knowledgeEvidenceSourceStyle(card.source)
                }}
              >
                {sourceLabel}
              </div>
            </div>
          );
        })}

        {particles.map((particle) => {
          if (particle.progress <= 0.01 || analysisHandoff >= 1) {
            return null;
          }

          const left = mix(particle.progress, particle.startLeft, stageCenterX - 4);
          const top = mix(particle.progress, particle.startTop, stageCenterY - 4);
          return (
            <div
              key={particle.id}
              style={{
                position: "absolute",
                left,
                top,
                width: particle.width,
                height: particle.height,
                borderRadius: 999,
                background: particle.fill,
                opacity: mix(particle.progress, 0, 0.84) * mix(analysisResolve, 1, 0.52) * (1 - particle.progress * 0.86),
                transform: `translate(-50%, -50%) rotate(${mix(particle.progress, particle.rotate, 0)}deg) scale(${mix(particle.progress, 1, 0.24)})`,
                boxShadow: `0 0 12px rgba(100,79,184,${mix(particle.progress, 0.02, 0.16)})`,
                zIndex: 18
              }}
            />
          );
        })}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(250,248,244,0.92)",
            opacity: mix(analysisHandoff, 0, 1),
            zIndex: 20
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 342,
            top: 176,
            width: 436,
            minHeight: 188,
            padding: "18px 20px 20px",
            borderRadius: 28,
            border: `1px solid ${tokens.colors.primaryTintBorder}`,
            background: "linear-gradient(180deg, rgba(255,255,255,0.985), rgba(246,242,252,0.985))",
            boxShadow: `0 28px 48px rgba(100,79,184,${mix(analysisHandoff, 0.02, 0.10)}), 0 8px 18px rgba(41,40,48,0.05)`,
            opacity: analysisHandoff,
            transform: `translateY(${mix(analysisHandoff, 18, 0)}px) scale(${mix(analysisHandoff, 0.98, 1)})`,
            zIndex: 21
          }}
        >
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div style={chipStyle(1, true)}>Lucius drafting</div>
            <div style={chipStyle(0.84)}>grounded reply</div>
          </div>

          <div
            style={{
              marginTop: 24,
              display: "flex",
              alignItems: "center",
              gap: 8
            }}
          >
            {[0, 1, 2].map((dot) => (
              <div
                key={dot}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: tokens.colors.primary,
                  opacity: analysisHandoff * (0.42 + loopWave(frame, 24, dot * 10) * 0.58)
                }}
              />
            ))}
          </div>

          <div style={{marginTop: 22, display: "flex", flexDirection: "column", gap: 14}}>
            <div
              style={{
                height: 16,
                borderRadius: 999,
                background: "rgba(100,79,184,0.22)",
                transform: `scaleX(${line1})`,
                transformOrigin: "0% 50%"
              }}
            />
            <div
              style={{
                height: 10,
                borderRadius: 999,
                background: "rgba(86,98,127,0.18)",
                transform: `scaleX(${line2})`,
                transformOrigin: "0% 50%"
              }}
            />
            <div
              style={{
                width: "76%",
                height: 10,
                borderRadius: 999,
                background: "rgba(86,98,127,0.18)",
                transform: `scaleX(${line3})`,
                transformOrigin: "0% 50%"
              }}
            />
          </div>
        </div>
      </StageShell>
    </SceneFrame>
  );
};

export const CompetitorBriefScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = (p: number) => p * (durationInFrames - 1);

  const sourcesAppear = [0.16, 0.20, 0.24, 0.28].map((start) => ramp(frame, t(start), t(start + 0.08)));
  const routerGlow = ramp(frame, t(0.34), t(0.48));
  const node1 = ramp(frame, t(0.40), t(0.50));
  const node2 = ramp(frame, t(0.46), t(0.56));
  const node3 = ramp(frame, t(0.52), t(0.62));
  const out1 = ramp(frame, t(0.58), t(0.68));
  const out2 = ramp(frame, t(0.64), t(0.74));
  const out3 = ramp(frame, t(0.70), t(0.82));
  const routerSweep = ramp(frame, t(0.44), t(0.70));
  const routerWave = loopWave(frame, 150, 52);

  const sourceXs = [300, 476, 652, 828];
  const outcomeXs = [380, 554, 728];

  return (
    <SceneFrame
      frame={frame}
      kicker={structureScenes.journeyRouter.kicker}
      title={structureScenes.journeyRouter.title}
      copy={structureScenes.journeyRouter.copy}
    >
      <StageShell label="Lucius layered router">
        <div
          style={{
            position: "absolute",
            left: 42,
            top: 72,
            bottom: 52,
            width: 120
          }}
        >
          {[146, 336].map((y) => (
            <div
              key={y}
              style={{
                position: "absolute",
                left: 88,
                top: y,
                width: 1.5,
                height: 84,
                background: "rgba(125,119,151,0.22)"
              }}
            />
          ))}
          {[
            {label: "Context layer", top: 36},
            {label: "Lucius routing", top: 198},
            {label: "Outcome layer", top: 364}
          ].map((item) => (
            <div
              key={item.label}
              style={{
                position: "absolute",
                left: 0,
                top: item.top,
                width: 90,
                color: "rgba(16,24,40,0.74)",
                fontSize: 14,
                lineHeight: 1.22,
                letterSpacing: "-0.02em"
              }}
            >
              {item.label}
            </div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            left: 190,
            top: 152,
            width: 812,
            height: 1,
            background: "rgba(125,119,151,0.18)"
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 190,
            top: 344,
            width: 812,
            height: 1,
            background: "rgba(125,119,151,0.18)"
          }}
        />

        {[
          {label: "Case intake", icon: "IN", x: 230, active: sourcesAppear[0]},
          {label: "Prior thread", icon: "HIS", x: 406, active: sourcesAppear[1]},
          {label: "Competitor mention", icon: "CMP", x: 582, active: sourcesAppear[2]},
          {label: "Account context", icon: "CTX", x: 758, active: sourcesAppear[3]}
        ].map((source) => (
          <div
            key={source.label}
            style={{
              position: "absolute",
              left: source.x,
              top: 56,
              width: 140,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              opacity: mix(source.active, 0.24, 1)
            }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(236,231,248,0.98)",
                border: `1px solid ${tokens.colors.primaryTintBorder}`,
                color: tokens.colors.primary,
                fontFamily: tokens.fonts.mono,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.04em",
                  boxShadow: `0 12px 24px rgba(100,79,184,${mix(source.active, 0.02, 0.08)})`
                }}
              >
                {source.icon}
              </div>
              <PulsePing x={30} y={30} progress={source.active * (0.68 + loopWave(frame, 130, source.x) * 0.32)} radius={4.2} />
              <div
                style={{
                  color: tokens.colors.title,
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "-0.02em",
                textAlign: "center",
                lineHeight: 1.2
              }}
            >
              {source.label}
            </div>
          </div>
        ))}

        <div
          style={{
            position: "absolute",
            left: 258,
            top: 214,
            width: 604,
            height: 104
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 999,
              background: `linear-gradient(180deg, rgba(245,241,255,0.98), rgba(255,255,255,0.94)), radial-gradient(circle at 50% 50%, ${mixColor(routerGlow, "rgba(236,231,248,0.34)", "rgba(100,79,184,0.18)")} 0%, rgba(236,231,248,0.18) 56%, rgba(236,231,248,0.02) 100%)`,
              border: `1px solid ${tokens.colors.primaryTintBorder}`,
              boxShadow: `0 22px 42px rgba(100,79,184,${mix(routerGlow, 0.03, 0.09)}), 0 8px 18px rgba(41,40,48,0.04)`
            }}
          />
          <SweepBeam x={16} y={18} width={572} height={68} progress={routerSweep} opacity={0.52} />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: -34,
              transform: "translateX(-50%)",
              ...chipStyle(routerGlow, true)
            }}
          >
            Lucius routes
          </div>

          {[node1, node2, node3].map((active, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                left: 88 + index * 174,
                top: 16,
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "#253b57",
                boxShadow: `0 16px 28px rgba(31,53,80,${mix(active, 0.10, 0.22)})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${1 + routerWave * 0.02})`
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: mixColor(active, "rgba(236,231,248,0.88)", tokens.colors.primary),
                  color: active > 0.6 ? "#fff" : tokens.colors.primary,
                  fontFamily: tokens.fonts.mono,
                  fontSize: 10,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                AI
              </div>
              <PulsePing x={36} y={36} progress={active * (0.7 + loopWave(frame, 100, index * 18) * 0.3)} radius={5} />
            </div>
          ))}
        </div>

        {[
          {tag: "Resolve", title: "Resolve directly", meta: "", active: out1, x: 297, width: 166},
          {tag: "Brief", title: "Competitor brief", meta: "", active: out2, x: 471, width: 166},
          {tag: "Handoff", title: "Handoff ready", meta: "Context packed", active: out3, x: 645, width: 166}
        ].map((outcome) => (
          <div
            key={outcome.title}
            style={{
              position: "absolute",
              left: outcome.x,
              top: 374,
              width: outcome.width,
              minHeight: 86,
              padding: "12px 14px 14px",
              borderRadius: 20,
              border: "1px solid rgba(214,207,195,1)",
              background: "linear-gradient(180deg, rgba(249,247,241,1), rgba(244,241,233,1))",
              boxShadow: `0 14px 28px rgba(74,68,54,${mix(outcome.active, 0.04, 0.10)}), 0 6px 12px rgba(74,68,54,0.04)`,
              opacity: mix(outcome.active, 0.46, 1)
            }}
          >
            <div style={chipStyle(outcome.active)}>{outcome.tag}</div>
            <div
              style={{
                marginTop: 8,
                fontSize: 15,
                fontWeight: 600,
                color: tokens.colors.title,
                letterSpacing: "-0.03em",
                lineHeight: 1.12
              }}
            >
              {outcome.title}
            </div>
            {outcome.meta ? (
              <div
                style={{
                  marginTop: 6,
                  color: tokens.colors.primary,
                  fontSize: 12,
                  fontWeight: 500
                }}
                >
                  {outcome.meta}
                </div>
              ) : null}
            <div
              style={{
                marginTop: 8,
                height: 4,
                borderRadius: 999,
                background: mixColor(outcome.active, "rgba(100,79,184,0.08)", "rgba(100,79,184,0.20)"),
                transform: `scaleX(${mix(outcome.active, 0.12, 1)})`,
                transformOrigin: "0% 50%"
              }}
            />
          </div>
        ))}

        <svg viewBox="0 0 1120 540" style={{position: "absolute", inset: 0, overflow: "visible"}}>
          {sourceXs.map((x, index) => (
            <path
              key={`drop-${index}`}
              d={`M ${x} 158 V 214`}
              fill="none"
              stroke="rgba(125,119,151,0.24)"
              strokeWidth={2}
              strokeLinecap="round"
            />
          ))}
          {outcomeXs.map((x, index) => (
            <path
              key={`down-${index}`}
              d={`M ${x} 318 V 374`}
              fill="none"
              stroke="rgba(125,119,151,0.24)"
              strokeWidth={2}
              strokeLinecap="round"
            />
          ))}

          {[...sourcesAppear, out1, out2, out3].map((progress, index) => {
            const coords =
              index < 4
                ? {x: sourceXs[index], y: mix(progress, 158, 214)}
                : {x: outcomeXs[index - 4], y: mix(progress, 318, 374)};

            return (
              <g key={index} transform={`translate(${coords.x} ${coords.y})`} opacity={progress > 0.02 && progress < 0.98 ? 1 : 0}>
                <circle r={13} fill="rgba(100,79,184,0.14)" />
                <circle r={5.5} fill={tokens.colors.primary} />
              </g>
            );
          })}
        </svg>
      </StageShell>
    </SceneFrame>
  );
};
