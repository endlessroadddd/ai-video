import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  createDiscordInstallUrl,
  fetchDiscordChannels,
  fetchDiscordIntegrationStatus,
  syncDiscordIntegration,
} from '@/lib/services/discord-integration-api'

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

describe('discord-integration-api', () => {
  it('createDiscordInstallUrl 应调用 install-url 接口并返回安装链接', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(createJsonResponse({ installUrl: 'https://discord.com/oauth2/authorize?foo=bar' }))

    vi.stubGlobal('fetch', fetchMock)

    const result = await createDiscordInstallUrl({
      companyId: '11111111-1111-4111-8111-111111111111',
    })

    expect(result.installUrl).toBe('https://discord.com/oauth2/authorize?foo=bar')
    expect(fetchMock).toHaveBeenCalledTimes(1)

    const [requestUrl, requestInit] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(requestUrl).toBe('/api/settings/discord/install-url')
    expect(requestInit?.method).toBe('POST')
    expect(requestInit?.credentials).toBe('include')
    expect(JSON.parse(String(requestInit?.body))).toEqual({
      companyId: '11111111-1111-4111-8111-111111111111',
    })
  })

  it('fetchDiscordIntegrationStatus 应发送 syncNow=false', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      createJsonResponse({
        connection: null,
        syncSummary: null,
        message: '当前公司尚未连接 Discord。',
      }),
    )

    vi.stubGlobal('fetch', fetchMock)

    await fetchDiscordIntegrationStatus({
      companyId: '22222222-2222-4222-8222-222222222222',
    })

    const [requestUrl, requestInit] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(requestUrl).toBe('/api/settings/discord/sync')
    expect(requestInit?.method).toBe('POST')
    expect(JSON.parse(String(requestInit?.body))).toEqual({
      companyId: '22222222-2222-4222-8222-222222222222',
      syncNow: false,
    })
  })

  it('syncDiscordIntegration 在接口错误时应抛出服务端错误消息', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      createJsonResponse(
        {
          error: '同步失败：missing_access',
        },
        502,
      ),
    )

    vi.stubGlobal('fetch', fetchMock)

    await expect(
      syncDiscordIntegration({
        companyId: '33333333-3333-4333-8333-333333333333',
      }),
    ).rejects.toThrow('同步失败：missing_access')
  })

  it('fetchDiscordChannels 应调用 channels 接口并透传 company_id', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      createJsonResponse({
        channels: [],
      }),
    )

    vi.stubGlobal('fetch', fetchMock)

    await fetchDiscordChannels({
      companyId: '44444444-4444-4444-8444-444444444444',
    })

    const [requestUrl, requestInit] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(requestUrl).toBe('/api/settings/discord/channels?company_id=44444444-4444-4444-8444-444444444444')
    expect(requestInit?.method).toBe('GET')
    expect(requestInit?.credentials).toBe('include')
  })
})
