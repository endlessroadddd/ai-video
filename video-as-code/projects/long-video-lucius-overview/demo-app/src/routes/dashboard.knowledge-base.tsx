import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import {
  AlertCircle,
  ChevronDown,
  CloudUpload,
  EllipsisVertical,
  Eye,
  FileText,
  ImageIcon,
  Maximize2,
  Pencil,
  PencilLine,
  Plus,
  RefreshCcw,
  Search,
  Trash2,
  X,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'

import { KnowledgeFileTypeIcon } from '@/components/dashboard/KnowledgeFileTypeIcon'
import { CompanySelectionPrompt } from '@/components/company-selection-prompt'
import { DashboardPageHeader } from '@/components/dashboard-page-header'
import { DashboardPageLayout, DashboardPageLayoutCard } from '@/components/dashboard-page-layout'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Textarea } from '@/components/ui/textarea'
import { requireAuthOrRedirect } from '@/lib/auth/guard'
import { DEFAULT_CLIENT_CHAT_RECORDING_SCENARIO } from '@/lib/client-chat-recording'
import { useSelectedCompanyId } from '@/lib/company-selection'
import { isDemoMode } from '@/lib/demo/mode'
import { normalizeFailedChunkDetails, type FailedChunkDetail } from '@/lib/knowledge-document-status'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import { useViewportProfile } from '@/lib/use-viewport-profile'
import { m } from '@/paraglide/messages'
import { getLocale } from '@/paraglide/runtime'
import {
  getKnowledgeApiConfig,
  getKnowledgeById,
  getKnowledgeChunkById,
  getDocumentPipelineProgress,
  getWebCrawlJobStatus,
  getKnowledgeSource,
  listDocumentAttachments,
  listDocumentKnowledge,
  processExtractionByChunks,
  processExtractionTrigger,
  startWebCrawlJob,
  processDocumentTrigger,
  uploadKnowledgeDocument,
  type AttachmentItem,
  type CreateKnowledgeRequest,
  type DocumentPipelineProgressResponse,
  type DocumentKnowledgeItem,
  type KnowledgeItem,
  type ListKnowledgeDocumentsParams,
  type ListKnowledgeParams,
  type UpdateKnowledgeRequest,
} from '@/lib/services/knowledge-api'
import {
  DOCUMENT_FAILED_STATUSES,
  DOCUMENT_STATUS_MAX_ATTEMPTS,
  DOCUMENT_STATUS_POLL_INTERVAL_MS,
  DOCUMENT_SUCCESS_STATUSES,
  KNOWLEDGE_OPEN_DOCUMENT_RESULT_EVENT,
  KNOWLEDGE_RESULT_QUERY_PARAM,
  KNOWLEDGE_UPLOAD_TASKS_CLEARED_EVENT,
  KNOWLEDGE_UPLOAD_TASKS_STORAGE_KEY,
  KNOWLEDGE_UPLOAD_TASKS_UPDATED_EVENT,
  type PersistedUploadTask,
  type UploadTaskItem,
  getDocumentProgressPercentage,
  getWebCrawlProgressPercentage,
  isUploadTaskTerminalStatus,
  isWebCrawlTaskDocumentId,
  loadPersistedUploadTasks,
  normalizeDocumentStatus,
  parseWebCrawlJobIdFromTaskDocumentId,
  sleep,
  toWebCrawlTaskDocumentId,
} from '@/lib/knowledge-upload-task'
import { useCreateKnowledge, useDeleteKnowledge, useDocumentStatus, useKnowledgeDetail, useKnowledgeDocuments, useKnowledgeList, useKnowledgeSearch, useUpdateKnowledge } from '@/lib/services/knowledge-query'

export const Route = createFileRoute('/dashboard/knowledge-base')({
  beforeLoad: async ({ location }) => {
    await requireAuthOrRedirect(location)
  },
  component: KnowledgeBasePage,
})

type KnowledgeSource = 'official_doc' | 'web_crawl' | 'session_record' | 'manual'

type KnowledgeCardItem = {
  id: string
  title: string
  summary: string
  source: KnowledgeSource
  updatedAt: string
}

type KnowledgeTab = 'all' | 'docs'
type UploadKnowledgeMode = 'upload-doc' | 'manual' | 'crawl-url'
type UploadDocumentStage = 'idle' | 'uploading' | 'processing' | 'finished'
type KnowledgeSourceFilter = 'all' | 'document' | 'chat_history' | 'manual'

type KnowledgeDocumentRow = {
  id: string
  documentId: string
  title: string
  uploader: string
  generatedKnowledgeCount: number
  uploadedAt: string
  status: string | null
  fileType: string | null
  fileSize: number | null
}

/**
 * 来源标签样式映射：
 * - 颜色直接对齐 Figma 标注。
 * - 将视觉值集中维护，避免 JSX 内部散落硬编码。
 */
const SOURCE_STYLE_MAP: Record<KnowledgeSource, { bg: string; border: string; text: string }> = {
  official_doc: { bg: '#ece7f8', border: '#d8cff0', text: '#644fb8' },
  web_crawl: { bg: '#f3f0eb', border: '#d4d0ca', text: '#4c4b69' },
  session_record: { bg: '#efe8fb', border: '#ddd2f4', text: '#5a4aa6' },
  manual: { bg: '#ebe7e0', border: '#d4d0ca', text: '#4c4b69' },
}

const PAGE_SIZE = 20
const DOCUMENT_INSIGHT_KNOWLEDGE_PAGE_SIZE = 50

type Locale = 'zh' | 'en'

type TranslationKey =
  | 'common.clear'
  | 'common.cancel'
  | 'common.close'
  | 'common.delete'
  | 'common.edit'
  | 'common.error'
  | 'common.next'
  | 'common.previous'
  | 'common.unknown'
  | 'common.unknownUser'
  | 'knowledge.chunkList'
  | 'knowledge.closeImagePreview'
  | 'knowledge.deleteConfirmAction'
  | 'knowledge.deleteConfirmDescPrefix'
  | 'knowledge.deleteConfirmTitle'
  | 'knowledge.deleteFailed'
  | 'knowledge.deleting'
  | 'knowledge.docInsightTitle'
  | 'knowledge.docTitle'
  | 'knowledge.generatedCount'
  | 'knowledge.imageAttachments'
  | 'knowledge.imagePreviewHint'
  | 'knowledge.loadAttachmentsFailed'
  | 'knowledge.loadChunksFailed'
  | 'knowledge.manualKnowledgePrefix'
  | 'knowledge.noChunkData'
  | 'knowledge.noImageAttachments'
  | 'knowledge.noSourceDocumentUrl'
  | 'knowledge.preview'
  | 'knowledge.roleAssistant'
  | 'knowledge.roleUser'
  | 'knowledge.searchPlaceholder'
  | 'knowledge.sessionNotFound'
  | 'knowledge.sourceFilter'
  | 'knowledge.sourceManual'
  | 'knowledge.sourceOfficialDoc'
  | 'knowledge.sourceWebCrawl'
  | 'knowledge.sourceSessionRecord'
  | 'knowledge.sourceTitle'
  | 'knowledge.uploadCrawlHint'
  | 'knowledge.uploadCrawlMaxDepthLabel'
  | 'knowledge.uploadCrawlMaxPagesLabel'
  | 'knowledge.uploadCrawlTab'
  | 'knowledge.uploadCrawlUrlLabel'
  | 'knowledge.uploadCrawlUrlPlaceholder'
  | 'knowledge.uploadCrawlUrlRequired'
  | 'knowledge.tabDocs'
  | 'knowledge.tabItems'
  | 'knowledge.totalCountPrefix'
  | 'knowledge.totalCountSuffix'
  | 'knowledge.totalPrefix'
  | 'knowledge.typeSize'
  | 'knowledge.uploadDialogTitle'
  | 'knowledge.uploadDocClick'
  | 'knowledge.uploadDocDragHint'
  | 'knowledge.uploadDocFormatHint'
  | 'knowledge.uploadDocTab'
  | 'knowledge.uploadKnowledge'
  | 'knowledge.uploadManualTab'
  | 'knowledge.uploadProgressPrefix'
  | 'knowledge.uploadSelectedFilesTitle'
  | 'knowledge.uploadSelectedPrefix'
  | 'knowledge.uploadSubmit'
  | 'knowledge.uploader'
  | 'knowledge.uploadedAt'
  | 'knowledge.uploading'
  | 'knowledge.viewDocument'
  | 'knowledge.viewSource'
  | 'session.unknownChannel'

function t(key: TranslationKey, _locale: Locale): string {
  switch (key) {
    case 'common.clear':
      return m.common_clear()
    case 'common.cancel':
      return m.common_cancel()
    case 'common.close':
      return m.common_close()
    case 'common.delete':
      return m.common_delete()
    case 'common.edit':
      return m.common_edit()
    case 'common.error':
      return m.common_error()
    case 'common.next':
      return m.common_next()
    case 'common.previous':
      return m.common_previous()
    case 'common.unknown':
      return m.common_unknown()
    case 'common.unknownUser':
      return m.common_unknown_user()
    case 'knowledge.chunkList':
      return m.knowledge_chunk_list()
    case 'knowledge.closeImagePreview':
      return m.knowledge_close_image_preview()
    case 'knowledge.deleteConfirmAction':
      return m.knowledge_delete_confirm_action()
    case 'knowledge.deleteConfirmDescPrefix':
      return m.knowledge_delete_confirm_desc_prefix()
    case 'knowledge.deleteConfirmTitle':
      return m.knowledge_delete_confirm_title()
    case 'knowledge.deleteFailed':
      return m.knowledge_delete_failed()
    case 'knowledge.deleting':
      return m.knowledge_deleting()
    case 'knowledge.docInsightTitle':
      return m.knowledge_doc_insight_title()
    case 'knowledge.docTitle':
      return m.knowledge_doc_title()
    case 'knowledge.generatedCount':
      return m.knowledge_generated_count()
    case 'knowledge.imageAttachments':
      return m.knowledge_image_attachments()
    case 'knowledge.imagePreviewHint':
      return m.knowledge_image_preview_hint()
    case 'knowledge.loadAttachmentsFailed':
      return m.knowledge_load_attachments_failed()
    case 'knowledge.loadChunksFailed':
      return m.knowledge_load_chunks_failed()
    case 'knowledge.manualKnowledgePrefix':
      return m.knowledge_manual_knowledge_prefix()
    case 'knowledge.noChunkData':
      return m.knowledge_no_chunk_data()
    case 'knowledge.noImageAttachments':
      return m.knowledge_no_image_attachments()
    case 'knowledge.noSourceDocumentUrl':
      return m.knowledge_no_source_document_url()
    case 'knowledge.preview':
      return m.knowledge_preview()
    case 'knowledge.roleAssistant':
      return m.knowledge_role_assistant()
    case 'knowledge.roleUser':
      return m.knowledge_role_user()
    case 'knowledge.searchPlaceholder':
      return m.knowledge_search_placeholder()
    case 'knowledge.sessionNotFound':
      return m.knowledge_session_not_found()
    case 'knowledge.sourceFilter':
      return m.knowledge_source_filter()
    case 'knowledge.sourceManual':
      return m.knowledge_source_manual()
    case 'knowledge.sourceOfficialDoc':
      return m.knowledge_source_official_doc()
    case 'knowledge.sourceWebCrawl':
      return m.knowledge_source_web_crawl()
    case 'knowledge.sourceSessionRecord':
      return m.knowledge_source_session_record()
    case 'knowledge.sourceTitle':
      return m.knowledge_source_title()
    case 'knowledge.uploadCrawlHint':
      return m.knowledge_upload_crawl_hint()
    case 'knowledge.uploadCrawlMaxDepthLabel':
      return m.knowledge_upload_crawl_max_depth_label()
    case 'knowledge.uploadCrawlMaxPagesLabel':
      return m.knowledge_upload_crawl_max_pages_label()
    case 'knowledge.uploadCrawlTab':
      return m.knowledge_upload_crawl_tab()
    case 'knowledge.uploadCrawlUrlLabel':
      return m.knowledge_upload_crawl_url_label()
    case 'knowledge.uploadCrawlUrlPlaceholder':
      return m.knowledge_upload_crawl_url_placeholder()
    case 'knowledge.uploadCrawlUrlRequired':
      return m.knowledge_upload_crawl_url_required()
    case 'knowledge.tabDocs':
      return m.knowledge_tab_docs()
    case 'knowledge.tabItems':
      return m.knowledge_tab_items()
    case 'knowledge.totalCountPrefix':
      return m.knowledge_total_count_prefix()
    case 'knowledge.totalCountSuffix':
      return m.knowledge_total_count_suffix()
    case 'knowledge.totalPrefix':
      return m.knowledge_total_prefix()
    case 'knowledge.typeSize':
      return m.knowledge_type_size()
    case 'knowledge.uploadDialogTitle':
      return m.knowledge_upload_dialog_title()
    case 'knowledge.uploadDocClick':
      return m.knowledge_upload_doc_click()
    case 'knowledge.uploadDocDragHint':
      return m.knowledge_upload_doc_drag_hint()
    case 'knowledge.uploadDocFormatHint':
      return m.knowledge_upload_doc_format_hint()
    case 'knowledge.uploadDocTab':
      return m.knowledge_upload_doc_tab()
    case 'knowledge.uploadKnowledge':
      return m.knowledge_upload_knowledge()
    case 'knowledge.uploadManualTab':
      return m.knowledge_upload_manual_tab()
    case 'knowledge.uploadProgressPrefix':
      return m.knowledge_upload_progress_prefix()
    case 'knowledge.uploadSelectedFilesTitle':
      return m.knowledge_upload_selected_files_title()
    case 'knowledge.uploadSelectedPrefix':
      return m.knowledge_upload_selected_prefix()
    case 'knowledge.uploadSubmit':
      return m.knowledge_upload_submit()
    case 'knowledge.uploader':
      return m.knowledge_uploader()
    case 'knowledge.uploadedAt':
      return m.knowledge_uploaded_at()
    case 'knowledge.uploading':
      return m.knowledge_uploading()
    case 'knowledge.viewDocument':
      return m.knowledge_view_document()
    case 'knowledge.viewSource':
      return m.knowledge_view_source()
    case 'session.unknownChannel':
      return m.session_unknown_channel()
  }
}

type SessionMessageUser = {
  username?: string | null
  avatar_url?: string | null
}

type SessionMessage = {
  id: string
  room_name?: string | null
  message_role?: string | null
  sent_at?: string | null
  content?: string | null
  server_user?: SessionMessageUser | null
}

type SessionDetail = {
  id: string
  room_messages?: SessionMessage[]
}

/**
 * 会话详情查询：
 * - 兼容 `/api/v1/sessions/{id}` 的新旧响应格式。
 * - 若未配置会话服务地址则直接返回空，避免阻塞主页面。
 */
function useSessionDetail(sessionId: string) {
  const query = useQuery<SessionDetail | null, Error>({
    queryKey: ['svc', 'session-detail', sessionId],
    enabled: Boolean(sessionId),
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const viteEnv = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env
      const baseUrl =
        viteEnv?.VITE_SESSION_API_BASE_URL ||
        viteEnv?.VITE_FASTAPI_BASE_URL ||
        process.env.VITE_SESSION_API_BASE_URL ||
        process.env.VITE_FASTAPI_BASE_URL

      if (!baseUrl) {
        return null
      }

      const normalizedBaseUrl = baseUrl.replace(/\/$/, '')
      const response = await fetch(`${normalizedBaseUrl}/api/v1/sessions/${encodeURIComponent(sessionId)}`)
      if (!response.ok) {
        throw new Error(m.knowledge_session_load_failed({ status: String(response.status) }))
      }

      const raw = (await response.json()) as unknown
      const record = (raw || {}) as Record<string, unknown>
      const dataRecord = (record.data || {}) as Record<string, unknown>
      const nestedSession = (dataRecord.session || null) as SessionDetail | null
      if (nestedSession?.id) {
        return nestedSession
      }

      const legacySession = (record || null) as SessionDetail | null
      if (legacySession?.id) {
        return legacySession
      }

      return null
    },
  })

  return {
    session: query.data ?? null,
    loading: query.isLoading || query.isFetching,
  }
}

/**
 * 当前登录用户标识：
 * - 优先 email，回退 user id。
 * - 用于上传文档时透传 `uploaded_by`。
 */
function useCurrentUserIdentifier() {
  return useQuery<string | null, Error>({
    queryKey: ['supabase', 'auth-user-identifier'],
    staleTime: 60_000,
    queryFn: async () => {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        throw error
      }
      const user = data.user
      return user?.email || user?.id || null
    },
  })
}

/**
 * 根据接口字段推断来源标签：
 * - `session_id !== null` 时，固定视为「会话记录」
 * - `source_type === manual` 时，视为「手动添加」
 * - `source_type === document` 时，视为「官方文档」
 * - `source_type === chat_history` 时，视为「会话记录」
 * - 其余情况按旧规则兜底，避免历史数据无来源标签
 */
function inferSource(item: KnowledgeItem): KnowledgeSource {
  // 规则 1：只要 session_id 非空，优先判定为会话记录。
  if (item.session_id !== null && item.session_id !== undefined && item.session_id !== '') {
    return 'session_record'
  }

  // 规则 2/3：显式 source_type 映射。
  if (item.source_type === 'manual') {
    return 'manual'
  }
  if (item.source_type === 'chat_history') {
    return 'session_record'
  }
  if (item.source_type === 'document' || item.source_type === 'faq') {
    return 'official_doc'
  }
  if (item.source_type === 'web_crawl') {
    return 'web_crawl'
  }

  // 历史兼容：老数据可能没有 source_type，但仍带有会话消息来源信息。
  if (item.source_message_ids && item.source_message_ids.length > 0) {
    return 'session_record'
  }

  // 历史兼容：有文档路径时按官方文档处理。
  if (item.doc_file_path) {
    return 'official_doc'
  }

  // 默认兜底为手动添加，确保 UI 一定有来源展示。
  return 'manual'
}

