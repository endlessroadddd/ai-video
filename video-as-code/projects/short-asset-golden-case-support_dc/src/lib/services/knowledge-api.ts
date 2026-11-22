/**
 * Lucius Knowledge API（v4）请求封装。
 *
 * 设计目标：
 * - 与 OpenAPI 保持字段兼容，便于后续替换为自动生成类型。
 * - 将 URL、错误处理、序列化逻辑集中，避免在组件里散落 fetch。
 */

export type KnowledgeApiConfig = {
  /**
   * API 基础地址。
   * 可通过环境变量 `VITE_KNOWLEDGE_API_BASE_URL` 覆盖。
   */
  baseUrl: string
}

/**
 * 默认 API 地址：开发环境直连当前知识库微服务。
 */
const DEFAULT_KNOWLEDGE_API_BASE_URL =
  'https://pre-prod-knowledge-engine-api.hirelucius.com'

/**
 * 读取知识库 API 配置。
 */
export function getKnowledgeApiConfig(): KnowledgeApiConfig {
  const viteEnv = (import.meta as ImportMeta & {
    env?: Record<string, string | undefined>
  }).env

  const baseUrl =
    viteEnv?.VITE_KNOWLEDGE_API_BASE_URL ||
    process.env.VITE_KNOWLEDGE_API_BASE_URL ||
    DEFAULT_KNOWLEDGE_API_BASE_URL

  return {
    baseUrl: baseUrl.replace(/\/$/, ''),
  }
}

/**
 * 知识条目。
 */
export type KnowledgeItem = {
  id: string
  company_id: string
  key: string
  text: string
  /**
   * 知识来源类型（由后端返回）：
   * - `manual`：手动添加
   * - `faq`：官方文档
   * - 其他值：当前前端按兜底规则处理
   */
  source_type?: string | null
  image?: string | null
  is_image?: boolean
  answer?: string | null
  reasoning?: string | null
  tags?: string[]
  aliases?: string[]
  supersede?: string[]
  source_message_ids?: string[]
  doc_file_path?: string | null
  doc_chunk_id?: string | null
  doc_page?: number
  session_id?: string | null
  event_id?: string | null
  status?: string | null
  created_by?: string | null
  created_at?: string | null
  updated_at?: string | null
}

/**
 * 列表查询参数。
 */
export type ListKnowledgeParams = {
  company_id: string
  page?: number
  limit?: number
  sort_by?: string
  sort_order?: 'asc' | 'desc'
  /**
   * 来源过滤（后端支持）：
   * - document
   * - chat_history
   * - manual
   */
  source_type?: string | null
  include_image?: boolean
}

export type KnowledgeListResponse = {
  items: KnowledgeItem[]
  total: number
  page: number
  limit: number
}

/**
 * 创建知识请求。
 */
export type CreateKnowledgeRequest = {
  key: string
  text: string
  company_id: string
  source_type?: string | null
  answer?: string | null
  reasoning?: string | null
  tags?: string[] | null
  aliases?: string[] | null
  source_message_ids?: string[] | null
  doc_file_path?: string | null
  status?: string | null
  created_by?: string | null
  session_id?: string | null
  event_id?: string | null
}

export type CreateKnowledgeResponse = {
  success: boolean
  action: 'created' | 'updated' | 'skipped' | 'failed' | string
  id?: string | null
  existing_id?: string | null
  message: string
  metadata?: Record<string, unknown>
}

/**
 * 关键词搜索请求（GET /api/v4/knowledge/keyword-search）。
 */
export type SearchKnowledgeRequest = {
  keyword: string
  company_id: string
  limit?: number
  source_type?: 'document' | 'chat_history' | 'manual' | null
}

/**
 * 关键词搜索响应。
 * 接口返回结构在不同环境可能存在轻微差异，这里统一收敛为 `{ items, total }`。
 */
export type SearchKnowledgeResponse = {
  items: KnowledgeItem[]
  total: number
}

/**
 * 更新知识请求。
 */
export type UpdateKnowledgeRequest = {
  old_id: string
  company_id: string
  key: string
  text: string
  answer?: string | null
  reasoning?: string | null
  tags?: string[] | null
  aliases?: string[] | null
  doc_file_path?: string | null
  doc_page?: number | null
  created_by?: string | null
}

export type UpdateKnowledgeResponse = {
  success: boolean
  new_id: string
  superseded_id: string
  message: string
}

