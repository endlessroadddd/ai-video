import { useCallback, useEffect, useRef, useState } from "react";
import { BookOpen, ChevronRight, Clock, FileText, Search, Sparkles, Upload } from "lucide-react";
import "./KnowledgeDashboard.css";

type KnowledgeEntry = {
  id: string;
  title: string;
  summary: string;
  source: string;
  updatedAt: string;
  isNew: boolean;
  before?: string;
  after?: string;
};

const ENTRIES: KnowledgeEntry[] = [
  {
    id: "k1",
    title: "Annual Plan — Storage Upgrade",
    summary: "Storage allocation for annual subscription increased from 50GB to 200GB",
    source: "Feishu group chat · Auto-learned",
    updatedAt: "Just now",
    isNew: true,
    before: "Annual Plan includes 50GB cloud storage",
    after: "Annual Plan includes 200GB cloud storage",
  },
  {
    id: "k2",
    title: "Monthly Plan — Advanced API Access",
    summary: "Monthly subscribers now have access to the Advanced API, limited to 1,000 calls per month",
    source: "Feishu group chat · Auto-learned",
    updatedAt: "Just now",
    isNew: true,
    before: "Monthly Plan: Basic API access only",
    after: "Monthly Plan: Advanced API access (1,000 calls/mo)",
  },
  {
    id: "k3",
    title: "Enterprise Tier — SSO & Audit Logs",
    summary: "Enterprise tier now includes Single Sign-On (SSO) and audit log functionality",
    source: "Feishu group chat · Auto-learned",
    updatedAt: "Just now",
    isNew: true,
    before: "Enterprise Tier: Team management + Priority support",
    after: "Enterprise Tier: Team management + Priority support + SSO + Audit Logs",
  },
  {
    id: "k4",
    title: "Refund Policy — Crypto Products",
    summary: "Standard refund policy for cryptocurrency-related product purchases",
    source: "Document upload",
    updatedAt: "2 days ago",
    isNew: false,
  },
  {
    id: "k5",
    title: "Onboarding Flow — New Users",
    summary: "Step-by-step onboarding process for new subscriber accounts",
    source: "Manual entry",
    updatedAt: "5 days ago",
    isNew: false,
  },
  {
    id: "k6",
    title: "API Rate Limits — Fair Use Policy",
    summary: "Rate limiting guidelines across all subscription tiers",
    source: "Document upload",
    updatedAt: "1 week ago",
    isNew: false,
  },
];

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

