import { cn } from '@/lib/utils';

/**
 * Placeholder wordmark: a pixel-grid glyph plus the name.
 *
 * TODO(open item): replace the mark with the real LeoPixels logo. It needs to
 * hold up at display scale on a dark band, and the same shape has to work as
 * the favicon and in OG cards.
 */
export function Wordmark({
  tone = 'light',
  className,
}: {
  tone?: 'light' | 'ink';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 text-[1.0625rem] font-extrabold tracking-[-0.02em]',
        tone === 'light' ? 'text-text' : 'text-canvas',
        className
      )}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        className="shrink-0 text-accent"
      >
        <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor" />
        <rect x="13" y="2" width="9" height="9" rx="2" fill="currentColor" opacity="0.45" />
        <rect x="2" y="13" width="9" height="9" rx="2" fill="currentColor" opacity="0.45" />
        <rect x="13" y="13" width="9" height="9" rx="2" fill="currentColor" />
      </svg>
      LeoPixels
    </span>
  );
}
