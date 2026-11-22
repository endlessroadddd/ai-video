import { afterEach, describe, expect, it, vi } from 'vitest'

const { getSupabaseBrowserClientMock } = vi.hoisted(() => ({
  getSupabaseBrowserClientMock: vi.fn(),
}))

vi.mock('@/lib/supabase/client', () => ({
  getSupabaseBrowserClient: getSupabaseBrowserClientMock,
}))

import {
  fetchAssistTaskEventCount,
  fetchAssistTaskEventMessages,
  fetchAssistTaskEvents,
} from '@/lib/services/agent-event-query'
import { m } from '@/paraglide/messages'
import { overwriteGetLocale } from '@/paraglide/runtime'

type MockQueryRow = Record<string, unknown>

type MockTableData = {
  discord?: {
    message?: MockQueryRow[]
    user?: MockQueryRow[]
  }
  feishu?: {
    message?: MockQueryRow[]
    user?: MockQueryRow[]
  }
  slack?: {
    message?: MockQueryRow[]
    user?: MockQueryRow[]
  }
  telegram?: {
    message?: MockQueryRow[]
    user?: MockQueryRow[]
  }
  website?: {
    session?: MockQueryRow[]
    message?: MockQueryRow[]
  }
  lucius_agent?: {
    event?: MockQueryRow[]
    event_type_config?: MockQueryRow[]
  }
}

