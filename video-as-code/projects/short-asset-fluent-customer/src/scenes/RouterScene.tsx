import { SceneCanvas } from "../components/SceneCanvas";
import { LuciusBadge } from "../components/LuciusMark";

function UserIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
      <circle cx="32" cy="21" r="9" />
      <path d="M16 50c2.8-10 8.2-15 16-15s13.2 5 16 15" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="16" width="44" height="32" rx="5" />
      <path d="m12 21 20 15 20-15" />
    </svg>
  );
}

const promptLines = [
  "请向客户发送产品更新通知邮件。",
  "重点说明新功能和升级收益。",
  "语气保持专业和友好。",
  "包含支持联系方式。",
  "使用日语输出。",
];

const metricItems = [
  { icon: "check", label: "Intent preserved", sub: "意図を正確に保持" },
  { icon: "target", label: "Channel matched", sub: "最適なチャネルにルーティング" },
  { icon: "tone", label: "Tone adjusted", sub: "丁寧でプロフェッショナルなトーンに調整" },
];

function ToneIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M24 5c1.8 10.4 7.6 16.2 18 18-10.4 1.8-16.2 7.6-18 18-1.8-10.4-7.6-16.2-18-18 10.4-1.8 16.2-7.6 18-18Z" />
    </svg>
  );
}

