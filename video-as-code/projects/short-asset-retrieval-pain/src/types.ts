export type ViewMode = "timeline" | "scene";

export type SceneId = "s01" | "s02" | "s03" | "s04" | "s05";

export type SceneMode = "static" | "motion";

export type KnowledgeRecord = {
  id: string;
  title: string;
  summary: string;
  sourceLabel: string;
  updatedAt: string;
  isSelected?: boolean;
  isUpdated?: boolean;
  before?: string;
  after?: string;
};

export type EditAction = {
  id: string;
  label: string;
  detail?: string;
};

export type ChatHistoryItem = {
  id: string;
  title: string;
  state: "ready" | "risk" | "pending";
};

export type ChatMessage = {
  id: string;
  role: "client" | "assistant";
  author: string;
  timestamp: string;
  content: string;
};

export type TestQueryState = {
  query: string;
  result: string;
  status: string;
};

export type RiskState = {
  banner: string;
  tag: string;
  action: string;
  note: string;
  ending: string;
  endingSubline: string;
};
