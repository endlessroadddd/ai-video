/**
 * Demo mode detection.
 *
 * Activated by setting VITE_DEMO_MODE=true in the environment.
 * When active, the app runs with mock data — no Supabase, no real API calls.
 */

let _isDemoMode: boolean | null = null

export function isDemoMode(): boolean {
  if (_isDemoMode !== null) {
    return _isDemoMode
  }

  if (typeof window !== 'undefined') {
    // Check Vite env
    const viteEnv = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env
    _isDemoMode = viteEnv?.VITE_DEMO_MODE === 'true'
  } else {
    _isDemoMode = process.env.VITE_DEMO_MODE === 'true'
  }

  return _isDemoMode
}
