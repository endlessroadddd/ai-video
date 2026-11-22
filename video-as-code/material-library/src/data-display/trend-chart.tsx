import { useId } from "react";

export type TrendChartPoint = {
  value: number;
  x: number;
  y: number;
};

export type TrendChartProps = {
  values: readonly number[];
  highlightIndex?: number;
  max?: number;
  min?: number;
  width?: number;
  height?: number;
  labels?: readonly string[];
  highlightLabel?: string;
  className?: string;
};

export function buildChartPoints(
  values: readonly number[],
  options?: {
    width?: number;
    height?: number;
    max?: number;
    min?: number;
  },
): TrendChartPoint[] {
  const width = options?.width ?? 800;
  const height = options?.height ?? 320;
  const max = options?.max ?? Math.max(...values, 1);
  const min = options?.min ?? Math.min(...values, 0);
  const range = Math.max(1, max - min);

  if (values.length <= 1) {
    return values.map((value) => ({
      value,
      x: width / 2,
      y: height - ((value - min) / range) * height,
    }));
  }

  return values.map((value, index) => ({
    value,
    x: (width / (values.length - 1)) * index,
    y: height - ((value - min) / range) * height,
  }));
}

export function buildSmoothPath(points: readonly TrendChartPoint[]): string {
  if (!points.length) {
    return "";
  }

  return points
    .map((point, index, list) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`;
      }

      const previous = list[index - 1]!;
      const controlX = (previous.x + point.x) / 2;
      return `C ${controlX} ${previous.y} ${controlX} ${point.y} ${point.x} ${point.y}`;
    })
    .join(" ");
}

export function buildTrendAreaPath(
  points: readonly TrendChartPoint[],
  width: number,
  height: number,
): string {
  const path = buildSmoothPath(points);
  return path ? `${path} L ${width} ${height} L 0 ${height} Z` : "";
}

export function TrendChart(props: TrendChartProps) {
  const {
    values,
    highlightIndex = Math.max(0, values.length - 1),
    max = Math.max(...values, 1),
    min = Math.min(...values, 0),
    width = 800,
    height = 320,
    labels,
    highlightLabel,
    className,
  } = props;
  const chartId = useId().replace(/:/g, "");
  const points = buildChartPoints(values, { width, height, max, min });
  const path = buildSmoothPath(points);
  const areaPath = buildTrendAreaPath(points, width, height);
  const clampedHighlightIndex = Math.max(
    0,
    Math.min(points.length - 1, highlightIndex),
  );
  const inflectionPoint = points[clampedHighlightIndex] ?? points[0] ?? null;
  const lastPoint = points[points.length - 1] ?? null;
  const gridLabels = [max, max - (max - min) / 3, max - ((max - min) / 3) * 2, min]
    .map((value) => Math.round(value));

  return (
    <div
      className={className}
      style={{
        display: "grid",
        gap: "16px",
      }}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "24px",
          border: "1px solid rgba(137, 126, 255, 0.18)",
          background:
            "radial-gradient(circle at top left, rgba(188, 178, 255, 0.2) 0%, rgba(188, 178, 255, 0) 34%), linear-gradient(180deg, #13172b 0%, #161b31 100%)",
          padding: "24px 22px 18px",
          boxShadow: "0 22px 44px rgba(17, 18, 31, 0.26)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "0",
            pointerEvents: "none",
            background:
              "radial-gradient(circle at top right, rgba(255, 115, 115, 0.12) 0%, rgba(255, 115, 115, 0) 30%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "grid",
            gap: "14px",
          }}
        >
          <div
            style={{
              display: "grid",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "grid",
                gap: "8px",
                gridTemplateColumns: "56px minmax(0, 1fr)",
                alignItems: "stretch",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: "repeat(4, 1fr)",
                  gap: "0",
                  color: "rgba(227, 232, 255, 0.54)",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                {gridLabels.map((value) => (
                  <div
                    key={value}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <span>{value}</span>
                  </div>
                ))}
              </div>

              <svg
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMidYMid meet"
                style={{
                  width: "100%",
                  minHeight: "220px",
                  overflow: "visible",
                }}
              >
                <defs>
                  <linearGradient id={`${chartId}-area`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(237, 66, 69, 0.28)" />
                    <stop offset="100%" stopColor="rgba(237, 66, 69, 0.02)" />
                  </linearGradient>
                  <linearGradient id={`${chartId}-line`} x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#23a55a" />
                    <stop offset="46%" stopColor="#23a55a" />
                    <stop offset="58%" stopColor="#ed4245" />
                    <stop offset="100%" stopColor="#ed4245" />
                  </linearGradient>
                </defs>

                {gridLabels.map((_, index) => (
                  <line
                    key={index}
                    x1="0"
                    x2={width}
                    y1={(height / 3) * index}
                    y2={(height / 3) * index}
                    stroke="rgba(255,255,255,0.08)"
                    strokeDasharray="6 8"
                  />
                ))}

                {areaPath ? (
                  <path
                    d={areaPath}
                    fill={`url(#${chartId}-area)`}
                  />
                ) : null}

                {path ? (
                  <path
                    d={path}
                    fill="none"
                    stroke={`url(#${chartId}-line)`}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                  />
                ) : null}

                {inflectionPoint ? (
                  <>
                    <line
                      x1={inflectionPoint.x}
                      x2={inflectionPoint.x}
                      y1={0}
                      y2={height}
                      stroke="rgba(237, 66, 69, 0.55)"
                      strokeDasharray="8 6"
                      strokeWidth="2"
                    />

                    <circle
                      cx={inflectionPoint.x}
                      cy={inflectionPoint.y}
                      r="7"
                      fill="none"
                      stroke="#ff4b4b"
                      strokeWidth="2"
                      opacity="0.46"
                    />
                    <circle
                      cx={inflectionPoint.x}
                      cy={inflectionPoint.y}
                      r="11"
                      fill="none"
                      stroke="#ff4b4b"
                      strokeWidth="1.5"
                      opacity="0.2"
                    />
                    <circle
                      cx={inflectionPoint.x}
                      cy={inflectionPoint.y}
                      r="6"
                      fill="#ed4245"
                    />

                    {highlightLabel ? (
                      <>
                        <rect
                          fill="rgba(237, 66, 69, 0.16)"
                          height="28"
                          rx="8"
                          width="116"
                          x={Math.min(width - 124, inflectionPoint.x + 16)}
                          y="14"
                        />
                        <text
                          fill="#ff8e91"
                          fontFamily="Inter, Segoe UI, sans-serif"
                          fontSize="13"
                          fontWeight="700"
                          textAnchor="middle"
                          x={Math.min(width - 66, inflectionPoint.x + 74)}
                          y="32"
                        >
                          {highlightLabel}
                        </text>
                      </>
                    ) : null}
                  </>
                ) : null}

                {points[0] ? (
                  <circle
                    cx={points[0].x}
                    cy={points[0].y}
                    fill="#23a55a"
                    r="6"
                  />
                ) : null}

                {lastPoint ? (
                  <>
                    <circle
                      cx={lastPoint.x}
                      cy={lastPoint.y}
                      fill="#ed4245"
                      r="7"
                    />
                    <text
                      fill="#ff8e91"
                      fontFamily="Inter, Segoe UI, sans-serif"
                      fontSize="14"
                      fontWeight="700"
                      textAnchor="end"
                      x={lastPoint.x - 4}
                      y={lastPoint.y - 14}
                    >
                      {lastPoint.value}
                    </text>
                  </>
                ) : null}
              </svg>
            </div>
          </div>
        </div>
      </div>

      {labels?.length ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))`,
            gap: "8px",
            color: "rgba(35, 31, 53, 0.82)",
            fontSize: "12px",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          {labels.map((label, index) => (
            <span
              key={label}
              style={{
                color:
                  index === clampedHighlightIndex
                    ? "#d33d4b"
                    : "rgba(35, 31, 53, 0.82)",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
