export const SEGMENT02_HEADLINE_OPEN = "The team revises the docs — again and again.";
export const SEGMENT02_HEADLINE_CLOSE = "Still the same wrong answer.";

export const SEGMENT02_DURATION_MS = 20_300;

export const SEGMENT02_TIMINGS = {
  headlineOpenIn: 0,
  headlineOpenOut: 2_000,
  edit1At: 2_000,
  edit2At: 3_200,
  edit3At: 4_400,
  modalOutAt: 8_400,
  modalOutEnd: 9_200,
  retryLabelAt: 9_700,
  userPromptAt: 10_300,
  aiAvatarAt: 11_900,
  aiReplyAt: 12_900,
  stillWrongAt: 14_400,
  headlineCloseIn: 14_900,
  headlineCloseOut: 16_900,
  userReaction1At: 17_000,
  userReaction2At: 17_900,
} as const;

export const SEGMENT02_THREAD_TITLE = "credit-terms-recheck";
export const SEGMENT02_THREAD_SUBTITLE =
  "Fresh retry after three document revisions. Same question. Same stakes.";
export const SEGMENT02_STATUS_PILL = "Fresh thread";
export const SEGMENT02_RETRY_LABEL = "Fresh retry thread";
export const SEGMENT02_SIDEBAR_STATUS_TITLE = "3 document edits completed";
export const SEGMENT02_SIDEBAR_STATUS_NOTE =
  "Multiple teammates revised the source docs, then restarted the same client question in a fresh thread.";
export const SEGMENT02_MODAL_EYEBROW = "Team intervention";
export const SEGMENT02_MODAL_TITLE = "The team keeps revising the docs.";
export const SEGMENT02_MODAL_FOOTER = "The team keeps revising the docs.";
export const SEGMENT02_AI_WAITING =
  "Re-running retrieval against the revised documents...";
export const SEGMENT02_AI_STILL_WRONG = "Still wrong";

export type Segment02TeamMember = {
  avatarSrc: string;
  id: string;
  label: string;
};

export const SEGMENT02_TEAM_MEMBERS: readonly Segment02TeamMember[] = [
  {
    id: "ops",
    label: "Ops",
    avatarSrc: "/team-avatar-ops.svg",
  },
  {
    id: "support",
    label: "Support",
    avatarSrc: "/team-avatar-support.svg",
  },
  {
    id: "knowledge",
    label: "Knowledge",
    avatarSrc: "/team-avatar-knowledge.svg",
  },
  {
    id: "pm",
    label: "PM",
    avatarSrc: "/team-avatar-pm.svg",
  },
  {
    id: "qa",
    label: "QA",
    avatarSrc: "/team-avatar-qa.svg",
  },
  {
    id: "am",
    label: "AM",
    avatarSrc: "/team-avatar-am.svg",
  },
] as const;

export const SEGMENT02_EDIT_STEPS = [
  {
    id: "edit-01",
    label: "Edit 01",
    detail: "Retitled the doc",
  },
  {
    id: "edit-02",
    label: "Edit 02",
    detail: "Moved the answer to top",
  },
  {
    id: "edit-03",
    label: "Edit 03",
    detail: "Added exact customer wording",
  },
] as const;

export type Segment02CardMeta = {
  category: string;
  detail: string;
  title: string;
  signal: string;
  state: string;
};

export const SEGMENT02_CARD_META: Record<string, Segment02CardMeta> = {
  "contract-amendment": {
    category: "Policy doc",
    state: "REV 03",
    title: "Contract amendment",
    detail: "Amendment clause refreshed for retry.",
    signal: "Contract ops synced",
  },
  "credit-retention": {
    category: "Rule set",
    state: "REV 03",
    title: "Credit retention",
    detail: "Priority rule moved to top.",
    signal: "Billing rule refreshed",
  },
  "billing-exception": {
    category: "Memo",
    state: "REV 03",
    title: "Billing exception",
    detail: "Override memo rewritten for retry.",
    signal: "Exception memo synced",
  },
  "terms-addendum": {
    category: "Addendum",
    state: "REV 03",
    title: "Enterprise addendum",
    detail: "Terms clause refreshed for retry.",
    signal: "Terms pack re-synced",
  },
};

export const SEGMENT02_USER_REACTIONS = [
  "???",
  "We edited this three times. Why is this still wrong?!",
] as const;
