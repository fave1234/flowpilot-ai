import { ArrowRight } from 'lucide-react';
import { hero } from '@/content/home';
import { primaryCta } from '@/content/site';
import { DashboardWindow } from '@/components/product/DashboardWindow';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink, buttonStyles } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

/**
 * Dark hero. The dashboard frame is the primary visual asset of the page:
 * full container width, generous chrome, realistic hierarchy.
 */
export function Hero() {
  return (
    <section className="relative bg-ink-900 text-fg-inverse">
      <Container className="pt-12 pb-12 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16">
        <ScrollReveal className="max-w-4xl">
          <Badge variant="inverse" dot size="md">
            {hero.badge}
          </Badge>

          <h1 className="mt-6 text-display-1 text-white">
            {hero.headline[0]}
            <br />
            <span className="gradient-text-inverse">{hero.headline[1]}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lead text-mist-300">{hero.lead}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink to={primaryCta.to} size="lg">
              {hero.primaryCta}
              <ArrowRight aria-hidden="true" />
            </ButtonLink>
            <a href="#how-it-works" className={buttonStyles({ variant: 'inverse', size: 'lg' })}>
              {hero.secondaryCta}
            </a>
          </div>

          <p className="mt-5 text-caption text-mist-500">{hero.reassurance}</p>
        </ScrollReveal>

        <ScrollReveal delay={100} className="mt-12 lg:mt-16">
          <DashboardWindow />
        </ScrollReveal>
      </Container>
    </section>
  );
}
