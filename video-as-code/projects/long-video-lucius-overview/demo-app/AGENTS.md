# lucius-client-app 项目上下文

## 1. 当前目标
- 该项目为重开新项目，不延续旧主管端历史包袱。
- 技术方向：`TanStack Start + Supabase Auth + Supabase Client`。
- 逐步减少旧 `client-dashboard/backend` 依赖，前端优先直连 Supabase（受 RLS 约束）。

## 2. 技术栈决策
- 认证：保留 `Supabase Auth`，不使用 `better-auth`。
- 数据请求：优先使用 `TanStack Query`。
- 数据访问：不使用 Prisma，统一使用 `@supabase/supabase-js`。
- 外部平台密钥与回调：放服务端或 Supabase Edge Functions。

## 3. 业务背景（多平台 bot）
- 覆盖平台：Discord、Telegram、Slack、Feishu。
- 现状：每个平台 bot 监听消息并入库。
- 新需求：在主管端提供每个平台的 bot 安装与 onboarding 流程，支持客户自助安装。

## 4. 数据库与 schema 方向
- `public` 视为旧结构，当前阶段不再作为新设计承载。
- 新设计以 schema 分层为原则，围绕 `lucius_agent`、`permission` 扩展。
- 新增业务表建议放入新 schema（建议名：`integration`），用于统一管理多平台安装与 onboarding。

## 5. 建议的新 schema（integration）核心模型
- `integration.connection`：公司在某平台的一条连接记录（安装状态、外部 workspace 标识）。
- `integration.oauth_session`：OAuth 临时会话（state、防重放、过期时间）。
- `integration.onboarding_progress`：每个连接的步骤进度。
- `integration.channel_binding`：启用监听的频道与能力开关。
- `integration.install_event_log`：安装与回调审计日志。
- `integration.bot_health`：bot 在线状态与心跳健康信息。

## 6. 已完成的初始化操作
- 已创建项目目录：`/Users/kaikai/LuciusAI/lucius-client-app`。
- 已安装 Supabase 依赖：
  - `@supabase/supabase-js`
  - `@supabase/ssr`

## 7. 下一步建议
- 先落地 Supabase Auth（SSR + middleware + session 读取）。
- 再落地 `integration` schema 与对应 RLS。
- 按统一流程实现四平台 onboarding UI 与服务端回调。

## 8. pnpm 指令说明与用法

### 8.1 包管理器约定
- 推荐后续统一使用 `pnpm`，避免 `npm`/`pnpm` 混用导致 lockfile 漂移。

### 8.2 常用开发命令（pnpm）
```bash
# 启动开发环境（读取 .env.local）
pnpm dev

# 构建生产包
pnpm build

# 本地预览构建产物
pnpm preview

# 运行测试
pnpm test

# 启动构建后的服务
pnpm start
```

### 8.3 Supabase 相关命令（pnpm）
```bash
# 生成 Supabase TypeScript 类型（可选）
# 需要在 .env.local 配置 SUPABASE_PROJECT_REF
pnpm db:types
```

### 8.4 依赖管理（pnpm）
```bash
pnpm add <package>
pnpm add -D <package>
pnpm remove <package>
pnpm up
```

## 9. 环境变量说明

### 9.1 文件约定
- 本地开发使用：`.env.local`
- 生产环境使用部署平台配置（不要把生产密钥写进仓库）
- 所有前端可见变量必须以 `VITE_` 开头（会被打包到浏览器）

### 9.2 推荐 `.env.local` 模板
```bash
# =========================
# App 基础
# =========================
NODE_ENV=development
APP_URL=http://localhost:3000
VITE_APP_URL=http://localhost:3000

# =========================
# Supabase（前端可见）
# =========================
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<your-supabase-publishable-key>

# =========================
# Supabase（仅服务端）
# =========================
SUPABASE_SECRET_KEY=<your-supabase-secret-key>
SUPABASE_PROJECT_REF=<your-project-ref>

# =========================
# Sentry（可选）
# =========================
VITE_SENTRY_DSN=
SENTRY_AUTH_TOKEN=
```

### 9.3 变量用途说明
- `VITE_SUPABASE_URL`：Supabase 项目 URL，前后端都要用。
- `VITE_SUPABASE_PUBLISHABLE_KEY`：前端访问 Supabase 的 public key，依赖 RLS 控制权限。
- `VITE_APP_URL`：前端使用的 canonical 公网域名，OAuth callback 与生产域名纠正依赖它。
- `SUPABASE_SECRET_KEY`：仅服务端高权限操作使用，禁止暴露到前端。
- `SUPABASE_PROJECT_REF`：用于生成 Supabase TypeScript 类型。
- `APP_URL`：回调地址、重定向和 OAuth 配置基准域名。

### 9.4 安全与规范
- 不要在客户端代码中读取 `SUPABASE_SECRET_KEY`、`SENTRY_AUTH_TOKEN`。
- 不要提交 `.env.local` 到 git。
- 新增环境变量时，必须同步更新本文件与部署平台变量配置。

## 10. 当前项目文件结构与说明

