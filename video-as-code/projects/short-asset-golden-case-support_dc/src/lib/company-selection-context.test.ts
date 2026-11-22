// @vitest-environment jsdom

import { QueryClient } from '@tanstack/react-query'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { getSelectedCompanyId } from '@/lib/company-selection'
import { activateSelectedCompanyContext } from '@/lib/company-selection-context'
import { companyKeys, type UserCompany } from '@/lib/services/company-membership-query'

function createUserCompany(overrides: Partial<UserCompany> = {}): UserCompany {
  return {
    companyId: '11111111-1111-4111-8111-111111111111',
    companyName: 'Alpha',
    logoUrl: null,
    memberRole: 'member',
    ...overrides,
  }
}

describe('company-selection-context', () => {
  beforeEach(() => {
    const storage = new Map<string, string>()

    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: {
        getItem: (key: string): string | null => storage.get(key) ?? null,
        setItem: (key: string, value: string): void => {
          storage.set(key, value)
        },
        removeItem: (key: string): void => {
          storage.delete(key)
        },
      },
    })
  })

  afterEach(() => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: undefined,
    })
  })

  it('切换到新公司时应先补齐公司列表缓存，再写入 selected company_id', () => {
    const queryClient = new QueryClient()
    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries')
    const alphaCompany = createUserCompany()
    const betaCompany = createUserCompany({
      companyId: '22222222-2222-4222-8222-222222222222',
      companyName: 'Beta',
      memberRole: 'admin',
    })

    queryClient.setQueryData<UserCompany[]>(companyKeys.byCurrentUser(), [alphaCompany])

    activateSelectedCompanyContext({
      companyId: betaCompany.companyId,
      queryClient,
      company: betaCompany,
    })

    expect(getSelectedCompanyId()).toBe(betaCompany.companyId)
    expect(queryClient.getQueryData<UserCompany[]>(companyKeys.byCurrentUser())).toEqual([
      alphaCompany,
      betaCompany,
    ])
    expect(invalidateQueriesSpy).not.toHaveBeenCalled()
  })

  it('缺少公司详情时也应至少更新 selected company_id', () => {
    const queryClient = new QueryClient()
    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries')

    activateSelectedCompanyContext({
      companyId: '33333333-3333-4333-8333-333333333333',
      queryClient,
    })

    expect(getSelectedCompanyId()).toBe('33333333-3333-4333-8333-333333333333')
    expect(invalidateQueriesSpy).toHaveBeenCalledTimes(1)
  })
})
