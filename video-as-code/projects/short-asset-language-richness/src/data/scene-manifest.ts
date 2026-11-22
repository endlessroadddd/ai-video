import type { RecordingIntertitleModel } from "../components/recording/RecordingIntertitle";
import type { RecordingOutcomeModel } from "../components/recording/RecordingOutcomeCard";
import type {
  ChatComposerModel,
  ChatMessage,
  ChatSidebarGroup,
} from "../lib/chat";

export type SceneId =
  | "s01-hook"
  | "s02-boring-contrast"
  | "s03-natural-chat"
  | "s04-wow-moment"
  | "s05-close";

export type NaturalChatPhase = "pending" | "streaming" | "resolved";

type BaseSceneEntry = {
  assetRefs: readonly string[];
  componentKey:
    | "RecordingIntertitle"
    | "BoringContrastChat"
    | "NaturalChat"
    | "RecordingOutcomeCard";
  description: string;
  durationFrames: number;
  id: SceneId;
  navLabel: string;
  previewOrder: number;
  title: string;
};

export type IntertitleSceneEntry = BaseSceneEntry & {
  componentKey: "RecordingIntertitle";
  id: "s01-hook" | "s05-close";
  intertitle: RecordingIntertitleModel;
};

export type BoringContrastSceneEntry = BaseSceneEntry & {
  componentKey: "BoringContrastChat";
  composer: ChatComposerModel;
  messages: readonly ChatMessage[];
  sidebarGroups: readonly ChatSidebarGroup[];
  sidebarTitle: string;
  stageTitle: string;
  statusLabel: string;
};

export type NaturalChatSceneEntry = BaseSceneEntry & {
  componentKey: "NaturalChat";
  composerByPhase: Record<NaturalChatPhase, ChatComposerModel>;
  messages: {
    base: readonly ChatMessage[];
    resolved: readonly ChatMessage[];
    streaming: ChatMessage;
  };
  phaseDurations: Record<
    NaturalChatPhase,
    number
  >;
  sidebarGroups: readonly ChatSidebarGroup[];
  sidebarTitle: string;
  stageTitle: string;
  statusLabels: Record<NaturalChatPhase, string>;
};

export type OutcomeSceneEntry = BaseSceneEntry & {
  componentKey: "RecordingOutcomeCard";
  outcome: RecordingOutcomeModel;
  overlayLabel: string;
};

export type SceneManifestEntry =
  | IntertitleSceneEntry
  | BoringContrastSceneEntry
  | NaturalChatSceneEntry
  | OutcomeSceneEntry;

