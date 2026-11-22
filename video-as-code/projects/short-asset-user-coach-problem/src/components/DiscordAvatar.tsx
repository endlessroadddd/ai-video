import byteriderAvatar from "../assets/avatars/byterider.png";
import echoAvatar from "../assets/avatars/echo.png";
import kaiAvatar from "../assets/avatars/kai.png";
import lunaAvatar from "../assets/avatars/luna.png";
import maxaAvatar from "../assets/avatars/maxa.png";
import novaAvatar from "../assets/avatars/nova.png";
import pixelAvatar from "../assets/avatars/pixel.png";
import sageAvatar from "../assets/avatars/sage.png";
import zedAvatar from "../assets/avatars/zed.png";

type DiscordAvatarProps = {
  name: string;
  variant?: "violet" | "mint" | "ember" | "steel";
  compact?: boolean;
};

const initialsByName: Record<string, string> = {
  ByteRider: "BR",
  Echo: "EC",
  Kai: "K",
  Luna: "L",
  MaxA: "MA",
  Nova: "N",
  Pixel: "P",
  Sage: "S",
  Zed: "Z",
};

const avatarByName: Record<string, string> = {
  ByteRider: byteriderAvatar,
  Echo: echoAvatar,
  Kai: kaiAvatar,
  Luna: lunaAvatar,
  MaxA: maxaAvatar,
  Nova: novaAvatar,
  Pixel: pixelAvatar,
  Sage: sageAvatar,
  Zed: zedAvatar,
};

function getVariant(name: string, explicit?: DiscordAvatarProps["variant"]): string {
  if (explicit) {
    return explicit;
  }

  const variants = ["violet", "mint", "ember", "steel"] as const;
  const code = Array.from(name).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return variants[code % variants.length];
}

export function DiscordAvatar(props: Readonly<DiscordAvatarProps>) {
  const { compact = false, name, variant } = props;
  const resolvedVariant = getVariant(name, variant);
  const avatarSrc = avatarByName[name];

  return (
    <span className={`avatar avatar--${resolvedVariant} ${compact ? "avatar--compact" : ""}`}>
      {avatarSrc ? (
        <img alt="" aria-hidden="true" src={avatarSrc} />
      ) : (
        <span>{initialsByName[name] ?? name.slice(0, 2).toUpperCase()}</span>
      )}
    </span>
  );
}
