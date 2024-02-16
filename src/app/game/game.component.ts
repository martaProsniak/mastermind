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
  modalStyleObject = {
    success: 'bg-gradient-to-r from-pink-700 to-amber-600 text-slate-300',
    fail: 'bg-gradient-to-r from-teal-700 to-blue-700 text-slate-300',
    inProgress: 'bg-slate-300 text-zinc-800',
    notStarted: 'bg-slate-300 text-zinc-800',
  };
  modalStyle = this.modalStyleObject.notStarted;
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
      this.modalStyle = this.modalStyleObject[this.gameStatus];
      if (this.gameStatus === 'success' || this.gameStatus === 'fail') {
        this.modalService.openModal();
      }
    });
  }
}
