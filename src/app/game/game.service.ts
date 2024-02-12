import { EventEmitter } from '@angular/core';
import { ColorModel } from './color.model';
import { GameModel } from './game.model';

const colorClasses = [
  'bg-pink-400',
  'bg-blue-600',
  'bg-yellow-400',
  'bg-lime-400',
  'bg-orange-600',
  'bg-green-600',
  'bg-violet-600',
  'bg-cyan-400',
];

export class GameService {
  private game: GameModel;
  private availableColors: ColorModel[] = colorClasses.map((color) => {
    return {
      id: color.split('-')[1],
      colorClass: color,
    };
  });
  private codeLength: 4 | 5 = 4;
  selectedColor: ColorModel;
  onSelectedColorChange = new EventEmitter<ColorModel>();

  getAvailableColors() {
    return this.availableColors.slice();
  }

  getCode() {
    return this.game.code.slice();
  }

  getRandomIndex(max: number = 8) {
    return Math.floor(Math.random() * max);
  }

  generateCode() {
    const code: ColorModel[] = [];
    for (let i = 0; i < this.codeLength; i++) {
      code.push(this.availableColors[this.getRandomIndex(8)]);
    }
    return code;
  }

  startNewGame() {
    this.game = new GameModel(this.generateCode());
    this.selectedColor = this.availableColors[0];
    this.onSelectedColorChange.emit(this.selectedColor);
  }

  changeSelectedColor(color: ColorModel) {
    this.selectedColor = color;
    this.onSelectedColorChange.emit(this.selectedColor);
  }

  finishGame() {
    this.game.gameInProgress = false;
  }
}
