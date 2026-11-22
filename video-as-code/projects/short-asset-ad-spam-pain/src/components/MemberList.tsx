import type { CSSProperties } from "react";
import { DiscordAvatar } from "./DiscordAvatar";
import { easeOutQuint, progressBetween } from "../lib/easing";
import { resolveVisibleMembers } from "../data/members";

interface MemberListProps {
  currentMs: number;
}

export default function MemberList({ currentMs }: Readonly<MemberListProps>) {
  const members = resolveVisibleMembers(currentMs);

  return (
    <aside className="member-list">
      <div className="member-list-header">
        <span>Members</span>
        <span>{members.length}</span>
      </div>

      <div className="member-list-scroll">
        {members.map((member) => {
          const joinedProgress = easeOutQuint(
            progressBetween(currentMs, member.enteredAtMs + 90, member.enteredAtMs + 460),
          );
          const removalProgress =
            member.removedAtMs !== undefined
              ? progressBetween(currentMs, member.removedAtMs + 80, member.removedAtMs + 520)
              : 0;
          const opacity = joinedProgress * (member.removedAtMs ? 1 - removalProgress : 1);
          const translateY = (1 - joinedProgress) * 18 + removalProgress * -20;

          return (
            <div
              key={member.id}
              className={["member-row", member.isSpam ? "is-bot" : "", member.removedAtMs ? "is-removing" : ""]
                .filter(Boolean)
                .join(" ")}
              style={
                {
                  opacity,
                  transform: `translate3d(0, ${translateY}px, 0)`,
                  "--row-delay": `${member.order * 18}ms`,
                } as CSSProperties
              }
            >
              <DiscordAvatar name={member.name} size={34} status={member.status} />
              <div className="member-row-info">
                <div className="member-row-title">
                  <span className="member-name">{member.name}</span>
                  {member.isSpam ? <span className="member-chip">bot</span> : null}
                </div>
                <div className="member-row-meta">
                  <span className={`status-dot is-${member.status}`} />
                  <span>{member.role ?? "member"}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
