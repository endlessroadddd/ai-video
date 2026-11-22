export type SceneTone = "primary" | "cool" | "warm" | "success" | "rose" | "neutral" | "orange";

export type SceneNode = {
  id: string;
  kind: "signal" | "planner" | "memory" | "gate" | "action" | "handoff" | "brief" | "reply" | "trust";
  shape?: "signal" | "terminal" | "box" | "beam" | "panel" | "bundle" | "rail";
  label: string;
  icon?: string;
  iconVariant?: "default" | "accent";
  x: number;
  y: number;
  width?: number;
  height?: number;
  tone?: SceneTone;
  activity?: Array<readonly [number, number]>;
};

export type SceneEdge = {
  id: string;
  style: "beam" | "dashed" | "stream" | "orbit";
  tone: SceneTone;
  weight: number;
  d: string;
};

export type SceneRoute = {
  pathRef?: string;
  path?: string;
  tone: SceneTone;
  start: number;
  end: number;
  count?: number;
  spacing?: number;
  radius?: number;
  mode?: "loop";
  laps?: number;
  reverse?: boolean;
};

export type SceneOrnament = {
  kind: "frame";
  tone: SceneTone;
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
  opacity?: number;
  rotate?: number;
};

export type ScenePhase = {
  id: string;
  label: string;
  copy: string;
  start: number;
  end: number;
};

export type StructureSceneConfig = {
  id: string;
  page: string;
  kicker: string;
  title: string;
  copy: string;
  durationMs: number;
  durationInFrames: number;
  captions: string[];
  phases: ScenePhase[];
  ornaments: SceneOrnament[];
  nodes: SceneNode[];
  edges: SceneEdge[];
  routes: SceneRoute[];
};

const fps = 30;
const msToFrames = (ms: number) => Math.round((ms / 1000) * fps);

