// libs/react-sky/src/components/FlowCard.tsx
import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { useSky } from '../shell/SkyShell';
import { getSkyMermaidConfig } from '@sky-ui/shared-utils';

export const FlowCard = ({ chartDefinition, id }: { chartDefinition: string, id: string }) => {
  const { theme } = useSky();
  const [svg, setSvg] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize(getSkyMermaidConfig(theme));
    
    mermaid.render(`mermaid-${id}`, chartDefinition).then(({ svg }) => {
      setSvg(svg);
    });
  }, [chartDefinition, theme, id]);

  return (
    <div className="sky-glass-stratus rounded-xl p-4 border-white/5 overflow-hidden transition-all duration-500">
      <div 
        className="mermaid-container opacity-80 hover:opacity-100 transition-opacity"
        dangerouslySetInnerHTML={{ __html: svg }} 
      />
      <style jsx global>{`
        .mermaid-container svg {
          height: auto;
          width: 100%;
          filter: drop-shadow(0 0 5px rgba(103, 232, 249, 0.2));
        }
        .mermaid-container rect {
          rx: 8px; /* Rounded glass nodes */
        }
      `}</style>
    </div>
  );
};