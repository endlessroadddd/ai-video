import { describe, expect, it } from 'vitest'

import { __clientChatApiTestables } from '@/lib/server/client-chat-api'

describe('client-chat-api Supabase 错误提示转换', () => {
  it('应把 client_app_schema 的 Invalid schema 错误转成修复提示', () => {
    expect(
      __clientChatApiTestables.toReadableSupabaseErrorMessage({
        code: 'PGRST106',
        message: 'Invalid schema: client_app_schema',
      }),
    ).toContain('请先在 Dashboard -> Project Settings -> API -> Exposed schemas 中加入 `client_app_schema`。')
  })

  it('应把 schema 权限错误转成授权提示', () => {
    expect(
      __clientChatApiTestables.toReadableSupabaseErrorMessage({
        code: '42501',
        message: 'permission denied for schema client_app_schema',
      }),
    ).toBe('当前角色没有 `client_app_schema` schema 的访问权限，请补齐 schema usage 和表级授权后再重试。')
  })
})
