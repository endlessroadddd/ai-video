import { Composition } from "remotion";
import { LuciusJustLearned } from "./LuciusJustLearned";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="LuciusJustLearned"
      component={LuciusJustLearned}
      durationInFrames={480}
      fps={60}
      width={2560}
      height={1440}
    />
  );
};
