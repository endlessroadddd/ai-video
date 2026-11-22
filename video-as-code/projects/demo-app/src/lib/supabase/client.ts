import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

import { isDemoMode } from '@/lib/demo/mode'
import { createDemoSupabaseClient } from '@/lib/demo/mock-supabase'
import { getSupabasePublicEnv } from './env'

/**
 * 浏览器端 Supabase Client 单例。
 *
 * 当前策略：
 * - `@supabase/ssr` 的 browser client 会固定使用 PKCE，并把 auth 状态存进浏览器 cookie。
 * - 应用层统一把各类登录回跳归一到 `/auth/callback`，再继续做邀请接收与业务落点解析。
 * - Demo mode 下返回 mock client，不连接真实 Supabase。
 */
let browserClient: SupabaseClient | null = null

export function getSupabaseBrowserClient(): SupabaseClient {
  if (browserClient) {
    return browserClient
  }

  if (isDemoMode()) {
    browserClient = createDemoSupabaseClient() as SupabaseClient
    return browserClient
  }

  const { url, publicKey } = getSupabasePublicEnv()

  browserClient = createBrowserClient(url, publicKey)

  return browserClient
}
