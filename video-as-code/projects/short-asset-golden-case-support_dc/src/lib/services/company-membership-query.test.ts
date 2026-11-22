import { describe, expect, it } from 'vitest'

import { upsertUserCompany, type UserCompany } from '@/lib/services/company-membership-query'

function createUserCompany(overrides: Partial<UserCompany> = {}): UserCompany {
  return {
    companyId: '11111111-1111-4111-8111-111111111111',
    companyName: 'Alpha',
    logoUrl: null,
    memberRole: 'member',
    ...overrides,
  }
}

describe('company-membership-query', () => {
  it('upsertUserCompany 在公司不存在时应追加到列表末尾', () => {
    const companies = [createUserCompany()]

    const nextCompanies = upsertUserCompany(
      companies,
      createUserCompany({
        companyId: '22222222-2222-4222-8222-222222222222',
        companyName: 'Beta',
        memberRole: 'admin',
      }),
    )

    expect(nextCompanies).toEqual([
      companies[0],
      createUserCompany({
        companyId: '22222222-2222-4222-8222-222222222222',
        companyName: 'Beta',
        memberRole: 'admin',
      }),
    ])
  })

  it('upsertUserCompany 在公司已存在时应原位更新而不是重复追加', () => {
    const companies = [
      createUserCompany(),
      createUserCompany({
        companyId: '22222222-2222-4222-8222-222222222222',
        companyName: 'Beta',
      }),
    ]

    const nextCompanies = upsertUserCompany(
      companies,
      createUserCompany({
        companyId: '22222222-2222-4222-8222-222222222222',
        companyName: 'Beta Team',
        memberRole: 'admin',
      }),
    )

    expect(nextCompanies).toEqual([
      companies[0],
      createUserCompany({
        companyId: '22222222-2222-4222-8222-222222222222',
        companyName: 'Beta Team',
        memberRole: 'admin',
      }),
    ])
  })
})
