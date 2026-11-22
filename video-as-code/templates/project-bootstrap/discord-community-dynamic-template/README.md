# Discord Community Dynamic Template (@dfvision)

这个模板从 `short-asset-community-blind` 项目剥离而来，专门用于构建**动态、带有数据爆炸/滚动动效**的 Discord 社区仿真场景。无论是信息流刷屏（Chaos）、定格发光（Warning），还是反应热烈（Interest）都可以直接调用预设的时间轴系统来实现。

## 🌟 特点 (Features)
- **纯粹的外壳**：移除了特定的业务剧情数据（如：报错 403），内置通用占位符文字 `User A`, `# channel-name`。
- **时间轴与动效 100% 保留**：
  - 各个气泡飘入（Fade Window / Bubble Scroll）效果完整存活。
  - Headline 文字层悬浮入场效果、HUD 右下角状态实时切换效果。
  - 头像组 `DiscordAvatar`、`ComposerBar` 各自组件完好无损。
- **可复用**：需要做新的痛点展示视频时，只需要修改 `src/data/communityBlind.ts` 与 `CommunityBlindScene.tsx` 中的 `PHASE_COPY` 属性即可。

## 🛠 如何使用 (Getting Started)

1. **安装依赖**
   ```bash
   npm i
   ```

2. **本地调试预览**
   ```bash
   npm run dev
   ```

3. **数据接入**
   - 进入 `src/data/communityBlind.ts`
   - 修改 `GENERAL_MESSAGES`, `HELP_MESSAGES`, `FEATURE_MESSAGES` 以展示你自己的短视频剧情对话。
   - `CommunityBlindScene.tsx` 中的 `PHASE_COPY` 控制了右侧面板（Info Panel）的总结字段和中心的大字 Headline。

## 📁 结构 (Structure)
- `src/scenes/CommunityBlindScene.tsx`: 核心的 800 行组装画布，控制了动画的计算与渲染。
- `src/data/communityBlind.ts`: **唯一的业务数据集**，存储聊天内容与虚拟用户信息。
- `src/lib/timeline.ts`: 时间轴核心算法，`fadeWindow` 与 `progressBetween`。
- `src/app.css`: 满屏无缝 UI 外壳、各类组件的发光 `box-shadow`。
