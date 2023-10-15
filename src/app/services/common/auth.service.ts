// auth.service.ts

import { Injectable } from '@angular/core';
import { users } from '../../mock-data/authMockData';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private _isSuccessLogin: Subject<boolean>;

    /**
     *
     */
    constructor() {
        this._isSuccessLogin = new Subject<boolean>();
    }

    public getIsSuccessLogin(): Observable<boolean> {
        return this._isSuccessLogin.asObservable();
    }

    private onLogin(status: boolean): void {
        return this._isSuccessLogin.next(status);
    }

    public login(username: string, password: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const user = users.find((u) => u.username === username && u.password === password);
            setTimeout(() => {
                if (user) {
                    this.onLogin(true);
                    resolve(true); // Authentication successful
                }
                else {
                    this.onLogin(false);
                    reject('Authentication failed'); // Authentication failed
                }

            }, 1000); // Simulate an asynchronous operation (e.g., HTTP request)
        });
    }

    // Retrieve user information
    public getUserByUsername(username: string): any {
        return users.find((u) => u.username === username);
    }
}