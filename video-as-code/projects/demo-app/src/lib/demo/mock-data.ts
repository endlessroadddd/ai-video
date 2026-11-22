/**
 * Mock data for demo mode.
 *
 * All data is static and deterministic — no faker dependency in the main app bundle.
 */

// ---- Identity ----

export const DEMO_USER_ID = 'demo-user-00000000-0000-0000-0000-000000000001'
export const DEMO_USER_EMAIL = 'demo@lucius.ai'
export const DEMO_USER_NAME = 'Alex Chen'

export const DEMO_COMPANY_ID = 'demo-company-00000000-0000-0000-0000-000000000001'
export const DEMO_COMPANY_NAME = 'Lucius AI'

// ---- Company membership ----

export const DEMO_COMPANIES = [
  {
    companyId: DEMO_COMPANY_ID,
    companyName: DEMO_COMPANY_NAME,
    logoUrl: null,
    memberRole: 'owner' as const,
  },
]

// ---- Events ----

const eventTypes = [
  'product_feedback',
  'bug_report',
  'usage_issue',
  'order_issue',
  'business_cooperation',
  'exception_issue',
  'knowledge_request',
  'unrecognized_information',
] as const

const platforms = ['discord', 'slack', 'telegram', 'feishu'] as const
const statuses = ['pending', 'taken_over', 'ignored', 'handled'] as const

function demoDate(minutesAgo: number): string {
  return new Date(Date.now() - minutesAgo * 60 * 1000).toISOString()
}

export const DEMO_EVENTS = Array.from({ length: 12 }, (_, i) => ({
  id: `demo-event-${String(i + 1).padStart(3, '0')}`,
  company_id: DEMO_COMPANY_ID,
  event_type: eventTypes[i % eventTypes.length],
  status: statuses[i % statuses.length],
  platform: platforms[i % platforms.length],
  channel_name: ['#general', '#support', '#feedback', '#random', '#bugs', '#sales', '#onboarding', '#announcements', '#feature-requests', '#partnerships', '#billing', '#api-help'][i],
  title: [
    'Cannot export CSV from analytics dashboard',
    'Love the new event routing feature!',
    'How do I connect my Discord server?',
    'Order #4521 charged twice',
    'Partnership inquiry from TechCorp',
    'Webhook endpoint returning 500 errors',
    'How does AI suggestion training work?',
    'Spam messages in general channel',
    'Request for bulk user import API',
    'Integration with Notion for knowledge base',
    'Monthly billing cycle question',
    'API rate limiting documentation unclear',
  ][i],
  user_name: ['Sarah Kim', 'Marcus Johnson', 'Yuki Tanaka', 'Priya Sharma', 'James Wilson', 'Li Wei', 'Emma Garcia', 'Tom Anderson', 'Maria Santos', 'David Lee', 'Sophie Martin', 'Kenji Nakamura'][i],
  user_avatar: `https://i.pravatar.cc/150?u=demo-event-${i}`,
  message_preview: [
    'I tried clicking the export button but nothing happens. The spinner shows for a second then disappears...',
    "Just wanted to say the new event routing is amazing! It's saved us hours of manual triaging.",
    "Hi, I'm new to the platform. I have a Discord server with 500+ members and want to connect it.",
    "I was charged $49.99 twice for my March subscription. Can you help me get a refund for the duplicate?",
    "We'd love to explore integrating Lucius AI into our customer support workflow for our 10k+ user base.",
    "Our webhook endpoint at /api/events/hook has been returning intermittent 500 errors since yesterday.",
    "Can you explain how the AI learns from our approved responses? Does it use them for future suggestions?",
    'Getting a lot of spam messages. Is there a way to auto-filter or block certain patterns?',
    "We have 5000 users to migrate. Is there a bulk import API or do we need to add them one by one?",
    "Would be great if knowledge base items could sync from our Notion workspace automatically.",
    "Quick question: does the billing cycle start on signup date or the 1st of each month?",
    "The rate limiting docs say '100 requests per minute' but don't specify if that's per key or per IP.",
  ][i],
  ai_suggestion: [
    "I understand the CSV export issue. This is a known bug we're fixing in the next release. As a workaround, you can use the API endpoint GET /api/analytics/export to download your data directly.",
    "Thank you so much for the kind feedback! We're thrilled the event routing is working well for your team. We'd love to hear more about your workflow if you're open to a quick chat!",
    "Welcome! Connecting your Discord server is easy: go to Settings → Integrations → Discord → Connect. You'll need admin permissions on your Discord server. The setup takes about 2 minutes.",
    "I'm sorry about the duplicate charge. I've flagged this for our billing team and they'll process a refund within 3-5 business days. You'll receive a confirmation email once it's done.",
    "Thank you for your interest in partnering with us! I'll connect you with our partnerships team. Could you share more details about your use case and expected volume?",
    "I see the webhook errors in our logs. It appears to be a timeout issue with your endpoint. Please ensure your server responds within 10 seconds. I've also increased the retry count for your account.",
    "Great question! Lucius learns from every approved response through reinforcement learning. When you confirm a suggestion, it strengthens similar patterns. You can view the training data in Settings → AI Config.",
    "You can set up auto-moderation rules in Settings → Event Settings. We support keyword filters, regex patterns, and AI-powered spam detection. I'd recommend starting with the built-in spam filter.",
    "Yes! We have a bulk import API at POST /api/users/import. It accepts CSV or JSON format, up to 10,000 users per batch. I can share the documentation and a sample file.",
    "Notion integration is on our roadmap for Q2! In the meantime, you can use our web crawl feature to periodically sync your public Notion pages into the knowledge base.",
    "Your billing cycle starts on your signup date. So if you signed up on March 15th, your next billing date would be April 15th. You can see the exact dates in Settings → Billing.",
    "Good catch! The rate limit is per API key, not per IP. I'll update the docs to clarify. For your reference: Free plan gets 100 req/min, Basic gets 500, and Pro gets 2000.",
  ][i],
  owner_name: i % 3 === 0 ? null : ['Alex Chen', 'Sarah Kim', 'Marcus Johnson'][i % 3],
  owner_id: i % 3 === 0 ? null : `demo-owner-${i % 3}`,
  created_at: demoDate(i * 45 + 10),
  updated_at: demoDate(i * 20),
}))

