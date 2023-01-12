import { SettingsComponent } from './components/settings/settings.component';
import { Routes } from '@angular/router';
import { Constants } from './crm-common/constants/languages/contstans';

export const routes: Routes = [
    {
        path: '', redirectTo: Constants.Routes.AppComponent, pathMatch: 'full', data: { hidden: false }
    },
    {
        path: Constants.Routes.Login,
        loadComponent: () => import('./components/login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: Constants.Routes.Home,
        loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent),
    },
    {
        path: Constants.Routes.Dashboard,
        loadComponent: () => import('./components/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    },
    {
        path: Constants.Routes.Customers,
        loadComponent: () => import('./components/customers/customers.component').then((m) => m.CustomersComponent),
    },
    {
        path: Constants.Routes.Settings,
        loadComponent: () => import('./components/settings/settings.component').then((m) => m.SettingsComponent),
    },
];

// הינו אובייקט המשמש לטעינה ברקע של שאר המודולים PreloadAllModules
// בשביל הבסט פרקטיס אנו ניצור את customPreloadingService 
// @NgModule({
//     imports: [RouterModule.forRoot(routes, {
//         preloadingStrategy: CustomPreloadingService
//     })],
//     exports: [RouterModule],
// })
// export class AppRoutingModule { }

