import { discordDraftInsights, discordUserMessage } from "../data/fluent-customer-data";
import { SceneCanvas } from "../components/SceneCanvas";

function SparkIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2.8C12.9 8.1 15.9 11.1 21.2 12C15.9 12.9 12.9 15.9 12 21.2C11.1 15.9 8.1 12.9 2.8 12C8.1 11.1 11.1 8.1 12 2.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InsightGlyph({ type }: { type: "topic" | "intent" | "audience" }) {
  if (type === "topic") {
    return (
      <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 3.8h7.2L18 7.6v12.6H7V3.8Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M14 4v4h4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9.7 12.2h5.6M9.7 15.5h4.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "intent") {
    return (
      <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M16.5 7.5 20 4M17.8 4H20v2.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9.2 11.6a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4ZM15.5 11a2.7 2.7 0 1 0 0-5.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3.7 19.2c.6-3.2 2.5-5.1 5.5-5.1s4.9 1.9 5.5 5.1M14.7 14.2c2.6.3 4.2 2 4.7 4.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function DiscordDetailScene() {
  return (
    <SceneCanvas variant="warm" className="motion-discord-detail">
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 78% 18%, rgba(255,255,255,0.82) 0 12%, transparent 34%), radial-gradient(circle at 47% 96%, rgba(234,227,210,0.5) 0 18%, transparent 38%)",
        }}
      />

      <section
        style={{
          position: "absolute",
          inset: "5.2% 2.8% 4.6%",
          borderRadius: "22px",
          border: "1px solid rgba(216,207,191,0.86)",
          background: "rgba(255,255,255,0.73)",
          boxShadow: "0 25px 70px rgba(47,39,26,0.11)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.2), transparent 58%), radial-gradient(circle at 64% 70%, rgba(100,79,184,0.055), transparent 26%)",
          }}
        />

        <header
          style={{
            position: "relative",
            height: "clamp(96px, 11.2vh, 116px)",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            padding: "0 clamp(26px, 1.9vw, 44px)",
            borderBottom: "1px solid rgba(216,207,191,0.72)",
            animation: "fadeInUp 420ms var(--ease-soft) both",
          }}
        >
          <span
            style={{
              width: "7px",
              height: "clamp(52px, 5.5vh, 62px)",
              borderRadius: "999px",
              background: "linear-gradient(180deg, #6D74FF, #7455F4)",
              boxShadow: "0 8px 24px rgba(88,101,242,0.22)",
            }}
          />
          <span
            style={{
              width: "clamp(48px, 3.15vw, 58px)",
              height: "clamp(48px, 3.15vw, 58px)",
              borderRadius: "10px",
              display: "grid",
              placeItems: "center",
              background: "linear-gradient(135deg, #6671FF, #4D5DE8)",
              boxShadow: "0 10px 28px rgba(88,101,242,0.2)",
            }}
          >
            <img
              alt=""
              src="./icons/discord.svg"
              style={{
                width: "58%",
                height: "58%",
                objectFit: "contain",
                filter: "brightness(0) invert(1)",
              }}
            />
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "10px",
              color: "var(--color-text)",
              fontSize: "clamp(18px, 1.25vw, 24px)",
              letterSpacing: 0,
            }}
          >
            <strong style={{ fontWeight: 800 }}>Discord</strong>
            <span style={{ color: "var(--color-muted)" }}>·</span>
            <span style={{ color: "var(--color-text)", fontWeight: 500 }}>Devs LATAM</span>
            <span style={{ marginLeft: "18px", color: "#85818E", fontSize: "0.82em", fontWeight: 500 }}>03:47</span>
          </div>
        </header>

        <div
          style={{
            position: "relative",
            height: "calc(100% - clamp(96px, 11.2vh, 116px))",
          }}
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            <circle cx="51.7" cy="42.2" r="0.42" fill="#FFFFFF" stroke="#8E72F0" strokeWidth="0.16" opacity="0.95" />
            <path
              d="M 52.1 42.2 C 55 42.2, 58 45, 61.4 47.4"
              fill="none"
              stroke="#8E72F0"
              strokeWidth="0.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.72"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset="1"
              style={{ animation: "routeDraw 900ms var(--ease-emphasis) 720ms forwards" }}
            />
          </svg>

          <article
            style={{
              position: "absolute",
              left: "3.9%",
              top: "23.1%",
              width: "47.8%",
              height: "clamp(238px, 30.8vh, 320px)",
              display: "flex",
              alignItems: "flex-start",
              padding: "clamp(30px, 2.15vw, 40px) clamp(28px, 2.6vw, 44px)",
              borderRadius: "18px",
              border: "1px solid rgba(216,207,191,0.82)",
              background: "rgba(255,255,255,0.72)",
              boxShadow: "0 18px 48px rgba(47,39,26,0.07)",
              animation: "fadeInUp 560ms var(--ease-soft) 180ms both",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: "clamp(18px, 1.2vw, 22px)",
                top: "clamp(28px, 3vh, 40px)",
                bottom: "clamp(28px, 3vh, 40px)",
                width: "7px",
                borderRadius: "999px",
                background: "linear-gradient(180deg, #6D74FF, #7455F4)",
                boxShadow: "0 7px 22px rgba(88,101,242,0.2)",
              }}
            />
            <div style={{ marginLeft: "clamp(12px, 0.9vw, 16px)", width: "calc(100% - clamp(12px, 0.9vw, 16px))" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(14px, 1.05vw, 18px)",
                  marginBottom: "clamp(22px, 2.2vh, 30px)",
                }}
              >
                <span
                  style={{
                    width: "clamp(50px, 3.2vw, 56px)",
                    height: "clamp(50px, 3.2vw, 56px)",
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    background: "linear-gradient(135deg, #E4C9FF, #BFA4EA)",
                    color: "#FFFFFF",
                    fontSize: "clamp(21px, 1.55vw, 27px)",
                    fontWeight: 800,
                    boxShadow: "0 10px 26px rgba(126,86,189,0.18)",
                  }}
                >
                  M
                </span>
                <strong style={{ fontSize: "clamp(18px, 1.3vw, 25px)", fontWeight: 800 }}>{discordUserMessage.author}</strong>
                <span style={{ color: "#8D8996", fontSize: "clamp(15px, 1vw, 18px)", fontWeight: 500 }}>{discordUserMessage.time}</span>
              </div>
              <p
                style={{
                  margin: "0 0 0 clamp(10px, 0.8vw, 14px)",
                  maxWidth: "94%",
                  color: "var(--color-text)",
                  fontSize: "clamp(19px, 1.28vw, 25px)",
                  lineHeight: 1.55,
                  fontWeight: 400,
                  letterSpacing: 0,
                }}
              >
                {discordUserMessage.body}
              </p>
            </div>
          </article>

          <section
            style={{
              position: "absolute",
              left: "59.8%",
              top: "2.3%",
              width: "24.1%",
              height: "92.5%",
              zIndex: 1,
              padding: "clamp(26px, 1.8vw, 34px)",
              borderRadius: "20px",
              border: "1px solid rgba(135,112,220,0.22)",
              background: "linear-gradient(180deg, rgba(255,255,255,0.84), rgba(252,249,255,0.72))",
              boxShadow: "0 24px 64px rgba(100,79,184,0.08)",
              animation: "fadeInUp 580ms var(--ease-soft) 360ms both",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#5B55F2", fontWeight: 800 }}>
              <SparkIcon size={24} />
              <span style={{ fontSize: "clamp(19px, 1.25vw, 26px)" }}>Lucius is drafting</span>
            </div>
            <p
              style={{
                margin: "clamp(20px, 2.4vh, 28px) 0 clamp(30px, 4vh, 42px)",
                maxWidth: "94%",
                color: "var(--color-muted)",
                fontSize: "clamp(15px, 1vw, 18px)",
                lineHeight: 1.55,
              }}
            >
              Analizando el mensaje y preparando una respuesta precisa...
            </p>
            <div style={{ display: "grid", gap: "clamp(18px, 2vh, 26px)" }}>
              <div
                style={{
                  width: "42%",
                  height: "clamp(19px, 2.3vh, 24px)",
                  borderRadius: "999px",
                  background: "linear-gradient(90deg, rgba(100,79,184,0.08), rgba(100,79,184,0.18))",
                  animation: "pulseGlow 1200ms ease-in-out infinite",
                }}
              />
              <div
                style={{
                  height: "clamp(112px, 14.2vh, 148px)",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, rgba(100,79,184,0.06), rgba(100,79,184,0.12))",
                }}
              />
              <div style={{ display: "grid", gap: "clamp(16px, 1.8vh, 22px)" }}>
                {[0, 1, 2].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <span
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        background: "rgba(100,79,184,0.12)",
                      }}
                    />
                    <span
                      style={{
                        flex: 1,
                        height: "15px",
                        borderRadius: "999px",
                        background: "rgba(100,79,184,0.08)",
                      }}
                    />
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: "clamp(18px, 2.2vh, 26px)",
                  height: "clamp(104px, 14vh, 136px)",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, rgba(100,79,184,0.07), rgba(100,79,184,0.13))",
                }}
              />
            </div>
          </section>

          <aside
            style={{
              position: "absolute",
              right: "2.1%",
              top: "2.3%",
              width: "12.9%",
              height: "92.5%",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "clamp(12px, 1.6vh, 18px)",
              padding: "clamp(24px, 2.25vw, 34px) 14px",
              borderRadius: "20px",
              border: "1px solid rgba(216,207,191,0.82)",
              background: "rgba(255,255,255,0.48)",
              boxShadow: "0 16px 44px rgba(47,39,26,0.05)",
              animation: "fadeInUp 580ms var(--ease-soft) 520ms both",
            }}
          >
            <div style={{ color: "var(--color-muted)", fontSize: "clamp(14px, 1vw, 17px)", marginBottom: "clamp(10px, 1.2vh, 16px)" }}>
              Insights
            </div>
            {discordDraftInsights.map((item, index) => {
              const type = index === 0 ? "topic" : index === 1 ? "intent" : "audience";
              const isAudience = index === 2;

              return (
                <div
                  key={item.label}
                  style={{
                    flex: "1 1 0",
                    minHeight: 0,
                    padding: "clamp(16px, 1.55vw, 24px) clamp(12px, 1vw, 17px)",
                    borderRadius: "15px",
                    background: "rgba(255,255,255,0.72)",
                    border: "1px solid rgba(216,207,191,0.8)",
                    boxShadow: "0 10px 30px rgba(31,34,48,0.045)",
                    animation: `fadeInUp 380ms var(--ease-soft) ${700 + index * 120}ms both`,
                  }}
                >
                  <div
                    style={{
                      width: "clamp(50px, 3.4vw, 64px)",
                      height: "clamp(50px, 3.4vw, 64px)",
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      marginBottom: "clamp(16px, 2vh, 24px)",
                      background: isAudience ? "rgba(32,181,198,0.16)" : "rgba(154,113,232,0.17)",
                      color: isAudience ? "#209CAB" : "#8D63DE",
                    }}
                  >
                    <InsightGlyph type={type} />
                  </div>
                  <div
                    style={{
                      color: "var(--color-text)",
                      fontWeight: 800,
                      marginBottom: "clamp(8px, 1vh, 12px)",
                      fontSize: "clamp(15px, 1vw, 19px)",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      color: "var(--color-muted)",
                      whiteSpace: "pre-line",
                      lineHeight: 1.45,
                      fontSize: "clamp(12px, 0.82vw, 15px)",
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              );
            })}
          </aside>
        </div>
      </section>
    </SceneCanvas>
  );
}
