import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, RouterLinkActive, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SettingsComponent } from '../game/settings/settings.component';
import { NgIf } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'app-nav',
    templateUrl: './navigation.component.html',
    standalone: true,
    imports: [
        HeaderComponent,
        RouterLinkActive,
        RouterLink,
        NgIf,
        SettingsComponent,
    ],
})
export class NavigationComponent implements OnInit {
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
