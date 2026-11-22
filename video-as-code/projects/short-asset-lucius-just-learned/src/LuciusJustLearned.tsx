import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const COLORS = {
  paper: "#F7F0E6",
  card: "#FEFBF4",
  cardStroke: "#E5D9C7",
  chipStroke: "#E6D8F3",
  gridFine: "rgba(207,196,178,0.2)",
  gridBold: "rgba(191,177,154,0.24)",
  ink: "#211541",
  purple: "#5D31D6",
  purpleDeep: "#3C1F8F",
  purpleMid: "#7652E6",
  purpleSoft: "#B895F8",
  lavender: "#EEE6FF",
  muted: "#7B6F81",
  shadow: "rgba(70, 52, 25, 0.18)",
  arrowGreen: "#1B4038",
  arrowPurple: "#522BC1",
};

const TYPE = {
  sans:
    '"SF Pro Display", "SF Pro Text", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
  serif: '"Georgia", "Times New Roman", serif',
  recoleta: '"Recoleta Lucius", "Recoleta", "Times New Roman", serif',
  bentham: '"Bentham", "Georgia", "Times New Roman", serif',
};

const CARD = {
  x: 275,
  y: 194,
  width: 2010,
  height: 1038,
};

const BEATS = {
  background: 0,
  card: 0.24,
  title: 0.61,
  startMetric: 1.07,
  guideStart: 1.47,
  guides: 1.71,
  curve: 1.87,
  arrow: 2.53,
  endMetric: 3.33,
  month: 4.13,
  prompts: 4.80,
  fineTuning: 5.53,
};

const ARROW = {
  x: 770,
  y: 414,
  width: 457,
  height: 212,
  viewWidth: 473,
  viewHeight: 228,
};

const METRIC = {
  height: 360,
  gap: 14,
  left: {
    x: 330,
    y: 372,
    numberSize: 240,
    percentSize: 96,
    numberWidth: 300,
    percentWidth: 88,
  },
  right: {
    x: 1270,
    y: 330,
    numberStartSize: 240,
    numberEndSize: 360,
    numberWidth: 450,
    percentWidth: 158,
  },
};

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const crisp = Easing.bezier(0.2, 0.84, 0.22, 1);
const springEase = Easing.bezier(0.34, 1.56, 0.64, 1);
const DRAW_TIMING = {
  start: BEATS.curve,
  end: BEATS.arrow + 0.08,
};

const tween = (
  frame: number,
  fps: number,
  seconds: [number, number],
  output: [number, number],
  easing = easeOut,
) =>
  interpolate(frame, [seconds[0] * fps, seconds[1] * fps], output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

const PaperBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = tween(frame, fps, [BEATS.background, BEATS.background + 0.55], [0, 1], crisp);

  return (
    <AbsoluteFill
      style={{
        opacity,
        backgroundColor: COLORS.paper,
        backgroundImage: [
          `linear-gradient(${COLORS.gridFine} 1px, transparent 1px)`,
          `linear-gradient(90deg, ${COLORS.gridFine} 1px, transparent 1px)`,
          `linear-gradient(${COLORS.gridBold} 1px, transparent 1px)`,
          `linear-gradient(90deg, ${COLORS.gridBold} 1px, transparent 1px)`,
          "radial-gradient(circle at 30% 24%, rgba(255,255,255,0.38), transparent 22%)",
        ].join(", "),
        backgroundSize: "22px 22px, 22px 22px, 520px 520px, 520px 520px, 100% 100%",
        overflow: "hidden",
      }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(255,253,246,0.72), transparent 44%), radial-gradient(circle at 77% 64%, rgba(186,149,248,0.08), transparent 24%), linear-gradient(180deg, rgba(255,252,244,0.28), rgba(235,226,211,0.22))",
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.14,
          backgroundImage:
            "repeating-radial-gradient(circle at 20% 20%, rgba(71,49,28,0.13) 0 0.8px, transparent 0.8px 3px)",
          mixBlendMode: "multiply",
        }}
      />
    </AbsoluteFill>
  );
};

