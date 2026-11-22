export type AssistTaskDetailMessageDisplayStatus = 'pending' | 'taken_over' | 'ignored'

export type AssistTaskDetailMessageScope = 'event' | 'website_session'

export type ResolveAssistTaskDetailMessageScopeParams = {
  platform: string
  displayStatus: AssistTaskDetailMessageDisplayStatus
}

/**
 * 收口协助任务详情的消息读取范围：
 * - 默认仍按当前 event 自身挂载的 message ids 展示，避免扩大非 website 平台的读取面；
 * - 只有 Website 且已经被工作人员接手时，才切到整段 session 级时间线；
 * - 这样可以让人工接手后的官网会话持续展示完整上下文，而不是只停留在触发事件的那几条消息。
 */
export function resolveAssistTaskDetailMessageScope(
  params: ResolveAssistTaskDetailMessageScopeParams,
): AssistTaskDetailMessageScope {
  const isWebsitePlatform = params.platform.trim().toLowerCase() === 'website'

  if (isWebsitePlatform && params.displayStatus === 'taken_over') {
    return 'website_session'
  }

  return 'event'
}
