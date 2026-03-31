// libs/angular-sky/src/components/sky-widget.component.ts
import { Component, Input, ElementRef, ViewChild, effect, inject } from '@angular/core';
import { SkyService } from '../shell/sky-shell.service';
import { renderSkyChart } from '@sky-ui/shared-utils';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'sky-widget',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div class="sky-glass-nimbus rounded-3xl p-6 w-full max-w-md border-white/10">
      <div class="flex justify-between items-center mb-6">
        <h4 class="text-xs font-bold text-white/40 tracking-tighter uppercase">{{title()}}</h4>
        <i-lucide name="more-horizontal" class="text-white/30 cursor-pointer"></i-lucide>
      </div>

      <div #chartContainer class="w-full h-[120px] mb-4"></div>

      <div class="flex justify-between items-baseline">
        <h2 class="text-4xl font-extralight text-white">1,240<span class="text-lg opacity-50">ms</span></h2>
        <div class="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-[10px] uppercase">Stable</div>
      </div>
    </div>
  `
})
export class SkyWidgetComponent {
  title = Input('Atmospheric Pressure');
  data = Input([10, 25, 15, 45, 30, 60, 40]);
  
  @ViewChild('chartContainer') container!: ElementRef;
  private sky = inject(SkyService);

  constructor() {
    effect(() => {
      // Re-run D3 logic when Signals change
      const currentTheme = this.sky.theme();
      if (this.container) {
        this.container.nativeElement.innerHTML = '';
        renderSkyChart(this.container.nativeElement, this.data(), currentTheme);
      }
    });
  }
}