import { Component, OnChanges, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { GameModel, GameStatus } from '../game.model';
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
  gameStatus: GameStatus;
  boardWidth: string;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.onNewGameStart.subscribe((game: GameModel) => {
      this.redrawBoard(game);
    });
    this.gameService.onTurnChange.subscribe((game: GameModel) =>
      this.redrawBoard(game)
    );
    this.gameService.onStatusChange.subscribe((status) => {
      this.gameStatus = status;
      if (status === 'success') {
        confirm('You won!');
      }
      if (status === 'fail') {
        confirm('You loose!');
      }
    });
    this.gameService.startNewGame();
  }

  redrawBoard(game: GameModel) {
    this.game = game;
    this.rows = Array.from(Array(this.rowsCount).keys());
    this.activeRowIndex = this.gameService.getActiveRowIndex();
    this.boardWidth = this.game.code.length === 4 ? '320px' : '340px';
  }

  onColorGuess = (index: number) => {
    if (this.game.gameStatus === 'inProgress') {
      this.gameService.onColorGuess(index);
    }
  };

  onCheck() {
    if (this.game.gameStatus === 'inProgress') {
      this.gameService.onCheck();
    }
  }
}
