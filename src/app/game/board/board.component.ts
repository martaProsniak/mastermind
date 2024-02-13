import { Component } from '@angular/core';
import { GameService } from '../game.service';
import { GameModel } from '../game.model';

@Component({
  selector: 'game-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  game: GameModel;

  constructor(private gameService: GameService) { };

  
}
