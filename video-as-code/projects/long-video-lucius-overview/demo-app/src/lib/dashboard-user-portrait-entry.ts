export const DASHBOARD_USER_PORTRAIT_TRIGGER_EVENT = 'dashboard-user-portrait-trigger'

export type DashboardUserPortraitTriggerDetail = {
  source: 'sidebar'
}

/**
 * 用户画像入口事件：
 * - 当前阶段点击侧边栏后不再跳转设置页；
 * - 统一保留一个浏览器事件口子，后续可接弹窗、抽屉或浮层面板。
 */
export function emitDashboardUserPortraitTrigger(
  detail: DashboardUserPortraitTriggerDetail = {
    source: 'sidebar',
  },
): void {
  if (typeof window === 'undefined') {
    return
  }

  window.dispatchEvent(
    new CustomEvent<DashboardUserPortraitTriggerDetail>(DASHBOARD_USER_PORTRAIT_TRIGGER_EVENT, {
      detail,
    }),
  )
}
