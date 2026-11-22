import { getAvatarSpec } from "./avatar-presets";

const avatarDataUrlCache = new Map<string, string>();

function getInitials(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  if (parts.length === 1) {
    return parts[0]!.slice(0, 2).toUpperCase();
  }

  return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
}

function createHumanAvatarMarkup(
  name: string,
  backdrop: string,
  accent: string,
  shirt: string,
) {
  const initials = getInitials(name);

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="32" fill="${backdrop}" />
      <circle cx="18" cy="17" r="11" fill="${accent}" opacity="0.22" />
      <circle cx="48" cy="49" r="10" fill="#ffffff" opacity="0.08" />
      <path d="M14 60c4-11 11-18 18-18 11 0 17 7 18 18" fill="${shirt}" opacity="0.82" />
      <circle cx="32" cy="28" r="14" fill="#ffffff" opacity="0.14" />
      <text
        x="32"
        y="36"
        text-anchor="middle"
        font-family="Segoe UI, Arial, sans-serif"
        font-size="16"
        font-weight="700"
        fill="#f8fbff"
      >${initials}</text>
    </svg>
  `;
}

function createRobotAvatarMarkup() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="32" fill="#5865f2" />
      <circle cx="20" cy="17" r="13" fill="#8ea0ff" opacity="0.18" />
      <path d="M32 9v7" stroke="#8ea0ff" stroke-linecap="round" stroke-width="4" />
      <circle cx="32" cy="8" r="4" fill="#8ea0ff" />
      <rect x="16" y="18" width="32" height="24" rx="12" fill="#dfe7ff" stroke="#223067" stroke-width="2.5" />
      <rect x="22" y="27" width="7" height="7" rx="3.5" fill="#5865f2" />
      <rect x="35" y="27" width="7" height="7" rx="3.5" fill="#5865f2" />
      <path d="M24 39h16" stroke="#223067" stroke-linecap="round" stroke-width="3.5" opacity="0.72" />
    </svg>
  `;
}

export function createAvatarDataUrl(name: string, variant?: string) {
  const cacheKey = `${name}::${variant ?? "default"}`;
  const cached = avatarDataUrlCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const avatarSpec = getAvatarSpec(name, variant);
  const svgMarkup =
    avatarSpec.kind === "robot"
      ? createRobotAvatarMarkup()
      : createHumanAvatarMarkup(
          name,
          avatarSpec.backdrop,
          avatarSpec.accent,
          avatarSpec.shirt,
        );
  const dataUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgMarkup)}`;
  avatarDataUrlCache.set(cacheKey, dataUrl);
  return dataUrl;
}
