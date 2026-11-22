import { describe, expect, it } from 'vitest'

import { __telegramIntegrationApiTestables } from '@/lib/server/telegram-integration-api'

type CollectChatsFn = typeof __telegramIntegrationApiTestables.collectChatsFromUpdateForTelegramUser
type TelegramUpdateInput = Parameters<CollectChatsFn>[0]
type TelegramChatOutput = ReturnType<CollectChatsFn>[number]

const collectChatsFromUpdateForTelegramUser = __telegramIntegrationApiTestables.collectChatsFromUpdateForTelegramUser
const assertChannelOwnershipForUpsert = __telegramIntegrationApiTestables.assertChannelOwnershipForUpsert

/**
 * 构造最小 Telegram chat 数据，避免在测试里重复手写同样字段。
 */
function createChat(chatId: number, chatType: string): TelegramChatOutput {
  return {
    id: chatId,
    type: chatType,
    title: `chat-${Math.abs(chatId)}`,
  }
}

describe('telegram-integration-api 安全过滤', () => {
  it('只返回由当前 Telegram 用户触发的 group/supergroup/channel', () => {
    const updates: TelegramUpdateInput[] = [
      {
        message: {
          chat: createChat(-10001, 'group'),
          from: {
            id: 42,
          },
        },
      },
      {
        message: {
          chat: createChat(-10002, 'group'),
          from: {
            id: 7,
          },
        },
      },
      {
        message: {
          chat: createChat(10003, 'private'),
          from: {
            id: 42,
          },
        },
      },
      {
        my_chat_member: {
          chat: createChat(-10004, 'supergroup'),
          from: {
            id: 42,
          },
        },
      },
      {
        chat_member: {
          chat: createChat(-10005, 'channel'),
          from: {
            id: 42,
          },
        },
      },
      {
        chat_member: {
          chat: createChat(-10006, 'group'),
          from: {
            id: 8,
          },
        },
      },
    ]

    /**
     * 把多条更新逐一过滤并拍平，模拟 `/chats` 接口对 update 列表的处理方式。
     */
    const matchedChats = updates.flatMap((update) => collectChatsFromUpdateForTelegramUser(update, 42))

    expect(matchedChats.map((chat) => chat.id)).toEqual([-10001, -10004, -10005])
  })

  it('当 update 缺失 from.id 时不应返回候选 chat', () => {
    const updates: TelegramUpdateInput[] = [
      {
        message: {
          chat: createChat(-20001, 'group'),
        },
      },
      {
        my_chat_member: {
          chat: createChat(-20002, 'supergroup'),
        },
      },
      {
        chat_member: {
          chat: createChat(-20003, 'channel'),
        },
      },
    ]

    const matchedChats = updates.flatMap((update) => collectChatsFromUpdateForTelegramUser(update, 42))

    expect(matchedChats).toEqual([])
  })

  it('当 channel 已归属其他公司时应拒绝绑定（409）', () => {
    try {
      assertChannelOwnershipForUpsert('company-a', 'company-b')
      throw new Error('expected ownership check to fail')
    } catch (error) {
      expect(error).toMatchObject({
        status: 409,
      })
    }
  })

  it('当 channel 尚未归属公司时允许认领', () => {
    expect(() => {
      assertChannelOwnershipForUpsert(null, 'company-a')
    }).not.toThrow()
  })

  it('当 channel 已归属当前公司时允许继续更新', () => {
    expect(() => {
      assertChannelOwnershipForUpsert('company-a', 'company-a')
    }).not.toThrow()
  })
})
