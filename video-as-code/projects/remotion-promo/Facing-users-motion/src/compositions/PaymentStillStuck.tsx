import React from "react";
import {AbsoluteFill, Easing, useCurrentFrame, useVideoConfig} from "remotion";
import {BrandLockup} from "../components/BrandLockup";
import {clamp01, floatProgress, mix, mixColor, ramp} from "../motion/primitives";
import {tokens} from "../theme/tokens";

const stage = {
  x: 116,
  y: 116,
  width: 1688,
  height: 848
} as const;

const Badge: React.FC<{
  label: string;
  background: string;
  border: string;
  color: string;
  style?: React.CSSProperties;
}> = ({label, background, border, color, style}) => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        minHeight: 30,
        padding: "0 14px",
        borderRadius: 999,
        border: `1px solid ${border}`,
        background,
        color,
        fontFamily: tokens.fonts.mono,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        ...style
      }}
    >
      {label}
    </div>
  );
};

const ChatBubble: React.FC<{
  align: "left" | "right";
  title: string;
  body: string;
  width: number;
  background: string;
  border: string;
  bodyColor: string;
  metaColor: string;
  progress: number;
  style?: React.CSSProperties;
}> = ({
  align,
  title,
  body,
  width,
  background,
  border,
  bodyColor,
  metaColor,
  progress,
  style
}) => {
  const translateX = align === "left" ? mix(progress, -36, 0) : mix(progress, 36, 0);

  return (
    <div
      style={{
        position: "relative",
        width,
        marginLeft: align === "right" ? "auto" : 0,
        padding: "18px 20px 18px",
        borderRadius: 26,
        border: `1px solid ${border}`,
        background,
        boxShadow: `0 20px 48px rgba(15, 23, 42, ${mix(progress, 0.02, 0.12)})`,
        opacity: progress,
        transform: `translate3d(${translateX}px, ${mix(progress, 26, 0)}px, 0) scale(${mix(progress, 0.96, 1)})`,
        ...style
      }}
    >
      <div
        style={{
          fontFamily: tokens.fonts.mono,
          fontSize: 12,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: metaColor
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 12,
          whiteSpace: "pre-line",
          fontFamily: tokens.fonts.sfPro,
          fontSize: 34,
          lineHeight: 1.14,
          letterSpacing: "-0.055em",
          fontWeight: 600,
          color: bodyColor
        }}
      >
        {body}
      </div>
    </div>
  );
};

const PressureMeter: React.FC<{
  progress: number;
}> = ({progress}) => {
  const bars = new Array(5).fill(null);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 10
      }}
    >
      {bars.map((_, index) => {
        const local = clamp01(progress * 1.2 - index * 0.08);
        return (
          <div
            key={index}
            style={{
              width: 14,
              height: mix(local, 18, 56 + index * 8),
              borderRadius: 999,
              background: mixColor(local, "rgba(244,114,182,0.26)", "rgba(225,29,72,0.82)")
            }}
          />
        );
      })}
    </div>
  );
};

const Spinner: React.FC<{
  frame: number;
  opacity: number;
}> = ({frame, opacity}) => {
  return (
    <div
      style={{
        width: 24,
        height: 24,
        borderRadius: "50%",
        border: "3px solid rgba(255,255,255,0.18)",
        borderTopColor: "#ffffff",
        transform: `rotate(${frame * 8}deg)`,
        opacity
      }}
    />
  );
};

