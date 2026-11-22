import { describe, expect, it } from 'vitest'

import { __eventApiTestables } from '@/lib/server/event-api'

const normalizeAdoptedKnowledgePlatform = __eventApiTestables.normalizeAdoptedKnowledgePlatform
const buildEventMentionMarkup = __eventApiTestables.buildEventMentionMarkup
const buildMentionedEventReplyContent = __eventApiTestables.buildMentionedEventReplyContent
const buildSendMessageEventUpdateData = __eventApiTestables.buildSendMessageEventUpdateData
const buildConfirmSuggestedReplyEventUpdateData =
  __eventApiTestables.buildConfirmSuggestedReplyEventUpdateData
const isWebsiteEventPlatform = __eventApiTestables.isWebsiteEventPlatform
const resolveWebsiteEventPlatformValue = __eventApiTestables.resolveWebsiteEventPlatformValue
const resolveWebsiteEventReplySessionId = __eventApiTestables.resolveWebsiteEventReplySessionId
const resolveConfirmedReplySendTarget = __eventApiTestables.resolveConfirmedReplySendTarget
const resolveEventSuggestedReplyReviewContent = __eventApiTestables.resolveEventSuggestedReplyReviewContent
const selectPreferredReplyMessageTarget = __eventApiTestables.selectPreferredReplyMessageTarget

type ResolveConfirmedReplySendTargetFn = typeof resolveConfirmedReplySendTarget
type ResolveConfirmedReplySendTargetPayload = Parameters<ResolveConfirmedReplySendTargetFn>[0]
type ReplyMessageTarget = NonNullable<
  ReturnType<typeof selectPreferredReplyMessageTarget>
>

/**
 * 构造最小事件数据：
 * - 只保留确认回复链路需要的字段；
 * - 让测试聚焦在目标解析规则，而不是数据库字段噪声。
 */
function createEventDetailRow(
  overrides: Partial<ResolveConfirmedReplySendTargetPayload['event']> = {},
): ResolveConfirmedReplySendTargetPayload['event'] {
  return {
    id: 'event-1',
    company_id: 'company-1',
    user_id: 'user-123',
    platform: 'slack',
    channel_id: 'C123',
    suggested_reply: '默认建议回复',
    context: {},
    message_ids: ['111', '222', '333'],
    ...overrides,
  }
}

/**
 * 构造消息候选：
 * - `order` 越大代表在事件 message_ids 中越靠后；
 * - 默认角色设为 user，便于按需覆写出 assistant/staff 等场景。
 */
function createReplyMessageTarget(
  overrides: Partial<ReplyMessageTarget> = {},
): ReplyMessageTarget {
  return {
    messageId: '111',
    threadId: null,
    sentAt: '2026-03-10T08:00:00.000Z',
    order: 0,
    role: 'user',
    ...overrides,
  }
}