function splitTopLevelFilters(filters: string): string[] {
  const result: string[] = []
  let currentFilter = ''
  let depth = 0

  for (const character of filters) {
    if (character === ',' && depth === 0) {
      if (currentFilter.trim()) {
        result.push(currentFilter.trim())
      }
      currentFilter = ''
      continue
    }

    if (character === '(') {
      depth += 1
    } else if (character === ')') {
      depth = Math.max(depth - 1, 0)
    }

    currentFilter += character
  }

  if (currentFilter.trim()) {
    result.push(currentFilter.trim())
  }

  return result
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function matchesIlikePattern(value: string, pattern: string): boolean {
  const regexPattern = escapeRegExp(pattern)
    .replaceAll('%', '.*')
    .replaceAll('_', '.')

  return new RegExp(`^${regexPattern}$`, 'i').test(value)
}

function matchesMockOrFilter(row: MockQueryRow, filter: string): boolean {
  const normalizedFilter = filter.trim()
  if (!normalizedFilter) {
    return true
  }

  if (normalizedFilter.startsWith('and(') && normalizedFilter.endsWith(')')) {
    const innerFilters = normalizedFilter.slice(4, -1)
    return splitTopLevelFilters(innerFilters).every((innerFilter) =>
      matchesMockOrFilter(row, innerFilter),
    )
  }

  const firstDotIndex = normalizedFilter.indexOf('.')
  const secondDotIndex = normalizedFilter.indexOf('.', firstDotIndex + 1)

  if (firstDotIndex <= 0 || secondDotIndex <= firstDotIndex) {
    return false
  }

  const column = normalizedFilter.slice(0, firstDotIndex)
  const operator = normalizedFilter.slice(firstDotIndex + 1, secondDotIndex)
  const rawValue = normalizedFilter.slice(secondDotIndex + 1)
  const currentValue = row[column]

  if (operator === 'eq') {
    return currentValue === rawValue
  }

  if (operator === 'neq') {
    return currentValue !== rawValue
  }

  if (operator === 'is') {
    if (rawValue === 'null') {
      return currentValue === null || currentValue === undefined
    }

    return currentValue === rawValue
  }

  if (operator === 'ilike') {
    return typeof currentValue === 'string' && matchesIlikePattern(currentValue, rawValue)
  }

  return false
}

class MockSupabaseQueryBuilder {
  private readonly rows: MockQueryRow[]
  private readonly count: number
  private readonly head: boolean

  constructor(rows: MockQueryRow[], options?: { count?: number; head?: boolean }) {
    this.rows = [...rows]
    this.count = options?.count ?? rows.length
    this.head = options?.head ?? false
  }

  select(_columns: string, options?: { count?: string; head?: boolean }): MockSupabaseQueryBuilder {
    return new MockSupabaseQueryBuilder(this.rows, {
      count: this.count,
      head: options?.head ?? false,
    })
  }

  eq(column: string, value: unknown): MockSupabaseQueryBuilder {
    const nextRows = this.rows.filter((row) => row[column] === value)
    return new MockSupabaseQueryBuilder(nextRows, { count: nextRows.length, head: this.head })
  }

  in(column: string, values: unknown[]): MockSupabaseQueryBuilder {
    const nextRows = this.rows.filter((row) => values.includes(row[column]))
    return new MockSupabaseQueryBuilder(nextRows, { count: nextRows.length, head: this.head })
  }

  or(filters: string): MockSupabaseQueryBuilder {
    const nextRows = this.rows.filter((row) =>
      splitTopLevelFilters(filters).some((filter) => matchesMockOrFilter(row, filter)),
    )

    return new MockSupabaseQueryBuilder(nextRows, { count: nextRows.length, head: this.head })
  }

  not(column: string, operator: string, value: unknown): MockSupabaseQueryBuilder {
    if (operator === 'is' && value === null) {
      const nextRows = this.rows.filter((row) => row[column] !== null && row[column] !== undefined)
      return new MockSupabaseQueryBuilder(nextRows, { count: nextRows.length, head: this.head })
    }

    if (operator === 'eq') {
      const nextRows = this.rows.filter((row) => row[column] !== value)
      return new MockSupabaseQueryBuilder(nextRows, { count: nextRows.length, head: this.head })
    }

    return this
  }

  lt(column: string, value: string): MockSupabaseQueryBuilder {
    const nextRows = this.rows.filter((row) => {
      const currentValue = row[column]
      return typeof currentValue === 'string' && currentValue < value
    })

    return new MockSupabaseQueryBuilder(nextRows, { count: nextRows.length, head: this.head })
  }

  order(_column: string, _options?: { ascending?: boolean }): MockSupabaseQueryBuilder {
    return this
  }

  range(from: number, to: number): MockSupabaseQueryBuilder {
    const nextRows = this.rows.slice(from, to + 1)
    return new MockSupabaseQueryBuilder(nextRows, { count: this.count, head: this.head })
  }

  limit(limit: number): MockSupabaseQueryBuilder {
    const nextRows = this.rows.slice(0, limit)
    return new MockSupabaseQueryBuilder(nextRows, { count: nextRows.length, head: this.head })
  }

  then<TResult1 = { data: MockQueryRow[]; error: null }, TResult2 = never>(
    onFulfilled?:
      | ((value: { data: MockQueryRow[] | null; error: null; count: number }) => TResult1 | PromiseLike<TResult1>)
      | null,
    onRejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): Promise<TResult1 | TResult2> {
    return Promise.resolve({
      data: this.head ? null : [...this.rows],
      error: null,
      count: this.count,
    }).then(onFulfilled, onRejected)
  }
}

function createMockSupabaseClient(tableData: MockTableData) {
  return {
    schema(schemaName: string) {
      return {
        from(tableName: string) {
          const rows =
            tableData[schemaName as keyof MockTableData]?.[
              tableName as keyof NonNullable<MockTableData[keyof MockTableData]>
            ] || []

          return new MockSupabaseQueryBuilder(rows)
        },
      }
    },
  }
}

afterEach(() => {
  vi.restoreAllMocks()
})

overwriteGetLocale(() => 'en')

describe('agent-event-query', () => {
  it('fetchAssistTaskEventCount 应只统计 pending 与 processing 状态', async () => {
    getSupabaseBrowserClientMock.mockReturnValue(
      createMockSupabaseClient({
        lucius_agent: {
          event: [
            {
              id: 'event-pending-1',
              company_id: 'company-1',
              status: 'pending',
            },
            {
              id: 'event-processing-1',
              company_id: 'company-1',
              status: 'processing',
            },
            {
              id: 'event-resolved-1',
              company_id: 'company-1',
              status: 'resolved',
            },
            {
              id: 'event-ignored-1',
              company_id: 'company-1',
              status: 'ignored',
            },
            {
              id: 'event-pending-other-company',
              company_id: 'company-2',
              status: 'pending',
            },
          ],
        },
      }),
    )

    const count = await fetchAssistTaskEventCount({
      companyId: 'company-1',
    })

    expect(count).toBe(2)
  })

  it('fetchAssistTaskEventMessages 应为 Slack 消息补齐用户头像与昵称', async () => {
    getSupabaseBrowserClientMock.mockReturnValue(
      createMockSupabaseClient({
        slack: {
          message: [
            {
              company_id: 'company-1',
              channel_id: 'channel-1',
              ts: '1772008626.584339',
              user_id: 'U123',
              team_id: 'T123',
              text: 'Hello from Slack',
              created_at: '2026-03-10T08:00:00.000Z',
              message_role: 'user',
            },
          ],
          user: [
            {
              company_id: 'company-1',
              user_id: 'U123',
              team_id: 'T123',
              display_name: '  Alice  ',
              avatar_url: ' https://cdn.example.com/alice.png ',
            },
          ],
        },
      }),
    )

    const messages = await fetchAssistTaskEventMessages({
      companyId: 'company-1',
      eventId: 'event-1',
      platform: 'slack',
      channelId: 'channel-1',
      messageIds: ['1772008626.584339'],
    })

    expect(messages).toEqual([
      {
        platform: 'slack',
        messageId: '1772008626.584339',
        role: 'user',
        authorName: 'Alice',
        authorAvatarUrl: 'https://cdn.example.com/alice.png',
        content: 'Hello from Slack',
        sentAt: '2026-03-10T08:00:00.000Z',
      },
    ])
  })

  it('fetchAssistTaskEventMessages 应支持 Website 消息详情', async () => {
    getSupabaseBrowserClientMock.mockReturnValue(
      createMockSupabaseClient({
        website: {
          message: [
            {
              id: 'website-message-1',
              company_id: 'company-1',
              content: '用户在网站里咨询价格',
              timestamp: '2026-03-10T08:00:00.000Z',
              message_role: 'user',
              raw: {
                user_id: 'f25cad0a-e00a-4015-acc6-8bafe0ab7ddb',
                username: 'kaikaikai444',
                avatar_url: 'https://lh3.googleusercontent.com/a/avatar=s96-c',
              },
            },
            {
              id: 'website-message-2',
              company_id: 'company-1',
              content: 'Lucius 已给出初步说明',
              timestamp: '2026-03-10T08:01:00.000Z',
              message_role: 'lucius',
            },
            {
              id: 'website-message-3',
              company_id: 'company-1',
              content: '你好，我是客服主管',
              timestamp: '2026-03-10T08:02:00.000Z',
              message_role: 'staff',
              raw: {
                user_id: '0263be88-7030-44a9-a978-27459f214212',
                username: 'zhaohe',
                avatar_url: 'https://lh3.googleusercontent.com/a/staff-avatar=s96-c',
              },
            },
          ],
        },
      }),
    )

    const messages = await fetchAssistTaskEventMessages({
      companyId: 'company-1',
      eventId: 'event-website-1',
      platform: 'website',
      channelId: 'ignored-channel-id',
      messageIds: ['website-message-1', 'website-message-2', 'website-message-3'],
    })

    expect(messages).toEqual([
      {
        platform: 'website',
        messageId: 'website-message-1',
        role: 'user',
        authorName: 'kaikaikai444',
        authorAvatarUrl: 'https://lh3.googleusercontent.com/a/avatar=s96-c',
        content: '用户在网站里咨询价格',
        sentAt: '2026-03-10T08:00:00.000Z',
      },
      {
        platform: 'website',
        messageId: 'website-message-2',
        role: 'lucius',
        authorName: m.common_lucius_ai_name(),
        authorAvatarUrl: null,
        content: 'Lucius 已给出初步说明',
        sentAt: '2026-03-10T08:01:00.000Z',
      },
      {
        platform: 'website',
        messageId: 'website-message-3',
        role: 'staff',
        authorName: 'zhaohe',
        authorAvatarUrl: 'https://lh3.googleusercontent.com/a/staff-avatar=s96-c',
        content: '你好，我是客服主管',
        sentAt: '2026-03-10T08:02:00.000Z',
      },
    ])
  })

  it('fetchAssistTaskEventMessages 应在 Website 已接手时展示同一 session 的全部消息', async () => {
    getSupabaseBrowserClientMock.mockReturnValue(
      createMockSupabaseClient({
        website: {
          session: [
            {
              id: 'website-session-uuid-1',
              session_id: 'session-123',
              company_id: 'company-1',
            },
          ],
          message: [
            {
              id: 'website-message-early',
              session_uuid: 'website-session-uuid-1',
              company_id: 'company-1',
              content: '最早的官网提问',
              timestamp: '2026-03-10T07:59:00.000Z',
              message_role: 'user',
              raw: {
                username: 'visitor-a',
              },
            },
            {
              id: 'website-message-1',
              session_uuid: 'website-session-uuid-1',
              company_id: 'company-1',
              content: '触发当前 event 的消息',
              timestamp: '2026-03-10T08:00:00.000Z',
              message_role: 'user',
              raw: {
                username: 'visitor-a',
              },
            },
            {
              id: 'website-message-2',
              session_uuid: 'website-session-uuid-1',
              company_id: 'company-1',
              content: '工作人员已接手',
              timestamp: '2026-03-10T08:01:00.000Z',
              message_role: 'staff',
              raw: {
                username: 'support-a',
              },
            },
            {
              id: 'website-message-late',
              session_uuid: 'website-session-uuid-1',
              company_id: 'company-1',
              content: '接手后的补充追问',
              timestamp: '2026-03-10T08:02:00.000Z',
              message_role: 'user',
              raw: {
                username: 'visitor-a',
              },
            },
            {
              id: 'website-message-other-session',
              session_uuid: 'website-session-uuid-2',
              company_id: 'company-1',
              content: '别的会话消息',
              timestamp: '2026-03-10T08:03:00.000Z',
              message_role: 'user',
              raw: {
                username: 'visitor-b',
              },
            },
          ],
        },
      }),
    )

    const messages = await fetchAssistTaskEventMessages({
      companyId: 'company-1',
      eventId: 'event-website-2',
      scope: 'website_session',
      platform: 'website',
      channelId: 'session-123',
      messageIds: ['website-message-1'],
    })

    expect(messages.map((message) => message.messageId)).toEqual([
      'website-message-early',
      'website-message-1',
      'website-message-2',
      'website-message-late',
    ])
  })

  it('fetchAssistTaskEvents 应为 Slack 列表事件补齐 participant_avatar_urls', async () => {
    getSupabaseBrowserClientMock.mockReturnValue(
      createMockSupabaseClient({
        lucius_agent: {
          event: [
            {
              id: 'event-1',
              company_id: 'company-1',
              title: '用户咨询产品介绍',
              summary: null,
              context: {},
              cannot_reply_reason: '',
              platform: 'slack',
              user_id: 'U123',
              channel_id: 'C123',
              channel_name: 'jarsy test',
              owner_user_id: null,
              owner_display_name: null,
              owner_avatar_url: null,
              priority: 'medium',
              manual_review_required: false,
              manual_review_status: 'not_required',
              sla_due_at: null,
              last_activity_at: '2026-03-10T08:00:00.000Z',
              created_at: '2026-03-10T08:00:00.000Z',
              updated_at: '2026-03-10T08:00:00.000Z',
              status: 'pending',
              event_type: 'knowledge_request',
              message_ids: ['1772008626.584339', '1772008627.584339', '1772008628.584339', '1772008629.584339'],
            },
          ],
          event_type_config: [
            {
              company_id: 'company-1',
              type_key: 'knowledge_request',
              type_label: '知识咨询',
              is_active: true,
            },
          ],
        },
        slack: {
          message: [
            {
              company_id: 'company-1',
              channel_id: 'C123',
              ts: '1772008626.584339',
              user_id: 'U123',
              team_id: 'T123',
              created_at: '2026-03-10T08:00:00.000Z',
              message_role: 'user',
            },
            {
              company_id: 'company-1',
              channel_id: 'C123',
              ts: '1772008627.584339',
              user_id: 'U456',
              team_id: 'T123',
              created_at: '2026-03-10T08:05:00.000Z',
              message_role: 'user',
            },
            {
              company_id: 'company-1',
              channel_id: 'C123',
              ts: '1772008628.584339',
              user_id: 'B999',
              team_id: 'T123',
              bot_id: 'B999',
              created_at: '2026-03-10T08:10:00.000Z',
              message_role: 'assistant',
            },
            {
              company_id: 'company-1',
              channel_id: 'C123',
              ts: '1772008629.584339',
              user_id: 'U789',
              team_id: 'T123',
              created_at: '2026-03-10T08:15:00.000Z',
              message_role: 'user',
            },
          ],
          user: [
            {
              company_id: 'company-1',
              user_id: 'U123',
              team_id: 'T123',
              display_name: 'Kai',
              avatar_url: 'https://cdn.example.com/kai.png',
            },
            {
              company_id: 'company-1',
              user_id: 'U456',
              team_id: 'T123',
              display_name: 'Mia',
              avatar_url: 'https://cdn.example.com/mia.png',
            },
            {
              company_id: 'company-1',
              user_id: 'U789',
              team_id: 'T123',
              display_name: 'Leo',
              avatar_url: 'https://cdn.example.com/leo.png',
            },
          ],
        },
      }),
    )

    const result = await fetchAssistTaskEvents({
      companyId: 'company-1',
      pageIndex: 0,
      pageSize: 20,
      statusFilter: 'all',
      typeFilter: 'all',
      keyword: '',
    })

    expect(result.rows).toHaveLength(1)
    expect(result.rows[0]?.context).toEqual({
      participant_avatar_urls: [
        'https://cdn.example.com/leo.png',
        'https://cdn.example.com/mia.png',
        'https://cdn.example.com/kai.png',
      ],
    })
    expect(result.rows[0]?.event_user_avatar_url).toBe('https://cdn.example.com/kai.png')
  })

  it('fetchAssistTaskEventMessages 应为 Telegram 消息生成同域头像代理 URL', async () => {
    getSupabaseBrowserClientMock.mockReturnValue(
      createMockSupabaseClient({
        telegram: {
          message: [
            {
              company_id: 'company-1',
              chat_id: 'chat-1',
              message_id: 'tg-msg-1',
              sender_user_id: 'tg-user-1',
              text: 'hello telegram',
              date: '2026-03-10T08:00:00.000Z',
              created_at: '2026-03-10T08:00:00.000Z',
              message_role: 'user',
            },
          ],
          user: [
            {
              company_id: 'company-1',
              user_id: 'tg-user-1',
              username: '  jarsyoinko  ',
              first_name: 'Jarsy',
              last_name: 'Test',
            },
          ],
        },
      }),
    )

    const messages = await fetchAssistTaskEventMessages({
      companyId: 'company-1',
      eventId: 'event-telegram-1',
      platform: 'telegram',
      channelId: 'chat-1',
      messageIds: ['tg-msg-1'],
    })

    expect(messages).toEqual([
      {
        platform: 'telegram',
        messageId: 'tg-msg-1',
        role: 'user',
        authorName: 'jarsyoinko',
        authorAvatarUrl: '/api/events/telegram-avatar?companyId=company-1&userId=tg-user-1',
        content: 'hello telegram',
        sentAt: '2026-03-10T08:00:00.000Z',
      },
    ])
  })

  it('fetchAssistTaskEvents 应为 Telegram 列表事件生成 participant_avatar_urls', async () => {
    getSupabaseBrowserClientMock.mockReturnValue(
      createMockSupabaseClient({
        lucius_agent: {
          event: [
            {
              id: 'event-telegram-1',
              company_id: 'company-1',
              title: 'Telegram 用户咨询',
              summary: null,
              context: {},
              cannot_reply_reason: '',
              platform: 'telegram',
              user_id: 'tg-user-1',
              channel_id: 'chat-1',
              channel_name: 'telegram room',
              owner_user_id: null,
              owner_display_name: null,
              owner_avatar_url: null,
              priority: 'medium',
              manual_review_required: false,
              manual_review_status: 'not_required',
              sla_due_at: null,
              last_activity_at: '2026-03-10T08:00:00.000Z',
              created_at: '2026-03-10T08:00:00.000Z',
              updated_at: '2026-03-10T08:00:00.000Z',
              status: 'pending',
              event_type: 'knowledge_request',
              message_ids: ['tg-msg-1', 'tg-msg-2', 'tg-msg-3', 'tg-msg-4', 'tg-msg-5'],
            },
          ],
          event_type_config: [
            {
              company_id: 'company-1',
              type_key: 'knowledge_request',
              type_label: '知识咨询',
              is_active: true,
            },
          ],
        },
        telegram: {
          message: [
            {
              company_id: 'company-1',
              chat_id: 'chat-1',
              message_id: 'tg-msg-1',
              sender_user_id: 'tg-user-1',
              created_at: '2026-03-10T08:00:00.000Z',
              message_role: 'user',
            },
            {
              company_id: 'company-1',
              chat_id: 'chat-1',
              message_id: 'tg-msg-2',
              sender_user_id: 'tg-bot-1',
              created_at: '2026-03-10T08:05:00.000Z',
              message_role: 'assistant',
            },
            {
              company_id: 'company-1',
              chat_id: 'chat-1',
              message_id: 'tg-msg-3',
              sender_user_id: 'tg-user-2',
              created_at: '2026-03-10T08:10:00.000Z',
              message_role: 'user',
            },
            {
              company_id: 'company-1',
              chat_id: 'chat-1',
              message_id: 'tg-msg-4',
              sender_user_id: 'tg-user-1',
              created_at: '2026-03-10T08:15:00.000Z',
              message_role: 'user',
            },
            {
              company_id: 'company-1',
              chat_id: 'chat-1',
              message_id: 'tg-msg-5',
              sender_user_id: 'tg-user-3',
              created_at: '2026-03-10T08:20:00.000Z',
              message_role: 'user',
            },
          ],
        },
      }),
    )

    const result = await fetchAssistTaskEvents({
      companyId: 'company-1',
      pageIndex: 0,
      pageSize: 20,
      statusFilter: 'all',
      typeFilter: 'all',
      keyword: '',
    })

    expect(result.rows).toHaveLength(1)
    expect(result.rows[0]?.context).toEqual({
      participant_avatar_urls: [
        '/api/events/telegram-avatar?companyId=company-1&userId=tg-user-3',
        '/api/events/telegram-avatar?companyId=company-1&userId=tg-user-1',
        '/api/events/telegram-avatar?companyId=company-1&userId=tg-user-2',
      ],
    })
    expect(result.rows[0]?.event_user_avatar_url).toBe('/api/events/telegram-avatar?companyId=company-1&userId=tg-user-1')
  })

  it('fetchAssistTaskEvents 应为 Discord 列表事件补齐 event_user_avatar_url', async () => {
    getSupabaseBrowserClientMock.mockReturnValue(
      createMockSupabaseClient({
        lucius_agent: {
          event: [
            {
              id: 'event-discord-1',
              company_id: 'company-1',
              title: 'Discord 用户咨询',
              summary: null,
              context: {},
              cannot_reply_reason: '',
              platform: 'discord',
              user_id: 'discord-user-1',
              channel_id: 'channel-1',
              channel_name: 'support',
              owner_user_id: null,
              owner_display_name: null,
              owner_avatar_url: null,
              priority: 'medium',
              manual_review_required: false,
              manual_review_status: 'not_required',
              sla_due_at: null,
              last_activity_at: '2026-03-10T08:00:00.000Z',
              created_at: '2026-03-10T08:00:00.000Z',
              updated_at: '2026-03-10T08:00:00.000Z',
              status: 'pending',
              event_type: 'knowledge_request',
              message_ids: [],
            },
          ],
        },
        discord: {
          user: [
            {
              company_id: 'company-1',
              user_id: 'discord-user-1',
              avatar_url: 'https://cdn.example.com/discord-user-1.png',
            },
          ],
        },
      }),
    )

    const result = await fetchAssistTaskEvents({
      companyId: 'company-1',
      pageIndex: 0,
      pageSize: 20,
      statusFilter: 'all',
      typeFilter: 'all',
      keyword: '',
    })

    expect(result.rows).toHaveLength(1)
    expect(result.rows[0]?.event_user_avatar_url).toBe('https://cdn.example.com/discord-user-1.png')
  })

  it('fetchAssistTaskEvents 应为 Feishu 列表事件按 open_id 补齐 event_user_avatar_url', async () => {
    getSupabaseBrowserClientMock.mockReturnValue(
      createMockSupabaseClient({
        lucius_agent: {
          event: [
            {
              id: 'event-feishu-1',
              company_id: 'company-1',
              title: '飞书用户咨询',
              summary: null,
              context: {},
              cannot_reply_reason: '',
              platform: 'feishu',
              user_id: 'ou_123',
              channel_id: 'chat-1',
              channel_name: '飞书群',
              owner_user_id: null,
              owner_display_name: null,
              owner_avatar_url: null,
              priority: 'medium',
              manual_review_required: false,
              manual_review_status: 'not_required',
              sla_due_at: null,
              last_activity_at: '2026-03-10T08:00:00.000Z',
              created_at: '2026-03-10T08:00:00.000Z',
              updated_at: '2026-03-10T08:00:00.000Z',
              status: 'pending',
              event_type: 'knowledge_request',
              message_ids: [],
            },
          ],
        },
        feishu: {
          user: [
            {
              company_id: 'company-1',
              user_id: 'user_123',
              open_id: 'ou_123',
              avatar_url: 'https://cdn.example.com/feishu-user-1.png',
            },
          ],
        },
      }),
    )

    const result = await fetchAssistTaskEvents({
      companyId: 'company-1',
      pageIndex: 0,
      pageSize: 20,
      statusFilter: 'all',
      typeFilter: 'all',
      keyword: '',
    })

    expect(result.rows).toHaveLength(1)
    expect(result.rows[0]?.event_user_avatar_url).toBe('https://cdn.example.com/feishu-user-1.png')
  })

  it('fetchAssistTaskEvents 应将 resolved + rejected 兼容映射为 ignored', async () => {
    getSupabaseBrowserClientMock.mockReturnValue(
      createMockSupabaseClient({
        lucius_agent: {
          event: [
            {
              id: 'event-ignored-1',
              company_id: 'company-1',
              title: '已忽略事件',
              summary: null,
              suggested_reply: null,
              client_supplemental_knowledge: null,
              context: {},
              cannot_reply_reason: '',
              platform: 'discord',
              user_id: 'user-1',
              channel_id: 'channel-1',
              channel_name: 'general',
              owner_user_id: null,
              owner_display_name: null,
              owner_avatar_url: null,
              priority: 'medium',
              manual_review_required: false,
              manual_review_status: 'rejected',
              sla_due_at: null,
              last_activity_at: '2026-03-10T08:00:00.000Z',
              created_at: '2026-03-10T08:00:00.000Z',
              updated_at: '2026-03-10T08:00:00.000Z',
              status: 'resolved',
              event_type: 'knowledge_request',
              message_ids: [],
            },
          ],
        },
      }),
    )

    const result = await fetchAssistTaskEvents({
      companyId: 'company-1',
      pageIndex: 0,
      pageSize: 20,
      statusFilter: 'ignored',
      typeFilter: 'all',
      keyword: '',
    })

    expect(result.rows).toHaveLength(1)
    expect(result.rows[0]?.status).toBe('ignored')
  })

  it('fetchAssistTaskEvents 的 processing 筛选不应漏掉 processing + rejected 的人工回复事件', async () => {
    getSupabaseBrowserClientMock.mockReturnValue(
      createMockSupabaseClient({
        lucius_agent: {
          event: [
            {
              id: 'event-manual-reply-1',
              company_id: 'company-1',
              title: '人工回复后保留在处理中',
              summary: null,
              suggested_reply: '建议回复',
              client_supplemental_knowledge: null,
              context: {},
              cannot_reply_reason: '',
              platform: 'discord',
              user_id: 'user-manual-reply',
              channel_id: 'channel-manual-reply',
              channel_name: 'manual-reply',
              owner_user_id: null,
              owner_display_name: null,
              owner_avatar_url: null,
              priority: 'medium',
              manual_review_required: false,
              manual_review_status: 'rejected',
              sla_due_at: null,
              last_activity_at: '2026-03-10T10:30:00.000Z',
              created_at: '2026-03-10T10:30:00.000Z',
              updated_at: '2026-03-10T10:30:00.000Z',
              status: 'processing',
              event_type: 'manual_reply_case',
              message_ids: [],
            },
            {
              id: 'event-ignored-legacy-1',
              company_id: 'company-1',
              title: '兼容忽略事件',
              summary: null,
              suggested_reply: null,
              client_supplemental_knowledge: null,
              context: {},
              cannot_reply_reason: '',
              platform: 'discord',
              user_id: 'user-ignored',
              channel_id: 'channel-ignored',
              channel_name: 'ignored',
              owner_user_id: null,
              owner_display_name: null,
              owner_avatar_url: null,
              priority: 'medium',
              manual_review_required: false,
              manual_review_status: 'rejected',
              sla_due_at: null,
              last_activity_at: '2026-03-10T09:30:00.000Z',
              created_at: '2026-03-10T09:30:00.000Z',
              updated_at: '2026-03-10T09:30:00.000Z',
              status: 'resolved',
              event_type: 'ignored_case',
              message_ids: [],
            },
          ],
        },
      }),
    )

    const result = await fetchAssistTaskEvents({
      companyId: 'company-1',
      pageIndex: 0,
      pageSize: 20,
      statusFilter: 'processing',
      typeFilter: 'all',
      keyword: '',
    })

    expect(result.rows).toHaveLength(1)
    expect(result.rows[0]?.id).toBe('event-manual-reply-1')
    expect(result.rows[0]?.status).toBe('processing')
  })

  it('fetchAssistTaskEvents 的 all 视图应按 pending、taken_over(processing/resolved)、ignored 排序', async () => {
    getSupabaseBrowserClientMock.mockReturnValue(
      createMockSupabaseClient({
        lucius_agent: {
          event: [
            {
              id: 'event-ignored-1',
              company_id: 'company-1',
              title: '忽略事件',
              summary: null,
              suggested_reply: null,
              client_supplemental_knowledge: null,
              context: {},
              cannot_reply_reason: '',
              platform: 'discord',
              user_id: 'user-ignored',
              channel_id: 'channel-ignored',
              channel_name: 'ignored',
              owner_user_id: null,
              owner_display_name: null,
              owner_avatar_url: null,
              priority: 'medium',
              manual_review_required: false,
              manual_review_status: 'rejected',
              sla_due_at: null,
              last_activity_at: '2026-03-10T12:00:00.000Z',
              created_at: '2026-03-10T12:00:00.000Z',
              updated_at: '2026-03-10T12:00:00.000Z',
              status: 'resolved',
              event_type: 'ignored_case',
              message_ids: [],
            },
            {
              id: 'event-resolved-1',
              company_id: 'company-1',
              title: '已解决事件',
              summary: null,
              suggested_reply: null,
              client_supplemental_knowledge: null,
              context: {},
              cannot_reply_reason: '',
              platform: 'discord',
              user_id: 'user-resolved',
              channel_id: 'channel-resolved',
              channel_name: 'resolved',
              owner_user_id: null,
              owner_display_name: null,
              owner_avatar_url: null,
              priority: 'medium',
              manual_review_required: false,
              manual_review_status: 'confirmed',
              sla_due_at: null,
              last_activity_at: '2026-03-10T11:00:00.000Z',
              created_at: '2026-03-10T11:00:00.000Z',
              updated_at: '2026-03-10T11:00:00.000Z',
              status: 'resolved',
              event_type: 'resolved_case',
              message_ids: [],
            },
            {
              id: 'event-processing-1',
              company_id: 'company-1',
              title: '处理中事件',
              summary: null,
              suggested_reply: null,
              client_supplemental_knowledge: null,
              context: {},
              cannot_reply_reason: '',
              platform: 'discord',
              user_id: 'user-processing',
              channel_id: 'channel-processing',
              channel_name: 'processing',
              owner_user_id: null,
              owner_display_name: null,
              owner_avatar_url: null,
              priority: 'medium',
              manual_review_required: false,
              manual_review_status: 'confirmed',
              sla_due_at: null,
              last_activity_at: '2026-03-10T10:00:00.000Z',
              created_at: '2026-03-10T10:00:00.000Z',
              updated_at: '2026-03-10T10:00:00.000Z',
              status: 'processing',
              event_type: 'processing_case',
              message_ids: [],
            },
            {
              id: 'event-pending-1',
              company_id: 'company-1',
              title: '待处理事件',
              summary: null,
              suggested_reply: null,
              client_supplemental_knowledge: null,
              context: {},
              cannot_reply_reason: '',
              platform: 'discord',
              user_id: 'user-pending',
              channel_id: 'channel-pending',
              channel_name: 'pending',
              owner_user_id: null,
              owner_display_name: null,
              owner_avatar_url: null,
              priority: 'medium',
              manual_review_required: false,
              manual_review_status: 'confirmed',
              sla_due_at: null,
              last_activity_at: '2026-03-10T09:00:00.000Z',
              created_at: '2026-03-10T09:00:00.000Z',
              updated_at: '2026-03-10T09:00:00.000Z',
              status: 'pending',
              event_type: 'pending_case',
              message_ids: [],
            },
          ],
        },
      }),
    )

    const result = await fetchAssistTaskEvents({
      companyId: 'company-1',
      pageIndex: 0,
      pageSize: 20,
      statusFilter: 'all',
      typeFilter: 'all',
      keyword: '',
    })

    expect(result.rows.map((row) => row.id)).toEqual([
      'event-pending-1',
      'event-resolved-1',
      'event-processing-1',
      'event-ignored-1',
    ])
    expect(result.rows.map((row) => row.status)).toEqual([
      'pending',
      'resolved',
      'processing',
      'ignored',
    ])
  })

  it('fetchAssistTaskEvents 的 all 视图不应把 processing + rejected 漏出任何分组', async () => {
    getSupabaseBrowserClientMock.mockReturnValue(
      createMockSupabaseClient({
        lucius_agent: {
          event: [
            {
              id: 'event-processing-rejected-1',
              company_id: 'company-1',
              title: '人工回复事件',
              summary: null,
              suggested_reply: '建议回复',
              client_supplemental_knowledge: null,
              context: {},
              cannot_reply_reason: '',
              platform: 'discord',
              user_id: 'user-manual',
              channel_id: 'channel-manual',
              channel_name: 'manual',
              owner_user_id: null,
              owner_display_name: null,
              owner_avatar_url: null,
              priority: 'medium',
              manual_review_required: false,
              manual_review_status: 'rejected',
              sla_due_at: null,
              last_activity_at: '2026-03-10T12:00:00.000Z',
              created_at: '2026-03-10T12:00:00.000Z',
              updated_at: '2026-03-10T12:00:00.000Z',
              status: 'processing',
              event_type: 'manual_reply_case',
              message_ids: [],
            },
            {
              id: 'event-ignored-1',
              company_id: 'company-1',
              title: '忽略事件',
              summary: null,
              suggested_reply: null,
              client_supplemental_knowledge: null,
              context: {},
              cannot_reply_reason: '',
              platform: 'discord',
              user_id: 'user-ignored',
              channel_id: 'channel-ignored',
              channel_name: 'ignored',
              owner_user_id: null,
              owner_display_name: null,
              owner_avatar_url: null,
              priority: 'medium',
              manual_review_required: false,
              manual_review_status: 'rejected',
              sla_due_at: null,
              last_activity_at: '2026-03-10T11:00:00.000Z',
              created_at: '2026-03-10T11:00:00.000Z',
              updated_at: '2026-03-10T11:00:00.000Z',
              status: 'resolved',
              event_type: 'ignored_case',
              message_ids: [],
            },
          ],
        },
      }),
    )

    const result = await fetchAssistTaskEvents({
      companyId: 'company-1',
      pageIndex: 0,
      pageSize: 20,
      statusFilter: 'all',
      typeFilter: 'all',
      keyword: '',
    })

    expect(result.totalCount).toBe(2)
    expect(result.rows.map((row) => row.id)).toEqual([
      'event-processing-rejected-1',
      'event-ignored-1',
    ])
    expect(result.rows[0]?.status).toBe('processing')
    expect(result.rows[1]?.status).toBe('ignored')
  })

  it('fetchAssistTaskEvents 的 all 视图分页应跨状态分组连续取数', async () => {
    getSupabaseBrowserClientMock.mockReturnValue(
      createMockSupabaseClient({
        lucius_agent: {
          event: [
            {
              id: 'event-processing-newer',
              company_id: 'company-1',
              title: '处理中事件 1',
              summary: null,
              suggested_reply: null,
              client_supplemental_knowledge: null,
              context: {},
              cannot_reply_reason: '',
              platform: 'discord',
              user_id: 'user-processing-1',
              channel_id: 'channel-processing-1',
              channel_name: 'processing-1',
              owner_user_id: null,
              owner_display_name: null,
              owner_avatar_url: null,
              priority: 'medium',
              manual_review_required: false,
              manual_review_status: 'confirmed',
              sla_due_at: null,
              last_activity_at: '2026-03-10T11:00:00.000Z',
              created_at: '2026-03-10T11:00:00.000Z',
              updated_at: '2026-03-10T11:00:00.000Z',
              status: 'processing',
              event_type: 'processing_case',
              message_ids: [],
            },
            {
              id: 'event-resolved-1',
              company_id: 'company-1',
              title: '已解决事件',
              summary: null,
              suggested_reply: null,
              client_supplemental_knowledge: null,
              context: {},
              cannot_reply_reason: '',
              platform: 'discord',
              user_id: 'user-resolved',
              channel_id: 'channel-resolved',
              channel_name: 'resolved',
              owner_user_id: null,
              owner_display_name: null,
              owner_avatar_url: null,
              priority: 'medium',
              manual_review_required: false,
              manual_review_status: 'confirmed',
              sla_due_at: null,
              last_activity_at: '2026-03-10T10:00:00.000Z',
              created_at: '2026-03-10T10:00:00.000Z',
              updated_at: '2026-03-10T10:00:00.000Z',
              status: 'resolved',
              event_type: 'resolved_case',
              message_ids: [],
            },
            {
              id: 'event-processing-older',
              company_id: 'company-1',
              title: '处理中事件 2',
              summary: null,
              suggested_reply: null,
              client_supplemental_knowledge: null,
              context: {},
              cannot_reply_reason: '',
              platform: 'discord',
              user_id: 'user-processing-2',
              channel_id: 'channel-processing-2',
              channel_name: 'processing-2',
              owner_user_id: null,
              owner_display_name: null,
              owner_avatar_url: null,
              priority: 'medium',
              manual_review_required: false,
              manual_review_status: 'confirmed',
              sla_due_at: null,
              last_activity_at: '2026-03-10T09:00:00.000Z',
              created_at: '2026-03-10T09:00:00.000Z',
              updated_at: '2026-03-10T09:00:00.000Z',
              status: 'processing',
              event_type: 'processing_case',
              message_ids: [],
            },
            {
              id: 'event-pending-1',
              company_id: 'company-1',
              title: '待处理事件',
              summary: null,
              suggested_reply: null,
              client_supplemental_knowledge: null,
              context: {},
              cannot_reply_reason: '',
              platform: 'discord',
              user_id: 'user-pending',
              channel_id: 'channel-pending',
              channel_name: 'pending',
              owner_user_id: null,
              owner_display_name: null,
              owner_avatar_url: null,
              priority: 'medium',
              manual_review_required: false,
              manual_review_status: 'confirmed',
              sla_due_at: null,
              last_activity_at: '2026-03-10T12:00:00.000Z',
              created_at: '2026-03-10T12:00:00.000Z',
              updated_at: '2026-03-10T12:00:00.000Z',
              status: 'pending',
              event_type: 'pending_case',
              message_ids: [],
            },
            {
              id: 'event-ignored-1',
              company_id: 'company-1',
              title: '忽略事件',
              summary: null,
              suggested_reply: null,
              client_supplemental_knowledge: null,
              context: {},
              cannot_reply_reason: '',
              platform: 'discord',
              user_id: 'user-ignored',
              channel_id: 'channel-ignored',
              channel_name: 'ignored',
              owner_user_id: null,
              owner_display_name: null,
              owner_avatar_url: null,
              priority: 'medium',
              manual_review_required: false,
              manual_review_status: 'rejected',
              sla_due_at: null,
              last_activity_at: '2026-03-10T08:00:00.000Z',
              created_at: '2026-03-10T08:00:00.000Z',
              updated_at: '2026-03-10T08:00:00.000Z',
              status: 'resolved',
              event_type: 'ignored_case',
              message_ids: [],
            },
          ],
        },
      }),
    )

    const result = await fetchAssistTaskEvents({
      companyId: 'company-1',
      pageIndex: 1,
      pageSize: 2,
      statusFilter: 'all',
      typeFilter: 'all',
      keyword: '',
    })

    expect(result.totalCount).toBe(5)
    expect(result.rows.map((row) => row.id)).toEqual([
      'event-resolved-1',
      'event-processing-older',
    ])
  })

  it('fetchAssistTaskEvents 的 processing 筛选应兼容返回 taken_over 的历史 resolved 记录', async () => {
    getSupabaseBrowserClientMock.mockReturnValue(
      createMockSupabaseClient({
        lucius_agent: {
          event: [
            {
              id: 'event-ignored-1',
              company_id: 'company-1',
              title: '兼容忽略事件',
              summary: null,
              suggested_reply: null,
              client_supplemental_knowledge: null,
              context: {},
              cannot_reply_reason: '',
              platform: 'discord',
              user_id: 'user-1',
              channel_id: 'channel-1',
              channel_name: 'general',
              owner_user_id: null,
              owner_display_name: null,
              owner_avatar_url: null,
              priority: 'medium',
              manual_review_required: false,
              manual_review_status: 'rejected',
              sla_due_at: null,
              last_activity_at: '2026-03-10T08:00:00.000Z',
              created_at: '2026-03-10T08:00:00.000Z',
              updated_at: '2026-03-10T08:00:00.000Z',
              status: 'resolved',
              event_type: 'knowledge_request',
              message_ids: [],
            },
            {
              id: 'event-resolved-1',
              company_id: 'company-1',
              title: '真实已解决事件',
              summary: null,
              suggested_reply: null,
              client_supplemental_knowledge: null,
              context: {},
              cannot_reply_reason: '',
              platform: 'discord',
              user_id: 'user-2',
              channel_id: 'channel-2',
              channel_name: 'support',
              owner_user_id: null,
              owner_display_name: null,
              owner_avatar_url: null,
              priority: 'medium',
              manual_review_required: false,
              manual_review_status: 'confirmed',
              sla_due_at: null,
              last_activity_at: '2026-03-10T09:00:00.000Z',
              created_at: '2026-03-10T09:00:00.000Z',
              updated_at: '2026-03-10T09:00:00.000Z',
              status: 'resolved',
              event_type: 'incident_followup',
              message_ids: [],
            },
          ],
        },
      }),
    )

    const result = await fetchAssistTaskEvents({
      companyId: 'company-1',
      pageIndex: 0,
      pageSize: 20,
      statusFilter: 'processing',
      typeFilter: 'all',
      keyword: '',
    })

    expect(result.rows).toHaveLength(1)
    expect(result.rows[0]?.id).toBe('event-resolved-1')
    expect(result.rows[0]?.status).toBe('resolved')
  })
})
