import "./index.css";
import { Composition } from "remotion";
import { TeamContextLayerComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TeamContextLayer"
        component={TeamContextLayerComposition}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
