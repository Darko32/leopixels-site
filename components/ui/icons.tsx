import type { SVGProps } from 'react';

/**
 * Inline SVG only — no icon library. Every icon here is used at least twice;
 * anything single-use belongs inline at its call site.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true,
  focusable: 'false',
} as const;

export function CheckIcon(props: IconProps) {
  return (
    <svg width="20" height="20" {...base} {...props}>
      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2Z" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg width="18" height="18" {...base} {...props}>
      <path d="M13.2 5.2 11.8 6.6l4.4 4.4H4v2h12.2l-4.4 4.4 1.4 1.4L20 12l-6.8-6.8Z" />
    </svg>
  );
}

/** External / opens-in-new-tab affordance. */
export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg width="18" height="18" {...base} {...props}>
      <path d="M7 6v2h7.6L5.3 17.3l1.4 1.4L16 9.4V17h2V6H7Z" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg width="24" height="24" {...base} {...props}>
      <path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg width="24" height="24" {...base} {...props}>
      <path d="m18.3 7.1-1.4-1.4-4.9 4.9-4.9-4.9-1.4 1.4 4.9 4.9-4.9 4.9 1.4 1.4 4.9-4.9 4.9 4.9 1.4-1.4-4.9-4.9 4.9-4.9Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg width="18" height="18" {...base} {...props}>
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
    </svg>
  );
}

export function BoltIcon(props: IconProps) {
  return (
    <svg width="20" height="20" {...base} {...props}>
      <path d="M13 2 4.1 13.4c-.4.5 0 1.3.7 1.3H11l-1 7.3 8.9-11.4c.4-.5 0-1.3-.7-1.3H12l1-7.3Z" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg width="20" height="20" {...base} {...props}>
      <path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm-1 14-4-4 1.4-1.4L11 13.2l4.6-4.6L17 10l-6 6Z" />
    </svg>
  );
}

export function GaugeIcon(props: IconProps) {
  return (
    <svg width="20" height="20" {...base} {...props}>
      <path d="M12 4a9 9 0 0 0-7.8 13.5c.2.3.5.5.9.5h13.8c.4 0 .7-.2.9-.5A9 9 0 0 0 12 4Zm0 2a7 7 0 0 1 6.2 10H5.8A7 7 0 0 1 12 6Zm3.5 2.8-3 3.7a1.5 1.5 0 1 0 1.2 1.2l3-3.7-1.2-1.2Z" />
    </svg>
  );
}

export function KeyIcon(props: IconProps) {
  return (
    <svg width="20" height="20" {...base} {...props}>
      <path d="M14 2a6 6 0 0 0-5.7 7.9L2 16.2V20h3.8l1.4-1.4v-1.8H9v-1.8h1.8l1.3-1.3A6 6 0 1 0 14 2Zm1.8 5.2a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
    </svg>
  );
}
