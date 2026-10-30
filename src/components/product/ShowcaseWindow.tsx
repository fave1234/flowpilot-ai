import { BarChart3, ChevronDown, FolderKanban, Home, Inbox, Settings, Share2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import {
  FrameSurface,
  IllustrativeCaption,
  MiniAvatar,
  WindowDots,
} from '@/components/product/Frame';

/**
 * Showcase product frame — the analytics view.
 * Deliberately a different surface from the hero frame: icon rail, tabs, line chart, table.
 */
export function ShowcaseWindow({ className }: { className?: string }) {
  return (
    <figure className={cn('m-0', className)}>
      <FrameSurface tone="dark">
        <TopBar />
        <div className="flex">
          <Rail />
          <div className="min-w-0 flex-1 bg-white">
            <Content />
          </div>
        </div>
      </FrameSurface>
      <IllustrativeCaption tone="dark" className="mt-4" />
    </figure>
  );
}

const tabs = ['Overview', 'Projects', 'Automations', 'Insights'];

function TopBar() {
  return (
    <div className="flex h-12 items-center gap-2.5 border-b border-line bg-white px-3 sm:px-4">
      <WindowDots />
      <span className="hidden h-4 w-px bg-line sm:block" />
      <div className="flex items-center gap-2">
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
        <span className="text-xs font-semibold text-ink-900">FlowPilot</span>
        <span className="hidden text-xs text-fg-subtle sm:inline">/ Insights</span>
      </div>

      <div className="mx-auto hidden items-center gap-1 lg:flex">
        {tabs.map((tab) => (
          <span
            key={tab}
            className={cn(
              'rounded-md px-2.5 py-1 text-xs',
              tab === 'Insights' ? 'bg-mist-100 font-medium text-ink-900' : 'text-fg-subtle',
            )}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-2 sm:ml-0">
        <span className="hidden h-7 items-center gap-1.5 rounded-md border border-line px-2.5 text-xs text-ink-600 sm:flex">
          Last 90 days
          <ChevronDown className="size-3 text-fg-subtle" />
        </span>
        <span className="grid size-7 place-items-center rounded-md border border-line">
          <Share2 className="size-3.5 text-ink-500" />
        </span>
        <div className="hidden items-center -space-x-1.5 sm:flex">
          <MiniAvatar initials="AM" tone="ink" className="ring-2 ring-white" />
          <MiniAvatar initials="JL" tone="halo" className="ring-2 ring-white" />
        </div>
      </div>
    </div>
  );
}

const railItems = [
  { icon: Home, active: false },
  { icon: FolderKanban, active: false },
  { icon: Inbox, active: false },
  { icon: BarChart3, active: true },
];

function Rail() {
  return (
    <div className="hidden w-12 shrink-0 flex-col items-center gap-1 border-r border-line bg-white py-3 md:flex">
      {railItems.map(({ icon: Icon, active }, index) => (
        <span
          key={index}
          className={cn(
            'grid size-8 place-items-center rounded-md',
            active ? 'bg-brand-50 text-brand-700' : 'text-fg-subtle',
          )}
        >
          <Icon className="size-4" />
        </span>
      ))}
      <span className="mt-auto grid size-8 place-items-center rounded-md text-fg-subtle">
        <Settings className="size-4" />
      </span>
    </div>
  );
}

const stats = [
  { label: 'Planned work completed', value: '68%', delta: '+6 pts vs. last quarter' },
  { label: 'Focus hours logged', value: '312', delta: '+24h vs. last quarter' },
  { label: 'Automations run', value: '148', delta: '+31 vs. last quarter' },
];

const planned = [42, 46, 44, 52, 56, 54, 62, 66, 63, 70, 74, 78];
const completed = [38, 43, 41, 48, 53, 51, 59, 62, 58, 66, 71, 76];

const chartWidth = 640;
const chartHeight = 140;

function pointsFor(values: number[]) {
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * chartWidth;
      const y = chartHeight - (value / 100) * chartHeight;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

function Content() {
  return (
    <div className="p-3.5 sm:p-5 lg:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-[15px] leading-tight font-bold text-ink-900">
            Insights
          </h3>
          <p className="mt-1 text-xs text-fg-subtle">Where the team’s time went · 1 Jul – 30 Sep</p>
        </div>
        <div className="flex items-center gap-1 rounded-md border border-line bg-mist-50 p-0.5">
          {['Week', 'Month', 'Quarter'].map((range) => (
            <span
              key={range}
              className={cn(
                'rounded px-2 py-1 text-xs',
                range === 'Quarter'
                  ? 'bg-white font-medium text-ink-900 shadow-e1'
                  : 'text-fg-subtle',
              )}
            >
              {range}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-line bg-mist-50/60 p-2.5">
            <p className="text-xs text-fg-subtle">{stat.label}</p>
            <p className="mt-1 font-display text-lg leading-none font-bold text-ink-900">
              {stat.value}
            </p>
            <p className="mt-1.5 truncate text-xs text-brand-700">{stat.delta}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-lg border border-line bg-white p-3 shadow-e1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold text-ink-900">Planned vs. completed</p>
            <p className="mt-0.5 text-xs text-fg-subtle">12 weeks · percentage of committed work</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-fg-subtle">
              <span className="h-0.5 w-3 rounded-full bg-brand-500" />
              Completed
            </span>
            <span className="flex items-center gap-1.5 text-xs text-fg-subtle">
              <span className="h-0.5 w-3 rounded-full bg-mist-400" />
              Planned
            </span>
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <div className="flex h-28 w-6 shrink-0 flex-col justify-between text-right text-xs text-fg-subtle sm:h-32">
            {[100, 75, 50, 25, 0].map((tick) => (
              <span key={tick}>{tick}</span>
            ))}
          </div>

          <div className="min-w-0 flex-1">
            <div className="relative h-28 sm:h-32">
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
                {[0, 1, 2, 3, 4].map((line) => (
                  <span key={line} className="h-px w-full bg-mist-200" />
                ))}
              </div>

              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                preserveAspectRatio="none"
                className="relative h-full w-full"
                aria-hidden="true"
              >
                <polygon
                  points={`0,${chartHeight} ${pointsFor(completed)} ${chartWidth},${chartHeight}`}
                  fill="rgb(120 101 245 / 0.08)"
                />
                <polyline
                  points={pointsFor(planned)}
                  fill="none"
                  stroke="#A9AEC2"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  vectorEffect="non-scaling-stroke"
                />
                <polyline
                  points={pointsFor(completed)}
                  fill="none"
                  stroke="#6A56EE"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
                <circle
                  cx={chartWidth}
                  cy={chartHeight - (76 / 100) * chartHeight}
                  r="3"
                  fill="#6A56EE"
                />
              </svg>
            </div>

            <div className="mt-1.5 flex justify-between text-xs text-fg-subtle">
              {['W1', 'W3', 'W5', 'W7', 'W9', 'W12'].map((week) => (
                <span key={week}>{week}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ProjectsTable />
    </div>
  );
}

const projects = [
  { name: 'Website refresh', owner: 'AM', progress: 72, focus: '46h' },
  { name: 'Q4 launch', owner: 'JL', progress: 48, focus: '32h' },
  { name: 'Client work', owner: 'RM', progress: 64, focus: '28h' },
];

function ProjectsTable() {
  return (
    <div className="mt-3 overflow-hidden rounded-lg border border-line bg-white shadow-e1">
      <div className="flex items-center justify-between border-b border-line px-3 py-2">
        <p className="text-xs font-semibold text-ink-900">Projects this quarter</p>
        <span className="text-xs text-fg-subtle">3 active</span>
      </div>

      <div className="grid grid-cols-[1.4fr_0.5fr_1fr] gap-2 px-3 py-1.5 text-xs font-medium tracking-[0.06em] text-fg-subtle uppercase sm:grid-cols-[1.6fr_0.7fr_1.2fr_0.5fr]">
        <span>Project</span>
        <span>Owner</span>
        <span>Progress</span>
        <span className="hidden text-right sm:block">Focus</span>
      </div>

      {projects.map((project) => (
        <div
          key={project.name}
          className="grid grid-cols-[1.4fr_0.5fr_1fr] items-center gap-2 border-t border-line/70 px-3 py-2 sm:grid-cols-[1.6fr_0.7fr_1.2fr_0.5fr]"
        >
          <span className="truncate text-xs font-medium text-ink-800">{project.name}</span>
          <MiniAvatar initials={project.owner} className="size-5" />
          <span className="flex items-center gap-2">
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-mist-200">
              <span
                className="block h-full rounded-full bg-brand-500"
                style={{ width: `${project.progress}%` }}
              />
            </span>
            <span className="w-6 shrink-0 text-right text-xs text-fg-subtle tabular-nums">
              {project.progress}%
            </span>
          </span>
          <span className="hidden text-right text-xs text-fg-subtle sm:block">{project.focus}</span>
        </div>
      ))}
    </div>
  );
}
