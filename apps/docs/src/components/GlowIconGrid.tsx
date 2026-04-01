import React from 'react';
import {
  Activity,
  Cloud,
  Compass,
  Cpu,
  Gauge,
  LayoutGrid,
  Maximize2,
  Play,
  RefreshCw,
  Rocket,
  Search,
  Send,
  Sparkles,
  Waves,
  Workflow,
} from 'lucide-react';
import { SkyCard } from '@sky-ui/react-sky';
import { useSkyDocsRuntime } from '../runtime/SkyDocsRuntime';

const iconMap = {
  Activity,
  Cloud,
  Compass,
  Cpu,
  Gauge,
  LayoutGrid,
  Maximize2,
  Play,
  RefreshCw,
  Rocket,
  Search,
  Send,
  Sparkles,
  Waves,
  Workflow,
};

export function GlowIconGrid({ items, title = 'Iconography' }: { items: Array<keyof typeof iconMap>; title?: string }) {
  const { theme } = useSkyDocsRuntime();

  return (
    <SkyCard theme={theme} blur="cumulus" className="p-5">
      <p className="sky-section-eyebrow mb-2">Iconography</p>
      <h3 className="mb-4 text-lg font-medium">{title}</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = iconMap[item] ?? Sparkles;
          return (
            <div key={item} className="rounded-2xl border border-white/8 bg-white/5 p-4 text-center">
              <div className="mb-3 flex justify-center text-cyan-200">
                <Icon className="sky-glow-icon" size={20} />
              </div>
              <div className="text-sm uppercase tracking-[0.18em] text-slate-300">{item}</div>
            </div>
          );
        })}
      </div>
    </SkyCard>
  );
}