import type { CSSProperties, ReactNode } from "react";
import discordIcon from "../assets/discord-icon.svg";
import { ComposerBar } from "../components/ComposerBar";
import { DiscordNoiseCardStage } from "../components/DiscordNoiseCardStage";
import { DiscordAvatar } from "../components/DiscordAvatar";
import { NarrativeHeadline } from "../components/NarrativeHeadline";
import { ReactionBadge } from "../components/ReactionBadge";
import {
  CHANNELS,
  ENDING_STAGE_START_MS,
  FEATURE_MESSAGES,
  GENERAL_MESSAGES,
  HELP_MESSAGES,
  INTEREST_STAGE_END_MS,
  TOTAL_DURATION_MS,
  type MessageItem,
} from "../data/communityBlind";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function progressBetween(t: number, start: number, end: number): number {
  if (end <= start) {
    return t >= end ? 1 : 0;
  }

  return clamp((t - start) / (end - start), 0, 1);
}

function fadeWindow(t: number, start: number, enter: number, end: number, exit: number): number {
  const fadeIn = progressBetween(t, start, start + enter);
  const fadeOut = 1 - progressBetween(t, end - exit, end);
  return clamp(Math.min(fadeIn, fadeOut), 0, 1);
}

function easeOutQuint(value: number): number {
  const safeValue = clamp(value, 0, 1);
  return 1 - (1 - safeValue) ** 5;
}

function easeInOutCubic(value: number): number {
  const safeValue = clamp(value, 0, 1);

  if (safeValue < 0.5) {
    return 4 * safeValue ** 3;
  }

  return 1 - ((-2 * safeValue + 2) ** 3) / 2;
}

function buildFloodRevealTimes(
  count: number,
  startMs: number,
  normalGapMs: number,
  fastGapMs: number,
  normalDurationMs: number,
  accelerationDurationMs: number,
  curvePower: number,
  burstStartOffsetMs: number,
  burstCutBaseMs: number,
  burstCutScaleMs: number,
): number[] {
  if (count <= 0) {
    return [];
  }

  const revealTimes: number[] = [];
  let cursor = startMs;

  for (let index = 0; index < count; index += 1) {
    revealTimes.push(cursor);

    if (index === count - 1) {
      break;
    }

    const elapsedMs = cursor - startMs;
    let gap = fastGapMs;

    if (elapsedMs < normalDurationMs) {
      gap = normalGapMs;
    } else if (elapsedMs < normalDurationMs + accelerationDurationMs) {
      const accelerationProgress = progressBetween(
        elapsedMs,
        normalDurationMs,
        normalDurationMs + accelerationDurationMs,
      );
      gap = normalGapMs + (fastGapMs - normalGapMs) * accelerationProgress ** curvePower;
    }

    const burstProgress = progressBetween(
      elapsedMs,
      normalDurationMs + burstStartOffsetMs,
      normalDurationMs + accelerationDurationMs,
    );
    const burstCut =
      burstProgress > 0 && index % 3 === 2 ? burstCutBaseMs + burstProgress * burstCutScaleMs : 0;

    cursor += Math.max(fastGapMs, gap - burstCut);
  }

  return revealTimes;
}

function revealProgress(currentMs: number, startMs: number, durationMs: number): number {
  return progressBetween(currentMs, startMs, startMs + durationMs);
}

function getBubbleShellStyle(progress: number): CSSProperties {
  if (progress <= 0) {
    return {
      maxHeight: 0,
      marginBottom: 0,
      opacity: 0,
    };
  }

  const settled = easeOutQuint(progress);

  return {
    maxHeight: `${settled * 240}px`,
    marginBottom: `${settled * 18}px`,
    opacity: settled,
  };
}

function getBubbleStyle(progress: number): CSSProperties {
  const settled = easeOutQuint(progress);
  const translateY = (1 - settled) * 24;
  const scale = 0.96 + settled * 0.04;
  const blur = (1 - settled) * 5;

  return {
    opacity: settled,
    transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
    filter: `blur(${blur}px)`,
  };
}

function hasImportantContent(message: MessageItem): boolean {
  return message.emphasis === "warning" || message.body.includes("**");
}

