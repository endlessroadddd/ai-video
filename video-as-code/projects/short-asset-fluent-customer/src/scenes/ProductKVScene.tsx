import { channelResults } from "../data/fluent-customer-data";
import { SceneCanvas } from "../components/SceneCanvas";
import { LuciusLogo } from "../components/LuciusMark";

const cardPositions = [
  { left: "3.4%", top: "10.5%", icon: "./icons/discord.svg", language: "ES", opacity: 0.18 },
  { right: "3.4%", top: "10.5%", icon: "./icons/slack.svg", language: "EN", opacity: 0.18 },
  { left: "3.4%", bottom: "9.2%", icon: "./icons/feishu.svg", language: "ZH", opacity: 0.18 },
  { right: "3.4%", bottom: "9.2%", icon: "./icons/email.svg", language: "JP", opacity: 0.18 },
];

export function ProductKVScene() {
  return (
    <SceneCanvas variant="warm" className="motion-product-kv">
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(100,79,184,0.035), transparent 24%), linear-gradient(145deg, rgba(255,255,255,0.86), rgba(244,239,227,0.46))",
        }}
      />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.12 }}
      >
        <path d="M 30.4 23 C 36 23, 40 30, 43.2 36.2" fill="none" stroke="#7357D9" strokeWidth="0.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 69.6 23 C 64 23, 60 30, 56.8 36.2" fill="none" stroke="#7357D9" strokeWidth="0.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 30.4 76 C 36 76, 40 69, 43.2 63.8" fill="none" stroke="#26BFD4" strokeWidth="0.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 69.6 76 C 64 76, 60 69, 56.8 63.8" fill="none" stroke="#7357D9" strokeWidth="0.2" strokeLinecap="round" strokeLinejoin="round" />
        {[["43.2", "36.2", "#7357D9"], ["56.8", "36.2", "#7357D9"], ["43.2", "63.8", "#26BFD4"], ["56.8", "63.8", "#7357D9"]].map(([cx, cy, color]) => (
                    <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.42" fill="#fff" stroke={color} strokeWidth="0.16" opacity="0.95" />
        ))}
      </svg>

      {channelResults.map((ch, index) => {
        const position = cardPositions[index];
        return (
          <div
            key={ch.platform}
            style={{
              position: "absolute",
              left: position.left,
              right: position.right,
              top: position.top,
              bottom: position.bottom,
              width: "29.5%",
              minHeight: "19.2%",
              padding: "28px 30px 26px 78px",
              borderRadius: "15px",
              border: "1px solid rgba(216,207,191,0.72)",
              background: "rgba(255,255,255,0.66)",
              boxShadow: "0 18px 42px rgba(47,39,26,0.045)",
              opacity: position.opacity,
              color: "var(--color-text)",
              filter: "saturate(0.75)",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: "25px",
                top: "28px",
                bottom: "28px",
                width: "7px",
                borderRadius: "999px",
                background: ch.accent,
              }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "22px" }}>
              <span
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "14px",
                  display: "grid",
                  placeItems: "center",
                  border: "1px solid rgba(100,79,184,0.12)",
                  background: "rgba(255,255,255,0.8)",
                  padding: "8px",
                }}
              >
                <img src={position.icon} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </span>
              <strong style={{ fontSize: "clamp(17px, 1.2vw, 23px)" }}>
                {ch.platform} <span style={{ color: "var(--color-muted)", fontWeight: 600 }}>· {ch.audience}</span>
              </strong>
              <span style={{ marginLeft: "auto", color: "var(--color-muted)", fontWeight: 800 }}>{position.language}</span>
            </div>
            <p style={{ margin: "0 0 16px", fontSize: "clamp(15px, 1.02vw, 20px)", lineHeight: 1.45 }}>{ch.snippet}</p>
            <div style={{ height: "1px", background: "rgba(216,207,191,0.86)", marginBottom: "14px" }} />
            <strong style={{ color: "#2F7D45", fontSize: "clamp(14px, 1vw, 18px)" }}>{ch.status}</strong>
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          translate: "-50% -50%",
          textAlign: "center",
          color: "var(--color-text)",
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: "24px", marginBottom: "34px" }}>
          <LuciusLogo size="86px" tone="dark" />
          <span style={{ fontSize: "clamp(62px, 5.2vw, 88px)", lineHeight: 1, fontWeight: 900 }}>Lucius</span>
        </div>
        <p style={{ margin: 0, fontSize: "clamp(24px, 1.75vw, 34px)", lineHeight: 1.55, fontWeight: 500 }}>
          Wherever they are. Whatever they speak.<br />
          One brain. Every channel. Every tongue.
        </p>
      </div>
    </SceneCanvas>
  );
}
