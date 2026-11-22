import { useLayoutEffect, useMemo, useRef, useState } from "react";

type CurtainBaseProps = {
  t: number;
  start: number;
  end: number;
  zIndex?: number;
};

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function ramp(t: number, start: number, end: number) {
  return clamp01((t - start) / Math.max(1, end - start));
}

function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

function easeInCubic(x: number) {
  return x * x * x;
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function curtainOpacity(p: number) {
  // Longer hold + slower exit so the final visual reads.
  const inT = easeInOutCubic(clamp01(p / 0.18));
  const outT = easeInOutCubic(clamp01((p - 0.9) / 0.1));
  return clamp01(inT * (1 - outT));
}

export function LearnConvCurtainKnowledgeGraphV2(props: CurtainBaseProps) {
  const p = ramp(props.t, props.start, props.end);
  const o = curtainOpacity(p);

  const anim = clamp01(p / 0.9);
  const k = easeInOutCubic(anim);

  const enter = easeOutCubic(clamp01(p / 0.16));
  const exit = easeInCubic(clamp01((p - 0.92) / 0.08));
  const float = Math.sin(p * Math.PI * 2) * 0.6;

  if (o < 0.01) return null;

  // Sequential demo steps.
  const t1 = easeOutCubic(clamp01(k / 0.34));
  const t2 = easeOutCubic(clamp01((k - 0.34) / 0.33));
  const t3 = easeOutCubic(clamp01((k - 0.66) / 0.34));

  const pipe1 = easeInOutCubic(clamp01((k - 0.04) / 0.34));
  const pipe2 = easeInOutCubic(clamp01((k - 0.52) / 0.34));

  const themeIn = easeOutCubic(clamp01((k - 0.34) / 0.24));
  const themeOut = easeInCubic(clamp01((k - 0.62) / 0.20));
  const themeOpacity = themeIn * (1 - themeOut);

  const docIn = easeOutCubic(clamp01((k - 0.62) / 0.26));
  const docOpacity = docIn;

  const activeLeft = clamp01(1 - easeInOutCubic(clamp01((k - 0.34) / 0.22)));
  const activeCenter = clamp01(
    easeOutCubic(clamp01((k - 0.25) / 0.20)) * (1 - easeInCubic(clamp01((k - 0.58) / 0.18))),
  );
  const activeRight = easeOutCubic(clamp01((k - 0.58) / 0.26));

  const stageBlur = exit > 0.02 ? `blur(${mix(0, 6, exit)}px)` : undefined;

  return (
    <div
      className="vac-curtain vac-curtain--lfc"
      aria-hidden="true"
      style={{
        opacity: o,
        zIndex: props.zIndex ?? 11,
        transform: `translate3d(0, ${mix(18, 0, enter) + mix(0, -6, exit)}px, 0)`,
      }}
    >
      <div
        className="vac-curtain__vignette"
        style={{
          opacity: mix(0.85, 1, enter) * mix(1, 0.9, exit),
          transform: `translate3d(${mix(-6, 0, enter) + float}px, ${mix(8, 0, enter) - float}px, 0) scale(${mix(
            1.05,
            1,
            enter,
          )})`,
        }}
      />

      <div
        className="vac-curtain__frame"
        style={{
          transform: `translate3d(0, ${mix(12, 0, enter) + float}px, 0) scale(${mix(0.97, 1, enter) * mix(
            1,
            0.992,
            exit,
          )})`,
          filter: stageBlur,
        }}
      >
        <div className="vac-curtain__title">
          <span className="vac-curtain__kicker">LEARN</span>
          <span className="vac-curtain__headline">from conversations</span>
        </div>

        <svg
          className="vac-curtain__svg vac-lfc-graph"
          viewBox="0 0 920 380"
          role="img"
          aria-label="Learn from conversations: Capture, cluster, and write back knowledge with citations"
        >
          <defs>
            <linearGradient id="vacLfcPipe" x1="0" x2="1">
              <stop offset="0%" stopColor="rgb(100 79 184 / 0)" />
              <stop offset="45%" stopColor="rgb(100 79 184 / 0.72)" />
              <stop offset="100%" stopColor="rgb(100 79 184 / 0)" />
            </linearGradient>

            <filter id="vacLfcSoft" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="9" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connectors */}
          <g>
            <path
              d="M330 170 C360 170, 360 170, 395 170"
              fill="none"
              stroke="rgb(100 79 184 / 0.10)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M330 170 C360 170, 360 170, 395 170"
              fill="none"
              stroke="url(#vacLfcPipe)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="18 22"
              strokeDashoffset={(44 - 34 * pipe1).toFixed(2)}
              opacity={mix(0.0, 1.0, pipe1)}
            />

            <path
              d="M535 170 C565 170, 565 170, 600 170"
              fill="none"
              stroke="rgb(100 79 184 / 0.10)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M535 170 C565 170, 565 170, 600 170"
              fill="none"
              stroke="url(#vacLfcPipe)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="18 22"
              strokeDashoffset={(44 - 34 * pipe2).toFixed(2)}
              opacity={mix(0.0, 1.0, pipe2)}
            />
          </g>

          {/* Panels */}
          <g filter="url(#vacLfcSoft)">
            <rect
              x="105"
              y="92"
              width="220"
              height="120"
              rx="22"
              fill="rgb(255 255 255 / 0.72)"
              stroke="rgb(76 75 105 / 0.14)"
              opacity={0.26 + 0.74 * activeLeft}
            />
            <rect
              x="345"
              y="92"
              width="220"
              height="120"
              rx="22"
              fill="rgb(255 255 255 / 0.72)"
              stroke="rgb(76 75 105 / 0.14)"
              opacity={0.26 + 0.74 * activeCenter}
            />
            <rect
              x="585"
              y="92"
              width="220"
              height="120"
              rx="22"
              fill="rgb(255 255 255 / 0.72)"
              stroke="rgb(76 75 105 / 0.14)"
              opacity={0.22 + 0.78 * activeRight}
            />
          </g>

          {/* Step headings */}
          <g fontFamily="inherit">
            <text
              x="215"
              y="132"
              textAnchor="middle"
              fontSize="12"
              fontWeight="800"
              fill="rgb(76 75 105 / 0.90)"
              opacity={0.25 + 0.75 * activeLeft}
            >
              Step 1 · Capture
            </text>
            <text
              x="455"
              y="132"
              textAnchor="middle"
              fontSize="12"
              fontWeight="800"
              fill="rgb(76 75 105 / 0.90)"
              opacity={0.25 + 0.75 * activeCenter}
            >
              Step 2 · Cluster
            </text>
            <text
              x="695"
              y="132"
              textAnchor="middle"
              fontSize="12"
              fontWeight="800"
              fill="rgb(76 75 105 / 0.90)"
              opacity={0.25 + 0.75 * activeRight}
            >
              Step 3 · Write back
            </text>
          </g>

          {/* Step body (under panels) */}
          <g fontFamily="inherit">
            <text
              x="215"
              y="246"
              textAnchor="middle"
              fontSize="11"
              fontWeight="650"
              fill="rgb(43 42 58 / 0.92)"
              opacity={0.20 + 0.80 * activeLeft}
            >
              Collect from Feishu, Discord & Telegram.
            </text>
            <text
              x="455"
              y="246"
              textAnchor="middle"
              fontSize="11"
              fontWeight="650"
              fill="rgb(43 42 58 / 0.92)"
              opacity={0.20 + 0.80 * activeCenter}
            >
              De‑dupe repeats into stable themes.
            </text>
            <text
              x="695"
              y="246"
              textAnchor="middle"
              fontSize="11"
              fontWeight="650"
              fill="rgb(43 42 58 / 0.92)"
              opacity={0.20 + 0.80 * activeRight}
            >
              Update base with citations.
            </text>
          </g>

          {/* Snippets: move into Themes area (Step 1). */}
          {Array.from({ length: 3 }).map((_, idx) => {
            const delay = idx * 0.06;
            const local = easeOutCubic(clamp01((t1 - delay) / (1 - delay)));

            const x = mix(150, 380, local);
            const y = 150 + idx * 26;
            const h = mix(18, 10, local);
            const w = mix(150, 140, local);

            const snippetOut = easeInCubic(clamp01((k - 0.45) / 0.15));
            const opacity = (1 - snippetOut) * mix(0.0, 1.0, local);

            return (
              <g key={idx} opacity={opacity}>
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  rx="9"
                  fill="rgb(255 255 255 / 0.92)"
                  stroke="rgb(76 75 105 / 0.14)"
                />
                <rect x={x + 10} y={y + 6} width={mix(95, 80, local)} height="3" rx="1.5" fill="rgb(100 79 184 / 0.22)" />
              </g>
            );
          })}

          {/* Themes: appear (Step 2), then move toward docs (Step 3). */}
          {Array.from({ length: 3 }).map((_, idx) => {
            const barY = 156 + idx * 24;
            const localIn = easeOutCubic(clamp01((t2 - idx * 0.08) / 0.95));
            const localToRight = easeInOutCubic(clamp01((t3 - 0.05 - idx * 0.03) / 0.95));

            const x = mix(372, 625, localToRight);
            const w = mix(170, 190, localToRight);

            const opacity = themeOpacity * mix(0, 1, localIn);

            return (
              <g key={idx} opacity={opacity}>
                <rect x={x} y={barY} width={w} height="10" rx="5" fill="rgb(100 79 184 / 0.18)" />
                <rect
                  x={x + 16}
                  y={barY + 6}
                  width={mix(90, 120, localToRight)}
                  height="4"
                  rx="2"
                  fill="rgb(100 79 184 / 0.22)"
                  opacity={0.95}
                />
              </g>
            );
          })}

          {/* Docs: appear (Step 3). */}
          <g opacity={docOpacity} filter="url(#vacLfcSoft)">
            {[0, 1].map((idx) => {
              const local = clamp01(docIn * 1.25 - idx * 0.12);
              return (
                <g key={idx} opacity={local}>
                  <rect x={610} y={142 + idx * 48} width="180" height="44" rx="16" fill="rgb(255 255 255 / 0.92)" stroke="rgb(76 75 105 / 0.14)" />
                  <rect x={626} y={158 + idx * 48} width={mix(120, 138, idx)} height="6" rx="3" fill="rgb(43 42 58 / 0.18)" />
                  <rect x={626} y={170 + idx * 48} width="88" height="5" rx="2.5" fill="rgb(100 79 184 / 0.22)" />
                </g>
              );
            })}

            {/* Citations chips */}
            <g opacity={mix(0.0, 1.0, clamp01((t3 - 0.30) / 0.35))}>
              <rect x="610" y="282" width="54" height="20" rx="10" fill="rgb(255 255 255 / 0.78)" stroke="rgb(76 75 105 / 0.14)" />
              <text x="637" y="296" textAnchor="middle" fontSize="10" fontWeight="750" fill="rgb(76 75 105 / 0.86)">
                Feishu
              </text>

              <rect x="670" y="282" width="64" height="20" rx="10" fill="rgb(255 255 255 / 0.78)" stroke="rgb(76 75 105 / 0.14)" />
              <text x="702" y="296" textAnchor="middle" fontSize="10" fontWeight="750" fill="rgb(76 75 105 / 0.86)">
                Discord
              </text>

              <rect x="740" y="282" width="74" height="20" rx="10" fill="rgb(255 255 255 / 0.78)" stroke="rgb(76 75 105 / 0.14)" />
              <text x="777" y="296" textAnchor="middle" fontSize="10" fontWeight="750" fill="rgb(76 75 105 / 0.86)">
                Telegram
              </text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

export function LearnConvCurtainKnowledgeGraph(props: CurtainBaseProps) {
  const p = ramp(props.t, props.start, props.end);
  const o = curtainOpacity(p);
  // Keep the pacing readable: steps should have time to land.
  const anim = clamp01(p / 0.9);
  const k = easeInOutCubic(anim);
  const enter = easeOutCubic(clamp01(p / 0.16));
  const exit = easeInCubic(clamp01((p - 0.92) / 0.08));
  const float = Math.sin(p * Math.PI * 2) * 0.9;
  if (o < 0.01) return null;

  // Step pacing (sequential, low-noise).
  const step1 = easeOutCubic(clamp01((k - 0.05) / 0.22));
  const step2 = easeOutCubic(clamp01((k - 0.36) / 0.22));
  const step3 = easeOutCubic(clamp01((k - 0.67) / 0.22));

  const captionIn = easeOutCubic(clamp01((k - 0.08) / 0.18));
  const connector1 = easeInOutCubic(clamp01((k - 0.32) / 0.18));
  const connector2 = easeInOutCubic(clamp01((k - 0.63) / 0.18));

  return (
    <div
      className="vac-curtain vac-curtain--lfc"
      aria-hidden="true"
      style={{
        opacity: o,
        zIndex: props.zIndex ?? 11,
        transform: `translate3d(0, ${mix(18, 0, enter) + mix(0, -6, exit)}px, 0)`,
      }}
    >
      <div
        className="vac-curtain__vignette"
        style={{
          opacity: mix(0.85, 1, enter) * mix(1, 0.9, exit),
          transform: `translate3d(${mix(-6, 0, enter) + float}px, ${mix(8, 0, enter) - float}px, 0) scale(${mix(
            1.05,
            1,
            enter,
          )})`,
        }}
      />
      <div
        className="vac-curtain__frame"
        style={{
          transform: `translate3d(0, ${mix(12, 0, enter) + float}px, 0) scale(${mix(0.965, 1, enter) * mix(
            1,
            0.992,
            exit,
          )})`,
          filter: exit > 0.02 ? `blur(${mix(0, 6, exit)}px)` : undefined,
        }}
      >
        <div className="vac-curtain__title">
          <span className="vac-curtain__kicker">LEARN</span>
          <span className="vac-curtain__headline">from conversations</span>
        </div>

        <div
          className="vac-curtain__caption vac-curtain__caption--lfc"
          aria-hidden="true"
          style={{
            opacity: captionIn,
            transform: `translate3d(0, ${mix(10, 0, captionIn)}px, 0)`,
          }}
        >
          Turn weekly chatter into a cited knowledge base your team can trust.
        </div>

        <div className="vac-lfc-flow" aria-hidden="true">
          <div
            className="vac-lfc-flow__col"
            style={{
              opacity: step1,
              transform: `translate3d(${mix(-14, 0, step1)}px, ${mix(10, 0, step1)}px, 0)`,
            }}
          >
            <div className="vac-lfc-flow__viz">
              <p className="vac-lfc-flow__vizTitle">Sources</p>
              <div className="vac-lfc-flow__sourceList">
                {[
                  { icon: "/platform-icons/feishu.svg", label: "Feishu" },
                  { icon: "/platform-icons/discord.svg", label: "Discord" },
                  { icon: "/platform-icons/telegram.svg", label: "Telegram" },
                ].map((s) => (
                  <div key={s.label} className="vac-lfc-flow__sourceRow">
                    <img src={s.icon} alt="" className="vac-lfc-flow__sourceIcon" />
                    <span className="vac-lfc-flow__sourceLabel">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="vac-lfc-flow__step">
              <span className="vac-lfc-flow__stepTag">Step 1</span>
              <p className="vac-lfc-flow__stepTitle">Capture</p>
              <p className="vac-lfc-flow__stepSub">Collect questions from weekly threads.</p>
            </div>
          </div>

          <div
            className="vac-lfc-flow__connector"
            style={{
              opacity: connector1,
              transform: `translate3d(${mix(-8, 0, connector1)}px, 0, 0)`,
            }}
          >
            <div className="vac-lfc-flow__connectorLine" />
            <div className="vac-lfc-flow__connectorArrow" />
          </div>

          <div
            className="vac-lfc-flow__col"
            style={{
              opacity: step2,
              transform: `translate3d(${mix(-10, 0, step2)}px, ${mix(10, 0, step2)}px, 0)`,
            }}
          >
            <div className="vac-lfc-flow__viz">
              <p className="vac-lfc-flow__vizTitle">Themes</p>
              <div className="vac-lfc-flow__chips">
                {["Eligibility window", "Refund timeline", "Partial refunds"].map((t) => (
                  <span key={t} className="vac-lfc-flow__chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="vac-lfc-flow__step">
              <span className="vac-lfc-flow__stepTag">Step 2</span>
              <p className="vac-lfc-flow__stepTitle">Cluster</p>
              <p className="vac-lfc-flow__stepSub">De‑dupe repeats and merge into stable themes.</p>
            </div>
          </div>

          <div
            className="vac-lfc-flow__connector"
            style={{
              opacity: connector2,
              transform: `translate3d(${mix(-8, 0, connector2)}px, 0, 0)`,
            }}
          >
            <div className="vac-lfc-flow__connectorLine" />
            <div className="vac-lfc-flow__connectorArrow" />
          </div>

          <div
            className="vac-lfc-flow__col"
            style={{
              opacity: step3,
              transform: `translate3d(${mix(-6, 0, step3)}px, ${mix(10, 0, step3)}px, 0)`,
            }}
          >
            <div className="vac-lfc-flow__viz">
              <p className="vac-lfc-flow__vizTitle">Knowledge base</p>
              <div className="vac-lfc-flow__docList">
                {["Refund policy · Eligibility & exceptions", "Refund status · Timeline + next steps"].map((d) => (
                  <div key={d} className="vac-lfc-flow__docRow">
                    <span className="vac-lfc-flow__docDot" aria-hidden="true" />
                    <span className="vac-lfc-flow__docTitle">{d}</span>
                  </div>
                ))}
              </div>
              <div className="vac-lfc-flow__cites">
                {["Feishu", "Discord", "Telegram"].map((c) => (
                  <span key={c} className="vac-lfc-flow__cite">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="vac-lfc-flow__step">
              <span className="vac-lfc-flow__stepTag">Step 3</span>
              <p className="vac-lfc-flow__stepTitle">Write back</p>
              <p className="vac-lfc-flow__stepSub">Update your knowledge base with citations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type ThreadSample = { source: string; quote: string };
type ThemeSample = { title: string; hits: number };
type KnowledgeSample = { title: string; cites: readonly string[] };

export function LearnConvCurtainKnowledgeGraphV3(
  props: CurtainBaseProps & {
    threads: ThreadSample[];
    themes: ThemeSample[];
    knowledge: KnowledgeSample[];
  },
) {
  const p = ramp(props.t, props.start, props.end);
  const o = curtainOpacity(p);

  const frameRef = useRef<HTMLDivElement | null>(null);
  const orbRef = useRef<HTMLDivElement | null>(null);
  const step1Ref = useRef<HTMLDivElement | null>(null);
  const step2Ref = useRef<HTMLDivElement | null>(null);
  const step3Ref = useRef<HTMLDivElement | null>(null);

  const [frameSize, setFrameSize] = useState({ w: 0, h: 0 });
  const [wf, setWf] = useState({
    sx: 0,
    sy: 0,
    t1x: 0,
    t1y: 0,
    t2x: 0,
    t2y: 0,
    t3x: 0,
    t3y: 0,
  });

  useLayoutEffect(() => {
    const compute = () => {
      const frame = frameRef.current;
      const orb = orbRef.current;
      const s1 = step1Ref.current;
      const s2 = step2Ref.current;
      const s3 = step3Ref.current;
      if (!frame || !orb || !s1 || !s2 || !s3) return;

      const fr = frame.getBoundingClientRect();
      const or = orb.getBoundingClientRect();
      const r1 = s1.getBoundingClientRect();
      const r2 = s2.getBoundingClientRect();
      const r3 = s3.getBoundingClientRect();

      setFrameSize({ w: fr.width, h: fr.height });

      const startX = or.left - fr.left + or.width / 2;
      const startY = or.top - fr.top + or.height;
      const targetY = (r: DOMRect) => r.top - fr.top - 10;

      setWf({
        sx: startX,
        sy: startY,
        t1x: r1.left - fr.left + r1.width / 2,
        t1y: targetY(r1),
        t2x: r2.left - fr.left + r2.width / 2,
        t2y: targetY(r2),
        t3x: r3.left - fr.left + r3.width / 2,
        t3y: targetY(r3),
      });
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  if (o < 0.01) return null;

  // Make the full three-step sequence land, then hold the final state longer.
  const anim = clamp01(p / 0.78);
  const k = easeInOutCubic(anim);

  const enter = easeOutCubic(clamp01(p / 0.16));
  const exit = easeInCubic(clamp01((p - 0.92) / 0.08));
  const float = Math.sin(p * Math.PI * 2) * 0.4;

  // Sequential step visibility (left -> right) and persistence.
  const step1In = clamp01((k - 0.02) / 0.30);
  const step2In = clamp01((k - 0.30) / 0.28);
  const step3In = clamp01((k - 0.58) / 0.28);

  // Process -> example morph points (examples stay after they appear).
  const ex1In = clamp01((k - 0.12) / 0.18); // ~0.30
  const ex2In = clamp01((k - 0.40) / 0.18); // ~0.58
  const ex3In = clamp01((k - 0.70) / 0.18); // ~0.88

  // No decorative process layer — keep this scene content-only.

  const colYOffset = (t: number) => mix(14, 0, t);
  const colScale = (t: number) => mix(0.985, 1, t);

  const threads = props.threads.slice(0, 2);
  const themes = props.themes.slice(0, 2);
  const knowledge = props.knowledge.slice(0, 1);

  const platforms = [
    { id: "feishu", label: "Feishu", icon: "/platform-icons/feishu.svg" },
    { id: "discord", label: "Discord", icon: "/platform-icons/discord.svg" },
    { id: "telegram", label: "Telegram", icon: "/platform-icons/telegram.svg" },
  ] as const;

  const platformForThread = (idx: number) => platforms[idx % platforms.length];
  const platformForCite = (cite: string) => {
    if (cite.startsWith("Feishu")) return platforms[0];
    if (cite.startsWith("Discord")) return platforms[1];
    if (cite.startsWith("Telegram")) return platforms[2];
    return platforms[0];
  };

  const syncPhase = clamp01((k - 0.58) / 0.30);
  const syncDone = easeOutCubic(clamp01((syncPhase - 0.78) / 0.22));

  // Step status should advance: when the next step appears, the previous becomes "done".
  const step1Done = step2In > 0.12;
  const step2Done = step3In > 0.12;
  const step3Done = syncDone > 0.86;

  // Workflow links: logo orb appears first, then three links light up sequentially.
  const orbIn = easeOutCubic(clamp01((k - 0.02) / 0.14));
  const link1 = easeInOutCubic(clamp01((k - 0.14) / 0.20));
  // Start the middle line a bit earlier so it never feels missing.
  const link2 = easeInOutCubic(clamp01((k - 0.32) / 0.20));
  const link3 = easeInOutCubic(clamp01((k - 0.66) / 0.20));

  // Cards should appear AFTER their link lights up (more "activation" feel).
  const card1In = easeOutCubic(clamp01((k - 0.24) / 0.20));
  const card2In = easeOutCubic(clamp01((k - 0.48) / 0.20));
  const card3In = easeOutCubic(clamp01((k - 0.78) / 0.18));

  return (
    <div
      className="vac-curtain vac-curtain--lfc"
      aria-hidden="true"
      style={{
        opacity: o,
        zIndex: props.zIndex ?? 11,
        transform: `translate3d(0, ${mix(18, 0, enter) + mix(0, -6, exit) + float}px, 0)`,
      }}
    >
      <div
        className="vac-curtain__vignette"
        style={{
          opacity: mix(0.85, 1, enter) * mix(1, 0.9, exit),
          transform: `translate3d(${mix(-6, 0, enter)}px, ${mix(8, 0, enter)}px, 0) scale(${mix(
            1.02,
            1,
            enter,
          )})`,
        }}
      />

      <div
        className="vac-curtain__frame vac-lfc-v3"
        style={{
          filter: exit > 0.02 ? `blur(${mix(0, 6, exit)}px)` : undefined,
        }}
        ref={frameRef}
      >
        <div className="vac-lfc-v3__overall">
          Turn weekly chatter into a <span className="vac-lfc-v3__overallAccent">cited knowledge base</span> your team can trust.
        </div>

        <div className="vac-lfc-v3__agentHeader" aria-hidden="true" style={{ opacity: orbIn }}>
          <div className="vac-lfc-v3__agentOrbTop" ref={orbRef}>
            <div className="vac-lfc-v3__agentOrbGlow" />
            <div className="vac-lfc-v3__agentOrbCore">
              <img src="/figma-auth/Logo%20Mark_black.svg" alt="" className="vac-lfc-v3__agentOrbLogo" />
            </div>
            <div className="vac-lfc-v3__agentOrbPulse" />
          </div>
          <div className="vac-lfc-v3__agentHeaderCaption">
            Lucius thinking
            <span className="vac-lfc-v3__dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </div>
        </div>

        {frameSize.w > 10 && frameSize.h > 10 ? (
          <svg
            className="vac-lfc-v3__workflowSvg"
            viewBox={`0 0 ${frameSize.w} ${frameSize.h}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              {/* Use userSpaceOnUse so vertical paths still get color (bbox width can collapse). */}
              <linearGradient id="vacLfcWfStroke" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={frameSize.w} y2="0">
                <stop offset="0%" stopColor="rgb(100 79 184 / 0.0)" />
                <stop offset="45%" stopColor="rgb(100 79 184 / 0.72)" />
                <stop offset="100%" stopColor="rgb(100 79 184 / 0.0)" />
              </linearGradient>
              <filter id="vacLfcWfGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {(() => {
              const curve = (tx: number, ty: number) => {
                const midY = mix(wf.sy + 54, ty - 54, 0.62);
                const c1x = mix(wf.sx, tx, 0.15);
                const c2x = mix(wf.sx, tx, 0.85);
                return `M${wf.sx} ${wf.sy} C${c1x} ${midY}, ${c2x} ${midY}, ${tx} ${ty}`;
              };
              const d1 = curve(wf.t1x, wf.t1y);
              const d2 = curve(wf.t2x, wf.t2y);
              const d3 = curve(wf.t3x, wf.t3y);
              return (
                <g filter="url(#vacLfcWfGlow)">
                  {/* animated strokes */}
                  <path
                    d={d1}
                    fill="none"
                    stroke="url(#vacLfcWfStroke)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="14 18"
                    strokeDashoffset={(88 - 88 * link1).toFixed(2)}
                    opacity={link1}
                  />
                  <path
                    d={d2}
                    fill="none"
                    stroke="url(#vacLfcWfStroke)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="14 18"
                    strokeDashoffset={(88 - 88 * link2).toFixed(2)}
                    opacity={link2}
                  />
                  <path
                    d={d3}
                    fill="none"
                    stroke="url(#vacLfcWfStroke)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="14 18"
                    strokeDashoffset={(88 - 88 * link3).toFixed(2)}
                    opacity={link3}
                  />

                  {/* edge nodes */}
                  <circle cx={wf.t1x} cy={wf.t1y} r="7" fill="rgb(100 79 184 / 0.92)" opacity={link1} />
                  <circle cx={wf.t2x} cy={wf.t2y} r="7" fill="rgb(100 79 184 / 0.92)" opacity={link2} />
                  <circle cx={wf.t3x} cy={wf.t3y} r="7" fill="rgb(100 79 184 / 0.92)" opacity={link3} />
                </g>
              );
            })()}
          </svg>
        ) : null}

        <div className="vac-lfc-v3__grid">
          {/* Step 1 */}
          <div
            className="vac-lfc-v3__col"
            ref={step1Ref}
          >
            <div
              className="vac-lfc-v3__colInner"
              style={{
                opacity: card1In,
                transform: `translate3d(0, ${colYOffset(card1In)}px, 0) scale(${colScale(card1In)})`,
              }}
            >
              <div className="vac-lfc-v3__colHead">
                <div className="vac-lfc-v3__stepRow">
                  <span className="vac-lfc-v3__stepTag">Step 1</span>
                  <span className="vac-lfc-v3__stepStatus" data-state={step1Done ? "done" : "loading"}>
                    {step1Done ? "Captured" : "Capturing"}
                    <span className="vac-lfc-v3__dots" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </span>
                  </span>
                </div>
                <div className="vac-lfc-v3__colTitle">Capture</div>
                <div className="vac-lfc-v3__colSummary">
                  Collect questions from Feishu, Discord, and Telegram.
                </div>
              </div>

              <div className="vac-lfc-v3__visual">
                <div className="vac-lfc-v3__example" style={{ opacity: ex1In }}>
                  <div className="vac-lfc-v3__cardList">
                    {threads.map((t, idx) => {
                      const p = platformForThread(idx);
                      return (
                      <div
                        key={`${t.source}-${t.quote}`}
                        className="vac-lfc-v3__threadCard"
                        data-platform={p.id}
                      >
                        <div className="vac-lfc-v3__threadTop">
                          <span className="vac-lfc-v3__threadSourceRow">
                            <img className="vac-lfc-v3__platformIcon" src={p.icon} alt="" />
                            <span className="vac-lfc-v3__threadSource">{t.source}</span>
                          </span>
                          <span className="vac-lfc-v3__platformLabel">{p.label}</span>
                        </div>
                        <div className="vac-lfc-v3__threadQuote">“{t.quote}”</div>
                      </div>
                    )})}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div
            className="vac-lfc-v3__col"
            ref={step2Ref}
          >
            <div
              className="vac-lfc-v3__colInner"
              style={{
                opacity: card2In,
                transform: `translate3d(0, ${colYOffset(card2In)}px, 0) scale(${colScale(card2In)})`,
              }}
            >
              <div className="vac-lfc-v3__colHead">
                <div className="vac-lfc-v3__stepRow">
                  <span className="vac-lfc-v3__stepTag">Step 2</span>
                  <span className="vac-lfc-v3__stepStatus" data-state={step2Done ? "done" : "loading"}>
                    {step2Done ? "Merged" : "Merging"}
                    <span className="vac-lfc-v3__dots" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </span>
                  </span>
                </div>
                <div className="vac-lfc-v3__colTitle">Cluster</div>
                <div className="vac-lfc-v3__colSummary">De‑dupe repeats into stable refund themes.</div>
              </div>

              <div className="vac-lfc-v3__visual">
                <div className="vac-lfc-v3__example" style={{ opacity: ex2In }}>
                  <div className="vac-lfc-v3__cardList">
                    {themes.map((t) => (
                      <div key={t.title} className="vac-lfc-v3__themeCard">
                        <div className="vac-lfc-v3__themeTitleRow">
                          <span className="vac-lfc-v3__clusterGlyph" aria-hidden="true" />
                          <span className="vac-lfc-v3__themeTitle">{t.title}</span>
                        </div>
                        <div className="vac-lfc-v3__themeMeta">{t.hits} threads</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div
            className="vac-lfc-v3__col"
            ref={step3Ref}
          >
            <div
              className="vac-lfc-v3__colInner"
              style={{
                opacity: card3In,
                transform: `translate3d(0, ${colYOffset(card3In)}px, 0) scale(${colScale(card3In)})`,
              }}
            >
              <div className="vac-lfc-v3__colHead">
                <div className="vac-lfc-v3__stepRow">
                  <span className="vac-lfc-v3__stepTag">Step 3</span>
                  <span className="vac-lfc-v3__stepStatus" data-state={step3Done ? "done" : "loading"}>
                    {step3Done ? "Updated" : "Writing"}
                    <span className="vac-lfc-v3__dots" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </span>
                  </span>
                </div>
                <div className="vac-lfc-v3__colTitle">Write back</div>
                <div className="vac-lfc-v3__colSummary">Update the knowledge base with citations.</div>
              </div>

              <div className="vac-lfc-v3__visual">
                <div className="vac-lfc-v3__example" style={{ opacity: ex3In }}>
                  <div className="vac-lfc-v3__cardList">
                    {knowledge.map((kDoc) => (
                      <div key={kDoc.title} className="vac-lfc-v3__knowledgeCard">
                        <div className="vac-lfc-v3__knowledgeTitle">{kDoc.title}</div>
                        <div className="vac-lfc-v3__citeRow">
                          {kDoc.cites.slice(0, 3).map((c) => {
                            const p = platformForCite(c);
                            return (
                              <span key={c} className="vac-lfc-v3__citeChip" data-platform={p.id}>
                                <img className="vac-lfc-v3__citeIcon" src={p.icon} alt="" />
                                <span className="vac-lfc-v3__citeText">{c}</span>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export function LearnConvCurtainCommitPulse(props: CurtainBaseProps) {
  const p = ramp(props.t, props.start, props.end);
  const o = curtainOpacity(p);
  const anim = clamp01(p / 0.78);
  const k = easeInOutCubic(anim);
  const finished = anim >= 1;

  const ticks = useMemo((): Array<{ i: number; a: number }> => {
    return Array.from({ length: 16 }).map((_, i) => {
      if (finished) return { i, a: 0.0 };
      const phase = (k * 1.6 + i * 0.08) % 1;
      return { i, a: clamp01(1 - Math.abs(phase * 2 - 1)) };
    });
  }, [k, finished]);

  if (o < 0.01) return null;

  const captionIn = clamp01((k - 0.12) / 0.22);

  return (
    <div
      className="vac-curtain vac-curtain--lfc"
      aria-hidden="true"
      style={{
        opacity: o,
        zIndex: props.zIndex ?? 9,
        transform: `translate3d(0, ${mix(10, 0, k)}px, 0)`,
      }}
    >
      <div className="vac-curtain__vignette" />
      <div className="vac-curtain__frame">
        <div className="vac-curtain__title">
          <span className="vac-curtain__kicker">SYNC</span>
          <span className="vac-curtain__headline">knowledge updates</span>
        </div>

        <div
          className="vac-curtain__caption"
          aria-hidden="true"
          style={{
            opacity: captionIn,
            transform: `translate3d(0, ${mix(8, 0, captionIn)}px, 0)`,
          }}
        >
          Writes changes back to your knowledge base so future replies stay consistent.
        </div>

        <svg className="vac-curtain__svg" viewBox="0 0 920 380" aria-label="Commit pulse writes back to knowledge">
          <defs>
            <linearGradient id="vacLfcRing" x1="0" x2="1">
              <stop offset="0%" stopColor="rgb(100 79 184 / 0.22)" />
              <stop offset="55%" stopColor="rgb(100 79 184 / 0.92)" />
              <stop offset="100%" stopColor="rgb(100 79 184 / 0.22)" />
            </linearGradient>
            <filter id="vacLfcBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g filter="url(#vacLfcBlur)">
            <rect
              x="170"
              y="110"
              width="320"
              height="170"
              rx="22"
              fill="rgb(255 255 255 / 0.92)"
              stroke="rgb(76 75 105 / 0.14)"
            />
            <text x="200" y="150" fontSize="12" fontWeight="700" fill="rgb(76 75 105 / 0.9)">
              Knowledge base
            </text>
            {Array.from({ length: 4 }).map((_, i) => (
              <rect
                key={i}
                x="200"
                y={168 + i * 26}
                width={mix(180, 250, clamp01((k * 1.2 - i * 0.12) / 0.9))}
                height="10"
                rx="5"
                fill="rgb(100 79 184 / 0.20)"
              />
            ))}
          </g>

          <g filter="url(#vacLfcBlur)">
            <circle cx="650" cy="196" r="92" fill="rgb(255 255 255 / 0.9)" stroke="rgb(76 75 105 / 0.18)" />
            <circle
              cx="650"
              cy="196"
              r={mix(44, 78, k)}
              fill="none"
              stroke="url(#vacLfcRing)"
              strokeWidth="10"
              opacity={0.92}
            />
            {ticks.map((t) => (
              <circle
                key={t.i}
                cx={650 + Math.cos(t.i) * mix(54, 70, k)}
                cy={196 + Math.sin(t.i) * mix(54, 70, k)}
                r="3"
                fill="rgb(100 79 184 / 0.62)"
                opacity={t.a}
              />
            ))}
            <path
              d="M616 196 L642 222 L692 168"
              fill="none"
              stroke="rgb(28 147 72 / 0.85)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={clamp01((k - 0.42) / 0.18)}
            />
            <text x="650" y="306" textAnchor="middle" fontSize="12" fontWeight="650" fill="rgb(76 75 105 / 0.9)">
              Updated
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}

