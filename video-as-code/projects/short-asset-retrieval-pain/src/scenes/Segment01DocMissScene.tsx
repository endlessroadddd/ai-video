import { Bell, Hash, Plus, Search } from "lucide-react";
import type { CSSProperties } from "react";
import { DocSignalRow } from "../components/DocSignalRow";
import { MarkdownMessage } from "../components/MarkdownMessage";
import { MissHintInline } from "../components/MissHintInline";
import { NarrativeHeadline } from "../components/NarrativeHeadline";
import { SegmentChatBubble } from "../components/SegmentChatBubble";
import {
  SEGMENT01_AI_MISS_HINT,
  SEGMENT01_AI_NAME,
  SEGMENT01_AI_REPLY,
  SEGMENT01_DURATION_MS,
  SEGMENT01_HEADLINE,
  SEGMENT01_TIMINGS,
  SEGMENT01_USER_NAME,
  SEGMENT01_USER_PROMPT,
  SEGMENT01_USER_REACTIONS,
} from "../data/segment01DocMiss";
import { easeOutCubic, mix, ramp } from "../lib/motion";
import type { SceneMode } from "../types";

const BRAND_MARK_SRC = "/enterprise-ai-mark.svg";
const BOT_AVATAR_SRC = "/enterprise-ai-bot-avatar.svg";
const USER_AVATAR_SRC = "/generic-user-avatar.svg";
const BRAND_LABEL = "Enterprise AI";
const BRAND_SHORT_LABEL = "EAI";
const HEADLINE_POP_IN_MS = 180;
const HEADLINE_FADE_OUT_MS = 220;

type Segment01DocMissSceneProps = {
  mode: SceneMode;
  t: number;
};

function getFailedCount(t: number) {
  if (t >= SEGMENT01_TIMINGS.cross4At) return 4;
  if (t >= SEGMENT01_TIMINGS.cross3At) return 3;
  if (t >= SEGMENT01_TIMINGS.cross2At) return 2;
  if (t >= SEGMENT01_TIMINGS.cross1At) return 1;
  return 0;
}

