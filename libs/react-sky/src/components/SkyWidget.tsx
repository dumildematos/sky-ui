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
    <div className="sky-glass-nimbus rounded-3xl p-6 w-full max-w-md border-white/10 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-sm font-medium uppercase tracking-widest text-white/50">{title}</h4>
        <div className="flex gap-2 text-white/40">
          <RefreshCw size={16} className="hover:text-cyan-400 cursor-pointer transition-colors" />
          <MoreHorizontal size={16} className="hover:text-cyan-400 cursor-pointer" />
        </div>
      </div>

      <div ref={chartRef} className="w-full h-[120px] mb-4 overflow-hidden rounded-lg"></div>

      <div className="flex justify-between items-end">
        <div>
          <span className="text-3xl font-light text-white">84.2%</span>
          <p className="text-xs text-cyan-400 font-mono">+2.4% vs last orbit</p>
        </div>
        <button className="p-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10">
          <Maximize2 size={18} className="text-white/70" />
        </button>
      </div>
    </div>
  );
};
