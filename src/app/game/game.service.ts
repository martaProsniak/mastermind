import { ColorModel } from './color.model';
import { GameModel, GameStatus } from './game.model';
import {Subject} from "rxjs";

const colors: ColorModel[] = [
  new ColorModel('blue', '#1e25eb'),
  new ColorModel('sky', '#0ca9f2'),
  new ColorModel('green', '#25e310'),
  new ColorModel('red', '#e80707'),
  new ColorModel('pink', '#eb1ed3'),
  new ColorModel('orange', '#e86807'),
  new ColorModel('yellow', '#ebbe1e'),
  new ColorModel('cream', '#fff'),
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
  canCheck = false;
  selectedColor: ColorModel;
  onSelectedColorChange = new Subject<ColorModel>();
  onNewGameStart = new Subject<GameModel>();
  onTurnChange = new Subject<GameModel>();
  onStatusChange = new Subject<{ status: GameStatus; turn?: number }>();
  onCodeLengthChanged = new Subject<CodeLength>();
  onCanCheckChanged = new Subject<boolean>();

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

  getRandomIndex(max: number = 8) {
    return Math.floor(Math.random() * max);
  }

  changeCodeLength(newLength: CodeLength) {
    this.codeLength = newLength;
    this.onCodeLengthChanged.next(this.codeLength);
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
    this.canCheck = false;
    this.selectedColor = this.availableColors[this.availableColors.length - 1];
    this.onNewGameStart.next(this.game);
    this.onStatusChange.next({ status: this.game.gameStatus });
    this.onSelectedColorChange.next(this.selectedColor);
  }

  changeSelectedColor(color: ColorModel) {
    this.selectedColor = color;
    this.onSelectedColorChange.next(this.selectedColor);
  }

  getActiveRowIndex() {
    return this.game.maxTurn - 1 - this.game.currentTurn;
  }

  finishGame(isWin: boolean) {
    this.game.gameStatus = isWin ? 'success' : 'fail';

    this.onStatusChange.next({
      status: this.game.gameStatus,
      turn: this.game.currentTurn,
    });
  }

  getActiveRow() {
    return this.game.guesses[this.getActiveRowIndex()];
  }

  onColorGuess(index: number) {
    this.getActiveRow()[index] = this.selectedColor;
    this.canCheck = true;
    this.onCanCheckChanged.next(this.canCheck);
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
      this.canCheck = false;
      this.onTurnChange.next(this.game);
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
