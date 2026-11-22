import { createExternalComponent } from "../internal/external-component";

const modules = import.meta.glob([
  "../../../projects/short-asset-break-immersion/src/CommunityScene.tsx",
  "../../../projects/short-asset-break-immersion/src/LossChartScene.tsx",
  "../../../projects/short-asset-break-immersion/src/TimelinePreview.tsx",
]);

const loadCommunitySceneModule =
  modules["../../../projects/short-asset-break-immersion/src/CommunityScene.tsx"];
const loadLossChartSceneModule =
  modules["../../../projects/short-asset-break-immersion/src/LossChartScene.tsx"];
const loadTimelinePreviewModule =
  modules["../../../projects/short-asset-break-immersion/src/TimelinePreview.tsx"];

if (!loadCommunitySceneModule || !loadLossChartSceneModule || !loadTimelinePreviewModule) {
  throw new Error("break immersion scene source is unavailable");
}

export const BreakImmersionCommunityScene = createExternalComponent<Record<string, unknown>>(
  loadCommunitySceneModule,
  "CommunityScene",
  "BreakImmersionCommunityScene",
);

export const BreakImmersionLossChartScene = createExternalComponent<Record<string, unknown>>(
  loadLossChartSceneModule,
  "LossChartScene",
  "BreakImmersionLossChartScene",
);

export const BreakImmersionTimelinePreview = createExternalComponent<Record<string, unknown>>(
  loadTimelinePreviewModule,
  "TimelinePreview",
  "BreakImmersionTimelinePreview",
);