/**
 * 接口数据转页面渲染模型。
 */
function toCardItem(item: KnowledgeItem): KnowledgeCardItem {
  const locale = getLocale() === 'zh' ? 'zh-CN' : 'en-US'
  /**
   * 列表时间统一使用创建时间：
   * - 优先 `created_at`
   * - 历史数据缺失时回退到 `updated_at`
   */
  const listTime = item.created_at || item.updated_at

  return {
    id: item.id,
    title: item.key || m.kb_unknown_title(),
    summary: item.answer || item.text || '',
    source: inferSource(item),
    updatedAt: listTime
      ? new Date(listTime).toLocaleString(locale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      : '--',
  }
}

/**
 * 从后端的宽松文档记录中提取字符串字段。
 * 这里兼容不同命名风格，避免后端字段调整导致页面空白。
 */
function pickStringValue(record: Record<string, unknown>, keys: string[]): string | null {
  for (const key of keys) {
    const value = record[key]
    if (typeof value === 'string' && value.trim() !== '') {
      return value.trim()
    }
  }
  return null
}

/**
 * 从后端的宽松文档记录中提取数值字段。
 */
function pickNumberValue(record: Record<string, unknown>, keys: string[]): number | null {
  for (const key of keys) {
    const value = record[key]
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value
    }
    if (typeof value === 'string' && value.trim() !== '') {
      const parsed = Number(value)
      if (Number.isFinite(parsed)) {
        return parsed
      }
    }
  }
  return null
}

/**
 * 将后端日期字段统一格式化为页面展示字符串。
 */
