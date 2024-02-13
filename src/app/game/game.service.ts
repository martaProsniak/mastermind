import { EventEmitter } from '@angular/core';
import { ColorModel } from './color.model';
import { GameModel } from './game.model';

const colors: ColorModel[] = [
  new ColorModel('pink', 'hotpink'),
  new ColorModel('blue', 'dodgerblue'),
  new ColorModel('green', 'lightgreen'),
  new ColorModel('red', 'lightcoral'),
  new ColorModel('purple', 'rebeccapurple'),
  new ColorModel('yellow', 'gold'),
  new ColorModel('cream', 'linen'),
  new ColorModel('sea', 'lightseagreen'),
];

export class GameService {
  private game: GameModel;
  private availableColors: ColorModel[] = colors;
  private codeLength: 4 | 5 = 4;
  selectedColor: ColorModel;
  onSelectedColorChange = new EventEmitter<ColorModel>();
  onNewGameStart = new EventEmitter<GameModel>();

  getAvailableColors() {
    return this.availableColors;
  }

  getCode() {
    return this.game.code;
  }

  getGame() {
    return this.game;
  }

  getHints() {
    return this.game.hints;
  }

  getGuesses() {
    return this.game.guesses;
  }

  getCurrentTurn() {
    return this.game.currentTurn;
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
    // this.onSelectedColorChange.emit(this.selectedColor);
    this.onNewGameStart.emit(this.game);
    console.log(this.game);
  }

  changeSelectedColor(color: ColorModel) {
    this.selectedColor = color;
    this.onSelectedColorChange.emit(this.selectedColor);
  }

  finishGame() {
    this.game.gameInProgress = false;
    this.startNewGame();
  }

  getActiveRow() {
    return this.game.guesses[this.game.maxTurn - 1];
  }

  onColorGuess(index: number) {
    this.getActiveRow()[index] = this.selectedColor;
  }

  onCheck() {
    console.log(this.getCode());
    console.log(this.getActiveRow());
    console.log(this.getCode() === this.getActiveRow());
    const activeRow = this.getActiveRow();
    const results = this.getCode().map((color, index) => {
      return color.id === activeRow[index].id;
    });
    console.log(results);
    if (!results.includes(false)) {
      console.log('Win');
      this.finishGame();
    }
  }
}
