import assert from "node:assert/strict";
import { test } from "node:test";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { getAvatarSpec } from "../src/chat/avatar-presets";
import {
  filterMaterialLibraryEntries,
  type MaterialLibrarySearchableEntry,
} from "../src/catalog-search";
import { DiscordNoiseCardStage } from "../src/surfaces/discord-noise-card-stage";
import { DiscordQuestionStackStage } from "../src/surfaces/discord-question-stack-stage";
import { DiscordTranscriptStage } from "../src/surfaces/discord-transcript-stage";
import { clamp01, easeInOutCubic, easeOutQuint } from "../src/motion/easing";
import { fadeWindow, progressBetween } from "../src/motion/timing";
import { createTimeline } from "../src/motion/timeline";
import {
  buildCopiedCanvasScenePayload,
  buildCanvasAssetVirtualPath,
  createCanvasAssetRecord,
  createDefaultCanvasScene,
  createMaterialCanvasItem,
  createTheaterCanvasItem,
  createUploadCanvasItem,
} from "../src/showcase-canvas-state";
import type { ShowcaseBrowseEntry } from "../src/showcase-copy";

test("timeline supports seek and pause", () => {
  const originalRaf = globalThis.requestAnimationFrame;
  const originalCancel = globalThis.cancelAnimationFrame;

  globalThis.requestAnimationFrame = () => 1;
  globalThis.cancelAnimationFrame = () => {};

  let ticked = 0;
  const timeline = createTimeline({
    durationMs: 1000,
    loop: false,
    speed: 1,
    onTick: (t) => {
      ticked = t;
    },
  });

  timeline.seek(420);
  assert.equal(ticked, 420);
  timeline.pause();
  timeline.destroy();

  globalThis.requestAnimationFrame = originalRaf;
  globalThis.cancelAnimationFrame = originalCancel;
});

test("timeline renders loop end frame once before resetting", () => {
  const originalRaf = globalThis.requestAnimationFrame;
  const originalCancel = globalThis.cancelAnimationFrame;
  const originalPerformance = globalThis.performance;

  let now = 0;
  const frames: FrameRequestCallback[] = [];
  globalThis.performance = { now: () => now } as Performance;
  globalThis.requestAnimationFrame = (callback: FrameRequestCallback) => {
    frames.push(callback);
    return frames.length;
  };
  globalThis.cancelAnimationFrame = () => {};

  const ticks: number[] = [];
  const timeline = createTimeline({
    durationMs: 1000,
    loop: true,
    speed: 20,
    onTick: (t) => {
      ticks.push(t);
    },
  });

  now = 200;
  frames.shift()?.(now);
  now = 216;
  frames.shift()?.(now);

  assert.deepEqual(ticks.slice(0, 2), [1000, 0]);
  timeline.destroy();

  globalThis.requestAnimationFrame = originalRaf;
  globalThis.cancelAnimationFrame = originalCancel;
  globalThis.performance = originalPerformance;
});

test("timeline caps large frame steps", () => {
  const originalRaf = globalThis.requestAnimationFrame;
  const originalCancel = globalThis.cancelAnimationFrame;
  const originalPerformance = globalThis.performance;

  let now = 0;
  const frames: FrameRequestCallback[] = [];
  globalThis.performance = { now: () => now } as Performance;
  globalThis.requestAnimationFrame = (callback: FrameRequestCallback) => {
    frames.push(callback);
    return frames.length;
  };
  globalThis.cancelAnimationFrame = () => {};

  let ticked = 0;
  const timeline = createTimeline({
    durationMs: 1000,
    loop: false,
    speed: 1,
    onTick: (t) => {
      ticked = t;
    },
  });

  now = 600;
  frames.shift()?.(now);

  assert.equal(ticked, 100);
  timeline.destroy();

  globalThis.requestAnimationFrame = originalRaf;
  globalThis.cancelAnimationFrame = originalCancel;
  globalThis.performance = originalPerformance;
});