export const pmInsightsScene: StructureSceneConfig = {
  id: "pm-insights",
  page: "a.html",
  kicker: "PM 场景 / Implied Insights",
  title: "从用户反馈到需求决策，\n让数据说话。",
  copy: "Lucius 作为客服和运营的 base，天然接触每一条真实反馈。将散落在运营动作、客服回答中的信号统一汇总、分类、提炼，直接给到 PM 有真实反馈支持的需求列表。",
  durationMs: 12000,
  durationInFrames: msToFrames(12000),
  captions: ["痛点：信息衰减", "汇聚散落信号", "数据驱动的需求看板"],
  phases: [
    {id: "intro", label: "场景切入", copy: "PM 面临的需求收集困境。", start: 0, end: 0.18},
    {id: "pain", label: "痛点揭示", copy: "流程长、信息衰减严重，决策靠拍脑门。", start: 0.18, end: 0.38},
    {id: "solution", label: "Lucius 方案", copy: "汇聚客服工单、群聊反馈、运营记录等散落信号。", start: 0.38, end: 0.62},
    {id: "deliver", label: "交付成果", copy: "真实反馈支撑的需求看板，附带数据佐证。", start: 0.62, end: 0.88},
    {id: "reset", label: "结束", copy: "展示完成，准备循环。", start: 0.88, end: 1}
  ],
  ornaments: [
    {kind: "frame", tone: "neutral", x: 280, y: 480, w: 380, h: 520, label: "信号源"},
    {kind: "frame", tone: "primary", x: 760, y: 480, w: 320, h: 280, label: "Lucius 核心"},
    {kind: "frame", tone: "neutral", x: 1160, y: 480, w: 400, h: 520, label: "需求看板"}
  ],
  nodes: [
    {id: "ticket", kind: "signal", shape: "signal", label: "客服工单", icon: "TKT", iconVariant: "default", x: 280, y: 280, width: 220, height: 72, tone: "rose", activity: [[0.20, 0.36]]},
    {id: "chat", kind: "signal", shape: "signal", label: "群聊反馈", icon: "CHT", iconVariant: "default", x: 280, y: 420, width: 220, height: 72, tone: "cool", activity: [[0.24, 0.40]]},
    {id: "ops", kind: "signal", shape: "signal", label: "运营记录", icon: "OPS", iconVariant: "default", x: 280, y: 560, width: 220, height: 72, tone: "warm", activity: [[0.28, 0.44]]},
    {id: "churn", kind: "signal", shape: "signal", label: "退订原因", icon: "OUT", iconVariant: "default", x: 280, y: 700, width: 220, height: 72, tone: "rose", activity: [[0.32, 0.48]]},
    {id: "lucius", kind: "planner", shape: "terminal", label: "Lucius 汇聚", icon: "AI", iconVariant: "accent", x: 760, y: 480, width: 280, height: 88, tone: "primary", activity: [[0.38, 0.72]]},
    {id: "insight1", kind: "memory", shape: "box", label: "导出性能痛点", icon: "P0", iconVariant: "default", x: 1160, y: 280, width: 280, height: 76, tone: "rose", activity: [[0.58, 0.82]]},
    {id: "insight2", kind: "memory", shape: "box", label: "API 需求", icon: "P1", iconVariant: "default", x: 1160, y: 420, width: 280, height: 76, tone: "cool", activity: [[0.64, 0.86]]},
    {id: "insight3", kind: "memory", shape: "box", label: "批量操作", icon: "P1", iconVariant: "default", x: 1160, y: 560, width: 280, height: 76, tone: "warm", activity: [[0.70, 0.90]]},
    {id: "insight4", kind: "memory", shape: "box", label: "权限管理", icon: "P2", iconVariant: "default", x: 1160, y: 700, width: 280, height: 76, tone: "neutral", activity: [[0.76, 0.94]]}
  ],
  edges: [
    {id: "pm-ticket-lucius", style: "beam", tone: "rose", weight: 2.2, d: "M390 280 H560 V400 H640"},
    {id: "pm-chat-lucius", style: "beam", tone: "cool", weight: 2.2, d: "M390 420 H640"},
    {id: "pm-ops-lucius", style: "beam", tone: "warm", weight: 2.2, d: "M390 560 H640"},
    {id: "pm-churn-lucius", style: "beam", tone: "rose", weight: 2.2, d: "M390 700 H560 V560 H640"},
    {id: "pm-lucius-insight1", style: "beam", tone: "primary", weight: 2.5, d: "M900 480 H1000 V280 H1020"},
    {id: "pm-lucius-insight2", style: "beam", tone: "primary", weight: 2.5, d: "M900 480 H1020"},
    {id: "pm-lucius-insight3", style: "beam", tone: "primary", weight: 2.5, d: "M900 480 H1000 V560 H1020"},
    {id: "pm-lucius-insight4", style: "beam", tone: "primary", weight: 2.5, d: "M900 480 H1000 V700 H1020"}
  ],
  routes: [
    {pathRef: "pm-ticket-lucius", tone: "rose", start: 0.22, end: 0.40, count: 2, spacing: 0.14, radius: 4.5},
    {pathRef: "pm-chat-lucius", tone: "cool", start: 0.26, end: 0.44, count: 2, spacing: 0.14, radius: 4.5},
    {pathRef: "pm-ops-lucius", tone: "warm", start: 0.30, end: 0.48, count: 2, spacing: 0.14, radius: 4.5},
    {pathRef: "pm-churn-lucius", tone: "rose", start: 0.34, end: 0.52, count: 2, spacing: 0.14, radius: 4.5},
    {pathRef: "pm-lucius-insight1", tone: "primary", start: 0.50, end: 0.70, count: 2, spacing: 0.16, radius: 5},
    {pathRef: "pm-lucius-insight2", tone: "primary", start: 0.56, end: 0.76, count: 2, spacing: 0.16, radius: 5},
    {pathRef: "pm-lucius-insight3", tone: "primary", start: 0.62, end: 0.82, count: 2, spacing: 0.16, radius: 5},
    {pathRef: "pm-lucius-insight4", tone: "primary", start: 0.68, end: 0.88, count: 2, spacing: 0.16, radius: 5}
  ]
};