export function KnowledgeDashboard({
  opacity,
  onDetailFullyShown,
}: {
  opacity: number;
  onDetailFullyShown?: () => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailElapsed, setDetailElapsed] = useState(0);
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const firedEndRef = useRef(false);

  const selectedEntry = ENTRIES.find((e) => e.id === selectedId) ?? null;

  const handleItemClick = useCallback((id: string) => {
    if (selectedId) return;
    setSelectedId(id);
    startRef.current = performance.now();
    firedEndRef.current = false;
  }, [selectedId]);

  useEffect(() => {
    if (!selectedId) return;
    const tick = () => {
      const elapsed = performance.now() - startRef.current;
      setDetailElapsed(elapsed);
      if (elapsed < 12000) {
        rafRef.current = requestAnimationFrame(tick);
      } else if (!firedEndRef.current) {
        firedEndRef.current = true;
        onDetailFullyShown?.();
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [selectedId, onDetailFullyShown]);

  const dt = detailElapsed;
  const detailIn = easeOutCubic(ramp(dt, 0, 1200));
  const metaIn = easeOutCubic(ramp(dt, 1500, 2500));
  const diffIn = easeOutCubic(ramp(dt, 3000, 5000));
  const footerIn = easeOutCubic(ramp(dt, 6500, 8000));

  return (
    <div className="kb-scene" style={{ opacity }}>
      <div className="kb-window">
        {/* Sidebar */}
        <div className="kb-sidebar">
          <div className="kb-sidebar-logo">
            <div className="kb-sidebar-logo-icon">
              <img src="/lucius-logo.svg" alt="Lucius" />
            </div>
            <span className="kb-sidebar-logo-text">Lucius</span>
          </div>
          <div className="kb-sidebar-nav">
            <SidebarItem icon={<BookOpen size={16} />} label="Knowledge Base" active />
            <SidebarItem icon={<FileText size={16} />} label="Documents" />
            <SidebarItem icon={<Sparkles size={16} />} label="AI Insights" />
          </div>
        </div>

        {/* Main content */}
        <div className="kb-main">
          <div className="kb-header">
            <h1 className="kb-title">Knowledge Base</h1>
            <div className="kb-header-actions">
              <div className="kb-search-bar">
                <Search size={14} />
                <span>Search knowledge...</span>
              </div>
              <button className="kb-upload-btn">
                <Upload size={14} />
                Upload
              </button>
            </div>
          </div>

          <div className="kb-tabs-bar">
            <div className="kb-tab active">All knowledge items</div>
            <div className="kb-tab">Documents</div>
            <div className="kb-items-count">
              <span className="kb-items-count-num">{ENTRIES.length}</span> items
            </div>
          </div>

          <div className="kb-content">
            {/* List — items stagger in via CSS animation */}
            <div className="kb-list">
              {ENTRIES.map((entry, idx) => {
                const isSelected = entry.id === selectedId;
                return (
                  <div
                    key={entry.id}
                    className={`kb-item kb-item-stagger${isSelected ? " selected" : ""}${entry.isNew ? " kb-item--new" : ""}`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                    onClick={() => entry.isNew && handleItemClick(entry.id)}
                  >
                    <div className="kb-item-left">
                      {entry.isNew && (
                        <div className="kb-new-badge">
                          <span className="kb-new-dot" />
                          NEW
                        </div>
                      )}
                      <div className="kb-item-title">{entry.title}</div>
                      <div className="kb-item-summary">{entry.summary}</div>
                    </div>
                    <div className="kb-item-right">
                      <div className="kb-item-meta">
                        <span className="kb-item-source">{entry.source}</span>
                        <span className="kb-item-time">{entry.updatedAt}</span>
                      </div>
                      <ChevronRight size={16} className="kb-item-chevron" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detail panel — only after click */}
            {selectedEntry && (
              <div
                className="kb-detail"
                style={{
                  opacity: detailIn,
                  transform: `translateX(${mix(20, 0, detailIn)}px)`,
                }}
              >
                <div className="kb-detail-header">
                  <h2 className="kb-detail-title">{selectedEntry.title}</h2>
                  <div className="kb-detail-badge">Auto-learned</div>
                </div>

                <div
                  className="kb-detail-meta"
                  style={{
                    opacity: metaIn,
                    transform: `translateY(${mix(8, 0, metaIn)}px)`,
                  }}
                >
                  <div className="kb-detail-meta-row">
                    <Clock size={13} />
                    <span>Updated: {selectedEntry.updatedAt}</span>
                  </div>
                  <div className="kb-detail-meta-row">
                    <Sparkles size={13} />
                    <span>Source: {selectedEntry.source}</span>
                  </div>
                </div>

                <div className="kb-detail-summary" style={{ opacity: metaIn }}>
                  {selectedEntry.summary}
                </div>

                {selectedEntry.before && selectedEntry.after && (
                  <div
                    className="kb-diff"
                    style={{
                      opacity: diffIn,
                      transform: `translateY(${mix(10, 0, diffIn)}px)`,
                    }}
                  >
                    <div className="kb-diff-label">Content Change</div>
                    <div className="kb-diff-cards">
                      <div className="kb-diff-card kb-diff-before">
                        <div className="kb-diff-card-tag">Before</div>
                        <div className="kb-diff-card-text">{selectedEntry.before}</div>
                      </div>
                      <div className="kb-diff-arrow">→</div>
                      <div className="kb-diff-card kb-diff-after">
                        <div className="kb-diff-card-tag">After</div>
                        <div className="kb-diff-card-text">{selectedEntry.after}</div>
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className="kb-detail-footer"
                  style={{
                    opacity: footerIn,
                    transform: `translateY(${mix(8, 0, footerIn)}px)`,
                  }}
                >
                  <div className="kb-detail-ai-note">
                    <Sparkles size={14} />
                    <span>Organized by Lucius AI · Structured by benefit dimension for optimal retrieval</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div className={`kb-sidebar-item${active ? " active" : ""}`}>
      {icon}
      <span>{label}</span>
    </div>
  );
}
