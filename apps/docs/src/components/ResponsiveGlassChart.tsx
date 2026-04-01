import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { SkyCard } from '@sky-ui/react-sky';
import { useSkyDocsRuntime } from '../runtime/SkyDocsRuntime';

type ResponsiveGlassChartProps = {
  data: number[];
  accent?: string;
  title?: string;
};

export function ResponsiveGlassChart({ data, accent = '#67e8f9', title = 'Signal Drift' }: ResponsiveGlassChartProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const { theme } = useSkyDocsRuntime();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }

    const render = () => {
      const width = host.clientWidth || 480;
      const height = 220;
      host.innerHTML = '';

      const gradientId = `sky-gradient-${title.replace(/\s+/g, '-').toLowerCase()}`;
      const svg = d3.select(host).append('svg').attr('width', width).attr('height', height);

      const x = d3.scaleLinear().domain([0, data.length - 1]).range([20, width - 20]);
      const y = d3.scaleLinear().domain([0, d3.max(data) ?? 100]).range([height - 24, 28]);

      const gradient = svg
        .append('defs')
        .append('linearGradient')
        .attr('id', gradientId)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');

      gradient.append('stop').attr('offset', '0%').attr('stop-color', accent).attr('stop-opacity', 0.42);
      gradient.append('stop').attr('offset', '100%').attr('stop-color', accent).attr('stop-opacity', 0.02);

      svg
        .append('path')
        .datum(data)
        .attr('fill', `url(#${gradientId})`)
        .attr('d', d3.area<number>().x((_, index) => x(index)).y0(height - 24).y1((value) => y(value)).curve(d3.curveCatmullRom.alpha(0.8)));

      svg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', accent)
        .attr('stroke-width', 2.5)
        .attr('filter', `drop-shadow(0 0 14px ${accent}66)`)
        .attr('d', d3.line<number>().x((_, index) => x(index)).y((value) => y(value)).curve(d3.curveCatmullRom.alpha(0.8)));

      svg
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (_, index) => x(index))
        .attr('cy', (value) => y(value))
        .attr('r', 3.5)
        .attr('fill', theme === 'midnight' ? '#0f172a' : '#ffffff')
        .attr('stroke', accent)
        .attr('stroke-width', 2);
    };

    render();
    const observer = new ResizeObserver(render);
    observer.observe(host);
    return () => observer.disconnect();
  }, [accent, data, theme, title]);

  return (
    <SkyCard theme={theme} blur="cumulus" className="p-5">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <p className="sky-section-eyebrow mb-1">Data / Logic</p>
          <h3 className="m-0 text-lg font-medium">{title}</h3>
        </div>
        <div className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-300/80">Responsive D3</div>
      </div>
      <div ref={hostRef} className="h-[220px] w-full" />
    </SkyCard>
  );
}