describe('event-api 忽略动作兼容层', () => {
  it('应允许 adopted knowledge 查询识别 website 平台', () => {
    expect(normalizeAdoptedKnowledgePlatform('website')).toBe('website')
    expect(normalizeAdoptedKnowledgePlatform('  WEBSITE  ')).toBe('website')
  })

  it('应把 website 平台识别为会话级 take over 目标', () => {
    expect(isWebsiteEventPlatform('website')).toBe(true)
    expect(isWebsiteEventPlatform(' WEBSITE_SESSION ')).toBe(true)
    expect(isWebsiteEventPlatform('slack')).toBe(false)
  })

  it('应保留当前 website 平台枚举值用于精确过滤', () => {
    expect(resolveWebsiteEventPlatformValue('website')).toBe('website')
    expect(resolveWebsiteEventPlatformValue(' WEBSITE_SESSION ')).toBe('WEBSITE_SESSION')
    expect(resolveWebsiteEventPlatformValue('slack')).toBeNull()
  })

  it('应直接使用 event.channel_id 作为 website 回复的 session id', () => {
    expect(
      resolveWebsiteEventReplySessionId(
        createEventDetailRow({
          platform: 'website',
          channel_id: ' session-123 ',
        }),
      ),
    ).toBe('session-123')
  })

  it('website 回复缺少 channel_id 时应直接报错', () => {
    expect(() =>
      resolveWebsiteEventReplySessionId(
        createEventDetailRow({
          platform: 'website',
          channel_id: '   ',
        }),
      ),
    ).toThrowError('website 事件缺少 channel_id，无法定位会话。')
  })

  it('应使用 processing 作为 take over 的进行中状态', () => {
    const lastActivityAt = '2026-03-10T08:00:00.000Z'

    expect(
      __eventApiTestables.buildTakeOverEventUpdateData({
        ownerUserId: 'user-1',
        ownerDisplayName: 'Kaikai',
        ownerAvatarUrl: 'https://example.com/avatar.png',
        lastActivityAt,
      }),
    ).toEqual({
      owner_user_id: 'user-1',
      owner_display_name: 'Kaikai',
      owner_avatar_url: 'https://example.com/avatar.png',
      status: 'processing',
      manual_review_required: false,
      manual_review_status: 'not_required',
      last_activity_at: lastActivityAt,
    })
  })

  it('应使用 resolved 作为 resolved 按钮的完成状态', () => {
    const lastActivityAt = '2026-03-10T08:00:00.000Z'

    expect(
      __eventApiTestables.buildResolveEventUpdateData({
        ownerUserId: 'user-1',
        ownerDisplayName: 'Kaikai',
        ownerAvatarUrl: 'https://example.com/avatar.png',
        lastActivityAt,
      }),
    ).toEqual({
      owner_user_id: 'user-1',
      owner_display_name: 'Kaikai',
      owner_avatar_url: 'https://example.com/avatar.png',
      status: 'resolved',
      manual_review_required: false,
      manual_review_status: 'not_required',
      last_activity_at: lastActivityAt,
    })
  })

  it('应使用 resolved + rejected 作为 ignored 的过渡更新载荷', () => {
    const lastActivityAt = '2026-03-10T08:00:00.000Z'

    expect(__eventApiTestables.buildIgnoreEventUpdateData(lastActivityAt)).toEqual({
      status: 'resolved',
      manual_review_required: false,
      manual_review_status: 'rejected',
      last_activity_at: lastActivityAt,
    })
  })

  it('已忽略事件继续回复时应保持 ignored 语义，不回退为 processing', () => {
    const lastActivityAt = '2026-03-10T08:00:00.000Z'

    expect(
      buildSendMessageEventUpdateData({
        event: {
          status: 'resolved',
          manual_review_status: 'rejected',
          suggested_reply: '建议回复',
          message_ids: ['111'],
        },
        ownerUserId: 'user-1',
        ownerDisplayName: 'Kaikai',
        ownerAvatarUrl: 'https://example.com/avatar.png',
        sentMessageId: '222',
        lastActivityAt,
      }),
    ).toEqual({
      owner_user_id: 'user-1',
      owner_display_name: 'Kaikai',
      owner_avatar_url: 'https://example.com/avatar.png',
      status: 'resolved',
      manual_review_required: false,
      manual_review_status: 'rejected',
      last_activity_at: lastActivityAt,
      message_ids: ['111', '222'],
    })
  })

  it('pending 事件直接回复后应自动进入 processing', () => {
    const lastActivityAt = '2026-03-10T08:00:00.000Z'

    expect(
      buildSendMessageEventUpdateData({
        event: {
          status: 'pending',
          manual_review_status: null,
          suggested_reply: null,
          message_ids: ['111'],
        },
        ownerUserId: 'user-1',
        ownerDisplayName: 'Kaikai',
        ownerAvatarUrl: 'https://example.com/avatar.png',
        sentMessageId: '222',
        lastActivityAt,
      }),
    ).toEqual({
      owner_user_id: 'user-1',
      owner_display_name: 'Kaikai',
      owner_avatar_url: 'https://example.com/avatar.png',
      status: 'processing',
      manual_review_required: false,
      manual_review_status: 'not_required',
      last_activity_at: lastActivityAt,
      message_ids: ['111', '222'],
    })
  })

  it('待审核 suggested reply 下人工发送消息应改记为 rejected', () => {
    const lastActivityAt = '2026-03-10T08:00:00.000Z'

    expect(
      buildSendMessageEventUpdateData({
        event: {
          status: 'processing',
          manual_review_status: 'pending',
          suggested_reply: '建议直接访问入口',
          message_ids: ['111'],
        },
        ownerUserId: 'user-1',
        ownerDisplayName: 'Kaikai',
        ownerAvatarUrl: 'https://example.com/avatar.png',
        sentMessageId: '222',
        lastActivityAt,
      }),
    ).toEqual({
      owner_user_id: 'user-1',
      owner_display_name: 'Kaikai',
      owner_avatar_url: 'https://example.com/avatar.png',
      status: 'processing',
      manual_review_required: false,
      manual_review_status: 'rejected',
      last_activity_at: lastActivityAt,
      message_ids: ['111', '222'],
    })
  })

  it('确认并发送 suggested reply 后应把事件落成 resolved + confirmed', () => {
    const lastActivityAt = '2026-03-10T08:00:00.000Z'

    expect(
      buildConfirmSuggestedReplyEventUpdateData({
        event: {
          message_ids: ['111'],
        },
        ownerUserId: 'user-1',
        ownerDisplayName: 'Kaikai',
        ownerAvatarUrl: 'https://example.com/avatar.png',
        confirmedReplyContent: '已确认采用的建议回复',
        sentMessageId: '222',
        lastActivityAt,
      }),
    ).toEqual({
      owner_user_id: 'user-1',
      owner_display_name: 'Kaikai',
      owner_avatar_url: 'https://example.com/avatar.png',
      status: 'resolved',
      manual_review_required: false,
      manual_review_status: 'confirmed',
      suggested_reply: '已确认采用的建议回复',
      last_activity_at: lastActivityAt,
      message_ids: ['111', '222'],
    })
  })

  it('已确认 suggested reply 后继续人工补充消息不应丢失 confirmed', () => {
    const lastActivityAt = '2026-03-10T08:00:00.000Z'

    expect(
      buildSendMessageEventUpdateData({
        event: {
          status: 'processing',
          manual_review_status: 'confirmed',
          suggested_reply: '建议直接访问入口',
          message_ids: ['111'],
        },
        ownerUserId: 'user-1',
        ownerDisplayName: 'Kaikai',
        ownerAvatarUrl: 'https://example.com/avatar.png',
        sentMessageId: '222',
        lastActivityAt,
      }),
    ).toEqual({
      owner_user_id: 'user-1',
      owner_display_name: 'Kaikai',
      owner_avatar_url: 'https://example.com/avatar.png',
      status: 'processing',
      manual_review_required: false,
      manual_review_status: 'confirmed',
      last_activity_at: lastActivityAt,
      message_ids: ['111', '222'],
    })
  })

  it('应使用 rejected 标记取消采用 suggested reply', () => {
    const lastActivityAt = '2026-03-10T08:00:00.000Z'

    expect(__eventApiTestables.buildRejectSuggestedReplyUpdateData(lastActivityAt)).toEqual({
      manual_review_required: false,
      manual_review_status: 'rejected',
      last_activity_at: lastActivityAt,
    })
  })

  it('建议回复审核动作默认应回退为 confirm', () => {
    expect(__eventApiTestables.resolveEventSuggestedReplyReviewDecision(undefined)).toBe('confirm')
    expect(__eventApiTestables.resolveEventSuggestedReplyReviewDecision('   ')).toBe('confirm')
  })

  it('建议回复审核动作应允许 reject', () => {
    expect(__eventApiTestables.resolveEventSuggestedReplyReviewDecision(' reject ')).toBe('reject')
  })

  it('建议回复审核动作非法时应抛出 400', () => {
    try {
      __eventApiTestables.resolveEventSuggestedReplyReviewDecision('archive')
      throw new Error('expected resolveEventSuggestedReplyReviewDecision to fail')
    } catch (error) {
      expect(error).toMatchObject({
        status: 400,
        message: 'decision 非法。',
      })
    }
  })

  it('建议回复审核正文未显式传入时应回退到原 suggested_reply', () => {
    expect(
      resolveEventSuggestedReplyReviewContent(
        undefined,
        '  默认建议回复  ',
      ),
    ).toBe('默认建议回复')
  })

  it('建议回复审核正文应支持使用编辑后的内容覆盖原 suggested_reply', () => {
    expect(
      resolveEventSuggestedReplyReviewContent(
        '  已人工修改后的回复  ',
        '默认建议回复',
      ),
    ).toBe('已人工修改后的回复')
  })
})

