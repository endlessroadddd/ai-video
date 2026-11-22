import { useEffect, useRef } from "react";

const LOOP_MS = 25_000;
const TYPING_TEXT = "What are users complaining about this week?";

function clamp(v: number, lo = 0, hi = 1) {
  return Math.min(hi, Math.max(lo, v));
}

function phase(elapsed: number, startMs: number, endMs: number) {
  return clamp((elapsed - startMs) / (endMs - startMs));
}

function easeInOutCubic(t: number) {
  if (t < 0.5) return 4 * t * t * t;
  return 1 - Math.pow(-2 * t + 2, 3) / 2;
}

type SceneRefs = {
  frame: HTMLElement | null;
  userGroup: HTMLElement | null;
  userText: HTMLElement | null;
  luciusGroup: HTMLElement | null;
  typing: HTMLElement | null;
  insightCard: HTMLElement | null;
  quoteRows: HTMLElement[];
  textarea: HTMLTextAreaElement | null;
  sendBtn: HTMLButtonElement | null;
  scrollContainer: HTMLElement | null;
  lastTypedChars: number;
};

type HostRefs = {
  intro: HTMLElement | null;
  frameWrap: HTMLElement | null;
  evidence: HTMLElement | null;
  rows: HTMLElement[];
  stage: HTMLElement | null;
  progress: HTMLElement | null;
};

function setVisible(node: HTMLElement | null, visible: boolean) {
  if (!node) return;
  node.classList.toggle("scene-visible", visible);
  node.style.display = visible ? "" : "none";
}

function localizeChrome(doc: Document) {
  const navLabels = Array.from(doc.querySelectorAll(".dashboard-sidebar-figma__nav-label"));
  const navEnglish = [
    "Chat with Lucius",
    "Assist Tasks",
    "Sessions",
    "Knowledge Base",
    "Prospects",
    "User List",
    "Settings",
  ];
  navLabels.forEach((el, i) => {
    if (navEnglish[i]) el.textContent = navEnglish[i];
  });

  const sidebarTitle = doc.querySelector(".dashboard-chat-sidebar-title");
  if (sidebarTitle) sidebarTitle.textContent = "Chat with Lucius";

  const sectionLabel = doc.querySelector(".dashboard-chat-session-section-label");
  if (sectionLabel) sectionLabel.textContent = "Recent Conversations";

  const stageTitle = doc.querySelector(".dashboard-chat-stage-title");
  if (stageTitle) stageTitle.textContent = "Community intelligence";

  const composer = doc.querySelector("textarea");
  if (composer) composer.setAttribute("placeholder", "Ask Lucius directly...");

  const actionRows = Array.from(doc.querySelectorAll(".dashboard-chat-action-row"));
  const newChatRow = actionRows[0];
  const searchRow = actionRows[1];

  const updatePrimaryRow = (row: Element | undefined, label: string) => {
    if (!row) return;
    const icon = row.querySelector(".dashboard-chat-action-icon");
    row.textContent = "";
    if (icon) row.append(icon);

    const copy = doc.createElement("span");
    copy.className = "dashboard-chat-action-row-copy";
    const text = doc.createElement("span");
    text.textContent = label;
    copy.append(text);
    row.append(copy);
  };

  updatePrimaryRow(newChatRow, "New Chat");
  searchRow?.remove();

  const historyTitles = Array.from(doc.querySelectorAll(".dashboard-chat-session-title"));
  const englishHistory = [
    "Pricing confusion in #general",
    "App won't open after update",
    "Enterprise team asks for better terms",
    "Onboarding friction: test channel not found",
    "Need multilingual prompt support",
    "What can Lucius do for me?",
    "How to invite Lucius into community?",
    "Community intelligence brief",
    "Escalation: assign owner for ticket",
    "Discord activation playbook",
    "Developer mode disabled confirmation",
  ];
  historyTitles.forEach((el, i) => {
    el.textContent = englishHistory[i % englishHistory.length];
  });

  const historyRows = Array.from(doc.querySelectorAll(".dashboard-chat-session-row"));
  historyRows.forEach((row, i) => {
    if (i >= 5) row.remove();
  });

  const primaryPanel = doc.getElementById("dashboard-client-chat-split-layout-primary");
  const secondaryPanel = doc.getElementById("dashboard-client-chat-split-layout-secondary");
  if (primaryPanel) primaryPanel.style.flex = "22 1 0px";
  if (secondaryPanel) secondaryPanel.style.flex = "78 1 0px";

  const sidebar = doc.querySelector(".dashboard-chat-sidebar") as HTMLElement | null;
  if (sidebar) sidebar.style.width = "100%";

  const sidebarScroll = doc.querySelector(".dashboard-chat-sidebar-scroll") as HTMLElement | null;
  if (sidebarScroll) sidebarScroll.style.overflow = "hidden";
}

