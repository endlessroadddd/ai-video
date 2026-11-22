import { AnnotationCard } from "../components/AnnotationCard";
import { getLocalTime } from "../data/shots";
import { countTo, easeOutQuint, progressBetween } from "../lib/math";

type CostDashboardSceneProps = {
  currentMs: number;
  opacity: number;
};

export function CostDashboardScene(props: Readonly<CostDashboardSceneProps>) {
  const { currentMs, opacity } = props;
  const localMs = getLocalTime(currentMs, "cost");
  const drawProgress = easeOutQuint(progressBetween(localMs, 780, 1900));
  const statProgress = easeOutQuint(progressBetween(localMs, 1680, 2460));
  const cardProgress = easeOutQuint(progressBetween(localMs, 5000, 5680));
  const supportHours = (4.2 * statProgress).toFixed(1);
  const percent = countTo(localMs, 760, 1900, 68);
  const radius = 176;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - 0.68 * drawProgress);

  return (
    <section className="scene scene--cost" style={{ opacity }}>
      <div className="dashboard-stage">
        <div className="metric-panel metric-panel--donut">
          <div className="panel-heading">
            <span>Repeated support cost</span>
            <strong>Answered in docs</strong>
          </div>

          <div className="donut-wrap">
            <svg className="donut-chart" viewBox="0 0 420 420" role="img" aria-label="68 percent answered in docs">
              <circle className="donut-track" cx="210" cy="210" r={radius} />
              <circle
                className="donut-value"
                cx="210"
                cy="210"
                r={radius}
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: dashOffset,
                }}
              />
            </svg>
            <div className="donut-center">
              <strong>{percent}%</strong>
              <span>Answered in docs</span>
            </div>
          </div>
        </div>

        <div className="metric-panel metric-panel--time">
          <div className="panel-heading">
            <span>Average weekly support time</span>
            <strong>same questions</strong>
          </div>
          <div className="time-stat">
            <strong>{supportHours} hrs</strong>
            <span>per user · repeated onboarding questions</span>
          </div>
          <div className="time-bars" aria-hidden="true">
            <span style={{ transform: `scaleX(${0.42 + drawProgress * 0.34})` }} />
            <span style={{ transform: `scaleX(${0.3 + drawProgress * 0.58})` }} />
            <span style={{ transform: `scaleX(${0.22 + drawProgress * 0.46})` }} />
          </div>
        </div>

        <AnnotationCard
          className="cost-card"
          style={{
            opacity: cardProgress,
            transform: `translate3d(${(1 - cardProgress) * 34}px, ${(1 - cardProgress) * 18}px, 0)`,
          }}
          subtitle="of support tickets are already answered in docs"
          title="68%"
          tone="red"
        />
      </div>
    </section>
  );
}
