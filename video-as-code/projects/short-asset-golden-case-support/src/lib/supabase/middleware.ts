import { isDemoMode } from '@/lib/demo/mode'
import { createSupabaseServerClientForRequest } from './server'

function resolveDashboardRedirectTarget(requestUrl: URL): string {
  /**
   * 兼容旧入口：
   * - 历史书签或旧代码仍可能直接访问 `/dashboard`；
   * - 未登录时先把登录回跳目标归一到 `/dashboard/event`，减少登录后的二次跳转。
   */
  if (requestUrl.pathname === '/dashboard' || requestUrl.pathname === '/dashboard/') {
    return '/dashboard/event'
  }

  return `${requestUrl.pathname}${requestUrl.search || ''}`
}

/**
 * Supabase SSR 会话中间件。
 *
 * 作用：
 * - 在每个请求周期中触发一次 `auth.getUser()`，让 Supabase 完成会话刷新。
 * - 将 Supabase 回写的 cookie 合并到最终响应头，保证浏览器持久化最新会话。
 */
export async function withSupabaseSession(
  request: Request,
  next: () => Promise<Response>,
): Promise<Response> {
  // Demo mode: skip all Supabase session management
  if (isDemoMode()) {
    return next()
  }

  const requestUrl = new URL(request.url)
  const isAuthCallbackRequest =
    requestUrl.pathname === '/auth/callback' &&
    (requestUrl.searchParams.has('code') || requestUrl.searchParams.has('token_hash'))

  /**
   * 关键保护：
   * - `/auth/callback` 携带 `code/token_hash` 时，不提前执行 `getUser()`。
   * - 避免 Supabase 在 callback 前置阶段改写 cookie，导致 PKCE code verifier 丢失。
   */
  if (isAuthCallbackRequest) {
    return next()
  }

  const responseHeaders = new Headers()
  const supabase = createSupabaseServerClientForRequest(request, responseHeaders)

  /**
   * 关键步骤：
   * - 不依赖返回值，目的仅为触发 Supabase 内部的会话校验与 cookie 回写逻辑。
   */
  await supabase.auth.getUser()

  /**
   * 服务端路由拦截：
   * - 未登录访问 dashboard 路径时，直接跳转到登录页。
   * - 该逻辑在 SSR 入口生效，避免首屏短暂渲染后再由前端重定向。
   */
  const isDashboardPath =
    requestUrl.pathname === '/dashboard' || requestUrl.pathname.startsWith('/dashboard/')

  if (isDashboardPath) {
    const { data } = await supabase.auth.getSession()
    if (!data.session) {
      const loginUrl = new URL('/auth/login', requestUrl.origin)
      loginUrl.searchParams.set(
        'redirect_to',
        resolveDashboardRedirectTarget(requestUrl),
      )

      const redirectResponse = Response.redirect(loginUrl.toString(), 302)

      responseHeaders.forEach((value, key) => {
        if (key.toLowerCase() === 'set-cookie') {
          redirectResponse.headers.append(key, value)
          return
        }

        redirectResponse.headers.set(key, value)
      })

      return redirectResponse
    }
  }

  const response = await next()

  responseHeaders.forEach((value, key) => {
    if (key.toLowerCase() === 'set-cookie') {
      response.headers.append(key, value)
      return
    }

    response.headers.set(key, value)
  })

  return response
}
