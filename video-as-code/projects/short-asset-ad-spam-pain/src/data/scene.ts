export type StageAnchor = {
  x: number;
  y: number;
};

export type StageRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type MenuIconName =
  | "spark"
  | "shield"
  | "message"
  | "trash"
  | "kick"
  | "ban"
  | "check"
  | "search";

export type MenuEntry =
  | {
      kind?: "item";
      label: string;
      icon: MenuIconName;
      shortcut?: string;
      variant?: "default" | "danger" | "accent";
    }
  | {
      kind: "separator";
    };

export const DEFAULT_STAGE_RECT: StageRect = {
  left: 0,
  top: 0,
  width: 1920,
  height: 1080,
};

export function resolveStagePoint(anchor: StageAnchor, stageRect: StageRect) {
  return {
    left: stageRect.left + stageRect.width * anchor.x,
    top: stageRect.top + stageRect.height * anchor.y,
  };
}

export const MESSAGE_MENU_ANCHOR: StageAnchor = {
  x: 0.354,
  y: 0.424,
};

export const MEMBER_MENU_ANCHOR: StageAnchor = {
  x: 0.842,
  y: 0.362,
};

export const MESSAGE_MENU_ITEMS: readonly MenuEntry[] = [
  { label: "Inspect link", icon: "search", variant: "accent" },
  { label: "Manage banned words", icon: "shield" },
  { label: "Flag for review", icon: "spark" },
  { kind: "separator" },
  { label: "Delete message", icon: "trash", variant: "danger" },
];

export const MEMBER_MENU_ITEMS: readonly MenuEntry[] = [
  { label: "Message member", icon: "message" },
  { label: "Kick member", icon: "kick", variant: "danger" },
  { label: "Ban member", icon: "ban", variant: "danger" },
];

export const MANUAL_KEYWORD = "discord.gg/";

export const KEYWORD_STACK: readonly string[] = [
  "nitro",
  "giveaway",
  "claim now",
  "boost invite",
  "airdrop",
  MANUAL_KEYWORD,
];