function formatDateTime(value: string | null): string {
  if (!value) {
    return '--'
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleString(getLocale() === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

function getKnowledgeProgressStatusLabel(status: string | null | undefined): string {
  const normalizedStatus = normalizeDocumentStatus(status)

  if (normalizedStatus === 'completed') {
    return m.knowledge_upload_status_completed()
  }

  if (normalizedStatus === 'failed') {
    return m.knowledge_upload_status_failed()
  }

  if (normalizedStatus === 'processing') {
    return m.knowledge_upload_status_processing()
  }

  return m.knowledge_upload_status_uploading()
}

/**
 * 文档接口目前返回较宽松，统一在此处做结构归一化。
 */
function normalizeDocumentRows(payload: unknown): KnowledgeDocumentRow[] {
  if (!payload || typeof payload !== 'object') {
    return []
  }

  const payloadRecord = payload as Record<string, unknown>
  const rawDocuments =
    (Array.isArray(payloadRecord.documents) ? payloadRecord.documents : null) ||
    (Array.isArray(payloadRecord.items) ? payloadRecord.items : null) ||
    (Array.isArray(payloadRecord.data) ? payloadRecord.data : null) ||
    []

  return rawDocuments
    .map((entry, index) => {
      if (!entry || typeof entry !== 'object') {
        return null
      }

      const record = entry as Record<string, unknown>
      const title =
        pickStringValue(record, ['title', 'file_name', 'filename', 'name', 'document_name']) ||
        m.kb_unknown_title()
      const uploader = pickStringValue(record, ['uploaded_by', 'uploader', 'created_by', 'owner']) || '--'
      const generatedKnowledgeCount =
        pickNumberValue(record, ['knowledge_count', 'generated_knowledge_count', 'chunks', 'record_count']) || 0
      const uploadedAtRaw = pickStringValue(record, ['uploaded_at', 'created_at', 'updated_at'])
      const documentId =
        pickStringValue(record, ['document_id', 'id', 'file_id']) ||
        `${title}-${uploadedAtRaw || index}`
      const id =
        pickStringValue(record, ['id', 'document_id', 'file_id']) ||
        documentId

      return {
        id,
        documentId,
        title,
        uploader,
        generatedKnowledgeCount,
        uploadedAt: formatDateTime(uploadedAtRaw),
        status: pickStringValue(record, ['status']),
        fileType: pickStringValue(record, ['file_type', 'mime_type']),
        fileSize: pickNumberValue(record, ['file_size']),
      }
    })
    .filter((row): row is KnowledgeDocumentRow => row !== null)
}

/**
 * 判断附件是否为可直接预览的图片类型。
 * 规则：
 * - 优先使用 mime_type（最准确）
 * - 次选 type 字段
 * - 最后按文件名后缀兜底，兼容历史数据缺 mime 场景
 */
function isImageAttachment(attachment: AttachmentItem): boolean {
  const normalizedMimeType = (attachment.mime_type || '').trim().toLowerCase()
  if (normalizedMimeType.startsWith('image/')) {
    return true
  }

  const normalizedType = (attachment.type || '').trim().toLowerCase()
  if (normalizedType.includes('image')) {
    return true
  }

  return /\.(png|jpe?g|gif|webp|bmp|svg|heic|heif)$/i.test(attachment.file_name)
}

/**
 * 构造附件图片可访问地址。
 * - 优先使用接口返回的 storage_url（通常为可直接访问地址）
 * - 没有 storage_url 时回退到 download 接口
 */
function getAttachmentImageSrc(attachment: AttachmentItem): string {
  const storageUrl = attachment.storage_url?.trim()
  if (storageUrl) {
    return storageUrl
  }

  const { baseUrl } = getKnowledgeApiConfig()
  return `${baseUrl}/api/v4/knowledge/attachments/${encodeURIComponent(attachment.id)}/download`
}

/**
 * 文件大小格式化，便于在详情卡中快速扫读。
 */
function formatFileSize(sizeInBytes: number | null): string {
  if (!sizeInBytes || sizeInBytes <= 0) {
    return '--'
  }

  const units = ['B', 'KB', 'MB', 'GB']
  let value = sizeInBytes
  let unitIndex = 0
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex += 1
  }

  const roundedValue = value >= 10 || unitIndex === 0 ? value.toFixed(0) : value.toFixed(1)
  return `${roundedValue} ${units[unitIndex]}`
}

function SourceBadge(props: { source: KnowledgeSource; locale: Locale }) {
  const { source, locale } = props
  const style = SOURCE_STYLE_MAP[source]
  const sourceText =
    source === 'official_doc'
      ? t('knowledge.sourceOfficialDoc', locale)
      : source === 'web_crawl'
        ? t('knowledge.sourceWebCrawl', locale)
      : source === 'session_record'
        ? t('knowledge.sourceSessionRecord', locale)
        : t('knowledge.sourceManual', locale)

  return (
    <span
      className="inline-flex h-6 min-w-[70px] items-center justify-center rounded-[20px] px-2 text-[12px] font-semibold leading-none"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {sourceText}
    </span>
  )
}

function isDocumentLikeKnowledgeSource(source: KnowledgeSource | null): boolean {
  return source === 'official_doc' || source === 'web_crawl'
}

/**
 * 来源过滤选项文案：
 * - 中文继续用业务文案
 * - 非中文使用后端 source_type 枚举值，避免术语不一致
 */
function getSourceFilterLabel(filter: KnowledgeSourceFilter, locale: Locale): string {
  if (filter === 'all') {
    return t('knowledge.sourceFilter', locale)
  }
  if (filter === 'document') {
    return t('knowledge.sourceOfficialDoc', locale)
  }
  if (filter === 'chat_history') {
    return t('knowledge.sourceSessionRecord', locale)
  }
  return t('knowledge.sourceManual', locale)
}

function CardActionMenu(props: {
  onViewSource: () => void
  onEdit: () => void
  onDelete: () => void
  isDeleting: boolean
  locale: Locale
}) {
  const { onViewSource, onEdit, onDelete, isDeleting, locale } = props

  return (
    <div className="dashboard-kb-action-menu p-1">
      <button
        type="button"
        className="dashboard-kb-action-menu-item rounded-[8px]"
        onClick={(event) => {
          event.stopPropagation()
          onViewSource()
        }}
      >
        <FileText className="h-[14px] w-[14px]" />
        {t('knowledge.viewSource', locale)}
      </button>
      <button
        type="button"
        className="dashboard-kb-action-menu-item rounded-[8px]"
        onClick={(event) => {
          event.stopPropagation()
          onEdit()
        }}
      >
        <Pencil className="h-[14px] w-[14px]" />
        {t('common.edit', locale)}
      </button>
      <button
        type="button"
        className="dashboard-kb-action-menu-item rounded-[8px]"
        onClick={(event) => {
          event.stopPropagation()
          onDelete()
        }}
      >
        <Trash2 className="h-[14px] w-[14px]" />
        {isDeleting ? t('knowledge.deleting', locale) : t('common.delete', locale)}
      </button>
    </div>
  )
}

function KnowledgeCard(props: {
  item: KnowledgeCardItem
  isMenuOpen: boolean
  isSelected: boolean
  onToggleMenu: (id: string) => void
  onViewSource: (item: KnowledgeCardItem) => void
  onEdit: (item: KnowledgeCardItem) => void
  onDelete: (item: KnowledgeCardItem) => void
  isDeleting: boolean
  locale: Locale
}) {
  const { item, isMenuOpen, isSelected, onToggleMenu, onViewSource, onEdit, onDelete, isDeleting, locale } = props

  return (
    <article
      data-selected={isSelected ? 'true' : 'false'}
      className="dashboard-kb-card"
    >
      {/*
       * 卡片头部：标题 + 来源 + 时间 + 操作按钮。
       * 文案字号、行高、色值对齐 Figma 的 Body 1 Medium（14px / 1.6）。
       */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="min-w-0 flex-1 truncate pr-4 text-[14px] font-medium leading-[1.6] tracking-[-0.14px] text-[var(--dashboard-text)]">
          {item.title}
        </h3>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <SourceBadge source={item.source} locale={locale} />
          <p className="hidden w-[152px] text-right text-[14px] font-medium leading-[1.6] tracking-[-0.14px] text-[var(--dashboard-text-muted)] sm:block">
            {item.updatedAt}
          </p>
          <button
            type="button"
            className="dashboard-kb-card-action"
            onClick={(event) => {
              event.stopPropagation()
              onToggleMenu(item.id)
            }}
            aria-label={m.header_open_action_menu()}
          >
            <EllipsisVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      <p className="mt-2 whitespace-pre-wrap break-words text-[14px] font-medium leading-[1.6] tracking-[-0.14px] text-[var(--dashboard-text-muted)]">
        {item.summary}
      </p>

      {isMenuOpen ? (
        <CardActionMenu
          onViewSource={() => onViewSource(item)}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item)}
          isDeleting={isDeleting}
          locale={locale}
        />
      ) : null}
    </article>
  )
}

function KnowledgeBasePage() {
  const i18nLocale: Locale = getLocale() === 'zh' ? 'zh' : 'en'
  const viewportProfile = useViewportProfile()
  const { data: currentUserIdentifier } = useCurrentUserIdentifier()
  const [activeTab, setActiveTab] = useState<KnowledgeTab>('all')
  const [knowledgeCurrentPageState, setKnowledgeCurrentPageState] = useState<number>(1)
  const [documentCurrentPageState, setDocumentCurrentPageState] = useState<number>(1)
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [sourceFilter, setSourceFilter] = useState<KnowledgeSourceFilter>('all')
  const [openMenuCardId, setOpenMenuCardId] = useState<string | null>(null)
  const [selectedKnowledge, setSelectedKnowledge] = useState<KnowledgeCardItem | null>(null)
  const [selectedDocumentRow, setSelectedDocumentRow] = useState<KnowledgeDocumentRow | null>(null)
  const [selectedDocumentKnowledgeItems, setSelectedDocumentKnowledgeItems] = useState<DocumentKnowledgeItem[]>([])
  const [selectedDocumentKnowledgeTotal, setSelectedDocumentKnowledgeTotal] = useState<number>(0)
  const [selectedDocumentKnowledgeOffset, setSelectedDocumentKnowledgeOffset] = useState<number>(0)
  const [selectedDocumentAttachments, setSelectedDocumentAttachments] = useState<AttachmentItem[]>([])
  const [selectedFailedChunkIds, setSelectedFailedChunkIds] = useState<string[]>([])
  const [previewImageAttachmentId, setPreviewImageAttachmentId] = useState<string | null>(null)
  const [isLoadingDocumentKnowledge, setIsLoadingDocumentKnowledge] = useState<boolean>(false)
  const [isLoadingDocumentAttachments, setIsLoadingDocumentAttachments] = useState<boolean>(false)
  const [documentKnowledgeErrorMessage, setDocumentKnowledgeErrorMessage] = useState<string | null>(null)
  const [documentAttachmentsErrorMessage, setDocumentAttachmentsErrorMessage] = useState<string | null>(null)
  const [documentRetryErrorMessage, setDocumentRetryErrorMessage] = useState<string | null>(null)
  const [retryFailedChunkScope, setRetryFailedChunkScope] = useState<'all' | 'selected' | null>(null)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false)
  const [uploadMode, setUploadMode] = useState<UploadKnowledgeMode>('manual')
  const [manualKnowledgeText, setManualKnowledgeText] = useState<string>('')
  const [crawlSourceUrl, setCrawlSourceUrl] = useState<string>('')
  const [crawlMaxDepth, setCrawlMaxDepth] = useState<number>(2)
  const [crawlMaxPages, setCrawlMaxPages] = useState<number>(10)
  const [selectedUploadFiles, setSelectedUploadFiles] = useState<File[]>([])
  const [documentUploadStage, setDocumentUploadStage] = useState<UploadDocumentStage>('idle')
  const [documentProgress, setDocumentProgress] = useState<DocumentPipelineProgressResponse | null>(null)
  const [activeResultDocumentId, setActiveResultDocumentId] = useState<string | null>(null)
  const [generatedResultItems, setGeneratedResultItems] = useState<DocumentKnowledgeItem[]>([])
  const [updatedResultItems, setUpdatedResultItems] = useState<DocumentKnowledgeItem[]>([])
  const [isResultPanelOpen, setIsResultPanelOpen] = useState<boolean>(false)
  const [resultPanelError, setResultPanelError] = useState<string | null>(null)
  const [uploadErrorMessage, setUploadErrorMessage] = useState<string | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [editingKnowledgeId, setEditingKnowledgeId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState<string>('')
  const [editContent, setEditContent] = useState<string>('')
  const [editErrorMessage, setEditErrorMessage] = useState<string | null>(null)
  const [sourceActionErrorMessage, setSourceActionErrorMessage] = useState<string | null>(null)
  const [isOpeningSourceDocument, setIsOpeningSourceDocument] = useState<boolean>(false)
  const [pendingDeleteItem, setPendingDeleteItem] = useState<KnowledgeCardItem | null>(null)
  const [uploadTasks, setUploadTasks] = useState<UploadTaskItem[]>([])
  const selectedCompanyId = useSelectedCompanyId()
  const pollingDocumentIdSetRef = useRef<Set<string>>(new Set())
  const hasRestoredUploadTasksRef = useRef(false)
  const canPersistUploadTasksRef = useRef(false)

  const upsertUploadTask = useCallback((task: UploadTaskItem): void => {
    setUploadTasks((previousValue) => {
      const existingIndex = previousValue.findIndex((item) => item.id === task.id)
      if (existingIndex < 0) {
        return [task, ...previousValue]
      }

      const nextValue = [...previousValue]
      nextValue[existingIndex] = task
      return nextValue
    })
  }, [])

  const patchUploadTask = useCallback((taskId: string, patch: Partial<UploadTaskItem>): void => {
    setUploadTasks((previousValue) =>
      previousValue.map((item) => {
        if (item.id !== taskId) {
          return item
        }

        /**
         * 进度只允许递增，避免后端阶段切换导致 UI 百分比回退。
         */
        const mergedProgress =
          typeof patch.progress === 'number'
            ? Math.max(item.progress, Math.min(100, Math.max(0, patch.progress)))
            : item.progress

        return { ...item, ...patch, progress: mergedProgress }
      }),
    )
  }, [])

  const queryParams: ListKnowledgeParams = {
    company_id: selectedCompanyId || '',
    page: knowledgeCurrentPageState,
    limit: PAGE_SIZE,
    sort_by: 'created_at',
    sort_order: 'desc',
    source_type: sourceFilter === 'all' ? undefined : sourceFilter,
  }
  const documentQueryParams: ListKnowledgeDocumentsParams = {
    company_id: selectedCompanyId || '',
    limit: PAGE_SIZE,
    offset: (documentCurrentPageState - 1) * PAGE_SIZE,
  }

  const { data, isLoading, isError, error, refetch: refetchKnowledgeList } = useKnowledgeList(queryParams, {
    enabled: Boolean(selectedCompanyId) && activeTab === 'all' && searchKeyword.trim().length === 0,
  })
  const {
    data: searchData,
    isLoading: isSearchingKnowledge,
    isError: isSearchError,
    error: searchError,
  } = useKnowledgeSearch(
    {
      keyword: searchKeyword.trim(),
      company_id: selectedCompanyId || '',
      limit: PAGE_SIZE,
      source_type: sourceFilter === 'all' ? null : sourceFilter,
    },
    {
      enabled: Boolean(selectedCompanyId) && activeTab === 'all' && searchKeyword.trim().length > 0,
    },
  )
  const {
    data: documentsData,
    isLoading: isLoadingDocuments,
    isError: isDocumentsError,
    error: documentsError,
    refetch: refetchKnowledgeDocuments,
  } = useKnowledgeDocuments(documentQueryParams, {
    enabled: Boolean(selectedCompanyId) && activeTab === 'docs',
  })
  const {
    data: selectedDocumentStatus,
    isLoading: isLoadingSelectedDocumentStatus,
    isError: isSelectedDocumentStatusError,
    error: selectedDocumentStatusError,
    refetch: refetchSelectedDocumentStatus,
  } = useDocumentStatus(selectedDocumentRow?.documentId || '', {
    enabled: Boolean(selectedCompanyId) && activeTab === 'docs' && Boolean(selectedDocumentRow?.documentId),
  })
  const {
    data: detailData,
    isLoading: isLoadingDetail,
    isError: isDetailError,
    error: detailError,
  } = useKnowledgeDetail(selectedKnowledge?.id || '', {
    enabled: Boolean(selectedKnowledge?.id),
  })
  /**
   * 上传成功后的统一收敛动作。
   * 目的：确保列表可见并强制刷新，避免用户看不到最新文档/知识。
   */
  const finalizeUploadSuccess = async (): Promise<void> => {
    setKnowledgeCurrentPageState(1)
    setDocumentCurrentPageState(1)
    await Promise.allSettled([refetchKnowledgeList(), refetchKnowledgeDocuments()])

    setIsUploadModalOpen(false)
    setUploadErrorMessage(null)
    setManualKnowledgeText('')
    setCrawlSourceUrl('')
    setCrawlMaxDepth(2)
    setCrawlMaxPages(10)
    setSelectedUploadFiles([])
    setUploadMode('upload-doc')
    setDocumentUploadStage('idle')
    setActiveTab('all')
  }

  const createKnowledgeMutation = useCreateKnowledge({
    onSuccess: async () => {
      await finalizeUploadSuccess()
    },
    onError: (error) => {
      setUploadErrorMessage(error.message)
    },
  })
  const updateKnowledgeMutation = useUpdateKnowledge({
    onError: (error) => {
      setEditErrorMessage(error.message)
    },
  })
  const deleteKnowledgeMutation = useDeleteKnowledge()

  useEffect(() => {
    setKnowledgeCurrentPageState(1)
    setDocumentCurrentPageState(1)
    setOpenMenuCardId(null)
    setSelectedKnowledge(null)
    setSelectedDocumentRow(null)
    setSelectedFailedChunkIds([])
    setPreviewImageAttachmentId(null)
    setIsEditModalOpen(false)
    setEditingKnowledgeId(null)
    setEditErrorMessage(null)
    setSourceActionErrorMessage(null)
    setIsOpeningSourceDocument(false)
    setDocumentRetryErrorMessage(null)
  }, [selectedCompanyId])

  useEffect(() => {
    setOpenMenuCardId(null)
    setSelectedKnowledge(null)
    setSelectedDocumentRow(null)
    setSelectedFailedChunkIds([])
    setPreviewImageAttachmentId(null)
    setIsEditModalOpen(false)
    setSourceActionErrorMessage(null)
    setIsOpeningSourceDocument(false)
    setDocumentRetryErrorMessage(null)
  }, [activeTab])

  /**
   * 来源过滤变化后回到第一页，避免出现“当前页无数据”的错觉。
   */
  useEffect(() => {
    setKnowledgeCurrentPageState(1)
    setSelectedKnowledge(null)
  }, [sourceFilter])

  useEffect(() => {
    setSourceActionErrorMessage(null)
    setIsOpeningSourceDocument(false)
  }, [selectedKnowledge?.id])

  /**
   * 切换文档行时关闭图片预览，避免预览内容与当前文档不一致。
   */
  useEffect(() => {
    setPreviewImageAttachmentId(null)
  }, [selectedDocumentRow?.documentId])

  /**
   * 文档切换后清空失败 chunk 勾选与错误提示，避免操作串文档。
   */
  useEffect(() => {
    setSelectedFailedChunkIds([])
    setDocumentRetryErrorMessage(null)
    setRetryFailedChunkScope(null)
  }, [selectedDocumentRow?.documentId])

  /**
   * 上传任务持久化：
   * - 仅持久化已拿到 document_id 的任务；
   * - 完成/失败任务不自动清除，由全局悬浮球手动清空。
   */
  useEffect(() => {
    if (!canPersistUploadTasksRef.current) {
      return
    }

    if (typeof window === 'undefined') {
      return
    }

    const persistedTasks: PersistedUploadTask[] = uploadTasks
      .filter((task) => task.documentId)
      .map((task) => ({
        fileName: task.fileName,
        documentId: task.documentId as string,
        status: task.status,
        progress: task.progress,
        statusText: task.statusText,
        errorMessage: task.errorMessage,
        createdAt: task.createdAt,
      }))

    window.localStorage.setItem(
      KNOWLEDGE_UPLOAD_TASKS_STORAGE_KEY,
      JSON.stringify(persistedTasks),
    )
    window.dispatchEvent(new Event(KNOWLEDGE_UPLOAD_TASKS_UPDATED_EVENT))
  }, [uploadTasks])

  /**
   * 接收全局悬浮球清空事件，避免页面继续把旧任务写回 storage。
   */
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const handleTasksCleared = (): void => {
      setUploadTasks([])
    }

    window.addEventListener(
      KNOWLEDGE_UPLOAD_TASKS_CLEARED_EVENT,
      handleTasksCleared,
    )

    return () => {
      window.removeEventListener(
        KNOWLEDGE_UPLOAD_TASKS_CLEARED_EVENT,
        handleTasksCleared,
      )
    }
  }, [])

  useEffect(() => {
    setSelectedDocumentKnowledgeOffset(0)
  }, [selectedDocumentRow?.documentId])

  /**
   * 图片预览层快捷关闭：
   * - 支持 ESC 关闭，减少鼠标移动成本
   */
  useEffect(() => {
    if (!previewImageAttachmentId) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setPreviewImageAttachmentId(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [previewImageAttachmentId])

  useEffect(() => {
    const loadDocumentKnowledgeAndAttachments = async (): Promise<void> => {
      if (!selectedDocumentRow || activeTab !== 'docs') {
        setSelectedDocumentKnowledgeItems([])
        setSelectedDocumentKnowledgeTotal(0)
        setSelectedDocumentAttachments([])
        setIsLoadingDocumentKnowledge(false)
        setIsLoadingDocumentAttachments(false)
        setDocumentKnowledgeErrorMessage(null)
        setDocumentAttachmentsErrorMessage(null)
        return
      }

      setIsLoadingDocumentKnowledge(true)
      setIsLoadingDocumentAttachments(true)
      setDocumentKnowledgeErrorMessage(null)
      setDocumentAttachmentsErrorMessage(null)

      const [knowledgeResult, attachmentResult] = await Promise.allSettled([
        listDocumentKnowledge(selectedDocumentRow.documentId, {
          limit: DOCUMENT_INSIGHT_KNOWLEDGE_PAGE_SIZE,
          offset: selectedDocumentKnowledgeOffset,
        }),
        listDocumentAttachments(selectedDocumentRow.documentId),
      ])

      if (knowledgeResult.status === 'fulfilled') {
        setSelectedDocumentKnowledgeItems(knowledgeResult.value.items)
        setSelectedDocumentKnowledgeTotal(knowledgeResult.value.total)
      } else {
        setSelectedDocumentKnowledgeItems([])
        setSelectedDocumentKnowledgeTotal(0)
        setDocumentKnowledgeErrorMessage(
          knowledgeResult.reason instanceof Error
            ? knowledgeResult.reason.message
            : m.kb_load_error({ message: t('knowledge.loadChunksFailed', i18nLocale) }),
        )
      }

      if (attachmentResult.status === 'fulfilled') {
        setSelectedDocumentAttachments(attachmentResult.value.items)
      } else {
        setSelectedDocumentAttachments([])
        setDocumentAttachmentsErrorMessage(
          attachmentResult.reason instanceof Error
            ? attachmentResult.reason.message
            : m.kb_load_error({ message: t('knowledge.loadAttachmentsFailed', i18nLocale) }),
        )
      }

      setIsLoadingDocumentKnowledge(false)
      setIsLoadingDocumentAttachments(false)
    }

    void loadDocumentKnowledgeAndAttachments()
  }, [selectedDocumentRow, activeTab, selectedDocumentKnowledgeOffset, i18nLocale])

  const isSearchMode = activeTab === 'all' && searchKeyword.trim().length > 0
  const cardItems: KnowledgeCardItem[] = isSearchMode
    ? (searchData?.items || []).map(toCardItem)
    : (data?.items || []).map(toCardItem)
  const documentRows: KnowledgeDocumentRow[] = normalizeDocumentRows(documentsData)
  const documentTotalRows = documentRows.length
  const knowledgeDemoNarrative = useMemo(
    () =>
      DEFAULT_CLIENT_CHAT_RECORDING_SCENARIO.evidenceScenes.find(
        (scene) => scene.route === '/dashboard/knowledge-base',
      ) || null,
    [],
  )
  const visibleTotalRows = activeTab === 'all' ? (isSearchMode ? searchData?.total ?? 0 : data?.total ?? 0) : documentTotalRows
  const knowledgeTotalRows = isSearchMode ? searchData?.total ?? 0 : data?.total ?? 0
  const knowledgeCurrentLimit = isSearchMode ? PAGE_SIZE : data?.limit ?? PAGE_SIZE
  const knowledgeCurrentPage = isSearchMode ? 1 : data?.page ?? knowledgeCurrentPageState
  const knowledgeStartRow = knowledgeTotalRows > 0 ? (knowledgeCurrentPage - 1) * knowledgeCurrentLimit + 1 : 0
  const knowledgeEndRow = knowledgeTotalRows > 0 ? Math.min(knowledgeCurrentPage * knowledgeCurrentLimit, knowledgeTotalRows) : 0
  const knowledgeCanPrevPage = isSearchMode ? false : knowledgeCurrentPage > 1
  const knowledgeCanNextPage = isSearchMode ? false : knowledgeEndRow < knowledgeTotalRows

  const documentTotalRowsFromApi = documentsData?.total ?? 0
  const documentLimitFromApi = documentsData?.limit ?? PAGE_SIZE
  const documentOffsetFromApi = documentsData?.offset ?? (documentCurrentPageState - 1) * PAGE_SIZE
  const documentCurrentPage = Math.floor(documentOffsetFromApi / Math.max(1, documentLimitFromApi)) + 1
  const documentStartRow = documentTotalRowsFromApi > 0 ? documentOffsetFromApi + 1 : 0
  const documentEndRow =
    documentTotalRowsFromApi > 0
      ? Math.min(documentOffsetFromApi + documentRows.length, documentTotalRowsFromApi)
      : 0
  const documentCanPrevPage = documentCurrentPage > 1
  const documentCanNextPage = documentEndRow < documentTotalRowsFromApi

  const headerStartRow = activeTab === 'docs' ? documentStartRow : knowledgeStartRow
  const headerEndRow = activeTab === 'docs' ? documentEndRow : knowledgeEndRow
  const headerTotalRows = activeTab === 'docs' ? documentTotalRowsFromApi : knowledgeTotalRows
  const headerCanPrevPage = activeTab === 'docs' ? documentCanPrevPage : knowledgeCanPrevPage
  const headerCanNextPage = activeTab === 'docs' ? documentCanNextPage : knowledgeCanNextPage
  const isKnowledgeDetailOpen = activeTab === 'all' && Boolean(selectedKnowledge)
  const isDocumentDetailOpen = activeTab === 'docs' && Boolean(selectedDocumentRow)
  const hasActiveDetailPanel = isKnowledgeDetailOpen || isDocumentDetailOpen
  const detailPanelMode = viewportProfile.panelMode
  const detailItem: KnowledgeItem | null = detailData?.item || null
  const detailSource: KnowledgeSource | null = detailItem ? inferSource(detailItem) : null
  const detailTitle = detailItem?.key || selectedKnowledge?.title || m.kb_unknown_title()
  const detailContent = detailItem?.answer || detailItem?.text || selectedKnowledge?.summary || '-'
  const detailTextOnly = detailItem?.text || '-'
  const detailDocChunkId = detailItem?.doc_chunk_id?.trim() || null
  const detailSessionId = detailItem?.session_id?.trim() || null
  const [officialSourceDocumentName, setOfficialSourceDocumentName] = useState<string | null>(null)
  const [officialSourceChunkContent, setOfficialSourceChunkContent] = useState<string | null>(null)
  const [isLoadingOfficialSourceChunk, setIsLoadingOfficialSourceChunk] = useState<boolean>(false)
  const [officialSourceChunkErrorMessage, setOfficialSourceChunkErrorMessage] = useState<string | null>(null)
  const { session: detailSession, loading: isLoadingSessionDetail } = useSessionDetail(detailSessionId || '')
  const detailSessionMessages = detailSession?.room_messages || []
  const groupedSessionMessages = useMemo(() => {
    if (!detailSessionMessages.length) {
      return [] as Array<[string, typeof detailSessionMessages]>
    }

    const groupMap = new Map<string, typeof detailSessionMessages>()
    for (const message of detailSessionMessages) {
      const roomName = (message.room_name || '').trim() || t('session.unknownChannel', i18nLocale)
      const existing = groupMap.get(roomName) || []
      existing.push(message)
      groupMap.set(roomName, existing)
    }
    return Array.from(groupMap.entries())
  }, [detailSessionMessages, i18nLocale])

  /**
   * 文档来源正文展示：
   * - 文档名来自 `/knowledge/{id}/source`；
   * - 正文来自 `/knowledge/chunks/{chunk_id}`，参数用 `doc_chunk_id`。
   */
  useEffect(() => {
    setOfficialSourceDocumentName(null)
    setOfficialSourceChunkContent(null)
    setOfficialSourceChunkErrorMessage(null)
    setIsLoadingOfficialSourceChunk(false)

    if (!selectedKnowledge?.id || detailSessionId || !isDocumentLikeKnowledgeSource(detailSource)) {
      return
    }

    let disposed = false
    const loadOfficialSourceDetail = async (): Promise<void> => {
      setIsLoadingOfficialSourceChunk(true)

      const [sourceResult, chunkResult] = await Promise.allSettled([
        getKnowledgeSource(selectedKnowledge.id),
        detailDocChunkId ? getKnowledgeChunkById(detailDocChunkId) : Promise.resolve(null),
      ])

      if (disposed) {
        return
      }

      if (sourceResult.status === 'fulfilled') {
        setOfficialSourceDocumentName(sourceResult.value.document?.file_name?.trim() || null)
      }

      if (chunkResult.status === 'fulfilled') {
        setOfficialSourceChunkContent(chunkResult.value?.content?.trim() || detailTextOnly || '-')
      } else {
        setOfficialSourceChunkContent(detailTextOnly || '-')
        setOfficialSourceChunkErrorMessage(
          chunkResult.reason instanceof Error ? chunkResult.reason.message : t('common.error', i18nLocale),
        )
      }

      setIsLoadingOfficialSourceChunk(false)
    }

    void loadOfficialSourceDetail()

    return () => {
      disposed = true
    }
  }, [
    detailDocChunkId,
    detailSessionId,
    detailSource,
    detailTextOnly,
    i18nLocale,
    selectedKnowledge?.id,
  ])

  const imageAttachments = selectedDocumentAttachments.filter(isImageAttachment)
  const failedChunkDetails = useMemo<FailedChunkDetail[]>(
    () => normalizeFailedChunkDetails(selectedDocumentStatus),
    [selectedDocumentStatus],
  )
  const selectedFailedChunkIdSet = useMemo(
    () => new Set(selectedFailedChunkIds),
    [selectedFailedChunkIds],
  )
  const normalizedSelectedDocumentStatus = normalizeDocumentStatus(
    selectedDocumentStatus?.status || selectedDocumentRow?.status,
  )
  const failedChunkCount = failedChunkDetails.length
  const selectedFailedChunkCount = selectedFailedChunkIds.length
  const areAllFailedChunksSelected =
    failedChunkCount > 0 && failedChunkDetails.every((item) => selectedFailedChunkIdSet.has(item.chunkId))
  const isRetryAllFailedChunksPending = retryFailedChunkScope === 'all'
  const isRetrySelectedFailedChunksPending = retryFailedChunkScope === 'selected'
  const shouldAutoPollSelectedDocumentStatus =
    Boolean(selectedDocumentRow?.documentId) &&
    activeTab === 'docs' &&
    (
      retryFailedChunkScope !== null ||
      normalizedSelectedDocumentStatus === 'processing' ||
      normalizedSelectedDocumentStatus === 'uploading'
    )
  const documentKnowledgePage = Math.floor(selectedDocumentKnowledgeOffset / DOCUMENT_INSIGHT_KNOWLEDGE_PAGE_SIZE) + 1
  const documentKnowledgeCanPrevPage = selectedDocumentKnowledgeOffset > 0
  const documentKnowledgeCanNextPage =
    selectedDocumentKnowledgeOffset + selectedDocumentKnowledgeItems.length < selectedDocumentKnowledgeTotal
  const previewImageAttachment =
    imageAttachments.find((attachment) => attachment.id === previewImageAttachmentId) || null

  /**
   * 失败 chunk 列表刷新后，只保留仍然存在的勾选项。
   * 这样重试成功后旧勾选会自动收缩，不会操作到已消失的数据。
   */
  useEffect(() => {
    if (failedChunkDetails.length === 0) {
      setSelectedFailedChunkIds([])
      return
    }

    const availableChunkIdSet = new Set(failedChunkDetails.map((item) => item.chunkId))
    setSelectedFailedChunkIds((previousValue) =>
      previousValue.filter((chunkId) => availableChunkIdSet.has(chunkId)),
    )
  }, [failedChunkDetails])

  /**
   * 文档仍在处理或刚触发失败 chunk 重试时，保持详情面板轻量轮询。
   * 这样列表状态和失败 chunk 区块会自动回收，不要求用户手动刷新。
   */
  useEffect(() => {
    if (!shouldAutoPollSelectedDocumentStatus) {
      return
    }

    const pollingTimer = window.setInterval(() => {
      void Promise.allSettled([refetchKnowledgeDocuments(), refetchSelectedDocumentStatus()])
    }, DOCUMENT_STATUS_POLL_INTERVAL_MS)

    return () => {
      window.clearInterval(pollingTimer)
    }
  }, [refetchKnowledgeDocuments, refetchSelectedDocumentStatus, shouldAutoPollSelectedDocumentStatus])

  /**
   * 三点菜单切换规则：
   * - 点击当前已打开的卡片：收起菜单
   * - 点击其他卡片三点：切换到该卡片菜单
   */
  const handleToggleMenu = (cardId: string): void => {
    setOpenMenuCardId((previousValue) => (previousValue === cardId ? null : cardId))
  }

  /**
   * 统一分页上一页动作，避免在多个入口重复逻辑。
   */
  const handlePrevPage = useCallback((): void => {
    if (!headerCanPrevPage) {
      return
    }
    if (activeTab === 'docs') {
      setDocumentCurrentPageState((previousValue) => Math.max(1, previousValue - 1))
    } else {
      setKnowledgeCurrentPageState((previousValue) => Math.max(1, previousValue - 1))
    }
    setOpenMenuCardId(null)
  }, [activeTab, headerCanPrevPage])

  /**
   * 统一分页下一页动作，避免在多个入口重复逻辑。
   */
  const handleNextPage = useCallback((): void => {
    if (!headerCanNextPage) {
      return
    }
    if (activeTab === 'docs') {
      setDocumentCurrentPageState((previousValue) => previousValue + 1)
    } else {
      setKnowledgeCurrentPageState((previousValue) => previousValue + 1)
    }
    setOpenMenuCardId(null)
  }, [activeTab, headerCanNextPage])

  /**
   * 打开编辑弹窗并预填数据。
   * 优先使用已加载的详情数据，避免列表摘要与详情正文不一致。
   */
  const handleOpenEditModal = (item: KnowledgeCardItem): void => {
    const detailOfCurrentCard = detailItem?.id === item.id ? detailItem : null
    const initialTitle =
      detailOfCurrentCard?.key && detailOfCurrentCard.key.trim() !== ''
        ? detailOfCurrentCard.key
        : item.title
    const initialContent =
      detailOfCurrentCard?.answer && detailOfCurrentCard.answer.trim() !== ''
        ? detailOfCurrentCard.answer
        : detailOfCurrentCard?.text && detailOfCurrentCard.text.trim() !== ''
          ? detailOfCurrentCard.text
        : item.summary

    setEditingKnowledgeId(item.id)
    setEditTitle(initialTitle === m.kb_unknown_title() ? '' : initialTitle)
    setEditContent(initialContent)
    setEditErrorMessage(null)
    setOpenMenuCardId(null)
    setIsEditModalOpen(true)
  }

  /**
   * 删除知识：
   * - 先做二次确认，避免误删
   * - 成功后关闭菜单与详情，并刷新知识列表
   */
  const handleDeleteKnowledge = (item: KnowledgeCardItem): void => {
    setPendingDeleteItem(item)
  }

  const handleViewSource = async (item: KnowledgeCardItem): Promise<void> => {
    if (!selectedCompanyId) {
      return
    }

    try {
      setSelectedKnowledge(item)
      setOpenMenuCardId(null)
    } catch (error) {
      setEditErrorMessage(error instanceof Error ? error.message : t('common.error', i18nLocale))
    }
  }

  const handleToggleFailedChunkSelection = useCallback((chunkId: string): void => {
    setSelectedFailedChunkIds((previousValue) => {
      if (previousValue.includes(chunkId)) {
        return previousValue.filter((item) => item !== chunkId)
      }

      return [...previousValue, chunkId]
    })
  }, [])

  const handleToggleAllFailedChunkSelection = useCallback((): void => {
    if (failedChunkDetails.length === 0) {
      setSelectedFailedChunkIds([])
      return
    }

    setSelectedFailedChunkIds(
      areAllFailedChunksSelected ? [] : failedChunkDetails.map((item) => item.chunkId),
    )
  }, [areAllFailedChunksSelected, failedChunkDetails])

  /**
   * 重试当前文档下所有失败 chunk。
   * 后端约定通过 `only_failed=true` 只重跑失败分片，不影响已成功结果。
   */
  const handleRetryAllFailedChunks = useCallback(async (): Promise<void> => {
    const documentId = selectedDocumentRow?.documentId?.trim()
    if (!documentId || failedChunkCount === 0) {
      return
    }

    setDocumentRetryErrorMessage(null)
    setRetryFailedChunkScope('all')

    try {
      await processExtractionTrigger({
        document_id: documentId,
        company_id: selectedDocumentStatus?.company_id || selectedCompanyId || undefined,
        only_failed: true,
      })
      setSelectedFailedChunkIds([])
      toast.success(m.knowledge_retry_failed_chunks_started())
      await Promise.allSettled([refetchKnowledgeDocuments(), refetchSelectedDocumentStatus()])
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('common.error', i18nLocale)
      setDocumentRetryErrorMessage(errorMessage)
      toast.error(errorMessage)
    } finally {
      setRetryFailedChunkScope(null)
    }
  }, [
    failedChunkCount,
    i18nLocale,
    refetchKnowledgeDocuments,
    refetchSelectedDocumentStatus,
    selectedCompanyId,
    selectedDocumentRow?.documentId,
    selectedDocumentStatus?.company_id,
  ])

  /**
   * 只重试用户显式勾选的失败 chunk，避免整篇文档重复跑抽取。
   */
  const handleRetrySelectedFailedChunks = useCallback(async (): Promise<void> => {
    if (selectedFailedChunkCount === 0) {
      const errorMessage = m.knowledge_retry_selected_failed_chunks_required()
      setDocumentRetryErrorMessage(errorMessage)
      toast.error(errorMessage)
      return
    }

    const companyId = selectedDocumentStatus?.company_id || selectedCompanyId || ''
    if (!companyId) {
      return
    }

    setDocumentRetryErrorMessage(null)
    setRetryFailedChunkScope('selected')

    try {
      await processExtractionByChunks({
        company_id: companyId,
        ids: selectedFailedChunkIds,
      })
      setSelectedFailedChunkIds([])
      toast.success(
        m.knowledge_retry_selected_failed_chunks_started({
          count: String(selectedFailedChunkCount),
        }),
      )
      await Promise.allSettled([refetchKnowledgeDocuments(), refetchSelectedDocumentStatus()])
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('common.error', i18nLocale)
      setDocumentRetryErrorMessage(errorMessage)
      toast.error(errorMessage)
    } finally {
      setRetryFailedChunkScope(null)
    }
  }, [
    i18nLocale,
    refetchKnowledgeDocuments,
    refetchSelectedDocumentStatus,
    selectedCompanyId,
    selectedDocumentStatus?.company_id,
    selectedFailedChunkCount,
    selectedFailedChunkIds,
  ])

  /**
   * 官方文档来源查看：
   * - 通过 `/knowledge/{id}/source` 取 document.storage_url
   * - 新开页面查看文档
   */
  const handleOpenSourceDocument = async (): Promise<void> => {
    const knowledgeId = selectedKnowledge?.id
    if (!knowledgeId) {
      return
    }

    setSourceActionErrorMessage(null)
    setIsOpeningSourceDocument(true)
    let previewWindow: Window | null = null
    try {
      /**
       * 先在用户点击事件里同步打开空白窗口，避免被浏览器拦截为非用户手势弹窗。
       * 若仍被拦截，后续回退为当前页面跳转，不中断主流程。
       */
      previewWindow = window.open('about:blank', '_blank')
      

      const response = await getKnowledgeSource(knowledgeId)
      const storageUrl = response.document?.storage_url?.trim()
      if (!storageUrl) {
        throw new Error(t('knowledge.noSourceDocumentUrl', i18nLocale))
      }

      if (previewWindow && !previewWindow.closed) {
        previewWindow.location.href = storageUrl
      } else {
        window.location.href = storageUrl
      }
    } catch (error) {
      if (previewWindow && !previewWindow.closed) {
        previewWindow.close()
      }
      setSourceActionErrorMessage(error instanceof Error ? error.message : t('common.error', i18nLocale))
    } finally {
      setIsOpeningSourceDocument(false)
    }
  }

  const handleConfirmDeleteKnowledge = async (): Promise<void> => {
    if (!selectedCompanyId) {
      return
    }
    if (!pendingDeleteItem) {
      return
    }

    try {
      await deleteKnowledgeMutation.mutateAsync({
        company_id: selectedCompanyId,
        knowledge_id: pendingDeleteItem.id,
      })
      setOpenMenuCardId(null)
      if (selectedKnowledge?.id === pendingDeleteItem.id) {
        setSelectedKnowledge(null)
      }
      setPendingDeleteItem(null)
      await refetchKnowledgeList()
    } catch (error) {
      setEditErrorMessage(error instanceof Error ? error.message : t('knowledge.deleteFailed', i18nLocale))
    }
  }

  /**
   * 保存编辑：
   * - 校验必填字段
   * - 调用 `/api/v4/knowledge/update`
   * - 先立即关闭弹窗，再后台刷新列表
   */
  const handleSaveEditKnowledge = async (): Promise<void> => {
    if (!selectedCompanyId) {
      setEditErrorMessage(m.kb_pick_company_first())
      return
    }

    if (!editingKnowledgeId) {
      setEditErrorMessage(m.kb_edit_missing_target())
      return
    }

    const normalizedTitle = editTitle.trim()
    const normalizedContent = editContent.trim()
    if (normalizedTitle.length === 0) {
      setEditErrorMessage(m.kb_edit_title_required())
      return
    }
    if (normalizedContent.length === 0) {
      setEditErrorMessage(m.kb_edit_content_required())
      return
    }

    const payload: UpdateKnowledgeRequest = {
      old_id: editingKnowledgeId,
      company_id: selectedCompanyId,
      key: normalizedTitle,
      text: normalizedContent,
      answer: normalizedContent,
    }

    try {
      await updateKnowledgeMutation.mutateAsync(payload)
      setIsEditModalOpen(false)
      setEditingKnowledgeId(null)
      setEditTitle('')
      setEditContent('')
      setEditErrorMessage(null)
      // update 接口语义通常是 supersede old_id -> new_id，关闭详情避免显示旧记录。
      setSelectedKnowledge(null)

      // 刷新改为后台执行，避免阻塞弹窗关闭。
      void Promise.allSettled([refetchKnowledgeList(), refetchKnowledgeDocuments()])
    } catch {
      // 错误文案已在 onError 处理，这里只吞异常避免未捕获 Promise 警告。
    }
  }

  /**
   * 从正文提取标题：
   * - 优先使用首行作为 key，降低重复输入成本。
   * - 做长度裁剪，避免超长 key 影响列表排版。
   */
  const buildKnowledgeKeyFromText = (text: string): string => {
    const firstLine = text.split('\n')[0]?.trim() || ''
    if (firstLine.length === 0) {
      return `${t('knowledge.manualKnowledgePrefix', i18nLocale)} ${new Date().toISOString()}`
    }
    return firstLine.slice(0, 80)
  }

  /**
   * 轮询文档 ETL 五阶段进度，直到成功/失败/超时。
   * 使用 /documents/{document_id}/pipeline-progress。
   */
  const pollDocumentProgressUntilFinished = async (
    documentId: string,
    onProgress?: (progress: DocumentPipelineProgressResponse) => void,
  ): Promise<DocumentPipelineProgressResponse> => {
    for (let attempt = 0; attempt < DOCUMENT_STATUS_MAX_ATTEMPTS; attempt += 1) {
      const pipelineProgress = await getDocumentPipelineProgress(documentId)
      setDocumentProgress(pipelineProgress)
      onProgress?.(pipelineProgress)
      const normalizedStatus = normalizeDocumentStatus(pipelineProgress.document_status)

      if (DOCUMENT_SUCCESS_STATUSES.has(normalizedStatus)) {
        return pipelineProgress
      }

      if (DOCUMENT_FAILED_STATUSES.has(normalizedStatus)) {
        throw new Error(m.kb_upload_doc_failed({ status: pipelineProgress.document_status || '-' }))
      }

      await sleep(DOCUMENT_STATUS_POLL_INTERVAL_MS)
    }

    throw new Error(m.kb_upload_doc_timeout())
  }

  /**
   * 轮询单个文档任务并更新任务列表状态。
   */
  const monitorUploadTaskByDocumentId = useCallback(async (
    taskId: string,
    documentId: string,
    fileName: string,
  ): Promise<void> => {
    if (pollingDocumentIdSetRef.current.has(documentId)) {
      return
    }

    pollingDocumentIdSetRef.current.add(documentId)
    try {
      const finalProgress = await pollDocumentProgressUntilFinished(documentId, (progress) => {
        const normalizedStatus = normalizeDocumentStatus(progress.document_status)
        patchUploadTask(taskId, {
          status: 'processing',
          progress: getDocumentProgressPercentage(progress),
          statusText: normalizedStatus || 'processing',
          errorMessage: progress.error_message || null,
        })
      })

      patchUploadTask(taskId, {
        status: 'completed',
        progress: 100,
        statusText: normalizeDocumentStatus(finalProgress.document_status) || 'completed',
        errorMessage: null,
      })
      toast.success(m.knowledge_upload_completed({ name: fileName }))
      void Promise.allSettled([refetchKnowledgeList(), refetchKnowledgeDocuments()])
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : m.kb_upload_doc_failed({ status: '-' })
      patchUploadTask(taskId, {
        status: 'failed',
        statusText: 'failed',
        errorMessage,
      })
      toast.error(errorMessage)
    } finally {
      pollingDocumentIdSetRef.current.delete(documentId)
    }
  }, [patchUploadTask, refetchKnowledgeDocuments, refetchKnowledgeList])

  /**
   * 轮询单个网页抓取任务并更新任务状态。
   */
  const monitorWebCrawlTaskByJobId = useCallback(async (
    taskId: string,
    jobId: string,
    sourceUrl: string,
  ): Promise<void> => {
    const pollingKey = toWebCrawlTaskDocumentId(jobId)
    if (pollingDocumentIdSetRef.current.has(pollingKey)) {
      return
    }

    pollingDocumentIdSetRef.current.add(pollingKey)
    try {
      for (let attempt = 0; attempt < DOCUMENT_STATUS_MAX_ATTEMPTS; attempt += 1) {
        const jobProgress = await getWebCrawlJobStatus(jobId)
        const normalizedStatus = normalizeDocumentStatus(jobProgress.status)
        patchUploadTask(taskId, {
          status: DOCUMENT_FAILED_STATUSES.has(normalizedStatus)
            ? 'failed'
            : DOCUMENT_SUCCESS_STATUSES.has(normalizedStatus)
              ? 'completed'
              : 'processing',
          progress: getWebCrawlProgressPercentage(jobProgress),
          statusText: normalizedStatus || 'processing',
          errorMessage: jobProgress.error_message || null,
        })

        if (DOCUMENT_SUCCESS_STATUSES.has(normalizedStatus)) {
          toast.success(m.knowledge_web_crawl_completed({ url: sourceUrl }))
          void Promise.allSettled([refetchKnowledgeList(), refetchKnowledgeDocuments()])
          return
        }

        if (DOCUMENT_FAILED_STATUSES.has(normalizedStatus)) {
          throw new Error(jobProgress.error_message || m.kb_upload_doc_failed({ status: jobProgress.status || '-' }))
        }

        await sleep(DOCUMENT_STATUS_POLL_INTERVAL_MS)
      }

      throw new Error(m.kb_upload_doc_timeout())
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : m.kb_upload_doc_failed({ status: '-' })
      patchUploadTask(taskId, {
        status: 'failed',
        statusText: 'failed',
        errorMessage,
      })
      toast.error(errorMessage)
    } finally {
      pollingDocumentIdSetRef.current.delete(pollingKey)
    }
  }, [patchUploadTask, refetchKnowledgeDocuments, refetchKnowledgeList])

  /**
   * 处理单个文档上传任务：
   * - 上传拿到 document_id；
   * - 触发处理；
   * - 进入轮询。
   */
  const runDocumentUploadTask = useCallback(async (file: File): Promise<void> => {
    const taskId = `upload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const baseTask: UploadTaskItem = {
      id: taskId,
      fileName: file.name,
      documentId: null,
      status: 'uploading',
      progress: 5,
      statusText: 'uploading',
      errorMessage: null,
      createdAt: Date.now(),
    }
    upsertUploadTask(baseTask)

    try {
      const uploadResponse = await uploadKnowledgeDocument({
        company_id: selectedCompanyId as string,
        file,
        uploaded_by: currentUserIdentifier || undefined,
        auto_process: false,
      })

      const documentId =
        uploadResponse.document_id || uploadResponse.existing_record?.document_id || null
      if (!documentId) {
        throw new Error(m.kb_upload_doc_missing_document_id())
      }

      patchUploadTask(taskId, {
        documentId,
        status: 'processing',
        progress: 12,
        statusText: 'processing',
      })

      await processDocumentTrigger(documentId)
      await monitorUploadTaskByDocumentId(taskId, documentId, file.name)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : m.kb_upload_doc_failed({ status: '-' })
      patchUploadTask(taskId, {
        status: 'failed',
        statusText: 'failed',
        errorMessage,
      })
      toast.error(errorMessage)
    }
  }, [currentUserIdentifier, monitorUploadTaskByDocumentId, patchUploadTask, selectedCompanyId, upsertUploadTask])

  /**
   * 处理单个网页 URL 抓取任务。
   */
  const runWebCrawlUploadTask = useCallback(async (
    sourceUrl: string,
    options?: {
      maxDepth?: number
      maxPages?: number
    },
  ): Promise<void> => {
    const taskId = `crawl-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const trimmedSourceUrl = sourceUrl.trim()
    const baseTask: UploadTaskItem = {
      id: taskId,
      fileName: trimmedSourceUrl,
      documentId: null,
      status: 'uploading',
      progress: 5,
      statusText: 'pending',
      errorMessage: null,
      createdAt: Date.now(),
    }
    upsertUploadTask(baseTask)

    try {
      const response = await startWebCrawlJob({
        company_id: selectedCompanyId as string,
        source_url: trimmedSourceUrl,
        max_depth: options?.maxDepth ?? 2,
        max_pages: options?.maxPages ?? 10,
      })
      const jobId = response.job_id?.trim()
      if (!jobId) {
        throw new Error(m.kb_upload_doc_missing_document_id())
      }

      patchUploadTask(taskId, {
        documentId: toWebCrawlTaskDocumentId(jobId),
        status: 'processing',
        progress: 10,
        statusText: normalizeDocumentStatus(response.status) || 'pending',
      })

      await monitorWebCrawlTaskByJobId(taskId, jobId, trimmedSourceUrl)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : m.kb_upload_doc_failed({ status: '-' })
      patchUploadTask(taskId, {
        status: 'failed',
        statusText: 'failed',
        errorMessage,
      })
      toast.error(errorMessage)
    }
  }, [monitorWebCrawlTaskByJobId, patchUploadTask, selectedCompanyId, upsertUploadTask])

  /**
   * 拉取文档处理完成后的结果：
   * - 优先用 document knowledge（更贴近业务可读内容）
   * - “新建/更新”通过 `GET /knowledge/{knowledge_id}` 的 supersede 是否为空判断；
   * - 更新列表展示 supersede 指向的旧知识条目。
   */
  const loadDocumentResultData = useCallback(async (documentId: string): Promise<void> => {
    const knowledgeResult = await listDocumentKnowledge(documentId, { limit: 500, offset: 0 })
    const rows = knowledgeResult.items

    const detailChecks = await Promise.all(
      rows.map(async (item) => {
        try {
          const detailResponse = await getKnowledgeById(item.id)
          const supersede = Array.isArray(detailResponse.item.supersede)
            ? detailResponse.item.supersede.filter((entry): entry is string => typeof entry === 'string' && entry.trim() !== '')
            : []
          return {
            row: item,
            supersedeIds: supersede,
          }
        } catch {
          return {
            row: item,
            supersedeIds: [] as string[],
          }
        }
      }),
    )

    const generatedRows: DocumentKnowledgeItem[] = []
    const supersededIdsInOrder: string[] = []
    const supersededIdSet = new Set<string>()

    detailChecks.forEach((result) => {
      if (result.supersedeIds.length === 0) {
        generatedRows.push(result.row)
        return
      }

      result.supersedeIds.forEach((supersededId) => {
        if (supersededIdSet.has(supersededId)) {
          return
        }
        supersededIdSet.add(supersededId)
        supersededIdsInOrder.push(supersededId)
      })
    })

    const supersededKnowledgeDetails = await Promise.allSettled(
      supersededIdsInOrder.map(async (knowledgeId) => {
        const detailResponse = await getKnowledgeById(knowledgeId)
        return detailResponse.item
      }),
    )

    const updatedRows: DocumentKnowledgeItem[] = supersededKnowledgeDetails
      .filter((result): result is PromiseFulfilledResult<KnowledgeItem> => result.status === 'fulfilled')
      .map((result) => ({
        id: result.value.id,
        key: result.value.key || m.kb_unknown_title(),
        answer: result.value.answer || result.value.text || null,
        status: result.value.status || null,
        document_id: null,
        chunk_id: result.value.doc_chunk_id || null,
        source_type: result.value.source_type || null,
        created_at: result.value.created_at || null,
        updated_at: result.value.updated_at || null,
      }))

    setGeneratedResultItems(generatedRows)
    setUpdatedResultItems(updatedRows)
  }, [])

  /**
   * 打开“上传结果”弹窗并加载指定文档数据。
   */
  const openDocumentResultPanelByDocumentId = useCallback(async (documentId: string): Promise<void> => {
    const normalizedDocumentId = documentId.trim()
    if (!normalizedDocumentId || isWebCrawlTaskDocumentId(normalizedDocumentId)) {
      return
    }

    setActiveResultDocumentId(normalizedDocumentId)
    setGeneratedResultItems([])
    setUpdatedResultItems([])
    setResultPanelError(null)
    setIsResultPanelOpen(true)

    try {
      await loadDocumentResultData(normalizedDocumentId)
    } catch (error) {
      setResultPanelError(error instanceof Error ? error.message : t('common.error', i18nLocale))
    }
  }, [i18nLocale, loadDocumentResultData])

  /**
   * 监听全局悬浮球“打开结果”事件。
   */
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const handleOpenDocumentResult = (event: Event): void => {
      const customEvent = event as CustomEvent<{ documentId?: string }>
      const documentId = customEvent.detail?.documentId?.trim()
      if (!documentId) {
        return
      }
      void openDocumentResultPanelByDocumentId(documentId)
    }

    window.addEventListener(
      KNOWLEDGE_OPEN_DOCUMENT_RESULT_EVENT,
      handleOpenDocumentResult as EventListener,
    )
    return () => {
      window.removeEventListener(
        KNOWLEDGE_OPEN_DOCUMENT_RESULT_EVENT,
        handleOpenDocumentResult as EventListener,
      )
    }
  }, [openDocumentResultPanelByDocumentId])

  /**
   * 从 URL 参数恢复“查看结果”动作，并在处理后清理参数。
   */
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const url = new URL(window.location.href)
    const documentId = url.searchParams.get(KNOWLEDGE_RESULT_QUERY_PARAM)?.trim()
    if (!documentId) {
      return
    }

    void openDocumentResultPanelByDocumentId(documentId)
    url.searchParams.delete(KNOWLEDGE_RESULT_QUERY_PARAM)
    window.history.replaceState({}, '', url.toString())
  }, [openDocumentResultPanelByDocumentId])

  /**
   * 上传知识：
   * - 手动模式：直接 createKnowledge
   * - 文档模式：支持多文件并发任务，后台轮询更新任务状态
   * - URL 模式：创建 web crawl 任务并后台轮询
   */
  const handleUploadKnowledge = async (): Promise<void> => {
    if (!selectedCompanyId) {
      setUploadErrorMessage(m.kb_pick_company_first())
      return
    }

    if (uploadMode === 'manual') {
      const normalizedText = manualKnowledgeText.trim()
      if (normalizedText.length === 0) {
        setUploadErrorMessage(m.kb_upload_manual_required())
        return
      }

      const payload: CreateKnowledgeRequest = {
        company_id: selectedCompanyId,
        key: buildKnowledgeKeyFromText(normalizedText),
        text: normalizedText,
        answer: normalizedText,
        source_type: 'manual',
      }

      try {
        await createKnowledgeMutation.mutateAsync(payload)
      } catch {
        // 错误文案已在 mutation 的 onError 中处理，这里吞掉异常避免未捕获 Promise 警告。
      }
      return
    }

    if (uploadMode === 'crawl-url') {
      const normalizedSourceUrl = crawlSourceUrl.trim()
      if (normalizedSourceUrl.length === 0) {
        setUploadErrorMessage(t('knowledge.uploadCrawlUrlRequired', i18nLocale))
        return
      }

      try {
        const parsedUrl = new URL(normalizedSourceUrl)
        if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
          setUploadErrorMessage(t('knowledge.uploadCrawlUrlRequired', i18nLocale))
          return
        }
      } catch {
        setUploadErrorMessage(t('knowledge.uploadCrawlUrlRequired', i18nLocale))
        return
      }

      setUploadErrorMessage(null)
      setIsUploadModalOpen(false)
      setCrawlSourceUrl('')

      void runWebCrawlUploadTask(normalizedSourceUrl, {
        maxDepth: crawlMaxDepth,
        maxPages: crawlMaxPages,
      })
      return
    }

    if (selectedUploadFiles.length === 0) {
      setUploadErrorMessage(m.kb_upload_doc_required())
      return
    }
    setUploadErrorMessage(null)
    setIsUploadModalOpen(false)

    const filesToUpload = [...selectedUploadFiles]
    setSelectedUploadFiles([])
    void Promise.allSettled(filesToUpload.map((file) => runDocumentUploadTask(file)))
  }

  /**
   * 首次进入页面时恢复本地任务，并继续轮询未终态任务。
   */
  useEffect(() => {
    if (hasRestoredUploadTasksRef.current) {
      return
    }
    hasRestoredUploadTasksRef.current = true

    if (typeof window === 'undefined') {
      return
    }

    const persistedTasks = loadPersistedUploadTasks()
    if (persistedTasks.length === 0) {
      canPersistUploadTasksRef.current = true
      return
    }

    const restoredTasks: UploadTaskItem[] = persistedTasks.map((task, index) => ({
      id: `persisted-${task.documentId}-${index}`,
      fileName: task.fileName,
      documentId: task.documentId,
      status: task.status,
      progress: task.progress,
      statusText: task.statusText,
      errorMessage: task.errorMessage,
      createdAt: task.createdAt,
    }))
    setUploadTasks(restoredTasks)

    restoredTasks.forEach((task) => {
      if (!task.documentId || isUploadTaskTerminalStatus(task.status)) {
        return
      }

      const crawlJobId = parseWebCrawlJobIdFromTaskDocumentId(task.documentId)
      if (crawlJobId) {
        void monitorWebCrawlTaskByJobId(task.id, crawlJobId, task.fileName)
        return
      }

      void monitorUploadTaskByDocumentId(task.id, task.documentId, task.fileName)
    })

    canPersistUploadTasksRef.current = true
  }, [monitorUploadTaskByDocumentId, monitorWebCrawlTaskByJobId])

  /**
   * 统一关闭当前知识详情面板：
   * - 手机 / 平板点击遮罩时直接收起当前详情；
   * - 两种详情状态互斥，这里同时清空可以避免模式切换后残留旧选中态。
   */
  const handleCloseActiveDetailPanel = (): void => {
    setSelectedKnowledge(null)
    setSelectedDocumentRow(null)
  }

  return (
    <DashboardPageLayout
      detailPresentation={detailPanelMode}
      onClick={() => {
        setOpenMenuCardId(null)
      }}
    >
      <div className="flex h-full gap-2">
        <DashboardPageLayoutCard className="dashboard-kb-panel w-full transition-[width] duration-300">
          <DashboardPageHeader
            title={m.kb_title()}
            startRow={headerStartRow}
            endRow={headerEndRow}
            totalRows={headerTotalRows}
            canPrevPage={headerCanPrevPage}
            canNextPage={headerCanNextPage}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
            className="dashboard-task-page-header px-4"
          />
          {isDemoMode() && knowledgeDemoNarrative ? (
            <div className="mx-4 mb-2 rounded-[20px] border border-[rgb(80_77_220_/0.12)] bg-[linear-gradient(135deg,rgba(80,77,220,0.08),rgba(225,218,192,0.72))] px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lucius-cobalt)]">
                Lucius source of truth
              </p>
              <p className="mt-2 text-[18px] font-semibold tracking-[-0.02em] text-[var(--dashboard-title-text)]">
                {knowledgeDemoNarrative.title}
              </p>
              <p className="mt-1 max-w-[38rem] text-[13px] leading-[1.65] text-[var(--dashboard-text-muted)]">
                {knowledgeDemoNarrative.focus}
              </p>
            </div>
          ) : null}
          <div className="dashboard-kb-toolbar">
            <div className="dashboard-kb-tab-group">
              <button
                type="button"
                data-active={activeTab === 'all' ? 'true' : 'false'}
                className="dashboard-kb-tab"
                onClick={() => setActiveTab('all')}
              >
                {t('knowledge.tabItems', i18nLocale)}
              </button>
              <button
                type="button"
                data-active={activeTab === 'docs' ? 'true' : 'false'}
                className="dashboard-kb-tab"
                onClick={() => setActiveTab('docs')}
              >
                {t('knowledge.tabDocs', i18nLocale)}
              </button>
            </div>

            <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto sm:flex-nowrap">
              <label className="dashboard-kb-control-shell dashboard-kb-search-shell w-full sm:w-[193px]">
                <Search className="h-4 w-4" />
                <input
                  className="dashboard-kb-control-input"
                  placeholder={t('knowledge.searchPlaceholder', i18nLocale)}
                  value={searchKeyword}
                  onChange={(event) => {
                    setSearchKeyword(event.target.value)
                    setKnowledgeCurrentPageState(1)
                  }}
                />
              </label>

              <button
                type="button"
                className="flex h-11 w-full items-center justify-center gap-1 rounded-[12px] bg-[var(--dashboard-sidebar-active-bg)] px-3 text-[14px] font-semibold text-[var(--dashboard-sidebar-active-fg)] transition-opacity hover:opacity-90 sm:w-[156px]"
                onClick={() => {
                  setUploadErrorMessage(null)
                  setSelectedUploadFiles([])
                  setUploadMode('upload-doc')
                  setIsUploadModalOpen(true)
                }}
              >
                <Plus className="h-5 w-5" />
                {t('knowledge.uploadKnowledge', i18nLocale)}
              </button>
            </div>
          </div>

          {activeTab === 'all' ? (
            <>
              <div className="dashboard-kb-summary-toolbar">
                <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto sm:gap-4">
                  <p className="text-[14px] font-semibold text-[var(--dashboard-text-muted)]">
                    {`${t('knowledge.totalCountPrefix', i18nLocale)} ${visibleTotalRows}${t('knowledge.totalCountSuffix', i18nLocale)}`}
                  </p>
                  <label className="dashboard-kb-control-shell dashboard-kb-filter-shell w-full sm:w-40">
                    <select
                      className="dashboard-kb-control-select"
                      value={sourceFilter}
                      onChange={(event) => {
                        setSourceFilter(event.target.value as KnowledgeSourceFilter)
                      }}
                    >
                      <option value="all">{getSourceFilterLabel('all', i18nLocale)}</option>
                      <option value="document">{getSourceFilterLabel('document', i18nLocale)}</option>
                      <option value="chat_history">{getSourceFilterLabel('chat_history', i18nLocale)}</option>
                      <option value="manual">{getSourceFilterLabel('manual', i18nLocale)}</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 h-3 w-3 text-[var(--dashboard-text-muted)]" />
                  </label>
                </div>
              </div>

              <div className="dashboard-kb-list-scroll h-[calc(100%-156px)] overflow-y-auto overflow-x-hidden px-4 py-2">
                {!selectedCompanyId ? (
                  <CompanySelectionPrompt
                    message={m.kb_pick_company_first()}
                    density="compact"
                  />
                ) : null}

                {isLoading || isSearchingKnowledge ? (
                  <>
                    <KnowledgeCardSkeleton />
                    <KnowledgeCardSkeleton />
                    <KnowledgeCardSkeleton />
                  </>
                ) : null}

                {isError || isSearchError ? (
                  <div className="rounded-[4px] border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
                    {m.kb_load_error({ message: (searchError || error)?.message || '-' })}
                  </div>
                ) : null}

                {!isLoading && !isError && !isSearchingKnowledge && !isSearchError && cardItems.length === 0 && selectedCompanyId ? (
                  <div className="dashboard-kb-empty-state text-[14px]">
                    {m.kb_empty()}
                  </div>
                ) : null}

                {!isLoading && !isError && !isSearchingKnowledge && !isSearchError && selectedCompanyId
                  ? cardItems.map((item) => (
                      <div key={item.id} className="mb-2">
                        <KnowledgeCard
                          item={item}
                          isSelected={selectedKnowledge?.id === item.id}
                          isMenuOpen={openMenuCardId === item.id}
                          onToggleMenu={handleToggleMenu}
                          onViewSource={handleViewSource}
                          onEdit={handleOpenEditModal}
                          onDelete={handleDeleteKnowledge}
                          isDeleting={deleteKnowledgeMutation.isPending}
                          locale={i18nLocale}
                        />
                      </div>
                  ))
                  : null}
              </div>
            </>
          ) : (
            <div className="dashboard-kb-list-scroll h-[calc(100%-156px)] overflow-y-auto overflow-x-hidden">
              <div className="overflow-x-auto">
                <div className="min-w-[760px]">
                  <div className="dashboard-kb-doc-header">
                    <p>{t('knowledge.docTitle', i18nLocale)}</p>
                    <p>{t('knowledge.generatedCount', i18nLocale)}</p>
                    <p>{t('knowledge.uploader', i18nLocale)}</p>
                    <p className="text-right">{t('knowledge.uploadedAt', i18nLocale)}</p>
                  </div>

                  {!selectedCompanyId ? (
                    <CompanySelectionPrompt
                      message={m.kb_pick_company_first()}
                      density="compact"
                      className="m-4"
                    />
                  ) : null}

                  {isLoadingDocuments ? (
                    <>
                      <DocumentRowSkeleton />
                      <DocumentRowSkeleton />
                      <DocumentRowSkeleton />
                    </>
                  ) : null}

                  {isDocumentsError ? (
                    <div className="m-4 rounded-[4px] border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
                      {m.kb_load_error({ message: documentsError.message })}
                    </div>
                  ) : null}

                  {!isLoadingDocuments && !isDocumentsError && documentRows.length === 0 && selectedCompanyId ? (
                    <div className="m-4 dashboard-kb-empty-state text-[14px]">
                      {m.kb_docs_empty()}
                    </div>
                  ) : null}

                  {!isLoadingDocuments && !isDocumentsError && selectedCompanyId
                    ? documentRows.map((row) => (
                        <article
                          key={row.id}
                          data-selected={selectedDocumentRow?.id === row.id ? 'true' : 'false'}
                          className="dashboard-kb-doc-row cursor-pointer"
                          onClick={() => {
                            setSelectedDocumentRow(row)
                            setSelectedKnowledge(null)
                          }}
                        >
                          <div className="flex min-w-0 items-center gap-2">
                            <FileText className="h-4 w-4 shrink-0 text-[var(--dashboard-sidebar-active-bg)]" />
                            <p className="truncate">{row.title}</p>
                          </div>
                          <p>{row.generatedKnowledgeCount}</p>
                          <p>{row.uploader}</p>
                          <p className="text-right text-[var(--dashboard-text-muted)]">{row.uploadedAt}</p>
                        </article>
                      ))
                    : null}
                </div>
              </div>
            </div>
          )}
        </DashboardPageLayoutCard>
      </div>

      {hasActiveDetailPanel && detailPanelMode !== 'inline' ? (
        <div className="dashboard-kb-detail-layer" data-mode={detailPanelMode}>
          <button
            type="button"
            className="dashboard-kb-detail-backdrop"
            onClick={handleCloseActiveDetailPanel}
            aria-label={m.common_close()}
          />
        </div>
      ) : null}

      {isKnowledgeDetailOpen ? (
        <section className="dashboard-kb-detail-panel" data-mode={detailPanelMode}>
          <header className="dashboard-kb-detail-header px-4 sm:px-5 lg:px-6">
            <h3 className="text-[14px] font-medium leading-[1.6] tracking-[-0.14px] text-[var(--dashboard-text)]">{t('knowledge.sourceTitle', i18nLocale)}</h3>
            <button
              type="button"
              className="dashboard-kb-detail-icon-button rounded-[6px] p-1"
              onClick={() => setSelectedKnowledge(null)}
              aria-label={m.knowledge_close_detail_popup()}
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5 lg:px-6">
            {isLoadingDetail ? (
              <>
                <Skeleton className="h-5 w-[45%]" />
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-4 w-[30%]" />
                <Skeleton className="h-28 w-full" />
              </>
            ) : null}

            {isDetailError ? (
              <div className="rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
                {m.kb_load_error({ message: detailError.message })}
              </div>
            ) : null}

            {!isLoadingDetail && !isDetailError && detailSessionId ? (
              <>
                <section>
                  <p className="text-[16px] font-medium leading-[1.6] tracking-[-0.16px] text-[var(--dashboard-text)]">{detailTitle}</p>
                  <p className="mt-2 whitespace-pre-wrap break-words text-[14px] font-medium leading-[1.6] tracking-[-0.14px] text-[var(--dashboard-text-muted)]">
                    {detailContent}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    {detailSource ? <SourceBadge source={detailSource} locale={i18nLocale} /> : null}
                  </div>
                </section>
                <div className="dashboard-kb-detail-divider" />

                {isLoadingSessionDetail ? (
                  <>
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </>
                ) : null}

                {!isLoadingSessionDetail && detailSessionMessages.length === 0 ? (
                  <div className="dashboard-kb-detail-soft-block text-[13px] text-[var(--dashboard-text-muted)]">
                    {t('knowledge.sessionNotFound', i18nLocale)}
                  </div>
                ) : null}

                {!isLoadingSessionDetail
                  ? groupedSessionMessages.map(([roomName, messages], groupIndex) => (
                      <section key={roomName}>
                        {groupIndex > 0 ? <div className="dashboard-kb-detail-divider my-3" /> : null}
                        <p className="mb-3 text-[13px] font-medium text-[var(--dashboard-text-muted)]">{`# ${roomName}`}</p>
                        <div className="space-y-4">
                          {messages.map((message) => {
                            const username =
                              message.server_user?.username ||
                              (message.message_role === 'assistant'
                                ? m.client_chat_lucius_name()
                                : t('common.unknownUser', i18nLocale))
                            const avatarUrl = message.server_user?.avatar_url || ''
                            const roleLabel = message.message_role === 'assistant' ? t('knowledge.roleAssistant', i18nLocale) : t('knowledge.roleUser', i18nLocale)
                            const sentAtText = message.sent_at
                              ? new Date(message.sent_at).toLocaleString(getLocale() === 'zh' ? 'zh-CN' : 'en-US', {
                                  month: '2-digit',
                                  day: '2-digit',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: false,
                                })
                              : '--'

                            return (
                              <article key={message.id}>
                                <div className="flex flex-wrap items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={avatarUrl} alt={username} />
                                    <AvatarFallback className="bg-[var(--dashboard-sidebar-company-active-bg)] text-[11px] font-medium text-[var(--dashboard-sidebar-text)]">
                                      {username.slice(0, 1).toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <p className="text-[14px] font-medium leading-[1.6] tracking-[-0.14px] text-[var(--dashboard-text)]">{username}</p>
                                  <span className="inline-flex h-6 items-center rounded-[20px] bg-[var(--dashboard-panel-muted-bg)] px-2 text-[12px] font-semibold text-[var(--dashboard-text-muted)]">
                                    {roleLabel}
                                  </span>
                                  <p className="text-[12px] font-medium text-[var(--dashboard-text-muted)]">{sentAtText}</p>
                                </div>
                                <p className="ml-8 mt-2 whitespace-pre-wrap break-words text-[14px] font-medium leading-[1.6] tracking-[-0.14px] text-[var(--dashboard-text)]">
                                  {message.content || '-'}
                                </p>
                              </article>
                            )
                          })}
                        </div>
                      </section>
                    ))
                  : null}
              </>
            ) : null}

            {!isLoadingDetail && !isDetailError && !detailSessionId ? (
              <>
                <section className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3 px-1 py-1">
                    <div className="flex items-center gap-2">
                      {detailSource ? <SourceBadge source={detailSource} locale={i18nLocale} /> : null}
                    </div>
                    {isDocumentLikeKnowledgeSource(detailSource) ? (
                      <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-[var(--dashboard-sidebar-company-active-bg)] text-[var(--dashboard-sidebar-active-bg)] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                        onClick={handleOpenSourceDocument}
                        disabled={isOpeningSourceDocument}
                        aria-label={t('knowledge.viewDocument', i18nLocale)}
                      >
                        <Eye className={`h-4 w-4 ${isOpeningSourceDocument ? 'animate-pulse' : ''}`} />
                      </button>
                    ) : null}
                  </div>

                  {isDocumentLikeKnowledgeSource(detailSource) ? (
                    <div className="dashboard-kb-detail-soft-block">
                      <p className="text-[12px] font-semibold text-[var(--dashboard-text-muted)]">{t('knowledge.docTitle', i18nLocale)}</p>
                      <p className="mt-1 break-words text-[14px] font-medium leading-[1.6] tracking-[-0.14px] text-[var(--dashboard-text)]">
                        {officialSourceDocumentName || '--'}
                      </p>
                    </div>
                  ) : null}

                  <div className="dashboard-kb-detail-card">
                    {isLoadingOfficialSourceChunk && isDocumentLikeKnowledgeSource(detailSource) ? (
                      <Skeleton className="h-20 w-full" />
                    ) : (
                      <p className="whitespace-pre-wrap break-words text-[14px] font-medium leading-[1.75] tracking-[-0.14px] text-[var(--dashboard-text)]">
                        {isDocumentLikeKnowledgeSource(detailSource) ? officialSourceChunkContent || detailTextOnly : detailTextOnly}
                      </p>
                    )}
                  </div>

                  {sourceActionErrorMessage ? (
                    <p className="rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-700">
                      {sourceActionErrorMessage}
                    </p>
                  ) : null}
                  {officialSourceChunkErrorMessage ? (
                    <p className="rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-700">
                      {officialSourceChunkErrorMessage}
                    </p>
                  ) : null}
                </section>
              </>
            ) : null}
          </div>
        </section>
      ) : null}
      {isDocumentDetailOpen ? (
        <section className="dashboard-kb-detail-panel" data-mode={detailPanelMode}>
          <div className="dashboard-kb-detail-header px-4 sm:px-5">
            <div>
              <h3 className="text-[14px] font-semibold tracking-[-0.14px] text-[var(--dashboard-text)]">
                {t('knowledge.docInsightTitle', i18nLocale)}
              </h3>
            </div>
            <button
              type="button"
              className="dashboard-kb-detail-icon-button rounded-[8px] p-1.5"
              onClick={() => setSelectedDocumentRow(null)}
              aria-label={m.knowledge_close_document_popup()}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
            <section className="dashboard-kb-detail-card">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-semibold text-[var(--dashboard-text)]">
                    {selectedDocumentRow?.title}
                  </p>
                </div>
                <span className="inline-flex h-6 items-center rounded-full bg-[var(--dashboard-sidebar-company-active-bg)] px-2.5 text-[11px] font-semibold text-[var(--dashboard-sidebar-active-bg)]">
                  {selectedDocumentStatus?.status || selectedDocumentRow?.status || t('common.unknown', i18nLocale)}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="dashboard-kb-detail-soft-block px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.04em] text-[var(--dashboard-text-muted)]">{t('knowledge.uploader', i18nLocale)}</p>
                  <p className="mt-1 truncate text-[12px] font-medium text-[var(--dashboard-sidebar-text)]">
                    {selectedDocumentRow?.uploader || '--'}
                  </p>
                </div>
                <div className="dashboard-kb-detail-soft-block px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.04em] text-[var(--dashboard-text-muted)]">{t('knowledge.uploadedAt', i18nLocale)}</p>
                  <p className="mt-1 truncate text-[12px] font-medium text-[var(--dashboard-sidebar-text)]">
                    {selectedDocumentRow?.uploadedAt || '--'}
                  </p>
                </div>
                <div className="dashboard-kb-detail-soft-block px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.04em] text-[var(--dashboard-text-muted)]">{t('knowledge.typeSize', i18nLocale)}</p>
                  <p className="mt-1 truncate text-[12px] font-medium text-[var(--dashboard-sidebar-text)]">
                    {`${selectedDocumentRow?.fileType || '--'} / ${formatFileSize(selectedDocumentRow?.fileSize || null)}`}
                  </p>
                </div>
                <div className="dashboard-kb-detail-soft-block px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.04em] text-[var(--dashboard-text-muted)]">{t('knowledge.generatedCount', i18nLocale)}</p>
                  <p className="mt-1 text-[12px] font-medium text-[var(--dashboard-sidebar-text)]">
                    {selectedDocumentStatus?.knowledge_count ?? selectedDocumentRow?.generatedKnowledgeCount ?? 0}
                  </p>
                </div>
              </div>
            </section>

            <section className="dashboard-kb-detail-card">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[13px] font-semibold text-[var(--dashboard-text)]">
                    {m.knowledge_failed_chunks_title()}
                  </p>
                  <p className="mt-1 text-[11px] text-[var(--dashboard-text-muted)]">
                    {`${m.knowledge_failed_chunks_selected_count({ count: String(selectedFailedChunkCount) })} / ${failedChunkCount}`}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <button
                    type="button"
                    className="dashboard-kb-failed-chunk-secondary-button"
                    onClick={handleToggleAllFailedChunkSelection}
                    disabled={failedChunkCount === 0 || isRetryAllFailedChunksPending || isRetrySelectedFailedChunksPending}
                  >
                    {areAllFailedChunksSelected ? m.common_clear() : m.knowledge_failed_chunks_select_all()}
                  </button>
                  <button
                    type="button"
                    className="dashboard-kb-failed-chunk-action-button"
                    onClick={() => {
                      void handleRetryAllFailedChunks()
                    }}
                    disabled={failedChunkCount === 0 || isRetryAllFailedChunksPending || isRetrySelectedFailedChunksPending}
                  >
                    <RefreshCcw className={`h-3.5 w-3.5 ${isRetryAllFailedChunksPending ? 'animate-spin' : ''}`} />
                    {isRetryAllFailedChunksPending
                      ? m.knowledge_retrying_failed_chunks()
                      : m.knowledge_retry_all_failed_chunks()}
                  </button>
                  <button
                    type="button"
                    className="dashboard-kb-failed-chunk-action-button"
                    onClick={() => {
                      void handleRetrySelectedFailedChunks()
                    }}
                    disabled={
                      selectedFailedChunkCount === 0 || isRetryAllFailedChunksPending || isRetrySelectedFailedChunksPending
                    }
                  >
                    <RefreshCcw className={`h-3.5 w-3.5 ${isRetrySelectedFailedChunksPending ? 'animate-spin' : ''}`} />
                    {isRetrySelectedFailedChunksPending
                      ? m.knowledge_retrying_failed_chunks()
                      : m.knowledge_retry_selected_failed_chunks()}
                  </button>
                </div>
              </div>

              {isLoadingSelectedDocumentStatus ? (
                <>
                  <Skeleton className="h-20 w-full rounded-[10px]" />
                  <Skeleton className="mt-3 h-20 w-full rounded-[10px]" />
                </>
              ) : null}

              {isSelectedDocumentStatusError ? (
                <div className="rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
                  {m.kb_load_error({
                    message: selectedDocumentStatusError?.message || m.knowledge_document_status_load_failed(),
                  })}
                </div>
              ) : null}

              {documentRetryErrorMessage ? (
                <div className="rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
                  {documentRetryErrorMessage}
                </div>
              ) : null}

              {!isLoadingSelectedDocumentStatus && !isSelectedDocumentStatusError && failedChunkCount === 0 ? (
                <div className="dashboard-kb-detail-soft-block text-center text-[13px] text-[var(--dashboard-text-muted)]">
                  {m.knowledge_failed_chunks_empty()}
                </div>
              ) : null}

              {!isLoadingSelectedDocumentStatus && !isSelectedDocumentStatusError && failedChunkCount > 0 ? (
                <div className="space-y-3">
                  {failedChunkDetails.map((failedChunk) => {
                    const isChunkSelected = selectedFailedChunkIdSet.has(failedChunk.chunkId)
                    return (
                      <label
                        key={failedChunk.chunkId}
                        className="dashboard-kb-failed-chunk-row"
                      >
                        <input
                          type="checkbox"
                          className="dashboard-kb-failed-chunk-checkbox"
                          checked={isChunkSelected}
                          onChange={() => {
                            handleToggleFailedChunkSelection(failedChunk.chunkId)
                          }}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="truncate text-[13px] font-semibold text-[var(--dashboard-text)]">
                              {failedChunk.heading || m.knowledge_failed_chunk_heading_fallback()}
                            </p>
                            {failedChunk.status ? (
                              <span className="inline-flex h-5 items-center rounded-full bg-[var(--dashboard-sidebar-company-active-bg)] px-2 text-[10px] font-semibold text-[var(--dashboard-sidebar-active-bg)]">
                                {failedChunk.status}
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-1 break-all text-[11px] text-[var(--dashboard-text-muted)]">
                            {failedChunk.chunkId}
                          </p>
                          <div className="mt-2 flex items-start gap-2 rounded-[10px] bg-[var(--dashboard-panel-muted-bg)] px-3 py-2">
                            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--dashboard-danger-text)]" />
                            <p className="whitespace-pre-wrap break-words text-[12px] leading-[1.6] text-[var(--dashboard-sidebar-text)]">
                              {failedChunk.errorMessage || t('common.unknown', i18nLocale)}
                            </p>
                          </div>
                          {failedChunk.extractionAttempts !== null ? (
                            <p className="mt-2 text-[11px] text-[var(--dashboard-text-muted)]">
                              {m.knowledge_failed_chunk_attempts({
                                count: String(failedChunk.extractionAttempts),
                              })}
                            </p>
                          ) : null}
                        </div>
                      </label>
                    )
                  })}
                </div>
              ) : null}
            </section>

            <section className="dashboard-kb-detail-card">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-[var(--dashboard-sidebar-company-active-bg)] text-[var(--dashboard-sidebar-active-bg)]">
                    <ImageIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-[var(--dashboard-text)]">{t('knowledge.imageAttachments', i18nLocale)}</p>
                    <p className="text-[11px] text-[var(--dashboard-text-muted)]">{t('knowledge.imagePreviewHint', i18nLocale)}</p>
                  </div>
                </div>
                <p className="text-[12px] font-medium text-[var(--dashboard-text-muted)]">{`${t('knowledge.totalPrefix', i18nLocale)}: ${imageAttachments.length}`}</p>
              </div>

              {isLoadingDocumentAttachments ? (
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                  <Skeleton className="h-28 w-full rounded-[10px]" />
                  <Skeleton className="h-28 w-full rounded-[10px]" />
                  <Skeleton className="h-28 w-full rounded-[10px]" />
                </div>
              ) : null}

              {documentAttachmentsErrorMessage ? (
                <div className="rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
                  {m.kb_load_error({ message: documentAttachmentsErrorMessage })}
                </div>
              ) : null}

              {!isLoadingDocumentAttachments &&
              !documentAttachmentsErrorMessage &&
              imageAttachments.length === 0 ? (
                <p className="dashboard-kb-detail-soft-block text-center text-[13px] text-[var(--dashboard-text-muted)]">
                  {t('knowledge.noImageAttachments', i18nLocale)}
                </p>
              ) : null}

              {!isLoadingDocumentAttachments && !documentAttachmentsErrorMessage && imageAttachments.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                  {imageAttachments.map((attachment, index) => (
                    <button
                      key={attachment.id}
                      type="button"
                      className="group overflow-hidden rounded-[10px] bg-[var(--dashboard-soft-surface)] text-left transition hover:-translate-y-0.5 hover:shadow-[0px_8px_18px_0px_rgba(30,41,59,0.12)]"
                      onClick={() => {
                        setPreviewImageAttachmentId(attachment.id)
                      }}
                    >
                      <div className="relative h-28 w-full overflow-hidden bg-[var(--dashboard-sidebar-company-active-bg)]">
                        <img
                          src={getAttachmentImageSrc(attachment)}
                          alt={attachment.file_name}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0)_45%,rgba(2,6,23,0.75)_100%)] opacity-0 transition group-hover:opacity-100" />
                        <span className="pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full border border-white/30 bg-black/45 px-2 py-0.5 text-[10px] font-medium text-white opacity-0 transition group-hover:opacity-100">
                          <Maximize2 className="h-3 w-3" />
                          {t('knowledge.preview', i18nLocale)}
                        </span>
                      </div>
                      <div className="px-2 py-1.5">
                        <p className="truncate text-[11px] font-medium text-[var(--dashboard-sidebar-text)]">
                          {attachment.file_name || `image-${index + 1}`}
                        </p>
                        <p className="mt-0.5 truncate text-[10px] text-[var(--dashboard-text-muted)]">
                          {attachment.mime_type || attachment.type || 'image'}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : null}
            </section>

            <section className="dashboard-kb-detail-card">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-semibold text-[var(--dashboard-text)]">{t('knowledge.chunkList', i18nLocale)}</p>
                </div>
                <p className="text-[12px] font-medium text-[var(--dashboard-text-muted)]">{`${t('knowledge.totalPrefix', i18nLocale)}: ${selectedDocumentKnowledgeTotal}`}</p>
              </div>

              {isLoadingDocumentKnowledge ? (
                <>
                  <Skeleton className="h-24 w-full rounded-[10px]" />
                  <Skeleton className="mt-3 h-24 w-full rounded-[10px]" />
                  <Skeleton className="mt-3 h-24 w-full rounded-[10px]" />
                </>
              ) : null}

              {documentKnowledgeErrorMessage ? (
                <div className="rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
                  {m.kb_load_error({ message: documentKnowledgeErrorMessage })}
                </div>
              ) : null}

              {!isLoadingDocumentKnowledge && !documentKnowledgeErrorMessage && selectedDocumentKnowledgeItems.length === 0 ? (
                <div className="dashboard-kb-detail-soft-block text-center text-[13px] text-[var(--dashboard-text-muted)]">
                  {t('knowledge.noChunkData', i18nLocale)}
                </div>
              ) : null}

              {!isLoadingDocumentKnowledge && !documentKnowledgeErrorMessage
                ? selectedDocumentKnowledgeItems.map((knowledgeItem) => (
                    <article
                      key={knowledgeItem.id}
                      className="mb-3 rounded-[10px] bg-[var(--dashboard-soft-surface)] px-4 py-4"
                    >
                      <p className="pr-2 text-[13px] font-semibold text-[var(--dashboard-text)]">
                        {knowledgeItem.key || m.kb_unknown_title()}
                      </p>
                      <p className="mt-2 whitespace-pre-wrap break-words text-[13px] leading-[1.65] text-[var(--dashboard-sidebar-text)]">
                        {knowledgeItem.answer || '-'}
                      </p>
                    </article>
                  ))
                : null}

              {!isLoadingDocumentKnowledge &&
              !documentKnowledgeErrorMessage &&
              selectedDocumentKnowledgeTotal > 0 ? (
                <div className="mt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    className="rounded-[6px] bg-[var(--dashboard-soft-surface)] px-2.5 py-1 text-[12px] text-[var(--dashboard-sidebar-text)] disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => {
                      if (!documentKnowledgeCanPrevPage) {
                        return
                      }
                      setSelectedDocumentKnowledgeOffset((previousValue) =>
                        Math.max(0, previousValue - DOCUMENT_INSIGHT_KNOWLEDGE_PAGE_SIZE),
                      )
                    }}
                    disabled={!documentKnowledgeCanPrevPage}
                  >
                    {t('common.previous', i18nLocale)}
                  </button>
                  <p className="text-[12px] text-[var(--dashboard-text-muted)]">{`${documentKnowledgePage}`}</p>
                  <button
                    type="button"
                    className="rounded-[6px] bg-[var(--dashboard-soft-surface)] px-2.5 py-1 text-[12px] text-[var(--dashboard-sidebar-text)] disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => {
                      if (!documentKnowledgeCanNextPage) {
                        return
                      }
                      setSelectedDocumentKnowledgeOffset((previousValue) =>
                        previousValue + DOCUMENT_INSIGHT_KNOWLEDGE_PAGE_SIZE,
                      )
                    }}
                    disabled={!documentKnowledgeCanNextPage}
                  >
                    {t('common.next', i18nLocale)}
                  </button>
                </div>
              ) : null}
            </section>

          </div>
        </section>
      ) : null}

      <EditKnowledgeModal
        isOpen={isEditModalOpen}
        title={editTitle}
        content={editContent}
        errorMessage={editErrorMessage}
        isSubmitting={updateKnowledgeMutation.isPending}
        onClose={() => {
          setIsEditModalOpen(false)
          setEditingKnowledgeId(null)
          setEditErrorMessage(null)
        }}
        onTitleChange={(value) => {
          setEditTitle(value)
          if (editErrorMessage) {
            setEditErrorMessage(null)
          }
        }}
        onContentChange={(value) => {
          setEditContent(value)
          if (editErrorMessage) {
            setEditErrorMessage(null)
          }
        }}
        onSubmit={handleSaveEditKnowledge}
      />

      <UploadKnowledgeModal
        isOpen={isUploadModalOpen}
        locale={i18nLocale}
        mode={uploadMode}
        documentUploadStage={documentUploadStage}
        documentProgress={documentProgress}
        manualText={manualKnowledgeText}
        crawlSourceUrl={crawlSourceUrl}
        crawlMaxDepth={crawlMaxDepth}
        crawlMaxPages={crawlMaxPages}
        selectedUploadFiles={selectedUploadFiles}
        errorMessage={uploadErrorMessage}
        isSubmitting={createKnowledgeMutation.isPending}
        onClose={() => {
          setIsUploadModalOpen(false)
          setUploadErrorMessage(null)
          setSelectedUploadFiles([])
          setCrawlSourceUrl('')
          setDocumentUploadStage('idle')
          setDocumentProgress(null)
        }}
        onModeChange={(mode) => {
          setUploadMode(mode)
          setUploadErrorMessage(null)
        }}
        onManualTextChange={(value) => {
          setManualKnowledgeText(value)
          if (uploadErrorMessage) {
            setUploadErrorMessage(null)
          }
        }}
        onCrawlSourceUrlChange={(value) => {
          setCrawlSourceUrl(value)
          if (uploadErrorMessage) {
            setUploadErrorMessage(null)
          }
        }}
        onCrawlMaxDepthChange={(value) => {
          setCrawlMaxDepth(value)
        }}
        onCrawlMaxPagesChange={(value) => {
          setCrawlMaxPages(value)
        }}
        onUploadFileChange={(files) => {
          setSelectedUploadFiles(files)
          if (uploadErrorMessage) {
            setUploadErrorMessage(null)
          }
        }}
        onSubmit={handleUploadKnowledge}
      />

      <DocumentResultPanel
        isOpen={isResultPanelOpen}
        documentId={activeResultDocumentId}
        errorMessage={resultPanelError}
        generatedItems={generatedResultItems}
        updatedItems={updatedResultItems}
        onClose={() => {
          setIsResultPanelOpen(false)
        }}
        onConfirm={() => {
          setIsResultPanelOpen(false)
          setActiveTab('all')
        }}
      />
      <AlertDialog
        open={Boolean(pendingDeleteItem)}
        onOpenChange={(open) => {
          if (!open) {
            setPendingDeleteItem(null)
          }
        }}
      >
          <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>{t('knowledge.deleteConfirmTitle', i18nLocale)}</AlertDialogTitle>
            <AlertDialogDescription>
              {`${t('knowledge.deleteConfirmDescPrefix', i18nLocale)}${pendingDeleteItem?.title || ''}`}
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteKnowledgeMutation.isPending}>{m.kb_upload_cancel()}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={(event) => {
                event.preventDefault()
                void handleConfirmDeleteKnowledge()
              }}
              disabled={deleteKnowledgeMutation.isPending}
            >
              {deleteKnowledgeMutation.isPending ? t('knowledge.deleting', i18nLocale) : t('knowledge.deleteConfirmAction', i18nLocale)}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {previewImageAttachment ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(2,6,23,0.78)] p-6 backdrop-blur-[2px]"
          onClick={() => setPreviewImageAttachmentId(null)}
        >
          <section
            className="w-full max-w-[960px] overflow-hidden rounded-[12px] border border-[var(--dashboard-panel-border)] bg-[var(--dashboard-text)] shadow-[0px_20px_60px_0px_rgba(2,6,23,0.55)]"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex items-center justify-between border-b border-white/15 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-white/90">
                  {previewImageAttachment.file_name}
                </p>
                <p className="mt-0.5 text-[11px] text-white/55">
                  {previewImageAttachment.mime_type || previewImageAttachment.type || t('knowledge.imageAttachments', i18nLocale)}
                </p>
              </div>
              <button
                type="button"
                className="rounded-[8px] p-1.5 text-white/70 hover:bg-white/10"
                onClick={() => setPreviewImageAttachmentId(null)}
                aria-label={t('knowledge.closeImagePreview', i18nLocale)}
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex max-h-[78vh] items-center justify-center bg-[#020617] p-4">
              <img
                src={getAttachmentImageSrc(previewImageAttachment)}
                alt={previewImageAttachment.file_name}
                className="max-h-[72vh] max-w-full rounded-[8px] object-contain"
              />
            </div>
          </section>
        </div>
      ) : null}
    </DashboardPageLayout>
  )
}

