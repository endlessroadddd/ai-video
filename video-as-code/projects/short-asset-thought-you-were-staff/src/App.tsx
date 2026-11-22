import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

const DURATION_MS = 9600;
const SCREEN_FREEZE_TIMES = [1480, 3520, 5170, 6320, 7920, 9560] as const;

const QUESTION = "Also, your product is really good. Why did you build it?";
const ANSWER_LEAD = "Haha, thank you.";
const ANSWER_MAIN =
  "We kept seeing the same support questions, so we built the product we wished we'd had.";
const ACK = "That makes a lot of sense.";
const PRAISE = "You've been incredibly helpful. What's your name? I want to tell your team.";
const REVEAL = "I'm Lucius, actually. Not a human agent, but thank you.";
const WOW = "Wow.";
const SUMMARY = "Support that feels human. No handoff required.";
const CONTEXT_LUCIUS = "Issue closed on your side. Glad we could fix that.";
const CONTEXT_USER_OK = "Yes, everything is working now.";
const CONTEXT_USER_THANKS = "Thanks for getting that sorted so quickly.";

const EMOJI_ASSET_BASE_URL = "https://fonts.gstatic.com/s/e/notoemoji/latest";
const THINKING_EMOJI_CODEPOINT = "1f914";
const WOW_EMOJI_CODEPOINT = "1f62e";

const FALLBACK_EMOJI_BY_CODEPOINT: Record<string, string> = {
  "1f914": "🤔",
  "1f62e": "😮",
};

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function ramp(value: number, start: number, end: number) {
  return clamp01((value - start) / Math.max(1, end - start));
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - clamp01(value), 3);
}

