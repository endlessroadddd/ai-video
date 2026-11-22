import { DiscordAvatar } from "./DiscordAvatar";

interface ConfirmDialogProps {
  visible: boolean;
  userName: string;
}

export default function ConfirmDialog(props: Readonly<ConfirmDialogProps>) {
  const { userName, visible } = props;

  if (!visible) {
    return null;
  }

  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        <div className="confirm-dialog__eyebrow">Manual action required</div>
        <h3>Kick {userName}?</h3>

        <div className="confirm-dialog__member">
          <DiscordAvatar name={userName} size={36} status="dnd" />
          <div>
            <strong>{userName}</strong>
            <p>They can rejoin with a new invite link immediately.</p>
          </div>
        </div>

        <div className="confirm-footer">
          <button className="confirm-btn-cancel">Cancel</button>
          <button className="confirm-btn-kick">Kick member</button>
        </div>
      </div>
    </div>
  );
}
