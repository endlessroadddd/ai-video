// ════════════════════════════════════════════════════════════
//  FEISHU DEMO — app.js
// ════════════════════════════════════════════════════════════
/* global FeishuConfig */

const C = window.FeishuConfig;

// ─── chatonly mode ───────────────────────────────────────────
if (new URLSearchParams(window.location.search).has('chatonly')) {
  document.body.classList.add('chatonly');
}

// ─── tiny helpers ────────────────────────────────────────────
const $  = id => document.getElementById(id);
const qq = sel => document.querySelector(sel);

function badgeHTML(b) {
  return b ? `<span class="badge badge-${b}">${b}</span>` : '';
}

// ─── avatar builders ─────────────────────────────────────────

/** Chat-list avatar */
function ciAvatarHTML(chat) {
  if (chat.avatarType === 'multi') {
    const cells = chat.members.map(m =>
      `<div class="sub-av" style="background:${m.color}">${m.initials}</div>`
    ).join('');
    return `<div class="ci-avatar multi">${cells}</div>`;
  }
  if (chat.avatarType === 'image') {
    return `<div class="ci-avatar" style="background:#eee">
      <img src="${chat.avatarSrc}" alt="${chat.name}" loading="lazy"/>
    </div>`;
  }
  return `<div class="ci-avatar" style="background:${chat.avatarColor || '#646a73'}">${chat.avatarInitials || '?'}</div>`;
}

/** Header group avatar */
function cwGroupAvatarHTML(mc) {
  if (mc.avatarSrc) {
    return `<div class="cw-group-avatar">
      <img src="${mc.avatarSrc}" alt="${mc.name}" loading="lazy"/>
    </div>`;
  }
  if (mc.avatarColor) {
    return `<div class="cw-group-avatar" style="background:${mc.avatarColor}">
      <span style="color:#fff;font-size:11px;font-weight:700">${mc.avatarInitials || mc.name.charAt(0)}</span>
    </div>`;
  }
  if (mc.members) {
    const cells = mc.members.slice(0, 4).map(m =>
      `<div class="sub-av" style="background:${m.color || '#888'}">${m.initials || '?'}</div>`
    ).join('');
    return `<div class="cw-group-avatar multi">${cells}</div>`;
  }
  return `<div class="cw-group-avatar" style="background:#3370ff">
    <span style="color:#fff;font-size:11px;font-weight:700">${mc.name.charAt(0)}</span>
  </div>`;
}

/** Message / typing avatar */
function msgAvHTML(p) {
  if (p.avatarType === 'image') {
    return `<div class="msg-av" style="background:${p.avatarBg || '#eee'}">
      <img src="${p.avatarSrc}" alt="${p.name}" loading="lazy"/>
    </div>`;
  }
  return `<div class="msg-av" style="background:${p.color || '#646a73'}">${p.initials || '?'}</div>`;
}

