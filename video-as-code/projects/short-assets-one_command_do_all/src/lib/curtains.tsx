import { useMemo } from "react";

type CurtainBaseProps = {
  /** Global timeline time in ms. */
  t: number;
  /** Window start in ms (inclusive). */
  start: number;
  /** Window end in ms (exclusive). */
  end: number;
  /** Z-index within camera container. */
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

export function OneCommandCurtainEverywhere(props: CurtainBaseProps) {
  const p = ramp(props.t, props.start, props.end);
  const o = curtainOpacity(p);
  // Run internal motion a bit slower so it reads "fully played".
  const anim = clamp01(p / 0.985);
  const travel = easeInOutCubic(anim);
  const finished = anim >= 1;
  const enter = easeOutCubic(clamp01(p / 0.16));
  const exit = easeInCubic(clamp01((p - 0.92) / 0.08));

  const float = Math.sin(p * Math.PI * 2) * 0.9;

  const dash = useMemo(() => {
    // Deterministic pseudo motion without CSS animations (timeline driven).
    return mix(54, 6, travel).toFixed(2);
  }, [travel]);

  if (o < 0.01) return null;

  return (
    <div
      className="vac-curtain vac-curtain--onecmd"
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
          <img
            src="/figma-auth/Logo%20Mark_black.svg"
            alt="Lucius"
            className="vac-curtain__logo"
          />
          <div className="vac-curtain__title-text">
            <span className="vac-curtain__kicker">Lucius · Client Agent</span>
            <span className="vac-curtain__headline">One command, everywhere</span>
          </div>
        </div>

        <div
          className="vac-curtain__caption"
          aria-hidden="true"
          style={{
            opacity: mix(0, 1, easeOutCubic(clamp01((p - 0.08) / 0.18))),
            transform: `translate3d(-50%, ${mix(8, 0, easeOutCubic(clamp01((p - 0.08) / 0.18)))}px, 0)`,
          }}
        >
          You type once. Lucius delivers consistent follow‑ups across Feishu, Discord, Telegram, and Slack.
        </div>

        <svg
          className="vac-curtain__svg"
          viewBox="0 0 920 380"
          role="img"
          aria-label="One command branches to every platform"
        >
          <defs>
            <linearGradient id="vacOnecmdGlow" x1="0" x2="1">
              <stop offset="0%" stopColor="rgb(100 79 184 / 0.0)" />
              <stop offset="45%" stopColor="rgb(100 79 184 / 0.6)" />
              <stop offset="100%" stopColor="rgb(100 79 184 / 0.0)" />
            </linearGradient>
            <linearGradient id="vacOnecmdFlow" x1="0" x2="1">
              <stop offset="0%" stopColor="rgb(100 79 184 / 0.0)" />
              <stop offset="40%" stopColor="rgb(100 79 184 / 0.75)" />
              <stop offset="100%" stopColor="rgb(100 79 184 / 0.0)" />
            </linearGradient>
            <filter id="vacOnecmdBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="
                  1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 0.55 0"
              />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background grid */}
          <g opacity={mix(0.0, 0.28, easeOutCubic(clamp01((p - 0.04) / 0.18)))}>
            {Array.from({ length: 14 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1="80"
                y1={60 + i * 20}
                x2="840"
                y2={60 + i * 20}
                stroke="rgb(76 75 105 / 0.18)"
                strokeWidth="1"
              />
            ))}
            {Array.from({ length: 16 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={120 + i * 46}
                y1="44"
                x2={120 + i * 46}
                y2="336"
                stroke="rgb(76 75 105 / 0.14)"
                strokeWidth="1"
              />
            ))}
          </g>

          {/* Sparkles (subtle breathing motion) */}
          <g opacity={mix(0.0, 1.0, easeOutCubic(clamp01((p - 0.12) / 0.18)))}>
            {Array.from({ length: 14 }).map((_, i) => {
              const phase = (p * 1.2 + i * 0.17) % 1;
              const a = 0.12 + 0.18 * (1 - Math.abs(phase * 2 - 1));
              const r = 1.6 + 1.4 * (1 - Math.abs(phase * 2 - 1));
              const x = 140 + (i * 53) % 700;
              const y = 84 + ((i * 37) % 220);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={r}
                  fill="rgb(100 79 184 / 0.55)"
                  opacity={a}
                />
              );
            })}
          </g>

          {/* Center command pill */}
          <g
            filter="url(#vacOnecmdBlur)"
            style={{
              opacity: mix(0, 1, easeOutCubic(clamp01((p - 0.1) / 0.2))),
              transform: `translate3d(0, ${mix(10, 0, easeOutCubic(clamp01((p - 0.1) / 0.2)))}px, 0)`,
            }}
          >
            <rect
              x="350"
              y="160"
              rx="18"
              ry="18"
              width="220"
              height="64"
              fill="rgb(255 255 255 / 0.92)"
              stroke="rgb(76 75 105 / 0.18)"
            />
            <text
              x="460"
              y="198"
              textAnchor="middle"
              fontSize="14"
              fontWeight="650"
              fill="rgb(43 42 58 / 0.92)"
              style={{ letterSpacing: "-0.01em" }}
            >
              Send refund follow‑up
            </text>
          </g>

          {/* Platform nodes */}
          {[
            { x: 160, y: 92, label: "Feishu", icon: "/platform-icons/feishu.svg" },
            { x: 160, y: 274, label: "Slack", icon: "/platform-icons/slack.svg" },
            { x: 760, y: 118, label: "Discord", icon: "/platform-icons/discord.svg" },
            { x: 760, y: 274, label: "Telegram", icon: "/platform-icons/telegram.svg" },
          ].map((n, idx) => {
            const nodeIn = easeOutCubic(clamp01((travel - 0.18 - idx * 0.1) / 0.32));
            return (
            <g
              key={n.label}
              filter="url(#vacOnecmdBlur)"
              opacity={nodeIn}
              transform={`translate(0 ${mix(10, 0, nodeIn)}) scale(${mix(0.92, 1, nodeIn)})`}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            >
              <circle cx={n.x} cy={n.y} r="26" fill="rgb(255 255 255 / 0.9)" stroke="rgb(76 75 105 / 0.18)" />
              <circle
                cx={n.x}
                cy={n.y}
                r={mix(11, 18, nodeIn)}
                fill="none"
                stroke="rgb(76 75 105 / 0.14)"
                strokeWidth="2"
                opacity={mix(0.0, 1, nodeIn) * mix(1, 0.75, exit)}
              />
              <image
                href={n.icon}
                x={n.x - 11}
                y={n.y - 11}
                width="22"
                height="22"
                opacity={mix(0, 1, nodeIn)}
                preserveAspectRatio="xMidYMid meet"
              />
              <text
                x={n.x}
                y={n.y + 52}
                textAnchor="middle"
                fontSize="12"
                fontWeight="650"
                fill="rgb(76 75 105 / 0.9)"
              >
                {n.label}
              </text>
            </g>
          )})}

          {/* Branching flows */}
          {(() => {
            const pill = {
              x: 350,
              y: 160,
              w: 220,
              h: 64,
            };
            const pillMidY = pill.y + pill.h / 2;
            const pillLeftX = pill.x;
            const pillRightX = pill.x + pill.w;

            const nodeR = 26;
            const nFeishu = { x: 160, y: 92 };
            const nSlack = { x: 160, y: 274 };
            const nDiscord = { x: 760, y: 118 };
            const nTelegram = { x: 760, y: 274 };

            const edgeInset = 0; // touching circle edge

            const leftPath = {
              d: `M${pillLeftX} ${pillMidY} C${pillLeftX - 70} ${pillMidY - 40}, ${nFeishu.x + nodeR + 60} ${nFeishu.y}, ${nFeishu.x + nodeR + edgeInset} ${nFeishu.y}`,
              delay: 0.0,
            };
            const leftBottomPath = {
              d: `M${pillLeftX} ${pillMidY} C${pillLeftX - 70} ${pillMidY + 44}, ${nSlack.x + nodeR + 60} ${nSlack.y}, ${nSlack.x + nodeR + edgeInset} ${nSlack.y}`,
              delay: 0.12,
            };
            const rightTopPath = {
              d: `M${pillRightX} ${pillMidY} C${pillRightX + 70} ${pillMidY - 36}, ${nDiscord.x - nodeR - 60} ${nDiscord.y}, ${nDiscord.x - nodeR - edgeInset} ${nDiscord.y}`,
              delay: 0.24,
            };
            const rightBottomPath = {
              d: `M${pillRightX} ${pillMidY} C${pillRightX + 70} ${pillMidY + 40}, ${nTelegram.x - nodeR - 60} ${nTelegram.y}, ${nTelegram.x - nodeR - edgeInset} ${nTelegram.y}`,
              delay: 0.36,
            };

            return [leftPath, leftBottomPath, rightTopPath, rightBottomPath];
          })().map((path, idx) => {
            // Make each transport line appear sequentially (not all at once).
            const flowIn = easeOutCubic(clamp01((travel - (0.1 + path.delay)) / 0.36));
            const strokeFade = mix(0.0, 1.0, flowIn) * mix(1, 0.75, exit);
            const dashOffset = (Number(dash) + idx * 9).toFixed(2);

            return (
            <g key={idx} opacity={strokeFade}>
              {!finished ? (
                <path
                  d={path.d}
                  fill="none"
                  stroke="url(#vacOnecmdFlow)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="14 18"
                  strokeDashoffset={dashOffset}
                  opacity={mix(0.0, 1, clamp01((flowIn - 0.08) / 0.6))}
                />
              ) : (
                <path
                  d={path.d}
                  fill="none"
                  stroke="rgb(100 79 184 / 0.42)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity={0.95}
                />
              )}
            </g>
          )})}

          {/* Finished state: replace "flowing light" with concrete example payloads */}
          {finished ? (
            <g filter="url(#vacOnecmdBlur)">
              {[
                { x: 70, y: 58, label: "Refund issue resolved", sub: "Follow‑up sent" },
                { x: 640, y: 80, label: "Refund update", sub: "Delivered" },
                { x: 640, y: 236, label: "Refund update", sub: "Delivered" },
              ].map((c) => (
                <g key={`${c.x}-${c.y}`}>
                  <rect
                    x={c.x}
                    y={c.y}
                    width="210"
                    height="56"
                    rx="14"
                    fill="rgb(255 255 255 / 0.92)"
                    stroke="rgb(76 75 105 / 0.14)"
                  />
                  <rect x={c.x + 14} y={c.y + 18} width="140" height="6" rx="3" fill="rgb(43 42 58 / 0.18)" />
                  <rect x={c.x + 14} y={c.y + 32} width="110" height="5" rx="2.5" fill="rgb(100 79 184 / 0.22)" />
                  {/* Process-only: no completion checkmarks in this scene. */}
                  <circle cx={c.x + 184} cy={c.y + 28} r="6" fill="rgb(100 79 184 / 0.22)" />
                </g>
              ))}
            </g>
          ) : null}
        </svg>
      </div>
    </div>
  );
}

