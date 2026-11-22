import { AbsoluteFill, useCurrentFrame, OffthreadVideo, staticFile } from "remotion";
import { Phase1Bubbles } from "./Phase1Bubbles";
import { Phase2Layer } from "./Phase2Layer";
import { Phase3Brand } from "./Phase3Brand";

// ─── THEME ────────────────────────────────────────────────────────────────────
const THEME = {
  bg: "#0A0A0F",
  accent: "#7C3AED",
  accentGlow: "rgba(124, 58, 237, 0.4)",
  accentLight: "#A78BFA",
  white: "#FFFFFF",
  textSub: "rgba(255,255,255,0.6)",
  fontFamily: "'Inter', 'SF Pro Display', sans-serif",

  // timing (frames @ 30fps)
  phase1End: 120,  // 0–4s: bubbles flow in
  phase2End: 220,  // 4–7.3s: layer extracts nodes
  phase3End: 300,  // 7.3–10s: network grows + brand

  copy2: "...feeds a layer that keeps what matters.",
  copy3Brand: "Lucius",
  copy3Sub: "The context layer for your org.",
};
// ──────────────────────────────────────────────────────────────────────────────

export const ContextLayer: React.FC<{ showBackground?: boolean }> = ({ showBackground = true }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ fontFamily: THEME.fontFamily, backgroundColor: showBackground ? THEME.bg : "transparent" }}>

      {/* Background video */}
      {showBackground && (
        <OffthreadVideo
          src={staticFile("bg.mp4")}
          style={{ width: "100%", height: "100%", objectFit: "cover", transform: "translateZ(0)" }}
        />
      )}

      {/* Phase 1: bubbles (0–120f) */}
      {frame < THEME.phase1End + 10 && <Phase1Bubbles />}

      {/* Phase 2: glow layer + nodes (120–220f) */}
      {frame >= THEME.phase1End && frame < THEME.phase2End + 10 && <Phase2Layer />}

      {/* Phase 3: network lines + brand (220–300f) */}
      {frame >= THEME.phase2End && <Phase3Brand />}

    </AbsoluteFill>
  );
};