// ---- Chat messages ----

export const DEMO_CHAT_SESSIONS = [
  {
    session_id: 'demo-session-001',
    session_uuid: 'demo-session-001',
    title: 'Event routing setup help',
    created_at: demoDate(120),
    updated_at: demoDate(5),
    last_message_preview: 'Shall I help you configure anything else?',
    is_pinned: true,
    pending_reply: false,
  },
  {
    session_id: 'demo-session-002',
    session_uuid: 'demo-session-002',
    title: 'Knowledge base best practices',
    created_at: demoDate(1440),
    updated_at: demoDate(60),
    last_message_preview: 'You can organize knowledge items by source type...',
    is_pinned: false,
    pending_reply: false,
  },
  {
    session_id: 'demo-session-003',
    session_uuid: 'demo-session-003',
    title: 'Discord integration troubleshooting',
    created_at: demoDate(2880),
    updated_at: demoDate(1440),
    last_message_preview: 'The bot permissions have been updated successfully.',
    is_pinned: false,
    pending_reply: false,
  },
]

export const DEMO_CHAT_MESSAGES = [
  {
    session_id: 'demo-session-001',
    message_id: 'msg-001',
    message_role: 'user',
    user_id: DEMO_USER_ID,
    username: DEMO_USER_NAME,
    avatar_url: null,
    content: 'Hey Lucius! Can you help me understand how the event routing works in our Discord server?',
    timestamp: demoDate(10),
    created_at: demoDate(10),
  },
  {
    session_id: 'demo-session-001',
    message_id: 'msg-002',
    message_role: 'assistant',
    user_id: null,
    username: 'Lucius',
    avatar_url: '/figma-auth/Logo%20Mark_black.svg',
    content: "Sure! Here's how event routing works:\n\n**1. Event Detection**\nWhen a message comes in from any platform channel, Lucius analyzes it using AI to classify the event type (e.g. bug report, feedback, support request).\n\n**2. Routing Rules**\nBased on the event type and your configured rules, the event gets routed to the appropriate team member or queue.\n\n**3. AI Suggestions**\nFor each event, Lucius generates a suggested reply that you can review, edit, and send.\n\nWould you like me to walk you through setting up custom routing rules?",
    timestamp: demoDate(9),
    created_at: demoDate(9),
  },
  {
    session_id: 'demo-session-001',
    message_id: 'msg-003',
    message_role: 'user',
    user_id: DEMO_USER_ID,
    username: DEMO_USER_NAME,
    avatar_url: null,
    content: 'Yes please! Especially for product feedback events — we want those to go directly to our PM team.',
    timestamp: demoDate(8),
    created_at: demoDate(8),
  },
  {
    session_id: 'demo-session-001',
    message_id: 'msg-004',
    message_role: 'assistant',
    user_id: null,
    username: 'Lucius',
    avatar_url: '/figma-auth/Logo%20Mark_black.svg',
    content: "Great choice! Here's how to set it up:\n\n1. Go to **Settings → Event Settings**\n2. Find the \"Product Feedback\" event type\n3. Under \"Responsible\", select your PM team members\n4. Enable notifications so they get pinged immediately\n\nYou can also set up a fallback — if no PM is available within 30 minutes, the event escalates to the admin queue.\n\nShall I help you configure anything else?",
    timestamp: demoDate(7),
    created_at: demoDate(7),
  },
]

