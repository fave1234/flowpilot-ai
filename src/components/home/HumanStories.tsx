import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

// Stable Unsplash image URLs; each photograph is presented as editorial imagery,
// not as a photograph of a FlowPilot customer.
const photos = {
  narrative:
    'https://images.unsplash.com/photo-1604933762021-54a5858c9832?auto=format&fit=crop&w=1600&q=85',
  solo: 'https://images.unsplash.com/photo-1765648496210-25b8dbd397c3?auto=format&fit=crop&w=1000&q=85',
  team: 'https://images.unsplash.com/photo-1758691737158-18ffa31c0a46?auto=format&fit=crop&w=1000&q=85',
  business:
    'https://images.unsplash.com/photo-1610473199899-fc0ec6e204bb?auto=format&fit=crop&w=1000&q=85',
  workspace: 'https://images.unsplash.com/photo-1633114128174-2f8aa49759b0?auto=format&w=1800&q=85',
} as const;

const audiences = [
  {
    number: '01',
    title: 'Solo Founders & Freelancers',
    description:
      'For the many-hats days. Keep your ideas, clients and next steps in one calm place.',
    image: photos.solo,
    alt: 'A woman working on a laptop at an outdoor cafe',
    position: 'object-[center_55%]',
  },
  {
    number: '02',
    title: 'Startup Teams',
    description: 'For building together. Give everyone the context to move from idea to done.',
    image: photos.team,
    alt: 'Three colleagues collaborating around a laptop in an office',
    position: 'object-center',
  },
  {
    number: '03',
    title: 'Growing Businesses',
    description: 'For what comes next. Bring the moving pieces into focus as your business grows.',
    image: photos.business,
    alt: 'A business owner working at a desk with a laptop and notes',
    position: 'object-center',
  },
] as const;

