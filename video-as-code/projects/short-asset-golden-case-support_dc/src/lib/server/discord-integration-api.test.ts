import { describe, expect, it } from 'vitest'

import { __discordIntegrationApiTestables } from '@/lib/server/discord-integration-api'

describe('server/discord-integration-api', () => {
  it('buildDiscordTicketBotApiUrl 应支持根路径 base url', () => {
    expect(
      __discordIntegrationApiTestables.buildDiscordTicketBotApiUrl(
        'https://bot.example.com',
        '/panels/publish',
      ),
    ).toBe('https://bot.example.com/v2/interaction/tickets/panels/publish')
  })

  it('buildDiscordTicketBotApiUrl 应支持已带 interaction 前缀的 base url', () => {
    expect(
      __discordIntegrationApiTestables.buildDiscordTicketBotApiUrl(
        'https://bot.example.com/v2/interaction',
        '/panels/edit',
      ),
    ).toBe('https://bot.example.com/v2/interaction/tickets/panels/edit')
  })

  it('buildDiscordTicketConfigWriteData 应只写已传字段并做规范化', () => {
    const writeData = __discordIntegrationApiTestables.buildDiscordTicketConfigWriteData({
      channelId: 'channel-1',
      requestBody: {
        channelId: 'channel-1',
        companyId: '11111111-1111-4111-8111-111111111111',
        panelName: ' Billing Support ',
        categoryId: '   ',
        closedCategoryId: ' closed-category-1 ',
        staffRoleIds: [' role-1 ', '', 'role-2'],
        ticketMessageTemplate: '   ',
        introMessageTemplate: ' hello ',
        formQuestions: [
          {
            title: ' Order ID ',
            required: true,
            multiline: false,
          },
          {
            title: '   ',
            required: false,
            multiline: true,
          },
        ],
      },
    })

    expect(writeData).toEqual({
      panel_channel_id: 'channel-1',
      panel_name: 'Billing Support',
      category_id: null,
      closed_category_id: 'closed-category-1',
      staff_role_ids: ['role-1', 'role-2'],
      ticket_message_template: null,
      intro_message_template: 'hello',
      form_questions: [
        {
          title: 'Order ID',
          required: true,
          multiline: false,
        },
      ],
    })
    expect(writeData).not.toHaveProperty('panel_message_template')
  })

  it('resolveDiscordTicketPublishState 应优先使用请求覆盖值并回退到现有配置', () => {
    const resolvedState = __discordIntegrationApiTestables.resolveDiscordTicketPublishState({
      requestBody: {
        companyId: '22222222-2222-4222-8222-222222222222',
        channelId: 'channel-2',
        panelMessageTemplate: null,
      },
      configRow: {
        id: 'config-1',
        guild_id: 'guild-1',
        category_id: 'category-1',
        closed_category_id: 'closed-category-1',
        panel_channel_id: 'channel-2',
        staff_role_ids: ['role-a'],
        panel_name: 'Support',
        panel_message_template: 'panel-template',
        ticket_message_template: 'ticket-template',
        intro_message_template: 'intro-template',
        form_questions: [
          {
            title: 'Email',
            required: true,
            multiline: false,
          },
        ],
      },
    })

    expect(resolvedState).toEqual({
      panelName: 'Support',
      categoryId: 'category-1',
      closedCategoryId: 'closed-category-1',
      staffRoleIds: ['role-a'],
      panelMessageTemplate: null,
      ticketMessageTemplate: 'ticket-template',
      introMessageTemplate: 'intro-template',
      formQuestions: [
        {
          title: 'Email',
          required: true,
          multiline: false,
        },
      ],
    })
  })

  it('resolveDiscordTicketGuildBinding 应将 external_workspace_id 视为 guild_id，并使用 guild 表主键作为内部标识', () => {
    const resolvedBinding = __discordIntegrationApiTestables.resolveDiscordTicketGuildBinding({
      connectionGuildId: '1481124182359281674',
      guild: {
        id: 'guild-row-uuid',
        guild_id: '1481124182359281674',
        name: 'Lucius Lab',
      },
    })

    expect(resolvedBinding).toEqual({
      guildId: '1481124182359281674',
      guildRecordId: 'guild-row-uuid',
    })
  })

  it('buildDiscordTicketScopeWriteData 应产出 ticket_tool 新约束所需的作用域字段', () => {
    const scopeWriteData = __discordIntegrationApiTestables.buildDiscordTicketScopeWriteData({
      companyId: '11111111-1111-4111-8111-111111111111',
      guildId: '1481124182359281674',
      guildRecordId: 'guild-row-uuid',
    })

    expect(scopeWriteData).toEqual({
      company_id: '11111111-1111-4111-8111-111111111111',
      guild_id: '1481124182359281674',
      guild_uuid: 'guild-row-uuid',
    })
  })

  it('extractErrorMessageFromResponseJson 应序列化 FastAPI detail 数组', () => {
    const errorMessage = __discordIntegrationApiTestables.extractErrorMessageFromResponseJson(
      {
        detail: [
          {
            type: 'extra_forbidden',
            loc: ['body', 'closed_category_id'],
            msg: 'Extra inputs are not permitted',
          },
        ],
      },
      '更新 ticket panel 失败。',
    )

    expect(errorMessage).toContain('closed_category_id')
    expect(errorMessage).toContain('Extra inputs are not permitted')
  })

  it('stableStringifyJson 应忽略对象 key 顺序差异', () => {
    const left = {
      panel_name: 'Support',
      staff_role_ids: ['role-1'],
      nested: {
        a: 1,
        b: 2,
      },
    }
    const right = {
      nested: {
        b: 2,
        a: 1,
      },
      staff_role_ids: ['role-1'],
      panel_name: 'Support',
    }

    expect(__discordIntegrationApiTestables.stableStringifyJson(left)).toBe(
      __discordIntegrationApiTestables.stableStringifyJson(right),
    )
  })
})
