import { useRouterState } from '@tanstack/react-router'
import { ChevronDown, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { KnowledgeFileTypeIcon } from '@/components/dashboard/KnowledgeFileTypeIcon'
import {
  getDocumentPipelineProgress,
  getWebCrawlJobStatus,
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
  getDocumentProgressPercentage,
  getWebCrawlProgressPercentage,
  isUploadTaskTerminalStatus,
  isWebCrawlTaskDocumentId,
  loadPersistedUploadTasks,
  normalizeDocumentStatus,
  parseWebCrawlJobIdFromTaskDocumentId,
  persistUploadTasks,
  sleep,
  toWebCrawlTaskDocumentId,
} from '@/lib/knowledge-upload-task'
import { m } from '@/paraglide/messages'
import { getLocale } from '@/paraglide/runtime'
import { useViewportProfile } from '@/lib/use-viewport-profile'

type Locale = 'zh' | 'en'

function getUploadTaskStatusLabel(status: string, locale: Locale): string {
  const normalizedStatus = normalizeDocumentStatus(status)

  if (DOCUMENT_SUCCESS_STATUSES.has(normalizedStatus)) {
    return locale === 'zh'
      ? m.knowledge_upload_status_completed()
      : m.knowledge_upload_status_completed()
  }
  if (DOCUMENT_FAILED_STATUSES.has(normalizedStatus)) {
    return locale === 'zh'
      ? m.knowledge_upload_status_failed()
      : m.knowledge_upload_status_failed()
  }
  if (normalizedStatus === 'uploading' || normalizedStatus === 'uploaded') {
    return locale === 'zh'
      ? m.knowledge_upload_status_uploading()
      : m.knowledge_upload_status_uploading()
  }

  return locale === 'zh'
    ? m.knowledge_upload_status_processing()
    : m.knowledge_upload_status_processing()
}

export function GlobalKnowledgeUploadWidget() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const viewportProfile = useViewportProfile()
  const i18nLocale: Locale = getLocale() === 'zh' ? 'zh' : 'en'
  const [tasks, setTasks] = useState<PersistedUploadTask[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const hasHydratedRef = useRef(false)
  const pollingDocumentIdSetRef = useRef<Set<string>>(new Set())

  const syncTasksFromStorage = useCallback((): void => {
    setTasks(loadPersistedUploadTasks())
  }, [])

  /**
   * 手动清空所有任务：
   * - 清空内存态与 localStorage；
   * - 广播 cleared 事件，通知知识库页面同步清空内存态。
   */
  const clearAllTasks = useCallback((): void => {
    setTasks([])
    setIsOpen(false)
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.removeItem(KNOWLEDGE_UPLOAD_TASKS_STORAGE_KEY)
    window.dispatchEvent(new Event(KNOWLEDGE_UPLOAD_TASKS_UPDATED_EVENT))
    window.dispatchEvent(new Event(KNOWLEDGE_UPLOAD_TASKS_CLEARED_EVENT))
  }, [])

  /**
   * 打开上传结果：
   * - 如果当前就在知识库页，直接发事件让页面打开结果弹窗；
   * - 如果不在知识库页，跳转并带上 query 参数。
   */
  const handleViewResult = useCallback(
    (documentId: string): void => {
      const normalizedDocumentId = documentId.trim()
      if (
        !normalizedDocumentId ||
        isWebCrawlTaskDocumentId(normalizedDocumentId) ||
        typeof window === 'undefined'
      ) {
        return
      }

      if (pathname.startsWith('/dashboard/knowledge-base')) {
        window.dispatchEvent(
          new CustomEvent<{ documentId: string }>(
            KNOWLEDGE_OPEN_DOCUMENT_RESULT_EVENT,
            {
              detail: { documentId: normalizedDocumentId },
            },
          ),
        )
        setIsOpen(false)
        return
      }

      const url = new URL('/dashboard/knowledge-base', window.location.origin)
      url.searchParams.set(KNOWLEDGE_RESULT_QUERY_PARAM, normalizedDocumentId)
      window.location.href = url.toString()
    },
    [pathname],
  )

  const patchTaskByDocumentId = useCallback(
    (documentId: string, patch: Partial<PersistedUploadTask>): void => {
      setTasks((previousValue) =>
        previousValue.map((item) => {
          if (item.documentId !== documentId) {
            return item
          }

          /**
           * 进度条保持单调递增，避免后端阶段切换导致前端显示回退。
           */
          const mergedProgress =
            typeof patch.progress === 'number'
              ? Math.max(item.progress, Math.min(100, Math.max(0, patch.progress)))
              : item.progress

          return { ...item, ...patch, progress: mergedProgress }
        }),
      )
    },
    [],
  )

  useEffect(() => {
    syncTasksFromStorage()
    hasHydratedRef.current = true

    if (typeof window === 'undefined') {
      return
    }

    const handleStorage = (event: StorageEvent): void => {
      if (event.key && event.key !== KNOWLEDGE_UPLOAD_TASKS_STORAGE_KEY) {
        return
      }
      syncTasksFromStorage()
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener(KNOWLEDGE_UPLOAD_TASKS_UPDATED_EVENT, syncTasksFromStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener(
        KNOWLEDGE_UPLOAD_TASKS_UPDATED_EVENT,
        syncTasksFromStorage,
      )
    }
  }, [syncTasksFromStorage])

  useEffect(() => {
    if (!hasHydratedRef.current) {
      return
    }

    persistUploadTasks(tasks)
  }, [tasks])

  const monitorTaskByDocumentId = useCallback(
    async (documentId: string): Promise<void> => {
      if (pollingDocumentIdSetRef.current.has(documentId)) {
        return
      }

      pollingDocumentIdSetRef.current.add(documentId)
      try {
        for (
          let attempt = 0;
          attempt < DOCUMENT_STATUS_MAX_ATTEMPTS;
          attempt += 1
        ) {
          const pipelineProgress =
            await getDocumentPipelineProgress(documentId)
          const normalizedStatus = normalizeDocumentStatus(
            pipelineProgress.document_status,
          )

          patchTaskByDocumentId(documentId, {
            status: DOCUMENT_FAILED_STATUSES.has(normalizedStatus)
              ? 'failed'
              : DOCUMENT_SUCCESS_STATUSES.has(normalizedStatus)
                ? 'completed'
                : 'processing',
            progress: getDocumentProgressPercentage(pipelineProgress),
            statusText: normalizedStatus || 'processing',
            errorMessage: pipelineProgress.error_message || null,
          })

          if (
            DOCUMENT_SUCCESS_STATUSES.has(normalizedStatus) ||
            DOCUMENT_FAILED_STATUSES.has(normalizedStatus)
          ) {
            return
          }

          await sleep(DOCUMENT_STATUS_POLL_INTERVAL_MS)
        }

        patchTaskByDocumentId(documentId, {
          status: 'failed',
          statusText: 'failed',
          errorMessage: m.knowledge_doc_processing_timeout(),
        })
      } catch (error) {
        patchTaskByDocumentId(documentId, {
          status: 'failed',
          statusText: 'failed',
          errorMessage:
            error instanceof Error
              ? error.message
              : m.common_error(),
        })
      } finally {
        pollingDocumentIdSetRef.current.delete(documentId)
      }
    },
    [i18nLocale, patchTaskByDocumentId],
  )

  const monitorWebCrawlTaskByJobId = useCallback(
    async (jobId: string): Promise<void> => {
      const pollingKey = toWebCrawlTaskDocumentId(jobId)
      if (pollingDocumentIdSetRef.current.has(pollingKey)) {
        return
      }

      pollingDocumentIdSetRef.current.add(pollingKey)
      try {
        for (
          let attempt = 0;
          attempt < DOCUMENT_STATUS_MAX_ATTEMPTS;
          attempt += 1
        ) {
          const jobProgress = await getWebCrawlJobStatus(jobId)
          const normalizedStatus = normalizeDocumentStatus(jobProgress.status)

          patchTaskByDocumentId(pollingKey, {
            status: DOCUMENT_FAILED_STATUSES.has(normalizedStatus)
              ? 'failed'
              : DOCUMENT_SUCCESS_STATUSES.has(normalizedStatus)
                ? 'completed'
                : 'processing',
            progress: getWebCrawlProgressPercentage(jobProgress),
            statusText: normalizedStatus || 'processing',
            errorMessage: jobProgress.error_message || null,
          })

          if (
            DOCUMENT_SUCCESS_STATUSES.has(normalizedStatus) ||
            DOCUMENT_FAILED_STATUSES.has(normalizedStatus)
          ) {
            return
          }

          await sleep(DOCUMENT_STATUS_POLL_INTERVAL_MS)
        }

        patchTaskByDocumentId(pollingKey, {
          status: 'failed',
          statusText: 'failed',
          errorMessage: m.knowledge_doc_processing_timeout(),
        })
      } catch (error) {
        patchTaskByDocumentId(pollingKey, {
          status: 'failed',
          statusText: 'failed',
          errorMessage:
            error instanceof Error
              ? error.message
              : m.common_error(),
        })
      } finally {
        pollingDocumentIdSetRef.current.delete(pollingKey)
      }
    },
    [i18nLocale, patchTaskByDocumentId],
  )

  useEffect(() => {
    if (pathname.startsWith('/dashboard/knowledge-base')) {
      return
    }

    tasks.forEach((task) => {
      if (!task.documentId || isUploadTaskTerminalStatus(task.status)) {
        return
      }

      const crawlJobId = parseWebCrawlJobIdFromTaskDocumentId(
        task.documentId,
      )
      if (crawlJobId) {
        void monitorWebCrawlTaskByJobId(crawlJobId)
        return
      }

      void monitorTaskByDocumentId(task.documentId)
    })
  }, [monitorTaskByDocumentId, monitorWebCrawlTaskByJobId, pathname, tasks])

  /**
   * 展示策略：
   * - 优先显示进行中任务；
   * - 无进行中任务时显示最近完成任务；
   * - 失败任务不作为顶部主卡候选，避免挡住可继续操作的信息。
   */
  const activeTasks = useMemo(
    () =>
      tasks
        .filter((task) => !isUploadTaskTerminalStatus(task.status))
        .sort((a, b) => b.createdAt - a.createdAt),
    [tasks],
  )
  const completedTasks = useMemo(
    () =>
      tasks
        .filter((task) => task.status === 'completed')
        .sort((a, b) => b.createdAt - a.createdAt),
    [tasks],
  )

  const visibleTasks = activeTasks.length > 0 ? activeTasks : completedTasks
  const latestTask = visibleTasks[0] || null
  const activeTaskCount = activeTasks.length

  if (!latestTask || visibleTasks.length === 0) {
    return null
  }

  const containerClassName = viewportProfile.isPhone
    ? 'fixed inset-x-4 bottom-[calc(var(--app-bottom-nav-height)+0.5rem)] z-[70] flex max-w-none flex-col-reverse gap-2'
    : viewportProfile.isTablet
      ? 'fixed bottom-5 right-5 z-[70] flex w-fit max-w-[420px] flex-col gap-2'
      : 'fixed bottom-5 right-5 z-[70] flex w-fit max-w-[calc(100vw-24px)] flex-col gap-2'
  const triggerClassName = viewportProfile.isPhone
    ? 'flex h-[72px] w-full items-center gap-3 rounded-[28px] border border-[#D1D5DB] bg-white px-4 text-left shadow-[0px_8px_24px_0px_rgba(15,23,42,0.18)]'
    : viewportProfile.isTablet
      ? 'flex h-[84px] min-w-[280px] max-w-[420px] items-center gap-3 rounded-[40px] border border-[#D1D5DB] bg-white px-4 text-left shadow-[0px_8px_24px_0px_rgba(15,23,42,0.18)]'
      : 'flex h-[88px] min-w-[312px] max-w-[520px] items-center gap-3 rounded-[44px] border border-[#D1D5DB] bg-white px-4 text-left shadow-[0px_8px_24px_0px_rgba(15,23,42,0.18)]'
  const expandedPanelClassName = viewportProfile.isPhone
    ? 'max-h-[46dvh] w-full overflow-y-auto rounded-[24px] border border-[#D1D5DB] bg-white p-3 shadow-[0px_8px_24px_0px_rgba(15,23,42,0.12)]'
    : viewportProfile.isTablet
      ? 'max-h-[360px] min-w-[280px] max-w-[420px] overflow-y-auto rounded-[14px] border border-[#D1D5DB] bg-white p-3 shadow-[0px_8px_24px_0px_rgba(15,23,42,0.12)]'
      : 'max-h-[360px] min-w-[312px] max-w-[520px] overflow-y-auto rounded-[14px] border border-[#D1D5DB] bg-white p-3 shadow-[0px_8px_24px_0px_rgba(15,23,42,0.12)]'

  return (
    <div className={containerClassName}>
      <button
        type="button"
        className={triggerClassName}
        onClick={() => {
          setIsOpen((previousValue) => !previousValue)
        }}
      >
        <div className="relative h-14 w-14 shrink-0">
          <svg className="h-14 w-14 -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="2.8"
            />
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke={latestTask.status === 'failed' ? '#DC2626' : '#6466F1'}
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeDasharray={`${
                (Math.max(0, Math.min(100, latestTask.progress)) / 100) * 97.4
              } 97.4`}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-[#1E293B]">
            {`${Math.round(latestTask.progress)}%`}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[16px] font-semibold leading-[1.2] text-[#1E293B]">
            {latestTask.fileName}
          </p>
          <p
            className={`mt-1 line-clamp-2 text-[14px] leading-[1.25] ${
              latestTask.status === 'failed'
                ? 'text-[#DC2626]'
                : 'text-[#6B7280]'
            }`}
          >
            {`${m.knowledge_upload_progress_prefix()}${getUploadTaskStatusLabel(latestTask.statusText, i18nLocale)}${
              latestTask.errorMessage ? ` · ${latestTask.errorMessage}` : ''
            }`}
          </p>
        </div>

        <div className="flex items-center gap-2 pl-1 text-[#94A3B8]">
          {activeTaskCount > 0 ? (
            <span className="rounded-full bg-[#EEF2FF] px-2 py-0.5 text-[11px] font-semibold text-[#4F46E5]">
              {activeTaskCount}
            </span>
          ) : null}
          <button
            type="button"
            className="rounded-full bg-[#F1F5F9] p-1.5 transition-colors hover:bg-[#E2E8F0]"
            onClick={(event) => {
              event.stopPropagation()
              clearAllTasks()
            }}
            aria-label={m.common_clear()}
          >
            <X className="h-5 w-5" />
          </button>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {isOpen ? (
        <section className={expandedPanelClassName}>
          <div className="flex flex-col gap-2">
            {visibleTasks.map((task, index) => (
              <article
                key={`${task.documentId}-${task.fileName}-${task.createdAt}-${index}`}
                className={`rounded-[10px] border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2.5 transition-all duration-150 ${
                  task.status === 'completed' &&
                  task.documentId &&
                  !isWebCrawlTaskDocumentId(task.documentId)
                    ? 'cursor-pointer hover:-translate-y-[1px] hover:border-[#C7D2FE] hover:bg-[#F5F7FF]'
                    : ''
                }`}
                onClick={() => {
                  if (
                    task.status !== 'completed' ||
                    !task.documentId ||
                    isWebCrawlTaskDocumentId(task.documentId)
                  ) {
                    return
                  }
                  handleViewResult(task.documentId)
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <KnowledgeFileTypeIcon
                      fileName={task.fileName}
                      className="mt-0.5"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-semibold text-[#1E293B]">
                        {task.fileName}
                      </p>
                      <p
                        className={`mt-1 text-[13px] ${
                          task.status === 'failed'
                            ? 'text-[#DC2626]'
                            : 'text-[#6B7280]'
                        }`}
                      >
                        {`${m.knowledge_upload_progress_prefix()}${getUploadTaskStatusLabel(task.statusText, i18nLocale)}`}
                      </p>
                      {task.errorMessage ? (
                        <p className="mt-1 line-clamp-2 text-[12px] leading-[1.35] text-[#DC2626]">
                          {task.errorMessage}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[14px] font-semibold text-[#1E293B]">
                      {`${Math.round(task.progress)}%`}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
