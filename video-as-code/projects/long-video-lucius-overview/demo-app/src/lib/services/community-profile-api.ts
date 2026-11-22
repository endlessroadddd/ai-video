import type { SupabaseClient } from '@supabase/supabase-js'

// ---- Supabase 直查：平台概览 + 每日新增 ----

export type PlatformOverview = {
  platform: string
  totalUsers: number
}

/**
 * 查询各平台用户总数。
 */
export async function fetchPlatformOverview(
  supabase: SupabaseClient,
  companyId: string,
): Promise<PlatformOverview[]> {
  const { data, error } = await supabase
    .schema('user_profile')
    .from('user_insights')
    .select('platform')
    .eq('company_id', companyId)

  if (error) {
    throw new Error(`查询平台用户数失败：${error.message}`)
  }

  const countMap = new Map<string, number>()
  for (const row of data || []) {
    const p = (row as { platform: string }).platform
    countMap.set(p, (countMap.get(p) || 0) + 1)
  }

  return Array.from(countMap.entries()).map(([platform, totalUsers]) => ({
    platform,
    totalUsers,
  }))
}

export type DailyNewUsersItem = {
  platform: string
  date: string
  newUsers: number
}

/**
 * 查询各平台每日新增用户（近 N 天）。
 */
export async function fetchDailyNewUsers(
  supabase: SupabaseClient,
  companyId: string,
  days: number = 30,
): Promise<DailyNewUsersItem[]> {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)
  const cutoffStr = cutoffDate.toISOString().split('T')[0]

  const { data, error } = await supabase
    .schema('user_profile')
    .from('user_insights')
    .select('platform, first_message_at')
    .eq('company_id', companyId)
    .gte('first_message_at', cutoffStr)

  if (error) {
    throw new Error(`查询每日新增用户失败：${error.message}`)
  }

  const countMap = new Map<string, number>()
  for (const row of data || []) {
    const r = row as { platform: string; first_message_at: string }
    if (!r.first_message_at) {
      continue
    }
    const key = `${r.platform}|${r.first_message_at}`
    countMap.set(key, (countMap.get(key) || 0) + 1)
  }

  return Array.from(countMap.entries())
    .map(([key, newUsers]) => {
      const [platform, date] = key.split('|')
      return { platform, date, newUsers }
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}

// ---- 后端接口：每日活跃用户 ----

export type DailyActiveUsersItem = {
  platform: string
  date: string
  active_users: number
}

type DailyActiveUsersApiResponse = {
  company_id: string
  days: number
  records: DailyActiveUsersItem[]
}

/**
 * 查询各平台每日活跃用户数（通过服务端代理转发到 lucius-user-profile）。
 */
export async function fetchDailyActiveUsers(
  companyId: string,
  days: number = 30,
): Promise<DailyActiveUsersItem[]> {
  const params = new URLSearchParams({
    company_id: companyId,
    days: String(days),
  })

  const response = await fetch(
    `/api/user-profile/insights/daily-active?${params.toString()}`,
  )

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`查询每日活跃用户失败：${text}`)
  }

  const body = (await response.json()) as DailyActiveUsersApiResponse
  return body.records
}
