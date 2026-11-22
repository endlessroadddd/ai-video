import * as Sentry from '@sentry/tanstackstart-react'

/**
 * 读取环境变量并做基础标准化：
 * - 统一 trim；
 * - 空字符串视为未配置。
 */
function getEnvValue(key) {
  const rawValue = process.env[key]
  const normalizedValue = rawValue?.trim()
  return normalizedValue ? normalizedValue : undefined
}

/**
 * 解析采样率，保证始终输出 [0, 1] 内的数字：
 * - 非法配置会自动回退到默认值，避免阻断服务启动。
 */
function parseSampleRate(rawValue, fallback) {
  if (!rawValue) {
    return fallback
  }

  const parsedValue = Number(rawValue)
  if (Number.isNaN(parsedValue) || parsedValue < 0 || parsedValue > 1) {
    return fallback
  }

  return parsedValue
}

const sentryDsn = getEnvValue('SENTRY_DSN') ?? getEnvValue('VITE_SENTRY_DSN')
const sentryRelease = getEnvValue('SENTRY_RELEASE') ?? getEnvValue('VITE_SENTRY_RELEASE')
const sentryEnvironment =
  getEnvValue('SENTRY_ENVIRONMENT') ??
  getEnvValue('VITE_SENTRY_ENVIRONMENT') ??
  process.env.NODE_ENV ??
  'development'
const tracesSampleRate = parseSampleRate(getEnvValue('SENTRY_TRACES_SAMPLE_RATE'), 0.2)

if (!sentryDsn) {
  console.warn('SENTRY_DSN or VITE_SENTRY_DSN is not defined. Sentry is disabled.')
} else if (!Sentry.getClient()) {
  /**
   * 初始化服务端 Sentry：
   * - 服务端不配置 Replay（Replay 仅浏览器侧生效）；
   * - 默认开启 traces 但保持较低采样率，兼顾可观测性与成本。
   */
  Sentry.init({
    dsn: sentryDsn,
    release: sentryRelease,
    environment: sentryEnvironment,
    sendDefaultPii: true,
    tracesSampleRate,
  })
}
