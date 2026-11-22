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

export function ShieldIcon() {
  return (
    <IconBase>
      <path
        d="M12 3.7 5.5 6.4v5.2c0 4.2 2.4 8 6.5 9.8 4.1-1.8 6.5-5.6 6.5-9.8V6.4L12 3.7Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path d="m9.6 12.2 1.7 1.7 3.2-3.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </IconBase>
  );
}

export function SearchIcon() {
  return (
    <IconBase>
      <circle cx="10.5" cy="10.5" r="5.7" stroke="currentColor" strokeWidth="1.8" />
      <path d="m15.2 15.2 4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </IconBase>
  );
}

export function MessageIcon() {
  return (
    <IconBase>
      <path
        d="M6 6.7h12c1.1 0 2 .9 2 2v7.4c0 1.1-.9 2-2 2h-6.3L7.8 21v-2.9H6c-1.1 0-2-.9-2-2V8.7c0-1.1.9-2 2-2Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </IconBase>
  );
}

export function TrashIcon() {
  return (
    <IconBase>
      <path d="M5.5 7.5h13" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <path
        d="M9.2 7.5V5.7c0-.8.6-1.4 1.4-1.4h2.8c.8 0 1.4.6 1.4 1.4v1.8"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8.1 7.5v10.1c0 1 .8 1.8 1.8 1.8h4.2c1 0 1.8-.8 1.8-1.8V7.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M10.5 10.8v5.2M13.5 10.8v5.2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </IconBase>
  );
}

export function KickIcon() {
  return (
    <IconBase>
      <circle cx="9" cy="9" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4.8 18.5c.9-2.2 2.5-3.6 4.2-3.6s3.3 1.4 4.2 3.6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15.5 9.5h4.5M17.75 7.25v4.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </IconBase>
  );
}

export function BanIcon() {
  return (
    <IconBase>
      <circle cx="12" cy="12" r="7.4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 17 17 7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </IconBase>
  );
}

export function CheckIcon() {
  return (
    <IconBase>
      <path d="m6.2 12.5 3.4 3.4 8.2-8.4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </IconBase>
  );
}

export function DiscordIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 126.644 96" fill="currentColor" aria-hidden="true">
      <path d="M81.15,0c-1.2376,2.1973-2.3489,4.4704-3.3591,6.794c-9.5975-1.4396-19.3718-1.4396-28.9945,0 c-.985-2.3236-2.1216-4.5967-3.3591-6.794c-9.0166,1.5407-17.8059,4.2431-26.1405,8.0568 C2.779,32.5304-1.6914,56.3725,0.5312,79.8863c9.6732,7.1476,20.5083,12.603,32.0505,16.0884 c2.6014-3.4854,4.8998-7.1981,6.8698-11.0623c-3.738-1.3891-7.3497-3.1318-10.8098-5.1523 c0.9092-0.6567,1.7932-1.3386,2.6519-1.9953c20.281,9.547,43.7696,9.547,64.0758,0 c0.8587,0.7072,1.7427,1.3891,2.6519,1.9953c-3.4601,2.0457-7.0718,3.7632-10.835,5.1776 c1.97,3.8642,4.2683,7.5769,6.8698,11.0623c11.5419-3.4854,22.3769-8.9156,32.0509-16.0631 c2.626-27.2771-4.496-50.9172-18.817-71.8548C98.9811,4.2684,90.1918,1.5659,81.1752,0.0505L81.15,0z M42.2802,65.4144c-6.2383,0-11.4159-5.6575-11.4159-12.6535s4.9755-12.6788,11.3907-12.6788 s11.5169,5.708,11.4159,12.6788C53.5699,59.7317,48.6449,65.4144,42.2802,65.4144z M84.3576,65.4144 c-6.2637,0-11.3907-5.6575-11.3907-12.6535s4.9755-12.6788,11.3907-12.6788s11.4917,5.708,11.3906,12.6788 C95.6472,59.7317,90.7222,65.4144,84.3576,65.4144z" />
    </svg>
  );
}
