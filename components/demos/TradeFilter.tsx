'use client';

import { useState, type ReactNode } from 'react';
import type { Trade } from '@/demos/_schema';
import { cn } from '@/lib/utils';

export interface FilterableDemo {
  id: string;
  trade: Trade;
  /** Server-rendered card, passed through as a prop. */
  card: ReactNode;
}

/**
 * Client-side filter over server-rendered cards. The cards arrive as ReactNode
 * props, so filtering never re-renders them and no demo data reaches the
 * browser beyond the trade slug.
 *
 * Rendered only when more than one trade is represented — a filter with a
 * single option is furniture, not a control.
 */
export function TradeFilter({
  demos,
  options,
  allLabel,
  label,
}: {
  demos: FilterableDemo[];
  options: { value: Trade; label: string }[];
  allLabel: string;
  label: string;
}) {
  const [active, setActive] = useState<Trade | 'all'>('all');

  const visible = active === 'all' ? demos : demos.filter((demo) => demo.trade === active);

  return (
    <div className="flex flex-col gap-10">
      <div role="group" aria-label={label} className="flex flex-wrap gap-2">
        <FilterButton active={active === 'all'} onClick={() => setActive('all')}>
          {allLabel}
        </FilterButton>
        {options.map((option) => (
          <FilterButton
            key={option.value}
            active={active === option.value}
            onClick={() => setActive(option.value)}
          >
            {option.label}
          </FilterButton>
        ))}
      </div>

      <div
        className={cn(
          'grid gap-6',
          visible.length === 1 && 'grid-cols-1',
          visible.length === 2 && 'md:grid-cols-2',
          visible.length >= 3 && 'md:grid-cols-2 lg:grid-cols-3'
        )}
      >
        {visible.map((demo) => (
          <div key={demo.id}>{demo.card}</div>
        ))}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'min-h-[44px] rounded-full px-5 text-[0.9375rem] font-bold transition-colors',
        active
          ? 'bg-ink text-canvas'
          : 'bg-canvas text-body ring-1 ring-line hover:bg-canvas-alt hover:text-text'
      )}
    >
      {children}
    </button>
  );
}
