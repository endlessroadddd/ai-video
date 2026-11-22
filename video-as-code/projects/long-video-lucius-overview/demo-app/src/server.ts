import { paraglideMiddleware } from './paraglide/server'
import handler from '@tanstack/react-start/server-entry'
import * as Sentry from '@sentry/tanstackstart-react'

import { isDemoMode } from '@/lib/demo/mode'
import { handleDiscordIntegrationApi } from '@/lib/server/discord-integration-api'
import { handleClientChatApi } from '@/lib/server/client-chat-api'
import { handleBillingApi } from '@/lib/server/billing-api'
import { handleEventApi } from '@/lib/server/event-api'
import { handleFeishuIntegrationApi } from '@/lib/server/feishu-integration-api'
import { handleMemberActivityApi } from '@/lib/server/member-activity-api'
import { handleMemberManagementApi } from '@/lib/server/member-management-api'
import { handleOnboardingApi } from '@/lib/server/onboarding-api'
import { handleSlackIntegrationApi } from '@/lib/server/slack-integration-api'
import { handleTelegramIntegrationApi } from '@/lib/server/telegram-integration-api'
import { handleUserProfileApi } from '@/lib/server/user-profile-api'
import { withSupabaseSession } from '@/lib/supabase/middleware'

const requestHandler = {
  async fetch(req: Request): Promise<Response> {
    const requestUrl = new URL(req.url)

    /**
     * Demo mode：
     * - 服务端 API 路由全部返回空成功，真实数据由客户端 fetch 拦截器提供。
     */
    if (isDemoMode() && requestUrl.pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    /**
     * Billing Stripe Webhook：
     * - 必须在 session middleware 之前处理，确保能读取原始 body 验签；
     * - webhook 不依赖浏览器登录态，统一由 Stripe 服务器回调。
     */
    if (requestUrl.pathname === '/api/billing/stripe/webhook') {
      return handleBillingApi(req)
    }

    /**
     * Telegram 集成 API：
     * - 先走 Supabase session 同步，再进入专用 handler；
     * - 与页面 SSR 流程解耦，避免把复杂集成逻辑塞进页面路由。
     */
    if (requestUrl.pathname.startsWith('/api/integrations/telegram/')) {
      return withSupabaseSession(req, () => handleTelegramIntegrationApi(req))
    }

    /**
     * Discord 集成 API：
     * - 统一复用 Supabase session 同步中间件；
     * - 覆盖安装链接生成、OAuth 回调、手动同步三条最小链路。
     */
    if (requestUrl.pathname.startsWith('/api/settings/discord/')) {
      return withSupabaseSession(req, () => handleDiscordIntegrationApi(req))
    }

    /**
     * Slack 集成 API：
     * - 与 Discord 保持同一接入模式，统一走 session 同步中间件；
     * - 覆盖安装链接、OAuth 回调、手动同步三条最小链路。
     */
    if (requestUrl.pathname.startsWith('/api/settings/slack/')) {
      return withSupabaseSession(req, () => handleSlackIntegrationApi(req))
    }

    /**
     * Feishu 集成 API：
     * - 当前用于 Bot 列表、创建、验证、重启等管理动作；
     * - 服务端统一做成员鉴权后，再转发到 lucius-api-server v2。
     */
    if (requestUrl.pathname.startsWith('/api/settings/feishu/')) {
      return withSupabaseSession(req, () => handleFeishuIntegrationApi(req))
    }

    /**
     * 设置页成员管理 API：
     * - 统一经服务端做权限二次校验；
     * - 邀请邮件由服务端调用 Supabase Admin API 发起，前端不触达 admin 能力。
     */
    if (requestUrl.pathname.startsWith('/api/settings/member-management/')) {
      return withSupabaseSession(req, () => handleMemberManagementApi(req))
    }

    /**
     * Billing API：
     * - 设置页套餐与用量历史统一从服务端读取；
     * - 除 webhook 外，其余接口都要求先完成 session 同步。
     */
    if (requestUrl.pathname.startsWith('/api/billing/')) {
      return withSupabaseSession(req, () => handleBillingApi(req))
    }

    /**
     * Onboarding API：
     * - 处理“首个工作区 bootstrap”等必须通过服务端代办的初始化写操作；
     * - 统一复用 session 中间件，避免重复实现登录态校验。
     */
    if (requestUrl.pathname.startsWith('/api/onboarding/')) {
      return withSupabaseSession(req, () => handleOnboardingApi(req))
    }

    /**
     * 成员活跃时间 API：
     * - 统一处理全局 activity ping；
     * - 与具体业务接口解耦，避免页面间口径不一致。
     */
    if (requestUrl.pathname.startsWith('/api/member-activity/')) {
      return withSupabaseSession(req, () => handleMemberActivityApi(req))
    }

    /**
     * Event 详情 API：
     * - 通过服务端读取 `lucius_agent.message` 中的 adopted knowledge；
     * - 保持浏览器端不接触 service-role 或绕过 RLS 的数据能力。
     */
    if (requestUrl.pathname.startsWith('/api/events/')) {
      return withSupabaseSession(req, () => handleEventApi(req))
    }

    /**
     * 用户画像 API：
     * - 用户画像服务没有鉴权，不能暴露给客户端直连；
     * - 服务端代理转发到内网地址，客户端只接触当前域名。
     */
    if (requestUrl.pathname.startsWith('/api/user-profile/')) {
      return withSupabaseSession(req, () => handleUserProfileApi(req))
    }

    /**
     * 客户端聊天 API：
     * - 前端只调用当前应用域名下的 `/api/chat/*`；
     * - 服务端负责登录态鉴权、公司成员校验并转发到 bot / lucius-api-server。
     */
    if (requestUrl.pathname.startsWith('/api/chat/')) {
      return withSupabaseSession(req, () => handleClientChatApi(req))
    }

    /**
     * 服务端请求链路：
     * - 先做 Supabase Session 同步，保证 SSR 能读取最新会话；
     * - 再交给 Paraglide 做本地化重写与重定向；
     * - 最后进入 TanStack Start 的 server-entry。
     */
    return withSupabaseSession(req, () =>
      paraglideMiddleware(req, () => handler.fetch(req)),
    )
  },
}

// Server-side URL localization/redirects for Paraglide
/**
 * 用 Sentry 包装 fetch 入口：
 * - 为服务端请求与 server functions 生成 tracing span；
 * - 保持原有 handler 行为不变，仅增加观测能力。
 */
export default Sentry.wrapFetchWithSentry(requestHandler)
