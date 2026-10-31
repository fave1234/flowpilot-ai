import type { ReactNode } from 'react';
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CheckSquare,
  ChevronDown,
  CircleCheck,
  Clock3,
  FolderKanban,
  Inbox,
  ListChecks,
  Sun,
  Timer,
  TrendingUp,
  UserPlus,
  Users,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { MiniAvatar } from '@/components/product/Frame';

/**
 * The four sample views of the hero dashboard.
 *
 * They are deliberately drawn at the same density and share one skeleton
 * (header → four KPI cards → chart + list → footer strip) so switching tabs
 * never makes the hero jump. Still sample data for a fictional product, still
 * captioned as illustrative, still never below 12px.
 */

export const dashboardViews = [
  { key: 'overview', label: 'Overview', icon: Sun },
  { key: 'automations', label: 'Automations', icon: Zap },
  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
  { key: 'team', label: 'Team', icon: Users },
] as const;

export type DashboardViewKey = (typeof dashboardViews)[number]['key'];

/* -------------------------------------------------------------------------- */
/* Shared atoms                                                               */
/* -------------------------------------------------------------------------- */

type Kpi = { label: string; value: string; meta: string; icon: LucideIcon };

function ViewShell({ children }: { children: ReactNode }) {
  return <div className="p-3.5 sm:p-5 lg:p-6">{children}</div>;
}

function ViewHeader({ title, meta, range }: { title: string; meta: string; range: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <h3 className="font-display text-[15px] leading-tight font-bold text-ink-900">{title}</h3>
        <p className="mt-1 text-xs text-fg-subtle">{meta}</p>
      </div>
      <span className="hidden h-7 items-center gap-1.5 rounded-md border border-line bg-white px-2.5 text-xs text-ink-600 sm:flex">
        {range}
        <ChevronDown className="size-3 text-fg-subtle" />
      </span>
    </div>
  );
}

function KpiGrid({ items }: { items: Kpi[] }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-2.5 md:grid-cols-4">
      {items.map(({ label, value, meta, icon: Icon }) => (
        <div
          key={label}
          className="rounded-lg border border-line bg-white p-2.5 shadow-e1 transition-colors duration-[var(--duration-base)]"
        >
          <div className="flex items-center gap-1.5">
            <Icon className="size-3 text-fg-subtle" />
            <span className="truncate text-xs text-fg-subtle">{label}</span>
          </div>
          <p className="mt-1.5 font-display text-lg leading-none font-bold text-ink-900 tabular-nums">
            {value}
          </p>
          <p className="mt-1.5 truncate text-xs text-fg-subtle">{meta}</p>
        </div>
      ))}
    </div>
  );
}

function Panel({
  title,
  meta,
  aside,
  children,
  className,
}: {
  title: string;
  meta?: string;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-lg border border-line bg-white p-3 shadow-e1',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-semibold text-ink-900">{title}</p>
          {meta && <p className="mt-0.5 text-xs text-fg-subtle">{meta}</p>}
        </div>
        {aside}
      </div>
      {children}
    </div>
  );
}

function Legend({ tone, children }: { tone: 'brand' | 'halo' | 'mist'; children: ReactNode }) {
  const tones = {
    brand: 'bg-brand-500',
    halo: 'bg-halo-400',
    mist: 'bg-mist-400',
  } as const;

  return (
    <span className="flex items-center gap-1.5 text-xs text-fg-subtle">
      <span className={cn('size-1.5 rounded-full', tones[tone])} />
      {children}
    </span>
  );
}

function StatusChip({
  tone,
  children,
}: {
  tone: 'success' | 'brand' | 'muted';
  children: ReactNode;
}) {
  const tones = {
    success: 'border-success-200 bg-success-50 text-success-700',
    brand: 'border-brand-100 bg-brand-50 text-brand-800',
    muted: 'border-line bg-mist-100 text-ink-500',
  } as const;

  return (
    <span className={cn('shrink-0 rounded border px-1 text-xs', tones[tone])}>{children}</span>
  );
}

function FooterStrip({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-3 hidden rounded-lg border border-line bg-white px-3 py-2.5 shadow-e1 md:block">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-ink-900">{title}</p>
        <span className="flex items-center gap-1 text-xs text-brand-700">
          View all
          <ArrowUpRight className="size-3" />
        </span>
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-3">{children}</div>
    </div>
  );
}