test("avatar presets map lucius to robot", () => {
  const spec = getAvatarSpec("lucius");
  assert.equal(spec.kind, "robot");
});

test("avatar presets can force a palette variant", () => {
  const spec = getAvatarSpec("anyone", "mint");
  assert.equal(spec.kind, "human");
  assert.equal(spec.variant, "beanie");
});

test("easing helpers clamp", () => {
  assert.equal(clamp01(-0.4), 0);
  assert.equal(clamp01(1.6), 1);
  const eased = easeInOutCubic(0.5);
  assert.ok(eased > 0.4 && eased < 0.6);
  assert.equal(easeOutQuint(1.5), 1);
  assert.equal(progressBetween(150, 100, 200), 0.5);
  assert.equal(fadeWindow(150, 100, 100, 400, 100), 0.5);
});

test("DiscordQuestionStackStage reveals questions in order", () => {
  const markup = renderToStaticMarkup(
    createElement(DiscordQuestionStackStage, {
      currentMs: 1900,
      initialDelayMs: 100,
      questions: ["First?", "Second?", "Third?"],
      revealDurationMs: 100,
      staggerMs: 500,
      startMs: 0,
    }),
  );

  assert.match(markup, /First\?/);
  assert.match(markup, /Second\?/);
  assert.match(markup, /Third\?/);
});

test("DiscordNoiseCardStage increments visible cards by timing", () => {
  const markup = renderToStaticMarkup(
    createElement(DiscordNoiseCardStage, {
      cards: [
        { channel: "general", id: "a", text: "A" },
        { channel: "help", id: "b", text: "B" },
        { channel: "feature", id: "c", text: "C" },
      ],
      currentMs: 1250,
      startMs: 0,
      visibleTiming: {
        cardStartOffsetMs: 100,
        cardStaggerMs: 500,
        fadeInMs: 1,
      },
    }),
  );

  const visibleCards = markup.match(/discord-noise-card--visible/g) ?? [];
  assert.equal(visibleCards.length, 3);
});

test("DiscordTranscriptStage reveals messages by revealTimes", () => {
  const markup = renderToStaticMarkup(
    createElement(DiscordTranscriptStage, {
      currentMs: 550,
      messages: [
        { author: "Ari", body: "First", meta: "10:00" },
        { author: "Bea", body: "Second", meta: "10:01" },
        { author: "Cam", body: "Third", meta: "10:02" },
      ],
      revealTimes: [0, 500, 1000],
    }),
  );

  assert.match(markup, /First/);
  assert.match(markup, /Second/);
  assert.doesNotMatch(markup, /Third/);
});

function createFixture(
  overrides: Partial<MaterialLibrarySearchableEntry> & Pick<MaterialLibrarySearchableEntry, "id" | "title">,
): MaterialLibrarySearchableEntry {
  return {
    adaptationNotes: ["Adjust labels first."],
    adaptQuickZh: ["先改标题和负责人。"],
    agentGoal: "Use for visible support handoff proof.",
    avoidZh: ["不适合很轻的状态提示。"],
    bestForZh: ["需要明确展示人工接手。"],
    body: "Use this when a chat scene needs a visible human handoff.",
    category: "chat",
    compositionPatterns: ["Pair with proof chip."],
    curatedOrder: 99,
    cueText: ["需要明确展示人工接手。"],
    hasPreview: true,
    hostSurfaces: ["chat thread"],
    informationDensity: "medium",
    inputProps: ["card", "status"],
    keepFixed: ["proof hierarchy"],
    keywords: ["handoff", "support"],
    matchKeywords: ["human handoff", "人工交接"],
    mutationCost: "medium",
    narrativeRole: "proof",
    negativeTriggersEn: ["tiny status update"],
    negativeTriggersZh: ["只是很小的状态更新"],
    reuseMode: "tweak-copy",
    safeToChange: ["title", "owner"],
    scriptRecipe: ["Use on the evidence beat."],
    scriptTriggersEn: ["human handoff"],
    scriptTriggersZh: ["人工交接"],
    selectionSignals: ["Choose when the proof must be explicit."],
    sourceProjects: ["projects/demo-app"],
    stability: "stable",
    summary: "Structured support handoff card.",
    summaryZh: "把交接过程结构化讲清楚的证据卡。",
    titleZh: "客服交接证据卡",
    toneTags: ["support", "proof-heavy"],
    visualSignature: ["Structured card with rail."],
    visualWeight: "medium",
    ...overrides,
  };
}

