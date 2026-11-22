# Discord UI Kit Playground

一个独立的 Discord 风格前端实验场，目标不是做“官方品牌复刻”，而是沉淀一套可复用的聊天 UI 页面壳子，方便后续人工或 AI 直接接入别的 React 项目。

这份 README 同时面向两类读者：

- 人类开发者：快速理解有哪些组件、各自负责什么、怎么接入
- AI 编码助手：快速判断该选哪个页面组件、应该传什么 props、哪些文件可以依赖、哪些文件不能当业务 API

## 项目定位

- `App.tsx` 只是 playground 预览入口，用于本地切换 DM / 社区两种演示页面
- 真正对外复用的页面组件只有两个：
  - `DmScreen`
  - `CommunityScreen`
- 消息区底层使用 `@skyra/discord-components-react`
- 页面壳子、布局、头像系统、消息数据模型、演示文案都由本地代码掌控
- 当前产物偏 UI 展示层，不包含真实搜索、输入发送、频道切换、后端状态管理

## 公开 API 一览

业务项目和 AI 助手都应该只从公开入口导入：

```tsx
import { DmScreen, CommunityScreen } from "discord-ui-kit";
import "discord-ui-kit/styles.css";
```

公开导出定义见 [`src/index.ts`](./src/index.ts)。

### 公开导出的页面组件

| 名称 | 是否公开 | 用途 | AI 是否应直接调用 |
| --- | --- | --- | --- |
| `DmScreen` | 是 | 私聊、客服对话、1 对 1 沟通页 | 是 |
| `CommunityScreen` | 是 | 社区频道、群组空间、频道列表页 | 是 |

### 公开导出的类型

| 类型 | 用途 |
| --- | --- |
| `DmScreenProps` | `DmScreen` 的完整 props |
| `CommunityScreenProps` | `CommunityScreen` 的完整 props |
| `ChatMessage` | 消息区数据模型 |
| `ChatEmbed` | embed 卡片数据 |
| `SidebarItem` | 最左侧服务器栏数据 |
| `DmConversationItem` | DM 左侧会话列表项 |
| `CommunityChannelItem` | 社区左侧频道列表项 |
| `ChatHeaderData` | 顶部聊天栏数据 |
| `InfoPanelData` | 右侧信息栏数据 |
| `InfoPanelMetric` | 右侧信息栏指标数据 |
| `AvatarStatus` | 头像状态枚举 |

## 不应作为业务 API 的内容

下面这些文件可以看、可以参考，但默认不应该被业务代码或 AI 直接依赖：

- `src/App.tsx`
- `src/components/ModeTabs.tsx`
- `src/data/demo-props.ts`
- `src/shared/*`
- `src/components/*`

原因很简单：

- `App.tsx` 和 `ModeTabs` 只服务于 playground 演示
- `demo-props.ts` 是示例数据，不是稳定业务协议
- `shared/*` 和 `components/*` 属于内部实现层，未来可以重构，不承诺 API 稳定性

如果后续确实要把某个内部能力单独复用，建议先把它提升到 `src/index.ts` 公共导出，再让 AI 或其他项目依赖。

## 组件结构图

当前页面组合关系如下：

```text
DmScreen / CommunityScreen
└─ ScreenShell
   └─ WorkspaceFrame
      ├─ ServerRail
      ├─ DmConversationRail / CommunityChannelRail
      ├─ ChatHeader
      ├─ TranscriptPane
      │  └─ DiscordTranscript
      │     ├─ DiscordMessage
      │     ├─ DiscordMention
      │     ├─ DiscordEmbed
      │     └─ DiscordAvatar
      ├─ ComposerBar
      └─ InfoPanel
```

## 页面组件说明

### `DmScreen`

文件位置：[`src/screens/DmScreen.tsx`](./src/screens/DmScreen.tsx)

适用场景：

- 私聊页面
- 客服 / 用户对话页
- bot 与用户的 1 对 1 交互
- 截图展示型“聊天式产品界面”

视觉特征：

- 左侧第二栏是联系人 / 会话列表
- 会话列表项显示头像、状态、未读数
- 顶部标题通常是 `Direct Messages` 或具体联系人名
- 更适合“单线程对话感”

