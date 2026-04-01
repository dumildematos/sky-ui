import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  effect,
  inject,
} from "@angular/core";
import { SkyService } from "../shell/sky-shell.service";
import { renderSkyChart } from "@sky-ui/shared-utils";
import { LucideAngularModule } from "lucide-angular";

@Component({
  selector: "sky-widget",
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div
      class="sky-glass-nimbus w-full max-w-full rounded-3xl border border-white/10 p-4 sm:p-6 md:max-w-md"
    >
      <div
        class="mb-4 flex flex-wrap items-start justify-between gap-3 sm:mb-6 sm:items-center"
      >
        <h4
          class="min-w-0 flex-1 text-xs font-bold uppercase tracking-[0.32em] text-white/40"
        >
          {{ title() }}
        </h4>
        <i-lucide
          name="more-horizontal"
          class="shrink-0 text-white/30 cursor-pointer"
        ></i-lucide>
      </div>

      <div #chartContainer class="mb-4 h-[120px] w-full sm:h-[140px]"></div>

      <div class="flex flex-wrap items-baseline justify-between gap-3">
        <h2 class="text-3xl font-extralight text-white sm:text-4xl">
          1,240<span class="text-base opacity-50 sm:text-lg">ms</span>
        </h2>
        <div
          class="rounded bg-emerald-500/20 px-2 py-1 text-[10px] uppercase text-emerald-400"
        >
          Stable
        </div>
      </div>
    </div>
  `,
})
export class SkyWidgetComponent {
  title = Input("Atmospheric Pressure");
  data = Input([10, 25, 15, 45, 30, 60, 40]);

  @ViewChild("chartContainer") container!: ElementRef;
  private sky = inject(SkyService);

  constructor() {
    effect(() => {
      const currentTheme = this.sky.theme();
      if (this.container) {
        this.container.nativeElement.innerHTML = "";
        renderSkyChart(this.container.nativeElement, this.data(), currentTheme);
      }
    });
  }
}
