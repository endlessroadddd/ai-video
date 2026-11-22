import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp, ChevronRight, Loader2, Plus, Search } from "lucide-react";
import { createTimeline } from "./lib/timeline";
import { OneCommandCurtainEverywhere } from "./lib/curtains";
import { useDemoControls, useDemoRuntimeOptions } from "./lib/useDemoControls";

type PlaybackState = {
  playing: boolean;
  t: number;
};

/** Timeline: hero → typing → send → curtain A → AI reply. */
const DEMO_INTRO_OUT_START = 3000;
const DEMO_INTRO_OUT_END = 3920;
const DEMO_CHAT_STAGE_START = 4000;
const DEMO_CHAT_STAGE_END = 4720;

// Typing happens directly after the intro, before the curtain.
const DEMO_TYPING_START = DEMO_INTRO_OUT_END + 220;
const DEMO_TYPING_END = DEMO_TYPING_START + 3300;

// Curtain (ad-style) beat appears after the "send" moment.
// Give it more time so the full flow reads clearly.
const DEMO_CURTAIN_A_START = DEMO_TYPING_END + 260;
const DEMO_CURTAIN_A_END = DEMO_CURTAIN_A_START + 7200;

// Conversation view + execution resume after curtain A finishes.
const DEMO_VIEW_START = DEMO_CURTAIN_A_END + 220;
const DEMO_VIEW_END = DEMO_VIEW_START + 800;
const DEMO_EXEC_START = DEMO_VIEW_START + 100;
const DEMO_EXEC_END = DEMO_EXEC_START + 2000;
const DEMO_SENT_START = DEMO_EXEC_END;
const DEMO_SENT_END = DEMO_SENT_START + 5340;
const DEMO_CARD_STAGGER0 = DEMO_SENT_START + 280;
const DEMO_RESOLVE_START = DEMO_SENT_END + 1000;
const DEMO_RESOLVE_END = DEMO_RESOLVE_START + 1600;
const DURATION_MS = DEMO_RESOLVE_END + 900;

const MESSAGE_PLATFORMS = [
  { key: "feishu", label: "Feishu", icon: "/platform-icons/feishu.svg" },
  { key: "discord", label: "Discord", icon: "/platform-icons/discord.svg" },
  { key: "telegram", label: "Telegram", icon: "/platform-icons/telegram.svg" },
  { key: "slack", label: "Slack", icon: "/platform-icons/slack.svg" },
] as const;

const MESSAGE_RECIPIENTS = [
  { handle: "jordanlee", name: "Jordan Lee" },
  { handle: "alexporter", name: "Alex Porter" },
  { handle: "samrivera", name: "Sam Rivera" },
  { handle: "taylorcho", name: "Taylor Cho" },
  { handle: "morganbai", name: "Morgan Bai" },
  { handle: "rileyhudson", name: "Riley Hudson" },
  { handle: "caseyvoss", name: "Casey Voss" },
  { handle: "drewfoster", name: "Drew Foster" },
  { handle: "jamiehart", name: "Jamie Hart" },
  { handle: "reesenova", name: "Reese Nova" },
  { handle: "kaiwright", name: "Kai Wright" },
  { handle: "blairchen", name: "Blair Chen" },
] as const;

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function ramp(t: number, start: number, end: number) {
  return clamp01((t - start) / Math.max(1, end - start));
}

function curtainOpacity(p: number) {
  const inT = easeInOutCubic(clamp01(p / 0.22));
  const outT = easeInOutCubic(clamp01((p - 0.78) / 0.22));
  return clamp01(inT * (1 - outT));
}