function getImportantBubbleProgress(
  currentMs: number,
  revealStartMs: number,
  revealDurationMs: number,
  message: MessageItem,
): number {
  if (!hasImportantContent(message)) {
    return 0;
  }

  const transitionStartMs = revealStartMs + revealDurationMs + 120;
  const transitionEndMs = transitionStartMs + 860;
  return easeInOutCubic(progressBetween(currentMs, transitionStartMs, transitionEndMs));
}

function getTranscriptCardClassName(message: MessageItem, extraClassName?: string): string {
  return [
    "transcript-card",
    extraClassName,
    message.emphasis === "warning" ? "transcript-card--warning" : "",
    hasImportantContent(message) ? "transcript-card--important" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function getTranscriptCardToneStyle(alertProgress: number): CSSProperties {
  return {
    "--bubble-alert-progress": `${alertProgress}`,
  } as CSSProperties;
}

function formatMeta(hour: number, minute: number, elapsedSeconds: number): string {
  const totalMinutes = hour * 60 + minute + Math.floor(elapsedSeconds / 60);
  const displayHour = Math.floor(totalMinutes / 60) % 24;
  const displayMinute = totalMinutes % 60;
  return `${String(displayHour).padStart(2, "0")}:${String(displayMinute).padStart(2, "0")}`;
}

type FeedExpansionOptions = {
  targetCount: number;
  baseHour: number;
  baseMinute: number;
  authorPool: readonly string[];
  secondPattern: readonly number[];
  suffixes: readonly string[];
  reactionStep?: number;
};

function buildFloodMessages(
  baseMessages: readonly MessageItem[],
  options: FeedExpansionOptions,
): MessageItem[] {
  const {
    targetCount,
    baseHour,
    baseMinute,
    authorPool,
    secondPattern,
    suffixes,
    reactionStep = 2,
  } = options;
  const messages: MessageItem[] = [];
  let elapsedSeconds = 0;

  for (let index = 0; index < targetCount; index += 1) {
    const source = baseMessages[index % baseMessages.length];
    const cycle = Math.floor(index / baseMessages.length);
    const withSuffix = cycle > 0 && (index + cycle) % 2 === 0;
    const suffix = withSuffix ? ` ${suffixes[(index + cycle) % suffixes.length]}` : "";
    const author =
      cycle === 0
        ? source.author
        : authorPool[(index + cycle * 7) % authorPool.length];

    messages.push({
      ...source,
      author,
      body: `${source.body}${suffix}`,
      meta: formatMeta(baseHour, baseMinute, elapsedSeconds),
      reactions: source.reactions?.map((reaction, reactionIndex) => ({
        ...reaction,
        count: Math.max(8, reaction.count + cycle * reactionStep + ((index + reactionIndex) % 3) - 1),
      })),
    });

    elapsedSeconds += secondPattern[index % secondPattern.length];
  }

  return messages;
}

function renderFormattedBody(body: string): ReactNode[] {
  return body
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, index) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>
      ) : (
        <span key={`${part}-${index}`}>{part}</span>
      ),
    );
}

type StagePhase = "chaos" | "stuck" | "interest";

type PhaseCopy = {
  channelLabel: string;
  heroNote: string;
  composerPlaceholder: string;
  panelEyebrow: string;
  panelTitle: string;
  panelSubtitle: string;
  panelFacts: string[];
  metrics: Array<{
    label: string;
    value: string;
  }>;
};

type ServerItem = {
  id: string;
  label: string;
  accent: "primary" | "mint" | "coral" | "muted";
  active?: boolean;
  badge?: string;
  iconSrc?: string;
};

const SERVER_ITEMS: readonly ServerItem[] = [
  { id: "home", label: "Discord", accent: "primary", active: true, iconSrc: discordIcon },
  { id: "help", label: "HM", accent: "mint", badge: "9" },
  { id: "feature", label: "FR", accent: "coral", badge: "14" },
  { id: "plus", label: "+", accent: "muted" },
];

const GENERAL_AUTHOR_POOL = [
  "Aria",
  "Jonah",
  "Mila",
  "Reed",
  "Tori",
  "Gavin",
  "Luca",
  "Nora",
  "Quinn",
  "Sophie",
  "Miles",
  "Hazel",
  "Rowan",
  "Jules",
  "Ivy",
  "Asher",
] as const;

