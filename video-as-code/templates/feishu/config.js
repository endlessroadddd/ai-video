// ============================================================
//  FEISHU DEMO — CONFIGURATION
//  Edit this file to customize the chat list and conversation.
// ============================================================

// DiceBear cartoon avatars — change the `seed` to get a different character
const DIC = (seed, bg = 'b6e3f4') =>
  `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}&backgroundColor=${bg}&radius=50`;

window.FeishuConfig = {

  // ── Sidebar ──────────────────────────────────────────────
  messengerBadge: 6,
  userInitials: 'K',
  userAvatarBg: 'linear-gradient(135deg,#f472b6,#9d4edd)',

  // ── Active chat (matches an 'id' in chatList) ─────────────
  activeChat: 'cs-team',

  // ── Chat List ─────────────────────────────────────────────
  // avatarType : 'initials' | 'multi' | 'image'
  // badge      : null | 'External' | 'BOT' | 'Official' | 'Dept'
  chatList: [
    {
      id: 'cs-team',
      name: 'CS Work Group',
      badge: null,
      avatarType: 'multi',
      members: [
        { initials: 'S',  color: '#e53e3e' },
        { initials: 'M',  color: '#f5a623' },
        { initials: 'Li', color: '#34a853' },
        { initials: 'Al', color: '#7b61ff' },
      ],
      time: 'Just now',
      previewSender: 'Lucius',
      previewText: '🔔 New Event: User @CryptoKing99...',
      unread: 4,
    },
    {
      id: 'product-design',
      name: 'Product Design',
      badge: null,
      avatarType: 'multi',
      members: [
        { initials: 'E',  color: '#3370ff' },
        { initials: 'J',  color: '#00c7a3' },
        { initials: 'R',  color: '#ff6b35' },
        { initials: 'T',  color: '#a855f7' },
      ],
      time: '14:32',
      previewSender: 'Emma',
      previewText: 'New mockups are ready for review 🎨',
      unread: 2,
    },
    {
      id: 'eng-standup',
      name: 'Engineering Standup',
      badge: null,
      avatarType: 'multi',
      members: [
        { initials: 'D',  color: '#1456f0' },
        { initials: 'N',  color: '#e53e3e' },
        { initials: 'P',  color: '#f59e0b' },
        { initials: 'W',  color: '#0fad5a' },
      ],
      time: '10:15',
      previewSender: 'David',
      previewText: 'Deploy pipeline is green ✅',
      unread: 0,
    },
    {
      id: 'marketing',
      name: 'Marketing & Growth',
      badge: null,
      avatarType: 'multi',
      members: [
        { initials: 'C',  color: '#ec4899' },
        { initials: 'O',  color: '#f5a623' },
        { initials: 'H',  color: '#6366f1' },
        { initials: 'B',  color: '#14b8a6' },
      ],
      time: '09:50',
      previewSender: 'Chloe',
      previewText: 'Q2 campaign brief attached',
      unread: 0,
    },
    {
      id: 'leadership',
      name: 'Leadership Sync',
      badge: null,
      avatarType: 'multi',
      members: [
        { initials: 'V',  color: '#7c3aed' },
        { initials: 'F',  color: '#059669' },
        { initials: 'K',  color: '#1d4ed8' },
        { initials: 'G',  color: '#dc2626' },
      ],
      time: 'Yesterday',
      previewSender: 'Victor',
      previewText: 'Board deck needs one more update',
      unread: 0,
    },
    {
      id: 'project-phoenix',
      name: 'Project Phoenix 🔥',
      badge: null,
      avatarType: 'multi',
      members: [
        { initials: 'A',  color: '#f97316' },
        { initials: 'S',  color: '#3b82f6' },
        { initials: 'Y',  color: '#10b981' },
        { initials: 'Z',  color: '#8b5cf6' },
      ],
      time: 'Yesterday',
      previewSender: 'Amy',
      previewText: 'Sprint 12 planning locked in',
      unread: 0,
    },
    {
      id: 'jessica',
      name: 'Jessica Chen',
      badge: null,
      avatarType: 'image',
      avatarSrc: DIC('Jessica', 'ffd5dc'),
      time: 'Apr 9',
      previewSender: null,
      previewText: 'Sounds good, talk later!',
      unread: 0,
    },
    {
      id: 'data-analytics',
      name: 'Data & Analytics',
      badge: null,
      avatarType: 'multi',
      members: [
        { initials: 'Q',  color: '#06b6d4' },
        { initials: 'I',  color: '#f59e0b' },
        { initials: 'U',  color: '#6d28d9' },
        { initials: 'X',  color: '#be123c' },
      ],
      time: 'Apr 8',
      previewSender: 'Quinn',
      previewText: 'Monthly report published',
      unread: 0,
    },
    {
      id: 'feishu-assistant',
      name: "Feishu Assistant",
      badge: 'Official',
      avatarType: 'initials',
      avatarColor: '#00c7a3',
      avatarInitials: '✦',
      time: 'Apr 7',
      previewSender: 'Feishu Assistant',
      previewText: 'Your request is ready...',
      unread: 0,
    },
    {
      id: 'security',
      name: 'Account Security Center',
      badge: 'BOT',
      avatarType: 'initials',
      avatarColor: '#4285f4',
      avatarInitials: '🔒',
      time: 'Apr 6',
      previewSender: null,
      previewText: 'Login security notice',
      unread: 0,
    },
    {
      id: 'general',
      name: 'General',
      badge: 'Dept',
      avatarType: 'multi',
      members: [
        { initials: 'A', color: '#3370ff' },
        { initials: 'B', color: '#e53e3e' },
        { initials: 'C', color: '#0fad5a' },
        { initials: 'D', color: '#f5a623' },
      ],
      time: 'Apr 5',
      previewSender: 'HR',
      previewText: 'Company all-hands is April 20',
      unread: 0,
    },
  ],

  // ── Main Chat Window ──────────────────────────────────────
  mainChat: {
    name: 'CS Work Group',
    badge: null,
    memberCount: 5,
    // Header group avatar: use multi-grid style
    avatarSrc: null,
    avatarColor: null,
    members: [
      { initials: 'S', color: '#e53e3e' },
      { initials: 'M', color: '#f5a623' },
      { initials: 'L', color: '#34a853' },
      { initials: 'A', color: '#7b61ff' },
    ],
  },

  // ── Conversation Participants ─────────────────────────────
  participants: {
    lucius: {
      name: 'Lucius',
      isBot: true,
      avatarType: 'image',
      avatarSrc: '../demo-app/public/figma-auth/Logo Mark_black.svg',
      avatarBg: '#eef3ff',
    },
    sarah: {
      name: 'Sarah',
      avatarType: 'image',
      avatarSrc: DIC('Sarah', 'ffd5dc'),
      avatarBg: '#ffd5dc',
    },
    mike: {
      name: 'Mike',
      avatarType: 'image',
      avatarSrc: DIC('Mike', 'd1d4f9'),
      avatarBg: '#d1d4f9',
    },
    linda: {
      name: 'Linda',
      avatarType: 'image',
      avatarSrc: DIC('Linda', 'c0aede'),
      avatarBg: '#c0aede',
    },
    alex: {
      name: 'Alex',
      avatarType: 'image',
      avatarSrc: DIC('Alex', 'b6e3f4'),
      avatarBg: '#b6e3f4',
    },
  },

  // ── History Messages (shown on load) ──────────────────────
  historyMessages: [
    { type: 'system', text: 'CS Work Group was created' },
    { sender: 'mike',  type: 'text', text: 'Good morning everyone! Ready for the shift 👋', time: '09:00' },
    { sender: 'sarah', type: 'text', text: 'Morning! ☕',                                    time: '09:02' },
    { sender: 'linda', type: 'text', text: 'Morning all — looks like a busy one 😅',         time: '09:05' },
    { sender: 'alex',  type: 'text', text: 'Already 12 tickets in the queue...',             time: '09:07' },
  ],

  // ── Conversation Script (animated, plays after load) ──────
  conversationScript: [
    {
      sender: 'lucius',
      type: 'card',
      delay: 2000,
      typingDuration: 1800,
      time: 'Just now',
      card: {
        headerColor: '#f5222d',
        title: '🔔 New Customer Event',
        badge: 'Refund Request',
        fields: [
          { label: 'Customer',  value: '@CryptoKing99' },
          { label: 'Channel',   value: 'Support Portal' },
          {
            label: "Customer's Words",
            value: '"I topped up $10, now the coin price dropped. You must pay me $500 — or I\'ll report you to the SEC!"',
            isQuote: true,
          },
        ],
        actions: ['View Details', 'Assign to Me'],
      },
    },
    {
      sender: 'sarah',
      type: 'text',
      delay: 3000,
      typingDuration: 2800,
      time: 'Just now',
      text: 'What am I even supposed to say to this.... 😭',
    },
    {
      sender: 'mike',
      type: 'text',
      delay: 2000,
      typingDuration: 1500,
      time: 'Just now',
      text: "lol I've had 3 of these today already 🙃",
    },
    {
      sender: 'linda',
      type: 'text',
      delay: 2500,
      typingDuration: 2200,
      time: 'Just now',
      text: 'Same... so many users think market drops = guaranteed refunds 🤦‍♀️',
    },
    {
      sender: 'sarah',
      type: 'text',
      delay: 3200,
      typingDuration: 3200,
      time: 'Just now',
      text: "I really don't know how to handle this professionally without just wanting to type \"that's not how any of this works\" 😅",
    },
    {
      sender: 'alex',
      type: 'text',
      delay: 2000,
      typingDuration: 1600,
      time: 'Just now',
      text: 'Maybe ask Lucius for a suggested reply? 🤔',
    },
  ],
};
