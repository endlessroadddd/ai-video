import { useEffect } from "react";
import type { CSSProperties, FC } from "react";
import {
  AbsoluteFill,
  Easing,
  continueRender,
  delayRender,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const THEME = {
  baseWidth: 2560,
  baseHeight: 1440,
  accentColor: "#644FB8",
  labelText: "Co-founder at Lucius AI",
  nameText: "Yucheng L",
  x: 292,
  y: 864,
  lineWidth: 10,
  lineHeight: 238,
  textOffsetX: 66,
  labelFontSize: 48,
  labelLetterSpacing: 0.4,
  nameFontSize: 154,
  nameLetterSpacing: 3.5,
  fontFamily:
    '"Recoleta DEMO", "Recoleta Lucius", "Recoleta", Georgia, "Times New Roman", serif',
  labelFontFamily:
    '"PingFang SC", "PingFangSC-Regular", "PingFang TC", "Microsoft YaHei UI", "Microsoft YaHei", "Segoe UI", Arial, sans-serif',
  enterStartSeconds: 0,
  exitStartSeconds: 3.18,
  exitDurationSeconds: 0.68,
};

const clampFrame = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const loadFonts = async () => {
  const font = new FontFace(
    "Recoleta DEMO",
    `url("${staticFile("fonts/Recoleta-RegularDEMO.otf")}") format("opentype")`,
  );

  await font.load();
  document.fonts.add(font);
};

const buildEase = {
  ...clampFrame,
  easing: Easing.bezier(0.16, 1, 0.3, 1),
};

const getTypedLength = ({
  end,
  frame,
  start,
  text,
}: {
  end: number;
  frame: number;
  start: number;
  text: string;
}) => {
  if (frame < start) {
    return 0;
  }

  if (frame >= end) {
    return text.length;
  }

  const progress = interpolate(frame, [start, end], [0, 1], clampFrame);
  return Math.min(text.length, Math.floor(progress * text.length));
};

const TypewriterLine: FC<{
  opacity: number;
  style: CSSProperties;
  text: string;
  typedLength: number;
}> = ({ opacity, style, text, typedLength }) => {
  const visibleText = text.slice(0, typedLength);

  return (
    <div
      style={{
        opacity,
        position: "relative",
        width: "fit-content",
      }}
    >
      <span
        style={{
          ...style,
          display: "block",
          visibility: "hidden",
        }}
      >
        {text}
      </span>
      <span
        style={{
          ...style,
          left: 0,
          position: "absolute",
          top: 0,
        }}
      >
        {visibleText}
      </span>
    </div>
  );
};

export const YuChengLowerThird: FC<{ backgroundColor?: string }> = ({
  backgroundColor = "transparent",
}) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const scale = Math.min(width / THEME.baseWidth, height / THEME.baseHeight);

  useEffect(() => {
    const handle = delayRender("Loading Lucius Recoleta font");
    loadFonts()
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        continueRender(handle);
      });
  }, []);

  const enterStart = THEME.enterStartSeconds * fps;
  const lineEnd = enterStart + 0.58 * fps;
  const nameStart = enterStart + 0.14 * fps;
  const nameEnd = nameStart + 0.78 * fps;
  const labelStart = nameEnd + 0.14 * fps;
  const labelEnd = labelStart + 0.72 * fps;
  const exitStart = THEME.exitStartSeconds * fps;
  const exitEnd = exitStart + THEME.exitDurationSeconds * fps;

  const lineProgress = interpolate(frame, [enterStart, lineEnd], [0, 1], buildEase);
  const exitProgress = interpolate(frame, [exitStart, exitEnd], [0, 1], {
    ...clampFrame,
    easing: Easing.in(Easing.cubic),
  });

  const groupOpacity = interpolate(exitProgress, [0, 0.72, 1], [1, 0.84, 0], clampFrame);
  const groupSlideX = interpolate(exitProgress, [0, 1], [0, -70], clampFrame) * scale;
  const groupBlur = interpolate(exitProgress, [0, 1], [0, 2.6], clampFrame) * scale;

  const typedNameLength = getTypedLength({
    end: nameEnd,
    frame,
    start: nameStart,
    text: THEME.nameText,
  });
  const typedLabelLength = getTypedLength({
    end: labelEnd,
    frame,
    start: labelStart,
    text: THEME.labelText,
  });
  const nameOpacity = typedNameLength > 0 ? groupOpacity : 0;
  const labelOpacity = typedLabelLength > 0 ? 0.82 * groupOpacity : 0;

  const textBlockStyle: CSSProperties = {
    left: (THEME.x + THEME.textOffsetX) * scale,
    position: "absolute",
    top: THEME.y * scale,
  };

  return (
    <AbsoluteFill
      style={{
        background: backgroundColor,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          filter: `blur(${groupBlur}px)`,
          opacity: groupOpacity,
          transform: `translateX(${groupSlideX}px)`,
        }}
      >
        <div
          style={{
            background: THEME.accentColor,
            height: THEME.lineHeight * lineProgress * scale,
            left: THEME.x * scale,
            opacity: interpolate(lineProgress, [0, 0.16, 1], [0, 1, 1], clampFrame),
            position: "absolute",
            top: THEME.y * scale,
            width: THEME.lineWidth * scale,
          }}
        />
        <div style={textBlockStyle}>
          <TypewriterLine
            opacity={nameOpacity}
            style={{
              color: "#FFFFFF",
              fontFamily: THEME.fontFamily,
              fontSize: THEME.nameFontSize * scale,
              fontWeight: 400,
              letterSpacing: THEME.nameLetterSpacing * scale,
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
            text={THEME.nameText}
            typedLength={typedNameLength}
          />
          <TypewriterLine
            opacity={labelOpacity}
            style={{
              color: "rgba(255, 255, 255, 0.82)",
              fontFamily: THEME.labelFontFamily,
              fontSize: THEME.labelFontSize * scale,
              fontWeight: 400,
              letterSpacing: THEME.labelLetterSpacing * scale,
              lineHeight: 1,
              marginTop: 22 * scale,
              whiteSpace: "nowrap",
            }}
            text={THEME.labelText}
            typedLength={typedLabelLength}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const YuChengLowerThirdBlackBg: FC = () => {
  return <YuChengLowerThird backgroundColor="#000000" />;
};
