import type { FC } from "react";
import type { CalculateMetadataFunction } from "remotion";
import { Composition } from "remotion";
import { LuciusLogoType } from "./LuciusLogoType";
import { YuChengLowerThird, YuChengLowerThirdBlackBg } from "./YuChengLowerThird";

const calculateTransparentMetadata: CalculateMetadataFunction<Record<string, unknown>> = () => {
  return {
    defaultCodec: "prores",
    defaultVideoImageFormat: "png",
    defaultPixelFormat: "yuva444p10le",
    defaultProResProfile: "4444",
  };
};

export const RemotionRoot: FC = () => {
  return (
    <>
      <Composition
        id="YuChengLowerThird"
        component={YuChengLowerThird}
        durationInFrames={240}
        fps={60}
        width={2560}
        height={1440}
        calculateMetadata={calculateTransparentMetadata}
      />
      <Composition
        id="YuChengLowerThirdSupersample"
        component={YuChengLowerThird}
        durationInFrames={240}
        fps={60}
        width={5120}
        height={2880}
        calculateMetadata={calculateTransparentMetadata}
      />
      <Composition
        id="YuChengLowerThirdBlackBg"
        component={YuChengLowerThirdBlackBg}
        durationInFrames={240}
        fps={60}
        width={2560}
        height={1440}
      />
      <Composition
        id="LuciusLogoType"
        component={LuciusLogoType}
        durationInFrames={150}
        fps={30}
        width={2560}
        height={1440}
        calculateMetadata={calculateTransparentMetadata}
      />
      <Composition
        id="LuciusLogoTypeSupersample"
        component={LuciusLogoType}
        durationInFrames={150}
        fps={30}
        width={5120}
        height={2880}
        calculateMetadata={calculateTransparentMetadata}
      />
    </>
  );
};
