import type { SupabaseClient } from '@supabase/supabase-js'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

import { getSupabaseBrowserClient } from '@/lib/supabase/client'

export type CompanyMemberRole = 'owner' | 'admin' | 'member'

export type UserCompany = {
  companyId: string
  companyName: string
  logoUrl: string | null
  memberRole: CompanyMemberRole
}

type CompanyMembershipRow = {
  company_id?: string | null
  role?: CompanyMemberRole | null
}

type CompanyRow = {
  id?: string | null
  company_name?: string | null
}

export const companyKeys = {
  all: ['supabase', 'company-membership'] as const,
  byCurrentUser: () => [...companyKeys.all, 'current-user'] as const,
}

/**
 * 将查询结果映射为前端可渲染结构。
 */
function mapMembershipRows(rows: CompanyMembershipRow[]): UserCompany[] {
  const mapped: UserCompany[] = []

  rows.forEach((row) => {
    const companyId = row.company_id || null
    const memberRole = row.role || 'member'

    if (!companyId) {
      return
    }

    mapped.push({
      companyId,
      companyName: companyId,
      logoUrl: null,
      memberRole,
    })
  })

  return mapped
}

/**
 * 将单个公司成员关系合并进现有列表：
 * - 已存在时原位更新，避免同一 company 出现重复项；
 * - 不存在时追加到末尾，供邀请接收后的本地缓存即时补齐。
 */
export function upsertUserCompany(
  userCompanies: UserCompany[],
  nextCompany: UserCompany,
): UserCompany[] {
  const matchedIndex = userCompanies.findIndex((company) => company.companyId === nextCompany.companyId)
  if (matchedIndex < 0) {
    return [...userCompanies, nextCompany]
  }

  return userCompanies.map((company, index) => (index === matchedIndex ? nextCompany : company))
}

/**
 * 查询当前登录用户关联的所有公司。
 *
 * 成员真源约定：
 * - 主表：`permission.organization_member`
 * - 关联字段：`company_id`
 * - 用户字段：`user_id`
 * - 状态字段：`status=active`
 */
export async function fetchCurrentUserCompanies(
  supabase: SupabaseClient = getSupabaseBrowserClient(),
): Promise<UserCompany[]> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    throw userError
  }

  if (!user?.id) {
    return []
  }

  const membershipResult = await supabase
    .schema('permission')
    .from('organization_member')
    .select('company_id, role')
    .eq('user_id', user.id)
    .eq('status', 'active')

  if (membershipResult.error) {
    throw membershipResult.error
  }

  const membershipRows: CompanyMembershipRow[] = (membershipResult.data || []) as CompanyMembershipRow[]
  const companies = mapMembershipRows(membershipRows)
  const companyIds = companies.map((item) => item.companyId)

  if (companyIds.length === 0) {
    return []
  }

  const companyResult = await supabase
    .from('company')
    .select('id, company_name')
    .in('id', companyIds)

  if (companyResult.error) {
    throw companyResult.error
  }

  const companyRows: CompanyRow[] = (companyResult.data || []) as CompanyRow[]
  const companyNameMap = new Map<string, string>()

  companyRows.forEach((row) => {
    if (!row.id) {
      return
    }

    companyNameMap.set(row.id, row.company_name || row.id)
  })

  return companies.map((item) => ({
    ...item,
    companyName: companyNameMap.get(item.companyId) || item.companyId,
  }))
}

export function useCurrentUserCompanies(
  options?: Omit<
    UseQueryOptions<UserCompany[], Error, UserCompany[], ReturnType<typeof companyKeys.byCurrentUser>>,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery({
    queryKey: companyKeys.byCurrentUser(),
    queryFn: () => fetchCurrentUserCompanies(),
    staleTime: 60_000,
    ...options,
  })
}
