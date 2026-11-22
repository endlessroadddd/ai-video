import { describe, expect, it } from 'vitest'

import {
  resolveSelectedAssistTaskEventRow,
  shouldDeferAssistTaskEventActionsUntilDetailLoaded,
  shouldFetchSelectedAssistTaskEventDetail,
} from '@/lib/assist-task-detail-selection'
import type { LuciusAgentEventRow } from '@/lib/services/agent-event-query'

/**
 * 构造最小事件行：
 * - 只覆盖当前选择逻辑依赖的公共字段；
 * - 通过覆盖参数表达状态差异，让测试更聚焦。
 */
function createEventRow(
  overrides: Partial<LuciusAgentEventRow> = {},
): LuciusAgentEventRow {
  return {
    id: 'event-1',
    title: '事件标题',
    summary: null,
    suggested_reply: null,
    client_supplemental_knowledge: null,
    context: {},
    cannot_reply_reason: '',
    platform: 'telegram',
    user_id: 'user-1',
    channel_id: 'channel-1',
    channel_name: 'general',
    owner_user_id: null,
    owner_display_name: null,
    owner_avatar_url: null,
    priority: null,
    manual_review_required: false,
    manual_review_status: null,
    sla_due_at: null,
    last_activity_at: '2026-03-12T10:00:00.000Z',
    created_at: '2026-03-12T10:00:00.000Z',
    updated_at: '2026-03-12T10:00:00.000Z',
    status: 'pending',
    event_type: 'knowledge_request',
    message_ids: ['message-1'],
    ...overrides,
  }
}

describe('assist-task-detail-selection', () => {
  it('有选中事件且 onboarding 已完成时应拉取单条详情', () => {
    expect(
      shouldFetchSelectedAssistTaskEventDetail({
        activeCompanyId: 'company-1',
        selectedEventId: 'event-1',
        isCheckingOnboarding: false,
        onboardingRedirectTarget: null,
      }),
    ).toBe(true)
  })

  it('onboarding 仍在检查时不应拉取详情', () => {
    expect(
      shouldFetchSelectedAssistTaskEventDetail({
        activeCompanyId: 'company-1',
        selectedEventId: 'event-1',
        isCheckingOnboarding: true,
        onboardingRedirectTarget: null,
      }),
    ).toBe(false)
  })

  it('详情行应覆盖列表中的旧状态', () => {
    const listRow = createEventRow({
      status: 'processing',
      manual_review_status: 'confirmed',
    })
    const detailRow = createEventRow({
      status: 'resolved',
      manual_review_status: 'confirmed',
    })

    expect(
      resolveSelectedAssistTaskEventRow({
        listRow,
        detailRow,
      }),
    ).toEqual(detailRow)
  })

  it('详情尚未返回时应回退到列表行', () => {
    const listRow = createEventRow({
      status: 'processing',
    })

    expect(
      resolveSelectedAssistTaskEventRow({
        listRow,
        detailRow: null,
      }),
    ).toEqual(listRow)
  })

  it('详情未返回前应先冻结动作按钮，避免旧列表状态误导', () => {
    expect(
      shouldDeferAssistTaskEventActionsUntilDetailLoaded({
        shouldLoadSelectedEventDetail: true,
        detailRow: null,
        hasDetailError: false,
      }),
    ).toBe(true)
  })

  it('详情一旦返回后不应继续冻结动作按钮', () => {
    expect(
      shouldDeferAssistTaskEventActionsUntilDetailLoaded({
        shouldLoadSelectedEventDetail: true,
        detailRow: createEventRow({
          status: 'resolved',
        }),
        hasDetailError: false,
      }),
    ).toBe(false)
  })
})
