import { useRouterState } from '@tanstack/react-router'
import { useEffect, useMemo, useRef } from 'react'

import { useSelectedCompanyId } from '@/lib/company-selection'
import { useCurrentUserCompanies } from '@/lib/services/company-membership-query'
import { reportMemberActivity } from '@/lib/services/member-activity-api'

const MEMBER_ACTIVITY_PING_INTERVAL_MS = 5 * 60 * 1000

function isTrackablePath(pathname: string): boolean {
  return (
    pathname === '/dashboard' ||
    pathname.startsWith('/dashboard/') ||
    pathname === '/chat' ||
    pathname.startsWith('/chat/') ||
    pathname === '/settings' ||
    pathname.startsWith('/settings/') ||
    pathname === '/onboarding' ||
    pathname.startsWith('/onboarding/')
  )
}

/**
 * 全局成员活跃心跳。
 *
 * 设计说明：
 * - 只要用户进入已登录工作区页面，就按公司维度上报活跃；
 * - 页面切换、标签页重新可见、定时续约都会触发；
 * - 组件内先做一次前端节流，服务端再做最终节流，减少无意义写入。
 */
export function MemberActivityTracker() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const isTrackableRoute = isTrackablePath(pathname)
  const selectedCompanyId = useSelectedCompanyId()
  const { data: userCompanies = [] } = useCurrentUserCompanies({
    enabled: isTrackableRoute,
  })
  const currentCompanyId = useMemo<string | null>(() => {
    if (!isTrackableRoute || userCompanies.length === 0) {
      return null
    }

    if (!selectedCompanyId) {
      return userCompanies[0]?.companyId || null
    }

    const matchedCompany =
      userCompanies.find((company) => company.companyId === selectedCompanyId) || userCompanies[0]
    return matchedCompany?.companyId || null
  }, [isTrackableRoute, selectedCompanyId, userCompanies])
  const lastReportedAtByCompanyRef = useRef<Map<string, number>>(new Map())
  const isReportingRef = useRef<boolean>(false)

  const triggerActivityReport = async (): Promise<void> => {
    if (!isTrackableRoute || !currentCompanyId || typeof document === 'undefined' || document.hidden) {
      return
    }

    const lastReportedAt = lastReportedAtByCompanyRef.current.get(currentCompanyId) || 0
    if (Date.now() - lastReportedAt < MEMBER_ACTIVITY_PING_INTERVAL_MS) {
      return
    }

    if (isReportingRef.current) {
      return
    }

    isReportingRef.current = true

    try {
      await reportMemberActivity({
        companyId: currentCompanyId,
      })
      lastReportedAtByCompanyRef.current.set(currentCompanyId, Date.now())
    } catch (error) {
      console.warn('[member-activity] 上报成员活跃时间失败：', error)
    } finally {
      isReportingRef.current = false
    }
  }

  useEffect(() => {
    void triggerActivityReport()
  }, [currentCompanyId, isTrackableRoute, pathname])

  useEffect(() => {
    if (!isTrackableRoute || !currentCompanyId || typeof document === 'undefined') {
      return
    }

    const handleVisibilityChange = (): void => {
      if (document.hidden) {
        return
      }

      void triggerActivityReport()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [currentCompanyId, isTrackableRoute])

  useEffect(() => {
    if (!isTrackableRoute || !currentCompanyId) {
      return
    }

    const intervalId = window.setInterval(() => {
      void triggerActivityReport()
    }, MEMBER_ACTIVITY_PING_INTERVAL_MS)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [currentCompanyId, isTrackableRoute])

  return null
}
