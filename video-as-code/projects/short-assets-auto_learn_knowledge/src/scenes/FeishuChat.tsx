import { useRef, useEffect } from "react";
import { FeishuMessage, type MessageData } from "../components/FeishuMessage";
import { TypingIndicator, type Participant } from "../components/TypingIndicator";
import "./FeishuChat.css";

const LUCIUS_AVATAR = "/lucius-logo.svg";

const DIC = (seed: string, bg = "b6e3f4") =>
  `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}&backgroundColor=${bg}&radius=50`;

export const PARTICIPANTS: Record<string, Participant> = {
  lucius: {
    name: "Lucius",
    isBot: true,
    avatarType: "image",
    avatarSrc: LUCIUS_AVATAR,
    avatarBg: "#ffffff",
  },
  sarah: {
    name: "Sarah",
    avatarType: "image",
    avatarSrc: DIC("Sarah", "ffd5dc"),
    avatarBg: "#ffd5dc",
  },
  mike: {
    name: "Mike",
    avatarType: "image",
    avatarSrc: DIC("Mike", "d1d4f9"),
    avatarBg: "#d1d4f9",
  },
  linda: {
    name: "Linda",
    avatarType: "image",
    avatarSrc: DIC("Linda", "c0aede"),
    avatarBg: "#c0aede",
  },
  alex: {
    name: "Alex",
    avatarType: "image",
    avatarSrc: DIC("Alex", "b6e3f4"),
    avatarBg: "#b6e3f4",
  },
};

export const HISTORY_MESSAGES: MessageData[] = [
  {
    id: "sys-1",
    sender: "system",
    type: "system",
    text: "Subscription Policy Discussion Group was created",
    showAt: 0,
  },
  {
    id: "h-1",
    sender: "mike",
    type: "text",
    text: "Hey everyone, the new subscription policy draft is ready for review 📋",
    time: "14:20",
    showAt: 0,
  },
  {
    id: "h-2",
    sender: "sarah",
    type: "text",
    text: "Great, let me pull it up now",
    time: "14:22",
    showAt: 0,
  },
  {
    id: "h-3",
    sender: "linda",
    type: "text",
    text: "I've already gone through the enterprise section — a lot of updates this quarter",
    time: "14:25",
    showAt: 0,
  },
];

export const SCRIPT_MESSAGES: MessageData[] = [
  {
    id: "s-1",
    sender: "sarah",
    type: "text",
    text: "The annual plan is bumping storage from 50GB to 200GB — that's confirmed, right?",
    time: "14:30",
    showAt: 2000,
  },
  {
    id: "s-2",
    sender: "mike",
    type: "text",
    text: "Yes, and monthly subscribers now get Advanced API access too — capped at 1,000 calls/month",
    time: "14:31",
    showAt: 4000,
  },
  {
    id: "s-3",
    sender: "linda",
    type: "text",
    text: "One more big change — Enterprise tier is adding SSO and audit logs. We really need to update the knowledge base",
    time: "14:32",
    showAt: 6000,
  },
  {
    id: "s-4",
    sender: "alex",
    type: "text",
    text: "Who's going to organize all these changes? Last time it took forever to format everything... 😮‍💨",
    time: "14:33",
    showAt: 8000,
  },
  {
    id: "s-5",
    sender: "lucius",
    type: "card",
    time: "14:34",
    showAt: 12000,
    cardGlow: true,
    card: {
      headerColor: "#5538C7",
      title: "📚 Knowledge Base Updated",
      badge: "Auto-learned",
      fields: [
        {
          label: "Change 1",
          value: "Annual Plan storage: 50GB → 200GB",
        },
        {
          label: "Change 2",
          value: "Monthly Plan: Advanced API access enabled (1,000 calls/mo)",
        },
        {
          label: "Change 3",
          value: "Enterprise Tier: SSO + Audit Logs added",
        },
      ],
      actions: ["View Details", "Edit"],
    },
  },
  {
    id: "s-6",
    sender: "sarah",
    type: "text",
    text: "Wait... it organized everything by itself?? 🤯",
    time: "14:34",
    showAt: 16000,
  },
  {
    id: "s-7",
    sender: "mike",
    type: "text",
    text: "That was instant — it understood the full context before I even finished talking",
    time: "14:35",
    showAt: 18000,
  },
  {
    id: "s-8",
    sender: "linda",
    type: "text",
    text: "Let me test it — @Lucius what are the new benefits for monthly subscribers?",
    time: "14:35",
    showAt: 20000,
  },
  {
    id: "s-9",
    sender: "lucius",
    type: "text",
    text: "Monthly subscribers now have access to the Advanced API with a limit of 1,000 calls per month. This was just updated based on the team's discussion.",
    time: "14:35",
    showAt: 22000,
  },
  {
    id: "s-10",
    sender: "alex",
    type: "text",
    text: "👍👍👍",
    time: "14:36",
    showAt: 25000,
  },
  {
    id: "s-11",
    sender: "sarah",
    type: "text",
    text: "Amazing, this is a game changer 🔥🔥",
    time: "14:36",
    showAt: 25600,
  },
  {
    id: "s-12",
    sender: "mike",
    type: "text",
    text: "👍 Never updating docs manually again",
    time: "14:36",
    showAt: 26200,
  },
  {
    id: "s-13",
    sender: "linda",
    type: "text",
    text: "Lucius is insane 🤯👏👏",
    time: "14:36",
    showAt: 26800,
  },
];

