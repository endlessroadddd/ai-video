import { AbsoluteFill } from "remotion";
import { BrandLayer } from "./BrandLayer";
import { Phase2Bubbles } from "./Phase2Bubbles";
import { Phase3Cards } from "./Phase3Cards";
import { Phase4Network } from "./Phase4Network";

// Lucius "context layer" segment - 19s, 5-stage narrative.
// Stage 1 (0-4s)     : layer draws in
// Stage 2 (4-8.3s)   : conversation sources feed the layer
// Stage 3 (8.3-12s)  : "what matters" cards surface
// Stage 4 (12-16s)   : cards fall back into the layer
// Stage 5 (16-19s)   : layer collapses into the Lucius closing seal

export const ContextLayer: React.FC<{ showBackground?: boolean }> = ({
  showBackground = true,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: showBackground ? "#080914" : "transparent" }}>
      {showBackground && (
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(circle at 50% 42%, rgba(106, 85, 178, 0.3), transparent 42%), radial-gradient(circle at 74% 70%, rgba(60, 83, 111, 0.18), transparent 36%), #080914",
          }}
        />
      )}

      {/* Stage 1+: foundational layer waveform. Fades as the closing layer takes over. */}
      <BrandLayer />

      {/* Stage 2: conversation sources */}
      <Phase2Bubbles />

      {/* Stage 3: what matters cards */}
      <Phase3Cards />

      {/* Stage 4+5: card absorption + closing seal */}
      <Phase4Network />
    </AbsoluteFill>
  );
};
