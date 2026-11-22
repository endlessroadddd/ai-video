import { describe, expect, it } from 'vitest'

import { __agentEventActionTestables } from '@/lib/services/agent-event-action'
import type {
  AssistTaskEventQueryResult,
  LuciusAgentEventRow,
} from '@/lib/services/agent-event-query'

function createEventRow(overrides?: Partial<LuciusAgentEventRow>): LuciusAgentEventRow {
  return {
    id: 'event-1',
    title: 'Need help',
    summary: 'summary',
    suggested_reply: null,
    client_supplemental_knowledge: null,
    context: null,
    cannot_reply_reason: '',
    platform: 'website',
    user_id: 'user-1',
    channel_id: 'channel-1',
    channel_name: 'Website',
    owner_user_id: null,
    owner_display_name: null,
    owner_avatar_url: null,
    priority: null,
    manual_review_required: false,
    manual_review_status: null,
    sla_due_at: null,
    last_activity_at: '2026-03-17T10:00:00.000Z',
    created_at: '2026-03-17T09:00:00.000Z',
    updated_at: '2026-03-17T10:00:00.000Z',
    status: 'pending',
    event_type: 'usage_issue',
    message_ids: ['msg-1'],
    event_user_avatar_url: null,
    ...overrides,
  }
}

describe('agent-event-action helpers', () => {
  it('merges event patch without dropping untouched fields', () => {
    const currentRow = createEventRow()
    const mergedRow = __agentEventActionTestables.mergeAssistTaskEventRowPatch(
      currentRow,
      {
        id: currentRow.id,
        status: 'processing',
        owner_display_name: 'Kaikai',
        message_ids: ['msg-1', 'msg-2'],
      },
    )

    expect(mergedRow.title).toBe(currentRow.title)
    expect(mergedRow.status).toBe('processing')
    expect(mergedRow.owner_display_name).toBe('Kaikai')
    expect(mergedRow.message_ids).toEqual(['msg-1', 'msg-2'])
  })

  it('updates only the matching row inside list query data', () => {
    const originalResult: AssistTaskEventQueryResult = {
      rows: [
        createEventRow(),
        createEventRow({
          id: 'event-2',
          title: 'Keep untouched',
          message_ids: ['msg-9'],
        }),
      ],
      totalCount: 2,
      timedOutCount: 0,
      pendingCount: 2,
      typeOptions: [],
    }

    const updatedResult =
      __agentEventActionTestables.updateAssistTaskEventListResult(
        originalResult,
        {
          id: 'event-1',
          status: 'processing',
          last_activity_at: '2026-03-17T11:00:00.000Z',
          message_ids: ['msg-1', 'msg-2'],
        },
      )

    expect(updatedResult?.rows[0].status).toBe('processing')
    expect(updatedResult?.rows[0].message_ids).toEqual(['msg-1', 'msg-2'])
    expect(updatedResult?.rows[1]).toEqual(originalResult.rows[1])
  })

  it('recognizes list and count query keys correctly', () => {
    const listKey = ['supabase', 'assist-task-events', 'company-1', 0, 50, 'pending', 'all', '']
    const countKey = ['supabase', 'assist-task-events', 'count', 'company-1']
    const detailKey = ['supabase', 'assist-task-events', 'detail', 'company-1', 'event-1']

    expect(__agentEventActionTestables.isAssistTaskEventListQueryKey(listKey)).toBe(true)
    expect(__agentEventActionTestables.isAssistTaskEventCountQueryKey(listKey)).toBe(false)
    expect(__agentEventActionTestables.isAssistTaskEventCountQueryKey(countKey)).toBe(true)
    expect(__agentEventActionTestables.isAssistTaskEventListQueryKey(detailKey)).toBe(false)
  })
})
