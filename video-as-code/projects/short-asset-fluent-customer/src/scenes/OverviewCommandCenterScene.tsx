import { channelResults } from "../data/fluent-customer-data";
import { SceneCanvas } from "../components/SceneCanvas";
import { LuciusBadge } from "../components/LuciusMark";

interface ChannelLayout {
  language: string;
  icon: string;
  iconPadding?: string;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  line: string;
  labelX: string;
  labelY: string;
}

const channelLayout: ChannelLayout[] = [
  {
    language: "ES",
    icon: "./icons/discord.svg",
    left: "3.2vw",
    top: "9.4vh",
    line: "M 35.3 25.8 C 40 25.8, 42 34, 47.1 42.2",
    labelX: "40.4%",
    labelY: "25.8%",
  },
  {
    language: "EN",
    icon: "./icons/slack.svg",
    iconPadding: "8px",
    right: "3.2vw",
    top: "9.4vh",
    line: "M 64.7 25.8 C 60 25.8, 58 34, 52.9 42.2",
    labelX: "59.6%",
    labelY: "25.8%",
  },
  {
    language: "ZH",
    icon: "./icons/feishu.svg",
    iconPadding: "5px",
    left: "3.2vw",
    bottom: "16.5vh",
    line: "M 35.3 68 C 40 68, 42 58, 47.1 49.1",
    labelX: "40.4%",
    labelY: "68%",
  },
  {
    language: "JP",
    icon: "./icons/email.svg",
    iconPadding: "9px",
    right: "3.2vw",
    bottom: "16.5vh",
    line: "M 64.7 68 C 60 68, 58 58, 52.9 49.1",
    labelX: "59.6%",
    labelY: "68%",
  },
];

export function OverviewCommandCenterScene() {
  return (
    <SceneCanvas variant="warm" className="motion-overview">
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(100,79,184,0.08), transparent 20%), linear-gradient(145deg, rgba(255,255,255,0.74), rgba(244,239,227,0.46))",
        }}
      />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {channelLayout.map((layout, index) => (
          <path
            key={layout.language}
            d={layout.line}
            fill="none"
            stroke={layout.language === "ZH" ? "#26BFD4" : "#7357D9"}
            strokeWidth="0.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.72"
            style={{
              strokeDasharray: 30,
              strokeDashoffset: -30,
              animation: `routeDraw 900ms var(--ease-soft) ${300 + index * 500}ms forwards`,
            }}
          />
        ))}
        {[
          ["47.1", "42.2"],
          ["52.9", "42.2"],
          ["47.1", "49.1"],
          ["52.9", "49.1"],
        ].map(([cx, cy], index) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="0.42"
            fill="#fff"
            stroke={index === 2 ? "#26BFD4" : "#7357D9"}
            strokeWidth="0.16"
            opacity="0.95"
          />
        ))}
      </svg>

      {channelLayout.map((layout, index) => (
        <div
          key={`${layout.language}-badge`}
          style={{
            position: "absolute",
            left: layout.labelX,
            top: layout.labelY,
            zIndex: 3,
            translate: "-50% -50%",
            padding: "8px 15px",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.94)",
            border: "1px solid var(--color-border)",
            boxShadow: "0 8px 20px rgba(31,34,48,0.08)",
            color: layout.language === "ZH" ? "#20B5C6" : "var(--color-brand)",
            fontWeight: 800,
            fontSize: "clamp(13px, 1.2vw, 18px)",
            animation: `fadeInScale 420ms var(--ease-soft) ${700 + index * 500}ms both`,
          }}
        >
          {layout.language}
        </div>
      ))}

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "45%",
          translate: "-50% -50%",
          zIndex: 4,
          display: "grid",
          placeItems: "center",
        }}
      >
        {/* 底部光晕 */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "55%",
            translate: "-50% -50%",
            width: "160%",
            height: "120%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at 50% 70%, rgba(100,79,184,0.38), transparent 60%)",
            filter: "blur(10px)",
            animation: "glowPulse 3s ease-in-out 0.7s infinite",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            animation: "fadeInScale 620ms var(--ease-emphasis) 100ms both, breathe 3s ease-in-out 0.7s infinite",
          }}
        >
          <LuciusBadge />
        </div>
      </div>

      {channelResults.map((ch, index) => {
        const layout = channelLayout[index];
        return (
          <div
            key={ch.platform}
            style={{
              position: "absolute",
              left: layout.left,
              right: layout.right,
              top: layout.top,
              bottom: layout.bottom,
              zIndex: 2,
              width: "clamp(500px, 31.4vw, 590px)",
              minHeight: "clamp(236px, 30.8vh, 292px)",
              padding: "clamp(22px, 2vw, 32px)",
              borderRadius: "18px",
              background: "rgba(255,255,255,0.92)",
              border: "1px solid var(--color-border)",
              boxShadow: "0 20px 54px rgba(47,39,26,0.11)",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              animation: `fadeInUp 620ms var(--ease-soft) ${600 + index * 500}ms both`,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "22px",
                top: "24px",
                bottom: "24px",
                width: "6px",
                borderRadius: "999px",
                background: ch.accent,
              }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: "18px", paddingLeft: "36px" }}>
              <div
                style={{
                  width: "clamp(52px, 4.5vw, 68px)",
                  height: "clamp(52px, 4.5vw, 68px)",
                  borderRadius: "14px",
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(100,79,184,0.12)",
                  boxShadow: "0 8px 18px rgba(31,34,48,0.06)",
                  padding: layout.iconPadding ?? "7px",
                }}
              >
                <img
                  src={layout.icon}
                  alt={ch.platform}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
              <div
                style={{
                  minWidth: 0,
                  fontSize: "clamp(18px, 1.48vw, 25px)",
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ color: "var(--color-text)" }}>{ch.platform}</span>
                <span style={{ color: "var(--color-muted)", fontWeight: 500 }}> · {ch.audience}</span>
              </div>
              <span style={{ marginLeft: "auto", color: "var(--color-muted)", fontSize: "22px" }}>...</span>
            </div>
            <div
              style={{
                paddingLeft: "36px",
                color: "var(--color-text)",
                fontSize: "clamp(17px, 1.35vw, 24px)",
                lineHeight: 1.42,
              }}
            >
              {ch.snippet}
            </div>
            <div style={{ marginLeft: "36px", height: "1px", background: "var(--color-border)" }} />
            <div
              style={{
                marginLeft: "36px",
                alignSelf: "flex-start",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 14px",
                borderRadius: "12px",
                background: "rgba(35,165,90,0.08)",
                color: "#2F7D45",
                fontSize: "clamp(13px, 1.1vw, 17px)",
                fontWeight: 700,
              }}
            >
              <span>✓</span>
              <span>{ch.status}</span>
            </div>
          </div>
        );
      })}
    </SceneCanvas>
  );
}