/**
 * 删除知识请求。
 * 说明：
 * - `company_id` 作为租户隔离参数，必须透传。
 * - `knowledge_id` 为待删除记录主键。
 */
export type DeleteKnowledgeRequest = {
  company_id: string
  knowledge_id: string
}

/**
 * 删除知识返回结构。
 */
export type DeleteKnowledgeResponse = {
  success: boolean
  message?: string
}

/**
 * 上传知识源文件请求。
 */
export type UploadKnowledgeFileRequest = {
  company_id: string
  file: File | Blob
}

export type UploadKnowledgeResponse = {
  success: boolean
  file_name: string
  company_id: string
  processed_records: number
  message: string
}

/**
 * 上传文档请求（用于后续异步处理流程）。
 */
export type UploadDocumentRequest = {
  company_id: string
  file: File | Blob
  uploaded_by?: string
  auto_process?: boolean
}

/**
 * 文档重复上传时返回的已存在记录摘要。
 */
export type ExistingDocumentInfo = {
  document_id: string
  status: string
  knowledge_count: number
  created_at?: string | null
  updated_at?: string | null
}

/**
 * `/api/v4/knowledge/upload-document` 返回结构。
 */
export type UploadDocumentResponse = {
  success: boolean
  document_id?: string | null
  file_name: string
  file_hash: string
  file_size: number
  file_type: string
  storage_url?: string | null
  status?: string
  is_duplicate?: boolean
  existing_record?: ExistingDocumentInfo | null
  message?: string
}

/**
 * 手动触发文档处理任务返回。
 * 对齐 `/api/v4/knowledge/process-document/{document_id}` 的 OpenAPI 定义。
 */
export type ProcessDocumentTriggerResponse = {
  success: boolean
  document_id: string
  status?: string
  message?: string
}

/**
 * 触发抽取阶段（stage-3）重跑参数。
 * 对齐 POST /api/v4/knowledge/process-extraction 的 query 参数。
 */
export type ProcessExtractionTriggerParams = {
  document_id?: string
  company_id?: string
  file_name?: string
  only_failed?: boolean
  reextract_done?: boolean
}

/**
 * 按指定 chunk 重试抽取请求。
 * 约定：
 * - `company_id` 用于租户隔离；
 * - `ids` 只传用户勾选的失败 chunk_id 列表。
 */
export type ProcessExtractionByChunksRequest = {
  company_id: string
  ids: string[]
}

export type ProcessExtractionByChunksResponse = {
  success: boolean
  status?: string
  message?: string
  document_id?: string | null
}

export type KnowledgeDetailResponse = {
  item: KnowledgeItem
}

/**
 * GET /api/v4/knowledge/knowledge/{knowledge_id}/source 返回中的文档信息。
 */
export type KnowledgeSourceDocument = {
  id: string
  company_id: string
  file_name: string
  file_hash?: string | null
  file_type?: string | null
  file_size?: number | null
  status?: string | null
  storage_url?: string | null
  created_at?: string | null
  updated_at?: string | null
}

/**
 * GET /api/v4/knowledge/knowledge/{knowledge_id}/source 返回结构。
 */
export type KnowledgeSourceResponse = {
  knowledge?: KnowledgeItem | null
  document?: KnowledgeSourceDocument | null
  chunk?: Record<string, unknown> | null
}

/**
 * 文档列表查询参数。
 * 对齐 GET /api/v4/knowledge/documents 的 query 参数。
 */
export type ListKnowledgeDocumentsParams = {
  company_id: string
  status?: string | null
  limit?: number
  offset?: number
}

/**
 * 文档列表条目。
 * 对齐 DocumentListItem。
 */
export type DocumentListItem = {
  id: string
  company_id: string
  file_name: string
  file_type: string
  file_size: number
  status: string
  knowledge_count?: number
  error_message?: string | null
  created_at?: string | null
  updated_at?: string | null
}

/**
 * 文档列表返回结构。
 * 对齐 DocumentListResponse。
 */
export type DocumentListResponse = {
  items: DocumentListItem[]
  total: number
  limit: number
  offset: number
}

/**
 * 兼容旧命名，避免影响既有调用方。
 */
export type KnowledgeDocumentsResponse = DocumentListResponse

/**
 * 文档元数据详情。
 * 对齐 DocumentMetaResponse。
 */
