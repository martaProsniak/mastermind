import {Component, OnDestroy, OnInit} from '@angular/core';
import { GameService } from '../game.service';
import { ColorModel } from '../color.model';
import {Subscription} from "rxjs";
import { ColorDotComponent } from '../color-dot/color-dot.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'available-colors',
    templateUrl: './available-colors.component.html',
    standalone: true,
    imports: [NgFor, ColorDotComponent],
})
export class AvailableColorsComponent implements OnInit, OnDestroy {
  colors: ColorModel[];
  selectedColor: ColorModel;
  selectedColorChangedSubscription: Subscription;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.colors = this.gameService.getAvailableColors();
    this.selectedColor = this.gameService.selectedColor;
    this.selectedColorChangedSubscription = this.gameService.onSelectedColorChange.subscribe((color) => {
      this.selectedColor = color;
    });
  }

  onColorClick = (color: ColorModel) => {
    this.gameService.changeSelectedColor(color);
  };

  ngOnDestroy() {
    this.selectedColorChangedSubscription.unsubscribe();
  }
}
