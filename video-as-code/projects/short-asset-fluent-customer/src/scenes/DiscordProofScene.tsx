import { SceneCanvas } from "../components/SceneCanvas";
import { LuciusLogo } from "../components/LuciusMark";

function GlobeIcon() {
  return (
    <svg width="31" height="31" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.2 2.5 3.3 5.5 3.3 9S14.2 18.5 12 21M12 3C9.8 5.5 8.7 8.5 8.7 12S9.8 18.5 12 21" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="31" height="31" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 5.5h14v10H8.5L5 19V5.5Z" />
      <path d="M8.5 9.3h7M8.5 12.4h4.8" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="31" height="31" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.2v5.1l3.5 2" />
    </svg>
  );
}

function GaugeIcon() {
  return (
    <svg width="43" height="43" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 35a16 16 0 0 1 30 0" />
      <path d="M24 35 32 21" />
      <path d="M14 35h20" opacity="0.28" />
    </svg>
  );
}

function CheckCircle() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="m8.2 12 2.4 2.4 5.2-5.3" />
    </svg>
  );
}

const proofCards = [
  { icon: <GlobeIcon />, title: "Detected · Spanish (AR)", sub: "Idioma identificado del mensaje", tone: "purple" },
  { icon: <ChatIcon />, title: "Tone · casual", sub: "Tono detectado en la consulta", tone: "purple" },
  { icon: <ClockIcon />, title: "Replied · 6s", sub: "Tiempo total hasta la respuesta", tone: "green" },
];

