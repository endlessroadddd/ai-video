import { afterEach, describe, expect, it, vi } from 'vitest'

import { getSupabasePublicEnv, getSupabaseServiceEnv } from '@/lib/supabase/env'


afterEach(() => {
  vi.unstubAllEnvs()
})


function getMutableImportMetaEnv(): Record<string, string | undefined> {
  return (import.meta as ImportMeta & {
    env: Record<string, string | undefined>
  }).env
}

describe('supabase env compatibility', () => {
  it('应优先读取新的 publishable key 环境变量', () => {
    vi.stubEnv('VITE_SUPABASE_URL', 'https://demo.supabase.co')
    vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', 'sb_publishable_new')
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'legacy-anon')

    expect(getSupabasePublicEnv()).toEqual(expect.objectContaining({
      publicKey: 'sb_publishable_new',
    }))
  })

  it('缺少新变量时应继续兼容旧的 anon key', () => {
    const importMetaEnv = getMutableImportMetaEnv()
    const restoreImportMetaEnv = replaceImportMetaEnv({
      ...importMetaEnv,
      VITE_SUPABASE_PUBLISHABLE_KEY: undefined,
      VITE_SUPABASE_ANON_KEY: undefined,
    })

    vi.stubEnv('VITE_SUPABASE_URL', 'https://demo.supabase.co')
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'legacy-anon')

    try {
      expect(getSupabasePublicEnv()).toEqual(expect.objectContaining({
        publicKey: 'legacy-anon',
      }))
    } finally {
      restoreImportMetaEnv()
    }
  })

  it('服务端高权限配置应优先读取 SUPABASE_SECRET_KEY', () => {
    vi.stubEnv('VITE_SUPABASE_URL', 'https://demo.supabase.co')
    vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', 'sb_publishable_new')
    vi.stubEnv('SUPABASE_SECRET_KEY', 'sb_secret_new')
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'legacy-service-role')

    expect(getSupabaseServiceEnv()).toEqual(expect.objectContaining({
      adminKey: 'sb_secret_new',
    }))
  })

  it('服务端高权限配置应兼容旧的 service role key', () => {
    vi.stubEnv('VITE_SUPABASE_URL', 'https://demo.supabase.co')
    vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', 'sb_publishable_new')
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'legacy-service-role')

    expect(getSupabaseServiceEnv()).toEqual(expect.objectContaining({
      adminKey: 'legacy-service-role',
    }))
  })
})
