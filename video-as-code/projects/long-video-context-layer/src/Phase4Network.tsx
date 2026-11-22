import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { APP_META } from "./conversationSources";
import { fpsFrames, LUCIUS, TIMING } from "./theme";
import { PRIMARY_NODE_POSITIONS } from "./Phase3Cards";

const CLOSING_START = TIMING.stage3End;
const LAYER_Y_PCT = 0.78;
const LAYER_W_PCT = 0.84;
const CARD_WIDTH = 278;
const CARD_HEIGHT = 92;
const BARS = 88;

const DROP_STAGGER = fpsFrames(10);
const DROP_DURATION = fpsFrames(42);
const IMPACT_OFFSET = fpsFrames(30);
const COLLAPSE_START = fpsFrames(66);
const COLLAPSE_END = fpsFrames(120);
const BRAND_START = fpsFrames(146);
const BRAND_END = fpsFrames(184);

const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
const EASE_IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);

const CARDS = PRIMARY_NODE_POSITIONS.map((position, index) => ({
  ...position,
  index,
  dropStart: index * DROP_STAGGER,
  impactFrame: index * DROP_STAGGER + IMPACT_OFFSET,
}));

const softClamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const ClosingCard: React.FC<{
  card: (typeof CARDS)[number];
  local: number;
  width: number;
  height: number;
}> = ({ card, local, width, height }) => {
  const app = APP_META[card.app];
  const dropLocal = local - card.dropStart;
  if (dropLocal > DROP_DURATION + fpsFrames(8)) return null;

  const x = width * card.xPct;
  const startY = height * card.yPct;
  const layerY = height * LAYER_Y_PCT;
  const drop = interpolate(dropLocal, [0, DROP_DURATION], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_IN_OUT,
  });
  const y = interpolate(drop, [0, 1], [startY, layerY - 16]);
  const scale = interpolate(drop, [0, 0.72, 1], [1, 0.9, 0.18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  const opacity = interpolate(drop, [0, 0.76, 1], [1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tilt = interpolate(drop, [0, 1], [0, card.index % 2 === 0 ? -1.6 : 1.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const connectorOpacity = interpolate(drop, [0, 0.18, 0.82, 1], [0.38, 0.55, 0.28, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: x,
          top: y + CARD_HEIGHT / 2 - 8,
          width: 1,
          height: Math.max(0, layerY - (y + CARD_HEIGHT / 2 - 8)),
          transform: "translateX(-50%)",
          opacity: connectorOpacity,
          background:
            "linear-gradient(180deg, rgba(186,178,255,0.68), rgba(255,255,255,0.36), rgba(255,255,255,0))",
          boxShadow: "0 0 12px rgba(186,178,255,0.32)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: CARD_WIDTH,
          minHeight: CARD_HEIGHT,
          transform: `translate(-50%, -50%) scale(${scale}) rotate(${tilt}deg)`,
          opacity,
          padding: 1,
          borderRadius: 16,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(186,178,255,0.72) 42%, rgba(85,56,199,0.52))",
          boxShadow:
            "0 16px 28px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.72)",
          fontFamily: LUCIUS.sans,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: CARD_HEIGHT - 2,
            borderRadius: 15,
            padding: "10px 12px 11px",
            background:
              "linear-gradient(180deg, rgba(255,253,248,0.96), rgba(249,246,255,0.94))",
            border: "1px solid rgba(255,255,255,0.62)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: -28,
              top: -30,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: `${app.accent}18`,
              filter: "blur(2px)",
            }}
          />

          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: LUCIUS.purple,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 0,
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 19,
                  height: 19,
                  borderRadius: 7,
                  background: "rgba(85,56,199,0.11)",
                  border: "1px solid rgba(85,56,199,0.20)",
                  color: LUCIUS.purple,
                  fontSize: 11,
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                L
              </span>
              <span>Lucius memory</span>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                height: 26,
                padding: "0 8px 0 6px",
                borderRadius: 9,
                background: app.surface,
                border: `1px solid ${app.accent}20`,
                color: app.accent,
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              <Img
                src={staticFile(app.logo)}
                style={{
                  width: 15,
                  height: 15,
                  objectFit: "contain",
                  display: "block",
                }}
              />
              <span>{app.name}</span>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 9,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: LUCIUS.purple,
                boxShadow: "0 0 12px rgba(85,56,199,0.5)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 17,
                fontWeight: 650,
                color: LUCIUS.ink,
                whiteSpace: "nowrap",
                letterSpacing: 0,
                lineHeight: 1.1,
              }}
            >
              {card.label}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

const CollapsingLayer: React.FC<{
  local: number;
  width: number;
  height: number;
}> = ({ local, width, height }) => {
  const cy = height * LAYER_Y_PCT;
  const fullW = width * LAYER_W_PCT;
  const startX = (width - fullW) / 2;
  const endX = startX + fullW;
  const centerX = width / 2;
  const collapse = interpolate(local, [COLLAPSE_START, COLLAPSE_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_IN_OUT,
  });
  const leftX = interpolate(collapse, [0, 1], [startX, centerX - 7]);
  const rightX = interpolate(collapse, [0, 1], [endX, centerX + 7]);
  const lineOpacity = interpolate(local, [0, COLLAPSE_END, BRAND_START], [0.52, 0.82, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const layerFade = interpolate(
    local,
    [BRAND_START - fpsFrames(16), BRAND_START + fpsFrames(12)],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE_OUT,
    },
  );

  const bars = Array.from({ length: BARS }, (_, index) => {
    const t = index / (BARS - 1);
    const x = startX + t * fullW;
    let energy = 0;

    for (const card of CARDS) {
      const impactLocal = local - card.impactFrame;
      if (impactLocal < 0 || impactLocal > fpsFrames(40)) continue;

      const envelope = interpolate(
        impactLocal,
        [0, fpsFrames(2), fpsFrames(16), fpsFrames(34)],
        [0.26, 1, 0.48, 0],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: EASE_OUT,
        },
      );
      const dist = Math.abs(t - (card.xPct - (1 - LAYER_W_PCT) / 2) / LAYER_W_PCT);
      const bloom = Math.exp(-(dist * dist) / 0.0017);
      energy = Math.max(energy, envelope * bloom);
    }

    const centerPull = interpolate(collapse, [0.34, 1], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE_IN_OUT,
    });
    const centerDist = Math.abs(x - centerX) / fullW;
    const centerEnergy = centerPull * Math.exp(-(centerDist * centerDist) / 0.0024);
    const total = Math.max(energy, centerEnergy);
    const baseIdle = 0.18 + Math.sin(local / fpsFrames(18) + index * 0.7) * 0.04;
    const barHeight = 4 + baseIdle * 8 + total * 62;
    const opacity = softClamp(0.16 + baseIdle * 0.16 + total * 0.62, 0.08, 0.9);
    const color = total > 0.54 ? "#5538c7" : total > 0.2 ? "#8e7cff" : "#bab2ff";

    return { x, barHeight, opacity, color, total };
  });

  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <defs>
        <clipPath id="closing-layer-collapse">
          <rect x={leftX - 8} y={cy - 96} width={Math.max(0, rightX - leftX + 16)} height={192} />
        </clipPath>
      </defs>

      <g clipPath="url(#closing-layer-collapse)">
        {bars.map((bar, index) => (
          <rect
            key={index}
            x={bar.x - (bar.total > 0.18 ? 1.4 : 0.9)}
            y={cy - bar.barHeight / 2}
            width={bar.total > 0.18 ? 2.8 : 1.8}
            height={bar.barHeight}
            rx={2}
            fill={bar.color}
            fillOpacity={bar.opacity * layerFade}
            style={{
              filter:
                bar.total > 0.18 && layerFade > 0.2
                  ? "drop-shadow(0 0 7px rgba(142,124,255,0.42))"
                  : "none",
            }}
          />
        ))}
        <line
          x1={leftX}
          x2={rightX}
          y1={cy}
          y2={cy}
          stroke="#ffffff"
          strokeWidth={1.15}
          strokeOpacity={lineOpacity * layerFade}
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

const CenterCore: React.FC<{
  local: number;
  width: number;
  height: number;
}> = ({ local, width, height }) => {
  const cy = height * LAYER_Y_PCT;
  const centerX = width / 2;
  const core = interpolate(local, [COLLAPSE_START, COLLAPSE_END, BRAND_START], [0, 1, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  const brand = interpolate(local, [BRAND_START, BRAND_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  if (core <= 0 && brand <= 0) return null;

  const dotSize = interpolate(core, [0, 1], [8, 38], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dotOpacity = interpolate(brand, [0, 0.22, 0.7], [1, 0.25, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sealOpacity = interpolate(brand, [0.12, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  const sealScale = interpolate(brand, [0, 1], [0.82, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: centerX,
          top: cy,
          width: dotSize,
          height: dotSize,
          transform: "translate(-50%, -50%)",
          opacity: dotOpacity,
          borderRadius: "50%",
          background: "#ffffff",
          border: "1px solid rgba(255,255,255,0.75)",
          boxShadow:
            "0 0 22px rgba(255,255,255,0.76), 0 0 54px rgba(85,56,199,0.72)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: centerX,
          top: cy,
          transform: `translate(-50%, -50%) scale(${sealScale})`,
          opacity: sealOpacity,
          width: 82,
          height: 82,
          borderRadius: 24,
          background: "rgba(85,56,199,0.96)",
          border: "1px solid rgba(255,255,255,0.62)",
          boxShadow:
            "0 0 24px rgba(255,255,255,0.44), 0 0 42px rgba(85,56,199,0.58), 0 18px 34px rgba(0,0,0,0.36)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <Img
          src={staticFile("brand/lucius-mark-white.svg")}
          style={{
            width: 48,
            height: 48,
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: centerX,
          top: cy + 76,
          transform: "translateX(-50%)",
          opacity: sealOpacity,
          fontFamily: LUCIUS.sans,
          fontSize: 19,
          fontWeight: 650,
          color: "rgba(255,253,248,0.92)",
          letterSpacing: 0,
          textShadow: "0 1px 10px rgba(0,0,0,0.86), 0 0 8px rgba(255,253,248,0.18)",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        Context that compounds.
      </div>
    </>
  );
};

export const Phase4Network: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  if (frame < CLOSING_START) return null;

  const local = frame - CLOSING_START;

  return (
    <>
      <CollapsingLayer local={local} width={width} height={height} />
      {CARDS.map((card) => (
        <ClosingCard key={card.label} card={card} local={local} width={width} height={height} />
      ))}
      <CenterCore local={local} width={width} height={height} />
    </>
  );
};
