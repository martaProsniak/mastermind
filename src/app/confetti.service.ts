import { Injectable } from '@angular/core';
import JSConfetti from 'js-confetti';

@Injectable()
export class ConfettiService {
  confetti: any;

  constructor() {
    this.confetti = new JSConfetti();
  }

  startConfetti() {
    this.confetti.addConfetti();
  }

  clear() {
    this.confetti.clearCanvas();
  }
}