### 10.1 目录结构（核心）
```text
lucius-client-app/
├── AGENTS.md
├── README.md
├── package.json
├── .env.local
├── vite.config.ts
├── tsconfig.json
├── instrument.server.mjs
├── messages/
│   ├── en.json
│   └── de.json
├── project.inlang/
│   └── settings.json
├── public/
│   ├── favicon.ico
│   └── ...静态资源
└── src/
    ├── server.ts
    ├── router.tsx
    ├── db.ts
    ├── styles.css
    ├── routes/
    │   ├── __root.tsx
    │   └── index.tsx
    ├── components/
    ├── lib/
    │   ├── auth/
    │   └── supabase/
    └── integrations/
        └── tanstack-query/
```

### 10.2 目录职责说明
- `src/routes`：TanStack Router 路由页面入口；后续业务页面优先放这里。
- `src/components`：通用 UI 组件与页面子组件。
- `src/lib/supabase`：Supabase Client 与 Auth 集成封装。
- `src/db.ts`：统一数据库访问入口（服务端高权限 client）。
- `src/integrations/tanstack-query`：Query Client 等集成层。
- `messages` 与 `project.inlang`：Paraglide 国际化配置与文案文件。
- `instrument.server.mjs`：服务端埋点入口（Sentry/监控相关）。

### 10.3 Supabase client / server 分层约定
- `src/lib/supabase/client.ts`（浏览器端）：
  - 运行环境是浏览器，只允许使用 `anon key`。
  - 所有请求受 RLS 约束，适合用户侧查询与会话相关操作。
- `src/lib/supabase/server.ts`（服务端）：
  - 运行环境是服务端，可读取/写入 cookie，处理 SSR 会话同步。
  - 提供两种能力：
    - `createSupabaseServerClient()`：基于用户会话，RLS 生效。
    - `createSupabaseServiceRoleClient()`：管理员权限，绕过 RLS（仅可信后端逻辑）。
- 为什么要分开：
  - 防止 `SUPABASE_SECRET_KEY` 泄漏到前端包。
  - 浏览器与服务端会话机制不同（本地存储 vs cookie）。
  - 保证权限边界清晰：前端做用户权限内操作，后端处理受控高权限操作。

## 11. 协作偏好（强约束）

### 11.1 验证命令策略
- 不要在每次改动后都执行 `pnpm build`。
- 仅在以下场景执行构建：
  - 用户明确要求；
  - 涉及发布前合并验证；
  - 变更范围较大且需要一次性回归确认。

### 11.2 后端表结构变更流程
- 只要涉及后端表结构（DDL）调整，必须同步修改：
  - `/Users/kaikai/LuciusAI/lucius-api-server/prisma/schema.prisma`
- 修改完成后，必须在以下目录生成对应迁移文件：
  - `/Users/kaikai/LuciusAI/lucius-api-server/prisma/migrations`
- 禁止直接使用 Supabase MCP 对数据库做写入型结构变更（包括但不限于 DDL、RLS Policy、外键/索引/约束、GRANT 权限调整）。
- 唯一允许的变更入口：先更新 `/Users/kaikai/LuciusAI/lucius-api-server/prisma/schema.prisma`，再在 `/Users/kaikai/LuciusAI/lucius-api-server/prisma/migrations` 落对应迁移，并通过迁移执行到目标环境。

### 11.3 禁止修改后端 API 逻辑
- 未经用户明确指示，不允许修改以下目录中的任何 API 业务逻辑代码：
  - `/Users/kaikai/LuciusAI/lucius-api-server/app/api/endpoints`
- 当需求涉及 `lucius_agent` / `event` 能力调整时，默认只允许修改：
  - `/Users/kaikai/LuciusAI/lucius-api-server/prisma/schema.prisma`
  - `/Users/kaikai/LuciusAI/lucius-api-server/prisma/migrations`
- 如果必须调整 API 行为，必须先得到用户明确确认后再实施。

### 11.4 前端界面文案规范
- 前端界面要求干净整洁，优先展示核心信息与核心操作。
- 默认删除冗余描述文案（副标题解释、重复提示、无关说明）。
- 空态与错误提示保持短句，不使用大段说明文字。
- 所有新增或修改的前端文案必须同步接入国际化，统一写入 `messages/*.json` 并通过 Paraglide 消费，禁止继续在页面/组件中硬编码最终展示文案。
- 所有页面级、列表级、卡片级、弹窗内容级的加载态统一使用骨架屏（Skeleton），禁止再使用纯文本“加载中...”或单独居中的 spinner 作为主要占位。

### 11.5 前端 Icon 显示规范
- 前端 icon fallback 使用透明背景样式，不使用白底圆块。
- 仅图标交互按钮必须提供 hover 提示（Tooltip 或 `title`），提示文案保持简短明确。
- icon 颜色遵循主题色体系，hover 与 active 仅做轻量层级变化，避免高反差跳变。
- `icon + 文案` 按钮（示例：“新会话”）统一使用轻量描边样式，icon 不额外加底色容器。

### 11.6 前端全局样式规范
- 所有通用视觉样式必须优先收口到全局样式，统一放在 `src/styles.css` 的 global token 或全局 class 中复用。
- 通用视觉样式包括但不限于：主题配色、按钮、badge、输入框外壳、卡片表面、选中态、hover 态、边框、阴影、空态、错误态、avatar fallback。
- 页面 / 组件内禁止继续新增通用样式的十六进制颜色硬编码；如果现有 global token / class 不够，先补到 `src/styles.css`，再在业务组件里引用。
- 新增样式时优先复用现有 `--dashboard-*` token；确实没有时再新增，并保证命名语义化、可复用。
