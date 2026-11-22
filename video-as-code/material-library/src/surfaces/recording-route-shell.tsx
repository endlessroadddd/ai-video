import type { CSSProperties, ReactNode } from "react";

import type { ClientChatRecordingScenario } from "../chat/recording-scenario";

export type RecordingRouteShellProps = {
  children?: ReactNode;
  recordingScenario?: ClientChatRecordingScenario | null;
  routeSessionId?: string | null;
  style?: CSSProperties;
};

export function RecordingRouteShell(props: RecordingRouteShellProps) {
  const {
    children,
    recordingScenario = null,
    routeSessionId = null,
    style,
  } = props;

  return (
    <section
      style={{
        display: "grid",
        gap: "16px",
        gridTemplateColumns: "minmax(0, 1fr) 240px",
        alignItems: "stretch",
        minHeight: "520px",
        ...style,
      }}
    >
      <div
        style={{
          borderRadius: "28px",
          border: "1px solid rgba(76, 75, 105, 0.08)",
          background: "#ffffff",
          boxShadow: "0 14px 34px rgba(41, 40, 48, 0.08)",
          padding: "24px",
          display: "grid",
          gap: "18px",
        }}
      >
        <div style={{ display: "grid", gap: "8px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(76, 75, 105, 0.64)",
            }}
          >
            Client Chat Route Shell
          </span>
          <strong style={{ fontSize: "22px", color: "#231f35" }}>
            Shared dashboard frame for recording and live chat flows.
          </strong>
          <p style={{ margin: 0, color: "rgba(76, 75, 105, 0.82)", lineHeight: 1.7 }}>
            This local extraction keeps the reusable shell contract visible without
            pulling the full demo-app route tree into the material-library build.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: "12px",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          }}
        >
          {[
            { label: "route session", value: routeSessionId ?? "none" },
            { label: "recording", value: recordingScenario ? "attached" : "idle" },
            { label: "layout", value: recordingScenario ? "recording mode" : "standard" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                borderRadius: "16px",
                border: "1px solid rgba(76, 75, 105, 0.08)",
                background: "#f8f7f2",
                padding: "14px",
                display: "grid",
                gap: "4px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(76, 75, 105, 0.64)",
                }}
              >
                {item.label}
              </span>
              <strong style={{ color: "#231f35" }}>{item.value}</strong>
            </div>
          ))}
        </div>

        <div
          style={{
            flex: 1,
            minHeight: "280px",
            borderRadius: "22px",
            border: "1px dashed rgba(100, 79, 184, 0.3)",
            background: "linear-gradient(180deg, rgba(248,247,242,0.92) 0%, rgba(244,242,235,0.92) 100%)",
            padding: "20px",
            display: "grid",
            placeItems: "center",
            color: "rgba(76, 75, 105, 0.76)",
            textAlign: "center",
          }}
        >
          {children ?? "Route content mounts here in app usage."}
        </div>
      </div>

      <aside
        style={{
          borderRadius: "28px",
          border: "1px solid rgba(76, 75, 105, 0.08)",
          background: "#fbfaf6",
          padding: "20px",
          display: "grid",
          gap: "14px",
          alignContent: "start",
        }}
      >
        <strong style={{ color: "#231f35", fontSize: "16px" }}>Knowledge Upload Dock</strong>
        <p style={{ margin: 0, color: "rgba(76, 75, 105, 0.78)", lineHeight: 1.7 }}>
          Companion rail for global upload and routing utilities.
        </p>
        <div
          style={{
            borderRadius: "18px",
            border: "1px dashed rgba(76, 75, 105, 0.18)",
            background: "#ffffff",
            padding: "16px",
            color: "rgba(76, 75, 105, 0.7)",
            lineHeight: 1.6,
          }}
        >
          Code preview still points at the original demo-app route shell for full source lineage.
        </div>
      </aside>
    </section>
  );
}
