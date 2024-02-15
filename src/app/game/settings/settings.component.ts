import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'game-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  constructor(private gameService: GameService) {}

  ngOnInit(): void {

  }

  onStartNewGame() {
    this.gameService.startNewGame();
  }
}