// ─── render: nav sidebar ─────────────────────────────────────
function renderNav() {
  const items = [
    { label: 'Messenger',   badge: C.messengerBadge, active: true,  cls: 'ic-messenger',
      icon: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>' },
    { label: 'Knowledge AI', badge: 0, active: false,
      icon: '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>' },
    { label: 'Meetings',     badge: 0, active: false,
      icon: '<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>' },
    { label: 'Calendar',     badge: 0, active: false,
      icon: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>' },
    { label: 'Docs',         badge: 0, active: false,
      icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>' },
    { label: 'Contacts',     badge: 0, active: false,
      icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' },
    { label: 'Email',        badge: 0, active: false,
      icon: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>' },
    { label: 'Tasks',        badge: 0, active: false,
      icon: '<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>' },
    { label: 'Workplace',    badge: 0, active: false,
      icon: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>' },
  ];

  const avatarStyle = C.userAvatarBg
    ? `style="background:${C.userAvatarBg}"`
    : 'style="background:linear-gradient(135deg,#f472b6,#9d4edd)"';

  $('nav-sidebar').innerHTML = `
    <div class="nav-top">
      <div class="nav-user-avatar" ${avatarStyle}>${C.userInitials || 'K'}</div>
      <div class="nav-compose-btn" title="New message">
        <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </div>
    </div>
    <div class="nav-searchbar">
      <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>
      <span class="nav-searchbar-text">Search</span>
      <span class="nav-searchbar-kbd">Ctrl+K</span>
    </div>
    ${items.map(it => `
      <div class="nav-item ${it.active ? 'active' : ''}">
        <div class="nav-icon-box ${it.cls || ''}">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${it.icon}</svg>
        </div>
        <span class="nav-item-label">${it.label}</span>
        ${it.badge ? `<span class="nav-badge">${it.badge}</span>` : ''}
      </div>`).join('')}
    <div class="nav-spacer"></div>
    <div class="nav-divider"></div>
    <div class="nav-item">
      <div class="nav-icon-box">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      </div>
    </div>`;
}

// ─── render: chat list ───────────────────────────────────────
function renderChatList() {
  $('chat-list').innerHTML = C.chatList.map(chat => {
    const isActive = chat.id === C.activeChat;
    const previewHTML = chat.previewSender
      ? `<span style="color:#5e6470">${chat.previewSender}:&nbsp;</span>${chat.previewText}`
      : chat.previewText;
    const rightEl = chat.unread ? `<span class="ci-unread">${chat.unread}</span>` : '';
    return `
      <div class="chat-item ${isActive ? 'active' : ''}" data-id="${chat.id}">
        ${ciAvatarHTML(chat)}
        <div class="ci-body">
          <div class="ci-top">
            <span class="ci-name">${chat.name}${badgeHTML(chat.badge)}</span>
            <span class="ci-time">${chat.time}</span>
          </div>
          <div class="ci-preview">${previewHTML}${rightEl}</div>
        </div>
      </div>`;
  }).join('');
}

// ─── render: chat header ─────────────────────────────────────
function renderHeader() {
  const mc = C.mainChat;
  $('cw-header').innerHTML = `
    <div class="cw-title-area">
      ${cwGroupAvatarHTML(mc)}
      <span class="cw-title">${mc.name}</span>
      <div class="cw-members">
        <svg viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        <span class="cw-mcount">${mc.memberCount}</span>
      </div>
      ${badgeHTML(mc.badge)}
    </div>
    <div class="cw-actions">
      <div class="cw-btn" title="Search in chat">
        <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>
      </div>
      <div class="cw-btn" title="Video call">
        <svg viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
      </div>
      <div class="cw-btn" title="Members">
        <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      </div>
      <div class="cw-btn" title="Pin / Notifications">
        <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      </div>
      <div class="cw-btn" title="More">
        <svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/></svg>
      </div>
      <div class="cw-btn" title="Expand">
        <svg viewBox="0 0 24 24"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
      </div>
    </div>`;
}

// ─── render: tabs ────────────────────────────────────────────
function renderTabs() {
  $('cw-tabs').innerHTML = `
    <div class="tab active">
      <svg viewBox="0 0 24 24" class="tab-chat-icon">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      Chat
    </div>
    <div class="tab">
      <svg viewBox="0 0 24 24" class="tab-docs-icon">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
      Docs
    </div>
    <div class="tab">
      <svg viewBox="0 0 24 24" class="tab-file-icon">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      </svg>
      File
    </div>
    <div class="tab-plus">＋</div>`;

  // Tab click
  $('cw-tabs').querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $('cw-tabs').querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}

// ─── render: input area ──────────────────────────────────────
function renderInput() {
  $('input-area').innerHTML = `
    <div class="input-row">
      <textarea class="input-box" placeholder="Message ${C.mainChat.name}..." rows="1"
        oninput="this.style.height='auto';this.style.height=Math.min(this.scrollHeight,100)+'px'"></textarea>
      <div class="input-tools">
        <div class="tb-btn aa" title="Format">Aa</div>
        <div class="input-sep"></div>
        <div class="tb-btn" title="Emoji">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
        </div>
        <div class="tb-btn" title="Mention">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/></svg>
        </div>
        <div class="tb-btn" title="Attach">
          <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </div>
        <div class="tb-btn" title="Expand">
          <svg viewBox="0 0 24 24"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
        </div>
        <div class="send-btn" title="Send">
          <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </div>
      </div>
    </div>`;
}

// ─── message HTML builder ────────────────────────────────────
function buildMsg(msg, animate) {
  if (msg.type === 'system') {
    return `<div class="sys-msg">${msg.text}</div>`;
  }

  const p = C.participants[msg.sender];
  const av = msgAvHTML(p);
  const noAnimClass = animate ? '' : ' no-anim';

  if (msg.type === 'card') {
    const card = msg.card;
    const fieldsHTML = card.fields.map(f => `
      <div class="card-field">
        <span class="card-flabel">${f.label}</span>
        ${f.isQuote
          ? `<div class="card-fquote">${f.value}</div>`
          : `<div class="card-fval">${f.value.replace(/@(\w+)/g, '<span class="mention">@$1</span>')}</div>`}
      </div>`).join('');
    const actsHTML = (card.actions || []).map(a => `<div class="card-act">${a}</div>`).join('');
    return `
      <div class="msg-group${noAnimClass}">
        ${av}
        <div class="msg-body">
          <div class="msg-meta">
            <span class="msg-sender bot">${p.name}</span>
            <span class="msg-time">${msg.time || ''}</span>
          </div>
          <div class="bot-card">
            <div class="bot-card-hd" style="border-left:4px solid ${card.headerColor || '#3370ff'}">
              <span class="bot-card-hd-title">${card.title}</span>
              ${card.badge ? `<span class="bot-card-badge">${card.badge}</span>` : ''}
            </div>
            <div class="bot-card-body">${fieldsHTML}</div>
            ${actsHTML ? `<div class="bot-card-actions">${actsHTML}</div>` : ''}
          </div>
        </div>
      </div>`;
  }

  // plain text
  const safe = msg.text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/@(\w+)/g, '<span style="color:#3370ff;font-weight:500">@$1</span>');
  return `
    <div class="msg-group${noAnimClass}">
      ${av}
      <div class="msg-body">
        <div class="msg-meta">
          <span class="msg-sender ${p.isBot ? 'bot' : ''}">${p.name}</span>
          <span class="msg-time">${msg.time || ''}</span>
        </div>
        <div class="msg-text">${safe}</div>
      </div>
    </div>`;
}

// ─── history ─────────────────────────────────────────────────
function renderHistory() {
  const area = $('messages-area');
  area.innerHTML = `<div class="date-div"><span>Today</span></div>`;
  C.historyMessages.forEach(m => {
    area.insertAdjacentHTML('beforeend', buildMsg(m, false));
  });
}

// ─── scroll ──────────────────────────────────────────────────
function scrollToBottom() {
  const area = $('messages-area');
  // Use requestAnimationFrame so the DOM has settled before measuring
  requestAnimationFrame(() => {
    area.scrollTop = area.scrollHeight;
  });
}

// ─── typing indicator ────────────────────────────────────────
function removeTyping() {
  const ti = qq('.typing-row');
  if (ti) ti.remove();
}

function showTyping(senderKey) {
  removeTyping();
  const p = C.participants[senderKey];
  const av = msgAvHTML(p).replace('msg-av', 'typing-av');  // reuse same HTML, swap class
  $('messages-area').insertAdjacentHTML('beforeend', `
    <div class="typing-row">
      ${av}
      <div class="typing-body">
        <div class="typing-name">${p.name}</div>
        <div class="typing-dots"><span></span><span></span><span></span></div>
      </div>
    </div>`);
  scrollToBottom();
}

// ─── conversation simulation ──────────────────────────────────
let timers = [];

function clearTimers() {
  timers.forEach(t => clearTimeout(t));
  timers = [];
}

function updatePreview(msg) {
  const p = C.participants[msg.sender];
  const item = qq(`[data-id="${C.activeChat}"]`);
  if (!item) return;
  const prev = item.querySelector('.ci-preview');
  const time = item.querySelector('.ci-time');
  if (prev) {
    const preview = msg.type === 'card' ? msg.card.title : (msg.text.slice(0, 35) + (msg.text.length > 35 ? '…' : ''));
    prev.innerHTML = `<span style="color:#5e6470">${p.name}:&nbsp;</span>${preview}`;
  }
  if (time) time.textContent = 'Just now';
}

function playConversation() {
  clearTimers();
  renderHistory();

  // Scroll to top first so history is visible, then to bottom
  const area = $('messages-area');
  requestAnimationFrame(() => { area.scrollTop = 0; });

  let cum = 0;

  C.conversationScript.forEach((msg) => {
    cum += msg.delay;
    const t = setTimeout(() => {
      $('messages-area').insertAdjacentHTML('beforeend', buildMsg(msg, true));
      updatePreview(msg);
      scrollToBottom();
    }, cum);
    timers.push(t);
  });
}

// ─── chat list click ──────────────────────────────────────────
document.addEventListener('click', e => {
  const item = e.target.closest('.chat-item');
  if (item) {
    document.querySelectorAll('.chat-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  }
});

// ─── boot ─────────────────────────────────────────────────────
renderNav();
renderChatList();
renderHeader();
renderTabs();
renderInput();
playConversation();

// ─── easter egg: click user avatar → replay ───────────────────
// Bind after renderNav so the element exists in DOM
document.querySelector('.nav-user-avatar').addEventListener('click', () => {
  playConversation();
});