function easeInOutCubic(value: number) {
  const x = clamp01(value);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function typeSlice(text: string, progress: number) {
  return text.slice(0, Math.round(text.length * clamp01(progress)));
}

function parseFreezeTime() {
  const params = new URLSearchParams(window.location.search);
  const screen = Number(params.get("screen"));

  if (!Number.isFinite(screen) || screen < 1 || screen > SCREEN_FREEZE_TIMES.length) {
    return null;
  }

  return SCREEN_FREEZE_TIMES[screen - 1];
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  return prefersReducedMotion;
}

type AnimatedEmojiProps = {
  codepoint: string;
  size?: number;
  className?: string;
  reducedMotion?: boolean;
};

function getEmojiAssetUrl(codepoint: string, assetName: string) {
  return `${EMOJI_ASSET_BASE_URL}/${codepoint}/${assetName}`;
}

function AnimatedEmoji({
  codepoint,
  size = 18,
  className,
  reducedMotion = false,
}: AnimatedEmojiProps) {
  const [loadFailed, setLoadFailed] = useState(false);
  const fallbackGlyph = FALLBACK_EMOJI_BY_CODEPOINT[codepoint] ?? "🙂";

  if (loadFailed) {
    return (
      <span
        className={["animated-emoji", "animated-emoji--fallback", className].filter(Boolean).join(" ")}
        style={{ "--animated-emoji-size": `${size}px` } as CSSProperties}
        aria-hidden="true"
      >
        {fallbackGlyph}
      </span>
    );
  }

  const staticSvgUrl = getEmojiAssetUrl(codepoint, "emoji.svg");
  const animatedGifUrl = getEmojiAssetUrl(codepoint, "512.gif");
  const animatedWebpUrl = getEmojiAssetUrl(codepoint, "512.webp");

  return (
    <span
      className={["animated-emoji", className].filter(Boolean).join(" ")}
      style={{ "--animated-emoji-size": `${size}px` } as CSSProperties}
      aria-hidden="true"
    >
      {reducedMotion ? (
        <img src={staticSvgUrl} alt="" loading="eager" decoding="async" onError={() => setLoadFailed(true)} />
      ) : (
        <picture>
          <source srcSet={animatedWebpUrl} type="image/webp" />
          <img src={animatedGifUrl} alt="" loading="eager" decoding="async" onError={() => setLoadFailed(true)} />
        </picture>
      )}
    </span>
  );
}

type BubbleProps = {
  align: "left" | "right";
  tone: "lucius" | "user" | "neutral";
  text: string;
  reveal: number;
  textProgress?: number;
  subdued?: boolean;
  compact?: boolean;
  emojiCodepoint?: string;
  reducedMotion?: boolean;
};

type TranscriptEntry = {
  id: string;
  speaker: "lucius" | "user";
  text: string;
  reveal: number;
  textProgress?: number;
  subdued?: boolean;
  compact?: boolean;
  emojiCodepoint?: string;
};

function ChatBubble({
  align,
  tone,
  text,
  reveal,
  textProgress = 1,
  subdued = false,
  compact = false,
  emojiCodepoint,
  reducedMotion = false,
}: BubbleProps) {
  if (reveal <= 0.01) {
    return null;
  }

  const typed = typeSlice(text, textProgress);
  const content = typed.length > 0 ? typed : " ";

  return (
    <div
      className={[
        "thread-bubble",
        `thread-bubble--${align}`,
        `thread-bubble--${tone}`,
        subdued ? "is-subdued" : "",
        compact ? "is-compact" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          "--bubble-enter-opacity": reveal.toFixed(3),
          "--bubble-enter-y": `${mix(22, 0, reveal)}px`,
          "--bubble-enter-scale": mix(0.97, 1, reveal).toFixed(3),
        } as CSSProperties
      }
    >
      <div className="thread-bubble__copy">
        {emojiCodepoint ? (
          <span className="thread-bubble__copy-inline">
            <span>{content}</span>
            <AnimatedEmoji
              codepoint={emojiCodepoint}
              size={18}
              className="thread-bubble__emoji"
              reducedMotion={reducedMotion}
            />
          </span>
        ) : (
          content
        )}
      </div>
    </div>
  );
}

type ComposerProps = {
  mode: "idle" | "typing" | "thinking";
  text?: string;
  placeholder: string;
  accent?: boolean;
  disabled?: boolean;
  showTools?: boolean;
  thinkingEmojiCodepoint?: string;
  reducedMotion?: boolean;
};

function Composer({
  mode,
  text = "",
  placeholder,
  accent = false,
  disabled = false,
  showTools = false,
  thinkingEmojiCodepoint,
  reducedMotion = false,
}: ComposerProps) {
  return (
    <div className={["composer", accent ? "composer--accent" : ""].filter(Boolean).join(" ")}>
      <div className={["composer__field", mode === "typing" ? "is-active" : ""].join(" ")}>
        {showTools ? (
          <span className="composer__tools" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        ) : null}

        {mode === "typing" ? (
          <span className="composer__typed">
            {text}
            <span className="composer__caret" />
          </span>
        ) : null}

        {mode === "thinking" ? (
          <span className="composer__thinking">
            <span className="composer__thinking-label">Thinking</span>
            {thinkingEmojiCodepoint ? (
              <AnimatedEmoji
                codepoint={thinkingEmojiCodepoint}
                size={16}
                className="composer__thinking-emoji"
                reducedMotion={reducedMotion}
              />
            ) : null}
            <span className="composer__dots">
              <i />
              <i />
              <i />
            </span>
          </span>
        ) : null}

        {mode === "idle" ? <span className="composer__placeholder">{placeholder}</span> : null}
      </div>

      <button
        type="button"
        className={["composer__send", accent ? "composer__send--accent" : ""].join(" ")}
        disabled={disabled}
        aria-label="Send"
      >
        <span className="composer__send-arrow" />
      </button>
    </div>
  );
}

type PhoneFrameProps = {
  side: "lucius" | "user";
  title: string;
  altTitle?: string;
  altTitleProgress?: number;
  style: CSSProperties;
  children: ReactNode;
  composer: ReactNode;
};

function PhoneFrame({
  side,
  title,
  altTitle,
  altTitleProgress = 0,
  style,
  children,
  composer,
}: PhoneFrameProps) {
  const baseTitleOpacity = 1 - altTitleProgress;
  const revealTitleOpacity = altTitle ? altTitleProgress : 0;

  return (
    <div className={`phone phone--${side}`} style={style}>
      <div className="phone__hardware">
        <div className="phone__screen">
          <header className="phone__header">
            <div className="phone__identity-strip">
              <div className={`phone__avatar phone__avatar--${side}`}>
                {side === "lucius" ? <img src="/brand/logo-mark-black.svg" alt="" /> : <span>A</span>}
              </div>
              <span className="phone__title-stack">
                <span style={{ opacity: baseTitleOpacity }}>{title}</span>
                {altTitle ? <span style={{ opacity: revealTitleOpacity }}>{altTitle}</span> : null}
              </span>
            </div>
            <div className="phone__header-line" aria-hidden="true" />
          </header>

          <div className="phone__thread">{children}</div>
          <div className="phone__composer-slot">{composer}</div>
        </div>
      </div>
    </div>
  );
}

export function App() {
  const freezeTime = parseFreezeTime();
  const [timeMs, setTimeMs] = useState<number>(freezeTime ?? 0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (freezeTime !== null) {
      setTimeMs(freezeTime);
      return;
    }

    let raf = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      setTimeMs((now - startedAt) % DURATION_MS);
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, [freezeTime]);

  const t = timeMs;
  const ambientDrift = Math.sin(t / 1560) * 1.35;
  const deviceFloat = Math.cos(t / 1750) * 1.1;

  const questionTyping = easeOutCubic(ramp(t, 40, 980));
  const questionAppear = easeOutCubic(ramp(t, 930, 1540));

  const answerThinking = clamp01(ramp(t, 1560, 1840) * (1 - ramp(t, 2050, 2280)));
  const answerLeadTyping = easeOutCubic(ramp(t, 2100, 2580));
  const answerLeadAppear = easeOutCubic(ramp(t, 2240, 2700));
  const answerMainTyping = easeOutCubic(ramp(t, 2540, 3520));

  const ackTyping = easeOutCubic(ramp(t, 3600, 4140));
  const ackAppear = easeOutCubic(ramp(t, 3880, 4320));

  const praiseTyping = easeOutCubic(ramp(t, 4280, 5020));
  const praiseAppear = easeOutCubic(ramp(t, 4740, 5160));

  const revealThinking = clamp01(ramp(t, 5330, 5550) * (1 - ramp(t, 5720, 5950)));
  const revealTyping = easeOutCubic(ramp(t, 5800, 6360));
  const revealBrand = easeOutCubic(ramp(t, 5660, 6400));

  const wowThinking = clamp01(ramp(t, 6460, 6760) * (1 - ramp(t, 6990, 7240)));
  const wowAppear = easeOutCubic(ramp(t, 7080, 7480));

  const squeeze = easeInOutCubic(ramp(t, 6880, 8060));
  const proofChip = easeOutCubic(ramp(t, 7220, 7960));

  const logoResolve = easeOutCubic(ramp(t, 8420, 9360));
  const summaryReveal = easeOutCubic(ramp(t, 8860, DURATION_MS));
  const phoneFade = 1 - easeOutCubic(ramp(t, 8480, 9360));

  const leftAnchor = mix(25.5, 50, squeeze);
  const rightAnchor = mix(74.5, 108, squeeze);
  const leftDepthScale = mix(1, 1.01, squeeze) * mix(1, 1.48, logoResolve);
  const rightDepthScale = mix(1, 0.986, squeeze);

  const leftPhoneOpacity = clamp01(mix(1, phoneFade, logoResolve));
  const rightPhoneOpacity = clamp01((1 - ramp(t, 7480, 8100)) * (1 - logoResolve));

  const threadFade = 1 - easeOutCubic(ramp(t, 8480, 9280));

  const leftPhoneStyle: CSSProperties = {
    left: `${leftAnchor}%`,
    transform: [
      "translate(-50%, -50%)",
      `translate3d(0, ${mix(2.8 + deviceFloat * 0.2, 0, squeeze)}px, 0)`,
      `scale(${leftDepthScale})`,
    ].join(" "),
    opacity: leftPhoneOpacity,
    zIndex: 3,
  };

  const rightPhoneStyle: CSSProperties = {
    left: `${rightAnchor}%`,
    transform: [
      "translate(-50%, -50%)",
      `translate3d(0, ${mix(-2.8 - ambientDrift * 0.15, -8, squeeze)}px, 0)`,
      `scale(${rightDepthScale})`,
    ].join(" "),
    opacity: rightPhoneOpacity,
    zIndex: 2,
  };

  const resolveOverlayStyle: CSSProperties = {
    opacity: logoResolve,
    transform: `translate3d(0, ${mix(24, 0, logoResolve)}px, 0) scale(${mix(0.82, 1, logoResolve)})`,
  };

  const summaryStyle: CSSProperties = {
    opacity: summaryReveal,
    transform: `translate3d(0, ${mix(28, 0, summaryReveal)}px, 0)`,
  };

  const proofStyle: CSSProperties = {
    opacity: proofChip * (1 - easeOutCubic(ramp(t, 8460, 9240))),
    transform: `translate3d(-50%, ${mix(20, 0, proofChip)}px, 0) scale(${mix(0.9, 1, proofChip)})`,
  };

  const transcript: TranscriptEntry[] = [
    { id: "context-lucius", speaker: "lucius", text: CONTEXT_LUCIUS, reveal: 0.94 * threadFade, subdued: true },
    { id: "context-user-ok", speaker: "user", text: CONTEXT_USER_OK, reveal: 0.92 * threadFade, subdued: true },
    { id: "context-user-thanks", speaker: "user", text: CONTEXT_USER_THANKS, reveal: 0.9 * threadFade, subdued: true },
    { id: "question", speaker: "user", text: QUESTION, reveal: questionAppear * threadFade },
    {
      id: "answer-lead",
      speaker: "lucius",
      text: ANSWER_LEAD,
      reveal: answerLeadAppear * threadFade,
      textProgress: answerLeadTyping,
    },
    {
      id: "answer-main",
      speaker: "lucius",
      text: ANSWER_MAIN,
      reveal: answerMainTyping * threadFade,
      textProgress: answerMainTyping,
    },
    {
      id: "ack",
      speaker: "user",
      text: ACK,
      reveal: ackAppear * threadFade,
      textProgress: ackTyping,
    },
    {
      id: "praise",
      speaker: "user",
      text: PRAISE,
      reveal: praiseAppear * threadFade,
      textProgress: praiseTyping,
    },
    {
      id: "reveal",
      speaker: "lucius",
      text: REVEAL,
      reveal: revealTyping * threadFade,
      textProgress: revealTyping,
    },
    {
      id: "wow",
      speaker: "user",
      text: WOW,
      reveal: wowAppear * threadFade,
      compact: true,
      emojiCodepoint: WOW_EMOJI_CODEPOINT,
    },
  ];

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
            reveal={item.reveal}
            textProgress={item.textProgress}
            subdued={item.subdued}
            compact={item.compact}
            emojiCodepoint={item.emojiCodepoint}
            reducedMotion={prefersReducedMotion}
          />
        );
      })}
    </div>
  );

  const isQuestionTyping = questionTyping < 1;
  const isAckTyping = t >= 3600 && ackTyping < 1;
  const isPraiseTyping = t >= 4280 && praiseTyping < 1;
  const isUserThinking = wowThinking > 0.05;

  const userComposerMode: ComposerProps["mode"] =
    isQuestionTyping || isAckTyping || isPraiseTyping ? "typing" : isUserThinking ? "thinking" : "idle";

  const userComposerText = isQuestionTyping
    ? typeSlice(QUESTION, questionTyping)
    : isAckTyping
      ? typeSlice(ACK, ackTyping)
      : isPraiseTyping
        ? typeSlice(PRAISE, praiseTyping)
        : "";

  return (
    <main className="motion-stage">
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
          title="Support"
          altTitle="Lucius"
          altTitleProgress={revealBrand}
          style={leftPhoneStyle}
          composer={
            <Composer
              mode={answerThinking > 0.05 || revealThinking > 0.05 ? "thinking" : "idle"}
              placeholder="Reply in thread"
              accent
              thinkingEmojiCodepoint={THINKING_EMOJI_CODEPOINT}
              reducedMotion={prefersReducedMotion}
            />
          }
        >
          {renderThread("lucius")}
        </PhoneFrame>

        <PhoneFrame
          side="user"
          title="Ava"
          style={rightPhoneStyle}
          composer={
            <Composer
              mode={userComposerMode}
              text={userComposerText}
              placeholder="Message support"
              disabled={isUserThinking}
              showTools
              thinkingEmojiCodepoint={THINKING_EMOJI_CODEPOINT}
              reducedMotion={prefersReducedMotion}
            />
          }
        >
          {renderThread("user")}
        </PhoneFrame>
      </div>

      <div className="proof-chip" style={proofStyle}>
        <span className="proof-chip__count">0</span>
        <span className="proof-chip__label">handoff requests</span>
      </div>

      <div className="resolve-overlay" style={resolveOverlayStyle}>
        <div className="resolve-overlay__lockup">
          <img className="resolve-overlay__mark" src="/brand/logo-mark-black.svg" alt="" />
          <img className="resolve-overlay__wordmark" src="/brand/lucius.svg" alt="Lucius" />
        </div>
      </div>

      <div className="resolve-summary" style={summaryStyle}>
        {SUMMARY}
      </div>
    </main>
  );
}
