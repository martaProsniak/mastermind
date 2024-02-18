import { Component } from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrl: '../UI/ui-classes.css',
})
export class HomeComponent {
  routes: string[] = ['gameplay', 'history'];
}
