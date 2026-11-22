import { defineConfig, loadEnv } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath, URL } from 'url'

const config = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const shouldCleanParaglideOutdir = mode === 'production'
  /**
   * 默认允许访问的 Host 列表：
   * - 本地开发常用 host；
   * - 线上反向代理域名（避免环境变量未注入时被拦截）。
   */
  const defaultAllowedHosts = [
    'localhost',
    '127.0.0.1',
    'app.hirelucius.com',
    'app-pre-prod.hirelucius.com',
    'client-app-v2.hirelucius.com',
    'solo-und-talented-cookie.trycloudflare.com'
  ]
  /**
   * 解析 allowed hosts：
   * - 支持传完整 URL（https://xx）或纯 host（xx）；
   * - 自动去重，避免同一 host 重复注入。
   */
  const parseAllowedHosts = (rawValue?: string): string[] => {
    if (!rawValue) {
      return []
    }

    const hostSet = new Set<string>()

    for (const item of rawValue.split(',')) {
      const trimmedItem = item.trim()
      if (!trimmedItem) {
        continue
      }

      try {
        const normalizedHost = new URL(trimmedItem).hostname
        if (normalizedHost) {
          hostSet.add(normalizedHost)
        }
      } catch {
        const normalizedHost = trimmedItem
          .replace(/^https?:\/\//, '')
          .replace(/\/.*$/, '')
          .trim()

        if (normalizedHost) {
          hostSet.add(normalizedHost)
        }
      }
    }

    return Array.from(hostSet)
  }
  const parsedAllowedHosts = parseAllowedHosts(env.PREVIEW_ALLOWED_HOSTS)
  const mergedAllowedHosts = Array.from(
    new Set([...defaultAllowedHosts, ...parsedAllowedHosts]),
  )
  const resolvedAllowedHosts = mergedAllowedHosts.length ? mergedAllowedHosts : undefined

  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      allowedHosts: resolvedAllowedHosts,
    },
    preview: {
      allowedHosts: resolvedAllowedHosts,
    },
    plugins: [
      // 在演示模式下禁用 devtools，防止 42069 端口占用
      ...((env.VITE_DEMO_MODE === 'true' || process.env.VITE_DEMO_MODE === 'true') ? [] : [devtools()]),
      paraglideVitePlugin({
        project: './project.inlang',
        outdir: './src/paraglide',
        cleanOutdir: shouldCleanParaglideOutdir,
        strategy: ['url'],
      }),
      // this is the plugin that enables path aliases
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      tanstackStart(),
      viteReact(),
    ],
  }
})

export default config
