import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  Bell,
  BookOpen,
  Check,
  CircleDot,
  MessageCircle,
  Search,
  Send,
  ShieldAlert,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import discordLogo from "./assets/discord.svg";
import luciusLogo from "./assets/lucius-logo-mark.svg";
import selfAvatar from "./assets/avatars/self-avatar.png";
import averyAvatar from "./assets/avatars/portrait-3.png";
import chrisAvatar from "./assets/avatars/portrait-4.png";
import minaAvatar from "./assets/avatars/portrait-1.png";
import noahAvatar from "./assets/avatars/portrait-2.png";
import raeAvatar from "./assets/avatars/portrait-5.png";

const THEME = {
  primaryColor: "#6f7cff",
  bgColor: "#080a12",
  fgColor: "#f6f8ff",
  accentMint: "#4adeb2",
  warningColor: "#ff9f6e",
  dangerColor: "#ff6b72",
  animSpeed: "1",
  copy: {
    title: "Work in chat.",
    subtitle: "No extra system.",
  },
} as const;

const TOTAL_DURATION_MS = 24000;
const SIGNAL_START_MS = 3200;
const COMMAND_START_MS = 8200;
const COMMAND_END_MS = 12200;
const EXEC_START_MS = 12800;
const EXEC_END_MS = 19000;
const FINAL_START_MS = 19000;
const SIGNAL_SLOT_PX = 142;
const SIGNAL_WINDOW_PX = 432;
const SIGNAL_BOTTOM_Y = SIGNAL_WINDOW_PX - SIGNAL_SLOT_PX;
const SIGNAL_POP_MS = 420;
const SIGNAL_INTERVAL_MS = 900;

type SignalTone = "ad" | "complaint" | "lead" | "kb";

type SignalItem = {
  author: string;
  channel: string;
  body: string;
  tag: string;
  tone: SignalTone;
  at: number;
  avatar: string;
};

type ActionItem = {
  label: string;
  detail: string;
  metric: string;
  icon: "support" | "community" | "lead" | "kb";
};

const SIGNALS: readonly SignalItem[] = [
  {
    author: "Mina",
    channel: "#support",
    body: "Pricing questions keep repeating.",
    tag: "Repeated question",
    tone: "kb",
    at: SIGNAL_START_MS,
    avatar: minaAvatar,
  },
  {
    author: "Noah",
    channel: "#community",
    body: "The same spam promo is back.",
    tag: "Spam",
    tone: "ad",
    at: SIGNAL_START_MS + SIGNAL_INTERVAL_MS,
    avatar: noahAvatar,
  },
  {
    author: "Avery",
    channel: "#feedback",
    body: "New users get stuck inviting teammates.",
    tag: "User complaint",
    tone: "complaint",
    at: SIGNAL_START_MS + SIGNAL_INTERVAL_MS * 2,
    avatar: averyAvatar,
  },
  {
    author: "Chris",
    channel: "#sales",
    body: "Enterprise permissions questions look like a lead.",
    tag: "Buying intent",
    tone: "lead",
    at: SIGNAL_START_MS + SIGNAL_INTERVAL_MS * 3,
    avatar: chrisAvatar,
  },
  {
    author: "Rae",
    channel: "#support",
    body: "This answer belongs in the knowledge base.",
    tag: "Knowledge gap",
    tone: "kb",
    at: SIGNAL_START_MS + SIGNAL_INTERVAL_MS * 4,
    avatar: raeAvatar,
  },
];

const ACTIONS: readonly ActionItem[] = [
  {
    label: "Support reply",
    detail: "Merge repeated questions into one clear answer",
    metric: "8 users covered",
    icon: "support",
  },
  {
    label: "Community moderation",
    detail: "Hide the spam account and log the reason",
    metric: "2 posts removed",
    icon: "community",
  },
  {
    label: "Lead tracking",
    detail: "Tag enterprise-access intent and notify sales",
    metric: "3 leads tagged",
    icon: "lead",
  },
  {
    label: "Knowledge-base update",
    detail: "Turn the latest answer into an FAQ entry",
    metric: "1 article updated",
    icon: "kb",
  },
];

const CHANNELS = [
  { name: "support", unread: 12 },
  { name: "community", unread: 7 },
  { name: "feedback", unread: 18 },
  { name: "sales", unread: 5 },
  { name: "knowledge-base", unread: 3 },
] as const;

const COMMAND = "Lucius, handle these across support, community, sales, and KB.";

type RuntimeOptions = {
  clean: boolean;
  loop: boolean;
  speed: number;
  frameMs: number | null;
};

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function progress(t: number, start: number, end: number) {
  return clamp01((t - start) / Math.max(1, end - start));
}