describe('event-api 回复正文组装', () => {
  it('Slack 应使用原生用户 mention 语法', () => {
    expect(buildEventMentionMarkup({
      platform: 'slack',
      eventUserId: 'U123',
    })).toBe('<@U123>')
  })

  it('Discord 应使用原生用户 mention 语法', () => {
    expect(buildEventMentionMarkup({
      platform: 'discord',
      eventUserId: '998877',
    })).toBe('<@998877>')
  })

  it('Feishu 应使用 at 标签并优先展示 display_name', () => {
    expect(buildEventMentionMarkup({
      platform: 'feishu',
      eventUserId: 'ou_123',
      displayName: '张三',
    })).toBe('<at user_id="ou_123">@张三</at>')
  })

  it('Telegram 有 username 时应优先使用 @username', () => {
    expect(buildEventMentionMarkup({
      platform: 'telegram',
      eventUserId: 'tg-user-1',
      username: 'jarsyoinko',
    })).toBe('@jarsyoinko')
  })

  it('Telegram 未查到资料但 event.user_id 本身像 username 时应直接使用 @user_id', () => {
    expect(buildEventMentionMarkup({
      platform: 'telegram',
      eventUserId: 'jarsyoinko',
    })).toBe('@jarsyoinko')
  })

  it('Telegram 无 username 时应回退为 tg://user?id HTML mention', () => {
    expect(buildEventMentionMarkup({
      platform: 'telegram',
      eventUserId: '123456789',
      displayName: 'Jarsy Test',
    })).toBe('<a href="tg://user?id=123456789">Jarsy Test</a>')
  })

  it('缺少 event.user_id 时不应追加 mention', () => {
    expect(buildMentionedEventReplyContent({
      platform: 'telegram',
      content: '请查看处理结果',
      eventUserId: null,
    })).toEqual({
      content: '请查看处理结果',
      parseMode: null,
    })
  })

  it('正文已包含相同 mention 前缀时不应重复追加', () => {
    expect(buildMentionedEventReplyContent({
      platform: 'slack',
      content: '<@user-123> 请查看处理结果',
      eventUserId: 'user-123',
    })).toEqual({
      content: '<@user-123> 请查看处理结果',
      parseMode: null,
    })
  })

  it('Feishu display_name 应转义标签敏感字符', () => {
    expect(buildEventMentionMarkup({
      platform: 'feishu',
      eventUserId: 'ou_456',
      displayName: 'A&B <Test>',
    })).toBe('<at user_id="ou_456">@A&amp;B &lt;Test&gt;</at>')
  })

  it('Telegram HTML mention 应转义正文里的 HTML 特殊字符', () => {
    expect(buildMentionedEventReplyContent({
      platform: 'telegram',
      content: '请确认 <done> & 回执',
      eventUserId: '123456789',
      displayName: 'Jarsy',
    })).toEqual({
      content: '<a href="tg://user?id=123456789">Jarsy</a> 请确认 &lt;done&gt; &amp; 回执',
      parseMode: 'HTML',
    })
  })

  it('Telegram 用户名 mention 不应启用 parse_mode', () => {
    expect(buildMentionedEventReplyContent({
      platform: 'telegram',
      content: '请查看处理结果',
      eventUserId: '123456789',
      username: 'jarsyoinko',
    })).toEqual({
      content: '@jarsyoinko 请查看处理结果',
      parseMode: null,
    })
  })
})

