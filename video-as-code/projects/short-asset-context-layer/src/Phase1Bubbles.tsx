import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const THEME = {
  sentBg: "#0A7AFF",
  receivedBg: "#3A3A3C",
  white: "#FFFFFF",
  fontFamily: "'Inter', 'SF Pro Display', sans-serif",
};

// Phase 1 持续 120 帧（4s）
const PHASE1_DURATION = 120;

interface Bubble {
  text: string;
  startFrame: number;
  fromX: number; // % of width, offset from cx
  fromY: number; // % of height, offset from cy
  toX: number;
  toY: number;
  isOwn: boolean;
}

// 位置集中在屏幕中间偏下，扩散范围收紧到 ±20%
const BUBBLES: Bubble[] = [
  { text: "What did we decide on pricing? 💰", startFrame: 0,  fromX: -22, fromY: -14, toX: -16, toY: -9,  isOwn: false },
  { text: "The onboarding doc is ready ✅",     startFrame: 10, fromX:  20, fromY: -16, toX:  14, toY: -10, isOwn: true  },
  { text: "Can you check the Q3 summary? 📊",   startFrame: 20, fromX: -24, fromY:  4,  toX: -18, toY:  3,  isOwn: false },
  { text: "I'll loop in the design team 🎨",    startFrame: 30, fromX:  22, fromY:  7,  toX:  15, toY:  5,  isOwn: true  },
  { text: "Customer said yes to the demo 🎉",   startFrame: 40, fromX:  -5, fromY: -22, toX:  -3, toY: -15, isOwn: false },
  { text: "Ship it by Thursday 🚀",             startFrame: 50, fromX:   8, fromY: -20, toX:   6, toY: -13, isOwn: true  },
  { text: "Who owns this feature? 🤔",          startFrame: 60, fromX: -20, fromY:  16, toX: -14, toY:  11, isOwn: false },
];

const BubbleItem: React.FC<{ bubble: Bubble }> = ({ bubble }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const localFrame = frame - bubble.startFrame;

  const progress = spring({
    frame: localFrame,
    fps,
    config: { damping: 18, stiffness: 80, mass: 1 },
  });

  // 延长可见时间，在 phase 末尾才开始淡出
  const opacity = interpolate(
    localFrame,
    [0, 8, PHASE1_DURATION - 20, PHASE1_DURATION],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (localFrame < 0 || opacity <= 0) return null;

  // 中心点与 Phase 2 layer 对齐（屏幕 72%）
  const cx = width / 2;
  const cy = height * 0.72;

  const x = cx + interpolate(progress, [0, 1], [bubble.fromX / 100 * width, bubble.toX / 100 * width]);
  const y = cy + interpolate(progress, [0, 1], [bubble.fromY / 100 * height, bubble.toY / 100 * height]);

  const scale = interpolate(localFrame, [0, 10], [0.7, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
      }}
    >
      <div
        style={{
          background: bubble.isOwn ? THEME.sentBg : "rgba(40,40,48,0.92)",
          borderRadius: bubble.isOwn ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          padding: "12px 20px",
          fontSize: 26,
          fontFamily: THEME.fontFamily,
          fontWeight: 400,
          color: THEME.white,
          whiteSpace: "nowrap",
          boxShadow: "0 4px 24px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.08) inset",
          backdropFilter: "blur(12px)",
          lineHeight: 1.4,
        }}
      >
        {bubble.text}
      </div>
    </div>
  );
};

export const Phase1Bubbles: React.FC = () => {
  return (
    <>
      {BUBBLES.map((b, i) => (
        <BubbleItem key={i} bubble={b} />
      ))}
    </>
  );
};
