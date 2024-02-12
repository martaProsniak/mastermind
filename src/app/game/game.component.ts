import { GameService } from './game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  constructor(private gameService: GameService) { };

  ngOnInit(): void {
    this.gameService.startNewGame();
  }
}