export const structureScenes = {
  responseEngine: {
    id: "response-engine",
    page: "01-response-engine.html",
    kicker: "Facing users / Response engine",
    title: "Responds like a person. Operates like a system.",
    copy: "A user message enters one structured flow: split the ask, check the edges, then compose one grounded reply.",
    durationMs: 9800,
    durationInFrames: msToFrames(9800),
    captions: ["Split the ask", "Check the edges", "Converge on one answer"],
    phases: [
      {id: "intro", label: "Warm signal", copy: "A user enters the graph.", start: 0, end: 0.16},
      {id: "ingest", label: "Split", copy: "The ask branches into working dimensions.", start: 0.16, end: 0.36},
      {id: "process", label: "Reason", copy: "Signals return into the planner.", start: 0.36, end: 0.62},
      {id: "resolve", label: "Compose", copy: "A single response beam forms on the right.", start: 0.62, end: 0.88},
      {id: "reset", label: "Hold", copy: "The graph settles before looping again.", start: 0.88, end: 1}
    ],
    ornaments: [
      {kind: "frame", tone: "neutral", x: 260, y: 450, w: 344, h: 204, label: "User signal"},
      {kind: "frame", tone: "primary", x: 776, y: 450, w: 560, h: 520, label: "Reasoning split"},
      {kind: "frame", tone: "neutral", x: 1328, y: 450, w: 352, h: 520, label: "Reply stage"}
    ],
    nodes: [
      {id: "inbound", kind: "signal", shape: "signal", label: "Incoming message", icon: "IN", iconVariant: "default", x: 260, y: 450, width: 304, height: 76, tone: "neutral", activity: [[0.1, 0.24]]},
      {id: "planner", kind: "planner", shape: "terminal", label: "Lucius reasoning", icon: "AI", iconVariant: "accent", x: 760, y: 450, width: 340, height: 82, tone: "primary", activity: [[0.3, 0.64]]},
      {id: "warmth", kind: "reply", shape: "box", label: "Human tone", icon: "TN", iconVariant: "default", x: 1090, y: 284, width: 260, height: 76, tone: "neutral", activity: [[0.44, 0.72]]},
      {id: "grounding", kind: "reply", shape: "box", label: "Grounded answer", icon: "CK", iconVariant: "default", x: 1090, y: 616, width: 294, height: 76, tone: "neutral", activity: [[0.5, 0.78]]},
      {id: "reply", kind: "reply", shape: "beam", label: "Ready reply", icon: "OK", iconVariant: "default", x: 1338, y: 450, width: 286, height: 76, tone: "neutral", activity: [[0.68, 0.92]]}
    ],
    edges: [
      {id: "re-in-planner", style: "beam", tone: "primary", weight: 2.5, d: "M412 450 H590"},
      {id: "re-planner-warmth", style: "beam", tone: "primary", weight: 2.5, d: "M930 450 H1000 V284 H960"},
      {id: "re-planner-grounding", style: "beam", tone: "primary", weight: 2.5, d: "M930 450 H1000 V616 H943"},
      {id: "re-warmth-reply", style: "beam", tone: "primary", weight: 2.5, d: "M1220 284 H1260 V418 H1195"},
      {id: "re-grounding-reply", style: "beam", tone: "primary", weight: 2.5, d: "M1237 616 H1260 V482 H1195"}
    ],
    routes: [
      {pathRef: "re-in-planner", tone: "primary", start: 0.16, end: 0.32, count: 2, spacing: 0.16, radius: 5},
      {pathRef: "re-planner-warmth", tone: "primary", start: 0.34, end: 0.54, count: 2, spacing: 0.16, radius: 5},
      {pathRef: "re-planner-grounding", tone: "primary", start: 0.4, end: 0.62, count: 2, spacing: 0.16, radius: 5},
      {pathRef: "re-warmth-reply", tone: "primary", start: 0.56, end: 0.8, count: 2, spacing: 0.16, radius: 5},
      {pathRef: "re-grounding-reply", tone: "primary", start: 0.62, end: 0.88, count: 2, spacing: 0.16, radius: 5}
    ]
  },
  eventTriggerMesh: {
    id: "event-trigger-mesh",
    page: "02-event-trigger-mesh.html",
    kicker: "Facing users / Event trigger mesh",
    title: "Triggered by events, not just messages.",
    copy: "Different events enter one detection lane, get classified, and push into the next action before anyone asks.",
    durationMs: 10200,
    durationInFrames: msToFrames(10200),
    captions: ["Detect the signal", "Route the event", "Push the next action"],
    phases: [
      {id: "intro", label: "Watch", copy: "The system is listening to more than chat.", start: 0, end: 0.14},
      {id: "ingest", label: "Detect", copy: "Three different signals enter the mesh.", start: 0.14, end: 0.34},
      {id: "process", label: "Route", copy: "The mesh classifies and fans out the work.", start: 0.34, end: 0.68},
      {id: "resolve", label: "Act", copy: "Action lanes light up before a human asks.", start: 0.68, end: 0.88},
      {id: "reset", label: "Loop", copy: "The network falls back into standby.", start: 0.88, end: 1}
    ],
    ornaments: [
      {kind: "frame", tone: "neutral", x: 260, y: 450, w: 360, h: 620, label: "Signals"},
      {kind: "frame", tone: "primary", x: 800, y: 450, w: 332, h: 244, label: "Lucius mesh"},
      {kind: "frame", tone: "neutral", x: 1290, y: 450, w: 360, h: 620, label: "Actions"}
    ],
    nodes: [
      {id: "silent", kind: "signal", shape: "signal", label: "Silent user", icon: "SIG", iconVariant: "default", x: 250, y: 220, width: 248, height: 76, tone: "neutral", activity: [[0.14, 0.3]]},
      {id: "anomaly", kind: "signal", shape: "signal", label: "Anomaly spike", icon: "ALT", iconVariant: "default", x: 250, y: 450, width: 270, height: 76, tone: "neutral", activity: [[0.18, 0.34]]},
      {id: "cold", kind: "signal", shape: "signal", label: "Cold lead", icon: "CLD", iconVariant: "default", x: 250, y: 680, width: 242, height: 76, tone: "neutral", activity: [[0.22, 0.38]]},
      {id: "mesh", kind: "gate", shape: "panel", label: "Lucius detects", icon: "AI", iconVariant: "accent", x: 800, y: 450, width: 320, height: 102, tone: "primary", activity: [[0.3, 0.68]]},
      {id: "followup", kind: "action", shape: "beam", label: "Follow-up queued", icon: "OUT", iconVariant: "default", x: 1290, y: 220, width: 300, height: 76, tone: "neutral", activity: [[0.48, 0.78]]},
      {id: "notify", kind: "action", shape: "beam", label: "Owner pinged", icon: "NTF", iconVariant: "default", x: 1290, y: 450, width: 260, height: 76, tone: "neutral", activity: [[0.56, 0.84]]},
      {id: "research", kind: "action", shape: "beam", label: "Research queued", icon: "RSH", iconVariant: "default", x: 1290, y: 680, width: 300, height: 76, tone: "neutral", activity: [[0.62, 0.9]]}
    ],
    edges: [
      {id: "ev-silent-mesh", style: "beam", tone: "primary", weight: 2.5, d: "M374 220 H560 V390 H640"},
      {id: "ev-anomaly-mesh", style: "beam", tone: "primary", weight: 2.5, d: "M385 450 H640"},
      {id: "ev-cold-mesh", style: "beam", tone: "primary", weight: 2.5, d: "M371 680 H560 V510 H640"},
      {id: "ev-mesh-followup", style: "beam", tone: "primary", weight: 2.5, d: "M960 450 H1040 V220 H1140"},
      {id: "ev-mesh-notify", style: "beam", tone: "primary", weight: 2.5, d: "M960 450 H1160"},
      {id: "ev-mesh-research", style: "beam", tone: "primary", weight: 2.5, d: "M960 450 H1040 V680 H1140"}
    ],
    routes: [
      {pathRef: "ev-silent-mesh", tone: "primary", start: 0.16, end: 0.36, count: 2, spacing: 0.16, radius: 5},
      {pathRef: "ev-anomaly-mesh", tone: "primary", start: 0.2, end: 0.4, count: 2, spacing: 0.16, radius: 5},
      {pathRef: "ev-cold-mesh", tone: "primary", start: 0.24, end: 0.44, count: 2, spacing: 0.16, radius: 5},
      {pathRef: "ev-mesh-followup", tone: "primary", start: 0.42, end: 0.66, count: 2, spacing: 0.16, radius: 5},
      {pathRef: "ev-mesh-notify", tone: "primary", start: 0.5, end: 0.76, count: 2, spacing: 0.16, radius: 5},
      {pathRef: "ev-mesh-research", tone: "primary", start: 0.58, end: 0.88, count: 2, spacing: 0.16, radius: 5}
    ]
  },
  learningTrustLoop: {
    id: "learning-trust-loop",
    page: "03-learning-trust-loop.html",
    kicker: "Facing users / Learning trust loop",
    title: "Learns the gaps, then earns more responsibility.",
    copy: "New conversations enter a structured learning loop, get written into memory, and then unlock more responsibility step by step.",
    durationMs: 10800,
    durationInFrames: msToFrames(10800),
    captions: ["Find the gap", "Write memory", "Scale trust"],
    phases: [
      {id: "intro", label: "Observe", copy: "The loop sits in quiet monitoring mode.", start: 0, end: 0.16},
      {id: "ingest", label: "Gap scan", copy: "Fresh conversation enters the learning loop.", start: 0.16, end: 0.34},
      {id: "process", label: "Write + reuse", copy: "The graph rewrites itself around the new pattern.", start: 0.34, end: 0.7},
      {id: "resolve", label: "Earn trust", copy: "Observe, propose, and execute light up in order.", start: 0.7, end: 0.9},
      {id: "reset", label: "Carry forward", copy: "The loop resets with more context than before.", start: 0.9, end: 1}
    ],
    ornaments: [
      {kind: "frame", tone: "primary", x: 648, y: 456, w: 820, h: 560, label: "Learning loop"},
      {kind: "frame", tone: "neutral", x: 1320, y: 450, w: 286, h: 520, label: "Trust rail"}
    ],
    nodes: [
      {id: "gap", kind: "signal", shape: "signal", label: "Gap detected", icon: "GAP", iconVariant: "default", x: 390, y: 650, width: 260, height: 76, tone: "neutral", activity: [[0.16, 0.3]]},
      {id: "write", kind: "memory", shape: "terminal", label: "Lucius learns", icon: "AI", iconVariant: "accent", x: 430, y: 260, width: 318, height: 82, tone: "primary", activity: [[0.3, 0.58]]},
      {id: "memory", kind: "memory", shape: "box", label: "Memory updated", icon: "DB", iconVariant: "default", x: 860, y: 260, width: 290, height: 76, tone: "neutral", activity: [[0.44, 0.68]]},
      {id: "reuse", kind: "memory", shape: "box", label: "Reusable memory", icon: "MEM", iconVariant: "default", x: 860, y: 650, width: 300, height: 76, tone: "neutral", activity: [[0.52, 0.78]]},
      {id: "observe", kind: "trust", shape: "rail", label: "Observe", icon: "OBS", iconVariant: "default", x: 1320, y: 250, width: 238, height: 64, tone: "neutral", activity: [[0.68, 0.8]]},
      {id: "propose", kind: "trust", shape: "rail", label: "Propose", icon: "PRP", iconVariant: "default", x: 1320, y: 450, width: 238, height: 64, tone: "neutral", activity: [[0.76, 0.88]]},
      {id: "execute", kind: "trust", shape: "rail", label: "Execute", icon: "EXE", iconVariant: "default", x: 1320, y: 650, width: 238, height: 64, tone: "neutral", activity: [[0.84, 0.94]]}
    ],
    edges: [
      {id: "lt-gap-write", style: "beam", tone: "primary", weight: 2.5, d: "M390 612 V301"},
      {id: "lt-write-memory", style: "beam", tone: "primary", weight: 2.5, d: "M589 260 H715"},
      {id: "lt-memory-reuse", style: "beam", tone: "primary", weight: 2.5, d: "M860 298 V612"},
      {id: "lt-reuse-loop", style: "stream", tone: "primary", weight: 2.5, d: "M710 650 H250 V260 H271"},
      {id: "lt-reuse-observe", style: "beam", tone: "primary", weight: 2.5, d: "M1010 650 H1120 V250 H1201"},
      {id: "lt-observe-propose", style: "beam", tone: "primary", weight: 2.5, d: "M1320 282 V418"},
      {id: "lt-propose-execute", style: "beam", tone: "primary", weight: 2.5, d: "M1320 482 V618"}
    ],
    routes: [
      {pathRef: "lt-gap-write", tone: "primary", start: 0.18, end: 0.36, count: 2, spacing: 0.16, radius: 5},
      {pathRef: "lt-write-memory", tone: "primary", start: 0.34, end: 0.52, count: 2, spacing: 0.16, radius: 5},
      {pathRef: "lt-memory-reuse", tone: "primary", start: 0.48, end: 0.66, count: 2, spacing: 0.16, radius: 5},
      {pathRef: "lt-reuse-loop", tone: "primary", start: 0.52, end: 0.76, mode: "loop", laps: 1.1, count: 2, spacing: 0.22, radius: 5},
      {pathRef: "lt-reuse-observe", tone: "primary", start: 0.66, end: 0.82, count: 2, spacing: 0.16, radius: 5},
      {pathRef: "lt-observe-propose", tone: "primary", start: 0.76, end: 0.88, count: 1, spacing: 0.16, radius: 5},
      {pathRef: "lt-propose-execute", tone: "primary", start: 0.84, end: 0.94, count: 1, spacing: 0.16, radius: 5}
    ]
  },
  journeyRouter: {
    id: "journey-router",
    page: "04-journey-router.html",
    kicker: "Facing users / Journey router",
    title: "Route the journey. Resolve, brief, or hand off with context.",
    copy: "Every case enters one routing core. From there it resolves, branches into a brief, or gets packed for handoff with context.",
    durationMs: 10400,
    durationInFrames: msToFrames(10400),
    captions: ["Route by signal", "Package context", "Send the right output"],
    phases: [
      {id: "intro", label: "Ingest", copy: "A case enters the router shell.", start: 0, end: 0.16},
      {id: "ingest", label: "Branch", copy: "The router opens multiple outcome lanes.", start: 0.16, end: 0.34},
      {id: "process", label: "Pack", copy: "Context and competitor signals are compressed.", start: 0.34, end: 0.7},
      {id: "resolve", label: "Deliver", copy: "Resolve, brief, and handoff outputs take over.", start: 0.7, end: 0.9},
      {id: "reset", label: "Loop", copy: "The next case can enter immediately.", start: 0.9, end: 1}
    ],
    ornaments: [
      {kind: "frame", tone: "neutral", x: 300, y: 450, w: 344, h: 220, label: "Case intake"},
      {kind: "frame", tone: "primary", x: 760, y: 450, w: 354, h: 244, label: "Lucius routing"},
      {kind: "frame", tone: "neutral", x: 1240, y: 250, w: 424, h: 182, label: "Resolve lane"},
      {kind: "frame", tone: "neutral", x: 1240, y: 590, w: 424, h: 320, label: "Context + brief"}
    ],
    nodes: [
      {id: "intake", kind: "signal", shape: "bundle", label: "Case intake", icon: "IN", iconVariant: "default", x: 300, y: 450, width: 290, height: 76, tone: "neutral", activity: [[0.1, 0.24]]},
      {id: "router", kind: "gate", shape: "panel", label: "Lucius routes", icon: "AI", iconVariant: "accent", x: 760, y: 450, width: 340, height: 102, tone: "primary", activity: [[0.24, 0.62]]},
      {id: "resolve", kind: "action", shape: "beam", label: "Resolve directly", icon: "OK", iconVariant: "default", x: 1180, y: 250, width: 280, height: 76, tone: "neutral", activity: [[0.44, 0.72]]},
      {id: "brief", kind: "brief", shape: "box", label: "Competitor brief", icon: "BRF", iconVariant: "default", x: 1360, y: 480, width: 280, height: 76, tone: "neutral", activity: [[0.5, 0.8]]},
      {id: "context", kind: "handoff", shape: "box", label: "Context packed", icon: "CTX", iconVariant: "default", x: 1140, y: 640, width: 280, height: 76, tone: "neutral", activity: [[0.58, 0.86]]},
      {id: "handoff", kind: "handoff", shape: "bundle", label: "Handoff ready", icon: "OUT", iconVariant: "default", x: 1420, y: 640, width: 260, height: 76, tone: "neutral", activity: [[0.72, 0.94]]}
    ],
    edges: [
      {id: "jr-intake-router", style: "beam", tone: "primary", weight: 2.5, d: "M445 450 H590"},
      {id: "jr-router-resolve", style: "beam", tone: "primary", weight: 2.5, d: "M930 450 H1010 V250 H1040"},
      {id: "jr-router-brief", style: "beam", tone: "primary", weight: 2.5, d: "M930 450 H1100 V480 H1220"},
      {id: "jr-router-context", style: "beam", tone: "primary", weight: 2.5, d: "M930 450 H1000 V640"},
      {id: "jr-context-handoff", style: "beam", tone: "primary", weight: 2.5, d: "M1280 640 H1290"}
    ],
    routes: [
      {pathRef: "jr-intake-router", tone: "primary", start: 0.18, end: 0.32, count: 2, spacing: 0.16, radius: 5},
      {pathRef: "jr-router-resolve", tone: "primary", start: 0.34, end: 0.54, count: 2, spacing: 0.16, radius: 5},
      {pathRef: "jr-router-brief", tone: "primary", start: 0.42, end: 0.64, count: 2, spacing: 0.16, radius: 5},
      {pathRef: "jr-router-context", tone: "primary", start: 0.52, end: 0.78, count: 2, spacing: 0.16, radius: 5},
      {pathRef: "jr-context-handoff", tone: "primary", start: 0.72, end: 0.9, count: 2, spacing: 0.16, radius: 5}
    ]
  }
} as const satisfies Record<string, StructureSceneConfig>;
