import { CustomPreloadingService } from './app/services/common/custom-preloading.service';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withPreloading } from '@angular/router';
import { routes } from './app/routes';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes, withPreloading(CustomPreloadingService))
    ]
})