#### `DmScreenProps`

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `title` | 是 | 页面主标题，显示在最外层壳子顶部 |
| `subtitle` | 是 | 页面副标题，解释页面定位 |
| `serverItems` | 是 | 最左侧服务器栏 |
| `header` | 是 | 聊天头部信息 |
| `composerPlaceholder` | 是 | 输入框 placeholder |
| `messages` | 是 | 消息区内容 |
| `railTitle` | 是 | 左侧会话栏标题 |
| `searchPlaceholder` | 是 | 左侧搜索框 placeholder |
| `conversations` | 是 | 左侧会话列表 |
| `shellEyebrow` | 否 | 顶部小眉标题 |
| `topControls` | 否 | 右上角自定义控件。业务接入时通常省略 |
| `railEyebrow` | 否 | 左侧会话栏 eyebrow |
| `infoPanel` | 否 | 右侧信息面板，不传则隐藏 |

### `CommunityScreen`

文件位置：[`src/screens/CommunityScreen.tsx`](./src/screens/CommunityScreen.tsx)

适用场景：

- 社区频道页
- 群组聊天空间
- 产品社区、学习社群、频道型协作空间
- 需要同时展示文本频道和语音频道入口的页面

视觉特征：

- 左侧第二栏是频道 / 房间列表
- 频道项支持文本频道和语音频道
- 更适合“多频道、多主题、多成员”的空间感

#### `CommunityScreenProps`

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `title` | 是 | 页面主标题 |
| `subtitle` | 是 | 页面副标题 |
| `serverItems` | 是 | 最左侧服务器栏 |
| `header` | 是 | 聊天头部信息 |
| `composerPlaceholder` | 是 | 输入框 placeholder |
| `messages` | 是 | 消息区内容 |
| `railTitle` | 是 | 左侧频道栏标题 |
| `searchPlaceholder` | 是 | 左侧搜索框 placeholder |
| `channels` | 是 | 左侧频道列表 |
| `shellEyebrow` | 否 | 顶部小眉标题 |
| `topControls` | 否 | 右上角自定义控件。业务接入时通常省略 |
| `railEyebrow` | 否 | 左侧频道栏 eyebrow |
| `infoPanel` | 否 | 右侧信息面板，不传则隐藏 |

## 内部共享组件说明

下面这些组件是页面拼装时的内部基础设施。默认不对外暴露，但理解它们有助于后续扩展。

| 组件 | 文件 | 责任 |
| --- | --- | --- |
| `ScreenShell` | [`src/shared/ScreenShell.tsx`](./src/shared/ScreenShell.tsx) | 顶层背景、标题区、环境光和外层排版 |
| `WorkspaceFrame` | [`src/shared/WorkspaceFrame.tsx`](./src/shared/WorkspaceFrame.tsx) | 四栏布局总装，决定服务器栏、左侧栏、消息区、右侧栏的拼装方式 |
| `ServerRail` | [`src/shared/ServerRail.tsx`](./src/shared/ServerRail.tsx) | 最左侧服务器图标栏 |
| `DmConversationRail` | [`src/screens/DmConversationRail.tsx`](./src/screens/DmConversationRail.tsx) | DM 会话列表栏 |
| `CommunityChannelRail` | [`src/screens/CommunityChannelRail.tsx`](./src/screens/CommunityChannelRail.tsx) | 社区频道列表栏 |
| `ChatHeader` | [`src/shared/ChatHeader.tsx`](./src/shared/ChatHeader.tsx) | 顶部聊天栏，包括频道名、说明、成员统计、工具图标 |
| `TranscriptPane` | [`src/shared/TranscriptPane.tsx`](./src/shared/TranscriptPane.tsx) | 消息区外壳，负责懒加载和 loading skeleton |
| `DiscordTranscript` | [`src/components/discord-transcript.tsx`](./src/components/discord-transcript.tsx) | 把 `ChatMessage` 适配到 `discord-components` |
| `DiscordAvatar` | [`src/components/DiscordAvatar.tsx`](./src/components/DiscordAvatar.tsx) | 本地头像系统，支持图片与 SVG fallback |
| `ComposerBar` | [`src/shared/ComposerBar.tsx`](./src/shared/ComposerBar.tsx) | 输入框底栏，目前是只读展示态 |
| `InfoPanel` | [`src/shared/InfoPanel.tsx`](./src/shared/InfoPanel.tsx) | 右侧说明栏，用于补充上下文和指标 |

## 数据模型说明

### `SidebarItem`

用于最左侧服务器栏。

| 字段 | 说明 |
| --- | --- |
| `id` | 唯一标识 |
| `label` | 图标里的文字。传 `"+"` 会显示加号图标 |
| `badge` | 右下角角标 |
| `accent` | 颜色风格，支持 `primary` / `mint` / `coral` / `muted` |
| `active` | 当前激活项 |

