import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import * as TanstackQuery from './integrations/tanstack-query/root-provider'

import { deLocalizeUrl, localizeUrl } from './paraglide/runtime'
import { setupDemoMode } from '@/lib/demo/setup'
import { initializeClientSentry } from '@/lib/sentry/client'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const getRouter = () => {
  // Initialize demo mode before any queries fire
  setupDemoMode()

  const rqContext = TanstackQuery.getContext()

  const router = createRouter({
    routeTree,
    context: {
      ...rqContext,
    },

    // Paraglide URL rewrite docs: https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide#rewrite-url
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },

    defaultPreload: 'intent',
  })

  setupRouterSsrQueryIntegration({ router, queryClient: rqContext.queryClient })

  if (!router.isServer) {
    /**
     * 浏览器端监控初始化：
     * - 只在客户端执行；
     * - 内部做了幂等保护，避免 HMR/重复构建导致重复 init。
     */
    initializeClientSentry()
  }

  return router
}
