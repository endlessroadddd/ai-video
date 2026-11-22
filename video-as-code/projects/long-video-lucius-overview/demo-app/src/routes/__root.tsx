import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  useRouterState,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Toaster } from 'sonner'
import { useEffect, useState } from 'react'

import Header from '../components/Header'
import { MemberActivityTracker } from '@/components/member-activity-tracker'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import { canInstallPwaFromOrigin } from '@/lib/pwa'
import { getLocale } from '@/paraglide/runtime'
import { buildAuthCallbackRedirectUrl } from '@/lib/services/auth-callback-url'

import appCss from '../styles.css?url'
import { cn } from '@/lib/utils'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

const APP_TITLE = 'Lucius AI'
const APP_DESCRIPTION = 'AI workspace for support, operations, and product signals.'

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async () => {
    // Other redirect strategies are possible; see
    // https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide#offline-redirect
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', getLocale())
    }
  },

  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: APP_TITLE,
      },
      {
        name: 'description',
        content: APP_DESCRIPTION,
      },
      {
        name: 'theme-color',
        content: '#644fb8',
      },
      {
        name: 'application-name',
        content: APP_TITLE,
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/figma-auth/Logo%20Mark_black.svg',
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({
    /**
     * 根文档背景需要跟随当前稳定路由：
     * - 认证页要求沉浸式纯白背景；
     * - 其它工作台页面继续沿用全局暖灰底色。
     */
    select: (state) => state.resolvedLocation?.pathname ?? state.location.pathname,
  })
  const isAuthLikeRoute = pathname.startsWith('/auth/') || pathname.startsWith('/invite/')

  return (
    <html lang={getLocale()} className={isAuthLikeRoute ? 'bg-card' : 'bg-background'}>
      <head>
        <CanonicalPwaHeadTags />
        <HeadContent />
      </head>
      <body className={cn(isAuthLikeRoute ? 'bg-card' : 'bg-background', 'app-shell text-foreground')}>
        <AuthCallbackBridge />
        <Header />
        <MemberActivityTracker />
        {children}
        {/*
         * 全局通知容器：
         * - 供知识库上传等异步流程展示 toast。
         * - 放在根节点，保证任意页面都能调用。
         */}
        <Toaster position="bottom-right" />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

function AuthCallbackBridge() {
  useEffect(() => {
    const redirectUrl = buildAuthCallbackRedirectUrl(window.location.href)

    if (!redirectUrl || redirectUrl === window.location.href) {
      return
    }

    window.location.replace(redirectUrl)
  }, [])

  return null
}

function CanonicalPwaHeadTags() {
  const [shouldExposeManifest, setShouldExposeManifest] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    /**
     * 仅在 canonical origin 注入 manifest：
     * - 正式域名继续获得安装能力；
     * - 临时域名和预发域名不主动暴露安装入口，避免应用身份漂移。
     */
    setShouldExposeManifest(canInstallPwaFromOrigin(window.location.origin))
  }, [])

  if (!shouldExposeManifest) {
    return null
  }

  return (
    <>
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" sizes="180x180" href="/pwa/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/pwa/icon-192.png" />
    </>
  )
}
