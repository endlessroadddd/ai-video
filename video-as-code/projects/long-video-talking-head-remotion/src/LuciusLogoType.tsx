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
  logoSize: 293,
  text: "Lucius",
  textColor: "#FFFFFF",
  fontFamily:
    '"Recoleta DEMO", "Recoleta Lucius", "Recoleta", Georgia, "Times New Roman", serif',
  fontSize: 128,
  letterSpacing: 0,
  typeStartSeconds: 1.48,
  typeDurationSeconds: 0.84,
  typeExitStartSeconds: 3.16,
  typeExitDurationSeconds: 0.7,
  logoExitStartSeconds: 3.04,
  logoExitDurationSeconds: 0.74,
};

const clampFrame = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const LOGO_MARK_PATH =
  "M97.2954 83.3126V61.8688C97.2954 59.4552 97.4058 57.9768 97.371 55.7774C97.3402 53.8225 97.172 52.324 96.8124 51.2329C96.4843 50.2376 96.0973 49.8614 95.7065 49.6517C95.2159 49.3885 94.0163 49.0216 91.4092 49.4306C81.85 50.9305 75.9084 51.4225 66.1033 53.7535C64.1853 54.2094 63.0044 54.9422 62.2193 55.7164C61.4188 56.5058 60.8202 57.5469 60.3909 58.9165C59.4634 61.8754 59.5338 65.4899 59.5338 69.6661V92.4663L68.0945 90.9672L68.2421 90.9433C71.3396 90.4904 74.1407 92.8928 74.1407 96.0464V107.557C74.1407 108.141 74.214 108.496 74.2742 108.687C74.3038 108.781 74.3309 108.838 74.3471 108.868C74.363 108.898 74.3734 108.91 74.3754 108.913C74.3776 108.915 74.3804 108.919 74.388 108.925C74.3962 108.931 74.4164 108.946 74.4544 108.966C74.5343 109.008 74.6895 109.073 74.9526 109.128C75.5139 109.246 76.2882 109.267 77.2548 109.181C78.2217 109.095 79.0968 108.936 80.01 108.789C86.5826 107.731 100.183 106.571 110.598 103.652C112.824 103.028 114.523 101.878 115.703 100.2C116.903 98.4964 117.795 95.9197 117.795 92.0835V75.5495C117.526 63.1443 117.795 71.2334 117.795 52.1221C117.795 48.6448 117.681 45.442 117.311 42.7005C116.942 39.9608 116.36 38.0375 115.653 36.8286C111.291 30.4785 107.235 27.7539 102.063 28.4862C84.9646 30.9069 64.2088 33.9344 51.5856 35.7521C47.5388 36.956 45.2979 38.8333 43.8466 41.7847C42.1952 45.143 41.3636 50.2961 41.3636 58.458V113.527C41.3637 122.417 43.6514 126.826 46.4243 129.032C49.2986 131.318 53.8351 132.169 60.4018 131.31C69.7095 130.093 80.5252 128.633 89.473 127.357C98.6009 126.055 105.376 124.998 106.941 124.588C109.176 124.004 111.461 125.341 112.045 127.576C112.63 129.81 111.293 132.095 109.058 132.68C106.898 133.245 99.4633 134.38 90.654 135.637C81.6643 136.919 70.8144 138.383 61.4859 139.603C54.0746 140.572 46.7304 139.961 41.2182 135.578C35.6047 131.113 33 123.643 33 113.527V58.458C33 50.05 33.7992 43.2632 36.3411 38.094C39.0528 32.5796 43.5047 29.3581 49.5465 27.6346L49.8182 27.5567L50.0981 27.5164C62.6642 25.7075 83.6466 22.6467 100.891 20.2053C110.655 18.8228 117.283 24.6233 122.167 31.5468L122.635 32.2204L122.699 32.3141L122.758 32.4115C124.366 35.0644 125.164 38.3481 125.6 41.5837C126.044 44.8803 126.159 48.5214 126.159 52.1221C126.159 71.9673 125.886 62.8855 126.158 75.4243L126.159 75.47V92.0835C126.159 97.2142 124.955 101.587 122.543 105.014C120.113 108.467 116.687 110.632 112.856 111.705C101.857 114.788 86.8802 116.155 81.3391 117.046C80.0189 117.259 76.4402 117.986 73.2347 117.313C71.4939 116.948 69.5017 116.112 67.9737 114.294C66.4304 112.459 65.7771 110.118 65.7771 107.557V99.8634L57.2164 101.363C54.0609 101.916 51.1703 99.4878 51.1702 96.2843V69.6661C51.1702 66.0451 51.008 60.8874 52.41 56.4145C53.1455 54.0682 54.3525 51.7282 56.3474 49.7611C58.3577 47.7789 60.9623 46.3793 64.1692 45.6169C74.3954 43.1859 81.0359 42.5919 90.1128 41.1677C93.7254 40.6009 96.9757 40.8413 99.6607 42.2818C102.445 43.7759 103.96 46.2 104.756 48.615C105.521 50.9341 105.699 53.4562 105.734 55.6451C105.764 57.5893 105.659 60.3783 105.659 61.8688V83.3126C105.659 85.6221 103.787 87.4943 101.477 87.4944C99.1676 87.4944 97.2954 85.6221 97.2954 83.3126Z";

