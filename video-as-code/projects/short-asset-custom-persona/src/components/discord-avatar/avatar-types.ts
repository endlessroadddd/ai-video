import type { CSSProperties } from "react";

export type AvatarStatus = "online" | "offline";

export type AvatarProps = {
  name: string;
  className?: string;
  size?: number;
  status?: AvatarStatus;
  style?: CSSProperties;
};

export type AvatarSourceMap = Record<string, string>;
