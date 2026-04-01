// libs/react-sky/src/components/SkyWidget.tsx
import React, { useEffect, useRef } from 'react';
import { MoreHorizontal, Maximize2, RefreshCw } from 'lucide-react';
import { useSky } from '../shell/SkyShell';
import { renderSkyChart } from '@sky-ui/shared-utils';

export const SkyWidget = ({ title, data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { theme } = useSky();

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.innerHTML = '';
      renderSkyChart(chartRef.current, data, theme);
    }
  }, [data, theme]);

  return (
    <div className="sky-glass-nimbus w-full max-w-full rounded-3xl border border-white/10 p-4 shadow-2xl sm:p-6 md:max-w-md">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3 sm:mb-6 sm:items-center">
        <h4 className="min-w-0 flex-1 text-xs font-medium uppercase tracking-[0.32em] text-white/50 sm:text-sm">{title}</h4>
        <div className="flex shrink-0 gap-2 text-white/40">
          <RefreshCw size={16} className="hover:text-cyan-400 cursor-pointer transition-colors" />
          <MoreHorizontal size={16} className="hover:text-cyan-400 cursor-pointer" />
        </div>
      </div>

      <div ref={chartRef} className="mb-4 h-[120px] w-full overflow-hidden rounded-lg sm:h-[140px]"></div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <span className="text-2xl font-light text-white sm:text-3xl">84.2%</span>
          <p className="font-mono text-[11px] text-cyan-400 sm:text-xs">+2.4% vs last orbit</p>
        </div>
        <button className="rounded-full border border-white/10 bg-white/5 p-2 hover:bg-white/10">
          <Maximize2 size={18} className="text-white/70" />
        </button>
      </div>
    </div>
  );
};
