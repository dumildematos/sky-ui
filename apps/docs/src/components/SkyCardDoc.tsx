import React from 'react';
import { animate } from 'animejs';
import { Copy, CopyCheck } from 'lucide-react';
import { SkyButton, SkyCard } from '@sky-ui/react-sky';
import { useSkyDocsRuntime } from '../runtime/SkyDocsRuntime';

type SkyCardDocProps = {
  title: string;
  description?: string;
  code?: string;
  children: React.ReactNode;
};

export function SkyCardDoc({ title, description, code, children }: SkyCardDocProps) {
  const { theme } = useSkyDocsRuntime();
  const [copied, setCopied] = React.useState(false);

  const onCopy = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!code) {
      return;
    }
    await navigator.clipboard.writeText(code);
    setCopied(true);
    animate(event.currentTarget, {
      scale: [1, 1.08, 1],
      duration: 320,
    });
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <SkyCard blur="cumulus" theme={theme} className="sky-card-doc p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="sky-section-eyebrow">Documentation Module</p>
          <h2 className="mb-2 text-2xl font-light tracking-tight">{title}</h2>
          {description ? <p className="m-0 max-w-3xl text-sm text-slate-300/90">{description}</p> : null}
        </div>
        {code ? (
          <SkyButton type="button" color="cyan" theme={theme} onClick={onCopy}>
            <span className="flex items-center gap-2">{copied ? <CopyCheck size={14} /> : <Copy size={14} />}{copied ? 'Copied' : 'Copy Code'}</span>
          </SkyButton>
        ) : null}
      </div>
      {children}
    </SkyCard>
  );
}