import type {
  DocumentPipelineProgressResponse,
  WebCrawlJobStatusResponse,
} from '@/lib/services/knowledge-api'

/**
 * 上传任务状态：
 * - `queued/uploading/processing` 视为进行中
 * - `completed/failed` 视为终态
 */
export type UploadTaskStatus =
  | 'queued'
  | 'uploading'
  | 'processing'
  | 'completed'
  | 'failed'

/**
 * 页面内存态任务结构。
 */
export type UploadTaskItem = {
  id: string
  fileName: string
  documentId: string | null
  status: UploadTaskStatus
  progress: number
  statusText: string
  errorMessage: string | null
  createdAt: number
}

/**
 * localStorage 持久化任务结构。
 * 约束：
 * - 仅持久化 `documentId` 已存在的任务。
 * - 不持久化本地临时 `id`，避免刷新后出现重复主键冲突。
 */
export type PersistedUploadTask = {
  fileName: string
  documentId: string
  status: UploadTaskStatus
  progress: number
  statusText: string
  errorMessage: string | null
  createdAt: number
}

export const KNOWLEDGE_UPLOAD_TASKS_STORAGE_KEY =
  'knowledge_upload_tasks_v1'
export const KNOWLEDGE_UPLOAD_TASKS_UPDATED_EVENT =
  'knowledge-upload-tasks-updated'
export const KNOWLEDGE_UPLOAD_TASKS_CLEARED_EVENT =
  'knowledge-upload-tasks-cleared'
export const KNOWLEDGE_OPEN_DOCUMENT_RESULT_EVENT =
  'knowledge-open-document-result'
export const KNOWLEDGE_RESULT_QUERY_PARAM = 'doc_result_document_id'
export const WEB_CRAWL_TASK_PREFIX = 'crawl:'
export const DOCUMENT_STATUS_POLL_INTERVAL_MS = 2000
export const DOCUMENT_STATUS_MAX_ATTEMPTS = 900

/**
 * 文档处理成功状态集合。
 */
export const DOCUMENT_SUCCESS_STATUSES = new Set<string>([
  'completed',
  'success',
  'done',
  'processed',
  'ready',
])

/**
 * 文档处理失败状态集合。
 */
export const DOCUMENT_FAILED_STATUSES = new Set<string>([
  'failed',
  'error',
  'cancelled',
])

/**
 * 标准化后端状态字符串，避免大小写和空白差异导致判断错误。
 */
export function normalizeDocumentStatus(
  status: string | null | undefined,
): string {
  return (status || '').trim().toLowerCase()
}

/**
 * 判断任务是否已经进入终态。
 */
export function isUploadTaskTerminalStatus(status: UploadTaskStatus): boolean {
  return status === 'completed' || status === 'failed'
}

/**
 * 将 web crawl `job_id` 投影为统一 documentId 语义。
 */
export function toWebCrawlTaskDocumentId(jobId: string): string {
  return `${WEB_CRAWL_TASK_PREFIX}${jobId}`
}

/**
 * 从任务 documentId 中解析 web crawl `job_id`。
 */
export function parseWebCrawlJobIdFromTaskDocumentId(
  documentId: string | null,
): string | null {
  if (!documentId || !documentId.startsWith(WEB_CRAWL_TASK_PREFIX)) {
    return null
  }
  const jobId = documentId.slice(WEB_CRAWL_TASK_PREFIX.length).trim()
  return jobId || null
}

/**
 * 判断任务是否为 web crawl 类型。
 */
export function isWebCrawlTaskDocumentId(
  documentId: string | null,
): boolean {
  return parseWebCrawlJobIdFromTaskDocumentId(documentId) !== null
}

/**
 * 文档进度统一映射到 0~100。
 *
 * 说明：
 * - 后端阶段本身是离散状态，这里做统一权重映射，避免“阶段切换进度回跳”。
 * - 非终态最高展示 99%，成功终态直接 100%。
 */
