import React, { useEffect } from 'react';
import Link from '@docusaurus/Link';
import { Blocks, Gauge, Layers3, Palette, Zap } from 'lucide-react';
import { SkyButton, SkyCard } from '@sky-ui/react-sky';
import { useSkyDocsRuntime } from '../runtime/SkyDocsRuntime';

const stackItems = [
  {
    key: 'angular',
    label: 'Angular',
    tint: 'from-red-400/25 to-rose-300/10',
    to: '/angular',
  },
  {
    key: 'react',
    label: 'React',
    tint: 'from-cyan-400/25 to-sky-300/10',
    to: '/react',
  },
] as const;

const featureCards = [
  {
    title: 'Cross-Framework Components',
    description: 'Ship the same visual language to React and Angular with mirrored primitives for actions, navigation, shells, and telemetry.',
    icon: Layers3,
  },
  {
    title: 'Glassmorphism Engine',
    description: 'Sky UI combines layered blur, luminous borders, and animated depth cues into a reusable surface system instead of isolated widgets.',
    icon: Palette,
  },
  {
    title: 'Dashboard-Ready Telemetry',
    description: 'Use chart-ready widgets, navigation rails, and shell containers to assemble monitoring and control panels quickly.',
    icon: Gauge,
  },
  {
    title: 'Utility-Friendly Styling',
    description: 'The library fits naturally into Sass and Tailwind workflows so teams can extend or skin surfaces without fighting the stack.',
    icon: Blocks,
  },
];

function AngularLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="none">
      <path d="M12 2 4.2 4.8l1.2 10.3L12 22l6.6-6.9 1.2-10.3L12 2Z" fill="#DD0031" />
      <path d="M12 2v20l6.6-6.9 1.2-10.3L12 2Z" fill="#C3002F" />
      <path d="M12 5.5 7.8 15h1.6l.8-2h3.5l.8 2H16L12 5.5Zm0 3.3 1.2 2.9h-2.4L12 8.8Z" fill="#fff" />
    </svg>
  );
}

function ReactLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="none">
      <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="8.2" ry="3.2" stroke="#61DAFB" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="8.2" ry="3.2" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="8.2" ry="3.2" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
    </svg>
  );
}

function StackIcon({ label }: { label: string }) {
  if (label === 'Angular') {
    return <AngularLogo />;
  }
  return <ReactLogo />;
}

export function HomeLanding() {
  const { preferredFramework, setPreferredFramework, theme } = useSkyDocsRuntime();
  const getStartedHref = preferredFramework === 'angular' ? '/angular' : '/react';

  useEffect(() => {
    document.body.classList.add('sky-homepage');

    return () => {
      document.body.classList.remove('sky-homepage');
    };
  }, []);

  return (
    <div className="sky-home space-y-10 pb-10">
      <section className="sky-home-hero mx-auto max-w-5xl text-center">
        <div className="sky-home-hero-shell rounded-[2.25rem] border border-white/10 bg-slate-950/45 px-6 py-12 shadow-[0_30px_120px_rgba(2,6,23,0.45)] backdrop-blur-xl md:px-10 md:py-16">
          <p className="sky-section-eyebrow mb-4">Glass UI Library</p>
          <h1 className="mx-auto max-w-4xl text-4xl font-light tracking-[-0.04em] text-white md:text-7xl">
            Sky UI
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-300/88 md:text-lg">
            A glassmorphism component library for Angular and React, built for dashboards, control surfaces, navigation shells, and telemetry-heavy product interfaces.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {stackItems.map((item) => {
              const isSelected = preferredFramework === item.key;

              return (
                <Link
                  key={item.key}
                  to={item.to}
                  onClick={() => {
                    if (item.key === 'angular' || item.key === 'react') {
                      setPreferredFramework(item.key);
                    }
                  }}
                  className={`sky-stack-chip bg-gradient-to-br ${item.tint} ${isSelected ? 'sky-stack-chip-active' : ''}`}
                >
                  <span className="sky-stack-chip__icon">
                    <StackIcon label={item.label} />
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((feature) => {
            const Icon = feature.icon;

            return (
              <SkyCard key={feature.title} theme={theme} blur="cumulus" className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-cyan-200">
                  <Icon className="sky-glow-icon" size={20} />
                </div>
                <h2 className="mb-3 text-xl font-light text-white">{feature.title}</h2>
                <p className="m-0 text-sm leading-7 text-slate-300/88">{feature.description}</p>
              </SkyCard>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl">
        <SkyCard theme={theme} blur="nimbus" className="p-7 md:p-9">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="sky-section-eyebrow mb-3">Why Sky UI</p>
              <h2 className="mb-4 text-3xl font-light text-white md:text-4xl">Built for dense interfaces, not generic landing pages.</h2>
              <p className="m-0 text-sm leading-8 text-slate-300/88">
                Sky UI focuses on the surfaces product teams actually need: clear call-to-action buttons, adaptable navigation, layered shells, and telemetry widgets that still feel premium under heavy information density.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/8 bg-white/5 p-5">
                <div className="mb-3 text-xs uppercase tracking-[0.28em] text-slate-400">Theming</div>
                <div className="text-lg font-light text-white">Midnight and Daylight surfaces</div>
              </div>
              <div className="rounded-3xl border border-white/8 bg-white/5 p-5">
                <div className="mb-3 text-xs uppercase tracking-[0.28em] text-slate-400">Frameworks</div>
                <div className="text-lg font-light text-white">React and Angular tracks</div>
              </div>
              <div className="rounded-3xl border border-white/8 bg-white/5 p-5">
                <div className="mb-3 text-xs uppercase tracking-[0.28em] text-slate-400">Styling</div>
                <div className="text-lg font-light text-white">Sass-friendly and Tailwind-ready</div>
              </div>
              <div className="rounded-3xl border border-white/8 bg-white/5 p-5">
                <div className="mb-3 text-xs uppercase tracking-[0.28em] text-slate-400">Interaction</div>
                <div className="text-lg font-light text-white">Motion-driven without losing clarity</div>
              </div>
            </div>
          </div>
        </SkyCard>
      </section>

      <section className="mx-auto flex max-w-4xl justify-center">
        <Link to={getStartedHref}>
          <SkyButton color="violet" theme={theme}>
            <span className="flex items-center gap-2">
              Explore {preferredFramework === 'angular' ? 'Angular' : 'React'} Docs
              <Zap size={15} />
            </span>
          </SkyButton>
        </Link>
      </section>
    </div>
  );
}