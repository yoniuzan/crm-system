import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent),
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    },
    {
        path: 'users',
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

