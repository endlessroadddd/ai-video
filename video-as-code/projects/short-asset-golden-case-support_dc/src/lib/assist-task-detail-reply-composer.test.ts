import { describe, expect, it } from 'vitest'

import {
  resolveAssistTaskReplyComposerState,
  type ResolveAssistTaskReplyComposerStateParams,
} from '@/lib/assist-task-detail-reply-composer'

function createComposerStateParams(
  overrides: Partial<ResolveAssistTaskReplyComposerStateParams> = {},
): ResolveAssistTaskReplyComposerStateParams {
  return {
    platform: 'website',
    displayStatus: 'pending',
    hasCompanyScope: true,
    isWaitingForAuthoritativeStatus: false,
    shouldShowSuggestedReplyCard: false,
    ...overrides,
  }
}

describe('assist-task-detail-reply-composer', () => {
  it('非 Website 的 pending suggested reply 只应显示 Confirm and Send', () => {
    expect(
      resolveAssistTaskReplyComposerState(
        createComposerStateParams({
          platform: 'discord',
          shouldShowSuggestedReplyCard: true,
        }),
      ),
    ).toEqual({
      canConfirmSuggestedReply: true,
      canSendManualReply: false,
      shouldShowComposer: true,
    })
  })

  it('非 Website 在 resolved 后不应继续显示任何输入区', () => {
    expect(
      resolveAssistTaskReplyComposerState(
        createComposerStateParams({
          platform: 'telegram',
          displayStatus: 'taken_over',
        }),
      ),
    ).toEqual({
      canConfirmSuggestedReply: false,
      canSendManualReply: false,
      shouldShowComposer: false,
    })
  })

  it('Website 的 pending 无 suggested reply 时应显示手动输入区', () => {
    expect(
      resolveAssistTaskReplyComposerState(
        createComposerStateParams({
          platform: ' website ',
          displayStatus: 'pending',
          shouldShowSuggestedReplyCard: false,
        }),
      ),
    ).toEqual({
      canConfirmSuggestedReply: false,
      canSendManualReply: true,
      shouldShowComposer: true,
    })
  })

  it('Website 在 taken_over 后仍应允许继续手动发送', () => {
    expect(
      resolveAssistTaskReplyComposerState(
        createComposerStateParams({
          platform: 'website',
          displayStatus: 'taken_over',
        }),
      ),
    ).toEqual({
      canConfirmSuggestedReply: false,
      canSendManualReply: true,
      shouldShowComposer: true,
    })
  })

  it('等待 authoritative detail 时应隐藏全部 composer 动作', () => {
    expect(
      resolveAssistTaskReplyComposerState(
        createComposerStateParams({
          platform: 'website',
          shouldShowSuggestedReplyCard: true,
          isWaitingForAuthoritativeStatus: true,
        }),
      ),
    ).toEqual({
      canConfirmSuggestedReply: false,
      canSendManualReply: false,
      shouldShowComposer: false,
    })
  })
})
