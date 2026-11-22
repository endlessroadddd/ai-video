/**
 * 用户画像 API 服务端代理。
 *
 * 所有请求经由此代理转发到内网地址，客户端只接触当前域名下的 `/api/user-profile/*`。
 * 代理层自动注入 API Key（USER_PROFILE_API_KEY 环境变量），浏览器端不接触凭证。
 * 代理层校验 Supabase 用户 session，未登录请求直接返回 401。
 */

import { createSupabaseServerClientForRequest } from '@/lib/supabase/server'

const USER_PROFILE_API_PREFIX = '/api/user-profile'

function getUpstreamBaseUrl(): string {
  const url = process.env.USER_PROFILE_API_BASE_URL
  if (!url) {
    throw new Error('USER_PROFILE_API_BASE_URL is not set')
  }
  return url.replace(/\/$/, '')
}

function jsonResponse(body: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}

async function requireAuthenticatedUser(request: Request): Promise<void> {
  const supabase = createSupabaseServerClientForRequest(request, new Headers())
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user?.id) {
    throw Object.assign(new Error('登录已失效，请重新登录后重试。'), { status: 401 })
  }
}

/**
 * 将客户端请求透传到用户画像上游服务。
 *
 * 路径映射：
 *   /api/user-profile/insights/list → {upstream}/api/v1/user-context/insights/list
 *   /api/user-profile/tags          → {upstream}/api/v1/user-context/tags
 *   ...
 */
async function proxyToUpstream(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url)
  const subPath = requestUrl.pathname.slice(USER_PROFILE_API_PREFIX.length)
  const upstreamUrl = `${getUpstreamBaseUrl()}/api/v1/user-context${subPath}${requestUrl.search}`

  const headers: Record<string, string> = {}

  const apiKey = process.env.USER_PROFILE_API_KEY
  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`
  }

  const contentType = request.headers.get('content-type')
  if (contentType) {
    headers['Content-Type'] = contentType
  }

  const init: RequestInit = {
    method: request.method,
    headers,
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = await request.text()
  }

  const upstream = await fetch(upstreamUrl, init)

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      'Content-Type': upstream.headers.get('Content-Type') || 'application/json',
    },
  })
}

export async function handleUserProfileApi(request: Request): Promise<Response> {
  try {
    await requireAuthenticatedUser(request)
    return await proxyToUpstream(request)
  } catch (error) {
    const status = (error as { status?: number }).status || 500
    const message = error instanceof Error ? error.message : '用户画像接口出现未知错误。'
    return jsonResponse({ error: message }, status)
  }
}
