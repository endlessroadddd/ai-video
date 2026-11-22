import type { ChatHistoryItem, ChatMessage, EditAction, KnowledgeRecord, RiskState, SceneId, TestQueryState } from "../types";

export const SCENE_DURATIONS: Record<SceneId, number> = {
  s01: 5_000,
  s02: 6_000,
  s03: 6_000,
  s04: 7_000,
  s05: 6_000,
};

export const TIMELINE_SEGMENTS = [
  { scene: "s01", label: "S01 Knowledge Updated", startMs: 0, durationMs: 5_000 },
  { scene: "s02", label: "S02 Wrong Answer", startMs: 5_000, durationMs: 6_000 },
  { scene: "s03", label: "S03 Source Is Current", startMs: 11_000, durationMs: 6_000 },
  { scene: "s04", label: "S04 Document Tweaks Fail", startMs: 17_000, durationMs: 7_000 },
  { scene: "s05", label: "S05 Client Risk", startMs: 24_000, durationMs: 6_000 },
] as const;

export const TOTAL_DURATION_MS =
  TIMELINE_SEGMENTS[TIMELINE_SEGMENTS.length - 1]!.startMs +
  TIMELINE_SEGMENTS[TIMELINE_SEGMENTS.length - 1]!.durationMs;

export const KNOWLEDGE_ITEMS: KnowledgeRecord[] = [
  {
    id: "policy-annual-credit",
    title: "Annual Plan Seat Reduction Credit Policy",
    summary: "Enterprise accounts can receive prorated credits within 7 days when reducing 10+ seats.",
    sourceLabel: "Billing policy doc - Synced",
    updatedAt: "Updated 12 min ago",
    isSelected: true,
    isUpdated: true,
    before: "Credits are not available after activation.",
    after: "Prorated credits are allowed within 7 days for annual seat reductions of 10 or more.",
  },
  {
    id: "policy-renewal-window",
    title: "Renewal Window Exception Rules",
    summary: "Account managers can approve renewal exceptions when contract amendments are pending.",
    sourceLabel: "Contract ops note",
    updatedAt: "Updated yesterday",
  },
  {
    id: "policy-billing-owner",
    title: "Billing Owner Approval Path",
    summary: "Seat-change approvals must route through finance owners for enterprise contracts above 250 seats.",
    sourceLabel: "Internal workflow doc",
    updatedAt: "Updated 3 days ago",
  },
];

export const INTERNAL_CONFIRMATION_LINES = [
  "This is already updated.",
  "The source is current.",
  "Why is it still citing the previous rule?",
] as const;

export const EDIT_ACTIONS: EditAction[] = [
  {
    id: "summary",
    label: "Reworded summary",
    detail: "Added direct mention of seat reduction credit",
  },
  {
    id: "priority",
    label: "Moved rule to top",
    detail: "Placed the updated policy above legacy billing notes",
  },
  {
    id: "query-match",
    label: "Added exact customer wording",
    detail: "Matched the phrasing used in client tickets",
  },
];

export const TEST_QUERY: TestQueryState = {
  query: "Can we get a prorated credit after removing 20 annual seats this week?",
  result: "Still matched: previous policy",
  status: "Answer source mismatch",
};

export const CHAT_HISTORY: ChatHistoryItem[] = [
  { id: "h1", title: "Seat reduction credit clarification", state: "risk" },
  { id: "h2", title: "Enterprise invoice correction request", state: "ready" },
  { id: "h3", title: "Renewal exception wording", state: "pending" },
];

export const WRONG_ANSWER_MESSAGES: ChatMessage[] = [
  {
    id: "client-question",
    role: "client",
    author: "Northstar Systems - Finance Ops",
    timestamp: "Now",
    content:
      "We are removing **20 annual seats** this week.\nCan we get a **prorated credit**?",
  },
  {
    id: "assistant-wrong",
    role: "assistant",
    author: "Enterprise AI",
    timestamp: "Now",
    content:
      "**No. Credits are not available after an annual plan is activated.**\nSeat reductions will only apply at renewal.",
  },
];

export const RISK_STATE: RiskState = {
  banner: "Wrong answer sent to client",
  tag: "High-risk enterprise account",
  action: "Manual takeover required",
  note: "I am taking this one manually.",
  ending: "You updated the document. The AI still missed the knowledge.",
  endingSubline: "And your team kept losing time trying to fix the document.",
};
