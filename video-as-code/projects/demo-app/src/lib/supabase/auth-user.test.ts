import { describe, expect, it } from 'vitest'
import type { User } from '@supabase/supabase-js'

import { resolveSupabaseAuthUserEmail } from '@/lib/supabase/auth-user'

function createAuthUser(
  overrides: Partial<Pick<User, 'email' | 'user_metadata' | 'identities'>> = {},
): Pick<User, 'email' | 'user_metadata' | 'identities'> {
  return {
    email: null,
    user_metadata: {},
    identities: [],
    ...overrides,
  }
}

describe('auth-user', () => {
  it('应优先使用标准 user.email，并统一规范大小写与空白', () => {
    expect(
      resolveSupabaseAuthUserEmail(
        createAuthUser({
          email: '  Owner@Lucius.ai ',
          user_metadata: {
            email: 'ignored@example.com',
          },
        }),
      ),
    ).toBe('owner@lucius.ai')
  })

  it('根字段邮箱缺失时应回退到 user_metadata.email', () => {
    expect(
      resolveSupabaseAuthUserEmail(
        createAuthUser({
          user_metadata: {
            email: '  metadata-owner@lucius.ai ',
          },
        }),
      ),
    ).toBe('metadata-owner@lucius.ai')
  })

  it('OAuth 用户根字段邮箱缺失时应回退到 identity_data.email', () => {
    expect(
      resolveSupabaseAuthUserEmail(
        createAuthUser({
          identities: [
            {
              id: 'identity-google',
              user_id: 'user-1',
              identity_id: 'identity-google',
              provider: 'google',
              identity_data: {
                email: ' GoogleUser@Lucius.ai ',
              },
            },
          ],
        }),
      ),
    ).toBe('googleuser@lucius.ai')
  })

  it('没有任何可用邮箱时应返回 null', () => {
    expect(
      resolveSupabaseAuthUserEmail(
        createAuthUser({
          user_metadata: {
            email: 123,
          },
          identities: [
            {
              id: 'identity-github',
              user_id: 'user-1',
              identity_id: 'identity-github',
              provider: 'github',
              identity_data: {
                email: null,
              },
            },
          ],
        }),
      ),
    ).toBeNull()
  })
})
