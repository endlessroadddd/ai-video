import {
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  staticFile,
} from "remotion";
import { FRAME_SCALE, fpsFrames, TIMING } from "./theme";
import {
  CONVERSATION_SOURCES,
  getSourceImpactFrame,
} from "./conversationSources";

// Foundational "context layer" waveform.
// Stage 1 (0–4s): slowly draws left→right (120f), sets the ground.
// Stages 2–4: breathing waveform, low presence.
// Stage 5 (16–19s): subtle intensify, becomes the spine the Lucius network sits on.

interface Props {
  fadeOutStart?: number;
  fadeOutEnd?: number;
}

const LAYER_Y_PCT = 0.78;
const LAYER_W_PCT = 0.84;
const STEPS = 240;
const SPECTRUM_BARS = 96;
const INTRO_DRAW_DELAY = fpsFrames(18);

const IMPACTS = CONVERSATION_SOURCES.map((source) => ({
  frame: getSourceImpactFrame(source),
  xPct: source.impactXPct,
}));

const softClamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const BrandLayer: React.FC<Props> = ({ fadeOutStart, fadeOutEnd }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const frame30 = frame / FRAME_SCALE;

  // Intro reveal: the layer slides in from the left before it starts reacting.
  const draw = interpolate(frame, [INTRO_DRAW_DELAY, TIMING.stage1End], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.33, 0, 0.2, 1),
  });

  // Amplitude ramps in slowly with the draw
  const ampRamp = interpolate(frame, [fpsFrames(52), TIMING.stage1End], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  // Subtle intensify during stage 5 — layer becomes the network's spine
  const stage5Boost = interpolate(frame, [TIMING.stage4End, TIMING.stage4End + fpsFrames(40)], [1, 1.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  let opacity = interpolate(frame, [TIMING.stage3End, TIMING.stage3End + fpsFrames(18)], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });
  if (fadeOutStart !== undefined && fadeOutEnd !== undefined) {
    opacity *= interpolate(frame, [fadeOutStart, fadeOutEnd], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
  }

  const cy = height * LAYER_Y_PCT;
  const fullW = width * LAYER_W_PCT;
  const startX = (width - fullW) / 2;
  const revealW = fullW * draw;
  const revealLeadX = startX + revealW;
  const introLeadOpacity = interpolate(draw, [0.02, 0.14, 0.9, 1], [0, 0.96, 0.78, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const impactEnergy = IMPACTS.reduce((total, impact) => {
    const local = frame - impact.frame;
    if (local < 0 || local > fpsFrames(56)) return total;
    return total + interpolate(local, [0, fpsFrames(5), fpsFrames(24), fpsFrames(56)], [0, 1, 0.42, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
  }, 0);

  const phase = frame30 * 0.12;
  const ampMain = (2.4 + impactEnergy * 1.4) * ampRamp;
  const ampHigh = (0.9 + impactEnergy * 0.9) * ampRamp;
  const points: string[] = [];
  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS;
    const x = startX + t * fullW;
    const taper = Math.sin(t * Math.PI);
    const wave =
      Math.sin(t * 7 * Math.PI * 2 - phase) * ampMain +
      Math.sin(t * 15 * Math.PI * 2 - phase * 1.35) * ampHigh;
    const y = cy + wave * taper;
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
  }
  const d = points.join(" ");
  const bars = Array.from({ length: SPECTRUM_BARS }, (_, i) => {
    const t = i / (SPECTRUM_BARS - 1);
    const x = startX + t * fullW;
    const screenXPct = x / width;
    let energy = 0;
    let energyPeak = 0;

    for (const impact of IMPACTS) {
      const local = frame - impact.frame;
      if (local < 0 || local > fpsFrames(62)) continue;

      const envelope = interpolate(local, [0, fpsFrames(4), fpsFrames(26), fpsFrames(62)], [0, 1, 0.46, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.16, 1, 0.3, 1),
      });
      const dist = Math.abs(screenXPct - impact.xPct);
      const bloom = Math.exp(-(dist * dist) / 0.0016);
      const rippleCenter = local / fpsFrames(155);
      const ripple = softClamp(1 - Math.abs(dist - rippleCenter) / 0.055, 0, 1);
      const contribution = envelope * (bloom * 1.12 + ripple * 0.72);
      if (contribution > energy) {
        energy = contribution;
        energyPeak = contribution;
      }
    }

    const idle =
      0.22 +
      Math.sin(frame30 * 0.18 + i * 0.61) * 0.08 +
      Math.sin(frame30 * 0.07 + i * 1.7) * 0.05;
    const heightValue = 3 + idle * 8 + energy * 48;
    const opacity = softClamp(0.18 + idle * 0.18 + energy * 0.56, 0.12, 0.82);
    const widthValue = energy > 0.18 ? 2.8 : 1.75;
    const color =
      energyPeak > 0.52
        ? "#5538c7"
        : energyPeak > 0.26
          ? "#8e7cff"
          : energyPeak > 0.1
            ? "#bab2ff"
            : "#f4f1ff";
    const glow =
      energyPeak > 0.26
        ? "drop-shadow(0 0 7px rgba(142,124,255,0.42))"
        : energyPeak > 0.1
          ? "drop-shadow(0 0 5px rgba(186,178,255,0.28))"
          : "none";

    return {
      x,
      y: cy - heightValue / 2,
      width: widthValue,
      height: heightValue,
      opacity,
      color,
      radius: widthValue,
      glow,
    };
  });

  return (
    <>
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity,
        }}
      >
      <defs>
        <clipPath id="context-layer-reveal">
          <rect
            x={startX - 10}
            y={cy - 82}
            width={revealW + 20}
            height={164}
            rx={20}
          />
        </clipPath>
      </defs>
      <g clipPath="url(#context-layer-reveal)">
        <g opacity={draw}>
          {bars.map((bar, i) => (
            <rect
              key={i}
              x={bar.x - bar.width / 2}
              y={bar.y}
              width={bar.width}
              height={bar.height}
              rx={bar.radius}
              fill={bar.color}
              fillOpacity={bar.opacity}
              style={{
                filter: bar.glow,
              }}
            />
          ))}
        </g>
        <path
          d={d}
          fill="none"
          stroke="#ffffff"
          strokeWidth={1.05 * stage5Boost}
          strokeOpacity={0.42}
          strokeLinecap="round"
        />
      </g>
      </svg>
      {draw < 0.995 ? (
        <div
          style={{
            position: "absolute",
            left: revealLeadX,
            top: cy,
            width: 48,
            height: 48,
            transform: `translate(-50%, -50%) scale(${interpolate(draw, [0, 0.2, 1], [0.84, 1, 0.92], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })})`,
            opacity: introLeadOpacity,
            borderRadius: 16,
            background: "rgba(85,56,199,0.96)",
            border: "1px solid rgba(255,255,255,0.62)",
            boxShadow:
              "0 0 24px rgba(255,255,255,0.5), 0 0 34px rgba(85,56,199,0.55), 0 12px 26px rgba(0,0,0,0.34)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <Img
            src={staticFile("brand/lucius-mark-white.svg")}
            style={{
              width: 29,
              height: 29,
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>
      ) : null}
    </>
  );
};
