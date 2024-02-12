import { ColorModel } from './color.model';
import { GameModel } from './game.model';

const colorClasses = [
  'bg-pink-500',
  'bg-blue-600',
  'bg-yellow-400',
  'bg-lime-400',
  'bg-orange-600',
  'bg-green-600',
  'bg-violet-700',
  'bg-cyan-400',
];

export class GameService {
  private game: GameModel;
  private availableColors: ColorModel[] = colorClasses.map((color) => {
    return {
      id: color.split('-')[1],
      colorClass: color,
    };
  });
  private codeLength: 4 | 5 = 4;

  getAvailableColors() {
    return this.availableColors.slice();
  }

  getCode() {
    return this.game.code.slice();
  }

  getRandomIndex(max: number = 8) {
    return Math.floor(Math.random() * max);
  }

  generateCode() {
    const code: ColorModel[] = [];
    for (let i = 0; i < this.codeLength; i++) {
      code.push(this.availableColors[this.getRandomIndex(8)]);
    }
    return code;
  }

  startNewGame() {
    this.game = new GameModel(this.generateCode());
    console.log(this.game.code);
  }

  finishGame() {
    this.game.gameInProgress = false;
  }
}
