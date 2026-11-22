import { describe, expect, it } from 'vitest'

import type {
  FeishuBotRecord,
  FeishuChannelRecord,
} from '@/lib/services/feishu-integration-api'

import {
  buildFeishuBotFormSubmission,
  buildFeishuBotSummary,
  createFeishuBotFormDraft,
  groupFeishuChannelsByBot,
  resolveFeishuBotPresentationStatus,
} from '@/components/settings/feishu-integration-panel.utils'

const BOT_A: FeishuBotRecord = {
  id: 'bot-a',
  companyId: 'company-1',
  name: 'Bot A',
  appId: 'cli_a',
  tenantKey: null,
  status: 'active',
  isDefault: true,
  configVersion: 1,
  lastVerifiedAt: null,
  lastConnectedAt: null,
  lastHeartbeatAt: null,
  lastEventAt: null,
  lastError: null,
  createdAt: null,
  updatedAt: null,
}

const BOT_B: FeishuBotRecord = {
  id: 'bot-b',
  companyId: 'company-1',
  name: 'Bot B',
  appId: 'cli_b',
  tenantKey: null,
  status: 'disabled',
  isDefault: false,
  configVersion: 1,
  lastVerifiedAt: null,
  lastConnectedAt: null,
  lastHeartbeatAt: null,
  lastEventAt: null,
  lastError: null,
  createdAt: null,
  updatedAt: null,
}

describe('feishu-integration-panel.utils', () => {
  it('groupFeishuChannelsByBot 应按 ownerBotAppId 分组，并把未知归属归入 unassigned', () => {
    const channels: FeishuChannelRecord[] = [
      {
        id: 'channel-1',
        companyId: 'company-1',
        chatId: 'oc_1',
        chatType: 'group',
        name: 'Assigned',
        ownerBotAppId: 'bot-a',
      },
      {
        id: 'channel-2',
        companyId: 'company-1',
        chatId: 'oc_2',
        chatType: 'group',
        name: 'Unassigned',
        ownerBotAppId: null,
      },
      {
        id: 'channel-3',
        companyId: 'company-1',
        chatId: 'oc_3',
        chatType: 'group',
        name: 'Stale owner',
        ownerBotAppId: 'bot-missing',
      },
    ]

    const result = groupFeishuChannelsByBot([BOT_A, BOT_B], channels)

    expect(result.channelsByBotId.get('bot-a')).toEqual([channels[0]])
    expect(result.channelsByBotId.get('bot-b')).toEqual([])
    expect(result.unassignedChannels).toEqual([channels[1], channels[2]])
  })

  it('buildFeishuBotSummary 与 resolveFeishuBotPresentationStatus 应正确统计 active / error / bound', () => {
    const erroredBot: FeishuBotRecord = {
      ...BOT_B,
      status: 'active',
      lastError: 'network timeout',
    }
    const channels: FeishuChannelRecord[] = [
      {
        id: 'channel-1',
        companyId: 'company-1',
        chatId: 'oc_1',
        chatType: 'group',
        name: 'Assigned',
        ownerBotAppId: 'bot-a',
      },
      {
        id: 'channel-2',
        companyId: 'company-1',
        chatId: 'oc_2',
        chatType: 'group',
        name: 'Unassigned',
        ownerBotAppId: null,
      },
    ]

    const summary = buildFeishuBotSummary([BOT_A, erroredBot], channels)

    expect(resolveFeishuBotPresentationStatus(erroredBot)).toBe('error')
    expect(summary.totalBotCount).toBe(2)
    expect(summary.activeBotCount).toBe(1)
    expect(summary.errorBotCount).toBe(1)
    expect(summary.boundChannelCount).toBe(1)
    expect(summary.defaultBot?.id).toBe('bot-a')
  })

  it('buildFeishuBotFormSubmission 应在 create / edit 模式下生成正确 payload，并把 enabled 映射为 status', () => {
    const createDraft = createFeishuBotFormDraft('create', null)
    createDraft.name = '  Support Bot  '
    createDraft.appId = ' cli_new '
    createDraft.appSecret = ' secret-123 '
    createDraft.isDefault = true

    const editDraft = createFeishuBotFormDraft('edit', BOT_A)
    editDraft.enabled = false
    editDraft.rotateSecret = true
    editDraft.rotatedSecret = ' rotated-secret '

    expect(
      buildFeishuBotFormSubmission({
        mode: 'create',
        companyId: 'company-1',
        bot: null,
        draft: createDraft,
      }),
    ).toEqual({
      companyId: 'company-1',
      name: 'Support Bot',
      appId: 'cli_new',
      appSecret: 'secret-123',
      isDefault: true,
    })

    expect(
      buildFeishuBotFormSubmission({
        mode: 'edit',
        companyId: 'company-1',
        bot: BOT_A,
        draft: editDraft,
      }),
    ).toEqual({
      companyId: 'company-1',
      botId: 'bot-a',
      name: 'Bot A',
      isDefault: true,
      status: 'disabled',
      appSecret: 'rotated-secret',
    })
  })
})