function StripItem({
  icon: Icon,
  title,
  meta,
  accent = 'brand',
}: {
  icon: LucideIcon;
  title: string;
  meta: string;
  accent?: 'brand' | 'halo';
}) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded border border-line bg-mist-50">
        <Icon className={cn('size-2.5', accent === 'brand' ? 'text-brand-600' : 'text-halo-500')} />
      </span>
      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-ink-800">{title}</p>
        <p className="truncate text-xs text-fg-subtle">{meta}</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 1. Overview                                                                */
/* -------------------------------------------------------------------------- */

const overviewKpis: Kpi[] = [
  { label: 'Active projects', value: '12', meta: '3 due this week', icon: FolderKanban },
  { label: 'Tasks due today', value: '8', meta: '2 high priority', icon: CheckSquare },
  { label: 'Automation runs', value: '34', meta: 'saved 3h this week', icon: Zap },
  { label: 'Focus time', value: '18.5h', meta: 'avg. 3h 42m / day', icon: Clock3 },
];

// Percentage heights for the stacked focus / meeting bars.
const focusWeek = [
  { day: 'Mon', focus: 54, meetings: 18 },
  { day: 'Tue', focus: 66, meetings: 24 },
  { day: 'Wed', focus: 72, meetings: 16 },
  { day: 'Thu', focus: 58, meetings: 26, highlight: true },
  { day: 'Fri', focus: 62, meetings: 14 },
  { day: 'Sat', focus: 22, meetings: 6 },
  { day: 'Sun', focus: 12, meetings: 0 },
];

const priorities = [
  { title: 'Finalise pricing brief v2', project: 'Website refresh', time: '10:30', high: true },
  { title: 'Review homepage copy', project: 'Website refresh', time: '13:00' },
  { title: 'Send Q4 scope to client', project: 'Client work', time: '16:00' },
];

