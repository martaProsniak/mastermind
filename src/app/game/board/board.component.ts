import { Component, OnChanges, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { GameModel } from '../game.model';
import { ColorModel } from '../color.model';

@Component({
  selector: 'game-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {
  game: GameModel;
  rowsCount: number = 9;
  rows: number[];
  hints: Array<Array<ColorModel>> = [];
  guesses: Array<Array<ColorModel>> = [];
  activeRowIndex: number = 8;
  code: ColorModel[];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.onNewGameStart.subscribe(() => {
      this.redrawBoard();
    });
    this.gameService.onTurnChange.subscribe(() => this.redrawBoard());
    this.gameService.startNewGame();
  }

  redrawBoard() {
    this.game = this.gameService.getGame();
    this.rows = Array.from(Array(this.rowsCount).keys());
    this.hints = this.gameService.getHints();
    this.guesses = this.gameService.getGuesses();
    this.activeRowIndex = this.gameService.getActiveRowIndex();
    this.code = this.gameService.getCode();
    console.log(this.game);
    console.log(this.activeRowIndex);
  }

  onColorGuess = (index: number) => {
    this.gameService.onColorGuess(index);
  };

  onCheck() {
    this.gameService.onCheck();
  }
}
