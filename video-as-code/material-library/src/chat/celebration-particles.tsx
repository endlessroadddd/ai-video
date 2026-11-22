import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactElement,
} from "react";

const CLIENT_CHAT_CELEBRATION_START_DELAY_MS = 760;
const CLIENT_CHAT_CELEBRATION_VISIBLE_DURATION_MS = 4200;

const CELEBRATION_PARTICLES = [
  { left: "22%", color: "#ff7a59", delayMs: 0, driftX: -26, driftY: -120, rotate: -14, size: 8 },
  { left: "28%", color: "#facc15", delayMs: 40, driftX: -12, driftY: -132, rotate: 18, size: 7 },
  { left: "34%", color: "#34d399", delayMs: 90, driftX: 18, driftY: -138, rotate: -10, size: 9 },
  { left: "40%", color: "#60a5fa", delayMs: 70, driftX: 28, driftY: -112, rotate: 12, size: 7 },
  { left: "48%", color: "#c084fc", delayMs: 120, driftX: -8, driftY: -144, rotate: 20, size: 8 },
  { left: "56%", color: "#fb7185", delayMs: 150, driftX: 24, driftY: -128, rotate: -18, size: 8 },
  { left: "64%", color: "#f59e0b", delayMs: 180, driftX: 34, driftY: -116, rotate: 14, size: 7 },
  { left: "72%", color: "#38bdf8", delayMs: 210, driftX: 12, driftY: -124, rotate: -8, size: 9 },
] as const;

const CELEBRATION_RINGS = [
  { left: "31%", top: "58%", delayMs: 420, size: 62, color: "rgba(255, 122, 89, 0.4)" },
  { left: "69%", top: "58%", delayMs: 510, size: 74, color: "rgba(96, 165, 250, 0.38)" },
  { left: "50%", top: "52%", delayMs: 620, size: 84, color: "rgba(192, 132, 252, 0.28)" },
] as const;

export function ClientChatCelebrationParticles(): ReactElement | null {
  if (import.meta.env.MODE === "test") {
    return null;
  }

  const [shouldRender, setShouldRender] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (reducedMotionQuery.matches) {
      setShouldRender(false);
      return;
    }

    let isCancelled = false;

    const startTimer = window.setTimeout(() => {
      if (!isCancelled) {
        setShouldRender(true);
      }
    }, CLIENT_CHAT_CELEBRATION_START_DELAY_MS);

    const stopTimer = window.setTimeout(() => {
      if (!isCancelled) {
        setShouldRender(false);
      }
    }, CLIENT_CHAT_CELEBRATION_VISIBLE_DURATION_MS);

    return () => {
      isCancelled = true;
      window.clearTimeout(startTimer);
      window.clearTimeout(stopTimer);
    };
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="dashboard-chat-message-celebration-particles"
    >
      {CELEBRATION_PARTICLES.map((particle, index) => (
        <span
          key={`${particle.left}-${particle.delayMs}`}
          className="dashboard-chat-message-celebration-particles-piece"
          style={
            {
              "--celebration-delay": `${particle.delayMs}ms`,
              "--celebration-drift-x": `${particle.driftX}px`,
              "--celebration-drift-y": `${particle.driftY}px`,
              "--celebration-rotate": `${particle.rotate}deg`,
              background: particle.color,
              height: `${particle.size + 5}px`,
              left: particle.left,
              width: `${particle.size}px`,
              zIndex: index % 2 === 0 ? 2 : 1,
            } as CSSProperties
          }
        />
      ))}

      {CELEBRATION_RINGS.map((ring) => (
        <span
          key={`${ring.left}-${ring.delayMs}`}
          className="dashboard-chat-message-celebration-particles-ring"
          style={
            {
              "--celebration-delay": `${ring.delayMs}ms`,
              borderColor: ring.color,
              height: `${ring.size}px`,
              left: ring.left,
              top: ring.top,
              width: `${ring.size}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