const HELP_AUTHOR_POOL = [
  "Harper",
  "Max",
  "Leo",
  "Aisha",
  "Dylan",
  "Skye",
  "Owen",
  "Vera",
  "Maddie",
  "Cole",
  "Iris",
  "Finn",
  "Rory",
  "Niko",
  "Carmen",
  "Blake",
] as const;

const FEATURE_AUTHOR_POOL = [
  "Bianca",
  "Ken",
  "Lily",
  "Ari",
  "Moe",
  "Dina",
  "Nate",
  "Pia",
  "Kian",
  "Rosa",
  "TheoP",
  "Sonia",
  "Ollie",
  "Jia",
  "Remy",
  "Talia",
] as const;

const GENERAL_SUFFIXES = [
  "I had to scroll back twice.",
  "This keeps getting buried.",
  "I am probably missing context again.",
  "Feels like the answer is in here somewhere.",
  "Hard to tell what is actually new.",
  "This is moving way too fast.",
] as const;

const HELP_SUFFIXES = [
  "Same symptom on our side.",
  "Posting in case this helps someone else.",
  "This looks like the same cluster again.",
  "Adding one more report here.",
  "Still blocked after retrying.",
  "Not sure where the real fix lives.",
] as const;

const FEATURE_SUFFIXES = [
  "That would save a ton of manual reading.",
  "This keeps coming up every week.",
  "Would use this immediately.",
  "Feels bigger than one thread.",
  "This deserves to be grouped with the others.",
  "The demand is clearly there.",
] as const;

const GENERAL_SEQUENCE = buildFloodMessages(GENERAL_MESSAGES, {
  targetCount: 76,
  baseHour: 10,
  baseMinute: 41,
  authorPool: GENERAL_AUTHOR_POOL,
  secondPattern: [11, 8, 10, 7, 9, 6],
  suffixes: GENERAL_SUFFIXES,
});

const HELP_SEQUENCE = buildFloodMessages(HELP_MESSAGES, {
  targetCount: 72,
  baseHour: 11,
  baseMinute: 2,
  authorPool: HELP_AUTHOR_POOL,
  secondPattern: [10, 7, 9, 6, 8, 5],
  suffixes: HELP_SUFFIXES,
});

const FEATURE_SEQUENCE = buildFloodMessages(FEATURE_MESSAGES, {
  targetCount: 60,
  baseHour: 12,
  baseMinute: 3,
  authorPool: FEATURE_AUTHOR_POOL,
  secondPattern: [12, 9, 10, 8, 7, 6],
  suffixes: FEATURE_SUFFIXES,
  reactionStep: 3,
});

const GENERAL_REVEAL_TIMES = buildFloodRevealTimes(
  GENERAL_SEQUENCE.length,
  2560,
  500,
  8,
  3000,
  2400,
  2.4,
  500,
  12,
  22,
);

const HELP_REVEAL_TIMES = buildFloodRevealTimes(
  HELP_SEQUENCE.length,
  11560,
  500,
  8,
  3000,
  2400,
  2.4,
  500,
  12,
  22,
);

const FEATURE_REVEAL_TIMES = buildFloodRevealTimes(
  FEATURE_SEQUENCE.length,
  20340,
  500,
  8,
  3000,
  2400,
  2.4,
  500,
  12,
  22,
);

