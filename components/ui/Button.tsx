import type { ComponentProps, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { ArrowUpRightIcon } from './icons';

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse';
type Size = 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-ink shadow-[0_2px_6px_hsl(38_92%_40%/.24),0_10px_28px_hsl(38_92%_40%/.22)] hover:bg-accent-deep hover:text-canvas hover:shadow-[0_4px_10px_hsl(32_90%_36%/.3),0_14px_34px_hsl(32_90%_36%/.26)]',
  secondary: 'bg-ink text-canvas hover:bg-ink-soft',
  ghost: 'border border-line bg-canvas text-text hover:border-ink hover:bg-canvas-alt',
  inverse:
    'border border-[hsl(0_0%_100%/.32)] bg-[hsl(0_0%_100%/.06)] text-canvas backdrop-blur-sm hover:border-[hsl(0_0%_100%/.6)] hover:bg-[hsl(0_0%_100%/.14)]',
};

const sizes: Record<Size, string> = {
  // 50px minimum, comfortably over the trades template's touch-target rule.
  md: 'min-h-[50px] px-6 text-small',
  lg: 'min-h-[56px] px-7 text-base',
};

function classes(variant: Variant, size: Size, className?: string) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-card text-center font-bold leading-tight',
    'transition-[transform,box-shadow,background-color,border-color,color] duration-200',
    'hover:-translate-y-px',
    variants[variant],
    sizes[size],
    className
  );
}

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

/** Internal navigation — locale-aware. */
export function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
}: BaseProps & { href: string }) {
  return (
    <Link href={href} className={classes(variant, size, className)}>
      {children}
    </Link>
  );
}

/** External links. Always a new tab, so leopixels.com stays open behind them. */
export function ExternalButton({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  showIcon = true,
}: BaseProps & { href: string; showIcon?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noopener" className={classes(variant, size, className)}>
      {children}
      {showIcon ? <ArrowUpRightIcon /> : null}
    </a>
  );
}

export function ButtonSubmit({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: BaseProps & ComponentProps<'button'>) {
  return (
    <button className={classes(variant, size, className)} {...props}>
      {children}
    </button>
  );
}
