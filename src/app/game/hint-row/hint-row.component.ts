import {
  Component,
  Input,
} from '@angular/core';
import { ColorModel } from '../color.model';

@Component({
  selector: 'hint-row',
  templateUrl: './hint-row.component.html',
  styleUrl: './hint-row.component.css',
})
export class HintRowComponent {
  @Input() colors: ColorModel[];
}
