import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

export function AuroraMeshBackground() {
  const layerOneRef = useRef<HTMLDivElement>(null);
  const layerTwoRef = useRef<HTMLDivElement>(null);
  const layerThreeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (layerOneRef.current) {
      animate(layerOneRef.current, {
        translateX: ['-2%', '8%'],
        translateY: ['0%', '10%'],
        scale: [1, 1.12],
        alternate: true,
        loop: true,
        duration: 18000,
      });
    }
    if (layerTwoRef.current) {
      animate(layerTwoRef.current, {
        translateX: ['0%', '-8%'],
        translateY: ['8%', '-6%'],
        scale: [1.04, 0.96],
        alternate: true,
        loop: true,
        duration: 22000,
      });
    }
    if (layerThreeRef.current) {
      animate(layerThreeRef.current, {
        translateX: ['-4%', '4%'],
        translateY: ['-4%', '6%'],
        scale: [0.96, 1.08],
        alternate: true,
        loop: true,
        duration: 24000,
      });
    }
  }, []);

  return (
    <div className="sky-aurora-mesh" aria-hidden="true">
      <div ref={layerOneRef} className="sky-aurora-orb sky-aurora-orb-one" />
      <div ref={layerTwoRef} className="sky-aurora-orb sky-aurora-orb-two" />
      <div ref={layerThreeRef} className="sky-aurora-orb sky-aurora-orb-three" />
      <div className="sky-aurora-grid" />
    </div>
  );
}