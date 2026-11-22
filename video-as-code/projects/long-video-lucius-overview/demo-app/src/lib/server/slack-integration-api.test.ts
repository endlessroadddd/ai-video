import { createCipheriv, createHash } from 'node:crypto'

import { describe, expect, it } from 'vitest'

import { __slackIntegrationApiTestables } from '@/lib/server/slack-integration-api'

type TeamAvailabilityFn = typeof __slackIntegrationApiTestables.ensureSlackTeamIdAvailableForCompany
type TeamAvailabilityPayload = Parameters<TeamAvailabilityFn>[0]

type QueryRow = Record<string, unknown>

type QueryPlan = {
  table: string
  rows: QueryRow[]
}

type QueryState = {
  selectedColumns: string | null
  filters: Array<{
    column: string
    value: string
  }>
  limitValue: number | null
}

/**
 * 构造最小 Supabase 查询链 stub：
 * - 只覆盖本文件测试所需的 `schema().from().select().eq().limit()`；
 * - 通过预设 table -> rows，模拟 team_id 占用查询返回值。
 */
function createServiceClientStub(queryPlans: QueryPlan[]): TeamAvailabilityPayload['serviceClient'] {
  return {
    schema() {
      return {
        from(tableName: string) {
          const queryState: QueryState = {
            selectedColumns: null,
            filters: [],
            limitValue: null,
          }

          const executeQuery = async (): Promise<{ data: QueryRow[]; error: null }> => {
            const matchedPlan = queryPlans.find((plan) => plan.table === tableName)
            let rows = matchedPlan?.rows || []

            rows = rows.filter((row) => {
              return queryState.filters.every((filter) => row[filter.column] === filter.value)
            })

            if (typeof queryState.limitValue === 'number') {
              rows = rows.slice(0, queryState.limitValue)
            }

            if (queryState.selectedColumns) {
              const selectedColumns = queryState.selectedColumns
                .split(',')
                .map((column) => column.trim())
                .filter((column) => column.length > 0)

              rows = rows.map((row) => {
                const nextRow: QueryRow = {}
                selectedColumns.forEach((column) => {
                  nextRow[column] = row[column]
                })
                return nextRow
              })
            }

            return {
              data: rows,
              error: null,
            }
          }

          return {
            select(columns: string) {
              queryState.selectedColumns = columns
              return this
            },
            eq(column: string, value: string) {
              queryState.filters.push({ column, value })
              return this
            },
            then<TResult1 = { data: QueryRow[]; error: null }, TResult2 = never>(
              onfulfilled?:
                | ((value: { data: QueryRow[]; error: null }) => TResult1 | PromiseLike<TResult1>)
                | null,
              onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
            ): Promise<TResult1 | TResult2> {
              return executeQuery().then(onfulfilled, onrejected)
            },
            limit(limitValue: number) {
              queryState.limitValue = limitValue
              return executeQuery()
            },
          }
        },
      }
    },
  } as unknown as TeamAvailabilityPayload['serviceClient']
}

