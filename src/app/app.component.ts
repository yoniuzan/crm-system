import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { InitAppComponent } from './components/init-app/init-app.component';
import { LoginComponent } from './components/login/login.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterLinkWithHref, RouterOutlet, CommonModule, LoginComponent, InitAppComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],

})
export class AppComponent {
    title = 'crm-system';

    public _isAuthenticated: boolean;

    // TODO add auth service and check if user is already authenticated!!!
    constructor() {
        this._isAuthenticated = true;
    }

    isAuth(isAuth?: any) {
        console.log(isAuth);
        // if (isAuth) {
        //     this.user = this.authService.getUser()
        // }
    }

    onLogout(): void {
        this._isAuthenticated = false;
    }

    // isAuth(isAuth?: any) {
    //     if (isAuth) {
    //         this.user = this.authService.getUser()
    //         // this.user = JSON.parse(localStorage.getItem(APP_USER_PROFILE)) || <User>{};
    //     }
    // }
}