function injectSceneStyles(doc: Document) {
  if (doc.getElementById("native-scene-styles")) return;

  const style = doc.createElement("style");
  style.id = "native-scene-styles";
  style.textContent = `
    .dashboard-chat-action-row {
      align-items: center;
      gap: 10px;
    }
    .dashboard-chat-action-row-copy {
      display: inline-flex;
      align-items: center;
      min-width: 0;
    }
    .dashboard-chat-sidebar-scroll,
    .dashboard-chat-sidebar-body,
    .dashboard-chat-session-list {
      overflow: hidden !important;
    }
    .dashboard-chat-session-row {
      min-height: 38px;
    }
    .dashboard-chat-session-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .dashboard-chat-message-list {
      padding-top: 24px !important;
    }
    .scene-fade {
      opacity: 0;
      transform: translateY(14px);
      transition: opacity 420ms cubic-bezier(0.22, 1, 0.36, 1), transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .scene-fade.scene-visible {
      opacity: 1;
      transform: translateY(0);
    }
    .scene-insight-card {
      border: 1px solid rgba(85, 56, 199, 0.24);
      border-radius: 16px;
      background: linear-gradient(160deg, #ffffff 0%, #f8f5ff 100%);
      box-shadow: 0 14px 30px rgba(85, 56, 199, 0.12);
      padding: 16px;
    }
    .scene-insight-kicker {
      margin: 0 0 10px 0;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(85, 56, 199, 0.74);
    }
    .scene-insight-title {
      margin: 0;
      color: #1e2c33;
      font-size: 17px;
      font-weight: 700;
      line-height: 1.34;
      letter-spacing: -0.01em;
    }
    .scene-topic-list {
      margin: 12px 0 0 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .scene-topic-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      border: 1px solid rgba(85, 56, 199, 0.14);
      background: #ffffff;
      border-radius: 10px;
      padding: 8px 10px;
    }
    .scene-topic-label {
      color: #252b37;
      font-size: 13px;
      font-weight: 600;
      line-height: 1.25;
    }
    .scene-topic-value {
      color: #5538c7;
      background: #f1f0ff;
      border-radius: 999px;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    .scene-quote-meta {
      margin: 0 0 4px 0;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      color: rgba(24, 29, 39, 0.52);
    }
    .scene-quote-meta span {
      color: #5538c7;
    }
    .scene-quote-row {
      border-left: 2px solid rgba(85, 56, 199, 0.32);
      padding-left: 10px;
    }
  `;

  doc.head.appendChild(style);
}

