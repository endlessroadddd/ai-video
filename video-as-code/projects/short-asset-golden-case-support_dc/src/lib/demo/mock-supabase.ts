/**
 * Mock Supabase client for demo mode.
 *
 * Returns a minimal object that satisfies the SupabaseClient interface
 * as used throughout the app — auth.getSession(), auth.getUser(),
 * .from(), .schema().from(), etc.
 */

import {
  DEMO_USER_ID,
  DEMO_USER_EMAIL,
  DEMO_USER_NAME,
  DEMO_COMPANY_ID,
  DEMO_COMPANIES,
} from './mock-data'

const DEMO_SESSION = {
  access_token: 'demo-access-token',
  refresh_token: 'demo-refresh-token',
  token_type: 'bearer',
  expires_in: 86400,
  expires_at: Math.floor(Date.now() / 1000) + 86400,
  user: {
    id: DEMO_USER_ID,
    email: DEMO_USER_EMAIL,
    user_metadata: { display_name: DEMO_USER_NAME },
    app_metadata: {},
    aud: 'authenticated',
    role: 'authenticated',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    identities: [],
  },
}

const DEMO_USER = DEMO_SESSION.user

/**
 * Creates a chainable query builder that resolves to mock data.
 *
 * Key behavior:
 * - `.single()` / `.maybeSingle()` return `{ data: firstItem | null }` (not an array)
 * - Unhandled tables return empty arrays (or null for single queries)
 */
function createMockQueryBuilder(tableName: string, schemaName?: string): Record<string, unknown> {
  let _data: unknown[] = []
  let _isSingle = false

  // Route based on schema + table
  if (schemaName === 'permission' && tableName === 'organization_member') {
    _data = DEMO_COMPANIES.map((c) => ({
      company_id: c.companyId,
      role: c.memberRole,
    }))
  } else if (tableName === 'company') {
    _data = DEMO_COMPANIES.map((c) => ({
      id: c.companyId,
      company_name: c.companyName,
    }))
  } else if (schemaName === 'account' && tableName === 'company_user_profile') {
    _data = [
      {
        user_id: DEMO_USER_ID,
        company_id: DEMO_COMPANY_ID,
        display_name: DEMO_USER_NAME,
        avatar_url: null,
        avatar_storage_path: null,
      },
    ]
  } else if (schemaName === 'account' && tableName === 'company_onboarding_progress') {
    _data = [
      {
        company_id: DEMO_COMPANY_ID,
        user_id: DEMO_USER_ID,
        status: 'completed',
        current_step: 2,
        company_info_completed_at: new Date().toISOString(),
        profile_completed_at: new Date().toISOString(),
        selected_plan_code: 'pro',
        billing_cycle: 'monthly',
      },
    ]
  }

  function resolveData(): unknown {
    if (_isSingle) {
      return _data.length > 0 ? _data[0] : null
    }
    return _data
  }

  const builder: Record<string, unknown> = {
    get data() {
      return resolveData()
    },
    error: null,
    then(resolve: (value: { data: unknown; error: null }) => void) {
      resolve({ data: resolveData(), error: null })
    },
  }

  // Chainable methods that just return the builder
  const chainMethods = [
    'select', 'insert', 'update', 'upsert', 'delete',
    'eq', 'neq', 'in', 'is', 'gt', 'lt', 'gte', 'lte',
    'like', 'ilike', 'or', 'and', 'not', 'filter',
    'order', 'limit', 'range', 'match',
    'textSearch', 'contains', 'containedBy', 'overlaps',
  ]

  for (const method of chainMethods) {
    builder[method] = (..._args: unknown[]) => builder
  }

  // .single() and .maybeSingle() switch to single-row mode
  builder.single = (..._args: unknown[]) => {
    _isSingle = true
    return builder
  }
  builder.maybeSingle = (..._args: unknown[]) => {
    _isSingle = true
    return builder
  }

  return builder
}

/**
 * The mock Supabase client.
 */
export function createDemoSupabaseClient(): unknown {
  const client = {
    auth: {
      getSession: async () => ({ data: { session: DEMO_SESSION }, error: null }),
      getUser: async () => ({ data: { user: DEMO_USER }, error: null }),
      onAuthStateChange: (_callback: unknown) => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
      signOut: async () => ({ error: null }),
      signInWithOAuth: async () => ({ data: {}, error: null }),
      signInWithOtp: async () => ({ data: {}, error: null }),
      exchangeCodeForSession: async () => ({ data: { session: DEMO_SESSION }, error: null }),
      verifyOtp: async () => ({ data: { session: DEMO_SESSION }, error: null }),
    },
    from: (tableName: string) => createMockQueryBuilder(tableName),
    schema: (schemaName: string) => ({
      from: (tableName: string) => createMockQueryBuilder(tableName, schemaName),
    }),
    storage: {
      from: (_bucket: string) => ({
        upload: async () => ({ data: { path: 'demo/avatar.png' }, error: null }),
        getPublicUrl: (_path: string) => ({
          data: { publicUrl: 'https://i.pravatar.cc/150?u=demo' },
        }),
      }),
    },
    channel: (_name: string) => ({
      on: () => ({ subscribe: () => ({ unsubscribe: () => {} }) }),
    }),
    removeChannel: () => {},
  }

  return client
}
