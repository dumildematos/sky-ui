// libs/angular-sky/src/components/flow-card.component.ts
import { Component, Input, ElementRef, ViewChild, effect, inject, signal } from '@angular/core';
import { SkyService } from '../shell/sky-shell.service';
import { getSkyMermaidConfig } from '@sky-ui/shared-utils';
import mermaid from 'mermaid';

@Component({
  selector: 'sky-flow-card',
  standalone: true,
  template: `
    <div class="sky-glass-stratus rounded-xl p-4 border-white/5">
      <div #mermaidTarget class="mermaid-target"></div>
    </div>
  `,
  styles: [`
    :host ::ng-deep svg { max-width: 100%; height: auto; }
    :host ::ng-deep .node rect { fill-opacity: 0.2 !important; stroke-width: 1px !important; }
  `]
})
export class FlowCardComponent {
  definition = Input.required<string>();
  id = Input.required<string>();
  
  @ViewChild('mermaidTarget') target!: ElementRef;
  private sky = inject(SkyService);

  constructor() {
    effect(async () => {
      const theme = this.sky.theme();
      mermaid.initialize(getSkyMermaidConfig(theme));
      
      const { svg } = await mermaid.render(`ang-mermaid-${this.id()}`, this.definition());
      this.target.nativeElement.innerHTML = svg;
    });
  }
}