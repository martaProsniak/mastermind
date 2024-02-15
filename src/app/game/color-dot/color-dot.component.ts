import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
  @Input() moreInRow = false;
  @Input() showPointer: boolean = true;
  animateClass: string;
  sizeClasses: string = 'h-10 w-10';

  ngOnInit(): void {
    this.animateClass = this.isSelected ? 'animate-pulse' : '';
    if (this.isSmall) {
      this.sizeClasses = this.moreInRow ? 'h-3 w-3' : 'h-4 w-4';
    }
  }

  ngOnChanges(): void {
    this.animateClass = this.isSelected ? 'animate-pulse' : '';
  }
}
