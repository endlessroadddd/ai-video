/**
 * Demo mode bootstrap.
 *
 * Call `setupDemoMode()` once at app startup when VITE_DEMO_MODE=true.
 * This wires up all mock layers before any component renders.
 */

import { setSelectedCompanyId } from '@/lib/company-selection'
import { isDemoMode } from './mode'
import { installDemoFetchInterceptor } from './mock-api'
import { DEMO_COMPANY_ID } from './mock-data'

let _initialized = false

export function setupDemoMode(): void {
  if (!isDemoMode()) {
    return
  }

  if (_initialized) {
    return
  }
  _initialized = true

  if (typeof window === 'undefined') {
    return
  }

  console.info(
    '%c[Demo Mode] %cRunning with mock data — no real API calls',
    'color: #644fb8; font-weight: bold;',
    'color: inherit;',
  )

  // 1. Install fetch interceptor (must be before any queries fire)
  installDemoFetchInterceptor()

  // 2. Pre-select the demo company so pages don't show "select company" prompts
  setSelectedCompanyId(DEMO_COMPANY_ID)
}
