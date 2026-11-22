import { describe, expect, it } from 'vitest'

import {
  DEFAULT_COMPANY_IDENTITY_CUSTOM,
  buildDefaultCompanyIdentitySeedRow,
} from '@/lib/default-company-identity'

describe('default-company-identity', () => {
  it('应构造带默认 Lucius custom 的 identity seed', () => {
    const row = buildDefaultCompanyIdentitySeedRow({
      companyId: '11111111-1111-4111-8111-111111111111',
    })

    expect(row).toEqual({
      company_id: '11111111-1111-4111-8111-111111111111',
      is_initialized: false,
      custom: DEFAULT_COMPANY_IDENTITY_CUSTOM,
    })
    expect(row.custom).toContain('Name: Lucius')
    expect(row.custom).toContain('Adaptive AI Operations Entity')
    expect(row.custom).toContain('Calm machine intelligence.')
  })
})
