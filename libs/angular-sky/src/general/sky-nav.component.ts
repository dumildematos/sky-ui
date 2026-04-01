import { Component, Input } from "@angular/core";
import { SkyCardComponent } from "./sky-card.component";

type SkyNavOrientation = "horizontal" | "vertical";

@Component({
  selector: "sky-nav",
  standalone: true,
  imports: [SkyCardComponent],
  template: `
    <sky-card
      blur="nimbus"
      [theme]="theme()"
      [rounded]="rounded()"
      padding="0.9rem 1rem"
    >
      <div
        class="flex min-w-0"
        [class.flex-col]="orientation() === 'vertical'"
        [class.items-stretch]="orientation() === 'vertical'"
        [class.gap-2.5]="orientation() === 'vertical'"
        [class.flex-row]="orientation() === 'horizontal'"
        [class.flex-wrap]="orientation() === 'horizontal'"
        [class.items-center]="orientation() === 'horizontal'"
        [class.gap-3]="orientation() === 'horizontal'"
        [class.md:gap-4]="orientation() === 'horizontal'"
      >
        <ng-content></ng-content>
      </div>
    </sky-card>
  `,
})
export class SkyNavComponent {
  theme = Input<"midnight" | "daylight">("midnight");
  orientation = Input<SkyNavOrientation>("horizontal");
  rounded = Input(true);
}
