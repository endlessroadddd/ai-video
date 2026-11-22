export type AssistTaskReplyComposerDisplayStatus = 'pending' | 'taken_over' | 'ignored'

export type ResolveAssistTaskReplyComposerStateParams = {
  platform: string
  displayStatus: AssistTaskReplyComposerDisplayStatus
  hasCompanyScope: boolean
  isWaitingForAuthoritativeStatus: boolean
  shouldShowSuggestedReplyCard: boolean
}

export type AssistTaskReplyComposerState = {
  canConfirmSuggestedReply: boolean
  canSendManualReply: boolean
  shouldShowComposer: boolean
}

/**
 * 判断当前事件是否属于 Website 端：
 * - 这里只有 Website 允许继续展示“Send to Lucius”手动输入区；
 * - 其它平台即使进入 taken_over / resolved，也只保留消息详情，不再继续展示输入框。
 */
function isWebsiteAssistTaskPlatform(platform: string): boolean {
  return platform.trim().toLowerCase() === 'website'
}

/**
 * 统一收口详情页 Lucius composer 的显示规则：
 * - `Confirm and Send` 取决于 suggested reply 是否仍处于待确认状态，平台无关；
 * - `Send to Lucius` 只允许 Website 端显示，并沿用现有生命周期约束；
 * - 非 Website 一旦事件进入 `resolved / taken_over / ignored`，输入区全部收起，只保留消息详情。
 */
export function resolveAssistTaskReplyComposerState(
  params: ResolveAssistTaskReplyComposerStateParams,
): AssistTaskReplyComposerState {
  const {
    platform,
    displayStatus,
    hasCompanyScope,
    isWaitingForAuthoritativeStatus,
    shouldShowSuggestedReplyCard,
  } = params

  const hasActionScope = hasCompanyScope && !isWaitingForAuthoritativeStatus
  const canConfirmSuggestedReply =
    hasActionScope &&
    shouldShowSuggestedReplyCard &&
    displayStatus === 'pending'
  const canSendManualReply =
    hasActionScope &&
    isWebsiteAssistTaskPlatform(platform) &&
    (
      displayStatus === 'taken_over' ||
      displayStatus === 'ignored' ||
      (displayStatus === 'pending' && !shouldShowSuggestedReplyCard)
    )

  return {
    canConfirmSuggestedReply,
    canSendManualReply,
    shouldShowComposer: canConfirmSuggestedReply || canSendManualReply,
  }
}
