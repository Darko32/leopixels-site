import type { CSSProperties, ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Stagger index → the CSS delay custom property. */
function stagger(delay?: number): CSSProperties | undefined {
  return delay ? ({ '--i': delay } as CSSProperties) : undefined;
}

export function Eyebrow({
  children,
  delay,
  tone = 'light',
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  tone?: 'light' | 'ink';
  className?: string;
  /** Escape hatch for one-off overrides (e.g. a font-size bump on a single instance). */
  style?: CSSProperties;
}) {
  return (
    <p
      className={cn(
        'reveal text-eyebrow uppercase',
        // Gold at 50% lightness fails contrast as text on white — the deeper
        // tone is the only accent allowed to carry words on a light background.
        tone === 'light' ? 'text-accent-deep' : 'text-accent',
        className
      )}
      style={{ ...stagger(delay), ...style }}
    >
      {children}
    </p>
  );
}

/**
 * The display treatment, with the clip-reveal: the text rises out of its own
 * box rather than fading in. Block-level on purpose — splitting headings into
 * per-word spans degrades screen-reader output and reads badly in Cyrillic.
 */
export function DisplayHeading({
  children,
  as: Tag = 'h2',
  delay,
  className,
  style,
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  /** Escape hatch for one-off overrides (e.g. a font-size bump on a single instance). */
  style?: CSSProperties;
}) {
  return (
    <Tag className={cn('text-display', className)} style={style}>
      <span className="reveal-clip" style={stagger(delay)}>
        <span>{children}</span>
      </span>
    </Tag>
  );
}

export function Lead({
  children,
  delay,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <p className={cn('reveal text-lead max-w-[60ch]', className)} style={stagger(delay)}>
      {children}
    </p>
  );
}

/**
 * Eyebrow → heading → lead, choreographed 80ms apart. Wrap in <Reveal
 * staggerChildren> so the whole group runs off one observer.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  tone = 'light',
  as = 'h2',
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'ink';
  as?: ElementType;
}) {
  return (
    <div className={cn('flex flex-col gap-5', align === 'center' && 'items-center text-center')}>
      {eyebrow ? (
        <Eyebrow delay={0} tone={tone}>
          {eyebrow}
        </Eyebrow>
      ) : null}

      <DisplayHeading
        as={as}
        delay={1}
        className={cn('text-h2', tone === 'ink' && 'text-canvas')}
      >
        {title}
      </DisplayHeading>

      {lead ? (
        <Lead delay={2} className={cn(align === 'center' && 'mx-auto', tone === 'ink' && 'text-body-invert')}>
          {lead}
        </Lead>
      ) : null}
    </div>
  );
}
