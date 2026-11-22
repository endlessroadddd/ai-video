import { Bell, Hash, Plus, Search } from "lucide-react";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { MarkdownMessage } from "../components/MarkdownMessage";
import { MissHintInline } from "../components/MissHintInline";
import { NarrativeHeadline } from "../components/NarrativeHeadline";
import { SegmentChatBubble } from "../components/SegmentChatBubble";
import {
  SEGMENT01_AI_NAME,
  SEGMENT01_AI_REPLY,
  SEGMENT01_DOC_CARDS,
  SEGMENT01_USER_NAME,
  SEGMENT01_USER_PROMPT,
} from "../data/segment01DocMiss";
import {
  SEGMENT02_AI_STILL_WRONG,
  SEGMENT02_AI_WAITING,
  SEGMENT02_CARD_META,
  SEGMENT02_DURATION_MS,
  SEGMENT02_EDIT_STEPS,
  SEGMENT02_HEADLINE_CLOSE,
  SEGMENT02_HEADLINE_OPEN,
  SEGMENT02_MODAL_EYEBROW,
  SEGMENT02_MODAL_FOOTER,
  SEGMENT02_MODAL_TITLE,
  SEGMENT02_RETRY_LABEL,
  SEGMENT02_SIDEBAR_STATUS_NOTE,
  SEGMENT02_SIDEBAR_STATUS_TITLE,
  SEGMENT02_STATUS_PILL,
  SEGMENT02_TEAM_MEMBERS,
  SEGMENT02_THREAD_SUBTITLE,
  SEGMENT02_THREAD_TITLE,
  SEGMENT02_TIMINGS,
  SEGMENT02_USER_REACTIONS,
} from "../data/segment02TeamRevise";
import { easeOutCubic, mix, ramp } from "../lib/motion";
import type { SceneMode } from "../types";

const BRAND_MARK_SRC = "/enterprise-ai-mark.svg";
const BOT_AVATAR_SRC = "/enterprise-ai-bot-avatar.svg";
const USER_AVATAR_SRC = "/generic-user-avatar.svg";
const BRAND_LABEL = "Enterprise AI";
const BRAND_SHORT_LABEL = "EAI";
const HEADLINE_POP_IN_MS = 180;
const HEADLINE_FADE_OUT_MS = 220;

type Segment02TeamReviseSceneProps = {
  mode: SceneMode;
  t: number;
};

function getRevealedEditCount(t: number) {
  if (t >= SEGMENT02_TIMINGS.edit3At) return 3;
  if (t >= SEGMENT02_TIMINGS.edit2At) return 2;
  if (t >= SEGMENT02_TIMINGS.edit1At) return 1;
  return 0;
}

function buildVisibilityStyle(visible: boolean, opacity: number, transform: string): CSSProperties {
  return {
    opacity: visible ? opacity : 0,
    transform,
    visibility: visible ? "visible" : "hidden",
    pointerEvents: visible ? "auto" : "none",
  };
}

