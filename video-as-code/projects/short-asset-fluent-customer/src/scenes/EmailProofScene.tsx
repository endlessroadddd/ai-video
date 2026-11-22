import { SceneCanvas } from "../components/SceneCanvas";
import { LuciusLogo } from "../components/LuciusMark";

function MailIcon({ size = 58 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="16" width="44" height="32" rx="5" />
      <path d="m12 21 20 15 20-15" />
    </svg>
  );
}

function CheckCircle({ color = "#3D8B53" }: { color?: string }) {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="m8.2 12 2.4 2.4 5.2-5.3" />
    </svg>
  );
}

function SideIcon({ type }: { type: "chat" | "building" | "shield" | "pin" }) {
  if (type === "building") {
    return (
      <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 21V5l7-3 7 3v16" />
        <path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01M10 21v-4h4v4" />
      </svg>
    );
  }
  if (type === "shield") {
    return (
      <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 20 6v5c0 5-3.2 8.3-8 10-4.8-1.7-8-5-8-10V6l8-3Z" />
        <path d="m8.5 12 2.3 2.3 4.8-5" />
      </svg>
    );
  }
  if (type === "pin") {
    return (
      <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }
  return (
    <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 5h14v10H8.5L5 19V5Z" />
      <path d="M8.5 9.3h7M8.5 12.4h4.8" />
    </svg>
  );
}

const sourceRows = [
  { type: "chat" as const, title: "検出：日本語（フォーマル）", sub: "" },
  { type: "building" as const, title: "トーン：エンタープライズ", sub: "" },
  { type: "shield" as const, title: "返信：12秒", sub: "" },
];

const evidenceRows = [
  { type: "shield" as const, title: "SOC 2 ready", sub: "監査対応済み" },
  { type: "pin" as const, title: "Tokyo region", sub: "データ保存地域：日本" },
];

export function EmailProofScene() {
  return (
    <SceneCanvas variant="warm" className="motion-email-proof">
      <style>{`.email-proof-body p { margin: 0 0 10px; } .email-proof-body p:last-child { margin-bottom: 0; }`}</style>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(100,79,184,0.045), transparent 24%), linear-gradient(145deg, rgba(255,255,255,0.86), rgba(244,239,227,0.46))",
        }}
      />

      <header
        style={{
          position: "absolute",
          left: "1.9%",
          right: "1.9%",
          top: "3.5%",
          height: "11%",
          display: "flex",
          alignItems: "center",
          gap: "21px",
          padding: "0 29px",
          borderRadius: "12px",
          border: "1px solid rgba(216,207,191,0.82)",
          background: "rgba(255,255,255,0.84)",
          boxShadow: "0 12px 32px rgba(47,39,26,0.07)",
        }}
      >
        <span
          style={{
            width: "73px",
            height: "73px",
            borderRadius: "15px",
            display: "grid",
            placeItems: "center",
            border: "1px solid rgba(100,79,184,0.16)",
            background: "rgba(100,79,184,0.055)",
            color: "var(--color-brand)",
          }}
        >
          <MailIcon size={57} />
        </span>
        <span>
          <strong style={{ display: "block", fontSize: "clamp(19px, 1.35vw, 26px)" }}>Email · NexLogix Co., Ltd.</strong>
          <span style={{ display: "block", color: "var(--color-muted)", fontSize: "clamp(15px, 1vw, 19px)", marginTop: "8px" }}>
            Apr 28 · 11:23 JST
          </span>
        </span>
      </header>

      <article
        style={{
          position: "absolute",
          left: "1.9%",
          top: "16.8%",
          width: "46.5%",
          height: "49.4%",
          padding: "30px 55px 30px",
          borderRadius: "12px",
          border: "1px solid rgba(216,207,191,0.82)",
          background: "rgba(255,255,255,0.84)",
          boxShadow: "0 18px 46px rgba(47,39,26,0.08)",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: "22px",
            top: "25px",
            bottom: "23px",
            width: "7px",
            borderRadius: "999px",
            background: "linear-gradient(180deg, #765BE5, #6B5AF5)",
          }}
        />
        <h2 style={{ margin: "0 0 28px", fontSize: "clamp(17px, 1.18vw, 23px)" }}>
          件名：SOC 2 Type II、データ地域、および保持ポリシーについてのご確認
        </h2>
        <div style={{ color: "var(--color-text)", fontSize: "clamp(15px, 1.02vw, 20px)", lineHeight: 1.75 }}>
          <p>NexLogix ご担当者様</p>
          <p>いつもお世話になっております。<br />弊社は貴社のサービスの利用を検討しており、セキュリティおよびコンプライアンス要件の確認を行っております。</p>
          <p>つきましては、以下の点についてご教示いただけますでしょうか。</p>
          <div
            style={{
              margin: "18px 0 24px",
              padding: "16px 22px",
              borderRadius: "10px",
              background: "rgba(31,34,48,0.035)",
              lineHeight: 1.85,
            }}
          >
            <div>1. SOC 2 Type II レポートの有無と、最新の監査期間</div>
            <div>2. データの保存地域（リージョン）</div>
            <div>3. データの保持ポリシーおよび削除手続き</div>
          </div>
          <p>お忙しいところ恐れ入りますが、<br />ご回答のほどよろしくお願いいたします。</p>
        </div>
      </article>

      <article
        style={{
          position: "absolute",
          left: "35.3%",
          top: "32.8%",
          width: "35.1%",
          minHeight: "57.8%",
          zIndex: 4,
          padding: "24px 27px 20px",
          borderRadius: "13px",
          border: "1px solid rgba(135,112,220,0.32)",
          background: "rgba(255,255,255,0.92)",
          boxShadow: "0 26px 70px rgba(47,39,26,0.13)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", color: "var(--color-brand)", marginBottom: "18px" }}>
          <LuciusLogo size={38} tone="brand" />
          <strong style={{ fontSize: "clamp(22px, 1.5vw, 29px)" }}>Lucius</strong>
        </div>
        <div className="email-proof-body" style={{ fontSize: "clamp(14px, 0.92vw, 17px)", lineHeight: 1.5 }}>
          <p>NexLogix ご担当者様</p>
          <p>お問い合わせいただき、誠にありがとうございます。<br />下記のとおりご回答申し上げます。</p>
          <p><strong>・SOC 2 Type II レポート：</strong> ご提供可能です。</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              margin: "6px 0 12px 20px",
              padding: "7px 13px",
              borderRadius: "7px",
              border: "1px solid rgba(100,79,184,0.12)",
              background: "rgba(100,79,184,0.07)",
              color: "var(--color-brand)",
              fontWeight: 800,
            }}
          >
            <span>▣</span>
            <span>最新レポート：2024年4月1日〜2025年3月31日</span>
          </div>
          <p><strong>・データの保存地域：</strong></p>
          <div
            style={{
              margin: "6px 0 12px 20px",
              padding: "7px 13px",
              borderRadius: "7px",
              border: "1px solid rgba(100,79,184,0.12)",
              background: "rgba(100,79,184,0.07)",
              color: "var(--color-brand)",
              fontWeight: 800,
            }}
          >
            ◎ 東京リージョン（日本）
          </div>
          <p><strong>・データの保持ポリシー：</strong></p>
          <div
            style={{
              margin: "6px 0 12px 20px",
              padding: "8px 13px",
              borderRadius: "7px",
              border: "1px solid rgba(100,79,184,0.12)",
              background: "rgba(100,79,184,0.07)",
              color: "var(--color-brand)",
              fontWeight: 800,
            }}
          >
            データ保持期間：最長 12 か月<br />期間経過後、復元不可の方法で削除されます。
          </div>
          <p>ご不明点がございましたら、いつでもお知らせください。</p>
          <div style={{ height: "1px", background: "rgba(216,207,191,0.82)", margin: "12px 0" }} />
          <p style={{ marginBottom: 0 }}>Lucius カスタマーサクセスチーム<br />support@lucius.ai</p>
        </div>
      </article>

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 3 }}
      >
        <path d="M 69.3 51.2 C 72 51.2, 73 58, 75.7 62.5" fill="none" stroke="#7357D9" strokeWidth="0.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.72" />
        <path d="M 69.3 75 C 72 75, 73 68, 75.7 62.5" fill="none" stroke="#7357D9" strokeWidth="0.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.72" />
        <circle cx="69.3" cy="51.2" r="0.42" fill="#fff" stroke="#7357D9" strokeWidth="0.16" opacity="0.95" />
        <circle cx="69.3" cy="75" r="0.42" fill="#fff" stroke="#7357D9" strokeWidth="0.16" opacity="0.95" />
        <circle cx="75.7" cy="62.5" r="0.42" fill="#fff" stroke="#7357D9" strokeWidth="0.16" opacity="0.95" />
      </svg>

      <aside
        style={{
          position: "absolute",
          right: "1.85%",
          top: "16.8%",
          width: "24.1%",
          minHeight: "62.8%",
          padding: "29px 29px 25px",
          borderRadius: "13px",
          border: "1px solid rgba(216,207,191,0.82)",
          background: "rgba(255,255,255,0.84)",
          boxShadow: "0 20px 54px rgba(47,39,26,0.09)",
        }}
      >
        <h2 style={{ margin: "0 0 27px", color: "var(--color-brand)", fontSize: "clamp(19px, 1.35vw, 26px)" }}>コンプライアンス証拠</h2>
        <div style={{ display: "grid", gap: "19px" }}>
          {sourceRows.map((row, index) => (
            <div
              key={row.title}
              style={{
                display: "grid",
                gridTemplateColumns: "58px minmax(0, 1fr)",
                gap: "17px",
                alignItems: "center",
                minHeight: "64px",
                padding: "11px 14px",
                borderRadius: "10px",
                border: "1px solid rgba(216,207,191,0.82)",
                background: "rgba(255,255,255,0.82)",
              }}
            >
              <span
                style={{
                  width: "51px",
                  height: "51px",
                  borderRadius: "12px",
                  display: "grid",
                  placeItems: "center",
                  color: index === 2 ? "#3D8B53" : "var(--color-brand)",
                  background: index === 2 ? "rgba(35,165,90,0.11)" : "rgba(100,79,184,0.1)",
                }}
              >
                <SideIcon type={row.type} />
              </span>
              <strong style={{ fontSize: "clamp(15px, 1.02vw, 20px)" }}>{row.title}</strong>
            </div>
          ))}
        </div>
        <div style={{ height: "1px", background: "rgba(216,207,191,0.82)", margin: "35px 0 24px" }} />
        <h3 style={{ margin: "0 0 22px", fontSize: "clamp(16px, 1.12vw, 22px)" }}>証拠ソース</h3>
        <div style={{ display: "grid", gap: "17px" }}>
          {evidenceRows.map((row) => (
            <div
              key={row.title}
              style={{
                display: "grid",
                gridTemplateColumns: "58px 1fr auto",
                gap: "17px",
                alignItems: "center",
                minHeight: "76px",
                padding: "11px 14px",
                borderRadius: "10px",
                border: "1px solid rgba(216,207,191,0.82)",
                background: "rgba(255,255,255,0.82)",
              }}
            >
              <span
                style={{
                  width: "51px",
                  height: "51px",
                  borderRadius: "12px",
                  display: "grid",
                  placeItems: "center",
                  color: "var(--color-brand)",
                  background: "rgba(100,79,184,0.1)",
                }}
              >
                <SideIcon type={row.type} />
              </span>
              <span>
                <strong style={{ display: "block", fontSize: "clamp(15px, 1.02vw, 20px)" }}>{row.title}</strong>
                <span style={{ display: "block", marginTop: "4px", color: "var(--color-text)", fontSize: "clamp(13px, 0.9vw, 17px)" }}>{row.sub}</span>
              </span>
              <CheckCircle />
            </div>
          ))}
        </div>
      </aside>
    </SceneCanvas>
  );
}