// ---- Chart data ----

export const DEMO_CHART_DATA = Array.from({ length: 30 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - (29 - i))
  return {
    date: date.toISOString().split('T')[0],
    active_users: Math.round(80 + 40 * Math.sin(i / 5) + ((i * 7) % 11) - 5),
    new_users: Math.round(15 + 10 * Math.sin(i / 3) + ((i * 3) % 7) - 3),
    total_messages: Math.round(200 + 100 * Math.sin(i / 4) + ((i * 13) % 29) - 14),
  }
})

// ---- Users ----

export const DEMO_USERS = Array.from({ length: 20 }, (_, i) => ({
  id: `demo-user-${String(i + 1).padStart(3, '0')}`,
  username: ['Sarah Kim', 'Marcus Johnson', 'Yuki Tanaka', 'Priya Sharma', 'James Wilson', 'Li Wei', 'Emma Garcia', 'Tom Anderson', 'Maria Santos', 'David Lee', 'Sophie Martin', 'Kenji Nakamura', 'Anna Kowalski', 'Raj Patel', 'Laura Chen', 'Hans Mueller', 'Fatima Al-Hassan', 'Carlos Rivera', 'Mika Virtanen', 'Olga Petrov'][i],
  avatar_url: `https://i.pravatar.cc/150?u=demo-user-${i}`,
  platform: platforms[i % 4],
  platform_user_id: `plat-${i}`,
  tags: [['VIP', 'Active'], ['New'], ['Active', 'Enterprise'], ['Churned'], ['VIP'], ['New', 'Active'], ['Enterprise'], ['Free'], ['Active'], ['VIP', 'Enterprise'], [], ['New'], ['Active', 'Free'], ['VIP'], ['Enterprise', 'Active'], [], ['New', 'Free'], ['Active'], ['Enterprise', 'VIP'], ['Free']][i],
  total_messages: [847, 12, 423, 5, 1203, 67, 892, 34, 567, 1567, 23, 8, 345, 789, 1100, 56, 15, 234, 678, 45][i],
  last_active: demoDate([30, 1440, 120, 4320, 15, 720, 45, 2880, 90, 5, 10080, 60, 240, 360, 20, 8640, 180, 480, 60, 7200][i]),
  first_interaction: new Date(Date.now() - [90, 7, 180, 365, 45, 14, 120, 240, 60, 300, 3, 21, 150, 200, 30, 270, 10, 100, 160, 330][i] * 86400000).toISOString(),
  company_id: DEMO_COMPANY_ID,
}))