export type DocumentMetaResponse = {
  id: string
  company_id: string
  file_name: string
  file_hash: string
  file_size: number
  file_type: string
  storage_url?: string | null
  status: string
  knowledge_count?: number
  chunk_count?: number
  attachment_count?: number
  created_at?: string | null
  updated_at?: string | null
}

/**
 * 单个分片概要信息。
 * 对齐 DocumentChunkListItem。
 */
export type DocumentChunkListItem = {
  document_id: string
  company_id: string
  chunk_index: number
  chunk_id: string
  heading?: string
  char_count?: number
  content_hash: string
  content_preview: string
  extraction_status?: string | null
  extraction_attempts?: number
  extraction_error?: string | null
  last_extracted_at?: string | null
  knowledge_count?: number
  created_at?: string | null
  updated_at?: string | null
}

/**
 * 分片列表返回结构。
 * 对齐 DocumentChunkListResponse。
 */
export type DocumentChunkListResponse = {
  items: DocumentChunkListItem[]
  total: number
  limit: number
  offset: number
}

/**
 * 单个分片完整详情。
 * 对齐 DocumentChunkDetailResponse。
 */
export type DocumentChunkDetailResponse = {
  document_id: string
  company_id: string
  chunk_index: number
  chunk_id: string
  heading?: string
  char_count?: number
  content_hash: string
  content: string
  extraction_status?: string | null
  extraction_attempts?: number
  extraction_error?: string | null
  last_extracted_at?: string | null
  knowledge_count?: number
  created_at?: string | null
  updated_at?: string | null
}

/**
 * 分片列表查询参数。
 */
export type ListDocumentChunksParams = {
  extraction_status?: string | null
  limit?: number
  offset?: number
}

/**
 * 附件条目。
 * 对齐 AttachmentItem。
 */
export type AttachmentItem = {
  id: string
  document_id: string
  chunk_id?: string | null
  company_id: string
  type: string
  file_name: string
  storage_path: string
  storage_url?: string | null
  mime_type?: string | null
  file_size?: number
  metadata?: Record<string, unknown>
  created_at?: string | null
  updated_at?: string | null
}

/**
 * 附件列表返回结构。
 * 对齐 AttachmentListResponse。
 */
export type AttachmentListResponse = {
  items: AttachmentItem[]
  total: number
}

/**
 * 文档知识条目。
 * 对齐 DocumentKnowledgeItem。
 */
export type DocumentKnowledgeItem = {
  id: string
  key: string
  answer?: string | null
  status?: string | null
  document_id?: string | null
  chunk_id?: string | null
  chunk_content_hash?: string | null
  extracted_at?: string | null
  source_type?: string | null
  source_platform?: string | null
  attachments?: Array<Record<string, unknown>>
  created_at?: string | null
  updated_at?: string | null
}

/**
 * 文档知识列表返回结构。
 * 对齐 DocumentKnowledgeListResponse。
 */
export type DocumentKnowledgeListResponse = {
  items: DocumentKnowledgeItem[]
  total: number
  limit: number
  offset: number
}

/**
 * 文档知识列表查询参数。
 */
export type ListDocumentKnowledgeParams = {
  limit?: number
  offset?: number
}

/**
 * 管线阶段名称。
 */
export type PipelineStageName = 'uploaded' | 'parsed' | 'chunked' | 'extracting' | 'completed'

/**
 * 管线阶段状态。
 */
export type PipelineStageStatus = 'pending' | 'running' | 'done' | 'failed' | 'partial'

/**
 * 管线阶段条目。
 * 对齐 PipelineStageItem。
 */
export type PipelineStageItem = {
  name: PipelineStageName
  status: PipelineStageStatus
}

/**
 * 文档五阶段处理进度。
 * 对齐 DocumentPipelineProgressResponse。
 */
export type DocumentPipelineProgressResponse = {
  document_id: string
  document_status: string
  current_stage: PipelineStageName
  stages: PipelineStageItem[]
  chunk_total: number
  chunk_pending: number
  chunk_extracting: number
  chunk_done: number
  chunk_failed: number
  chunk_skipped: number
  attachment_total: number
  knowledge_total: number
  error_message?: string | null
}

/**
 * Web crawl 启动请求。
 * 说明：
 * - `source_url` 为抓取入口 URL。
 * - `max_depth` 与 `max_pages` 用于限制抓取范围和资源消耗。
 */
export type StartWebCrawlRequest = {
  company_id: string
  source_url: string
  max_depth?: number
  max_pages?: number
  include_paths?: string[]
  exclude_paths?: string[]
}

