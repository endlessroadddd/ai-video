import { useEffect, useMemo } from "react";

export type DemoControlAPI = {
  play: () => void;
  pause: () => void;
  restart: () => void;
  toggle: () => void;
};

function getQueryBool(name: string, defaultValue: boolean): boolean {
  const value = new URLSearchParams(window.location.search).get(name);
  if (value == null) return defaultValue;
  if (value === "1" || value.toLowerCase() === "true") return true;
  if (value === "0" || value.toLowerCase() === "false") return false;
  return defaultValue;
}

function getQueryNumber(name: string, defaultValue: number): number {
  const value = new URLSearchParams(window.location.search).get(name);
  if (value == null) return defaultValue;
  const n = Number(value);
  return Number.isFinite(n) ? n : defaultValue;
}

export type DemoRuntimeOptions = {
  loop: boolean;
  speed: number;
  clean: boolean;
};

export function useDemoRuntimeOptions(): DemoRuntimeOptions {
  return useMemo(() => {
    return {
      loop: getQueryBool("loop", true),
      speed: Math.max(0.1, Math.min(3, getQueryNumber("speed", 1))),
      clean: getQueryBool("clean", false),
    };
  }, []);
}

export function useDemoControls(api: DemoControlAPI) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === " ") {
        event.preventDefault();
        api.toggle();
      }
      if (key === "r") api.restart();
      if (key === "p") api.pause();
      if (key === "l") api.play();
    };

    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [api]);
}
