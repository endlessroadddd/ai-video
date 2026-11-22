import { afterEach, describe, expect, it, vi } from 'vitest'
import type { SupabaseClient } from '@supabase/supabase-js'

const {
  fetchDiscordChannelsMock,
  fetchDiscordIntegrationStatusMock,
  fetchFeishuChannelsMock,
  fetchSlackChannelsMock,
  fetchSlackIntegrationStatusMock,
  fetchTelegramBoundChannelsMock,
} = vi.hoisted(() => ({
  fetchDiscordChannelsMock: vi.fn(),
  fetchDiscordIntegrationStatusMock: vi.fn(),
  fetchFeishuChannelsMock: vi.fn(),
  fetchSlackChannelsMock: vi.fn(),
  fetchSlackIntegrationStatusMock: vi.fn(),
  fetchTelegramBoundChannelsMock: vi.fn(),
}))

vi.mock('@/lib/services/discord-integration-api', () => ({
  fetchDiscordChannels: fetchDiscordChannelsMock,
  fetchDiscordIntegrationStatus: fetchDiscordIntegrationStatusMock,
}))

vi.mock('@/lib/services/feishu-integration-api', () => ({
  fetchFeishuChannels: fetchFeishuChannelsMock,
}))

vi.mock('@/lib/services/slack-integration-api', () => ({
  fetchSlackChannels: fetchSlackChannelsMock,
  fetchSlackIntegrationStatus: fetchSlackIntegrationStatusMock,
}))

vi.mock('@/lib/services/telegram-integration-api', () => ({
  fetchTelegramBoundChannels: fetchTelegramBoundChannelsMock,
}))

import {
  deleteCompanyWorkgroupChannel,
  fetchCompanyWorkgroupChannels,
  fetchWorkgroupSettingsSnapshot,
  mergeWorkgroupChannelOptions,
  upsertCompanyWorkgroupChannel,
} from '@/lib/services/workgroup-settings'

