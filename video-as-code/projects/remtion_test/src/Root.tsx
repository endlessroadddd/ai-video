import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={MyComposition}
        durationInFrames={162}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
