import { Component, Input } from '@angular/core';
import { ColorModel } from '../color.model';

@Component({
  selector: 'colors-row',
  templateUrl: './colors-row.component.html',
  styleUrl: './colors-row.component.css'
})
export class ColorsRowComponent {
  @Input() colors: ColorModel[];
}
