import { ColorModel } from '../color.model';
import { GameService } from '../game.service';
import { Component, Input, OnInit } from '@angular/core';
import { ColorDotComponent } from '../color-dot/color-dot.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'color-code',
    templateUrl: './color-code.component.html',
    standalone: true,
    imports: [NgFor, ColorDotComponent],
})
export class ColorCodeComponent implements OnInit {
  @Input() code: ColorModel[] = [];
  @Input() showCode: boolean;
  defaultColor: ColorModel;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.defaultColor = this.gameService.getGame().emptyColor;
  }
}
