export type UserInsightPlatform = 'discord' | 'telegram' | 'slack' | 'feishu' | 'web' | 'client'

export type UserTagItem = {
  tag_name: string
  reason?: string | null
}

export type UserInsightRecord = {
  company_id: string
  platform: UserInsightPlatform
  user_id: string
  username?: string | null
  total_message: number
  m30_message_counts: number[]
  last_sync_date?: string | null
  first_message_at?: string | null
  last_message_at?: string | null
  active_score: number[]
  memory?: string | null
  tags: UserTagItem[]
  last_summary_at?: string | null
  avatar_url?: string | null
  created_at: string
  updated_at: string
}

export type UserInsightListResponse = {
  total: number
  limit: number
  offset: number
  available_platforms: string[]
  records: UserInsightRecord[]
}

export type TagDefinition = {
  company_id: string
  tag_name: string
  description?: string | null
  is_active: boolean
  creator_id?: string | null
  created_at: string
  updated_at: string
}

type TagDefinitionListResponse = {
  company_id: string
  total: number
  tags: TagDefinition[]
}

type CreateTagDefinitionRequest = {
  company_id: string
  tag_name: string
  description?: string
  is_active: boolean
  creator_id?: string
}

type InitDefaultTagsRequest = {
  company_id: string
  creator_id?: string
}

type UpdateTagDefinitionRequest = {
  company_id: string
  tag_name: string
  description?: string
  is_active?: boolean
}

export type UserContextMessage = {
  message_id?: string | null
  company_id?: string | null
  platform?: UserInsightPlatform | null
  user_id?: string | null
  workspace_id?: string | null
  channel_id?: string | null
  text?: string | null
  message_role?: string | null
  message_status?: string | null
  sent_at?: string | null
  ingested_at?: string | null
  raw?: Record<string, unknown> | null
}

export type UserContextMessagesResponse = {
  company_id: string
  platform: UserInsightPlatform
  user_id: string
  limit: number
  offset: number
  total: number
  messages: UserContextMessage[]
}

type UserInsightListParams = {
  companyId: string
  platform?: UserInsightPlatform | 'all'
  tagName?: string
  minMessages?: number
  lastActiveDays?: number
  keyword?: string
  sortBy?: 'last_message_at' | 'total_message' | 'last_summary_at' | 'updated_at' | 'created_at' | 'username'
  sortOrder?: 'asc' | 'desc'
  limit?: number
  offset?: number
}

type UserInsightDetailParams = {
  companyId: string
  platform: UserInsightPlatform
  userId: string
}

type UserMessagesParams = {
  companyId: string
  platform: UserInsightPlatform
  userId: string
  limit?: number
  offset?: number
  includeNonUserRoles?: boolean
}

async function requestJson<T>(path: string, params: URLSearchParams): Promise<T> {
  const response = await fetch(`/api/user-profile${path}?${params.toString()}`)

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || '请求失败')
  }

  return (await response.json()) as T
}

export async function fetchUserInsightList(
  params: UserInsightListParams,
): Promise<UserInsightListResponse> {
  const query = new URLSearchParams({
    company_id: params.companyId,
    limit: String(params.limit ?? 20),
    offset: String(params.offset ?? 0),
    sort_by: params.sortBy ?? 'last_message_at',
    sort_order: params.sortOrder ?? 'desc',
  })

  if (params.platform && params.platform !== 'all') query.set('platform', params.platform)
  if (params.tagName) query.set('tag_name', params.tagName)
  if (typeof params.minMessages === 'number' && !Number.isNaN(params.minMessages)) {
    query.set('min_messages', String(params.minMessages))
  }
  if (typeof params.lastActiveDays === 'number' && !Number.isNaN(params.lastActiveDays)) {
    query.set('last_active_days', String(params.lastActiveDays))
  }
  if (params.keyword?.trim()) query.set('keyword', params.keyword.trim())

  return requestJson<UserInsightListResponse>('/insights/list', query)
}

export async function fetchUserInsightDetail(
  params: UserInsightDetailParams,
): Promise<UserInsightRecord> {
  const query = new URLSearchParams({
    company_id: params.companyId,
    platform: params.platform,
    user_id: params.userId,
  })

  return requestJson<UserInsightRecord>('/insights/detail', query)
}

export async function fetchUserTags(
  companyId: string,
  options?: { isActive?: boolean },
): Promise<TagDefinition[]> {
  const query = new URLSearchParams({
    company_id: companyId,
  })

  if (typeof options?.isActive === 'boolean') {
    query.set('is_active', String(options.isActive))
  }

  const response = await requestJson<TagDefinitionListResponse>('/tags', query)
  return response.tags
}

export async function createUserTag(request: CreateTagDefinitionRequest): Promise<TagDefinition> {
  const response = await fetch('/api/user-profile/tags', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || '创建标签失败')
  }

  return (await response.json()) as TagDefinition
}

export async function initDefaultUserTags(
  request: InitDefaultTagsRequest,
): Promise<TagDefinition[]> {
  const response = await fetch('/api/user-profile/tags/init-defaults', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || '初始化默认标签失败')
  }

  const body = (await response.json()) as TagDefinitionListResponse
  return body.tags
}

export async function updateUserTag(
  request: UpdateTagDefinitionRequest,
): Promise<TagDefinition> {
  const response = await fetch('/api/user-profile/tags', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || '更新标签失败')
  }

  return (await response.json()) as TagDefinition
}

export async function fetchUserMessages(
  params: UserMessagesParams,
): Promise<UserContextMessagesResponse> {
  const query = new URLSearchParams({
    company_id: params.companyId,
    platform: params.platform,
    user_id: params.userId,
    limit: String(params.limit ?? 20),
    offset: String(params.offset ?? 0),
  })

  if (params.includeNonUserRoles) query.set('include_non_user_roles', 'true')

  return requestJson<UserContextMessagesResponse>('/messages', query)
}
