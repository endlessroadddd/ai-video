import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  createSlackInstallUrl,
  fetchSlackChannels,
  fetchSlackIntegrationStatus,
  syncSlackIntegration,
} from '@/lib/services/slack-integration-api'

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

describe('slack-integration-api', () => {
  it('createSlackInstallUrl 应调用 install-url 接口并返回安装链接', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(createJsonResponse({ installUrl: 'https://slack.com/oauth/v2/authorize?foo=bar' }))

    vi.stubGlobal('fetch', fetchMock)

    const result = await createSlackInstallUrl({
      companyId: '11111111-1111-4111-8111-111111111111',
    })

    expect(result.installUrl).toBe('https://slack.com/oauth/v2/authorize?foo=bar')
    expect(fetchMock).toHaveBeenCalledTimes(1)

    const [requestUrl, requestInit] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(requestUrl).toBe('/api/settings/slack/install-url')
    expect(requestInit?.method).toBe('POST')
    expect(requestInit?.credentials).toBe('include')
    expect(JSON.parse(String(requestInit?.body))).toEqual({
      companyId: '11111111-1111-4111-8111-111111111111',
    })
  })

  it('fetchSlackIntegrationStatus 应发送 syncNow=false', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      createJsonResponse({
        connection: null,
        syncSummary: null,
        message: '当前公司尚未连接 Slack。',
      }),
    )

    vi.stubGlobal('fetch', fetchMock)

    await fetchSlackIntegrationStatus({
      companyId: '22222222-2222-4222-8222-222222222222',
    })

    const [requestUrl, requestInit] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(requestUrl).toBe('/api/settings/slack/sync')
    expect(requestInit?.method).toBe('POST')
    expect(JSON.parse(String(requestInit?.body))).toEqual({
      companyId: '22222222-2222-4222-8222-222222222222',
      syncNow: false,
    })
  })

  it('syncSlackIntegration 在接口错误时应抛出服务端错误消息', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      createJsonResponse(
        {
          error: '同步失败：invalid_auth',
        },
        502,
      ),
    )

    vi.stubGlobal('fetch', fetchMock)

    await expect(
      syncSlackIntegration({
        companyId: '33333333-3333-4333-8333-333333333333',
      }),
    ).rejects.toThrow('同步失败：invalid_auth')
  })

  it('fetchSlackChannels 应调用 channels 接口并透传 company_id', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      createJsonResponse({
        channels: [],
      }),
    )

    vi.stubGlobal('fetch', fetchMock)

    await fetchSlackChannels({
      companyId: '44444444-4444-4444-8444-444444444444',
    })

    const [requestUrl, requestInit] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(requestUrl).toBe('/api/settings/slack/channels?company_id=44444444-4444-4444-8444-444444444444')
    expect(requestInit?.method).toBe('GET')
    expect(requestInit?.credentials).toBe('include')
  })
})
