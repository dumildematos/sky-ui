import { Component, Input } from '@angular/core';

type SkyButtonColor = 'cyan' | 'emerald' | 'rose' | 'amber' | 'violet';
type SkyButtonTheme = 'midnight' | 'daylight';

const buttonPalettes: Record<SkyButtonColor, { accent: string; glow: string; border: string }> = {
  cyan: {
    accent: '#67e8f9',
    glow: 'rgba(103, 232, 249, 0.32)',
    border: 'rgba(103, 232, 249, 0.28)',
  },
  emerald: {
    accent: '#6ee7b7',
    glow: 'rgba(110, 231, 183, 0.28)',
    border: 'rgba(110, 231, 183, 0.26)',
  },
  rose: {
    accent: '#fda4af',
    glow: 'rgba(253, 164, 175, 0.26)',
    border: 'rgba(253, 164, 175, 0.24)',
  },
  amber: {
    accent: '#fcd34d',
    glow: 'rgba(252, 211, 77, 0.28)',
    border: 'rgba(252, 211, 77, 0.24)',
  },
  violet: {
    accent: '#c4b5fd',
    glow: 'rgba(196, 181, 253, 0.28)',
    border: 'rgba(196, 181, 253, 0.24)',
  },
};

const buttonSurfaces: Record<SkyButtonTheme, { background: string; text: string; shadow: string }> = {
  midnight: {
    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.82), rgba(15, 23, 42, 0.46))',
    text: '#f8fafc',
    shadow: '0 18px 40px rgba(15, 23, 42, 0.34)',
  },
  daylight: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(226, 232, 240, 0.58))',
    text: '#0f172a',
    shadow: '0 18px 40px rgba(148, 163, 184, 0.26)',
  },
};

@Component({
  selector: 'sky-button',
  standalone: true,
  template: `
    <button
      type="button"
      class="inline-flex min-h-11 max-w-full items-center justify-center rounded-full border px-4 py-3 text-center text-sm font-medium uppercase tracking-[0.18em] transition-all duration-300 sm:px-5"
      [style.background]="surface.background"
      [style.color]="surface.text"
      [style.borderColor]="palette.border"
      [style.boxShadow]="surface.shadow + ', 0 0 0 1px rgba(255, 255, 255, 0.06) inset, 0 0 28px ' + palette.glow"
      [style.backdropFilter]="'blur(18px)'"
      [style.webkitBackdropFilter]="'blur(18px)'"
      [style.whiteSpace]="'normal'"
    >
      <span [style.textShadow]="'0 0 16px ' + palette.glow" [style.maxWidth]="'100%'">{{ label() }}</span>
    </button>
  `,
})
export class SkyButtonComponent {
  label = Input('Launch');
  color = Input<SkyButtonColor>('cyan');
  theme = Input<SkyButtonTheme>('midnight');

  get palette() {
    return buttonPalettes[this.color()] ?? buttonPalettes.cyan;
  }

  get surface() {
    return buttonSurfaces[this.theme()] ?? buttonSurfaces.midnight;
  }
}