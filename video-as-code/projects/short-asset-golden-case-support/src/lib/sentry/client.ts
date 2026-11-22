import * as Sentry from '@sentry/tanstackstart-react'

/**
 * 浏览器端 Sentry 初始化状态标记：
 * - TanStack Start 在开发模式下可能因 HMR 重复执行模块。
 * - 该标记确保整个浏览器会话只初始化一次，避免重复上报与告警噪音。
 */
let hasInitializedClientSentry = false

/**
 * 将字符串采样率安全转换为 number：
 * - 非数字、空值、越界值都会回退到默认值，避免因环境变量配置错误导致 SDK 初始化失败。
 */
function parseSampleRate(rawValue: string | undefined, fallback: number): number {
  if (!rawValue) {
    return fallback
  }

  const parsedValue = Number(rawValue)
  if (Number.isNaN(parsedValue)) {
    return fallback
  }
  if (parsedValue < 0 || parsedValue > 1) {
    return fallback
  }

  return parsedValue
}

/**
 * 读取并规范化浏览器可见环境变量：
 * - 会自动清理首尾空白；
 * - 空字符串视为未配置（返回 undefined）。
 */
function getEnvValue(envKey: string): string | undefined {
  const envRecord = import.meta.env as Record<string, string | undefined>
  const rawValue = envRecord[envKey]
  const normalizedValue = rawValue?.trim()
  return normalizedValue ? normalizedValue : undefined
}

/**
 * 初始化浏览器端 Sentry：
 * - 仅在 DSN 存在时启用；
 * - 统一读取 release / environment / 采样率参数；
 * - 默认保留较保守采样率，便于生产环境控制成本。
 */
export function initializeClientSentry(): void {
  if (hasInitializedClientSentry || Sentry.getClient()) {
    return
  }

  const dsn = getEnvValue('VITE_SENTRY_DSN')
  if (!dsn) {
    return
  }

  const release = getEnvValue('VITE_SENTRY_RELEASE') ?? getEnvValue('SENTRY_RELEASE')
  const environment = getEnvValue('VITE_SENTRY_ENVIRONMENT') ?? import.meta.env.MODE
  const tracesSampleRate = parseSampleRate(
    getEnvValue('VITE_SENTRY_TRACES_SAMPLE_RATE'),
    0.2,
  )
  const replaysSessionSampleRate = parseSampleRate(
    getEnvValue('VITE_SENTRY_REPLAY_SESSION_SAMPLE_RATE'),
    0.05,
  )
  const replaysOnErrorSampleRate = parseSampleRate(
    getEnvValue('VITE_SENTRY_REPLAY_ERROR_SAMPLE_RATE'),
    1.0,
  )

  Sentry.init({
    dsn,
    release,
    environment,
    sendDefaultPii: true,
    tracesSampleRate,
    replaysSessionSampleRate,
    replaysOnErrorSampleRate,
  })

  hasInitializedClientSentry = true
}
