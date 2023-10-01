// auth.service.ts

import { Injectable } from '@angular/core';
import { users } from '../../mock-data/authMockData';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public login(username: string, password: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const user = users.find((u) => u.username === username && u.password === password);
            setTimeout(() => {
                if (user)
                    resolve(true); // Authentication successful
                else
                    reject('Authentication failed'); // Authentication failed
            }, 1000); // Simulate an asynchronous operation (e.g., HTTP request)
        });
    }

    // Retrieve user information
    public getUserByUsername(username: string): any {
        return users.find((u) => u.username === username);
    }
}