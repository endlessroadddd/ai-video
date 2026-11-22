import { m } from '@/paraglide/messages'

type ApiErrorResponse = {
  error?: string
}

export type ClientChatMessageAttachment = {
  base64?: string
  content_type?: string
  source?: string
  url?: string
}

export type ClientChatUploadedImage = {
  url: string
  contentType: string
  filename: string
  storagePath: string
  size: number
  bucket: string
}

export type ClientChatImagePayload = {
  url: string
  mimeType?: string
  fileName?: string
  storagePath?: string
  size?: number
}

export type ClientChatMessage = {
  company_id?: string | null
  session_id: string
  session_uuid?: string | null
  message_id: string
  message_role?: string | null
  user_id?: string | null
  username?: string | null
  avatar_url?: string | null
  content?: string | null
  attachments?: unknown
  attachments_base64?: ClientChatMessageAttachment[] | null
  message_status?: string | null
  timestamp?: string | null
  created_at?: string | null
  raw?: unknown
}

type SendClientChatMessageResponse = {
  ok: boolean
  sessionId: string
  messageId: string | null
}

type ListClientChatMessagesResponse = {
  ok: boolean
  messages: ClientChatMessage[]
}

export type ClientChatSessionListItem = {
  sessionId: string
  createdAt: string | null
  startedAt: string | null
  endedAt: string | null
  sourceUrl: string | null
}

export type ClientChatSessionPagination = {
  page: number
  pageSize: number
  total: number
  totalPages: number
  hasPrev: boolean
  hasNext: boolean
}

type ListClientChatSessionsResponse = {
  ok: boolean
  sessions: ClientChatSessionListItem[]
  pagination: ClientChatSessionPagination
}

type UploadClientChatImageResponse = {
  ok: boolean
  image: ClientChatUploadedImage
}

async function parseApiResponse<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T & ApiErrorResponse

  if (!response.ok) {
    throw new Error(data.error || m.service_client_chat_request_failed())
  }

  return data
}

/**
 * 发送客户端聊天消息：
 * - 会写入客户端专用 schema；
 * - 消息会按 session_id 与 company_id 隔离。
 */
export async function sendClientChatMessage(payload: {
  companyId: string
  sessionId: string
  message: string
  sourceUrl?: string
  image?: ClientChatImagePayload
  images?: ClientChatImagePayload[]
}): Promise<SendClientChatMessageResponse> {
  const response = await fetch('/api/chat/message', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  })

  return parseApiResponse<SendClientChatMessageResponse>(response)
}

export async function uploadClientChatImage(payload: {
  companyId: string
  sessionId: string
  file: File
}): Promise<UploadClientChatImageResponse> {
  const formData = new FormData()
  formData.append('companyId', payload.companyId)
  formData.append('sessionId', payload.sessionId)
  formData.append('file', payload.file)

  const response = await fetch('/api/chat/upload', {
    method: 'POST',
    credentials: 'include',
    body: formData,
  })

  return parseApiResponse<UploadClientChatImageResponse>(response)
}

/**
 * 查询客户端聊天消息列表（按 company + session）。
 */
export async function fetchClientChatMessages(payload: {
  companyId: string
  sessionId: string
  limit?: number
  before?: string
}): Promise<ListClientChatMessagesResponse> {
  const query = new URLSearchParams({
    company_id: payload.companyId,
    session_id: payload.sessionId,
    limit: String(payload.limit || 100),
  })

  if (payload.before) {
    query.set('before', payload.before)
  }

  const response = await fetch(`/api/chat/messages?${query.toString()}`, {
    method: 'GET',
    credentials: 'include',
  })

  return parseApiResponse<ListClientChatMessagesResponse>(response)
}

/**
 * 查询客户端会话列表（按 company，分页）。
 * - 会话列表来自数据库，不再依赖浏览器本地缓存。
 */
export async function fetchClientChatSessions(payload: {
  companyId: string
  page?: number
  pageSize?: number
}): Promise<ListClientChatSessionsResponse> {
  const query = new URLSearchParams({
    company_id: payload.companyId,
    page: String(payload.page || 1),
    page_size: String(payload.pageSize || 20),
  })

  const response = await fetch(`/api/chat/sessions?${query.toString()}`, {
    method: 'GET',
    credentials: 'include',
  })

  return parseApiResponse<ListClientChatSessionsResponse>(response)
}
