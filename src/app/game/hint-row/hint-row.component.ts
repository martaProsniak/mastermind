import {
  Component,
  Input,
} from '@angular/core';
import { ColorModel } from '../color.model';
import { ColorDotComponent } from '../color-dot/color-dot.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'hint-row',
    templateUrl: './hint-row.component.html',
    standalone: true,
    imports: [NgFor, ColorDotComponent],
})
export class HintRowComponent {
  @Input() colors: ColorModel[];
}
