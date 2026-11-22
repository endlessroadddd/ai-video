import {
  createFileRoute,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowUp,
  ChevronRight,
  Loader2,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  SquarePen,
  Trash2,
  X,
} from "lucide-react";
import {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from "react";
import { toast } from "sonner";

import { ClientChatMessageList } from "@/components/chat/client-chat-message-list";
import { ClientChatReplyReadyToast } from "@/components/chat/client-chat-reply-ready-toast";
import { CompanySelectionPrompt } from "@/components/company-selection-prompt";
import {
  DashboardPageLayout,
  DashboardPageLayoutCard,
} from "@/components/dashboard-page-layout";
import { DashboardSidebarToggleTitle } from "@/components/dashboard-sidebar-toggle-title";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { requireAuthOrRedirect } from "@/lib/auth/guard";
import {
  collectAssistantMessageIds,
  hasPendingReplyCompleted,
  isLuciusReplyMessage,
  persistPendingReplyStateMap,
  readPersistedPendingReplyStateMap,
  sanitizePendingReplyStateMap,
  type ClientChatPendingReplyStateMap,
} from "@/lib/client-chat-pending-reply";
import {
  getClientChatLocationTarget,
  isClientChatDraftRoute,
} from "@/lib/client-chat-route";
import {
  type ClientChatRecordingAnalysisMessageSlot,
  type ClientChatRecordingAnalysisOrbitSlot,
  type ClientChatRecordingIntertitle,
  type ClientChatRecordingAnalysisScene,
  type ClientChatRecordingLayoutState,
  type ClientChatRecordingWikiItem,
  type ClientChatRecordingWikiScene,
  type ClientChatRecordingOutcomeScene,
  getClientChatRecordingPromptDelay,
  getClientChatRecordingReplyDelay,
  type ClientChatRecordingCameraState,
  type ClientChatRecordingScenario,
} from "@/lib/client-chat-recording";
import {
  createClientChatCelebrationBubbleRaw,
  createClientChatFloatingEmojiRaw,
  createClientChatSupportHandoffCardRaw,
  type ClientChatSupportRecordingScenario,
} from "@/lib/client-chat-support-recording";
import { buildClientChatSessionList } from "@/lib/client-chat-session-list";
import { useSelectedCompanyId } from "@/lib/company-selection";
import {
  fetchClientChatMessages,
  fetchClientChatSessions,
  sendClientChatMessage,
  uploadClientChatImage,
  type ClientChatImagePayload,
  type ClientChatMessage,
  type ClientChatSessionListItem,
} from "@/lib/services/client-chat-api";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useCurrentUserCompanies } from "@/lib/services/company-membership-query";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";
import { useViewportProfile } from "@/lib/use-viewport-profile";

export const Route = createFileRoute("/dashboard/client-chat")({
  beforeLoad: async ({ location }) => {
    await requireAuthOrRedirect(location);
    throw redirect({
      to: "/chat",
    });
  },
  component: () => null,
});

const CHAT_SESSION_CUSTOMIZATION_STORAGE_PREFIX =
  "client-chat:session-customization:v1";
const LUCIUS_BRAND_MARK_URL = "/figma-auth/Logo%20Mark_black.svg";
const SESSION_LIST_PAGE_SIZE = 20;
const MAX_UPLOAD_IMAGE_BYTES = 5 * 1024 * 1024;
const CLIENT_CHAT_RECORDING_OUTCOME_DURATION_MS = 2900;
const CLIENT_CHAT_RECORDING_POST_REPLY_HOLD_DURATION_MS = 2400;
const MAX_UPLOAD_IMAGE_COUNT = 10;
const MAX_STAGE_TITLE_CHARACTERS = 100;
const COMPLETED_REPLY_TOAST_DURATION = 8000;

type OptimisticMessageStatus = "uploading" | "persisting";

type OptimisticClientMessage = {
  localId: string;
  companyId: string;
  sessionId: string;
  message: ClientChatMessage;
  status: OptimisticMessageStatus;
  serverMessageId: string | null;
};

type ClientChatSessionSkeletonConfig = {
  titleWidth: string;
};

type ClientChatSkeletonVariant = "base" | "soft" | "strong" | "accent";

type ClientChatMessageSkeletonLineConfig = {
  variant: ClientChatSkeletonVariant;
  width: string;
};

type ClientChatMessageSkeletonRowConfig = {
  alignment: "assistant" | "participant" | "self";
  headNameWidth?: string;
  hideHead?: boolean;
  lines: ReadonlyArray<ClientChatMessageSkeletonLineConfig>;
  timeWidth?: string;
};

type ClientChatSessionCustomization = {
  hidden?: boolean;
  pinned?: boolean;
  title?: string;
};

type ClientChatSessionCustomizationMap = Record<
  string,
  ClientChatSessionCustomization
>;

type ClientChatPromptCardTone = "default" | "lavender" | "sage";

type ClientChatRenderableSession = {
  dayLabel: string;
  isActive: boolean;
  isPendingReply: boolean;
  isPinned: boolean;
  isTitleLoading: boolean;
  sessionId: string;
  title: string;
};

type ClientChatPromptCard = {
  icon: string;
  prompt: string;
  tone: ClientChatPromptCardTone;
};

type ClientChatSelectedImage = {
  id: string;
  file: File;
  previewUrl: string;
};

type ClientChatSessionActionsMenuProps = {
  isPinned: boolean;
  onRemove: () => void;
  onRename: () => void;
  onTogglePinned: () => void;
  triggerClassName?: string;
};

type ClientChatSearchDialogProps = {
  onOpenChange: (open: boolean) => void;
  onSearchChange: (value: string) => void;
  onSelectSession: (sessionId: string) => void;
  open: boolean;
  searchValue: string;
  sessions: ClientChatRenderableSession[];
};

type ClientChatSessionSectionProps = {
  onRemoveSession: (sessionId: string) => void;
  onRenameSession: (sessionId: string) => void;
  onSelectSession: (sessionId: string) => void;
  onToggleSessionPinned: (sessionId: string) => void;
  sessions: ClientChatRenderableSession[];
  title: string;
};

