import { afterEach, describe, expect, it, vi } from 'vitest'

import { isDemoMode } from '@/lib/demo/mode'

describe('demo mode detection', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('enables demo mode when the explicit flag is present', () => {
    vi.stubEnv('VITE_DEMO_MODE', 'true')

    expect(isDemoMode()).toBe(true)
  })

  it('falls back to demo mode during local development when Supabase env is missing', () => {
    vi.stubEnv('NODE_ENV', 'development')
    vi.stubEnv('VITE_DEMO_MODE', '')
    vi.stubEnv('VITE_SUPABASE_URL', '')
    vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', '')
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', '')

    expect(isDemoMode()).toBe(true)
  })

  it('stays in app mode when local development env already has Supabase public config', () => {
    vi.stubEnv('NODE_ENV', 'development')
    vi.stubEnv('VITE_DEMO_MODE', '')
    vi.stubEnv('VITE_SUPABASE_URL', 'https://demo.supabase.co')
    vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', 'sb_publishable_demo')

    expect(isDemoMode()).toBe(false)
  })
})
