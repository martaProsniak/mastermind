import { Component, Input } from '@angular/core';
import { ColorModel } from '../color.model';

@Component({
  selector: 'empty-row',
  templateUrl: './empty-row.component.html',
  styleUrl: './empty-row.component.css',
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