describe('server/slack-integration-api', () => {
  it('getErrorMessage 应优先提取 ApiError 风格对象中的 message', () => {
    expect(
      __slackIntegrationApiTestables.getErrorMessage(
        {
          status: 409,
          message: 'Slack OAuth 未返回有效 team_id。',
        },
        'fallback',
      ),
    ).toBe('Slack OAuth 未返回有效 team_id。')
  })

  it('getErrorMessage 在未知异常时应回退到兜底文案', () => {
    expect(__slackIntegrationApiTestables.getErrorMessage(null, 'Slack 安装回调失败。')).toBe(
      'Slack 安装回调失败。',
    )
  })

  it('buildSlackEnterpriseWorkspaceGrantUrl 应生成 Slack Admin 的 workspace 授权页', () => {
    expect(
      __slackIntegrationApiTestables.buildSlackEnterpriseWorkspaceGrantUrl({
        enterpriseId: 'E123',
        appId: 'A456',
      }),
    ).toBe('https://app.slack.com/manage/E123/integrations/profile/A456/workspaces/add')
  })

  it('assertWorkspaceScopedSlackInstall 应拒绝 Enterprise 组织级安装', () => {
    expect(() =>
      __slackIntegrationApiTestables.assertWorkspaceScopedSlackInstall({
        oauthResponse: {
          ok: true,
          access_token: 'xoxb-enterprise',
          app_id: 'A456',
          is_enterprise_install: true,
          enterprise: {
            id: 'E123',
            name: 'Lucius Org',
          },
        },
        authTest: {
          ok: true,
          app_id: 'A456',
          enterprise_id: 'E123',
          is_enterprise_install: true,
        },
      }),
    ).toThrow(/Enterprise 组织级安装/)
  })

  it('assertWorkspaceScopedSlackInstall 应允许普通 workspace 安装继续执行', () => {
    expect(() =>
      __slackIntegrationApiTestables.assertWorkspaceScopedSlackInstall({
        oauthResponse: {
          ok: true,
          access_token: 'xoxb-workspace',
          app_id: 'A456',
          team: {
            id: 'T12345678',
            name: 'Lucius',
          },
        },
        authTest: {
          ok: true,
          team: 'Lucius',
          team_id: 'T12345678',
          user_id: 'U123',
        },
      }),
    ).not.toThrow()
  })

  it('buildSlackInstallScope 应强制补齐消息监听所需 scope', () => {
    expect(__slackIntegrationApiTestables.buildSlackInstallScope('channels:read,chat:write')).toBe(
      'channels:read,channels:history,groups:read,groups:history,chat:write,commands,users:read',
    )
  })

  it('ensureRequiredSlackInstallScopes 应拒绝缺少 users:read 的安装结果', () => {
    expect(() =>
      __slackIntegrationApiTestables.ensureRequiredSlackInstallScopes(
        'channels:read,channels:history,groups:read,groups:history,chat:write,commands',
      ),
    ).toThrow(/users:read/)
  })

  it('getSlackWorkspaceCredential 应优先读取 installation 密文', () => {
    const secret = 'integration-secret'
    const getCredential = __slackIntegrationApiTestables.getSlackWorkspaceCredential

    const workspaceCipher = 'enc.v1.invalid.payload'
    const installationCipher = (() => {
      const key = createHash('sha256').update(secret, 'utf8').digest()
      const iv = Buffer.from('123456789012')
      const cipher = createCipheriv('aes-256-gcm', key, iv)
      const plaintext = JSON.stringify({
        accessToken: 'xoxb-installation',
        enterpriseId: 'E123',
      })
      const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
      const authTag = cipher.getAuthTag()
      return ['enc.v1', iv.toString('base64url'), ciphertext.toString('base64url'), authTag.toString('base64url')].join('.')
    })()

    expect(
      getCredential({
        installationCiphertext: installationCipher,
        encryptedValue: workspaceCipher,
        workspaceEnterpriseId: 'E-real',
        secret,
        fallbackBotToken: 'xoxb-fallback',
      }),
    ).toEqual({
      accessToken: 'xoxb-installation',
      enterpriseId: 'E123',
    })
  })

  it('当 team id 已被其他公司占用时应拒绝绑定（409）', async () => {
    const serviceClient = createServiceClientStub([
      {
        table: 'workspace',
        rows: [
          {
            company_id: 'company-b',
            team_id: 'T12345678',
          },
        ],
      },
      {
        table: 'connection',
        rows: [],
      },
    ])

    await expect(
      __slackIntegrationApiTestables.ensureSlackTeamIdAvailableForCompany({
        serviceClient,
        companyId: 'company-a',
        teamId: 'T12345678',
      }),
    ).rejects.toMatchObject({
      status: 409,
    })
  })

  it('当 team id 尚未被其他公司占用时允许继续安装', async () => {
    const serviceClient = createServiceClientStub([
      {
        table: 'workspace',
        rows: [
          {
            company_id: 'company-a',
            team_id: 'T12345678',
          },
        ],
      },
      {
        table: 'connection',
        rows: [
          {
            company_id: 'company-a',
            platform: 'slack',
            external_workspace_id: 'T12345678',
            external_workspace_name: 'Lucius Lab',
            status: 'connected',
          },
        ],
      },
    ])

    await expect(
      __slackIntegrationApiTestables.ensureSlackTeamIdAvailableForCompany({
        serviceClient,
        companyId: 'company-a',
        teamId: 'T12345678',
      }),
    ).resolves.toBeUndefined()
  })
})
