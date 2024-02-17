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
  rowsCount: number;
  rows: number[];
  hints: Array<Array<ColorModel>> = [];
  guesses: Array<Array<ColorModel>> = [];
  activeRowIndex: number;
  rowBgClass: string;
  code: ColorModel[];
  gameStatus: GameStatus;
  boardWidth: string;
  canCheck: boolean = false;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.onNewGameStart.subscribe((game: GameModel) => {
      this.renderBoard(game);
    });
    this.gameService.onTurnChange.subscribe((game: GameModel) =>
      this.renderBoard(game)
    );
    this.gameService.onStatusChange.subscribe(({ status }) => {
      this.gameStatus = status;
    });
    this.gameService.onCanCheckChanged.subscribe((canCheck) => {
      this.canCheck = canCheck;
    });
    this.renderBoard(this.gameService.getGame());
  }

  renderBoard(game: GameModel) {
    this.game = game;
    this.rowsCount = this.game.maxTurn;
    this.rows = Array.from(Array(this.rowsCount).keys());
    this.activeRowIndex = this.gameService.getActiveRowIndex();
    this.boardWidth = this.game.code.length === 4 ? '280px' : '340px';
    this.canCheck = this.gameService.canCheck;
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
