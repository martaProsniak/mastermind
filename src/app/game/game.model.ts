import { ColorModel } from './color.model';

export class GameModel {
  code: ColorModel[];
  guesses: Array<Array<ColorModel>>;
  hints: Array<Array<ColorModel>>;
  maxTurn: 9;
  gameInProgress = false;
  isWin = false;

  constructor(code: ColorModel[]) {
    this.code = code;
    this.guesses = [];
    this.hints = [];
    this.gameInProgress = true;
  }
}
