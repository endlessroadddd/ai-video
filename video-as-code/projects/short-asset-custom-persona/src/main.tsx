import React from "react";
import ReactDOM from "react-dom/client";

import { CommunityScene } from "./CommunityScene";
import { PersonaCombinedScene } from "./PersonaCombinedScene";
import { TimelinePreview } from "./TimelinePreview";
import { TitleCardScene } from "./TitleCardScene";
import { type SceneMode, type SceneView, isSceneMode, isSceneView } from "./discord-ui-state";
import {
  closingSubtitleFragments,
  closingTitleFragments,
  openingTitleFragments,
  personaClosingKicker,
  personaKicker,
} from "./persona-data";
import "./app.css";
import "./persona-visual.css";

function getView(): "scene" | "timeline" {
  return new URLSearchParams(window.location.search).get("view") === "timeline"
    ? "timeline"
    : "scene";
}

function getScene(): SceneView {
  const value = new URLSearchParams(window.location.search).get("scene");
  return isSceneView(value) ? value : "b1";
}

function getMode(): SceneMode {
  const value = new URLSearchParams(window.location.search).get("mode");
  return isSceneMode(value) ? value : "static";
}

function navigate(next: { scene?: SceneView; mode?: SceneMode; view?: "scene" | "timeline" }) {
  const params = new URLSearchParams();
  params.set("view", next.view ?? "scene");

  if ((next.view ?? "scene") === "scene") {
    params.set("scene", next.scene ?? "b1");
    params.set("mode", next.mode ?? "static");
  }

  window.location.search = params.toString();
}

function SceneToolbar(props: { currentScene: SceneView; mode: SceneMode }) {
  const { currentScene, mode } = props;
  const sceneButtons = [
    { scene: "b1" as SceneView, label: "B1" },
    { scene: "b2" as SceneView, label: "B2-3" },
    { scene: "b4" as SceneView, label: "B4" },
    { scene: "b5" as SceneView, label: "B5" },
  ];

  return (
    <div className="scene-nav">
      <div className="scene-nav__group">
        {sceneButtons.map(({ label, scene }) => (
          <button
            className={`scene-nav__button${
              scene === "b2"
                ? currentScene === "b2" || currentScene === "b3"
                  ? " scene-nav__button--active"
                  : ""
                : scene === currentScene
                  ? " scene-nav__button--active"
                  : ""
            }`}
            key={scene}
            onClick={() => navigate({ mode, scene, view: "scene" })}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="scene-nav__group">
        <span className="scene-nav__mode-label">Mode</span>
        {(["static", "motion"] as SceneMode[]).map((sceneMode) => (
          <button
            className={`scene-nav__button${sceneMode === mode ? " scene-nav__button--active" : ""}`}
            key={sceneMode}
            onClick={() => navigate({ mode: sceneMode, scene: currentScene, view: "scene" })}
            type="button"
          >
            {sceneMode}
          </button>
        ))}
      </div>

      <div className="scene-nav__group">
        <button
          className="scene-nav__button"
          onClick={() => navigate({ view: "timeline" })}
          type="button"
        >
          Timeline
        </button>
      </div>
    </div>
  );
}

function renderScene(scene: SceneView, mode: SceneMode) {
  switch (scene) {
    case "b1":
      return (
        <TitleCardScene
          kicker={personaKicker}
          mode={mode}
          outro={mode === "motion"}
          titleFragments={openingTitleFragments}
        />
      );
    case "b2":
    case "b3":
      return <PersonaCombinedScene mode={mode} />;
    case "b4":
      return <CommunityScene chrome="clean" mode={mode} />;
    case "b5":
      return (
        <TitleCardScene
          centeredOutro
          kicker={personaClosingKicker}
          mode={mode}
          showChip
          subtitleFragments={closingSubtitleFragments}
          titleFragments={closingTitleFragments}
        />
      );
  }
}

const view = getView();
const scene = getScene();
const mode = getMode();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {view === "timeline" ? (
      <TimelinePreview />
    ) : (
      <>
        <SceneToolbar currentScene={scene} mode={mode} />
        {renderScene(scene, mode)}
      </>
    )}
  </React.StrictMode>,
);
