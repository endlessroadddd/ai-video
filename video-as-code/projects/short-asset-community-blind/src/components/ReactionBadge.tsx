type ReactionBadgeProps = {
  count: number;
  emoji: string;
  hot?: boolean;
};

export function ReactionBadge(props: Readonly<ReactionBadgeProps>) {
  const { count, emoji, hot = false } = props;

  return (
    <span className={`reaction-badge ${hot ? "reaction-badge--hot" : ""}`.trim()}>
      <span className="reaction-badge__emoji">{emoji}</span>
      <span>{count}</span>
    </span>
  );
}