describe('event-api 确认回复目标解析', () => {
  it('应优先选择最新用户消息作为确认回复锚点', () => {
    const resolvedTarget = resolveConfirmedReplySendTarget({
      event: createEventDetailRow({
        id: 'event-slack-1',
        platform: 'slack',
        channel_id: 'C123',
        suggested_reply: '  已确认，请查看  ',
      }),
      messageTargets: [
        createReplyMessageTarget({
          messageId: '111',
          threadId: '111',
          order: 0,
          role: 'assistant',
        }),
        createReplyMessageTarget({
          messageId: '222',
          threadId: '111',
          order: 1,
          role: 'user',
        }),
        createReplyMessageTarget({
          messageId: '333',
          threadId: '111',
          order: 2,
          role: 'assistant',
        }),
      ],
    })

    expect(resolvedTarget).toEqual({
      provider: 'slack',
      to: 'C123/111',
      messageThreadId: null,
      content: '<@user-123> 已确认，请查看',
      parseMode: null,
      requestId: 'assist-task-confirm-reply:event-slack-1',
    })
  })

  it('应优先使用事件 context 中显式提供的 thread 参数', () => {
    const resolvedTarget = resolveConfirmedReplySendTarget({
      event: createEventDetailRow({
        id: 'event-telegram-1',
        user_id: 'telegram-user-9',
        platform: 'telegram',
        channel_id: '-100123',
        suggested_reply: '请稍后查看更新',
        context: {
          message_thread_id: 777,
        },
      }),
      messageTargets: [
        createReplyMessageTarget({
          messageId: '902',
          threadId: '888',
          order: 0,
          role: 'user',
        }),
      ],
    })

    expect(resolvedTarget).toEqual({
      provider: 'telegram',
      to: '-100123',
      messageThreadId: '777',
      content:
        '<a href="tg://user?id=telegram-user-9">telegram-user-9</a> 请稍后查看更新',
      parseMode: 'HTML',
      requestId: 'assist-task-confirm-reply:event-telegram-1',
    })
  })

  it('Feishu 在缺少 display_name 的纯解析阶段应先回退到 user_id', () => {
    const resolvedTarget = resolveConfirmedReplySendTarget({
      event: createEventDetailRow({
        id: 'event-feishu-1',
        user_id: 'ou_789',
        platform: 'feishu',
        channel_id: 'oc_123456',
        suggested_reply: '已经帮你处理好了',
      }),
      messageTargets: [],
    })

    expect(resolvedTarget).toEqual({
      provider: 'feishu',
      to: 'oc_123456',
      messageThreadId: null,
      content: '<at user_id="ou_789">@ou_789</at> 已经帮你处理好了',
      parseMode: null,
      requestId: 'assist-task-confirm-reply:event-feishu-1',
    })
  })

  it('缺少 event.user_id 时确认回复内容不应追加 @', () => {
    const resolvedTarget = resolveConfirmedReplySendTarget({
      event: createEventDetailRow({
        id: 'event-discord-1',
        user_id: null,
        platform: 'discord',
        channel_id: '987654321',
        suggested_reply: '请提供更多信息',
      }),
      messageTargets: [],
    })

    expect(resolvedTarget).toEqual({
      provider: 'discord',
      to: '987654321',
      messageThreadId: null,
      content: '请提供更多信息',
      parseMode: null,
      requestId: 'assist-task-confirm-reply:event-discord-1',
    })
  })

  it('确认回复发送目标应优先使用人工编辑后的正文', () => {
    const resolvedTarget = resolveConfirmedReplySendTarget({
      event: createEventDetailRow({
        id: 'event-slack-2',
        platform: 'slack',
        channel_id: 'C456',
        suggested_reply: '原始建议回复',
      }),
      messageTargets: [],
      content: '  已人工编辑的新回复  ',
    })

    expect(resolvedTarget).toEqual({
      provider: 'slack',
      to: 'C456',
      messageThreadId: null,
      content: '<@user-123> 已人工编辑的新回复',
      parseMode: null,
      requestId: 'assist-task-confirm-reply:event-slack-2',
    })
  })

  it('缺少 suggested_reply 时应拒绝确认发送', () => {
    try {
      resolveConfirmedReplySendTarget({
        event: createEventDetailRow({
          suggested_reply: '   ',
        }),
        messageTargets: [],
      })
      throw new Error('expected resolveConfirmedReplySendTarget to fail')
    } catch (error) {
      expect(error).toMatchObject({
        status: 400,
        message: '事件缺少建议回复内容，无法确认发送。',
      })
    }
  })
})
