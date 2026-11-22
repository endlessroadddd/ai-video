import type { CSSProperties } from "react";

import { Composer, type ComposerProps } from "../surfaces/composer-shell";
import { typeSlice, ChatBubble } from "../surfaces/chat-bubble";
import { PhoneFrame } from "../surfaces/phone-frame";
import { ProofChip } from "../surfaces/proof-chip";
import { ResolveOverlay } from "../surfaces/resolve-overlay";
import { clamp01, easeInOutCubic, easeOutCubic, mix, ramp } from "./easing";

export type StaffResolveTransitionPhase =
  | "conversation"
  | "squeeze"
  | "proof"
  | "resolve"
  | "summary";

export type StaffResolveTranscriptEntry = {
  compact?: boolean;
  emojiCodepoint?: string;
  id: string;
  reveal?: number;
  speaker: "lucius" | "user";
  subdued?: boolean;
  text: string;
  textProgress?: number;
};

export type StaffResolveTransitionProps = {
  className?: string;
  leftAltTitle?: string;
  leftTitle?: string;
  phase?: StaffResolveTransitionPhase;
  prefersReducedMotion?: boolean;
  progress?: number;
  proofCount?: number | string;
  proofLabel?: string;
  rightTitle?: string;
  summary?: string;
  timeMs?: number;
  transcript?: readonly StaffResolveTranscriptEntry[];
};

const PHASE_PROGRESS: Record<StaffResolveTransitionPhase, number> = {
  conversation: 0.18,
  squeeze: 0.5,
  proof: 0.68,
  resolve: 0.84,
  summary: 1,
};

const DEFAULT_TRANSCRIPT: readonly StaffResolveTranscriptEntry[] = [
  {
    id: "context-lucius",
    speaker: "lucius",
    subdued: true,
    text: "Lucius drafted the reply, but support still wanted one visible control step before send.",
  },
  {
    id: "context-user-ok",
    speaker: "user",
    subdued: true,
    text: "That explains why handoff requests kept showing up.",
  },
  {
    id: "question",
    speaker: "user",
    text: "Wait, was the agent already acting like staff?",
  },
  {
    id: "answer",
    speaker: "lucius",
    text: "Almost. The last gap was visible review before the message shipped.",
  },
  {
    id: "praise",
    speaker: "user",
    text: "That explains the pattern.",
  },
  {
    id: "reveal",
    speaker: "lucius",
    text: "The same assistant, finally acting like staff.",
  },
  {
    compact: true,
    emojiCodepoint: "1f62e",
    id: "wow",
    speaker: "user",
    text: "Oh",
  },
];

function mapProgress(phase: StaffResolveTransitionPhase | undefined, progress: number | undefined) {
  if (typeof progress === "number") {
    return clamp01(progress);
  }

  return PHASE_PROGRESS[phase ?? "conversation"];
}

