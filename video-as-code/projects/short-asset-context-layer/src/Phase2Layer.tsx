import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const THEME = {
  accent: "#7C3AED",
  accentLight: "#A78BFA",
  accentGlow: "rgba(124,58,237,0.5)",
  check: "#34D399",
  white: "#FFFFFF",
  cardBg: "rgba(10,6,20,0.88)",
  cardBorder: "rgba(255,255,255,0.18)",
  fontFamily: "'Inter', 'SF Pro Display', sans-serif",
};

const PHASE2_START = 120;
const LAYER_Y_PCT = 0.72;

interface SinkStream {
  offsetX: number;
  startOffsetY: number; // px above the layer (negative)
  delay: number;
  size: number;         // orb radius
  fallDuration: number;
  label?: string;       // optional short text
}

interface MemoryCard {
  title: string;
  offsetX: number;
  finalOffsetY: number; // px BELOW the layer (positive)
  delay: number;
}

// 14 chaotic falling streams — mix of orbs and text fragments
const STREAMS: SinkStream[] = [
  { offsetX: -560, startOffsetY: -320, delay: 2,  size: 7,  fallDuration: 25 },
  { offsetX: -440, startOffsetY: -280, delay: 6,  size: 5,  fallDuration: 20, label: "re: pricing" },
  { offsetX: -310, startOffsetY: -350, delay: 0,  size: 8,  fallDuration: 28 },
  { offsetX: -200, startOffsetY: -260, delay: 9,  size: 5,  fallDuration: 22, label: "fyi team" },
  { offsetX: -100, startOffsetY: -310, delay: 4,  size: 6,  fallDuration: 24 },
  { offsetX:  -20, startOffsetY: -290, delay: 11, size: 5,  fallDuration: 20, label: "Q3 update" },
  { offsetX:   80, startOffsetY: -340, delay: 3,  size: 7,  fallDuration: 26 },
  { offsetX:  170, startOffsetY: -270, delay: 8,  size: 5,  fallDuration: 21 },
  { offsetX:  270, startOffsetY: -300, delay: 5,  size: 8,  fallDuration: 27, label: "ship it" },
  { offsetX:  370, startOffsetY: -260, delay: 13, size: 5,  fallDuration: 19 },
  { offsetX:  460, startOffsetY: -330, delay: 1,  size: 6,  fallDuration: 25 },
  { offsetX:  550, startOffsetY: -285, delay: 7,  size: 5,  fallDuration: 22, label: "confirmed" },
  { offsetX: -380, startOffsetY: -240, delay: 14, size: 4,  fallDuration: 18 },
  { offsetX:  140, startOffsetY: -250, delay: 10, size: 4,  fallDuration: 19 },
];

// 4 clean memory cards, emerge BELOW the layer
const CARDS: MemoryCard[] = [
  { title: "Pricing locked for Q3",      offsetX: -450, finalOffsetY: 90,  delay: 34 },
  { title: "Demo confirmed with client", offsetX: -140, finalOffsetY: 110, delay: 44 },
  { title: "Design handoff by Wed",      offsetX:  145, finalOffsetY: 90,  delay: 54 },
  { title: "Ships Thursday 🚀",          offsetX:  430, finalOffsetY: 100, delay: 64 },
];

