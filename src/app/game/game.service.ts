import { EventEmitter } from '@angular/core';
import { ColorModel } from './color.model';
import { GameModel, GameStatus } from './game.model';

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

interface GameSettings {
  codeLength: CodeLength;
}

export type CodeLength = 4 | 5;

export class GameService {
  private game: GameModel;
  private availableColors: ColorModel[] = colors;
  private code: ColorModel[];
  private codeLength: CodeLength = 4;
  selectedColor: ColorModel;
  onSelectedColorChange = new EventEmitter<ColorModel>();
  onNewGameStart = new EventEmitter<GameModel>();
  onTurnChange = new EventEmitter<GameModel>();
  onStatusChange = new EventEmitter<{ status: GameStatus; turn?: number }>();
  onCodeLengthChanged = new EventEmitter<CodeLength>();

  getSettings(): GameSettings {
    return {
      codeLength: this.codeLength,
    };
  }

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

  changeCodeLength(newLength: CodeLength) {
    this.codeLength = newLength;
    this.onCodeLengthChanged.emit(this.codeLength);
    this.startNewGame();
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
    this.onStatusChange.emit({ status: this.game.gameStatus });
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
    console.log(this.game.currentTurn);

    this.onStatusChange.emit({ status: this.game.gameStatus, turn: this.game.currentTurn });
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
      this.game.hints[this.getActiveRowIndex()] = results;
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
    let copiedCode = this.code.slice();
    let possibleHits: ColorModel[] = [];

    let blacks: ColorModel[] = [];
    let whites: ColorModel[] = [];
    let badGuesses: ColorModel[] = [];

    activeRow.forEach((currentColor, i) => {
      if (this.code[i] === currentColor) {
        blacks.push(this.game.blackColor);
        const indexToRemove = copiedCode.findIndex((c) => c === currentColor);
        copiedCode = copiedCode.filter((_c, index) => index !== indexToRemove);
      } else possibleHits.push(currentColor);
    });

    possibleHits.forEach((color) => {
      const colorFromCode = copiedCode.some((c) => c === color);
      if (colorFromCode) {
        whites.push(this.game.whiteColor);
        const index = copiedCode.findIndex((c) => c === color);
        copiedCode = copiedCode.filter((_c, i) => index !== i);
      } else {
        badGuesses.push(this.game.badGuessColor);
      }
    });

    return [...blacks, ...whites, ...badGuesses];
  }
}