export const SCENE_MANIFEST: readonly SceneManifestEntry[] = [
  {
    id: "s01-hook",
    navLabel: "01 Hook",
    title: "Hook",
    description:
      "Open with a brand-weighted intertitle that frames language-rich assets as the real reusable unit.",
    previewOrder: 1,
    durationFrames: 150,
    componentKey: "RecordingIntertitle",
    assetRefs: [
      "lucius-video-kit/RecordingIntertitle",
      "public/assets/fonts/Recoleta-RegularDEMO.otf",
      "public/assets/brand/logo-mark-black.svg",
    ],
    intertitle: {
      kicker: "Language richness",
      headline: "Every support thread leaves a clue",
      subline:
        "Language-rich assets let Lucius turn repeated questions into one reusable answer path.",
      copyDelayMs: 120,
      copyInDurationMs: 520,
      holdDurationMs: 1620,
      outDurationMs: 460,
    },
  },
  {
    id: "s02-boring-contrast",
    navLabel: "02 Contrast",
    title: "Boring Contrast",
    description:
      "Use the real chat shell contract, but show a flat answer that still feels rewritten by hand.",
    previewOrder: 2,
    durationFrames: 300,
    componentKey: "BoringContrastChat",
    assetRefs: [
      "lucius-video-kit/ChatShellFrame",
      "lucius-video-kit/ChatMessageList",
      "public/assets/brand/logo-mark-black.svg",
    ],
    sidebarTitle: "Chat",
    stageTitle: "Can we explain this once and stop rewriting it?",
    statusLabel: "Flat reply",
    sidebarGroups: [
      {
        id: "recent",
        title: "Recent",
        items: [
          {
            id: "language-pass",
            label: "Language support handoff",
            meta: "Now",
            active: true,
          },
          {
            id: "docs-loop",
            label: "Docs wording refresh",
            meta: "18m",
          },
          {
            id: "chat-gap",
            label: "Support chat escalation",
            meta: "1h",
          },
        ],
      },
    ],
    messages: [
      {
        id: "contrast-self-1",
        actorKind: "self",
        userId: "viewer",
        content:
          "Can you help us explain this workflow failure in one way that works for docs, support, and product chat?",
        timestamp: "2026-04-17T09:40:00Z",
      },
      {
        id: "contrast-participant-1",
        actorKind: "participant",
        userId: "pm",
        username: "Product Manager",
        content:
          "The team keeps rewriting the same answer because each surface phrases the problem differently.",
        timestamp: "2026-04-17T09:41:00Z",
      },
      {
        id: "contrast-lucius-1",
        actorKind: "lucius",
        content:
          "This seems like a setup issue. You may want to clarify the instructions and ask users to try again.",
        timestamp: "2026-04-17T09:41:30Z",
      },
    ],
    composer: {
      draftMessage:
        "Rewrite this again for docs, support, and onboarding in slightly different words.",
      readOnly: true,
      sendDisabled: true,
      subdued: true,
      placeholder: "Ask Lucius anything",
      sendLabel: "Send",
      uploadLabel: "Upload",
    },
  },
  {
    id: "s03-natural-chat",
    navLabel: "03 Natural",
    title: "Natural Chat",
    description:
      "Core validation scene for real chat DOM, long English wraps, bubble growth, and pending/streaming states.",
    previewOrder: 3,
    durationFrames: 420,
    componentKey: "NaturalChat",
    assetRefs: [
      "lucius-video-kit/ChatShellFrame",
      "lucius-video-kit/ChatMessageList",
      "lucius-video-kit/ChatComposer",
      "public/assets/brand/logo-mark-black.svg",
    ],
    sidebarTitle: "Chat",
    stageTitle: "Turn one repeated signal into reusable language",
    sidebarGroups: [
      {
        id: "active-lane",
        title: "Active",
        items: [
          {
            id: "asset-pass",
            label: "Language richness pilot",
            meta: "Now",
            active: true,
          },
          {
            id: "support-brief",
            label: "Support insight brief",
            meta: "12m",
          },
          {
            id: "docs-review",
            label: "Docs rewrite notes",
            meta: "45m",
          },
        ],
      },
      {
        id: "watch",
        title: "Watch",
        items: [
          {
            id: "handoff",
            label: "Handoff language QA",
            meta: "Soon",
          },
          {
            id: "publish",
            label: "Reply pattern publish",
            meta: "Later",
          },
        ],
      },
    ],
    phaseDurations: {
      pending: 120,
      streaming: 150,
      resolved: 150,
    },
    statusLabels: {
      pending: "Gathering signals",
      streaming: "Drafting answer",
      resolved: "Action ready",
    },
    messages: {
      base: [
        {
          id: "natural-self-1",
          actorKind: "self",
          userId: "viewer",
          content:
            "What is the clearest way to explain, in plain English, why the workflow still fails after the user follows the current setup guide, and how do we keep that answer consistent across docs, support, and product chat?",
          timestamp: "2026-04-17T09:43:00Z",
        },
        {
          id: "natural-participant-1",
          actorKind: "participant",
          userId: "ops",
          username: "Ops Lead",
          content:
            "We see the same confusion in onboarding notes, support tickets, and account handoff calls.",
          timestamp: "2026-04-17T09:43:24Z",
        },
        {
          id: "natural-participant-2",
          actorKind: "participant",
          userId: "support",
          username: "Support Lead",
          content:
            "The answer keeps growing because each team adds context, so the bubble becomes longer every time we repeat it.",
          timestamp: "2026-04-17T09:43:56Z",
        },
      ],
      streaming: {
        id: "natural-lucius-streaming",
        actorKind: "lucius",
        content:
          "The workflow does not fail because the user missed a single click. It fails because the current guide explains setup as a checklist, while the real success condition depends on the handoff language staying aligned across the account, support, and documentation surfaces",
        status: "streaming",
        timestamp: "2026-04-17T09:44:18Z",
      },
      resolved: [
        {
          id: "natural-lucius-resolved-1",
          actorKind: "lucius",
          content:
            "The workflow fails when the setup guide describes the steps correctly but does not explain the shared success condition clearly enough. Users finish the checklist, then hit the same handoff gap in docs, support, and chat.",
          timestamp: "2026-04-17T09:44:18Z",
        },
        {
          id: "natural-lucius-resolved-2",
          actorKind: "lucius",
          content:
            "Reusable answer: “The setup steps are complete, but the guide still leaves the handoff expectation implicit. Lucius can turn the repeated support signal into one plain-language explanation so docs, support, and chat all describe the same fix.”",
          timestamp: "2026-04-17T09:44:34Z",
        },
      ],
    },
    composerByPhase: {
      pending: {
        draftMessage:
          "Turn that repeated signal into one reusable answer for docs, support, and chat.",
        readOnly: true,
        sendDisabled: false,
        subdued: false,
      },
      streaming: {
        draftMessage:
          "Keep the wording plain, reusable, and short enough for an in-product handoff.",
        readOnly: true,
        sendDisabled: false,
        subdued: false,
      },
      resolved: {
        draftMessage:
          "Now format the answer as a reusable language asset for the team.",
        readOnly: true,
        sendDisabled: false,
        subdued: false,
      },
    },
  },
  {
    id: "s04-wow-moment",
    navLabel: "04 Wow",
    title: "Wow Moment",
    description:
      "Collapse the value into one outcome card without introducing a second visual system.",
    previewOrder: 4,
    durationFrames: 240,
    componentKey: "RecordingOutcomeCard",
    assetRefs: [
      "lucius-video-kit/RecordingOutcomeCard",
      "public/assets/fonts/Recoleta-RegularDEMO.otf",
      "public/assets/brand/logo-mark-black.svg",
    ],
    overlayLabel: "Minimal overlay",
    outcome: {
      kicker: "Client outcome",
      shippedInHours: 24,
      summary:
        "One language-rich answer aligned docs, support, and product chat without another rewrite loop.",
    },
  },
  {
    id: "s05-close",
    navLabel: "05 Close",
    title: "Close",
    description:
      "End with a clear scope boundary: preview first, render later, without changing the project shape.",
    previewOrder: 5,
    durationFrames: 180,
    componentKey: "RecordingIntertitle",
    assetRefs: [
      "lucius-video-kit/RecordingIntertitle",
      "public/assets/fonts/Recoleta-RegularDEMO.otf",
      "public/assets/brand/logo-mark-black.svg",
    ],
    intertitle: {
      kicker: "Preview first",
      headline: "Preview now, render later",
      subline:
        "This pilot locks the reusable scene language and keeps the folder shape ready for a future render pass.",
      copyDelayMs: 80,
      copyInDurationMs: 520,
      holdDurationMs: 1880,
      outDurationMs: 420,
    },
  },
];

