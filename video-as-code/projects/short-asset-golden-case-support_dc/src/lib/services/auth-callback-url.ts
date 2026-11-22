import { resolvePublicAppOrigin } from '@/lib/public-app-url'

const AUTH_CALLBACK_PATH = '/auth/callback'
const AUTH_LOGIN_PATH = '/auth/login'

const CALLBACK_QUERY_PARAM_KEYS: string[] = [
  'code',
  'token_hash',
  'type',
]

const ERROR_QUERY_PARAM_KEYS: string[] = [
  'error',
  'error_code',
  'error_description',
]

const SESSION_HASH_PARAM_KEYS: string[] = [
  'access_token',
  'refresh_token',
  'expires_at',
  'expires_in',
  'token_type',
  'provider_token',
  'provider_refresh_token',
  'type',
]

const ERROR_HASH_PARAM_KEYS: string[] = [
  'error',
  'error_description',
]

function getHashParams(hash: string): URLSearchParams {
  const normalizedHash = hash.startsWith('#') ? hash.slice(1) : hash
  return new URLSearchParams(normalizedHash)
}

function hasAnyParam(searchParams: URLSearchParams, keys: string[]): boolean {
  return keys.some((key) => searchParams.has(key))
}

function buildRedirectTarget(url: URL): string {
  const nestedRedirectTarget = url.searchParams.get('redirect_to')?.trim() || ''

  if (url.pathname.startsWith('/auth/') && nestedRedirectTarget.startsWith('/')) {
    return nestedRedirectTarget
  }

  const redirectSearchParams = new URLSearchParams(url.search)

  CALLBACK_QUERY_PARAM_KEYS.forEach((key) => {
    redirectSearchParams.delete(key)
  })

  ERROR_QUERY_PARAM_KEYS.forEach((key) => {
    redirectSearchParams.delete(key)
  })

  const redirectSearch = redirectSearchParams.toString()
  return redirectSearch ? `${url.pathname}?${redirectSearch}` : url.pathname
}

/**
 * 把任意页面上的 Supabase 登录回跳参数规范化到 `/auth/callback`：
 * - 兼容生产环境里邮件偶发直接落到 `/dashboard#access_token=...`；
 * - 保证后续“接受邀请 + 切换公司”总是走统一回调链路。
 */
export function buildAuthCallbackRedirectUrl(currentHref: string): string | null {
  const currentUrl = new URL(currentHref)

  if (currentUrl.pathname === AUTH_CALLBACK_PATH) {
    return null
  }

  const hashParams = getHashParams(currentUrl.hash)
  const hasCallbackQueryParams = hasAnyParam(currentUrl.searchParams, CALLBACK_QUERY_PARAM_KEYS)
  const hasErrorQueryParams = hasAnyParam(currentUrl.searchParams, ERROR_QUERY_PARAM_KEYS)
  const hasSessionHashParams = hasAnyParam(hashParams, SESSION_HASH_PARAM_KEYS)
  const hasErrorHashParams = hasAnyParam(hashParams, ERROR_HASH_PARAM_KEYS)
  const isLoginRoute = currentUrl.pathname === AUTH_LOGIN_PATH

  const shouldRedirect =
    hasCallbackQueryParams ||
    hasSessionHashParams ||
    (!isLoginRoute && (hasErrorQueryParams || hasErrorHashParams))

  if (!shouldRedirect) {
    return null
  }

  const callbackUrl = new URL(AUTH_CALLBACK_PATH, resolvePublicAppOrigin(currentUrl.origin))
  callbackUrl.searchParams.set('redirect_to', buildRedirectTarget(currentUrl))

  CALLBACK_QUERY_PARAM_KEYS.forEach((key) => {
    const value = currentUrl.searchParams.get(key)
    if (value) {
      callbackUrl.searchParams.set(key, value)
    }
  })

  ERROR_QUERY_PARAM_KEYS.forEach((key) => {
    const value = currentUrl.searchParams.get(key)
    if (value) {
      callbackUrl.searchParams.set(key, value)
    }
  })

  return `${callbackUrl.toString()}${currentUrl.hash}`
}
