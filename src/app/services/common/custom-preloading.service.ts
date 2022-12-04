import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CustomPreloading } from '../../crm-common/constants/customPreloading';

declare const navigator: any; // getting navigator object from the browser

@Injectable({
    providedIn: 'root'
})

export class CustomPreloadingService {

    constructor() { }

    // Function that run for each module

    // Motivation:
    // 1) We want to decide which modules we want to run in the background and which ones we don't
    // 2) If a user connects with weak internet, we don't want to do preloading at all
    public preload(route: Route, load: () => Observable<any>): Observable<any> {
        
        if (route.data && route.data['preload'] === false)
            return of(null);

        const connection = navigator?.connection;
        if(connection) {
            const networkSpeed = connection.effectiveType;
            if(CustomPreloading.NavigatorConnection.slowConnection.includes(networkSpeed))
                return of(null);
        }

        return load();
    }
}

// Explanation:
// 23-24 : If it doesn't exist on the root preload we will create an observable with null,
// this means we can mark which module we want to load and which not
