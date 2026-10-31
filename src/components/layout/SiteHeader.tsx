import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { paths } from '@/config/paths';
import { primaryCta, primaryNav } from '@/content/site';
import { Container } from './Container';
import { Logo } from '@/components/ui/Logo';
import { ButtonLink } from '@/components/ui/Button';

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // A route change always dismisses the mobile panel.
  useEffect(() => setMenuOpen(false), [pathname]);

  const solid = scrolled || menuOpen;
  // The homepage hero is ink navy: the header starts light-on-dark and flips to
  // the standard light treatment as soon as it leaves the hero.
  const overDark = pathname === paths.home && !solid;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-[var(--duration-base)]',
        solid
          ? 'border-b border-line bg-canvas/88 shadow-[0_1px_0_rgb(255_255_255/0.6)] backdrop-blur-xl'
          : overDark
            ? 'border-b border-transparent bg-ink-900'
            : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Logo tone={overDark ? 'inverse' : 'default'} />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul
            className={cn(
              'flex items-center gap-0.5 rounded-full border p-1 shadow-e1 backdrop-blur transition-colors duration-[var(--duration-base)]',
              overDark ? 'border-white/12 bg-white/[0.06]' : 'border-line bg-surface/80',
            )}
          >
            {primaryNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'flex h-8 items-center rounded-full px-4 text-body-sm font-medium transition-[background-color,color,box-shadow] duration-[var(--duration-fast)]',
                      overDark
                        ? isActive
                          ? 'bg-white/12 text-white'
                          : 'text-mist-300 hover:text-white'
                        : isActive
                          ? 'bg-canvas text-fg shadow-e1'
                          : 'text-fg-muted hover:text-fg',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink
            to={paths.designSystem}
            variant="ghost"
            size="sm"
            className={cn(overDark && 'text-mist-300 hover:bg-white/5 hover:text-white')}
          >
            Design system
          </ButtonLink>
          <ButtonLink to={primaryCta.to} size="sm" className="pl-4">
            {primaryCta.label}
            <ArrowRight
              aria-hidden="true"
              className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-quint)] group-hover/btn:translate-x-0.5"
            />
          </ButtonLink>
        </div>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
          className={cn(
            'grid size-10 cursor-pointer place-items-center rounded-md border shadow-e1 transition-colors lg:hidden',
            overDark
              ? 'border-white/15 bg-white/5 text-white hover:bg-white/10'
              : 'border-line bg-surface text-fg hover:bg-mist-50',
          )}
        >
          {menuOpen ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
        </button>
      </Container>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}

function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const desktopQuery = window.matchMedia('(min-width: 64rem)');
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    desktopQuery.addEventListener('change', onBreakpoint);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      desktopQuery.removeEventListener('change', onBreakpoint);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-nav"
      ref={panelRef}
      tabIndex={-1}
      hidden={!open}
      className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-canvas shadow-e2 outline-none lg:hidden"
    >
      <Container className="py-4">
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {primaryNav.map((item) => (
              <li key={item.to} className="border-b border-line/80 last:border-b-0">
                <NavLink
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between py-4 font-display text-title-3 font-semibold',
                      isActive ? 'text-brand-700' : 'text-fg',
                    )
                  }
                >
                  {item.label}
                  <ArrowRight aria-hidden="true" className="size-4 text-fg-subtle" />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-5 flex flex-col gap-2.5 pb-2">
          <ButtonLink to={primaryCta.to} size="lg" fullWidth onClick={onClose}>
            {primaryCta.label}
          </ButtonLink>
          <Link
            to={paths.designSystem}
            onClick={onClose}
            className="flex h-10 items-center justify-center rounded-md text-body-sm font-medium text-fg-muted hover:text-fg"
          >
            Design system
          </Link>
        </div>
      </Container>
    </div>
  );
}
