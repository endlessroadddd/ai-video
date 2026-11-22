import type { LuciusAgentEventRow } from '@/lib/services/agent-event-query'

/**
 * 控制详情页“建议回复卡”的显示时机：
 * - 当前产品要求非常明确：只有 `status='pending'` 且
 *   `manual_review_status='not_required'` 的事件才展示 suggested reply；
 * - 其它任何状态组合都直接隐藏，避免 UI 继续猜测后端语义。
 */
export function shouldShowAssistTaskSuggestedReplyReviewCard(
  row: Pick<LuciusAgentEventRow, 'suggested_reply' | 'manual_review_status' | 'status'>,
): boolean {
  const suggestedReply = (row.suggested_reply || '').trim()
  const manualReviewStatus = (row.manual_review_status || '').trim().toLowerCase()
  const normalizedStatus = (row.status || '').trim().toLowerCase()

  if (!suggestedReply) {
    return false
  }

  if (normalizedStatus !== 'pending') {
    return false
  }

  return manualReviewStatus === 'not_required'
}
