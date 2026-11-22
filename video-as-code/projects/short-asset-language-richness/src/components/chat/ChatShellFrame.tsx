import type { ReactElement, ReactNode } from "react";

import type { ChatSidebarGroup } from "../../lib/chat";
import { joinClassNames } from "../../lib/utils";

type ChatShellFrameProps = {
  children?: ReactNode;
  className?: string;
  footer?: ReactNode;
  headerActions?: ReactNode;
  showSidebar?: boolean;
  sidebarFooter?: ReactNode;
  sidebarGroups?: ReadonlyArray<ChatSidebarGroup>;
  sidebarTitle?: string;
  statusLabel?: string;
  title: string;
};

export function ChatShellFrame(
  props: Readonly<ChatShellFrameProps>,
): ReactElement {
  const {
    children,
    className,
    footer,
    headerActions,
    showSidebar = true,
    sidebarFooter,
    sidebarGroups = [],
    sidebarTitle = "Chat",
    statusLabel,
    title,
  } = props;

  return (
    <div className={joinClassNames("lucius-chat-shell-frame", className)}>
      {showSidebar ? (
        <aside className="lucius-chat-shell-frame__sidebar">
          <div className="lucius-chat-shell-frame__sidebar-header">
            <span className="lucius-chat-shell-frame__sidebar-title">
              {sidebarTitle}
            </span>
          </div>

          <div className="lucius-chat-shell-frame__sidebar-scroll">
            <div className="lucius-chat-shell-frame__sidebar-body">
              {sidebarGroups.map((group) => (
                <section
                  className="lucius-chat-shell-frame__sidebar-group"
                  key={group.id}
                >
                  {group.title ? (
                    <span className="lucius-chat-shell-frame__sidebar-group-title">
                      {group.title}
                    </span>
                  ) : null}

                  {group.items.map((item) => (
                    <div
                      className="lucius-chat-shell-frame__sidebar-row"
                      data-active={item.active ? "true" : "false"}
                      key={item.id}
                    >
                      <span className="lucius-chat-shell-frame__sidebar-row-label">
                        {item.label}
                      </span>
                      {item.meta ? (
                        <span className="lucius-chat-shell-frame__sidebar-row-meta">
                          {item.meta}
                        </span>
                      ) : null}
                    </div>
                  ))}
                </section>
              ))}
            </div>
          </div>

          {sidebarFooter ? (
            <div className="lucius-chat-shell-frame__sidebar-footer">
              {sidebarFooter}
            </div>
          ) : null}
        </aside>
      ) : null}

      <section className="lucius-chat-shell-frame__stage">
        <div className="lucius-chat-shell-frame__stage-header">
          <div className="lucius-chat-shell-frame__stage-header-inner">
            <div className="lucius-chat-shell-frame__stage-title-row">
              <div className="lucius-chat-shell-frame__stage-title-shell">
                <p className="lucius-chat-shell-frame__stage-title">{title}</p>
              </div>

              {statusLabel ? (
                <span className="lucius-chat-shell-frame__stage-status-pill">
                  {statusLabel}
                </span>
              ) : null}
            </div>

            {headerActions ? (
              <div className="lucius-chat-shell-frame__stage-actions">
                {headerActions}
              </div>
            ) : null}
          </div>
        </div>

        <div className="lucius-chat-shell-frame__stage-body">{children}</div>

        {footer ? (
          <div className="lucius-chat-shell-frame__stage-footer">{footer}</div>
        ) : null}
      </section>
    </div>
  );
}
