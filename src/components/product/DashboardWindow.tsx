import { useState } from 'react';
import {
  BarChart3,
  Bell,
  Calendar,
  CheckSquare,
  ChevronDown,
  Inbox,
  Plus,
  Search,
  Sun,
  Users,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useTabKeyboardNav } from '@/lib/useTabKeyboardNav';
import {
  DashboardViewContent,
  dashboardViews,
  type DashboardViewKey,
} from '@/components/product/DashboardViews';
import {
  FrameSurface,
  IllustrativeCaption,
  MiniAvatar,
  WindowDots,
} from '@/components/product/Frame';

/**
 * Hero product frame — the "command centre" view.
 *
 * The tab strip is the one genuinely interactive part: four sample views share
 * one skeleton so switching never shifts the layout. Everything else is still
 * an illustration of a fictional product — sample data, captioned below.
 */
export function DashboardWindow({
  className,
  glass = false,
}: {
  className?: string;
  /** Frosted bezel for the hero, where the frame sits over the ambient field. */
  glass?: boolean;
}) {
  const [view, setView] = useState<DashboardViewKey>('overview');
  const activeIndex = dashboardViews.findIndex((tab) => tab.key === view);
  const { setTabRef, onKeyDown } = useTabKeyboardNav(dashboardViews.length, activeIndex, (index) =>
    setView(dashboardViews[index].key),
  );

  const frame = (
    <FrameSurface tone="dark" interactive glass={glass}>
      <TopBar viewLabel={dashboardViews[activeIndex]?.label ?? 'Overview'} />

      <div className="flex items-center gap-2 border-b border-line bg-mist-50/80 px-2.5 py-2 backdrop-blur-xl sm:px-4">
        <div
          role="tablist"
          aria-label="Dashboard views"
          className="scrollbar-none flex min-w-0 items-center gap-0.5 overflow-x-auto rounded-lg border border-line bg-white/70 p-0.5 shadow-e1"
        >
          {dashboardViews.map((tab, index) => {
            const isActive = tab.key === view;

            return (
              <button
                key={tab.key}
                ref={setTabRef(index)}
                type="button"
                role="tab"
                id={`dashboard-tab-${tab.key}`}
                aria-selected={isActive}
                aria-controls="dashboard-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setView(tab.key)}
                onKeyDown={onKeyDown}
                className={cn(
                  'inline-flex h-7 shrink-0 cursor-pointer items-center gap-1.5 rounded-[7px] px-2 text-xs font-medium transition-[background-color,color,box-shadow] duration-[var(--duration-fast)] focus-visible:outline-offset-1',
                  isActive
                    ? 'bg-white text-ink-900 shadow-e1'
                    : 'text-fg-subtle hover:bg-white/70 hover:text-ink-700',
                )}
              >
                <tab.icon
                  aria-hidden="true"
                  className={cn(
                    'hidden size-3.5 sm:block',
                    isActive ? 'text-brand-600' : 'text-fg-subtle',
                  )}
                />
                {tab.label}
              </button>
            );
          })}
        </div>

        <span className="ml-auto hidden shrink-0 items-center gap-1.5 text-xs text-fg-subtle md:flex">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-500" />
          Sample workspace
        </span>
      </div>

      <div className="flex">
        <Sidebar activeView={view} />
        <div className="min-w-0 flex-1 bg-mist-50/95 backdrop-blur-xl">
          <div
            key={view}
            id="dashboard-panel"
            role="tabpanel"
            aria-labelledby={`dashboard-tab-${view}`}
            tabIndex={0}
            className="animate-view-in focus-visible:outline-offset-[-2px]"
          >
            <DashboardViewContent view={view} />
          </div>
        </div>
      </div>
    </FrameSurface>
  );

  return (
    <figure className={cn('m-0', className)}>
      {glass ? (
        <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.035] p-2 shadow-[0_50px_120px_-50px_rgb(0_0_0/0.9)] backdrop-blur-xl">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 -top-px h-px bg-gradient-to-r from-transparent via-brand-400/70 to-transparent"
          />
          {frame}
        </div>
      ) : (
        frame
      )}

      <IllustrativeCaption tone="dark" className="mt-4">
        The tabs switch between four sample views.
      </IllustrativeCaption>
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

function TopBar({ viewLabel }: { viewLabel: string }) {
  return (
    <div
      aria-hidden="true"
      className="flex h-12 items-center gap-2.5 border-b border-line bg-white/95 px-3 backdrop-blur-xl sm:px-4"
    >
      <WindowDots />
      <span className="hidden h-4 w-px bg-line sm:block" />
      <div className="flex items-center gap-2">
        <MiniMark />
        <span className="text-xs font-semibold text-ink-900">FlowPilot</span>
        <span className="hidden text-xs text-fg-subtle sm:inline">/ {viewLabel}</span>
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

type NavItem = {
  label: string;
  icon: LucideIcon;
  badge?: string;
  view?: DashboardViewKey;
};

const workspaceNav: NavItem[] = [
  { label: 'Home', icon: Sun, view: 'overview' },
  { label: 'My tasks', icon: CheckSquare, badge: '8' },
  { label: 'Inbox', icon: Inbox, badge: '3' },
  { label: 'Calendar', icon: Calendar },
  { label: 'Insights', icon: BarChart3, view: 'analytics' },
  { label: 'Team', icon: Users, view: 'team' },
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

function Sidebar({ activeView }: { activeView: DashboardViewKey }) {
  return (
    <div
      aria-hidden="true"
      className="hidden w-[216px] shrink-0 flex-col border-r border-line bg-white/90 p-2.5 backdrop-blur-xl lg:flex"
    >
      <nav className="flex flex-col">
        <NavLabel>Workspace</NavLabel>
        {workspaceNav.map(({ label, icon: Icon, badge, view }) => {
          const active = view === activeView;

          return (
            <div
              key={label}
              className={cn(
                'flex items-center gap-2 rounded-md px-2 py-[7px] text-xs transition-colors duration-[var(--duration-base)]',
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
              {active && <span className="ml-auto size-1.5 rounded-full bg-brand-500" />}
            </div>
          );
        })}

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
        <div
          className={cn(
            'flex items-center gap-2 rounded-md px-2 py-[7px] text-xs transition-colors duration-[var(--duration-base)]',
            activeView === 'automations' ? 'bg-mist-100 font-medium text-ink-900' : 'text-ink-500',
          )}
        >
          <Zap
            className={cn(
              'size-3.5',
              activeView === 'automations' ? 'text-brand-600' : 'text-fg-subtle',
            )}
          />
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