function buildScene(doc: Document): SceneRefs {
  injectSceneStyles(doc);
  localizeChrome(doc);

  const list = doc.querySelector(".dashboard-chat-message-list");
  if (list) {
    list.innerHTML = `
      <article class="dashboard-chat-message-group dashboard-chat-message-group--self scene-fade" id="scene-user-group">
        <div class="dashboard-chat-message-head">
          <span class="dashboard-chat-message-time">Today 1:23 PM</span>
        </div>
        <div class="dashboard-chat-message-stack">
          <div class="dashboard-chat-message-item">
            <div class="dashboard-chat-message-bubble dashboard-chat-message-bubble--self" id="scene-user-text"></div>
          </div>
        </div>
      </article>

      <article class="dashboard-chat-message-group dashboard-chat-message-group--lucius scene-fade" id="scene-lucius-group">
        <div class="dashboard-chat-message-head">
          <img alt="Lucius" class="dashboard-chat-message-avatar" loading="lazy" src="./Lucius AI_files/Logo Mark_black.svg">
          <div class="dashboard-chat-message-head-copy">
            <span class="dashboard-chat-message-name">Lucius</span>
          </div>
        </div>
        <div class="dashboard-chat-message-stack">
          <div class="dashboard-chat-pending-reply scene-fade" id="scene-typing" role="status" aria-live="polite">
            <span class="dashboard-chat-pending-reply-accent" aria-hidden="true"></span>
            <span class="dashboard-chat-pending-reply-label">Lucius is tracing community signals...</span>
          </div>

          <div class="dashboard-chat-message-item scene-fade" id="scene-insight-card">
            <div class="dashboard-chat-message-bubble">
              <section class="scene-insight-card">
                <p class="scene-insight-kicker">Answer built from user words</p>
                <p class="scene-insight-title">The strongest user signal this week is pricing clarity. Lucius answers with the original phrasing users actually wrote.</p>
                <ul class="scene-topic-list">
                  <li class="scene-topic-item">
                    <span class="scene-topic-label">Primary concern: pricing is unclear before adoption</span>
                    <span class="scene-topic-value">highest signal</span>
                  </li>
                  <li class="scene-topic-item">
                    <span class="scene-topic-label">Supporting evidence: repeated exact questions about cost</span>
                    <span class="scene-topic-value">raw quotes</span>
                  </li>
                  <li class="scene-topic-item">
                    <span class="scene-topic-label">Context: enterprise teams compare price to volume</span>
                    <span class="scene-topic-value">source-backed</span>
                  </li>
                </ul>
              </section>
            </div>
          </div>

          <div class="dashboard-chat-message-item scene-fade scene-quote-row" data-scene-quote>
            <div class="dashboard-chat-message-bubble">
              <p class="scene-quote-meta"><span>Discord</span> · #support · wuzikai</p>
              <p class="dashboard-chat-message-bubble-copy">"The app won't open after update. Just a blank screen, nothing loads."</p>
            </div>
          </div>

          <div class="dashboard-chat-message-item scene-fade scene-quote-row" data-scene-quote>
            <div class="dashboard-chat-message-bubble">
              <p class="scene-quote-meta"><span>Discord</span> · #general · user_8821</p>
              <p class="dashboard-chat-message-bubble-copy">"What's the current pricing? How much do you charge per message?"</p>
            </div>
          </div>

          <div class="dashboard-chat-message-item scene-fade scene-quote-row" data-scene-quote>
            <div class="dashboard-chat-message-bubble">
              <p class="scene-quote-meta"><span>Feishu</span> · Enterprise · GamsGo</p>
              <p class="dashboard-chat-message-bubble-copy">"0.08 USD per reply is too high for our volume. We need better terms."</p>
            </div>
          </div>
        </div>
      </article>
      <div aria-hidden="true" class="h-px w-full"></div>
    `;
  }

  const userGroup = doc.getElementById("scene-user-group");
  const userText = doc.getElementById("scene-user-text");
  const luciusGroup = doc.getElementById("scene-lucius-group");
  const typing = doc.getElementById("scene-typing");
  const insightCard = doc.getElementById("scene-insight-card");
  const quoteRows = Array.from(doc.querySelectorAll("[data-scene-quote]")) as HTMLElement[];
  const textarea = doc.querySelector("textarea");
  const sendBtn = doc.querySelector("button[title='发送消息'], button[title='Send message']") as HTMLButtonElement | null;
  const scrollContainer = doc.querySelector(".dashboard-chat-stage-body") as HTMLElement | null;

  if (sendBtn) sendBtn.disabled = false;
  setVisible(userGroup, false);
  setVisible(luciusGroup, false);
  setVisible(typing, false);
  setVisible(insightCard, false);
  quoteRows.forEach((node) => setVisible(node, false));

  return {
    frame: doc.documentElement,
    userGroup,
    userText,
    luciusGroup,
    typing,
    insightCard,
    quoteRows,
    textarea,
    sendBtn,
    scrollContainer,
    lastTypedChars: -1,
  };
}

