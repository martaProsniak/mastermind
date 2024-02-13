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
  @Input() isSmall: boolean = false;
  @Input() showPointer: boolean = true;
  animateClass: string;
  sizeClasses: string = 'h-10 w-10';

  ngOnInit(): void {
    this.animateClass = this.isSelected ? 'animate-pulse' : '';
    if (this.isSmall) {
      this.sizeClasses = 'h-5 w-5'
    }
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
