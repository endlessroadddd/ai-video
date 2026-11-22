export function Reaction({
  emoji,
  count,
  opacity,
  scale,
}: {
  emoji: string;
  count: number;
  opacity: number;
  scale: number;
}) {
  return (
    <div
      className="feishu-reaction"
      style={{
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <span className="feishu-reaction-emoji">{emoji}</span>
      <span className="feishu-reaction-count">{count}</span>
    </div>
  );
}
