import type { ReactNode } from "react";

interface SceneCanvasProps {
  children: ReactNode;
  variant?: "warm" | "dark" | "discord" | "email";
  className?: string;
}

export function SceneCanvas({ children, variant = "warm", className }: SceneCanvasProps) {
  const variantClass = variant === "warm" ? "" : `scene-canvas--${variant}`;
  return <div className={["scene-canvas", "scene-canvas--animated", variantClass, className].filter(Boolean).join(" ")}>{children}</div>;
}
