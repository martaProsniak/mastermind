import { ConfettiService } from '../confetti.service';
import { ModalService } from '../UI/modal/modal.service';
import { GameStatus } from './game.model';
import { GameService } from './game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit {
  gameStatus: GameStatus;
  turn: number;
  codeLength: number;

  constructor(
    private gameService: GameService,
    private modalService: ModalService,
    private confettiService: ConfettiService
  ) {}

  ngOnInit(): void {
    if (!this.gameService.getGame()) {
      this.gameService.startNewGame();
    }

    this.codeLength = this.gameService.getCode().length;
    console.log(this.codeLength);

    this.gameService.onCodeLengthChanged.subscribe((codeLength) => {
      this.codeLength = codeLength;
      console.log(codeLength);
    });
    this.gameService.onStatusChange.subscribe(({ status, turn }) => {
      this.gameStatus = status;
      this.turn = turn;
      if (this.gameStatus === 'success' || this.gameStatus === 'fail') {
        this.modalService.openModal();
      }
      if (this.gameStatus === 'success') {
        this.confettiService.startConfetti();
      }
    });
  }
}
