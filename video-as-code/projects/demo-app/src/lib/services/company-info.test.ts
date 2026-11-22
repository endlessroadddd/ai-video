import { afterEach, describe, expect, it, vi } from 'vitest'

import { createFirstCompanyForCurrentUser } from '@/lib/services/company-info'

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

describe('company-info', () => {
  it('createFirstCompanyForCurrentUser 应调用服务端 onboarding bootstrap 接口', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      createJsonResponse({
        companyId: '11111111-1111-4111-8111-111111111111',
      }),
    )

    vi.stubGlobal('fetch', fetchMock)

    const result = await createFirstCompanyForCurrentUser({
      companyInfo: {
        companyName: ' Lucius Labs ',
        website: ' https://lucius.ai ',
        description: '  AI workspace  ',
      },
    })

    expect(result.companyId).toBe('11111111-1111-4111-8111-111111111111')
    expect(fetchMock).toHaveBeenCalledTimes(1)

    const [requestUrl, requestInit] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(requestUrl).toBe('/api/onboarding/companies')
    expect(requestInit?.method).toBe('POST')
    expect(requestInit?.credentials).toBe('include')
    expect(JSON.parse(String(requestInit?.body))).toEqual({
      companyInfo: {
        companyName: 'Lucius Labs',
        website: 'https://lucius.ai',
        description: 'AI workspace',
      },
    })
  })

  it('createFirstCompanyForCurrentUser 应透传服务端错误文案', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      createJsonResponse(
        {
          error: '当前账号已有关联工作区，请刷新页面后继续。',
        },
        409,
      ),
    )

    vi.stubGlobal('fetch', fetchMock)

    await expect(
      createFirstCompanyForCurrentUser({
        companyInfo: {
          companyName: 'Lucius Labs',
          website: null,
          description: null,
        },
      }),
    ).rejects.toThrow('当前账号已有关联工作区，请刷新页面后继续。')
  })
})