export function App() {
  const runtime = useDemoRuntimeOptions();
  const [pb, setPb] = useState<PlaybackState>({ playing: true, t: 0 });
  const playingRef = useRef(true);

  const ctrl = useMemo(() => {
    return createTimeline({
      durationMs: DURATION_MS,
      loop: runtime.loop,
      speed: runtime.speed,
      onTick: (t) => {
        setPb({ playing: playingRef.current, t });
      },
    });
  }, [runtime.loop, runtime.speed]);

  const api = useMemo(() => {
    return {
      play: () => {
        playingRef.current = true;
        ctrl.play();
        setPb((s) => ({ ...s, playing: true }));
      },
      pause: () => {
        playingRef.current = false;
        ctrl.pause();
        setPb((s) => ({ ...s, playing: false }));
      },
      restart: () => {
        playingRef.current = true;
        ctrl.restart();
        setPb((s) => ({ ...s, playing: true, t: 0 }));
      },
      toggle: () => {
        if (playingRef.current) {
          playingRef.current = false;
          ctrl.pause();
          setPb((s) => ({ ...s, playing: false }));
        } else {
          playingRef.current = true;
          ctrl.play();
          setPb((s) => ({ ...s, playing: true }));
        }
      },
    };
  }, [ctrl]);

  useDemoControls(api);

  useEffect(() => {
    return () => ctrl.destroy();
  }, [ctrl]);

  const t = pb.t;

  // Camera should be visible for the hero intro.
  const cameraIn = easeOutCubic(ramp(t, 0, 800));
  const stageIn = easeOutCubic(ramp(t, DEMO_CHAT_STAGE_START, DEMO_CHAT_STAGE_END));
  const introIn = easeOutCubic(ramp(t, 0, 680));
  const introOut = easeOutCubic(ramp(t, DEMO_INTRO_OUT_START, DEMO_INTRO_OUT_END));
  const introOpacity = clamp01(introIn * (1 - introOut));
  const introCardMotion = easeOutCubic(ramp(t, 90, 820));
  const typingT = easeOutCubic(ramp(t, DEMO_TYPING_START, DEMO_TYPING_END));
  /** Empty canvas → conversation crossfade (replaces hard `isEmptyState` flip). */
  const viewBlend = easeInOutCubic(ramp(t, DEMO_VIEW_START, DEMO_VIEW_END));
  const executing = ramp(t, DEMO_EXEC_START, DEMO_EXEC_END);
  const sentProgress = ramp(t, DEMO_SENT_START, DEMO_SENT_END);
  const resolve = easeOutCubic(ramp(t, DEMO_RESOLVE_START, DEMO_RESOLVE_END));

  const curtainA = curtainOpacity(ramp(t, DEMO_CURTAIN_A_START, DEMO_CURTAIN_A_END));
  const curtainMask = curtainA;

  const prompt = "Send a follow-up to everyone who asked about refunds today. Let them know the issue is resolved.";
  const typedCount = Math.floor(prompt.length * clamp01(typingT));
  const typed = prompt.slice(0, typedCount);

  const totalUsers = 12;
  const sentUsers = Math.min(totalUsers, Math.floor(totalUsers * easeOutCubic(sentProgress)));
  const showHeaderFooter = viewBlend > 0.06;
  const headerFooterOpacity = clamp01((viewBlend - 0.06) / 0.14);
  const isEmptyComposerSending =
    typingT >= 1 && viewBlend < 0.22 && viewBlend > 0.004;
  const showStreamingSpinner = executing > 0.18 && sentProgress < 1;
  const historyAppear = easeOutCubic(
    ramp(t, DEMO_SENT_START + 420, DEMO_SENT_START + 1120),
  );
  const showHistory = historyAppear > 0.02;
  const historyIsPending = sentProgress < 0.92;

  const composerIconButtonClass =
    "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] text-[var(--dashboard-chat-session-text)] hover:bg-[var(--dashboard-chat-session-hover-bg)]";
  const composerSubmitClass = (opts: { sending?: boolean; disabled?: boolean }) =>
    [
      "dashboard-chat-composer-submit inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] text-white shadow-none transition",
      opts.sending
        ? "bg-[rgb(100_79_184_/_.49)] hover:bg-[rgb(100_79_184_/_.49)]"
        : "bg-[var(--dashboard-sidebar-active-bg)] hover:bg-[var(--dashboard-action-primary-hover-bg)]",
      opts.disabled ? "pointer-events-none opacity-50 hover:bg-[var(--dashboard-sidebar-active-bg)]" : "",
    ].join(" ");

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.dashboardRecordingActive = "true";
    root.dataset.dashboardRecordingLayoutState = "centered";
    root.dataset.dashboardRecordingCameraState = "wide";
    root.dataset.dashboardRecordingCleanScreen = runtime.clean ? "true" : "false";

    return () => {
      delete root.dataset.dashboardRecordingActive;
      delete root.dataset.dashboardRecordingLayoutState;
      delete root.dataset.dashboardRecordingCameraState;
      delete root.dataset.dashboardRecordingCleanScreen;
    };
  }, [runtime.clean]);

  return (
    <main className="dashboard-route-shell" data-recording-layout-state="centered">
      <div
        className="dashboard-chat-recording-camera"
        data-camera-state="wide"
        data-layout-state="centered"
        data-recording-active="true"
        style={{
          opacity: mix(0, 1, cameraIn),
          transform: `translate3d(0, ${mix(12, 0, cameraIn)}px, 0)`,
        }}
      >
        <OneCommandCurtainEverywhere t={t} start={DEMO_CURTAIN_A_START} end={DEMO_CURTAIN_A_END} zIndex={11} />
        {introOpacity > 0.008 ? (
          <div
            className="vac-onecmd-hero"
            aria-hidden="true"
            style={{
              opacity: introOpacity,
              transform: `translate3d(0, ${mix(14, 0, introIn) * (1 - introOut)}px, 0) scale(${mix(0.985, 1, introIn)})`,
            }}
          >
            <div className="vac-onecmd-hero__wash" />
            <div
              className="vac-onecmd-hero__card"
              style={{
                transform: `translate3d(0, ${mix(28, 0, introCardMotion)}px, 0) scale(${mix(0.94, 1, introCardMotion)})`,
              }}
            >
              <p className="vac-onecmd-hero__kicker">Lucius · Client Agent</p>
              <h1 className="vac-onecmd-hero__title">
                Close the loop{" "}
                <span className="vac-onecmd-hero__title-accent">everywhere.</span>
              </h1>
              <p className="vac-onecmd-hero__sub">
                One message → follow-ups across Feishu, Discord, Telegram, and Slack.
              </p>
              <div className="vac-onecmd-hero__rule" />
            </div>
          </div>
        ) : null}
        <div
          className="dashboard-chat-shell"
          data-recording-clean-screen={runtime.clean ? "true" : "false"}
          style={{
            opacity: 1 - curtainMask,
            transform: `translate3d(0, ${mix(0, 10, curtainMask)}px, 0)`,
            filter: curtainMask > 0.02 ? `blur(${mix(0, 10, curtainMask)}px)` : undefined,
            pointerEvents: curtainMask > 0.35 ? "none" : "auto",
          }}
        >
          <aside className="dashboard-chat-sidebar dashboard-chat-sidebar--inline">
            <header className="dashboard-chat-sidebar-header">
              <h2 className="dashboard-chat-sidebar-title">Chat</h2>
            </header>

            <div className="dashboard-chat-sidebar-scroll">
              <div className="dashboard-chat-sidebar-body">
                <section className="dashboard-chat-sidebar-group">
                  <button type="button" className="dashboard-chat-action-row" data-active="true">
                    <span className="dashboard-chat-action-icon dashboard-chat-action-icon--accent">
                      <Plus className="h-4 w-4" />
                    </span>
                    <span className="dashboard-chat-action-row-copy">
                      <span>New chat</span>
                      <span className="dashboard-chat-action-badge">Draft</span>
                    </span>
                  </button>

                  <button type="button" className="dashboard-chat-action-row">
                    <span className="dashboard-chat-action-icon">
                      <Search className="h-4 w-4 text-[var(--dashboard-chat-session-muted)]" />
                    </span>
                    <span>Search</span>
                  </button>
                </section>

                {showHistory ? (
                  <section className="dashboard-chat-sidebar-group">
                    <p className="dashboard-chat-session-section-label">History</p>
                    <div className="dashboard-chat-session-list">
                      <div
                        className="dashboard-chat-session-row group"
                        data-active="true"
                        style={{
                          opacity: historyAppear,
                          transform: `translate3d(0, ${mix(10, 0, historyAppear)}px, 0)`,
                        }}
                      >
                        <button type="button" className="min-w-0 flex-1 px-2 text-left">
                          <span className="dashboard-chat-session-main">
                            <span className="dashboard-chat-session-title">
                              Refund follow-up sent · issue resolved
                            </span>
                            {historyIsPending ? (
                              <span className="dashboard-chat-session-pending" aria-hidden="true">
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              </span>
                            ) : null}
                          </span>
                        </button>
                      </div>
                    </div>
                  </section>
                ) : null}
              </div>
            </div>
          </aside>

          <section className="dashboard-chat-stage">
            {showHeaderFooter ? (
              <div
                className="dashboard-chat-stage-header"
                style={{ opacity: headerFooterOpacity }}
              >
                <div className="dashboard-chat-stage-header-inner">
                  <div className="dashboard-chat-stage-title-row">
                    <div className="dashboard-chat-stage-title-shell">
                      <p className="dashboard-chat-stage-title" title="One command, done">
                        One command, done
                      </p>
                    </div>
                    {executing > 0.25 && sentProgress < 1 ? (
                      <span className="dashboard-chat-stage-status-pill" role="status" aria-live="polite">
                        <span>Replying</span>
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}

            <div
              className="dashboard-chat-stage-body"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                background: "var(--dashboard-chat-canvas-bg)",
              }}
            >
              <div
                className="dashboard-chat-stage-body-layer"
                style={{
                  gridArea: "1 / 1",
                  placeSelf: "stretch",
                  opacity: 1 - viewBlend,
                  transform: `translate3d(0, ${mix(0, -12, viewBlend)}px, 0)`,
                  pointerEvents: viewBlend > 0.55 ? "none" : "auto",
                  transition: "none",
                  background: "var(--dashboard-chat-canvas-bg)",
                  zIndex: viewBlend < 0.5 ? 1 : 0,
                }}
                aria-hidden={viewBlend > 0.98}
              >
                <div className="dashboard-chat-empty-state">
                  <div className="dashboard-chat-empty-brand">
                    <img
                      src="/figma-auth/Logo%20Mark_black.svg"
                      alt=""
                      className="h-[84px] w-[84px] shrink-0 object-contain"
                    />
                    <h2 className="text-[24px] font-medium leading-[1.6] text-black">
                      Lucius Client Agent
                    </h2>
                  </div>

                  <div className="dashboard-chat-empty-composer-slot">
                    <form
                      className="dashboard-chat-composer-wrap"
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <div className="dashboard-chat-composer">
                        <textarea
                          value={typed}
                          readOnly
                          rows={3}
                          tabIndex={-1}
                          style={{ caretColor: "transparent" }}
                          className="block min-h-[72px] w-full resize-none !border-0 !rounded-none !bg-transparent px-0 py-0 text-[14px] leading-[1.6] text-[var(--dashboard-chat-session-text)] !shadow-none outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:!outline-none focus-visible:!ring-0 focus-visible:ring-offset-0 placeholder:text-[var(--dashboard-chat-session-muted)] caret-transparent"
                        />
                        <div className="dashboard-chat-composer-footer">
                          <button
                            type="button"
                            className={composerIconButtonClass}
                            aria-label="Upload"
                          >
                            <Plus className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            className={composerSubmitClass({ sending: isEmptyComposerSending })}
                            aria-label={isEmptyComposerSending ? "Sending" : "Send"}
                          >
                            {isEmptyComposerSending ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <ArrowUp className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="dashboard-chat-prompt-grid">
                    {[
                      {
                        tone: "lavender",
                        icon: "💡",
                        text: "What can Lucius do for our community?",
                      },
                      {
                        tone: "default",
                        icon: "📝",
                        text: "Invite Lucius to help with today’s ops workflow",
                      },
                      {
                        tone: "default",
                        icon: "👩‍💻",
                        text: "How is Lucius different from a chatbot?",
                      },
                      {
                        tone: "sage",
                        icon: "📖",
                        text: "Update Lucius when our product changes",
                      },
                    ].map((p) => (
                      <button
                        key={p.text}
                        type="button"
                        data-tone={p.tone}
                        className="dashboard-chat-prompt-card text-left"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <span className="text-[20px] leading-none">
                            {p.icon}
                          </span>
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--dashboard-chat-session-muted)]" />
                        </div>
                        <p className="pr-8 text-[14px] font-medium leading-[1.6] text-[var(--dashboard-chat-session-text)]">
                          {p.text}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="dashboard-chat-stage-body-layer"
                style={{
                  gridArea: "1 / 1",
                  placeSelf: "stretch",
                  opacity: viewBlend,
                  transform: `translate3d(0, ${mix(16, 0, viewBlend)}px, 0)`,
                  pointerEvents: viewBlend < 0.45 ? "none" : "auto",
                  transition: "none",
                  background: "var(--dashboard-chat-canvas-bg)",
                  zIndex: viewBlend >= 0.5 ? 1 : 0,
                }}
                aria-hidden={viewBlend < 0.02}
              >
                <div className="dashboard-chat-message-list">
                  <article className="dashboard-chat-message-group dashboard-chat-message-group--self">
                    <div className="dashboard-chat-message-stack">
                      <div className="dashboard-chat-message-item">
                        <div className="dashboard-chat-message-bubble dashboard-chat-message-bubble--self">
                          <p className="dashboard-chat-message-bubble-copy">{prompt}</p>
                        </div>
                      </div>
                    </div>
                  </article>

                  <article className="dashboard-chat-message-group dashboard-chat-message-group--lucius">
                    <div className="dashboard-chat-message-head">
                      <img
                        src="/figma-auth/Logo%20Mark_black.svg"
                        alt="Lucius"
                        className="dashboard-chat-message-avatar"
                        loading="lazy"
                      />
                      <div className="dashboard-chat-message-head-copy">
                        <span className="dashboard-chat-message-name">Lucius</span>
                        <span className="dashboard-chat-message-time">Now</span>
                      </div>
                    </div>

                    <div className="dashboard-chat-message-stack">
                      <div className="dashboard-chat-message-rich-block">
                        <p className="dashboard-chat-message-streaming-copy">
                          Executing · {sentUsers}/{totalUsers} messages delivered
                          {showStreamingSpinner ? (
                            <Loader2
                              className="ml-2 inline-block h-4 w-4 animate-spin align-[-0.125em] text-[var(--dashboard-sidebar-active-bg)]"
                              aria-hidden
                            />
                          ) : null}
                        </p>

                        <div className="mt-4 grid grid-cols-2 gap-2">
                          {Array.from({ length: totalUsers }).map((_, idx) => {
                            const isSent = idx < sentUsers;
                            const plat = MESSAGE_PLATFORMS[idx % MESSAGE_PLATFORMS.length];
                            const recipient = MESSAGE_RECIPIENTS[idx];
                            const appearT = easeOutCubic(
                              ramp(
                                t,
                                DEMO_CARD_STAGGER0 + idx * 160,
                                DEMO_CARD_STAGGER0 + idx * 160 + 520,
                              ),
                            );
                            return (
                              <div
                                key={idx}
                                className="rounded-[10px] border border-[var(--dashboard-panel-border)] bg-white px-3 py-2"
                                style={{
                                  opacity: mix(0, 1, appearT),
                                  transform: `translate3d(0, ${mix(10, 0, appearT)}px, 0)`,
                                }}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span className="flex min-w-0 items-center gap-2 text-[12px] font-semibold text-[var(--dashboard-text)]">
                                    <img
                                      src={plat.icon}
                                      alt=""
                                      className="h-4 w-4 shrink-0 object-contain"
                                    />
                                    <span className="min-w-0 truncate">
                                      @{recipient.handle}
                                      <span className="ml-1.5 font-medium text-[11px] text-[var(--dashboard-text-muted)]">
                                        · {plat.label}
                                      </span>
                                    </span>
                                  </span>
                                  <span
                                    className={
                                      isSent
                                        ? "shrink-0 text-[11px] font-semibold text-[var(--dashboard-badge-success-text)]"
                                        : "shrink-0 text-[11px] font-semibold text-[var(--dashboard-text-muted)]"
                                    }
                                  >
                                    {isSent ? "Sent" : "Queued"}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div
                          className="mt-4 rounded-[10px] border border-[var(--dashboard-badge-success-border)] bg-[var(--dashboard-badge-success-bg)] px-3 py-2 text-[12px] font-semibold text-[var(--dashboard-badge-success-text)]"
                          style={{
                            opacity: sentProgress >= 1 ? 1 : 0,
                            transform: `translate3d(0, ${mix(8, 0, resolve)}px, 0)`,
                          }}
                        >
                          ✓ Done · Follow-up delivered
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>

            {showHeaderFooter ? (
              <div
                className="dashboard-chat-stage-footer"
                style={{ opacity: headerFooterOpacity }}
              >
                <form className="dashboard-chat-composer-wrap" onSubmit={(e) => e.preventDefault()}>
                  <div className="dashboard-chat-composer">
                    <textarea
                      value=""
                      readOnly
                      rows={3}
                      placeholder="Message Lucius…"
                      className="block min-h-[72px] w-full resize-none !border-0 !rounded-none !bg-transparent px-0 py-0 text-[14px] leading-[1.6] text-[var(--dashboard-chat-session-text)] !shadow-none outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:!outline-none focus-visible:!ring-0 focus-visible:ring-offset-0 placeholder:text-[var(--dashboard-chat-session-muted)] caret-transparent"
                    />
                    <div className="dashboard-chat-composer-footer">
                      <button
                        type="button"
                        className={composerIconButtonClass}
                        aria-label="Upload"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        className={composerSubmitClass({ disabled: true })}
                        disabled
                        title="Press R to replay"
                        aria-label="Send"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </main>
  );
}

