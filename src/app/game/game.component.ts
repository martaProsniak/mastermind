import { ConfettiService } from '../confetti.service';
import { ModalService } from '../modal/modal.service';
import { GameStatus } from './game.model';
import { GameService } from './game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit {
  modalStyleObject = {
    success:
      'bg-gradient-to-r from-red-300 from-10% via-pink-300 via-40% to-violet-300',
    fail: 'bg-gradient-to-r from-emerald-200 to-sky-300',
    inProgress: 'bg-slate-300 text-zinc-800',
    notStarted: 'bg-slate-300 text-zinc-800',
  };
  modalStyle = this.modalStyleObject.notStarted;
  gameStatus: GameStatus;
  turn: number;

  constructor(
    private gameService: GameService,
    private modalService: ModalService,
    private confettiService: ConfettiService
  ) {}

  ngOnInit(): void {
    this.gameService.onStatusChange.subscribe(({ status, turn }) => {
      this.gameStatus = status;
      this.turn = turn;
      this.modalStyle = this.modalStyleObject[this.gameStatus];
      if (this.gameStatus === 'success' || this.gameStatus === 'fail') {
        this.modalService.openModal();
      }
      if (this.gameStatus === 'success') {
        this.confettiService.startConfetti();
      }
    });
  }
}
