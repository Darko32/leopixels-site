'use client';

import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { ArrowRightIcon, CloseIcon, MenuIcon } from '@/components/ui/icons';
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
  email,
  locale,
}: {
  nav: NavItem[];
  ctaLabel: string;
  menuLabel: string;
  closeLabel: string;
  languageLabel: string;
  homeLabel: string;
  /** Shown in the mobile panel, where the header's own chrome is covered. */
  email: string;
  locale: Locale;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  // The section a visitor is in, including its children (/demos/<slug>).
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // Link href="/" while already on "/" is a no-op in Next.js — the pathname
  // doesn't change, so nothing scrolls. Rather than force that with a "/#top"
  // URL hack (which litters the address bar with a fragment, and stacks a new
  // one on every click), scroll to top ourselves when already home and let
  // the plain "/" link do a real navigation from everywhere else. Omitting an
  // explicit `behavior` defers to the global `scroll-behavior` in globals.css,
  // which already backs off to instant under prefers-reduced-motion.
  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isHome) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    window.scrollTo({ top: 0 });
  };

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
    // No background/blur/transform classes on this element: a `backdrop-filter`
    // here would make it the containing block for the `fixed` mobile panel
    // below, collapsing that panel to the header's own (58–70px) box instead
    // of the viewport once scrolled. The scroll-dependent chrome lives one
    // level down instead, on a wrapper with no fixed-position descendants.
    <header className="sticky top-0 z-140">
      <div
        className={cn(
          'transition-[background-color,border-color,box-shadow] duration-200',
          scrolled
            ? 'border-b border-line bg-[hsl(0_0%_100%/.88)] backdrop-blur-lg'
            : 'border-b border-transparent bg-canvas'
        )}
      >
        <Container>
          <div
            className={cn(
              'flex items-center justify-between gap-4 transition-[height] duration-200',
              scrolled ? 'h-[62px]' : 'h-[76px]'
            )}
          >
            <Link href="/" onClick={handleLogoClick} aria-label={homeLabel} className="shrink-0">
              <Wordmark />
            </Link>

            <nav aria-label={menuLabel} className="hidden items-center gap-8 lg:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isCurrent(item.href) ? 'page' : undefined}
                  className={cn(
                    'relative text-small font-semibold transition-colors hover:text-text',
                    'after:absolute after:inset-x-0 after:-bottom-1.5 after:h-0.5 after:origin-left after:rounded-full after:bg-accent after:transition-transform after:duration-200',
                    isCurrent(item.href) ? 'text-text after:scale-x-100' : 'text-body after:scale-x-0'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <LocaleSwitcher active={locale} label={languageLabel} />

              <Link
                href="/#get-a-demo"
                className="group hidden min-h-[46px] items-center gap-2 rounded-card bg-ink px-5 text-small font-bold text-canvas transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-ink-soft sm:inline-flex"
              >
                {ctaLabel}
                <ArrowRightIcon
                  width={16}
                  height={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
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
      </div>

      {open ? (
        <div className="fixed inset-0 z-200 bg-canvas lg:hidden">
          <Container>
            <div className="flex h-[76px] items-center justify-between">
              <Link
                href="/"
                aria-label={homeLabel}
                onClick={(event) => {
                  handleLogoClick(event);
                  setOpen(false);
                }}
              >
                <Wordmark />
              </Link>
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
                  aria-current={isCurrent(item.href) ? 'page' : undefined}
                  className={cn(
                    'border-b border-line py-4 text-h3',
                    isCurrent(item.href) ? 'text-accent-deep' : 'text-text'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/#get-a-demo"
              onClick={() => setOpen(false)}
              className="mt-8 flex min-h-[56px] items-center justify-center rounded-card bg-accent px-6 font-bold text-ink shadow-[0_2px_6px_hsl(38_92%_40%/.24),0_10px_28px_hsl(38_92%_40%/.22)]"
            >
              {ctaLabel}
            </Link>

            {/* The top bar's switcher and contact link are behind this panel,
                so they are repeated here rather than being unreachable. */}
            <div className="mt-7 flex items-center justify-between gap-4 border-t border-line pt-6">
              <a
                href={`mailto:${email}`}
                className="text-small font-semibold text-body transition-colors hover:text-text"
              >
                {email}
              </a>
              <LocaleSwitcher active={locale} label={languageLabel} />
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
