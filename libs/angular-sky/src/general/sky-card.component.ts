import { Component, Input } from "@angular/core";

type SkyBlur = "stratus" | "cumulus" | "nimbus";
type SkyTheme = "midnight" | "daylight";

const blurMap: Record<SkyBlur, string> = {
  stratus: "blur(6px)",
  cumulus: "blur(18px)",
  nimbus: "blur(45px)",
};

const surfaceMap: Record<
  SkyTheme,
  { background: string; color: string; border: string; shadow: string }
> = {
  midnight: {
    background:
      "linear-gradient(155deg, rgba(8, 15, 33, 0.76), rgba(15, 23, 42, 0.42))",
    color: "#f8fafc",
    border: "rgba(148, 163, 184, 0.24)",
    shadow: "0 24px 60px rgba(2, 6, 23, 0.35)",
  },
  daylight: {
    background:
      "linear-gradient(155deg, rgba(255, 255, 255, 0.76), rgba(226, 232, 240, 0.45))",
    color: "#0f172a",
    border: "rgba(255, 255, 255, 0.65)",
    shadow: "0 24px 60px rgba(148, 163, 184, 0.24)",
  },
};

@Component({
  selector: "sky-card",
  standalone: true,
  template: `
    <div
      class="sky-card relative overflow-hidden border"
      [class.rounded-[2rem]]="rounded()"
      [class.rounded-none]="!rounded()"
      [style.background]="surface.background"
      [style.color]="surface.color"
      [style.borderColor]="surface.border"
      [style.boxShadow]="
        surface.shadow +
        ', inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.04)'
      "
      [style.backdropFilter]="blurFilter"
      [style.webkitBackdropFilter]="blurFilter"
      [style.padding]="padding()"
      [style.width]="'100%'"
      [style.maxWidth]="'100%'"
    >
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0"
        [style.background]="
          'radial-gradient(circle at 0% 0%, ' + glow() + ', transparent 50%)'
        "
        style="opacity: 0.9;"
      ></div>
      <div
        class="sky-card__edge pointer-events-none absolute inset-0 rounded-[inherit]"
      ></div>
      <div class="relative z-[1] min-w-0">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class SkyCardComponent {
  blur = Input<SkyBlur>("cumulus");
  theme = Input<SkyTheme>("midnight");
  glow = Input("rgba(103, 232, 249, 0.14)");
  padding = Input("1.5rem");
  rounded = Input(true);

  get blurFilter() {
    return blurMap[this.blur()] ?? blurMap.cumulus;
  }

  get surface() {
    return surfaceMap[this.theme()] ?? surfaceMap.midnight;
  }
}