/**
 * Web crawl 启动响应。
 */
export type StartWebCrawlResponse = {
  success: boolean
  job_id: string
  source_url: string
  status: string
  message?: string | null
}

/**
 * Web crawl 列表查询参数。
 */
export type ListWebCrawlJobsParams = {
  company_id: string
  status?: string | null
  limit?: number
  offset?: number
}

/**
 * Web crawl 列表条目。
 */
export type WebCrawlJobListItem = {
  job_id: string
  source_url: string
  status: string
  pages_found: number
  pages_processed: number
  pages_failed: number
  knowledge_count: number
  created_at: string
  updated_at: string
}

/**
 * Web crawl 列表响应。
 */
export type ListWebCrawlJobsResponse = {
  items: WebCrawlJobListItem[]
  total: number
  limit: number
  offset: number
}

/**
 * Web crawl 单任务关联页面条目。
 */
export type WebCrawlJobPageItem = {
  document_id: string
  file_name: string
  file_size: number
  status: string
  knowledge_count: number
  created_at: string
  updated_at: string
}

/**
 * Web crawl 单任务状态详情。
 */
export type WebCrawlJobStatusResponse = {
  job_id: string
  company_id: string
  source_url: string
  max_depth: number
  max_pages: number
  include_paths: string[]
  exclude_paths: string[]
  status: string
  pages_found: number
  pages_processed: number
  pages_failed: number
  knowledge_count: number
  error_message?: string | null
  pages: WebCrawlJobPageItem[]
  created_at: string
  updated_at: string
}

/**
 * 文档聚合进度。
 * 对齐 DocumentProgressResponse。
 */
export type DocumentProgressResponse = {
  document_id: string
  document_status: string
  chunk_total: number
  chunk_pending: number
  chunk_extracting: number
  chunk_done: number
  chunk_failed: number
  chunk_skipped: number
  attachment_total: number
  knowledge_total: number
}

/**
 * 文档失败分片条目。
 * 接口仍在演进中，因此这里同时兼容 snake_case 与 camelCase 字段。
 */
export type DocumentFailedChunkDetail = {
  chunk_id?: string | null
  chunkId?: string | null
  error_message?: string | null
  errorMessage?: string | null
  error?: string | null
  extraction_error?: string | null
  chunk_index?: number | string | null
  chunkIndex?: number | string | null
  heading?: string | null
  title?: string | null
  extraction_status?: string | null
  status?: string | null
  extraction_attempts?: number | string | null
  extractionAttempts?: number | string | null
  last_extracted_at?: string | null
  lastExtractedAt?: string | null
}

/**
 * 文档 chunk 维度进度。
 * - `failed_chunk_details` 为前端失败重试区块的主要数据来源。
 */
export type DocumentChunkProgress = {
  chunk_total?: number
  chunk_pending?: number
  chunk_extracting?: number
  chunk_done?: number
  chunk_failed?: number
  chunk_skipped?: number
  failed_chunk_details?: DocumentFailedChunkDetail[] | null
}

/**
 * 文档概要信息，用于监控/总览视图。
 * 对齐 DocumentSummaryResponse。
 */
export type DocumentSummaryResponse = {
  document_id: string
  company_id: string
  file_name: string
  file_hash: string
  file_type: string
  file_size: number
  status: string
  chunk_total: number
  chunk_pending: number
  chunk_extracting: number
  chunk_done: number
  chunk_failed: number
  chunk_skipped: number
  attachment_total: number
  attachment_type_counts?: Record<string, number>
  knowledge_total: number
  created_at?: string | null
  updated_at?: string | null
}

/**
 * 文档来源平台。
 */
export type SourcePlatform = 'slack' | 'telegram' | 'discord' | 'feishu' | 'other'

/**
 * 文档摄取来源信息。
 * 对齐 SourceInfo。
 */
export type DocSourceInfo = {
  platform: SourcePlatform
  message_ids?: string[]
}

/**
 * `/api/v4/knowledge/doc` 占位接口请求。
 * 对齐 DocIngestionRequest。
 */
export type DocIngestionRequest = {
  company_id: string
  source: DocSourceInfo
  doc: string
}

/**
 * 简单布尔响应结构。
 * 对齐 SimpleResponse。
 */
export type SimpleResponse = {
  success: boolean
  reason?: string | null
}

