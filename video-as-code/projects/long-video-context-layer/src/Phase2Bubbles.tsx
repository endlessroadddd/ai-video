import { Img, interpolate, Easing, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FRAME_SCALE, fpsFrames, LUCIUS } from "./theme";
import {
  APP_META,
  CONVERSATION_SOURCES,
  SOURCE_ENTER_FRAMES,
  SOURCE_EXIT_FRAMES,
  SOURCE_HOLD_FRAMES,
  SOURCE_LAST_LOCAL_FRAME,
  SOURCE_PHASE_START,
  SOURCE_TOTAL_FRAMES,
  type ConversationSource,
} from "./conversationSources";

const LAYER_Y_PCT = 0.78;
const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
const EASE_IN = Easing.bezier(0.55, 0, 0.85, 0.4);

const AppBadge: React.FC<{ source: ConversationSource }> = ({ source }) => {
  const app = APP_META[source.app];
  return (
    <div
      style={{
        position: "absolute",
        right: -6,
        bottom: -6,
        width: 24,
        height: 24,
        borderRadius: 7,
        background: "#fffdf8",
        border: "1px solid rgba(31,34,48,0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.24)",
      }}
    >
      <Img
        src={staticFile(app.logo)}
        style={{
          width: 15,
          height: 15,
          objectFit: "contain",
          display: "block",
        }}
      />
    </div>
  );
};

const MessageBubble: React.FC<{ source: ConversationSource; phaseLocal: number }> = ({
  source,
  phaseLocal,
}) => {
  const { width, height } = useVideoConfig();
  const app = APP_META[source.app];
  const local = phaseLocal - source.startFrame;
  if (local < 0 || local > SOURCE_TOTAL_FRAMES + fpsFrames(5)) return null;
  const local30 = local / FRAME_SCALE;
  const sourceStart30 = source.startFrame / FRAME_SCALE;

  const enter = interpolate(local, [0, SOURCE_ENTER_FRAMES], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  const exitStart = SOURCE_ENTER_FRAMES + SOURCE_HOLD_FRAMES;
  const exit = interpolate(local, [exitStart, exitStart + SOURCE_EXIT_FRAMES], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_IN,
  });

  const settleX = width * source.xPct;
  const settleY = height * source.yPct;
  const impactX = width * source.impactXPct;
  const impactY = height * LAYER_Y_PCT;
  const fromX = source.side === "left" ? -230 : width + 230;
  const idle =
    Math.sin((local30 - SOURCE_ENTER_FRAMES / FRAME_SCALE) / 18 + sourceStart30 * 0.27) * 3;

  const x = interpolate(enter, [0, 1], [fromX, settleX]);
  const yAtRest = interpolate(enter, [0, 1], [settleY + 16, settleY]) + idle;
  const flyX = interpolate(exit, [0, 1], [x, impactX]);
  const flyY = interpolate(exit, [0, 1], [yAtRest, impactY]);
  const scale = interpolate(exit, [0, 1], [1, 0.22]);
  const opacity = interpolate(enter, [0, 1], [0, 1]) *
    interpolate(exit, [0, 0.78, 1], [1, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  if (opacity <= 0) return null;

  const alignRight = source.side === "right";
  const trailOpacity = interpolate(exit, [0.15, 0.55, 1], [0, 0.4, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      {trailOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            left: (flyX + impactX) / 2,
            top: (flyY + impactY) / 2,
            width: Math.abs(flyX - impactX) + 40,
            height: 2,
            transform: `translate(-50%, -50%) rotate(${Math.atan2(
              impactY - flyY,
              impactX - flyX
            )}rad)`,
            transformOrigin: "center",
            background: `linear-gradient(90deg, transparent, ${app.accent}, transparent)`,
            opacity: trailOpacity,
            filter: "blur(0.4px)",
            borderRadius: 999,
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          left: flyX,
          top: flyY,
          transform: `translate(-50%, -50%) scale(${scale})`,
          opacity,
          display: "flex",
          alignItems: "flex-end",
          gap: 10,
          flexDirection: alignRight ? "row-reverse" : "row",
          fontFamily: LUCIUS.sans,
          transformOrigin: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: source.avatarBg,
            color: source.avatarFg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: "0.01em",
            boxShadow: "0 8px 18px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.35)",
            flexShrink: 0,
          }}
        >
          {source.initial}
          <AppBadge source={source} />
        </div>

        <div
          style={{
            width: 286,
            padding: "11px 15px 13px",
            background: LUCIUS.panel,
            border: `1px solid ${LUCIUS.border}`,
            borderLeft: alignRight ? `1px solid ${LUCIUS.border}` : `3px solid ${app.accent}`,
            borderRight: alignRight ? `3px solid ${app.accent}` : `1px solid ${LUCIUS.border}`,
            borderRadius: 16,
            borderBottomLeftRadius: alignRight ? 16 : 5,
            borderBottomRightRadius: alignRight ? 5 : 16,
            boxShadow:
              "0 14px 34px rgba(0,0,0,0.34), 0 3px 8px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.65)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              marginBottom: 6,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: app.accent,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                whiteSpace: "nowrap",
              }}
            >
              {source.source}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: LUCIUS.textMuted,
                background: app.surface,
                border: `1px solid ${app.accent}22`,
                padding: "2px 7px",
                borderRadius: 999,
                whiteSpace: "nowrap",
              }}
            >
              {app.name}
            </span>
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 500,
              color: LUCIUS.ink,
              lineHeight: 1.24,
              letterSpacing: "0.005em",
            }}
          >
            {source.message}
          </div>
          <div
            style={{
              marginTop: 7,
              fontSize: 12,
              fontWeight: 600,
              color: "rgba(31,34,48,0.46)",
            }}
          >
            {source.sender}
          </div>
        </div>
      </div>
    </>
  );
};

export const Phase2Bubbles: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < SOURCE_PHASE_START) return null;
  if (frame > SOURCE_PHASE_START + SOURCE_LAST_LOCAL_FRAME + fpsFrames(8)) return null;

  const phaseLocal = frame - SOURCE_PHASE_START;
  return (
    <>
      {CONVERSATION_SOURCES.map((source) => (
        <MessageBubble key={`${source.app}-${source.sender}-${source.startFrame}`} source={source} phaseLocal={phaseLocal} />
      ))}
    </>
  );
};
