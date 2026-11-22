# Supabase + TanStack 重构说明

## 背景

本次重构以 Supabase 官方 TanStack Start 指南为基准：

- Quickstart（TanStack）
- SSR（TanStack Start）

目标是将项目的 Supabase 使用方式统一为官方推荐的 client/server 双轨模型，并把服务端高权限访问独立出来。

## 变更摘要

### 1) 移除自建 REST persistence

已删除：

- `src/lib/supabase/persistence.ts`

原因：

- 官方推荐直接使用 `@supabase/supabase-js` / `@supabase/ssr` client。
- 统一 SDK 能减少自维护成本，并便于后续跟进 Supabase 官方能力（Auth、RLS、Storage、RPC）。

### 2) 建立三层客户端模型

- `src/lib/supabase/client.ts`
  - 浏览器端单例
  - 使用 `createBrowserClient`

- `src/lib/supabase/server.ts`
  - 服务端 RLS client：`createSupabaseServerClient`
  - 服务端 service-role client：`createSupabaseServiceRoleClient`

- `src/db.ts`
  - 服务端高权限 DB 入口（全局单例）

### 3) 环境变量读取统一

- `src/lib/supabase/env.ts`
  - `getSupabasePublicEnv()`
  - `getSupabaseServiceEnv()`

## 使用规范

- 组件/浏览器：使用 `getSupabaseBrowserClient()`
- 服务端（RLS 生效）：使用 `createSupabaseServerClient()`
- 服务端（管理员权限）：使用 `db` 或 `createSupabaseServiceRoleClient()`

## 验证

- `pnpm build` 通过
