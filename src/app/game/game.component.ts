import { ModalService } from '../modal/modal.service';
import { GameModel, GameStatus } from './game.model';
import { GameService } from './game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit {
  modalContent: string = 'Siema modal!';
  gameStatus: GameStatus;
  turn: number;
  constructor(
    private gameService: GameService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.gameService.onStatusChange.subscribe(({ status, turn }) => {
      this.gameStatus = status;
      this.turn = turn;
      if (this.gameStatus === 'success' || this.gameStatus === 'fail') {
        this.modalService.openModal();
      }
    });
  }
}