const PercentMetric: React.FC<{
  value: string;
  left: number;
  top: number;
  delay: number;
  numberWidth: number;
  percentWidth: number;
}> = ({ value, left, top, delay, numberWidth, percentWidth }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const target = parseInt(value, 10);
  const countProgress = tween(frame, fps, [delay, delay + 0.52], [0, 1], easeOut);
  const displayValue = Math.round(target * countProgress);
  const containerOpacity = tween(frame, fps, [delay, delay + 0.22], [0, 1], crisp);
  const percentOpacity = tween(frame, fps, [delay + 0.14, delay + 0.32], [0, 1], crisp);
  const entrySpring = spring({ frame: Math.max(0, frame - delay * fps), fps, config: { stiffness: 220, damping: 16 } });
  const slideY = 10 * (1 - entrySpring);
  const scaleIn = 1.14 - 0.14 * entrySpring;

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: numberWidth + METRIC.gap + percentWidth,
        height: METRIC.height,
        opacity: containerOpacity,
        transform: `translateY(${slideY}px) scale(${scaleIn})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: METRIC.gap,
        color: COLORS.arrowGreen,
        lineHeight: "normal",
        textAlign: "center",
        whiteSpace: "nowrap",
      }}>
      <span
        style={{
          width: numberWidth,
          textAlign: "right",
          fontFamily: TYPE.recoleta,
          fontSize: METRIC.left.numberSize,
          fontWeight: 400,
          fontStyle: "normal",
          lineHeight: "normal",
          letterSpacing: 0,
          fontVariantNumeric: "tabular-nums",
        }}>
        {displayValue}
      </span>
      <span
        style={{
          width: percentWidth,
          textAlign: "left",
          fontFamily: TYPE.bentham,
          fontSize: METRIC.left.percentSize,
          fontWeight: 400,
          fontStyle: "normal",
          lineHeight: "normal",
          letterSpacing: 0,
          opacity: percentOpacity,
        }}>
        {"%"}
      </span>
    </div>
  );
};

const gradientMetricText = {
  background: "linear-gradient(136deg, #C0AAFF 18.61%, #522BC1 76.69%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
} satisfies React.CSSProperties;

const AnimatedEndMetric: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const countProgress = tween(
    frame,
    fps,
    [DRAW_TIMING.start, DRAW_TIMING.end],
    [0, 1],
    Easing.linear,
  );
  const opacity = tween(frame, fps, [DRAW_TIMING.start + 0.08, DRAW_TIMING.start + 0.38], [0, 1], crisp);
  const entrySpring = spring({ frame: Math.max(0, frame - (DRAW_TIMING.start + 0.08) * fps), fps, config: { stiffness: 220, damping: 16 } });
  const slideY = 10 * (1 - entrySpring);
  const scaleIn = 1.14 - 0.14 * entrySpring;
  const value = Math.round(29 + (88 - 29) * countProgress);
  const numberSize = METRIC.right.numberStartSize + (METRIC.right.numberEndSize - METRIC.right.numberStartSize) * countProgress;
  const percentSize = numberSize * 0.43;

  return (
    <div
      style={{
        position: "absolute",
        left: METRIC.right.x,
        top: METRIC.right.y,
        width: METRIC.right.numberWidth + METRIC.gap + METRIC.right.percentWidth,
        height: METRIC.height,
        opacity,
        transform: `translateY(${slideY}px) scale(${scaleIn})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: METRIC.gap,
        color: COLORS.arrowPurple,
        textAlign: "center",
        lineHeight: "normal",
        whiteSpace: "nowrap",
      }}>
      <span
        style={{
          width: METRIC.right.numberWidth,
          textAlign: "right",
          fontFamily: TYPE.recoleta,
          fontSize: numberSize,
          fontWeight: 400,
          fontStyle: "normal",
          lineHeight: "normal",
          letterSpacing: 0,
          fontVariantNumeric: "tabular-nums",
          ...gradientMetricText,
        }}>
        {value}
      </span>
      <span
        style={{
          width: METRIC.right.percentWidth,
          textAlign: "left",
          fontFamily: TYPE.bentham,
          fontSize: percentSize,
          fontWeight: 400,
          fontStyle: "normal",
          lineHeight: "normal",
          letterSpacing: 0,
          color: COLORS.arrowPurple,
        }}>
        %
      </span>
    </div>
  );
};