const PHASE_COPY: Record<StagePhase, PhaseCopy> = {
  chaos: {
    channelLabel: "# general",
    heroNote: "Conversation is flowing fast, but repeated pain and scattered asks blur together.",
    composerPlaceholder: "Scroll more, still no clear read...",
    panelEyebrow: "Generic Stage 01",
    panelTitle: "Template Stage Alpha",
    panelSubtitle: "General chat feels alive, but nothing resolves into a stable signal you can act on.",
    panelFacts: [
      "Questions, memes, workarounds, and feature asks all share the same surface.",
      "The same blocker can reappear three times before anyone spots the pattern.",
      "Activity volume creates motion, not clarity.",
    ],
    metrics: [
      { label: "Unread bursts", value: "27" },
      { label: "Loose threads", value: "6" },
      { label: "Single read", value: "None" },
    ],
  },
  stuck: {
    channelLabel: "# help",
    heroNote: "The error repeats across users, but the thread stays fragmented and nobody owns the pattern.",
    composerPlaceholder: "Search for one answer that already exists...",
    panelEyebrow: "Generic Stage 02",
    panelTitle: "Template Stage Beta",
    panelSubtitle: "People are stuck on the same issue, yet each report still looks isolated when you scan the channel.",
    panelFacts: [
      "The 403 issue keeps returning with almost identical phrasing.",
      "Workarounds stay anecdotal instead of turning into a known cluster.",
      "The channel shows urgency, but not a consolidated read of the blocker.",
    ],
    metrics: [
      { label: "Repeated issue", value: "403 /connect" },
      { label: "Fresh reports", value: "5" },
      { label: "Resolution owner", value: "Missing" },
    ],
  },
  interest: {
    channelLabel: "# feature-requests",
    heroNote: "Interest is visible in reactions and replies, but excitement still lacks a clean summary or ranking.",
    composerPlaceholder: "Which request matters most right now?",
    panelEyebrow: "Generic Stage 03",
    panelTitle: "Template Stage Gamma",
    panelSubtitle: "The room is telling you what it wants, but the signal lives across reactions, replies, and scattered threads.",
    panelFacts: [
      "Requests with traction do not automatically become ranked themes.",
      "Strong reactions point to demand, but not why the request matters.",
      "What people care about is visible, yet still too manual to read.",
    ],
    metrics: [
      { label: "Top reaction", value: "44" },
      { label: "Signal cluster", value: "Scattered" },
      { label: "Theme confidence", value: "Low" },
    ],
  },
};

function getPhase(currentMs: number): StagePhase {
  if (currentMs >= 20200) {
    return "interest";
  }

  if (currentMs >= 11200) {
    return "stuck";
  }

  return "chaos";
}

function getChannelClass(channelName: string, phase: StagePhase): string {
  if (
    (phase === "chaos" && channelName === "general") ||
    (phase === "stuck" && channelName === "help") ||
    (phase === "interest" && channelName === "feature-requests")
  ) {
    return "channel-row channel-row--active";
  }

  if (phase === "stuck" && channelName === "feature-requests") {
    return "channel-row channel-row--watch";
  }

  if (phase === "interest" && channelName === "help") {
    return "channel-row channel-row--watch";
  }

  return "channel-row";
}

type CommunityBlindSceneProps = {
  currentMs: number;
};

