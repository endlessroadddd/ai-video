import type { SupabaseClient } from '@supabase/supabase-js'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import { m } from '@/paraglide/messages'

/**
 * 计费周期：
 * - 与数据库 enum `account.company_onboarding_billing_cycle_enum` 对齐；
 * - 页面切换 Monthly / Annually 时使用该类型，避免魔法字符串。
 */
export type CompanyOnboardingBillingCycle = 'monthly' | 'annually'

/**
 * Onboarding 状态：
 * - 与数据库 enum `account.company_onboarding_status_enum` 对齐。
 */
export type CompanyOnboardingStatus = 'not_started' | 'in_progress' | 'completed' | 'skipped'

/**
 * 当前客户端关心的公司 onboarding 进度字段：
 * - 重点用于“是否完成 onboarding”判断；
 * - 历史计划字段保留兼容，不再作为 onboarding 必经步骤。
 */
export type CompanyOnboardingProgress = {
  companyId: string
  userId: string
  status: CompanyOnboardingStatus
  currentStep: number
  companyInfoCompletedAt: string | null
  profileCompletedAt: string | null
  selectedPlanCode: string | null
  billingCycle: CompanyOnboardingBillingCycle | null
}

type CompanyOnboardingProgressRow = {
  company_id: string
  user_id: string
  status: CompanyOnboardingStatus
  current_step: number
  company_info_completed_at: string | null
  profile_completed_at: string | null
  selected_plan_code: string | null
  billing_cycle: CompanyOnboardingBillingCycle | null
}

type CompanyMemberRole = 'owner' | 'admin' | 'member'

type CompanyOnboardingQueryParams = {
  companyId: string
}

export const companyOnboardingKeys = {
  all: ['supabase', 'company-onboarding-progress'] as const,
  currentCompany: (params: CompanyOnboardingQueryParams) =>
    [...companyOnboardingKeys.all, params.companyId.trim()] as const,
}

/**
 * 读取当前登录用户：
 * - 后续所有 onboarding 读写都基于当前 user_id；
 * - 未登录直接抛错，交由上层路由守卫处理。
 */
async function getCurrentAuthUserId(supabase: SupabaseClient): Promise<string> {
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

  return user.id
}

/**
 * 数据库行转前端结构：
 * - 保持字段命名统一（camelCase）；
 * - 便于页面侧直接消费。
 */
function mapProgressRowToDomain(row: CompanyOnboardingProgressRow): CompanyOnboardingProgress {
  return {
    companyId: row.company_id,
    userId: row.user_id,
    status: row.status,
    currentStep: row.current_step,
    companyInfoCompletedAt: row.company_info_completed_at,
    profileCompletedAt: row.profile_completed_at,
    selectedPlanCode: row.selected_plan_code,
    billingCycle: row.billing_cycle,
  }
}

/**
 * 读取当前用户在当前公司的 onboarding 进度。
 * - 不存在记录时返回 null，表示尚未初始化。
 */
export async function getCurrentCompanyOnboardingProgress(
  supabase: SupabaseClient,
  payload: {
    companyId: string
  },
): Promise<CompanyOnboardingProgress | null> {
  const userId = await getCurrentAuthUserId(supabase)

  const { data, error } = await supabase
    .schema('account')
    .from('company_onboarding_progress')
    .select(
      'company_id, user_id, status, current_step, company_info_completed_at, profile_completed_at, selected_plan_code, billing_cycle',
    )
    .eq('company_id', payload.companyId)
    .eq('user_id', userId)
    .maybeSingle<CompanyOnboardingProgressRow>()

  if (error) {
    throw error
  }

  if (!data) {
    return null
  }

  return mapProgressRowToDomain(data)
}

/**
 * 浏览器端读取当前公司的 onboarding 进度：
 * - 对 `getCurrentCompanyOnboardingProgress` 做一层浏览器 client 适配；
 * - 供 TanStack Query 直接复用，避免页面每次挂载都重新手动校验。
 */
export async function fetchCurrentCompanyOnboardingProgress(
  payload: CompanyOnboardingQueryParams,
  supabase: SupabaseClient = getSupabaseBrowserClient(),
): Promise<CompanyOnboardingProgress | null> {
  const companyId = payload.companyId.trim()

  if (!companyId) {
    return null
  }

  return getCurrentCompanyOnboardingProgress(supabase, { companyId })
}

/**
 * 当前公司 onboarding 进度查询：
 * - 进入 dashboard 系列页面时复用缓存，避免重复闪整页 loading；
 * - onboarding 状态变更频率极低，适合较长的 staleTime。
 */
