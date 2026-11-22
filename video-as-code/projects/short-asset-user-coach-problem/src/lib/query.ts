export function getSearchFlag(name: string): boolean {
  return new URLSearchParams(window.location.search).get(name) === "1";
}

export function getInitialTime(durationMs: number): number {
  const value = Number(new URLSearchParams(window.location.search).get("t") ?? 0);

  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(durationMs, Math.max(0, value));
}
