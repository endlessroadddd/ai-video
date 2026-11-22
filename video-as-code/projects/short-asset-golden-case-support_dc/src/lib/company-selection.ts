import { useEffect, useState } from 'react'

import { isDemoMode } from '@/lib/demo/mode'
import { DEMO_COMPANY_ID } from '@/lib/demo/mock-data'

/**
 * 当前选中 company 的本地存储 key。
 */
const SELECTED_COMPANY_STORAGE_KEY = 'lucius:selected-company-id'

/**
 * 全局广播事件名：
 * - Header 切换 company 后广播
 * - 其它页面监听并更新请求参数
 */
const COMPANY_CHANGED_EVENT_NAME = 'lucius-company-changed'

/**
 * 读取当前选中的 company id。
 */
export function getSelectedCompanyId(): string | null {
  // Demo mode: always return the demo company, even on the server (no localStorage)
  if (isDemoMode()) {
    return DEMO_COMPANY_ID
  }

  if (typeof window === 'undefined') {
    return null
  }

  const value: string | null = window.localStorage.getItem(SELECTED_COMPANY_STORAGE_KEY)
  return value && value.trim() ? value : null
}

/**
 * 更新当前选中的 company id 并广播。
 */
export function setSelectedCompanyId(companyId: string): void {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(SELECTED_COMPANY_STORAGE_KEY, companyId)
  window.dispatchEvent(
    new CustomEvent<{ companyId: string }>(COMPANY_CHANGED_EVENT_NAME, {
      detail: { companyId },
    }),
  )
}

/**
 * React Hook：订阅当前选中的 company id。
 */
export function useSelectedCompanyId(): string | null {
  const [selectedCompanyId, setSelectedCompanyIdState] = useState<string | null>(() =>
    getSelectedCompanyId(),
  )

  useEffect(() => {
    const syncValue = (): void => {
      setSelectedCompanyIdState(getSelectedCompanyId())
    }

    syncValue()
    window.addEventListener(COMPANY_CHANGED_EVENT_NAME, syncValue)
    window.addEventListener('storage', syncValue)

    return () => {
      window.removeEventListener(COMPANY_CHANGED_EVENT_NAME, syncValue)
      window.removeEventListener('storage', syncValue)
    }
  }, [])

  return selectedCompanyId
}

