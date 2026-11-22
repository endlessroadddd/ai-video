import { getAvatarSpec, featureColor } from "./avatar-presets";
import type { AvatarProps, HumanAvatarSpec, RobotAvatarSpec } from "./avatar-types";

function HumanHair({ spec }: { spec: HumanAvatarSpec }) {
  switch (spec.variant) {
    case "glasses":
      return (
        <>
          <path
            d="M18 27c1-9 8-15 15-15 8 0 13 4 14 13v4c-3-4-7-6-15-6-7 0-11 2-14 7z"
            fill={spec.hair}
          />
          <path
            d="M21 20c5-5 11-7 20-5"
            stroke={spec.accent}
            strokeLinecap="round"
            strokeWidth="2"
            opacity="0.65"
          />
        </>
      );
    case "headset":
      return (
        <path
          d="M19 28c1-10 7-16 13-16 9 0 15 6 15 15v4c-3-5-8-8-15-8-7 0-11 2-13 5z"
          fill={spec.hair}
        />
      );
    case "cap":
      return (
        <>
          <path
            d="M20 25c2-8 9-13 18-13 5 0 9 2 11 5l-4 10H20z"
            fill={spec.accent}
          />
          <path
            d="M18 28c2-4 8-7 17-7 6 0 11 1 15 4-4 3-11 4-20 4-4 0-8 0-12-1z"
            fill={spec.hair}
          />
          <path
            d="M35 23c6 0 11 2 14 6-7 1-12 1-18 0"
            fill={spec.accent}
            opacity="0.9"
          />
        </>
      );
    case "beanie":
      return (
        <>
          <path
            d="M19 26c1-9 6-14 13-14 7 0 12 4 13 14v3H19z"
            fill={spec.accent}
          />
          <path
            d="M18 25h28v7c-4-3-9-4-14-4s-10 1-14 4z"
            fill={spec.hair}
          />
          <path
            d="M21 24h22"
            stroke="#ffffff"
            strokeLinecap="round"
            strokeWidth="1.8"
            opacity="0.42"
          />
        </>
      );
    case "curly":
      return (
        <>
          <circle cx="22" cy="21" r="6.6" fill={spec.hair} />
          <circle cx="30" cy="17.5" r="7.8" fill={spec.hair} />
          <circle cx="39.5" cy="21" r="6.8" fill={spec.hair} />
          <path
            d="M18 29c2-6 7-9 14-9 7 0 12 3 14 9v3H18z"
            fill={spec.hair}
          />
          <path
            d="M24 18c5-4 10-5 16-2"
            stroke={spec.accent}
            strokeLinecap="round"
            strokeWidth="2"
            opacity="0.6"
          />
        </>
      );
    case "buzz":
      return (
        <>
          <path
            d="M18 29c1-8 7-13 14-13 8 0 13 4 14 12-4-3-8-4-14-4-6 0-10 1-14 5z"
            fill={spec.hair}
            opacity="0.82"
          />
          <path
            d="M24 40c2 2 6 3 8 3s6-1 8-3"
            stroke={spec.hair}
            strokeLinecap="round"
            strokeWidth="2.2"
            opacity="0.72"
          />
        </>
      );
    case "ponytail":
      return (
        <>
          <path
            d="M18 29c1-10 7-17 15-17 9 0 14 7 14 16v4c-2-5-8-8-15-8s-12 2-14 5z"
            fill={spec.hair}
          />
          <path
            d="M45 24c4 3 6 7 5 12-2-3-4-4-6-5"
            fill={spec.hair}
          />
          <path
            d="M21 21c4-6 10-8 18-6"
            stroke={spec.accent}
            strokeLinecap="round"
            strokeWidth="2"
            opacity="0.6"
          />
        </>
      );
    case "soft":
    default:
      return (
        <>
          <path
            d="M18 30c0-12 7-19 14-19 10 0 15 8 15 17v3c-2-5-7-9-15-9-7 0-11 2-14 8z"
            fill={spec.hair}
          />
          <path
            d="M21 22c3-6 8-9 16-9 4 0 8 1 11 5"
            stroke={spec.accent}
            strokeLinecap="round"
            strokeWidth="2"
            opacity="0.65"
          />
        </>
      );
  }
}

function HumanAccessory({ spec }: { spec: HumanAvatarSpec }) {
  switch (spec.variant) {
    case "glasses":
      return (
        <>
          <rect
            x="22"
            y="27"
            width="8.5"
            height="6.5"
            rx="2.5"
            fill="none"
            stroke={featureColor}
            strokeWidth="1.8"
          />
          <rect
            x="33.5"
            y="27"
            width="8.5"
            height="6.5"
            rx="2.5"
            fill="none"
            stroke={featureColor}
            strokeWidth="1.8"
          />
          <path
            d="M30.5 30.2h3"
            stroke={featureColor}
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        </>
      );
    case "headset":
      return (
        <>
          <path
            d="M19 30c0-8 6-14 13-14s13 6 13 14"
            fill="none"
            stroke={spec.accent}
            strokeLinecap="round"
            strokeWidth="4"
          />
          <rect x="16.5" y="30" width="5.5" height="10" rx="2.8" fill={spec.accent} />
          <rect x="42" y="30" width="5.5" height="10" rx="2.8" fill={spec.accent} />
          <path
            d="M42 39c0 4-2 6-7 6"
            fill="none"
            stroke={spec.accent}
            strokeLinecap="round"
            strokeWidth="2.4"
          />
        </>
      );
    default:
      return null;
  }
}

