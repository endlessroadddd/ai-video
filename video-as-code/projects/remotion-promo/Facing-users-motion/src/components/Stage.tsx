import React from "react";
import {AbsoluteFill, useCurrentFrame} from "remotion";
import {floatProgress, mix} from "../motion/primitives";
import {tokens} from "../theme/tokens";

export const Stage: React.FC<{children: React.ReactNode}> = ({children}) => {
  const frame = useCurrentFrame();
  const gridX = floatProgress(frame, 6, 520);
  const gridY = floatProgress(frame, 4, 620, 30);
  const glowX = 34 + floatProgress(frame, 2.4, 420);
  const glowY = 22 + floatProgress(frame, 2, 520, 50);
  const accentOpacity = 0.09 + Math.abs(floatProgress(frame, 0.03, 320, 18));
  const focusDrift = floatProgress(frame, 10, 760, 40);

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background: `linear-gradient(160deg, ${tokens.colors.canvas} 0%, ${tokens.colors.canvasAlt} 100%)`,
        fontFamily: tokens.fonts.body
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -220,
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(100,79,184,${accentOpacity}) 0%, rgba(100,79,184,0.045) 18%, transparent 40%), radial-gradient(circle at 76% ${66 + floatProgress(frame, 2.4, 640, 12)}%, rgba(100,79,184,0.08) 0%, rgba(100,79,184,0.02) 22%, transparent 44%)`,
          transform: `translate3d(${mix(accentOpacity, -4, 8)}px, ${mix(accentOpacity, 4, -6)}px, 0) scale(1.01)`
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: -140,
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.76) 0%, rgba(255,255,255,0.34) 20%, rgba(255,255,255,0.08) 34%, transparent 52%)",
          opacity: 0.94,
          transform: `translate3d(${focusDrift}px, ${floatProgress(frame, 7, 860, 120)}px, 0)`
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          backgroundImage:
            "linear-gradient(to right, rgba(100,79,184,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,79,184,0.02) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          backgroundPosition: `${gridX}px ${gridY}px`,
          maskImage: "linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)",
          transform: `scale(${mix(accentOpacity, 1.005, 1.02)})`
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 16%, transparent 82%, rgba(255,255,255,0.18) 100%)"
        }}
      />
      {children}
    </AbsoluteFill>
  );
};