/**
 * 文档处理状态详情。
 * 对齐 DocumentStatusResponse。
 */
export type DocumentStatusResponse = {
  id: string
  company_id: string
  file_name: string
  file_hash: string
  file_size: number
  file_type: string
  storage_url?: string | null
  uploaded_by?: string | null
  status: string
  error_message?: string | null
  knowledge_count?: number
  chunk_progress?: DocumentChunkProgress | null
  created_at?: string | null
  updated_at?: string | null
}

/**
 * API 错误对象。
 */
export class KnowledgeApiError extends Error {
  readonly status: number
  readonly detail?: unknown

  constructor(message: string, status: number, detail?: unknown) {
    super(message)
    this.name = 'KnowledgeApiError'
    this.status = status
    this.detail = detail
  }
}

/**
 * 构建查询参数。
 */
function buildQuery(params: Record<string, string | number | boolean | undefined>): string {
  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) {
      return
    }

    query.set(key, String(value))
  })

  const queryText = query.toString()
  return queryText ? `?${queryText}` : ''
}

/**
 * 统一请求入口。
 */
async function requestJson<TResponse>(
  path: string,
  init: RequestInit,
): Promise<TResponse> {
  const { baseUrl } = getKnowledgeApiConfig()
  const response = await fetch(`${baseUrl}${path}`, init)

  const text = await response.text()
  const body = text ? (JSON.parse(text) as unknown) : null

  if (!response.ok) {
    const message =
      typeof body === 'object' && body !== null && 'detail' in body
        ? String((body as Record<string, unknown>).detail)
        : `Knowledge API request failed: ${response.status}`

    throw new KnowledgeApiError(message, response.status, body)
  }

  return body as TResponse
}

/**
 * 统一二进制请求入口。
 * 主要用于附件下载类接口，返回 Blob 交给调用方自行处理（预览、下载等）。
 */
async function requestBlob(path: string, init: RequestInit): Promise<Blob> {
  const { baseUrl } = getKnowledgeApiConfig()
  const response = await fetch(`${baseUrl}${path}`, init)

  if (!response.ok) {
    const text = await response.text()
    const body = text ? (JSON.parse(text) as unknown) : null
    const message =
      typeof body === 'object' && body !== null && 'detail' in body
        ? String((body as Record<string, unknown>).detail)
        : `Knowledge API request failed: ${response.status}`

    throw new KnowledgeApiError(message, response.status, body)
  }

  return response.blob()
}

/**
 * GET /api/v4/knowledge/
 */
export async function listKnowledge(params: ListKnowledgeParams): Promise<KnowledgeListResponse> {
  const query = buildQuery({
    company_id: params.company_id,
    page: params.page,
    limit: params.limit,
    sort_by: params.sort_by,
    sort_order: params.sort_order,
    source_type: params.source_type ?? undefined,
    include_image: params.include_image,
  })

  return requestJson<KnowledgeListResponse>(`/api/v4/knowledge/${query}`, {
    method: 'GET',
  })
}

/**
 * POST /api/v4/knowledge/
 */
