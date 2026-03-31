// libs/angular-sky/src/shell/sky-shell.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SkyService {
  theme = signal<'daylight' | 'midnight'>('midnight');
  reducedMotion = signal(false);

  toggleTheme() {
    this.theme.update(t => t === 'daylight' ? 'midnight' : 'daylight');
  }
}

// libs/angular-sky/src/shell/sky-shell.component.ts
import { Component, inject } from '@angular/core';
import { SkyService } from './sky-shell.service';

@Component({
  selector: 'sky-shell',
  standalone: true,
  template: `
    <div [class]="sky.theme()" class="sky-shell-root min-h-screen relative overflow-hidden">
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
  sky = inject(SkyService);
}