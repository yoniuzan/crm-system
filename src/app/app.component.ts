import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterLinkWithHref, RouterOutlet, CommonModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],

})
export class AppComponent {
    title = 'crm-system';
}
