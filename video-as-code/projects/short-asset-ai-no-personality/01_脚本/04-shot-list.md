# Shot List｜短视频 01：AI 没有人格

> 规格：1920×1080 / 横屏 / 45s  
> 创作日期：2026-04-07

---

| # | 名称 | 时长 | 类型 | 技术路线 | 主要组件 | 待补充素材 | 状态 |
|---|------|------|------|----------|---------|-----------|------|
| 01 | 字幕开场 | 0–4s (4s) | C | HTML + CSS | 无 | 无 | ❌ |
| 02 | 社区全景 | 4–14s (10s) | C | HTML + CSS + JS | ChatShellFrame, DiscordAvatar | 服务器图标 | ❌ |
| 03 | AI 破戒 | 14–26s (12s) | C | HTML + CSS + JS | ChatMessageList, DiscordAvatar（robot） | 无 | ❌ |
| 04 | 用户反应 | 26–32s (6s) | C | HTML + CSS + JS | ChatMessageList | 无 | ❌ |
| 05 | 流失可视化 | 32–42s (10s) | C | HTML + CSS + JS | DiscordAvatar, 自定义退出列表 | **待定 A/B** | ❌ |
| 06 | 收尾字卡 | 42–45s (3s) | C | HTML + CSS | 无 | 无 | ❌ |

---

## 各镜头技术说明

### Scene 01｜字幕开场

- 输出：`scene-01-static.html` → `scene-01-motion.html`
- 技术：纯 CSS opacity 动画
- 字体：Recoleta（或 Georgia fallback）

### Scene 02｜社区全景

- 输出：`scene-02-static.html` → `scene-02-motion.html`
- 技术：HTML 还原 Discord 暗色 UI，JS 控制消息逐条出现时序
- 组件：`ChatShellFrame`（暗色主题变体）+ `DiscordAvatar`
- 颜色参考：Discord `#313338`（背景）/ `#2b2d31`（sidebar）/ `#1e1f22`（服务器栏）
- **注意**：此镜头需要服务器 icon，占位先用 placeholder 圆形

### Scene 03｜AI 破戒

- 输出：`scene-03-static.html` → `scene-03-motion.html`
- 技术：同 Scene 02，在 AI 回复气泡上叠加高亮框（CSS outline 或 box-shadow）
- 关键点：AI 头像用 `robotPreset`，名字显示为"会长"

### Scene 04｜用户反应

- 输出：`scene-04-static.html` → `scene-04-motion.html`
- 技术：消息快速连发，最后一条后光标持续闪动
- 关键点：停顿感比 Scene 02/03 更明显

### Scene 05｜流失可视化

**⚠️ 待确认方案 A 或 B（或 A→B 连续）**

**方案 A：退出通知流**
- 聊天区 opacity 降至 0.3，右侧成员列表成为焦点
- `会员已离开` 系统消息从底部滚动涌上
- 右上角在线计数器从 248 → 71（JS 计时器驱动）

**方案 B：折线图**
- 独立镜头，切换为数据卡片布局
- 折线图代码绘制（Canvas 或 SVG），曲线急速下滑
- 标注：`AI 接入后第 3 周，活跃用户 -71%`

### Scene 06｜收尾字卡

- 输出：`scene-06-static.html` → `scene-06-motion.html`
- 技术：纯 CSS，opacity 淡入
- 底色：`#1e1f22`（Discord 深色，保持视觉连贯）

---

## 待确认事项

| 问题 | 选项 | 优先级 |
|------|------|--------|
| Scene 05 流失方案 | A（退出通知流）/ B（折线图）/ 两者都做 | 高 |
| 服务器 icon | 自行生成 / 提供图片 | 中 |
| 会长角色头像 | 用 DiscordAvatar 组件（向量） / 提供立绘 | 中 |
| 结尾文案微调 | 当前草案 or 修改 | 低 |

---

## 命名规范

```
scene-01-static.html      ← 静态关键帧
scene-01-motion.html      ← 带动效版本
scene-01-motion.mp4       ← 导出素材（手动录屏或 puppeteer）
```
