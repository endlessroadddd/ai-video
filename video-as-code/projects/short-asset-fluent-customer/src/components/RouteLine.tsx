interface RouteLineProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  color?: string;
  width?: number;
  animated?: boolean;
  delay?: number;
}

export function RouteLine({ fromX, fromY, toX, toY, color = "var(--color-brand)", width = 1.5, animated = true, delay = 0 }: RouteLineProps) {
  const length = Math.sqrt((toX - fromX) ** 2 + (toY - fromY) ** 2);
  const angle = Math.atan2(toY - fromY, toX - fromX) * (180 / Math.PI);

  return (
    <div
      className="route-line"
      style={{
        position: "absolute",
        left: `${fromX}%`,
        top: `${fromY}%`,
        width: `${length}%`,
        height: `${width}px`,
        background: `linear-gradient(90deg, ${color}, transparent)`,
        transform: `rotate(${angle}deg)`,
        transformOrigin: "left center",
        opacity: animated ? 0 : 0.35,
        animation: animated ? `fadeIn 600ms var(--ease-soft) ${delay}ms forwards` : undefined,
        pointerEvents: "none",
      }}
    />
  );
}
