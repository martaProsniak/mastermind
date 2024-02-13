import { ColorModel } from '../color.model';
import { GameService } from '../game.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'color-code',
  templateUrl: './color-code.component.html',
  styleUrl: './color-code.component.css',
})
export class ColorCodeComponent {
  @Input() code: ColorModel[] = [];
  showCode = true;

  constructor(private gameService: GameService) {}

}
