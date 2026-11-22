import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  buildAuthCallbackUrl,
  buildCanonicalAppUrl,
  getConfiguredPublicAppOrigin,
} from '@/lib/public-app-url'

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('public-app-url', () => {
  it('未配置 VITE_APP_URL 时应返回 null 并继续使用当前 origin', () => {
    expect(getConfiguredPublicAppOrigin()).toBeNull()
    expect(buildCanonicalAppUrl('https://lucius-production.up.railway.app/auth/login')).toBeNull()
    expect(buildAuthCallbackUrl('https://lucius-production.up.railway.app', '/dashboard')).toBe(
      'https://lucius-production.up.railway.app/auth/callback?redirect_to=%2Fdashboard',
    )
  })

  it('配置 canonical origin 后应把当前页面重写到统一公网域名', () => {
    vi.stubEnv('VITE_APP_URL', 'https://app.hirelucius.com')

    expect(
      buildCanonicalAppUrl(
        'https://lucius-production.up.railway.app/auth/callback?redirect_to=%2Fdashboard&code=abc#state=1',
      ),
    ).toBe(
      'https://app.hirelucius.com/auth/callback?redirect_to=%2Fdashboard&code=abc#state=1',
    )
  })

  it('auth callback url 应优先使用配置的 canonical origin', () => {
    vi.stubEnv('VITE_APP_URL', 'https://app.hirelucius.com')

    expect(buildAuthCallbackUrl('https://lucius-production.up.railway.app', '/dashboard')).toBe(
      'https://app.hirelucius.com/auth/callback?redirect_to=%2Fdashboard',
    )
  })
})