const TYPING_SHOW = 10000;
const TYPING_HIDE = 12000;

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}
function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}
function ramp(t: number, start: number, end: number) {
  return clamp01((t - start) / Math.max(1, end - start));
}
function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function FeishuChat({ t, opacity, onViewDetails }: { t: number; opacity: number; onViewDetails?: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastMsgCountRef = useRef(0);

  const allMessages = [...HISTORY_MESSAGES, ...SCRIPT_MESSAGES];
  const visibleMessages = allMessages.filter((m) => t >= m.showAt);

  useEffect(() => {
    if (visibleMessages.length > lastMsgCountRef.current && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    lastMsgCountRef.current = visibleMessages.length;
  }, [visibleMessages.length]);

  const showTyping = t >= TYPING_SHOW && t < TYPING_HIDE;

  const stageIn = easeOutCubic(ramp(t, 0, 1200));

  return (
    <div
      className="feishu-scene"
      style={{
        opacity: opacity * mix(0, 1, stageIn),
      }}
    >
      <div className="feishu-window">
        {/* Nav sidebar (minimal) */}
        <div className="feishu-nav">
          <div className="feishu-nav-avatar">K</div>
          <NavIcon active>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </NavIcon>
          <NavIcon>
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </NavIcon>
          <NavIcon>
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" />
          </NavIcon>
          <NavIcon>
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </NavIcon>
        </div>

        {/* Chat list */}
        <div className="feishu-chatlist">
          <div className="feishu-chatlist-search">
            <svg viewBox="0 0 24 24" className="feishu-search-icon">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
            <span>Search</span>
          </div>
          <ChatListItem
            name="Subscription Policy"
            active
            preview="Lucius: 📚 Knowledge Base Updated"
            time="Just now"
            unread={3}
            members={["S", "M", "L", "A"]}
            colors={["#e53e3e", "#f5a623", "#34a853", "#7b61ff"]}
          />
          <ChatListItem
            name="Product Design"
            preview="Emma: New mockups are ready 🎨"
            time="14:32"
            members={["E", "J", "R", "T"]}
            colors={["#3370ff", "#00c7a3", "#ff6b35", "#a855f7"]}
          />
          <ChatListItem
            name="Engineering Standup"
            preview="David: Deploy pipeline is green ✅"
            time="10:15"
            members={["D", "N", "P", "W"]}
            colors={["#1456f0", "#e53e3e", "#f59e0b", "#0fad5a"]}
          />
          <ChatListItem
            name="Marketing & Growth"
            preview="Chloe: Q2 campaign brief attached"
            time="09:50"
            members={["C", "O", "H", "B"]}
            colors={["#ec4899", "#f5a623", "#6366f1", "#14b8a6"]}
          />
          <ChatListItem
            name="Leadership Sync"
            preview="Victor: Board deck needs update"
            time="Yesterday"
            members={["V", "F", "K", "G"]}
            colors={["#7c3aed", "#059669", "#1d4ed8", "#dc2626"]}
          />
        </div>

        {/* Main chat area */}
        <div className="feishu-chat-main">
          <div className="feishu-chat-header">
            <div className="feishu-chat-header-left">
              <div className="feishu-multi-avatar-sm">
                {["#e53e3e", "#f5a623", "#34a853", "#7b61ff"].map((c, i) => (
                  <div key={i} className="feishu-sub-av-sm" style={{ background: c }}>
                    {["S", "M", "L", "A"][i]}
                  </div>
                ))}
              </div>
              <span className="feishu-chat-title">Subscription Policy Discussion</span>
              <div className="feishu-members-count">
                <svg viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
                <span>5</span>
              </div>
            </div>
            <div className="feishu-chat-header-actions">
              <HeaderBtn>
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" />
              </HeaderBtn>
              <HeaderBtn>
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" />
              </HeaderBtn>
              <HeaderBtn>
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </HeaderBtn>
            </div>
          </div>

          {/* Tabs */}
          <div className="feishu-tabs">
            <div className="feishu-tab active">Chat</div>
            <div className="feishu-tab">Docs</div>
            <div className="feishu-tab">Files</div>
          </div>

          {/* Messages area */}
          <div className="feishu-messages" ref={scrollRef}>
            <div className="feishu-date-div"><span>Today</span></div>
            {visibleMessages.map((msg) => {
              const p = msg.type === "system"
                ? PARTICIPANTS.lucius
                : PARTICIPANTS[msg.sender];
              const fadeMs = 600;
              const msgProgress = easeOutCubic(ramp(t, msg.showAt, msg.showAt + fadeMs));

              return (
                <FeishuMessage
                  key={msg.id}
                  msg={msg}
                  participant={p}
                  opacity={msgProgress}
                  translateY={mix(12, 0, msgProgress)}
                  onCardAction={msg.type === "card" ? (action) => {
                    if (action === "View Details") onViewDetails?.();
                  } : undefined}
                />
              );
            })}
            {showTyping && (
              <TypingIndicator participant={PARTICIPANTS.lucius} />
            )}
          </div>

          {/* Input area */}
          <div className="feishu-input-area">
            <div className="feishu-input-row">
              <div className="feishu-input-box" data-placeholder={`Message Subscription Policy Discussion...`} />
              <div className="feishu-input-tools">
                <div className="feishu-tb-btn feishu-tb-aa">Aa</div>
                <div className="feishu-input-sep" />
                <div className="feishu-tb-btn" title="Emoji">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                </div>
                <div className="feishu-tb-btn" title="Mention">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
                  </svg>
                </div>
                <div className="feishu-send-btn" title="Send">
                  <svg viewBox="0 0 24 24">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavIcon({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <div className={`feishu-nav-icon${active ? " active" : ""}`}>
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </div>
  );
}

function HeaderBtn({ children }: { children: React.ReactNode }) {
  return (
    <div className="feishu-header-btn">
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </div>
  );
}

function ChatListItem({
  name,
  active,
  preview,
  time,
  unread,
  members,
  colors,
}: {
  name: string;
  active?: boolean;
  preview: string;
  time: string;
  unread?: number;
  members: string[];
  colors: string[];
}) {
  return (
    <div className={`feishu-ci${active ? " active" : ""}`}>
      <div className="feishu-ci-avatar multi">
        {members.map((m, i) => (
          <div key={i} className="feishu-sub-av" style={{ background: colors[i] }}>
            {m}
          </div>
        ))}
      </div>
      <div className="feishu-ci-body">
        <div className="feishu-ci-top">
          <span className="feishu-ci-name">{name}</span>
          <span className="feishu-ci-time">{time}</span>
        </div>
        <div className="feishu-ci-preview">
          {preview}
          {unread ? <span className="feishu-ci-unread">{unread}</span> : null}
        </div>
      </div>
    </div>
  );
}
