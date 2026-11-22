import { afterEach, describe, expect, it, vi } from 'vitest'
import type { SupabaseClient } from '@supabase/supabase-js'

import {
  createFeishuBot,
  fetchFeishuBots,
  fetchFeishuChannels,
  restartFeishuBot,
  updateFeishuBot,
  verifyFeishuBot,
} from '@/lib/services/feishu-integration-api'

function createFeishuSelectSupabaseMock(payload: {
  data?: unknown[]
  error?: { message?: string } | null
}): SupabaseClient {
  const orderMock = vi.fn().mockResolvedValue({
    data: payload.data || [],
    error: payload.error || null,
  })
  const eqMock = vi.fn(() => ({
    order: orderMock,
  }))
  const selectMock = vi.fn(() => ({
    eq: eqMock,
  }))
  const fromMock = vi.fn(() => ({
    select: selectMock,
  }))
  const schemaMock = vi.fn(() => ({
    from: fromMock,
  }))

  return {
    schema: schemaMock,
  } as unknown as SupabaseClient
}

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

describe('feishu-integration-api', () => {
  it('fetchFeishuBots 应调用 bots 只读接口并透传 company_id', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      createJsonResponse({
        bots: [],
      }),
    )

    vi.stubGlobal('fetch', fetchMock)

    await fetchFeishuBots({
      companyId: '11111111-1111-4111-8111-111111111111',
    })

    const [requestUrl, requestInit] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(requestUrl).toBe('/api/settings/feishu/bots?company_id=11111111-1111-4111-8111-111111111111')
    expect(requestInit?.method).toBe('GET')
    expect(requestInit?.credentials).toBe('include')
  })

  it('createFeishuBot 应调用创建接口并透传 appSecret', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      createJsonResponse({
        bot: null,
        message: 'created',
      }),
    )

    vi.stubGlobal('fetch', fetchMock)

    await createFeishuBot({
      companyId: 'company-1',
      name: 'Support Bot',
      appId: 'cli_a1b2c3',
      appSecret: 'secret-123',
      isDefault: true,
    })

    const [requestUrl, requestInit] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(requestUrl).toBe('/api/settings/feishu/bots')
    expect(requestInit?.method).toBe('POST')
    expect(JSON.parse(String(requestInit?.body))).toEqual({
      companyId: 'company-1',
      name: 'Support Bot',
      appId: 'cli_a1b2c3',
      appSecret: 'secret-123',
      isDefault: true,
    })
  })

  it('updateFeishuBot 应调用 PATCH 接口并携带 status 与可选 secret', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      createJsonResponse({
        bot: null,
        message: 'updated',
      }),
    )

    vi.stubGlobal('fetch', fetchMock)

    await updateFeishuBot({
      companyId: 'company-1',
      botId: 'bot-1',
      name: 'Support Bot 2',
      isDefault: false,
      status: 'disabled',
      appSecret: 'rotated-secret',
    })

    const [requestUrl, requestInit] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(requestUrl).toBe('/api/settings/feishu/bots/bot-1')
    expect(requestInit?.method).toBe('PATCH')
    expect(JSON.parse(String(requestInit?.body))).toEqual({
      companyId: 'company-1',
      botId: 'bot-1',
      name: 'Support Bot 2',
      isDefault: false,
      status: 'disabled',
      appSecret: 'rotated-secret',
    })
  })

  it('verifyFeishuBot 与 restartFeishuBot 应命中对应动作接口', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(createJsonResponse({ bot: null, message: 'verified' }))
      .mockResolvedValueOnce(createJsonResponse({ bot: null, message: 'restarted' }))

    vi.stubGlobal('fetch', fetchMock)

    await verifyFeishuBot({
      companyId: 'company-1',
      botId: 'bot-1',
    })
    await restartFeishuBot({
      companyId: 'company-1',
      botId: 'bot-1',
    })

    const [verifyUrl, verifyInit] = fetchMock.mock.calls[0] as [string, RequestInit]
    const [restartUrl, restartInit] = fetchMock.mock.calls[1] as [string, RequestInit]

    expect(verifyUrl).toBe('/api/settings/feishu/bots/bot-1/verify')
    expect(verifyInit?.method).toBe('POST')
    expect(JSON.parse(String(verifyInit?.body))).toEqual({
      companyId: 'company-1',
    })

    expect(restartUrl).toBe('/api/settings/feishu/bots/bot-1/restart')
    expect(restartInit?.method).toBe('POST')
    expect(JSON.parse(String(restartInit?.body))).toEqual({
      companyId: 'company-1',
    })
  })

  it('fetchFeishuChannels 应返回当前公司可用的飞书群列表', async () => {
    const supabase = createFeishuSelectSupabaseMock({
      data: [
        {
          id: 'feishu-channel-1',
          company_id: 'company-1',
          chat_id: 'oc_123',
          chat_type: 'group',
          name: '飞书客户成功群',
          owner_bot_app_id: 'bot-app-1',
        },
        {
          id: 'feishu-channel-2',
          company_id: 'company-1',
          chat_id: 'oc_456',
          chat_type: null,
          name: null,
          owner_bot_app_id: null,
        },
      ],
    })

    const result = await fetchFeishuChannels({
      companyId: 'company-1',
      supabase,
    })

    expect(result.channels).toEqual([
      {
        id: 'feishu-channel-1',
        companyId: 'company-1',
        chatId: 'oc_123',
        chatType: 'group',
        name: '飞书客户成功群',
        ownerBotAppId: 'bot-app-1',
      },
      {
        id: 'feishu-channel-2',
        companyId: 'company-1',
        chatId: 'oc_456',
        chatType: null,
        name: 'oc_456',
        ownerBotAppId: null,
      },
    ])
  })

  it('fetchFeishuChannels 查询失败时应抛出可读错误', async () => {
    const supabase = createFeishuSelectSupabaseMock({
      error: {
        message: 'permission denied for schema feishu',
      },
    })

    await expect(
      fetchFeishuChannels({
        companyId: 'company-1',
        supabase,
      }),
    ).rejects.toThrow('permission denied for schema feishu')
  })
})
