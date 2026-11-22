import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from '@tanstack/react-query'

import {
  assistTaskEventKeys,
  type AssistTaskEventQueryResult,
  type LuciusAgentEventRow,
} from './agent-event-query'
import { m } from '@/paraglide/messages'

type ApiErrorResponse = {
  error?: string
}

type AssistTaskEventRowPatch = Partial<LuciusAgentEventRow> & {
  id: string
}

type EventActionApiResponse = {
  event?: AssistTaskEventRowPatch | null
  messageId?: string | null
}

type EventActionBasePayload = {
  companyId: string
  eventId: string
}

type ReviewAssistTaskEventReplyPayload = EventActionBasePayload & {
  decision: 'confirm' | 'reject'
  content?: string
}

export type SendAssistTaskEventMessagePayload = EventActionBasePayload & {
  content: string
}

export type SaveAssistTaskEventSupplementalKnowledgePayload = EventActionBasePayload & {
  clientSupplementalKnowledge: string | null
}

async function parseApiResponse<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T & ApiErrorResponse

  if (!response.ok) {
    throw new Error(data.error || m.service_event_action_request_failed())
  }

  return data
}

/**
 * 统一封装事件动作请求：
 * - 所有写操作都走当前应用域名下的 `/api/events/*`；
 * - 浏览器不直接触达 lucius-api-server，避免泄漏内部鉴权细节。
 */
async function postEventAction<TPayload extends Record<string, unknown>>(
  path: string,
  payload: TPayload,
): Promise<EventActionApiResponse> {
  const response = await fetch(path, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  })

  return parseApiResponse<EventActionApiResponse>(response)
}

/**
 * 合并服务端返回的事件 patch：
 * - event action 代理返回的 `event` 有时只包含被更新的字段；
 * - 这里必须基于现有缓存做 merge，避免把详情页已有字段抹成 `undefined`。
 */
function mergeAssistTaskEventRowPatch(
  currentRow: LuciusAgentEventRow,
  patch: AssistTaskEventRowPatch,
): LuciusAgentEventRow {
  return {
    ...currentRow,
    ...patch,
    id: currentRow.id,
    message_ids: Array.isArray(patch.message_ids)
      ? patch.message_ids
      : currentRow.message_ids,
  }
}

function isAssistTaskEventCacheNamespace(queryKey: readonly unknown[]): boolean {
  return queryKey[0] === 'supabase' && queryKey[1] === 'assist-task-events'
}

function isAssistTaskEventListQueryKey(queryKey: readonly unknown[]): boolean {
  if (!isAssistTaskEventCacheNamespace(queryKey)) {
    return false
  }

  const section = queryKey[2]
  return (
    typeof section === 'string' &&
    section !== 'count' &&
    section !== 'detail' &&
    section !== 'detail-messages' &&
    section !== 'detail-adopted-knowledge'
  )
}

function isAssistTaskEventCountQueryKey(queryKey: readonly unknown[]): boolean {
  return isAssistTaskEventCacheNamespace(queryKey) && queryKey[2] === 'count'
}

function updateAssistTaskEventListResult(
  currentResult: AssistTaskEventQueryResult | undefined,
  patch: AssistTaskEventRowPatch,
): AssistTaskEventQueryResult | undefined {
  if (!currentResult) {
    return currentResult
  }

  let hasMatchedRow = false
  const nextRows = currentResult.rows.map((row) => {
    if (row.id !== patch.id) {
      return row
    }

    hasMatchedRow = true
    return mergeAssistTaskEventRowPatch(row, patch)
  })

  if (!hasMatchedRow) {
    return currentResult
  }

  return {
    ...currentResult,
    rows: nextRows,
  }
}

export async function takeOverAssistTaskEvent(
  payload: EventActionBasePayload,
): Promise<EventActionApiResponse> {
  return postEventAction(
    `/api/events/${encodeURIComponent(payload.eventId)}/take-over`,
    {
      companyId: payload.companyId,
    },
  )
}

export async function ignoreAssistTaskEvent(
  payload: EventActionBasePayload,
): Promise<EventActionApiResponse> {
  return postEventAction(
    `/api/events/${encodeURIComponent(payload.eventId)}/ignore`,
    {
      companyId: payload.companyId,
    },
  )
}

export async function confirmAssistTaskEventReply(
  payload: EventActionBasePayload & { content: string },
): Promise<EventActionApiResponse> {
  return reviewAssistTaskEventReply({
    ...payload,
    decision: 'confirm',
  })
}

/**
 * 建议回复审核动作统一走同一个代理接口：
 * - `confirm` 会真正把 suggested reply 发送到外部平台；
 * - `reject` 只会结束这条建议回复的审核，不会代替人工发送消息。
 */
async function reviewAssistTaskEventReply(
  payload: ReviewAssistTaskEventReplyPayload,
): Promise<EventActionApiResponse> {
  return postEventAction(
    `/api/events/${encodeURIComponent(payload.eventId)}/confirm-reply`,
    {
      companyId: payload.companyId,
      decision: payload.decision,
      ...(payload.content !== undefined ? { content: payload.content } : {}),
    },
  )
}

export async function rejectAssistTaskEventReply(
  payload: EventActionBasePayload,
): Promise<EventActionApiResponse> {
  return reviewAssistTaskEventReply({
    ...payload,
    decision: 'reject',
  })
}

