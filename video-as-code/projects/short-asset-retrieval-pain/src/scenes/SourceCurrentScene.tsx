import { INTERNAL_CONFIRMATION_LINES, KNOWLEDGE_ITEMS } from "../data/story";
import { easeOutCubic, mix, ramp } from "../lib/motion";
import type { SceneMode } from "../types";
import { KnowledgeDeskFrame } from "../components/KnowledgeDeskFrame";

type SourceCurrentSceneProps = {
  mode: SceneMode;
  t: number;
};

export function SourceCurrentScene(props: SourceCurrentSceneProps) {
  const { mode, t } = props;
  const stageIn = easeOutCubic(ramp(t, 0, 650));
  const visibleCalloutCount =
    mode === "static" ? 3 : t < 1_400 ? 1 : t < 2_800 ? 2 : 3;
  const focusTarget =
    mode === "static" ? "diff" : t < 1_900 ? "updated" : t < 3_300 ? "source" : "diff";

  return (
    <div
      className="scene-frame"
      style={{
        opacity: stageIn,
        transform: `translate3d(0, ${mix(16, 0, stageIn)}px, 0)`,
      }}
    >
      <KnowledgeDeskFrame
        calloutLines={INTERNAL_CONFIRMATION_LINES}
        focusTarget={focusTarget}
        items={KNOWLEDGE_ITEMS}
        topNote="Source audit"
        visibleCalloutCount={visibleCalloutCount}
      />
    </div>
  );
}
