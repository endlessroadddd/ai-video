export type Participant = {
  name: string;
  isBot?: boolean;
  avatarType: "image" | "initials";
  avatarSrc?: string;
  avatarBg?: string;
  avatarInitials?: string;
  color?: string;
};

export function TypingIndicator({ participant }: { participant: Participant }) {
  return (
    <div className="feishu-typing-row">
      <Avatar participant={participant} />
      <div className="feishu-typing-body">
        <div className="feishu-typing-name">{participant.name}</div>
        <div className="feishu-typing-dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

export function Avatar({ participant }: { participant: Participant }) {
  if (participant.avatarType === "image" && participant.avatarSrc) {
    return (
      <div
        className="feishu-msg-av"
        style={{ background: participant.avatarBg || "#eee" }}
      >
        <img src={participant.avatarSrc} alt={participant.name} />
      </div>
    );
  }
  return (
    <div
      className="feishu-msg-av"
      style={{ background: participant.color || "#646a73" }}
    >
      {participant.avatarInitials || participant.name.charAt(0)}
    </div>
  );
}
