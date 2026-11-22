export type AssistTaskReviewBadgeKind = 'pending' | 'confirmed' | 'taken_over'

export type AssistTaskLifecycleActionBarVisibilityParams = {
  canTakeOver: boolean
  canIgnore: boolean
}

/**
 * 统一收口详情页底部“接手 / 忽略”操作条的可见性：
 * - 新状态流里，只有 `pending` 事件仍需要展示生命周期动作；
 * - 一旦事件进入 `taken_over` 或 `ignored`，底部只保留回复能力，不再出现状态切换按钮；
 * - 因此这里直接以“当前是否还能接手 / 忽略”为唯一判断来源，避免 JSX 再维护额外分支。
 */
export function shouldShowAssistTaskLifecycleActionBar(
  params: AssistTaskLifecycleActionBarVisibilityParams,
): boolean {
  const { canTakeOver, canIgnore } = params
  return canTakeOver || canIgnore
}
