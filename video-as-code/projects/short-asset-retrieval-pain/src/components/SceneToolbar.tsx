import type { SceneMode, ViewMode } from "../types";

type SceneToolbarProps = {
  currentMode: SceneMode;
  currentView: ViewMode;
  onModeChange: (mode: SceneMode) => void;
  onViewChange: (view: ViewMode) => void;
};

export function SceneToolbar(props: SceneToolbarProps) {
  const { currentMode, currentView, onModeChange, onViewChange } = props;

  return (
    <div className="scene-toolbar">
      <div className="scene-toolbar__group">
        {(["timeline", "scene"] as ViewMode[]).map((view) => (
          <button
            key={view}
            className={`scene-toolbar__button${view === currentView ? " is-active" : ""}`}
            onClick={() => onViewChange(view)}
            type="button"
          >
            {view === "timeline" ? "Timeline" : "Scene"}
          </button>
        ))}
      </div>

      <div className="scene-toolbar__group">
        {(["static", "motion"] as SceneMode[]).map((mode) => (
          <button
            key={mode}
            className={`scene-toolbar__button${mode === currentMode ? " is-active" : ""}`}
            onClick={() => onModeChange(mode)}
            type="button"
          >
            {mode}
          </button>
        ))}
      </div>
    </div>
  );
}
