import type { Session } from '@supabase/supabase-js'

/**
 * Supabase 邮件登录支持的 OTP 类型。
 */
export type SupportedOtpType =
  | 'signup'
  | 'invite'
  | 'magiclink'
  | 'recovery'
  | 'email_change'
  | 'email'

/**
 * Auth 回调页可能出现的 token 组合。
 */
export type AuthCallbackTokens = {
  code: string | null
  tokenHash: string | null
  otpType: SupportedOtpType | null
  accessToken: string | null
  refreshToken: string | null
}

/**
 * 仅保留本回调流程所需的最小错误结构，避免把整个 SDK 类型耦合进业务层。
 */
type AuthErrorLike = {
  message: string
}

type AuthSessionPayload = {
  session: Session | null
}

type AuthSessionResponse = Promise<{
  data: AuthSessionPayload
  error: AuthErrorLike | null
}>

/**
 * Supabase Auth 最小接口：
 * - 只声明 callback 消费流程真正会调用到的方法；
 * - 这样测试里可以用轻量 mock，而不需要构造完整 client。
 */
export type AuthCallbackAuthClient = {
  getSession: () => AuthSessionResponse
  setSession: (tokens: {
    access_token: string
    refresh_token: string
  }) => AuthSessionResponse
  verifyOtp: (payload: {
    token_hash: string
    type: SupportedOtpType
  }) => AuthSessionResponse
  exchangeCodeForSession: (code: string) => AuthSessionResponse
}

export type AuthCallbackSessionErrorCode =
  | 'missing_session'
  | 'session_set_failed'
  | 'otp_verify_failed'
  | 'code_exchange_failed'

export type ResolveAuthCallbackSessionResult =
  | {
      status: 'authenticated'
      source: 'existing_session' | 'implicit_tokens' | 'otp_token_hash' | 'pkce_code'
      session: Session
    }
  | {
      status: 'error'
      errorCode: AuthCallbackSessionErrorCode
      errorMessage: string | null
    }

function buildErrorResult(
  errorCode: AuthCallbackSessionErrorCode,
  errorMessage: string | null,
): ResolveAuthCallbackSessionResult {
  return {
    status: 'error',
    errorCode,
    errorMessage,
  }
}

async function getStableSession(
  auth: AuthCallbackAuthClient,
  fallbackSession: Session | null,
): Promise<{
  session: Session | null
  errorMessage: string | null
}> {
  if (fallbackSession) {
    return {
      session: fallbackSession,
      errorMessage: null,
    }
  }

  const { data, error } = await auth.getSession()
  return {
    session: data.session,
    errorMessage: error?.message || null,
  }
}

/**
 * 消费 `/auth/callback` 上的各种 Supabase 回跳参数。
 *
 * 支持场景：
 * - `access_token/refresh_token`：旧 implicit 回调；
 * - `token_hash`：Magic Link / 邮件模板；
 * - `code`：OAuth / PKCE 回调。
 *
 * 额外兜底：
 * - 先读取一次现有 session，兼容 SDK 已自动落会话的情况；
 * - 当 URL 上存在 `code` 但 SDK 没拿到 session 时，再显式执行一次 `exchangeCodeForSession`，
 *   避免页面直接落到“missing session”的无信息错误。
 */
export async function resolveAuthCallbackSession(
  auth: AuthCallbackAuthClient,
  tokens: AuthCallbackTokens,
): Promise<ResolveAuthCallbackSessionResult> {
  if (tokens.accessToken && tokens.refreshToken) {
    const { data, error } = await auth.setSession({
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    })

    if (error) {
      return buildErrorResult('session_set_failed', error.message)
    }

    const stableSession = await getStableSession(auth, data.session)
    if (stableSession.session) {
      return {
        status: 'authenticated',
        source: 'implicit_tokens',
        session: stableSession.session,
      }
    }

    return buildErrorResult('missing_session', stableSession.errorMessage)
  }

  if (tokens.tokenHash && tokens.otpType) {
    const { data, error } = await auth.verifyOtp({
      token_hash: tokens.tokenHash,
      type: tokens.otpType,
    })

    if (error) {
      return buildErrorResult('otp_verify_failed', error.message)
    }

    const stableSession = await getStableSession(auth, data.session)
    if (stableSession.session) {
      return {
        status: 'authenticated',
        source: 'otp_token_hash',
        session: stableSession.session,
      }
    }

    return buildErrorResult('missing_session', stableSession.errorMessage)
  }

  const currentSession = await auth.getSession()
  if (currentSession.data.session) {
    return {
      status: 'authenticated',
      source: 'existing_session',
      session: currentSession.data.session,
    }
  }

  if (tokens.code) {
    const { data, error } = await auth.exchangeCodeForSession(tokens.code)

    if (error) {
      return buildErrorResult('code_exchange_failed', error.message)
    }

    const stableSession = await getStableSession(auth, data.session)
    if (stableSession.session) {
      return {
        status: 'authenticated',
        source: 'pkce_code',
        session: stableSession.session,
      }
    }

    return buildErrorResult('missing_session', stableSession.errorMessage)
  }

  return buildErrorResult('missing_session', currentSession.error?.message || null)
}
