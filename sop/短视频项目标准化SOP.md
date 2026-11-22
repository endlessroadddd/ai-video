# 视频技术参考附录

> 本文档为技术速查附录，主流程见 [.claude/commands/video-sop.md](d:/00_Formula/04_DFvision/.claude/commands/video-sop.md)。

---

## 工程组织（React/Vite 项目）

```text
03_工程文件/<project-slug>/
├── package.json
├── index.html
├── src/
│   ├── main.tsx
│   ├── TimelinePreview.tsx
│   ├── <SceneName>.tsx
│   ├── <project-data>.ts
│   ├── app.css
│   └── assets/
```

## 场景入口 URL 格式

```text
?scene=b1
?scene=b2
?view=timeline
```

每个 beat 能独立预览，timeline 能连续播放。

## HTML 硬规则 CSS 骨架

```css
html, body, #root {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
```

## AI Slop 避免清单

- 激进渐变背景
- 非品牌自带的 emoji
- 圆角卡片 + 左侧彩色边条
- 用 SVG 硬画人物或场景插画（要么用品牌库素材，要么真实占位）
- 过度使用 Inter / Roboto / Arial（除非品牌库指定）
- 数据堆砌：图标 / 数字 / 标签填满画面，每个元素必须承担一个信息

## 验收速查

浏览器检查：

- [ ] 每个 beat 可独立预览
- [ ] 全屏无白边、无滚动条、无舞台框
- [ ] 主画布随浏览器窗口自适应（未锁定固定比例）
- [ ] 无资源缺失
- [ ] 文字不溢出、不遮挡、不来不及阅读
- [ ] 首尾呼应和关键转场可一眼看懂