function HumanExpression({ spec }: { spec: HumanAvatarSpec }) {
  if (spec.variant === "buzz") {
    return (
      <>
        <path d="M24 27.5h5" stroke={featureColor} strokeLinecap="round" strokeWidth="1.8" />
        <path d="M35 27.5h5" stroke={featureColor} strokeLinecap="round" strokeWidth="1.8" />
        <circle cx="27.5" cy="31" r="1.5" fill={featureColor} />
        <circle cx="36.5" cy="31" r="1.5" fill={featureColor} />
        <path d="M28.5 37h7" stroke={featureColor} strokeLinecap="round" strokeWidth="2" />
      </>
    );
  }

  if (spec.variant === "headset") {
    return (
      <>
        <path
          d="M25.5 29c1.3-1 2.6-1 3.9 0"
          stroke={featureColor}
          strokeLinecap="round"
          strokeWidth="1.7"
        />
        <path
          d="M34.5 29c1.3-1 2.6-1 3.9 0"
          stroke={featureColor}
          strokeLinecap="round"
          strokeWidth="1.7"
        />
        <circle cx="27.5" cy="31.5" r="1.55" fill={featureColor} />
        <circle cx="36.5" cy="31.5" r="1.55" fill={featureColor} />
        <path
          d="M28.5 36c2.2 1.8 4.8 1.8 7 0"
          stroke={featureColor}
          strokeLinecap="round"
          strokeWidth="2"
        />
      </>
    );
  }

  return (
    <>
      <circle cx="27.5" cy="30.5" r="1.7" fill={featureColor} />
      <circle cx="36.5" cy="30.5" r="1.7" fill={featureColor} />
      <path
        d="M28 36c2.3 2.1 5.7 2.1 8 0"
        stroke={featureColor}
        strokeLinecap="round"
        strokeWidth="2.2"
      />
    </>
  );
}

function HumanShirt({ spec }: { spec: HumanAvatarSpec }) {
  if (spec.variant === "headset") {
    return (
      <>
        <path d="M14 60c3-11 11-18 18-18 10 0 17 7 18 18" fill={spec.shirt} />
        <path
          d="M28 45v10M36 45v10"
          stroke={spec.accent}
          strokeLinecap="round"
          strokeWidth="2"
          opacity="0.7"
        />
      </>
    );
  }

  if (spec.variant === "cap") {
    return (
      <>
        <path d="M14 60c4-11 11-18 18-18 11 0 17 7 18 18" fill={spec.shirt} />
        <path
          d="M22 50h20"
          stroke={spec.accent}
          strokeLinecap="round"
          strokeWidth="2.4"
          opacity="0.55"
        />
      </>
    );
  }

  return (
    <>
      <path d="M14 60c4-11 11-18 18-18 11 0 17 7 18 18" fill={spec.shirt} />
      <path
        d="M25 47c1.8 1.6 4.2 2.4 7 2.4 2.8 0 5.2-.8 7-2.4"
        stroke={spec.accent}
        strokeLinecap="round"
        strokeWidth="2"
        opacity="0.45"
      />
    </>
  );
}

function HumanAvatarArt({ spec }: { spec: HumanAvatarSpec }) {
  return (
    <svg viewBox="0 0 64 64" className="discord-avatar__art" aria-hidden="true">
      <circle cx="32" cy="32" r="32" fill={spec.backdrop} />
      <circle cx="20" cy="18" r="12" fill={spec.accent} opacity="0.16" />
      <circle cx="49" cy="50" r="10" fill="#ffffff" opacity="0.06" />
      <HumanShirt spec={spec} />
      <circle cx="32" cy="29.5" r="13.5" fill={spec.skin} />
      <HumanHair spec={spec} />
      <HumanAccessory spec={spec} />
      <HumanExpression spec={spec} />
    </svg>
  );
}

function RobotAvatarArt({ spec }: { spec: RobotAvatarSpec }) {
  return (
    <svg viewBox="0 0 64 64" className="discord-avatar__art" aria-hidden="true">
      <circle cx="32" cy="32" r="32" fill={spec.backdrop} />
      <circle cx="20" cy="17" r="13" fill={spec.accent} opacity="0.18" />
      <path d="M32 9v7" stroke={spec.accent} strokeLinecap="round" strokeWidth="4" />
      <circle cx="32" cy="8" r="4" fill={spec.accent} />
      <rect
        x="16"
        y="18"
        width="32"
        height="24"
        rx="12"
        fill={spec.shell}
        stroke={spec.outline}
        strokeWidth="2.5"
      />
      <rect x="22" y="27" width="7" height="7" rx="3.5" fill={spec.eye} />
      <rect x="35" y="27" width="7" height="7" rx="3.5" fill={spec.eye} />
      <path d="M24 39h16" stroke={spec.outline} strokeLinecap="round" strokeWidth="3.5" opacity="0.72" />
      <path
        d="M20 54c2-8 7-12 12-12s10 4 12 12"
        fill={spec.shell}
        opacity="0.92"
      />
      <path
        d="M26 47c2 2 10 2 12 0"
        stroke={spec.outline}
        strokeLinecap="round"
        strokeWidth="2.4"
        opacity="0.62"
      />
    </svg>
  );
}

export function DiscordAvatar(props: AvatarProps) {
  const { className = "", name, size, status, style } = props;
  const avatarSpec = getAvatarSpec(name);
  const computedStyle = size ? { ...style, width: size, height: size } : style;

  return (
    <span
      className={`discord-avatar ${className}`.trim()}
      style={computedStyle}
      aria-hidden="true"
      title={name}
    >
      {avatarSpec.kind === "robot" ? (
        <RobotAvatarArt spec={avatarSpec} />
      ) : (
        <HumanAvatarArt spec={avatarSpec} />
      )}
      {status ? (
        <span className={`discord-avatar__status discord-avatar__status--${status}`} />
      ) : null}
    </span>
  );
}