export function useCurrentCompanyOnboardingProgress(
  params: CompanyOnboardingQueryParams,
  options?: Omit<
    UseQueryOptions<
      CompanyOnboardingProgress | null,
      Error,
      CompanyOnboardingProgress | null,
      ReturnType<typeof companyOnboardingKeys.currentCompany>
    >,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery({
    queryKey: companyOnboardingKeys.currentCompany(params),
    queryFn: () => fetchCurrentCompanyOnboardingProgress(params),
    staleTime: 5 * 60_000,
    gcTime: 30 * 60_000,
    ...options,
  })
}

/**
 * 解析 dashboard 场景下的 onboarding 守卫跳转目标：
 * - owner 未完成时优先回公司资料页；
 * - invited admin/member 未完成时统一回个人资料页；
 * - 完成 onboarding 后返回 null，表示允许继续停留在 dashboard。
 */
export function resolveCompanyOnboardingRedirectTarget(payload: {
  memberRole: CompanyMemberRole | null
  progress: CompanyOnboardingProgress | null
}): '/onboarding/company-profile' | '/onboarding/profile' | null {
  const { memberRole, progress } = payload

  if (!progress) {
    return memberRole === 'owner' ? '/onboarding/company-profile' : '/onboarding/profile'
  }

  if (progress.status === 'completed') {
    return null
  }

  if (memberRole !== 'owner') {
    return '/onboarding/profile'
  }

  if (progress.currentStep >= 2) {
    return '/onboarding/profile'
  }

  return '/onboarding/company-profile'
}

/**
 * 第 1 步（公司信息）完成后推进到第 2 步（个人资料）：
 * - 用于强制 onboarding 顺序为：公司信息 -> 个人资料；
 * - 仅更新进度表，不绑定特定公司业务字段，避免受其它表权限影响。
 */
export async function markCurrentCompanyInfoStepCompleted(
  supabase: SupabaseClient,
  payload: {
    companyId: string
  },
): Promise<void> {
  const userId = await getCurrentAuthUserId(supabase)
  const nowISOString = new Date().toISOString()

  const { error } = await supabase
    .schema('account')
    .from('company_onboarding_progress')
    .upsert(
      {
        company_id: payload.companyId,
        user_id: userId,
        status: 'in_progress',
        current_step: 2,
        company_info_completed_at: nowISOString,
      },
      {
        onConflict: 'company_id,user_id',
      },
    )

  if (error) {
    throw error
  }
}

/**
 * 历史兼容：保存旧版“选择套餐”结果。
 * - 两步 onboarding 启用后，前端主流程不再调用该方法；
 * - 保留以兼容已上线数据结构与潜在后台补录脚本。
 */
export async function upsertCurrentCompanyPlanSelection(
  supabase: SupabaseClient,
  payload: {
    companyId: string
    selectedPlanCode: string
    billingCycle: CompanyOnboardingBillingCycle
  },
): Promise<void> {
  const userId = await getCurrentAuthUserId(supabase)
  const nowISOString = new Date().toISOString()

  const { error } = await supabase
    .schema('account')
    .from('company_onboarding_progress')
    .upsert(
      {
        company_id: payload.companyId,
        user_id: userId,
        status: 'completed',
        current_step: 3,
        selected_plan_code: payload.selectedPlanCode,
        billing_cycle: payload.billingCycle,
        plan_selected_at: nowISOString,
        completed_at: nowISOString,
      },
      {
        onConflict: 'company_id,user_id',
      },
    )

  if (error) {
    throw error
  }
}

/**
 * 第 2 步（个人资料）完成即结束 onboarding：
 * - 两步流程：公司信息 -> 个人资料；
 * - 完成后标记 `status=completed`，并把 `current_step` 固定为 2。
 */
export async function markCurrentCompanyProfileStepCompleted(
  supabase: SupabaseClient,
  payload: {
    companyId: string
  },
): Promise<void> {
  const userId = await getCurrentAuthUserId(supabase)
  const nowISOString = new Date().toISOString()

  const { error } = await supabase
    .schema('account')
    .from('company_onboarding_progress')
    .upsert(
      {
        company_id: payload.companyId,
        user_id: userId,
        status: 'completed',
        current_step: 2,
        profile_completed_at: nowISOString,
        completed_at: nowISOString,
      },
      {
        onConflict: 'company_id,user_id',
      },
    )

  if (error) {
    throw error
  }
}
