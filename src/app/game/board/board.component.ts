import { Component, OnInit } from '@angular/core';
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
  currentTurn: number = 0;
  code: ColorModel[];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.onNewGameStart.subscribe((game) => {
      this.game = this.gameService.getGame();
      this.rows = Array.from(Array(this.rowsCount).keys());
      this.hints = this.gameService.getHints();
      this.guesses = this.gameService.getGuesses();
      this.currentTurn = this.gameService.getCurrentTurn();
      this.code = this.gameService.getCode();
    });
    this.gameService.startNewGame();
  }

  onColorGuess = (index: number) => {
    this.gameService.onColorGuess(index);
  };

  onCheck() {
    this.gameService.onCheck();
  }
}
