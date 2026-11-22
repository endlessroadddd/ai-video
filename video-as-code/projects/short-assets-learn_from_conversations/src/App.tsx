import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp, ChevronRight, Loader2, Plus, Search } from "lucide-react";
import { createTimeline } from "./lib/timeline";
import { LearnConvCurtainKnowledgeGraphV3 } from "./lib/curtains";
import { useDemoControls, useDemoRuntimeOptions } from "./lib/useDemoControls";

type PlaybackState = {
  playing: boolean;
  t: number;
};

/** Timeline: hero + curtain A finish before chat typing begins (no overlap). */
const DEMO_INTRO_OUT_START = 3000;
const DEMO_INTRO_OUT_END = 3920;
const DEMO_CHAT_STAGE_START = 4000;
const DEMO_CHAT_STAGE_END = 4720;

// Curtain (ad-style) beats — same pacing grammar, but learn-specific visuals.
// Start slightly before the intro fully fades, so we cut
// directly from hero → curtain without exposing the chat UI.
const DEMO_CURTAIN_A_START = DEMO_INTRO_OUT_END - 220;
// Slightly slower curtain + extra hold once fully visible.
const DEMO_CURTAIN_A_END = DEMO_CURTAIN_A_START + 8200;

// Keep the original animation grammar, but shift the whole "typing → view → exec" sequence
// so it starts after curtain A has fully ended.
const DEMO_TYPING_START = DEMO_CURTAIN_A_END + 220;
const DEMO_TYPING_END = DEMO_TYPING_START + 3300;
const DEMO_VIEW_START = DEMO_TYPING_END + 110;
const DEMO_VIEW_END = DEMO_VIEW_START + 800;
const DEMO_EXEC_START = DEMO_VIEW_START + 100;
const DEMO_EXEC_END = DEMO_EXEC_START + 2000;
const DEMO_SENT_START = DEMO_EXEC_END;
const DEMO_SENT_END = DEMO_SENT_START + 5340;
const DEMO_CARD_STAGGER0 = DEMO_SENT_START + 280;
const DEMO_RESOLVE_START = DEMO_SENT_END + 1000;
const DEMO_RESOLVE_END = DEMO_RESOLVE_START + 1600;
const DURATION_MS = DEMO_RESOLVE_END + 900;

const THREAD_SNIPPETS = [
  {
    source: "Support thread",
    quote: "Can I get a refund after the 14-day window if I never used the product?",
  },
  {
    source: "Community chat",
    quote: "Refund status says “processing” — how long does it usually take?",
  },
  {
    source: "Billing inbox",
    quote: "Is a partial refund possible if I upgraded by mistake?",
  },
  {
    source: "Support thread",
    quote: "I filed a chargeback—does that cancel my refund request?",
  },
  {
    source: "Community chat",
    quote: "Where do I check the refund reference / receipt?",
  },
  {
    source: "Support thread",
    quote: "Do you refund add-ons separately from the main subscription?",
  },
  {
    source: "Billing inbox",
    quote: "What counts as “used” for refund eligibility?",
  },
  {
    source: "Community chat",
    quote: "If payment failed then retried, can I still request a refund?",
  },
  {
    source: "Support thread",
    quote: "I received a partial refund—why is it not the full amount?",
  },
  {
    source: "Billing inbox",
    quote: "Refund declined—what are the valid exceptions?",
  },
  {
    source: "Support thread",
    quote: "How do I change the card used for the refund?",
  },
  {
    source: "Community chat",
    quote: "Is there a difference between cancellation and refund eligibility?",
  },
] as const;

const REFUND_THEMES = [
  { title: "Eligibility window", hits: 5 },
  { title: "Refund status & timeline", hits: 4 },
  { title: "Partial refunds", hits: 3 },
  { title: "Chargeback vs refund", hits: 2 },
] as const;