export function Segment02TeamReviseScene(props: Segment02TeamReviseSceneProps) {
  const { mode, t } = props;
  const stageT = mode === "static" ? SEGMENT02_DURATION_MS : t;
  const chatViewportRef = useRef<HTMLDivElement | null>(null);
  const scrollStateRef = useRef({
    aiReply: false,
    aiShell: false,
    prompt: false,
    reaction1: false,
    reaction2: false,
    stillWrong: false,
  });
  const revealedEditCount = getRevealedEditCount(stageT);
  const modalIn = easeOutCubic(ramp(stageT, 0, 760));
  const modalOut = easeOutCubic(ramp(stageT, SEGMENT02_TIMINGS.modalOutAt, SEGMENT02_TIMINGS.modalOutEnd));
  const modalOpacity = modalIn * (1 - modalOut);
  const modalVisible = modalOpacity > 0.02;
  const headlineOpenIn = easeOutCubic(
    ramp(stageT, SEGMENT02_TIMINGS.headlineOpenIn, SEGMENT02_TIMINGS.headlineOpenIn + HEADLINE_POP_IN_MS),
  );
  const headlineOpenOut = easeOutCubic(
    ramp(stageT, SEGMENT02_TIMINGS.headlineOpenOut - HEADLINE_FADE_OUT_MS, SEGMENT02_TIMINGS.headlineOpenOut),
  );
  const headlineOpenOpacity = headlineOpenIn * (1 - headlineOpenOut);
  const showHeadlineOpen = headlineOpenOpacity > 0.02;
  const retryLabelVisible = stageT >= SEGMENT02_TIMINGS.retryLabelAt;
  const showPrompt = stageT >= SEGMENT02_TIMINGS.userPromptAt;
  const showAiShell = stageT >= SEGMENT02_TIMINGS.aiAvatarAt;
  const showAiReply = stageT >= SEGMENT02_TIMINGS.aiReplyAt;
  const showStillWrong = stageT >= SEGMENT02_TIMINGS.stillWrongAt;
  const showReaction1 = stageT >= SEGMENT02_TIMINGS.userReaction1At;
  const showReaction2 = stageT >= SEGMENT02_TIMINGS.userReaction2At;
  const headlineCloseIn = easeOutCubic(
    ramp(stageT, SEGMENT02_TIMINGS.headlineCloseIn, SEGMENT02_TIMINGS.headlineCloseIn + HEADLINE_POP_IN_MS),
  );
  const headlineCloseOut = easeOutCubic(
    ramp(stageT, SEGMENT02_TIMINGS.headlineCloseOut - HEADLINE_FADE_OUT_MS, SEGMENT02_TIMINGS.headlineCloseOut),
  );
  const headlineCloseOpacity = headlineCloseIn * (1 - headlineCloseOut);
  const showHeadlineClose = headlineCloseOpacity > 0.02;

  const retryLabelIn = easeOutCubic(
    ramp(stageT, SEGMENT02_TIMINGS.retryLabelAt, SEGMENT02_TIMINGS.retryLabelAt + 560),
  );
  const promptIn = easeOutCubic(
    ramp(stageT, SEGMENT02_TIMINGS.userPromptAt, SEGMENT02_TIMINGS.userPromptAt + 620),
  );
  const aiShellIn = easeOutCubic(
    ramp(stageT, SEGMENT02_TIMINGS.aiAvatarAt, SEGMENT02_TIMINGS.aiAvatarAt + 700),
  );
  const aiReplyIn = easeOutCubic(
    ramp(stageT, SEGMENT02_TIMINGS.aiReplyAt, SEGMENT02_TIMINGS.aiReplyAt + 860),
  );
  const stillWrongIn = easeOutCubic(
    ramp(stageT, SEGMENT02_TIMINGS.stillWrongAt, SEGMENT02_TIMINGS.stillWrongAt + 520),
  );
  const reaction1In = easeOutCubic(
    ramp(stageT, SEGMENT02_TIMINGS.userReaction1At, SEGMENT02_TIMINGS.userReaction1At + 620),
  );
  const reaction2In = easeOutCubic(
    ramp(stageT, SEGMENT02_TIMINGS.userReaction2At, SEGMENT02_TIMINGS.userReaction2At + 620),
  );

  const promptStreamingProgress =
    mode === "static"
      ? 1
      : ramp(stageT, SEGMENT02_TIMINGS.userPromptAt, SEGMENT02_TIMINGS.aiAvatarAt - 260);
  const replyStreamingProgress =
    mode === "static"
      ? 1
      : ramp(stageT, SEGMENT02_TIMINGS.aiReplyAt, SEGMENT02_TIMINGS.aiReplyAt + 1_500);
  const reaction1StreamingProgress =
    mode === "static"
      ? 1
      : ramp(stageT, SEGMENT02_TIMINGS.userReaction1At, SEGMENT02_TIMINGS.userReaction1At + 360);
  const reaction2StreamingProgress =
    mode === "static"
      ? 1
      : ramp(stageT, SEGMENT02_TIMINGS.userReaction2At, SEGMENT02_TIMINGS.userReaction2At + 980);

  const promptStyle = buildVisibilityStyle(
    showPrompt,
    promptIn,
    `translate3d(${mix(18, 0, promptIn)}px, 0, 0)`,
  );
  const aiShellStyle = buildVisibilityStyle(
    showAiShell,
    aiShellIn,
    `translate3d(${mix(-16, 0, aiShellIn)}px, 0, 0)`,
  );
  const retryLabelStyle = buildVisibilityStyle(
    retryLabelVisible,
    retryLabelIn,
    `translate3d(0, ${mix(18, 0, retryLabelIn)}px, 0)`,
  );
  const warningStyle = buildVisibilityStyle(
    showStillWrong,
    stillWrongIn,
    `translate3d(${mix(-12, 0, stillWrongIn)}px, 0, 0)`,
  );
  const reaction1Style = buildVisibilityStyle(
    showReaction1,
    reaction1In,
    `translate3d(${mix(18, 0, reaction1In)}px, 0, 0)`,
  );
  const reaction2Style = buildVisibilityStyle(
    showReaction2,
    reaction2In,
    `translate3d(${mix(18, 0, reaction2In)}px, 0, 0)`,
  );

  const activeAvatarCount =
    revealedEditCount === 0 ? 1 : Math.min(SEGMENT02_TEAM_MEMBERS.length, revealedEditCount * 2);
  const cardsPulse = modalVisible && revealedEditCount > 0;

  useEffect(() => {
    const viewport = chatViewportRef.current;
    if (!viewport) return;

    const nextState = {
      prompt: showPrompt,
      aiShell: showAiShell,
      aiReply: showAiReply,
      stillWrong: showStillWrong,
      reaction1: showReaction1,
      reaction2: showReaction2,
    };

    const prevState = scrollStateRef.current;
    const shouldScroll =
      (nextState.prompt && !prevState.prompt) ||
      (nextState.aiShell && !prevState.aiShell) ||
      (nextState.aiReply && !prevState.aiReply) ||
      (nextState.stillWrong && !prevState.stillWrong) ||
      (nextState.reaction1 && !prevState.reaction1) ||
      (nextState.reaction2 && !prevState.reaction2);

    scrollStateRef.current = nextState;

    if (!shouldScroll) return;

    const behavior: ScrollBehavior = mode === "motion" ? "smooth" : "auto";
    requestAnimationFrame(() => {
      viewport.scrollTo({
        top: viewport.scrollHeight,
        behavior,
      });
    });
  }, [mode, showAiReply, showAiShell, showPrompt, showReaction1, showReaction2, showStillWrong]);

  return (
    <section className="segment-doc-revise">
      <NarrativeHeadline
        className="segment-doc-revise__headline-layer segment-doc-revise__headline-layer--modal"
        opacity={headlineOpenOpacity}
        text={SEGMENT02_HEADLINE_OPEN}
        visible={showHeadlineOpen}
      />

      <NarrativeHeadline
        className="segment-doc-revise__headline-layer segment-doc-revise__headline-layer--chat"
        opacity={headlineCloseOpacity}
        text={SEGMENT02_HEADLINE_CLOSE}
        visible={showHeadlineClose}
      />

      <aside className="discord-server-rail segment-doc-revise__server-rail" aria-label={`${BRAND_LABEL} workspaces`}>
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

      <div className="dashboard-chat-shell segment-doc-revise__shell">
        <aside className="dashboard-chat-sidebar dashboard-chat-sidebar--inline segment-doc-revise__sidebar">
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
                    <span>Open retry thread</span>
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
                  <span className="dashboard-chat-action-badge">retry</span>
                </button>

                <button type="button" className="dashboard-chat-channel-row">
                  <Hash size={15} />
                  <span>source-audit</span>
                </button>
              </section>

              <section className="dashboard-chat-sidebar-group">
                <p className="dashboard-chat-session-section-label">Revision status</p>
                <div className="segment-doc-revise__sidebar-status">
                  <span className="segment-doc-revise__sidebar-status-label">Team intervention</span>
                  <strong>{SEGMENT02_SIDEBAR_STATUS_TITLE}</strong>
                  <span>{SEGMENT02_SIDEBAR_STATUS_NOTE}</span>
                </div>
              </section>
            </div>
          </div>

          <div className="dashboard-chat-sidebar-footer">
            <div className="dashboard-chat-presence">
              <span className="dashboard-chat-presence__dot" />
              <div>
                <strong>{BRAND_LABEL} watcher online</strong>
                <span>The same client question is being re-tested after doc edits.</span>
              </div>
            </div>
          </div>
        </aside>

        <section className="dashboard-chat-stage segment-doc-revise__stage">
          <div className="dashboard-chat-stage-header">
            <div className="dashboard-chat-stage-header-inner">
              <div className="dashboard-chat-stage-title-row">
                <div className="dashboard-chat-stage-channel">
                  <span className="dashboard-chat-stage-channel-hash">
                    <Hash size={18} />
                  </span>
                  <div className="dashboard-chat-stage-title-shell">
                    <p className="dashboard-chat-stage-title">{SEGMENT02_THREAD_TITLE}</p>
                    <p className="dashboard-chat-stage-subtitle">{SEGMENT02_THREAD_SUBTITLE}</p>
                  </div>
                </div>

                <div className="dashboard-chat-stage-meta">
                  <span className="dashboard-chat-stage-status-pill">{SEGMENT02_STATUS_PILL}</span>
                  <button type="button" className="dashboard-chat-stage-icon-button" aria-label="Search channel">
                    <Search size={16} />
                  </button>
                  <button
                    type="button"
                    className="dashboard-chat-stage-icon-button"
                    aria-label="Notification settings"
                  >
                    <Bell size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="segment-doc-revise__canvas">
            <div className="segment-doc-revise__chat-layer" data-modal-visible={modalVisible ? "true" : "false"}>
              <div className="segment-doc-revise__chat-viewport" ref={chatViewportRef}>
                <div className="segment-doc-revise__chat-stack">
                  <div className="segment-doc-revise__retry-row" style={retryLabelStyle}>
                    <div className="segment-doc-revise__retry-label">{SEGMENT02_RETRY_LABEL}</div>
                  </div>

                  <div className="segment-doc-revise__request-row" style={promptStyle}>
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

                  <div className="segment-doc-revise__response-row" style={aiShellStyle}>
                    <SegmentChatBubble
                      align="left"
                      author={SEGMENT01_AI_NAME}
                      avatarFallback={BRAND_SHORT_LABEL}
                      avatarSrc={BOT_AVATAR_SRC}
                      emphasis="error"
                    >
                      <div className="segment-doc-revise__ai-content-shell">
                        <div
                          className="segment-doc-revise__ai-content segment-doc-revise__ai-content--waiting"
                          style={{
                            opacity: 1 - aiReplyIn,
                            visibility: showAiReply ? "hidden" : "visible",
                          }}
                        >
                          <div className="segment-doc-revise__ai-waiting">
                            <span className="inline-spinner-shell">
                              <span className="inline-spinner" aria-hidden="true" />
                              <span>{SEGMENT02_AI_WAITING}</span>
                            </span>
                          </div>
                        </div>

                        <div
                          className="segment-doc-revise__ai-content segment-doc-revise__ai-content--reply"
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
                  </div>

                  <div className="segment-doc-revise__warning-row" style={warningStyle}>
                    <div className="segment-doc-revise__warning-shell">
                      <MissHintInline text={SEGMENT02_AI_STILL_WRONG} />
                    </div>
                  </div>

                  <div className="segment-doc-revise__reaction-row" style={reaction1Style}>
                    <SegmentChatBubble
                      align="right"
                      author={SEGMENT01_USER_NAME}
                      avatarFallback="NS"
                      avatarSrc={USER_AVATAR_SRC}
                      emphasis="reaction"
                    >
                      <MarkdownMessage
                        className="segment-chat-markdown"
                        content={SEGMENT02_USER_REACTIONS[0]}
                        progress={reaction1StreamingProgress}
                      />
                    </SegmentChatBubble>
                  </div>

                  <div className="segment-doc-revise__reaction-row" style={reaction2Style}>
                    <SegmentChatBubble
                      align="right"
                      author={SEGMENT01_USER_NAME}
                      avatarFallback="NS"
                      avatarSrc={USER_AVATAR_SRC}
                      emphasis="reaction"
                    >
                      <MarkdownMessage
                        className="segment-chat-markdown"
                        content={SEGMENT02_USER_REACTIONS[1]}
                        progress={reaction2StreamingProgress}
                      />
                    </SegmentChatBubble>
                  </div>
                </div>
              </div>
            </div>

            <div className="segment-doc-revise__modal-backdrop" data-visible={modalVisible ? "true" : "false"}>
              <div
                className="segment-doc-revise__modal"
                style={{
                  opacity: modalOpacity,
                  transform: `translate3d(0, ${mix(28, 0, modalIn)}px, 0) scale(${mix(0.96, 1, modalIn) * mix(1, 0.94, modalOut)})`,
                }}
              >
                <div className="segment-doc-revise__modal-header">
                  <div className="segment-doc-revise__modal-copy">
                    <span className="segment-doc-revise__modal-eyebrow">{SEGMENT02_MODAL_EYEBROW}</span>
                    <h2>{SEGMENT02_MODAL_TITLE}</h2>
                  </div>

                  <div className="segment-doc-revise__counter-card">
                    <span className="segment-doc-revise__counter-label">Doc edits</span>
                    <strong>{revealedEditCount}</strong>
                    <div className="segment-doc-revise__counter-track" aria-hidden="true">
                      {SEGMENT02_EDIT_STEPS.map((step, index) => (
                        <span
                          key={step.id}
                          className="segment-doc-revise__counter-bar"
                          data-active={revealedEditCount > index ? "true" : "false"}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="segment-doc-revise__modal-card-grid">
                  {SEGMENT01_DOC_CARDS.map((card, index) => {
                    const Icon = card.icon;
                    const meta = SEGMENT02_CARD_META[card.id];

                    return (
                      <article
                        key={card.id}
                        className={`segment-doc-revise__modal-card segment-doc-revise__modal-card--${card.tone} ${
                          cardsPulse ? "is-editing" : ""
                        }`}
                        style={{ animationDelay: `${index * 90}ms` }}
                      >
                        <div className="segment-doc-revise__modal-card-top">
                          <span className="segment-doc-revise__modal-card-badge">
                            <span className="segment-doc-revise__modal-card-icon">
                              <Icon size={22} />
                            </span>
                            <span className="segment-doc-revise__modal-card-badge-text">{meta.category}</span>
                          </span>
                          <span className="segment-doc-revise__modal-card-state">{meta.state}</span>
                        </div>

                        <div className="segment-doc-revise__modal-card-copy">
                          <strong>{meta.title}</strong>
                          <p>{meta.detail}</p>
                        </div>

                        <div className="segment-doc-revise__modal-card-signal">
                          <span className="segment-doc-revise__modal-card-signal-dot" aria-hidden="true" />
                          <span>{meta.signal}</span>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <div className="segment-doc-revise__edit-strip">
                  {SEGMENT02_EDIT_STEPS.map((step, index) => (
                    <article
                      key={step.id}
                      className="segment-doc-revise__edit-chip"
                      data-active={revealedEditCount > index ? "true" : "false"}
                    >
                      <strong>{step.label}</strong>
                      <span>{step.detail}</span>
                    </article>
                  ))}
                </div>

                <div className="segment-doc-revise__team-row">
                  {SEGMENT02_TEAM_MEMBERS.map((member, index) => (
                    <figure
                      key={member.id}
                      className="segment-doc-revise__team-member"
                      data-active={index < activeAvatarCount ? "true" : "false"}
                    >
                      <div className="segment-doc-revise__team-avatar">
                        <img
                          src={member.avatarSrc}
                          alt={`${member.label} avatar`}
                          className="segment-doc-revise__team-avatar-image"
                          loading="eager"
                        />
                      </div>
                      <figcaption className="segment-doc-revise__team-label">{member.label}</figcaption>
                    </figure>
                  ))}
                </div>

                <p className="segment-doc-revise__modal-footer">{SEGMENT02_MODAL_FOOTER}</p>
              </div>
            </div>
          </div>

          <div className="dashboard-chat-stage-footer">
            <div className="dashboard-chat-composer">
              <textarea
                className="dashboard-chat-composer-textarea"
                placeholder="Retry the same contract question..."
                readOnly
                rows={3}
              />
              <div className="dashboard-chat-composer-footer">
                <div className="dashboard-chat-composer-tools">
                  <button type="button" className="dashboard-chat-composer-plus" aria-label="Attach">
                    <Plus size={16} />
                  </button>
                  <span className="dashboard-chat-composer-hint">
                    Revised docs were already pushed, but retrieval still falls back to the same wrong answer.
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