export async function sendAssistTaskEventMessage(
  payload: SendAssistTaskEventMessagePayload,
): Promise<EventActionApiResponse> {
  return postEventAction(
    `/api/events/${encodeURIComponent(payload.eventId)}/send-message`,
    {
      companyId: payload.companyId,
      content: payload.content,
    },
  )
}

export async function resolveAssistTaskEvent(
  payload: EventActionBasePayload,
): Promise<EventActionApiResponse> {
  return postEventAction(
    `/api/events/${encodeURIComponent(payload.eventId)}/resolve`,
    {
      companyId: payload.companyId,
    },
  )
}

export async function saveAssistTaskEventSupplementalKnowledge(
  payload: SaveAssistTaskEventSupplementalKnowledgePayload,
): Promise<EventActionApiResponse> {
  return postEventAction(
    `/api/events/${encodeURIComponent(payload.eventId)}/supplemental-knowledge`,
    {
      companyId: payload.companyId,
      clientSupplementalKnowledge: payload.clientSupplementalKnowledge,
    },
  )
}

/**
 * 事件 mutation 的统一缓存失效策略：
 * - 列表与详情都挂在 `assistTaskEventKeys.all` 下；
 * - 成功后统一失效，避免遗漏单条详情或分页列表。
 */
function useAssistTaskEventActionMutation<TPayload>(
  mutationFn: (payload: TPayload) => Promise<EventActionApiResponse>,
  options?: UseMutationOptions<EventActionApiResponse, Error, TPayload>,
) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn,
    onSuccess: async (...args) => {
      void queryClient.invalidateQueries({ queryKey: assistTaskEventKeys.all })
      await options?.onSuccess?.(...args)
    },
  })
}

export function useTakeOverAssistTaskEvent(
  options?: UseMutationOptions<EventActionApiResponse, Error, EventActionBasePayload>,
) {
  return useAssistTaskEventActionMutation(takeOverAssistTaskEvent, options)
}

export function useIgnoreAssistTaskEvent(
  options?: UseMutationOptions<EventActionApiResponse, Error, EventActionBasePayload>,
) {
  return useAssistTaskEventActionMutation(ignoreAssistTaskEvent, options)
}

export function useConfirmAssistTaskEventReply(
  options?: UseMutationOptions<
    EventActionApiResponse,
    Error,
    EventActionBasePayload & { content: string }
  >,
) {
  return useAssistTaskEventActionMutation(confirmAssistTaskEventReply, options)
}

export function useRejectAssistTaskEventReply(
  options?: UseMutationOptions<EventActionApiResponse, Error, EventActionBasePayload>,
) {
  return useAssistTaskEventActionMutation(rejectAssistTaskEventReply, options)
}

export function useSendAssistTaskEventMessage(
  options?: UseMutationOptions<
    EventActionApiResponse,
    Error,
    SendAssistTaskEventMessagePayload
  >,
) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: sendAssistTaskEventMessage,
    onSuccess: async (data, variables, context) => {
      const normalizedEventPatch = data.event?.id ? data.event : null

      /**
       * 发送消息后优先 patch 当前事件缓存，而不是粗暴失效整个命名空间：
       * - 详情页需要立即拿到新的 `message_ids / status / owner / last_activity_at`；
       * - 列表与计数改成后台刷新，避免右侧消息区重新掉回骨架屏。
       */
      if (normalizedEventPatch?.id === variables.eventId) {
        queryClient.setQueryData<LuciusAgentEventRow | null>(
          assistTaskEventKeys.detail({
            companyId: variables.companyId,
            eventId: variables.eventId,
          }),
          (currentRow) => {
            if (!currentRow) {
              return currentRow
            }

            return mergeAssistTaskEventRowPatch(currentRow, normalizedEventPatch)
          },
        )

        queryClient.setQueriesData<AssistTaskEventQueryResult>(
          {
            predicate: (query) => isAssistTaskEventListQueryKey(query.queryKey),
          },
          (currentResult) =>
            updateAssistTaskEventListResult(currentResult, normalizedEventPatch),
        )
      }

      void queryClient.invalidateQueries({
        predicate: (query) =>
          isAssistTaskEventListQueryKey(query.queryKey) ||
          isAssistTaskEventCountQueryKey(query.queryKey),
      })

      await options?.onSuccess?.(data, variables, context)
    },
  })
}

export function useResolveAssistTaskEvent(
  options?: UseMutationOptions<EventActionApiResponse, Error, EventActionBasePayload>,
) {
  return useAssistTaskEventActionMutation(resolveAssistTaskEvent, options)
}

export function useSaveAssistTaskEventSupplementalKnowledge(
  options?: UseMutationOptions<
    EventActionApiResponse,
    Error,
    SaveAssistTaskEventSupplementalKnowledgePayload
  >,
) {
  return useAssistTaskEventActionMutation(
    saveAssistTaskEventSupplementalKnowledge,
    options,
  )
}

export const __agentEventActionTestables = {
  isAssistTaskEventListQueryKey,
  isAssistTaskEventCountQueryKey,
  mergeAssistTaskEventRowPatch,
  updateAssistTaskEventListResult,
}
