import { describe, expect, it } from 'vitest'

import {
  buildAssistTaskMessageSegments,
  resolveAssistTaskEventMentionDisplayName,
} from '@/lib/assist-task-message-mention'

describe('assist-task-message-mention', () => {
  it('应把 Slack mention 渲染成可读标签并优先使用事件用户名称', () => {
    expect(
      buildAssistTaskMessageSegments({
        platform: 'slack',
        content: '<@user-123> 请查看处理结果',
        eventUserId: 'user-123',
        eventUserDisplayName: 'Alexander Lisa',
      }),
    ).toEqual([
      {
        kind: 'mention',
        platform: 'slack',
        rawText: '<@user-123>',
        userId: 'user-123',
        label: '@Alexander Lisa',
      },
      {
        kind: 'text',
        text: ' 请查看处理结果',
      },
    ])
  })

  it('应把 Telegram HTML mention 与正文实体一起解码', () => {
    expect(
      buildAssistTaskMessageSegments({
        platform: 'telegram',
        content:
          '<a href="tg://user?id=123456789">Jarsy</a> 请确认 &lt;done&gt; &amp; 回执',
      }),
    ).toEqual([
      {
        kind: 'mention',
        platform: 'telegram',
        rawText: '<a href="tg://user?id=123456789">Jarsy</a>',
        userId: '123456789',
        label: '@Jarsy',
      },
      {
        kind: 'text',
        text: ' 请确认 <done> & 回执',
      },
    ])
  })

  it('应识别 Telegram 用户名 mention 前缀', () => {
    expect(
      buildAssistTaskMessageSegments({
        platform: 'telegram',
        content: '@jarsyoinko 请查看处理结果',
      }),
    ).toEqual([
      {
        kind: 'mention',
        platform: 'telegram',
        rawText: '@jarsyoinko',
        userId: 'jarsyoinko',
        label: '@jarsyoinko',
      },
      {
        kind: 'text',
        text: ' 请查看处理结果',
      },
    ])
  })

  it('应把飞书 mention 展示名中的 HTML 实体还原', () => {
    expect(
      buildAssistTaskMessageSegments({
        platform: 'feishu',
        content: '<at user_id="ou_456">@A&amp;B &lt;Test&gt;</at> 已经帮你处理好了',
      }),
    ).toEqual([
      {
        kind: 'mention',
        platform: 'feishu',
        rawText: '<at user_id="ou_456">@A&amp;B &lt;Test&gt;</at>',
        userId: 'ou_456',
        label: '@A&B <Test>',
      },
      {
        kind: 'text',
        text: ' 已经帮你处理好了',
      },
    ])
  })

  it('应优先使用外部用户消息作者名作为 mention 展示名兜底', () => {
    expect(
      resolveAssistTaskEventMentionDisplayName({
        eventUserId: 'user-123',
        messages: [
          {
            platform: 'slack',
            messageId: '1',
            role: 'assistant',
            authorName: 'Lucius AI',
            authorAvatarUrl: null,
            content: '您好',
            sentAt: null,
          },
          {
            platform: 'slack',
            messageId: '2',
            role: 'user',
            authorName: 'Alexander Lisa',
            authorAvatarUrl: null,
            content: '你好',
            sentAt: null,
          },
        ],
      }),
    ).toBe('Alexander Lisa')
  })
})