export function OneCommandCurtainPulseQueue(props: CurtainBaseProps) {
  const p = ramp(props.t, props.start, props.end);
  const o = curtainOpacity(p);
  const anim = clamp01(p / 0.76);
  const k = easeInOutCubic(anim);
  const finished = anim >= 1;

  const bars = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => {
      if (finished) {
        const h = 24 + (i % 3) * 10;
        return { i, h };
      }
      const phase = (k * 1.8 + i * 0.14) % 1;
      const h = 14 + 44 * (1 - Math.abs(phase * 2 - 1));
      return { i, h };
    });
  }, [k, finished]);

  if (o < 0.01) return null;

  const ring = mix(0.18, 0.96, k);

  return (
    <div
      className="vac-curtain vac-curtain--onecmd"
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
          <span className="vac-curtain__kicker">DELIVERY</span>
          <span className="vac-curtain__headline">in motion</span>
        </div>
        <svg className="vac-curtain__svg" viewBox="0 0 920 380" aria-label="Queue pulses and delivery confirmation">
          <defs>
            <linearGradient id="vacOnecmdRing" x1="0" x2="1">
              <stop offset="0%" stopColor="rgb(100 79 184 / 0.2)" />
              <stop offset="55%" stopColor="rgb(100 79 184 / 0.9)" />
              <stop offset="100%" stopColor="rgb(100 79 184 / 0.2)" />
            </linearGradient>
            <filter id="vacOnecmdSoft" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g transform="translate(120, 70)">
            {bars.map((b) => (
              <rect
                key={b.i}
                x={b.i * 30}
                y={220 - b.h}
                width="18"
                height={b.h}
                rx="8"
                fill="rgb(100 79 184 / 0.22)"
              />
            ))}
          </g>

          <g filter="url(#vacOnecmdSoft)">
            <circle cx="690" cy="200" r="88" fill="rgb(255 255 255 / 0.9)" stroke="rgb(76 75 105 / 0.18)" />
            <circle cx="690" cy="200" r={mix(46, 74, ring)} fill="none" stroke="url(#vacOnecmdRing)" strokeWidth="10" opacity={0.9} />
            <path
              d="M655 200 L682 226 L734 172"
              fill="none"
              stroke="rgb(28 147 72 / 0.85)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={mix(0.0, 1.0, clamp01((k - 0.38) / 0.22))}
            />
            <text x="690" y="306" textAnchor="middle" fontSize="12" fontWeight="650" fill="rgb(76 75 105 / 0.9)">
              Delivered
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}

