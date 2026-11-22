import { Composition } from "remotion";
import { ContextLayer } from "./Composition";
import { TOTAL_FRAMES, VIDEO_FPS } from "./theme";

// 19s @ 60fps = 1140 frames.

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ContextLayer"
        component={ContextLayer}
        durationInFrames={TOTAL_FRAMES}
        fps={VIDEO_FPS}
        width={1920}
        height={1080}
        defaultProps={{ showBackground: true }}
      />
      <Composition
        id="ContextLayerTransparent"
        component={ContextLayer}
        durationInFrames={TOTAL_FRAMES}
        fps={VIDEO_FPS}
        width={1920}
        height={1080}
        defaultProps={{ showBackground: false }}
      />
    </>
  );
};
