import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  fetchDiscordTicketPanelsSnapshot,
  publishDiscordTicketPanel,
} from '@/lib/services/discord-ticket-panels-api'

function createJsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('discord-ticket-panels-api', () => {
  it('fetchDiscordTicketPanelsSnapshot 应请求 ticket panel 快照接口', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      createJsonResponse({
        guildId: 'guild-1',
        defaultConfig: {
          panelName: 'Support',
          panelChannelId: 'channel-1',
          categoryId: 'category-1',
          closedCategoryId: 'closed-category-1',
          staffRoleIds: ['role-1'],
          panelMessageTemplate: 'template',
          ticketMessageTemplate: 'ticket',
          introMessageTemplate: null,
          formQuestions: [],
        },
        panels: [],
        publishChannels: [],
        categoryChannels: [],
        roleOptions: [],
      }),
    )

    vi.stubGlobal('fetch', fetchMock)

    const result = await fetchDiscordTicketPanelsSnapshot({
      companyId: '11111111-1111-4111-8111-111111111111',
    })

    expect(result.guildId).toBe('guild-1')
    expect(fetchMock).toHaveBeenCalledTimes(1)

    const [requestUrl, requestInit] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(requestUrl).toBe(
      '/api/settings/discord/ticket-panels?company_id=11111111-1111-4111-8111-111111111111',
    )
    expect(requestInit?.method).toBe('GET')
    expect(requestInit?.credentials).toBe('include')
  })

  it('publishDiscordTicketPanel 应透传表单内容到 publish 接口', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      createJsonResponse({
        messageId: 'message-1',
        channelId: 'channel-1',
      }),
    )

    vi.stubGlobal('fetch', fetchMock)

    const result = await publishDiscordTicketPanel({
      companyId: '22222222-2222-4222-8222-222222222222',
      channelId: 'channel-1',
      panelName: 'Billing Support',
      categoryId: 'category-1',
      closedCategoryId: 'closed-category-1',
      staffRoleIds: ['role-1', 'role-2'],
      panelMessageTemplate: 'panel-template',
      ticketMessageTemplate: 'ticket-template',
      introMessageTemplate: null,
      formQuestions: [
        {
          title: 'Order ID',
          required: true,
          multiline: false,
        },
      ],
    })

    expect(result.messageId).toBe('message-1')
    expect(fetchMock).toHaveBeenCalledTimes(1)

    const [requestUrl, requestInit] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(requestUrl).toBe('/api/settings/discord/ticket-panels/publish')
    expect(requestInit?.method).toBe('POST')
    expect(requestInit?.credentials).toBe('include')
    expect(JSON.parse(String(requestInit?.body))).toEqual({
      companyId: '22222222-2222-4222-8222-222222222222',
      channelId: 'channel-1',
      panelName: 'Billing Support',
      categoryId: 'category-1',
      closedCategoryId: 'closed-category-1',
      staffRoleIds: ['role-1', 'role-2'],
      panelMessageTemplate: 'panel-template',
      ticketMessageTemplate: 'ticket-template',
      introMessageTemplate: null,
      formQuestions: [
        {
          title: 'Order ID',
          required: true,
          multiline: false,
        },
      ],
    })
  })

  it('publishDiscordTicketPanel 在接口错误时应抛出服务端消息', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      createJsonResponse(
        {
          error: '发布失败：channel 不存在',
        },
        422,
      ),
    )

    vi.stubGlobal('fetch', fetchMock)

    await expect(
      publishDiscordTicketPanel({
        companyId: '33333333-3333-4333-8333-333333333333',
        channelId: 'channel-x',
        staffRoleIds: [],
      }),
    ).rejects.toThrow('发布失败：channel 不存在')
  })
})
