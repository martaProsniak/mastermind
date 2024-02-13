import { ColorModel } from '../color.model';
import { GameService } from './../game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'color-code',
  templateUrl: './color-code.component.html',
  styleUrl: './color-code.component.css',
})
export class ColorCodeComponent implements OnInit {
  code: ColorModel[] = [];
  showCode = false;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.code = this.gameService.getCode();
  }
}