function createSelectSupabaseMock(payload: {
  data?: unknown[]
  error?: { code?: string; message?: string } | null
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

function createUpsertSupabaseMock(payload: {
  data?: unknown
  error?: { code?: string; message?: string } | null
}) {
  const singleMock = vi.fn().mockResolvedValue({
    data: payload.data || null,
    error: payload.error || null,
  })
  const selectMock = vi.fn(() => ({
    single: singleMock,
  }))
  const upsertMock = vi.fn(() => ({
    select: selectMock,
  }))
  const fromMock = vi.fn(() => ({
    upsert: upsertMock,
  }))
  const schemaMock = vi.fn(() => ({
    from: fromMock,
  }))

  return {
    supabase: {
      schema: schemaMock,
    } as unknown as SupabaseClient,
    upsertMock,
  }
}

function createDeleteSupabaseMock(payload: {
  error?: { code?: string; message?: string } | null
}) {
  const eqThirdMock = vi.fn().mockResolvedValue({
    error: payload.error || null,
  })
  const eqSecondMock = vi.fn(() => ({
    eq: eqThirdMock,
  }))
  const eqFirstMock = vi.fn(() => ({
    eq: eqSecondMock,
  }))
  const deleteMock = vi.fn(() => ({
    eq: eqFirstMock,
  }))
  const fromMock = vi.fn(() => ({
    delete: deleteMock,
  }))
  const schemaMock = vi.fn(() => ({
    from: fromMock,
  }))

  return {
    supabase: {
      schema: schemaMock,
    } as unknown as SupabaseClient,
    eqFirstMock,
    eqSecondMock,
    eqThirdMock,
  }
}

afterEach(() => {
  vi.clearAllMocks()
})

describe('workgroup-settings', () => {
  it('mergeWorkgroupChannelOptions 应合并实时候选与 stale 已选项', () => {
    const options = mergeWorkgroupChannelOptions({
      platform: 'slack',
      availableChannels: [
        {
          platform: 'slack',
          channelId: 'C-1',
          channelName: '研发群',
          channelMeta: 'Public',
        },
      ],
      selectedChannels: [
        {
          id: 'saved-1',
          companyId: 'company-1',
          platform: 'slack',
          channelId: 'C-2',
          channelName: '历史频道',
          createdAt: '2026-03-08T00:00:00.000Z',
          updatedAt: '2026-03-08T00:00:00.000Z',
        },
        {
          id: 'saved-2',
          companyId: 'company-1',
          platform: 'slack',
          channelId: 'C-1',
          channelName: '研发群',
          createdAt: '2026-03-08T00:00:00.000Z',
          updatedAt: '2026-03-08T00:00:00.000Z',
        },
      ],
    })

    expect(options).toHaveLength(2)
    expect(options[0]).toMatchObject({
      channelId: 'C-2',
      isSelected: true,
      isStale: true,
    })
    expect(options[1]).toMatchObject({
      channelId: 'C-1',
      isSelected: true,
      isStale: false,
    })
  })

  it('fetchCompanyWorkgroupChannels 缺表时应返回迁移提示', async () => {
    const supabase = createSelectSupabaseMock({
      error: {
        code: '42P01',
        message: 'relation "integration.workgroup_channel" does not exist',
      },
    })

    await expect(
      fetchCompanyWorkgroupChannels({
        companyId: 'company-1',
        supabase,
      }),
    ).rejects.toThrow('工作群设置表尚未创建，请先执行最新数据库迁移。')
  })

  it('fetchWorkgroupSettingsSnapshot 应聚合平台状态与已选工作群', async () => {
    const supabase = createSelectSupabaseMock({
      data: [
        {
          id: 'selected-discord',
          company_id: 'company-1',
          platform: 'discord',
          channel_id: 'D-1',
          channel_name: '售后答疑',
          created_at: '2026-03-08T00:00:00.000Z',
          updated_at: '2026-03-08T00:00:00.000Z',
        },
        {
          id: 'selected-slack-stale',
          company_id: 'company-1',
          platform: 'slack',
          channel_id: 'S-2',
          channel_name: '历史频道',
          created_at: '2026-03-08T00:00:00.000Z',
          updated_at: '2026-03-08T00:00:00.000Z',
        },
      ],
    })

    fetchDiscordChannelsMock.mockResolvedValue({
      channels: [
        {
          id: 'discord-channel-1',
          channelId: 'D-1',
          guildId: 'guild-1',
          name: '售后答疑',
          channelType: 0,
          parentId: null,
        },
        {
          id: 'discord-channel-2',
          channelId: 'D-2',
          guildId: 'guild-1',
          name: '分类目录',
          channelType: 4,
          parentId: null,
        },
      ],
    })

    fetchSlackChannelsMock.mockResolvedValue({
      channels: [
        {
          id: 'slack-channel-1',
          channelId: 'S-1',
          name: '产品同步',
          channelType: 'public_channel',
          isPrivate: false,
        },
      ],
    })

    fetchTelegramBoundChannelsMock.mockResolvedValue({
      channels: [
        {
          id: 'telegram-channel-1',
          chatId: 'T-1',
          chatType: 'supergroup',
          name: 'Telegram 支持群',
          username: 'lucius_support',
          isPrivate: false,
          createdAt: '2026-03-08T00:00:00.000Z',
        },
      ],
    })

    fetchFeishuChannelsMock.mockResolvedValue({
      channels: [
        {
          id: 'feishu-channel-1',
          companyId: 'company-1',
          chatId: 'F-1',
          chatType: 'group',
          name: '飞书客户成功群',
        },
      ],
    })

    fetchDiscordIntegrationStatusMock.mockResolvedValue({
      connection: {
        companyId: 'company-1',
        platform: 'discord',
        externalWorkspaceId: 'guild-1',
        externalWorkspaceName: 'Lucius Discord',
        status: 'connected',
        updatedAt: '2026-03-08T00:00:00.000Z',
      },
      syncSummary: null,
      message: null,
    })

    fetchSlackIntegrationStatusMock.mockResolvedValue({
      connection: {
        companyId: 'company-1',
        platform: 'slack',
        externalWorkspaceId: 'team-1',
        externalWorkspaceName: 'Lucius Slack',
        status: 'connected',
      },
      syncSummary: null,
      message: null,
    })

    const snapshot = await fetchWorkgroupSettingsSnapshot({
      companyId: 'company-1',
      canManage: true,
      supabase,
    })

    expect(snapshot.totalSelectedCount).toBe(2)

    const discordPlatform = snapshot.platforms.find((platform) => platform.platform === 'discord')
    const feishuPlatform = snapshot.platforms.find((platform) => platform.platform === 'feishu')
    const slackPlatform = snapshot.platforms.find((platform) => platform.platform === 'slack')
    const telegramPlatform = snapshot.platforms.find((platform) => platform.platform === 'telegram')

    expect(discordPlatform).toMatchObject({
      state: 'ready',
      selectedCount: 1,
    })
    expect(discordPlatform?.channelOptions).toHaveLength(1)
    expect(discordPlatform?.channelOptions[0]).toMatchObject({
      channelId: 'D-1',
      isSelected: true,
      isStale: false,
    })

    expect(slackPlatform).toMatchObject({
      state: 'ready',
      selectedCount: 1,
    })
    expect(slackPlatform?.channelOptions[0]).toMatchObject({
      channelId: 'S-2',
      isSelected: true,
      isStale: true,
    })
    expect(slackPlatform?.channelOptions[1]).toMatchObject({
      channelId: 'S-1',
      isSelected: false,
      isStale: false,
    })

    expect(feishuPlatform).toMatchObject({
      state: 'ready',
      selectedCount: 0,
    })
    expect(feishuPlatform?.channelOptions[0]).toMatchObject({
      channelId: 'F-1',
      isSelected: false,
      isStale: false,
    })

    expect(telegramPlatform).toMatchObject({
      state: 'ready',
      selectedCount: 0,
    })
    expect(fetchDiscordIntegrationStatusMock).toHaveBeenCalledWith({
      companyId: 'company-1',
    })
    expect(fetchSlackIntegrationStatusMock).toHaveBeenCalledWith({
      companyId: 'company-1',
    })
    expect(fetchFeishuChannelsMock).toHaveBeenCalledWith({
      companyId: 'company-1',
      supabase,
    })
  })

  it('upsertCompanyWorkgroupChannel 应按复合唯一键写入', async () => {
    const { supabase, upsertMock } = createUpsertSupabaseMock({
      data: {
        id: 'saved-1',
        company_id: 'company-1',
        platform: 'telegram',
        channel_id: 'T-1',
        channel_name: 'Telegram 支持群',
        created_at: '2026-03-08T00:00:00.000Z',
        updated_at: '2026-03-08T01:00:00.000Z',
      },
    })

    const result = await upsertCompanyWorkgroupChannel({
      companyId: 'company-1',
      platform: 'telegram',
      channelId: 'T-1',
      channelName: 'Telegram 支持群',
      supabase,
    })

    expect(result).toMatchObject({
      companyId: 'company-1',
      platform: 'telegram',
      channelId: 'T-1',
    })
    expect(upsertMock).toHaveBeenCalledTimes(1)

    const firstCall = (
      upsertMock.mock.calls as unknown as Array<[Record<string, unknown>, Record<string, unknown>]>
    )[0]
    expect(firstCall).toBeDefined()

    const rowPayload = firstCall[0]
    const options = firstCall[1]
    expect(rowPayload.company_id).toBe('company-1')
    expect(rowPayload.platform).toBe('telegram')
    expect(rowPayload.channel_id).toBe('T-1')
    expect(options).toEqual({
      onConflict: 'company_id,platform,channel_id',
    })
  })

  it('deleteCompanyWorkgroupChannel 应按 company/platform/channel 精确删除', async () => {
    const { supabase, eqFirstMock, eqSecondMock, eqThirdMock } = createDeleteSupabaseMock({
      error: null,
    })

    await deleteCompanyWorkgroupChannel({
      companyId: 'company-1',
      platform: 'discord',
      channelId: 'D-1',
      supabase,
    })

    expect(eqFirstMock).toHaveBeenCalledWith('company_id', 'company-1')
    expect(eqSecondMock).toHaveBeenCalledWith('platform', 'discord')
    expect(eqThirdMock).toHaveBeenCalledWith('channel_id', 'D-1')
  })
})
