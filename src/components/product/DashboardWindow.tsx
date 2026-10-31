import { useState } from 'react';
import { AutomationCrop, CollaborationCrop, InsightsCrop } from '@/components/product/FeatureCrops';
import {
  Bell,
  Calendar,
  CheckSquare,
  ChevronDown,
  Clock3,
  FolderKanban,
  Inbox,
  Plus,
  Search,
  Sun,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import {
  FrameSurface,
  IllustrativeCaption,
  MiniAvatar,
  WindowDots,
} from '@/components/product/Frame';

const views = ['Overview', 'Automations', 'Analytics', 'Team'] as const;
type DashboardView = (typeof views)[number];

/** An interactive view selector around intentionally illustrative product data. */
export function DashboardWindow({ className }: { className?: string }) {
  const [view, setView] = useState<DashboardView>('Overview');
  const Preview =
    view === 'Automations'
      ? AutomationCrop
      : view === 'Analytics'
        ? InsightsCrop
        : CollaborationCrop;
  const details = {
    Automations: {
      title: 'Workflows that work for you',
      subtitle: 'Your repeatable work, on autopilot',
      stats: [
        ['Active workflows', '6'],
        ['Runs this month', '34'],
        ['Time saved', '3h'],
      ],
    },
    Analytics: {
      title: 'A clearer picture of your work',
      subtitle: 'A little perspective goes a long way',
      stats: [
        ['Focus time', '18.5h'],
        ['Completed tasks', '42'],
        ['Projects on track', '12'],
      ],
    },
    Team: {
      title: 'Better work, together',
      subtitle: 'Everything your team needs in one place',
      stats: [
        ['Team members', '8'],
        ['Active projects', '12'],
        ['Updates this week', '24'],
      ],
    },
  } as const;

  return (
    <figure className={cn('relative m-0', className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-12 -top-24 bottom-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(120,101,245,0.28),transparent_65%)] blur-3xl"
      />
      <div className="relative rounded-[20px] border border-white/10 bg-white/[0.06] p-1.5 shadow-[0_30px_100px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:p-2">
        <div
          className="flex items-center gap-1 overflow-x-auto px-2 pb-2 pt-1 scroll-area"
          role="group"
          aria-label="Dashboard preview views"
        >
          {views.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={view === item}
              onClick={() => setView(item)}
              className={cn(
                'rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors focus-visible:outline-white',
                view === item
                  ? 'bg-white/15 text-white'
                  : 'text-mist-400 hover:bg-white/10 hover:text-white',
              )}
            >
              {item}
            </button>
          ))}
          <span className="ml-auto hidden shrink-0 pr-2 text-xs text-mist-400 sm:block">
            Explore the workspace <span aria-hidden="true">↗</span>
          </span>
        </div>
        <FrameSurface tone="dark">
          <TopBar />
          <div className="flex">
            <Sidebar />
            <div className="min-w-0 flex-1 bg-mist-50/60">
              <div key={view} className="preview-enter">
                {view === 'Overview' ? (
                  <MainPanel />
                ) : (
                  <div className="min-h-[400px] p-3.5 sm:p-5 lg:p-6">
                    <h3 className="font-display text-[15px] font-bold text-ink-900">
                      {details[view].title}
                    </h3>
                    <p className="mt-1 text-xs text-fg-subtle">{details[view].subtitle}</p>
                    <div className="my-4 grid grid-cols-3 gap-2.5">
                      {details[view].stats.map(([label, value]) => (
                        <div
                          key={label}
                          className="rounded-lg border border-line bg-white p-3 shadow-e1"
                        >
                          <p className="text-xs text-fg-subtle">{label}</p>
                          <p className="mt-2 font-display text-lg font-bold text-ink-900">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                    <Preview />
                  </div>
                )}
              </div>
            </div>
          </div>
        </FrameSurface>
      </div>
      <IllustrativeCaption tone="dark" className="relative mt-4" />
    </figure>
  );
}

/* -------------------------------------------------------------------------- */
/* Chrome                                                                      */
/* -------------------------------------------------------------------------- */

function MiniMark() {
  return (
    <span className="grid size-5 place-items-center rounded-[6px] bg-ink-900">
      <svg viewBox="0 0 32 32" className="size-3.5" fill="none" aria-hidden="true">
        <path
          d="M6.5 24 16 7l9.5 17"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M11.8 18h8.4" stroke="#7865F5" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function TopBar() {
  return (
    <div className="flex h-12 items-center gap-2.5 border-b border-line bg-white px-3 sm:px-4">
      <WindowDots />
      <span className="hidden h-4 w-px bg-line sm:block" />
      <div className="flex items-center gap-2">
        <MiniMark />
        <span className="text-xs font-semibold text-ink-900">FlowPilot</span>
      </div>

      <span className="hidden items-center gap-1.5 rounded-md border border-line px-2 py-1 text-xs text-ink-600 sm:flex">
        Studio North
        <ChevronDown className="size-3 text-fg-subtle" />
      </span>

      <div className="mx-auto hidden h-7 w-full max-w-64 items-center gap-2 rounded-md bg-mist-100 px-2.5 text-xs text-fg-subtle md:flex">
        <Search className="size-3.5" />
        <span className="truncate">Search projects, tasks, people</span>
        <kbd className="ml-auto rounded border border-line bg-white px-1 text-xs">⌘K</kbd>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:ml-0">
        <span className="inline-flex h-7 items-center gap-1 rounded-md bg-brand-600 px-2.5 text-xs font-medium text-white">
          <Plus className="size-3" />
          New
        </span>
        <span className="grid size-7 place-items-center rounded-md border border-line">
          <Bell className="size-3.5 text-ink-500" />
        </span>
        <MiniAvatar initials="AM" tone="ink" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Sidebar                                                                     */
/* -------------------------------------------------------------------------- */

const workspaceNav = [
  { label: 'Home', icon: Sun, active: true },
  { label: 'My tasks', icon: CheckSquare, badge: '8' },
  { label: 'Inbox', icon: Inbox, badge: '3' },
  { label: 'Calendar', icon: Calendar },
];

const projectNav = [
  { label: 'Website refresh', dot: 'bg-brand-500' },
  { label: 'Q4 launch', dot: 'bg-halo-400' },
  { label: 'Client work', dot: 'bg-mist-400' },
];

function NavLabel({ children }: { children: string }) {
  return (
    <p className="px-2 pt-3 pb-1.5 text-xs font-semibold tracking-[0.08em] text-fg-subtle uppercase">
      {children}
    </p>
  );
}

function Sidebar() {
  return (
    <div className="hidden w-[216px] shrink-0 flex-col border-r border-line bg-white p-2.5 lg:flex">
      <nav className="flex flex-col">
        <NavLabel>Workspace</NavLabel>
        {workspaceNav.map(({ label, icon: Icon, active, badge }) => (
          <div
            key={label}
            className={cn(
              'flex items-center gap-2 rounded-md px-2 py-[7px] text-xs',
              active ? 'bg-mist-100 font-medium text-ink-900' : 'text-ink-500',
            )}
          >
            <Icon className={cn('size-3.5', active ? 'text-brand-600' : 'text-fg-subtle')} />
            <span className="truncate">{label}</span>
            {badge && (
              <span className="ml-auto rounded bg-mist-200 px-1 text-xs font-semibold text-ink-600">
                {badge}
              </span>
            )}
          </div>
        ))}

        <NavLabel>Projects</NavLabel>
        {projectNav.map((project) => (
          <div
            key={project.label}
            className="flex items-center gap-2 rounded-md px-2 py-[7px] text-xs text-ink-500"
          >
            <span className={cn('size-1.5 rounded-full', project.dot)} />
            <span className="truncate">{project.label}</span>
          </div>
        ))}

        <NavLabel>Automate</NavLabel>
        <div className="flex items-center gap-2 rounded-md px-2 py-[7px] text-xs text-ink-500">
          <Zap className="size-3.5 text-fg-subtle" />
          Automations
          <span className="ml-auto text-xs text-fg-subtle">6</span>
        </div>
      </nav>

      <div className="mt-auto pt-4">
        <div className="rounded-md border border-line bg-mist-50 p-2.5">
          <p className="text-xs font-medium text-ink-800">Automation usage</p>
          <p className="mt-0.5 text-xs text-fg-subtle">34 of 50 runs this month</p>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-mist-200">
            <div className="h-full w-[68%] rounded-full bg-brand-500" />
          </div>
        </div>
        <div className="mt-2.5 flex items-center gap-2 rounded-md px-1 py-1.5">
          <MiniAvatar initials="AM" tone="halo" />
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-ink-900">Alex Morgan</p>
            <p className="truncate text-xs text-fg-subtle">Studio North</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main panel                                                                  */
/* -------------------------------------------------------------------------- */

const kpis = [
  { label: 'Active projects', value: '12', meta: '3 due this week', icon: FolderKanban },
  { label: 'Tasks due today', value: '8', meta: '2 high priority', icon: CheckSquare },
  { label: 'Automation runs', value: '34', meta: 'saved 3h this week', icon: Zap },
  { label: 'Focus time', value: '18.5h', meta: 'avg. 3h 42m / day', icon: Clock3 },
];

// Percentage heights for the stacked focus / meeting bars.
const chart = [
  { day: 'Mon', focus: 54, meetings: 18 },
  { day: 'Tue', focus: 66, meetings: 24 },
  { day: 'Wed', focus: 72, meetings: 16 },
  { day: 'Thu', focus: 58, meetings: 26, highlight: true, value: '5h 10m' },
  { day: 'Fri', focus: 62, meetings: 14 },
  { day: 'Sat', focus: 22, meetings: 6 },
  { day: 'Sun', focus: 12, meetings: 0 },
];

const priorities = [
  { title: 'Finalise pricing brief v2', project: 'Website refresh', time: '10:30', high: true },
  { title: 'Review homepage copy', project: 'Website refresh', time: '13:00' },
  { title: 'Send Q4 scope to client', project: 'Client work', time: '16:00' },
];

function MainPanel() {
  return (
    <div className="p-3.5 sm:p-5 lg:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-[15px] leading-tight font-bold text-ink-900">
            Good morning, Alex
          </h3>
          <p className="mt-1 text-xs text-fg-subtle">Tuesday, 14 October · 3 priorities today</p>
        </div>
        <span className="hidden h-7 items-center gap-1.5 rounded-md border border-line bg-white px-2.5 text-xs text-ink-600 sm:flex">
          This week
          <ChevronDown className="size-3 text-fg-subtle" />
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5 md:grid-cols-4">
        {kpis.map(({ label, value, meta, icon: Icon }) => (
          <div key={label} className="rounded-lg border border-line bg-white p-2.5 shadow-e1">
            <div className="flex items-center gap-1.5">
              <Icon className="size-3 text-fg-subtle" />
              <span className="truncate text-xs text-fg-subtle">{label}</span>
            </div>
            <p className="mt-1.5 font-display text-lg leading-none font-bold text-ink-900">
              {value}
            </p>
            <p className="mt-1.5 truncate text-xs text-fg-subtle">{meta}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <ChartCard />
        <PrioritiesCard />
      </div>

      <ActivityStrip />
    </div>
  );
}

function ChartCard() {
  return (
    <div className="rounded-lg border border-line bg-white p-3 shadow-e1">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-ink-900">Focus time</p>
          <p className="mt-0.5 text-xs text-fg-subtle">Last 7 days · 18h 30m</p>
          <p className="mt-1 text-xs font-medium text-ink-700">Thu · 5h 10m focus</p>
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          <span className="flex items-center gap-1.5 text-xs text-fg-subtle">
            <span className="size-1.5 rounded-full bg-brand-500" />
            Focus
          </span>
          <span className="flex items-center gap-1.5 text-xs text-fg-subtle">
            <span className="size-1.5 rounded-full bg-halo-400" />
            Meetings
          </span>
        </div>
      </div>

      <div className="relative mt-4">
        <div className="pointer-events-none absolute inset-x-0 top-0 flex h-[104px] flex-col justify-between">
          {[0, 1, 2, 3].map((line) => (
            <span key={line} className="block h-px w-full bg-mist-200" />
          ))}
        </div>

        <div className="relative flex h-[104px] items-end gap-1.5 sm:gap-2">
          {chart.map((bar) => (
            <div key={bar.day} className="flex h-full flex-1 flex-col justify-end gap-0.5">
              <div
                className={cn(
                  'w-full rounded-t-[3px]',
                  bar.highlight ? 'bg-brand-500' : 'bg-brand-300',
                )}
                style={{ height: `${bar.focus}%` }}
              />
              {bar.meetings > 0 && (
                <div
                  className="w-full rounded-t-[2px] bg-halo-300"
                  style={{ height: `${bar.meetings}%` }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-2 flex gap-1.5 sm:gap-2">
          {chart.map((bar) => (
            <span
              key={bar.day}
              className={cn(
                'flex-1 text-center text-xs',
                bar.highlight ? 'font-semibold text-ink-800' : 'text-fg-subtle',
              )}
            >
              {bar.day.slice(0, 1)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PrioritiesCard() {
  return (
    <div className="rounded-lg border border-line bg-white p-3 shadow-e1">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-ink-900">Today’s priorities</p>
        <span className="text-xs text-fg-subtle">3 of 5</span>
      </div>

      <ul className="mt-2 divide-y divide-line/80">
        {priorities.map((task) => (
          <li key={task.title} className="flex items-start gap-2 py-2">
            <span className="mt-0.5 size-3.5 shrink-0 rounded-[4px] border border-mist-400 bg-white" />
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 truncate text-xs font-medium text-ink-800">
                {task.title}
                {task.high && <span className="size-1.5 shrink-0 rounded-full bg-brand-500" />}
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-fg-subtle">
                <span className="truncate">{task.project}</span>
                <span aria-hidden="true">·</span>
                <span>{task.time}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-1 flex items-center justify-between border-t border-line pt-2.5">
        <span className="text-xs font-medium text-brand-700">Open my tasks</span>
        <span className="text-xs text-fg-subtle">→</span>
      </div>
    </div>
  );
}

const activity = [
  { icon: Zap, title: 'Meeting notes → tasks', meta: '3 tasks created · 12m ago' },
  { icon: Calendar, title: 'Weekly plan → calendar', meta: 'Scheduled · Mon 08:00' },
  { icon: Inbox, title: 'Inbox triage', meta: '6 threads sorted · 1h ago' },
];

function ActivityStrip() {
  return (
    <div className="mt-3 hidden rounded-lg border border-line bg-white px-3 py-2.5 shadow-e1 md:block">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-ink-900">Automation activity</p>
        <span className="text-xs text-fg-subtle">Today</span>
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-3">
        {activity.map(({ icon: Icon, title, meta }) => (
          <div key={title} className="flex items-start gap-2">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded border border-line bg-mist-50">
              <Icon className="size-2.5 text-brand-600" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-ink-800">{title}</p>
              <p className="truncate text-xs text-fg-subtle">{meta}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
