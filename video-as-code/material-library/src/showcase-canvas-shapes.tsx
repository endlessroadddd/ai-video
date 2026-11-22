import type { CSSProperties } from "react";

import type {
  CanvasShapeGeometry,
  CanvasShapeStyle,
  CanvasShapeType,
} from "./showcase-canvas-state";

function toPathPoints(points: Array<{ x: number; y: number }>): string {
  return points.map((point) => `${point.x},${point.y}`).join(" ");
}

function createRegularPolygonPoints(sides: number): string {
  const safeSides = Math.max(3, sides);
  const points: Array<{ x: number; y: number }> = [];
  const radius = 40;

  for (let index = 0; index < safeSides; index += 1) {
    const angle = -Math.PI / 2 + (index / safeSides) * Math.PI * 2;
    points.push({
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius,
    });
  }

  return toPathPoints(points);
}

function createStarPoints(points: number, innerRadiusRatio: number): string {
  const safePoints = Math.max(4, points);
  const outerRadius = 40;
  const innerRadius = outerRadius * innerRadiusRatio;
  const result: Array<{ x: number; y: number }> = [];

  for (let index = 0; index < safePoints * 2; index += 1) {
    const angle = -Math.PI / 2 + (index / (safePoints * 2)) * Math.PI * 2;
    const radius = index % 2 === 0 ? outerRadius : innerRadius;
    result.push({
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius,
    });
  }

  return toPathPoints(result);
}

function createSpeechBubblePath(geometry: CanvasShapeGeometry): string {
  const radius = Math.max(0, Math.min(geometry.cornerRadius, 24));
  const tailCenter =
    geometry.tailSide === "left" || geometry.tailSide === "right"
      ? 18 + geometry.tailOffset * 52
      : 20 + geometry.tailOffset * 60;

  const bubbleBase = `M ${24 + radius} 18 H ${76 - radius} Q 76 18 76 ${18 + radius} V ${62 - radius} Q 76 62 76 ${
    62
  } H ${24} Q 24 62 24 ${62 - radius} V ${18 + radius} Q 24 18 ${24 + radius} 18 Z`;

  switch (geometry.tailSide) {
    case "left":
      return `${bubbleBase} M 24 ${tailCenter - 8} L 10 ${tailCenter} L 24 ${tailCenter + 8} Z`;
    case "right":
      return `${bubbleBase} M 76 ${tailCenter - 8} L 90 ${tailCenter} L 76 ${tailCenter + 8} Z`;
    case "top":
      return `${bubbleBase} M ${tailCenter - 8} 18 L ${tailCenter} 4 L ${tailCenter + 8} 18 Z`;
    case "bottom":
    default:
      return `${bubbleBase} M ${tailCenter - 10} 62 L ${tailCenter} 90 L ${tailCenter + 10} 62 Z`;
  }
}

function createArrowHead(side: "end" | "start"): string {
  return side === "end" ? "82,50 70,42 70,58" : "18,50 30,42 30,58";
}

function createDot(cx: number) {
  return <circle cx={cx} cy={50} r={5} />;
}

type CanvasShapeSvgProps = {
  className?: string;
  geometry: CanvasShapeGeometry;
  shapeType: CanvasShapeType;
  style: CanvasShapeStyle;
};

export function CanvasShapeSvg({
  className,
  geometry,
  shapeType,
  style,
}: CanvasShapeSvgProps) {
  const strokeDasharray = geometry.strokeStyle === "dashed" ? "10 8" : undefined;
  const shared = {
    fill: style.fillColor,
    fillOpacity: style.fillOpacity,
    stroke: style.strokeColor,
    strokeDasharray,
    strokeOpacity: style.strokeOpacity,
    strokeWidth: style.strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const rootStyle = {
    "--ml-shape-fill": style.fillColor,
    "--ml-shape-stroke": style.strokeColor,
  } as CSSProperties;

  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={rootStyle}
    >
      {shapeType === "rectangle" ? <rect x={16} y={18} width={68} height={44} rx={0} {...shared} /> : null}
      {shapeType === "roundedRectangle" ? (
        <rect x={14} y={18} width={72} height={44} rx={Math.min(geometry.cornerRadius, 22)} {...shared} />
      ) : null}
      {shapeType === "circle" ? <circle cx={50} cy={50} r={34} {...shared} /> : null}
      {shapeType === "ellipse" ? <ellipse cx={50} cy={50} rx={34} ry={24} {...shared} /> : null}
      {shapeType === "triangle" ? <polygon points="50,12 86,82 14,82" {...shared} /> : null}
      {shapeType === "diamond" ? <polygon points="50,10 88,50 50,90 12,50" {...shared} /> : null}
      {shapeType === "star" ? (
        <polygon points={createStarPoints(geometry.points, geometry.innerRadiusRatio)} {...shared} />
      ) : null}
      {shapeType === "polygon" ? <polygon points={createRegularPolygonPoints(geometry.sides)} {...shared} /> : null}
      {shapeType === "speechBubble" ? <path d={createSpeechBubblePath(geometry)} {...shared} /> : null}
      {shapeType === "line" || shapeType === "arrow" ? (
        <>
          <line x1={18} y1={50} x2={82} y2={50} {...shared} fill="none" />
          {geometry.startMarker === "arrow" ? <polygon points={createArrowHead("start")} {...shared} /> : null}
          {geometry.endMarker === "arrow" || shapeType === "arrow" ? (
            <polygon points={createArrowHead("end")} {...shared} />
          ) : null}
          {geometry.startMarker === "dot" ? createDot(18) : null}
          {geometry.endMarker === "dot" ? createDot(82) : null}
        </>
      ) : null}
    </svg>
  );
}
