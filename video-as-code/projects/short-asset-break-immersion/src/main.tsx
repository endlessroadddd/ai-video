import React from "react";
import ReactDOM from "react-dom/client";

import { CommunityScene } from "./CommunityScene";
import { LossChartScene } from "./LossChartScene";
import { TimelinePreview } from "./TimelinePreview";
import { type SceneMode, type SceneView, isSceneMode, isSceneView } from "./discord-ui-state";
import "./app.css";

function getView(): "scene" | "timeline" {
  return new URLSearchParams(window.location.search).get("view") === "timeline"
    ? "timeline"
    : "scene";
}

function getScene(): SceneView {
  const value = new URLSearchParams(window.location.search).get("scene");
  return isSceneView(value) ? value : "s01";
}

function getMode(): SceneMode {
  const value = new URLSearchParams(window.location.search).get("mode");
  return isSceneMode(value) ? value : "static";
}

const view = getView();
const scene = getScene();
const mode = getMode();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {view === "timeline" ? (
      <TimelinePreview />
    ) : scene === "s05b" ? (
      <LossChartScene currentScene={scene} mode={mode} />
    ) : (
      <CommunityScene currentScene={scene} mode={mode} />
    )}
  </React.StrictMode>,
);