function createShowcaseBrowseFixture(): ShowcaseBrowseEntry {
  return {
    adaptationNotes: ["Adjust emoji first."],
    adaptQuickUi: ["先改 emoji。"],
    agentGoal: "Use for small chat accents.",
    anchorId: "animated-emoji",
    avoidUi: ["不要把它当成主场景。"],
    avoidWhen: ["Avoid when the full scene should own the frame."],
    bestForUi: ["适合聊天场景里的小情绪点。"],
    body: "Use this when a chat scene needs a small emotional accent.",
    category: "chat",
    compositionPatterns: ["Attach to the local message."],
    cueText: ["适合聊天场景里的小情绪点。"],
    curatedOrder: 1,
    dominance: "supporting",
    donts: ["Do not turn it into the primary proof block."],
    dos: ["Keep it compact and local to the beat."],
    editableParts: ["emoji"],
    hasPreview: false,
    hostSurfaces: ["chat bubble"],
    humanCopy: {
      adaptQuickZh: ["先改 emoji。"],
      avoidZh: ["不要把它当成主场景。"],
      bestForZh: ["适合聊天场景里的小情绪点。"],
      summaryZh: "可直接复用的小型聊天 emoji 强调。",
      titleZh: "Animated Emoji",
    },
    id: "material-library/chat/animated-emoji",
    implementationRef: "material-library/src/chat/animated-emoji.tsx",
    informationDensity: "low",
    inputProps: ["codepoint"],
    keepFixed: ["compact footprint"],
    keywords: ["emoji", "accent"],
    matchKeywords: ["emoji reaction"],
    mutationCost: "low",
    narrativeRole: "accent",
    negativeTriggersEn: ["full screen hero"],
    negativeTriggersZh: ["整屏主视觉"],
    pairWithIds: [],
    preferInsteadIds: [],
    preview: null,
    previewRef: "material-library/chat/animated-emoji#preview",
    previewStateLabelZh: "可预览",
    reuseLabelZh: "可直接复用",
    reuseMode: "drop-in",
    roleLabelZh: "强调",
    safeToChange: ["emoji"],
    sceneTypes: ["chat"],
    scriptRecipe: ["Land on the emotional beat."],
    scriptTriggersEn: ["small chat celebration"],
    scriptTriggersZh: ["聊天气氛强调"],
    selectionSignals: ["Choose when the beat needs punctuation."],
    sourceCode: null,
    sourceProjects: ["projects/short-asset-thought-you-were-staff"],
    stability: "stable",
    stabilityLabelZh: "稳定",
    styleFamilies: ["chat-native"],
    summary: "Drop-in animated emoji.",
    summaryForUi: "可直接复用的小型聊天 emoji 强调。",
    title: "Animated Emoji",
    titleForUi: "Animated Emoji",
    toneTags: ["playful"],
    visualSignature: ["Tiny animated emoji glyph."],
    visualWeight: "micro",
    weightLabelZh: "极轻",
    whenToUse: ["Use when the chat beat needs a small emotional accent."],
  } as ShowcaseBrowseEntry;
}

