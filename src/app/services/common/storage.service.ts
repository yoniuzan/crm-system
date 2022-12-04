import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    public async set(key: string, data: string) {
        localStorage.setItem(key, data);
    }

    public get(key: string): string | null {
        return localStorage.getItem(key);
    }

}
