import type { SupabaseClient } from '@supabase/supabase-js'

import {
  getCurrentCompanyOnboardingProgress,
  type CompanyOnboardingProgress,
} from '@/lib/services/company-onboarding-progress'
import {
  fetchCurrentUserCompanies,
  type UserCompany,
} from '@/lib/services/company-membership-query'

/**
 * 已登录用户的统一默认落点：
 * - 根路径 `/`；
 * - 登录页未携带 redirect_to；
 * - 鉴权回调缺少明确业务页时；
 * 都统一回到事件页，避免继续停留在旧的 `/dashboard`。
 */
export const DEFAULT_AUTHENTICATED_PATH = '/dashboard/event'
/**
 * Onboarding 完成后的首屏落点：
 * - 与“通用已登录默认落点”分离，避免影响其他登录 / 回流场景；
 * - 首次完成 onboarding 后优先进入 chat，新用户可以直接开始对话；
 * - 仅应在“明确已完成 onboarding”的页面流转里使用，不能替代通用鉴权默认首页。
 */
export const POST_ONBOARDING_COMPLETION_PATH = '/chat'
export const ONBOARDING_COMPANY_PROFILE_PATH = '/onboarding/company-profile'
export const ONBOARDING_PROFILE_PATH = '/onboarding/profile'

export type AuthenticatedEntryReason =
  | 'missing-company'
  | 'complete-company-info'
  | 'complete-profile'
  | 'completed'

export type AuthenticatedEntryResolution = {
  targetPath: string
  companyId: string | null
  reason: AuthenticatedEntryReason
}

type ProgressSnapshot = Pick<CompanyOnboardingProgress, 'status' | 'currentStep'> | null

type ResolveEntryFromContextPayload = {
  activeCompany: Pick<UserCompany, 'companyId' | 'memberRole'> | null
  progress: ProgressSnapshot
  preferredPath?: string | null
}

type ResolveAuthenticatedEntryPathPayload = {
  preferredPath?: string | null
  selectedCompanyId?: string | null
}

function normalizePreferredPath(preferredPath?: string | null): string {
  const normalizedPath = preferredPath?.trim() || ''

  if (!normalizedPath || normalizedPath === '/') {
    return DEFAULT_AUTHENTICATED_PATH
  }

  return normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`
}

function shouldRespectPreferredPath(preferredPath: string): boolean {
  if (!preferredPath || preferredPath === DEFAULT_AUTHENTICATED_PATH) {
    return false
  }

  if (preferredPath.startsWith('/auth/')) {
    return false
  }

  if (preferredPath.startsWith('/onboarding/')) {
    return false
  }

  return true
}

function isInvitePath(preferredPath: string): boolean {
  return preferredPath.startsWith('/invite/')
}

/**
 * 从“当前用户公司列表 + 本地缓存 company_id”中选出生效公司：
 * - 优先使用仍然有效的本地选择；
 * - 否则回退到第一家有效公司，保证登录后落点稳定。
 */
export function resolveActiveCompany(payload: {
  userCompanies: UserCompany[]
  selectedCompanyId?: string | null
}): UserCompany | null {
  const { userCompanies, selectedCompanyId = null } = payload

  if (userCompanies.length === 0) {
    return null
  }

  if (selectedCompanyId) {
    const matchedCompany = userCompanies.find((company) => company.companyId === selectedCompanyId)
    if (matchedCompany) {
      return matchedCompany
    }
  }

  return userCompanies[0]
}

/**
 * 纯判定函数：
 * - 新用户无公司时，必须进入“创建首个工作区”；
 * - owner 未完成公司资料时先补公司；
 * - owner/admin/member 未完成个人资料时进入 profile；
 * - 仅在 onboarding 已完成时才回到用户原始目标页。
 */
export function resolveAuthenticatedEntryFromContext(
  payload: ResolveEntryFromContextPayload,
): AuthenticatedEntryResolution {
  const normalizedPreferredPath = normalizePreferredPath(payload.preferredPath)
  const completedTargetPath = shouldRespectPreferredPath(normalizedPreferredPath)
    ? normalizedPreferredPath
    : DEFAULT_AUTHENTICATED_PATH

  if (!payload.activeCompany) {
    /**
     * 邀请链接登录后的第一落点必须先回邀请页：
     * - 通用邀请链接是在邀请页里完成“自动入组”；
     * - 如果这里直接跳去创建公司，会把受邀用户误当成首登 owner 流程。
     */
    if (isInvitePath(normalizedPreferredPath)) {
      return {
        targetPath: normalizedPreferredPath,
        companyId: null,
        reason: 'missing-company',
      }
    }

    return {
      targetPath: ONBOARDING_COMPANY_PROFILE_PATH,
      companyId: null,
      reason: 'missing-company',
    }
  }

  const { activeCompany, progress } = payload

  if (activeCompany.memberRole !== 'owner') {
    if (!progress || progress.status !== 'completed') {
      return {
        targetPath: ONBOARDING_PROFILE_PATH,
        companyId: activeCompany.companyId,
        reason: 'complete-profile',
      }
    }

    return {
      targetPath: completedTargetPath,
      companyId: activeCompany.companyId,
      reason: 'completed',
    }
  }

  if (!progress) {
    return {
      targetPath: ONBOARDING_COMPANY_PROFILE_PATH,
      companyId: activeCompany.companyId,
      reason: 'complete-company-info',
    }
  }

  if (progress.status === 'completed') {
    return {
      targetPath: completedTargetPath,
      companyId: activeCompany.companyId,
      reason: 'completed',
    }
  }

  if (progress.currentStep >= 2) {
    return {
      targetPath: ONBOARDING_PROFILE_PATH,
      companyId: activeCompany.companyId,
      reason: 'complete-profile',
    }
  }

  return {
    targetPath: ONBOARDING_COMPANY_PROFILE_PATH,
    companyId: activeCompany.companyId,
    reason: 'complete-company-info',
  }
}

/**
 * 登录后统一解析真实落点：
 * - 先读取当前用户可访问的公司；
 * - 再结合 onboarding 进度计算应该进入的页面；
 * - 返回推荐 company_id，供调用方同步本地缓存。
 */
export async function resolveAuthenticatedEntryPath(
  supabase: SupabaseClient,
  payload: ResolveAuthenticatedEntryPathPayload = {},
): Promise<AuthenticatedEntryResolution> {
  const userCompanies = await fetchCurrentUserCompanies(supabase)
  const activeCompany = resolveActiveCompany({
    userCompanies,
    selectedCompanyId: payload.selectedCompanyId,
  })

  if (!activeCompany) {
    return resolveAuthenticatedEntryFromContext({
      activeCompany: null,
      progress: null,
      preferredPath: payload.preferredPath,
    })
  }

  const progress = await getCurrentCompanyOnboardingProgress(supabase, {
    companyId: activeCompany.companyId,
  })

  return resolveAuthenticatedEntryFromContext({
    activeCompany,
    progress,
    preferredPath: payload.preferredPath,
  })
}
