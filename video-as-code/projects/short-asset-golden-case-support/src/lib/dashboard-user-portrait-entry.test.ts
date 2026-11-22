// @vitest-environment jsdom

import { describe, expect, it, vi } from 'vitest'

import {
  DASHBOARD_USER_PORTRAIT_TRIGGER_EVENT,
  emitDashboardUserPortraitTrigger,
} from '@/lib/dashboard-user-portrait-entry'

describe('dashboard-user-portrait-entry', () => {
  it('emitDashboardUserPortraitTrigger 应派发用户画像入口事件', () => {
    const listener = vi.fn()

    window.addEventListener(DASHBOARD_USER_PORTRAIT_TRIGGER_EVENT, listener as EventListener)

    emitDashboardUserPortraitTrigger()

    expect(listener).toHaveBeenCalledTimes(1)

    const event = listener.mock.calls[0][0] as CustomEvent<{ source: string }>
    expect(event.detail).toEqual({
      source: 'sidebar',
    })

    window.removeEventListener(DASHBOARD_USER_PORTRAIT_TRIGGER_EVENT, listener as EventListener)
  })
})
