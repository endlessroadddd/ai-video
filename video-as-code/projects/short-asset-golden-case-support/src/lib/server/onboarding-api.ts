import { createSupabaseServerClientForRequest, createSupabaseServiceRoleClient } from '@/lib/supabase/server'
import { resolveSupabaseAuthUserEmail } from '@/lib/supabase/auth-user'
import { buildDefaultCompanyFlowSeedRows } from '@/lib/default-company-flows'
import { buildDefaultCompanyIdentitySeedRow } from '@/lib/default-company-identity'
import {
  buildDefaultEmailNotificationTargetSeedRows,
  buildDefaultEventTypeConfigSeedRows,
} from '@/lib/default-company-event-types'

type ApiError = {
  status: number
  message: string
}

type AuthenticatedUser = {
  id: string
  email: string | null
}

type BootstrapCompanyRequest = {
  companyInfo?: {
    companyName?: string | null
    website?: string | null
    description?: string | null
  }
}

type CompanyInsertRow = {
  id: string
}

type ExistingMembershipRow = {
  company_id: string
}

type OrganizationMemberUpsertRow = {
  id: string
}

type EventTypeConfigSeedResultRow = {
  id: string
  type_key: string
}

type NormalizedCompanyInfo = {
  companyName: string
  website: string | null
  description: string | null
}

const MIN_COMPANY_NAME_LENGTH = 2
const MAX_COMPANY_NAME_LENGTH = 64

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}

function createApiError(status: number, message: string): ApiError {
  return {
    status,
    message,
  }
}

/**
 * 格式化 onboarding bootstrap 的数据库写入错误：
 * - 对已知授权缺失场景给出可执行提示；
 * - 其它错误保持原始数据库消息，便于排查。
 */
function formatBootstrapDatabaseError(stepLabel: string, errorMessage: string): string {
  const normalizedMessage = errorMessage.trim().toLowerCase()

  if (normalizedMessage.includes('permission denied for schema lucius_agent')) {
    return `${stepLabel}失败：数据库尚未完成 lucius_agent 授权迁移，请先执行最新后端 migration。`
  }

  return `${stepLabel}失败：${errorMessage}`
}

async function parseRequestJson<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T
  } catch {
    throw createApiError(400, '请求体必须是合法 JSON。')
  }
}

/**
 * 读取当前登录用户：
 * - onboarding bootstrap 需要确认当前请求已经完成登录；
 * - email 会被写入 organization_member，缺失时直接拒绝，避免产生脏成员数据。
 */
async function requireAuthenticatedUser(request: Request): Promise<AuthenticatedUser> {
  const supabase = createSupabaseServerClientForRequest(request, new Headers())
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user?.id) {
    throw createApiError(401, '登录已失效，请重新登录后再试。')
  }

  return {
    id: user.id,
    /**
     * Google / GitHub OAuth 下，极少数会话会出现 `user.email` 为空，
     * 但邮箱仍存在于 `user_metadata` 或 `identities[].identity_data`。
     * onboarding bootstrap 依赖邮箱写成员关系，因此这里统一走兼容解析。
     */
    email: resolveSupabaseAuthUserEmail(user),
  }
}

function normalizeCompanyInfoInput(payload: BootstrapCompanyRequest['companyInfo']): NormalizedCompanyInfo {
  return {
    companyName: payload?.companyName?.trim() || '',
    website: payload?.website?.trim() || null,
    description: payload?.description?.trim() || null,
  }
}

function validateCompanyInfo(companyInfo: NormalizedCompanyInfo): void {
  const companyNameLength = Array.from(companyInfo.companyName).length

  if (!companyInfo.companyName) {
    throw createApiError(400, '请输入公司名称。')
  }

  if (companyNameLength < MIN_COMPANY_NAME_LENGTH || companyNameLength > MAX_COMPANY_NAME_LENGTH) {
    throw createApiError(
      400,
      `公司名称需为 ${MIN_COMPANY_NAME_LENGTH}-${MAX_COMPANY_NAME_LENGTH} 个字符。`,
    )
  }
}

