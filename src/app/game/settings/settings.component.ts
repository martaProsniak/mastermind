import { Component, OnInit } from '@angular/core';
import { CodeLength, GameService } from '../game.service';

@Component({
  selector: 'game-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css', '../../UI/ui-classes.css'],
})
export class SettingsComponent implements OnInit {
  codeLengthOptions: CodeLength[] = [4, 5];
  currentCodeLength: CodeLength;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.currentCodeLength = this.gameService.getSettings().codeLength;
  }

  onStartNewGame() {
    this.gameService.startNewGame();
  }

  onCodeLengthChange() {
    this.gameService.changeCodeLength(this.currentCodeLength);
  }
}
