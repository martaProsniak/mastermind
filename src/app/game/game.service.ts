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

interface GuessResult {
  isWellPlaced: boolean;
  isInCode: boolean;
}

export class GameService {
  private game: GameModel;
  private availableColors: ColorModel[] = colors;
  private codeLength: 4 | 5 = 4;
  selectedColor: ColorModel;
  onSelectedColorChange = new EventEmitter<ColorModel>();
  onNewGameStart = new EventEmitter<undefined>();
  onTurnChange = new EventEmitter<undefined>();

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
    this.onNewGameStart.emit();
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
    const code = this.getCode();
    const results: GuessResult[] = activeRow.map((color, index) => {
      return {
        isWellPlaced: color.id === code[index].id,
        isInCode: !!code.find((c) => c.id === color.id),
      };
    });
    console.log(results);

    if (!results.find((result) => result.isWellPlaced === false)) {
      // **** WIN *****
      this.finishGame();
    } else {
      this.getGuesses()[this.getActiveRowIndex()] = activeRow;
      this.getHints()[this.getActiveRowIndex()] =
        this.mapGuessResultToHints(results);
      this.game.currentTurn++;
      this.onTurnChange.emit();
    }
  }

  mapGuessResultToHints(guessResult: GuessResult[]): ColorModel[] {
    return guessResult
      .map((guess) => {
        if (guess.isInCode && !guess.isWellPlaced) {
          return {
            id: 'white',
            color: 'white',
          };
        } else if (guess.isWellPlaced) {
          return {
            id: 'black',
            color: 'black',
          };
        } else return this.game.emptyColor;
      })
      .sort((color) => {
        if (color.id === 'black') return -1;
        if (color.id === 'white') {
          return -1;
        } else return 1;
      });
  }
}
