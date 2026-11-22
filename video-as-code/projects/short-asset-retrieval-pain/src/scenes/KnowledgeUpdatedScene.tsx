import { KNOWLEDGE_ITEMS } from "../data/story";
import { easeOutCubic, mix, ramp } from "../lib/motion";
import type { SceneMode } from "../types";
import { KnowledgeDeskFrame } from "../components/KnowledgeDeskFrame";

type KnowledgeUpdatedSceneProps = {
  mode: SceneMode;
  t: number;
};

export function KnowledgeUpdatedScene(props: KnowledgeUpdatedSceneProps) {
  const { mode, t } = props;
  const stageIn = easeOutCubic(ramp(t, 0, 700));
  const focusTarget =
    mode === "static" ? "diff" : t < 1_700 ? "updated" : t < 2_700 ? "source" : "diff";

  return (
    <div
      className="scene-frame"
      style={{
        opacity: stageIn,
        transform: `translate3d(0, ${mix(18, 0, stageIn)}px, 0)`,
      }}
    >
      <KnowledgeDeskFrame
        focusTarget={focusTarget}
        items={KNOWLEDGE_ITEMS}
        topNote="Knowledge already updated"
      />
    </div>
  );
}