test("material library search matches bilingual triggers and host surfaces", () => {
  const fixtures: MaterialLibrarySearchableEntry[] = [
    createFixture({
      curatedOrder: 2,
      id: "material-library/chat/support-handoff-card",
      title: "Support Handoff Card",
    }),
    createFixture({
      adaptationNotes: ["Change messages and scene state first."],
      adaptQuickZh: ["先改消息数据和频道状态。"],
      agentGoal: "Use for full Discord environment scenes.",
      avoidZh: ["不适合只放单条消息。"],
      bestForZh: ["需要完整 Discord 社区环境。"],
      body: "Use this when the scene needs a full Discord environment.",
      category: "surfaces",
      compositionPatterns: ["Keep one focal point inside the environment."],
      curatedOrder: 10,
      cueText: ["需要完整 Discord 社区环境。"],
      hasPreview: false,
      hostSurfaces: ["discord environment", "community stage"],
      id: "material-library/surfaces/discord-community-scene",
      informationDensity: "high",
      inputProps: ["chrome", "currentScene"],
      keepFixed: ["rail hierarchy"],
      keywords: ["discord", "community"],
      matchKeywords: ["discord environment", "完整 Discord 社区场景"],
      mutationCost: "high",
      narrativeRole: "environment",
      negativeTriggersEn: ["single dm exchange"],
      negativeTriggersZh: ["单个私信往返"],
      reuseMode: "heavy-adaptation",
      safeToChange: ["scene state", "message data"],
      scriptRecipe: ["Establish the world in one read."],
      scriptTriggersEn: ["full discord community scene"],
      scriptTriggersZh: ["完整 Discord 社区场景"],
      selectionSignals: ["Choose when the environment must own the frame."],
      sourceProjects: ["projects/short-asset-break-immersion"],
      stability: "beta",
      summary: "Full Discord community stage.",
      summaryZh: "完整的 Discord 社区多栏场景。",
      title: "Discord Community Scene",
      titleZh: "Discord 社区场景",
      toneTags: ["discord-native", "immersive"],
      visualSignature: ["Full multi-column Discord stage."],
      visualWeight: "full-scene",
    }),
  ];

  const zhResults = filterMaterialLibraryEntries(fixtures, {
    previewability: "all",
    query: "人工交接",
    reuseMode: "all",
    role: "all",
    visualWeight: "all",
  });

  assert.ok(
    zhResults.some((entry) => entry.id === "material-library/chat/support-handoff-card"),
  );

  const surfaceResults = filterMaterialLibraryEntries(fixtures, {
    previewability: "all",
    query: "discord environment",
    reuseMode: "all",
    role: "all",
    visualWeight: "all",
  });

  assert.ok(
    surfaceResults.some((entry) => entry.id === "material-library/surfaces/discord-community-scene"),
  );
});

test("material library search can filter by narrative role", () => {
  const fixtures: MaterialLibrarySearchableEntry[] = [
    createFixture({
      curatedOrder: 1,
      id: "material-library/chat/support-handoff-card",
      title: "Support Handoff Card",
    }),
    createFixture({
      adaptQuickZh: ["先改 emoji 和尺寸。"],
      agentGoal: "Use for small emoji accents.",
      avoidZh: ["不适合整页主视觉。"],
      bestForZh: ["消息已经讲清楚了，只差一个情绪点。"],
      body: "Use this when a chat scene needs a small emotional accent.",
      category: "chat",
      compositionPatterns: ["Attach to the local message."],
      curatedOrder: 3,
      cueText: ["消息已经讲清楚了，只差一个情绪点。"],
      hostSurfaces: ["chat bubble"],
      id: "material-library/chat/animated-emoji",
      informationDensity: "low",
      inputProps: ["codepoint"],
      keepFixed: ["compact footprint"],
      keywords: ["emoji", "accent"],
      matchKeywords: ["emoji reaction", "轻量情绪点"],
      mutationCost: "low",
      narrativeRole: "accent",
      negativeTriggersEn: ["full-screen hero scene"],
      negativeTriggersZh: ["整页主视觉"],
      reuseMode: "drop-in",
      safeToChange: ["codepoint"],
      scriptRecipe: ["Land on the emotion beat."],
      scriptTriggersEn: ["small chat celebration"],
      scriptTriggersZh: ["小型聊天庆祝反馈"],
      selectionSignals: ["Choose when the beat needs punctuation."],
      sourceProjects: ["projects/short-asset-thought-you-were-staff"],
      stability: "stable",
      summary: "Drop-in animated emoji.",
      summaryZh: "给聊天内容补一个轻量情绪点。",
      title: "Animated Emoji",
      titleZh: "动态 Emoji",
      toneTags: ["playful", "chat-native"],
      visualSignature: ["Tiny animated emoji glyph."],
      visualWeight: "micro",
    }),
  ];

  const proofResults = filterMaterialLibraryEntries(fixtures, {
    previewability: "all",
    query: "support",
    reuseMode: "all",
    role: "proof",
    visualWeight: "all",
  });

  assert.ok(proofResults.every((entry) => entry.narrativeRole === "proof"));
  assert.ok(
    proofResults.some((entry) => entry.id === "material-library/chat/support-handoff-card"),
  );
});

