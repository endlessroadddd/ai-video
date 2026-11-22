import type { PostgrestError, SupabaseClient, User } from '@supabase/supabase-js'

import { m } from '@/paraglide/messages'

/**
 * 用户资料结构：
 * - `displayName`：用户昵称，展示在客户端 UI。
 * - `avatarUrl`：头像访问地址，优先使用 Supabase Storage public URL。
 */
export type UserProfile = {
  displayName: string
  avatarUrl: string | null
  avatarStoragePath: string | null
}

/**
 * 资料缓存事件名：
 * - 在同一个浏览器标签页内，页面保存后可即时通知 Header 更新昵称/头像；
 * - 结合 localStorage 持久化，可解决刷新后短暂空白体验。
 */
export const COMPANY_USER_PROFILE_CACHE_UPDATED_EVENT = 'company-user-profile-cache-updated'

/**
 * 资料缓存事件载荷：
 * - 用于订阅端（例如 Header）精准匹配公司与用户邮箱。
 */
export type CompanyUserProfileCacheEventDetail = {
  companyId: string
  userEmail: string
  profile: UserProfile
}

/**
 * 头像上传配置：
 * - bucket 默认为 `user-avatars`；
 * - 文件按用户 ID 分目录，固定写入 `profile-avatar`，便于覆盖更新。
 */
const USER_AVATAR_BUCKET = 'user-avatars'
const COMPANY_USER_PROFILE_CACHE_KEY_PREFIX = 'company-user-profile-cache:v1'

/**
 * 资料表行结构（account.company_user_profile）。
 */
type CompanyUserProfileRow = {
  company_id: string
  user_id: string
  display_name: string
  avatar_url: string | null
  avatar_storage_path: string | null
}

/**
 * 判断当前是否处于浏览器环境：
 * - SSR 阶段没有 `window`，不能访问 localStorage；
 * - 通过该判断保证服务函数在浏览器/服务端都可安全调用。
 */
function isBrowserRuntime(): boolean {
  return typeof window !== 'undefined'
}

/**
 * 规范化邮箱作为缓存 key 片段，避免大小写差异导致重复缓存。
 */
function normalizeEmailForCache(userEmail: string): string {
  return userEmail.trim().toLowerCase()
}

/**
 * 生成公司用户资料缓存 key：
 * - key 维度：公司 + 用户邮箱；
 * - 这样同一个用户切换公司时，缓存互不污染。
 */
function buildCompanyUserProfileCacheKey(payload: {
  companyId: string
  userEmail: string
}): string {
  const normalizedEmail = normalizeEmailForCache(payload.userEmail)
  return `${COMPANY_USER_PROFILE_CACHE_KEY_PREFIX}:${payload.companyId}:${normalizedEmail}`
}

/**
 * 对资料结构做最小规范化：
 * - 昵称统一 trim，避免出现纯空格；
 * - 头像字段统一为 string|null，防御异常值。
 */
function normalizeUserProfileForCache(profile: UserProfile): UserProfile {
  return {
    displayName: profile.displayName.trim(),
    avatarUrl: typeof profile.avatarUrl === 'string' ? profile.avatarUrl : null,
    avatarStoragePath: typeof profile.avatarStoragePath === 'string' ? profile.avatarStoragePath : null,
  }
}

/**
 * 读取本地缓存的公司用户资料（同步）：
 * - Header 可在首屏同步使用该函数回显昵称/头像，减少闪烁。
 */
export function readCachedCompanyUserProfile(payload: {
  companyId: string
  userEmail: string
}): UserProfile | null {
  if (!isBrowserRuntime()) {
    return null
  }

  try {
    const storageKey = buildCompanyUserProfileCacheKey(payload)
    const rawValue = window.localStorage.getItem(storageKey)
    if (!rawValue) {
      return null
    }

    const parsedValue = JSON.parse(rawValue) as Partial<UserProfile>
    if (typeof parsedValue.displayName !== 'string') {
      return null
    }

    return normalizeUserProfileForCache({
      displayName: parsedValue.displayName,
      avatarUrl: typeof parsedValue.avatarUrl === 'string' ? parsedValue.avatarUrl : null,
      avatarStoragePath: typeof parsedValue.avatarStoragePath === 'string' ? parsedValue.avatarStoragePath : null,
    })
  } catch {
    return null
  }
}

/**
 * 写入本地缓存并广播更新事件：
 * - 持久化用于刷新后秒回显；
 * - 事件通知用于同页实时更新（如设置页保存后侧边栏立即变更）。
 */
export function writeCachedCompanyUserProfile(payload: {
  companyId: string
  userEmail: string
  profile: UserProfile
}): void {
  if (!isBrowserRuntime()) {
    return
  }

  const normalizedProfile = normalizeUserProfileForCache(payload.profile)

  try {
    const storageKey = buildCompanyUserProfileCacheKey({
      companyId: payload.companyId,
      userEmail: payload.userEmail,
    })
    window.localStorage.setItem(storageKey, JSON.stringify(normalizedProfile))
  } catch {
    // localStorage 失败时降级为仅内存事件通知，避免阻断主流程
  }

  const eventDetail: CompanyUserProfileCacheEventDetail = {
    companyId: payload.companyId,
    userEmail: normalizeEmailForCache(payload.userEmail),
    profile: normalizedProfile,
  }

  window.dispatchEvent(
    new CustomEvent<CompanyUserProfileCacheEventDetail>(COMPANY_USER_PROFILE_CACHE_UPDATED_EVENT, {
      detail: eventDetail,
    }),
  )
}

