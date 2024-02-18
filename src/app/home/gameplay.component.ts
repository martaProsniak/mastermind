import { Component } from '@angular/core';

@Component({
  selector: 'game-gameplay',
  template: `
    <section class="space-y-3">
      <h3 class="text-xl accent text-sky-500">Fit in the limit</h3>
      <article class="space-y-2">
        <p>
          You have eight colors to choose from and ten turns to figure out the
          right code. After each turn, you'll be provided with a feedback -
          based on this, you can adjust your answer.
        </p>
      </article>
    </section>
  `,
})
export class GameplayComponent {}
