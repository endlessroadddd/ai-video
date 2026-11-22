import type { AvatarSpec, HumanAvatarSpec, RobotAvatarSpec } from "./avatar-types";
export declare const humanPresets: Record<string, HumanAvatarSpec>;
export declare const robotPreset: RobotAvatarSpec;
export declare const featureColor = "#25212c";
export declare function normalizeAvatarName(name: string): string;
export declare function getAvatarSpec(name: string, variant?: string): AvatarSpec;
