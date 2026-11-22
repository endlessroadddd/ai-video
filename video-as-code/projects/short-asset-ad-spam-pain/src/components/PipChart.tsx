import ReactECharts from "echarts-for-react";
import { useMemo, type CSSProperties } from "react";
import {
  CHART_A_KEYFRAMES,
  CHART_B_KEYFRAMES,
} from "../data/chartSeries";
import { easeOutQuint, progressBetween } from "../lib/easing";

interface PipChartProps {
  variant: "A" | "B";
  visible: boolean;
  currentMs: number;
}

export default function PipChart(props: Readonly<PipChartProps>) {
  const { currentMs, variant, visible } = props;

  const config = useMemo(() => {
    if (variant === "A") {
      return {
        eyebrow: "Manual keyword maintenance",
        note: "Backlog grows as current filters are bypassed by variants.",
        sequenceStartMs: 10_620,
        title: "Keyword backlog vs catch rate",
        xLabels: ["Start", "More phrases", "Variants shift", "Still leaking"],
        dataProblem: CHART_A_KEYFRAMES.map(f => f.banned),
        dataDefense: CHART_A_KEYFRAMES.map(f => f.blockRate * 100),
        labelProblem: "Pending Keywords",
        labelDefense: "Catch Rate (%)",
      };
    }
    return {
      eyebrow: "Manual cleanup pressure",
      note: "Incoming bot waves exponentially overwhelm manual moderation.",
      sequenceStartMs: 26_080,
      title: "Manual kicks vs incoming bots",
      xLabels: ["Kick starts", "More cleanup", "Wave accelerates", "Still behind"],
      dataProblem: CHART_B_KEYFRAMES.map(f => f.joined),
      dataDefense: CHART_B_KEYFRAMES.map(f => f.kicked),
      labelProblem: "Incoming Bots",
      labelDefense: "Manual Kicks",
    };
  }, [variant]);

  const option = useMemo(() => ({
    backgroundColor: "transparent",
    grid: {
      left: "2%",
      right: "2%",
      top: "14%",
      bottom: "6%",
      containLabel: true,
    },
    tooltip: { show: false },
    xAxis: {
      type: "category",
      data: config.xLabels,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: "rgba(255, 255, 255, 0.45)",
        fontSize: 14,
        margin: 22,
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        lineStyle: { color: "rgba(255, 255, 255, 0.05)" },
      },
      axisLabel: { show: false },
    },
    series: [
      {
        name: config.labelDefense,
        type: "line",
        smooth: 0.4,
        showSymbol: true,
        symbol: "circle",
        symbolSize: 12,
        data: config.dataDefense,
        lineStyle: {
          width: 5,
          color: "#4a86e8",
          shadowBlur: 15,
          shadowColor: "rgba(74, 134, 232, 0.4)",
        },
        itemStyle: {
          color: "#4a86e8",
          borderColor: "#ffffff",
          borderWidth: 2,
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(74, 134, 232, 0.2)" },
              { offset: 1, color: "rgba(74, 134, 232, 0)" },
            ],
          },
        },
        label: {
          show: true,
          position: "top",
          color: "#fff",
          fontSize: 12,
          fontWeight: "bold",
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          padding: [4, 8],
          borderRadius: 4,
        },
        animationDuration: 1800,
        animationDelay: (idx: number) => idx * 150,
      },
      {
        name: config.labelProblem,
        type: "line",
        smooth: 0.4,
        showSymbol: true,
        symbol: "circle",
        symbolSize: 14,
        data: config.dataProblem,
        lineStyle: {
          width: 8,
          color: "#ff4d4f",
          shadowBlur: 30,
          shadowColor: "rgba(255, 77, 79, 0.8)",
        },
        itemStyle: {
          color: "#ff4d4f",
          borderColor: "#ffffff",
          borderWidth: 3,
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(255, 77, 79, 0.45)" },
              { offset: 1, color: "rgba(255, 77, 79, 0)" },
            ],
          },
        },
        label: {
          show: true,
          position: "bottom",
          offset: [0, 10],
          color: "#fff",
          fontSize: 14,
          fontWeight: "bold",
          backgroundColor: "rgba(255, 77, 79, 0.65)",
          padding: [6, 12],
          borderRadius: 6,
        },
        animationDuration: 2200,
        animationDelay: (idx: number) => 400 + idx * 150,
      },
    ],
  }), [config]);

  const shellProgress = easeOutQuint(progressBetween(currentMs, config.sequenceStartMs, config.sequenceStartMs + 340));
  
  if (!visible) {
    return null;
  }

  const modalStyle: CSSProperties = {
    opacity: shellProgress,
    transform: `translate3d(0, ${(1 - shellProgress) * 40}px, 0) scale(${0.92 + shellProgress * 0.08})`,
  };

  return (
    <div className="pip-chart-layer">
      <aside 
        className="pip-chart-modal"
        style={modalStyle}
      >
        <div className="pip-chart-modal__toolbar">
          <div className="pip-chart-modal__lights" aria-hidden="true">
            <span className="pip-chart-modal__light pip-chart-modal__light--warm" />
            <span className="pip-chart-modal__light pip-chart-modal__light--neutral" />
            <span className="pip-chart-modal__light pip-chart-modal__light--cool" />
          </div>
          <div className="pip-chart-modal__toolbar-label">Moderation analytics</div>
        </div>

        <div className="pip-chart-modal__header">
          <div className="pip-chart-modal__copy">
            <p className="pip-chart-modal__eyebrow">{config.eyebrow}</p>
            <h3 className="pip-chart-modal__title">{config.title}</h3>
          </div>
          <div className="pip-chart-modal__legend">
             <div className="pip-chart-modal__legend-row">
               <span className="pip-chart-modal__swatch pip-chart-modal__swatch--primary" />
               <span className="pip-chart-modal__legend-label">{config.labelA}</span>
             </div>
             <div className="pip-chart-modal__legend-row">
               <span className="pip-chart-modal__swatch pip-chart-modal__swatch--secondary" />
               <span className="pip-chart-modal__legend-label">{config.labelB}</span>
             </div>
          </div>
        </div>

        <div className="pip-chart-plot" style={{ height: "320px", display: "block" }}>
          <ReactECharts 
            option={option} 
            style={{ height: "100%", width: "100%" }}
            notMerge={true}
            lazyUpdate={true}
          />
        </div>

        <p className="pip-chart-modal__note">
          {config.note}
        </p>
      </aside>
    </div>
  );
}
