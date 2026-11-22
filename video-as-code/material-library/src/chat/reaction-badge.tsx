import type { DiscordReactionItem } from "./discord-scene-types";

export type ReactionBadgeProps = DiscordReactionItem;

export function ReactionBadge(props: Readonly<ReactionBadgeProps>) {
  const { count, emoji, hot = false } = props;

  return (
    <span className={["reaction-badge", hot ? "reaction-badge--hot" : ""].filter(Boolean).join(" ")}>
      <span className="reaction-badge__emoji">{emoji}</span>
      <span>{count}</span>
    </span>
  );
}