const loadFonts = async () => {
  const font = new FontFace(
    "Recoleta DEMO",
    `url("${staticFile("fonts/Recoleta-RegularDEMO.otf")}") format("opentype")`,
  );

  await font.load();
  document.fonts.add(font);
};

const LogoMark: FC<{
  opacity: number;
  size: number;
}> = ({ opacity, size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: "block",
        overflow: "visible",
      }}
    >
      <path d={LOGO_MARK_PATH} fill="#FFFFFF" opacity={opacity} />
    </svg>
  );
};

const TypewriterText: FC<{ frame: number; fps: number; renderScale: number }> = ({
  frame,
  fps,
  renderScale,
}) => {
  const start = THEME.typeStartSeconds * fps;
  const end = start + THEME.typeDurationSeconds * fps;
  const exitStart = THEME.typeExitStartSeconds * fps;
  const exitEnd = exitStart + THEME.typeExitDurationSeconds * fps;
  const progress = interpolate(frame, [start, end], [0, 1], clampFrame);
  const exitProgress = interpolate(frame, [exitStart, exitEnd], [0, 1], {
    ...clampFrame,
    easing: Easing.in(Easing.cubic),
  });
  const framesPerChar = (end - start) / THEME.text.length;
  const enteredChars =
    frame < start
      ? 0
      : Math.min(
          THEME.text.length,
          Math.floor((frame - start) / framesPerChar) + 1,
        );
  const typedText = THEME.text.slice(0, enteredChars);
  const liftProgress = interpolate(frame, [start, start + 0.35 * fps], [0, 1], {
    ...clampFrame,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const lift = interpolate(liftProgress, [0, 1], [28, 0], clampFrame) * renderScale;
  const enterOpacity = interpolate(progress, [0, 0.18, 1], [0, 1, 1], clampFrame);
  const exitOpacity = interpolate(
    exitProgress,
    [0, 0.42, 0.78, 1],
    [1, 0.96, 0.34, 0],
    clampFrame,
  );
  const opacity = enterOpacity * exitOpacity;
  const exitSlideX =
    interpolate(exitProgress, [0, 0.22, 0.68, 1], [0, 10, 210, 640], clampFrame) *
    renderScale;
  const exitFloatY =
    interpolate(exitProgress, [0, 0.55, 1], [0, -3, 5], clampFrame) * renderScale;
  const exitScale = interpolate(exitProgress, [0, 0.45, 1], [1, 0.995, 0.982], clampFrame);
  const exitBlur =
    interpolate(exitProgress, [0, 0.52, 1], [0, 0.2, 3.2], clampFrame) * renderScale;

  const textStyle: CSSProperties = {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.fontSize * renderScale,
    fontWeight: 400,
    letterSpacing: THEME.letterSpacing,
    lineHeight: 1,
    whiteSpace: "nowrap",
  };

  return (
    <div
      style={{
        display: "inline-block",
        height: 144 * renderScale,
        position: "relative",
        opacity,
        filter: `blur(${exitBlur}px)`,
        transform: `translate(${exitSlideX}px, ${lift + exitFloatY}px) scale(${exitScale})`,
        width: "fit-content",
      }}
    >
      <span
        style={{
          ...textStyle,
          display: "block",
          visibility: "hidden",
        }}
      >
        {THEME.text}
      </span>
      <span
        style={{
          ...textStyle,
          position: "absolute",
          left: 0,
          top: 0,
          color: THEME.textColor,
        }}
      >
        {typedText}
      </span>
    </div>
  );
};

export const LuciusLogoType: FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const renderScale = width / THEME.baseWidth;
  const logoSize = THEME.logoSize * renderScale;

  useEffect(() => {
    const handle = delayRender("Loading Lucius font");
    loadFonts()
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        continueRender(handle);
      });
  }, []);

  const logoStart = 0.12 * fps;
  const anticipationEnd = 0.34 * fps;
  const burstEnd = 1.22 * fps;
  const settleEnd = 1.64 * fps;
  const anticipationProgress = interpolate(frame, [logoStart, anticipationEnd], [0, 1], {
    ...clampFrame,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const burstProgress = interpolate(frame, [anticipationEnd, burstEnd], [0, 1], {
    ...clampFrame,
    easing: Easing.bezier(0.1, 0.86, 0.18, 1),
  });
  const settleProgress = interpolate(frame, [burstEnd, settleEnd], [0, 1], {
    ...clampFrame,
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const anticipationScale = interpolate(
    anticipationProgress,
    [0, 1],
    [0.08, 0.07],
    clampFrame,
  );
  const burstScale = interpolate(
    burstProgress,
    [0, 0.82, 1],
    [0.07, 1.075, 0.965],
    clampFrame,
  );
  const settleScale = interpolate(
    settleProgress,
    [0, 1],
    [0.965, 1],
    clampFrame,
  );
  const logoScale =
    frame < anticipationEnd
      ? anticipationScale
      : frame < burstEnd
        ? burstScale
        : settleScale;

  const anticipationY = interpolate(
    anticipationProgress,
    [0, 1],
    [36, 42],
    clampFrame,
  );
  const burstY = interpolate(
    burstProgress,
    [0, 0.82, 1],
    [42, -4, 1],
    clampFrame,
  );
  const settleY = interpolate(
    settleProgress,
    [0, 1],
    [1, 0],
    clampFrame,
  );
  const logoY =
    (frame < anticipationEnd ? anticipationY : frame < burstEnd ? burstY : settleY) *
    renderScale;

  const anticipationRotateY = interpolate(
    anticipationProgress,
    [0, 1],
    [-760, -720],
    clampFrame,
  );
  const burstRotateY = interpolate(
    burstProgress,
    [0, 0.78, 1],
    [-720, -72, 8],
    clampFrame,
  );
  const settleRotateY = interpolate(settleProgress, [0, 1], [8, 0], clampFrame);
  const rotateY =
    frame < anticipationEnd
      ? anticipationRotateY
      : frame < burstEnd
        ? burstRotateY
        : settleRotateY;

  const anticipationTiltX = interpolate(
    anticipationProgress,
    [0, 1],
    [14, 18],
    clampFrame,
  );
  const burstTiltX = interpolate(burstProgress, [0, 0.78, 1], [18, -5, 1], clampFrame);
  const settleTiltX = interpolate(settleProgress, [0, 1], [1, 0], clampFrame);
  const tiltX =
    frame < anticipationEnd ? anticipationTiltX : frame < burstEnd ? burstTiltX : settleTiltX;

  const anticipationWobble = interpolate(
    anticipationProgress,
    [0, 1],
    [-1.5, -2],
    clampFrame,
  );
  const burstWobble = interpolate(
    burstProgress,
    [0, 0.78, 1],
    [-2, 1, -0.35],
    clampFrame,
  );
  const settleWobble = interpolate(
    settleProgress,
    [0, 1],
    [-0.35, 0],
    clampFrame,
  );
  const logoWobble =
    frame < anticipationEnd
      ? anticipationWobble
      : frame < burstEnd
        ? burstWobble
        : settleWobble;

  const logoOpacity = interpolate(
    frame,
    [logoStart, anticipationEnd, anticipationEnd + 0.12 * fps],
    [0, 0.42, 1],
    clampFrame,
  );
  const logoExitStart = THEME.logoExitStartSeconds * fps;
  const logoExitEnd = logoExitStart + THEME.logoExitDurationSeconds * fps;
  const logoExitProgress = interpolate(frame, [logoExitStart, logoExitEnd], [0, 1], {
    ...clampFrame,
    easing: Easing.in(Easing.cubic),
  });
  const exitSlideX =
    interpolate(logoExitProgress, [0, 0.22, 0.68, 1], [0, 12, 230, 660], clampFrame) *
    renderScale;
  const exitFloatY =
    interpolate(logoExitProgress, [0, 0.52, 1], [0, -4, 4], clampFrame) * renderScale;
  const exitScale = interpolate(logoExitProgress, [0, 0.38, 1], [1, 0.985, 0.95], clampFrame);
  const exitLean = interpolate(logoExitProgress, [0, 0.64, 1], [0, 1.6, 0.4], clampFrame);
  const exitBlur =
    interpolate(logoExitProgress, [0, 0.52, 1], [0, 0.25, 3.6], clampFrame) * renderScale;
  const exitOpacity = interpolate(
    logoExitProgress,
    [0, 0.44, 0.8, 1],
    [1, 0.96, 0.32, 0],
    clampFrame,
  );
  const finalLogoOpacity = logoOpacity * exitOpacity;
  const finalLogoScale = logoScale * exitScale;
  const finalLogoY = logoY + exitFloatY;
  const finalLogoWobble = logoWobble + exitLean;
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        background: "transparent",
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: 43 * renderScale,
          perspective: 1200 * renderScale,
        }}
      >
        <div
          style={{
            filter: `blur(${exitBlur}px)`,
            height: logoSize,
            position: "relative",
            transform: `translate(${exitSlideX}px, ${finalLogoY}px) rotateZ(${finalLogoWobble}deg) rotateX(${tiltX}deg) rotateY(${rotateY}deg) scale(${finalLogoScale})`,
            transformOrigin: "50% 50%",
            transformStyle: "preserve-3d",
            width: logoSize,
          }}
        >
          <LogoMark opacity={finalLogoOpacity} size={logoSize} />
        </div>
        <TypewriterText frame={frame} fps={fps} renderScale={renderScale} />
      </div>
    </AbsoluteFill>
  );
};
