import type { PostgrestError, SupabaseClient } from '@supabase/supabase-js'

import { m } from '@/paraglide/messages'

/**
 * 公司基础信息结构：
 * - onboarding 第一步使用该结构读写公司名称与简介；
 * - 与 `public.company` 表字段对齐。
 */
export type CompanyInfo = {
  companyName: string
  website: string | null
  description: string | null
}

type CompanyRow = {
  id: string
  company_name: string | null
  website: string | null
  description: string | null
}

/**
 * 规范化公司信息输入：
 * - 公司名默认 trim，避免纯空格；
 * - 可选字段空串统一转 `null`，减少脏数据。
 */
function normalizeCompanyInfoInput(companyInfo: CompanyInfo): CompanyInfo {
  const normalizedName = companyInfo.companyName.trim()
  const normalizedWebsite = companyInfo.website?.trim() || null
  const normalizedDescription = companyInfo.description?.trim() || null

  return {
    companyName: normalizedName,
    website: normalizedWebsite,
    description: normalizedDescription,
  }
}

/**
 * 将 PostgREST 错误转换为业务友好文案。
 */
function normalizeCompanyInfoWriteError(error: PostgrestError): Error {
  if (error.code === '42501') {
    return new Error(m.service_company_update_permission_denied())
  }

  return error
}

function normalizeBootstrapCreateErrorMessage(message: string | undefined): string {
  const normalizedMessage = message?.trim() || ''
  return normalizedMessage || m.service_workspace_create_failed()
}

/**
 * 读取指定公司的基础信息：
 * - 仅用于当前登录用户已加入公司的场景；
 * - 未找到公司时抛业务错误，交由页面统一处理。
 */
export async function getCompanyInfoById(
  supabase: SupabaseClient,
  payload: {
    companyId: string
  },
): Promise<CompanyInfo> {
  const { data, error } = await supabase
    .from('company')
    .select('id, company_name, website, description')
    .eq('id', payload.companyId)
    .maybeSingle<CompanyRow>()

  if (error) {
    throw error
  }

  if (!data) {
    throw new Error(m.service_company_not_found())
  }

  return {
    companyName: data.company_name || '',
    website: data.website,
    description: data.description,
  }
}

/**
 * 更新指定公司的基础信息：
 * - onboarding 第一步提交时调用；
 * - 写入 `public.company`，后续侧边栏公司名可直接复用。
 */
export async function updateCompanyInfoById(
  supabase: SupabaseClient,
  payload: {
    companyId: string
    companyInfo: CompanyInfo
  },
): Promise<void> {
  const normalizedCompanyInfo = normalizeCompanyInfoInput(payload.companyInfo)

  if (!normalizedCompanyInfo.companyName) {
    throw new Error(m.service_company_name_required())
  }

  const { error } = await supabase
    .from('company')
    .update({
      company_name: normalizedCompanyInfo.companyName,
      website: normalizedCompanyInfo.website,
      description: normalizedCompanyInfo.description,
    })
    .eq('id', payload.companyId)

  if (error) {
    throw normalizeCompanyInfoWriteError(error)
  }
}

/**
 * 为“无公司”的新用户创建首个工作区，并自动建立成员关系：
 * - 改为调用服务端 onboarding bootstrap 接口；
 * - 由服务端使用 service-role 原子性更强地代办 `company + owner membership`；
 * - 返回新公司 ID，供后续 onboarding 继续流程。
 */
export async function createFirstCompanyForCurrentUser(
  payload: {
    companyInfo: CompanyInfo
  },
): Promise<{
  companyId: string
}> {
  const normalizedCompanyInfo = normalizeCompanyInfoInput(payload.companyInfo)
  if (!normalizedCompanyInfo.companyName) {
    throw new Error(m.service_company_name_required())
  }

  const response = await fetch('/api/onboarding/companies', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      companyInfo: normalizedCompanyInfo,
    }),
  })

  const payloadJson = (await response.json().catch(() => ({}))) as {
    companyId?: string
    error?: string
  }

  if (!response.ok) {
    throw new Error(normalizeBootstrapCreateErrorMessage(payloadJson.error))
  }

  if (!payloadJson.companyId) {
    throw new Error(m.service_workspace_create_missing_company_id())
  }

  return {
    companyId: payloadJson.companyId,
  }
}
