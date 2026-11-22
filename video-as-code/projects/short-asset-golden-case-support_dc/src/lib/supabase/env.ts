import { isDemoMode } from '@/lib/demo/mode'

/**
 * Supabase 前端可见环境变量。
 */
export type SupabasePublicEnv = {
  url: string
  publicKey: string
}

/**
 * Supabase 服务端高权限环境变量。
 */
export type SupabaseServiceEnv = {
  url: string
  adminKey: string
}

/**
 * 读取 Vite 注入的前端环境变量。
 */
function readViteEnv(): Record<string, string | undefined> {
  const viteEnv = (import.meta as ImportMeta & {
    env?: Record<string, string | undefined>
  }).env

  return viteEnv || {}
}

/**
 * 判断当前是否运行在浏览器。
 *
 * 目的：
 * - 浏览器端只应消费构建期注入的 `VITE_*` 变量；
 * - 避免线上环境里残留的旧 `SUPABASE_URL` / `SUPABASE_ANON_KEY` 被错误带入客户端包。
 */
function isBrowserRuntime(): boolean {
  return typeof window !== 'undefined'
}

/**
 * 获取 Supabase 公共配置（浏览器与服务端均可使用）。
 *
 * 约束：
 * - URL 必须存在
 * - Public key 必须存在
 */
export function getSupabasePublicEnv(): SupabasePublicEnv {
  // Demo mode: Supabase env vars are not required
  if (isDemoMode()) {
    return { url: 'https://demo.supabase.co', publicKey: 'demo-anon-key' }
  }

  const viteEnv = readViteEnv()

  if (isBrowserRuntime()) {
    const browserUrl = viteEnv.VITE_SUPABASE_URL
    const browserPublicKey =
      viteEnv.VITE_SUPABASE_PUBLISHABLE_KEY || viteEnv.VITE_SUPABASE_ANON_KEY

    if (!browserUrl) {
      throw new Error('Missing VITE_SUPABASE_URL in browser runtime')
    }

    if (!browserPublicKey) {
      throw new Error('Missing VITE_SUPABASE_PUBLISHABLE_KEY in browser runtime')
    }

    return {
      url: browserUrl,
      publicKey: browserPublicKey,
    }
  }

  const url =
    process.env.VITE_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    viteEnv.VITE_SUPABASE_URL

  const publicKey =
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    viteEnv.VITE_SUPABASE_PUBLISHABLE_KEY ||
    viteEnv.VITE_SUPABASE_ANON_KEY

  if (!url) {
    throw new Error('Missing Supabase URL environment variable')
  }

  if (!publicKey) {
    throw new Error('Missing Supabase publishable key environment variable')
  }

  return { url, publicKey }
}

/**
 * 获取 Supabase 服务端高权限配置。
 *
 * 警告：
 * - `adminKey` 仅允许服务端代码读取。
 * - 禁止在浏览器端打包路径中调用该函数。
 */
export function getSupabaseServiceEnv(): SupabaseServiceEnv {
  const { url } = getSupabasePublicEnv()
  const adminKey =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!adminKey) {
    throw new Error('Missing SUPABASE_SECRET_KEY')
  }

  return {
    url,
    adminKey,
  }
}

/**
 * 兼容旧调用方的别名导出。
 */
export function getSupabaseEnv(): SupabasePublicEnv {
  return getSupabasePublicEnv()
}