export function HumanNarrative() {
  return (
    <Section reveal tone="surface" spacing="lg" aria-labelledby="human-narrative-title">
      <div className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <div className="max-w-lg">
          <Eyebrow>A little more human</Eyebrow>
          <h2 id="human-narrative-title" className="mt-4 text-title-1">
            Built for the way <span className="gradient-text">you actually work.</span>
          </h2>
          <p className="mt-6 text-lead text-fg-muted">
            Good work doesn’t happen in a spreadsheet. It happens in the quiet moments, the big
            ideas, and the space between everything on your list.
          </p>
          <p className="mt-4 text-body text-fg-muted">
            FlowPilot keeps the details moving, so you can spend more of your day doing the work
            that feels like yours.
          </p>
          <div className="mt-8 flex items-center gap-3 text-caption font-medium text-brand-700">
            <span className="grid size-9 place-items-center rounded-full bg-brand-50">
              <Sparkles aria-hidden="true" className="size-4" />
            </span>
            Made for people, not just productivity
          </div>
        </div>

        <figure className="relative m-0 pb-10 sm:pb-12">
          <div className="overflow-hidden rounded-2xl bg-mist-100 shadow-[0_24px_70px_-30px_rgba(31,26,57,0.35)]">
            <img
              src={photos.narrative}
              alt="A woman working calmly on her laptop beside a sunlit window"
              loading="lazy"
              decoding="async"
              className="aspect-[5/4] w-full object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.025]"
            />
          </div>
          <figcaption className="absolute right-3 bottom-0 left-3 rounded-2xl border border-white/70 bg-white/85 p-5 shadow-[0_18px_45px_-18px_rgba(30,25,55,0.32)] backdrop-blur-xl sm:right-6 sm:left-auto sm:w-[75%] sm:p-6">
            <span aria-hidden="true" className="font-display text-4xl leading-none text-brand-500">
              “
            </span>
            <blockquote className="mt-1 font-display text-base leading-relaxed font-semibold text-ink-900 sm:text-lg">
              FlowPilot gave me back 10 hours a week. Now I focus on creative work.
            </blockquote>
            <p className="mt-3 text-xs font-semibold tracking-[0.08em] text-fg-subtle uppercase">
              Illustrative founder quote · not a real customer result
            </p>
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}

export function AudiencePhotos() {
  return (
    <Section reveal spacing="lg" className="bg-[#f7f6f3]" aria-labelledby="audience-title">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <Eyebrow>Different days, shared momentum</Eyebrow>
          <h2 id="audience-title" className="mt-4 text-title-1">
            Who FlowPilot <span className="gradient-text">is for.</span>
          </h2>
        </div>
        <p className="max-w-xs text-body-sm text-fg-muted">
          However you work, make a little more room for what matters.
        </p>
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
        {audiences.map((audience, index) => (
          <ScrollReveal as="article" key={audience.title} delay={index * 100} className="group">
            <div className="overflow-hidden rounded-2xl bg-mist-200 shadow-[0_16px_40px_-24px_rgba(31,26,57,0.38)]">
              <img
                src={audience.image}
                alt={audience.alt}
                loading="lazy"
                decoding="async"
                className={`aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${audience.position}`}
              />
            </div>
            <div className="mt-5 flex items-start gap-4">
              <span className="pt-1 text-xs font-semibold text-brand-600">{audience.number}</span>
              <div>
                <h3 className="text-title-3">{audience.title}</h3>
                <p className="mt-2 text-body-sm text-fg-muted">{audience.description}</p>
              </div>
              <ArrowUpRight
                aria-hidden="true"
                className="ml-auto mt-1 size-4 shrink-0 text-mist-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </div>
          </ScrollReveal>
        ))}
      </div>
      <p className="mt-8 text-caption text-fg-subtle">
        Editorial photography via Unsplash. People pictured are not represented as FlowPilot
        customers.
      </p>
    </Section>
  );
}

/** A small, non-interactive interface composite aligned to the laptop in the photo. */
function ScreenComposite() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1568 1045"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        <clipPath id="laptop-screen">
          <polygon points="414,416 805,275 874,504 526,700" />
        </clipPath>
      </defs>
      <g clipPath="url(#laptop-screen)">
        <g transform="matrix(.96 -.35 .30 .78 416 416)">
          <rect width="480" height="390" fill="#f6f6fa" />
          <rect width="480" height="38" fill="#ffffff" />
          <circle cx="17" cy="19" r="5" fill="#765df0" />
          <text x="29" y="24" fill="#1c1932" fontSize="15" fontWeight="700" fontFamily="sans-serif">
            FlowPilot
          </text>
          <rect y="38" width="84" height="352" fill="#ffffff" />
          <rect x="12" y="61" width="60" height="16" rx="4" fill="#eeeaff" />
          <rect x="15" y="94" width="42" height="5" rx="2" fill="#d9d9e2" />
          <rect x="15" y="113" width="49" height="5" rx="2" fill="#d9d9e2" />
          <rect x="15" y="132" width="39" height="5" rx="2" fill="#d9d9e2" />
          <text
            x="105"
            y="76"
            fill="#201c37"
            fontSize="17"
            fontWeight="700"
            fontFamily="sans-serif"
          >
            Good morning, Alex
          </text>
          <text x="105" y="95" fill="#8a8898" fontSize="10" fontFamily="sans-serif">
            Your workspace at a glance
          </text>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${105 + i * 112} 112)`}>
              <rect width="102" height="62" rx="5" fill="#fff" />
              <rect x="10" y="10" width="58" height="5" rx="2" fill="#dcdbe4" />
              <rect x="10" y="27" width="25" height="12" rx="3" fill="#342956" />
              <rect x="10" y="48" width="45" height="4" rx="2" fill="#e7e5ec" />
            </g>
          ))}
          <rect x="105" y="188" width="214" height="145" rx="5" fill="#fff" />
          <text
            x="118"
            y="208"
            fill="#302b42"
            fontSize="10"
            fontWeight="700"
            fontFamily="sans-serif"
          >
            Focus time
          </text>
          {[35, 52, 69, 57, 77, 42, 26].map((height, i) => (
            <rect
              key={i}
              x={122 + i * 25}
              y={310 - height}
              width="13"
              height={height}
              rx="3"
              fill={i === 4 ? '#7258ea' : '#c5baf6'}
            />
          ))}
          <rect x="330" y="188" width="106" height="145" rx="5" fill="#fff" />
          <text
            x="340"
            y="208"
            fill="#302b42"
            fontSize="10"
            fontWeight="700"
            fontFamily="sans-serif"
          >
            Priorities
          </text>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(341 ${224 + i * 30})`}>
              <circle cx="5" cy="5" r="5" fill="#eeeaff" />
              <rect x="16" y="2" width="58" height="5" rx="2" fill="#c8c6d2" />
              <rect x="16" y="12" width="38" height="4" rx="2" fill="#e6e4ec" />
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}

export function LifestyleWorkspace() {
  return (
    <Section reveal tone="surface" spacing="lg" aria-labelledby="lifestyle-title">
      <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        <figure className="m-0">
          <div className="group relative aspect-[1568/1045] overflow-hidden rounded-2xl bg-mist-100 shadow-[0_24px_70px_-30px_rgba(31,26,57,0.35)]">
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.025]">
              <img
                src={photos.workspace}
                alt="Two people working together at a laptop and notebook in a bright workspace"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <ScreenComposite />
            </div>
          </div>
          <figcaption className="mt-3 text-caption text-fg-subtle">
            Illustrative composite · sample FlowPilot interface on an Unsplash photograph.
          </figcaption>
        </figure>
        <div className="max-w-md">
          <Eyebrow>In your element</Eyebrow>
          <h2 id="lifestyle-title" className="mt-4 text-title-1">
            Your work, with a little <span className="gradient-text">more breathing room.</span>
          </h2>
          <p className="mt-5 text-lead text-fg-muted">
            From the first coffee to the final check-in, bring your projects, people and priorities
            together in a workspace that fits your day.
          </p>
          <div className="mt-8 h-px w-16 bg-brand-300" aria-hidden="true" />
          <p className="mt-5 text-body-sm text-fg-muted">
            Less switching between tools. More space to make something meaningful.
          </p>
        </div>
      </div>
    </Section>
  );
}
