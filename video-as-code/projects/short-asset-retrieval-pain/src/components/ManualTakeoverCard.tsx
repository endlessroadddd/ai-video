import { ShieldAlert } from "lucide-react";

type ManualTakeoverCardProps = {
  action: string;
  note: string;
  tag: string;
};

export function ManualTakeoverCard(props: ManualTakeoverCardProps) {
  const { action, note, tag } = props;

  return (
    <aside className="manual-takeover-card">
      <div className="manual-takeover-card__tag">
        <ShieldAlert size={14} />
        <span>{tag}</span>
      </div>
      <h3>{action}</h3>
      <p>{note}</p>
      <div className="manual-takeover-card__footer">
        <span>Assigned to</span>
        <strong>Priya Chen</strong>
      </div>
    </aside>
  );
}
