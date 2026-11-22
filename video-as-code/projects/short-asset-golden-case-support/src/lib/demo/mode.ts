/**
 * Demo mode detection.
 *
 * Activated by setting VITE_DEMO_MODE=true in the environment.
 * For local preview convenience, development mode also falls back to demo mode
 * when Supabase public env vars are absent.
 */

type DemoEnvRecord = Record<string, string | boolean | undefined>

function readViteEnv(): DemoEnvRecord {
  return (
    (import.meta as ImportMeta & {
      env?: DemoEnvRecord
    }).env || {}
  )
}

function hasBrowserSupabasePublicEnv(viteEnv: DemoEnvRecord): boolean {
  const url = viteEnv.VITE_SUPABASE_URL
  const publicKey =
    viteEnv.VITE_SUPABASE_PUBLISHABLE_KEY || viteEnv.VITE_SUPABASE_ANON_KEY

  return Boolean(url && publicKey)
}

function hasServerSupabasePublicEnv(): boolean {
  const url =
    process.env.VITE_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL

  const publicKey =
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return Boolean(url && publicKey)
}

function isGoldenCasePreviewPath(pathname: string): boolean {
  return pathname === '/chat/golden-case' || pathname === '/chat/recording'
}

export function isDemoMode(): boolean {
  const viteEnv = readViteEnv()

  if (viteEnv.VITE_DEMO_MODE === 'true' || process.env.VITE_DEMO_MODE === 'true') {
    return true
  }

  if (typeof window !== 'undefined') {
    const isDevelopment = viteEnv.DEV === true || viteEnv.MODE === 'development'
    if (!isDevelopment) {
      return false
    }

    return (
      isGoldenCasePreviewPath(window.location.pathname) ||
      !hasBrowserSupabasePublicEnv(viteEnv)
    )
  }

  if (process.env.NODE_ENV === 'production') {
    return false
  }

  return !hasServerSupabasePublicEnv()
}
