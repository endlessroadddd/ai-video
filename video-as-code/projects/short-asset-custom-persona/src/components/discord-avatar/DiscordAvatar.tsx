import { getAvatarImageSource } from "./avatar-presets";
import type { AvatarProps } from "./avatar-types";

export function DiscordAvatar(props: AvatarProps) {
  const { className = "", name, size, status, style } = props;
  const computedStyle = size ? { ...style, width: size, height: size } : style;

  return (
    <span
      className={`discord-avatar ${className}`.trim()}
      style={computedStyle}
      aria-hidden="true"
      title={name}
    >
      <img
        alt=""
        className="discord-avatar__art"
        decoding="async"
        loading="eager"
        src={getAvatarImageSource(name)}
      />
      {status ? (
        <span className={`discord-avatar__status discord-avatar__status--${status}`} />
      ) : null}
    </span>
  );
}