function easeOutCubic(value: number) {
  return 1 - (1 - clamp01(value)) ** 3;
}

function easeInOutCubic(value: number) {
  const safe = clamp01(value);
  return safe < 0.5 ? 4 * safe ** 3 : 1 - ((-2 * safe + 2) ** 3) / 2;
}

function mix(a: number, b: number, amount: number) {
  return a + (b - a) * amount;
}

function fadeWindow(t: number, start: number, enter: number, end: number, exit: number) {
  const fadeIn = progress(t, start, start + enter);
  const fadeOut = 1 - progress(t, end - exit, end);
  return clamp01(Math.min(fadeIn, fadeOut));
}

function bubblePop(t: number, start: number) {
  return easeOutCubic(progress(t, start, start + SIGNAL_POP_MS));
}

function getQueryBool(name: string, defaultValue: boolean) {
  const value = new URLSearchParams(window.location.search).get(name);
  if (value == null) return defaultValue;
  if (value === "1" || value.toLowerCase() === "true") return true;
  if (value === "0" || value.toLowerCase() === "false") return false;
  return defaultValue;
}

function getQueryNumber(name: string, defaultValue: number) {
  const value = new URLSearchParams(window.location.search).get(name);
  if (value == null) return defaultValue;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : defaultValue;
}

function useRuntimeOptions(): RuntimeOptions {
  return useMemo(
    () => {
      const requestedFrame = getQueryNumber("frame", Number.NaN);
      return {
        clean: getQueryBool("clean", false),
        loop: getQueryBool("loop", true),
        speed: Math.max(0.1, Math.min(3, getQueryNumber("speed", 1))),
        frameMs: Number.isFinite(requestedFrame) ? Math.max(0, Math.min(TOTAL_DURATION_MS, requestedFrame)) : null,
      };
    },
    [],
  );
}

function useTimeline(options: RuntimeOptions) {
  const [time, setTime] = useState(options.frameMs ?? 0);
  const timeRef = useRef(options.frameMs ?? 0);
  const playingRef = useRef(true);

  useEffect(() => {
    if (options.frameMs != null) {
      timeRef.current = options.frameMs;
      setTime(options.frameMs);
      return;
    }

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const delta = Math.min(100, Math.max(0, now - last));
      last = now;

      if (playingRef.current) {
        const next = timeRef.current + delta * options.speed;
        if (next >= TOTAL_DURATION_MS) {
          timeRef.current = options.loop ? 0 : TOTAL_DURATION_MS;
          playingRef.current = options.loop;
        } else {
          timeRef.current = next;
        }
        setTime(timeRef.current);
      }

      if (options.loop || timeRef.current < TOTAL_DURATION_MS) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [options.frameMs, options.loop, options.speed]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === " ") {
        event.preventDefault();
        playingRef.current = !playingRef.current;
      }
      if (key === "r") {
        timeRef.current = 0;
        playingRef.current = true;
        setTime(0);
      }
    };

    if (options.frameMs != null) {
      return;
    }

    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [options.frameMs]);

  return time;
}

function getSignalIcon(tone: SignalTone) {
  if (tone === "ad") return <ShieldAlert size={16} />;
  if (tone === "complaint") return <Bell size={16} />;
  if (tone === "lead") return <Target size={16} />;
  return <BookOpen size={16} />;
}

function getActionIcon(icon: ActionItem["icon"]) {
  if (icon === "support") return <MessageCircle size={18} />;
  if (icon === "community") return <Users size={18} />;
  if (icon === "lead") return <Target size={18} />;
  return <BookOpen size={18} />;
}

function percentLabel(value: number) {
  return `${Math.round(clamp01(value) * 100)}%`;
}