export const TOTAL_FRAMES = SCENE_MANIFEST.reduce(
  (total, scene) => total + scene.durationFrames,
  0,
);

export function getSceneById(sceneId: SceneId): SceneManifestEntry {
  const scene = SCENE_MANIFEST.find((entry) => entry.id === sceneId);
  if (!scene) {
    throw new Error(`Unknown scene id: ${sceneId}`);
  }

  return scene;
}

export function getSceneAtPlaylistFrame(frame: number): {
  cycle: number;
  playlistFrame: number;
  scene: SceneManifestEntry;
  sceneFrame: number;
} {
  const normalizedFrame = ((frame % TOTAL_FRAMES) + TOTAL_FRAMES) % TOTAL_FRAMES;
  let runningFrame = 0;

  for (const scene of SCENE_MANIFEST) {
    const nextBoundary = runningFrame + scene.durationFrames;
    if (normalizedFrame < nextBoundary) {
      return {
        cycle: Math.floor(frame / TOTAL_FRAMES),
        playlistFrame: normalizedFrame,
        scene,
        sceneFrame: normalizedFrame - runningFrame,
      };
    }

    runningFrame = nextBoundary;
  }

  const fallbackScene = SCENE_MANIFEST[SCENE_MANIFEST.length - 1];
  return {
    cycle: Math.floor(frame / TOTAL_FRAMES),
    playlistFrame: normalizedFrame,
    scene: fallbackScene,
    sceneFrame: fallbackScene.durationFrames - 1,
  };
}

export function resolveNaturalChatPhase(
  scene: NaturalChatSceneEntry,
  sceneFrame: number,
): NaturalChatPhase {
  const loopedFrame =
    ((sceneFrame % scene.durationFrames) + scene.durationFrames) %
    scene.durationFrames;

  if (loopedFrame < scene.phaseDurations.pending) {
    return "pending";
  }

  if (
    loopedFrame <
    scene.phaseDurations.pending + scene.phaseDurations.streaming
  ) {
    return "streaming";
  }

  return "resolved";
}