/**
 * 从 Supabase Auth 的 `user_metadata` 中读取资料字段。
 */
function readProfileFromUserMetadata(user: User): UserProfile {
  const metadata = (user.user_metadata || {}) as Record<string, unknown>
  const displayNameRaw = metadata.display_name
  const avatarUrlRaw = metadata.avatar_url

  return {
    displayName: typeof displayNameRaw === 'string' ? displayNameRaw : '',
    avatarUrl: typeof avatarUrlRaw === 'string' ? avatarUrlRaw : null,
    avatarStoragePath: null,
  }
}

/**
 * 获取当前已登录用户。
 * - 所有资料读写动作都以这个用户身份为准。
 */
async function getCurrentAuthUser(
  supabase: SupabaseClient,
): Promise<{
  userId: string
  email: string | null
  fallbackProfile: UserProfile
}> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    throw error
  }

  if (!user) {
    throw new Error(m.service_login_required())
  }

  return {
    userId: user.id,
    email: user.email || null,
    fallbackProfile: readProfileFromUserMetadata(user),
  }
}

/**
 * 将数据库行映射为前端资料结构。
 */
function mapCompanyProfileRow(row: CompanyUserProfileRow): UserProfile {
  return {
    displayName: row.display_name,
    avatarUrl: row.avatar_url,
    avatarStoragePath: row.avatar_storage_path,
  }
}

/**
 * 读取当前用户在指定公司下的资料：
 * - 主来源：`account.company_user_profile`；
 * - 兼容回退：若该公司还没有资料行，回退到 auth metadata（便于平滑迁移）。
 */
export async function getCurrentCompanyUserProfile(
  supabase: SupabaseClient,
  payload: {
    companyId: string
  },
): Promise<{
  companyId: string
  userId: string
  email: string | null
  profile: UserProfile
}> {
  const { companyId } = payload
  const { userId, email, fallbackProfile } = await getCurrentAuthUser(supabase)

  const { data, error } = await supabase
    .schema('account')
    .from('company_user_profile')
    .select('company_id, user_id, display_name, avatar_url, avatar_storage_path')
    .eq('company_id', companyId)
    .eq('user_id', userId)
    .maybeSingle<CompanyUserProfileRow>()

  if (error) {
    throw error
  }

  const resolvedProfile = data ? mapCompanyProfileRow(data) : fallbackProfile

  if (email) {
    writeCachedCompanyUserProfile({
      companyId,
      userEmail: email,
      profile: resolvedProfile,
    })
  }

  return {
    companyId,
    userId,
    email,
    profile: resolvedProfile,
  }
}

/**
 * 上传头像并返回可直接访问的 public URL。
 *
 * 注意：
 * - 该实现依赖 bucket 已创建，且 RLS/Storage Policy 允许当前用户写入自己的目录。
 */
export async function uploadUserAvatar(
  supabase: SupabaseClient,
  payload: {
    companyId: string
    userId: string
    file: File
  },
): Promise<{
  publicUrl: string
  storagePath: string
}> {
  const { companyId, userId, file } = payload
  const fileExtension = file.name.includes('.') ? file.name.split('.').pop() || 'png' : 'png'
  const objectPath = `${companyId}/${userId}/profile-avatar.${fileExtension.toLowerCase()}`

  const { error: uploadError } = await supabase.storage.from(USER_AVATAR_BUCKET).upload(objectPath, file, {
    cacheControl: '3600',
    upsert: true,
    contentType: file.type || 'image/png',
  })

  if (uploadError) {
    throw uploadError
  }

  const { data } = supabase.storage.from(USER_AVATAR_BUCKET).getPublicUrl(objectPath)

  if (!data.publicUrl) {
    throw new Error(m.service_avatar_public_url_missing())
  }

  return {
    publicUrl: data.publicUrl,
    storagePath: objectPath,
  }
}

/**
 * 昵称冲突友好报错：
 * - PostgreSQL 唯一冲突为 `23505`；
 * - 约束名命中 `uk_company_user_profile_company_display_name` 时给业务可读错误。
 */
function normalizeProfileWriteError(error: PostgrestError): Error {
  const uniqueNicknameConstraintName = 'uk_company_user_profile_company_display_name'
  if (
    error.code === '23505' &&
    typeof error.message === 'string' &&
    error.message.includes(uniqueNicknameConstraintName)
  ) {
    return new Error(m.service_profile_name_conflict())
  }

  if (error.code === '42501') {
    return new Error(m.service_profile_member_inactive())
  }

  return error
}

/**
 * 更新当前用户在公司下的资料到 `account.company_user_profile`：
 * - `onConflict: company_id,user_id`，保证“有则更新、无则创建”。
 */
export async function upsertCurrentCompanyUserProfile(
  supabase: SupabaseClient,
  payload: {
    companyId: string
    profile: UserProfile
  },
): Promise<void> {
  const { companyId, profile } = payload
  const normalizedProfile = normalizeUserProfileForCache(profile)
  const { userId, email } = await getCurrentAuthUser(supabase)

  const { error } = await supabase.schema('account').from('company_user_profile').upsert({
    company_id: companyId,
    user_id: userId,
    display_name: normalizedProfile.displayName,
    avatar_url: normalizedProfile.avatarUrl,
    avatar_storage_path: normalizedProfile.avatarStoragePath,
  }, {
    onConflict: 'company_id,user_id',
  })

  if (error) {
    throw normalizeProfileWriteError(error)
  }

  if (email) {
    writeCachedCompanyUserProfile({
      companyId,
      userEmail: email,
      profile: normalizedProfile,
    })
  }
}