建议：

- 最好只有一个 `active: true`
- `label` 保持 1 到 2 个字符最稳

### `DmConversationItem`

用于 DM 左侧会话列表。

| 字段 | 说明 |
| --- | --- |
| `id` | 唯一标识 |
| `name` | 联系人名 |
| `subtitle` | 副文案，如“Online now” |
| `status` | 在线状态，支持 `online` / `offline` / `idle` / `dnd` |
| `variant` | 本地头像风格名 |
| `imageUrl` | 头像图片 URL，传了就优先显示图片 |
| `active` | 当前会话是否选中 |
| `unread` | 未读数 |

### `CommunityChannelItem`

用于社区左侧频道列表。

| 字段 | 说明 |
| --- | --- |
| `id` | 唯一标识 |
| `name` | 频道名 |
| `subtitle` | 频道副说明 |
| `type` | `text` 或 `voice` |
| `active` | 当前频道是否选中 |
| `unread` | 未读数 |

### `ChatHeaderData`

用于顶部聊天栏。

| 字段 | 说明 |
| --- | --- |
| `channelLabel` | 左上角主标签 |
| `membersLabel` | 右侧统计文案 |
| `heroNote` | 主标签右侧的一行说明 |

### `ChatMessage`

这是最关键的数据结构，直接驱动消息区。

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `id` | 是 | 消息唯一标识 |
| `author` | 是 | 作者名 |
| `role` | 是 | `user` / `assistant` / `system` |
| `timestamp` | 是 | 时间字符串 |
| `content` | 是 | 消息正文 |
| `avatarUrl` | 否 | 自定义头像 URL |
| `avatarVariant` | 否 | 本地头像变体名 |
| `isBot` | 否 | 是否显示 bot 标记 |
| `mention` | 否 | 要高亮成 mention 的文本 |
| `embed` | 否 | embed 卡片 |
| `highlight` | 否 | 预留字段，当前版本未渲染 |

#### `role` 的真实行为

| `role` | 当前效果 |
| --- | --- |
| `user` | 普通用户消息 |
| `assistant` | 普通消息，可配合 `isBot` 显示 bot 标记 |
| `system` | 渲染为 typing / 状态行，而不是普通消息泡泡 |

#### `mention` 的真实行为

- `mention` 不是自动解析全文中的所有 `@xxx`
- 当前实现是把 `mention` 指定的那段文本渲染成高亮 mention
- 最稳的写法是：让 `content` 中真实包含一段和 `mention` 完全一致的字符串

#### `embed` 的真实行为

`embed` 会渲染为消息附加卡片，支持：

- `title`
- `description`
- `footer`
- `accentColor`
- `fields`

#### `highlight` 的状态

`highlight` 当前只是预留字段，还没有接到视觉层。AI 不要依赖它来实现高亮逻辑。

### `ChatEmbed`

| 字段 | 说明 |
| --- | --- |
| `title` | 卡片标题 |
| `description` | 卡片描述 |
| `footer` | 底部说明 |
| `accentColor` | 左侧强调色 |
| `fields` | 字段列表，支持 `inline` |

### `InfoPanelData`

右侧信息栏的数据。

| 字段 | 说明 |
| --- | --- |
| `eyebrow` | 卡片眉标题 |
| `title` | 主标题 |
| `subtitle` | 说明文案 |
| `pinnedFacts` | 条目列表 |
| `metrics` | 右侧指标列表 |

## 头像系统说明

头像系统支持两种来源：

- 真实图片：传 `imageUrl`
- 本地 fallback：不传图片时，根据 `name` 和 `variant` 生成 SVG 头像

当前内置常见 `variant` 示例：

- `rose`
- `amber`
- `cobalt`
- `violet`
- `mint`
- `slate`
- `sunset`
- `plum`
- `robot`

规则：

- `variant: "robot"` 会强制使用机器人头像
- 如果 `name` 里包含 `bot`，即使不传 `variant` 也会优先走机器人头像
- 如果没有 `imageUrl` 且没有显式 `variant`，会根据名字哈希到一个稳定的人类头像预设

这意味着 AI 生成 demo 或页面内容时，不必强制准备真实头像资源。

## AI 选择规则

这一节是给未来 AI 助手直接读的。

### 什么时候选 `DmScreen`

当需求出现以下信号时，优先选择 `DmScreen`：

- 私聊
- 客服聊天
- 顾问对话
- 1 对 1 support thread
- 与 bot 的单对话界面
- 主体是联系人列表而不是频道列表