const PaymentPanel: React.FC<{
  frame: number;
  progress: number;
  spotlight: number;
  deadStop: number;
}> = ({frame, progress, spotlight, deadStop}) => {
  const width = mix(progress, 428, 950);
  const height = mix(progress, 460, 608);
  const left = mix(progress, stage.x + 1106, stage.x + 642);
  const top = mix(progress, stage.y + 212, stage.y + 132);
  const statusOpacity = mix(spotlight, 0.38, 1);
  const shake = Math.sin(frame / 5) * mix(deadStop, 0, 2.5);

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        borderRadius: 34,
        overflow: "hidden",
        border: "1px solid rgba(214, 211, 209, 0.94)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.99), rgba(247,243,239,0.99))",
        boxShadow: `0 32px 80px rgba(15, 23, 42, ${mix(progress, 0.05, 0.18)})`,
        transform: `translate3d(${shake}px, 0, 0)`
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 82% 20%, rgba(248,113,113,0.10), transparent 34%), radial-gradient(circle at 14% 84%, rgba(99,102,241,0.05), transparent 26%)"
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 34,
          right: 34,
          top: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div>
          <div
            style={{
              fontFamily: tokens.fonts.mono,
              fontSize: 12,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "rgba(71,85,105,0.72)"
            }}
          >
            Checkout
          </div>
          <div
            style={{
              marginTop: 10,
              fontFamily: tokens.fonts.sfPro,
              fontSize: 44,
              fontWeight: 700,
              letterSpacing: "-0.065em",
              color: "#111827"
            }}
          >
            Pro plan
          </div>
        </div>
        <Badge
          label="Day 3"
          background="rgba(255,244,235,0.95)"
          border="rgba(251,146,60,0.32)"
          color="#c2410c"
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: 34,
          right: 34,
          top: 162,
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 16,
          padding: "24px 26px",
          borderRadius: 26,
          border: "1px solid rgba(226,232,240,0.96)",
          background: "rgba(255,255,255,0.96)"
        }}
      >
        <div>
          <div
            style={{
              fontFamily: tokens.fonts.mono,
              fontSize: 12,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "rgba(71,85,105,0.72)"
            }}
          >
            Amount due
          </div>
          <div
            style={{
              marginTop: 10,
              fontFamily: tokens.fonts.sfPro,
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: "-0.07em",
              color: "#0f172a"
            }}
          >
            $49
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12
          }}
        >
          <Spinner frame={frame} opacity={statusOpacity} />
          <div
            style={{
              fontFamily: tokens.fonts.sfPro,
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              color: "#334155",
              opacity: statusOpacity
            }}
          >
            Processing...
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 34,
          right: 34,
          top: 302,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 22px",
          borderRadius: 22,
          border: "1px solid rgba(254,202,202,0.92)",
          background: "rgba(254,242,242,0.96)"
        }}
      >
        <div>
          <div
            style={{
              fontFamily: tokens.fonts.mono,
              fontSize: 12,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "#b91c1c"
            }}
          >
            Payment status
          </div>
          <div
            style={{
              marginTop: 10,
              fontFamily: tokens.fonts.sfPro,
              fontSize: 34,
              lineHeight: 1.08,
              letterSpacing: "-0.05em",
              fontWeight: 700,
              color: "#7f1d1d"
            }}
          >
            Still failing
          </div>
        </div>
        <Badge
          label="Blocked"
          background="rgba(255,255,255,0.92)"
          border="rgba(239,68,68,0.24)"
          color="#b91c1c"
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: 34,
          right: 34,
          bottom: 42,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div
          style={{
            fontFamily: tokens.fonts.sfPro,
            fontSize: 28,
            letterSpacing: "-0.04em",
            fontWeight: 600,
            color: "rgba(127,29,29,0.82)"
          }}
        >
          The issue is still unresolved.
        </div>
        <div
          style={{
            padding: "0 24px",
            minHeight: 68,
            borderRadius: 22,
            display: "inline-flex",
            alignItems: "center",
            background: mixColor(deadStop, "rgba(241,245,249,0.94)", "rgba(226,232,240,0.96)"),
            border: "1px solid rgba(203,213,225,0.96)",
            color: "rgba(100,116,139,0.82)",
            fontFamily: tokens.fonts.sfPro,
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "-0.04em"
          }}
        >
          Retry disabled
        </div>
      </div>
    </div>
  );
};

