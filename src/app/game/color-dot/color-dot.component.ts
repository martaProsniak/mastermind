import { Component, Input } from '@angular/core';
import { ColorModel } from '../color.model';

@Component({
  selector: 'color-dot',
  templateUrl: './color-dot.component.html',
  styleUrl: './color-dot.component.css',
})
export class ColorDotComponent {
  @Input() color: ColorModel;
  @Input() isSelected: boolean;
  @Input() onColorClick: (color: ColorModel) => void;
  @Input() isSmall: boolean = false;
  @Input() moreInRow = false;
  @Input() showPointer: boolean = true;
}
