import { RefreshCcw, Sparkles } from "lucide-react";

type SourceSyncBadgeProps = {
  focused?: boolean;
  label: string;
};

export function SourceSyncBadge(props: SourceSyncBadgeProps) {
  const { focused = false, label } = props;

  return (
    <div className={`source-sync-badge${focused ? " is-focused" : ""}`}>
      <span className="source-sync-badge__icon">
        <RefreshCcw size={12} />
      </span>
      <span>{label}</span>
      <Sparkles size={12} className="source-sync-badge__sparkle ambient-pulse" />
    </div>
  );
}
