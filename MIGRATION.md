# 迁入与检查记录

## 来源与范围

- 来源：[FANzR-arch/DFvision](https://github.com/FANzR-arch/DFvision)，`main` 分支提交 `9b9b235dea1e63ee988134a50b927e12db804c35`。
- 完整迁入该提交中受 Git 管理的代码、素材、文档和 7 份 `SKILL.md`。这是新建仓库，不是 GitHub Fork；原始提交历史未迁入。
- 原项目作者、品牌名称和项目内说明保持原样。迁入后的修复列在下方。

## 已修复

1. 更新 `video-as-code/pnpm-lock.yaml`，使其与工作区依赖声明一致，支持 `pnpm install --frozen-lockfile`。
2. 素材目录没有模板时，流程工具将其视为空目录；原代码会在读取不存在的 `catalog/templates` 时失败。
3. `long-video-context-layer` 改用代码生成的背景，移除对未收录的 132 MB `bg.mp4` 的引用。此工程可运行，但背景与原始素材不同。
4. 将 `long-video-team-context-layer` 的 Remotion 依赖统一到 `4.0.454`，消除工作区中两个 Remotion 版本混用的运行警告。
5. 将 6 个 Remotion 工程使用的 TypeScript 固定到与其 ESLint 插件兼容的 `5.7.3`，并同步各自的锁文件。

## 本地验证

在 Node.js 22 下，从 `video-as-code/` 目录运行：

```bash
npx --yes pnpm@10.26.0 install --frozen-lockfile
npx --yes pnpm@10.26.0 --filter @lucius-vac/material-library test
npx --yes pnpm@10.26.0 --filter @lucius-vac/pipeline-tools test
npx --yes pnpm@10.26.0 --filter @lucius-vac/material-library build
npx --yes pnpm@10.26.0 --filter long-video-context-layer exec remotion still ContextLayer /tmp/context-layer.png --frame 60
```

`npx pnpm@10.26.0` 也可在本机 Corepack 签名校验失败时使用。每个独立视频工程的运行方式仍以各自的 `package.json` 和说明为准。

## 尚需留意

- 原仓库没有公开许可证。本次迁入依据仓库所有者向执行者确认的授权；本记录不替代授权文件。
- 项目含多个历史视频工程和品牌素材。上述验证覆盖工作区安装、素材库及流程工具，不代表 32 个视频工程均已逐一渲染。
- 素材库构建会提示单个 JavaScript 文件较大；构建成功，后续可按页面拆分代码以改善首次加载速度。
- 原项目部分依赖已标记为弃用，安装时会提示；目前上述测试与构建通过。
