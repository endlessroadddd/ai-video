import { communityGuildState } from "./discord-ui-state";

function buildChartPoints(values: readonly number[]) {
  const width = 800;
  const height = 320;
  const max = 260;
  const min = 0;

  return values.map((value, index) => {
    const x = (width / (values.length - 1)) * index;
    const y = height - ((value - min) / (max - min)) * height;
    return { value, x, y };
  });
}

function buildSmoothPath(points: Array<{ x: number; y: number }>) {
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

function navToCommunity() {
  window.location.href = "/community?v=s05a";
}

export function LossChartScene() {
  const points = buildChartPoints(communityGuildState.activityTrend);
  const chartPath = buildSmoothPath(points);
  const areaPath = `${chartPath} L 800 320 L 0 320 Z`;
  const inflectionPoint = points[2]!;
  const lastPoint = points[points.length - 1]!;

  return (
    <main className="page-shell page-shell--chart">
      <div className="scene-nav">
        <button className="scene-nav__button" onClick={navToCommunity} type="button">
          返回 05A
        </button>
        <button className="scene-nav__button scene-nav__button--active" type="button">
          05B 折线图
        </button>
      </div>

      <section className="loss-card">
        <div className="loss-card__header">
          <div>
            <p className="loss-card__eyebrow">活跃用户趋势</p>
            <h1 className="loss-card__title">AI 接入后，沉浸感先断，人再开始流失。</h1>
          </div>
          <div className="loss-card__impact">
            <strong>-71%</strong>
            <span>AI 上线后 3 周内</span>
          </div>
        </div>

        <div className="loss-chart">
          <div className="loss-chart__grid">
            {[250, 165, 80, 0].map((value, index) => (
              <div
                className="loss-chart__grid-line"
                key={value}
                style={{ top: `${(index / 3) * 100}%` }}
              >
                <span>{value}</span>
              </div>
            ))}
          </div>

          <svg className="loss-chart__svg" viewBox="0 0 800 320" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lossArea" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(237, 66, 69, 0.28)" />
                <stop offset="100%" stopColor="rgba(237, 66, 69, 0.02)" />
              </linearGradient>
              <linearGradient id="lossLine" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#23a55a" />
                <stop offset="32%" stopColor="#23a55a" />
                <stop offset="40%" stopColor="#ed4245" />
                <stop offset="100%" stopColor="#ed4245" />
              </linearGradient>
            </defs>

            <path d={areaPath} fill="url(#lossArea)" />
            <path
              d={chartPath}
              fill="none"
              stroke="url(#lossLine)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            />

            <line
              stroke="rgba(237, 66, 69, 0.55)"
              strokeDasharray="8 6"
              strokeWidth="2"
              x1={inflectionPoint.x}
              x2={inflectionPoint.x}
              y1={0}
              y2={320}
            />

            <circle cx={points[0]!.x} cy={points[0]!.y} fill="#23a55a" r="6" />
            <circle cx={inflectionPoint.x} cy={inflectionPoint.y} fill="#ed4245" r="6" />
            <circle cx={lastPoint.x} cy={lastPoint.y} fill="#ed4245" r="7" />

            <rect
              fill="rgba(237, 66, 69, 0.16)"
              height="28"
              rx="8"
              width="110"
              x={inflectionPoint.x + 16}
              y="14"
            />
            <text
              fill="#ff8e91"
              fontFamily="Inter, Segoe UI, sans-serif"
              fontSize="13"
              fontWeight="700"
              x={inflectionPoint.x + 71}
              y="32"
              textAnchor="middle"
            >
              AI 接入点
            </text>

            <text
              fill="#ff8e91"
              fontFamily="Inter, Segoe UI, sans-serif"
              fontSize="14"
              fontWeight="700"
              x={lastPoint.x - 4}
              y={lastPoint.y - 14}
              textAnchor="end"
            >
              {lastPoint.value}
            </text>
          </svg>
        </div>

        <div className="loss-chart__labels">
          {communityGuildState.activityTrendLabels.map((label, index) => (
            <span
              className={index === 2 ? "loss-chart__label loss-chart__label--highlight" : "loss-chart__label"}
              key={label}
            >
              {label}
            </span>
          ))}
        </div>

        <div className="loss-card__footer">
          <div className="loss-card__metric">
            <strong>从 248 到 71</strong>
            <span>不是一两个人走，是整段社区氛围被抽空。</span>
          </div>
          <div className="loss-card__metric loss-card__metric--muted">
            <strong>该社区 AI 上线后 3 周内数据</strong>
            <span>先是角色感断裂，再是成员离开，最后体现在活跃数字上。</span>
          </div>
        </div>
      </section>
    </main>
  );
}
