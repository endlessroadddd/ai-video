import { createServerClient } from '@supabase/ssr'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import { getSupabasePublicEnv, getSupabaseServiceEnv } from './env'

/**
 * 最小 cookie 选项定义。
 */
type CookieOptions = {
  domain?: string
  path?: string
  maxAge?: number
  expires?: Date
  httpOnly?: boolean
  secure?: boolean
  sameSite?: 'lax' | 'strict' | 'none'
}

function parseCookieHeader(cookieHeader: string | null): Array<{ name: string; value: string }> {
  if (!cookieHeader) {
    return []
  }

  return cookieHeader
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const separatorIndex = item.indexOf('=')

      if (separatorIndex < 0) {
        return {
          name: item,
          value: '',
        }
      }

      const name = item.slice(0, separatorIndex).trim()
      const value = decodeURIComponent(item.slice(separatorIndex + 1).trim())

      return {
        name,
        value,
      }
    })
}

function serializeCookie(name: string, value: string, options: CookieOptions): string {
  const segments: string[] = [`${name}=${encodeURIComponent(value)}`]

  segments.push(`Path=${options.path || '/'}`)

  if (options.maxAge !== undefined) {
    segments.push(`Max-Age=${Math.floor(options.maxAge)}`)
  }

  if (options.expires) {
    segments.push(`Expires=${options.expires.toUTCString()}`)
  }

  if (options.domain) {
    segments.push(`Domain=${options.domain}`)
  }

  if (options.httpOnly) {
    segments.push('HttpOnly')
  }

  if (options.secure) {
    segments.push('Secure')
  }

  if (options.sameSite) {
    const sameSite = options.sameSite[0].toUpperCase() + options.sameSite.slice(1)
    segments.push(`SameSite=${sameSite}`)
  }

  return segments.join('; ')
}

/**
 * 创建基于 `Request` 的 Supabase 服务端客户端。
 *
 * 用途：
 * - 在 server middleware 中刷新会话。
 * - 收集 Supabase 写入 cookie 并合并到响应头。
 */
export function createSupabaseServerClientForRequest(
  request: Request,
  responseHeaders: Headers,
): SupabaseClient {
  const { url, publicKey } = getSupabasePublicEnv()

  return createServerClient(url, publicKey, {
    cookies: {
      getAll: () => parseCookieHeader(request.headers.get('cookie')),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          responseHeaders.append('Set-Cookie', serializeCookie(name, value, options as CookieOptions))
        })
      },
    },
  })
}

/**
 * 创建服务端高权限客户端（绕过 RLS）。
 *
 * 说明：
 * - 优先读取新的 `SUPABASE_SECRET_KEY`。
 * - 继续兼容旧的 `SUPABASE_SERVICE_ROLE_KEY`，便于平滑迁移。
 */
export function createSupabaseServiceRoleClient(): SupabaseClient {
  const { url, adminKey } = getSupabaseServiceEnv()

  return createClient(url, adminKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })
}