const LearningCurve: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = tween(frame, fps, [DRAW_TIMING.start, DRAW_TIMING.end], [0, 1], easeOut);
  const opacity = tween(frame, fps, [BEATS.guideStart, BEATS.guideStart + 0.3], [0, 1], crisp);
  const pulseProgress = tween(frame, fps, [DRAW_TIMING.end, DRAW_TIMING.end + 0.6], [0, 1], easeOut);
  const pulseOpacityRaw = tween(frame, fps, [DRAW_TIMING.end, DRAW_TIMING.end + 0.6], [0.7, 0], Easing.linear);
  const pulseOpacity = frame < DRAW_TIMING.end * fps ? 0 : pulseOpacityRaw;
  const pulseR = 5 + 44 * pulseProgress;
  const revealWidth = 40 + (ARROW.viewWidth + 8) * progress;
  const guideXs = [112, 208, 304, 400];
  const tracePath = "M16 211.928C102.707 216.879 307.225 180.285 457.069 22.1036";
  const arrowPath =
    "M0 211.928C0 220.764 7.16344 227.928 16 227.928C24.8366 227.928 32 220.764 32 211.928C32 203.091 24.8366 195.928 16 195.928C7.16344 195.928 0 203.091 0 211.928ZM473 0L440.036 10.6464L465.738 33.8712L473 0ZM16 211.928L15.9325 214.927C102.707 216.879 307.225 180.285 457.069 22.1036L454.891 20.0404L452.713 17.9773C304.337 174.609 101.644 210.854 16.0675 208.929L16 211.928Z";

  return (
    <svg
      width={ARROW.width}
      height={ARROW.height}
      viewBox={`0 0 ${ARROW.viewWidth} ${ARROW.viewHeight}`}
      style={{ position: "absolute", left: ARROW.x, top: ARROW.y, overflow: "visible" }}>
      <defs>
        <linearGradient
          id="curveStroke"
          x1="16"
          y1="206.469"
          x2="493.687"
          y2="120.56"
          gradientUnits="userSpaceOnUse">
          <stop stopColor={COLORS.arrowGreen} />
          <stop offset="1" stopColor={COLORS.arrowPurple} />
        </linearGradient>
        <clipPath id="curveReveal">
          <rect x="-12" y="-50" width={revealWidth} height="420" />
        </clipPath>
        <mask id="curveTraceMask" maskUnits="userSpaceOnUse" x="-24" y="-28" width="540" height="290">
          <path
            d={tracePath}
            fill="none"
            stroke="white"
            strokeWidth="66"
            strokeLinecap="round"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - progress}
          />
        </mask>
      </defs>
      <g opacity={opacity * 0.72} clipPath="url(#curveReveal)">
        {guideXs.map((x) => (
          <line
            key={x}
            x1={x}
            y1="-20"
            x2={x}
            y2="290"
            stroke={COLORS.arrowGreen}
            strokeWidth="2"
            strokeDasharray="7 11"
            strokeLinecap="round"
            opacity="0.22"
          />
        ))}
      </g>
      <g opacity={opacity} mask="url(#curveTraceMask)">
        <path d={arrowPath} fill="url(#curveStroke)" />
      </g>
      <circle cx="460" cy="15" r={pulseR} fill="none" stroke={COLORS.arrowPurple} strokeWidth="2.5" opacity={pulseOpacity} />
    </svg>
  );
};

const SparkIcon: React.FC = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
    <path d="M44 6H4V36H13V41L23 36H44V6Z" stroke="#644FB8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 19.5V22.5" stroke="#644FB8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 19.5V22.5" stroke="#644FB8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M34 19.5V22.5" stroke="#644FB8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SlidersIcon: React.FC = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
    <path d="M41.5 10H35.5" stroke="#644FB8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M27.5 6V14" stroke="#644FB8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M27.5 10L5.5 10" stroke="#644FB8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.5 24H5.5" stroke="#644FB8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21.5 20V28" stroke="#644FB8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M43.5 24H21.5" stroke="#644FB8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M41.5 38H35.5" stroke="#644FB8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M27.5 34V42" stroke="#644FB8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M27.5 38H5.5" stroke="#644FB8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ProofChip: React.FC<{
  children: React.ReactNode;
  delay: number;
  width?: number;
  icon: "spark" | "sliders";
}> = ({ children, delay, width = 406, icon }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = tween(frame, fps, [delay, delay + 0.28], [0, 1], crisp);
  const y = tween(frame, fps, [delay, delay + 0.34], [18, 0], crisp);
  const scale = tween(frame, fps, [delay, delay + 0.48], [0.84, 1], springEase);
  const textOpacity = tween(frame, fps, [delay + 0.16, delay + 0.38], [0, 1], crisp);

  return (
    <div
      style={{
        position: "relative",
        width,
        height: 126,
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        borderRadius: 18,
        border: `2px solid ${COLORS.chipStroke}`,
        background: "rgba(255,251,244,0.68)",
        color: COLORS.ink,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
        padding: "0 30px",
        boxSizing: "border-box",
        fontFamily: TYPE.recoleta,
        fontSize: 42,
        fontWeight: 400,
        letterSpacing: "-0.02em",
        whiteSpace: "nowrap",
      }}>
      <span
        style={{
          width: 72,
          height: 72,
          flex: "0 0 auto",
          borderRadius: 36,
          background: COLORS.lavender,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        {icon === "spark" ? <SparkIcon /> : <SlidersIcon />}
      </span>
      <span style={{ opacity: textOpacity }}>{children}</span>
    </div>
  );
};

const MonthLabel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = tween(frame, fps, [BEATS.month, BEATS.month + 0.32], [0, 1], crisp);
  const y = tween(frame, fps, [BEATS.month, BEATS.month + 0.38], [16, 0], crisp);

  return (
    <div
      style={{
        width: 520,
        opacity,
        transform: `translateY(${y}px)`,
        textAlign: "center",
        fontFamily: TYPE.recoleta,
        fontSize: 58,
        lineHeight: 1,
        color: "#070405",
        letterSpacing: "-0.035em",
      }}>
      less than a month
    </div>
  );
};

const BottomEvidenceRow: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        right: 120,
        top: 818,
        height: 126,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
      <ProofChip delay={BEATS.prompts} icon="spark">
        No prompts
      </ProofChip>
      <MonthLabel />
      <ProofChip delay={BEATS.fineTuning} width={448} icon="sliders">
        No fine-tuning
      </ProofChip>
    </div>
  );
};

const ProofCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = tween(frame, fps, [BEATS.card, BEATS.card + 0.48], [0, 1], crisp);
  const scale = tween(frame, fps, [BEATS.card, BEATS.card + 0.62], [0.982, 1], crisp);
  const y = tween(frame, fps, [BEATS.card, BEATS.card + 0.56], [26, 0], crisp);
  const titleOpacity = tween(frame, fps, [BEATS.title, BEATS.title + 0.36], [0, 1], crisp);
  const titleY = tween(frame, fps, [BEATS.title, BEATS.title + 0.44], [18, 0], crisp);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: CARD.x,
          top: CARD.y,
          width: CARD.width,
          height: CARD.height,
          opacity,
          transform: `translateY(${y}px) scale(${scale})`,
          transformOrigin: "center center",
          borderRadius: 46,
          border: `1.4px solid ${COLORS.cardStroke}`,
          background: COLORS.card,
          boxShadow: `0 32px 70px ${COLORS.shadow}, 0 8px 18px rgba(90,44,214,0.06)`,
          overflow: "hidden",
        }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(255,253,247,0.7), rgba(246,241,232,0.12)), radial-gradient(circle at 72% 34%, rgba(221,212,255,0.12), transparent 28%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: [
              "linear-gradient(rgba(150,120,200,0.09) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(150,120,200,0.09) 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "48px 48px",
            WebkitMaskImage: "radial-gradient(ellipse 55% 60% at 50% 50%, transparent 30%, black 80%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 132,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textAlign: "center",
            fontFamily: TYPE.recoleta,
            fontSize: 92,
            lineHeight: 0.95,
            color: COLORS.ink,
            letterSpacing: "-0.04em",
          }}>
          Self-resolution rate
        </div>
        <svg
          width="454"
          height="26"
          viewBox="0 0 454 26"
          style={{
            position: "absolute",
            left: (CARD.width - 454) / 2,
            top: 260,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}>
          <defs>
            <linearGradient id="ruleFadeLeft" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor={COLORS.purpleSoft} stopOpacity="0" />
              <stop offset="100%" stopColor={COLORS.purpleSoft} stopOpacity="0.76" />
            </linearGradient>
            <linearGradient id="ruleFadeRight" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor={COLORS.purpleSoft} stopOpacity="0.76" />
              <stop offset="100%" stopColor={COLORS.purpleSoft} stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="13" x2="220" y2="13" stroke="url(#ruleFadeLeft)" strokeWidth="2.5" />
          <line x1="234" y1="13" x2="454" y2="13" stroke="url(#ruleFadeRight)" strokeWidth="2.5" />
        </svg>

        <LearningCurve />

        <PercentMetric
          value="29"
          left={METRIC.left.x}
          top={METRIC.left.y}
          numberWidth={METRIC.left.numberWidth}
          percentWidth={METRIC.left.percentWidth}
          delay={BEATS.startMetric}
        />
        <AnimatedEndMetric />

        <BottomEvidenceRow />
      </div>
    </>
  );
};

export const LuciusJustLearned: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily: TYPE.recoleta, color: COLORS.ink }}>
      <PaperBackground />
      <ProofCard />
    </AbsoluteFill>
  );
};
