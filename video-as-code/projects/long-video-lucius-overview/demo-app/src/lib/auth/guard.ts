import { redirect } from '@tanstack/react-router'
import type { Session } from '@supabase/supabase-js'

import { getSelectedCompanyId, setSelectedCompanyId } from '@/lib/company-selection'
import { isDemoMode } from '@/lib/demo/mode'
import { buildAuthCallbackRedirectUrl } from '@/lib/services/auth-callback-url'
import {
  DEFAULT_AUTHENTICATED_PATH,
  resolveAuthenticatedEntryPath,
} from '@/lib/services/auth-entry'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

/**
 * 路由位置类型（最小子集）。
 */
type RouteLocation = {
  href?: string
  pathname?: string
  searchStr?: string
}

function buildRedirectTo(location?: RouteLocation): string {
  if (!location) {
    return DEFAULT_AUTHENTICATED_PATH
  }

  if (typeof location.href === 'string' && location.href.trim()) {
    return location.href
  }

  const pathname = location.pathname || DEFAULT_AUTHENTICATED_PATH
  const search = location.searchStr || ''
  return `${pathname}${search}`
}

/**
 * 受保护路由守卫。
 *
 * 说明：
 * - 客户端：使用 Supabase browser client 读取会话并重定向。
 * - 服务端首屏：交由 SSR middleware 维护 cookie，同步阶段先返回 null。
 */
export async function requireAuthOrRedirect(
  location?: RouteLocation,
): Promise<Session | null> {
  if (typeof window === 'undefined') {
    return null
  }

  // Demo mode: always authenticated — return mock session
  if (isDemoMode()) {
    const supabase = getSupabaseBrowserClient()
    const { data } = await supabase.auth.getSession()
    return data.session as Session
  }

  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase.auth.getSession()

  if (error || !data.session) {
    throw redirect({
      to: '/auth/login',
      search: {
        redirect_to: buildRedirectTo(location),
      },
    })
  }

  return data.session
}

/**
 * 登录页守卫：已登录直接回 dashboard。
 */
export async function redirectIfAuthenticated(): Promise<void> {
  if (typeof window === 'undefined') {
    return
  }

  const callbackRedirectUrl = buildAuthCallbackRedirectUrl(window.location.href)
  if (callbackRedirectUrl) {
    window.location.replace(callbackRedirectUrl)
    return
  }

  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase.auth.getSession()

  if (!error && data.session) {
    let targetPath = DEFAULT_AUTHENTICATED_PATH

    try {
      const resolution = await resolveAuthenticatedEntryPath(supabase, {
        preferredPath: DEFAULT_AUTHENTICATED_PATH,
        selectedCompanyId: getSelectedCompanyId(),
      })

      if (resolution.companyId) {
        setSelectedCompanyId(resolution.companyId)
      }

      targetPath = resolution.targetPath
    } catch (resolveError) {
      console.warn(
        '[auth.guard] 已登录用户落点解析失败，回退到 dashboard：',
        resolveError instanceof Error ? resolveError.message : 'unknown error',
      )
    }

    throw redirect({ to: targetPath })
  }
}
