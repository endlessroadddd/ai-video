import React from "react";
import {staticFile} from "remotion";
import {mix} from "../motion/primitives";
import {tokens} from "../theme/tokens";

export const BrandLockup: React.FC<{
  resolveProgress: number;
  style?: React.CSSProperties;
}> = ({resolveProgress, style}) => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 14,
        opacity: resolveProgress,
        transform: `translate3d(${mix(resolveProgress, 10, 0)}px, ${mix(resolveProgress, 16, 0)}px, 0) scale(${mix(
          resolveProgress,
          0.95,
          1
        )})`,
        ...style
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -10,
          height: 2,
          borderRadius: 999,
          background: "linear-gradient(90deg, rgba(100,79,184,0), rgba(100,79,184,0.42), rgba(100,79,184,0))",
          transform: `scaleX(${mix(resolveProgress, 0.2, 1)})`,
          opacity: mix(resolveProgress, 0, 0.8)
        }}
      />
      <img
        src={staticFile("logo-mark-black.svg")}
        style={{
          width: 42,
          height: 42,
          filter: `drop-shadow(0 10px 18px rgba(41,40,48,${mix(resolveProgress, 0, 0.12)}))`
        }}
      />
      <div
        style={{
          fontSize: 28,
          fontWeight: 600,
          color: tokens.colors.title,
          letterSpacing: "-0.04em"
        }}
      >
        Lucius
      </div>
    </div>
  );
};
