import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { ColorModel } from '../color.model';

@Component({
  selector: 'available-colors',
  templateUrl: './available-colors.component.html',
  styleUrl: './available-colors.component.css',
})
export class AvailableColorsComponent implements OnInit {
  colors: ColorModel[];
  selectedColor: ColorModel;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.colors = this.gameService.getAvailableColors();
    this.selectedColor = this.gameService.selectedColor;
    this.gameService.onSelectedColorChange.subscribe((color) => {
      this.selectedColor = color;
    });
  }

  onColorClick = (color: ColorModel) => {
    this.gameService.changeSelectedColor(color);
  };
}
