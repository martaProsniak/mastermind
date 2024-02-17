import { ColorModel } from './color.model';

export type GameStatus = 'success' | 'fail' | 'notStarted' | 'inProgress';

export class GameModel {
  code: ColorModel[];
  guesses: Array<Array<ColorModel>> = [];
  hints: Array<Array<ColorModel>> = [];
  maxTurn = 10;
  gameStatus: GameStatus = 'notStarted';
  activeGuessRow: ColorModel[] = [];
  rowLength: number;
  currentTurn: number;
  emptyColor: ColorModel = new ColorModel('empty', '#a1a1aa');
  badGuessColor: ColorModel = new ColorModel('bad-guess', '#71717a');
  blackColor: ColorModel = new ColorModel('black', '#030712');
  whiteColor: ColorModel = new ColorModel('white', '#f9fafb');

  constructor(code: ColorModel[]) {
    this.code = code;
    this.gameStatus = 'inProgress';
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
