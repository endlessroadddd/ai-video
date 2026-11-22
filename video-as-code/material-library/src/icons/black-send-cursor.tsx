import type { SVGProps } from "react";

export type BlackSendCursorProps = SVGProps<SVGSVGElement>;

export function BlackSendCursor(props: BlackSendCursorProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 2.5L17.4 14.2H11.4L14.6 21.2L11.3 22.5L8.3 15.4L3.4 19.3L4 2.5Z"
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