export function DiscordProofScene() {
  return (
    <SceneCanvas variant="warm" className="motion-discord-proof">
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 76% 18%, rgba(255,255,255,0.82) 0 12%, transparent 34%), radial-gradient(circle at 48% 94%, rgba(234,227,210,0.46) 0 17%, transparent 40%)",
        }}
      />

      <section
        style={{
          position: "absolute",
          inset: "2.8% 1.35% 3.8%",
          borderRadius: "18px",
          border: "1px solid rgba(216,207,191,0.9)",
          background: "rgba(255,255,255,0.74)",
          boxShadow: "0 28px 74px rgba(47,39,26,0.1)",
          overflow: "hidden",
        }}
      >
        <header
          style={{
            height: "13.2%",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            padding: "0 31px",
            borderBottom: "1px solid rgba(216,207,191,0.72)",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "62px",
              borderRadius: "999px",
              background: "linear-gradient(180deg, #5865F2, #755AF1)",
              boxShadow: "0 8px 24px rgba(88,101,242,0.22)",
            }}
          />
          <span
            style={{
              width: "58px",
              height: "58px",
              borderRadius: "12px",
              display: "grid",
              placeItems: "center",
              background: "linear-gradient(135deg, #6671FF, #5360EA)",
              boxShadow: "0 10px 28px rgba(88,101,242,0.18)",
            }}
          >
            <img alt="" src="./icons/discord.svg" style={{ width: "58%", height: "58%", filter: "brightness(0) invert(1)" }} />
          </span>
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px", fontSize: "clamp(21px, 1.55vw, 28px)" }}>
            <strong>Discord</strong>
            <span style={{ color: "var(--color-muted)" }}>·</span>
            <strong style={{ fontWeight: 800 }}>Devs LATAM</strong>
            <span style={{ marginLeft: "22px", color: "#8B8794", fontSize: "0.74em", fontWeight: 500 }}>03:47</span>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "18px" }}>
            <span
              style={{
                padding: "10px 17px",
                borderRadius: "12px",
                background: "rgba(100,79,184,0.09)",
                color: "var(--color-brand)",
                fontSize: "clamp(17px, 1.2vw, 22px)",
                fontWeight: 800,
              }}
            >
              Frame 02
            </span>
            <span
              style={{
                width: "54px",
                height: "54px",
                borderRadius: "13px",
                display: "grid",
                placeItems: "center",
                color: "#fff",
                background: "linear-gradient(145deg, #765BE5, #4F37B8)",
              }}
            >
              <LuciusLogo size={34} tone="light" />
            </span>
          </div>
        </header>

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ position: "absolute", inset: "13.2% 0 0", width: "100%", height: "86.8%", pointerEvents: "none", zIndex: 2 }}
        >
          <path d="M 52.2 53.2 H 59.4" fill="none" stroke="#805FE6" strokeWidth="0.14" strokeLinecap="round" opacity="0.58" />
          <path d="M 59.4 53.2 Q 62.8 53.2 62.8 36.2 Q 62.8 32.8 66.8 32.8" fill="none" stroke="#805FE6" strokeWidth="0.14" strokeLinecap="round" strokeLinejoin="round" opacity="0.58" />
          <path d="M 59.4 53.2 H 66.8" fill="none" stroke="#805FE6" strokeWidth="0.14" strokeLinecap="round" opacity="0.58" />
          <path d="M 59.4 53.2 Q 62.8 53.2 62.8 63.8 Q 62.8 66.8 66.8 66.8" fill="none" stroke="#805FE6" strokeWidth="0.14" strokeLinecap="round" strokeLinejoin="round" opacity="0.58" />
          <circle cx="52.2" cy="53.2" r="0.32" fill="#fff" stroke="#5B55F2" strokeWidth="0.12" opacity="0.72" />
          <circle cx="59.4" cy="53.2" r="0.28" fill="#fff" stroke="#805FE6" strokeWidth="0.11" opacity="0.68" />
          {[32.8, 53.2, 66.8].map((cy) => (
            <circle key={cy} cx="66.8" cy={cy} r="0.3" fill="#fff" stroke="#805FE6" strokeWidth="0.11" opacity="0.7" />
          ))}
        </svg>

        <article
          style={{
            position: "absolute",
            left: "3.55%",
            top: "15.6%",
            width: "39%",
            minHeight: "14.8%",
            padding: "22px 32px 24px 75px",
            borderRadius: "18px",
            border: "1px solid rgba(216,207,191,0.82)",
            background: "rgba(255,255,255,0.82)",
            boxShadow: "0 16px 42px rgba(47,39,26,0.07)",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "45px",
              top: "20px",
              bottom: "20px",
              width: "6px",
              borderRadius: "999px",
              background: "linear-gradient(180deg, #5865F2, #7455F4)",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "13px", marginBottom: "13px" }}>
            <span
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "12px",
                display: "grid",
                placeItems: "center",
                background: "rgba(100,79,184,0.11)",
                color: "var(--color-brand)",
              }}
            >
              <svg width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21a8 8 0 0 1 16 0" />
              </svg>
            </span>
            <strong style={{ fontSize: "clamp(18px, 1.25vw, 24px)" }}>maru_dev</strong>
            <span style={{ color: "#8B8794", fontSize: "clamp(15px, 1vw, 18px)" }}>03:47</span>
          </div>
          <p style={{ margin: 0, fontSize: "clamp(18px, 1.25vw, 24px)", lineHeight: 1.45 }}>
            ¿Cómo funcionan los embeddings en la API? ¿Hay algún rate limit para procesar grandes volúmenes?
          </p>
        </article>

        <article
          style={{
            position: "absolute",
            left: "5.85%",
            top: "39.1%",
            width: "46.3%",
            minHeight: "41.8%",
            padding: "24px 40px 22px 88px",
            borderRadius: "18px",
            border: "2px solid rgba(117,91,229,0.36)",
            background: "rgba(255,255,255,0.86)",
            boxShadow: "0 20px 54px rgba(47,39,26,0.08)",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "26px",
              top: "27px",
              width: "59px",
              height: "59px",
              borderRadius: "13px",
              display: "grid",
              placeItems: "center",
              color: "#fff",
              background: "linear-gradient(145deg, #765BE5, #4F37B8)",
            }}
          >
            <LuciusLogo size={32} tone="light" />
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "13px", marginBottom: "14px" }}>
            <strong style={{ fontSize: "clamp(20px, 1.35vw, 25px)" }}>Lucius</strong>
            <span style={{ padding: "5px 9px", borderRadius: "7px", background: "rgba(100,79,184,0.12)", color: "var(--color-brand)", fontSize: "15px", fontWeight: 800 }}>
              APP
            </span>
            <span style={{ color: "#7F7A87", fontSize: "clamp(15px, 1vw, 18px)" }}>03:47 · Responded in 6s</span>
          </div>

          <p style={{ margin: "0 0 13px", fontSize: "clamp(17px, 1.08vw, 20px)", lineHeight: 1.45 }}>
            Los embeddings se generan mediante el endpoint <code>POST /v1/embeddings</code>. Soporta entradas en lote y el procesamiento es asíncrono para cargas grandes.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "64px 1fr 1px 1.05fr",
              gap: "17px",
              alignItems: "center",
              padding: "10px 18px",
              borderRadius: "12px",
              border: "1px solid rgba(100,79,184,0.18)",
              background: "rgba(100,79,184,0.055)",
              marginBottom: "13px",
            }}
          >
            <span
              style={{
                width: "58px",
                height: "58px",
                borderRadius: "16px",
                display: "grid",
                placeItems: "center",
                color: "var(--color-brand)",
                background: "rgba(100,79,184,0.09)",
              }}
            >
              <GaugeIcon />
            </span>
            <span>
              <span style={{ display: "block", fontSize: "clamp(15px, 0.95vw, 18px)", fontWeight: 800 }}>Rate limit por organización</span>
              <span style={{ display: "block", marginTop: "2px", color: "var(--color-brand)", fontSize: "clamp(25px, 1.72vw, 32px)", fontWeight: 900 }}>10k req/min</span>
            </span>
            <span style={{ height: "70%", background: "rgba(216,207,191,0.86)" }} />
            <span style={{ color: "var(--color-muted)", fontSize: "clamp(15px, 1vw, 19px)", lineHeight: 1.4 }}>
              Límite por defecto. Se puede solicitar un aumento.
            </span>
          </div>

          <p style={{ margin: 0, fontSize: "clamp(17px, 1.08vw, 20px)", lineHeight: 1.45 }}>
            Para volúmenes masivos, recomendamos usar el flujo async con archivos en GCS o S3 y monitorear el progreso con <code>GET /v1/embeddings/{"{id}"}</code>.
          </p>
        </article>

        <div
          style={{
            position: "absolute",
            left: "6.45%",
            bottom: "4.7%",
            width: "44.8%",
            minHeight: "9.7%",
            display: "flex",
            alignItems: "center",
            gap: "17px",
            padding: "18px 24px",
            borderRadius: "14px",
            border: "1px solid rgba(100,79,184,0.18)",
            background: "rgba(100,79,184,0.055)",
            color: "var(--color-brand)",
            fontSize: "clamp(18px, 1.2vw, 23px)",
            fontWeight: 800,
          }}
        >
          <span
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              display: "grid",
              placeItems: "center",
              background: "rgba(100,79,184,0.09)",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.5 3H6v18h12V6.5L14.5 3Z" />
              <path d="M14 3v4h4" />
            </svg>
          </span>
          <span>docs.lucius.ai / migrations / bulk-embeddings</span>
          <span style={{ marginLeft: "auto", fontSize: "15px", color: "var(--color-muted)" }}>Guía oficial · Actualizado hace 4 días</span>
          <span style={{ fontSize: "28px" }}>↗</span>
        </div>

        <aside
          style={{
            position: "absolute",
            right: "5%",
            top: "25.5%",
            width: "31.2%",
            height: "61.6%",
            padding: "42px 46px",
            borderRadius: "18px",
            border: "1px solid rgba(216,207,191,0.82)",
            background: "rgba(255,255,255,0.58)",
            boxShadow: "0 20px 54px rgba(47,39,26,0.07)",
          }}
        >
          <div style={{ display: "grid", gap: "72px" }}>
            {proofCards.map((card) => {
              const green = card.tone === "green";
              return (
                <div
                  key={card.title}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "61px 1fr auto",
                    alignItems: "center",
                    gap: "22px",
                    minHeight: "92px",
                    padding: "19px 27px",
                    borderRadius: "14px",
                    border: "1px solid rgba(216,207,191,0.82)",
                    background: "rgba(255,255,255,0.88)",
                    boxShadow: "0 10px 30px rgba(31,34,48,0.045)",
                  }}
                >
                  <span
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "15px",
                      display: "grid",
                      placeItems: "center",
                      color: green ? "#2F8A4D" : "var(--color-brand)",
                      background: green ? "rgba(35,165,90,0.12)" : "rgba(100,79,184,0.11)",
                    }}
                  >
                    {card.icon}
                  </span>
                  <span>
                    <strong style={{ display: "block", fontSize: "clamp(17px, 1.18vw, 23px)" }}>{card.title}</strong>
                    <span style={{ display: "block", color: "var(--color-muted)", fontSize: "clamp(14px, 0.95vw, 18px)", marginTop: "5px" }}>
                      {card.sub}
                    </span>
                  </span>
                  <span style={{ color: "#3D8B53" }}>
                    <CheckCircle />
                  </span>
                </div>
              );
            })}
          </div>
        </aside>
      </section>
    </SceneCanvas>
  );
}
