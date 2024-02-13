import {
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { ColorModel } from '../color.model';

@Component({
  selector: 'color-dot',
  templateUrl: './color-dot.component.html',
  styleUrl: './color-dot.component.css',
})
export class ColorDotComponent implements OnInit, OnChanges {
  @Input() color: ColorModel;
  @Input() isSelected: boolean;
  @Input() onColorClick: (color: ColorModel) => void;
  animateClass: string;

  ngOnInit(): void {
    this.animateClass = this.isSelected ? 'animate-pulse' : '';
  }

  ngOnChanges(): void {
    this.animateClass = this.isSelected ? 'animate-pulse' : '';
  }

  handleColorClick(color: ColorModel) {
    if (this.onColorClick) {
      this.onColorClick(color);
    }
  }
}
