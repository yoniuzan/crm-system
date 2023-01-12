import { AppComponent } from './../../../app.component';
export class Constants {

    public static Cookies = {
        Language: 'lang',
        SessionToken: 'session-token',
        AppParams: {
            AppData: 'app-data',
            Country: 'country',
        }
    };

    public static Routes = {
        AppComponent: 'app-component',
        Login: 'login',
        Home: 'home',
        Dashboard: 'dashboard',
        Users: 'users',
        Customers: 'customers'
    };
}