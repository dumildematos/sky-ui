import React, { useEffect, useMemo, useRef, useState } from 'react';
import { animate } from 'animejs';
import { Compass, Radar, Satellite, Sparkles } from 'lucide-react';
import { SkyButton, SkyCard, SkyShell } from '@sky-ui/react-sky';
import { ResponsiveGlassChart } from './ResponsiveGlassChart';
import { useSkyDocsRuntime } from '../runtime/SkyDocsRuntime';

export function FloatingSkyStation() {
  const { theme } = useSkyDocsRuntime();
  const frameRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    if (frameRef.current) {
      animate(frameRef.current, {
        y: [18, 0],
        opacity: [0, 1],
        duration: 680,
      });
    }
    animate('.sky-station-badge', {
      y: [0, -10],
      alternate: true,
      loop: true,
      duration: 2200,
    });
  }, []);

  const metrics = useMemo(
    () => [
      { label: 'Pressure', value: '84.2%', icon: Radar },
      { label: 'Vector', value: '324.9', icon: Compass },
      { label: 'Relay', value: 'Nominal', icon: Satellite },
    ],
    [],
  );

  return (
    <div
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        setTilt({ rotateX: y * -12, rotateY: x * 16 });
      }}
      onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
      className="perspective-[1400px]"
    >
      <div
        ref={frameRef}
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: 'transform 180ms ease-out',
        }}
      >
        <SkyShell theme={theme} fullHeight={false}>
          <SkyCard theme={theme} blur="nimbus" className="mx-auto max-w-5xl p-6 md:p-8">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="sky-section-eyebrow mb-2">Floating Sky Station</p>
                <h1 className="mb-3 text-4xl font-light tracking-tight md:text-6xl">Submerged documentation for atmospheric interfaces.</h1>
                <p className="max-w-2xl text-base text-slate-300/90">
                  Every doc page sits inside a glass shell, animated over an aurora mesh, with the same components the library exports for product teams.
                </p>
              </div>
              <div className="sky-station-badge rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-cyan-100">
                Live D3 + Anime.js
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  {metrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <div key={metric.label} className="rounded-2xl border border-white/8 bg-white/5 p-4">
                        <div className="mb-3 flex items-center justify-between text-slate-200">
                          <Icon className="sky-glow-icon" size={18} />
                          <Sparkles size={14} className="sky-glow-icon text-cyan-200/80" />
                        </div>
                        <div className="text-xs uppercase tracking-[0.28em] text-slate-400">{metric.label}</div>
                        <div className="mt-2 text-2xl font-light">{metric.value}</div>
                      </div>
                    );
                  })}
                </div>

                <ResponsiveGlassChart
                  title="Atmospheric Drift"
                  data={[14, 22, 28, 24, 40, 34, 52, 47, 60]}
                  accent={theme === 'midnight' ? '#67e8f9' : '#2563eb'}
                />
              </div>

              <div className="rounded-[1.75rem] border border-white/8 bg-white/6 p-5">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-[0.3em] text-slate-400">Action Dock</div>
                    <div className="mt-2 text-2xl font-light">Design system controls</div>
                  </div>
                  <Radar className="sky-glow-icon text-cyan-200" />
                </div>

                <div className="space-y-3">
                  <SkyButton color="cyan" theme={theme}>Open Starter Kit</SkyButton>
                  <SkyButton color="violet" theme={theme}>Inspect Components</SkyButton>
                  <SkyButton color="emerald" theme={theme}>Sync Tokens</SkyButton>
                </div>
              </div>
            </div>
          </SkyCard>
        </SkyShell>
      </div>
    </div>
  );
}