import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { MoonStar, Smartphone, TabletSmartphone, SunMedium } from 'lucide-react';
import { SkyButton, SkyCard, SkyShell } from '@sky-ui/react-sky';
import { useSkyDocsRuntime } from '../runtime/SkyDocsRuntime';
import { SkyCardDoc } from './SkyCardDoc';

type PreviewTheme = 'midnight' | 'daylight';
type PreviewViewport = 'mobile' | 'desktop';

type SkyPlaygroundProps = {
  title: string;
  description?: string;
  reactCode: string;
  angularCode: string;
  renderPreview: (state: { theme: PreviewTheme; viewport: PreviewViewport }) => React.ReactNode;
};

export const SkyPlayground = ({ title, description, reactCode, angularCode, renderPreview }: SkyPlaygroundProps) => {
  const { preferredFramework, setPreferredFramework } = useSkyDocsRuntime();
  const [activeTab, setActiveTab] = useState<'react' | 'angular'>(preferredFramework);
  const [previewTheme, setPreviewTheme] = useState<PreviewTheme>('midnight');
  const [viewport, setViewport] = useState<PreviewViewport>('desktop');
  const indicatorRef = useRef<HTMLDivElement>(null);
  const reactTabRef = useRef<HTMLButtonElement>(null);
  const angularTabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setActiveTab(preferredFramework);
  }, [preferredFramework]);

  useEffect(() => {
    const activeRef = activeTab === 'react' ? reactTabRef.current : angularTabRef.current;
    if (!indicatorRef.current || !activeRef) {
      return;
    }
    animate(indicatorRef.current, {
      width: [indicatorRef.current.offsetWidth || activeRef.offsetWidth, activeRef.offsetWidth],
      x: [indicatorRef.current.offsetLeft || 0, activeRef.offsetLeft],
      duration: 260,
    });
  }, [activeTab]);

  return (
    <SkyCardDoc title={title} description={description} code={activeTab === 'react' ? reactCode : angularCode}>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <SkyButton
              type="button"
              color={previewTheme === 'midnight' ? 'violet' : 'amber'}
              theme={previewTheme}
              onClick={() => setPreviewTheme((current) => (current === 'midnight' ? 'daylight' : 'midnight'))}
            >
              <span className="flex items-center gap-2">
                {previewTheme === 'midnight' ? <SunMedium size={14} /> : <MoonStar size={14} />}
                {previewTheme === 'midnight' ? 'Daylight' : 'Midnight'}
              </span>
            </SkyButton>
          </div>
          <div className="flex gap-2">
            <SkyButton type="button" color={viewport === 'mobile' ? 'cyan' : 'amber'} theme={previewTheme} onClick={() => setViewport('mobile')}>
              <span className="flex items-center gap-2"><Smartphone size={14} />Mobile</span>
            </SkyButton>
            <SkyButton type="button" color={viewport === 'desktop' ? 'cyan' : 'amber'} theme={previewTheme} onClick={() => setViewport('desktop')}>
              <span className="flex items-center gap-2"><TabletSmartphone size={14} />Desktop</span>
            </SkyButton>
          </div>
        </div>

        <SkyCard theme={previewTheme} blur="cumulus" className="p-4 md:p-6">
          <div className={`mx-auto transition-all duration-300 ${viewport === 'mobile' ? 'max-w-[390px]' : 'max-w-full'}`}>
            <SkyShell theme={previewTheme} fullHeight={false}>
              {renderPreview({ theme: previewTheme, viewport })}
            </SkyShell>
          </div>
        </SkyCard>

        <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/72 p-3">
          <div className="relative mb-4 flex gap-2 rounded-full border border-white/8 bg-white/5 p-1">
            <div
              ref={indicatorRef}
              className="absolute bottom-1 left-1 top-1 rounded-full bg-cyan-300/14"
              style={{ width: reactTabRef.current?.offsetWidth ?? 0 }}
            />
            <button ref={reactTabRef} type="button" className="relative z-[1] rounded-full px-4 py-2 text-sm uppercase tracking-[0.18em] text-slate-200" onClick={() => {
              setActiveTab('react');
              setPreferredFramework('react');
            }}>
              React (TSX)
            </button>
            <button ref={angularTabRef} type="button" className="relative z-[1] rounded-full px-4 py-2 text-sm uppercase tracking-[0.18em] text-slate-200" onClick={() => {
              setActiveTab('angular');
              setPreferredFramework('angular');
            }}>
              Angular (HTML/TS)
            </button>
          </div>
          <pre className="m-0 overflow-auto rounded-[1.25rem] border border-white/8 bg-[#020817]/90 p-4 text-sm text-slate-100">
            <code>{activeTab === 'react' ? reactCode : angularCode}</code>
          </pre>
        </div>
      </div>
    </SkyCardDoc>
  );
};