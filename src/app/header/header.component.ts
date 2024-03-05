import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'game-header',
    templateUrl: './header.component.html',
    standalone: true,
    imports: [RouterLink],
})
export class HeaderComponent {}
