import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const THEME = {
  accent: "#7C3AED",
  accentLight: "#A78BFA",
  accentGlow: "rgba(124,58,237,0.6)",
  label: "rgba(255,255,255,0.75)",
  fontFamily: "'Inter', 'SF Pro Display', sans-serif",
};

const PHASE3_START = 220;
const LAYER_Y_PCT = 0.72;

interface Dot {
  col: number;
  row: number;
  size: number;
  maxOpacity: number;
  delay: number;
  pulse: boolean;
  label?: string;
}

const COLS = 12;
const ROWS = 4;

// 7 labeled dots at specific grid positions, spread across the grid
const LABEL_MAP: Record<string, string> = {
  "1-1": "Pricing",
  "3-0": "Roadmap",
  "5-2": "Client",
  "7-1": "Design",
  "9-0": "Q3 Review",
  "10-3": "Ops",
  "4-3": "Strategy",
};

function buildDots(): Dot[] {
  const dots: Dot[] = [];
  const centerCol = (COLS - 1) / 2;
  const centerRow = (ROWS - 1) / 2;
  const maxDist = Math.sqrt(centerCol ** 2 + centerRow ** 2);

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const dist = Math.sqrt((c - centerCol) ** 2 + (r - centerRow) ** 2);
      const i = r * COLS + c;
      const v = ((i * 137 + 31) % 100) / 100;

      dots.push({
        col: c,
        row: r,
        size: 4 + v * 10,
        maxOpacity: 0.18 + v * 0.82,
        delay: (dist / maxDist) * 36 + v * 8,
        pulse: v > 0.62,
        label: LABEL_MAP[`${c}-${r}`],
      });
    }
  }
  return dots;
}

const DOTS = buildDots();

// ── Single dot + optional label ──────────────────────────────────────────────
const DotItem: React.FC<{ dot: Dot; localFrame: number; x: number; y: number }> = ({
  dot, localFrame, x, y,
}) => {
  const { fps } = useVideoConfig();
  const dotLocal = localFrame - dot.delay;

  const appear = spring({
    frame: dotLocal,
    fps,
    config: { damping: 16, stiffness: 120, mass: 0.6 },
  });

  const opacity = interpolate(dotLocal, [0, 8], [0, dot.maxOpacity], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (dotLocal < 0 || opacity <= 0) return null;

  const pulseLocal = dotLocal - 16;
  const pulse = dot.pulse && pulseLocal > 0
    ? 0.85 + 0.15 * Math.sin((pulseLocal / fps) * Math.PI * 1.6)
    : 1;

  const scale = appear * pulse;
  const r = (dot.size / 2) * scale;
  const glow = dot.maxOpacity > 0.65;

  // Label fades in 10f after dot appears
  const labelLocal = dotLocal - 10;
  const labelOpacity = dot.label
    ? interpolate(labelLocal, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  return (
    <>
      {/* Dot */}
      <div style={{
        position: "absolute",
        left: x - r,
        top: y - r,
        width: r * 2,
        height: r * 2,
        borderRadius: "50%",
        background: dot.maxOpacity > 0.8
          ? `radial-gradient(circle, ${THEME.accentLight}, ${THEME.accent})`
          : THEME.accent,
        opacity,
        boxShadow: glow
          ? `0 0 ${r * 2.5}px ${r * 1.5}px ${THEME.accentGlow}, 0 0 ${r * 5}px ${r * 2}px rgba(124,58,237,0.2)`
          : "none",
      }} />

      {/* Label */}
      {dot.label && labelOpacity > 0 && (
        <div style={{
          position: "absolute",
          left: x,
          top: y + r + 10,
          transform: "translateX(-50%)",
          fontFamily: THEME.fontFamily,
          fontSize: 18,
          fontWeight: 500,
          color: THEME.label,
          whiteSpace: "nowrap",
          opacity: labelOpacity,
          letterSpacing: "0.04em",
          textShadow: "0 1px 6px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,0.8)",
        }}>
          {dot.label}
        </div>
      )}
    </>
  );
};

// ── Dot grid ─────────────────────────────────────────────────────────────────
const DotGrid: React.FC<{ localFrame: number }> = ({ localFrame }) => {
  const { width, height } = useVideoConfig();

  const gridTop = height * LAYER_Y_PCT + 50;
  const gridBottom = height - 60;
  const gridLeft = width * 0.12;
  const gridRight = width * 0.88;

  const colStep = (gridRight - gridLeft) / (COLS - 1);
  const rowStep = (gridBottom - gridTop) / (ROWS - 1);

  return (
    <>
      {DOTS.map((dot, i) => {
        const x = gridLeft + dot.col * colStep;
        const y = gridTop + dot.row * rowStep;
        return <DotItem key={i} dot={dot} localFrame={localFrame} x={x} y={y} />;
      })}
    </>
  );
};

// ── Main export ──────────────────────────────────────────────────────────────
export const Phase3Brand: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - PHASE3_START;
  if (localFrame < 0) return null;

  return <DotGrid localFrame={localFrame} />;
};
