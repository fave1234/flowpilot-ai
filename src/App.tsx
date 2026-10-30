import { Route, Routes } from 'react-router-dom';
import { paths } from '@/config/paths';
import { ScrollToTop } from '@/lib/ScrollToTop';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Home } from '@/pages/Home';
import { Features } from '@/pages/Features';
import { Pricing } from '@/pages/Pricing';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';
import { DesignSystem } from '@/pages/DesignSystem';
import { NotFound } from '@/pages/NotFound';

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-md focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-body-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <ScrollToTop />
      <SiteHeader />

      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Routes>
          <Route path={paths.home} element={<Home />} />
          <Route path={paths.features} element={<Features />} />
          <Route path={paths.pricing} element={<Pricing />} />
          <Route path={paths.about} element={<About />} />
          <Route path={paths.contact} element={<Contact />} />
          <Route path={paths.designSystem} element={<DesignSystem />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <SiteFooter />
    </div>
  );
}
