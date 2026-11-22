import {
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  staticFile,
} from "remotion";
import { APP_META, type ChannelApp } from "./conversationSources";
import { FRAME_SCALE, fpsFrames, LUCIUS, TIMING } from "./theme";

// Stage 3 (250-360f / 8.3-12s): "And it keeps what matters".
// Cards rise from the context layer as saved memories, then compress into
// the primary network nodes used by Phase4Network.

const PHASE_START = TIMING.stage2End; // 250
const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);

const LAYER_Y_PCT = 0.78;
const CARD_STAGGER_FRAMES = fpsFrames(10);
const CARD_ENTER_FRAMES = fpsFrames(36);

export interface PrimaryNodePosition {
  xPct: number;
  yPct: number;
  label: string;
  node: string;
  app: ChannelApp;
  detail: string;
}

// Shared with Phase4Network so cards can transition into nodes at known positions.
export const PRIMARY_NODE_POSITIONS: PrimaryNodePosition[] = [
  {
    xPct: 0.20,
    yPct: 0.68,
    label: "Pricing rationale",
    node: "Sales",
    app: "slack",
    detail: "from sales + support",
  },
  {
    xPct: 0.40,
    yPct: 0.68,
    label: "Customer objection",
    node: "Customer",
    app: "email",
    detail: "kept as customer memory",
  },
  {
    xPct: 0.60,
    yPct: 0.68,
    label: "Launch decision",
    node: "Product",
    app: "feishu",
    detail: "ready for the next answer",
  },
  {
    xPct: 0.80,
    yPct: 0.68,
    label: "Team preference",
    node: "Roadmap",
    app: "discord",
    detail: "reused across conversations",
  },
];

interface Card {
  title: string;
  xPct: number;
  yPct: number;
  delay: number;
  app: ChannelApp;
  detail: string;
}

const CARDS: Card[] = PRIMARY_NODE_POSITIONS.map((p, i) => ({
  title: p.label,
  xPct: p.xPct,
  yPct: p.yPct,
  delay: i * CARD_STAGGER_FRAMES,
  app: p.app,
  detail: p.detail,
}));

const CardItem: React.FC<{ card: Card; phaseLocal: number }> = ({
  card,
  phaseLocal,
}) => {
  const { width, height } = useVideoConfig();
  const local = phaseLocal - card.delay;
  if (local < 0) return null;
  const local30 = local / FRAME_SCALE;
  const delay30 = card.delay / FRAME_SCALE;

  const fade = interpolate(local, [0, fpsFrames(12), CARD_ENTER_FRAMES], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  const rise = interpolate(local, [0, fpsFrames(28), CARD_ENTER_FRAMES], [0, 1.045, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  const enterScale = interpolate(local, [0, fpsFrames(18), CARD_ENTER_FRAMES], [0.84, 1.04, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  const idle =
    Math.sin((local30 - CARD_ENTER_FRAMES / FRAME_SCALE) / 90 + delay30 / 6) *
    1.15;

  const startY = height * LAYER_Y_PCT;
  const endY = height * card.yPct;
  const x = width * card.xPct;
  const y =
    interpolate(rise, [0, 1], [startY, endY]) +
    idle;
  const scale = enterScale;
  const app = APP_META[card.app];
  const cardWidth = 278;
  const cardHeight = 92;

  const connectorTop = y + cardHeight / 2 - 6;
  const connectorHeight = Math.max(0, startY - connectorTop);
  const connectorOpacity =
    fade *
    interpolate(local, [fpsFrames(6), fpsFrames(26)], [0, 0.46], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  const beadProgress = interpolate(local, [fpsFrames(4), CARD_ENTER_FRAMES], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  const beadY =
    interpolate(beadProgress, [0, 1], [startY, endY + cardHeight / 2 - 10]) +
    idle * 0.2;
  const beadOpacity =
    fade *
    interpolate(beadProgress, [0, 0.24, 0.88, 1], [0, 0.86, 0.72, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  const shimmerLocal = local - CARD_ENTER_FRAMES - fpsFrames(8);
  const shimmerProgress = interpolate(shimmerLocal, [0, fpsFrames(42)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shimmerOpacity = interpolate(
    shimmerLocal,
    [0, fpsFrames(10), fpsFrames(36), fpsFrames(50)],
    [0, 0.28, 0.16, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE_OUT,
    },
  );
  const shimmerX = interpolate(shimmerProgress, [0, 1], [-80, cardWidth + 60]);
  const tilt =
    Math.sin(local30 / 120 + delay30 / 12) * 0.12;

  return (
    <>
      {connectorHeight > 2 ? (
        <div
          style={{
            position: "absolute",
            left: x,
            top: connectorTop,
            zIndex: 18,
            width: 1,
            height: connectorHeight,
            transform: "translateX(-50%)",
            opacity: connectorOpacity,
            background:
              "linear-gradient(180deg, rgba(186,178,255,0.72), rgba(186,178,255,0.26), rgba(217,212,255,0))",
            boxShadow: "0 0 12px rgba(186,178,255,0.34)",
          }}
        />
      ) : null}

      <div
        style={{
          position: "absolute",
          left: x,
          top: beadY,
          zIndex: 32,
          width: 7,
          height: 7,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          opacity: beadOpacity,
          background: "#f7f3ff",
          border: "1px solid rgba(186,178,255,0.9)",
          boxShadow:
            "0 0 14px rgba(186,178,255,0.88), 0 0 30px rgba(85,56,199,0.34)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          zIndex: 30,
          transform: `translate(-50%, -50%) scale(${scale}) rotate(${tilt}deg)`,
          opacity: fade,
          fontFamily: LUCIUS.sans,
          filter: "drop-shadow(0 16px 28px rgba(0,0,0,0.30))",
        }}
      >
        <div
          style={{
            width: cardWidth,
            minHeight: cardHeight,
            padding: 1,
            borderRadius: 16,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(186,178,255,0.72) 42%, rgba(85,56,199,0.52))",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.72), 0 0 28px rgba(186,178,255,0.18)",
          }}
        >
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              minHeight: cardHeight - 2,
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
                top: 0,
                left: shimmerX,
                width: 72,
                height: "100%",
                transform: "skewX(-18deg)",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.54), transparent)",
                opacity: shimmerOpacity,
              }}
            />

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
                  minWidth: 0,
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
                {card.title}
              </span>
            </div>

            <div
              style={{
                position: "relative",
                marginTop: 5,
                paddingLeft: 17,
                fontSize: 12,
                fontWeight: 500,
                color: "rgba(45,42,58,0.58)",
                whiteSpace: "nowrap",
                letterSpacing: 0,
              }}
            >
              {card.detail}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Phase3Cards: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < PHASE_START) return null;
  if (frame >= TIMING.stage3End) return null;

  const phaseLocal = frame - PHASE_START;
  return (
    <>
      {CARDS.map((c, i) => (
        <CardItem key={i} card={c} phaseLocal={phaseLocal} />
      ))}
    </>
  );
};
