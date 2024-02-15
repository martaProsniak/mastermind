import { EventEmitter } from '@angular/core';
import { ColorModel } from './color.model';
import { GameModel, GameStatus } from './game.model';
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
  onStatusChange = new EventEmitter<GameStatus>();

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
    this.onStatusChange.emit(this.game.gameStatus);
    this.onSelectedColorChange.emit(this.selectedColor);
  }

  changeSelectedColor(color: ColorModel) {
    this.selectedColor = color;
    this.onSelectedColorChange.emit(this.selectedColor);
  }

  getActiveRowIndex() {
    return this.game.maxTurn - 1 - this.game.currentTurn;
  }

  finishGame(isWin: boolean) {
    this.game.gameStatus = isWin ? 'success' : 'fail';
    this.onStatusChange.emit(this.game.gameStatus);
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
      this.finishGame(true);
    } else {
      this.game.guesses[this.getActiveRowIndex()] = activeRow;
      this.game.hints[this.getActiveRowIndex()] = results;
      this.game.currentTurn++;
      if (this.game.currentTurn === this.game.maxTurn) {
        this.finishGame(false);
        return;
      }
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
          const possibleHits = clonedCode.filter(
            (c) => c === currentColor
          ).length;
          const remainingInRow = clonedActiveRow.filter(
            (c) => c === currentColor
          ).length;
          if (remainingInRow > possibleHits) {
            badGuesses.push(this.game.badGuessColor);
          } else whites.push(this.game.whiteColor);
        }
      }
    }
    return [...blacks, ...whites, ...badGuesses];
  }
}