const KNOWLEDGE_UPDATES = [
  {
    title: "Refund policy · Eligibility & exceptions",
    cites: ["Feishu · #ops-refunds", "Discord · #support"],
  },
  {
    title: "Refund status · How to check + expected timeline",
    cites: ["Telegram · @community"],
  },
  {
    title: "Partial refunds · When and how we apply them",
    cites: ["Feishu · #billing"],
  },
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
  // Hide the chat quickly once the curtain begins.
  const inT = easeInOutCubic(clamp01(p / 0.05));
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

  const cameraIn = easeOutCubic(ramp(t, 0, 800));
  const introIn = easeOutCubic(ramp(t, 0, 680));
  const introOut = easeOutCubic(ramp(t, DEMO_INTRO_OUT_START, DEMO_INTRO_OUT_END));
  const introOpacity = clamp01(introIn * (1 - introOut));
  const introCardMotion = easeOutCubic(ramp(t, 90, 820));
  const typingT = easeOutCubic(ramp(t, DEMO_TYPING_START, DEMO_TYPING_END));
  const viewBlend = easeInOutCubic(ramp(t, DEMO_VIEW_START, DEMO_VIEW_END));
  const executing = ramp(t, DEMO_EXEC_START, DEMO_EXEC_END);
  const ingestProgress = ramp(t, DEMO_SENT_START, DEMO_SENT_END);
  const resolve = easeOutCubic(ramp(t, DEMO_RESOLVE_START, DEMO_RESOLVE_END));

  const curtainA = curtainOpacity(ramp(t, DEMO_CURTAIN_A_START, DEMO_CURTAIN_A_END));
  const curtainMask = curtainA;
  // Don't expose the chat UI under the intro/curtain.
  // We fade it in only after curtain A finishes.
  const chatGate = easeInOutCubic(
    ramp(t, DEMO_CURTAIN_A_END - 120, DEMO_CURTAIN_A_END + 180),
  );

  const prompt =
    "Scan this week’s threads on Feishu, Discord, and Telegram. Extract recurring refund questions, merge duplicates, and update our Lucius knowledge base with cited answers.";
  const typedCount = Math.floor(prompt.length * clamp01(typingT));
  const typed = prompt.slice(0, typedCount);

  const totalThreads = THREAD_SNIPPETS.length;

  // Three-phase learning arc, but using the same animation "grammar" as one_command:
  // Ingest threads → Cluster themes → Write knowledge updates.
  const ingestPhaseT = easeOutCubic(ramp(t, DEMO_SENT_START, DEMO_SENT_START + 2600));
  const clusterPhaseT = easeOutCubic(ramp(t, DEMO_SENT_START + 2350, DEMO_SENT_START + 5200));
  const writePhaseT = easeOutCubic(ramp(t, DEMO_SENT_START + 4950, DEMO_SENT_END));

  const ingestedThreads = Math.min(totalThreads, Math.floor(totalThreads * ingestPhaseT));
  const clusteredThemes = Math.min(REFUND_THEMES.length, Math.floor(REFUND_THEMES.length * clusterPhaseT));
  const draftedArticles = Math.min(KNOWLEDGE_UPDATES.length, Math.floor(KNOWLEDGE_UPDATES.length * writePhaseT));
  const showHeaderFooter = viewBlend > 0.06;
  const headerFooterOpacity = clamp01((viewBlend - 0.06) / 0.14);
  const isEmptyComposerSending =
    typingT >= 1 && viewBlend < 0.22 && viewBlend > 0.004;
  const showStreamingSpinner = executing > 0.18 && ingestProgress < 1;
  const historyAppear = easeOutCubic(
    ramp(t, DEMO_SENT_START + 420, DEMO_SENT_START + 1120),
  );
  const showHistory = historyAppear > 0.02;
  const historyIsPending = ingestProgress < 0.92;

  const learningStageLabel =
    ingestPhaseT < 0.98 ? "Ingesting" : clusterPhaseT < 0.98 ? "Clustering" : "Writing";

  const luciusStreamingLine = (() => {
    if (ingestPhaseT < 0.98) {
      return `Ingesting · ${ingestedThreads}/${totalThreads} threads captured`;
    }
    if (clusterPhaseT < 0.98) {
      return `Clustering · ${clusteredThemes}/${REFUND_THEMES.length} themes merged`;
    }
    return `Updating knowledge · ${draftedArticles}/${KNOWLEDGE_UPDATES.length} articles drafted`;
  })();

  // Banner should appear only after the last knowledge card finished its appear motion.
  const lastDocEnterStart = DEMO_SENT_START + 5700 + (KNOWLEDGE_UPDATES.length - 1) * 220;
  const doneBannerIn = easeOutCubic(ramp(t, lastDocEnterStart + 640, lastDocEnterStart + 1080));
  const showDoneBanner = draftedArticles >= KNOWLEDGE_UPDATES.length && writePhaseT > 0.98;

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
        <LearnConvCurtainKnowledgeGraphV3
          t={t}
          start={DEMO_CURTAIN_A_START}
          end={DEMO_CURTAIN_A_END}
          zIndex={11}
          threads={THREAD_SNIPPETS.slice(0, 3).map((s) => ({ source: s.source, quote: s.quote }))}
          themes={REFUND_THEMES.slice(0, 3).map((t) => ({ title: t.title, hits: t.hits }))}
          knowledge={KNOWLEDGE_UPDATES.slice(0, 3).map((k) => ({ title: k.title, cites: k.cites }))}
        />
        {introOpacity > 0.008 ? (
          <div
            className="vac-lfc-hero"
            aria-hidden="true"
            style={{
              opacity: introOpacity,
              transform: `translate3d(0, ${mix(14, 0, introIn) * (1 - introOut)}px, 0) scale(${mix(0.985, 1, introIn)})`,
            }}
          >
            <div className="vac-lfc-hero__wash" />
            <div
              className="vac-lfc-hero__card"
              style={{
                transform: `translate3d(0, ${mix(28, 0, introCardMotion)}px, 0) scale(${mix(0.94, 1, introCardMotion)})`,
              }}
            >
              <p className="vac-lfc-hero__kicker">Lucius · Client Agent</p>
              <h1 className="vac-lfc-hero__title">
                Turn chatter into{" "}
                <span className="vac-lfc-hero__title-accent">knowledge.</span>
              </h1>
              <p className="vac-lfc-hero__sub">
                Stop re-answering the same question everywhere—merge threads into one trusted source.
              </p>
              <div className="vac-lfc-hero__rule" />
            </div>
          </div>
        ) : null}
        {chatGate > 0.001 ? (
          <div
            className="dashboard-chat-shell"
            data-recording-clean-screen={runtime.clean ? "true" : "false"}
            style={{
              opacity: (1 - curtainMask) * chatGate,
              transform: `translate3d(0, ${mix(0, 10, curtainMask)}px, 0)`,
              filter: curtainMask > 0.02 ? `blur(${mix(0, 10, curtainMask)}px)` : undefined,
              pointerEvents: curtainMask > 0.35 || chatGate < 0.9 ? "none" : "auto",
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
                                Refund themes · knowledge base updated
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
                <div className="dashboard-chat-stage-header" style={{ opacity: headerFooterOpacity }}>
                  <div className="dashboard-chat-stage-header-inner">
                    <div className="dashboard-chat-stage-title-row">
                      <div className="dashboard-chat-stage-title-shell">
                        <p className="dashboard-chat-stage-title" title="Learns from conversations">
                          Learns from conversations
                        </p>
                      </div>
                      {executing > 0.25 && ingestProgress < 1 ? (
                        <span className="dashboard-chat-stage-status-pill" role="status" aria-live="polite">
                          <span>{learningStageLabel}</span>
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
                            <span className="text-[20px] leading-none">{p.icon}</span>
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
                            {luciusStreamingLine}
                            {showStreamingSpinner ? (
                              <Loader2
                                className="ml-2 inline-block h-4 w-4 animate-spin align-[-0.125em] text-[var(--dashboard-sidebar-active-bg)]"
                                aria-hidden
                              />
                            ) : null}
                          </p>

                          <div className="mt-4">
                            {ingestPhaseT < 0.98 ? (
                              <div className="grid grid-cols-2 gap-2">
                                {Array.from({ length: totalThreads }).map((_, idx) => {
                                  const done = idx < ingestedThreads;
                                  const snippet = THREAD_SNIPPETS[idx];
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
                                      aria-hidden={appearT < 0.08}
                                    >
                                      <div className="flex items-center justify-between gap-2">
                                        <span className="min-w-0 truncate text-[11px] font-semibold text-[var(--dashboard-text-muted)]">
                                          {snippet.source}
                                        </span>
                                        <span
                                          className={
                                            done
                                              ? "shrink-0 text-[11px] font-semibold text-[var(--dashboard-badge-success-text)]"
                                              : "shrink-0 text-[11px] font-semibold text-[var(--dashboard-text-muted)]"
                                          }
                                        >
                                          {done ? "Captured" : "Queued"}
                                        </span>
                                      </div>
                                      <p className="mt-1 line-clamp-2 text-[12px] font-semibold leading-[1.55] text-[var(--dashboard-text)]">
                                        “{snippet.quote}”
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : clusterPhaseT < 0.98 ? (
                              <div
                                style={{
                                  opacity: clamp01((clusterPhaseT - 0.06) / 0.2),
                                  transform: `translate3d(0, ${mix(12, 0, clamp01((clusterPhaseT - 0.06) / 0.2))}px, 0)`,
                                }}
                              >
                                <div className="grid grid-cols-2 gap-2">
                                  {REFUND_THEMES.map((theme, idx) => {
                                    const done = idx < clusteredThemes;
                                    const appearT = easeOutCubic(
                                      ramp(
                                        t,
                                        DEMO_SENT_START + 2800 + idx * 180,
                                        DEMO_SENT_START + 2800 + idx * 180 + 520,
                                      ),
                                    );
                                    return (
                                      <div
                                        key={theme.title}
                                        className="rounded-[10px] border border-[var(--dashboard-panel-border)] bg-white px-3 py-2"
                                        style={{
                                          opacity: appearT,
                                          transform: `translate3d(0, ${mix(10, 0, appearT)}px, 0)`,
                                        }}
                                        aria-hidden={appearT < 0.08}
                                      >
                                        <div className="flex items-center justify-between gap-2">
                                          <span className="min-w-0 truncate text-[12px] font-semibold text-[var(--dashboard-text)]">
                                            {theme.title}
                                          </span>
                                          <span className="shrink-0 text-[11px] font-semibold text-[var(--dashboard-text-muted)]">
                                            {theme.hits} threads
                                          </span>
                                        </div>
                                        <div className="mt-1 flex items-center justify-between gap-2">
                                          <span className="text-[11px] font-medium text-[var(--dashboard-text-muted)]">
                                            {done ? "Merged" : "Merging"}
                                          </span>
                                          <span
                                            className={
                                              done
                                                ? "text-[11px] font-semibold text-[var(--dashboard-badge-success-text)]"
                                                : "text-[11px] font-semibold text-[var(--dashboard-text-muted)]"
                                            }
                                          >
                                            {done ? "✓" : "…"}
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ) : (
                              <div
                                style={{
                                  opacity: clamp01((writePhaseT - 0.06) / 0.2),
                                  transform: `translate3d(0, ${mix(14, 0, clamp01((writePhaseT - 0.06) / 0.2))}px, 0)`,
                                }}
                              >
                                <div className="space-y-2">
                                  {KNOWLEDGE_UPDATES.map((k, idx) => {
                                    const done = idx < draftedArticles;
                                    const appearT = easeOutCubic(
                                      ramp(
                                        t,
                                        DEMO_SENT_START + 5700 + idx * 220,
                                        DEMO_SENT_START + 5700 + idx * 220 + 520,
                                      ),
                                    );
                                    return (
                                      <div
                                        key={k.title}
                                        className="rounded-[10px] border border-[var(--dashboard-panel-border)] bg-white px-3 py-2"
                                        style={{
                                          opacity: appearT,
                                          transform: `translate3d(0, ${mix(10, 0, appearT)}px, 0)`,
                                        }}
                                      >
                                        <div className="flex items-center justify-between gap-3">
                                          <span className="min-w-0 truncate text-[12px] font-semibold text-[var(--dashboard-text)]">
                                            {k.title}
                                          </span>
                                          <span
                                            className={
                                              done
                                                ? "shrink-0 text-[11px] font-semibold text-[var(--dashboard-badge-success-text)]"
                                                : "shrink-0 text-[11px] font-semibold text-[var(--dashboard-text-muted)]"
                                            }
                                          >
                                            {done ? "Drafted" : "Drafting"}
                                          </span>
                                        </div>
                                        <div className="mt-2 flex flex-wrap gap-1.5">
                                          {k.cites.map((c) => (
                                            <span
                                              key={c}
                                              className="rounded-[999px] border border-[var(--dashboard-panel-border)] bg-[rgb(247_247_251)] px-2 py-0.5 text-[10px] font-semibold text-[var(--dashboard-text-muted)]"
                                            >
                                              {c}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>

                          <div
                            className="mt-4 rounded-[10px] border border-[var(--dashboard-badge-success-border)] bg-[var(--dashboard-badge-success-bg)] px-3 py-2 text-[12px] font-semibold text-[var(--dashboard-badge-success-text)]"
                            style={{
                              opacity: showDoneBanner ? doneBannerIn : 0,
                              transform: `translate3d(0, ${mix(10, 0, doneBannerIn)}px, 0)`,
                            }}
                          >
                            ✓ Done · Knowledge base updated (with citations)
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>

              {showHeaderFooter ? (
                <div className="dashboard-chat-stage-footer" style={{ opacity: headerFooterOpacity }}>
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
                        <button type="button" className={composerIconButtonClass} aria-label="Upload">
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
        ) : null}
      </div>
    </main>
  );
}
