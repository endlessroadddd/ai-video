import type { CSSProperties } from "react";

export type AvatarStatus = "online" | "offline";

export type HumanAvatarVariant =
  | "soft"
  | "glasses"
  | "headset"
  | "cap"
  | "beanie"
  | "curly"
  | "buzz"
  | "ponytail";

export type AvatarPaletteVariant =
  | "rose"
  | "amber"
  | "cobalt"
  | "violet"
  | "mint"
  | "slate"
  | "sunset"
  | "plum";

export type AvatarProps = {
  name: string;
  className?: string;
  imageUrl?: string;
  size?: number;
  status?: AvatarStatus;
  style?: CSSProperties;
  variant?: AvatarPaletteVariant;
};

export type HumanAvatarSpec = {
  kind: "human";
  variant: HumanAvatarVariant;
  backdrop: string;
  skin: string;
  hair: string;
  shirt: string;
  accent: string;
};

export type RobotAvatarSpec = {
  kind: "robot";
  backdrop: string;
  shell: string;
  outline: string;
  eye: string;
  accent: string;
};

export type AvatarSpec = HumanAvatarSpec | RobotAvatarSpec;
