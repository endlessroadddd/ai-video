import type { SceneId, SceneMode, ViewMode } from "../types";

const SCENES = new Set<SceneId>(["s01", "s02", "s03", "s04", "s05"]);
const MODES = new Set<SceneMode>(["static", "motion"]);
const VIEWS = new Set<ViewMode>(["scene", "timeline"]);

export function getViewMode(): ViewMode {
  const value = new URLSearchParams(window.location.search).get("view");
  return value && VIEWS.has(value as ViewMode) ? (value as ViewMode) : "timeline";
}

export function getSceneId(): SceneId {
  const value = new URLSearchParams(window.location.search).get("scene");
  return value && SCENES.has(value as SceneId) ? (value as SceneId) : "s01";
}

export function getSceneMode(): SceneMode {
  const value = new URLSearchParams(window.location.search).get("mode");
  return value && MODES.has(value as SceneMode) ? (value as SceneMode) : "motion";
}

export function navigateQuery(next: Partial<{ view: ViewMode; scene: SceneId; mode: SceneMode }>) {
  const params = new URLSearchParams(window.location.search);
  if (next.view) params.set("view", next.view);
  if (next.scene) params.set("scene", next.scene);
  if (next.mode) params.set("mode", next.mode);
  window.location.search = params.toString();
}
