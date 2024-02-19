import {Component, OnDestroy, OnInit} from '@angular/core';
import { GameService } from '../game.service';
import { GameModel, GameStatus } from '../game.model';
import { ColorModel } from '../color.model';
import {Subscription} from "rxjs";

@Component({
  selector: 'game-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit, OnDestroy {
  game: GameModel;
  rowsCount: number;
  rows: number[];
  hints: Array<Array<ColorModel>> = [];
  activeRowIndex: number;
  code: ColorModel[];
  gameStatus: GameStatus;
  boardWidth: string;
  canCheck: boolean = false;
  newGameStartSubscription: Subscription;
  turnChangedSubscription: Subscription;
  statusChangedSubscription: Subscription;
  canCheckChangedSubscription: Subscription;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.subscribeGameServiceObservables();
    this.renderBoard(this.gameService.getGame());
  }

  subscribeGameServiceObservables() {
    this.newGameStartSubscription = this.gameService.onNewGameStart.subscribe((game: GameModel) => {
      this.renderBoard(game);
    });
    this.turnChangedSubscription = this.gameService.onTurnChange.subscribe((game: GameModel) =>
      this.renderBoard(game)
    );
    this.statusChangedSubscription = this.gameService.onStatusChange.subscribe(({ status }) => {
      this.gameStatus = status;
    });
    this.canCheckChangedSubscription = this.gameService.onCanCheckChanged.subscribe((canCheck) => {
      this.canCheck = canCheck;
    });
  }

  unsubscribeGameServiceObservables() {
    this.newGameStartSubscription.unsubscribe();
    this.turnChangedSubscription.unsubscribe();
    this.statusChangedSubscription.unsubscribe();
    this.canCheckChangedSubscription.unsubscribe();
  }

  renderBoard(game: GameModel) {
    this.game = game;
    this.rowsCount = this.game.maxTurn;
    this.rows = Array.from(Array(this.rowsCount).keys());
    this.activeRowIndex = this.gameService.getActiveRowIndex();
    this.boardWidth = this.game.code.length === 4 ? 'w-[280px]' : 'w-[340px]';
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

  ngOnDestroy() {
    this.unsubscribeGameServiceObservables()
  }
}
