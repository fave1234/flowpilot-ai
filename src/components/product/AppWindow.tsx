import {
  BarChart3,
  Bell,
  Check,
  ChevronDown,
  FolderKanban,
  Inbox,
  Info,
  Plus,
  Search,
  Sparkles,
  Sun,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Static product illustration.
 *
 * Deliberately non-interactive: it is `aria-hidden`, has no focusable controls
 * and is described by the figcaption. This keeps the mockup honest — nothing
 * in it pretends to be a working AI feature.
 */
export function AppWindow({ className }: { className?: string }) {
  return (
    <figure className={cn('m-0', className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none overflow-hidden rounded-2xl border border-line bg-surface shadow-frame select-none"
      >
        <WindowChrome />
        <div className="flex">
          <Sidebar />
          <div className="min-w-0 flex-1">
            <TodayView />
          </div>
          <RightPanel />
        </div>
      </div>
      <figcaption className="mt-4 flex items-start gap-2 text-caption text-fg-subtle">
        <Info aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
        <span>
          Illustrative interface. FlowPilot AI is a fictional product — no live data, integrations
          or AI is connected to this mockup.
        </span>
      </figcaption>
    </figure>
  );
}

function WindowChrome() {
  return (
    <div className="flex h-11 items-center gap-3 border-b border-line bg-mist-50 px-4">
      <div className="flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-mist-400" />
        <span className="size-2 rounded-full bg-mist-300" />
        <span className="size-2 rounded-full bg-mist-300" />
      </div>

      <div className="mx-auto hidden h-7 w-full max-w-72 items-center gap-2 rounded-md border border-line bg-surface px-2.5 text-[11px] text-fg-subtle sm:flex">
        <Search className="size-3.5" />
        <span>Search or jump to…</span>
        <kbd className="ml-auto rounded border border-line bg-mist-50 px-1 font-sans text-[10px] text-fg-subtle">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:ml-0">
        <Bell className="size-3.5 text-fg-subtle" />
        <span className="grid size-6 place-items-center rounded-full bg-ink-900 text-[10px] font-semibold text-white">
          AM
        </span>
      </div>
    </div>
  );
}

const sidebarItems = [
  { label: 'Today', icon: Sun, active: true },
  { label: 'Inbox', icon: Inbox, badge: '3' },
  { label: 'Projects', icon: FolderKanban },
  { label: 'Automations', icon: Zap },
  { label: 'Reports', icon: BarChart3 },
];

function Sidebar() {
  return (
    <div className="hidden w-48 shrink-0 flex-col border-r border-line bg-mist-50/70 p-3 md:flex lg:w-52">
      <div className="flex items-center gap-2 rounded-md px-1.5 py-1.5">
        <span className="grid size-5 place-items-center rounded-[5px] bg-ink-900 text-[9px] font-bold text-white">
          N
        </span>
        <span className="text-[12px] font-semibold text-ink-800">Studio North</span>
        <ChevronDown className="ml-auto size-3 text-fg-subtle" />
      </div>

      <div className="mt-3 flex flex-col gap-0.5">
        {sidebarItems.map(({ label, icon: Icon, active, badge }) => (
          <div
            key={label}
            className={cn(
              'flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px]',
              active ? 'bg-surface font-medium text-ink-900 shadow-e1' : 'text-ink-500',
            )}
          >
            <Icon className={cn('size-3.5', active ? 'text-brand-600' : 'text-fg-subtle')} />
            {label}
            {badge && (
              <span className="ml-auto rounded bg-brand-100 px-1 text-[10px] font-semibold text-brand-800">
                {badge}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-md border border-brand-100 bg-white p-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-brand-500" />
          <span className="text-[10px] font-semibold tracking-wide text-brand-800 uppercase">
            Focus block
          </span>
        </div>
        <p className="mt-1.5 text-[11px] text-ink-600">09:30 – 11:00</p>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-mist-200">
          <div className="h-full w-2/5 rounded-full bg-brand-500" />
        </div>
      </div>

      <div className="mt-auto pt-4">
        <div className="flex items-center gap-2 rounded-md border border-line bg-surface px-2 py-1.5">
          <span className="grid size-5 place-items-center rounded-full bg-halo-200 text-[9px] font-semibold text-ink-700">
            JL
          </span>
          <span className="text-[11px] text-ink-600">Jamie Lee</span>
        </div>
      </div>
    </div>
  );
}

type Task = {
  title: string;
  project: string;
  due: string;
  done?: boolean;
  priority?: 'high' | 'normal';
};

const tasks: Task[] = [
  { title: 'Finalise pricing brief v2', project: 'Website', due: '10:30', priority: 'high' },
  { title: 'Draft homepage narrative', project: 'Brand', due: 'Today' },
  { title: 'Review automation rules', project: 'Ops', due: 'Tomorrow' },
  { title: 'Send Q4 planning notes', project: 'Client', due: 'Done', done: true },
];

function TodayView() {
  return (
    <div className="p-4 sm:p-5 lg:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-[17px] leading-tight font-bold text-ink-900">Today</h3>
          <p className="mt-0.5 text-[11px] text-fg-subtle">Tuesday, 14 October · 4 tasks</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="hidden items-center gap-1 rounded-md border border-line bg-surface px-2 py-1 text-[11px] font-medium text-ink-600 sm:flex">
            <Plus className="size-3" />
            New
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-line bg-surface">
            <span className="flex gap-0.5">
              <span className="size-0.5 rounded-full bg-ink-500" />
              <span className="size-0.5 rounded-full bg-ink-500" />
              <span className="size-0.5 rounded-full bg-ink-500" />
            </span>
          </span>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-brand-100 bg-brand-50/70 p-3">
        <div className="flex items-start gap-2.5">
          <span className="grid size-6 shrink-0 place-items-center rounded-md bg-brand-600 text-white">
            <Sparkles className="size-3.5" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11.5px] font-semibold text-ink-900">Suggested focus</span>
              <span className="rounded bg-white/80 px-1.5 py-px text-[9.5px] font-medium text-brand-800">
                Illustrative
              </span>
            </div>
            <p className="mt-1 text-[11.5px] leading-relaxed text-ink-600">
              Start with the pricing brief — it unblocks the homepage copy and two reviews.
            </p>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="rounded bg-ink-900 px-2 py-1 text-[10.5px] font-medium text-white">
                Accept
              </span>
              <span className="rounded px-2 py-1 text-[10.5px] font-medium text-ink-500">
                Dismiss
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-[0.1em] text-fg-subtle uppercase">
          Up next
        </span>
        <span className="text-[10.5px] text-fg-subtle">3h 20m planned</span>
      </div>

      <ul className="mt-1 divide-y divide-line/80">
        {tasks.map((task) => (
          <li key={task.title} className="flex items-center gap-2.5 py-2.5">
            <span
              className={cn(
                'grid size-4 shrink-0 place-items-center rounded-[4px] border',
                task.done ? 'border-ink-800 bg-ink-800 text-white' : 'border-mist-400 bg-surface',
              )}
            >
              {task.done && <Check className="size-2.5" strokeWidth={3} />}
            </span>
            <span
              className={cn(
                'truncate text-[11.5px]',
                task.done ? 'text-fg-subtle line-through' : 'font-medium text-ink-800',
              )}
            >
              {task.title}
            </span>
            <span className="hidden shrink-0 rounded bg-mist-200/80 px-1.5 py-px text-[9.5px] font-medium text-ink-500 sm:inline">
              {task.project}
            </span>
            <span className="ml-auto flex shrink-0 items-center gap-1.5 text-[10.5px] text-fg-subtle">
              {task.priority === 'high' && <span className="size-1.5 rounded-full bg-brand-500" />}
              {task.due}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const automations = [
  { title: 'Meeting notes → tasks', meta: 'Runs on new note', on: true },
  { title: 'Weekly plan → calendar', meta: 'Every Monday, 08:00', on: true },
  { title: 'Inbox triage', meta: 'Draft only', on: false },
];

function RightPanel() {
  return (
    <div className="hidden w-60 shrink-0 flex-col gap-5 border-l border-line bg-mist-50/60 p-3.5 2xl:flex">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold tracking-[0.1em] text-fg-subtle uppercase">
            Automations
          </span>
          <span className="text-[10px] text-fg-subtle">2 active</span>
        </div>

        <div className="mt-2.5 flex flex-col gap-2">
          {automations.map((rule) => (
            <div key={rule.title} className="rounded-md border border-line bg-surface p-2.5">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[11px] leading-snug font-medium text-ink-800">{rule.title}</p>
                <span
                  className={cn(
                    'relative mt-0.5 h-3.5 w-6 shrink-0 rounded-full transition-colors',
                    rule.on ? 'bg-brand-600' : 'bg-mist-300',
                  )}
                >
                  <span
                    className={cn(
                      'absolute top-0.5 size-2.5 rounded-full bg-white shadow-sm',
                      rule.on ? 'right-0.5' : 'left-0.5',
                    )}
                  />
                </span>
              </div>
              <p className="mt-1 text-[10px] text-fg-subtle">{rule.meta}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <span className="text-[10px] font-semibold tracking-[0.1em] text-fg-subtle uppercase">
          Focus time
        </span>
        <div className="mt-3 flex h-20 items-end gap-1.5">
          {[26, 44, 22, 58, 38].map((height, index) => (
            <div
              key={index}
              className="flex h-full flex-1 flex-col items-center justify-end gap-1.5"
            >
              <div
                className={cn('w-full rounded-sm', index === 3 ? 'bg-brand-500' : 'bg-halo-300')}
                style={{ height }}
              />
              <span className="text-[9px] text-fg-subtle">{['M', 'T', 'W', 'T', 'F'][index]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
