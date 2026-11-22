import React from "react";
import {Composition} from "remotion";
import {ReplyPulse} from "./compositions/ReplyPulse";
import {FollowupTrigger} from "./compositions/FollowupTrigger";
import {WarmHandoff} from "./compositions/WarmHandoff";
import {CompetitorBrief} from "./compositions/CompetitorBrief";
import {FrameworkFlattening} from "./compositions/FrameworkFlattening";
import {PaymentStillStuck} from "./compositions/PaymentStillStuck";

import {structureScenes} from "./structure/scenes";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ResponseEngine"
        component={ReplyPulse}
        durationInFrames={structureScenes.responseEngine.durationInFrames}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="EventTriggerMesh"
        component={FollowupTrigger}
        durationInFrames={structureScenes.eventTriggerMesh.durationInFrames}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="LearningTrustLoop"
        component={WarmHandoff}
        durationInFrames={structureScenes.learningTrustLoop.durationInFrames}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="JourneyRouter"
        component={CompetitorBrief}
        durationInFrames={structureScenes.journeyRouter.durationInFrames}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="FrameworkFlattening"
        component={FrameworkFlattening}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="PaymentStillStuck"
        component={PaymentStillStuck}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
