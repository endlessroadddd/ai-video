const AUTH_CALLBACK_PATH = '/auth/callback'

/**
 * 读取前端可见环境变量。
 */
function readViteEnv(): Record<string, string | undefined> {
  const viteEnv = (import.meta as ImportMeta & {
    env?: Record<string, string | undefined>
  }).env

  return viteEnv || {}
}

/**
 * 获取前端公开的 canonical app origin。
 *
 * 设计目的：
 * - 生产环境可能同时存在 Railway 默认域名、自定义域名等多个入口；
 * - OAuth PKCE 的 code verifier 依赖同源 cookie；
 * - 一旦登录发起页和 callback 页不在同一个 origin，就会出现 verifier 丢失。
 */
export function getConfiguredPublicAppOrigin(): string | null {
  const viteEnv = readViteEnv()
  const rawAppUrl = process.env.VITE_APP_URL || viteEnv.VITE_APP_URL

  if (!rawAppUrl?.trim()) {
    return null
  }

  return new URL(rawAppUrl.trim()).origin
}

/**
 * 解析当前场景下应使用的 app origin：
 * - 有 canonical 配置时始终返回 canonical origin；
 * - 未配置时退回当前页面 origin，保持本地开发零配置可用。
 */
export function resolvePublicAppOrigin(currentOrigin: string): string {
  return getConfiguredPublicAppOrigin() || currentOrigin
}

/**
 * 当当前页面跑在非 canonical 域名时，构造一个同路径同参数的新 URL。
 */
export function buildCanonicalAppUrl(currentHref: string): string | null {
  const canonicalOrigin = getConfiguredPublicAppOrigin()

  if (!canonicalOrigin) {
    return null
  }

  const currentUrl = new URL(currentHref)
  if (currentUrl.origin === canonicalOrigin) {
    return null
  }

  return new URL(
    `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`,
    canonicalOrigin,
  ).toString()
}

/**
 * 统一生成 auth callback URL：
 * - 生产优先使用 canonical app origin；
 * - 保留业务 redirect_to，避免登录后落点丢失。
 */
export function buildAuthCallbackUrl(currentOrigin: string, redirectTo: string): string {
  const callbackUrl = new URL(AUTH_CALLBACK_PATH, resolvePublicAppOrigin(currentOrigin))
  callbackUrl.searchParams.set('redirect_to', redirectTo)
  return callbackUrl.toString()
}