export default KnowledgeBasePage

function KnowledgeCardSkeleton() {
  return (
    <article className="dashboard-kb-skeleton-card mb-2">
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-5 w-[380px]" />
        <div className="flex items-center gap-6">
          <Skeleton className="h-6 w-[72px] rounded-[20px]" />
          <Skeleton className="h-5 w-[130px]" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
      </div>
      <Skeleton className="mt-3 h-5 w-[760px]" />
    </article>
  )
}

function DocumentRowSkeleton() {
  return (
    <div className="dashboard-kb-doc-row-skeleton">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded-sm" />
        <Skeleton className="h-4 w-[220px]" />
      </div>
      <Skeleton className="h-4 w-10" />
      <Skeleton className="h-4 w-20" />
      <div className="flex justify-end">
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  )
}

function EditKnowledgeModal(props: {
  isOpen: boolean
  title: string
  content: string
  errorMessage: string | null
  isSubmitting: boolean
  onClose: () => void
  onTitleChange: (value: string) => void
  onContentChange: (value: string) => void
  onSubmit: () => Promise<void> | void
}) {
  const {
    isOpen,
    title,
    content,
    errorMessage,
    isSubmitting,
    onClose,
    onTitleChange,
    onContentChange,
    onSubmit,
  } = props

  if (!isOpen) {
    return null
  }

  const isSaveDisabled = isSubmitting || title.trim().length === 0 || content.trim().length === 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(64,64,64,0.4)]"
      onClick={onClose}
      data-node-id="971:5640"
    >
      {/*
       * Figma 971:5640 还原：
       * - 固定画板 600x489
       * - 绝对定位标题、表单区与底部操作区
       */}
      <section
        className="relative h-[30.5625rem] w-[37.5rem] overflow-hidden rounded-[0.5rem] border border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-bg)]"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 className="absolute left-[2rem] top-[1.375rem] text-[1.25rem] font-semibold leading-none tracking-[-0.0125rem] text-[var(--dashboard-text)]">
          {m.kb_edit_title()}
        </h3>
        <button
          type="button"
          className="absolute right-[1.375rem] top-[1.625rem] rounded-[0.375rem] p-[0.125rem] text-[var(--dashboard-text-muted)] hover:bg-[var(--dashboard-row-hover-bg)]"
          onClick={onClose}
          aria-label={m.kb_edit_close()}
        >
          <X className="h-[1.25rem] w-[1.25rem]" />
        </button>

        <p className="absolute left-[2rem] top-[5.125rem] text-[0.875rem] font-semibold leading-none text-[var(--dashboard-text)]">
          {m.kb_edit_label_title()}
        </p>
        <Textarea
          className="absolute left-[2rem] top-[6.5rem] h-[4rem] w-[33.5rem] resize-none rounded-[0.25rem] border border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-bg)] px-[1rem] py-[0.75rem] text-[0.875rem] font-medium leading-[1.6] tracking-[-0.00875rem] text-[var(--dashboard-text)] placeholder:text-[var(--dashboard-text-muted)] focus-visible:ring-[0.0625rem]"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
        />

        <p className="absolute left-[2rem] top-[12.5625rem] text-[0.875rem] font-semibold leading-none text-[var(--dashboard-text)]">
          {m.kb_edit_label_content()}
        </p>
        <Textarea
          className="absolute left-[2rem] top-[13.9375rem] h-[10.375rem] w-[33.5rem] resize-none rounded-[0.25rem] border border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-bg)] px-[1rem] py-[0.75rem] text-[0.875rem] font-medium leading-[1.6] tracking-[-0.00875rem] text-[var(--dashboard-text)] placeholder:text-[var(--dashboard-text-muted)] focus-visible:ring-[0.0625rem]"
          value={content}
          onChange={(event) => onContentChange(event.target.value)}
        />

        {errorMessage ? (
          <p className="absolute left-[2rem] top-[24.6875rem] w-[33.5rem] rounded-[0.25rem] border border-red-200 bg-red-50 px-[0.75rem] py-[0.5rem] text-[0.8125rem] text-red-700">
            {errorMessage}
          </p>
        ) : null}

        <div className="absolute left-[2rem] top-[26.6875rem] flex w-[33.5rem] items-center gap-[1rem]">
          <button
            type="button"
            className="h-[2.25rem] w-[16.25rem] rounded-[0.25rem] bg-[var(--dashboard-panel-muted-bg)] text-[0.875rem] font-semibold leading-none text-[var(--dashboard-text-muted)] hover:bg-[var(--dashboard-sidebar-item-hover)]"
            onClick={onClose}
            disabled={isSubmitting}
          >
            {m.kb_upload_cancel()}
          </button>
          <button
            type="button"
            className={`h-[2.25rem] w-[16.25rem] rounded-[0.25rem] text-[0.875rem] font-semibold leading-none text-white ${
              isSaveDisabled
                ? 'bg-[var(--dashboard-sidebar-company-active-bg)] text-[var(--dashboard-sidebar-active-bg)]'
                : 'bg-[var(--dashboard-sidebar-active-bg)] hover:opacity-90'
            }`}
            onClick={onSubmit}
            disabled={isSaveDisabled}
          >
            {isSubmitting ? m.kb_edit_saving() : m.kb_edit_save()}
          </button>
        </div>
      </section>
    </div>
  )
}

