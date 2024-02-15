import { EventEmitter } from '@angular/core';
import { ColorModel } from './color.model';
import { GameModel } from './game.model';
import { NgTemplateOutlet } from '@angular/common';

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
  private code: ColorModel[];
  private codeLength: 4 | 5 = 4;
  selectedColor: ColorModel;
  onSelectedColorChange = new EventEmitter<ColorModel>();
  onNewGameStart = new EventEmitter<GameModel>();
  onTurnChange = new EventEmitter<GameModel>();

  getAvailableColors() {
    return this.availableColors;
  }

  getCode() {
    return this.game.code;
  }

  getGame() {
    return this.game;
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
    this.code = this.game.code;
    this.selectedColor = this.availableColors[0];
    this.onNewGameStart.emit(this.game);
    this.onSelectedColorChange.emit(this.selectedColor);
    console.log(this.game);
  }

  changeSelectedColor(color: ColorModel) {
    this.selectedColor = color;
    this.onSelectedColorChange.emit(this.selectedColor);
  }

  getActiveRowIndex() {
    return this.game.maxTurn - 1 - this.game.currentTurn;
  }

  finishGame() {
    this.game.gameInProgress = false;
    this.startNewGame();
  }

  getActiveRow() {
    return this.game.guesses[this.getActiveRowIndex()];
  }

  onColorGuess(index: number) {
    this.getActiveRow()[index] = this.selectedColor;
  }

  onCheck() {
    const activeRow = this.getActiveRow();

    const results = this.createHintsArray(activeRow);

    if (!results.filter((color) => color !== this.game.blackColor).length) {
      // **** WIN *****
      this.finishGame();
    } else {
      this.game.guesses[this.getActiveRowIndex()] = activeRow;
      this.game.hints[this.getActiveRowIndex()] = results;
      this.game.currentTurn++;
      console.log(this.game.currentTurn);
      console.log(this.game.maxTurn);

      this.onTurnChange.emit(this.game);
    }
  }

  createHintsArray(activeRow: ColorModel[]) {
    let clonedActiveRow = activeRow.slice();
    let clonedCode = this.code.slice();

    let blacks: ColorModel[] = [];
    let whites: ColorModel[] = [];
    let badGuesses: ColorModel[] = [];
    let currentColor: ColorModel;

    for (let i = 0; i < activeRow.length; i++) {
      currentColor = activeRow[i];
      if (this.code[i] === currentColor) {
        blacks.push(this.game.blackColor);
        clonedCode = clonedCode.filter((color, index) => index !== i);
        clonedActiveRow = clonedActiveRow.filter((color, index) => index !== i);
      } else {
        const isInCode = !!clonedCode.filter((c) => c === currentColor).length;
        if (!isInCode) {
          badGuesses.push(this.game.badGuessColor);
        } else {
          const occurenceInRemainingCode = clonedCode.filter(
            (c) => c === currentColor
          ).length;
          const occurenceInRemainingRow = clonedActiveRow.filter(
            (c) => c === currentColor
          ).length;
          if (occurenceInRemainingRow > occurenceInRemainingCode) {
            badGuesses.push(this.game.badGuessColor);
          } else whites.push(this.game.whiteColor);
        }
      }
    }
    return [...blacks, ...whites, ...badGuesses];
  }

  getHintColor(color: ColorModel, index: number) {
    if (color.id === this.code[index].id) {
      return this.game.blackColor;
    } else if (this.code.find((c) => c.id === color.id)) {
      return this.game.whiteColor;
    } else return this.game.badGuessColor;
  }
}
