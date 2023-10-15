import { CustomPreloadingService } from './app/services/common/custom-preloading.service';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withPreloading } from '@angular/router';
import { routes } from './app/routes';
import { provideHttpClient, withXsrfConfiguration, withJsonpSupport } from '@angular/common/http';
import './app/utils/global';
import './app/utils/extensions/string-extension';
import './app/utils/extensions/date-extension';
import './app/utils/extensions/array-extension';
import './app/utils/extensions/promise-extension';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes, withPreloading(CustomPreloadingService)),
        provideHttpClient(withXsrfConfiguration({ cookieName: '', headerName: '' }), withJsonpSupport()),
        importProvidersFrom(BrowserAnimationsModule, MatDialogModule)
    ]
});
