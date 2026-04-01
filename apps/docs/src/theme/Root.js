import React, { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import { animate } from 'animejs';
import { AuroraMeshBackground } from '../components/AuroraMeshBackground';
import { SkyDocsRuntimeProvider } from '../runtime/SkyDocsRuntime';

function AnimatedRoot({ children }) {
  const location = useLocation();

  useEffect(() => {
    const target = document.querySelector('.sky-route-shell');
    if (target) {
      animate(target, {
        opacity: [0, 1],
        y: [18, 0],
        duration: 520,
      });
    }
  }, [location.pathname]);

  return (
    <div className="sky-docs-app">
      <AuroraMeshBackground />
      <div className="sky-route-shell">{children}</div>
    </div>
  );
}

export default function Root({ children }) {
  return (
    <SkyDocsRuntimeProvider>
      <AnimatedRoot>{children}</AnimatedRoot>
    </SkyDocsRuntimeProvider>
  );
}