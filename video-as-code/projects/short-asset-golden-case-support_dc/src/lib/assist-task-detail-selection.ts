import type { LuciusAgentEventRow } from '@/lib/services/agent-event-query'

export type ShouldFetchSelectedAssistTaskEventDetailParams = {
  activeCompanyId: string | null
  selectedEventId: string | null
  isCheckingOnboarding: boolean
  onboardingRedirectTarget: string | null
}

export type ResolveSelectedAssistTaskEventRowParams = {
  listRow: LuciusAgentEventRow | null
  detailRow: LuciusAgentEventRow | null
}

export type ShouldDeferAssistTaskEventActionsUntilDetailLoadedParams = {
  shouldLoadSelectedEventDetail: boolean
  detailRow: LuciusAgentEventRow | null
  hasDetailError: boolean
}

/**
 * 判断当前是否应该拉取“选中事件的单条详情”：
 * - 只要右侧详情面板处于打开状态，就应该优先用单条详情兜底，避免列表缓存状态滞后；
 * - onboarding 检查或跳转尚未完成时，不应触发详情请求，避免无效网络开销；
 * - 这里不再依赖“列表里是否已经有这一行”，因为列表数据可能已经过期。
 */
export function shouldFetchSelectedAssistTaskEventDetail(
  params: ShouldFetchSelectedAssistTaskEventDetailParams,
): boolean {
  const {
    activeCompanyId,
    selectedEventId,
    isCheckingOnboarding,
    onboardingRedirectTarget,
  } = params

  if (!activeCompanyId || !selectedEventId) {
    return false
  }

  if (isCheckingOnboarding) {
    return false
  }

  if (onboardingRedirectTarget) {
    return false
  }

  return true
}

/**
 * 统一决定右侧详情面板该使用哪一份事件数据：
 * - 单条详情查询代表最新服务端状态，优先级必须高于列表分页缓存；
 * - 列表行只作为详情尚未返回前的兜底展示，避免打开侧栏时整块闪空。
 */
export function resolveSelectedAssistTaskEventRow(
  params: ResolveSelectedAssistTaskEventRowParams,
): LuciusAgentEventRow | null {
  const { listRow, detailRow } = params

  if (detailRow) {
    return detailRow
  }

  if (listRow) {
    return listRow
  }

  return null
}

/**
 * 判断当前是否应该先冻结右侧动作区：
 * - 当详情面板刚打开、单条详情还没返回时，列表缓存可能仍是旧状态；
 * - 此时如果直接允许点击 Take Over，会把“已完成”事件误当成“可接手”；
 * - 一旦详情返回或请求明确失败，就不再冻结，由最新状态或兜底数据决定交互。
 */
export function shouldDeferAssistTaskEventActionsUntilDetailLoaded(
  params: ShouldDeferAssistTaskEventActionsUntilDetailLoadedParams,
): boolean {
  const {
    shouldLoadSelectedEventDetail,
    detailRow,
    hasDetailError,
  } = params

  if (!shouldLoadSelectedEventDetail) {
    return false
  }

  if (detailRow || hasDetailError) {
    return false
  }

  return true
}
