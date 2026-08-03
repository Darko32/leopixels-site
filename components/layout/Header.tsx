'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { CloseIcon, MenuIcon } from '@/components/ui/icons';
import { LocaleSwitcher } from './LocaleSwitcher';
import { Wordmark } from './Wordmark';

export interface NavItem {
  href: string;
  label: string;
}

/**
 * Sticky header that shrinks and gains a border + blur after 40px of scroll.
 *
 * Text arrives as props from the server layout rather than through
 * useTranslations, so no NextIntlClientProvider is needed and the message
 * bundle never reaches the browser.
 */
export function Header({
  nav,
  ctaLabel,
  menuLabel,
  closeLabel,
  languageLabel,
  homeLabel,
  locale,
}: {
  nav: NavItem[];
  ctaLabel: string;
  menuLabel: string;
  closeLabel: string;
  languageLabel: string;
  homeLabel: string;
  locale: Locale;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 40));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Esc closes the panel; body scroll is locked while it is open.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-100 transition-[background-color,border-color,box-shadow] duration-200',
        scrolled
          ? 'border-b border-line bg-[hsl(0_0%_100%/.88)] backdrop-blur-lg'
          : 'border-b border-transparent bg-canvas'
      )}
    >
      <Container>
        <div
          className={cn(
            'flex items-center justify-between gap-4 transition-[height] duration-200',
            scrolled ? 'h-[58px]' : 'h-[70px]'
          )}
        >
          <Link href="/" aria-label={homeLabel} className="shrink-0">
            <Wordmark />
          </Link>

          <nav aria-label={menuLabel} className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.9375rem] font-semibold text-body transition-colors hover:text-text"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LocaleSwitcher active={locale} label={languageLabel} />

            <Link
              href="/#get-a-demo"
              className="hidden min-h-[44px] items-center rounded-card bg-ink px-5 text-[0.9375rem] font-bold text-canvas transition-colors hover:bg-ink-soft sm:inline-flex"
            >
              {ctaLabel}
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={menuLabel}
              aria-expanded={open}
              className="-mr-2 inline-flex size-11 items-center justify-center rounded-card text-text lg:hidden"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </Container>

      {open ? (
        <div className="fixed inset-0 z-200 bg-canvas lg:hidden">
          <Container>
            <div className="flex h-[70px] items-center justify-between">
              <Wordmark />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={closeLabel}
                autoFocus
                className="-mr-2 inline-flex size-11 items-center justify-center rounded-card text-text"
              >
                <CloseIcon />
              </button>
            </div>

            <nav aria-label={menuLabel} className="flex flex-col gap-1 pt-6">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-4 text-h3 text-text"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/#get-a-demo"
              onClick={() => setOpen(false)}
              className="mt-8 flex min-h-[56px] items-center justify-center rounded-card bg-accent px-6 font-bold text-ink"
            >
              {ctaLabel}
            </Link>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
