import { ArrowRight } from 'lucide-react';
import { hero } from '@/content/home';
import { primaryCta } from '@/content/site';
import { DashboardWindow } from '@/components/product/DashboardWindow';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink, buttonStyles } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';

/**
 * Dark hero. The dashboard is the primary visual asset: an ambient violet field
 * behind it, a frosted shell around it, then the frame itself with glass chrome
 * and four switchable sample views.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-900 text-fg-inverse">
      <Container className="pt-12 pb-12 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16">
        <div className="max-w-4xl">
          <Badge variant="inverse" dot size="md">
            {hero.badge}
          </Badge>

          <h1 className="mt-6 text-display-1 text-white">
            {hero.headline[0]}
            <br />
            <span className="text-gradient-inverse">{hero.headline[1].replace('.', '')}</span>
            <span className="text-brand-400">.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lead text-mist-300">{hero.lead}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink to={primaryCta.to} size="lg">
              {hero.primaryCta}
              <ArrowRight
                aria-hidden="true"
                className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-quint)] group-hover/btn:translate-x-0.5"
              />
            </ButtonLink>
            <a href="#how-it-works" className={buttonStyles({ variant: 'inverse', size: 'lg' })}>
              {hero.secondaryCta}
            </a>
          </div>

          <p className="mt-5 text-caption text-mist-500">{hero.reassurance}</p>
        </div>

        <div className="relative mt-12 lg:mt-16">
          {/* Ambient field: one violet core, one halo edge. Never behind text. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-4 -top-16 -bottom-12 sm:-inset-x-12 lg:-inset-x-16"
          >
            <div className="absolute top-1/2 left-1/2 h-[115%] w-[112%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(46%_46%_at_50%_50%,var(--glow-brand),var(--glow-brand-soft)_46%,transparent_72%)]" />
            <div className="absolute inset-x-0 bottom-0 h-3/5 bg-[radial-gradient(48%_62%_at_82%_100%,var(--glow-halo),transparent_70%)]" />
          </div>

          {/* Frosted bezel + glass chrome live in the frame component. */}
          <DashboardWindow glass />
        </div>
      </Container>
    </section>
  );
}
