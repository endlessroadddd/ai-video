# DFvision

> 本仓库以 [FANzR-arch/DFvision](https://github.com/FANzR-arch/DFvision) 的 `9b9b235dea1e63ee988134a50b927e12db804c35` 版本为基础迁入，保留原项目的代码、素材和工作流文档。原作者及来源见链接；本仓库中的修复记录见 [MIGRATION.md](MIGRATION.md)。

用代码做视频。这里是一整套动效视频的**生产方法 + 素材库 + 32 个能直接跑起来的视频工程源码**。

```
video-as-code/   核心：生产框架 + 素材库 + 32 个视频工程
components/      通用组件与资产（Discord 组件、头像、动画表情、原型沙盒）
sop/             中文生产 SOP 与项目模板
```

## 跑起来

环境：Node 22（见 `video-as-code/.nvmrc`）。

**看素材库**（推荐从这里开始）——所有 Discord 场景组件、图表卡片、动效原语都能在里面预览和拼装：

```bash
cd video-as-code && corepack pnpm install && corepack pnpm dev:material-library
```

打开 `http://localhost:3028`。

**跑任意一个视频工程**——每个工程都是自包含的，进目录装依赖就能跑：

```bash
cd video-as-code/projects/short-asset-break-immersion && npm install && npm run dev
```

Remotion 工程会打开 Remotion Studio，Vite 工程会起浏览器预览页，端口写在各自 `package.json` 里。

## 这套东西怎么运转

视频不是一上来就写代码，而是走完这条流水线：

```
冻结输入 → 脚本 → 计划 → 素材 → 逐屏实现 → 审核 → 交付
```

- `video-as-code/rules/` — 设计规则、工作流闸门、QA 规则：定义什么允许、什么禁止
- `video-as-code/skills/` — 生产车道的工作流定义与执行顺序
- `video-as-code/templates/` — 项目、场景、文案、动效模板
- `video-as-code/material-library/` — **素材库**：组件目录 + 可视化拼装工作台
- `video-as-code/output/` — 案例状态、规划产物、审批与交付记录
- `video-as-code/projects/` — **32 个可运行的视频工程源码**

三条车道：**Heavy**（30–90 秒长片，storyboard 优先）、**Short**（6–10 秒短资产，脚本优先、一次一屏，当前默认）、**Legacy short**（旧流程，只用于读历史工程）。

硬规则：脚本/计划/素材没批准之前不写代码；屏与屏按计划顺序推进；每屏只保留一个主动效。

完整说明见 [`video-as-code/README.md`](video-as-code/README.md) / [中文版](video-as-code/README-zh.md)。

## 视频工程

`video-as-code/projects/` 下 32 个工程，带 README 的工程里有各自的说明。

**长视频（Remotion）** `long-video-context-layer`、`long-video-talking-head-remotion`、`long-video-team-context-layer`、`long-video-lucius-overview`（静态页）

**短视频资产（Vite + React，除非标注）** `short-asset-ad-spam-pain` · `short-asset-ai-heavy-catch-you` · `short-asset-ai-no-personality`（静态 HTML）· `short-asset-break-immersion` · `short-asset-community-blind` · `short-asset-context-layer`（Remotion）· `short-asset-custom-persona` · `short-asset-fluent-customer` · `short-asset-golden-case-support` · `short-asset-golden-case-support_dc` · `short-asset-language-richness` · `short-asset-language-richness-wow` · `short-asset-lucius-just-learned`（Remotion）· `short-asset-real-quotes` · `short-asset-retrieval-pain` · `short-asset-thought-you-were-staff` · `short-asset-user-coach-problem` · `short-asset-zero-switch-agent` · `short-assets-auto_learn_knowledge` · `short-assets-discord_dm_refund` · `short-assets-learn_from_conversations` · `short-assets-one_command_do_all`

**工具与实验** `demo-app`（应用外壳与演示环境）· `pipeline-tools`（契约检查、库索引、闸门校验）· `remotion-promo` · `gsap-animations` · `remtion_test` · `case-study-dubbingai-discord`

## components/

| 目录 | 内容 |
| --- | --- |
| `discord-community-dynamic/` | Discord 社区动态组件（CSS + TS，含场景与数据层） |
| `avatars/` | 35 个通用头像资产 |
| `noto-animated-emojis/` | 5 个 Noto 动画表情 |
| `playgrounds/ai-chat-preview/` | AI 对话 UI 原型沙盒 |
| `playgrounds/discord-ui-kit/` | Discord UI 组件沙盒 |

## sop/

中文落地流程文档，配合 `video-as-code/rules/` 和 `skills/` 使用：短视频标准化 SOP、混合生产 SOP、项目初始化模板、客户需求表、内容与设计规范。

---

## 整理说明

这是从内部工作仓库整理出的干净版本，保留源码与素材，剔除不该进 git 的东西。

**已剔除**：渲染成片与录屏（约 3 GB `.mp4` / `.mov`）、`渲染输出/` 与 `剪辑工程/`、`node_modules/`、构建产物（`dist/` `build/` `out/`）、日志、`.bak`、`*.tsbuildinfo`、客户原始素材与交付件。

**背景素材说明**：原仓库未收录 `projects/long-video-context-layer/public/bg.mp4`。这里已将该工程的背景改为代码生成的渐变，因此无需补文件即可预览和渲染；画面与原始 132 MB 背景视频不同。`short-asset-context-layer` 的 8 MB 背景视频仍按原样保留。

**已修复**：`short-asset-golden-case-support` 和 `_dc` 的 `package.json` 原本都叫 `@lucius-vac/demo-app`，与 `demo-app` 撞名会让 pnpm workspace 装不上，已改成各自独立的包名。

仓库内 `.env.demo` / `.env.example` 均为占位值，测试中的 `xoxb-*` 是 fixture，不含真实凭据。
