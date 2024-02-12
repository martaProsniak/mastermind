import { ColorModel } from './color.model';
import { GameModel } from './game.model';

const colorClasses = [
  'pink-500',
  'blue-600',
  'yellow-400',
  'lime-400',
  'orange-600',
  'green-600',
  'violet-700',
  'cyan-400',
];

export class GameService {
  private game: GameModel;
  private availableColors: ColorModel[] = colorClasses.map((color) => {
    return {
      id: color.split('-')[0],
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
}
