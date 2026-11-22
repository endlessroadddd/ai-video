import { createSupabaseServerClientForRequest, createSupabaseServiceRoleClient } from '@/lib/supabase/server'

const MEMBER_ACTIVITY_MIN_UPDATE_INTERVAL_MS = 5 * 60 * 1000

type AuthenticatedUser = {
  id: string
  email: string | null
}

type ApiError = {
  status: number
  message: string
}

type OrganizationMemberActivityRow = {
  id: string
  company_id: string
  user_id: string
  status: 'active' | 'inactive'
  last_active_at: string | null
}

function createApiError(status: number, message: string): Error & ApiError {
  const error = new Error(message) as Error & ApiError
  error.status = status
  return error
}

function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'status' in error && 'message' in error
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}

function jsonResponse(body: Record<string, string>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}

async function parseRequestJson<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T
  } catch {
    throw createApiError(400, '请求体必须是合法 JSON。')
  }
}

/**
 * 基于当前请求读取登录用户。
 *
 * 说明：
 * - 前端 activity ping 仍然必须经过服务端校验；
 * - 只接受已登录成员上报，避免匿名请求污染活跃数据。
 */
async function requireAuthenticatedUser(request: Request): Promise<AuthenticatedUser> {
  const supabase = createSupabaseServerClientForRequest(request, new Headers())
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user?.id) {
    throw createApiError(401, '登录已失效，请重新登录后重试。')
  }

  return {
    id: user.id,
    email: user.email || null,
  }
}

/**
 * 读取用户在指定公司的 active 成员记录。
 *
 * 说明：
 * - 活跃时间是公司维度数据，所以必须先定位到 `organization_member`；
 * - 只允许 active 成员写入，避免历史/失效成员被错误刷新。
 */
async function requireActiveOrganizationMember(payload: {
  companyId: string
  userId: string
}): Promise<OrganizationMemberActivityRow> {
  const serviceClient = createSupabaseServiceRoleClient()
  const membershipResult = await serviceClient
    .schema('permission')
    .from('organization_member')
    .select('id, company_id, user_id, status, last_active_at')
    .eq('company_id', payload.companyId)
    .eq('user_id', payload.userId)
    .eq('status', 'active')
    .maybeSingle<OrganizationMemberActivityRow>()

  if (membershipResult.error) {
    throw createApiError(500, `读取成员身份失败：${membershipResult.error.message}`)
  }

  if (!membershipResult.data) {
    throw createApiError(403, '你不是当前公司的有效成员。')
  }

  return membershipResult.data
}

/**
 * 节流判断：
 * - 客户端会定时心跳，但最终写库节流必须放在服务端；
 * - 这里按公司成员维度控制 5 分钟内最多更新一次。
 */
function shouldSkipActivityUpdate(lastActiveAt: string | null): boolean {
  if (!lastActiveAt) {
    return false
  }

  const lastActiveAtMs = new Date(lastActiveAt).getTime()
  if (Number.isNaN(lastActiveAtMs)) {
    return false
  }

  return Date.now() - lastActiveAtMs < MEMBER_ACTIVITY_MIN_UPDATE_INTERVAL_MS
}

async function handleMemberActivityPing(request: Request): Promise<Response> {
  const body = await parseRequestJson<{ companyId?: string }>(request)
  const companyId = body.companyId?.trim() || ''

  if (!isUuid(companyId)) {
    throw createApiError(400, 'companyId 非法。')
  }

  const currentUser = await requireAuthenticatedUser(request)
  const membership = await requireActiveOrganizationMember({
    companyId,
    userId: currentUser.id,
  })

  if (shouldSkipActivityUpdate(membership.last_active_at)) {
    return new Response(null, { status: 204 })
  }

  const serviceClient = createSupabaseServiceRoleClient()
  const updateResult = await serviceClient
    .schema('permission')
    .from('organization_member')
    .update({
      last_active_at: new Date().toISOString(),
    })
    .eq('id', membership.id)

  if (updateResult.error) {
    throw createApiError(500, `更新成员活跃时间失败：${updateResult.error.message}`)
  }

  return new Response(null, { status: 204 })
}

/**
 * 成员活跃时间 API。
 *
 * 设计目标：
 * - 让“最近活跃”独立于业务接口，避免把某个页面行为误当成唯一活跃来源；
 * - 由前端在全局 trackable 页面统一上报，服务端做最终权限与节流控制。
 */
export async function handleMemberActivityApi(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url)

  try {
    if (requestUrl.pathname === '/api/member-activity/ping' && request.method === 'POST') {
      return handleMemberActivityPing(request)
    }

    return jsonResponse(
      {
        error: '未找到成员活跃时间 API 路径。',
      },
      404,
    )
  } catch (error) {
    if (isApiError(error)) {
      return jsonResponse({ error: error.message }, error.status)
    }

    const message = error instanceof Error ? error.message : '成员活跃时间接口出现未知错误。'
    return jsonResponse({ error: message }, 500)
  }
}
