export function Curtain({
  opacity,
  text,
  textOpacity,
}: {
  opacity: number;
  text: string;
  textOpacity: number;
}) {
  if (opacity <= 0) return null;
  return (
    <div className="curtain" style={{ opacity }}>
      <div className="curtain-text" style={{ opacity: textOpacity }}>
        {text}
      </div>
    </div>
  );
}
