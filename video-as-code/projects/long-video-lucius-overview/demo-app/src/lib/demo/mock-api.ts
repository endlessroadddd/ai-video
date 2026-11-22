/**
 * Fetch interceptor for demo mode.
 *
 * Patches window.fetch to intercept all /api/* requests and return mock data.
 * Non-API requests (CDN, fonts, etc.) pass through to the real fetch.
 */

import {
  DEMO_ASSIST_TASK_EVENT_ADOPTED_KNOWLEDGE,
  DEMO_ASSIST_TASK_EVENT_MESSAGES,
  DEMO_ASSIST_TASK_EVENTS,
  DEMO_COMPANY_ID,
  DEMO_EVENTS,
  DEMO_CHAT_SESSIONS,
  DEMO_CHAT_MESSAGES,
  DEMO_USERS,
  DEMO_KNOWLEDGE_ITEMS,
  DEMO_KNOWLEDGE_DOCUMENT_ATTACHMENTS,
  DEMO_KNOWLEDGE_DOCUMENT_KNOWLEDGE,
  DEMO_KNOWLEDGE_DOCUMENT_PIPELINE,
  DEMO_KNOWLEDGE_DOCUMENT_STATUS,
  DEMO_KNOWLEDGE_DOCUMENTS,
  DEMO_KNOWLEDGE_SOURCE_MAP,
  DEMO_KNOWLEDGE_V4_ITEMS,
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

function getQueryNumber(url: URL, key: string, fallback: number): number {
  const rawValue = url.searchParams.get(key)
  if (!rawValue) {
    return fallback
  }

  const parsedValue = Number(rawValue)
  return Number.isFinite(parsedValue) ? parsedValue : fallback
}

function listDemoKnowledgeItems(url: URL) {
  const companyId = (url.searchParams.get('company_id') || DEMO_COMPANY_ID).trim()
  const sourceType = (url.searchParams.get('source_type') || '').trim()
  const page = Math.max(getQueryNumber(url, 'page', 1), 1)
  const limit = Math.max(getQueryNumber(url, 'limit', 20), 1)

  const filteredItems = DEMO_KNOWLEDGE_V4_ITEMS.filter((item) => {
    if (item.company_id !== companyId) {
      return false
    }

    if (sourceType && item.source_type !== sourceType) {
      return false
    }

    return true
  })

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  return {
    items: filteredItems.slice(startIndex, endIndex),
    total: filteredItems.length,
    page,
    limit,
  }
}

function searchDemoKnowledgeItems(url: URL) {
  const companyId = (url.searchParams.get('company_id') || DEMO_COMPANY_ID).trim()
  const sourceType = (url.searchParams.get('source_type') || '').trim()
  const keyword = (url.searchParams.get('keyword') || '').trim().toLowerCase()
  const limit = Math.max(getQueryNumber(url, 'limit', 20), 1)

  const filteredItems = DEMO_KNOWLEDGE_V4_ITEMS.filter((item) => {
    if (item.company_id !== companyId) {
      return false
    }

    if (sourceType && item.source_type !== sourceType) {
      return false
    }

    const haystack = [item.key, item.text, item.answer, item.doc_file_path]
      .map((value) => (typeof value === 'string' ? value.toLowerCase() : ''))
      .join(' ')

    return haystack.includes(keyword)
  })

  return {
    items: filteredItems.slice(0, limit),
    total: filteredItems.length,
  }
}

function listDemoKnowledgeDocuments(url: URL) {
  const companyId = (url.searchParams.get('company_id') || DEMO_COMPANY_ID).trim()
  const status = (url.searchParams.get('status') || '').trim()
  const limit = Math.max(getQueryNumber(url, 'limit', 50), 1)
  const offset = Math.max(getQueryNumber(url, 'offset', 0), 0)

  const filteredItems = DEMO_KNOWLEDGE_DOCUMENTS.filter((item) => {
    if (item.company_id !== companyId) {
      return false
    }

    if (status && item.status !== status) {
      return false
    }

    return true
  })

  return {
    items: filteredItems.slice(offset, offset + limit),
    total: filteredItems.length,
    limit,
    offset,
  }
}

function getDemoKnowledgeItemById(knowledgeId: string) {
  return DEMO_KNOWLEDGE_V4_ITEMS.find((item) => item.id === knowledgeId) || null
}

function getDemoKnowledgeSourceById(knowledgeId: string) {
  return (
    (DEMO_KNOWLEDGE_SOURCE_MAP as Record<string, unknown>)[knowledgeId] ||
    null
  )
}

function getDemoDocumentStatus(documentId: string) {
  return (
    (DEMO_KNOWLEDGE_DOCUMENT_STATUS as Record<string, unknown>)[documentId] ||
    null
  )
}

function getDemoDocumentPipeline(documentId: string) {
  return (
    (DEMO_KNOWLEDGE_DOCUMENT_PIPELINE as Record<string, unknown>)[documentId] ||
    null
  )
}

function listDemoDocumentKnowledge(url: URL, documentId: string) {
  const limit = Math.max(getQueryNumber(url, 'limit', 50), 1)
  const offset = Math.max(getQueryNumber(url, 'offset', 0), 0)
  const items =
    ((DEMO_KNOWLEDGE_DOCUMENT_KNOWLEDGE as Record<string, unknown>)[documentId] as
      | unknown[]
      | undefined) || []

  return {
    items: items.slice(offset, offset + limit),
    total: items.length,
    limit,
    offset,
  }
}

function listDemoDocumentAttachments(documentId: string) {
  const items =
    ((DEMO_KNOWLEDGE_DOCUMENT_ATTACHMENTS as Record<string, unknown>)[documentId] as
      | unknown[]
      | undefined) || []

  return {
    items,
    total: items.length,
  }
}

/**
 * Route an API request to the correct mock handler.
 */
function handleApiRequest(url: URL, _init?: RequestInit): Response | null {
  const pathname = url.pathname
  const requestMethod = (_init?.method || 'GET').toUpperCase()

  if (pathname.startsWith('/api/events/')) {
    const bodyRecord =
      typeof _init?.body === 'string' && _init.body.trim()
        ? (JSON.parse(_init.body) as Record<string, unknown>)
        : {}
    const pathSegments = pathname.split('/').filter(Boolean)
    const eventId = pathSegments[2] || ''
    const action = pathSegments[3] || ''

    if (pathname === '/api/events/adopted-knowledge') {
      const items =
        (DEMO_ASSIST_TASK_EVENT_ADOPTED_KNOWLEDGE as Record<string, unknown>)[
          String(bodyRecord.eventId || '')
        ] || []
      return json({ items })
    }

    if (!eventId || !action) {
      return null
    }

    const event = DEMO_ASSIST_TASK_EVENTS.find((item) => item.id === eventId)
    if (!event) {
      return json({ error: 'Event not found' }, 404)
    }

    if (action === 'take-over') {
      return json({ event: { id: eventId, status: 'processing', owner_display_name: 'Alex Chen' } })
    }

    if (action === 'ignore') {
      return json({ event: { id: eventId, status: 'ignored', manual_review_status: 'rejected' } })
    }

    if (action === 'confirm-reply') {
      return json({ event: { id: eventId, status: 'processing', manual_review_status: 'confirmed' } })
    }

    if (action === 'send-message') {
      return json({ event: { id: eventId, status: 'processing' }, messageId: `${eventId}-manual-send` })
    }

    if (action === 'resolve') {
      return json({ event: { id: eventId, status: 'resolved' } })
    }

    if (action === 'supplemental-knowledge') {
      return json({
        event: {
          id: eventId,
          client_supplemental_knowledge:
            typeof bodyRecord.clientSupplementalKnowledge === 'string'
              ? bodyRecord.clientSupplementalKnowledge
              : null,
        },
      })
    }
  }

  if (pathname.startsWith('/api/v4/knowledge')) {
    if (pathname === '/api/v4/knowledge' || pathname === '/api/v4/knowledge/') {
      if (requestMethod === 'GET') {
        return json(listDemoKnowledgeItems(url))
      }

      return json({ success: true, action: 'created', message: 'Demo knowledge created.' })
    }

    if (pathname === '/api/v4/knowledge/keyword-search') {
      return json(searchDemoKnowledgeItems(url))
    }

    if (pathname === '/api/v4/knowledge/documents') {
      return json(listDemoKnowledgeDocuments(url))
    }

    if (pathname.startsWith('/api/v4/knowledge/document-status/')) {
      const documentId = decodeURIComponent(pathname.split('/').pop() || '')
      const documentStatus = getDemoDocumentStatus(documentId)
      return documentStatus ? json(documentStatus) : json({ detail: 'Document not found' }, 404)
    }

    if (pathname.startsWith('/api/v4/knowledge/process-document/')) {
      const documentId = decodeURIComponent(pathname.split('/').pop() || '')
      return json({ success: true, document_id: documentId, status: 'processing', message: 'Demo processing started.' })
    }

    if (
      pathname === '/api/v4/knowledge/process-extraction' ||
      pathname === '/api/v4/knowledge/process-extraction-by-chunks'
    ) {
      const bodyRecord =
        typeof _init?.body === 'string' && _init.body.trim()
          ? (JSON.parse(_init.body) as Record<string, unknown>)
          : {}
      return json({
        success: true,
        status: 'processing',
        document_id: typeof bodyRecord.document_id === 'string' ? bodyRecord.document_id : null,
        message: 'Demo extraction retry accepted.',
      })
    }

    if (pathname.startsWith('/api/v4/knowledge/documents/')) {
      const pathSegments = pathname.split('/').filter(Boolean)
      const documentId = decodeURIComponent(pathSegments[4] || '')
      const childRoute = pathSegments[5] || ''

      if (childRoute === 'knowledge') {
        return json(listDemoDocumentKnowledge(url, documentId))
      }

      if (childRoute === 'attachments') {
        return json(listDemoDocumentAttachments(documentId))
      }

      if (childRoute === 'pipeline-progress') {
        const pipeline = getDemoDocumentPipeline(documentId)
        return pipeline ? json(pipeline) : json({ detail: 'Document not found' }, 404)
      }

      if (childRoute === 'progress') {
        const pipeline = getDemoDocumentPipeline(documentId)
        if (!pipeline) {
          return json({ detail: 'Document not found' }, 404)
        }

        return json({
          document_id: pipeline.document_id,
          document_status: pipeline.document_status,
          chunk_total: pipeline.chunk_total,
          chunk_pending: pipeline.chunk_pending,
          chunk_extracting: pipeline.chunk_extracting,
          chunk_done: pipeline.chunk_done,
          chunk_failed: pipeline.chunk_failed,
          chunk_skipped: pipeline.chunk_skipped,
          attachment_total: pipeline.attachment_total,
          knowledge_total: pipeline.knowledge_total,
        })
      }

      if (childRoute === 'summary') {
        const pipeline = getDemoDocumentPipeline(documentId)
        const documentStatus = getDemoDocumentStatus(documentId) as Record<string, unknown> | null
        if (!pipeline || !documentStatus) {
          return json({ detail: 'Document not found' }, 404)
        }

        return json({
          document_id: pipeline.document_id,
          company_id: DEMO_COMPANY_ID,
          file_name: documentStatus.file_name,
          file_hash: documentStatus.file_hash,
          file_type: documentStatus.file_type,
          file_size: documentStatus.file_size,
          status: documentStatus.status,
          chunk_total: pipeline.chunk_total,
          chunk_pending: pipeline.chunk_pending,
          chunk_extracting: pipeline.chunk_extracting,
          chunk_done: pipeline.chunk_done,
          chunk_failed: pipeline.chunk_failed,
          chunk_skipped: pipeline.chunk_skipped,
          attachment_total: pipeline.attachment_total,
          knowledge_total: pipeline.knowledge_total,
          created_at: documentStatus.created_at,
          updated_at: documentStatus.updated_at,
        })
      }
    }

    if (pathname.startsWith('/api/v4/knowledge/knowledge/')) {
      const pathSegments = pathname.split('/').filter(Boolean)
      const knowledgeId = decodeURIComponent(pathSegments[4] || '')
      const childRoute = pathSegments[5] || ''

      if (childRoute === 'source') {
        const source = getDemoKnowledgeSourceById(knowledgeId)
        return source ? json(source) : json({ detail: 'Knowledge not found' }, 404)
      }
    }

    if (pathname.startsWith('/api/v4/knowledge/attachments/')) {
      const pathSegments = pathname.split('/').filter(Boolean)
      const attachmentId = decodeURIComponent(pathSegments[4] || '')
      const attachment = Object.values(DEMO_KNOWLEDGE_DOCUMENT_ATTACHMENTS)
        .flat()
        .find((item) => item.id === attachmentId)

      if (attachment?.storage_url) {
        return new Response('demo attachment', {
          status: 200,
          headers: {
            'Content-Type': attachment.mime_type || 'image/svg+xml',
            'X-Demo-Storage-Url': attachment.storage_url,
          },
        })
      }
    }

    if (pathname.startsWith('/api/v4/knowledge/')) {
      const knowledgeId = decodeURIComponent(pathname.split('/').pop() || '')
      const item = getDemoKnowledgeItemById(knowledgeId)
      if (!item) {
        return json({ detail: 'Knowledge not found' }, 404)
      }

      if (requestMethod === 'DELETE') {
        return json({ success: true, message: 'Demo knowledge deleted.' })
      }

      return json({ item })
    }
  }

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
      const assistTaskMessages =
        (DEMO_ASSIST_TASK_EVENT_MESSAGES as Record<string, unknown>)[eventId || ''] as
          | Array<Record<string, unknown>>
          | undefined
      if (assistTaskMessages?.length) {
        return json({
          ok: true,
          messages: assistTaskMessages.map((message) => ({
            id: message.messageId,
            role: message.role,
            content: message.content,
            username: message.authorName,
            timestamp: message.sentAt,
          })),
        })
      }

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
      json({
        ok: true,
        url:
          DEMO_KNOWLEDGE_DOCUMENT_ATTACHMENTS['document-demo-review-playbook'][0]
            ?.storage_url || '',
      }),

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
