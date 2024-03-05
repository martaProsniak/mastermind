import { Component } from '@angular/core';

@Component({
    selector: 'game-history',
    template: `
    <section class="space-y-3">
      <h3 class="text-xl accent text-sky-500">Invented over 50 years ago</h3>
      <article class="space-y-2">
        <p>
          The original game was created in 1970 by Mordecai Meirowitz*. The game
          was designed for two players. One player became the
          <em>codemaker</em>, the other one the <em>codebreaker</em>.
        </p>
        <p>
          The codebreaker tried to guess the pattern, in both order and color,
          within eight to twelve turns.
        </p>
      </article>
      <p class="mt-2">
        *Source:
        <a
          href="https://en.wikipedia.org/wiki/Mastermind_(board_game)"
          target="_blank"
          rel="noreferrer"
          class="hover:text-sky-500 transition-colors duration-150"
          >Wikipedia</a
        >
      </p>
    </section>
  `,
    standalone: true,
})
export class GameHistoryComponent {}