function UploadKnowledgeModal(props: {
  isOpen: boolean
  locale: Locale
  mode: UploadKnowledgeMode
  documentUploadStage: UploadDocumentStage
  documentProgress: DocumentPipelineProgressResponse | null
  manualText: string
  crawlSourceUrl: string
  crawlMaxDepth: number
  crawlMaxPages: number
  selectedUploadFiles: File[]
  errorMessage: string | null
  isSubmitting: boolean
  onClose: () => void
  onModeChange: (mode: UploadKnowledgeMode) => void
  onManualTextChange: (value: string) => void
  onCrawlSourceUrlChange: (value: string) => void
  onCrawlMaxDepthChange: (value: number) => void
  onCrawlMaxPagesChange: (value: number) => void
  onUploadFileChange: (files: File[]) => void
  onSubmit: () => Promise<void> | void
}) {
  const {
    isOpen,
    locale,
    mode,
    documentUploadStage,
    documentProgress,
    manualText,
    crawlSourceUrl,
    crawlMaxDepth,
    crawlMaxPages,
    selectedUploadFiles,
    errorMessage,
    isSubmitting,
    onClose,
    onModeChange,
    onManualTextChange,
    onCrawlSourceUrlChange,
    onCrawlMaxDepthChange,
    onCrawlMaxPagesChange,
    onUploadFileChange,
    onSubmit,
  } = props

  if (!isOpen) {
    return null
  }

  const documentFileInputRef = useRef<HTMLInputElement | null>(null)
  const isManualMode = mode === 'manual'
  const isCrawlMode = mode === 'crawl-url'
  const isDocumentFlowActive =
    mode === 'upload-doc' && (documentUploadStage === 'uploading' || documentUploadStage === 'processing')
  const progressPercent = documentProgress ? getDocumentProgressPercentage(documentProgress) : 0
  const isUploadButtonDisabled =
    isSubmitting ||
    (isManualMode
      ? manualText.trim().length === 0
      : isCrawlMode
        ? crawlSourceUrl.trim().length === 0
        : selectedUploadFiles.length === 0)
  const modalLocale: Locale = locale

  /**
   * 统一处理文件选择：
   * - 新文件追加而不是覆盖；
   * - 基于 name+size+lastModified 去重；
   * - 空选择（取消）不清空已有文件。
   */
  const handleSelectFiles = (files: FileList | null): void => {
    if (!files || files.length === 0) {
      return
    }

    const nextFiles = Array.from(files)
    const fileIdentitySet = new Set<string>()
    const mergedFiles: File[] = []

    const pushIfNotDuplicated = (file: File): void => {
      const identityKey = `${file.name}__${file.size}__${file.lastModified}`
      if (fileIdentitySet.has(identityKey)) {
        return
      }
      fileIdentitySet.add(identityKey)
      mergedFiles.push(file)
    }

    selectedUploadFiles.forEach(pushIfNotDuplicated)
    nextFiles.forEach(pushIfNotDuplicated)
    onUploadFileChange(mergedFiles)
  }

  /**
   * 从列表中移除已选文件，索引删除可避免同名文件误删。
   */
  const handleRemoveSelectedFile = (fileIndex: number): void => {
    onUploadFileChange(selectedUploadFiles.filter((_, index) => index !== fileIndex))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(64,64,64,0.4)]"
      onClick={onClose}
      data-node-id="948:4355"
    >
      <section
        className="w-[37.5rem] max-h-[calc(100dvh-3rem)] max-w-[calc(100vw-1.5rem)] overflow-y-auto rounded-[0.5rem] border border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-bg)] px-8 pb-6 pt-6"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between">
          <h3 className="text-[1.25rem] font-semibold leading-none tracking-[-0.0125rem] text-[var(--dashboard-text)]">
            {t('knowledge.uploadDialogTitle', modalLocale)}
          </h3>
          <button
            type="button"
            className="rounded-[0.375rem] p-[0.125rem] text-[var(--dashboard-text-muted)] hover:bg-[var(--dashboard-row-hover-bg)]"
            onClick={onClose}
          >
            <X className="h-[1.25rem] w-[1.25rem]" />
          </button>
        </header>

        {!isDocumentFlowActive ? (
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              className={`flex h-[2.75rem] flex-1 items-center justify-center gap-[0.625rem] rounded-[0.5rem] border text-[0.875rem] font-medium leading-[1.6] tracking-[-0.00875rem] ${
                mode === 'upload-doc'
                  ? 'border-[var(--dashboard-sidebar-active-bg)] bg-[var(--dashboard-panel-bg)] text-[var(--dashboard-sidebar-active-bg)]'
                  : 'border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-bg)] text-[var(--dashboard-text)]'
              }`}
              onClick={() => onModeChange('upload-doc')}
            >
              <FileText className="h-[1.25rem] w-[1.25rem]" />
              {t('knowledge.uploadDocTab', modalLocale)}
            </button>
            <button
              type="button"
              className={`flex h-[2.75rem] flex-1 items-center justify-center gap-[0.625rem] rounded-[0.5rem] border text-[0.875rem] font-medium leading-[1.6] tracking-[-0.00875rem] ${
                mode === 'crawl-url'
                  ? 'border-[var(--dashboard-sidebar-active-bg)] bg-[var(--dashboard-panel-bg)] text-[var(--dashboard-sidebar-active-bg)]'
                  : 'border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-bg)] text-[var(--dashboard-text)]'
              }`}
              onClick={() => onModeChange('crawl-url')}
            >
              <Search className="h-[1.25rem] w-[1.25rem]" />
              {t('knowledge.uploadCrawlTab', modalLocale)}
            </button>
            <button
              type="button"
              className={`flex h-[2.75rem] flex-1 items-center justify-center gap-[0.625rem] rounded-[0.5rem] border text-[0.875rem] font-medium leading-[1.6] tracking-[-0.00875rem] ${
                mode === 'manual'
                  ? 'border-[var(--dashboard-sidebar-active-bg)] bg-[var(--dashboard-panel-bg)] text-[var(--dashboard-sidebar-active-bg)]'
                  : 'border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-bg)] text-[var(--dashboard-text)]'
              }`}
              onClick={() => onModeChange('manual')}
            >
              <PencilLine className="h-[1.25rem] w-[1.25rem]" />
              {t('knowledge.uploadManualTab', modalLocale)}
            </button>
          </div>
        ) : null}

        {!isDocumentFlowActive && isManualMode ? (
          <Textarea
            className="mt-5 h-[14rem] w-full resize-none rounded-[0.5rem] border border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-bg)] px-[0.625rem] py-[0.625rem] text-[0.875rem] font-medium leading-[1.6] tracking-[-0.00875rem] text-[var(--dashboard-text)] placeholder:text-[var(--dashboard-text-muted)] focus-visible:ring-[0.0625rem]"
            placeholder={m.kb_upload_manual_placeholder()}
            value={manualText}
            onChange={(event) => onManualTextChange(event.target.value)}
          />
        ) : null}

        {!isDocumentFlowActive && isCrawlMode ? (
          <div className="mt-5 rounded-[0.5rem] border border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-bg)] p-4">
            <label className="text-[0.75rem] font-medium uppercase tracking-[0.04em] text-[var(--dashboard-text-muted)]">
              {t('knowledge.uploadCrawlUrlLabel', modalLocale)}
            </label>
            <input
              type="url"
              className="mt-2 h-10 w-full rounded-[0.5rem] border border-[var(--dashboard-panel-border)] px-3 text-[0.875rem] text-[var(--dashboard-text)] outline-none transition-colors focus:border-[var(--dashboard-sidebar-active-bg)]"
              placeholder={t('knowledge.uploadCrawlUrlPlaceholder', modalLocale)}
              value={crawlSourceUrl}
              onChange={(event) => onCrawlSourceUrlChange(event.target.value)}
            />
            <div className="mt-3 grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1">
                <span className="text-[0.75rem] font-medium text-[var(--dashboard-text-muted)]">
                  {t('knowledge.uploadCrawlMaxDepthLabel', modalLocale)}
                </span>
                <input
                  type="number"
                  min={0}
                  max={5}
                  className="h-11 rounded-[0.75rem] border border-[var(--dashboard-panel-border)] px-3 text-[0.875rem] text-[var(--dashboard-text)] outline-none transition-colors focus:border-[var(--dashboard-sidebar-active-bg)]"
                  value={crawlMaxDepth}
                  onChange={(event) => {
                    const parsedValue = Number(event.target.value)
                    if (!Number.isFinite(parsedValue)) {
                      return
                    }
                    onCrawlMaxDepthChange(Math.min(5, Math.max(0, Math.floor(parsedValue))))
                  }}
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-[0.75rem] font-medium text-[var(--dashboard-text-muted)]">
                  {t('knowledge.uploadCrawlMaxPagesLabel', modalLocale)}
                </span>
                <input
                  type="number"
                  min={1}
                  max={100}
                  className="h-11 rounded-[0.75rem] border border-[var(--dashboard-panel-border)] px-3 text-[0.875rem] text-[var(--dashboard-text)] outline-none transition-colors focus:border-[var(--dashboard-sidebar-active-bg)]"
                  value={crawlMaxPages}
                  onChange={(event) => {
                    const parsedValue = Number(event.target.value)
                    if (!Number.isFinite(parsedValue)) {
                      return
                    }
                    onCrawlMaxPagesChange(Math.min(100, Math.max(1, Math.floor(parsedValue))))
                  }}
                />
              </label>
            </div>
            <p className="mt-3 text-[0.75rem] leading-[1.4] text-[var(--dashboard-text-muted)]">
              {t('knowledge.uploadCrawlHint', modalLocale)}
            </p>
          </div>
        ) : null}

        {!isDocumentFlowActive && !isManualMode && !isCrawlMode ? (
          <>
            <div
              className="mt-5 flex h-[10.0625rem] w-full cursor-pointer flex-col items-center justify-center rounded-[0.5rem] border border-dashed border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-bg)]"
              onClick={() => documentFileInputRef.current?.click()}
              onDragOver={(event) => {
                event.preventDefault()
              }}
              onDrop={(event) => {
                event.preventDefault()
                handleSelectFiles(event.dataTransfer.files || null)
              }}
            >
              <input
                ref={documentFileInputRef}
                type="file"
                className="hidden"
                multiple
                accept=".pdf,.doc,.docx,.txt,.md,.markdown,text/plain,text/markdown"
                onChange={(event) => {
                  handleSelectFiles(event.target.files || null)
                  /**
                   * 清空 input value，允许再次选择同名文件时触发 change。
                   */
                  event.currentTarget.value = ''
                }}
              />
              <div className="text-[var(--dashboard-sidebar-active-bg)]">
                <CloudUpload className="h-[2.5rem] w-[2.5rem] stroke-[1.5]" />
              </div>
              <p className="mt-2 text-[0.875rem] font-semibold leading-none text-[var(--dashboard-sidebar-active-bg)]">
                {t('knowledge.uploadDocClick', modalLocale)}
              </p>
              <p className="mt-2 text-[0.875rem] font-medium leading-[1.6] tracking-[-0.00875rem] text-[var(--dashboard-text-muted)]">
                {t('knowledge.uploadDocDragHint', modalLocale)}
              </p>
              <p className="mt-2 text-[0.875rem] font-medium leading-none text-[var(--dashboard-text-muted)]">
                {t('knowledge.uploadDocFormatHint', modalLocale)}
              </p>
            </div>

            {selectedUploadFiles.length > 0 ? (
              <div className="mt-5">
                <p className="text-[1.125rem] font-semibold leading-[1.2] text-[var(--dashboard-text)]">
                  {`${t('knowledge.uploadSelectedFilesTitle', modalLocale)} (${selectedUploadFiles.length})`}
                </p>
                <div className="mt-3 flex max-h-[12rem] flex-col gap-2 overflow-y-auto pr-1">
                  {selectedUploadFiles.map((file, fileIndex) => (
                    <div
                      key={`${file.name}-${file.size}-${file.lastModified}`}
                      className="flex h-[3.25rem] min-h-[3.25rem] shrink-0 items-center justify-between rounded-[0.5rem] bg-[var(--dashboard-panel-muted-bg)] px-3"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <KnowledgeFileTypeIcon fileName={file.name} />
                        <p className="truncate whitespace-nowrap text-[1rem] font-medium leading-none text-[var(--dashboard-text)]">
                          {file.name}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="shrink-0 rounded-[0.375rem] p-1 text-[var(--dashboard-text-muted)] transition-colors hover:bg-[var(--dashboard-panel-bg)] hover:text-[var(--dashboard-text)]"
                        onClick={(event) => {
                          event.stopPropagation()
                          handleRemoveSelectedFile(fileIndex)
                        }}
                        aria-label={t('common.delete', modalLocale)}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </>
        ) : null}

        {isDocumentFlowActive ? (
          <div className="mt-5 flex h-[14rem] w-full flex-col items-center justify-center rounded-[0.5rem] border border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-muted-bg)] px-6">
            <p className="text-[0.9375rem] font-semibold text-[var(--dashboard-text)]">{t('knowledge.uploading', modalLocale)}</p>
            <p className="mt-2 text-[0.8125rem] text-[var(--dashboard-text-muted)]">
              {selectedUploadFiles.length > 0
                ? `${t('knowledge.uploadSelectedPrefix', modalLocale)}${selectedUploadFiles[0].name}`
                : t('knowledge.uploadDocTab', modalLocale)}
            </p>
            <div className="mt-5 w-full">
              <div className="flex items-center justify-between text-[0.75rem] font-medium leading-none text-[var(--dashboard-text-muted)]">
                <p>
                  {documentProgress
                    ? `${t('knowledge.uploadProgressPrefix', modalLocale)}${getKnowledgeProgressStatusLabel(documentProgress.document_status)}`
                    : `${t('knowledge.uploadProgressPrefix', modalLocale)}${m.knowledge_upload_status_uploading()}`}
                </p>
                <p>{documentProgress ? `${progressPercent}%` : '--'}</p>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--dashboard-panel-border)]">
                <div
                  className="h-full rounded-full bg-[var(--dashboard-sidebar-active-bg)] transition-all duration-300"
                  style={{ width: `${documentProgress ? progressPercent : 15}%` }}
                />
              </div>
            </div>
          </div>
        ) : null}

        {errorMessage ? (
          <p className="mt-4 w-full rounded-[0.25rem] border border-red-200 bg-red-50 px-[0.75rem] py-[0.5rem] text-[0.8125rem] text-red-700">
            {errorMessage}
          </p>
        ) : null}

        <div className="mt-6 flex w-full items-center gap-4">
          <button
            type="button"
            className="h-[2.25rem] flex-1 rounded-[0.5rem] bg-[var(--dashboard-panel-muted-bg)] text-[0.875rem] font-semibold leading-none text-[var(--dashboard-text-muted)] hover:bg-[var(--dashboard-sidebar-item-hover)]"
            onClick={onClose}
            disabled={isSubmitting}
          >
            {t('common.cancel', modalLocale)}
          </button>
          <button
            type="button"
            className={`h-[2.25rem] flex-1 rounded-[0.5rem] text-[0.875rem] font-semibold leading-none text-white ${
              isUploadButtonDisabled
                ? 'bg-[var(--dashboard-sidebar-company-active-bg)] text-[var(--dashboard-sidebar-active-bg)]'
                : 'bg-[var(--dashboard-sidebar-active-bg)] hover:opacity-90'
            }`}
            onClick={onSubmit}
            disabled={isUploadButtonDisabled}
          >
            {isSubmitting ? t('knowledge.uploading', modalLocale) : t('knowledge.uploadSubmit', modalLocale)}
          </button>
        </div>
      </section>
    </div>
  )
}

function DocumentResultPanel(props: {
  isOpen: boolean
  documentId: string | null
  errorMessage: string | null
  generatedItems: DocumentKnowledgeItem[]
  updatedItems: DocumentKnowledgeItem[]
  onClose: () => void
  onConfirm: () => void
}) {
  const {
    isOpen,
    documentId,
    errorMessage,
    generatedItems,
    updatedItems,
    onClose,
    onConfirm,
  } = props

  if (!isOpen) {
    return null
  }

  // 保留 documentId 参数用于后续埋点/扩展，当前实现仅作为结果上下文占位。
  void documentId

  const leftRows = generatedItems
  const rightRows = updatedItems

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(64,64,64,0.35)]" onClick={onClose}>
      <section
        className="relative h-[42rem] w-[62.5rem] overflow-hidden rounded-[8px] border border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-bg)]"
        onClick={(event) => event.stopPropagation()}
        data-node-id="1044:5106"
      >
        <header className="absolute left-0 top-0 h-[56px] w-full border-b border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-bg)] px-8">
          <h3 className="pt-6 text-[20px] font-semibold leading-none tracking-[-0.2px] text-[var(--dashboard-text)]">
            {m.kb_upload()}
          </h3>
          <button
            type="button"
            className="absolute right-6 top-6 rounded-[6px] p-1 text-[var(--dashboard-text-muted)] hover:bg-[var(--dashboard-row-hover-bg)]"
            onClick={onClose}
            aria-label={m.knowledge_close_result_panel()}
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="absolute left-8 top-[68px] grid h-[500px] w-[936px] grid-cols-2 gap-4">
          <section className="h-full rounded-[4px] bg-[var(--dashboard-panel-muted-bg)] p-2">
            <p className="mb-3 px-2 text-[14px] font-semibold text-[var(--dashboard-text-muted)]">{m.kb_result_generated_count({ count: String(generatedItems.length) })}</p>
            <div className="h-[440px] space-y-2 overflow-y-auto pr-1">
              {leftRows.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[4px] border border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-bg)] px-4 py-4 shadow-[0px_1px_4px_0px_rgba(30,41,59,0.08)]"
                >
                  <p className="text-[14px] font-medium leading-[1.6] tracking-[-0.14px] text-[var(--dashboard-text)]">
                    {item.key || m.kb_unknown_title()}
                  </p>
                  <p className="mt-2 whitespace-pre-wrap break-words text-[14px] font-medium leading-[1.6] tracking-[-0.14px] text-[var(--dashboard-text-muted)]">
                    {item.answer || '-'}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="h-full rounded-[4px] bg-[var(--dashboard-panel-muted-bg)] p-2">
            <p className="mb-3 px-2 text-[14px] font-semibold text-[var(--dashboard-text-muted)]">{m.kb_result_updated_count({ count: String(updatedItems.length) })}</p>
            <div className="h-[440px] space-y-2 overflow-y-auto pr-1">
              {rightRows.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[4px] border border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-bg)] px-4 py-4 shadow-[0px_1px_4px_0px_rgba(30,41,59,0.08)]"
                >
                  <p className="text-[14px] font-medium leading-[1.6] tracking-[-0.14px] text-[var(--dashboard-text)]">
                    {item.key || m.kb_unknown_title()}
                  </p>
                  <p className="mt-2 whitespace-pre-wrap break-words text-[14px] font-medium leading-[1.6] tracking-[-0.14px] text-[var(--dashboard-text-muted)]">
                    {item.answer || '-'}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>

        {errorMessage ? (
          <div className="absolute bottom-[72px] left-8 w-[936px] rounded-[4px] border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
            {errorMessage}
          </div>
        ) : null}

        <footer className="absolute bottom-0 left-0 h-[68px] w-full border-t border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-bg)]">
          <div className="mx-auto flex h-full w-[354px] items-center">
            <button
              type="button"
              className="h-11 w-full rounded-[12px] bg-[var(--dashboard-sidebar-active-bg)] text-[14px] font-semibold text-[var(--dashboard-sidebar-active-fg)] hover:opacity-90"
              onClick={onConfirm}
            >
              {m.kb_result_confirm()}
            </button>
          </div>
        </footer>
      </section>
    </div>
  )
}