export function StaffResolveTransition({
  className,
  leftAltTitle = "Lucius",
  leftTitle = "Support",
  phase,
  prefersReducedMotion = false,
  progress,
  proofCount = 0,
  proofLabel = "handoff requests",
  rightTitle = "Ava",
  summary = "The same assistant, finally acting like staff.",
  timeMs = 0,
  transcript = DEFAULT_TRANSCRIPT,
}: StaffResolveTransitionProps) {
  const stageProgress = mapProgress(phase, progress);
  const ambientDrift = Math.sin(timeMs / 1560) * 1.35;
  const deviceFloat = Math.cos(timeMs / 1750) * 1.1;

  const squeeze = easeInOutCubic(ramp(stageProgress, 0.38, 0.62));
  const proofChip = easeOutCubic(ramp(stageProgress, 0.5, 0.7));
  const revealBrand = easeOutCubic(ramp(stageProgress, 0.46, 0.66));
  const logoResolve = easeOutCubic(ramp(stageProgress, 0.7, 0.9));
  const summaryReveal = easeOutCubic(ramp(stageProgress, 0.82, 1));
  const phoneFade = 1 - easeOutCubic(ramp(stageProgress, 0.72, 0.92));
  const threadFade = 1 - easeOutCubic(ramp(stageProgress, 0.76, 0.94));

  const leftAnchor = mix(25.5, 50, squeeze);
  const rightAnchor = mix(74.5, 108, squeeze);
  const leftDepthScale = mix(1, 1.01, squeeze) * mix(1, 1.48, logoResolve);
  const rightDepthScale = mix(1, 0.986, squeeze);

  const leftPhoneStyle: CSSProperties = {
    left: `${leftAnchor}%`,
    opacity: clamp01(mix(1, phoneFade, logoResolve)),
    transform: [
      "translate(-50%, -50%)",
      `translate3d(0, ${mix(2.8 + deviceFloat * 0.2, 0, squeeze)}px, 0)`,
      `scale(${leftDepthScale})`,
    ].join(" "),
    zIndex: 3,
  };

  const rightPhoneStyle: CSSProperties = {
    left: `${rightAnchor}%`,
    opacity: clamp01((1 - ramp(stageProgress, 0.56, 0.7)) * (1 - logoResolve)),
    transform: [
      "translate(-50%, -50%)",
      `translate3d(0, ${mix(-2.8 - ambientDrift * 0.15, -8, squeeze)}px, 0)`,
      `scale(${rightDepthScale})`,
    ].join(" "),
    zIndex: 2,
  };

  const proofStyle: CSSProperties = {
    opacity: proofChip * (1 - easeOutCubic(ramp(stageProgress, 0.8, 0.96))),
    transform: `translate3d(-50%, ${mix(20, 0, proofChip)}px, 0) scale(${mix(0.9, 1, proofChip)})`,
  };

  const resolveOverlayStyle: CSSProperties = {
    opacity: logoResolve,
    transform: `translate3d(0, ${mix(24, 0, logoResolve)}px, 0) scale(${mix(0.82, 1, logoResolve)})`,
  };

  const summaryStyle: CSSProperties = {
    opacity: summaryReveal,
    transform: `translate3d(0, ${mix(28, 0, summaryReveal)}px, 0)`,
  };

  const userComposerMode: ComposerProps["mode"] =
    stageProgress < 0.32 ? "typing" : stageProgress < 0.5 ? "thinking" : "idle";
  const userComposerText = userComposerMode === "typing"
    ? typeSlice("Wait, that was you?", easeOutCubic(ramp(stageProgress, 0.08, 0.32)))
    : "";

  const renderThread = (viewer: "lucius" | "user") => (
    <div className="phone__thread-list">
      {transcript.map((item) => {
        const ownMessage = item.speaker === viewer;
        const align: "left" | "right" = ownMessage ? "right" : "left";
        const tone: "lucius" | "user" | "neutral" = ownMessage
          ? viewer === "lucius"
            ? "lucius"
            : "user"
          : "neutral";

        return (
          <ChatBubble
            key={`${viewer}-${item.id}`}
            align={align}
            tone={tone}
            text={item.text}
            reveal={(item.reveal ?? 1) * threadFade}
            textProgress={item.textProgress ?? 1}
            subdued={item.subdued}
            compact={item.compact}
            emojiCodepoint={item.emojiCodepoint}
            reducedMotion={prefersReducedMotion}
          />
        );
      })}
    </div>
  );

  return (
    <section className={joinClassNames("motion-stage", className)}>
      <div className="motion-stage__grain" aria-hidden="true" />
      <div
        className="motion-stage__orb motion-stage__orb--left"
        style={{ transform: `translate3d(${ambientDrift * 0.75}px, ${deviceFloat * 0.5}px, 0)` }}
        aria-hidden="true"
      />
      <div
        className="motion-stage__orb motion-stage__orb--right"
        style={{ transform: `translate3d(${ambientDrift * -0.45}px, ${deviceFloat * -0.38}px, 0)` }}
        aria-hidden="true"
      />
      <div className="motion-stage__divider" aria-hidden="true" />

      <div className="motion-stage__phones">
        <PhoneFrame
          side="lucius"
          title={leftTitle}
          altTitle={leftAltTitle}
          altTitleProgress={revealBrand}
          style={leftPhoneStyle}
          composer={
            <Composer
              mode={stageProgress < 0.58 ? "thinking" : "idle"}
              placeholder="Reply in thread"
              accent
              thinkingEmojiCodepoint="1f914"
              reducedMotion={prefersReducedMotion}
            />
          }
        >
          {renderThread("lucius")}
        </PhoneFrame>

        <PhoneFrame
          side="user"
          title={rightTitle}
          style={rightPhoneStyle}
          composer={
            <Composer
              mode={userComposerMode}
              text={userComposerText}
              placeholder="Message support"
              disabled={userComposerMode === "thinking"}
              showTools
              thinkingEmojiCodepoint="1f914"
              reducedMotion={prefersReducedMotion}
            />
          }
        >
          {renderThread("user")}
        </PhoneFrame>
      </div>

      <ProofChip count={proofCount} label={proofLabel} style={proofStyle} />
      <ResolveOverlay style={resolveOverlayStyle} summary={summary} summaryStyle={summaryStyle} />
    </section>
  );
}

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}
