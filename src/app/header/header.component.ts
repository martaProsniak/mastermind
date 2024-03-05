import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'game-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css', '../UI/ui-classes.css'],
    standalone: true,
    imports: [RouterLink],
})
export class HeaderComponent {}
