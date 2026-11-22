import type { User, UserIdentity } from '@supabase/supabase-js'

type StringRecord = Record<string, unknown>

function normalizeEmailValue(value: string | null | undefined): string | null {
  const normalizedValue = value?.trim().toLowerCase() || ''
  return normalizedValue || null
}

function readStringField(record: StringRecord, key: string): string | null {
  const rawValue = record[key]
  return typeof rawValue === 'string' ? rawValue : null
}

function resolveIdentityEmail(identity: UserIdentity): string | null {
  const identityData = (identity.identity_data || {}) as StringRecord
  return normalizeEmailValue(readStringField(identityData, 'email'))
}

/**
 * 统一解析 Supabase Auth 用户邮箱：
 * - 首选标准字段 `user.email`；
 * - 其次读取 OAuth identity 上的邮箱，避免 linked identity 用户根字段为空时误判；
 * - 最后兼容部分历史数据落在 `user_metadata.email` 的场景；
 * - 统一 trim + lowercase，避免后续成员关系与通知目标出现大小写脏数据。
 */
export function resolveSupabaseAuthUserEmail(
  user: Pick<User, 'email' | 'user_metadata' | 'identities'>,
): string | null {
  const primaryEmail = normalizeEmailValue(user.email)
  if (primaryEmail) {
    return primaryEmail
  }

  const identities = Array.isArray(user.identities) ? user.identities : []

  for (const identity of identities) {
    const identityEmail = resolveIdentityEmail(identity)
    if (identityEmail) {
      return identityEmail
    }
  }

  const userMetadata = (user.user_metadata || {}) as StringRecord
  const metadataEmail = normalizeEmailValue(readStringField(userMetadata, 'email'))
  if (metadataEmail) {
    return metadataEmail
  }

  return null
}
