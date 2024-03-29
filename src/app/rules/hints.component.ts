import { Component } from '@angular/core';

@Component({
    selector: 'rules-hints',
    template: `
    <section class="space-y-3">
      <h3 class="text-xl text-green-500">Hints</h3>
      <article class="space-y-2">
        <p>
          After click, the smaller circles with hints will appear. Here's their
          color coding:
        </p>
        <ul class="pl-2">
          <li>&#x2022; Black - color is in sequence in the same position</li>
          <li>
            &#x2022; White - color is in sequence, but on the other position
          </li>
          <li>&#x2022; Gray - the sequence doesn't include this color</li>
        </ul>
        <p>
          After displaying turn results, the next row on the board becomes
          active. Adjust your next guess based on the hints.
        </p>
      </article>
    </section>
  `,
    standalone: true,
})
export class HintsComponent {}
