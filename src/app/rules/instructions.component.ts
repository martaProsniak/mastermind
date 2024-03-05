import { Component } from '@angular/core';

@Component({
    selector: 'rules-instructions',
    template: `
    <section class="space-y-3">
      <h3 class="text-xl text-green-500">Board</h3>
      <article class="space-y-2">
        <p>
          The game board consists of 10 rows, in which you can place your
          guesses. The console with available colors is placed on the left side
          of the board. One color blinks - it means that this color is currently
          selected. You can change selected color by clicking on chosen color in
          the console.
        </p>
        <p>
          Click on any of the empty circles in active row to place chosen color.
          To confirm your guess, click on the 'check' button. You can perform
          check only if at least one color was placed in the row.
        </p>
      </article>
    </section>
  `,
    standalone: true,
})
export class InstructionsComponent {}
