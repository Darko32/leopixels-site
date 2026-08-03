import type { ComponentProps, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { ArrowUpRightIcon } from './icons';

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse';
type Size = 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-ink hover:bg-accent-deep hover:text-canvas shadow-[0_4px_16px_hsl(38_92%_50%/.28)]',
  secondary: 'bg-ink text-canvas hover:bg-ink-soft',
  ghost: 'border-2 border-line text-text hover:border-ink hover:bg-canvas-alt',
  inverse: 'border-2 border-[hsl(0_0%_100%/.28)] text-canvas hover:bg-[hsl(0_0%_100%/.1)]',
};

const sizes: Record<Size, string> = {
  // 52px minimum, inherited from the trades template's touch-target rule.
  md: 'min-h-[52px] px-6 text-[0.9375rem]',
  lg: 'min-h-[60px] px-8 text-base',
};

function classes(variant: Variant, size: Size, className?: string) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-card font-bold',
    'transition-[transform,box-shadow,background-color,border-color,color] duration-150',
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
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={classes(variant, size, className)}
    >
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
