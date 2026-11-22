import type { ReactNode } from "react";

function IconBase({ children }: { children: ReactNode }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

export function SearchIcon() {
  return (
    <IconBase>
      <circle cx="11" cy="11" r="6.25" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16l4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </IconBase>
  );
}

export function BellIcon() {
  return (
    <IconBase>
      <path d="M12 4a4 4 0 0 1 4 4v2.7c0 .7.24 1.39.67 1.94L18 14.2V16H6v-1.8l1.33-1.56c.43-.55.67-1.24.67-1.94V8a4 4 0 0 1 4-4Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M9.5 18a2.5 2.5 0 0 0 5 0" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </IconBase>
  );
}

export function PlusIcon() {
  return (
    <IconBase>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </IconBase>
  );
}

export function SparkIcon() {
  return (
    <IconBase>
      <path d="M12 3l1.6 4.8L18 9.4l-4.4 1.7L12 16l-1.6-4.9L6 9.4l4.4-1.6L12 3Z" fill="currentColor" />
    </IconBase>
  );
}

export function SettingsIcon() {
  return (
    <IconBase>
      <path d="M12 8.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M19 12a7.08 7.08 0 0 0-.08-1l2.02-1.57-1.9-3.29-2.44.98a7.16 7.16 0 0 0-1.73-1L14.5 3h-5l-.37 3.12a7.16 7.16 0 0 0-1.73 1l-2.44-.98-1.9 3.29L5.08 11a7.08 7.08 0 0 0 0 2l-2.02 1.57 1.9 3.29 2.44-.98a7.16 7.16 0 0 0 1.73 1L9.5 21h5l.37-3.12a7.16 7.16 0 0 0 1.73-1l2.44.98 1.9-3.29L18.92 13c.05-.33.08-.67.08-1Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.4" />
    </IconBase>
  );
}

export function PinIcon() {
  return (
    <IconBase>
      <path d="M14.5 4.5v4a3 3 0 0 0 .88 2.12L17 12.24V14h-4.25V20l-.75.75-.75-.75V14H7v-1.76l1.62-1.62A3 3 0 0 0 9.5 8.5v-4h5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
    </IconBase>
  );
}

export function SendIcon() {
  return (
    <IconBase>
      <path d="M20 4 4 11.25l6.25 2.5L12.75 20 20 4Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M10.25 13.75 20 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </IconBase>
  );
}
