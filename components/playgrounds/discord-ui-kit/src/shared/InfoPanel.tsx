import type { InfoPanelData } from "../lib/types";

type InfoPanelProps = {
  panel: InfoPanelData;
};

export function InfoPanel({ panel }: InfoPanelProps) {
  return (
    <aside className="info-panel" aria-label="Context panel">
      <div className="info-panel__card info-panel__card--hero">
        <p className="info-panel__eyebrow">{panel.eyebrow ?? "Preview Intent"}</p>
        <h3>{panel.title}</h3>
        <p>{panel.subtitle}</p>
      </div>

      <div className="info-panel__card">
        <p className="info-panel__eyebrow">Pinned Checks</p>
        <ul className="info-panel__list">
          {panel.pinnedFacts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </div>

      {panel.metrics?.length ? (
        <div className="info-panel__card info-panel__card--dense">
          <p className="info-panel__eyebrow">Visual Notes</p>
          <div className="info-panel__metrics">
            {panel.metrics.map((metric) => (
              <div key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </aside>
  );
}