type ClientChatComposerProps = {
  autoplaySendClickDurationMs?: number;
  draftMessage: string;
  errorMessages: string[];
  fileInputRef: RefObject<HTMLInputElement | null>;
  isAutoplaySendClicking?: boolean;
  isAutoplayTypingPrompt?: boolean;
  isInteractionDisabled: boolean;
  isReadOnly?: boolean;
  isTextareaReadOnly?: boolean;
  isSending: boolean;
  onDraftMessageChange: (value: string) => void;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onOpenFilePicker: () => void;
  onRemoveSelectedImage: (imageId: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onTextareaKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  selectedImages: ClientChatSelectedImage[];
  shouldDisableSubmit: boolean;
  submitButtonRef?: RefObject<HTMLButtonElement | null>;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
};

type ClientChatEmptyStateProps = {
  composer: ReactNode;
  onUsePrompt: (prompt: string) => void;
  prompts: ClientChatPromptCard[];
};

type ClientChatPageProps = {
  onRecordingCameraStateChange?:
    | ((state: ClientChatRecordingCameraState) => void)
    | null;
  onRecordingLayoutStateChange?:
    | ((state: ClientChatRecordingLayoutState) => void)
    | null;
  recordingScenario?: ClientChatRecordingScenario | null;
  supportRecordingScenario?: ClientChatSupportRecordingScenario | null;
  routeSessionId?: string | null;
};

type ClientChatRecordingPlaybackPhase =
  | "idle"
  | "typingPrompt"
  | "clickingSend"
  | "sendingUser"
  | "blankSignals"
  | "intertitleSignals"
  | "analysisIntro"
  | "analysisOrbit"
  | "analysisDispatch"
  | "analysisSettle"
  | "analysisEvidence"
  | "blankEvidence"
  | "intertitleEvidence"
  | "wikiIntro"
  | "wikiScrollPrimary"
  | "wikiHighlightPrimary"
  | "wikiExtractPrimary"
  | "wikiScrollSecondary"
  | "wikiHighlightSecondary"
  | "wikiExtractSecondary"
  | "wikiMask"
  | "wikiLuciusEnter"
  | "wikiIngest"
  | "analysisResolve"
  | "analysisHandoff"
  | "thinking"
  | "streamingAssistant"
  | "outcome"
  | "done";

type ClientChatRecordingBlankPlaybackPhase = Extract<
  ClientChatRecordingPlaybackPhase,
  "blankSignals" | "blankEvidence"
>;

type ClientChatRecordingIntertitlePlaybackPhase = Extract<
  ClientChatRecordingPlaybackPhase,
  "intertitleSignals" | "intertitleEvidence"
>;

type ClientChatRecordingAnalysisPlaybackPhase = Extract<
  ClientChatRecordingPlaybackPhase,
  | "analysisIntro"
  | "analysisOrbit"
  | "analysisDispatch"
  | "analysisSettle"
  | "analysisEvidence"
  | "wikiIntro"
  | "wikiScrollPrimary"
  | "wikiHighlightPrimary"
  | "wikiExtractPrimary"
  | "wikiScrollSecondary"
  | "wikiHighlightSecondary"
  | "wikiExtractSecondary"
  | "wikiMask"
  | "wikiLuciusEnter"
  | "wikiIngest"
  | "analysisResolve"
  | "analysisHandoff"
>;

type ClientChatRecordingOverlayPhase =
  | ClientChatRecordingBlankPlaybackPhase
  | ClientChatRecordingIntertitlePlaybackPhase
  | ClientChatRecordingAnalysisPlaybackPhase
  | "outcome";

type ClientChatRecordingBlankOverlayProps = {
  durationMs: number;
  phase: ClientChatRecordingBlankPlaybackPhase;
};

type ClientChatRecordingIntertitleOverlayProps = {
  intertitle: ClientChatRecordingIntertitle;
  phase: ClientChatRecordingIntertitlePlaybackPhase;
};

type ClientChatRecordingAnalysisOverlayProps = {
  phase: ClientChatRecordingAnalysisPlaybackPhase;
  scene: ClientChatRecordingAnalysisScene;
  wikiScene: ClientChatRecordingWikiScene;
};

type ClientChatRecordingOutcomeOverlayProps = {
  outcome: ClientChatRecordingOutcomeScene;
};

type ClientChatRecordingAnalysisPoint = {
  left: number;
  top: number;
};

type ClientChatRecordingWikiFeaturedItem = {
  kind: "primary" | "secondary";
  item: ClientChatRecordingWikiItem;
  itemIndex: number;
};

type ClientChatRecordingWikiFragmentPattern = {
  delayMs: number;
  durationMs: number;
  height: number;
  offsetX: number;
  offsetY: number;
  rotate: number;
  width: number;
};

const CLIENT_CHAT_RECORDING_ANALYSIS_FINAL_POINT_BY_SLOT: Record<
  ClientChatRecordingAnalysisMessageSlot,
  ClientChatRecordingAnalysisPoint
> = {
  "top-left": { left: 24, top: 20 },
  "top-right": { left: 76, top: 20 },
  right: { left: 86, top: 50 },
  "bottom-right": { left: 74, top: 78 },
  "bottom-left": { left: 26, top: 78 },
  left: { left: 14, top: 50 },
};

const CLIENT_CHAT_RECORDING_ANALYSIS_ORIGIN_POINT_BY_SLOT: Record<
  ClientChatRecordingAnalysisOrbitSlot,
  ClientChatRecordingAnalysisPoint
> = {
  top: { left: 50, top: 19 },
  right: { left: 85, top: 50 },
  bottom: { left: 50, top: 84 },
  left: { left: 15, top: 50 },
};

const CLIENT_CHAT_RECORDING_WIKI_REFERENCE_WIDTH = 960;
const CLIENT_CHAT_RECORDING_WIKI_REFERENCE_HEIGHT = 600;
const CLIENT_CHAT_RECORDING_WIKI_FRAME = {
  height: 456,
  left: 116,
  top: 70,
  width: 728,
};
const CLIENT_CHAT_RECORDING_WIKI_VIEWPORT = {
  height: 318,
  left: 148,
  top: 196,
  width: 664,
};
/**
 * The list cards use `min-height: 92px` plus vertical padding and borders, so
 * their visual block is substantially taller than 92px. Using the rendered
 * block height here keeps the highlighted card truly centered in the viewport.
 */
const CLIENT_CHAT_RECORDING_WIKI_CARD_HEIGHT = 126;
const CLIENT_CHAT_RECORDING_WIKI_CARD_GAP = 14;
const CLIENT_CHAT_RECORDING_WIKI_EXTRACTED_CARD_POINTS = [
  { left: 28.5, top: 55 },
  { left: 71.5, top: 55 },
] as const;
const CLIENT_CHAT_RECORDING_WIKI_FRAGMENT_PATTERNS: ReadonlyArray<ClientChatRecordingWikiFragmentPattern> =
  [
    {
      offsetX: -84,
      offsetY: -32,
      width: 10,
      height: 3,
      delayMs: 0,
      durationMs: 760,
      rotate: -12,
    },
    {
      offsetX: -52,
      offsetY: -28,
      width: 12,
      height: 2,
      delayMs: 36,
      durationMs: 820,
      rotate: -7,
    },
    {
      offsetX: -18,
      offsetY: -30,
      width: 7,
      height: 7,
      delayMs: 72,
      durationMs: 780,
      rotate: 14,
    },
    {
      offsetX: 18,
      offsetY: -26,
      width: 11,
      height: 3,
      delayMs: 102,
      durationMs: 810,
      rotate: 9,
    },
    {
      offsetX: 56,
      offsetY: -30,
      width: 8,
      height: 8,
      delayMs: 138,
      durationMs: 840,
      rotate: -18,
    },
    {
      offsetX: 84,
      offsetY: -18,
      width: 13,
      height: 2,
      delayMs: 174,
      durationMs: 790,
      rotate: 8,
    },
    {
      offsetX: -90,
      offsetY: -4,
      width: 9,
      height: 4,
      delayMs: 210,
      durationMs: 760,
      rotate: 6,
    },
    {
      offsetX: -58,
      offsetY: 2,
      width: 6,
      height: 6,
      delayMs: 246,
      durationMs: 820,
      rotate: -16,
    },
    {
      offsetX: -24,
      offsetY: -2,
      width: 14,
      height: 2,
      delayMs: 282,
      durationMs: 780,
      rotate: -5,
    },
    {
      offsetX: 10,
      offsetY: 4,
      width: 7,
      height: 7,
      delayMs: 318,
      durationMs: 830,
      rotate: 18,
    },
    {
      offsetX: 44,
      offsetY: 0,
      width: 10,
      height: 3,
      delayMs: 354,
      durationMs: 770,
      rotate: -9,
    },
    {
      offsetX: 82,
      offsetY: 6,
      width: 6,
      height: 6,
      delayMs: 390,
      durationMs: 845,
      rotate: 11,
    },
    {
      offsetX: -86,
      offsetY: 20,
      width: 12,
      height: 3,
      delayMs: 426,
      durationMs: 805,
      rotate: 7,
    },
    {
      offsetX: -54,
      offsetY: 16,
      width: 7,
      height: 7,
      delayMs: 462,
      durationMs: 760,
      rotate: -15,
    },
    {
      offsetX: -20,
      offsetY: 22,
      width: 14,
      height: 2,
      delayMs: 498,
      durationMs: 820,
      rotate: 4,
    },
    {
      offsetX: 14,
      offsetY: 18,
      width: 8,
      height: 8,
      delayMs: 534,
      durationMs: 775,
      rotate: -12,
    },
    {
      offsetX: 50,
      offsetY: 22,
      width: 11,
      height: 3,
      delayMs: 570,
      durationMs: 840,
      rotate: 13,
    },
    {
      offsetX: 86,
      offsetY: 18,
      width: 6,
      height: 6,
      delayMs: 606,
      durationMs: 790,
      rotate: -6,
    },
    {
      offsetX: -40,
      offsetY: 34,
      width: 10,
      height: 2,
      delayMs: 642,
      durationMs: 780,
      rotate: 17,
    },
    {
      offsetX: 36,
      offsetY: 34,
      width: 9,
      height: 3,
      delayMs: 678,
      durationMs: 830,
      rotate: -14,
    },
  ];

function getClientChatRecordingAnalysisConnectionPath(
  slot: ClientChatRecordingAnalysisMessageSlot,
): string {
  const point = CLIENT_CHAT_RECORDING_ANALYSIS_FINAL_POINT_BY_SLOT[slot];
  const horizontalDirection = point.left >= 50 ? 1 : -1;
  const controlOneX = point.left - horizontalDirection * 10;
  const controlTwoX = 50 + horizontalDirection * 12;
  const controlOneY = point.top;
  const controlTwoY = 50;

  return `M ${point.left} ${point.top} C ${controlOneX} ${controlOneY} ${controlTwoX} ${controlTwoY} 50 50`;
}

function getClientChatRecordingAnalysisLaunchRotation(
  launchOrder: number,
): string {
  const rotations = [-8, 7, -6, 8, -7, 6];
  return `${rotations[launchOrder % rotations.length]}deg`;
}

function getClientChatRecordingWikiSourceLabel(
  source: ClientChatRecordingWikiItem["source"],
): string {
  switch (source) {
    case "official_doc":
      return "Official doc";
    case "session_record":
      return "Session record";
    case "web_crawl":
      return "Web crawl";
    case "manual":
    default:
      return "Manual";
  }
}

function getClientChatRecordingWikiFeaturedItems(
  wikiScene: ClientChatRecordingWikiScene,
): [ClientChatRecordingWikiFeaturedItem, ClientChatRecordingWikiFeaturedItem] {
  type ResolvedClientChatRecordingWikiFeaturedItem = Omit<
    ClientChatRecordingWikiFeaturedItem,
    "kind"
  >;

  const resolvedFeaturedItems = wikiScene.featuredIds
    .map((featuredId) => {
      const itemIndex = wikiScene.items.findIndex((item) => item.id === featuredId);
      if (itemIndex < 0) {
        return null;
      }

      return {
        item: wikiScene.items[itemIndex]!,
        itemIndex,
      } satisfies ResolvedClientChatRecordingWikiFeaturedItem;
    })
    .filter(
      (
        entry,
      ): entry is ResolvedClientChatRecordingWikiFeaturedItem => entry !== null,
    );

  if (resolvedFeaturedItems.length >= 2) {
    return [
      {
        ...resolvedFeaturedItems[0]!,
        kind: "primary",
      },
      {
        ...resolvedFeaturedItems[1]!,
        kind: "secondary",
      },
    ];
  }

  return [
    {
      kind: "primary",
      item: wikiScene.items[0]!,
      itemIndex: 0,
    },
    {
      kind: "secondary",
      item: wikiScene.items[1] || wikiScene.items[0]!,
      itemIndex: wikiScene.items[1] ? 1 : 0,
    },
  ];
}

function toClientChatRecordingWikiPercentX(value: number): number {
  return (value / CLIENT_CHAT_RECORDING_WIKI_REFERENCE_WIDTH) * 100;
}

function toClientChatRecordingWikiPercentY(value: number): number {
  return (value / CLIENT_CHAT_RECORDING_WIKI_REFERENCE_HEIGHT) * 100;
}

function getClientChatRecordingIntertitleTotalDuration(
  intertitle: ClientChatRecordingIntertitle,
): number {
  return (
    intertitle.copyDelayMs +
    intertitle.copyInDurationMs +
    intertitle.holdDurationMs +
    intertitle.outDurationMs
  );
}

function isClientChatRecordingBlankPhase(
  phase: ClientChatRecordingOverlayPhase,
): phase is ClientChatRecordingBlankPlaybackPhase {
  return phase === "blankSignals" || phase === "blankEvidence";
}

function isClientChatRecordingIntertitlePhase(
  phase: ClientChatRecordingOverlayPhase,
): phase is ClientChatRecordingIntertitlePlaybackPhase {
  return phase === "intertitleSignals" || phase === "intertitleEvidence";
}

function ClientChatRecordingBlankOverlay(
  props: ClientChatRecordingBlankOverlayProps,
): ReactElement {
  const style = {
    "--recording-blank-duration": `${props.durationMs}ms`,
  } as CSSProperties;

  return (
    <div
      className="dashboard-chat-recording-blank"
      data-phase={props.phase}
      style={style}
      aria-hidden="true"
    >
      <div className="dashboard-chat-recording-blank-matte" />
    </div>
  );
}

function ClientChatRecordingIntertitleOverlay(
  props: ClientChatRecordingIntertitleOverlayProps,
): ReactElement {
  const { intertitle, phase } = props;
  const totalDurationMs = getClientChatRecordingIntertitleTotalDuration(intertitle);
  const outDelayMs =
    intertitle.copyDelayMs +
    intertitle.copyInDurationMs +
    intertitle.holdDurationMs;
  const style = {
    "--recording-intertitle-copy-delay": `${intertitle.copyDelayMs}ms`,
    "--recording-intertitle-copy-in-duration": `${intertitle.copyInDurationMs}ms`,
    "--recording-intertitle-out-delay": `${outDelayMs}ms`,
    "--recording-intertitle-out-duration": `${intertitle.outDurationMs}ms`,
    "--recording-intertitle-total-duration": `${totalDurationMs}ms`,
  } as CSSProperties;

  return (
    <div
      className="dashboard-chat-recording-intertitle"
      data-phase={phase}
      style={style}
      aria-hidden="true"
    >
      <div className="dashboard-chat-recording-intertitle-matte" />

      <div className="dashboard-chat-recording-intertitle-copy">
        <span className="dashboard-chat-recording-intertitle-kicker">
          {intertitle.kicker}
        </span>
        <h2 className="dashboard-chat-recording-intertitle-headline">
          {intertitle.headline}
        </h2>
        <p className="dashboard-chat-recording-intertitle-subline">
          {intertitle.subline}
        </p>
      </div>
    </div>
  );
}

function ClientChatRecordingOutcomeOverlay(
  props: ClientChatRecordingOutcomeOverlayProps,
): ReactElement {
  const { outcome } = props;
  const headline = `Shipped in ${outcome.shippedInHours} hours`;

  return (
    <div className="dashboard-chat-recording-outcome" aria-hidden="true">
      <div className="dashboard-chat-recording-outcome-matte" />

      <div className="dashboard-chat-recording-outcome-card">
        <span className="dashboard-chat-recording-outcome-kicker">
          Client outcome
        </span>
        <h2 className="dashboard-chat-recording-outcome-headline">
          {headline}
        </h2>
        <p className="dashboard-chat-recording-outcome-summary">
          {outcome.summary}
        </p>
      </div>
    </div>
  );
}

function ClientChatRecordingAnalysisOverlay(
  props: ClientChatRecordingAnalysisOverlayProps,
): ReactElement {
  const { phase, scene, wikiScene } = props;
  const logoAssetByPlatform = new Map(
    scene.logos.map((logo) => [logo.platform, logo.assetPath]),
  );
  const logoSlotByPlatform = new Map(
    scene.logos.map((logo) => [logo.platform, logo.slot]),
  );
  const [primaryFeaturedCard, secondaryFeaturedCard] =
    getClientChatRecordingWikiFeaturedItems(wikiScene);
  const featuredCards = [primaryFeaturedCard, secondaryFeaturedCard];
  const featuredKindById = new Map(
    featuredCards.map((featuredCard) => [featuredCard.item.id, featuredCard.kind]),
  );
  const maxWikiScrollOffset = Math.max(
    0,
    wikiScene.items.length *
      (CLIENT_CHAT_RECORDING_WIKI_CARD_HEIGHT + CLIENT_CHAT_RECORDING_WIKI_CARD_GAP) -
      CLIENT_CHAT_RECORDING_WIKI_CARD_GAP -
      CLIENT_CHAT_RECORDING_WIKI_VIEWPORT.height,
  );
  const wikiCenteredCardTop =
    (CLIENT_CHAT_RECORDING_WIKI_VIEWPORT.height -
      CLIENT_CHAT_RECORDING_WIKI_CARD_HEIGHT) /
    2;
  const primaryScrollOffsetPx = Math.min(
    maxWikiScrollOffset,
    Math.max(
      0,
      primaryFeaturedCard.itemIndex *
        (CLIENT_CHAT_RECORDING_WIKI_CARD_HEIGHT +
          CLIENT_CHAT_RECORDING_WIKI_CARD_GAP) -
        wikiCenteredCardTop,
    ),
  );
  const secondaryScrollOffsetPx = Math.min(
    maxWikiScrollOffset,
    Math.max(
      0,
      secondaryFeaturedCard.itemIndex *
        (CLIENT_CHAT_RECORDING_WIKI_CARD_HEIGHT +
          CLIENT_CHAT_RECORDING_WIKI_CARD_GAP) -
        wikiCenteredCardTop,
    ),
  );
  const activeWikiScrollOffsetPx =
    phase === "wikiScrollSecondary" ||
    phase === "wikiHighlightSecondary" ||
    phase === "wikiExtractSecondary" ||
    phase === "wikiMask" ||
    phase === "wikiLuciusEnter" ||
    phase === "wikiIngest" ||
    phase === "analysisResolve" ||
    phase === "analysisHandoff"
      ? secondaryScrollOffsetPx
      : primaryScrollOffsetPx;
  const wikiViewportCenterLeft =
    CLIENT_CHAT_RECORDING_WIKI_VIEWPORT.left +
    CLIENT_CHAT_RECORDING_WIKI_VIEWPORT.width / 2;
  const wikiTrackStyle = {
    "--wiki-scroll-offset": `${activeWikiScrollOffsetPx}px`,
  } as CSSProperties;
  const wikiExtractedCards = featuredCards.map((featuredCard, featuredIndex) => {
    const finalPoint =
      CLIENT_CHAT_RECORDING_WIKI_EXTRACTED_CARD_POINTS[featuredIndex]!;
    const originScrollOffsetPx =
      featuredCard.kind === "primary"
        ? primaryScrollOffsetPx
        : secondaryScrollOffsetPx;
    const originTop =
      CLIENT_CHAT_RECORDING_WIKI_VIEWPORT.top +
      featuredCard.itemIndex *
        (CLIENT_CHAT_RECORDING_WIKI_CARD_HEIGHT + CLIENT_CHAT_RECORDING_WIKI_CARD_GAP) -
      originScrollOffsetPx +
      CLIENT_CHAT_RECORDING_WIKI_CARD_HEIGHT / 2;

    return {
      ...featuredCard,
      finalLeft: finalPoint.left,
      finalTop: finalPoint.top,
      originLeft: toClientChatRecordingWikiPercentX(wikiViewportCenterLeft),
      originTop: toClientChatRecordingWikiPercentY(originTop),
    };
  });
  const wikiFragments = wikiExtractedCards.flatMap(
    (featuredCard, featuredIndex) =>
      CLIENT_CHAT_RECORDING_WIKI_FRAGMENT_PATTERNS.slice(0, 16).map((pattern, fragmentIndex) => ({
        delayMs: pattern.delayMs + 220 + featuredIndex * 120,
        durationMs: pattern.durationMs + 220,
        height: pattern.height,
        id: `${featuredCard.item.id}-fragment-${fragmentIndex}`,
        rotate: `${pattern.rotate}deg`,
        startLeft:
          featuredCard.finalLeft +
          toClientChatRecordingWikiPercentX(pattern.offsetX),
        startTop:
          featuredCard.finalTop +
          toClientChatRecordingWikiPercentY(pattern.offsetY),
        width: pattern.width,
      })),
  );
  return (
    <div
      className="dashboard-chat-recording-analysis"
      data-phase={phase}
      aria-hidden="true"
    >
      <div className="dashboard-chat-recording-analysis-backdrop" />

      <div className="dashboard-chat-recording-analysis-canvas">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="dashboard-chat-recording-analysis-svg"
        >
          <defs>
            <linearGradient
              id="dashboard-chat-recording-analysis-line"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(95, 168, 255, 0.04)" />
              <stop offset="48%" stopColor="rgba(95, 168, 255, 0.74)" />
              <stop offset="100%" stopColor="rgba(109, 83, 240, 0.28)" />
            </linearGradient>
          </defs>

          <circle
            cx="50"
            cy="50"
            r="27.5"
            className="dashboard-chat-recording-analysis-orbit-ring"
          />
          <circle
            cx="50"
            cy="50"
            r="35"
            className="dashboard-chat-recording-analysis-orbit-halo"
          />

          {scene.messages.map((message) => {
            const point =
              CLIENT_CHAT_RECORDING_ANALYSIS_FINAL_POINT_BY_SLOT[message.slot];
            const connectionStyle = {
              "--analysis-line-delay": `${message.launchOrder * 120 + 160}ms`,
            } as CSSProperties;

            return (
              <g key={message.id}>
                <path
                  d={getClientChatRecordingAnalysisConnectionPath(message.slot)}
                  className="dashboard-chat-recording-analysis-connection"
                  data-slot={message.slot}
                  style={connectionStyle}
                />
                <circle
                  cx={point.left}
                  cy={point.top}
                  r="0.8"
                  className="dashboard-chat-recording-analysis-connection-node"
                  data-slot={message.slot}
                  style={connectionStyle}
                />
              </g>
            );
          })}
        </svg>

        {scene.logos.map((logo, index) => (
          <div
            key={logo.platform}
            className="dashboard-chat-recording-analysis-logo"
            data-platform={logo.platform}
            data-slot={logo.slot}
            style={
              {
                "--analysis-index": index,
              } as CSSProperties
            }
          >
            <span className="dashboard-chat-recording-analysis-logo-shell">
              <img src={logo.assetPath} alt="" />
            </span>
            <span className="dashboard-chat-recording-analysis-logo-label">
              {logo.label}
            </span>
          </div>
        ))}

        {scene.messages.map((message, index) => (
          (() => {
            const originSlot =
              logoSlotByPlatform.get(message.platform) || "top";
            const originPoint =
              CLIENT_CHAT_RECORDING_ANALYSIS_ORIGIN_POINT_BY_SLOT[originSlot];
            const targetPoint =
              CLIENT_CHAT_RECORDING_ANALYSIS_FINAL_POINT_BY_SLOT[message.slot];

            return (
              <article
                key={message.id}
                className="dashboard-chat-recording-analysis-message"
                data-platform={message.platform}
                data-slot={message.slot}
                data-tone={message.tone}
                style={
                  {
                    "--analysis-index": index,
                    "--analysis-origin-top": `${originPoint.top}%`,
                    "--analysis-origin-left": `${originPoint.left}%`,
                    "--analysis-final-top": `${targetPoint.top}%`,
                    "--analysis-final-left": `${targetPoint.left}%`,
                    "--analysis-launch-delay": `${message.launchOrder * 120}ms`,
                    "--analysis-launch-rotate":
                      getClientChatRecordingAnalysisLaunchRotation(
                        message.launchOrder,
                      ),
                  } as CSSProperties
                }
              >
                <div className="dashboard-chat-recording-analysis-message-head">
                  <span className="dashboard-chat-recording-analysis-message-meta">
                    <span className="dashboard-chat-recording-analysis-message-icon">
                      <img
                        src={logoAssetByPlatform.get(message.platform) || ""}
                        alt=""
                      />
                    </span>
                    <span className="dashboard-chat-recording-analysis-message-author">
                      {message.author}
                    </span>
                  </span>

                  <span className="dashboard-chat-recording-analysis-message-channel">
                    {message.channel}
                  </span>
                </div>

                <p className="dashboard-chat-recording-analysis-message-copy">
                  {message.text}
                </p>
              </article>
            );
          })()
        ))}

        <div className="dashboard-chat-recording-analysis-centerpiece">
          <div className="dashboard-chat-recording-analysis-center-glow" />
          <div className="dashboard-chat-recording-analysis-center-mark">
            <img src={LUCIUS_BRAND_MARK_URL} alt="" />
          </div>
          <div className="dashboard-chat-recording-analysis-center-copy">
            <span className="dashboard-chat-recording-analysis-center-kicker">
              Lucius
            </span>
            <p className="dashboard-chat-recording-analysis-center-label">
              {scene.centerLabel}
            </p>
          </div>
        </div>

        <div className="dashboard-chat-recording-wiki-layer">
          <div className="dashboard-chat-recording-wiki-frame">
            <div className="dashboard-chat-recording-wiki-header">
              <div className="dashboard-chat-recording-wiki-header-copy">
                <span className="dashboard-chat-recording-wiki-kicker">
                  KNOWLEDGE BASE
                </span>
                <div className="dashboard-chat-recording-wiki-header-meta">
                  <span className="dashboard-chat-recording-wiki-title">
                    Evidence behind the recommendation
                  </span>
                  <span className="dashboard-chat-recording-wiki-total">
                    {wikiScene.items.length} sources
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="dashboard-chat-recording-wiki-action"
              >
                Upload
              </button>
            </div>

            <div className="dashboard-chat-recording-wiki-toolbar">
              <div className="dashboard-chat-recording-wiki-tabs">
                <span
                  className="dashboard-chat-recording-wiki-tab"
                  data-active="true"
                >
                  All
                </span>
                <span className="dashboard-chat-recording-wiki-tab">Docs</span>
              </div>
              <div className="dashboard-chat-recording-wiki-search">
                Search evidence
              </div>
            </div>

            <div className="dashboard-chat-recording-wiki-summary">
              <span>Captured from support, ops, and adopted guidance</span>
              <span>Updated today</span>
            </div>

            <div className="dashboard-chat-recording-wiki-list-viewport">
              <div
                className="dashboard-chat-recording-wiki-list-track"
                style={wikiTrackStyle}
              >
                {wikiScene.items.map((item, index) => (
                  <article
                    key={item.id}
                    className="dashboard-chat-recording-wiki-card"
                    data-featured={featuredKindById.get(item.id) || "none"}
                    data-source={item.source}
                    data-index={index}
                  >
                    <div className="dashboard-chat-recording-wiki-card-top">
                      <h3 className="dashboard-chat-recording-wiki-card-title">
                        {item.title}
                      </h3>
                      <span className="dashboard-chat-recording-wiki-card-date">
                        {item.updatedAt}
                      </span>
                    </div>

                    <p className="dashboard-chat-recording-wiki-card-summary">
                      {item.summary}
                    </p>

                    <span
                      className="dashboard-chat-recording-wiki-source-badge"
                      data-source={item.source}
                    >
                      {getClientChatRecordingWikiSourceLabel(item.source)}
                    </span>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="dashboard-chat-recording-wiki-mask" />

          <div className="dashboard-chat-recording-wiki-extract-layer">
            {wikiExtractedCards.map((featuredCard, featuredIndex) => (
              <article
                key={featuredCard.item.id}
                className="dashboard-chat-recording-wiki-featured-card"
                data-side={featuredIndex === 0 ? "left" : "right"}
                data-featured={featuredCard.kind}
                data-source={featuredCard.item.source}
                style={
                  {
                    "--wiki-featured-origin-left": `${featuredCard.originLeft}%`,
                    "--wiki-featured-origin-top": `${featuredCard.originTop}%`,
                    "--wiki-featured-final-left": `${featuredCard.finalLeft}%`,
                    "--wiki-featured-final-top": `${featuredCard.finalTop}%`,
                    "--wiki-featured-delay": `${featuredIndex * 80}ms`,
                  } as CSSProperties
                }
              >
                <div className="dashboard-chat-recording-wiki-featured-card-surface">
                  <div className="dashboard-chat-recording-wiki-featured-card-top">
                    <h3 className="dashboard-chat-recording-wiki-featured-card-title">
                      {featuredCard.item.title}
                    </h3>
                    <span className="dashboard-chat-recording-wiki-featured-card-date">
                      {featuredCard.item.updatedAt}
                    </span>
                  </div>

                  <p className="dashboard-chat-recording-wiki-featured-card-summary">
                    {featuredCard.item.summary}
                  </p>

                  <span
                    className="dashboard-chat-recording-wiki-source-badge"
                    data-source={featuredCard.item.source}
                  >
                    {getClientChatRecordingWikiSourceLabel(
                      featuredCard.item.source,
                    )}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="dashboard-chat-recording-wiki-fragment-layer">
            {wikiFragments.map((fragment) => (
              <span
                key={fragment.id}
                className="dashboard-chat-recording-wiki-fragment"
                style={
                  {
                    "--wiki-fragment-delay": `${fragment.delayMs}ms`,
                    "--wiki-fragment-duration": `${fragment.durationMs}ms`,
                    "--wiki-fragment-height": `${fragment.height}px`,
                    "--wiki-fragment-rotate": fragment.rotate,
                    "--wiki-fragment-start-left": `${fragment.startLeft}%`,
                    "--wiki-fragment-start-top": `${fragment.startTop}%`,
                    "--wiki-fragment-width": `${fragment.width}px`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const CLIENT_CHAT_SESSION_SKELETON_CONFIGS: ReadonlyArray<ClientChatSessionSkeletonConfig> =
  [
    { titleWidth: "192px" },
    { titleWidth: "168px" },
    { titleWidth: "214px" },
    { titleWidth: "184px" },
    { titleWidth: "206px" },
    { titleWidth: "176px" },
  ];

const CLIENT_CHAT_MESSAGE_SKELETON_ROWS: ReadonlyArray<ClientChatMessageSkeletonRowConfig> =
  [
    {
      alignment: "participant",
      headNameWidth: "68px",
      lines: [
        { variant: "soft", width: "214px" },
        { variant: "soft", width: "178px" },
      ],
      timeWidth: "44px",
    },
    {
      alignment: "assistant",
      headNameWidth: "52px",
      lines: [
        { variant: "base", width: "92%" },
        { variant: "soft", width: "100%" },
        { variant: "soft", width: "88%" },
        { variant: "soft", width: "76%" },
      ],
      timeWidth: "48px",
    },
    {
      alignment: "participant",
      hideHead: true,
      lines: [
        { variant: "soft", width: "198px" },
        { variant: "soft", width: "152px" },
      ],
    },
    {
      alignment: "self",
      lines: [
        { variant: "soft", width: "188px" },
      ],
      timeWidth: "42px",
    },
  ];

function getClientChatSkeletonVariantClass(
  variant: ClientChatSkeletonVariant,
): string {
  switch (variant) {
    case "soft":
      return "dashboard-skeleton--soft";
    case "strong":
      return "dashboard-skeleton--strong";
    case "accent":
      return "dashboard-skeleton--accent";
    case "base":
    default:
      return "dashboard-skeleton--base";
  }
}

/**
 * 左侧会话标题的 loading 形态统一收口到一个片段：
 * - 首屏整列骨架和列表落地后的标题占位都复用这里；
 * - 这样刷新过程中不会先看到一版旧盒状骨架，再切成新版行内骨架。
 */
function ClientChatSessionTitleSkeleton(props: { index: number }) {
  const { index } = props;

  return (
    <span
      aria-hidden="true"
      className="dashboard-skeleton dashboard-skeleton--soft inline-block h-4 max-w-full rounded-[4px] align-middle"
      style={{
        width: getClientChatSessionTitleSkeletonWidth(index),
      }}
    />
  );
}

function ClientChatSessionListSkeleton() {
  return (
    <div className="dashboard-chat-session-list">
      {CLIENT_CHAT_SESSION_SKELETON_CONFIGS.map((_, index) => (
        <div
          key={`client-chat-session-skeleton-${index}`}
          className="dashboard-chat-session-row pointer-events-none"
          aria-hidden="true"
        >
          <div className="min-w-0 flex-1 px-2">
            <span className="dashboard-chat-session-main">
              <span className="dashboard-chat-session-title">
                <ClientChatSessionTitleSkeleton index={index} />
              </span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ClientChatStageHeaderSkeleton() {
  return (
    <div className="dashboard-chat-stage-header">
      <div className="dashboard-chat-stage-header-inner">
        <div className="dashboard-chat-stage-title-row">
          <Skeleton
            className="dashboard-skeleton--base h-7 rounded-[6px]"
            style={{
              width: "320px",
              maxWidth:
                "min(100%, var(--dashboard-chat-stage-title-max-width))",
            }}
          />
          <Skeleton className="dashboard-skeleton--soft h-8 w-8 shrink-0 rounded-[8px]" />
        </div>
      </div>
    </div>
  );
}

function ClientChatMessageListSkeleton() {
  return (
    <div className="dashboard-chat-message-list">
      {CLIENT_CHAT_MESSAGE_SKELETON_ROWS.map((row, rowIndex) => {
        const isAssistantRow = row.alignment === "assistant";
        const isSelfRow = row.alignment === "self";

        return (
          <article
            key={`client-chat-message-skeleton-row-${rowIndex}`}
            className={cn(
              "dashboard-chat-message-group",
              isAssistantRow && "dashboard-chat-message-group--lucius",
              row.alignment === "participant" &&
                "dashboard-chat-message-group--participant",
              isSelfRow && "dashboard-chat-message-group--self",
            )}
          >
            {!row.hideHead ? (
              <div className="dashboard-chat-message-head">
                {!isSelfRow ? (
                  <Skeleton className="dashboard-skeleton--strong dashboard-chat-message-avatar rounded-full" />
                ) : null}

                <div className="dashboard-chat-message-head-copy">
                  {!isSelfRow ? (
                    <Skeleton
                      className="dashboard-skeleton--soft h-3 rounded-[4px]"
                      style={{ width: row.headNameWidth }}
                    />
                  ) : null}

                  {row.timeWidth ? (
                    <Skeleton
                      className="dashboard-skeleton--soft h-3 rounded-[4px]"
                      style={{ width: row.timeWidth }}
                    />
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="dashboard-chat-message-stack">
              {isAssistantRow
                ? row.lines.map((line, lineIndex) => (
                  <Skeleton
                    key={`client-chat-message-skeleton-row-${rowIndex}-line-${lineIndex}`}
                    className={cn(
                      getClientChatSkeletonVariantClass(line.variant),
                      "h-4 rounded-[4px]",
                    )}
                    style={{ width: line.width }}
                  />
                ))
                : row.lines.map((line, lineIndex) => (
                    <div
                      key={`client-chat-message-skeleton-row-${rowIndex}-line-${lineIndex}`}
                      className="dashboard-chat-message-item"
                    >
                      <div
                        className={cn(
                          "dashboard-skeleton-surface dashboard-chat-message-bubble",
                          isSelfRow && "dashboard-chat-message-bubble--self",
                          row.alignment === "participant" &&
                            "dashboard-chat-message-bubble--participant",
                        )}
                      >
                        <Skeleton
                          className={cn(
                            getClientChatSkeletonVariantClass(line.variant),
                            "h-4 rounded-[4px]",
                          )}
                          style={{ width: line.width }}
                        />
                      </div>

                      {lineIndex === row.lines.length - 1 ? (
                        <div
                          className={cn(
                            "dashboard-chat-message-actions",
                            isSelfRow && "dashboard-chat-message-actions--right",
                          )}
                        >
                          <Skeleton className="dashboard-skeleton--soft h-8 w-8 rounded-[8px]" />
                        </div>
                      ) : null}
                    </div>
                  ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}

function ClientChatComposerSkeleton() {
  return (
    <div className="dashboard-chat-composer-wrap">
      <div className="dashboard-chat-composer">
        <div className="space-y-3">
          <Skeleton className="dashboard-skeleton--soft h-4 w-[42%] rounded-[4px]" />
          <Skeleton className="dashboard-skeleton--soft h-4 w-[58%] rounded-[4px]" />
          <Skeleton className="dashboard-skeleton--soft h-4 w-[32%] rounded-[4px]" />
        </div>

        <div className="dashboard-chat-composer-footer">
          <Skeleton className="dashboard-skeleton--soft h-8 w-8 rounded-[8px]" />
          <Skeleton className="dashboard-skeleton--accent h-8 w-8 rounded-[8px]" />
        </div>
      </div>
    </div>
  );
}

function createSessionCustomizationStorageKey(companyId: string): string {
  return `${CHAT_SESSION_CUSTOMIZATION_STORAGE_PREFIX}:${companyId}`;
}

function sanitizeSessionCustomizationMap(
  customizationMap: ClientChatSessionCustomizationMap,
): ClientChatSessionCustomizationMap {
  return Object.fromEntries(
    Object.entries(customizationMap).flatMap(([sessionId, customization]) => {
      const normalizedTitle = (customization.title || "").trim();
      const normalizedCustomization: ClientChatSessionCustomization = {};

      if (customization.hidden) {
        normalizedCustomization.hidden = true;
      }

      if (customization.pinned) {
        normalizedCustomization.pinned = true;
      }

      if (normalizedTitle) {
        normalizedCustomization.title = normalizedTitle;
      }

      if (
        !normalizedCustomization.hidden &&
        !normalizedCustomization.pinned &&
        !normalizedCustomization.title
      ) {
        return [];
      }

      return [[sessionId, normalizedCustomization]];
    }),
  );
}

function readPersistedSessionCustomizationMap(
  companyId: string,
): ClientChatSessionCustomizationMap {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const key = createSessionCustomizationStorageKey(companyId);
    const rawValue = window.localStorage.getItem(key);
    if (!rawValue) {
      return {};
    }

    const parsedValue = JSON.parse(rawValue) as unknown;
    if (
      !parsedValue ||
      typeof parsedValue !== "object" ||
      Array.isArray(parsedValue)
    ) {
      return {};
    }

    return sanitizeSessionCustomizationMap(
      parsedValue as ClientChatSessionCustomizationMap,
    );
  } catch {
    return {};
  }
}

function persistSessionCustomizationMap(
  companyId: string,
  customizationMap: ClientChatSessionCustomizationMap,
): void {
  if (typeof window === "undefined") {
    return;
  }

  const key = createSessionCustomizationStorageKey(companyId);
  const normalizedMap = sanitizeSessionCustomizationMap(customizationMap);
  window.localStorage.setItem(key, JSON.stringify(normalizedMap));
}

function generateSessionId(): string {
  if (
    typeof window !== "undefined" &&
    typeof window.crypto?.randomUUID === "function"
  ) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function generateOptimisticMessageId(): string {
  return `optimistic-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function generateSelectedImageId(): string {
  if (
    typeof window !== "undefined" &&
    typeof window.crypto?.randomUUID === "function"
  ) {
    return window.crypto.randomUUID();
  }

  return `selected-image-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function buildSelectedImageKey(file: File): string {
  return `${file.name}:${file.size}:${file.lastModified}`;
}

function createSelectedImage(file: File): ClientChatSelectedImage {
  return {
    id: generateSelectedImageId(),
    file,
    previewUrl: window.URL.createObjectURL(file),
  };
}

function truncateTextByCharacterCount(
  value: string,
  maxCharacterCount: number,
): string {
  const normalizedValue = value.trim();
  if (!normalizedValue) {
    return normalizedValue;
  }

  // 这里按 Unicode 字符截断，避免中文或代理对字符被拆成半个字符。
  const characters = Array.from(normalizedValue);
  if (characters.length <= maxCharacterCount) {
    return normalizedValue;
  }

  if (maxCharacterCount <= 1) {
    return "…";
  }

  return `${characters.slice(0, maxCharacterCount - 1).join("")}…`;
}

function releaseSelectedImages(
  selectedImages: ClientChatSelectedImage[],
): void {
  for (const image of selectedImages) {
    window.URL.revokeObjectURL(image.previewUrl);
  }
}

function resolveSessionPreviewContent(
  message: ClientChatMessage | null,
): string {
  if (!message) {
    return m.client_chat_draft_session();
  }

  const content = (message.content || "").trim();
  if (content) {
    return content;
  }

  if ((message.attachments_base64 || []).length > 0) {
    return m.client_chat_preview_image();
  }

  return m.client_chat_preview_empty();
}

/**
 * 通知文案应绑定“最近一条用户消息”：
 * - 新回复通常是在回应用户刚刚发出的最后一轮输入；
 * - 这里从尾到头跳过 Lucius 消息，拿到最靠近当前回复的那条用户消息。
 */
function resolveLatestUserMessage(
  messages: ClientChatMessage[],
): ClientChatMessage | null {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const candidateMessage = messages[index];
    if (!isLuciusReplyMessage(candidateMessage)) {
      return candidateMessage;
    }
  }

  return null;
}

/**
 * 自动滚动只需要关心“最后一条 Lucius 回复是否变化”：
 * - 用户自己的 optimistic message 不应该触发这条分支；
 * - 直接复用 message_id 作为稳定标识，避免把整段正文塞进依赖里。
 */
function resolveLatestLuciusMessageId(messages: ClientChatMessage[]): string {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const candidateMessage = messages[index];
    if (isLuciusReplyMessage(candidateMessage)) {
      return String(candidateMessage.message_id || "").trim();
    }
  }

  return "";
}

function resolveSessionTitle(
  sessionId: string,
  previewMessage: ClientChatMessage | null,
  customizationMap: ClientChatSessionCustomizationMap,
): string {
  const customizedTitle = (customizationMap[sessionId]?.title || "").trim();
  if (customizedTitle) {
    return customizedTitle;
  }

  const previewContent = resolveSessionPreviewContent(previewMessage);
  if (previewContent === m.client_chat_preview_empty()) {
    return m.client_chat_draft_session();
  }

  return previewContent;
}

/**
 * 会话标题依赖 preview query 返回的“最近一条消息”。
 * 在 preview 还没落地前先保持 loading，避免先闪出“未命名对话”再被真实标题替换。
 */
function hasResolvedSessionTitle(
  sessionId: string,
  sessionPreviewMessageById: Record<string, ClientChatMessage | null>,
  customizationMap: ClientChatSessionCustomizationMap,
): boolean {
  const customizedTitle = (customizationMap[sessionId]?.title || "").trim();
  if (customizedTitle) {
    return true;
  }

  return Object.prototype.hasOwnProperty.call(
    sessionPreviewMessageById,
    sessionId,
  );
}

function resolveSessionTimestamp(
  sessionId: string,
  previewMessage: ClientChatMessage | null,
  sessionMetadataMap: Record<string, ClientChatSessionListItem>,
): string | null {
  return (
    previewMessage?.timestamp ||
    previewMessage?.created_at ||
    sessionMetadataMap[sessionId]?.createdAt ||
    sessionMetadataMap[sessionId]?.startedAt ||
    null
  );
}

function formatSessionDayLabel(value: string | null): string {
  if (!value) {
    return "";
  }

  const timestamp = new Date(value);
  if (Number.isNaN(timestamp.getTime())) {
    return "";
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDate = new Date(
    timestamp.getFullYear(),
    timestamp.getMonth(),
    timestamp.getDate(),
  );
  const dayDiff = Math.floor(
    (today.getTime() - targetDate.getTime()) / (24 * 60 * 60 * 1000),
  );

  if (dayDiff <= 0) {
    return m.client_chat_session_today();
  }

  if (dayDiff === 1) {
    return m.client_chat_session_yesterday();
  }

  if (dayDiff <= 7) {
    return m.client_chat_session_week_ago();
  }

  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
  }).format(timestamp);
}

function getClientChatSessionTitleSkeletonWidth(index: number): string {
  const config =
    CLIENT_CHAT_SESSION_SKELETON_CONFIGS[
      index % CLIENT_CHAT_SESSION_SKELETON_CONFIGS.length
    ];

  return config?.titleWidth || "176px";
}

function ClientChatSessionActionsMenu(
  props: ClientChatSessionActionsMenuProps,
) {
  const { isPinned, onRemove, onRename, onTogglePinned, triggerClassName } =
    props;
  const viewportProfile = useViewportProfile();
  const [isMobileActionSheetOpen, setIsMobileActionSheetOpen] =
    useState<boolean>(false);

  if (viewportProfile.isPhone) {
    return (
      <>
        <button
          type="button"
          title={m.client_chat_more_actions()}
          aria-label={m.client_chat_more_actions()}
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] text-[var(--dashboard-chat-session-muted)] transition hover:bg-[var(--dashboard-chat-session-hover-bg)] hover:text-[var(--dashboard-chat-session-text)]",
            triggerClassName,
          )}
          onClick={() => {
            setIsMobileActionSheetOpen(true);
          }}
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>

        <Dialog
          open={isMobileActionSheetOpen}
          onOpenChange={setIsMobileActionSheetOpen}
        >
          <DialogContent
            responsiveMode="sheet"
            className="gap-0 border-[var(--dashboard-chat-sidebar-border)] bg-white px-0 pb-[calc(1rem+var(--bottom-safe-area))] pt-0"
          >
            <div className="border-b border-[var(--dashboard-chat-sidebar-border)] px-4 py-4">
              <DialogTitle className="text-left text-[15px] font-semibold text-[var(--dashboard-chat-session-text)]">
                {m.client_chat_more_actions()}
              </DialogTitle>
            </div>

            <div className="px-4 py-4">
              <div className="space-y-2">
                <button
                  type="button"
                  className="flex h-[var(--button-height-default)] w-full items-center gap-3 rounded-[14px] border border-[var(--dashboard-chat-sidebar-border)] bg-white px-4 text-[14px] font-medium text-[var(--dashboard-chat-session-text)]"
                  onClick={() => {
                    setIsMobileActionSheetOpen(false);
                    onTogglePinned();
                  }}
                >
                  <Star className="h-[14px] w-[14px]" />
                  {isPinned
                    ? m.client_chat_unpin_session()
                    : m.client_chat_pin_session()}
                </button>

                <button
                  type="button"
                  className="flex h-[var(--button-height-default)] w-full items-center gap-3 rounded-[14px] border border-[var(--dashboard-chat-sidebar-border)] bg-white px-4 text-[14px] font-medium text-[var(--dashboard-chat-session-text)]"
                  onClick={() => {
                    setIsMobileActionSheetOpen(false);
                    onRename();
                  }}
                >
                  <SquarePen className="h-[14px] w-[14px]" />
                  {m.client_chat_rename_session()}
                </button>

                <button
                  type="button"
                  className="flex h-[var(--button-height-default)] w-full items-center gap-3 rounded-[14px] border border-[var(--dashboard-chat-sidebar-border)] bg-white px-4 text-[14px] font-medium text-[#944c4c]"
                  onClick={() => {
                    setIsMobileActionSheetOpen(false);
                    onRemove();
                  }}
                >
                  <Trash2 className="h-[14px] w-[14px]" />
                  {m.client_chat_remove_session()}
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          title={m.client_chat_more_actions()}
          aria-label={m.client_chat_more_actions()}
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] text-[var(--dashboard-chat-session-muted)] transition hover:bg-[var(--dashboard-chat-session-hover-bg)] hover:text-[var(--dashboard-chat-session-text)]",
            triggerClassName,
          )}
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[158px] rounded-[8px] border-[var(--dashboard-chat-sidebar-border)] bg-white p-1 shadow-[0px_2px_6px_rgba(41,40,48,0.1)]"
      >
        <DropdownMenuItem
          className="h-9 rounded-[4px] px-4 text-[14px] font-medium text-[var(--dashboard-chat-session-text)]"
          onSelect={onTogglePinned}
        >
          <Star className="h-[14px] w-[14px]" />
          {isPinned
            ? m.client_chat_unpin_session()
            : m.client_chat_pin_session()}
        </DropdownMenuItem>

        <DropdownMenuItem
          className="h-9 rounded-[4px] px-4 text-[14px] font-medium text-[var(--dashboard-chat-session-text)]"
          onSelect={onRename}
        >
          <SquarePen className="h-[14px] w-[14px]" />
          {m.client_chat_rename_session()}
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-[var(--dashboard-chat-sidebar-divider)]" />

        <DropdownMenuItem
          className="h-9 rounded-[4px] px-4 text-[14px] font-medium text-[#944c4c] focus:bg-[#fff5f5] focus:text-[#944c4c]"
          onSelect={onRemove}
        >
          <Trash2 className="h-[14px] w-[14px]" />
          {m.client_chat_remove_session()}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ClientChatSearchDialog(props: ClientChatSearchDialogProps) {
  const {
    onOpenChange,
    onSearchChange,
    onSelectSession,
    open,
    searchValue,
    sessions,
  } = props;
  const [selectedSessionId, setSelectedSessionId] = useState<string>("");

  useEffect(() => {
    if (!open) {
      setSelectedSessionId("");
      return;
    }

    const hasVisibleSelection = sessions.some(
      (session) => session.sessionId === selectedSessionId,
    );
    if (hasVisibleSelection) {
      return;
    }

    const fallbackSessionId =
      sessions.find((session) => session.isActive)?.sessionId ||
      sessions[0]?.sessionId ||
      "";

    setSelectedSessionId(fallbackSessionId);
  }, [open, selectedSessionId, sessions]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        overlayClassName="bg-[var(--dashboard-chat-search-overlay-bg)]"
        className="dashboard-chat-search-dialog !w-[min(804px,calc(100vw-2rem))] !max-w-[804px] !bg-white gap-0 border-0 p-0 shadow-none"
      >
        <div className="dashboard-chat-search-header">
          <DialogTitle className="dashboard-chat-search-title">
            {m.client_chat_search_title()}
          </DialogTitle>

          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
            }}
            title={m.common_close()}
            aria-label={m.common_close()}
            className="dashboard-chat-search-close"
          >
            <X className="h-3 w-3" />
          </button>
        </div>

        {/**
         * 保留现有受控搜索和 deferred filter，只把交互外壳换成 shadcn Command，
         * 这样能在不改数据流的前提下补上键盘导航和选中态。
         */}
        <Command
          shouldFilter={false}
          value={selectedSessionId}
          className="dashboard-chat-search-body dashboard-chat-search-command"
          onValueChange={setSelectedSessionId}
        >
          <CommandInput
            autoFocus
            aria-label={m.client_chat_search_title()}
            value={searchValue}
            onValueChange={onSearchChange}
            placeholder={m.client_chat_search_placeholder()}
            wrapperClassName="dashboard-chat-search-field"
            iconClassName="dashboard-chat-search-field-icon"
            className="dashboard-chat-search-field-input"
          />

          <div className="dashboard-chat-search-results">
            <CommandList className="dashboard-chat-search-list">
              <CommandEmpty className="dashboard-chat-search-empty">
                {m.client_chat_search_empty()}
              </CommandEmpty>

              {sessions.map((session, index) => (
                <CommandItem
                  key={session.sessionId}
                  value={session.sessionId}
                  className="dashboard-chat-search-row"
                  aria-busy={session.isTitleLoading || undefined}
                  aria-label={
                    session.isTitleLoading
                      ? m.client_chat_loading_session_title()
                      : undefined
                  }
                  onSelect={() => {
                    onSelectSession(session.sessionId);
                    onOpenChange(false);
                  }}
                >
                  <span className="dashboard-chat-search-row-title">
                    {session.isTitleLoading ? (
                      <ClientChatSessionTitleSkeleton index={index} />
                    ) : (
                      session.title
                    )}
                  </span>
                  <span className="dashboard-chat-search-row-day">
                    {session.dayLabel}
                  </span>
                </CommandItem>
              ))}
            </CommandList>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

/**
 * 会话分组统一复用同一套结构：
 * - 保持“星标对话 / 历史对话”在布局、hover、菜单触发方式上完全一致；
 * - 把 sessionId 继续向上透传，避免每个分区各写一套重复 JSX。
 */
function ClientChatSessionSection(props: ClientChatSessionSectionProps) {
  const {
    onRemoveSession,
    onRenameSession,
    onSelectSession,
    onToggleSessionPinned,
    sessions,
    title,
  } = props;

  if (sessions.length === 0) {
    return null;
  }

  return (
    <section className="dashboard-chat-sidebar-group">
      <p className="dashboard-chat-session-section-label">{title}</p>

      <div className="dashboard-chat-session-list">
        {sessions.map((session, index) => (
          <div
            key={session.sessionId}
            className="dashboard-chat-session-row group"
            data-active={session.isActive}
            data-pinned={session.isPinned}
          >
            <button
              type="button"
              className="min-w-0 flex-1 px-2 text-left"
              aria-busy={session.isTitleLoading || undefined}
              aria-label={
                session.isTitleLoading
                  ? m.client_chat_loading_session_title()
                  : undefined
              }
              onClick={() => {
                onSelectSession(session.sessionId);
              }}
            >
              <span className="dashboard-chat-session-main">
                <span className="dashboard-chat-session-title">
                  {session.isTitleLoading ? (
                    <ClientChatSessionTitleSkeleton index={index} />
                  ) : (
                    session.title
                  )}
                </span>

                {session.isPendingReply ? (
                  <span
                    className="dashboard-chat-session-pending"
                    title={m.client_chat_replying()}
                    aria-label={m.client_chat_replying()}
                  >
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  </span>
                ) : null}
              </span>
            </button>

            <ClientChatSessionActionsMenu
              isPinned={session.isPinned}
              onTogglePinned={() => {
                onToggleSessionPinned(session.sessionId);
              }}
              onRename={() => {
                onRenameSession(session.sessionId);
              }}
              onRemove={() => {
                onRemoveSession(session.sessionId);
              }}
              triggerClassName={cn(
                "mr-0.5 opacity-0 transition-opacity group-hover:opacity-100",
                session.isActive && "opacity-100",
              )}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * 输入卡只保留一套实现：
 * - 新对话空态和聊天详情页共用同一个输入区域，避免视觉和交互继续漂移；
 * - 图片区域只有在用户真实选择图片后才展示，不再额外渲染空态占位卡片。
 */
function ClientChatComposer(props: ClientChatComposerProps) {
  const {
    autoplaySendClickDurationMs,
    draftMessage,
    errorMessages,
    fileInputRef,
    isAutoplaySendClicking = false,
    isAutoplayTypingPrompt = false,
    isInteractionDisabled,
    isReadOnly = false,
    isTextareaReadOnly = false,
    isSending,
    onDraftMessageChange,
    onFileChange,
    onOpenFilePicker,
    onRemoveSelectedImage,
    onSubmit,
    onTextareaKeyDown,
    selectedImages,
    shouldDisableSubmit,
    submitButtonRef,
    textareaRef,
  } = props;
  const shouldFreezeComposerChrome =
    isAutoplayTypingPrompt || isAutoplaySendClicking;
  const shouldDisableMediaInteraction =
    isInteractionDisabled || isReadOnly || shouldFreezeComposerChrome;
  const shouldUseAutoplayCaret =
    isAutoplayTypingPrompt || isAutoplaySendClicking;
  const isTextareaActuallyReadOnly =
    (isTextareaReadOnly || isReadOnly) && !shouldUseAutoplayCaret;

  return (
    <form
      className="dashboard-chat-composer-wrap"
      data-recording-send-clicking={
        isAutoplaySendClicking ? "true" : undefined
      }
      style={
        isAutoplaySendClicking && autoplaySendClickDurationMs
          ? ({
              "--recording-send-click-duration": `${autoplaySendClickDurationMs}ms`,
            } as CSSProperties)
          : undefined
      }
      onSubmit={onSubmit}
    >
      <div className="dashboard-chat-composer">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={onFileChange}
          disabled={shouldDisableMediaInteraction}
        />

        {selectedImages.length > 0 ? (
          <div className="pb-4">
            <div className="dashboard-chat-composer-media-strip">
              {selectedImages.map((selectedImage) => (
                <div
                  key={selectedImage.id}
                  className="dashboard-chat-composer-media-card"
                >
                  <img
                    src={selectedImage.previewUrl}
                    alt={selectedImage.file.name}
                    className="dashboard-chat-composer-media-preview"
                  />

                  <button
                    type="button"
                    title={m.client_chat_remove_selected_image()}
                    className="dashboard-chat-composer-media-remove"
                    onClick={() => {
                      onRemoveSelectedImage(selectedImage.id);
                    }}
                    disabled={isSending}
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div className="dashboard-chat-composer-media-meta">
                    <p className="dashboard-chat-composer-media-name">
                      {selectedImage.file.name}
                    </p>
                    <p className="dashboard-chat-composer-media-size">
                      {(selectedImage.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="dashboard-chat-composer-divider mt-4" />
          </div>
        ) : null}

        <Textarea
          ref={textareaRef}
          placeholder={m.client_chat_input_placeholder()}
          value={draftMessage}
          onChange={(event) => {
            if (shouldUseAutoplayCaret) {
              return;
            }
            onDraftMessageChange(event.target.value);
          }}
          onKeyDown={(event) => {
            if (shouldUseAutoplayCaret) {
              event.preventDefault();
              return;
            }

            onTextareaKeyDown(event);
          }}
          readOnly={isTextareaActuallyReadOnly}
          rows={3}
          className={cn(
            "min-h-[72px] resize-none !border-0 !rounded-none !bg-transparent px-0 py-0 text-[14px] leading-[1.6] text-[var(--dashboard-chat-session-text)] !shadow-none outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:!outline-none focus-visible:!ring-0 focus-visible:ring-offset-0 placeholder:text-[var(--dashboard-chat-session-muted)]",
            isAutoplayTypingPrompt &&
              "dashboard-chat-composer-textarea--recording",
          )}
          disabled={isInteractionDisabled}
        />

        <div className="dashboard-chat-composer-footer">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            title={m.client_chat_upload_image()}
            className="h-8 w-8 rounded-[8px] text-[var(--dashboard-chat-session-text)] hover:bg-[var(--dashboard-chat-session-hover-bg)]"
            onClick={onOpenFilePicker}
            disabled={shouldDisableMediaInteraction}
          >
            <Plus className="h-5 w-5" />
          </Button>

          <Button
            ref={submitButtonRef}
            type="submit"
            size="icon"
            title={
              isSending ? m.client_chat_sending() : m.client_chat_send_message()
            }
            className={cn(
              "dashboard-chat-composer-submit h-8 w-8 rounded-[8px] text-white shadow-none transition",
              isSending
                ? "bg-[rgb(100_79_184_/_.49)] hover:bg-[rgb(100_79_184_/_.49)]"
                : "bg-[var(--dashboard-sidebar-active-bg)] hover:bg-[var(--dashboard-action-primary-hover-bg)]",
            )}
            data-recording-clicking={isAutoplaySendClicking ? "true" : undefined}
            disabled={isAutoplaySendClicking ? false : shouldDisableSubmit}
          >
            {isSending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowUp className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {isAutoplaySendClicking ? (
        <div className="dashboard-chat-recording-send-cursor" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            className="dashboard-chat-recording-send-cursor-icon"
            focusable="false"
          >
            <path
              d="M4 2.5V19.7L8.95 15.1L12.1 22L15.3 20.55L12.2 13.78H19.1L4 2.5Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ) : null}

      {errorMessages.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {errorMessages.map((errorMessage) => (
            <p
              key={errorMessage}
              className="rounded-full bg-[#fff2f2] px-3 py-1 text-[12px] leading-[1.6] text-[#a13b3b]"
            >
              {errorMessage}
            </p>
          ))}
        </div>
      ) : null}
    </form>
  );
}

function ClientChatEmptyState(props: ClientChatEmptyStateProps) {
  const { composer, onUsePrompt, prompts } = props;

  return (
    <div className="dashboard-chat-empty-state">
      <div className="dashboard-chat-empty-brand">
        <img
          src={LUCIUS_BRAND_MARK_URL}
          alt=""
          className="h-[84px] w-[84px] shrink-0 object-contain"
        />
        <h2 className="text-[24px] font-medium leading-[1.6] text-black">
          {m.client_chat_empty_brand_title()}
        </h2>
      </div>

      <div className="dashboard-chat-empty-composer-slot">{composer}</div>

      <div className="dashboard-chat-prompt-grid">
        {prompts.map((prompt) => (
          <button
            key={prompt.prompt}
            type="button"
            data-tone={prompt.tone}
            className="dashboard-chat-prompt-card text-left"
            onClick={() => {
              onUsePrompt(prompt.prompt);
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="text-[20px] leading-none">{prompt.icon}</span>
              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--dashboard-chat-session-muted)]" />
            </div>

            <p className="pr-8 text-[14px] font-medium leading-[1.6] text-[var(--dashboard-chat-session-text)]">
              {prompt.prompt}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ClientChatPage(props: ClientChatPageProps) {
  const {
    onRecordingCameraStateChange = null,
    onRecordingLayoutStateChange = null,
    recordingScenario = null,
    supportRecordingScenario = null,
    routeSessionId = null,
  } = props;
  const navigate = useNavigate();
  const viewportProfile = useViewportProfile();
  const selectedCompanyId = useSelectedCompanyId();
  const { data: userCompanies = [] } = useCurrentUserCompanies();
  const queryClient = useQueryClient();

  const activeCompanyId = useMemo(() => {
    if (selectedCompanyId) {
      return selectedCompanyId;
    }

    return userCompanies[0]?.companyId || "";
  }, [selectedCompanyId, userCompanies]);

  const normalizedRouteSessionId = String(routeSessionId || "").trim();
  const isSupportRecordingDemo = Boolean(supportRecordingScenario);
  /**
   * 现在由 URL 决定当前是否处于草稿态：
   * - `/chat` 固定表示“新会话草稿页”；
   * - `/chat/$sessionId` 固定表示“会话详情页”。
   *
   * 草稿页仍然需要一个临时 sessionId 给上传/首条消息使用，
   * 但这个 ID 只保留在前端内存，不进入地址栏，也不出现在历史列表里。
   */
  const [draftSessionId, setDraftSessionId] = useState<string>("");
  const isDraftSession = isClientChatDraftRoute(normalizedRouteSessionId);
  const sessionId = isDraftSession ? draftSessionId : normalizedRouteSessionId;
  const [sessionListPage, setSessionListPage] = useState<number>(1);
  const [draftMessage, setDraftMessage] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<
    ClientChatSelectedImage[]
  >([]);
  const [imageValidationError, setImageValidationError] = useState<
    string | null
  >(null);
  const [optimisticMessages, setOptimisticMessages] = useState<
    OptimisticClientMessage[]
  >([]);
  const [pendingReplyStateMap, setPendingReplyStateMap] =
    useState<ClientChatPendingReplyStateMap>({});
  const [sessionCustomizationMap, setSessionCustomizationMap] =
    useState<ClientChatSessionCustomizationMap>({});
  const [isMobileSessionDrawerOpen, setIsMobileSessionDrawerOpen] =
    useState<boolean>(false);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState<boolean>(false);
  const [sessionSearchQuery, setSessionSearchQuery] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const messageScrollContainerRef = useRef<HTMLDivElement | null>(null);
  const messageListContentRef = useRef<HTMLDivElement | null>(null);
  const messageListBottomAnchorRef = useRef<HTMLDivElement | null>(null);
  const selectedImagesRef = useRef<ClientChatSelectedImage[]>([]);
  const pendingAutoScrollBehaviorRef = useRef<ScrollBehavior | null>(null);
  const pendingInitialScrollSessionIdRef = useRef<string>("");
  const previousActiveCompanyIdRef = useRef<string>("");
  const previousRouteSessionIdRef = useRef<string>("");
  const previousLatestLuciusMessageIdRef = useRef<string>("");
  const recordingTimeoutIdsRef = useRef<number[]>([]);
  const recordingHasAutoplayedRef = useRef<boolean>(false);
  const deferredSessionSearchQuery = useDeferredValue(sessionSearchQuery);
  const [recordingPlaybackPhase, setRecordingPlaybackPhase] =
    useState<ClientChatRecordingPlaybackPhase>("idle");
  const [recordingAnalysisOverlayPhase, setRecordingAnalysisOverlayPhase] =
    useState<ClientChatRecordingOverlayPhase | null>(null);
  const isAnyRecordingScenarioActive = Boolean(
    recordingScenario || supportRecordingScenario,
  );
  const isRecordingInteractionLocked =
    isAnyRecordingScenarioActive &&
    recordingPlaybackPhase !== "idle" &&
    recordingPlaybackPhase !== "done";

  useEffect(() => {
    selectedImagesRef.current = selectedImages;
  }, [selectedImages]);

  useEffect(() => {
    return () => {
      clearRecordingTimers();
      onRecordingCameraStateChange?.("wide");
      onRecordingLayoutStateChange?.("docked");
      releaseSelectedImages(selectedImagesRef.current);
    };
  }, [onRecordingCameraStateChange, onRecordingLayoutStateChange]);

  useEffect(() => {
    if (isAnyRecordingScenarioActive) {
      return;
    }

    clearRecordingTimers();
    setRecordingPlaybackPhase("idle");
    setRecordingAnalysisOverlayPhase(null);
    onRecordingCameraStateChange?.("wide");
    onRecordingLayoutStateChange?.("docked");
  }, [
    isAnyRecordingScenarioActive,
    onRecordingCameraStateChange,
    onRecordingLayoutStateChange,
  ]);

  /**
   * 公司切换时只恢复公司维度的本地 UI 状态：
   * - URL 已经承载了当前详情 session，不再从 localStorage 恢复“最近一次会话”；
   * - 仍然保留每个公司的会话置顶 / 重命名 / 隐藏配置。
   */
  useEffect(() => {
    if (!activeCompanyId) {
      previousActiveCompanyIdRef.current = "";
      setDraftSessionId("");
      setSessionListPage(1);
      setPendingReplyStateMap({});
      setSessionCustomizationMap({});
      setIsSearchDialogOpen(false);
      setSessionSearchQuery("");
      return;
    }

    setSessionListPage(1);
    setIsSearchDialogOpen(false);
    setSessionSearchQuery("");
    setDraftSessionId("");
    setPendingReplyStateMap(readPersistedPendingReplyStateMap(activeCompanyId));
    setSessionCustomizationMap(
      readPersistedSessionCustomizationMap(activeCompanyId),
    );
  }, [activeCompanyId]);

  useEffect(() => {
    if (!viewportProfile.isPhone) {
      setIsMobileSessionDrawerOpen(false);
    }
  }, [viewportProfile.isPhone]);

  /**
   * pending reply 是跨路由保留的 UI 状态：
   * - 这里统一封装 set + localStorage 持久化；
   * - 这样 chat 页面离开再回来，左侧 spinner 和主区占位仍可恢复。
   */
  const replacePendingReplyStateMap = (
    nextStateMapOrUpdater:
      | ClientChatPendingReplyStateMap
      | ((
          previousStateMap: ClientChatPendingReplyStateMap,
        ) => ClientChatPendingReplyStateMap),
  ): void => {
    setPendingReplyStateMap((previousStateMap) => {
      const resolvedNextStateMap =
        typeof nextStateMapOrUpdater === "function"
          ? nextStateMapOrUpdater(previousStateMap)
          : nextStateMapOrUpdater;

      const normalizedNextStateMap =
        sanitizePendingReplyStateMap(resolvedNextStateMap);
      if (activeCompanyId) {
        persistPendingReplyStateMap(activeCompanyId, normalizedNextStateMap);
      }

      return normalizedNextStateMap;
    });
  };

  const replaceRecordingPendingReplyStateMap = (
    nextStateMapOrUpdater:
      | ClientChatPendingReplyStateMap
      | ((
          previousStateMap: ClientChatPendingReplyStateMap,
        ) => ClientChatPendingReplyStateMap),
  ): void => {
    setPendingReplyStateMap((previousStateMap) => {
      const resolvedNextStateMap =
        typeof nextStateMapOrUpdater === "function"
          ? nextStateMapOrUpdater(previousStateMap)
          : nextStateMapOrUpdater;

      return sanitizePendingReplyStateMap(resolvedNextStateMap);
    });
  };

  const clearRecordingTimers = (): void => {
    for (const timeoutId of recordingTimeoutIdsRef.current) {
      window.clearTimeout(timeoutId);
    }

    recordingTimeoutIdsRef.current = [];
  };

  const scheduleRecordingTimeout = (
    callback: () => void,
    delayMs: number,
  ): void => {
    const timeoutId = window.setTimeout(() => {
      recordingTimeoutIdsRef.current = recordingTimeoutIdsRef.current.filter(
        (candidateId) => candidateId !== timeoutId,
      );
      callback();
    }, Math.max(0, delayMs));

    recordingTimeoutIdsRef.current = [
      ...recordingTimeoutIdsRef.current,
      timeoutId,
    ];
  };

  const syncRecordingTextareaCursor = (): void => {
    window.requestAnimationFrame(() => {
      const textarea = textareaRef.current;
      if (!textarea) {
        return;
      }

      const cursorPosition = textarea.value.length;
      textarea.focus({ preventScroll: true });
      textarea.setSelectionRange(cursorPosition, cursorPosition);
    });
  };

  /**
   * `/chat` 进入时即时生成一个新的草稿 session：
   * - 这样空态页可以直接发首条消息或上传图片；
   * - 切到详情页后清空临时 ID，避免误把旧草稿带到其他会话。
   */
  useEffect(() => {
    if (!activeCompanyId) {
      setDraftSessionId("");
      return;
    }

    if (!isDraftSession) {
      setDraftSessionId("");
      return;
    }

    setDraftSessionId((previousDraftSessionId) => {
      if (previousDraftSessionId) {
        return previousDraftSessionId;
      }

      return generateSessionId();
    });
  }, [activeCompanyId, isDraftSession]);

  /**
   * 会话详情路由和公司上下文必须保持一致：
   * - 如果用户在详情页切换公司，旧 URL 的 sessionId 很可能已经不属于新公司；
   * - 此时直接回到 `/chat`，让页面进入明确的新会话态，避免展示跨公司脏数据。
   */
  useEffect(() => {
    if (!activeCompanyId) {
      return;
    }

    const previousActiveCompanyId = previousActiveCompanyIdRef.current;
    previousActiveCompanyIdRef.current = activeCompanyId;

    if (
      previousActiveCompanyId &&
      previousActiveCompanyId !== activeCompanyId &&
      !isDraftSession
    ) {
      void navigate({
        ...getClientChatLocationTarget(null),
        replace: true,
      });
    }
  }, [activeCompanyId, isDraftSession, navigate]);

  const updateSessionCustomization = (
    targetSessionId: string,
    partialCustomization: Partial<ClientChatSessionCustomization>,
  ): void => {
    if (!activeCompanyId) {
      return;
    }

    setSessionCustomizationMap((previousCustomizationMap) => {
      const nextCustomizationMap = sanitizeSessionCustomizationMap({
        ...previousCustomizationMap,
        [targetSessionId]: {
          ...(previousCustomizationMap[targetSessionId] || {}),
          ...partialCustomization,
        },
      });

      persistSessionCustomizationMap(activeCompanyId, nextCustomizationMap);
      return nextCustomizationMap;
    });
  };

  /**
   * 会话列表仍然走后端分页：
   * - 保留当前接口能力，不额外引入新 API；
   * - 侧边栏的视觉分组（置顶 / 历史）由前端本地状态叠加完成。
   */
  const sessionListQuery = useQuery({
    queryKey: [
      "client-chat",
      "session-list",
      activeCompanyId,
      sessionListPage,
      SESSION_LIST_PAGE_SIZE,
    ],
    enabled: Boolean(activeCompanyId && !isSupportRecordingDemo),
    queryFn: async () =>
      fetchClientChatSessions({
        companyId: activeCompanyId,
        page: sessionListPage,
        pageSize: SESSION_LIST_PAGE_SIZE,
      }),
  });

  const dbSessionIdList = useMemo(() => {
    return (sessionListQuery.data?.sessions || []).map(
      (item) => item.sessionId,
    );
  }, [sessionListQuery.data?.sessions]);

  const pendingReplySessionIdList = useMemo(() => {
    return Object.keys(pendingReplyStateMap);
  }, [pendingReplyStateMap]);

  const sessionMetadataMap = useMemo(() => {
    return Object.fromEntries(
      (sessionListQuery.data?.sessions || []).map((item) => [
        item.sessionId,
        item,
      ]),
    ) as Record<string, ClientChatSessionListItem>;
  }, [sessionListQuery.data?.sessions]);

  const sessionList = useMemo(() => {
    if (isSupportRecordingDemo) {
      return [];
    }

    /**
     * 左侧会话列表应尽量保持后端返回顺序稳定：
     * - 当前选中态不应把已有会话提到第一位；
     * - pending reply 也不应改写已存在项的相对顺序；
     * - 仅在会话不在当前分页结果里时，再把缺失项补到列表末尾。
     */
    return buildClientChatSessionList({
      dbSessionIdList,
      pendingReplySessionIdList,
      selectedSessionId: isDraftSession ? "" : sessionId,
    });
  }, [
    dbSessionIdList,
    isDraftSession,
    isSupportRecordingDemo,
    pendingReplySessionIdList,
    sessionId,
  ]);

  const messagesQuery = useQuery({
    queryKey: ["client-chat", "messages", activeCompanyId, sessionId],
    enabled: Boolean(
      activeCompanyId && sessionId && !isDraftSession && !isSupportRecordingDemo,
    ),
    refetchInterval: 2500,
    queryFn: async () => {
      const response = await fetchClientChatMessages({
        companyId: activeCompanyId,
        sessionId,
        limit: 100,
      });
      return response.messages;
    },
  });

  const inactivePendingReplySessionIdList = useMemo(() => {
    return pendingReplySessionIdList.filter(
      (candidateSessionId) => candidateSessionId !== sessionId,
    );
  }, [pendingReplySessionIdList, sessionId]);

  /**
   * 非当前会话的 pending reply 也需要持续轮询：
   * - 否则左侧列表 spinner 只能“亮起”，却不会在后台回复完成后自动消失；
   * - 这里按待回复 session 集合做增量轮询，数量通常很小。
   */
  const pendingRepliesQuery = useQuery({
    queryKey: [
      "client-chat",
      "pending-replies",
      activeCompanyId,
      inactivePendingReplySessionIdList,
    ],
    enabled: Boolean(
      activeCompanyId &&
        inactivePendingReplySessionIdList.length > 0 &&
        !isSupportRecordingDemo,
    ),
    refetchInterval: 2500,
    refetchIntervalInBackground: true,
    queryFn: async () => {
      const sessionEntries = await Promise.all(
        inactivePendingReplySessionIdList.map(async (candidateSessionId) => {
          try {
            const response = await fetchClientChatMessages({
              companyId: activeCompanyId,
              sessionId: candidateSessionId,
              limit: 100,
            });

            return [candidateSessionId, response.messages] as const;
          } catch {
            return [candidateSessionId, []] as const;
          }
        }),
      );

      return Object.fromEntries(sessionEntries) as Record<
        string,
        ClientChatMessage[]
      >;
    },
  });

  const sessionPreviewQuery = useQuery({
    queryKey: ["client-chat", "session-preview", activeCompanyId, sessionList],
    enabled: Boolean(
      activeCompanyId && sessionList.length > 0 && !isSupportRecordingDemo,
    ),
    refetchInterval: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const pairs = await Promise.all(
        sessionList.map(async (candidateSessionId) => {
          try {
            const response = await fetchClientChatMessages({
              companyId: activeCompanyId,
              sessionId: candidateSessionId,
              limit: 1,
            });
            return [candidateSessionId, response.messages[0] || null] as const;
          } catch {
            return [candidateSessionId, null] as const;
          }
        }),
      );

      return Object.fromEntries(pairs) as Record<
        string,
        ClientChatMessage | null
      >;
    },
  });
  const currentAuthUserQuery = useQuery({
    queryKey: ["supabase", "auth-user-chat-summary"],
    queryFn: async (): Promise<string | null> => {
      const supabase = getSupabaseBrowserClient();
      const { data } = await supabase.auth.getUser();
      return data.user?.id || null;
    },
    staleTime: 60_000,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (payload: {
      message: string;
      images?: ClientChatImagePayload[];
    }) =>
      sendClientChatMessage({
        companyId: activeCompanyId,
        sessionId,
        message: payload.message,
        sourceUrl:
          typeof window !== "undefined" ? window.location.href : undefined,
        images: payload.images,
      }),
    onSuccess: (result) => {
      const resolvedSessionId = (result.sessionId || "").trim();
      if (resolvedSessionId && resolvedSessionId !== sessionId) {
        replacePendingReplyStateMap((previousStateMap) => {
          const currentPendingReplyState = previousStateMap[sessionId];
          if (!currentPendingReplyState) {
            return previousStateMap;
          }

          const nextStateMap = { ...previousStateMap };
          delete nextStateMap[sessionId];
          nextStateMap[resolvedSessionId] = currentPendingReplyState;
          return nextStateMap;
        });
      }

      if (resolvedSessionId) {
        setDraftSessionId("");
        setSessionListPage(1);
        void navigate(
          getClientChatLocationTarget(resolvedSessionId),
        );
      }

      queryClient.invalidateQueries({
        queryKey: [
          "client-chat",
          "messages",
          activeCompanyId,
          resolvedSessionId || sessionId,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: ["client-chat", "session-list", activeCompanyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["client-chat", "session-preview", activeCompanyId],
      });
    },
  });

  const messageList: ClientChatMessage[] = messagesQuery.data || [];
  const serverMessageIdSet = useMemo(
    () => new Set(messageList.map((message) => message.message_id)),
    [messageList],
  );

  const activeOptimisticMessages = useMemo(() => {
    if (!activeCompanyId || !sessionId) {
      return [];
    }

    return optimisticMessages.filter((item) => {
      if (item.companyId !== activeCompanyId || item.sessionId !== sessionId) {
        return false;
      }

      if (!item.serverMessageId) {
        return true;
      }

      return !serverMessageIdSet.has(item.serverMessageId);
    });
  }, [activeCompanyId, optimisticMessages, serverMessageIdSet, sessionId]);

  const displayMessageList = useMemo(() => {
    return [
      ...messageList,
      ...activeOptimisticMessages.map((item) => item.message),
    ];
  }, [activeOptimisticMessages, messageList]);
  const latestLuciusMessageId = useMemo(() => {
    return resolveLatestLuciusMessageId(displayMessageList);
  }, [displayMessageList]);

  const sessionPreviewMessageById = useMemo(() => {
    const previewMap: Record<string, ClientChatMessage | null> = {
      ...(sessionPreviewQuery.data || {}),
    };

    if (sessionId && displayMessageList.length > 0) {
      previewMap[sessionId] =
        displayMessageList[displayMessageList.length - 1] || null;
    }

    return previewMap;
  }, [displayMessageList, sessionId, sessionPreviewQuery.data]);

  const visibleSessionIds = useMemo(() => {
    return sessionList.filter(
      (candidateSessionId) =>
        !sessionCustomizationMap[candidateSessionId]?.hidden,
    );
  }, [sessionCustomizationMap, sessionList]);

  const renderableSessionList = useMemo(() => {
    return visibleSessionIds.map((candidateSessionId) => {
      const isTitleResolved = hasResolvedSessionTitle(
        candidateSessionId,
        sessionPreviewMessageById,
        sessionCustomizationMap,
      );
      const previewMessage = Object.prototype.hasOwnProperty.call(
        sessionPreviewMessageById,
        candidateSessionId,
      )
        ? sessionPreviewMessageById[candidateSessionId] || null
        : null;
      const sessionTimestamp = resolveSessionTimestamp(
        candidateSessionId,
        previewMessage,
        sessionMetadataMap,
      );

      return {
        dayLabel: formatSessionDayLabel(sessionTimestamp),
        isActive: candidateSessionId === sessionId,
        isPendingReply: Boolean(pendingReplyStateMap[candidateSessionId]),
        isPinned: Boolean(sessionCustomizationMap[candidateSessionId]?.pinned),
        isTitleLoading: !isTitleResolved,
        sessionId: candidateSessionId,
        title: isTitleResolved
          ? resolveSessionTitle(
              candidateSessionId,
              previewMessage,
              sessionCustomizationMap,
            )
          : "",
      } satisfies ClientChatRenderableSession;
    });
  }, [
    pendingReplyStateMap,
    sessionCustomizationMap,
    sessionId,
    sessionMetadataMap,
    sessionPreviewMessageById,
    visibleSessionIds,
  ]);

  const pinnedSessionList = useMemo(() => {
    return renderableSessionList.filter((session) => session.isPinned);
  }, [renderableSessionList]);

  const historySessionList = useMemo(() => {
    return renderableSessionList.filter((session) => !session.isPinned);
  }, [renderableSessionList]);

  const searchableSessionList = useMemo(() => {
    const normalizedKeyword = deferredSessionSearchQuery
      .trim()
      .toLocaleLowerCase();
    if (!normalizedKeyword) {
      return renderableSessionList;
    }

    return renderableSessionList.filter((session) => {
      return (
        session.title.toLocaleLowerCase().includes(normalizedKeyword) ||
        session.dayLabel.toLocaleLowerCase().includes(normalizedKeyword)
      );
    });
  }, [deferredSessionSearchQuery, renderableSessionList]);

  const currentSessionTitle = useMemo(() => {
    if (supportRecordingScenario) {
      return supportRecordingScenario.sessionTitle;
    }

    if (!sessionId) {
      return m.client_chat_new_session();
    }

    const currentSession = renderableSessionList.find(
      (session) => session.sessionId === sessionId,
    );
    if (currentSession) {
      return currentSession.title;
    }

    return resolveSessionTitle(
      sessionId,
      sessionPreviewMessageById[sessionId] || null,
      sessionCustomizationMap,
    );
  }, [
    renderableSessionList,
    sessionCustomizationMap,
    sessionId,
    sessionPreviewMessageById,
    supportRecordingScenario,
  ]);

  const currentSessionIsPinned =
    !isDraftSession && Boolean(sessionCustomizationMap[sessionId]?.pinned);
  const currentSessionIsPendingReply = Boolean(
    sessionId && pendingReplyStateMap[sessionId],
  );
  const currentSessionTitleResolved = Boolean(
    sessionId &&
      (isDraftSession ||
        hasResolvedSessionTitle(
          sessionId,
          sessionPreviewMessageById,
          sessionCustomizationMap,
        )),
  );

  const currentSessionDisplayTitle = useMemo(() => {
    return truncateTextByCharacterCount(
      currentSessionTitle,
      MAX_STAGE_TITLE_CHARACTERS,
    );
  }, [currentSessionTitle]);

  const scheduleMessageListScrollToBottom = (
    behavior: ScrollBehavior,
  ): void => {
    pendingAutoScrollBehaviorRef.current = behavior;
  };

  const scrollMessageContainerToBottom = (
    behavior: ScrollBehavior = "smooth",
  ): void => {
    const container = messageScrollContainerRef.current;
    const bottomAnchor = messageListBottomAnchorRef.current;

    /**
     * 优先使用底部锚点触发浏览器原生滚动链路：
     * - 会自动推动最近的可滚动祖先，包含消息容器、外层 page shell，甚至 document 自身；
     * - 能覆盖“实际滚动条不在 stage body，而是在页面根上”的情况。
     */
    bottomAnchor?.scrollIntoView({
      behavior,
      block: "end",
      inline: "nearest",
    });

    if (!container) {
      return;
    }

    container.scrollTo({
      top: container.scrollHeight,
      behavior,
    });
  };

  const queueMessageContainerScrollToBottom = (
    behavior: ScrollBehavior,
  ): void => {
    window.requestAnimationFrame(() => {
      scrollMessageContainerToBottom(behavior);
    });
  };

  /**
   * 详情页滚动触发统一收口在这里：
   * - 切换到任意 `/chat/$sessionId` 时，无论来源是侧边栏点击、toast 跳转还是直达 URL，都默认先落到最底部；
   * - 当前会话轮询到新的 Lucius 回复时，也立即把视图推进到最新消息。
   */
  useEffect(() => {
    const normalizedSessionId = String(sessionId || "").trim();
    const sessionChanged =
      previousRouteSessionIdRef.current !== normalizedSessionId;

    if (sessionChanged) {
      previousRouteSessionIdRef.current = normalizedSessionId;
      previousLatestLuciusMessageIdRef.current = latestLuciusMessageId;
      pendingInitialScrollSessionIdRef.current =
        !isDraftSession && normalizedSessionId ? normalizedSessionId : "";

      if (
        !isDraftSession &&
        normalizedSessionId &&
        displayMessageList.length > 0
      ) {
        pendingInitialScrollSessionIdRef.current = "";
        scheduleMessageListScrollToBottom("auto");
      }
      return;
    }

    if (
      pendingInitialScrollSessionIdRef.current === normalizedSessionId &&
      displayMessageList.length > 0
    ) {
      pendingInitialScrollSessionIdRef.current = "";
      scheduleMessageListScrollToBottom("auto");
    }

    if (isDraftSession || !normalizedSessionId) {
      previousLatestLuciusMessageIdRef.current = latestLuciusMessageId;
      return;
    }

    const previousLatestLuciusMessageId =
      previousLatestLuciusMessageIdRef.current;
    if (
      previousLatestLuciusMessageId &&
      latestLuciusMessageId &&
      previousLatestLuciusMessageId !== latestLuciusMessageId
    ) {
      scheduleMessageListScrollToBottom("smooth");
    }

    previousLatestLuciusMessageIdRef.current = latestLuciusMessageId;
  }, [
    displayMessageList.length,
    isDraftSession,
    latestLuciusMessageId,
    sessionId,
  ]);

  useEffect(() => {
    const pendingScrollBehavior = pendingAutoScrollBehaviorRef.current;
    const messageListContent = messageListContentRef.current;
    if (!pendingScrollBehavior || !messageListContent) {
      return;
    }

    if (displayMessageList.length === 0) {
      return;
    }

    let animationFrameId: number | null = null;
    let settleTimeoutId: number | null = null;
    let hardStopTimeoutId: number | null = null;

    const queueScrollToBottom = (behavior: ScrollBehavior): void => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = window.requestAnimationFrame(() => {
        scrollMessageContainerToBottom(behavior);
        animationFrameId = null;
      });
    };

    const stopAutoScroll = (): void => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }

      if (settleTimeoutId !== null) {
        window.clearTimeout(settleTimeoutId);
        settleTimeoutId = null;
      }

      if (hardStopTimeoutId !== null) {
        window.clearTimeout(hardStopTimeoutId);
        hardStopTimeoutId = null;
      }

      pendingAutoScrollBehaviorRef.current = null;
      resizeObserver.disconnect();
    };

    /**
     * 进入详情时消息面板会经历一轮“数据已到，但排版高度仍在增长”的过程：
     * - 仅滚一次会停在旧高度的底部，随后正文继续展开，视觉上就像没有贴底；
     * - 这里监听消息列表尺寸变化，在高度稳定前持续补一次 `auto` 贴底。
     */
    const resizeObserver = new ResizeObserver(() => {
      queueScrollToBottom("auto");

      if (settleTimeoutId !== null) {
        window.clearTimeout(settleTimeoutId);
      }

      settleTimeoutId = window.setTimeout(() => {
        stopAutoScroll();
      }, 180);
    });

    resizeObserver.observe(messageListContent);
    queueScrollToBottom(pendingScrollBehavior);
    hardStopTimeoutId = window.setTimeout(() => {
      stopAutoScroll();
    }, 1500);

    return () => {
      stopAutoScroll();
    };
  }, [displayMessageList.length, latestLuciusMessageId, sessionId]);

  const updateRecordingOptimisticMessage = (
    localId: string,
    updater: (message: ClientChatMessage) => ClientChatMessage,
  ): void => {
    setOptimisticMessages((previousMessages) =>
      previousMessages.map((item) => {
        if (item.localId !== localId) {
          return item;
        }

        return {
          ...item,
          message: updater(item.message),
        };
      }),
    );
  };

  const clearRecordingPendingReply = (targetSessionId: string): void => {
    replaceRecordingPendingReplyStateMap((previousStateMap) => {
      if (!previousStateMap[targetSessionId]) {
        return previousStateMap;
      }

      const nextStateMap = { ...previousStateMap };
      delete nextStateMap[targetSessionId];
      return nextStateMap;
    });
  };

  const appendSupportRecordingMessage = (
    payload: Partial<ClientChatMessage>,
  ): string => {
    if (!activeCompanyId || !sessionId) {
      return "";
    }

    const resolvedMessageId =
      String(payload.message_id || "").trim() || generateOptimisticMessageId();
    const nextMessage: ClientChatMessage = {
      avatar_url: payload.avatar_url || null,
      company_id: activeCompanyId,
      content: payload.content || "",
      message_id: resolvedMessageId,
      message_role: payload.message_role || null,
      message_status: payload.message_status || null,
      raw: payload.raw,
      session_id: sessionId,
      timestamp: payload.timestamp || new Date().toISOString(),
      user_id: payload.user_id || null,
      username: payload.username || null,
      attachments_base64: payload.attachments_base64 || null,
    };

    setOptimisticMessages((previousMessages) => [
      ...previousMessages,
      {
        localId: resolvedMessageId,
        companyId: activeCompanyId,
        sessionId,
        message: nextMessage,
        status: "persisting",
        serverMessageId: null,
      },
    ]);

    return resolvedMessageId;
  };

  const appendSupportRecordingSelfMessage = (payload: {
    attachments?: ClientChatMessage["attachments_base64"];
    content: string;
    raw?: ClientChatMessage["raw"];
  }): string => {
    return appendSupportRecordingMessage({
      attachments_base64: payload.attachments || null,
      content: payload.content,
      message_id: generateOptimisticMessageId(),
      message_role: "staff",
      message_status: "pending",
      raw: payload.raw,
      user_id: currentAuthUserQuery.data || null,
      username: m.client_chat_me(),
    });
  };

  const beginSupportRecordingPendingReply = (): void => {
    if (!sessionId) {
      return;
    }

    replaceRecordingPendingReplyStateMap((previousStateMap) => ({
      ...previousStateMap,
      [sessionId]: {
        knownAssistantMessageIds: collectAssistantMessageIds(displayMessageList),
        startedAt:
          previousStateMap[sessionId]?.startedAt || new Date().toISOString(),
      },
    }));
  };

  const beginSupportRecordingAssistantReply = (payload: {
    content: string;
    onComplete?: () => void;
    reducedMotion: boolean;
    thinkingDurationMs: number;
  }): void => {
    if (!activeCompanyId || !sessionId) {
      return;
    }

    const { content, onComplete, reducedMotion, thinkingDurationMs } = payload;
    const replyCharacters = Array.from(content);
    const resolvedThinkingDurationMs = reducedMotion
      ? Math.min(thinkingDurationMs, 220)
      : thinkingDurationMs;

    beginSupportRecordingPendingReply();
    setRecordingPlaybackPhase("thinking");
    queueMessageContainerScrollToBottom("smooth");

    if (replyCharacters.length === 0) {
      clearRecordingPendingReply(sessionId);
      setRecordingPlaybackPhase("done");
      onComplete?.();
      return;
    }

    const optimisticAssistantMessageId = generateOptimisticMessageId();
    const baseAssistantMessage: Partial<ClientChatMessage> = {
      avatar_url: LUCIUS_BRAND_MARK_URL,
      content: "",
      message_id: optimisticAssistantMessageId,
      message_role: "lucius",
      message_status: "streaming",
      user_id: null,
      username: m.client_chat_lucius_name(),
    };

    if (reducedMotion) {
      clearRecordingPendingReply(sessionId);
      setRecordingPlaybackPhase("streamingAssistant");
      appendSupportRecordingMessage({
        ...baseAssistantMessage,
        content,
        message_status: null,
      });
      queueMessageContainerScrollToBottom("smooth");
      scheduleRecordingTimeout(() => {
        onComplete?.();
      }, 40);
      return;
    }

    let elapsed = resolvedThinkingDurationMs;
    replyCharacters.forEach((character, index) => {
      elapsed += getClientChatRecordingReplyDelay(character, reducedMotion);

      scheduleRecordingTimeout(() => {
        const nextContent = replyCharacters.slice(0, index + 1).join("");

        if (index === 0) {
          clearRecordingPendingReply(sessionId);
          setRecordingPlaybackPhase("streamingAssistant");
          appendSupportRecordingMessage({
            ...baseAssistantMessage,
            content: nextContent,
          });
        } else {
          updateRecordingOptimisticMessage(
            optimisticAssistantMessageId,
            (message) => ({
              ...message,
              content: nextContent,
              message_status: "streaming",
            }),
          );
        }

        queueMessageContainerScrollToBottom(index === 0 ? "smooth" : "auto");
      }, elapsed);
    });

    scheduleRecordingTimeout(() => {
      updateRecordingOptimisticMessage(optimisticAssistantMessageId, (message) => ({
        ...message,
        content,
        message_status: null,
      }));
      queueMessageContainerScrollToBottom("smooth");
      onComplete?.();
    }, elapsed + 120);
  };

  const beginSupportRecordingScenario = (
    scenario: ClientChatSupportRecordingScenario,
    reducedMotion: boolean,
  ): void => {
    if (!activeCompanyId || !sessionId) {
      return;
    }

    const appendSolvedAcknowledgement = (): void => {
      setRecordingPlaybackPhase("sendingUser");
      appendSupportRecordingSelfMessage({
        content: scenario.solvedAcknowledgement,
        raw: createClientChatFloatingEmojiRaw({
          delayMs: 180,
          emoji: "thumbs-up",
          size: "sm",
        }),
      });
      queueMessageContainerScrollToBottom("smooth");
    };

    const appendIssuePrompt = (): void => {
      setRecordingPlaybackPhase("sendingUser");
      appendSupportRecordingSelfMessage({
        content: scenario.issuePrompt,
        raw: createClientChatFloatingEmojiRaw({
          delayMs: 220,
          emoji: "frustrated",
          size: "sm",
        }),
      });
      queueMessageContainerScrollToBottom("smooth");
    };

    const appendIssueDetails = (): void => {
      setRecordingPlaybackPhase("sendingUser");
      appendSupportRecordingSelfMessage({
        attachments: scenario.issueDetailsMessageAttachments,
        content: scenario.issueDetailsMessage,
      });
      queueMessageContainerScrollToBottom("smooth");
    };

    const appendFinalPraise = (): void => {
      setRecordingPlaybackPhase("sendingUser");
      appendSupportRecordingSelfMessage({
        content: scenario.finalPraise,
        raw: createClientChatCelebrationBubbleRaw({
          floatingEmoji: createClientChatFloatingEmojiRaw({
            delayMs: 300,
            emoji: "party-popper",
            size: "md",
          }),
        }),
      });
      queueMessageContainerScrollToBottom("smooth");
    };

    const finishSupportRecordingScenario = (): void => {
      scheduleRecordingTimeout(() => {
        setRecordingPlaybackPhase("done");
        onRecordingCameraStateChange?.("wide");
        onRecordingLayoutStateChange?.("docked");
      }, scenario.timings.endingHoldMs);
    };

    const scheduleFinalReply = (): void => {
      scheduleRecordingTimeout(() => {
        beginSupportRecordingAssistantReply({
          content: scenario.finalResolution,
          reducedMotion,
          thinkingDurationMs: scenario.timings.luciusFinalReplyThinkingMs,
          onComplete: () => {
            scheduleRecordingTimeout(() => {
              appendFinalPraise();
              finishSupportRecordingScenario();
            }, scenario.timings.betweenFinalReplyAndPraiseMs);
          },
        });
      }, scenario.timings.betweenCorrectedAndFinalReplyMs);
    };

    const appendSupportHandoffCard = (): void => {
      setRecordingPlaybackPhase("thinking");
      beginSupportRecordingPendingReply();
      queueMessageContainerScrollToBottom("smooth");

      scheduleRecordingTimeout(() => {
        clearRecordingPendingReply(sessionId);

        const handoffMessageId = appendSupportRecordingMessage({
          avatar_url: LUCIUS_BRAND_MARK_URL,
          content: scenario.handoffMessageContent,
          message_id: generateOptimisticMessageId(),
          message_role: "lucius",
          raw: createClientChatSupportHandoffCardRaw({
            card: scenario.handoffCard,
            status: "reviewing",
          }),
          user_id: null,
          username: m.client_chat_lucius_name(),
        });
        queueMessageContainerScrollToBottom("smooth");

        scheduleRecordingTimeout(() => {
          updateRecordingOptimisticMessage(handoffMessageId, (message) => ({
            ...message,
            raw: createClientChatSupportHandoffCardRaw({
              card: scenario.handoffCard,
              status: "corrected",
            }),
          }));
          queueMessageContainerScrollToBottom("smooth");

          scheduleRecordingTimeout(() => {
            scheduleFinalReply();
          }, scenario.timings.handoffResolveMs);
        }, scenario.timings.handoffReviewMs);
      }, scenario.timings.handoffPendingMs);
    };

    const scheduleIssueCollectionFlow = (): void => {
      scheduleRecordingTimeout(() => {
        beginSupportRecordingAssistantReply({
          content: scenario.issueCollectionReply,
          reducedMotion,
          thinkingDurationMs: scenario.timings.luciusCollectionThinkingMs,
          onComplete: () => {
            scheduleRecordingTimeout(() => {
              appendIssueDetails();

              scheduleRecordingTimeout(() => {
                appendSupportHandoffCard();
              }, scenario.timings.postUserDetailsHoldMs);
            }, scenario.timings.betweenCollectionReplyAndDetailsMs);
          },
        });
      }, scenario.timings.betweenVatIssueAndCollectionMs);
    };

    const commitSupportRecordingPrompt = (): void => {
      setRecordingPlaybackPhase("sendingUser");
      setDraftMessage("");
      setSelectedImages([]);
      setImageValidationError(null);
      clearFileInputValue();
      onRecordingCameraStateChange?.("wide");
      onRecordingLayoutStateChange?.("docked");

      appendSupportRecordingSelfMessage({
        content: scenario.firstUserPrompt,
      });
      scheduleMessageListScrollToBottom("smooth");
      queueMessageContainerScrollToBottom("smooth");

      beginSupportRecordingAssistantReply({
        content: scenario.firstReply,
        reducedMotion,
        thinkingDurationMs: scenario.timings.luciusFirstReplyThinkingMs,
        onComplete: () => {
          scheduleRecordingTimeout(() => {
            appendSolvedAcknowledgement();

            scheduleRecordingTimeout(() => {
              appendIssuePrompt();
              scheduleIssueCollectionFlow();
            }, scenario.timings.betweenSolvedAndIssueMs);
          }, scenario.timings.postFirstReplyHoldMs);
        },
      });
    };

    if (reducedMotion) {
      onRecordingCameraStateChange?.("focus-chat");
      onRecordingLayoutStateChange?.("centered");
      setDraftMessage(scenario.firstUserPrompt);
      syncRecordingTextareaCursor();
      scheduleRecordingTimeout(() => {
        commitSupportRecordingPrompt();
      }, 80);
      return;
    }

    const promptCharacters = Array.from(scenario.firstUserPrompt);
    let elapsed = scenario.timings.initialDelayMs;

    scheduleRecordingTimeout(() => {
      setRecordingPlaybackPhase("typingPrompt");
      onRecordingCameraStateChange?.("focus-chat");
      onRecordingLayoutStateChange?.("centered");
      setDraftMessage("");
      syncRecordingTextareaCursor();
    }, elapsed);

    promptCharacters.forEach((character) => {
      elapsed += getClientChatRecordingPromptDelay(character, reducedMotion);
      scheduleRecordingTimeout(() => {
        setRecordingPlaybackPhase("typingPrompt");
        setDraftMessage((previousMessage) => `${previousMessage}${character}`);
        syncRecordingTextareaCursor();
      }, elapsed);
    });

    scheduleRecordingTimeout(() => {
      setRecordingPlaybackPhase("clickingSend");
      syncRecordingTextareaCursor();
    }, elapsed + 180);

    scheduleRecordingTimeout(() => {
      commitSupportRecordingPrompt();
    }, elapsed + 180 + scenario.timings.initialSendClickDurationMs);
  };

  const beginRecordingOutcomeScene = (
    scenario: ClientChatRecordingScenario,
    reducedMotion: boolean,
  ): void => {
    setRecordingPlaybackPhase("outcome");
    setRecordingAnalysisOverlayPhase("outcome");

    const outcomeDurationMs = reducedMotion
      ? Math.min(CLIENT_CHAT_RECORDING_OUTCOME_DURATION_MS, 800)
      : CLIENT_CHAT_RECORDING_OUTCOME_DURATION_MS;

    scheduleRecordingTimeout(() => {
      setRecordingAnalysisOverlayPhase(null);
      setRecordingPlaybackPhase("done");
      onRecordingLayoutStateChange?.("docked");
    }, outcomeDurationMs);
  };

  const scheduleRecordingOutcomeScene = (
    scenario: ClientChatRecordingScenario,
    reducedMotion: boolean,
  ): void => {
    const postReplyHoldDurationMs = reducedMotion
      ? Math.min(CLIENT_CHAT_RECORDING_POST_REPLY_HOLD_DURATION_MS, 1200)
      : CLIENT_CHAT_RECORDING_POST_REPLY_HOLD_DURATION_MS;

    scheduleRecordingTimeout(() => {
      beginRecordingOutcomeScene(scenario, reducedMotion);
    }, postReplyHoldDurationMs);
  };

  const beginRecordingThinkingAndAssistantReply = (
    scenario: ClientChatRecordingScenario,
    reducedMotion: boolean,
    knownAssistantMessageIds: string[],
  ): void => {
    if (!sessionId) {
      return;
    }

    replaceRecordingPendingReplyStateMap((previousStateMap) => ({
      ...previousStateMap,
      [sessionId]: {
        knownAssistantMessageIds: Array.from(
          new Set([
            ...(previousStateMap[sessionId]?.knownAssistantMessageIds || []),
            ...knownAssistantMessageIds,
          ]),
        ),
        startedAt:
          previousStateMap[sessionId]?.startedAt || new Date().toISOString(),
      },
    }));
    setRecordingPlaybackPhase("thinking");
    queueMessageContainerScrollToBottom("smooth");
    beginRecordingAssistantReply(scenario, reducedMotion);
  };

  const beginRecordingAssistantReply = (
    scenario: ClientChatRecordingScenario,
    reducedMotion: boolean,
  ): void => {
    if (!activeCompanyId || !sessionId) {
      return;
    }

    const replyCharacters = Array.from(scenario.chatScene.reply);
    const thinkingDurationMs = reducedMotion
      ? Math.min(scenario.chatScene.thinkingDurationMs, 220)
      : scenario.chatScene.thinkingDurationMs;

    if (replyCharacters.length === 0) {
      clearRecordingPendingReply(sessionId);
      setRecordingPlaybackPhase("done");
      onRecordingLayoutStateChange?.("docked");
      return;
    }

    const optimisticAssistantMessageId = generateOptimisticMessageId();
    const baseAssistantMessage: ClientChatMessage = {
      avatar_url: LUCIUS_BRAND_MARK_URL,
      company_id: activeCompanyId,
      content: "",
      message_id: optimisticAssistantMessageId,
      message_role: "lucius",
      message_status: "streaming",
      session_id: sessionId,
      timestamp: new Date().toISOString(),
      user_id: null,
      username: m.client_chat_lucius_name(),
    };

    if (reducedMotion) {
      clearRecordingPendingReply(sessionId);
      setRecordingPlaybackPhase("streamingAssistant");
      setOptimisticMessages((previousMessages) => [
        ...previousMessages,
            {
              localId: optimisticAssistantMessageId,
              companyId: activeCompanyId,
              sessionId,
              message: {
                ...baseAssistantMessage,
                content: scenario.chatScene.reply,
                message_status: null,
              },
              status: "persisting",
          serverMessageId: null,
        },
      ]);
      queueMessageContainerScrollToBottom("smooth");
      scheduleRecordingTimeout(() => {
        scheduleRecordingOutcomeScene(scenario, reducedMotion);
      }, 40);
      return;
    }

    let elapsed = thinkingDurationMs;
    replyCharacters.forEach((character, index) => {
      elapsed += getClientChatRecordingReplyDelay(character, reducedMotion);

      scheduleRecordingTimeout(() => {
        const nextContent = replyCharacters.slice(0, index + 1).join("");

        if (index === 0) {
          clearRecordingPendingReply(sessionId);
          setRecordingPlaybackPhase("streamingAssistant");
          setOptimisticMessages((previousMessages) => [
            ...previousMessages,
            {
              localId: optimisticAssistantMessageId,
              companyId: activeCompanyId,
              sessionId,
              message: {
                ...baseAssistantMessage,
                content: nextContent,
              },
              status: "persisting",
              serverMessageId: null,
            },
          ]);
        } else {
          updateRecordingOptimisticMessage(
            optimisticAssistantMessageId,
            (message) => ({
              ...message,
              content: nextContent,
              message_status: "streaming",
            }),
          );
        }

        queueMessageContainerScrollToBottom(index === 0 ? "smooth" : "auto");
      }, elapsed);
    });

    scheduleRecordingTimeout(() => {
      updateRecordingOptimisticMessage(
        optimisticAssistantMessageId,
        (message) => ({
          ...message,
          content: scenario.chatScene.reply,
          message_status: null,
        }),
      );
      queueMessageContainerScrollToBottom("smooth");
      scheduleRecordingOutcomeScene(scenario, reducedMotion);
    }, elapsed + 120);
  };

  const setRecordingOverlayPhase = (
    phase: ClientChatRecordingOverlayPhase,
  ): void => {
    setRecordingPlaybackPhase(phase);
    setRecordingAnalysisOverlayPhase(phase);
  };

  const commitRecordingPrompt = (
    scenario: ClientChatRecordingScenario,
    reducedMotion: boolean,
  ): void => {
    if (!activeCompanyId || !sessionId) {
      return;
    }

    const knownAssistantMessageIds = collectAssistantMessageIds(messageList);
    const optimisticMessageId = generateOptimisticMessageId();
    const optimisticMessage: ClientChatMessage = {
      company_id: activeCompanyId,
      content: scenario.chatScene.prompt,
      message_id: optimisticMessageId,
      message_role: "staff",
      message_status: "pending",
      session_id: sessionId,
      timestamp: new Date().toISOString(),
      user_id: currentAuthUserQuery.data || null,
      username: m.client_chat_me(),
    };

    setRecordingPlaybackPhase("sendingUser");
    setDraftMessage("");
    setSelectedImages([]);
    setImageValidationError(null);
    clearFileInputValue();
    setOptimisticMessages((previousMessages) => [
      ...previousMessages,
      {
        localId: optimisticMessageId,
        companyId: activeCompanyId,
        sessionId,
        message: optimisticMessage,
        status: "persisting",
        serverMessageId: null,
      },
    ]);
    scheduleMessageListScrollToBottom("smooth");
    queueMessageContainerScrollToBottom("smooth");

    const blankStageDurations = scenario.blankStageDurations;
    const wikiTimings = scenario.wikiScene.timings;
    const signalsIntertitle = scenario.intertitles.signals;
    const evidenceIntertitle = scenario.intertitles.evidence;
    const signalsBlankDurationMs = reducedMotion
      ? Math.min(blankStageDurations.signalsDurationMs, 240)
      : blankStageDurations.signalsDurationMs;
    const evidenceBlankDurationMs = reducedMotion
      ? Math.min(blankStageDurations.evidenceDurationMs, 240)
      : blankStageDurations.evidenceDurationMs;
    const signalsIntertitleDurationMs = reducedMotion
      ? Math.min(getClientChatRecordingIntertitleTotalDuration(signalsIntertitle), 440)
      : getClientChatRecordingIntertitleTotalDuration(signalsIntertitle);
    const evidenceIntertitleDurationMs = reducedMotion
      ? Math.min(getClientChatRecordingIntertitleTotalDuration(evidenceIntertitle), 440)
      : getClientChatRecordingIntertitleTotalDuration(evidenceIntertitle);

    setRecordingAnalysisOverlayPhase("blankSignals");
    queueMessageContainerScrollToBottom("smooth");

    if (reducedMotion) {
      let elapsed = signalsBlankDurationMs;

      scheduleRecordingTimeout(() => {
        setRecordingOverlayPhase("intertitleSignals");
      }, elapsed);

      elapsed += signalsIntertitleDurationMs;
      scheduleRecordingTimeout(() => {
        setRecordingOverlayPhase("analysisEvidence");
      }, elapsed);

      elapsed += 260;
      scheduleRecordingTimeout(() => {
        setRecordingOverlayPhase("blankEvidence");
      }, elapsed);

      elapsed += evidenceBlankDurationMs;
      scheduleRecordingTimeout(() => {
        setRecordingOverlayPhase("intertitleEvidence");
      }, elapsed);

      elapsed += evidenceIntertitleDurationMs;
      scheduleRecordingTimeout(() => {
        setRecordingOverlayPhase("wikiHighlightPrimary");
      }, elapsed);

      elapsed += 300;
      scheduleRecordingTimeout(() => {
        setRecordingOverlayPhase("wikiExtractPrimary");
      }, elapsed);

      elapsed += 300;
      scheduleRecordingTimeout(() => {
        setRecordingOverlayPhase("wikiHighlightSecondary");
      }, elapsed);

      elapsed += 300;
      scheduleRecordingTimeout(() => {
        setRecordingOverlayPhase("wikiExtractSecondary");
      }, elapsed);

      elapsed += 240;
      scheduleRecordingTimeout(() => {
        setRecordingOverlayPhase("wikiLuciusEnter");
      }, elapsed);

      elapsed += 240;
      scheduleRecordingTimeout(() => {
        setRecordingOverlayPhase("wikiIngest");
      }, elapsed);

      elapsed += 280;
      scheduleRecordingTimeout(() => {
        setRecordingOverlayPhase("analysisResolve");
      }, elapsed);

      elapsed += 280;
      scheduleRecordingTimeout(() => {
        setRecordingAnalysisOverlayPhase("analysisHandoff");
        beginRecordingThinkingAndAssistantReply(
          scenario,
          reducedMotion,
          knownAssistantMessageIds,
        );
      }, elapsed);

      scheduleRecordingTimeout(() => {
        onRecordingCameraStateChange?.("wide");
      }, elapsed + 220);

      scheduleRecordingTimeout(() => {
        setRecordingAnalysisOverlayPhase(null);
      }, elapsed + wikiTimings.handoffDurationMs);

      return;
    }

    let elapsed = signalsBlankDurationMs;

    scheduleRecordingTimeout(() => {
      setRecordingOverlayPhase("intertitleSignals");
    }, elapsed);

    elapsed += signalsIntertitleDurationMs;
    scheduleRecordingTimeout(() => {
      setRecordingOverlayPhase("analysisIntro");
      queueMessageContainerScrollToBottom("smooth");
    }, elapsed);

    elapsed += scenario.analysisScene.introDurationMs;
    scheduleRecordingTimeout(() => {
      setRecordingOverlayPhase("analysisOrbit");
    }, elapsed);

    elapsed += scenario.analysisScene.orbitDurationMs;
    scheduleRecordingTimeout(() => {
      setRecordingOverlayPhase("analysisDispatch");
    }, elapsed);

    elapsed += scenario.analysisScene.dispatchDurationMs;
    scheduleRecordingTimeout(() => {
      setRecordingOverlayPhase("analysisSettle");
    }, elapsed);

    elapsed += scenario.analysisScene.settleDurationMs;
    scheduleRecordingTimeout(() => {
      setRecordingOverlayPhase("analysisEvidence");
    }, elapsed);

    elapsed += scenario.analysisScene.evidenceDurationMs;
    elapsed += 360;
    scheduleRecordingTimeout(() => {
      setRecordingOverlayPhase("blankEvidence");
    }, elapsed);

    elapsed += evidenceBlankDurationMs;
    scheduleRecordingTimeout(() => {
      setRecordingOverlayPhase("intertitleEvidence");
    }, elapsed);

    elapsed += evidenceIntertitleDurationMs;
    scheduleRecordingTimeout(() => {
      setRecordingOverlayPhase("wikiIntro");
    }, elapsed);

    elapsed += wikiTimings.introDurationMs;
    scheduleRecordingTimeout(() => {
      setRecordingOverlayPhase("wikiScrollPrimary");
    }, elapsed);

    elapsed += wikiTimings.scrollPrimaryDurationMs;
    scheduleRecordingTimeout(() => {
      setRecordingOverlayPhase("wikiHighlightPrimary");
    }, elapsed);

    elapsed += wikiTimings.highlightPrimaryDurationMs;
    scheduleRecordingTimeout(() => {
      setRecordingOverlayPhase("wikiExtractPrimary");
    }, elapsed);

    elapsed += wikiTimings.extractPrimaryDurationMs;
    scheduleRecordingTimeout(() => {
      setRecordingOverlayPhase("wikiScrollSecondary");
    }, elapsed);

    elapsed += wikiTimings.scrollSecondaryDurationMs;
    scheduleRecordingTimeout(() => {
      setRecordingOverlayPhase("wikiHighlightSecondary");
    }, elapsed);

    elapsed += wikiTimings.highlightSecondaryDurationMs;
    scheduleRecordingTimeout(() => {
      setRecordingOverlayPhase("wikiExtractSecondary");
    }, elapsed);

    elapsed += wikiTimings.extractSecondaryDurationMs;
    scheduleRecordingTimeout(() => {
      setRecordingOverlayPhase("wikiMask");
    }, elapsed);

    elapsed += wikiTimings.maskDurationMs;
    scheduleRecordingTimeout(() => {
      setRecordingOverlayPhase("wikiLuciusEnter");
    }, elapsed);

    elapsed += wikiTimings.luciusEnterDurationMs;
    scheduleRecordingTimeout(() => {
      setRecordingOverlayPhase("wikiIngest");
    }, elapsed);

    elapsed += wikiTimings.ingestDurationMs;
    scheduleRecordingTimeout(() => {
      setRecordingOverlayPhase("analysisResolve");
    }, elapsed);

    elapsed += scenario.analysisScene.resolveDurationMs;
    const analysisHandoffStartMs = elapsed;

    scheduleRecordingTimeout(() => {
      setRecordingAnalysisOverlayPhase("analysisHandoff");
      beginRecordingThinkingAndAssistantReply(
        scenario,
        reducedMotion,
        knownAssistantMessageIds,
      );
    }, analysisHandoffStartMs);

    scheduleRecordingTimeout(() => {
      onRecordingCameraStateChange?.("wide");
    }, analysisHandoffStartMs + 220);

    scheduleRecordingTimeout(() => {
      setRecordingAnalysisOverlayPhase(null);
    }, analysisHandoffStartMs + wikiTimings.handoffDurationMs);
  };

  useEffect(() => {
    if (!activeCompanyId || !sessionId || messageList.length === 0) {
      return;
    }

    setOptimisticMessages((previousMessages) =>
      previousMessages.filter((item) => {
        if (
          item.companyId !== activeCompanyId ||
          item.sessionId !== sessionId
        ) {
          return true;
        }

        if (!item.serverMessageId) {
          return true;
        }

        return !serverMessageIdSet.has(item.serverMessageId);
      }),
    );
  }, [activeCompanyId, messageList, serverMessageIdSet, sessionId]);

  const showReplyCompletedToast = (
    targetSessionId: string,
    messages: ClientChatMessage[],
  ): void => {
    const previewMessage =
      resolveLatestUserMessage(messages) ||
      sessionPreviewMessageById[targetSessionId] ||
      null;
    const sessionTitle = truncateTextByCharacterCount(
      resolveSessionTitle(
        targetSessionId,
        previewMessage,
        sessionCustomizationMap,
      ),
      48,
    );

    /**
     * 回复完成通知改为 Figma 里的单行条状提示：
     * - 可见文案保持固定，避免长会话标题把通知横向撑坏；
     * - 会话标题通过 `ariaLabel` / `title` 保留，既能给辅助技术提供上下文，
     *   也能在鼠标悬停时继续看到目标会话。
     */
    const replyReadyAriaLabel = m.client_chat_reply_ready_description({
      title: sessionTitle,
    });

    toast.custom(
      (toastId) => (
        <ClientChatReplyReadyToast
          actionLabel={m.client_chat_view_reply()}
          ariaLabel={replyReadyAriaLabel}
          message={m.client_chat_reply_ready_title()}
          onView={() => {
            toast.dismiss(toastId);
            void navigate(getClientChatLocationTarget(targetSessionId));
          }}
        />
      ),
      {
        className: "dashboard-chat-reply-toast-shell",
        duration: COMPLETED_REPLY_TOAST_DURATION,
        unstyled: true,
      },
    );
  };

  /**
   * 回复完成通知只在“用户当前不在这个会话详情页”时弹出：
   * - 当前就在该 chat 详情里，用户已经能直接看到新回复，没有必要再叠一层 toast；
   * - `/chat` 草稿页或其他 session 详情页，都仍然需要通知把用户引导过去。
   */
  const shouldShowReplyCompletedToast = (targetSessionId: string): boolean => {
    if (isSupportRecordingDemo) {
      return false;
    }

    if (isDraftSession) {
      return true;
    }

    return normalizedRouteSessionId !== String(targetSessionId || "").trim();
  };

  /**
   * 当前打开的会话继续沿用原有 messagesQuery 轮询：
   * - 一旦发现有新的 Lucius 消息，就立即清掉 pending 状态；
   * - 若用户当前不在该详情页，再补一个 toast 完成反馈。
   */
  useEffect(() => {
    if (isSupportRecordingDemo || !activeCompanyId || !sessionId || !messagesQuery.data) {
      return;
    }

    const pendingReplyState = pendingReplyStateMap[sessionId];
    if (!pendingReplyState) {
      return;
    }

    if (!hasPendingReplyCompleted(pendingReplyState, messagesQuery.data)) {
      return;
    }

    replacePendingReplyStateMap((previousStateMap) => {
      if (!previousStateMap[sessionId]) {
        return previousStateMap;
      }

      const nextStateMap = { ...previousStateMap };
      delete nextStateMap[sessionId];
      return nextStateMap;
    });

    if (shouldShowReplyCompletedToast(sessionId)) {
      showReplyCompletedToast(sessionId, messagesQuery.data);
    }
  }, [
    activeCompanyId,
    isDraftSession,
    isSupportRecordingDemo,
    messagesQuery.data,
    navigate,
    normalizedRouteSessionId,
    pendingReplyStateMap,
    sessionCustomizationMap,
    sessionId,
    sessionPreviewMessageById,
  ]);

  useEffect(() => {
    if (isSupportRecordingDemo || !activeCompanyId || !pendingRepliesQuery.data) {
      return;
    }

    const completedPendingReplies = Object.entries(
      pendingRepliesQuery.data,
    ).flatMap(([candidateSessionId, messages]) => {
      const pendingReplyState = pendingReplyStateMap[candidateSessionId];
      if (!pendingReplyState) {
        return [];
      }

      if (!hasPendingReplyCompleted(pendingReplyState, messages)) {
        return [];
      }

      return [[candidateSessionId, messages] as const];
    });

    if (completedPendingReplies.length === 0) {
      return;
    }

    replacePendingReplyStateMap((previousStateMap) => {
      const nextStateMap = { ...previousStateMap };
      for (const [candidateSessionId] of completedPendingReplies) {
        delete nextStateMap[candidateSessionId];
      }

      return nextStateMap;
    });

    for (const [candidateSessionId, messages] of completedPendingReplies) {
      if (!shouldShowReplyCompletedToast(candidateSessionId)) {
        continue;
      }

      showReplyCompletedToast(candidateSessionId, messages);
    }
  }, [
    activeCompanyId,
    isDraftSession,
    isSupportRecordingDemo,
    navigate,
    normalizedRouteSessionId,
    pendingReplyStateMap,
    pendingRepliesQuery.data,
    sessionCustomizationMap,
    sessionPreviewMessageById,
  ]);

  /**
   * 若用户此前把当前会话隐藏掉，页面需要自动切回其他可见会话；
   * 否则会出现“主区域还停留在已删除会话，侧边栏却看不到它”的视觉断裂。
   */
  useEffect(() => {
    if (
      !activeCompanyId ||
      !sessionId ||
      !sessionCustomizationMap[sessionId]?.hidden
    ) {
      return;
    }

    const fallbackVisibleSessionId = sessionList.find(
      (candidateSessionId) =>
        candidateSessionId !== sessionId &&
        !sessionCustomizationMap[candidateSessionId]?.hidden,
    );

    if (fallbackVisibleSessionId) {
      void navigate({
        ...getClientChatLocationTarget(fallbackVisibleSessionId),
        replace: true,
      });
      return;
    }

    void navigate({
      ...getClientChatLocationTarget(null),
      replace: true,
    });
  }, [activeCompanyId, navigate, sessionCustomizationMap, sessionId, sessionList]);

  const clearFileInputValue = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetSelectedImages = (): void => {
    setSelectedImages((previousSelectedImages) => {
      releaseSelectedImages(previousSelectedImages);
      return [];
    });
    setImageValidationError(null);
    clearFileInputValue();
  };

  /**
   * 草稿输入框属于“当前正在查看的会话”：
   * - 切换到其他 session 或返回新会话页时，应清空当前输入，避免把未发送内容串到错误的对话里；
   * - 图片选择与校验态也一起重置，保持交互一致。
   */
  const clearComposerState = (): void => {
    setDraftMessage("");
    resetSelectedImages();
  };

  const handleRemoveSelectedImage = (imageId: string): void => {
    setSelectedImages((previousSelectedImages) => {
      const removedImage = previousSelectedImages.find(
        (selectedImage) => selectedImage.id === imageId,
      );
      if (removedImage) {
        releaseSelectedImages([removedImage]);
      }

      const nextSelectedImages = previousSelectedImages.filter(
        (selectedImage) => selectedImage.id !== imageId,
      );
      if (nextSelectedImages.length === 0) {
        clearFileInputValue();
      }
      return nextSelectedImages;
    });

    setImageValidationError(null);
  };

  const handleImageFileChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    const incomingFiles = Array.from(event.target.files || []);
    if (incomingFiles.length === 0) {
      return;
    }

    const existingImageKeys: Set<string> = new Set(
      selectedImages.map((selectedImage) =>
        buildSelectedImageKey(selectedImage.file),
      ),
    );
    const acceptedFiles: File[] = [];
    let nextValidationError: string | null = null;

    for (const file of incomingFiles) {
      if (!file.type.toLowerCase().startsWith("image/")) {
        nextValidationError = m.client_chat_image_only();
        continue;
      }

      if (file.size > MAX_UPLOAD_IMAGE_BYTES) {
        nextValidationError = m.client_chat_image_size_limit({ size: "5MB" });
        continue;
      }

      const imageKey = buildSelectedImageKey(file);
      if (existingImageKeys.has(imageKey)) {
        continue;
      }

      existingImageKeys.add(imageKey);
      acceptedFiles.push(file);
    }

    if (acceptedFiles.length === 0) {
      setImageValidationError(nextValidationError);
      clearFileInputValue();
      return;
    }

    const remainingSlots = Math.max(
      MAX_UPLOAD_IMAGE_COUNT - selectedImages.length,
      0,
    );
    const filesToAppend = acceptedFiles.slice(0, remainingSlots);

    if (filesToAppend.length < acceptedFiles.length) {
      nextValidationError = m.client_chat_image_count_limit({
        count: String(MAX_UPLOAD_IMAGE_COUNT),
      });
    }

    setSelectedImages((previousSelectedImages) => [
      ...previousSelectedImages,
      ...filesToAppend.map((file) => createSelectedImage(file)),
    ]);
    setImageValidationError(nextValidationError);
    clearFileInputValue();
  };

  /**
   * 发送逻辑继续沿用现有 optimistic update：
   * - 先插入一条本地消息，保证 UI 立即反馈；
   * - 上传图片和真正发消息都成功后，再等待轮询结果回填真实消息。
   */
  const sendDraftMessage = async (): Promise<void> => {
    const normalizedMessage = draftMessage.trim();
    if (
      (!normalizedMessage && selectedImages.length === 0) ||
      !activeCompanyId ||
      !sessionId
    ) {
      return;
    }

    const pendingSelectedImages = selectedImages;
    const optimisticMessageId = generateOptimisticMessageId();
    const knownAssistantMessageIds = collectAssistantMessageIds(messageList);
    const optimisticMessage: ClientChatMessage = {
      company_id: activeCompanyId,
      session_id: sessionId,
      message_id: optimisticMessageId,
      message_role: "staff",
      username: m.client_chat_me(),
      user_id: currentAuthUserQuery.data || null,
      content: normalizedMessage || m.client_chat_preview_image(),
      message_status: "pending",
      timestamp: new Date().toISOString(),
    };

    scheduleMessageListScrollToBottom("smooth");
    setOptimisticMessages((previousMessages) => [
      ...previousMessages,
      {
        localId: optimisticMessageId,
        companyId: activeCompanyId,
        sessionId,
        message: optimisticMessage,
        status: "uploading",
        serverMessageId: null,
      },
    ]);
    replacePendingReplyStateMap((previousStateMap) => ({
      ...previousStateMap,
      [sessionId]: {
        knownAssistantMessageIds: Array.from(
          new Set([
            ...(previousStateMap[sessionId]?.knownAssistantMessageIds || []),
            ...knownAssistantMessageIds,
          ]),
        ),
        startedAt:
          previousStateMap[sessionId]?.startedAt || new Date().toISOString(),
      },
    }));
    setDraftMessage("");
    setSelectedImages([]);
    setImageValidationError(null);
    clearFileInputValue();

    let uploadedImages: ClientChatImagePayload[] = [];
    try {
      if (pendingSelectedImages.length > 0) {
        const uploadResults = await Promise.all(
          pendingSelectedImages.map(async (selectedImage) => {
            const uploaded = await uploadClientChatImage({
              companyId: activeCompanyId,
              sessionId,
              file: selectedImage.file,
            });

            return {
              fileName: uploaded.image.filename,
              mimeType: uploaded.image.contentType,
              size: uploaded.image.size,
              storagePath: uploaded.image.storagePath,
              url: uploaded.image.url,
            } satisfies ClientChatImagePayload;
          }),
        );

        uploadedImages = uploadResults;
      }

      const result = await sendMessageMutation.mutateAsync({
        message: normalizedMessage,
        images: uploadedImages,
      });

      releaseSelectedImages(pendingSelectedImages);

      if (!result.messageId) {
        setOptimisticMessages((previousMessages) =>
          previousMessages.filter(
            (item) => item.localId !== optimisticMessageId,
          ),
        );
        return;
      }

      setOptimisticMessages((previousMessages) =>
        previousMessages.map((item) => {
          if (item.localId !== optimisticMessageId) {
            return item;
          }

          return {
            ...item,
            status: "persisting",
            serverMessageId: result.messageId,
          };
        }),
      );
    } catch (error) {
      replacePendingReplyStateMap((previousStateMap) => {
        if (!previousStateMap[sessionId]) {
          return previousStateMap;
        }

        const nextStateMap = { ...previousStateMap };
        delete nextStateMap[sessionId];
        return nextStateMap;
      });
      setOptimisticMessages((previousMessages) =>
        previousMessages.filter(
          (item) => item.localId !== optimisticMessageId,
        ),
      );
      setDraftMessage(normalizedMessage);
      if (pendingSelectedImages.length > 0) {
        setSelectedImages(pendingSelectedImages);
        setImageValidationError(null);
      }
      throw error;
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    if (isSupportRecordingDemo || isRecordingInteractionLocked) {
      return;
    }

    await sendDraftMessage();
  };

  const handleTextareaKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ): void => {
    if (event.key !== "Enter") {
      return;
    }

    if (isSupportRecordingDemo || isRecordingInteractionLocked) {
      return;
    }

    if (event.shiftKey || event.nativeEvent.isComposing) {
      return;
    }

    event.preventDefault();

    if (sendMessageMutation.isPending || !sessionId) {
      return;
    }

    void sendDraftMessage();
  };

  const handleCreateNewSession = (): void => {
    if (isSupportRecordingDemo || isRecordingInteractionLocked) {
      return;
    }

    if (!activeCompanyId || sendMessageMutation.isPending) {
      return;
    }

    setDraftSessionId(generateSessionId());
    setSessionListPage(1);
    clearComposerState();
    setSessionSearchQuery("");
    setIsSearchDialogOpen(false);
    setIsMobileSessionDrawerOpen(false);
    scheduleMessageListScrollToBottom("auto");
    void navigate(getClientChatLocationTarget(null));

    queryClient.invalidateQueries({
      queryKey: ["client-chat", "messages", activeCompanyId],
    });
  };

  const handleSelectSession = (nextSessionId: string): void => {
    if (isSupportRecordingDemo || isRecordingInteractionLocked) {
      return;
    }

    if (!activeCompanyId) {
      return;
    }

    const normalizedSessionId = nextSessionId.trim();
    if (!normalizedSessionId) {
      return;
    }

    clearComposerState();
    setIsMobileSessionDrawerOpen(false);
    scheduleMessageListScrollToBottom("auto");
    void navigate(getClientChatLocationTarget(normalizedSessionId));
  };

  const handleToggleSessionPinned = (targetSessionId: string): void => {
    updateSessionCustomization(targetSessionId, {
      pinned: !sessionCustomizationMap[targetSessionId]?.pinned,
    });
  };

  const handleRenameSession = (targetSessionId: string): void => {
    const currentTitle = resolveSessionTitle(
      targetSessionId,
      sessionPreviewMessageById[targetSessionId] || null,
      sessionCustomizationMap,
    );
    const nextTitle = window.prompt(
      m.client_chat_rename_session_prompt(),
      currentTitle,
    );
    if (nextTitle === null) {
      return;
    }

    updateSessionCustomization(targetSessionId, {
      title: nextTitle,
    });
  };

  const handleRemoveSession = (targetSessionId: string): void => {
    updateSessionCustomization(targetSessionId, {
      hidden: true,
      pinned: false,
    });
    replacePendingReplyStateMap((previousStateMap) => {
      if (!previousStateMap[targetSessionId]) {
        return previousStateMap;
      }

      const nextStateMap = { ...previousStateMap };
      delete nextStateMap[targetSessionId];
      return nextStateMap;
    });
  };

  const handleUseSuggestedPrompt = (prompt: string): void => {
    if (isSupportRecordingDemo || isRecordingInteractionLocked) {
      return;
    }

    setDraftMessage(prompt);

    window.requestAnimationFrame(() => {
      textareaRef.current?.focus();
      const promptLength = prompt.length;
      textareaRef.current?.setSelectionRange(promptLength, promptLength);
    });
  };

  const handleSearchDialogOpenChange = (open: boolean): void => {
    if (isSupportRecordingDemo || isRecordingInteractionLocked) {
      return;
    }

    setIsSearchDialogOpen(open);
    if (!open) {
      setSessionSearchQuery("");
    }
  };

  const sessionListPagination = sessionListQuery.data?.pagination || null;
  const shouldShowStageSkeleton =
    (sessionListQuery.isLoading && !sessionId) || messagesQuery.isLoading;
  const shouldShowDetailStageSkeleton =
    (!!sessionId && shouldShowStageSkeleton) ||
    (!!sessionId && !currentSessionTitleResolved);
  const recordingOverlayPhase = recordingAnalysisOverlayPhase;
  const shouldShowRecordingOverlay =
    Boolean(recordingScenario) && Boolean(recordingOverlayPhase);
  const shouldUseRecordingAnalysisCleanStage =
    Boolean(recordingScenario) &&
    (recordingPlaybackPhase === "sendingUser" ||
      recordingOverlayPhase === "blankSignals" ||
      recordingOverlayPhase === "blankEvidence" ||
      recordingOverlayPhase === "intertitleSignals" ||
      recordingOverlayPhase === "intertitleEvidence" ||
      recordingOverlayPhase === "outcome" ||
      recordingOverlayPhase === "analysisOrbit" ||
      recordingOverlayPhase === "analysisDispatch" ||
      recordingOverlayPhase === "analysisSettle" ||
      recordingOverlayPhase === "analysisEvidence" ||
      recordingOverlayPhase === "wikiIntro" ||
      recordingOverlayPhase === "wikiScrollPrimary" ||
      recordingOverlayPhase === "wikiHighlightPrimary" ||
      recordingOverlayPhase === "wikiExtractPrimary" ||
      recordingOverlayPhase === "wikiScrollSecondary" ||
      recordingOverlayPhase === "wikiHighlightSecondary" ||
      recordingOverlayPhase === "wikiExtractSecondary" ||
      recordingOverlayPhase === "wikiMask" ||
      recordingOverlayPhase === "wikiLuciusEnter" ||
      recordingOverlayPhase === "wikiIngest" ||
      recordingOverlayPhase === "analysisResolve");
  const isRecordingPromptTyping =
    isAnyRecordingScenarioActive && recordingPlaybackPhase === "typingPrompt";
  const isRecordingPromptClickingSend =
    isAnyRecordingScenarioActive && recordingPlaybackPhase === "clickingSend";
  const recordingSendClickDurationMs = recordingScenario
    ? Math.max(
        1240,
        Math.round(recordingScenario.blankStageDurations.signalsDurationMs * 3.1),
      )
    : supportRecordingScenario
      ? Math.max(960, supportRecordingScenario.timings.initialSendClickDurationMs)
      : 1240;
  const isRecordingComposerLocked =
    isAnyRecordingScenarioActive &&
    recordingPlaybackPhase !== "idle" &&
    recordingPlaybackPhase !== "typingPrompt" &&
    recordingPlaybackPhase !== "clickingSend" &&
    recordingPlaybackPhase !== "done";
  const isComposerInteractionDisabled =
    sendMessageMutation.isPending || !sessionId || isRecordingComposerLocked;
  const shouldDisableComposerSubmit =
    isComposerInteractionDisabled ||
    isSupportRecordingDemo ||
    isRecordingPromptTyping ||
    (!draftMessage.trim() && selectedImages.length === 0);
  const chatErrorMessages = [
    imageValidationError,
    messagesQuery.error instanceof Error ? messagesQuery.error.message : null,
    sendMessageMutation.error instanceof Error
      ? sendMessageMutation.error.message
      : null,
  ].flatMap((errorMessage) => {
    if (!errorMessage) {
      return [];
    }

    return [errorMessage];
  });

  useEffect(() => {
    if (
      !recordingScenario ||
      !activeCompanyId ||
      !sessionId ||
      !isDraftSession ||
      shouldShowStageSkeleton ||
      shouldShowDetailStageSkeleton ||
      displayMessageList.length > 0 ||
      recordingHasAutoplayedRef.current
    ) {
      return;
    }

    recordingHasAutoplayedRef.current = true;
    clearRecordingTimers();
    setRecordingPlaybackPhase("idle");
    setRecordingAnalysisOverlayPhase(null);
    onRecordingCameraStateChange?.("wide");
    onRecordingLayoutStateChange?.("docked");

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      onRecordingCameraStateChange?.("focus-chat");
      onRecordingLayoutStateChange?.("centered");
      setDraftMessage(recordingScenario.chatScene.prompt);
      syncRecordingTextareaCursor();
      scheduleRecordingTimeout(() => {
        commitRecordingPrompt(recordingScenario, true);
      }, 80);
      return;
    }

    const promptCharacters = Array.from(recordingScenario.chatScene.prompt);
    let elapsed = 320;

    scheduleRecordingTimeout(() => {
      setRecordingPlaybackPhase("typingPrompt");
      onRecordingCameraStateChange?.("focus-chat");
      onRecordingLayoutStateChange?.("centered");
      setDraftMessage("");
      syncRecordingTextareaCursor();
    }, elapsed);

    promptCharacters.forEach((character) => {
      elapsed += getClientChatRecordingPromptDelay(character, reducedMotion);
      scheduleRecordingTimeout(() => {
        setRecordingPlaybackPhase("typingPrompt");
        setDraftMessage((previousMessage) => `${previousMessage}${character}`);
        syncRecordingTextareaCursor();
      }, elapsed);
    });

    const sendClickDurationMs = Math.max(
      1240,
      Math.round(recordingScenario.blankStageDurations.signalsDurationMs * 3.1),
    );

    scheduleRecordingTimeout(() => {
      setRecordingPlaybackPhase("clickingSend");
      syncRecordingTextareaCursor();
    }, elapsed + 180);

    scheduleRecordingTimeout(() => {
      commitRecordingPrompt(recordingScenario, false);
    }, elapsed + 180 + sendClickDurationMs);
  }, [
    activeCompanyId,
    commitRecordingPrompt,
    displayMessageList.length,
    isDraftSession,
    onRecordingCameraStateChange,
    onRecordingLayoutStateChange,
    recordingScenario,
    sessionId,
    shouldShowDetailStageSkeleton,
    shouldShowStageSkeleton,
  ]);

  useEffect(() => {
    if (
      !supportRecordingScenario ||
      !activeCompanyId ||
      !sessionId ||
      !isDraftSession ||
      shouldShowStageSkeleton ||
      shouldShowDetailStageSkeleton ||
      displayMessageList.length > 0 ||
      recordingHasAutoplayedRef.current
    ) {
      return;
    }

    recordingHasAutoplayedRef.current = true;
    clearRecordingTimers();
    setRecordingPlaybackPhase("idle");
    setRecordingAnalysisOverlayPhase(null);
    onRecordingCameraStateChange?.("wide");
    onRecordingLayoutStateChange?.("docked");

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    beginSupportRecordingScenario(supportRecordingScenario, reducedMotion);
  }, [
    activeCompanyId,
    beginSupportRecordingScenario,
    displayMessageList.length,
    isDraftSession,
    onRecordingCameraStateChange,
    onRecordingLayoutStateChange,
    sessionId,
    shouldShowDetailStageSkeleton,
    shouldShowStageSkeleton,
    supportRecordingScenario,
  ]);

  const handlePrevSessionPage = (): void => {
    if (!sessionListPagination?.hasPrev) {
      return;
    }

    setSessionListPage((previousPage) => Math.max(1, previousPage - 1));
  };

  const handleNextSessionPage = (): void => {
    if (!sessionListPagination?.hasNext) {
      return;
    }

    setSessionListPage((previousPage) => previousPage + 1);
  };

  const promptCardList: ClientChatPromptCard[] = useMemo(
    () => [
      {
        icon: "💡",
        prompt: m.client_chat_prompt_capabilities(),
        tone: "lavender",
      },
      {
        icon: "📝",
        prompt: m.client_chat_prompt_invite_agent(),
        tone: "default",
      },
      {
        icon: "👩‍💻",
        prompt: m.client_chat_prompt_role_difference(),
        tone: "default",
      },
      {
        icon: "📖",
        prompt: m.client_chat_prompt_update_knowledge(),
        tone: "sage",
      },
    ],
    [],
  );

  const sessionSidebarContent = (
    <>
      <div className="dashboard-chat-sidebar-header">
        <DashboardSidebarToggleTitle className="gap-2.5">
          <h1 className="dashboard-chat-sidebar-title">
            {m.client_chat_title()}
          </h1>
        </DashboardSidebarToggleTitle>
      </div>

      <div className="dashboard-chat-sidebar-scroll">
        <div className="dashboard-chat-sidebar-body">
          <section className="dashboard-chat-sidebar-group">
            <button
              type="button"
              className="dashboard-chat-action-row"
              data-active={isDraftSession}
              onClick={handleCreateNewSession}
              disabled={sendMessageMutation.isPending}
            >
              <span className="dashboard-chat-action-icon dashboard-chat-action-icon--accent">
                <Plus className="h-4 w-4" />
              </span>
              <span className="dashboard-chat-action-row-copy">
                <span>{m.client_chat_new_session()}</span>
                {isDraftSession ? (
                  <span className="dashboard-chat-action-badge">
                    {m.client_chat_draft_badge()}
                  </span>
                ) : null}
              </span>
            </button>

            <button
              type="button"
              className="dashboard-chat-action-row"
              onClick={() => {
                handleSearchDialogOpenChange(true);
              }}
            >
              <span className="dashboard-chat-action-icon">
                <Search className="h-4 w-4 text-[var(--dashboard-chat-session-muted)]" />
              </span>
              <span>{m.client_chat_search()}</span>
            </button>
          </section>

          {sessionListQuery.isLoading ? (
            <section className="dashboard-chat-sidebar-group">
              <ClientChatSessionListSkeleton />
            </section>
          ) : null}

          {sessionListQuery.isError ? (
            <section className="dashboard-chat-sidebar-group">
              <p className="rounded-[8px] border border-dashed border-[#f0c8c8] bg-[#fff5f5] px-4 py-3 text-[13px] text-[#a13b3b]">
                {m.client_chat_load_sessions_failed()}
              </p>
            </section>
          ) : null}

          {!sessionListQuery.isLoading &&
          !sessionListQuery.isError &&
          renderableSessionList.length === 0 &&
          !isDraftSession ? (
            <section className="dashboard-chat-sidebar-group">
              <p className="rounded-[8px] border border-dashed border-[var(--dashboard-chat-sidebar-border)] px-4 py-3 text-[13px] text-[var(--dashboard-chat-session-muted)]">
                {m.client_chat_empty_sessions()}
              </p>
            </section>
          ) : null}

          {!sessionListQuery.isLoading &&
          !sessionListQuery.isError &&
          renderableSessionList.length > 0 ? (
            <>
              <ClientChatSessionSection
                title={m.client_chat_starred_sessions()}
                sessions={pinnedSessionList}
                onSelectSession={handleSelectSession}
                onToggleSessionPinned={handleToggleSessionPinned}
                onRenameSession={handleRenameSession}
                onRemoveSession={handleRemoveSession}
              />
              <ClientChatSessionSection
                title={m.client_chat_history_sessions()}
                sessions={historySessionList}
                onSelectSession={handleSelectSession}
                onToggleSessionPinned={handleToggleSessionPinned}
                onRenameSession={handleRenameSession}
                onRemoveSession={handleRemoveSession}
              />
            </>
          ) : null}
        </div>
      </div>

      <div className="dashboard-chat-pagination">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="dashboard-chat-pagination-button"
          disabled={
            !sessionListPagination?.hasPrev || sessionListQuery.isFetching
          }
          onClick={handlePrevSessionPage}
        >
          {m.client_chat_prev_page()}
        </Button>

        <span className="text-[12px] leading-[1.6] text-[var(--dashboard-chat-session-muted)]">
          {sessionListPagination
            ? m.client_chat_page_status({
                page: String(sessionListPagination.page),
                total: String(sessionListPagination.total),
                totalPages: String(
                  Math.max(sessionListPagination.totalPages, 1),
                ),
              })
            : "-/-"}
        </span>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="dashboard-chat-pagination-button"
          disabled={
            !sessionListPagination?.hasNext || sessionListQuery.isFetching
          }
          onClick={handleNextSessionPage}
        >
          {m.client_chat_next_page()}
        </Button>
      </div>
    </>
  );

  return (
    <DashboardPageLayout>
      <DashboardPageLayoutCard className="flex flex-col">
        {!activeCompanyId ? (
          <div className="flex h-full items-center justify-center p-4">
            <CompanySelectionPrompt
              message={m.client_chat_select_company()}
              layout="centered"
              className="w-full max-w-[360px]"
            />
          </div>
        ) : (
          <div
            className="dashboard-chat-shell"
            data-recording-clean-screen={
              shouldUseRecordingAnalysisCleanStage ? "true" : undefined
            }
          >
            {!isSupportRecordingDemo && viewportProfile.isPhone ? (
              <Dialog
                open={isMobileSessionDrawerOpen}
                onOpenChange={setIsMobileSessionDrawerOpen}
              >
                <DialogContent
                  responsiveMode="fullscreen"
                  className="gap-0 bg-[var(--dashboard-chat-sidebar-bg)] p-0"
                >
                  <div className="flex h-full min-h-0 flex-col">
                    {sessionSidebarContent}
                  </div>
                </DialogContent>
              </Dialog>
            ) : !isSupportRecordingDemo ? (
              <aside className="dashboard-chat-sidebar dashboard-chat-sidebar--inline shrink-0">
                {sessionSidebarContent}
              </aside>
            ) : null}

            <section className="dashboard-chat-stage">
              {viewportProfile.isPhone ? (
                <div className="flex items-center justify-between gap-2 border-b border-[var(--dashboard-chat-sidebar-divider)] bg-[var(--dashboard-chat-canvas-bg)] px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-[16px] font-semibold text-[var(--dashboard-title-text)]">
                      {isSupportRecordingDemo
                        ? currentSessionDisplayTitle
                        : displayMessageList.length > 0
                        ? currentSessionDisplayTitle
                        : m.client_chat_title()}
                    </p>
                  </div>

                  {!isSupportRecordingDemo ? (
                    <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="rounded-[10px] text-[var(--dashboard-chat-session-text)]"
                      title={m.header_action_menu()}
                      aria-label={m.header_action_menu()}
                      onClick={() => {
                        setIsMobileSessionDrawerOpen(true);
                      }}
                    >
                      <Menu className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="rounded-[10px] text-[var(--dashboard-chat-session-text)]"
                      title={m.client_chat_search()}
                      aria-label={m.client_chat_search()}
                      onClick={() => {
                        handleSearchDialogOpenChange(true);
                      }}
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="rounded-[10px] text-[var(--dashboard-chat-session-text)]"
                      title={m.client_chat_new_session()}
                      aria-label={m.client_chat_new_session()}
                      onClick={handleCreateNewSession}
                      disabled={sendMessageMutation.isPending}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {shouldShowDetailStageSkeleton ? (
                <ClientChatStageHeaderSkeleton />
              ) : displayMessageList.length > 0 ? (
                <div className="dashboard-chat-stage-header">
                  <div className="dashboard-chat-stage-header-inner">
                    <div className="dashboard-chat-stage-title-row">
                      <div className="dashboard-chat-stage-title-shell">
                        <p
                          className="dashboard-chat-stage-title"
                          title={currentSessionTitle}
                        >
                          {currentSessionDisplayTitle}
                        </p>
                      </div>

                      {currentSessionIsPendingReply ? (
                        <span
                          className="dashboard-chat-stage-status-pill"
                          role="status"
                          aria-live="polite"
                        >
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          <span>{m.client_chat_replying()}</span>
                        </span>
                      ) : null}

                      {!isDraftSession ? (
                        <ClientChatSessionActionsMenu
                          isPinned={currentSessionIsPinned}
                          onTogglePinned={() => {
                            handleToggleSessionPinned(sessionId);
                          }}
                          onRename={() => {
                            handleRenameSession(sessionId);
                          }}
                          onRemove={() => {
                            handleRemoveSession(sessionId);
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}

              <div
                ref={messageScrollContainerRef}
                className="dashboard-chat-stage-body"
              >
                {shouldShowStageSkeleton ? (
                  <ClientChatMessageListSkeleton />
                ) : displayMessageList.length === 0 ? (
                  <ClientChatEmptyState
                    composer={
                      <ClientChatComposer
                        draftMessage={draftMessage}
                        autoplaySendClickDurationMs={
                          recordingSendClickDurationMs
                        }
                        errorMessages={chatErrorMessages}
                        fileInputRef={fileInputRef}
                        isAutoplaySendClicking={isRecordingPromptClickingSend}
                        isAutoplayTypingPrompt={isRecordingPromptTyping}
                        isInteractionDisabled={isComposerInteractionDisabled}
                        isReadOnly={isSupportRecordingDemo}
                        isTextareaReadOnly={isRecordingPromptTyping}
                        isSending={sendMessageMutation.isPending}
                        onDraftMessageChange={(value) => {
                          setDraftMessage(value);
                        }}
                        onFileChange={handleImageFileChange}
                        onOpenFilePicker={() => {
                          fileInputRef.current?.click();
                        }}
                        onRemoveSelectedImage={handleRemoveSelectedImage}
                        onSubmit={(event) => void handleSubmit(event)}
                        onTextareaKeyDown={handleTextareaKeyDown}
                        selectedImages={selectedImages}
                        shouldDisableSubmit={shouldDisableComposerSubmit}
                        submitButtonRef={submitButtonRef}
                        textareaRef={textareaRef}
                      />
                    }
                    prompts={promptCardList}
                    onUsePrompt={handleUseSuggestedPrompt}
                  />
                ) : (
                  <div
                    ref={messageListContentRef}
                    className="dashboard-chat-message-list"
                  >
                    <ClientChatMessageList
                      messages={displayMessageList}
                      currentAuthUserId={currentAuthUserQuery.data}
                      currentSessionIsPendingReply={currentSessionIsPendingReply}
                    />

                    <div
                      ref={messageListBottomAnchorRef}
                      aria-hidden="true"
                      className="h-px w-full"
                    />
                  </div>
                )}

              </div>

              {shouldShowDetailStageSkeleton ? (
                <div className="dashboard-chat-stage-footer">
                  <ClientChatComposerSkeleton />
                </div>
              ) : displayMessageList.length > 0 ? (
                <div className="dashboard-chat-stage-footer">
                  <ClientChatComposer
                    draftMessage={draftMessage}
                    autoplaySendClickDurationMs={
                      recordingSendClickDurationMs
                    }
                    errorMessages={chatErrorMessages}
                    fileInputRef={fileInputRef}
                    isAutoplaySendClicking={isRecordingPromptClickingSend}
                    isAutoplayTypingPrompt={isRecordingPromptTyping}
                    isInteractionDisabled={isComposerInteractionDisabled}
                    isReadOnly={isSupportRecordingDemo}
                    isTextareaReadOnly={isRecordingPromptTyping}
                    isSending={sendMessageMutation.isPending}
                    onDraftMessageChange={(value) => {
                      setDraftMessage(value);
                    }}
                    onFileChange={handleImageFileChange}
                    onOpenFilePicker={() => {
                      fileInputRef.current?.click();
                    }}
                    onRemoveSelectedImage={handleRemoveSelectedImage}
                    onSubmit={(event) => void handleSubmit(event)}
                    onTextareaKeyDown={handleTextareaKeyDown}
                    selectedImages={selectedImages}
                    shouldDisableSubmit={shouldDisableComposerSubmit}
                    submitButtonRef={submitButtonRef}
                    textareaRef={textareaRef}
                  />
                </div>
              ) : null}
            </section>

            {recordingScenario &&
            recordingOverlayPhase &&
            shouldShowRecordingOverlay ? (
              isClientChatRecordingBlankPhase(recordingOverlayPhase) ? (
                <ClientChatRecordingBlankOverlay
                  phase={recordingOverlayPhase}
                  durationMs={
                    recordingOverlayPhase === "blankSignals"
                      ? recordingScenario.blankStageDurations.signalsDurationMs
                      : recordingScenario.blankStageDurations.evidenceDurationMs
                  }
                />
              ) : isClientChatRecordingIntertitlePhase(recordingOverlayPhase) ? (
                <ClientChatRecordingIntertitleOverlay
                  phase={recordingOverlayPhase}
                  intertitle={
                    recordingOverlayPhase === "intertitleSignals"
                      ? recordingScenario.intertitles.signals
                      : recordingScenario.intertitles.evidence
                  }
                />
              ) : recordingOverlayPhase === "outcome" ? (
                <ClientChatRecordingOutcomeOverlay
                  outcome={recordingScenario.outcomeScene}
                />
              ) : (
                <ClientChatRecordingAnalysisOverlay
                  phase={recordingOverlayPhase}
                  scene={recordingScenario.analysisScene}
                  wikiScene={recordingScenario.wikiScene}
                />
              )
            ) : null}

            {!isSupportRecordingDemo ? (
              <ClientChatSearchDialog
                open={isSearchDialogOpen}
                onOpenChange={handleSearchDialogOpenChange}
                onSearchChange={setSessionSearchQuery}
                onSelectSession={handleSelectSession}
                searchValue={sessionSearchQuery}
                sessions={searchableSessionList}
              />
            ) : null}
          </div>
        )}
      </DashboardPageLayoutCard>
    </DashboardPageLayout>
  );
}
