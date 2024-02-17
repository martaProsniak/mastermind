import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationStart,
  RouterEvent,
  RouteConfigLoadStart,
} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  url: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        this.url = event['url'];
      });
  }
}
