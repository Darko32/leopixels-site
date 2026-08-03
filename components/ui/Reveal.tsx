'use client';

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * The whole motion system, in one component.
 *
 * A single IntersectionObserver per instance toggles `.is-revealed`; the actual
 * animation is CSS (see globals.css). Children stagger via a `--i` custom
 * property, so a grid of cards costs no extra JavaScript.
 *
 * Deliberately not framer-motion: ~35 KB to replace this.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className,
  /** Stagger direct children instead of revealing the block as one unit. */
  staggerChildren = false,
}: {
  children: ReactNode;
  as?: ElementType;
  /** Stagger index — multiplied by 80ms. */
  delay?: number;
  className?: string;
  staggerChildren?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No reduced-motion branch here on purpose: globals.css already forces the
    // revealed state under `prefers-reduced-motion`, so handling it in JS would
    // only add a cascading render for no behavioural difference.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
          observer.disconnect(); // once: true
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(!staggerChildren && 'reveal', revealed && 'is-revealed', className)}
      style={{ '--i': delay } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
