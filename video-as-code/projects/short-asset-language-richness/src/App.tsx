import { useEffect, useState, type ReactElement } from "react";

import { ChatComposer } from "./components/chat/ChatComposer";
import { ChatMessageList } from "./components/chat/ChatMessageList";
import { ChatShellFrame } from "./components/chat/ChatShellFrame";
import { RecordingIntertitle } from "./components/recording/RecordingIntertitle";
import { RecordingOutcomeCard } from "./components/recording/RecordingOutcomeCard";
import {
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
  resolveConfiguredDimension,
} from "./config/video";
import {
  SCENE_MANIFEST,
  getSceneAtPlaylistFrame,
  getSceneById,
  resolveNaturalChatPhase,
  type NaturalChatPhase,
  type NaturalChatSceneEntry,
  type SceneId,
  type SceneManifestEntry,
} from "./data/scene-manifest";
import { usePlaybackClock } from "./hooks/usePlaybackClock";
import { useViewportSize } from "./hooks/useViewportSize";
import type { ChatComposerModel, ChatMessage, ChatSidebarGroup } from "./lib/chat";
import { joinClassNames } from "./lib/utils";

const NATURAL_CHAT_PHASES: readonly NaturalChatPhase[] = [
  "pending",
  "streaming",
  "resolved",
];

function parseSceneId(value: string | null): SceneId | null {
  if (!value) {
    return null;
  }

  return SCENE_MANIFEST.some((scene) => scene.id === value)
    ? (value as SceneId)
    : null;
}

function parseNaturalChatPhase(
  value: string | null,
): NaturalChatPhase | null {
  if (!value) {
    return null;
  }

  return NATURAL_CHAT_PHASES.includes(value as NaturalChatPhase)
    ? (value as NaturalChatPhase)
    : null;
}

function getLoopedFrame(frame: number, durationFrames: number): number {
  if (durationFrames <= 0) {
    return 0;
  }

  return ((frame % durationFrames) + durationFrames) % durationFrames;
}