export const PaymentStillStuck: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = (p: number) => p * (durationInFrames - 1);

  const intro = ramp(frame, 0, 18);
  const beat1 = ramp(frame, t(0.06), t(0.20));
  const beat2 = ramp(frame, t(0.22), t(0.38));
  const beat3 = ramp(frame, t(0.46), t(0.60));
  const beat4 = ramp(frame, t(0.68), t(0.82));
  const deadStop = ramp(frame, t(0.82), t(0.92));
  const brandIn = ramp(frame, t(0.84), t(0.96));

  const chatFade = 1 - ramp(frame, t(0.70), t(0.84));
  const paymentProgress = ramp(frame, t(0.00), t(0.12), 0, 0.28) + ramp(frame, t(0.70), t(0.84), 0, 0.72);
  const paymentSpotlight = ramp(frame, t(0.64), t(0.82));
  const subtleFloat = floatProgress(frame, 8, 220, 30);
  const comfortPulse = 0.18 + Math.abs(floatProgress(frame, 0.16, 70));

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(145deg, #f7f3ef 0%, #f1ece8 46%, #ece7e2 100%)",
        fontFamily: tokens.fonts.body,
        color: tokens.colors.text
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(206,199,190,0.26) 1px, transparent 1px), linear-gradient(to bottom, rgba(206,199,190,0.24) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          opacity: 0.28
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 82% 20%, rgba(248,113,113,0.10), transparent 26%), radial-gradient(circle at 18% 72%, rgba(107,114,128,0.06), transparent 28%), radial-gradient(circle at 52% 44%, rgba(255,255,255,0.30), transparent 30%)"
        }}
      />

      <div
        style={{
          position: "absolute",
          left: stage.x,
          top: 60,
          display: "flex",
          alignItems: "center",
          gap: 14,
          opacity: intro,
          transform: `translateY(${mix(intro, 18, 0)}px)`
        }}
      >
        <Badge
          label="Traditional AI assistant"
          background="rgba(255,255,255,0.92)"
          border="rgba(203,213,225,0.82)"
          color="#475569"
        />
        <div
          style={{
            fontFamily: tokens.fonts.sfPro,
            fontSize: 54,
            letterSpacing: "-0.07em",
            lineHeight: 0.94,
            fontWeight: 700,
            color: "#0f172a"
          }}
        >
          It says solved.
          <br />
          Payment is still stuck.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: stage.x,
          top: stage.y,
          width: stage.width,
          height: stage.height,
          opacity: intro,
          transform: `translateY(${mix(intro, 24, 0)}px)`
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1040,
            height: 760,
            borderRadius: 34,
            border: "1px solid rgba(214,211,209,0.92)",
            background: "rgba(255,255,255,0.98)",
            boxShadow: `0 26px 72px rgba(15,23,42,0.08)`,
            overflow: "hidden",
            opacity: chatFade,
            transform: `translate3d(0, ${subtleFloat}px, 0)`
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: 96,
              borderBottom: "1px solid rgba(226,232,240,0.92)",
              background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,252,0.98))"
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 28,
                top: 24,
                display: "flex",
                alignItems: "center",
                gap: 14
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 14,
                  background: "linear-gradient(135deg, #111827, #334155)",
                  color: "#ffffff",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: tokens.fonts.mono,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.04em"
                }}
              >
                AI
              </div>
              <div>
                <div
                  style={{
                    fontFamily: tokens.fonts.sfPro,
                    fontSize: 28,
                    fontWeight: 700,
                    letterSpacing: "-0.05em",
                    color: "#111827"
                  }}
                >
                  #support
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontFamily: tokens.fonts.mono,
                    fontSize: 12,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: "rgba(100,116,139,0.72)"
                  }}
                >
                  community chat
                </div>
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                right: 28,
                top: 30,
                display: "flex",
                alignItems: "center",
                gap: 18
              }}
            >
              <PressureMeter progress={beat1 + beat2 * 0.7} />
              <Badge
                label="No action yet"
                background="rgba(255,247,237,0.94)"
                border="rgba(253,186,116,0.40)"
                color="#b45309"
              />
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              left: 30,
              right: 30,
              top: 126,
              bottom: 30,
              display: "flex",
              flexDirection: "column",
              gap: 20
            }}
          >
            <ChatBubble
              align="right"
              title="User"
              body={"I still can't pay.\nCheckout freezes.\nIt's been 3 days."}
              width={680}
              background="linear-gradient(180deg, rgba(17,24,39,0.98), rgba(30,41,59,0.98))"
              border="rgba(51,65,85,0.96)"
              bodyColor="#ffffff"
              metaColor="rgba(226,232,240,0.72)"
              progress={beat1}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 12,
                opacity: beat1
              }}
            >
              <Badge
                label="Payment failed"
                background="rgba(254,242,242,0.96)"
                border="rgba(248,113,113,0.28)"
                color="#b91c1c"
              />
              <Badge
                label="3 days blocked"
                background="rgba(255,247,237,0.96)"
                border="rgba(251,146,60,0.28)"
                color="#c2410c"
              />
            </div>

            <ChatBubble
              align="left"
              title="Support AI"
              body={"We've received your issue.\nPlease don't worry.\nI'm right here with you."}
              width={720}
              background={`linear-gradient(180deg, rgba(249,245,255,0.98), rgba(244,238,251,0.98))`}
              border={mixColor(beat2, "rgba(221,214,254,0.36)", "rgba(196,181,253,0.66)")}
              bodyColor="#312e81"
              metaColor="#7c3aed"
              progress={beat2}
              style={{
                boxShadow: `0 24px 52px rgba(168,85,247,${comfortPulse})`
              }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
                opacity: beat3,
                transform: `translateY(${mix(beat3, 20, 0)}px)`
              }}
            >
              <ChatBubble
                align="right"
                title="User"
                body={"Can you actually fix it?\nDon't just say you got it."}
                width={610}
                background="rgba(255,255,255,0.98)"
                border="rgba(203,213,225,0.94)"
                bodyColor="#0f172a"
                metaColor="rgba(71,85,105,0.84)"
                progress={beat3}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 18
                }}
              >
                <ChatBubble
                  align="left"
                  title="Support AI"
                  body={"Good news.\nThe issue is resolved now."}
                  width={560}
                  background="rgba(240,253,244,0.98)"
                  border="rgba(134,239,172,0.82)"
                  bodyColor="#166534"
                  metaColor="#15803d"
                  progress={beat3}
                />
                <Badge
                  label="Resolved"
                  background="rgba(220,252,231,0.96)"
                  border="rgba(134,239,172,0.84)"
                  color="#166534"
                  style={{
                    opacity: beat3,
                    transform: `translateY(${mix(beat3, 18, 0)}px)`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <PaymentPanel
          frame={frame}
          progress={paymentProgress}
          spotlight={paymentSpotlight}
          deadStop={deadStop}
        />

        <div
          style={{
            position: "absolute",
            right: 44,
            bottom: 28,
            display: "flex",
            alignItems: "center",
            gap: 18
          }}
        >
          <div
            style={{
              fontFamily: tokens.fonts.sfPro,
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: "-0.05em",
              color: mixColor(brandIn, "rgba(71,85,105,0.0)", "rgba(15,23,42,0.82)"),
              opacity: brandIn
            }}
          >
            AI teammate &gt; empty comfort
          </div>
          <BrandLockup resolveProgress={brandIn} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
