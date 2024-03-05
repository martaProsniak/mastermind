import { Component, Input } from '@angular/core';
import { ColorModel } from '../color.model';
import { ColorDotComponent } from '../color-dot/color-dot.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'empty-row',
    templateUrl: './empty-row.component.html',
    standalone: true,
    imports: [NgFor, ColorDotComponent],
})
export class EmptyRowComponent {
  @Input() colors: ColorModel[];
  @Input() onClick: (index: number) => void;
  @Input() showPointer: boolean;

  handleClick(index: number) {
    if (!this.showPointer) return;

    if (this.onClick) {
      this.onClick(index);
    }
  }
}