export function getDocumentProgressPercentage(
  progress: DocumentPipelineProgressResponse,
): number {
  const normalizedDocumentStatus = normalizeDocumentStatus(
    progress.document_status,
  )
  if (DOCUMENT_SUCCESS_STATUSES.has(normalizedDocumentStatus)) {
    return 100
  }

  const stageWeightMap: Record<string, number> = {
    uploaded: 20,
    parsed: 20,
    chunked: 20,
    extracting: 35,
    completed: 5,
  }

  const stageStatusMap = new Map<string, string>(
    (progress.stages || []).map((stage) => [
      stage.name,
      normalizeDocumentStatus(stage.status),
    ]),
  )

  const getDefaultCompletionByStatus = (status: string): number => {
    if (status === 'done' || status === 'failed') {
      return 1
    }
    if (status === 'partial') {
      return 0.65
    }
    if (status === 'running') {
      return 0.4
    }
    return 0
  }

  let weightedProgress = 0
  for (const [stageName, stageWeight] of Object.entries(stageWeightMap)) {
    const stageStatus = stageStatusMap.get(stageName) || 'pending'
    let completion = getDefaultCompletionByStatus(stageStatus)

    if (stageName === 'extracting') {
      const chunkTotal = progress.chunk_total
      if (chunkTotal > 0) {
        const finishedChunks =
          progress.chunk_done + progress.chunk_failed + progress.chunk_skipped
        completion = Math.min(
          1,
          Math.max(0, finishedChunks / chunkTotal),
        )
      }
    }

    weightedProgress += stageWeight * completion
  }

  return Math.min(99, Math.max(0, Math.round(weightedProgress)))
}

/**
 * Web crawl 任务进度映射到 0~100。
 *
 * 说明：
 * - 有 `pages_found` 时优先按已完成页面比例计算；
 * - 无页面统计时按状态给出兜底进度，避免 UI 长时间显示 0%。
 */
export function getWebCrawlProgressPercentage(
  progress: WebCrawlJobStatusResponse,
): number {
  const normalizedStatus = normalizeDocumentStatus(progress.status)
  if (DOCUMENT_SUCCESS_STATUSES.has(normalizedStatus)) {
    return 100
  }

  const pagesFound = progress.pages_found || 0
  const pagesFinished =
    (progress.pages_processed || 0) + (progress.pages_failed || 0)
  if (pagesFound > 0) {
    const ratio = Math.min(1, Math.max(0, pagesFinished / pagesFound))
    return Math.min(99, Math.max(15, Math.round(15 + ratio * 80)))
  }

  if (normalizedStatus === 'pending') {
    return 10
  }
  if (normalizedStatus === 'crawling') {
    return 25
  }
  if (normalizedStatus === 'processing') {
    return 55
  }
  if (normalizedStatus === 'failed') {
    return 12
  }

  return 20
}

/**
 * 从 localStorage 恢复任务。
 */
export function loadPersistedUploadTasks(): PersistedUploadTask[] {
  if (typeof window === 'undefined') {
    return []
  }

  const rawValue = window.localStorage.getItem(
    KNOWLEDGE_UPLOAD_TASKS_STORAGE_KEY,
  )
  if (!rawValue) {
    return []
  }

  try {
    const parsedValue = JSON.parse(rawValue) as unknown
    if (!Array.isArray(parsedValue)) {
      return []
    }

    return parsedValue.filter(
      (entry): entry is PersistedUploadTask => {
        if (!entry || typeof entry !== 'object') {
          return false
        }

        const record = entry as Record<string, unknown>
        return (
          typeof record.fileName === 'string' &&
          typeof record.documentId === 'string' &&
          typeof record.status === 'string' &&
          typeof record.progress === 'number' &&
          typeof record.statusText === 'string' &&
          typeof record.createdAt === 'number'
        )
      },
    )
  } catch {
    return []
  }
}

/**
 * 写入 localStorage。
 */
export function persistUploadTasks(tasks: PersistedUploadTask[]): void {
  if (typeof window === 'undefined') {
    return
  }

  const normalizedTasks = tasks.filter(
    (task) => typeof task.documentId === 'string' && task.documentId.trim(),
  )
  window.localStorage.setItem(
    KNOWLEDGE_UPLOAD_TASKS_STORAGE_KEY,
    JSON.stringify(normalizedTasks),
  )
}

/**
 * 轮询等待辅助函数。
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