/**
 * 保护首个工作区 bootstrap：
 * - 仅允许“当前没有 active membership”的用户执行；
 * - 避免已经加入工作区的账号误调用该接口，重复创建孤立 company。
 */
async function ensureUserHasNoActiveCompany(userId: string): Promise<void> {
  const serviceClient = createSupabaseServiceRoleClient()
  const membershipResult = await serviceClient
    .schema('permission')
    .from('organization_member')
    .select('company_id')
    .eq('user_id', userId)
    .eq('status', 'active')
    .limit(1)
    .maybeSingle<ExistingMembershipRow>()

  if (membershipResult.error) {
    throw createApiError(500, `读取当前账号工作区关系失败：${membershipResult.error.message}`)
  }

  if (membershipResult.data?.company_id) {
    throw createApiError(409, '当前账号已有关联工作区，请刷新页面后继续。')
  }
}

/**
 * 最佳努力回滚已创建的 company：
 * - bootstrap 任一步失败都尽量清掉半成品数据；
 * - 由于相关表都对 company 做级联删除，删除 company 即可回收已写入的成员和默认配置。
 */
async function rollbackBootstrapCompany(
  serviceClient: ReturnType<typeof createSupabaseServiceRoleClient>,
  companyId: string,
): Promise<void> {
  const rollbackResult = await serviceClient.from('company').delete().eq('id', companyId)
  if (rollbackResult.error) {
    console.error('[onboarding_bootstrap_company_rollback_failed]', {
      companyId,
      message: rollbackResult.error.message,
    })
  }
}

/**
 * 创建首个工作区：
 * - 用 service-role 代办 `company` 与 `organization_member` 两张表的写入；
 * - 前端只负责提交表单，不再直接触达“需要先有成员身份”的写路径。
 */
