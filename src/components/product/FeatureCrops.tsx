import { ArrowRight, Check, MessageSquare, Sparkles, Zap } from 'lucide-react';
import { cn } from '@/lib/cn';
import { MiniAvatar, MockSwitch } from '@/components/product/Frame';

/**
 * One interface region per core feature.
 * Static illustrations: aria-hidden, non-interactive, minimum 12px text.
 */

type CropProps = { className?: string };

function CropFrame({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none flex min-h-[200px] flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-e1 select-none',
        className,
      )}
    >
      <div className="flex h-8 shrink-0 items-center gap-2 border-b border-line bg-mist-50 px-3">
        <span className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-mist-400" />
          <span className="size-1.5 rounded-full bg-mist-300" />
          <span className="size-1.5 rounded-full bg-mist-300" />
        </span>
        <span className="ml-auto truncate text-xs text-fg-subtle">{label}</span>
      </div>
      <div className="flex flex-1 flex-col p-3">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 1. Workflow automation                                                      */
/* -------------------------------------------------------------------------- */

export function AutomationCrop({ className }: CropProps) {
  return (
    <CropFrame label="Automations / Rule" className={className}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-semibold text-ink-900">Meeting notes → tasks</p>
          <p className="mt-0.5 text-xs text-fg-subtle">Automation · runs on new note</p>
        </div>
        <MockSwitch on />
      </div>

      <div className="mt-2.5 rounded-md border border-line bg-mist-50/70 p-2.5">
        <p className="text-xs font-semibold tracking-[0.08em] text-fg-subtle uppercase">When</p>
        <div className="mt-1.5 flex items-center gap-1.5 rounded border border-line bg-white px-2 py-1.5 text-xs text-ink-700">
          <Sparkles className="size-3 text-brand-600" />A note is tagged
          <span className="rounded bg-brand-50 px-1 text-xs font-medium text-brand-800">
            #meeting
          </span>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-1.5 text-xs text-fg-subtle">
        <ArrowRight className="size-3" />
        Then
      </div>

      <div className="mt-1.5 flex flex-col gap-1.5">
        {[
          { text: 'Create tasks from action items', meta: '3 created' },
          { text: 'Assign to the note owner', meta: 'Auto' },
        ].map((step) => (
          <div
            key={step.text}
            className="flex items-center gap-1.5 rounded border border-line bg-white px-2 py-1.5"
          >
            <Check className="size-3 text-brand-600" />
            <span className="truncate text-xs text-ink-700">{step.text}</span>
            <span className="ml-auto shrink-0 rounded bg-mist-100 px-1 text-xs text-ink-500">
              {step.meta}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-auto pt-2 text-xs text-fg-subtle">Last run 12m ago · reversible</p>
    </CropFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Project management                                                       */
/* -------------------------------------------------------------------------- */

const board = [
  {
    title: 'Backlog',
    count: 3,
    cards: [
      { title: 'Rewrite onboarding copy', tag: 'Content', tone: 'bg-halo-200 text-ink-700' },
      { title: 'Audit automation rules', tag: 'Ops', tone: 'bg-mist-200 text-ink-600' },
    ],
  },
  {
    title: 'In progress',
    count: 2,
    cards: [
      { title: 'Pricing page v2', tag: 'Design', tone: 'bg-brand-100 text-brand-800' },
      { title: 'Homepage narrative', tag: 'Copy', tone: 'bg-mist-200 text-ink-600' },
    ],
  },
  {
    title: 'Review',
    count: 1,
    cards: [{ title: 'Q4 scope', tag: 'Client', tone: 'bg-halo-200 text-ink-700' }],
  },
];

export function BoardCrop({ className }: CropProps) {
  return (
    <CropFrame label="Projects / Board" className={className}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-ink-900">Website refresh</p>
        <span className="rounded bg-mist-100 px-1.5 py-0.5 text-xs text-ink-500">12 tasks</span>
      </div>

      <div className="mt-2.5 grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3">
        {board.map((column, columnIndex) => (
          <div
            key={column.title}
            className={
              columnIndex === 2 ? 'hidden flex-col gap-1.5 sm:flex' : 'flex flex-col gap-1.5'
            }
          >
            <div className="flex items-center gap-1">
              <span className="truncate text-xs font-medium text-ink-600">{column.title}</span>
              <span className="text-xs text-fg-subtle">{column.count}</span>
            </div>

            {column.cards.map((card, cardIndex) => (
              <div
                key={card.title}
                className={
                  cardIndex === 1
                    ? 'hidden rounded border border-line bg-white p-1.5 shadow-e1 sm:block'
                    : 'rounded border border-line bg-white p-1.5 shadow-e1'
                }
              >
                <p className="text-xs leading-snug font-medium text-ink-800">{card.title}</p>
                <div className="mt-1.5 flex items-center justify-between gap-1">
                  <span className={cn('rounded px-1 text-xs', card.tone)}>{card.tag}</span>
                  <MiniAvatar initials={card.tag === 'Design' ? 'AM' : 'JL'} className="size-5" />
                </div>
              </div>
            ))}

            <div className="mt-auto rounded border border-dashed border-mist-300 px-1.5 py-1 text-center text-xs text-fg-subtle">
              +
            </div>
          </div>
        ))}
      </div>
    </CropFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Team collaboration                                                       */
/* -------------------------------------------------------------------------- */

export function CollaborationCrop({ className }: CropProps) {
  return (
    <CropFrame label="Tasks / Detail" className={className}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-ink-900">Finalise pricing brief</p>
          <p className="mt-0.5 text-xs text-fg-subtle">Website refresh · #12</p>
        </div>
        <span className="shrink-0 rounded bg-brand-50 px-1.5 py-0.5 text-xs font-medium text-brand-800">
          In review
        </span>
      </div>

      <div className="mt-2.5 flex items-center gap-1.5">
        <MiniAvatar initials="AM" tone="ink" className="size-5" />
        <MiniAvatar initials="JL" tone="halo" className="size-5" />
        <MiniAvatar initials="RM" tone="mist" className="size-5" />
        <span className="text-xs text-fg-subtle">3 people · due Friday</span>
      </div>

      <div className="mt-2.5 flex flex-1 flex-col gap-2">
        <div className="flex items-start gap-1.5">
          <MiniAvatar initials="JL" tone="halo" className="mt-0.5 size-4 text-xs" />
          <div className="rounded-md rounded-tl-none border border-line bg-mist-50 px-2 py-1.5">
            <p className="text-xs leading-snug text-ink-700">
              <span className="font-medium text-ink-900">Jamie:</span> Can we keep the annual toggle
              on the pricing preview?
            </p>
          </div>
        </div>

        <div className="flex items-start justify-end gap-1.5">
          <div className="rounded-md rounded-tr-none bg-brand-50 px-2 py-1.5">
            <p className="text-xs leading-snug text-ink-700">
              Yes — monthly default, annual shown as a second state.
            </p>
          </div>
          <MiniAvatar initials="AM" tone="ink" className="mt-0.5 size-4 text-xs" />
        </div>

        <div className="flex items-center gap-1.5 text-xs text-fg-subtle">
          <Check className="size-3 text-brand-600" />
          Decision recorded on the task
        </div>
      </div>

      <div className="mt-2 flex items-center gap-1.5 rounded border border-line bg-white px-2 py-1.5">
        <MessageSquare className="size-3 text-fg-subtle" />
        <span className="text-xs text-fg-subtle">Write a comment…</span>
      </div>
    </CropFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Business insights                                                        */
/* -------------------------------------------------------------------------- */

const timeByProject = [
  { name: 'Website refresh', value: 72, hours: '21h 40m' },
  { name: 'Q4 launch', value: 54, hours: '16h 10m' },
  { name: 'Client work', value: 38, hours: '11h 30m' },
  { name: 'Internal ops', value: 18, hours: '5h 20m' },
];

export function InsightsCrop({ className }: CropProps) {
  return (
    <CropFrame label="Insights / Time" className={className}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-semibold text-ink-900">Time by project</p>
          <p className="mt-0.5 text-xs text-fg-subtle">Last 30 days · 54h 40m logged</p>
        </div>
        <span className="flex items-center gap-1 rounded border border-line px-1.5 py-0.5 text-xs text-ink-600">
          <Zap className="size-2.5 text-brand-600" />
          34 runs
        </span>
      </div>

      <div className="mt-3 flex flex-col gap-2.5">
        {timeByProject.map((project) => (
          <div key={project.name}>
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="truncate text-ink-700">{project.name}</span>
              <span className="shrink-0 text-fg-subtle">{project.hours}</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-mist-200">
              <div
                className="h-full rounded-full bg-brand-500"
                style={{ width: `${project.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-line pt-2.5">
        <span className="text-xs text-fg-subtle">Focus share</span>
        <span className="text-xs font-medium text-ink-800">61% of tracked time</span>
      </div>
    </CropFrame>
  );
}
