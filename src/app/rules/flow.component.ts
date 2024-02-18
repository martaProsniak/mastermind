import { Component } from '@angular/core';

@Component({
  selector: 'rules-flow',
  template: `
    <section class="space-y-4">
      <h3 class="text-xl accent accent-orange accent-top">Game flow</h3>
      <article>
        <p>
          You have ten tur to guess the sequence. Try different colors, observe
          your hints, adjust, retry. The game will finish as soon as you guess
          the sequence correctly. Try to fit in turn limit!
        </p>
      </article>
    </section>
  `,
})
export class FlowComponent {}