function autoScrollChat(scene: SceneRefs) {
  const container = scene.scrollContainer;
  if (!container) return;

  // Pick the latest visible message to keep in view.
  let target: HTMLElement | null = null;
  for (const node of scene.quoteRows) {
    if (node.classList.contains("scene-visible")) target = node;
  }
  if (!target && scene.insightCard?.classList.contains("scene-visible")) {
    target = scene.insightCard;
  }
  if (!target && scene.luciusGroup?.classList.contains("scene-visible")) {
    target = scene.luciusGroup;
  }
  if (!target) return;

  const containerRect = container.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const bottomMargin = 28;
  const overflowPx = targetRect.bottom - (containerRect.bottom - bottomMargin);

  if (overflowPx > 0) {
    const desired = container.scrollTop + overflowPx;
    const current = container.scrollTop;
    // Smooth lerp toward desired scrollTop each frame.
    const next = current + (desired - current) * 0.18;
    container.scrollTop = Math.abs(desired - next) < 0.5 ? desired : next;
  }
}

function buildHost(doc: Document): HostRefs {
  return {
    intro: doc.getElementById("intro-overlay"),
    frameWrap: doc.getElementById("real-quotes-frame-wrap"),
    evidence: doc.getElementById("evidence-overlay"),
    rows: Array.from(doc.querySelectorAll("[data-evidence-row]")) as HTMLElement[],
    stage: doc.getElementById("evidence-stage-label"),
    progress: doc.getElementById("evidence-progress-label"),
  };
}

function renderHost(host: HostRefs, elapsed: number) {
  const introStart = 0;
  const introEnd = 4_400;
  const breakoutStart = 11_100;
  const breakoutEnd = 17_400;

  const introIn = phase(elapsed, introStart, introStart + 700);
  const introOut = 1 - phase(elapsed, introEnd - 520, introEnd + 260);
  const introAlpha = clamp(Math.min(introIn, introOut));

  const fadeIn = phase(elapsed, breakoutStart - 260, breakoutStart + 420);
  const fadeOut = 1 - phase(elapsed, breakoutEnd - 220, breakoutEnd + 520);
  const overlayAlpha = clamp(Math.min(fadeIn, fadeOut));
  const evidenceProgress = phase(elapsed, breakoutStart + 420, breakoutEnd - 500);

  if (host.intro) {
    host.intro.style.opacity = introAlpha.toFixed(3);
    host.intro.style.pointerEvents = introAlpha > 0.02 ? "auto" : "none";
  }
  if (host.evidence) {
    host.evidence.style.opacity = overlayAlpha.toFixed(3);
    host.evidence.style.setProperty("--evidence-progress", evidenceProgress.toString());
    host.evidence.style.pointerEvents = overlayAlpha > 0.02 ? "auto" : "none";
  }

  if (host.frameWrap) {
    const introScale = 1 - introAlpha * 0.03;
    const introBlur = introAlpha * 0.8;
    const frameScale = introScale - overlayAlpha * 0.05;
    const frameTranslate = -overlayAlpha * 12 - introAlpha * 6;
    host.frameWrap.style.transform = `translateY(${frameTranslate}px) scale(${frameScale})`;
    host.frameWrap.style.filter = `saturate(${1 - overlayAlpha * 0.08}) blur(${overlayAlpha * 1.2 + introBlur}px)`;
    host.frameWrap.style.opacity = `${1 - overlayAlpha * 0.22 - introAlpha * 0.1}`;
  }

  // Evidence rows: always reserve their space in the framework, only fade their
  // contents in/out with the .scene-visible class. This keeps the table card at
  // its final height from the moment the overlay appears, so messages drop into
  // an already-built framework instead of pushing it taller as they arrive.
  host.rows.forEach((row, index) => {
    const start = breakoutStart + 620 + index * 380;
    const visible = elapsed >= start && elapsed <= breakoutEnd + 180;
    row.classList.toggle("scene-visible", visible);
    if (row.style.display === "none") row.style.display = "";
  });

  if (host.stage) {
    if (evidenceProgress < 0.34) {
      host.stage.textContent = "Lucius is analyzing real conversations...";
    } else if (evidenceProgress < 0.7) {
      host.stage.textContent = "Lucius is clustering repeated user wording...";
    } else {
      host.stage.textContent = "Lucius is connecting quotes to one clear answer...";
    }
  }

  if (host.progress) {
    host.progress.textContent = `${Math.round(evidenceProgress * 100)}% complete`;
  }
}

