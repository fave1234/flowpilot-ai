import { homeMeta } from '@/content/home';
import { usePageMeta } from '@/lib/usePageMeta';
import { Hero } from '@/components/home/Hero';
import { TrustBand } from '@/components/home/TrustBand';
import { ProblemSolution } from '@/components/home/ProblemSolution';
import { CoreFeatures } from '@/components/home/CoreFeatures';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Showcase } from '@/components/home/Showcase';
import { PricingPreview } from '@/components/home/PricingPreview';
import { FaqSection } from '@/components/home/FaqSection';
import { FinalCta } from '@/components/home/FinalCta';
import { HumanNarrative, AudiencePhotos, LifestyleWorkspace } from '@/components/home/HumanStories';

/**
 * Home — composed from section components in src/components/home.
 * Rhythm: ink → surface → canvas → surface → canvas → ink → surface → canvas → ink.
 */
export function Home() {
  usePageMeta(homeMeta);

  return (
    <>
      <Hero />
      <TrustBand />
      <HumanNarrative />
      <ProblemSolution />
      <CoreFeatures />
      <HowItWorks />
      <LifestyleWorkspace />
      <AudiencePhotos />
      <Showcase />
      <PricingPreview />
      <FaqSection />
      <FinalCta />
    </>
  );
}
