import { Component, Input, OnInit } from '@angular/core';
import { ColorModel } from '../color.model';

@Component({
  selector: 'color-dot',
  templateUrl: './color-dot.component.html',
  styleUrl: './color-dot.component.css',
})
export class ColorDotComponent implements OnInit {
  @Input() color: ColorModel;
  defaultColorClass: string = 'bg-inherit';
  colorClass = this.defaultColorClass;

  ngOnInit(): void {
    this.colorClass = this.color.colorClass;
  }
}