function renderScene(scene: SceneRefs, elapsed: number) {
  const typingStart = 4_300;
  const typingEnd = 8_700;
  const userAt = 9_000;
  const luciusTypingPreBreakoutStart = 9_600;
  const luciusTypingPreBreakoutEnd = 10_950;
  const breakoutStart = 11_100;
  const breakoutEnd = 17_400;
  const luciusTypingAfterBreakoutStart = 17_600;
  const luciusTypingAfterBreakoutEnd = 18_400;
  const insightAt = 18_450;

  const typingProgress = easeInOutCubic(phase(elapsed, typingStart, typingEnd));
  const typedChars = Math.floor(TYPING_TEXT.length * typingProgress);

  if (scene.textarea) {
    if (elapsed >= typingStart && elapsed <= typingEnd) {
      if (typedChars !== scene.lastTypedChars) {
        scene.textarea.value = TYPING_TEXT.slice(0, typedChars);
        scene.lastTypedChars = typedChars;
      }
    } else {
      if (scene.lastTypedChars !== -1 || scene.textarea.value !== "") {
        scene.textarea.value = "";
      }
      scene.lastTypedChars = -1;
    }
  }

  const showUser = elapsed >= userAt;
  setVisible(scene.userGroup, showUser);
  if (scene.userText) {
    scene.userText.textContent = TYPING_TEXT;
  }

  const typingBeforeBreakout = elapsed >= luciusTypingPreBreakoutStart && elapsed <= luciusTypingPreBreakoutEnd;
  const typingAfterBreakout = elapsed >= luciusTypingAfterBreakoutStart && elapsed <= luciusTypingAfterBreakoutEnd;
  setVisible(scene.luciusGroup, elapsed >= luciusTypingPreBreakoutStart);
  setVisible(scene.typing, typingBeforeBreakout || typingAfterBreakout);

  setVisible(scene.insightCard, elapsed >= insightAt);

  scene.quoteRows.forEach((node, i) => {
    const start = insightAt + 480 + i * 420;
    setVisible(node, elapsed >= start);
  });

  if (scene.frame) {
    const intro = phase(elapsed, 0, 1_300);
    const breakoutLift = phase(elapsed, breakoutStart - 260, breakoutStart + 420);
    scene.frame.style.filter = `saturate(${0.94 + intro * 0.06}) brightness(${1 - breakoutLift * 0.02})`;
  }

  // Reset scroll at the very top of the loop so the conversation always
  // re-enters from the same baseline.
  if (scene.scrollContainer && elapsed < 200) {
    scene.scrollContainer.scrollTop = 0;
  }

  // Keep the latest visible message in view once Lucius starts answering.
  if (elapsed >= insightAt) {
    autoScrollChat(scene);
  }
}