### 什么时候选 `CommunityScreen`

当需求出现以下信号时，优先选择 `CommunityScreen`：

- 社区
- 群组
- 频道
- server / guild 风格空间
- 多频道导航
- 文本频道 + 语音频道共存

### 什么时候不要直接调用内部组件

以下情况不要让 AI 直接从 `src/shared/*` 或 `src/components/*` 拼页面：

- 只是想做一套完整聊天页面
- 只是需要 DM 或社区效果
- 只是想快速生成演示图或前端原型

这类情况直接用 `DmScreen` 或 `CommunityScreen` 最稳。

只有在以下情况才考虑扩展内部层：

- 你要把消息区单独抽成一个公共组件
- 你要重写页面布局但保留头像或 transcript adapter
- 你明确接受内部 API 未来会变

## AI 可直接读取的调用规则

下面这段结构化规则可以直接喂给 AI：

```yaml
package: discord-ui-kit
public_imports:
  - DmScreen
  - CommunityScreen
  - ChatMessage
  - ChatEmbed
  - SidebarItem
  - DmScreenProps
  - CommunityScreenProps
required_style_import: discord-ui-kit/styles.css
do_not_import:
  - src/App.tsx
  - src/components/ModeTabs.tsx
  - src/data/demo-props.ts
  - src/shared/*
  - src/components/*
screen_selection:
  dm:
    when:
      - private chat
      - direct messages
      - customer support
      - one to one conversation
  community:
    when:
      - community server
      - channel based workspace
      - multi room chat
      - text and voice channels
message_rules:
  - role=system renders typing/status row, not normal bubble
  - mention only styles the text passed in message.mention
  - highlight is reserved and currently not rendered
  - embed is supported
avatar_rules:
  - imageUrl wins over local avatar preset
  - variant=robot forces bot avatar
  - omit imageUrl when no real asset exists
default_behavior:
  - prefer DmScreen or CommunityScreen over internal composition
  - omit topControls in business pages unless user explicitly asks for top tabs
  - keep exactly one active item in serverItems
  - keep exactly one active conversation or channel when possible
```

## AI 调用流程建议

无论是人还是 AI，推荐按这个顺序生成页面：

1. 判断这是 DM 场景还是社区场景
2. 选择 `DmScreen` 或 `CommunityScreen`
3. 生成最左侧 `serverItems`
4. 生成左侧第二栏数据：
   - DM 用 `conversations`
   - 社区用 `channels`
5. 生成 `header`
6. 生成 `messages`
7. 生成 `composerPlaceholder`
8. 根据是否需要右侧说明区决定要不要传 `infoPanel`
9. 默认不要传 `topControls`
10. 最后统一引入 `discord-ui-kit/styles.css`

## AI 生成 props 时的默认策略

### 推荐最小数据集

为了让页面看起来完整，建议 AI 至少生成：

- `serverItems`：3 到 4 个
- `conversations` 或 `channels`：4 个左右
- `messages`：4 到 6 条
- 至少 1 条 bot 消息或 assistant 消息
- 至少 1 条长文本消息
- 至少 1 个 mention 或 1 个 embed
- 如果要展示“正在输入”，把最后一条消息设为 `role: "system"`

### 推荐默认值

- `topControls`：默认省略
- `infoPanel`：如果用户想要更完整、更适合截图，就加上
- `avatarUrl`：如果没有真实资源，直接省略
- `avatarVariant`：可用 `violet`、`mint`、`sunset`、`rose`、`amber`、`robot`

### 不要这样做

- 不要依赖 `highlight` 做视觉高亮
- 不要把 `App.tsx` 当成业务页面入口
- 不要直接引用 `demo-props.ts` 作为正式数据
- 不要为了一个完整聊天页去手工拼内部共享组件

## AI 可复制的调用模板

### 模板 1：DM 页面