export function App() {
  const runtime = useRuntimeOptions();
  const t = useTimeline(runtime);

  const intro = fadeWindow(t, 0, 700, 3200, 520);
  const commandStage = fadeWindow(t, 7600, 620, 13200, 700);
  const execStage = fadeWindow(t, 12200, 600, 19800, 740);
  const finalStage = fadeWindow(t, FINAL_START_MS, 650, TOTAL_DURATION_MS, 0);
  const shellDim = finalStage * 0.64;
  const typedProgress = easeInOutCubic(progress(t, COMMAND_START_MS, COMMAND_END_MS));
  const typedCommand = COMMAND.slice(0, Math.floor(COMMAND.length * typedProgress));
  const sent = progress(t, COMMAND_END_MS + 220, COMMAND_END_MS + 620);
  const signalStageExit = easeInOutCubic(progress(t, COMMAND_START_MS - 260, COMMAND_START_MS + 620));
  const activeSignalCount = SIGNALS.filter((item) => t >= item.at).length;
  const completedActionCount = ACTIONS.filter((_, index) => {
    const actionStart = EXEC_START_MS + index * 760;
    return progress(t, actionStart, actionStart + 1700) >= 0.94;
  }).length;

  return (
    <main
      className="demo-root"
      style={
        {
          "--theme-primary": THEME.primaryColor,
          "--theme-bg": THEME.bgColor,
          "--theme-fg": THEME.fgColor,
          "--theme-mint": THEME.accentMint,
          "--theme-warning": THEME.warningColor,
          "--theme-danger": THEME.dangerColor,
        } as CSSProperties
      }
    >
      <div className="ambient ambient--violet" />
      <div className="ambient ambient--mint" />

      <section
        className="workspace"
        style={{
          opacity: mix(0.82, 1, easeOutCubic(progress(t, 500, 1200))) * (1 - shellDim),
          filter: shellDim > 0.02 ? `blur(${mix(0, 7, shellDim)}px)` : undefined,
          transform: `scale(${mix(1, 0.985, shellDim)})`,
        }}
      >
        <aside className="server-rail" aria-label="Server rail">
          <div className="server server--active">
            <img src={discordLogo} alt="Discord" />
          </div>
          <div className="server">C</div>
          <div className="server">G</div>
          <div className="server server--muted">+</div>
        </aside>

        <aside className="channel-rail" aria-label="Channels">
          <div className="brand-block">
            <p>Lucius workspace</p>
            <h2>Growth Ops</h2>
          </div>
          <label className="search-box">
            <Search size={15} />
            <span>Search inside context</span>
          </label>
          <div className="channel-list">
            {CHANNELS.map((channel, index) => (
              <div
                className={index === Math.min(activeSignalCount, CHANNELS.length - 1) ? "channel active" : "channel"}
                key={channel.name}
              >
                <span># {channel.name}</span>
                <strong>{channel.unread + Math.max(0, activeSignalCount - index)}</strong>
              </div>
            ))}
          </div>
        </aside>

        <section className="chat-pane" aria-label="Channel transcript">
          <header className="chat-header">
            <div>
              <p># support-community</p>
              <h1>Same channel. Same context.</h1>
            </div>
            <div className="live-chip">
              <CircleDot size={14} />
              Lucius active
            </div>
          </header>

          <div className={sent > 0.18 ? "message-stream message-stream--execution" : "message-stream"}>
            <div
              className="signal-window"
              style={{
                opacity: 1 - signalStageExit,
                transform: `translate3d(0, ${mix(0, -24, signalStageExit)}px, 0)`,
              }}
            >
              <div className="signal-track">
                {SIGNALS.map((signal, index) => {
                  const reveal = bubblePop(t, signal.at);
                  const focus = progress(t, signal.at + 280, signal.at + 900);
                  const newerSignalPush = SIGNALS.slice(index + 1).reduce(
                    (total, nextSignal) => total + bubblePop(t, nextSignal.at),
                    0,
                  );
                  const y = SIGNAL_BOTTOM_Y - newerSignalPush * SIGNAL_SLOT_PX;
                  const edgeFade =
                    clamp01((y + SIGNAL_SLOT_PX * 0.72) / (SIGNAL_SLOT_PX * 0.72)) *
                    clamp01((SIGNAL_WINDOW_PX - y) / 92);

                  return (
                    <article
                      className={`message message--signal message--${signal.tone}`}
                      key={`${signal.author}-${signal.at}`}
                      style={{
                        opacity: reveal * edgeFade,
                        transform: `translate3d(0, ${y + mix(14, 0, reveal)}px, 0) scale(${mix(0.965, 1, reveal)})`,
                      }}
                    >
                      <div className="avatar avatar--image">
                        <img src={signal.avatar} alt={signal.author} />
                      </div>
                      <div className="message-body">
                        <div className="message-meta">
                          <strong>{signal.author}</strong>
                          <span>{signal.channel}</span>
                          <em>{`10:${42 + index}`}</em>
                        </div>
                        <p>{signal.body}</p>
                        <div className="signal-tag" style={{ opacity: mix(0.72, 1, focus) }}>
                          {getSignalIcon(signal.tone)}
                          <span>{signal.tag}</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="conversation-stage">
              <article
                className="message message--command"
                style={{
                  opacity: sent,
                  transform: `translate3d(0, ${mix(18, 0, easeOutCubic(sent))}px, 0)`,
                }}
              >
                <div className="avatar avatar--self avatar--image">
                  <img src={selfAvatar} alt="Phil" />
                </div>
                <div className="message-body">
                  <div className="message-meta">
                    <strong>Phil</strong>
                    <span>#support-community</span>
                    <em>now</em>
                  </div>
                  <p>{COMMAND}</p>
                </div>
              </article>

              <article
                className="message message--lucius"
                style={{
                  opacity: execStage,
                  transform: `translate3d(0, ${mix(16, 0, easeOutCubic(execStage))}px, 0)`,
                }}
              >
                <div className="avatar avatar--bot avatar--logo">
                  <img src={luciusLogo} alt="Lucius" />
                </div>
                <div className="message-body">
                  <div className="message-meta">
                    <strong>Lucius</strong>
                    <span>execution summary</span>
                    <em>now</em>
                  </div>
                  <p>Handled in-channel: replies, moderation, leads, and KB.</p>
                </div>
              </article>
            </div>
          </div>

          <div className="composer">
            <button type="button" aria-label="Attach">
              <Sparkles size={18} />
            </button>
            <div className="composer-input">
              <span>{typedCommand}</span>
              {typedProgress < 1 && commandStage > 0.25 ? <i /> : null}
            </div>
            <button className={typedProgress > 0.96 ? "send active" : "send"} type="button" aria-label="Send">
              <Send size={18} />
            </button>
          </div>
        </section>

        <aside className={execStage > 0.08 ? "agent-panel agent-panel--execution" : "agent-panel"} aria-label="Lucius agent panel">
          <div className="agent-hero">
            <div className="agent-mark">
              <img src={luciusLogo} alt="Lucius" />
            </div>
            <p>Lucius Agent</p>
            <h3>Always sensing inside the channel</h3>
          </div>

          <div className="metric-grid">
            <div>
              <span>Signals</span>
              <strong>{activeSignalCount}</strong>
            </div>
            <div>
              <span>Actions</span>
              <strong>{completedActionCount}</strong>
            </div>
          </div>

          <div className="sensing-list">
            {SIGNALS.map((signal) => {
              const seen = t >= signal.at;
              return (
                <div className={seen ? `sensing-row sensing-row--${signal.tone} seen` : "sensing-row"} key={signal.tag}>
                  {getSignalIcon(signal.tone)}
                  <span>{signal.tag}</span>
                  <Check size={14} />
                </div>
              );
            })}
          </div>

          <div className="action-stack">
            {ACTIONS.map((action, index) => {
              const actionStart = EXEC_START_MS + index * 760;
              const actionProgress = easeOutCubic(progress(t, actionStart, actionStart + 1700));
              return (
                <div
                  className={actionProgress > 0.94 ? "action-card done" : "action-card"}
                  key={action.label}
                  style={{
                    opacity: execStage > 0.06 ? mix(0.42, 1, actionProgress) : 0,
                    transform: `translate3d(0, ${mix(16, 0, actionProgress)}px, 0)`,
                  }}
                >
                  <div className="action-icon">{getActionIcon(action.icon)}</div>
                  <div className="action-copy">
                    <strong>{action.label}</strong>
                    <span>{action.detail}</span>
                    <div className="action-progress">
                      <i style={{ transform: `scaleX(${actionProgress})` }} />
                    </div>
                  </div>
                  <em>{actionProgress > 0.94 ? action.metric : percentLabel(actionProgress)}</em>
                </div>
              );
            })}
          </div>
        </aside>
      </section>

      {intro > 0.02 ? (
        <section
          className="headline-layer"
          style={{
            opacity: intro,
            transform: `translate3d(0, ${mix(18, 0, easeOutCubic(intro))}px, 0)`,
          }}
        >
          <p>ZERO SWITCHING COST</p>
          <h2>{THEME.copy.title}</h2>
          <span>{THEME.copy.subtitle}</span>
        </section>
      ) : null}

      {finalStage > 0.02 ? (
        <section
          className="final-layer"
          style={{
            opacity: finalStage,
            transform: `translate3d(0, ${mix(22, 0, easeOutCubic(finalStage))}px, 0)`,
          }}
        >
          <p>Lucius Client Agent</p>
          <h2>Zero switching cost.</h2>
          <h3>One channel. One context.</h3>
          <div className="final-metrics">
            <span>0 extra systems</span>
            <span>1 agent</span>
            <span>always sensing</span>
          </div>
        </section>
      ) : null}

      {!runtime.clean ? (
        <div className="preview-hud">
          <span>short-asset-zero-switch-agent</span>
          <span>{(t / 1000).toFixed(1)}s / {(TOTAL_DURATION_MS / 1000).toFixed(0)}s</span>
          <span>Space pause, R replay</span>
        </div>
      ) : null}
    </main>
  );
}
