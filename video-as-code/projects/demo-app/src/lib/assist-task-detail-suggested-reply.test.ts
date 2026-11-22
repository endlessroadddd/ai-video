import { describe, expect, it } from 'vitest'

import { shouldShowAssistTaskSuggestedReplyReviewCard } from '@/lib/assist-task-detail-suggested-reply'

describe('assist-task-detail-suggested-reply', () => {
  it('缺少建议回复内容时不应显示建议回复卡', () => {
    expect(
      shouldShowAssistTaskSuggestedReplyReviewCard({
        suggested_reply: '   ',
        manual_review_status: null,
        status: 'pending',
      }),
    ).toBe(false)
  })

  it('只有 pending + not_required 时才应显示建议回复卡', () => {
    expect(
      shouldShowAssistTaskSuggestedReplyReviewCard({
        suggested_reply: '请查看最新处理结果',
        manual_review_status: 'not_required',
        status: 'pending',
      }),
    ).toBe(true)
  })

  it('manual_review_status 不是 not_required 时不应显示建议回复卡', () => {
    expect(
      shouldShowAssistTaskSuggestedReplyReviewCard({
        suggested_reply: '请查看最新处理结果',
        manual_review_status: ' confirmed ',
        status: 'pending',
      }),
    ).toBe(false)
  })

  it('status 不是 pending 时不应显示建议回复卡', () => {
    expect(
      shouldShowAssistTaskSuggestedReplyReviewCard({
        suggested_reply: '请查看最新处理结果',
        manual_review_status: ' not_required ',
        status: 'processing',
      }),
    ).toBe(false)
  })

  it('manual_review_status 为空时不应显示建议回复卡', () => {
    expect(
      shouldShowAssistTaskSuggestedReplyReviewCard({
        suggested_reply: '请查看最新处理结果',
        manual_review_status: null,
        status: 'pending',
      }),
    ).toBe(false)
  })
})
