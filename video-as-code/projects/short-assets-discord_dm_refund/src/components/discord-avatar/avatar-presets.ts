import type { AvatarSpec, HumanAvatarSpec, RobotAvatarSpec } from "./avatar-types";

export const humanPresets: Record<string, HumanAvatarSpec> = {
  rose: {
    kind: "human",
    variant: "soft",
    backdrop: "#f45b96",
    skin: "#ffd4bf",
    hair: "#45203a",
    shirt: "#29172a",
    accent: "#ff8db8",
  },
  amber: {
    kind: "human",
    variant: "glasses",
    backdrop: "#ffb547",
    skin: "#ffd5ad",
    hair: "#5a3419",
    shirt: "#473018",
    accent: "#ffd582",
  },
  cobalt: {
    kind: "human",
    variant: "headset",
    backdrop: "#4a7fff",
    skin: "#ffd2c1",
    hair: "#23386b",
    shirt: "#1d2742",
    accent: "#8fb3ff",
  },
  violet: {
    kind: "human",
    variant: "ponytail",
    backdrop: "#8c6bff",
    skin: "#f8d2bc",
    hair: "#36204d",
    shirt: "#26173d",
    accent: "#b6a0ff",
  },
  mint: {
    kind: "human",
    variant: "beanie",
    backdrop: "#2fbf9a",
    skin: "#ffd7c4",
    hair: "#19473e",
    shirt: "#14322f",
    accent: "#7be4ca",
  },
  slate: {
    kind: "human",
    variant: "buzz",
    backdrop: "#5b6472",
    skin: "#f3d1bf",
    hair: "#222830",
    shirt: "#1b2028",
    accent: "#9aa4b5",
  },
  sunset: {
    kind: "human",
    variant: "cap",
    backdrop: "#ff7d5d",
    skin: "#ffd2b8",
    hair: "#553127",
    shirt: "#3e1f1a",
    accent: "#ffb39b",
  },
  plum: {
    kind: "human",
    variant: "curly",
    backdrop: "#7a57d1",
    skin: "#ffd1ba",
    hair: "#251342",
    shirt: "#211235",
    accent: "#c8b0ff",
  },
};

export const robotPreset: RobotAvatarSpec = {
  kind: "robot",
  backdrop: "#5865f2",
  shell: "#dfe7ff",
  outline: "#223067",
  eye: "#5865f2",
  accent: "#8ea0ff",
};

export const namedAvatarPresets: Record<string, keyof typeof humanPresets> = {
  cryptoking99: "sunset",
};

export const robotAvatarNames = new Set(["lucius"]);
export const featureColor = "#25212c";

export function normalizeAvatarName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export function getAvatarSpec(name: string): AvatarSpec {
  const normalizedName = normalizeAvatarName(name);

  if (robotAvatarNames.has(normalizedName)) {
    return robotPreset;
  }

  const namedPreset = namedAvatarPresets[normalizedName];
  if (namedPreset) {
    return humanPresets[namedPreset]!;
  }

  const presetKeys = Object.keys(humanPresets);
  const hash = Array.from(normalizedName || "user").reduce(
    (sum, character) => sum + character.charCodeAt(0),
    0,
  );

  return humanPresets[presetKeys[hash % presetKeys.length]!]!;
}
