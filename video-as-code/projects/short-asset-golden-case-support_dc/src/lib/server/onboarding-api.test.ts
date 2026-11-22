import { afterEach, describe, expect, it, vi } from 'vitest'

const {
  createSupabaseServerClientForRequestMock,
  createSupabaseServiceRoleClientMock,
  resolveSupabaseAuthUserEmailMock,
} = vi.hoisted(() => ({
  createSupabaseServerClientForRequestMock: vi.fn(),
  createSupabaseServiceRoleClientMock: vi.fn(),
  resolveSupabaseAuthUserEmailMock: vi.fn(),
}))

vi.mock('@/lib/supabase/server', () => ({
  createSupabaseServerClientForRequest: createSupabaseServerClientForRequestMock,
  createSupabaseServiceRoleClient: createSupabaseServiceRoleClientMock,
}))

vi.mock('@/lib/supabase/auth-user', () => ({
  resolveSupabaseAuthUserEmail: resolveSupabaseAuthUserEmailMock,
}))

import { buildDefaultCompanyFlowSeedRows } from '@/lib/default-company-flows'
import { buildDefaultCompanyIdentitySeedRow } from '@/lib/default-company-identity'
import { handleOnboardingApi } from '@/lib/server/onboarding-api'

type MockSupabaseResult<TData> = {
  data: TData
  error: null | {
    message: string
  }
}

function createMockServiceRoleClient() {
  const membershipLookupBuilder = {
    eq: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn<() => Promise<MockSupabaseResult<null>>>().mockResolvedValue({
      data: null,
      error: null,
    }),
  }

  const membershipUpsertBuilder = {
    select: vi.fn().mockReturnThis(),
    single: vi
      .fn<() => Promise<MockSupabaseResult<{ id: string }>>>()
      .mockResolvedValue({
        data: { id: 'member-1' },
        error: null,
      }),
  }

  const companyInsertBuilder = {
    select: vi.fn().mockReturnThis(),
    single: vi
      .fn<() => Promise<MockSupabaseResult<{ id: string }>>>()
      .mockResolvedValue({
        data: { id: 'company-1' },
        error: null,
      }),
  }

  const companyDeleteBuilder = {
    eq: vi.fn<() => Promise<MockSupabaseResult<null>>>().mockResolvedValue({
      data: null,
      error: null,
    }),
  }

  const companyTable = {
    insert: vi.fn(() => companyInsertBuilder),
    delete: vi.fn(() => companyDeleteBuilder),
  }

  const organizationMemberTable = {
    select: vi.fn(() => membershipLookupBuilder),
    upsert: vi.fn(() => membershipUpsertBuilder),
  }

  const identityUpsertMock = vi
    .fn<() => Promise<MockSupabaseResult<null>>>()
    .mockResolvedValue({
      data: null,
      error: null,
    })

  const identityTable = {
    upsert: identityUpsertMock,
  }

  const eventTypeConfigSelectMock = vi
    .fn<() => Promise<MockSupabaseResult<Array<{ id: string; type_key: string }>>>>()
    .mockResolvedValue({
      data: [
        {
          id: 'type-config-1',
          type_key: 'EXCEPTION_ISSUE',
        },
      ],
      error: null,
    })

  const eventTypeConfigTable = {
    upsert: vi.fn(() => ({
      select: eventTypeConfigSelectMock,
    })),
  }

  const eventNotificationTargetTable = {
    upsert: vi.fn<() => Promise<MockSupabaseResult<null>>>().mockResolvedValue({
      data: null,
      error: null,
    }),
  }

  const flowInsertMock = vi
    .fn<() => Promise<MockSupabaseResult<null>>>()
    .mockResolvedValue({
      data: null,
      error: null,
    })

  const flowTable = {
    insert: flowInsertMock,
  }

  const luciusAgentSchema = {
    from: vi.fn((tableName: string) => {
      if (tableName === 'identity') {
        return identityTable
      }

      if (tableName === 'event_type_config') {
        return eventTypeConfigTable
      }

      if (tableName === 'event_notification_target') {
        return eventNotificationTargetTable
      }

      if (tableName === 'flow') {
        return flowTable
      }

      throw new Error(`Unexpected lucius_agent table: ${tableName}`)
    }),
  }

  const permissionSchema = {
    from: vi.fn((tableName: string) => {
      if (tableName === 'organization_member') {
        return organizationMemberTable
      }

      throw new Error(`Unexpected permission table: ${tableName}`)
    }),
  }

  const serviceClient = {
    from: vi.fn((tableName: string) => {
      if (tableName === 'company') {
        return companyTable
      }

      throw new Error(`Unexpected public table: ${tableName}`)
    }),
    schema: vi.fn((schemaName: string) => {
      if (schemaName === 'permission') {
        return permissionSchema
      }

      if (schemaName === 'lucius_agent') {
        return luciusAgentSchema
      }

      throw new Error(`Unexpected schema: ${schemaName}`)
    }),
  }

  return {
    serviceClient,
    flowInsertMock,
    identityUpsertMock,
    eventNotificationTargetTable,
  }
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('onboarding-api 工作区 bootstrap', () => {
  it('创建 company 时应同步写入默认 Lucius identity', async () => {
    const authClient = {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: {
            user: {
              id: 'user-1',
              email: null,
            },
          },
          error: null,
        }),
      },
    }

    const { serviceClient, flowInsertMock, identityUpsertMock, eventNotificationTargetTable } =
      createMockServiceRoleClient()

    createSupabaseServerClientForRequestMock.mockReturnValue(authClient)
    createSupabaseServiceRoleClientMock.mockReturnValue(serviceClient)
    resolveSupabaseAuthUserEmailMock.mockReturnValue('owner@example.com')

    const response = await handleOnboardingApi(
      new Request('http://localhost:3000/api/onboarding/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyInfo: {
            companyName: 'Lucius AI',
            website: 'https://lucius.ai',
            description: 'AI operations',
          },
        }),
      }),
    )

    expect(response.status).toBe(201)
    await expect(response.json()).resolves.toEqual({
      companyId: 'company-1',
    })

    expect(identityUpsertMock).toHaveBeenCalledTimes(1)
    expect(identityUpsertMock).toHaveBeenCalledWith(
      buildDefaultCompanyIdentitySeedRow({
        companyId: 'company-1',
      }),
      {
        onConflict: 'company_id',
      },
    )

    expect(eventNotificationTargetTable.upsert).toHaveBeenCalledTimes(1)
    expect(flowInsertMock).toHaveBeenCalledTimes(1)
    expect(flowInsertMock).toHaveBeenCalledWith(
      buildDefaultCompanyFlowSeedRows({
        companyId: 'company-1',
      }),
    )
  })
})