export function App() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const sceneRef = useRef<SceneRefs | null>(null);
  const hostRef = useRef<HostRefs | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    hostRef.current = buildHost(document);

    const onLoad = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;

      sceneRef.current = buildScene(doc);
      const origin = performance.now();

      const tick = (now: number) => {
        const elapsed = (now - origin) % LOOP_MS;
        if (sceneRef.current) renderScene(sceneRef.current, elapsed);
        if (hostRef.current) renderHost(hostRef.current, elapsed);
        rafRef.current = requestAnimationFrame(tick);
      };

      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    iframe.addEventListener("load", onLoad);
    return () => {
      iframe.removeEventListener("load", onLoad);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  return (
    <main className="page-shell" id="real-quotes-shell">
      <div className="frame-wrap" id="real-quotes-frame-wrap">
        <iframe
          ref={iframeRef}
          className="demo-frame"
          src="/demo-source/Lucius%20AI.html"
          title="Lucius native UI demo"
        />
      </div>

      <section className="intro-overlay" id="intro-overlay" aria-hidden="true">
        <div className="intro-core">
          <div className="intro-diagram">
            <svg className="intro-arcs" viewBox="0 0 1088 240" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                {/* Soft ambient glow for the base track */}
                <filter id="line-glow-base" x="-5%" y="-3000%" width="110%" height="6100%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Sharp + wide double-blur for the traveling light */}
                <filter id="line-glow" x="-10%" y="-4000%" width="120%" height="8100%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="wide" />
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="tight" />
                  <feMerge>
                    <feMergeNode in="wide" />
                    <feMergeNode in="wide" />
                    <feMergeNode in="tight" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Ambient glow track (wide, soft) */}
              <line className="intro-line-aura intro-line-aura-left" x1="160" y1="120" x2="434" y2="120" filter="url(#line-glow-base)" />
              <line className="intro-line-aura intro-line-aura-right" x1="654" y1="120" x2="928" y2="120" filter="url(#line-glow-base)" />
              <line className="intro-line-detail intro-line-detail-left intro-line-detail-top" x1="174" y1="111" x2="420" y2="111" />
              <line className="intro-line-detail intro-line-detail-left intro-line-detail-bottom" x1="174" y1="129" x2="420" y2="129" />
              <line className="intro-line-detail intro-line-detail-right intro-line-detail-top" x1="668" y1="111" x2="914" y2="111" />
              <line className="intro-line-detail intro-line-detail-right intro-line-detail-bottom" x1="668" y1="129" x2="914" y2="129" />
              {/* Crisp center track */}
              <line className="intro-line intro-line-left" x1="160" y1="120" x2="434" y2="120" />
              <line className="intro-line intro-line-right" x1="654" y1="120" x2="928" y2="120" />
              {/* Traveling light pulse — left line: TEAM → LUCIUS */}
              <line className="intro-line-flow intro-line-flow-left" x1="160" y1="120" x2="434" y2="120" filter="url(#line-glow)" />
              {/* Traveling light pulse — right line: USERS → LUCIUS */}
              <line className="intro-line-flow intro-line-flow-right" x1="654" y1="120" x2="928" y2="120" filter="url(#line-glow)" />
              <circle className="intro-line-node intro-line-node-left intro-line-node-source" cx="160" cy="120" r="4.5" />
              <circle className="intro-line-node intro-line-node-left intro-line-node-relay" cx="296" cy="120" r="3.25" />
              <circle className="intro-line-node intro-line-node-left intro-line-node-target" cx="434" cy="120" r="4.5" />
              <circle className="intro-line-node intro-line-node-right intro-line-node-source" cx="654" cy="120" r="4.5" />
              <circle className="intro-line-node intro-line-node-right intro-line-node-relay" cx="792" cy="120" r="3.25" />
              <circle className="intro-line-node intro-line-node-right intro-line-node-target" cx="928" cy="120" r="4.5" />
              <circle className="intro-line-packet intro-line-packet-left-a" cx="218" cy="120" r="2.2" />
              <circle className="intro-line-packet intro-line-packet-left-b" cx="356" cy="120" r="2.2" />
              <circle className="intro-line-packet intro-line-packet-right-a" cx="870" cy="120" r="2.2" />
              <circle className="intro-line-packet intro-line-packet-right-b" cx="732" cy="120" r="2.2" />
            </svg>

            <article className="intro-person-card intro-team-card">
              <svg className="intro-card-icon" viewBox="0 0 48 48" aria-hidden="true">
                <circle className="icon-halo" cx="24" cy="24" r="18" />
                <path className="icon-fill-soft" d="M12.5 34.8c1.2-5.7 4.5-8.7 9.3-8.7s8.1 3 9.3 8.7H12.5Z" />
                <path className="icon-fill-primary" d="M7.6 37.6c1-5 3.8-7.7 7.9-7.7 3.9 0 6.8 2.7 7.9 7.7H7.6Z" />
                <path className="icon-fill-primary" d="M24.6 37.6c1-5 3.8-7.7 7.9-7.7 3.9 0 6.8 2.7 7.9 7.7H24.6Z" />
                <circle className="icon-fill-primary" cx="15.6" cy="20.3" r="5.4" />
                <circle className="icon-fill-soft" cx="24" cy="17.2" r="6.2" />
                <circle className="icon-fill-primary" cx="32.4" cy="20.3" r="5.4" />
                <path className="icon-stroke" d="M15.6 26.1c-4.5 0-7.6 3.5-8.5 10.6h15.5" />
                <path className="icon-stroke" d="M32.4 26.1c4.5 0 7.6 3.5 8.5 10.6H25.4" />
                <path className="icon-stroke" d="M14.5 12.5c1.7-2.1 4.6-3.6 8.8-3.6 5.5 0 9.2 2.5 10.5 6.7" />
                <circle className="icon-dot" cx="38.8" cy="12" r="2.4" />
              </svg>
              <strong>Team</strong>
              <span>Builders</span>
            </article>

            <ul className="intro-signal-list intro-signal-left">
              <li><span aria-hidden="true" />User feedback & conversations</li>
              <li><span aria-hidden="true" />Product insights & patterns</li>
              <li><span aria-hidden="true" />Prioritized action items</li>
            </ul>

            <div className="intro-agent-block">
              <div className="intro-agent-logo">
                <img src="/demo-source/Lucius%20AI_files/Logo%20Mark_black.svg" alt="Lucius" />
              </div>
              <strong>Lucius</strong>
              <span>AI Agent</span>
            </div>

            <ul className="intro-signal-list intro-signal-right">
              <li><span aria-hidden="true" />Share honest feedback</li>
              <li><span aria-hidden="true" />Ask questions & report issues</li>
              <li><span aria-hidden="true" />Ideas & feature requests</li>
            </ul>

            <article className="intro-person-card intro-users-card">
              <svg className="intro-card-icon" viewBox="0 0 48 48" aria-hidden="true">
                <circle className="icon-halo" cx="23" cy="24" r="17.5" />
                <path className="icon-fill-primary" d="M10.2 38.5c1.6-7.3 6.3-11.1 13.8-11.1s12.2 3.8 13.8 11.1H10.2Z" />
                <circle className="icon-fill-primary" cx="24" cy="17.4" r="7.8" />
                <path className="icon-stroke" d="M9.5 37.2c1.7-7 6.5-10.8 14.5-10.8s12.8 3.8 14.5 10.8" />
                <path className="icon-stroke" d="M15.8 16.8c.3-5 3.5-8.2 8.2-8.2 5 0 8.3 3.5 8.3 8.6" />
                <path className="icon-bubble" d="M32.5 10.4h7.3c2.1 0 3.6 1.4 3.6 3.4v4.1c0 2-1.5 3.4-3.6 3.4h-2.1l-3.3 3v-3h-1.9" />
                <circle className="icon-dot" cx="36.2" cy="15.9" r="1" />
                <circle className="icon-dot" cx="40" cy="15.9" r="1" />
              </svg>
              <strong>Users</strong>
              <span>Real people</span>
            </article>
          </div>
        </div>
      </section>

      <section className="evidence-overlay" id="evidence-overlay" aria-hidden="true">
        <div className="evidence-grid-backdrop" />
        <div className="evidence-core-panel">
          <div className="evidence-hero-row">
            <div className="evidence-hero-copy">
              <span className="evidence-kicker">Lucius quote engine</span>
              <h2 className="evidence-title">
                Lucius answers with
                <br />
                what users <span>actually said.</span>
              </h2>
            </div>

            <div className="evidence-question-card">
              <strong>What are users complaining about this week?</strong>
              <p>
                <span aria-hidden="true" />
                <span id="evidence-stage-label">Lucius is analyzing real conversations...</span>
              </p>
            </div>
          </div>

          <div className="evidence-table-card">
            <div className="evidence-table-header">
              <span>Understanding user conversations</span>
              <strong id="evidence-progress-label">0% complete</strong>
            </div>

            <div className="evidence-progress-bar">
              <span className="evidence-progress-fill" />
            </div>

            <div className="evidence-rows">
              <article className="evidence-row" data-evidence-row>
                <span className="evidence-icon" aria-hidden="true">□</span>
                <div className="evidence-copy-block">
                  <span className="evidence-source">Raw quote</span>
                  <p className="evidence-copy">"What's the current pricing? How much do you charge per message?"</p>
                </div>
                <div className="evidence-finding">
                  <span>Primary concern</span>
                  <strong>Pricing clarity</strong>
                </div>
                <span className="evidence-tag">High signal</span>
              </article>

              <article className="evidence-row" data-evidence-row>
                <span className="evidence-icon" aria-hidden="true">□</span>
                <div className="evidence-copy-block">
                  <span className="evidence-source">Raw quote</span>
                  <p className="evidence-copy">"How much do you charge per message? Is there a monthly plan?"</p>
                </div>
                <div className="evidence-finding">
                  <span>Same intent</span>
                  <strong>Pricing clarity</strong>
                </div>
                <span className="evidence-tag">High signal</span>
              </article>

              <article className="evidence-row" data-evidence-row>
                <span className="evidence-icon" aria-hidden="true">□</span>
                <div className="evidence-copy-block">
                  <span className="evidence-source">Raw quote</span>
                  <p className="evidence-copy">"0.08 USD per reply is too high for our volume."</p>
                </div>
                <div className="evidence-finding">
                  <span>Context</span>
                  <strong>Enterprise pricing sensitivity</strong>
                </div>
                <span className="evidence-tag">Medium signal</span>
              </article>

              <article className="evidence-row evidence-insight-row" data-evidence-row>
                <span className="evidence-icon evidence-insight-icon" aria-hidden="true">✦</span>
                <div className="evidence-copy-block">
                  <span className="evidence-source">Lucius insight</span>
                  <p className="evidence-copy">Users are not asking for a summary; they are asking exact cost questions and plan details.</p>
                </div>
                <div className="evidence-finding">
                  <span>Key theme</span>
                  <strong>Pricing transparency</strong>
                </div>
                <span className="evidence-tag">Insight</span>
              </article>
            </div>
          </div>

          <div className="evidence-trust-bar" aria-hidden="true">
            <span>Real conversations</span>
            <span>Source-verified quotes</span>
            <span>AI understanding, human truth</span>
          </div>
        </div>
      </section>
    </main>
  );
}
