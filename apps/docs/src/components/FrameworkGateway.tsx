import React from 'react';
import Link from '@docusaurus/Link';
import { ArrowRight, Atom, Box, Orbit } from 'lucide-react';
import { SkyButton, SkyCard } from '@sky-ui/react-sky';
import { useSkyDocsRuntime } from '../runtime/SkyDocsRuntime';

const frameworkCards = [
  {
    framework: 'react' as const,
    title: 'React Track',
    eyebrow: 'Hooks + TSX',
    description: 'Install the React package, compose shells and cards directly, and work from TSX-first examples.',
    to: '/react',
    accent: 'cyan' as const,
    icon: Atom,
    points: ['npm install @sky-ui/react-sky', 'TSX component examples', 'React-first starter layout'],
  },
  {
    framework: 'angular' as const,
    title: 'Angular Track',
    eyebrow: 'Standalone Components',
    description: 'Use standalone Angular components, wire imports explicitly, and follow template-driven usage patterns.',
    to: '/angular',
    accent: 'amber' as const,
    icon: Orbit,
    points: ['npm install @sky-ui/angular-sky', 'Standalone import examples', 'Angular template snippets'],
  },
];

export const FrameworkGateway = () => {
  const { preferredFramework, setPreferredFramework, theme } = useSkyDocsRuntime();

  return (
    <section className="mt-8 space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="sky-section-eyebrow mb-2">Framework Entry</p>
          <h2 className="m-0 text-3xl font-light text-slate-100">Choose your documentation track</h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300/85">
            Pick React or Angular on the hub. The choice is saved and becomes the default code tab across the component playgrounds.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
          {frameworkCards.map((card) => (
            <button
              key={card.framework}
              type="button"
              className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.22em] transition ${preferredFramework === card.framework ? 'bg-white/12 text-white' : 'text-slate-300/75'}`}
              onClick={() => setPreferredFramework(card.framework)}
            >
              {card.framework}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {frameworkCards.map((card) => {
          const Icon = card.icon;
          const isPreferred = preferredFramework === card.framework;

          return (
            <SkyCard key={card.framework} theme={theme} blur="nimbus" className="p-6 md:p-7">
              <div className="flex h-full flex-col gap-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="sky-section-eyebrow mb-2">{card.eyebrow}</p>
                    <h3 className="m-0 text-2xl font-light text-slate-100">{card.title}</h3>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-cyan-200">
                    <Icon className="sky-glow-icon" size={20} />
                  </div>
                </div>

                <p className="m-0 text-sm leading-6 text-slate-300/90">{card.description}</p>

                <div className="grid gap-3 sm:grid-cols-3">
                  {card.points.map((point) => (
                    <div key={point} className="rounded-2xl border border-white/8 bg-white/5 p-4 text-sm text-slate-200/85">
                      {point}
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-300/70">
                    <Box size={14} />
                    {isPreferred ? 'Preferred Track' : 'Available Track'}
                  </div>
                  <Link to={card.to} onClick={() => setPreferredFramework(card.framework)}>
                    <SkyButton color={card.accent} theme={theme}>
                      <span className="flex items-center gap-2">
                        Open Docs
                        <ArrowRight size={14} />
                      </span>
                    </SkyButton>
                  </Link>
                </div>
              </div>
            </SkyCard>
          );
        })}
      </div>
    </section>
  );
};