// ---- Knowledge base ----

export const DEMO_KNOWLEDGE_ITEMS = [
  { id: 'kb-001', title: 'Getting Started Guide', source: 'official_doc', chunk_count: 24, uploaded_at: demoDate(4320), uploader: DEMO_USER_NAME, company_id: DEMO_COMPANY_ID },
  { id: 'kb-002', title: 'API Reference v2.1', source: 'official_doc', chunk_count: 42, uploaded_at: demoDate(2880), uploader: 'Sarah Kim', company_id: DEMO_COMPANY_ID },
  { id: 'kb-003', title: 'Community Guidelines', source: 'manual', chunk_count: 8, uploaded_at: demoDate(1440), uploader: DEMO_USER_NAME, company_id: DEMO_COMPANY_ID },
  { id: 'kb-004', title: 'Pricing FAQ', source: 'web_crawl', chunk_count: 12, uploaded_at: demoDate(720), uploader: 'Marcus Johnson', company_id: DEMO_COMPANY_ID },
  { id: 'kb-005', title: 'Discord Bot Setup Tutorial', source: 'manual', chunk_count: 15, uploaded_at: demoDate(360), uploader: DEMO_USER_NAME, company_id: DEMO_COMPANY_ID },
  { id: 'kb-006', title: 'Privacy Policy', source: 'web_crawl', chunk_count: 6, uploaded_at: demoDate(180), uploader: 'Li Wei', company_id: DEMO_COMPANY_ID },
]

// ---- Members ----

export const DEMO_MEMBERS = [
  { id: DEMO_USER_ID, email: DEMO_USER_EMAIL, display_name: DEMO_USER_NAME, role: 'owner', status: 'active', avatar_url: null, created_at: demoDate(43200) },
  { id: 'demo-member-002', email: 'sarah@example.com', display_name: 'Sarah Kim', role: 'admin', status: 'active', avatar_url: 'https://i.pravatar.cc/150?u=sarah', created_at: demoDate(30240) },
  { id: 'demo-member-003', email: 'marcus@example.com', display_name: 'Marcus Johnson', role: 'member', status: 'active', avatar_url: 'https://i.pravatar.cc/150?u=marcus', created_at: demoDate(20160) },
  { id: 'demo-member-004', email: 'yuki@example.com', display_name: 'Yuki Tanaka', role: 'member', status: 'active', avatar_url: 'https://i.pravatar.cc/150?u=yuki', created_at: demoDate(10080) },
  { id: 'demo-member-005', email: 'priya@example.com', display_name: 'Priya Sharma', role: 'member', status: 'invited', avatar_url: null, created_at: demoDate(1440) },
]

// ---- Billing ----

export const DEMO_BILLING_SUMMARY = {
  plan: 'pro',
  plan_name: 'Pro',
  status: 'active',
  trial_end: null,
  current_period_start: new Date(Date.now() - 15 * 86400000).toISOString(),
  current_period_end: new Date(Date.now() + 15 * 86400000).toISOString(),
  monthly_price: 4999,
  actions_included: 5000,
  actions_used: 3247,
  extra_admins: 1,
  extra_platforms: 0,
  overage_actions: 0,
  overage_policy: 'auto_charge',
  blocked_actions: 0,
}

// ---- Integration status ----

export const DEMO_INTEGRATIONS = {
  discord: { connected: true, communities: [{ id: 'dc-1', name: 'Lucius Community', channels: 24, members: 1250 }] },
  slack: { connected: true, communities: [{ id: 'sl-1', name: 'Lucius Workspace', channels: 12, members: 45 }] },
  telegram: { connected: false, communities: [] },
  feishu: { connected: false, communities: [] },
}