async function createBootstrapCompany(request: Request): Promise<Response> {
  const currentUser = await requireAuthenticatedUser(request)
  if (!currentUser.email) {
    throw createApiError(400, '当前账号邮箱缺失，无法初始化工作区。')
  }

  const requestBody = await parseRequestJson<BootstrapCompanyRequest>(request)
  const companyInfo = normalizeCompanyInfoInput(requestBody.companyInfo)
  validateCompanyInfo(companyInfo)

  await ensureUserHasNoActiveCompany(currentUser.id)

  const serviceClient = createSupabaseServiceRoleClient()
  const companyInsertResult = await serviceClient
    .from('company')
    .insert({
      company_name: companyInfo.companyName,
      website: companyInfo.website,
      description: companyInfo.description,
      owner_id: currentUser.id,
    })
    .select('id')
    .single<CompanyInsertRow>()

  if (companyInsertResult.error) {
    throw createApiError(500, `创建工作区失败：${companyInsertResult.error.message}`)
  }

  const createdCompanyId = companyInsertResult.data?.id
  if (!createdCompanyId) {
    throw createApiError(500, '创建工作区成功，但未获取到 company_id。')
  }
  try {
    const membershipUpsertResult = await serviceClient
      .schema('permission')
      .from('organization_member')
      .upsert(
        {
          company_id: createdCompanyId,
          user_id: currentUser.id,
          email: currentUser.email,
          role: 'owner',
          status: 'active',
        },
        {
          onConflict: 'company_id,user_id',
        },
      )
      .select('id')
      .single<OrganizationMemberUpsertRow>()

    if (membershipUpsertResult.error) {
      throw createApiError(500, `初始化工作区成员关系失败：${membershipUpsertResult.error.message}`)
    }

    const ownerMemberId = membershipUpsertResult.data?.id
    if (!ownerMemberId) {
      throw createApiError(500, '初始化工作区成员关系成功，但未获取到 owner member_id。')
    }

    /**
     * 默认 Lucius identity：
     * - 新 company 创建后立即补一条默认人格配置，避免首次打开 Lucius 配置页时出现 404；
     * - 与默认事件类型一样走 bootstrap 写入，统一由数据库保存初始真源。
     */
    const identityUpsertResult = await serviceClient
      .schema('lucius_agent')
      .from('identity')
      .upsert(buildDefaultCompanyIdentitySeedRow({ companyId: createdCompanyId }), {
        onConflict: 'company_id',
      })

    if (identityUpsertResult.error) {
      throw createApiError(
        500,
        formatBootstrapDatabaseError('初始化 Lucius 默认 identity', identityUpsertResult.error.message),
      )
    }

    /**
     * 默认事件类型与默认邮箱通知：
     * - 所有新公司统一写入数据库，作为唯一展示真源；
     * - 不再依赖前端本地默认类型兜底。
     */
    const defaultTypeUpsertResult = await serviceClient
      .schema('lucius_agent')
      .from('event_type_config')
      .upsert(buildDefaultEventTypeConfigSeedRows({ companyId: createdCompanyId }), {
        onConflict: 'company_id,type_key',
      })
      .select('id,type_key')

    if (defaultTypeUpsertResult.error) {
      throw createApiError(
        500,
        formatBootstrapDatabaseError('初始化默认事件类型', defaultTypeUpsertResult.error.message),
      )
    }

    const seededTypeConfigs = ((defaultTypeUpsertResult.data || []) as EventTypeConfigSeedResultRow[]).map(
      (row) => ({
        id: row.id,
        typeKey: row.type_key,
      }),
    )

    if (seededTypeConfigs.length === 0) {
      throw createApiError(500, '初始化默认事件类型成功，但未获取到类型配置结果。')
    }

    const defaultTargetUpsertResult = await serviceClient
      .schema('lucius_agent')
      .from('event_notification_target')
      .upsert(
        buildDefaultEmailNotificationTargetSeedRows({
          ownerEmail: currentUser.email,
          ownerMemberId,
          ownerUserId: currentUser.id,
          typeConfigs: seededTypeConfigs,
        }),
        {
          onConflict: 'type_config_id,channel,notify_channel_id,target',
        },
      )

    if (defaultTargetUpsertResult.error) {
      throw createApiError(
        500,
        formatBootstrapDatabaseError('初始化默认通知目标', defaultTargetUpsertResult.error.message),
      )
    }

    /**
     * 默认 Flow：
     * - 新 company 初始化时直接落两条基础规则，避免后续还要手动补广告处理和二次确认流程；
     * - 写入失败同样回滚整个 company bootstrap，保证默认配置完整性。
     */
    const defaultFlowInsertResult = await serviceClient
      .schema('lucius_agent')
      .from('flow')
      .insert(buildDefaultCompanyFlowSeedRows({ companyId: createdCompanyId }))

    if (defaultFlowInsertResult.error) {
      throw createApiError(
        500,
        formatBootstrapDatabaseError('初始化默认 Flow', defaultFlowInsertResult.error.message),
      )
    }
  } catch (error) {
    await rollbackBootstrapCompany(serviceClient, createdCompanyId)
    throw error
  }

  return jsonResponse(
    {
      companyId: createdCompanyId,
    },
    201,
  )
}

export async function handleOnboardingApi(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url)

  try {
    if (pathname === '/api/onboarding/companies' && request.method === 'POST') {
      return await createBootstrapCompany(request)
    }

    return jsonResponse(
      {
        error: 'Not Found',
      },
      404,
    )
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      'message' in error
    ) {
      const apiError = error as ApiError
      return jsonResponse(
        {
          error: apiError.message,
        },
        apiError.status,
      )
    }

    console.error('[onboarding_api_unhandled_error]', error)

    return jsonResponse(
      {
        error: error instanceof Error ? error.message : '未知服务端错误。',
      },
      500,
    )
  }
}