test("material library search supports preview and visual filters", () => {
  const fixtures: MaterialLibrarySearchableEntry[] = [
    createFixture({
      curatedOrder: 5,
      id: "material-library/chat/support-handoff-card",
      title: "Support Handoff Card",
      visualWeight: "medium",
    }),
    createFixture({
      curatedOrder: 6,
      hasPreview: false,
      id: "material-library/data-display/trend-chart",
      title: "Trend Chart",
      visualWeight: "medium",
      summaryZh: "轻量趋势图。",
    }),
  ];

  const previewableResults = filterMaterialLibraryEntries(fixtures, {
    previewability: "previewable",
    query: "",
    reuseMode: "all",
    role: "all",
    visualWeight: "all",
  });
  assert.deepEqual(previewableResults.map((entry) => entry.id), [
    "material-library/chat/support-handoff-card",
  ]);

  const weightResults = filterMaterialLibraryEntries(fixtures, {
    previewability: "all",
    query: "",
    reuseMode: "all",
    role: "all",
    visualWeight: "medium",
  });
  assert.equal(weightResults.length, 2);
});

test("material library search sorts previewable stable easier-to-reuse items first", () => {
  const fixtures: MaterialLibrarySearchableEntry[] = [
    createFixture({
      adaptationNotes: ["Adjust data first."],
      adaptQuickZh: ["先改数据。"],
      agentGoal: "Use for charts.",
      bestForZh: ["需要轻量趋势图。"],
      curatedOrder: 5,
      hasPreview: false,
      id: "material-library/data-display/trend-chart",
      title: "Trend Chart",
      summary: "Trend chart.",
      summaryZh: "轻量趋势图。",
      titleZh: "趋势图",
      reuseMode: "tweak-copy",
      toneTags: ["proof"],
      visualWeight: "medium",
    }),
    createFixture({
      adaptQuickZh: ["先改 emoji。"],
      agentGoal: "Use for small emotional accents.",
      avoidZh: ["不适合整页主视觉。"],
      bestForZh: ["消息里要有轻情绪点。"],
      category: "chat",
      compositionPatterns: ["Attach to the local message."],
      curatedOrder: 8,
      cueText: ["消息里要有轻情绪点。"],
      id: "material-library/chat/animated-emoji",
      title: "Animated Emoji",
      summary: "Animated emoji.",
      summaryZh: "轻量动态 emoji。",
      titleZh: "动态 Emoji",
      mutationCost: "low",
      narrativeRole: "accent",
      reuseMode: "drop-in",
      scriptTriggersZh: ["emoji 强调"],
      toneTags: ["playful"],
      visualWeight: "micro",
    }),
    createFixture({
      adaptationNotes: ["Adjust channel and messages first."],
      adaptQuickZh: ["先改频道和消息数据。"],
      agentGoal: "Use for full Discord environment.",
      avoidZh: ["不适合轻量镜头。"],
      bestForZh: ["需要完整 Discord 场景。"],
      body: "Use for full Discord environment.",
      category: "surfaces",
      compositionPatterns: ["Keep one focal point."],
      curatedOrder: 1,
      cueText: ["需要完整 Discord 场景。"],
      id: "material-library/surfaces/discord-community-scene",
      title: "Discord Community Scene",
      summary: "Discord scene.",
      summaryZh: "完整 Discord 场景。",
      titleZh: "Discord 社区场景",
      hostSurfaces: ["discord environment"],
      informationDensity: "high",
      inputProps: ["scene state"],
      keepFixed: ["multi-column structure"],
      keywords: ["discord"],
      matchKeywords: ["discord environment"],
      mutationCost: "high",
      narrativeRole: "environment",
      negativeTriggersEn: [],
      negativeTriggersZh: [],
      reuseMode: "heavy-adaptation",
      safeToChange: ["messages"],
      scriptRecipe: ["Establish the environment."],
      scriptTriggersEn: ["discord environment"],
      scriptTriggersZh: ["Discord 场景"],
      selectionSignals: ["Choose when the environment owns the frame."],
      sourceProjects: ["projects/short-asset-break-immersion"],
      stability: "beta",
      toneTags: ["immersive"],
      visualSignature: ["Full multi-column Discord stage."],
      visualWeight: "full-scene",
    }),
  ];

  const results = filterMaterialLibraryEntries(fixtures, {
    previewability: "all",
    query: "",
    reuseMode: "all",
    role: "all",
    visualWeight: "all",
  });

  assert.deepEqual(results.map((entry) => entry.id), [
    "material-library/chat/animated-emoji",
    "material-library/surfaces/discord-community-scene",
    "material-library/data-display/trend-chart",
  ]);
});

