type SegmentAvatarProps = {
  fallback: string;
  kind: "ai" | "user";
  src?: string;
};

export function SegmentAvatar(props: SegmentAvatarProps) {
  const { fallback, kind, src } = props;
  const aiLabel = "Enterprise AI avatar";

  return src ? (
    <img
      src={src}
      alt={kind === "ai" ? aiLabel : "User avatar"}
      className={`segment-chat-avatar segment-chat-avatar--${kind}`}
      loading="eager"
    />
  ) : (
    <span className={`segment-chat-avatar segment-chat-avatar--${kind} segment-chat-avatar--fallback`}>
      {fallback}
    </span>
  );
}
