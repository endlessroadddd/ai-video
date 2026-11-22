import { describe, expect, it } from 'vitest'

import { buildAuthCallbackRedirectUrl } from '@/lib/services/auth-callback-url'

describe('auth-callback-url', () => {
  it('应把 dashboard hash token 规范化到 auth/callback', () => {
    expect(
      buildAuthCallbackRedirectUrl(
        'https://app.hirelucius.com/dashboard#access_token=abc&refresh_token=def&type=magiclink',
      ),
    ).toBe(
      'https://app.hirelucius.com/auth/callback?redirect_to=%2Fdashboard#access_token=abc&refresh_token=def&type=magiclink',
    )
  })

  it('应保留原业务 query，同时剔除 auth query 参数', () => {
    expect(
      buildAuthCallbackRedirectUrl(
        'https://app.hirelucius.com/dashboard?company_id=company-1&token_hash=hash-1&type=magiclink',
      ),
    ).toBe(
      'https://app.hirelucius.com/auth/callback?redirect_to=%2Fdashboard%3Fcompany_id%3Dcompany-1&token_hash=hash-1&type=magiclink',
    )
  })

  it('auth/login 上带 token 时应回到真实业务落点，而不是继续把 login 当目标页', () => {
    expect(
      buildAuthCallbackRedirectUrl(
        'https://app.hirelucius.com/auth/login?redirect_to=%2Fdashboard#access_token=abc&refresh_token=def&type=magiclink',
      ),
    ).toBe(
      'https://app.hirelucius.com/auth/callback?redirect_to=%2Fdashboard#access_token=abc&refresh_token=def&type=magiclink',
    )
  })

  it('auth/login 上仅有错误参数时不应再次跳回 callback，避免死循环', () => {
    expect(
      buildAuthCallbackRedirectUrl(
        'https://app.hirelucius.com/auth/login?error=otp_expired&message=Email%20link%20is%20invalid%20or%20has%20expired',
      ),
    ).toBeNull()

    expect(
      buildAuthCallbackRedirectUrl(
        'https://app.hirelucius.com/auth/login?redirect_to=%2Fdashboard#error=access_denied&error_description=Email%20link%20is%20invalid%20or%20has%20expired',
      ),
    ).toBeNull()
  })

  it('非 auth 回跳 URL 不应重写', () => {
    expect(buildAuthCallbackRedirectUrl('https://app.hirelucius.com/dashboard')).toBeNull()
  })

  it('已经在 auth/callback 时不应再次重写', () => {
    expect(
      buildAuthCallbackRedirectUrl(
        'https://app.hirelucius.com/auth/callback?redirect_to=%2Fdashboard#access_token=abc',
      ),
    ).toBeNull()
  })
})
