import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { footerNav, primaryCta, site } from '@/content/site';
import { paths } from '@/config/paths';
import { Logo } from '@/components/ui/Logo';
import { Container } from './Container';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function SiteFooter() {
  const isHome = useLocation().pathname === paths.home;
  const content = (
    <>
      <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(3,1fr)] lg:gap-10">
        <div className="max-w-sm">
          <Logo tone="inverse" />
          <p className="mt-5 text-body-sm text-mist-400">{site.description}</p>
          <Link
            to={primaryCta.to}
            className="group mt-6 inline-flex items-center gap-2 text-body-sm font-medium text-white hover:text-halo-200"
          >
            {primaryCta.label}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-quint)] group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {footerNav.map((group) => (
          <nav key={group.heading} aria-label={group.heading}>
            <h2 className="text-overline font-semibold tracking-[0.14em] text-mist-500 uppercase">
              {group.heading}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {group.items.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="rounded-sm text-body-sm text-mist-300 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-caption text-mist-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} FlowPilot AI. A fictional product.</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <p>Content is illustrative only — no live data or AI.</p>
          <Link
            to={paths.designSystem}
            className="rounded-sm font-medium text-mist-300 transition-colors hover:text-white"
          >
            Design system
          </Link>
        </div>
      </div>
    </>
  );
  return (
    <footer className="border-t border-white/10 bg-ink-950 text-mist-300">
      <Container className="py-14 lg:py-20">
        {isHome ? <ScrollReveal>{content}</ScrollReveal> : content}
      </Container>
    </footer>
  );
}
