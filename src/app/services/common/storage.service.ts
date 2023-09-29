/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/crm-common/constants/languages/contstans';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    private _data: any;

    public async set(key: string, data: string): Promise<void> {
        localStorage.setItem(key, data);
    }

    public get(key: string): any {
        return localStorage.getItem(key);
    }

    public getValue(key: string): any {
        if (!this._data)
            this._data = JSON.parse(this.get(Constants.Cookies.AppParams.AppData));

        if (!this._data || !this._data[key])
            return null;

        if (new Date(this._data[key].expiration) < new Date())
            return null;
        
        return this._data[key].value;
    }

    public async setValue(key: string, data: string, expiry = 86400): Promise<void> {

        if (!this._data)
            this._data = JSON.parse(await this.get(Constants.Cookies.AppParams.AppData));

        this._data = this._data ? this._data : {};
        this._data[key] = { value: data, expiration: new Date(Date.now() + expiry * 1000) };
        await this.set(Constants.Cookies.AppParams.AppData, JSON.stringify(this._data));
    }

}