export async function createKnowledge(
  payload: CreateKnowledgeRequest,
): Promise<CreateKnowledgeResponse> {
  return requestJson<CreateKnowledgeResponse>('/api/v4/knowledge/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}

/**
 * GET /api/v4/knowledge/{knowledge_id}
 */
export async function getKnowledgeById(
  knowledgeId: string,
): Promise<KnowledgeDetailResponse> {
  return requestJson<KnowledgeDetailResponse>(
    `/api/v4/knowledge/${encodeURIComponent(knowledgeId)}`,
    {
      method: 'GET',
    },
  )
}

/**
 * GET /api/v4/knowledge/knowledge/{knowledge_id}/source
 */
export async function getKnowledgeSource(
  knowledgeId: string,
): Promise<KnowledgeSourceResponse> {
  return requestJson<KnowledgeSourceResponse>(
    `/api/v4/knowledge/knowledge/${encodeURIComponent(knowledgeId)}/source`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    },
  )
}

/**
 * GET /api/v4/knowledge/chunks/{chunk_id}
 * 说明：
 * - 入参既支持纯 `chunk_id`，也兼容 `doc_chunk_id`。
 * - 兼容后端两种响应形态：
 *   1) 直接返回 chunk 详情
 *   2) 返回 `{ chunk: {...} }`
 */
export async function getKnowledgeChunkById(
  chunkId: string,
): Promise<DocumentChunkDetailResponse> {
  const rawResponse = await requestJson<unknown>(
    `/api/v4/knowledge/chunks/${encodeURIComponent(chunkId)}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    },
  )

  const responseRecord = (rawResponse || {}) as Record<string, unknown>
  if (responseRecord.chunk && typeof responseRecord.chunk === 'object') {
    return responseRecord.chunk as DocumentChunkDetailResponse
  }

  return rawResponse as DocumentChunkDetailResponse
}

/**
 * GET /api/v4/knowledge/keyword-search
 */
export async function searchKnowledge(
  payload: SearchKnowledgeRequest,
): Promise<SearchKnowledgeResponse> {
  const query = buildQuery({
    keyword: payload.keyword,
    company_id: payload.company_id,
    limit: payload.limit,
    source_type: payload.source_type ?? undefined,
  })

  const rawResponse = await requestJson<unknown>(`/api/v4/knowledge/keyword-search${query}`, {
    method: 'GET',
  })

  /**
   * 兼容多种返回结构：
   * - 直接返回数组
   * - `{ items, total }`
   * - `{ results, count }`
   */
  if (Array.isArray(rawResponse)) {
    return {
      items: rawResponse as KnowledgeItem[],
      total: rawResponse.length,
    }
  }

  const responseRecord = (rawResponse || {}) as Record<string, unknown>
  const items =
    (Array.isArray(responseRecord.items) ? (responseRecord.items as KnowledgeItem[]) : null) ||
    (Array.isArray(responseRecord.results) ? (responseRecord.results as KnowledgeItem[]) : null) ||
    []
  const totalRaw = responseRecord.total ?? responseRecord.count
  const total =
    typeof totalRaw === 'number'
      ? totalRaw
      : typeof totalRaw === 'string'
        ? Number(totalRaw) || items.length
        : items.length

  return {
    items,
    total,
  }
}

/**
 * POST /api/v4/knowledge/update
 */
export async function updateKnowledge(
  payload: UpdateKnowledgeRequest,
): Promise<UpdateKnowledgeResponse> {
  return requestJson<UpdateKnowledgeResponse>('/api/v4/knowledge/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}

/**
 * 删除知识。
 * 使用固定接口：
 * - DELETE /api/v4/knowledge/{knowledge_id}?company_id=...
 */
export async function deleteKnowledge(
  payload: DeleteKnowledgeRequest,
): Promise<DeleteKnowledgeResponse> {
  const query = buildQuery({
    company_id: payload.company_id,
  })

  return requestJson<DeleteKnowledgeResponse>(
    `/api/v4/knowledge/${encodeURIComponent(payload.knowledge_id)}${query}`,
    {
      method: 'DELETE',
    },
  )
}

/**
 * POST /api/v4/knowledge/upload
 */
export async function uploadKnowledgeFile(
  payload: UploadKnowledgeFileRequest,
): Promise<UploadKnowledgeResponse> {
  const formData = new FormData()
  formData.set('company_id', payload.company_id)
  formData.set('file', payload.file)

  return requestJson<UploadKnowledgeResponse>('/api/v4/knowledge/upload', {
    method: 'POST',
    body: formData,
  })
}

/**
 * POST /api/v4/knowledge/upload-document
 *
 * 上传文档并在文档注册表创建记录，返回 `document_id` 供后续触发处理与轮询状态使用。
 */
export async function uploadKnowledgeDocument(
  payload: UploadDocumentRequest,
): Promise<UploadDocumentResponse> {
  const formData = new FormData()
  formData.set('company_id', payload.company_id)
  formData.set('file', payload.file)

  if (payload.uploaded_by !== undefined) {
    formData.set('uploaded_by', payload.uploaded_by)
  }
  if (payload.auto_process !== undefined) {
    formData.set('auto_process', String(payload.auto_process))
  }

  return requestJson<UploadDocumentResponse>('/api/v4/knowledge/upload-document', {
    method: 'POST',
    body: formData,
  })
}

/**
 * POST /api/v4/knowledge/process-document/{document_id}
 *
 * 用于手动触发已上传文档的处理流程。
 * 接口会立即返回任务受理结果，实际处理在后台异步执行。
 */
export async function processDocumentTrigger(
  documentId: string,
  options?: {
    skip_extraction?: boolean
  },
): Promise<ProcessDocumentTriggerResponse> {
  const query = buildQuery({
    skip_extraction: options?.skip_extraction,
  })

  return requestJson<ProcessDocumentTriggerResponse>(
    `/api/v4/knowledge/process-document/${encodeURIComponent(documentId)}${query}`,
    {
      method: 'POST',
    },
  )
}

/**
 * POST /api/v4/knowledge/process-extraction
 *
 * 用于在文档已进入可处理状态后，重新触发抽取阶段（stage-3）。
 * 常见场景：
 * - 文档已 completed，需要“重新生成”
 * - 针对某个文档/公司/文件名进行抽取重跑
 */
export async function processExtractionTrigger(
  params: ProcessExtractionTriggerParams,
): Promise<ProcessDocumentTriggerResponse> {
  const query = buildQuery({
    document_id: params.document_id,
    company_id: params.company_id,
    file_name: params.file_name,
    only_failed: params.only_failed,
    reextract_done: params.reextract_done,
  })

  return requestJson<ProcessDocumentTriggerResponse>(`/api/v4/knowledge/process-extraction${query}`, {
    method: 'POST',
  })
}

/**
 * POST /api/v4/knowledge/process-extraction-by-chunks
 *
 * 仅重试用户勾选的失败 chunk。
 */
export async function processExtractionByChunks(
  payload: ProcessExtractionByChunksRequest,
): Promise<ProcessExtractionByChunksResponse> {
  return requestJson<ProcessExtractionByChunksResponse>('/api/v4/knowledge/process-extraction-by-chunks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}

/**
 * GET /api/v4/knowledge/documents
 */
export async function listKnowledgeDocuments(
  params: ListKnowledgeDocumentsParams | string,
): Promise<KnowledgeDocumentsResponse> {
  const normalizedParams =
    typeof params === 'string'
      ? ({
          company_id: params,
        } satisfies ListKnowledgeDocumentsParams)
      : params

  const query = buildQuery({
    company_id: normalizedParams.company_id,
    status: normalizedParams.status ?? undefined,
    limit: normalizedParams.limit,
    offset: normalizedParams.offset,
  })

  return requestJson<KnowledgeDocumentsResponse>(`/api/v4/knowledge/documents${query}`, {
    method: 'GET',
  })
}

/**
 * GET /api/v4/knowledge/document-status/{document_id}
 */
export async function getDocumentStatus(
  documentId: string,
): Promise<DocumentStatusResponse> {
  return requestJson<DocumentStatusResponse>(
    `/api/v4/knowledge/document-status/${encodeURIComponent(documentId)}`,
    {
      method: 'GET',
    },
  )
}

/**
 * GET /api/v4/knowledge/documents/{document_id}/meta
 */
export async function getDocumentMeta(documentId: string): Promise<DocumentMetaResponse> {
  return requestJson<DocumentMetaResponse>(
    `/api/v4/knowledge/documents/${encodeURIComponent(documentId)}/meta`,
    {
      method: 'GET',
    },
  )
}

/**
 * GET /api/v4/knowledge/documents/{document_id}/chunks
 */
export async function listDocumentChunks(
  documentId: string,
  params?: ListDocumentChunksParams,
): Promise<DocumentChunkListResponse> {
  const query = buildQuery({
    extraction_status: params?.extraction_status ?? undefined,
    limit: params?.limit,
    offset: params?.offset,
  })

  return requestJson<DocumentChunkListResponse>(
    `/api/v4/knowledge/documents/${encodeURIComponent(documentId)}/chunks${query}`,
    {
      method: 'GET',
    },
  )
}

/**
 * GET /api/v4/knowledge/documents/{document_id}/chunks/{chunk_id}
 */
export async function getDocumentChunkDetail(
  documentId: string,
  chunkId: string,
): Promise<DocumentChunkDetailResponse> {
  return requestJson<DocumentChunkDetailResponse>(
    `/api/v4/knowledge/documents/${encodeURIComponent(documentId)}/chunks/${encodeURIComponent(chunkId)}`,
    {
      method: 'GET',
    },
  )
}

/**
 * GET /api/v4/knowledge/documents/{document_id}/attachments
 */
export async function listDocumentAttachments(
  documentId: string,
): Promise<AttachmentListResponse> {
  return requestJson<AttachmentListResponse>(
    `/api/v4/knowledge/documents/${encodeURIComponent(documentId)}/attachments`,
    {
      method: 'GET',
    },
  )
}

/**
 * GET /api/v4/knowledge/chunks/{chunk_id}/attachments
 */
export async function listChunkAttachments(chunkId: string): Promise<AttachmentListResponse> {
  return requestJson<AttachmentListResponse>(
    `/api/v4/knowledge/chunks/${encodeURIComponent(chunkId)}/attachments`,
    {
      method: 'GET',
    },
  )
}

/**
 * GET /api/v4/knowledge/attachments/{attachment_id}/download
 * 说明：
 * - `proxy=true`：通过 API 代理流式返回文件。
 * - `proxy=false`：通常会重定向到存储地址，fetch 会自动跟随并返回最终文件 Blob。
 */
export async function downloadKnowledgeAttachment(
  attachmentId: string,
  proxy?: boolean,
): Promise<Blob> {
  const query = buildQuery({ proxy })
  return requestBlob(
    `/api/v4/knowledge/attachments/${encodeURIComponent(attachmentId)}/download${query}`,
    {
      method: 'GET',
    },
  )
}

/**
 * GET /api/v4/knowledge/documents/{document_id}/knowledge
 */
export async function listDocumentKnowledge(
  documentId: string,
  params?: ListDocumentKnowledgeParams,
): Promise<DocumentKnowledgeListResponse> {
  const query = buildQuery({
    limit: params?.limit,
    offset: params?.offset,
  })

  return requestJson<DocumentKnowledgeListResponse>(
    `/api/v4/knowledge/documents/${encodeURIComponent(documentId)}/knowledge${query}`,
    {
      method: 'GET',
    },
  )
}

/**
 * GET /api/v4/knowledge/documents/{document_id}/pipeline-progress
 */
export async function getDocumentPipelineProgress(
  documentId: string,
): Promise<DocumentPipelineProgressResponse> {
  return requestJson<DocumentPipelineProgressResponse>(
    `/api/v4/knowledge/documents/${encodeURIComponent(documentId)}/pipeline-progress`,
    {
      method: 'GET',
    },
  )
}

/**
 * GET /api/v4/knowledge/documents/{document_id}/progress
 */
export async function getDocumentProgress(documentId: string): Promise<DocumentProgressResponse> {
  return requestJson<DocumentProgressResponse>(
    `/api/v4/knowledge/documents/${encodeURIComponent(documentId)}/progress`,
    {
      method: 'GET',
    },
  )
}

/**
 * GET /api/v4/knowledge/documents/{document_id}/summary
 */
export async function getDocumentSummary(documentId: string): Promise<DocumentSummaryResponse> {
  return requestJson<DocumentSummaryResponse>(
    `/api/v4/knowledge/documents/${encodeURIComponent(documentId)}/summary`,
    {
      method: 'GET',
    },
  )
}

/**
 * POST /api/v4/web-crawl
 */
export async function startWebCrawlJob(
  payload: StartWebCrawlRequest,
): Promise<StartWebCrawlResponse> {
  return requestJson<StartWebCrawlResponse>('/api/v4/web-crawl', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      company_id: payload.company_id,
      source_url: payload.source_url,
      max_depth: payload.max_depth ?? 2,
      max_pages: payload.max_pages ?? 10,
      include_paths: payload.include_paths ?? undefined,
      exclude_paths: payload.exclude_paths ?? undefined,
    }),
  })
}

/**
 * GET /api/v4/web-crawl
 */
export async function listWebCrawlJobs(
  params: ListWebCrawlJobsParams,
): Promise<ListWebCrawlJobsResponse> {
  const query = buildQuery({
    company_id: params.company_id,
    status: params.status ?? undefined,
    limit: params.limit,
    offset: params.offset,
  })

  return requestJson<ListWebCrawlJobsResponse>(`/api/v4/web-crawl${query}`, {
    method: 'GET',
  })
}

/**
 * GET /api/v4/web-crawl/{job_id}
 */
export async function getWebCrawlJobStatus(
  jobId: string,
): Promise<WebCrawlJobStatusResponse> {
  return requestJson<WebCrawlJobStatusResponse>(
    `/api/v4/web-crawl/${encodeURIComponent(jobId)}`,
    {
      method: 'GET',
    },
  )
}

/**
 * POST /api/v4/knowledge/doc
 * 当前是服务端占位接口，用于接受归并后的文档正文并返回成功态。
 */
export async function ingestDocument(payload: DocIngestionRequest): Promise<SimpleResponse> {
  return requestJson<SimpleResponse>('/api/v4/knowledge/doc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}