function buildSearchString(
  sceneId: SceneId | null,
  phase: NaturalChatPhase | null,
): string {
  const params = new URLSearchParams();

  if (sceneId) {
    params.set("scene", sceneId);
  }

  if (sceneId === "s03-natural-chat" && phase) {
    params.set("phase", phase);
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
}

function formatDuration(frames: number): string {
  const seconds = frames / VIDEO_FPS;
  return Number.isInteger(seconds) ? `${seconds}s` : `${seconds.toFixed(1)}s`;
}

function formatPhaseLabel(phase: NaturalChatPhase): string {
  return phase.charAt(0).toUpperCase() + phase.slice(1);
}

type ChatPreviewSceneProps = {
  composer: ChatComposerModel;
  messages: ReadonlyArray<ChatMessage>;
  mode: "contrast" | "natural";
  showPendingReply?: boolean;
  sidebarGroups: readonly ChatSidebarGroup[];
  sidebarTitle: string;
  stageTitle: string;
  statusLabel: string;
};

function ChatPreviewScene(props: Readonly<ChatPreviewSceneProps>): ReactElement {
  const {
    composer,
    messages,
    mode,
    showPendingReply = false,
    sidebarGroups,
    sidebarTitle,
    stageTitle,
    statusLabel,
  } = props;

  return (
    <div
      className={joinClassNames(
        "preview-scene preview-scene--chat",
        mode === "contrast" && "preview-scene--chat-contrast",
      )}
    >
      <div className="preview-scene__chat-shell">
        <ChatShellFrame
          footer={<ChatComposer {...composer} />}
          sidebarGroups={sidebarGroups}
          sidebarTitle={sidebarTitle}
          statusLabel={statusLabel}
          title={stageTitle}
        >
          <ChatMessageList
            currentUserId="viewer"
            luciusAvatarUrl="/assets/brand/logo-mark-black.svg"
            messages={messages}
            participantFallbackName="Teammate"
            selfName="You"
            showPendingReply={showPendingReply}
          />
        </ChatShellFrame>
      </div>
    </div>
  );
}

function renderSceneContent(
  scene: SceneManifestEntry,
  activePhase: NaturalChatPhase | null,
): ReactElement {
  if (scene.componentKey === "RecordingIntertitle") {
    return (
      <div className="preview-scene preview-scene--intertitle">
        <RecordingIntertitle animate intertitle={scene.intertitle} />
      </div>
    );
  }

  if (scene.componentKey === "BoringContrastChat") {
    return (
      <ChatPreviewScene
        composer={scene.composer}
        messages={scene.messages}
        mode="contrast"
        sidebarGroups={scene.sidebarGroups}
        sidebarTitle={scene.sidebarTitle}
        stageTitle={scene.stageTitle}
        statusLabel={scene.statusLabel}
      />
    );
  }

  if (scene.componentKey === "NaturalChat") {
    const phase = activePhase || "pending";
    const messages =
      phase === "pending"
        ? scene.messages.base
        : phase === "streaming"
          ? [...scene.messages.base, scene.messages.streaming]
          : [...scene.messages.base, ...scene.messages.resolved];

    return (
      <ChatPreviewScene
        composer={scene.composerByPhase[phase]}
        messages={messages}
        mode="natural"
        showPendingReply={phase === "pending"}
        sidebarGroups={scene.sidebarGroups}
        sidebarTitle={scene.sidebarTitle}
        stageTitle={scene.stageTitle}
        statusLabel={scene.statusLabels[phase]}
      />
    );
  }

  return (
    <div className="preview-scene preview-scene--outcome">
      <RecordingOutcomeCard animate outcome={scene.outcome} />
      <div className="preview-scene__outcome-pill">{scene.overlayLabel}</div>
    </div>
  );
}

export function App(): ReactElement {
  const initialParams = new URLSearchParams(window.location.search);
  const [lockedSceneId, setLockedSceneId] = useState<SceneId | null>(() =>
    parseSceneId(initialParams.get("scene")),
  );
  const [phaseOverride, setPhaseOverride] = useState<NaturalChatPhase | null>(
    () => parseNaturalChatPhase(initialParams.get("phase")),
  );
  const [isPlaying, setIsPlaying] = useState(true);
  const { frame, reset } = usePlaybackClock({
    fps: VIDEO_FPS,
    isPlaying,
  });
  const viewport = useViewportSize();

  useEffect(() => {
    if (lockedSceneId !== "s03-natural-chat" && phaseOverride !== null) {
      setPhaseOverride(null);
    }
  }, [lockedSceneId, phaseOverride]);

  useEffect(() => {
    const nextSearch = buildSearchString(lockedSceneId, phaseOverride);
    if (window.location.search !== nextSearch) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${nextSearch}`,
      );
    }
  }, [lockedSceneId, phaseOverride]);

  const playback = lockedSceneId
    ? (() => {
        const scene = getSceneById(lockedSceneId);
        return {
          cycle: Math.floor(frame / scene.durationFrames),
          scene,
          sceneFrame: getLoopedFrame(frame, scene.durationFrames),
        };
      })()
    : getSceneAtPlaylistFrame(frame);

  const activeScene = playback.scene;
  const activePhase =
    activeScene.componentKey === "NaturalChat"
      ? phaseOverride || resolveNaturalChatPhase(activeScene, playback.sceneFrame)
      : null;
  const sceneKey = activePhase
    ? `${activeScene.id}:${playback.cycle}:${activePhase}`
    : `${activeScene.id}:${playback.cycle}`;
  const previewWidth = resolveConfiguredDimension(VIDEO_WIDTH, viewport.width);
  const previewHeight = resolveConfiguredDimension(VIDEO_HEIGHT, viewport.height);

  function handleSceneSelection(nextSceneId: SceneId | null): void {
    setLockedSceneId(nextSceneId);
    if (nextSceneId !== "s03-natural-chat") {
      setPhaseOverride(null);
    }
    reset();
    setIsPlaying(true);
  }

  function handlePhaseSelection(nextPhase: NaturalChatPhase | null): void {
    if (lockedSceneId !== "s03-natural-chat") {
      return;
    }

    setPhaseOverride(nextPhase);
    reset();
    setIsPlaying(true);
  }

  return (
    <div className="preview-app">
      <div className="preview-stage">
        <div className="preview-stage__inner" key={sceneKey}>
          {renderSceneContent(activeScene, activePhase)}

          <div className="preview-stage__annotation">
            <strong>{activeScene.title}</strong>
            <span>{activeScene.description}</span>
          </div>

          {activeScene.componentKey === "NaturalChat" && activePhase ? (
            <div className="preview-scene__frame-note">
              {formatPhaseLabel(activePhase)} state
            </div>
          ) : null}
        </div>
      </div>

      <div className="preview-overlay">
        <div className="preview-card">
          <img
            alt=""
            aria-hidden="true"
            className="preview-card__logo"
            src="/assets/brand/logo-mark-black.svg"
          />
          <div>
            <span className="preview-card__eyebrow">Preview pilot</span>
            <span className="preview-card__title">
              short-asset-language-richness
            </span>
          </div>
        </div>

        <div className="preview-meta">
          <div className="preview-pill">
            {lockedSceneId ? "Single scene" : "Playlist loop"}
          </div>
          <div className="preview-pill">{activeScene.id}</div>
          <div className="preview-pill">{activeScene.componentKey}</div>
          <div className="preview-pill">
            {previewWidth} x {previewHeight} · {VIDEO_FPS}fps
          </div>
        </div>
      </div>

      <div className="preview-controls">
        <div className="preview-controls__cluster">
          <button
            className={joinClassNames(
              "preview-button",
              lockedSceneId === null && "preview-button--active",
            )}
            onClick={() => {
              handleSceneSelection(null);
            }}
            type="button"
          >
            Playlist
          </button>

          {SCENE_MANIFEST.map((scene) => (
            <button
              className={joinClassNames(
                "preview-button preview-button--subtle",
                lockedSceneId === scene.id && "preview-button--active",
              )}
              key={scene.id}
              onClick={() => {
                handleSceneSelection(scene.id);
              }}
              type="button"
            >
              {scene.navLabel}
            </button>
          ))}
        </div>

        <div className="preview-controls__cluster">
          {lockedSceneId === "s03-natural-chat"
            ? NATURAL_CHAT_PHASES.map((phase) => (
                <button
                  className={joinClassNames(
                    "preview-button preview-button--phase",
                    phaseOverride === phase && "preview-button--active",
                  )}
                  key={phase}
                  onClick={() => {
                    handlePhaseSelection(phase);
                  }}
                  type="button"
                >
                  {formatPhaseLabel(phase)}
                </button>
              ))
            : null}

          <button
            className="preview-button"
            onClick={() => {
              setIsPlaying((currentValue) => !currentValue);
            }}
            type="button"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>

          <button
            className="preview-button"
            onClick={() => {
              reset();
              setIsPlaying(true);
            }}
            type="button"
          >
            Restart
          </button>

          <div className="preview-pill">
            {formatDuration(activeScene.durationFrames)} · order{" "}
            {activeScene.previewOrder}
          </div>
        </div>
      </div>
    </div>
  );
}
