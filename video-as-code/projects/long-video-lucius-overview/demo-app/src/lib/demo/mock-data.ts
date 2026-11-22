import { DEFAULT_CLIENT_CHAT_RECORDING_SCENARIO } from '../client-chat-recording'

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

function buildDemoAttachmentDataUrl(label: string, accent: string, outline: string): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="640" height="420" viewBox="0 0 640 420">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F7F1E6" />
          <stop offset="100%" stop-color="${accent}" stop-opacity="0.22" />
        </linearGradient>
      </defs>
      <rect width="640" height="420" rx="36" fill="url(#bg)" />
      <g opacity="0.28" fill="${outline}">
        <circle cx="92" cy="82" r="4" />
        <circle cx="124" cy="82" r="4" />
        <circle cx="156" cy="82" r="4" />
        <circle cx="92" cy="114" r="4" />
        <circle cx="124" cy="114" r="4" />
        <circle cx="156" cy="114" r="4" />
      </g>
      <rect x="72" y="72" width="496" height="276" rx="28" fill="#FFFDF8" stroke="${outline}" stroke-opacity="0.24" />
      <rect x="104" y="120" width="188" height="26" rx="13" fill="${accent}" fill-opacity="0.16" />
      <rect x="104" y="170" width="358" height="16" rx="8" fill="#D8CFBF" />
      <rect x="104" y="198" width="404" height="16" rx="8" fill="#E6DDCF" />
      <rect x="104" y="226" width="318" height="16" rx="8" fill="#E6DDCF" />
      <rect x="104" y="272" width="128" height="40" rx="20" fill="${accent}" fill-opacity="0.18" />
      <text x="104" y="108" fill="#2C3040" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700">${label}</text>
    </svg>
  `.trim()

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export const DEMO_ASSIST_TASK_EVENTS = [
  {
    id: 'assist-demo-review-step',
    title: 'Teams keep asking for a review step before Lucius sends the reply',
    summary:
      'The same manual edit pattern is appearing across support and ops. Lucius can surface it as a teammate workflow instead of another isolated ticket.',
    suggested_reply:
      'I found the repeated pattern: teams trust Lucius on the common path, but want a fast human review step for billing edge cases, escalations, and policy replies.',
    client_supplemental_knowledge:
      'Frame this as a teammate control point, not a trust issue. Review step should be quick and explicit.',
    context: {
      narrative: DEFAULT_CLIENT_CHAT_RECORDING_SCENARIO.intertitles.signals.headline,
    },
    cannot_reply_reason: '',
    platform: 'discord',
    user_id: 'support-lead',
    channel_id: 'discord-support-ops',
    channel_name: '#support-ops',
    owner_user_id: null,
    owner_display_name: null,
    owner_avatar_url: null,
    priority: 'urgent',
    manual_review_required: true,
    manual_review_status: 'pending',
    sla_due_at: demoDate(180),
    last_activity_at: demoDate(34),
    created_at: demoDate(210),
    updated_at: demoDate(34),
    status: 'pending',
    event_type: 'product_feedback',
    message_ids: ['assist-demo-review-step-1', 'assist-demo-review-step-2'],
    event_user_avatar_url: null,
  },
  {
    id: 'assist-demo-handoff-pattern',
    title: 'Ops handoff requests need a clearer Lucius routing rule',
    summary:
      'Escalation notes and support edits point to the same gap: Lucius joins the conversation late, after a human handoff already happened.',
    suggested_reply:
      'We should route Lucius into the handoff stage earlier, so the teammate is present before the issue becomes an escalation.',
    client_supplemental_knowledge:
      'Tie this to the recording story: Lucius should join the right channel, not just answer inside one thread.',
    context: {
      narrative: DEFAULT_CLIENT_CHAT_RECORDING_SCENARIO.intertitles.evidence.subline,
    },
    cannot_reply_reason: '',
    platform: 'slack',
    user_id: 'ops-pod',
    channel_id: 'slack-cs-pod-sync',
    channel_name: 'CS pod sync',
    owner_user_id: 'owner-01',
    owner_display_name: 'Maya Soto',
    owner_avatar_url: null,
    priority: null,
    manual_review_required: true,
    manual_review_status: 'confirmed',
    sla_due_at: demoDate(-90),
    last_activity_at: demoDate(18),
    created_at: demoDate(160),
    updated_at: demoDate(18),
    status: 'processing',
    event_type: 'usage_issue',
    message_ids: ['assist-demo-handoff-pattern-1', 'assist-demo-handoff-pattern-2'],
    event_user_avatar_url: null,
  },
  {
    id: 'assist-demo-knowledge-gap',
    title: 'A reusable answer should become knowledge, not stay buried in chat edits',
    summary:
      'The answer is already stable enough to reuse. The team keeps rewriting it in tickets instead of promoting it into the knowledge base.',
    suggested_reply:
      'Let Lucius capture this as reusable knowledge and cite the source document the team already trusts.',
    client_supplemental_knowledge:
      'Use knowledge-base language: source of truth, reusable answer, reviewed evidence.',
    context: {
      narrative: DEFAULT_CLIENT_CHAT_RECORDING_SCENARIO.outcomeScene.summary,
    },
    cannot_reply_reason: '',
    platform: 'feishu',
    user_id: 'knowledge-owner',
    channel_id: 'feishu-knowledge-council',
    channel_name: 'Knowledge council',
    owner_user_id: 'owner-02',
    owner_display_name: 'Alex Chen',
    owner_avatar_url: null,
    priority: null,
    manual_review_required: true,
    manual_review_status: 'pending',
    sla_due_at: demoDate(-180),
    last_activity_at: demoDate(11),
    created_at: demoDate(120),
    updated_at: demoDate(11),
    status: 'pending',
    event_type: 'knowledge_request',
    message_ids: ['assist-demo-knowledge-gap-1', 'assist-demo-knowledge-gap-2'],
    event_user_avatar_url: null,
  },
  {
    id: 'assist-demo-escalation-note',
    title: 'A one-off escalation was handled manually and should stay out of the queue',
    summary:
      'The team rejected the auto draft for this case and resolved it offline. Keep it visible as history, not active teammate work.',
    suggested_reply: null,
    client_supplemental_knowledge: null,
    context: {
      narrative: 'Historical escalation resolved outside the teammate flow.',
    },
    cannot_reply_reason: 'Resolved manually by the on-call lead.',
    platform: 'telegram',
    user_id: 'oncall-ops',
    channel_id: 'telegram-ops-escalation',
    channel_name: 'Ops escalation',
    owner_user_id: 'owner-03',
    owner_display_name: 'Jordan Lee',
    owner_avatar_url: null,
    priority: null,
    manual_review_required: true,
    manual_review_status: 'rejected',
    sla_due_at: demoDate(-300),
    last_activity_at: demoDate(86),
    created_at: demoDate(310),
    updated_at: demoDate(86),
    status: 'resolved',
    event_type: 'exception_issue',
    message_ids: ['assist-demo-escalation-note-1'],
    event_user_avatar_url: null,
  },
] as const

export const DEMO_ASSIST_TASK_EVENT_MESSAGES = {
  'assist-demo-review-step': [
    {
      platform: 'discord',
      messageId: 'assist-demo-review-step-1',
      role: 'staff',
      authorName: 'Support lead',
      authorAvatarUrl: null,
      content: 'Manual edit before send keeps coming up on billing and policy replies.',
      sentAt: demoDate(46),
    },
    {
      platform: 'discord',
      messageId: 'assist-demo-review-step-2',
      role: 'lucius',
      authorName: 'Lucius',
      authorAvatarUrl: '/figma-auth/Logo%20Mark_black.svg',
      content: 'Pattern confirmed. This should become a lightweight teammate review step, not a separate tool mode.',
      sentAt: demoDate(34),
    },
  ],
  'assist-demo-handoff-pattern': [
    {
      platform: 'slack',
      messageId: 'assist-demo-handoff-pattern-1',
      role: 'staff',
      authorName: 'Ops handoff',
      authorAvatarUrl: null,
      content: 'We only bring Lucius in after the escalation note is already written.',
      sentAt: demoDate(32),
    },
    {
      platform: 'slack',
      messageId: 'assist-demo-handoff-pattern-2',
      role: 'lucius',
      authorName: 'Lucius',
      authorAvatarUrl: '/figma-auth/Logo%20Mark_black.svg',
      content: 'Earlier routing would let me gather the signal before the handoff becomes reactive.',
      sentAt: demoDate(18),
    },
  ],
  'assist-demo-knowledge-gap': [
    {
      platform: 'feishu',
      messageId: 'assist-demo-knowledge-gap-1',
      role: 'staff',
      authorName: 'Knowledge owner',
      authorAvatarUrl: null,
      content: 'We keep rewriting the same explanation instead of turning it into reusable guidance.',
      sentAt: demoDate(19),
    },
    {
      platform: 'feishu',
      messageId: 'assist-demo-knowledge-gap-2',
      role: 'lucius',
      authorName: 'Lucius',
      authorAvatarUrl: '/figma-auth/Logo%20Mark_black.svg',
      content: 'I can capture the answer, link the document evidence, and keep it ready for the next review.',
      sentAt: demoDate(11),
    },
  ],
  'assist-demo-escalation-note': [
    {
      platform: 'telegram',
      messageId: 'assist-demo-escalation-note-1',
      role: 'admin',
      authorName: 'On-call lead',
      authorAvatarUrl: null,
      content: 'Handled offline. Reject the draft and keep this out of the active review queue.',
      sentAt: demoDate(86),
    },
  ],
} as const

export const DEMO_ASSIST_TASK_EVENT_ADOPTED_KNOWLEDGE = {
  'assist-demo-review-step': [
    {
      messageId: 'assist-demo-review-step-2',
      createdAt: demoDate(30),
      adoptedKnowledgeItems: [
        {
          name: 'Reply review guardrail',
          contentSnapshot: 'Teams want a fast review step before Lucius sends high-risk replies.',
          source: 'manual',
        },
      ],
    },
  ],
  'assist-demo-knowledge-gap': [
    {
      messageId: 'assist-demo-knowledge-gap-2',
      createdAt: demoDate(9),
      adoptedKnowledgeItems: [
        {
          name: 'Reusable answer promotion',
          contentSnapshot: 'Stable support edits should become knowledge with a cited source document.',
          source: 'document',
        },
      ],
    },
  ],
} as const

const DEMO_KNOWLEDGE_ATTACHMENT_REVIEW = buildDemoAttachmentDataUrl(
  'Review step pattern',
  '#5538C7',
  '#B268D8',
)
const DEMO_KNOWLEDGE_ATTACHMENT_HANDOFF = buildDemoAttachmentDataUrl(
  'Handoff routing map',
  '#504DDC',
  '#5538C7',
)

export const DEMO_KNOWLEDGE_V4_ITEMS = [
  {
    id: 'knowledge-demo-review-step',
    company_id: DEMO_COMPANY_ID,
    key: 'Reply review step',
    text: 'When Lucius is handling a sensitive or ambiguous reply, teams want a quick review step instead of a hidden automation toggle.',
    answer:
      'Default to Lucius as a teammate. Let humans review billing, policy, and escalation replies before send.',
    source_type: 'document',
    doc_file_path: 'teammate-review-playbook.pdf',
    doc_chunk_id: 'chunk-review-step-01',
    doc_page: 3,
    status: 'active',
    created_by: 'Alex Chen',
    created_at: demoDate(340),
    updated_at: demoDate(24),
  },
  {
    id: 'knowledge-demo-handoff',
    company_id: DEMO_COMPANY_ID,
    key: 'Early handoff routing',
    text: 'Lucius should be added at the handoff stage, not after the escalation note is already written.',
    answer:
      'Join the teammate earlier in the workflow so signal gathering happens before ops escalation.',
    source_type: 'document',
    doc_file_path: 'ops-handoff-map.pdf',
    doc_chunk_id: 'chunk-handoff-02',
    doc_page: 2,
    status: 'active',
    created_by: 'Maya Soto',
    created_at: demoDate(220),
    updated_at: demoDate(18),
  },
  {
    id: 'knowledge-demo-guardrail',
    company_id: DEMO_COMPANY_ID,
    key: 'Teammate guardrail copy',
    text: 'Describe Lucius as an intelligent teammate with a clear human control point, not as a black-box auto-responder.',
    answer:
      'Use collaboration language: review step, handoff, source of truth, and clear next action.',
    source_type: 'manual',
    status: 'active',
    created_by: 'Alex Chen',
    created_at: demoDate(170),
    updated_at: demoDate(7),
  },
  {
    id: 'knowledge-demo-source-of-truth',
    company_id: DEMO_COMPANY_ID,
    key: 'Source-of-truth document',
    text: 'Stable answers should point back to a reviewed source document so Lucius can explain where the recommendation came from.',
    answer:
      'Promote stable support edits into knowledge and attach the document evidence that backs the answer.',
    source_type: 'document',
    doc_file_path: 'knowledge-source-of-truth.pdf',
    doc_chunk_id: 'chunk-source-01',
    doc_page: 5,
    status: 'active',
    created_by: 'Jordan Lee',
    created_at: demoDate(140),
    updated_at: demoDate(11),
  },
] as const

export const DEMO_KNOWLEDGE_DOCUMENTS = [
  {
    id: 'document-demo-review-playbook',
    company_id: DEMO_COMPANY_ID,
    file_name: 'teammate-review-playbook.pdf',
    file_type: 'application/pdf',
    file_size: 426188,
    status: 'completed',
    knowledge_count: 2,
    uploaded_by: 'Alex Chen',
    created_at: demoDate(360),
    updated_at: demoDate(26),
  },
  {
    id: 'document-demo-handoff-map',
    company_id: DEMO_COMPANY_ID,
    file_name: 'ops-handoff-map.pdf',
    file_type: 'application/pdf',
    file_size: 291104,
    status: 'completed',
    knowledge_count: 1,
    uploaded_by: 'Maya Soto',
    created_at: demoDate(240),
    updated_at: demoDate(18),
  },
  {
    id: 'document-demo-source-of-truth',
    company_id: DEMO_COMPANY_ID,
    file_name: 'knowledge-source-of-truth.pdf',
    file_type: 'application/pdf',
    file_size: 518772,
    status: 'completed',
    knowledge_count: 1,
    uploaded_by: 'Jordan Lee',
    created_at: demoDate(180),
    updated_at: demoDate(11),
  },
] as const

export const DEMO_KNOWLEDGE_DOCUMENT_STATUS = {
  'document-demo-review-playbook': {
    id: 'document-demo-review-playbook',
    company_id: DEMO_COMPANY_ID,
    file_name: 'teammate-review-playbook.pdf',
    file_hash: 'demo-hash-review-playbook',
    file_size: 426188,
    file_type: 'application/pdf',
    storage_url: null,
    uploaded_by: 'Alex Chen',
    status: 'completed',
    error_message: null,
    knowledge_count: 2,
    chunk_progress: {
      chunk_total: 18,
      chunk_pending: 0,
      chunk_extracting: 0,
      chunk_done: 16,
      chunk_failed: 2,
      chunk_skipped: 0,
      failed_chunk_details: [
        {
          chunk_id: 'failed-review-17',
          heading: 'Escalation exception notes',
          error_message: 'OCR confidence was too low for this screenshot-heavy page.',
          extraction_status: 'failed',
          extraction_attempts: 2,
        },
        {
          chunk_id: 'failed-review-18',
          heading: 'Localized policy appendix',
          error_message: 'Section layout changed and needs a retry with adjusted parsing.',
          extraction_status: 'failed',
          extraction_attempts: 1,
        },
      ],
    },
    created_at: demoDate(360),
    updated_at: demoDate(26),
  },
  'document-demo-handoff-map': {
    id: 'document-demo-handoff-map',
    company_id: DEMO_COMPANY_ID,
    file_name: 'ops-handoff-map.pdf',
    file_hash: 'demo-hash-handoff-map',
    file_size: 291104,
    file_type: 'application/pdf',
    storage_url: null,
    uploaded_by: 'Maya Soto',
    status: 'completed',
    error_message: null,
    knowledge_count: 1,
    chunk_progress: {
      chunk_total: 12,
      chunk_pending: 0,
      chunk_extracting: 0,
      chunk_done: 12,
      chunk_failed: 0,
      chunk_skipped: 0,
      failed_chunk_details: [],
    },
    created_at: demoDate(240),
    updated_at: demoDate(18),
  },
  'document-demo-source-of-truth': {
    id: 'document-demo-source-of-truth',
    company_id: DEMO_COMPANY_ID,
    file_name: 'knowledge-source-of-truth.pdf',
    file_hash: 'demo-hash-source-truth',
    file_size: 518772,
    file_type: 'application/pdf',
    storage_url: null,
    uploaded_by: 'Jordan Lee',
    status: 'completed',
    error_message: null,
    knowledge_count: 1,
    chunk_progress: {
      chunk_total: 14,
      chunk_pending: 0,
      chunk_extracting: 0,
      chunk_done: 14,
      chunk_failed: 0,
      chunk_skipped: 0,
      failed_chunk_details: [],
    },
    created_at: demoDate(180),
    updated_at: demoDate(11),
  },
} as const

export const DEMO_KNOWLEDGE_DOCUMENT_PIPELINE = {
  'document-demo-review-playbook': {
    document_id: 'document-demo-review-playbook',
    document_status: 'completed',
    current_stage: 'completed',
    stages: [
      { name: 'uploaded', status: 'done' },
      { name: 'parsed', status: 'done' },
      { name: 'chunked', status: 'done' },
      { name: 'extracting', status: 'partial' },
      { name: 'completed', status: 'done' },
    ],
    chunk_total: 18,
    chunk_pending: 0,
    chunk_extracting: 0,
    chunk_done: 16,
    chunk_failed: 2,
    chunk_skipped: 0,
    attachment_total: 2,
    knowledge_total: 2,
    error_message: null,
  },
  'document-demo-handoff-map': {
    document_id: 'document-demo-handoff-map',
    document_status: 'completed',
    current_stage: 'completed',
    stages: [
      { name: 'uploaded', status: 'done' },
      { name: 'parsed', status: 'done' },
      { name: 'chunked', status: 'done' },
      { name: 'extracting', status: 'done' },
      { name: 'completed', status: 'done' },
    ],
    chunk_total: 12,
    chunk_pending: 0,
    chunk_extracting: 0,
    chunk_done: 12,
    chunk_failed: 0,
    chunk_skipped: 0,
    attachment_total: 1,
    knowledge_total: 1,
    error_message: null,
  },
  'document-demo-source-of-truth': {
    document_id: 'document-demo-source-of-truth',
    document_status: 'completed',
    current_stage: 'completed',
    stages: [
      { name: 'uploaded', status: 'done' },
      { name: 'parsed', status: 'done' },
      { name: 'chunked', status: 'done' },
      { name: 'extracting', status: 'done' },
      { name: 'completed', status: 'done' },
    ],
    chunk_total: 14,
    chunk_pending: 0,
    chunk_extracting: 0,
    chunk_done: 14,
    chunk_failed: 0,
    chunk_skipped: 0,
    attachment_total: 0,
    knowledge_total: 1,
    error_message: null,
  },
} as const

export const DEMO_KNOWLEDGE_DOCUMENT_KNOWLEDGE = {
  'document-demo-review-playbook': [
    {
      id: 'knowledge-demo-review-step',
      key: 'Reply review step',
      answer:
        'Default to Lucius as a teammate. Let humans review billing, policy, and escalation replies before send.',
      status: 'active',
      document_id: 'document-demo-review-playbook',
      chunk_id: 'chunk-review-step-01',
      source_type: 'document',
      created_at: demoDate(340),
      updated_at: demoDate(24),
    },
    {
      id: 'knowledge-demo-guardrail',
      key: 'Teammate guardrail copy',
      answer:
        'Use collaboration language: review step, handoff, source of truth, and clear next action.',
      status: 'active',
      document_id: 'document-demo-review-playbook',
      chunk_id: 'chunk-review-step-04',
      source_type: 'manual',
      created_at: demoDate(170),
      updated_at: demoDate(7),
    },
  ],
  'document-demo-handoff-map': [
    {
      id: 'knowledge-demo-handoff',
      key: 'Early handoff routing',
      answer:
        'Join the teammate earlier in the workflow so signal gathering happens before ops escalation.',
      status: 'active',
      document_id: 'document-demo-handoff-map',
      chunk_id: 'chunk-handoff-02',
      source_type: 'document',
      created_at: demoDate(220),
      updated_at: demoDate(18),
    },
  ],
  'document-demo-source-of-truth': [
    {
      id: 'knowledge-demo-source-of-truth',
      key: 'Source-of-truth document',
      answer:
        'Promote stable support edits into knowledge and attach the document evidence that backs the answer.',
      status: 'active',
      document_id: 'document-demo-source-of-truth',
      chunk_id: 'chunk-source-01',
      source_type: 'document',
      created_at: demoDate(140),
      updated_at: demoDate(11),
    },
  ],
} as const

export const DEMO_KNOWLEDGE_DOCUMENT_ATTACHMENTS = {
  'document-demo-review-playbook': [
    {
      id: 'attachment-demo-review',
      document_id: 'document-demo-review-playbook',
      company_id: DEMO_COMPANY_ID,
      type: 'image',
      file_name: 'review-step-pattern.png',
      storage_path: 'demo/review-step-pattern.png',
      storage_url: DEMO_KNOWLEDGE_ATTACHMENT_REVIEW,
      mime_type: 'image/svg+xml',
      file_size: 18924,
      created_at: demoDate(320),
      updated_at: demoDate(24),
    },
    {
      id: 'attachment-demo-handoff',
      document_id: 'document-demo-review-playbook',
      company_id: DEMO_COMPANY_ID,
      type: 'image',
      file_name: 'handoff-routing-map.png',
      storage_path: 'demo/handoff-routing-map.png',
      storage_url: DEMO_KNOWLEDGE_ATTACHMENT_HANDOFF,
      mime_type: 'image/svg+xml',
      file_size: 19418,
      created_at: demoDate(300),
      updated_at: demoDate(24),
    },
  ],
  'document-demo-handoff-map': [
    {
      id: 'attachment-demo-handoff-map',
      document_id: 'document-demo-handoff-map',
      company_id: DEMO_COMPANY_ID,
      type: 'image',
      file_name: 'routing-overview.png',
      storage_path: 'demo/routing-overview.png',
      storage_url: DEMO_KNOWLEDGE_ATTACHMENT_HANDOFF,
      mime_type: 'image/svg+xml',
      file_size: 19418,
      created_at: demoDate(200),
      updated_at: demoDate(18),
    },
  ],
  'document-demo-source-of-truth': [],
} as const

export const DEMO_KNOWLEDGE_SOURCE_MAP = {
  'knowledge-demo-review-step': {
    knowledge: DEMO_KNOWLEDGE_V4_ITEMS[0],
    document: {
      id: 'document-demo-review-playbook',
      company_id: DEMO_COMPANY_ID,
      file_name: 'teammate-review-playbook.pdf',
      file_hash: 'demo-hash-review-playbook',
      file_type: 'application/pdf',
      file_size: 426188,
      status: 'completed',
      storage_url: null,
      created_at: demoDate(360),
      updated_at: demoDate(26),
    },
    chunk: {
      chunk_id: 'chunk-review-step-01',
      content:
        'Teams trust Lucius on the common path, but billing, policy, and escalation replies still need a fast teammate review step before send.',
    },
  },
  'knowledge-demo-handoff': {
    knowledge: DEMO_KNOWLEDGE_V4_ITEMS[1],
    document: {
      id: 'document-demo-handoff-map',
      company_id: DEMO_COMPANY_ID,
      file_name: 'ops-handoff-map.pdf',
      file_hash: 'demo-hash-handoff-map',
      file_type: 'application/pdf',
      file_size: 291104,
      status: 'completed',
      storage_url: null,
      created_at: demoDate(240),
      updated_at: demoDate(18),
    },
    chunk: {
      chunk_id: 'chunk-handoff-02',
      content:
        'Lucius should join the workflow during handoff, not after an escalation note already exists.',
    },
  },
  'knowledge-demo-guardrail': {
    knowledge: DEMO_KNOWLEDGE_V4_ITEMS[2],
    document: null,
    chunk: null,
  },
  'knowledge-demo-source-of-truth': {
    knowledge: DEMO_KNOWLEDGE_V4_ITEMS[3],
    document: {
      id: 'document-demo-source-of-truth',
      company_id: DEMO_COMPANY_ID,
      file_name: 'knowledge-source-of-truth.pdf',
      file_hash: 'demo-hash-source-truth',
      file_type: 'application/pdf',
      file_size: 518772,
      status: 'completed',
      storage_url: null,
      created_at: demoDate(180),
      updated_at: demoDate(11),
    },
    chunk: {
      chunk_id: 'chunk-source-01',
      content:
        'Reusable answers should cite a reviewed document so Lucius can explain the evidence behind each recommendation.',
    },
  },
} as const
