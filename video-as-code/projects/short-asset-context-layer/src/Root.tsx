import { Composition } from "remotion";
import { ContextLayer } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ContextLayer"
        component={ContextLayer}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ showBackground: true }}
      />
      <Composition
        id="ContextLayerTransparent"
        component={ContextLayer}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ showBackground: false }}
      />
    </>
  );
};
