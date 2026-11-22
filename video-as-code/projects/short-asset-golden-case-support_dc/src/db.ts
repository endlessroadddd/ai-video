import type { SupabaseClient } from '@supabase/supabase-js'

import { createSupabaseServiceRoleClient } from '@/lib/supabase/server'

/**
 * 开发态全局单例声明。
 * 通过 `globalThis` 缓存，避免 HMR 场景重复创建高权限 Supabase client。
 */
declare global {
  // eslint-disable-next-line no-var
  var __supabaseDb: SupabaseClient | undefined
}

/**
 * 服务端统一数据库入口（高权限）。
 *
 * 说明：
 * - 该实例绕过 RLS，仅用于服务端可信逻辑。
 * - 业务代码应优先使用 `createSupabaseServerClientForRequest`（RLS 生效），
 *   仅在确实需要管理员权限时使用本实例。
 */
export const db: SupabaseClient = globalThis.__supabaseDb || createSupabaseServiceRoleClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.__supabaseDb = db
}