export function CommunityBlindScene(props: Readonly<CommunityBlindSceneProps>) {
  const { currentMs } = props;
  const chaosStageStartMs = 2200;
  const stuckStageStartMs = 11200;
  const interestStageStartMs = 20200;
  const openingOpacity = fadeWindow(currentMs, 0, 700, 2200, 500);
  const chaosOpacity = fadeWindow(currentMs, chaosStageStartMs, 700, 11200, 700);
  const stuckOpacity = fadeWindow(currentMs, stuckStageStartMs, 700, 20200, 700);
  const interestOpacity = fadeWindow(currentMs, interestStageStartMs, 700, INTEREST_STAGE_END_MS, 700);
  const endingOpacity = fadeWindow(currentMs, ENDING_STAGE_START_MS, 500, TOTAL_DURATION_MS, 0);

  const searchPulse = 0.42 + Math.sin(currentMs / 260) * 0.22;
  const phase = getPhase(currentMs);
  const phaseCopy = PHASE_COPY[phase];
  const questionDelayMs = 3600;
  const questionFadeMs = 520;
  const chaosQuestionOpacity =
    chaosOpacity *
    progressBetween(
      currentMs,
      chaosStageStartMs + questionDelayMs,
      chaosStageStartMs + questionDelayMs + questionFadeMs,
    );
  const stuckQuestionOpacity =
    stuckOpacity *
    progressBetween(
      currentMs,
      stuckStageStartMs + questionDelayMs,
      stuckStageStartMs + questionDelayMs + questionFadeMs,
    );
  const interestQuestionOpacity =
    interestOpacity *
    progressBetween(
      currentMs,
      interestStageStartMs + questionDelayMs,
      interestStageStartMs + questionDelayMs + questionFadeMs,
    );
  return (
    <div className="scene-root">
      <div className="scene-backdrop" />

      <NarrativeHeadline
        className="scene-opening-headline"
        opacity={openingOpacity}
        text="Your community never stops talking."
        visible={openingOpacity > 0.02}
      />

      <div
        className="community-stage"
        style={{
          opacity: Math.max(chaosOpacity, stuckOpacity, interestOpacity) * (1 - endingOpacity * 0.86),
          transform: "translate3d(0, 0, 0)",
        }}
      >
        <div className="community-shell">
          <aside className="server-rail" aria-label="Servers">
            {SERVER_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={item.active ? "server-slot server-slot--active" : "server-slot"}
                title={item.label}
              >
                <span className={item.active ? "server-slot__pill server-slot__pill--active" : "server-slot__pill"} />
                <span className={`server-slot__icon server-slot__icon--${item.accent}`}>
                  {item.iconSrc ? <img className="server-slot__svg" src={item.iconSrc} alt="" aria-hidden="true" /> : item.label}
                </span>
                {item.badge ? <span className="server-slot__badge">{item.badge}</span> : null}
              </button>
            ))}
          </aside>

          <aside className="channel-rail" aria-label="Community channels">
            <div className="channel-rail__header">
              <div>
                <p className="channel-rail__eyebrow">Community Grid</p>
                <h2>Pulse Board</h2>
              </div>
              <button type="button" className="tool-button tool-button--ghost" aria-label="Add view" />
            </div>

            <label className="channel-rail__search">
              <span>Search channels</span>
              <span className="channel-rail__cursor" style={{ opacity: searchPulse }} />
            </label>

            <p className="channel-rail__section-label">Active Threads</p>
            <div className="channel-rail__list">
              {CHANNELS.map((channel) => (
                <div key={channel.name} className={getChannelClass(channel.name, phase)}>
                  <span className="channel-row__meta">
                    <span className="channel-row__hash">#</span>
                    <span className="channel-row__name">{channel.name}</span>
                  </span>
                  <span className="channel-row__unread">{channel.unread}</span>
                </div>
              ))}
            </div>
          </aside>

          <section className="chat-column" aria-label="Community transcript">
            <header className="chat-header">
              <div className="chat-header__left">
                <span className="chat-header__channel">{phaseCopy.channelLabel}</span>
                <span className="chat-header__divider" />
                <span className="chat-header__subtitle">{phaseCopy.heroNote}</span>
              </div>
            </header>

            <div className="transcript-pane">
              <div className="transcript-pane__inner">
                <div className="transcript-surface">
                  <div
                    className="transcript-layer"
                    style={{
                      opacity: chaosOpacity,
                    }}
                  >
                    <div className="transcript-layer__stack">
                      {GENERAL_SEQUENCE.map((message, index) => {
                        const revealStartMs = GENERAL_REVEAL_TIMES[index];
                        const revealDurationMs = 220;
                        const progress = revealProgress(currentMs, revealStartMs, revealDurationMs);
                        const alertProgress = getImportantBubbleProgress(
                          currentMs,
                          revealStartMs,
                          revealDurationMs,
                          message,
                        );

                        return (
                          <div
                            className="transcript-row-shell"
                            key={`${message.author}-${message.meta}-${index}`}
                            style={getBubbleShellStyle(progress)}
                          >
                            <div className="transcript-row" style={getBubbleStyle(progress)}>
                              <DiscordAvatar name={message.author} size={42} />
                              <div
                                className={getTranscriptCardClassName(message)}
                                style={getTranscriptCardToneStyle(alertProgress)}
                              >
                                <div className="transcript-card__meta">
                                  <strong>{message.author}</strong>
                                  <span>{message.meta}</span>
                                </div>
                                <p className="transcript-card__text">{renderFormattedBody(message.body)}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div
                    className="transcript-layer transcript-layer--focus"
                    style={{
                      opacity: stuckOpacity,
                    }}
                  >
                    <div className="transcript-layer__stack">
                      {HELP_SEQUENCE.map((message, index) => {
                        const revealStartMs = HELP_REVEAL_TIMES[index];
                        const revealDurationMs = 220;
                        const progress = revealProgress(currentMs, revealStartMs, revealDurationMs);
                        const alertProgress = getImportantBubbleProgress(
                          currentMs,
                          revealStartMs,
                          revealDurationMs,
                          message,
                        );

                        return (
                          <div
                            className="transcript-row-shell"
                            key={`${message.author}-${message.meta}-${index}`}
                            style={getBubbleShellStyle(progress)}
                          >
                            <div className="transcript-row" style={getBubbleStyle(progress)}>
                              <DiscordAvatar name={message.author} size={42} />
                              <div
                                className={getTranscriptCardClassName(message)}
                                style={getTranscriptCardToneStyle(alertProgress)}
                              >
                                <div className="transcript-card__meta">
                                  <strong>{message.author}</strong>
                                  <span>{message.meta}</span>
                                </div>
                                <p className="transcript-card__text">{renderFormattedBody(message.body)}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div
                    className="transcript-layer transcript-layer--focus"
                    style={{
                      opacity: interestOpacity,
                    }}
                  >
                    <div className="transcript-layer__stack">
                      {FEATURE_SEQUENCE.map((message, index) => {
                        const revealStartMs = FEATURE_REVEAL_TIMES[index];
                        const revealDurationMs = 210;
                        const progress = revealProgress(currentMs, revealStartMs, revealDurationMs);
                        const alertProgress = getImportantBubbleProgress(
                          currentMs,
                          revealStartMs,
                          revealDurationMs,
                          message,
                        );

                        return (
                          <div
                            className="transcript-row-shell"
                            key={`${message.author}-${message.meta}-${index}`}
                            style={getBubbleShellStyle(progress)}
                          >
                            <div className="transcript-row" style={getBubbleStyle(progress)}>
                              <DiscordAvatar
                                name={message.author}
                                size={42}
                                variant={index % 3 === 0 ? "violet" : index % 3 === 1 ? "mint" : "sunset"}
                              />
                              <div
                                className={getTranscriptCardClassName(message, "transcript-card--feature")}
                                style={getTranscriptCardToneStyle(alertProgress)}
                              >
                                <div className="transcript-card__meta">
                                  <strong>{message.author}</strong>
                                  <span>{message.meta}</span>
                                  <em>high traction</em>
                                </div>
                                <p className="transcript-card__text">{renderFormattedBody(message.body)}</p>
                                {message.reactions?.length ? (
                                  <div className="transcript-card__reactions">
                                    {message.reactions.map((reaction) => (
                                      <ReactionBadge
                                        key={`${message.author}-${reaction.emoji}-${reaction.count}`}
                                        count={reaction.count}
                                        emoji={reaction.emoji}
                                        hot={reaction.hot}
                                      />
                                    ))}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <NarrativeHeadline
                    className="transcript-question transcript-question--chaos"
                    opacity={chaosQuestionOpacity}
                    text="Template Headline 1?"
                    visible={chaosQuestionOpacity > 0.02}
                  />
                  <NarrativeHeadline
                    className="transcript-question transcript-question--stuck"
                    opacity={stuckQuestionOpacity}
                    text="Template Headline 2?"
                    visible={stuckQuestionOpacity > 0.02}
                  />
                  <NarrativeHeadline
                    className="transcript-question transcript-question--interest"
                    opacity={interestQuestionOpacity}
                    text="Template Headline 3?"
                    visible={interestQuestionOpacity > 0.02}
                  />
                </div>
              </div>
            </div>

            <ComposerBar placeholder={phaseCopy.composerPlaceholder} />
          </section>

          <aside className="info-panel" aria-label="Blind spot context">
            <div className="info-panel__card info-panel__card--hero">
              <p className="info-panel__eyebrow">{phaseCopy.panelEyebrow}</p>
              <h3>{phaseCopy.panelTitle}</h3>
              <p>{phaseCopy.panelSubtitle}</p>
            </div>

            <div className="info-panel__card">
              <p className="info-panel__eyebrow">What you still miss</p>
              <ul className="info-panel__list">
                {phaseCopy.panelFacts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </div>

            <div className="info-panel__card info-panel__card--dense">
              <p className="info-panel__eyebrow">Signal Notes</p>
              <div className="info-panel__metrics">
                {phaseCopy.metrics.map((metric) => (
                  <div key={metric.label}>
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

      </div>

      <DiscordNoiseCardStage currentMs={currentMs} />
    </div>
  );
}

