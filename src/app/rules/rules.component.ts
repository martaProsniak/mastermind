import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
    selector: 'game-rules',
    templateUrl: './rules.component.html',
    standalone: true,
    imports: [
        NgFor,
        RouterLinkActive,
        RouterLink,
        RouterOutlet,
    ],
})
export class RulesComponent {
  routes: string[] = ['board', 'hints', 'flow'];
}
