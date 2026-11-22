import type { CSSProperties } from "react";
export type AvatarStatus = "online" | "offline" | "idle" | "dnd";
export type HumanAvatarVariant = "soft" | "glasses" | "headset" | "cap" | "beanie" | "curly" | "buzz" | "ponytail";
export type AvatarProps = {
    name: string;
    className?: string;
    size?: number;
    status?: AvatarStatus;
    style?: CSSProperties;
    imageUrl?: string;
    variant?: string;
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