```tsx
import { DmScreen, type DmScreenProps } from "discord-ui-kit";
import "discord-ui-kit/styles.css";

const props: DmScreenProps = {
  title: "Signal Atelier",
  subtitle: "Private support workspace",
  railTitle: "Direct Messages",
  searchPlaceholder: "Find a conversation",
  composerPlaceholder: "Message Sol...",
  serverItems: [
    { id: "home", label: "SA", accent: "primary", active: true },
    { id: "notes", label: "PX", accent: "mint", badge: "2" },
    { id: "plus", label: "+", accent: "muted" },
  ],
  conversations: [
    {
      id: "sol",
      name: "Sol Mercer",
      subtitle: "Online now",
      status: "online",
      variant: "violet",
      active: true,
    },
  ],
  header: {
    channelLabel: "Direct Messages",
    membersLabel: "4 live threads",
    heroNote: "Polished DM experience with mention and embed support.",
  },
  messages: [
    {
      id: "m1",
      author: "Sol Mercer",
      role: "user",
      timestamp: "Today at 9:18 AM",
      content: "I need a convincing private chat layout.",
      avatarVariant: "violet",
    },
    {
      id: "m2",
      author: "Helio Support",
      role: "assistant",
      timestamp: "Today at 9:19 AM",
      content: "We can keep the interaction familiar but make the brand tone our own.",
      avatarVariant: "robot",
      isBot: true,
    },
  ],
};

export function DemoPage() {
  return <DmScreen {...props} />;
}
```

### 模板 2：社区页面

```tsx
import { CommunityScreen, type CommunityScreenProps } from "discord-ui-kit";
import "discord-ui-kit/styles.css";

const props: CommunityScreenProps = {
  title: "Orbit Commons",
  subtitle: "Channel based community workspace",
  railTitle: "# launch-bay",
  searchPlaceholder: "Search channels",
  composerPlaceholder: "Message #launch-bay",
  serverItems: [
    { id: "home", label: "OC", accent: "primary", active: true },
    { id: "atlas", label: "AT", accent: "mint", badge: "5" },
    { id: "plus", label: "+", accent: "muted" },
  ],
  channels: [
    {
      id: "launch-bay",
      name: "# launch-bay",
      subtitle: "Feature drops and reactions",
      type: "text",
      active: true,
    },
    {
      id: "voice-lab",
      name: "Voice Lab",
      subtitle: "4 listening now",
      type: "voice",
    },
  ],
  header: {
    channelLabel: "# launch-bay",
    membersLabel: "148 online",
    heroNote: "Community mode adds channel rhythm and richer context.",
  },
  messages: [
    {
      id: "m1",
      author: "Mara Voss",
      role: "user",
      timestamp: "Today at 6:02 PM",
      content: "The preview branch is live and feedback is already coming in.",
      avatarVariant: "rose",
    },
    {
      id: "m2",
      author: "Auren Bot",
      role: "assistant",
      timestamp: "Today at 6:03 PM",
      content: "Pinned a summary below so the room stays aligned.",
      avatarVariant: "robot",
      isBot: true,
      embed: {
        title: "Launch Snapshot",
        description: "Strongest reactions point to clearer onboarding and faster first action.",
      },
    },
  ],
};

export function CommunityPage() {
  return <CommunityScreen {...props} />;
}
```

## 推荐给 AI 的提示词片段

如果你后续让别的 AI 来复用这个组件库，可以直接把下面这段提示丢给它：

```text
在当前 React 项目中实现 Discord 风格聊天页面时，优先使用 discord-ui-kit 的公开导出组件。
如果是私聊、客服、1 对 1 对话，使用 DmScreen。
如果是社区、频道、群组空间，使用 CommunityScreen。
必须导入 discord-ui-kit/styles.css。
不要依赖 App.tsx、ModeTabs、demo-props.ts、src/shared/*、src/components/* 作为业务 API。
messages 使用 ChatMessage 协议；role=system 表示 typing/status 行，不是普通消息气泡。
highlight 字段当前未渲染，不要依赖它。
如果没有真实头像资源，直接省略 avatarUrl，使用本地 fallback avatar。
```

## 本地预览

```bash
npm install
npm run dev
```

默认地址：

```text
http://localhost:3031
```

## 构建

应用构建：

```bash
npm run build
```

库构建：

```bash
npm run build:lib
```

产物输出到 `dist-lib/`，其中最重要的是：

- `dist-lib/index.js`
- `dist-lib/styles.css`

## 当前限制

- 搜索框、按钮、输入框目前是展示态，不带真实交互
- 频道切换、会话切换、发送消息没有内建状态管理
- `highlight` 还是预留字段
- 当前公开 API 是页面级别，不是细粒度控件库
- 如果你需要“单独复用消息区”或“单独复用头像系统”，建议下一步把这些内部模块提升为正式导出

## 建议的后续演进

如果未来你要让 AI 更细粒度自动拼装，可以考虑追加这些公开导出：

- `TranscriptPane`
- `DiscordAvatar`
- `ServerRail`
- `InfoPanel`
- `DmConversationRail`
- `CommunityChannelRail`

但在当前版本里，默认仍然建议只复用：

- `DmScreen`
- `CommunityScreen`
