import { Routes } from '@angular/router';
import { Constants } from './crm-common/constants/languages/contstans';

export const routes: Routes = [
    {
        path: '', redirectTo: Constants.Routes.Login, pathMatch: 'full', data: { hidden: false }
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
        path: Constants.Routes.Users,
        loadComponent: () => import('./components/users/users.component').then((m) => m.UsersComponent),
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

