// libs/angular-sky/src/shell/sky-shell.service.ts
import { Component, Injectable, Input, computed, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SkyService {
  theme = signal<'daylight' | 'midnight'>('midnight');
  reducedMotion = signal(false);

  toggleTheme() {
    this.theme.update(t => t === 'daylight' ? 'midnight' : 'daylight');
  }
}

@Component({
  selector: 'sky-shell',
  standalone: true,
  template: `
    <div [class]="effectiveTheme()" class="sky-shell-root min-h-screen relative overflow-hidden">
      <div class="sky-aurora-container fixed inset-0 -z-10">
        <div class="aurora-layer layer-1"></div>
        <div class="aurora-layer layer-2"></div>
      </div>

      <main class="relative z-10 p-8">
        <ng-content></ng-content>
      </main>
    </div>
  `
})
export class SkyShellComponent {
  themeMode = Input<'daylight' | 'midnight' | null>(null);
  sky = inject(SkyService);
  effectiveTheme = computed(() => this.themeMode() ?? this.sky.theme());
}