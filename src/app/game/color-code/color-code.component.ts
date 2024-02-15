import { ColorModel } from '../color.model';
import { GameService } from '../game.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'color-code',
  templateUrl: './color-code.component.html',
  styleUrl: './color-code.component.css',
})
export class ColorCodeComponent implements OnInit {
  @Input() code: ColorModel[] = [];
  @Input() showCode: boolean;
  defaultColor: ColorModel;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.defaultColor = this.gameService.getGame().emptyColor;
  }
}
