import type { ReactNode } from "react";

function IconBase({ children }: { children: ReactNode }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {children}
    </svg>
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
      <path
        d="M12 3l1.6 4.8L18 9.4l-4.4 1.7L12 16l-1.6-4.9L6 9.4l4.4-1.6L12 3Z"
        fill="currentColor"
      />
    </IconBase>
  );
}

export function SendIcon() {
  return (
    <IconBase>
      <path
        d="M20 4 4 11.25l6.25 2.5L12.75 20 20 4Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path d="M10.25 13.75 20 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </IconBase>
  );
}
