import { Component } from '@angular/core';

@Component({
  selector: 'rules-hints',
  template: `
    <section class="space-y-3">
      <h3 class="text-xl">Hints</h3>
      <article class="space-y-2">
        <p>
          After click, the smaller circles with hints will appear. Here's their
          color coding:
        </p>
        <ul class="">
          <li>Black - color is in sequence in the same position</li>
          <li>White - color is in sequence, but on the other position</li>
          <li>Grey - the sequence doesn't include this color</li>
        </ul>
        <p>
          After displaying turn results, the next row on the board becomes
          active. Adjust your next guess based on the hints.
        </p>
      </article>
    </section>
  `,
})
export class HintsComponent {}
