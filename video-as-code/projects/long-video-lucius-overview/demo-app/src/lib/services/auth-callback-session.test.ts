import type { Session } from '@supabase/supabase-js'
import { describe, expect, it, vi } from 'vitest'

import {
  resolveAuthCallbackSession,
  type AuthCallbackAuthClient,
} from '@/lib/services/auth-callback-session'

function createSession(accessToken: string): Session {
  return {
    access_token: accessToken,
    refresh_token: `${accessToken}-refresh`,
    expires_in: 3600,
    expires_at: 1_735_689_600,
    token_type: 'bearer',
    user: {
      id: 'user-1',
      app_metadata: {
        provider: 'google',
        providers: ['google'],
      },
      user_metadata: {},
      aud: 'authenticated',
      created_at: '2026-03-12T00:00:00.000Z',
    },
  } as Session
}

function createAuthClientMock(): AuthCallbackAuthClient {
  return {
    getSession: vi.fn(),
    setSession: vi.fn(),
    verifyOtp: vi.fn(),
    exchangeCodeForSession: vi.fn(),
  }
}

describe('auth-callback-session', () => {
  it('Google OAuth 回跳在当前 session 缺失时应使用 code 交换会话', async () => {
    const session = createSession('google-access-token')
    const auth = createAuthClientMock()

    vi.mocked(auth.getSession).mockResolvedValueOnce({
      data: {
        session: null,
      },
      error: null,
    })
    vi.mocked(auth.exchangeCodeForSession).mockResolvedValueOnce({
      data: {
        session,
      },
      error: null,
    })

    const result = await resolveAuthCallbackSession(auth, {
      code: 'oauth-code',
      tokenHash: null,
      otpType: null,
      accessToken: null,
      refreshToken: null,
    })

    expect(result).toEqual({
      status: 'authenticated',
      source: 'pkce_code',
      session,
    })
    expect(auth.exchangeCodeForSession).toHaveBeenCalledWith('oauth-code')
    expect(auth.verifyOtp).not.toHaveBeenCalled()
    expect(auth.setSession).not.toHaveBeenCalled()
  })

  it('已有 session 时不应重复执行 code exchange', async () => {
    const session = createSession('existing-access-token')
    const auth = createAuthClientMock()

    vi.mocked(auth.getSession).mockResolvedValueOnce({
      data: {
        session,
      },
      error: null,
    })

    const result = await resolveAuthCallbackSession(auth, {
      code: 'oauth-code',
      tokenHash: null,
      otpType: null,
      accessToken: null,
      refreshToken: null,
    })

    expect(result).toEqual({
      status: 'authenticated',
      source: 'existing_session',
      session,
    })
    expect(auth.exchangeCodeForSession).not.toHaveBeenCalled()
  })

  it('code exchange 失败时应返回明确的错误码与原始消息', async () => {
    const auth = createAuthClientMock()

    vi.mocked(auth.getSession).mockResolvedValueOnce({
      data: {
        session: null,
      },
      error: null,
    })
    vi.mocked(auth.exchangeCodeForSession).mockResolvedValueOnce({
      data: {
        session: null,
      },
      error: {
        message: 'auth code and code verifier should be non-empty',
      },
    })

    const result = await resolveAuthCallbackSession(auth, {
      code: 'oauth-code',
      tokenHash: null,
      otpType: null,
      accessToken: null,
      refreshToken: null,
    })

    expect(result).toEqual({
      status: 'error',
      errorCode: 'code_exchange_failed',
      errorMessage: 'auth code and code verifier should be non-empty',
    })
  })
})