export function Segment01DocMissScene(props: Segment01DocMissSceneProps) {
  const { mode, t } = props;
  const stageT = mode === "static" ? SEGMENT01_DURATION_MS : t;
  const showPrompt = stageT >= SEGMENT01_TIMINGS.userPromptStart;
  const showAiAvatar = stageT >= SEGMENT01_TIMINGS.aiAvatarStart;
  const showDocs = stageT >= SEGMENT01_TIMINGS.docCardsStart;
  const pulse = stageT >= SEGMENT01_TIMINGS.pulseStart && stageT < SEGMENT01_TIMINGS.pulseEnd;
  const failedCount = getFailedCount(stageT);
  const showAiReply = stageT >= SEGMENT01_TIMINGS.aiReplyAt;
  const showMissHint = stageT >= SEGMENT01_TIMINGS.missHintAt;
  const showReaction1 = stageT >= SEGMENT01_TIMINGS.userReaction1At;
  const showReaction2 = stageT >= SEGMENT01_TIMINGS.userReaction2At;

  const headlineIn = easeOutCubic(
    ramp(stageT, SEGMENT01_TIMINGS.headlineIn, SEGMENT01_TIMINGS.headlineIn + HEADLINE_POP_IN_MS),
  );
  const headlineOut = easeOutCubic(
    ramp(stageT, SEGMENT01_TIMINGS.headlineOut - HEADLINE_FADE_OUT_MS, SEGMENT01_TIMINGS.headlineOut),
  );
  const headlineOpacity = headlineIn * (1 - headlineOut);
  const showHeadline = headlineOpacity > 0.02;
  const promptIn = easeOutCubic(
    ramp(stageT, SEGMENT01_TIMINGS.userPromptStart, SEGMENT01_TIMINGS.userPromptStart + 950),
  );
  const docsIn = easeOutCubic(
    ramp(stageT, SEGMENT01_TIMINGS.docCardsStart, SEGMENT01_TIMINGS.docCardsStart + 760),
  );
  const aiShellIn = easeOutCubic(
    ramp(stageT, SEGMENT01_TIMINGS.aiAvatarStart, SEGMENT01_TIMINGS.aiAvatarStart + 760),
  );
  const aiReplyIn = easeOutCubic(
    ramp(stageT, SEGMENT01_TIMINGS.aiReplyAt, SEGMENT01_TIMINGS.aiReplyAt + 820),
  );
  const warningIn = easeOutCubic(
    ramp(stageT, SEGMENT01_TIMINGS.missHintAt, SEGMENT01_TIMINGS.missHintAt + 620),
  );
  const reactionIn = easeOutCubic(
    ramp(stageT, SEGMENT01_TIMINGS.userReaction1At, SEGMENT01_TIMINGS.userReaction1At + 620),
  );
  const reactionFollowupIn = easeOutCubic(
    ramp(stageT, SEGMENT01_TIMINGS.userReaction2At, SEGMENT01_TIMINGS.userReaction2At + 620),
  );
  const promptStreamingProgress =
    mode === "static"
      ? 1
      : ramp(stageT, SEGMENT01_TIMINGS.userPromptStart, SEGMENT01_TIMINGS.docCardsStart - 220);

  const buildVisibilityStyle = (visible: boolean, opacity: number, transform: string): CSSProperties => ({
    opacity: visible ? opacity : 0,
    transform,
    visibility: visible ? "visible" : "hidden",
    pointerEvents: visible ? "auto" : "none",
  });

  const promptStyle = buildVisibilityStyle(
    showPrompt,
    promptIn,
    `translate3d(${mix(18, 0, promptIn)}px, 0, 0)`,
  );
  const docsStyle = buildVisibilityStyle(
    showDocs,
    docsIn,
    `translate(-50%, ${mix(20, 0, docsIn)}px)`,
  );
  const responseStyle = buildVisibilityStyle(
    showAiAvatar,
    aiShellIn,
    `translate3d(${mix(-16, 0, aiShellIn)}px, 0, 0)`,
  );
  const reactionStyle = buildVisibilityStyle(
    showReaction1,
    reactionIn,
    `translate3d(${mix(20, 0, reactionIn)}px, 0, 0)`,
  );
  const reactionFollowupStyle = buildVisibilityStyle(
    showReaction2,
    reactionFollowupIn,
    `translate3d(${mix(18, 0, reactionFollowupIn)}px, 0, 0)`,
  );
  const warningStyle = buildVisibilityStyle(
    showMissHint,
    warningIn,
    `translate3d(${mix(-12, 0, warningIn)}px, 0, 0)`,
  );
  const sourceStatus =
    !showDocs
      ? "Awaiting retrieval"
      : failedCount === 0
        ? "Scanning 4 source docs"
        : failedCount < 4
          ? `${failedCount}/4 checks missed`
          : "No source hit";
  const statusPill = failedCount === 4 ? "Vector miss" : pulse ? "Scanning" : "Live audit";
  const replyStreamingProgress =
    mode === "static"
      ? 1
      : ramp(stageT, SEGMENT01_TIMINGS.aiReplyAt, SEGMENT01_TIMINGS.aiReplyAt + 1_700);
  const reactionStreamingProgress =
    mode === "static"
      ? 1
      : ramp(stageT, SEGMENT01_TIMINGS.userReaction1At, SEGMENT01_TIMINGS.userReaction1At + 820);
  const reactionFollowupStreamingProgress =
    mode === "static"
      ? 1
      : ramp(stageT, SEGMENT01_TIMINGS.userReaction2At, SEGMENT01_TIMINGS.userReaction2At + 920);

  return (
    <section className="segment-doc-miss">
      <NarrativeHeadline
        className="segment-doc-miss__headline-layer"
        opacity={headlineOpacity}
        text={SEGMENT01_HEADLINE}
        visible={showHeadline}
      />

      <aside className="discord-server-rail segment-doc-miss__server-rail" aria-label={`${BRAND_LABEL} workspaces`}>
        <div className="discord-server-rail__stack">
          <div className="discord-server-pill discord-server-pill--home">
            <img src={BRAND_MARK_SRC} alt={BRAND_LABEL} />
          </div>
          <button type="button" className="discord-server-pill is-active" aria-label="Northstar Systems">
            NS
          </button>
          <button type="button" className="discord-server-pill" aria-label="Support">
            CS
          </button>
          <button type="button" className="discord-server-pill" aria-label="Knowledge">
            KB
          </button>
        </div>

        <div className="discord-server-rail__stack">
          <button type="button" className="discord-server-pill discord-server-pill--ghost" aria-label="Add workspace">
            <Plus size={18} />
          </button>
        </div>
      </aside>

      <div className="dashboard-chat-shell segment-doc-miss__shell">
        <aside className="dashboard-chat-sidebar dashboard-chat-sidebar--inline segment-doc-miss__sidebar">
          <div className="dashboard-chat-sidebar-topbar">
            <div className="dashboard-chat-sidebar-guild">
              <strong>Northstar Systems</strong>
              <span>{BRAND_LABEL} escalation relay</span>
            </div>
          </div>

          <div className="dashboard-chat-sidebar-scroll">
            <div className="dashboard-chat-sidebar-body">
              <section className="dashboard-chat-sidebar-group dashboard-chat-sidebar-group--utility">
                <button type="button" className="dashboard-chat-action-row" data-active="true">
                  <span className="dashboard-chat-action-icon dashboard-chat-action-icon--accent">
                    <Plus size={16} />
                  </span>
                  <span className="dashboard-chat-action-row-copy">
                    <span>Open source trace</span>
                    <span className="dashboard-chat-action-badge">live</span>
                  </span>
                </button>

                <button type="button" className="dashboard-chat-action-row">
                  <span className="dashboard-chat-action-icon">
                    <Search size={16} />
                  </span>
                  <span>Search docs</span>
                </button>
              </section>

              <section className="dashboard-chat-sidebar-group">
                <p className="dashboard-chat-sidebar-section-title">Channels</p>

                <button type="button" className="dashboard-chat-channel-row">
                  <Hash size={15} />
                  <span>client-escalations</span>
                </button>

                <button type="button" className="dashboard-chat-channel-row is-active">
                  <Hash size={15} />
                  <span>billing-edge-cases</span>
                  <span className="dashboard-chat-action-badge">focus</span>
                </button>

                <button type="button" className="dashboard-chat-channel-row">
                  <Hash size={15} />
                  <span>source-audit</span>
                </button>
              </section>

              <section className="dashboard-chat-sidebar-group">
                <p className="dashboard-chat-session-section-label">Live lookup status</p>
                <div className="segment-doc-miss__sidebar-status">
                  <span className="segment-doc-miss__sidebar-status-label">Retrieval engine</span>
                  <strong>{sourceStatus}</strong>
                  <span>Enterprise contract changes should have matched 4 attached docs.</span>
                </div>
              </section>
            </div>
          </div>

          <div className="dashboard-chat-sidebar-footer">
            <div className="dashboard-chat-presence">
              <span className="dashboard-chat-presence__dot" />
              <div>
                <strong>{BRAND_LABEL} watcher online</strong>
                <span>Audit is pinned in this channel</span>
              </div>
            </div>
          </div>
        </aside>

        <section className="dashboard-chat-stage segment-doc-miss__stage">
          <div className="dashboard-chat-stage-header">
            <div className="dashboard-chat-stage-header-inner">
              <div className="dashboard-chat-stage-title-row">
                <div className="dashboard-chat-stage-channel">
                  <span className="dashboard-chat-stage-channel-hash">
                    <Hash size={18} />
                  </span>
                  <div className="dashboard-chat-stage-title-shell">
                    <p className="dashboard-chat-stage-title">billing-edge-cases</p>
                    <p className="dashboard-chat-stage-subtitle">
                      {`Discord handoff thread where ${BRAND_LABEL} checks whether the latest contract rules were actually retrieved.`}
                    </p>
                  </div>
                </div>

                <div className="dashboard-chat-stage-meta">
                  <span className="dashboard-chat-stage-status-pill">{statusPill}</span>
                  <button type="button" className="dashboard-chat-stage-icon-button" aria-label="Search channel">
                    <Search size={16} />
                  </button>
                  <button type="button" className="dashboard-chat-stage-icon-button" aria-label="Notification settings">
                    <Bell size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="segment-doc-miss__canvas">
            <div className="segment-doc-miss__request" style={promptStyle}>
              <SegmentChatBubble
                align="right"
                author={SEGMENT01_USER_NAME}
                avatarFallback="NS"
                avatarSrc={USER_AVATAR_SRC}
              >
                <MarkdownMessage
                  className="segment-chat-markdown"
                  content={SEGMENT01_USER_PROMPT}
                  progress={promptStreamingProgress}
                />
              </SegmentChatBubble>
            </div>

            <div className="segment-doc-miss__signals" style={docsStyle}>
              <DocSignalRow failedCount={failedCount} pulse={pulse} visible={showDocs} />
            </div>

            <div className="segment-doc-miss__response" style={responseStyle}>
              <SegmentChatBubble
                align="left"
                author={SEGMENT01_AI_NAME}
                avatarFallback={BRAND_SHORT_LABEL}
                avatarSrc={BOT_AVATAR_SRC}
                emphasis="error"
              >
                <div className="segment-doc-miss__ai-content-shell">
                  <div
                    className="segment-doc-miss__ai-content segment-doc-miss__ai-content--waiting"
                    style={{
                      opacity: 1 - aiReplyIn,
                      visibility: showAiReply ? "hidden" : "visible",
                    }}
                  >
                    <div className="segment-doc-miss__ai-waiting">
                      <span className="inline-spinner-shell">
                        <span className="inline-spinner" aria-hidden="true" />
                        <span>{`${BRAND_LABEL} is checking the latest policy sources...`}</span>
                      </span>
                    </div>
                  </div>

                  <div
                    className="segment-doc-miss__ai-content segment-doc-miss__ai-content--reply"
                    style={{
                      opacity: aiReplyIn,
                      visibility: showAiReply ? "visible" : "hidden",
                    }}
                  >
                    <MarkdownMessage
                      className="segment-chat-markdown"
                      content={SEGMENT01_AI_REPLY}
                      progress={replyStreamingProgress}
                    />
                  </div>
                </div>
              </SegmentChatBubble>

              <div className="segment-doc-miss__warning-shell" style={warningStyle}>
                <MissHintInline text={SEGMENT01_AI_MISS_HINT} />
              </div>
            </div>

            <div className="segment-doc-miss__reaction" style={reactionStyle}>
              <SegmentChatBubble
                align="right"
                author={SEGMENT01_USER_NAME}
                avatarFallback="NS"
                avatarSrc={USER_AVATAR_SRC}
                emphasis="reaction"
              >
                <MarkdownMessage
                  className="segment-chat-markdown"
                  content={SEGMENT01_USER_REACTIONS[0]}
                  progress={reactionStreamingProgress}
                />
              </SegmentChatBubble>

              <div className="segment-doc-miss__reaction-followup" style={reactionFollowupStyle}>
                <SegmentChatBubble
                  align="right"
                  author={SEGMENT01_USER_NAME}
                  avatarFallback="NS"
                  avatarSrc={USER_AVATAR_SRC}
                  emphasis="reaction"
                >
                  <MarkdownMessage
                    className="segment-chat-markdown"
                    content={SEGMENT01_USER_REACTIONS[1]}
                    progress={reactionFollowupStreamingProgress}
                  />
                </SegmentChatBubble>
              </div>
            </div>
          </div>

          <div className="dashboard-chat-stage-footer">
            <div className="dashboard-chat-composer">
              <textarea
                className="dashboard-chat-composer-textarea"
                placeholder="Type into #billing-edge-cases..."
                readOnly
                rows={3}
              />
              <div className="dashboard-chat-composer-footer">
                <div className="dashboard-chat-composer-tools">
                  <button type="button" className="dashboard-chat-composer-plus" aria-label="Attach">
                    <Plus size={16} />
                  </button>
                  <span className="dashboard-chat-composer-hint">
                    Updated contract text is already attached, but retrieval still misses it.
                  </span>
                </div>
                <button type="button" className="dashboard-chat-composer-submit" aria-label="Send">
                  <Search size={16} className="dashboard-chat-composer-submit-icon" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
