import type { ReactNode } from "react";

import { BookOpen, ChevronRight, Clock, FileText, Search, Sparkles, Upload } from "lucide-react";

import {
  AUTO_LEARN_KNOWLEDGE_ENTRIES,
  type KnowledgeEntry,
} from "../chat/auto-learn-knowledge-data";
import { easeOutCubic, mix, ramp } from "../motion/easing";

export type KnowledgeDashboardSceneProps = {
  detailElapsedMs?: number;
  entries?: KnowledgeEntry[];
  opacity?: number;
  selectedId?: string | null;
};

export function KnowledgeDashboardScene({
  detailElapsedMs = 0,
  entries = AUTO_LEARN_KNOWLEDGE_ENTRIES,
  opacity = 1,
  selectedId = entries.find((entry) => entry.isNew)?.id ?? entries[0]?.id ?? null,
}: KnowledgeDashboardSceneProps) {
  const selectedEntry = entries.find((entry) => entry.id === selectedId) ?? null;

  const detailIn = easeOutCubic(ramp(detailElapsedMs, 0, 1200));
  const metaIn = easeOutCubic(ramp(detailElapsedMs, 1500, 2500));
  const diffIn = easeOutCubic(ramp(detailElapsedMs, 3000, 5000));
  const footerIn = easeOutCubic(ramp(detailElapsedMs, 6500, 8000));

  return (
    <div className="kb-scene" style={{ opacity }}>
      <div className="kb-window">
        <div className="kb-sidebar">
          <div className="kb-sidebar-logo">
            <div className="kb-sidebar-logo-icon">
              <img src="/brand/logo-mark-black.svg" alt="Lucius" />
            </div>
            <span className="kb-sidebar-logo-text">Lucius</span>
          </div>
          <div className="kb-sidebar-nav">
            <KnowledgeSidebarItem icon={<BookOpen size={16} />} label="Knowledge Base" active />
            <KnowledgeSidebarItem icon={<FileText size={16} />} label="Documents" />
            <KnowledgeSidebarItem icon={<Sparkles size={16} />} label="AI Insights" />
          </div>
        </div>

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
              <span className="kb-items-count-num">{entries.length}</span> items
            </div>
          </div>

          <div className="kb-content">
            <div className="kb-list">
              {entries.map((entry, index) => {
                const isSelected = entry.id === selectedId;
                return (
                  <div
                    key={entry.id}
                    className={`kb-item kb-item-stagger${isSelected ? " selected" : ""}${entry.isNew ? " kb-item--new" : ""}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="kb-item-left">
                      {entry.isNew ? (
                        <div className="kb-new-badge">
                          <span className="kb-new-dot" />
                          NEW
                        </div>
                      ) : null}
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

            {selectedEntry ? (
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

                {selectedEntry.before && selectedEntry.after ? (
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
                      <div className="kb-diff-arrow">-&gt;</div>
                      <div className="kb-diff-card kb-diff-after">
                        <div className="kb-diff-card-tag">After</div>
                        <div className="kb-diff-card-text">{selectedEntry.after}</div>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div
                  className="kb-detail-footer"
                  style={{
                    opacity: footerIn,
                    transform: `translateY(${mix(8, 0, footerIn)}px)`,
                  }}
                >
                  <div className="kb-detail-ai-note">
                    <Sparkles size={14} />
                    <span>Organized by Lucius AI / Structured by benefit dimension for retrieval.</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function KnowledgeSidebarItem({
  active = false,
  icon,
  label,
}: {
  active?: boolean;
  icon: ReactNode;
  label: string;
}) {
  return (
    <div className={`kb-sidebar-item${active ? " active" : ""}`}>
      {icon}
      <span>{label}</span>
    </div>
  );
}