export function RouterScene() {
  return (
    <SceneCanvas variant="warm" className="motion-router">
      <style>{`.router-email-copy p { margin: 0 0 8px; }`}</style>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 49% 48%, rgba(100,79,184,0.07), transparent 21%), linear-gradient(145deg, rgba(255,255,255,0.82), rgba(244,239,227,0.46))",
        }}
      />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
      >
        <defs>
          <filter id="routerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="routerPurpleFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7357D9" stopOpacity="0" />
            <stop offset="45%" stopColor="#8E72F0" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#B7A8FF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#7357D9" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Soft glow backdrop */}
        <g filter="url(#routerGlow)" opacity="0.2">
          <path d="M 29.8 28.5 H 36 C 40 28.5, 42 41, 45.5 41.5" stroke="#8E72F0" strokeWidth="0.42" fill="none" strokeLinecap="round" />
          <path d="M 29.8 61 H 36 C 40 61, 42 52, 45.5 51.5" stroke="#26BFD4" strokeWidth="0.42" fill="none" strokeLinecap="round" />
          <path d="M 54.5 41 C 57 41, 58 28.5, 64.8 28.5" stroke="#7357D9" strokeWidth="0.42" fill="none" strokeLinecap="round" />
          <path d="M 54.5 51.5 C 57 51.5, 58 61.5, 60.7 61.5" stroke="#7357D9" strokeWidth="0.42" fill="none" strokeLinecap="round" />
        </g>

        {/* Main connection lines */}
        <path d="M 29.8 28.5 H 36 C 40 28.5, 42 41, 45.5 41.5" fill="none" stroke="#8E72F0" strokeWidth="0.16" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset="1" style={{ animation: "routerLineDrawIn 900ms var(--ease-emphasis) 300ms forwards, routerLineBreathe 3.6s ease-in-out 2000ms infinite" }} />
        <path d="M 29.8 61 H 36 C 40 61, 42 52, 45.5 51.5" fill="none" stroke="#26BFD4" strokeWidth="0.16" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset="1" style={{ animation: "routerLineDrawIn 900ms var(--ease-emphasis) 450ms forwards, routerLineBreathe 3.6s ease-in-out 2150ms infinite" }} />
        <path d="M 54.5 41 C 57 41, 58 28.5, 64.8 28.5" fill="none" stroke="#7357D9" strokeWidth="0.16" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset="1" style={{ animation: "routerLineDrawIn 900ms var(--ease-emphasis) 1050ms forwards, routerLineBreathe 3.6s ease-in-out 2750ms infinite" }} />
        <path d="M 54.5 51.5 C 57 51.5, 58 61.5, 60.7 61.5" fill="none" stroke="#7357D9" strokeWidth="0.16" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset="1" style={{ animation: "routerLineDrawIn 900ms var(--ease-emphasis) 1200ms forwards, routerLineBreathe 3.6s ease-in-out 2900ms infinite" }} />

        {/* Subtle flow overlay lines */}
        <path d="M 29.8 28.5 H 36 C 40 28.5, 42 41, 45.5 41.5" fill="none" stroke="url(#routerPurpleFlow)" strokeWidth="0.08" strokeLinecap="round" pathLength="1" strokeDasharray="0.5 4.5" strokeDashoffset="1" style={{ animation: "routerFlowDrawIn 900ms var(--ease-emphasis) 300ms forwards, routerFlowTravel 3.5s linear 2000ms infinite" }} />
        <path d="M 29.8 61 H 36 C 40 61, 42 52, 45.5 51.5" fill="none" stroke="#67D6FF" strokeWidth="0.08" strokeLinecap="round" pathLength="1" strokeDasharray="0.5 4.5" strokeDashoffset="1" style={{ animation: "routerFlowDrawIn 900ms var(--ease-emphasis) 450ms forwards, routerFlowTravel 3.5s linear 2150ms infinite" }} />
        <path d="M 54.5 41 C 57 41, 58 28.5, 64.8 28.5" fill="none" stroke="url(#routerPurpleFlow)" strokeWidth="0.08" strokeLinecap="round" pathLength="1" strokeDasharray="0.5 4.5" strokeDashoffset="1" style={{ animation: "routerFlowDrawIn 900ms var(--ease-emphasis) 1050ms forwards, routerFlowTravel 3.5s linear 2750ms infinite" }} />
        <path d="M 54.5 51.5 C 57 51.5, 58 61.5, 60.7 61.5" fill="none" stroke="url(#routerPurpleFlow)" strokeWidth="0.08" strokeLinecap="round" pathLength="1" strokeDasharray="0.5 4.5" strokeDashoffset="1" style={{ animation: "routerFlowDrawIn 900ms var(--ease-emphasis) 1200ms forwards, routerFlowTravel 3.5s linear 2900ms infinite" }} />

        {/* Card-side start nodes */}
        <circle cx="29.8" cy="28.5" r="0.4" fill="#8E72F0" stroke="#fff" strokeWidth="0.14" opacity="0" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "routerNodePop 420ms var(--ease-emphasis) 550ms forwards" }} />
        <circle cx="29.8" cy="61" r="0.4" fill="#26BFD4" stroke="#fff" strokeWidth="0.14" opacity="0" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "routerNodePop 420ms var(--ease-emphasis) 600ms forwards" }} />
        <circle cx="64.8" cy="28.5" r="0.4" fill="#7357D9" stroke="#fff" strokeWidth="0.14" opacity="0" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "routerNodePop 420ms var(--ease-emphasis) 1300ms forwards" }} />
        <circle cx="60.7" cy="61.5" r="0.4" fill="#7357D9" stroke="#fff" strokeWidth="0.14" opacity="0" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "routerNodePop 420ms var(--ease-emphasis) 1350ms forwards" }} />

        {/* Lucius-side end nodes */}
        <circle cx="45.5" cy="41.5" r="0.48" fill="#fff" stroke="#8E72F0" strokeWidth="0.16" opacity="0" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "routerNodePop 420ms var(--ease-emphasis) 550ms forwards" }} />
        <circle cx="45.5" cy="51.5" r="0.48" fill="#fff" stroke="#26BFD4" strokeWidth="0.16" opacity="0" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "routerNodePop 420ms var(--ease-emphasis) 600ms forwards" }} />
        <circle cx="54.5" cy="41" r="0.48" fill="#fff" stroke="#7357D9" strokeWidth="0.16" opacity="0" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "routerNodePop 420ms var(--ease-emphasis) 1300ms forwards" }} />
        <circle cx="54.5" cy="51.5" r="0.48" fill="#fff" stroke="#7357D9" strokeWidth="0.16" opacity="0" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "routerNodePop 420ms var(--ease-emphasis) 1350ms forwards" }} />

        {/* Label anchor nodes */}
        <circle cx="36" cy="28.5" r="0.32" fill="#fff" stroke="#8E72F0" strokeWidth="0.13" opacity="0" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "routerNodePop 380ms var(--ease-emphasis) 700ms forwards" }} />
        <circle cx="36" cy="61" r="0.32" fill="#fff" stroke="#26BFD4" strokeWidth="0.13" opacity="0" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "routerNodePop 380ms var(--ease-emphasis) 850ms forwards" }} />
        <circle cx="59" cy="28.5" r="0.32" fill="#fff" stroke="#7357D9" strokeWidth="0.13" opacity="0" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "routerNodePop 380ms var(--ease-emphasis) 1450ms forwards" }} />
        <circle cx="58.5" cy="61.5" r="0.32" fill="#fff" stroke="#7357D9" strokeWidth="0.13" opacity="0" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "routerNodePop 380ms var(--ease-emphasis) 1600ms forwards" }} />
      </svg>

      {[
        { label: "ZH", left: "35.5%", top: "24.5%", color: "#7357D9", accent: "#8E72F0", delay: 750 },
        { label: "ES", left: "36.5%", top: "64.5%", color: "#26BFD4", accent: "#26BFD4", delay: 900 },
        { label: "JP", left: "59%", top: "24.5%", color: "#5C3AD2", accent: "#7357D9", delay: 1500 },
        { label: "EN", left: "58.5%", top: "64.5%", color: "#7357D9", accent: "#7357D9", delay: 1650 },
      ].map((badge) => (
        <div
          key={badge.label}
          className="router-lang-badge"
          style={{
            position: "absolute",
            left: badge.left,
            top: badge.top,
            translate: "-50% -50%",
            zIndex: 4,
            padding: "6px 13px",
            borderRadius: "10px",
            border: `1.5px solid ${badge.accent}35`,
            background: "rgba(255,255,255,0.97)",
            boxShadow: `0 3px 12px ${badge.accent}12, 0 1px 3px rgba(0,0,0,0.04)`,
            color: badge.color,
            fontSize: "clamp(15px, 1.1vw, 21px)",
            fontWeight: 800,
            letterSpacing: "0.04em",
            opacity: 0,
            animation: `routerLabelFloatIn 480ms var(--ease-emphasis) ${badge.delay}ms forwards`,
          }}
        >
          {badge.label}
        </div>
      ))}

      <section
        style={{
          position: "absolute",
          left: "3.6%",
          top: "16.9%",
          width: "26.2%",
          height: "62.2%",
          zIndex: 3,
          padding: "51px 26px 38px",
          borderRadius: "18px",
          border: "1px solid rgba(216,207,191,0.86)",
          background: "rgba(255,255,255,0.84)",
          boxShadow: "0 22px 58px rgba(47,39,26,0.09)",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: "24px",
            top: "25px",
            width: "7px",
            height: "79px",
            borderRadius: "999px",
            background: "linear-gradient(180deg, #6B5AF5, #765BE5)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "28px", marginLeft: "38px", marginBottom: "41px", color: "var(--color-brand)" }}>
          <UserIcon />
          <div style={{ color: "var(--color-text)", fontSize: "clamp(22px, 1.65vw, 31px)", fontWeight: 800 }}>
            Operator <span style={{ color: "var(--color-muted)", fontWeight: 500 }}>· zh-CN</span>
          </div>
        </div>
        <div
          style={{
            marginLeft: "0",
            padding: "25px 25px",
            borderRadius: "14px",
            border: "1px solid rgba(100,79,184,0.2)",
            background: "rgba(100,79,184,0.035)",
            color: "var(--color-text)",
            fontSize: "clamp(19px, 1.35vw, 25px)",
            lineHeight: 1.85,
          }}
        >
          {promptLines.map((line) => (
            <p key={line} style={{ margin: "0 0 17px" }}>
              {line}
            </p>
          ))}
        </div>
      </section>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "47.3%",
          translate: "-50% -50%",
          zIndex: 5,
          display: "grid",
          placeItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "175%",
            height: "155%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(100,79,184,0.18), transparent 64%)",
            filter: "blur(6px)",
          }}
        />
        <LuciusBadge size="clamp(148px, 10.6vw, 184px)" />
      </div>

      <section
        style={{
          position: "absolute",
          right: "3.4%",
          top: "10.5%",
          width: "32.1%",
          height: "63.5%",
          zIndex: 3,
          padding: "30px 28px 18px",
          borderRadius: "18px",
          border: "1px solid rgba(216,207,191,0.86)",
          background: "rgba(255,255,255,0.86)",
          boxShadow: "0 22px 58px rgba(47,39,26,0.09)",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: "20px",
            top: "24px",
            width: "7px",
            height: "76px",
            borderRadius: "999px",
            background: "linear-gradient(180deg, #765BE5, #6B5AF5)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "22px", marginLeft: "38px", marginBottom: "18px", color: "var(--color-brand)" }}>
          <MailIcon />
          <div style={{ color: "var(--color-text)", fontSize: "clamp(22px, 1.6vw, 31px)", fontWeight: 800 }}>
            Email <span style={{ color: "var(--color-muted)", fontWeight: 500 }}>· NexLogix</span>
          </div>
        </div>
        <div
          style={{
            marginLeft: "0",
            borderRadius: "14px",
            overflow: "hidden",
            border: "1px solid rgba(100,79,184,0.22)",
            background: "rgba(255,255,255,0.82)",
            color: "var(--color-text)",
            fontSize: "clamp(14px, 0.92vw, 18px)",
            lineHeight: 1.52,
          }}
        >
          <div style={{ padding: "15px 24px", background: "rgba(100,79,184,0.06)", fontWeight: 800, fontSize: "clamp(16px, 1.08vw, 20px)" }}>
            件名：新機能のご案内とアップデートについて
          </div>
          <div className="router-email-copy" style={{ padding: "18px 26px 16px" }}>
            <p style={{ margin: "0 0 12px" }}>いつもご利用いただき、ありがとうございます。</p>
            <p style={{ margin: "0 0 20px" }}>このたび、Luciusの新機能とアップデートについてご案内いたします。</p>
            <div style={{ height: "1px", background: "rgba(216,207,191,0.86)", margin: "12px 0" }} />
            {[
              "新機能により、業務効率がさらに向上します",
              "パフォーマンスと安定性を強化しました",
              "導入は簡単、サポートも万全です",
            ].map((line) => (
              <div key={line} style={{ display: "flex", gap: "12px", alignItems: "center", margin: "8px 0" }}>
                <span
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    background: "var(--color-brand)",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 900,
                  }}
                >
                  ✓
                </span>
                <span>{line}</span>
              </div>
            ))}
            <div style={{ height: "1px", background: "rgba(216,207,191,0.86)", margin: "12px 0" }} />
            <p style={{ margin: "0 0 18px" }}>ご不明点がございましたら、サポートまでお気軽にご連絡ください。</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "13px",
                padding: "9px 15px",
                borderRadius: "10px",
                border: "1px solid rgba(100,79,184,0.18)",
                background: "rgba(100,79,184,0.055)",
                color: "var(--color-brand)",
                fontWeight: 800,
              }}
            >
              <span>🎧</span>
              <span>サポート窓口：support@nexlogix.co.jp</span>
            </div>
          </div>
        </div>
      </section>

      <footer
        style={{
          position: "absolute",
          left: "3.55%",
          right: "3.55%",
          bottom: "2.7%",
          height: "7.7%",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          alignItems: "center",
          padding: "0 44px",
          borderRadius: "14px",
          border: "1px solid rgba(216,207,191,0.86)",
          background: "rgba(255,255,255,0.78)",
          boxShadow: "0 14px 38px rgba(47,39,26,0.07)",
        }}
      >
        {metricItems.map((metric, index) => (
          <div
            key={metric.label}
            style={{
              display: "grid",
              gridTemplateColumns: "44px minmax(0, 1fr)",
              gap: "16px",
              alignItems: "center",
              paddingLeft: index === 0 ? 0 : "46px",
              borderLeft: index === 0 ? undefined : "1px solid rgba(216,207,191,0.86)",
            }}
          >
            <span
              style={{
                width: "38px",
                height: "38px",
                display: "grid",
                placeItems: "center",
                borderRadius: "50%",
                color: index === 2 ? "var(--color-brand)" : index === 1 ? "#1769E8" : "#20874C",
                border: index === 0 ? "2px solid #20874C" : "none",
              }}
            >
              {metric.icon === "tone" ? (
                <ToneIcon />
              ) : metric.icon === "target" ? (
                <svg width="42" height="42" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3">
                  <circle cx="24" cy="24" r="13" />
                  <circle cx="24" cy="24" r="5" />
                  <path d="M34 14 42 6M36 6h6v6" />
                </svg>
              ) : (
                "✓"
              )}
            </span>
            <span>
              <strong style={{ display: "block", fontSize: "clamp(14px, 0.94vw, 18px)" }}>{metric.label}</strong>
              <span style={{ display: "block", color: "var(--color-muted)", fontSize: "clamp(12px, 0.78vw, 15px)", marginTop: "4px" }}>{metric.sub}</span>
            </span>
          </div>
        ))}
      </footer>
    </SceneCanvas>
  );
}