export function OverviewView() {
  return (
    <ViewShell>
      <ViewHeader
        title="Good morning, Alex"
        meta="Tuesday, 14 October · 3 priorities today"
        range="This week"
      />
      <KpiGrid items={overviewKpis} />

      <div className="mt-3 grid gap-3 md:min-h-[236px] md:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <Panel
          title="Focus time"
          meta="Last 7 days · 18h 30m"
          aside={
            <div className="hidden items-center gap-3 sm:flex">
              <Legend tone="brand">Focus</Legend>
              <Legend tone="halo">Meetings</Legend>
            </div>
          }
          className="relative"
        >
          <p className="mt-1 text-xs font-medium text-ink-700">Thu · 5h 10m focus</p>

          <div className="relative mt-auto pt-3">
            <div className="pointer-events-none absolute inset-x-0 top-3 flex h-[104px] flex-col justify-between">
              {[0, 1, 2, 3].map((line) => (
                <span key={line} className="block h-px w-full bg-mist-200" />
              ))}
            </div>

            <div className="relative flex h-[104px] items-end gap-1.5 sm:gap-2" aria-hidden="true">
              {focusWeek.map((bar) => (
                <div key={bar.day} className="flex h-full flex-1 flex-col justify-end gap-0.5">
                  <div
                    className={cn(
                      'w-full rounded-t-[3px] transition-colors duration-[var(--duration-slow)]',
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
          </div>

          <div className="mt-2 flex gap-1.5 sm:gap-2">
            {focusWeek.map((bar) => (
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
        </Panel>

        <Panel
          title="Today’s priorities"
          aside={<span className="text-xs text-fg-subtle">3 of 5</span>}
        >
          <ul className="mt-1 flex flex-1 flex-col justify-between divide-y divide-line/80">
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

          <div className="mt-auto flex items-center justify-between border-t border-line pt-2.5">
            <span className="text-xs font-medium text-brand-700">Open my tasks</span>
            <span className="text-xs text-fg-subtle">→</span>
          </div>
        </Panel>
      </div>

      <FooterStrip title="Automation activity">
        <StripItem icon={Zap} title="Meeting notes → tasks" meta="3 tasks created · 12m ago" />
        <StripItem icon={Clock3} title="Weekly plan → calendar" meta="Scheduled · Mon 08:00" />
        <StripItem icon={Inbox} title="Inbox triage" meta="6 threads sorted · 1h ago" />
      </FooterStrip>
    </ViewShell>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Automations                                                             */
/* -------------------------------------------------------------------------- */

const automationKpis: Kpi[] = [
  { label: 'Active rules', value: '6', meta: '2 paused', icon: Zap },
  { label: 'Runs this month', value: '34', meta: '+9 vs. last month', icon: Activity },
  { label: 'Hours saved', value: '12.4', meta: '≈ 3h per week', icon: Clock3 },
  { label: 'Success rate', value: '98.2%', meta: '1 run skipped', icon: CircleCheck },
];

const runWeek = [
  { day: 'Mon', runs: 62 },
  { day: 'Tue', runs: 84 },
  { day: 'Wed', runs: 48 },
  { day: 'Thu', runs: 92, highlight: true },
  { day: 'Fri', runs: 70 },
  { day: 'Sat', runs: 26 },
  { day: 'Sun', runs: 14 },
];

const recentRuns = [
  { title: 'Meeting notes → tasks', meta: '3 tasks created · 12m ago', status: 'Done' },
  { title: 'Weekly plan → calendar', meta: 'Scheduled Mon 08:00 · 1h ago', status: 'Done' },
  { title: 'Inbox triage', meta: '6 threads sorted · 2h ago', status: 'Reversed' },
];

export function AutomationsView() {
  return (
    <ViewShell>
      <ViewHeader
        title="Automation runs"
        meta="6 active rules · 34 runs this month"
        range="This month"
      />
      <KpiGrid items={automationKpis} />

      <div className="mt-3 grid gap-3 md:min-h-[236px] md:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <Panel
          title="Runs this week"
          meta="34 runs · 2 skipped"
          aside={
            <div className="hidden items-center gap-3 sm:flex">
              <Legend tone="brand">Completed</Legend>
              <Legend tone="mist">Skipped</Legend>
            </div>
          }
        >
          <div className="relative mt-auto pt-4">
            <div className="pointer-events-none absolute inset-x-0 top-4 flex h-[104px] flex-col justify-between">
              {[0, 1, 2, 3].map((line) => (
                <span key={line} className="block h-px w-full bg-mist-200" />
              ))}
            </div>

            <div className="relative flex h-[104px] items-end gap-1.5 sm:gap-2" aria-hidden="true">
              {runWeek.map((bar) => (
                <div key={bar.day} className="flex h-full flex-1 flex-col justify-end">
                  <div
                    className={cn(
                      'w-full rounded-t-[3px] transition-colors duration-[var(--duration-slow)]',
                      bar.highlight ? 'bg-brand-500' : 'bg-brand-200',
                    )}
                    style={{ height: `${bar.runs}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2 flex gap-1.5 sm:gap-2">
            {runWeek.map((bar) => (
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
        </Panel>

        <Panel title="Recent runs" aside={<span className="text-xs text-fg-subtle">Live log</span>}>
          <ul className="mt-1 flex flex-1 flex-col justify-between divide-y divide-line/80">
            {recentRuns.map((run) => (
              <li key={run.title} className="flex items-start gap-2 py-2">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded border border-line bg-mist-50">
                  <Zap className="size-2.5 text-brand-600" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-ink-800">{run.title}</p>
                  <p className="mt-0.5 truncate text-xs text-fg-subtle">{run.meta}</p>
                </div>
                <StatusChip tone={run.status === 'Done' ? 'success' : 'muted'}>
                  {run.status}
                </StatusChip>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex items-center justify-between border-t border-line pt-2.5">
            <span className="text-xs font-medium text-brand-700">Open run history</span>
            <span className="text-xs text-fg-subtle">→</span>
          </div>
        </Panel>
      </div>

      <FooterStrip title="Top rules">
        <StripItem icon={Zap} title="Meeting notes → tasks" meta="14 runs · 3 tasks each" />
        <StripItem icon={Clock3} title="Weekly plan → calendar" meta="8 runs · Mondays" />
        <StripItem icon={Inbox} title="Inbox triage" meta="6 runs · 1 paused" accent="halo" />
      </FooterStrip>
    </ViewShell>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Analytics                                                               */
/* -------------------------------------------------------------------------- */

const analyticsKpis: Kpi[] = [
  { label: 'Work completed', value: '68%', meta: '+6 pts vs. last month', icon: TrendingUp },
  { label: 'Focus hours', value: '312', meta: '+24h vs. last month', icon: Clock3 },
  { label: 'On-time delivery', value: '82%', meta: '+3 pts this quarter', icon: Timer },
  { label: 'Blocked tasks', value: '4', meta: '−2 this week', icon: CheckSquare },
];

const completionTrend = [38, 43, 41, 48, 53, 51, 59, 62, 58, 66, 71, 76];

const chartWidth = 640;
const chartHeight = 120;

function trendPoints(values: number[]) {
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * chartWidth;
      const y = chartHeight - (value / 100) * chartHeight;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

const timeByProject = [
  { name: 'Website refresh', value: 72, hours: '21h 40m' },
  { name: 'Q4 launch', value: 54, hours: '16h 10m' },
  { name: 'Client work', value: 38, hours: '11h 30m' },
  { name: 'Internal ops', value: 18, hours: '5h 20m' },
];

export function AnalyticsView() {
  return (
    <ViewShell>
      <ViewHeader
        title="Analytics"
        meta="Planned vs. completed · last 30 days"
        range="Last 30 days"
      />
      <KpiGrid items={analyticsKpis} />

      <div className="mt-3 grid gap-3 md:min-h-[236px] md:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <Panel
          title="Work completed"
          meta="12 weeks · percentage of committed work"
          aside={
            <div className="hidden items-center gap-3 sm:flex">
              <Legend tone="brand">Completed</Legend>
              <Legend tone="mist">Planned</Legend>
            </div>
          }
        >
          <div className="relative mt-auto pt-5">
            <div className="pointer-events-none absolute inset-x-0 top-5 flex h-[92px] flex-col justify-between">
              {[0, 1, 2, 3].map((line) => (
                <span key={line} className="block h-px w-full bg-mist-200" />
              ))}
            </div>

            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              preserveAspectRatio="none"
              className="relative h-[92px] w-full"
              aria-hidden="true"
            >
              <polygon
                points={`0,${chartHeight} ${trendPoints(
                  completionTrend.map((value) => value - 7),
                )} ${chartWidth},${chartHeight}`}
                fill="rgb(120 101 245 / 0.07)"
              />
              <polyline
                points={trendPoints(completionTrend.map((value) => value - 7))}
                fill="none"
                stroke="var(--color-mist-400)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
              />
              <polyline
                points={trendPoints(completionTrend)}
                fill="none"
                stroke="var(--color-brand-600)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              <circle
                cx={chartWidth}
                cy={chartHeight - (completionTrend[completionTrend.length - 1] / 100) * chartHeight}
                r="3"
                fill="var(--color-brand-600)"
              />
            </svg>

            <div className="mt-1.5 flex justify-between text-xs text-fg-subtle">
              {['W1', 'W3', 'W5', 'W7', 'W9', 'W12'].map((week) => (
                <span key={week}>{week}</span>
              ))}
            </div>
          </div>
        </Panel>

        <Panel
          title="Time by project"
          aside={<span className="text-xs text-fg-subtle">54h 40m</span>}
        >
          <div className="mt-3 flex flex-1 flex-col justify-between">
            {timeByProject.map((project) => (
              <div key={project.name}>
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="truncate text-ink-700">{project.name}</span>
                  <span className="shrink-0 text-fg-subtle">{project.hours}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-mist-200">
                  <div
                    className="h-full rounded-full bg-brand-500 transition-[width] duration-[var(--duration-slow)] ease-[var(--ease-out-quint)]"
                    style={{ width: `${project.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-line pt-2.5">
            <span className="text-xs text-fg-subtle">Focus share</span>
            <span className="text-xs font-medium text-ink-800">61% of tracked time</span>
          </div>
        </Panel>
      </div>

      <FooterStrip title="What changed">
        <StripItem icon={TrendingUp} title="Focus time up 8%" meta="vs. previous 30 days" />
        <StripItem
          icon={CircleCheck}
          title="3 projects on schedule"
          meta="Website refresh leads"
          accent="halo"
        />
        <StripItem icon={Activity} title="1 rule needs review" meta="Inbox triage · 1 paused" />
      </FooterStrip>
    </ViewShell>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Team                                                                    */
/* -------------------------------------------------------------------------- */

const teamKpis: Kpi[] = [
  { label: 'Members', value: '8', meta: '2 invited', icon: Users },
  { label: 'Seats used', value: '8 / 10', meta: '2 available', icon: UserPlus },
  { label: 'Open tasks', value: '34', meta: 'across 3 projects', icon: ListChecks },
  { label: 'Avg. response', value: '1.4h', meta: '−0.3h this week', icon: Timer },
];

const capacity = [
  { name: 'Alex Morgan', role: 'Product', initials: 'AM', tone: 'ink', logged: 18, total: 24 },
  { name: 'Jamie Lee', role: 'Design', initials: 'JL', tone: 'halo', logged: 22, total: 24 },
  { name: 'Ravi Mehta', role: 'Engineering', initials: 'RM', tone: 'mist', logged: 14, total: 24 },
  { name: 'Sofia Rossi', role: 'Content', initials: 'SR', tone: 'brand', logged: 9, total: 20 },
] as const;

const teamActivity = [
  { initials: 'JL', tone: 'halo', text: 'Jamie moved 3 tasks to review', time: '09:42' },
  { initials: 'AM', tone: 'ink', text: 'Alex commented on pricing brief', time: '10:05' },
  { initials: 'RM', tone: 'mist', text: 'Ravi closed Q4 scope checklist', time: '11:18' },
] as const;

export function TeamView() {
  return (
    <ViewShell>
      <ViewHeader title="Studio North" meta="8 members · 3 active projects" range="This week" />
      <KpiGrid items={teamKpis} />

      <div className="mt-3 grid gap-3 md:min-h-[236px] md:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <Panel
          title="Capacity this week"
          meta="63h logged of 92h available"
          aside={<span className="text-xs text-fg-subtle">63% booked</span>}
        >
          <ul className="mt-3 flex flex-1 flex-col justify-between gap-2.5">
            {capacity.map((person) => (
              <li key={person.name} className="flex items-center gap-2">
                <MiniAvatar initials={person.initials} tone={person.tone} className="size-5" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2 text-xs">
                    <span className="truncate font-medium text-ink-800">{person.name}</span>
                    <span className="shrink-0 text-fg-subtle">
                      {person.logged}h / {person.total}h
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-mist-200">
                    <div
                      className={cn(
                        'h-full rounded-full transition-[width] duration-[var(--duration-slow)] ease-[var(--ease-out-quint)]',
                        person.logged >= person.total - 2 ? 'bg-brand-500' : 'bg-brand-300',
                      )}
                      style={{ width: `${(person.logged / person.total) * 100}%` }}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          title="Activity today"
          aside={<span className="text-xs text-fg-subtle">3 events</span>}
        >
          <ul className="mt-1 flex flex-1 flex-col justify-between divide-y divide-line/80">
            {teamActivity.map((event) => (
              <li key={event.text} className="flex items-start gap-2 py-2">
                <MiniAvatar initials={event.initials} tone={event.tone} className="mt-0.5 size-5" />
                <div className="min-w-0">
                  <p className="text-xs leading-snug text-ink-700">{event.text}</p>
                  <p className="mt-0.5 text-xs text-fg-subtle">{event.time}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex items-center justify-between border-t border-line pt-2.5">
            <span className="text-xs font-medium text-brand-700">Invite a teammate</span>
            <span className="text-xs text-fg-subtle">→</span>
          </div>
        </Panel>
      </div>

      <FooterStrip title="On this week">
        <StripItem icon={FolderKanban} title="Website refresh" meta="4 people · due Friday" />
        <StripItem icon={FolderKanban} title="Q4 launch" meta="3 people · on track" accent="halo" />
        <StripItem icon={Users} title="Client work" meta="2 people · shared access" />
      </FooterStrip>
    </ViewShell>
  );
}

/* -------------------------------------------------------------------------- */
/* Registry                                                                   */
/* -------------------------------------------------------------------------- */

export function DashboardViewContent({ view }: { view: DashboardViewKey }) {
  switch (view) {
    case 'automations':
      return <AutomationsView />;
    case 'analytics':
      return <AnalyticsView />;
    case 'team':
      return <TeamView />;
    case 'overview':
    default:
      return <OverviewView />;
  }
}
