/**
 * Fetch interceptor for demo mode.
 *
 * Patches window.fetch to intercept all /api/* requests and return mock data.
 * Non-API requests (CDN, fonts, etc.) pass through to the real fetch.
 */

import {
  DEMO_COMPANY_ID,
  DEMO_EVENTS,
  DEMO_CHAT_SESSIONS,
  DEMO_CHAT_MESSAGES,
  DEMO_USERS,
  DEMO_KNOWLEDGE_ITEMS,
  DEMO_MEMBERS,
  DEMO_BILLING_SUMMARY,
  DEMO_INTEGRATIONS,
  DEMO_CHART_DATA,
} from './mock-data'

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function matchRoute(pathname: string, routes: Record<string, (pathname: string) => Response | null>): Response | null {
  for (const [pattern, handler] of Object.entries(routes)) {
    if (pathname === pattern || pathname.startsWith(pattern + '/') || pathname.startsWith(pattern + '?')) {
      return handler(pathname)
    }
  }
  return null
}

/**
 * Route an API request to the correct mock handler.
 */
function handleApiRequest(url: URL, _init?: RequestInit): Response | null {
  const pathname = url.pathname

  return matchRoute(pathname, {
    // ---- Events ----
    '/api/events/list': () =>
      json({ ok: true, events: DEMO_EVENTS, total: DEMO_EVENTS.length }),

    '/api/events/count': () =>
      json({ ok: true, count: DEMO_EVENTS.filter((e) => e.status === 'pending').length }),

    '/api/events/detail': () => {
      const eventId = url.searchParams.get('event_id') || url.searchParams.get('id')
      const event = DEMO_EVENTS.find((e) => e.id === eventId) || DEMO_EVENTS[0]
      return json({ ok: true, event })
    },

    '/api/events/messages': () => {
      const eventId = url.searchParams.get('event_id')
      const event = DEMO_EVENTS.find((e) => e.id === eventId)
      return json({
        ok: true,
        messages: event
          ? [
              { id: 'em-1', role: 'user', content: event.message_preview, username: event.user_name, timestamp: event.created_at },
              { id: 'em-2', role: 'assistant', content: event.ai_suggestion, username: 'Lucius', timestamp: event.updated_at },
            ]
          : [],
      })
    },

    '/api/events/action': () =>
      json({ ok: true }),

    // ---- Chat ----
    '/api/chat/sessions': () =>
      json({
        ok: true,
        sessions: DEMO_CHAT_SESSIONS.map((s) => ({
          sessionId: s.session_id,
          createdAt: s.created_at,
          startedAt: s.created_at,
          endedAt: null,
          sourceUrl: null,
        })),
        pagination: {
          page: 1,
          pageSize: 20,
          total: DEMO_CHAT_SESSIONS.length,
          totalPages: 1,
          hasPrev: false,
          hasNext: false,
        },
      }),

    '/api/chat/messages': () => {
      const sessionId = url.searchParams.get('session_id') || 'demo-session-001'
      return json({
        ok: true,
        messages: DEMO_CHAT_MESSAGES.filter((m) => m.session_id === sessionId),
      })
    },

    '/api/chat/message': () =>
      json({ ok: true, sessionId: 'demo-session-001', messageId: 'demo-new-msg' }),

    '/api/chat/upload': () =>
      json({ ok: true, url: 'https://placehold.co/400x300/e9e2f8/644fb8?text=Demo+Image' }),

    // ---- Users ----
    '/api/users': () =>
      json({ ok: true, users: DEMO_USERS, total: DEMO_USERS.length }),

    // ---- Knowledge ----
    '/api/knowledge': () =>
      json({ ok: true, items: DEMO_KNOWLEDGE_ITEMS, total: DEMO_KNOWLEDGE_ITEMS.length }),

    // ---- Members ----
    '/api/settings/member-management': () =>
      json({ ok: true, members: DEMO_MEMBERS }),

    // ---- Billing ----
    '/api/billing/summary': () =>
      json({ ok: true, ...DEMO_BILLING_SUMMARY }),

    '/api/billing/invoices': () =>
      json({ ok: true, invoices: [] }),

    '/api/billing': () =>
      json({ ok: true, ...DEMO_BILLING_SUMMARY }),

    // ---- Integrations ----
    '/api/integrations/discord': () =>
      json({ ok: true, ...DEMO_INTEGRATIONS.discord }),

    '/api/integrations/slack': () =>
      json({ ok: true, ...DEMO_INTEGRATIONS.slack }),

    '/api/integrations/telegram': () =>
      json({ ok: true, ...DEMO_INTEGRATIONS.telegram }),

    '/api/integrations/feishu': () =>
      json({ ok: true, ...DEMO_INTEGRATIONS.feishu }),

    // ---- Community Profile ----
    '/api/community-profile': () =>
      json({ ok: true, data: DEMO_CHART_DATA }),

    // ---- Company ----
    '/api/company': () =>
      json({ ok: true, company: { id: DEMO_COMPANY_ID, company_name: 'Lucius AI', website: 'https://lucius.ai', description: 'AI-powered community management' } }),

    // ---- User Profile ----
    '/api/profile': () =>
      json({ ok: true, profile: { display_name: 'Alex Chen', avatar_url: null } }),

    // ---- Onboarding ----
    '/api/onboarding': () =>
      json({ ok: true, progress: { company_info: true, personal_profile: true } }),

    // ---- Activity ----
    '/api/member-activity': () =>
      json({ ok: true }),
  })
}

/**
 * Install the fetch interceptor. Call once at app startup in demo mode.
 */
export function installDemoFetchInterceptor(): void {
  if (typeof window === 'undefined') {
    return
  }

  const originalFetch = window.fetch.bind(window)

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    let url: URL | null = null

    try {
      if (typeof input === 'string') {
        // Handle relative URLs
        url = new URL(input, window.location.origin)
      } else if (input instanceof URL) {
        url = input
      } else if (input instanceof Request) {
        url = new URL(input.url, window.location.origin)
      }
    } catch {
      // Not a valid URL — pass through
    }

    if (url && url.pathname.startsWith('/api/')) {
      const mockResponse = handleApiRequest(url, init)
      if (mockResponse) {
        // Simulate network delay for realism
        await new Promise((resolve) => setTimeout(resolve, 150 + Math.random() * 200))
        return mockResponse
      }

      // Unhandled API route — return empty success to avoid crashes
      console.warn(`[demo] Unhandled API route: ${url.pathname}`)
      return json({ ok: true })
    }

    // Non-API request — pass through to real fetch
    return originalFetch(input, init)
  }
}
