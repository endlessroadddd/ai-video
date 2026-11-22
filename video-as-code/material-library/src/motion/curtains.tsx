import { createExternalComponent } from "../internal/external-component";

const modules = import.meta.glob([
  "../../../projects/short-assets-learn_from_conversations/src/lib/curtains.tsx",
  "../../../projects/short-assets-one_command_do_all/src/lib/curtains.tsx",
]);

const loadLearnConversationsCurtains =
  modules["../../../projects/short-assets-learn_from_conversations/src/lib/curtains.tsx"];
const loadOneCommandCurtains =
  modules["../../../projects/short-assets-one_command_do_all/src/lib/curtains.tsx"];

if (!loadLearnConversationsCurtains || !loadOneCommandCurtains) {
  throw new Error("curtain source files are unavailable");
}

export const LearnConvCurtainKnowledgeGraphV3 = createExternalComponent<Record<string, unknown>>(
  loadLearnConversationsCurtains,
  "LearnConvCurtainKnowledgeGraphV3",
  "LearnConvCurtainKnowledgeGraphV3",
);

export const LearnConvCurtainKnowledgeGraph = createExternalComponent<Record<string, unknown>>(
  loadLearnConversationsCurtains,
  "LearnConvCurtainKnowledgeGraph",
  "LearnConvCurtainKnowledgeGraph",
);

export const LearnConvCurtainKnowledgeGraphV2 = createExternalComponent<Record<string, unknown>>(
  loadLearnConversationsCurtains,
  "LearnConvCurtainKnowledgeGraphV2",
  "LearnConvCurtainKnowledgeGraphV2",
);

export const LearnConvCurtainCommitPulse = createExternalComponent<Record<string, unknown>>(
  loadLearnConversationsCurtains,
  "LearnConvCurtainCommitPulse",
  "LearnConvCurtainCommitPulse",
);

export const OneCommandCurtainEverywhere = createExternalComponent<Record<string, unknown>>(
  loadOneCommandCurtains,
  "OneCommandCurtainEverywhere",
  "OneCommandCurtainEverywhere",
);

export const OneCommandCurtainPulseQueue = createExternalComponent<Record<string, unknown>>(
  loadOneCommandCurtains,
  "OneCommandCurtainPulseQueue",
  "OneCommandCurtainPulseQueue",
);
