import { EDIT_ACTIONS, KNOWLEDGE_ITEMS, TEST_QUERY } from "../data/story";
import { easeOutCubic, mix, ramp } from "../lib/motion";
import type { SceneMode } from "../types";
import { KnowledgeDeskFrame } from "../components/KnowledgeDeskFrame";

type DocumentTweaksFailSceneProps = {
  mode: SceneMode;
  t: number;
};

export function DocumentTweaksFailScene(props: DocumentTweaksFailSceneProps) {
  const { mode, t } = props;
  const stageIn = easeOutCubic(ramp(t, 0, 650));
  const revealedEditCount =
    mode === "static" ? 3 : t < 1_500 ? 1 : t < 3_200 ? 2 : 3;
  const showTestQuery = mode === "static" || t >= 4_000;
  const focusTarget = showTestQuery ? "test" : "editor";

  return (
    <div
      className="scene-frame"
      style={{
        opacity: stageIn,
        transform: `translate3d(0, ${mix(18, 0, stageIn)}px, 0)`,
      }}
    >
      <KnowledgeDeskFrame
        editActions={EDIT_ACTIONS}
        focusTarget={focusTarget}
        items={KNOWLEDGE_ITEMS}
        revealedEditCount={revealedEditCount}
        showTestQuery={showTestQuery}
        testQuery={TEST_QUERY}
        topNote="Document edits in progress"
      />
    </div>
  );
}
