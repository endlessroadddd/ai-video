import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import {
  type SceneRoute,
  type FrameRoute,
  isSceneRoute,
  isFrameRoute,
  getShotByRoute,
  shots,
  totalDurationMs,
} from "./data/shots";
import { TimelinePreview } from "./scenes/TimelinePreview";
import { OverviewCommandCenterScene } from "./scenes/OverviewCommandCenterScene";
import { DiscordDetailScene } from "./scenes/DiscordDetailScene";
import { DiscordProofScene } from "./scenes/DiscordProofScene";
import { RouterScene } from "./scenes/RouterScene";
import { EmailProofScene } from "./scenes/EmailProofScene";
import { ProductKVScene } from "./scenes/ProductKVScene";
import "./app.css";

function getView(): "timeline" | "scene" | "frame" {
  const params = new URLSearchParams(window.location.search);
  const view = params.get("view");
  if (view === "timeline") return "timeline";
  if (params.get("frame")) return "frame";
  if (params.get("scene")) return "scene";
  return "timeline";
}

function getScene(): SceneRoute {
  const value = new URLSearchParams(window.location.search).get("scene");
  return isSceneRoute(value) ? value : "s0-1";
}

function getFrame(): FrameRoute {
  const value = new URLSearchParams(window.location.search).get("frame");
  return isFrameRoute(value) ? value : "00";
}

function getDebug(): boolean {
  return new URLSearchParams(window.location.search).get("debug") === "1";
}

function getControls(): boolean {
  const params = new URLSearchParams(window.location.search);
  return params.get("controls") === "1" || params.get("debug") === "1";
}

function getTimeParam(): number | null {
  const t = new URLSearchParams(window.location.search).get("t");
  if (!t) return null;
  const n = parseInt(t, 10);
  return isNaN(n) ? null : n;
}

function navigate(next: { scene?: SceneRoute; frame?: FrameRoute; view?: "timeline" | "scene" | "frame"; t?: number }) {
  const params = new URLSearchParams();
  const view = next.view ?? "scene";
  params.set("view", view === "frame" ? "scene" : view);
  if (view === "frame" && next.frame) {
    params.set("frame", next.frame);
  } else if ((view === "scene" || view === "frame") && next.scene) {
    params.set("scene", next.scene);
  }
  if (next.t !== undefined) {
    params.set("t", String(next.t));
  }
  window.location.search = params.toString();
}

function renderScene(route: SceneRoute) {
  switch (route) {
    case "s0-1":
    case "s0-2":
    case "s0-3":
      return <OverviewCommandCenterScene />;
    case "s1-1":
    case "s1-2":
      return <DiscordDetailScene />;
    case "s1-3":
    case "s1-4":
      return <DiscordProofScene />;
    case "s2-1":
    case "s2-2":
    case "s2-3":
      return <RouterScene />;
    case "s3-1":
    case "s3-2":
    case "s3-3":
    case "s3-4":
      return <EmailProofScene />;
    case "s4-1":
    case "s4-2":
    case "s4-3":
      return <ProductKVScene />;
    default:
      return <OverviewCommandCenterScene />;
  }
}

function renderFrame(frame: FrameRoute) {
  switch (frame) {
    case "00":
      return <OverviewCommandCenterScene />;
    case "01":
      return <DiscordDetailScene />;
    case "02":
      return <DiscordProofScene />;
    case "03":
      return <RouterScene />;
    case "04":
      return <EmailProofScene />;
    case "05":
      return <ProductKVScene />;
    default:
      return <OverviewCommandCenterScene />;
  }
}

function SceneToolbar({ currentScene, currentFrame }: { currentScene: SceneRoute; currentFrame: FrameRoute }) {
  const sceneButtons: { route: SceneRoute; label: string }[] = [
    { route: "s0-1", label: "S0" },
    { route: "s1-1", label: "S1" },
    { route: "s2-1", label: "S2" },
    { route: "s3-1", label: "S3" },
    { route: "s4-1", label: "S4" },
  ];

  const frameButtons: { route: FrameRoute; label: string }[] = [
    { route: "00", label: "F0" },
    { route: "01", label: "F1" },
    { route: "02", label: "F2" },
    { route: "03", label: "F3" },
    { route: "04", label: "F4" },
    { route: "05", label: "F5" },
  ];

  return (
    <div className="scene-nav">
      <div className="scene-nav__group">
        {sceneButtons.map(({ label, route }) => (
          <button
            className={`scene-nav__button${route === currentScene ? " scene-nav__button--active" : ""}`}
            key={route}
            onClick={() => navigate({ scene: route, view: "scene" })}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
      <div className="scene-nav__group">
        {frameButtons.map(({ label, route }) => (
          <button
            className={`scene-nav__button${route === currentFrame ? " scene-nav__button--active" : ""}`}
            key={route}
            onClick={() => navigate({ frame: route, view: "frame" })}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
      <div className="scene-nav__group">
        <button className="scene-nav__button" onClick={() => navigate({ view: "timeline" })} type="button">
          Timeline
        </button>
      </div>
    </div>
  );
}

function DebugOverlay({ time }: { time: number }) {
  const shot = shots.find((s) => time >= s.startMs && time < s.startMs + s.durationMs);
  return (
    <>
      <div className="debug-overlay">
        <div className="debug-safe-area" />
      </div>
      <div className="debug-info">
        <div>Time: {time.toLocaleString()}ms</div>
        <div>Shot: {shot ? `${shot.id} (${shot.segment})` : "—"}</div>
        <div>Route: {shot ? shot.route : "—"}</div>
        <div>Window: {window.innerWidth}×{window.innerHeight}</div>
      </div>
    </>
  );
}



function App() {
  const view = getView();
  const scene = getScene();
  const frame = getFrame();
  const debug = getDebug();
  const controls = getControls();

  if (view === "timeline") {
    return (
      <>
        {controls && <SceneToolbar currentScene={scene} currentFrame={frame} />}
        <TimelinePreview />
        {debug && <DebugOverlay time={0} />}
      </>
    );
  }

  if (view === "frame") {
    return (
      <>
        {controls && <SceneToolbar currentScene={scene} currentFrame={frame} />}
        {renderFrame(frame)}
        {debug && <DebugOverlay time={0} />}
      </>
    );
  }

  return (
    <>
      {controls && <SceneToolbar currentScene={scene} currentFrame={frame} />}
      {renderScene(scene)}
      {debug && <DebugOverlay time={0} />}
    </>
  );
}

class ErrorBoundary extends Component<{ children: React.ReactNode }, { error: Error | null }> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, fontFamily: "monospace", color: "red", whiteSpace: "pre-wrap" }}>
          <b>Runtime Error:</b>{"\n"}{(this.state.error as Error).message}{"\n\n"}{(this.state.error as Error).stack}
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
