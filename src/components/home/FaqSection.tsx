import { faqs } from '@/content/home';
import { paths } from '@/config/paths';
import { Section } from '@/components/layout/Section';
import { Accordion } from '@/components/ui/Accordion';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TextLink } from '@/components/ui/TextLink';

export function FaqSection() {
  return (
    <Section spacing="md" id="faq">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-title-1">
            Answers <span className="text-gradient-brand">before you commit.</span>
          </h2>
          <p className="mt-4 max-w-sm text-body-sm text-fg-muted">
            The practical questions founders and small teams ask first. If yours is not here, the
            contact page is a short form, not a sales call.
          </p>
          <div className="mt-6">
            <TextLink to={paths.contact}>Ask a question</TextLink>
          </div>
        </div>

        <Accordion items={faqs} defaultOpenIndex={0} />
      </div>
    </Section>
  );
}