// ── Glow layer ───────────────────────────────────────────────────────────────
const GlowLayer: React.FC<{ localFrame: number }> = ({ localFrame }) => {
  const { width, height } = useVideoConfig();
  const { fps } = useVideoConfig();

  const scaleX = spring({ frame: localFrame, fps, config: { damping: 22, stiffness: 55, mass: 1 } });
  const opacity = interpolate(localFrame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const layerW = width * 0.68;
  const cx = width / 2;
  const cy = height * LAYER_Y_PCT;

  return (
    <div style={{
      position: "absolute",
      left: cx - (layerW / 2) * scaleX,
      top: cy,
      width: layerW * scaleX,
      height: 3,
      background: `linear-gradient(90deg, transparent, ${THEME.accent}, ${THEME.accentLight}, ${THEME.accent}, transparent)`,
      boxShadow: `0 0 20px 5px ${THEME.accentGlow}, 0 0 50px 10px rgba(124,58,237,0.18)`,
      opacity,
      borderRadius: 2,
    }} />
  );
};

// ── Falling orb / text fragment ──────────────────────────────────────────────
const SinkOrb: React.FC<{ stream: SinkStream; localFrame: number }> = ({ stream, localFrame }) => {
  const { width, height } = useVideoConfig();

  const orbLocal = localFrame - stream.delay;
  if (orbLocal < 0) return null;

  const fallProgress = interpolate(orbLocal, [0, stream.fallDuration], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const opacity = interpolate(orbLocal, [0, 4, stream.fallDuration - 5, stream.fallDuration], [0, 0.85, 0.85, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  if (opacity <= 0) return null;

  const cx = width / 2;
  const cy = height * LAYER_Y_PCT;
  const x = cx + stream.offsetX;
  const y = cy + interpolate(fallProgress, [0, 1], [stream.startOffsetY, -2]);

  if (stream.label) {
    return (
      <div style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        opacity,
        fontFamily: THEME.fontFamily,
        fontSize: 18,
        fontWeight: 400,
        color: `rgba(167,139,250,0.7)`,
        whiteSpace: "nowrap",
        letterSpacing: "0.03em",
        textShadow: `0 0 10px ${THEME.accentGlow}, 0 2px 8px rgba(0,0,0,0.9)`,
      }}>
        {stream.label}
      </div>
    );
  }

  const trailH = interpolate(fallProgress, [0, 1], [stream.size * 1.2, stream.size * 3.5]);

  return (
    <div style={{
      position: "absolute",
      left: x - stream.size / 2,
      top: y,
      width: stream.size,
      height: trailH,
      borderRadius: stream.size,
      background: `radial-gradient(ellipse at 50% 20%, ${THEME.accentLight}, ${THEME.accent})`,
      boxShadow: `0 0 ${stream.size + 4}px ${stream.size}px ${THEME.accentGlow}`,
      opacity,
      transform: "translateY(-50%)",
    }} />
  );
};

// ── Memory card (emerges below the layer) ────────────────────────────────────
const MemoryCardItem: React.FC<{ card: MemoryCard; localFrame: number }> = ({ card, localFrame }) => {
  const { width, height } = useVideoConfig();
  const { fps } = useVideoConfig();

  const cardLocal = localFrame - card.delay;
  if (cardLocal < 0) return null;

  const drop = spring({ frame: cardLocal, fps, config: { damping: 18, stiffness: 80, mass: 1 } });
  const opacity = interpolate(cardLocal, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  if (opacity <= 0) return null;

  const cx = width / 2;
  const cy = height * LAYER_Y_PCT;
  const x = cx + card.offsetX;
  const y = cy + interpolate(drop, [0, 1], [0, card.finalOffsetY]);
  const scale = interpolate(cardLocal, [0, 8], [0.7, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{
      position: "absolute",
      left: x,
      top: y,
      transform: `translate(-50%, -50%) scale(${scale})`,
      opacity,
    }}>
      <div style={{
        background: THEME.cardBg,
        border: `1px solid ${THEME.cardBorder}`,
        borderLeft: `3px solid ${THEME.accent}`,
        borderRadius: "10px",
        padding: "14px 20px",
        minWidth: 255,
        display: "flex",
        alignItems: "center",
        gap: 12,
        boxShadow: "0 6px 32px rgba(0,0,0,0.75), 0 0 20px rgba(124,58,237,0.2)",
        backdropFilter: "blur(16px)",
      }}>
        <div style={{
          width: 22, height: 22, borderRadius: "50%",
          background: "rgba(52,211,153,0.15)",
          border: `1.5px solid ${THEME.check}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, fontSize: 13, color: THEME.check, fontWeight: 700,
        }}>✓</div>
        <span style={{
          fontFamily: THEME.fontFamily, fontSize: 22, fontWeight: 500,
          color: THEME.white, letterSpacing: "0.01em", whiteSpace: "nowrap",
        }}>
          {card.title}
        </span>
      </div>
    </div>
  );
};

// ── Main export ──────────────────────────────────────────────────────────────
export const Phase2Layer: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - PHASE2_START;
  if (localFrame < 0) return null;

  return (
    <>
      <GlowLayer localFrame={localFrame} />
      {STREAMS.map((s, i) => <SinkOrb key={i} stream={s} localFrame={localFrame} />)}
      {CARDS.map((c, i) => <MemoryCardItem key={i} card={c} localFrame={localFrame} />)}
    </>
  );
};
