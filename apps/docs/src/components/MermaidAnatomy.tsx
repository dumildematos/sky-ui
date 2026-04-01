import React, { useEffect, useId, useRef } from 'react';
import mermaid from 'mermaid';
import { SkyCard } from '@sky-ui/react-sky';
import { useSkyDocsRuntime } from '../runtime/SkyDocsRuntime';

export function MermaidAnatomy({ chart, title = 'Anatomy' }: { chart: string; title?: string }) {
  const { theme } = useSkyDocsRuntime();
  const hostRef = useRef<HTMLDivElement>(null);
  const chartId = useId().replace(/:/g, '-');

  useEffect(() => {
    let cancelled = false;
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: theme === 'midnight' ? '#0f172a' : '#f8fafc',
        primaryTextColor: theme === 'midnight' ? '#f8fafc' : '#0f172a',
        lineColor: '#67e8f9',
        primaryBorderColor: 'rgba(103, 232, 249, 0.4)',
        tertiaryColor: 'rgba(255,255,255,0.05)',
      },
    });

    mermaid.render(`mermaid-${chartId}`, chart).then(({ svg }) => {
      if (!cancelled && hostRef.current) {
        hostRef.current.innerHTML = svg;
      }
    });

    return () => {
      cancelled = true;
    };
  }, [chart, chartId, theme]);

  return (
    <SkyCard theme={theme} blur="cumulus" className="p-5">
      <p className="sky-section-eyebrow mb-2">Anatomy</p>
      <h3 className="mb-4 text-lg font-medium">{title}</h3>
      <div ref={hostRef} className="sky-mermaid-chart overflow-hidden rounded-2xl border border-white/8 bg-slate-950/30 p-4" />
    </SkyCard>
  );
}