test("canvas virtual paths preserve extension when available", () => {
  assert.equal(
    buildCanvasAssetVirtualPath("asset-3", "moodboard-shot.png", "image"),
    "canvas-local://default/asset-3.png",
  );
  assert.equal(
    buildCanvasAssetVirtualPath("asset-7", "teaser", "video"),
    "canvas-local://default/asset-7.mp4",
  );
});

test("canvas payload keeps canonical material paths and virtual upload paths", () => {
  const animatedEmoji = createShowcaseBrowseFixture();
  const scene = createDefaultCanvasScene();
  const theaterItem = createTheaterCanvasItem({ x: 0, y: 0 }, "Scene 1");
  theaterItem.zIndex = 1;
  const materialItem = createMaterialCanvasItem(animatedEmoji, { x: 0, y: 0 });
  materialItem.zIndex = 1;

  const assetRecord = createCanvasAssetRecord({
    assetId: "asset-local-1",
    fileName: "reference-frame.jpg",
    height: 720,
    mimeType: "image/jpeg",
    type: "image",
    width: 1280,
  });

  const uploadItem = createUploadCanvasItem(assetRecord, { x: 320, y: 120 });
  uploadItem.zIndex = 2;
  theaterItem.scene.items = [materialItem, uploadItem];

  const payload = buildCopiedCanvasScenePayload(
    {
      ...scene,
      assetRecords: [assetRecord],
      items: [theaterItem],
    },
    new Map([[animatedEmoji.id, animatedEmoji]]),
  );

  assert.equal(payload.version, "canvas-scene.v3");
  assert.equal(payload.materials[0]?.materialPath, animatedEmoji.id);
  assert.equal(payload.uploads[0]?.virtualPath, "canvas-local://default/asset-local-1.jpg");
  assert.equal(payload.theaters.length, 1);
  assert.equal(payload.theaters[0]?.scene.items.length, 2);
  assert.ok(payload.sceneIntent.includes("Board contains 1 theaters"));
  assert.ok(payload.sceneIntent.includes("Scene 1"));
});
