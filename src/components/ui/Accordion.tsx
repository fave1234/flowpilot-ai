import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/cn';

export type AccordionItem = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItem[];
  defaultOpenIndex?: number | null;
  className?: string;
};

/**
 * Single-open disclosure list built on buttons with aria-expanded/aria-controls.
 * Panels are removed from the accessibility tree when closed.
 */
export function Accordion({ items, defaultOpenIndex = null, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const baseId = useId();

  return (
    <div className={cn('divide-y divide-line border-y border-line', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group flex w-full items-start justify-between gap-6 py-5 text-left focus-visible:outline-offset-4"
              >
                <span className="font-display text-body sm:text-title-3 font-semibold text-fg">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-line text-fg-muted transition-[transform,background-color,border-color,color] duration-[var(--duration-base)] ease-[var(--ease-out-quint)]',
                    'group-hover:border-line-strong group-hover:bg-mist-100',
                    isOpen && 'rotate-45 border-brand-200 bg-brand-50 text-brand-700',
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              className={cn(
                'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="pr-10 pb-5 text-body-sm text-fg-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
