import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
    selector: 'home-page',
    templateUrl: './home.component.html',
    styleUrl: '../UI/ui-classes.css',
    standalone: true,
    imports: [
        NgFor,
        RouterLinkActive,
        RouterLink,
        RouterOutlet,
    ],
})
export class HomeComponent {
  routes: string[] = ['gameplay', 'history'];
}
