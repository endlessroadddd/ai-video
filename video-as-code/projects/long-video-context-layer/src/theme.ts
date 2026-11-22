// Lucius brand tokens used in this composition.

export const LUCIUS = {
  purple: "#5538c7",
  purpleAlt: "#644FB8",
  lavender: "#bab2ff",

  panel: "#fffdf8",
  panelMuted: "#f5efe1",
  soft: "#f7f1e6",

  userBubbleBg: "#f2e9da",
  assistantBubbleBg: "#f0efe8",
  bubbleText: "#312d3c",

  ink: "#1f2230",
  textMuted: "#6e6a67",

  border: "#d8cfbf",
  borderSoft: "#e6ddcf",

  contrastCardBg: "rgba(238, 234, 224, 0.92)",
  contrastCardBorder: "rgba(170, 162, 148, 0.55)",
  contrastText: "rgba(70, 64, 78, 0.85)",

  serif: '"Recoleta", Georgia, serif',
  sans: '"SF Pro Display", "SF Pro Text", "PingFang SC", "Helvetica Neue", system-ui, sans-serif',
};

export const VIDEO_FPS = 60;
export const VIDEO_DURATION_SECONDS = 19;
export const TOTAL_FRAMES = VIDEO_FPS * VIDEO_DURATION_SECONDS;
export const FRAME_SCALE = VIDEO_FPS / 30;

export const fpsFrames = (framesAt30Fps: number) =>
  Math.round(framesAt30Fps * FRAME_SCALE);

// The timeline was originally authored at 30fps. Keep the same seconds while
// rendering at 60fps for smoother motion.
export const TIMING = {
  stage1End: fpsFrames(120), // 0-4.0s context layer slowly draws
  stage2End: fpsFrames(250), // 4.0-8.3s conversation sources feed the layer
  stage3End: fpsFrames(360), // 8.3-12s what-matters cards emerge
  stage4End: fpsFrames(480), // 12-16s compounding connections grow
  stage5End: fpsFrames(570), // 16-19s contrast + Lucius closing seal
};
