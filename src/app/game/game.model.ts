import { ColorModel } from './color.model';

export class GameModel {
  code: ColorModel[];
  guesses: Array<Array<ColorModel>> = [];
  hints: Array<Array<ColorModel>> = [];
  maxTurn: 9 = 9;
  gameInProgress = false;
  isWin = false;
  activeGuessRow: ColorModel[] = [];
  rowLength: number;
  currentTurn: number;
  emptyColor: ColorModel = new ColorModel('empty', '#64748b');
  badGuessColor: ColorModel = new ColorModel('bad-guess', '#94a3b8', 1);
  blackColor: ColorModel = new ColorModel('black', '#030712', 3);
  whiteColor: ColorModel = new ColorModel('white', '#f9fafb', 2);

  constructor(code: ColorModel[]) {
    this.code = code;
    this.gameInProgress = true;
    this.rowLength = code.length;
    this.currentTurn = 0;
    this.hints = this.createDotsMatrix();
    this.guesses = this.createDotsMatrix();
  }

  createDotsMatrix() {
    return Array.from(Array(this.maxTurn).keys()).map(() => {
      return Array.from(Array(this.rowLength).keys()).map(() => {
        return this.emptyColor;
      });
    });
  }
}
