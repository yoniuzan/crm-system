import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/app/environments/environments';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private _http: HttpClient) {
    }

    private getParams(data: any): string {
        if (Object.keys(data).length == 0)
            return '';

        return '&' + Object.keys(data).map(key => `${key}=${data[key]}`).join('&');
    }

    // imporved but chat gpt
    public async get<T>(relativePath: string, data: any, convert: (da: any, ex?: any) => T = (data) => data) {
        const { ...params } = data ?? {};
        const completePath = `${environment.Server}${relativePath}${this.getParams(params)}`;

        return this._http.get(completePath, { responseType: 'text' })
        .pipe(
          map((res) => {
            const result = convert(res);
            if (result === undefined) {
              throw new Error(`Failed to convert response: ${JSON.stringify(res)}`);
            }
            return result;
          }),
          catchError((err) => {
            throw new Error(`Request failed: ${err.message}`);
          })
        )
        .toPromise();
    }

    // public async get<T>(relativePath: string, data: any, convert: (da: any, ex?: any) => T) {
    //     data = Object.keys(data).length == 0 ? {} : data;
    //     convert = convert ?? function (data) {
    //         return data;
    //     };

    //     const completePath = `${environment.Server}${relativePath}${this.getParams(data)}`;

    //     try {
    //         return this._http.get(completePath)
    //             .pipe(
    //                 map((res: any) => {
    //                     try {
    //                         return convert(res);
    //                     }
    //                     catch (e) {
    //                         throw e;
    //                     }

    //                 }),
    //                 catchError((err) => {
    //                     return err;

    //                 }))
    //             .toPromise();
    //     } catch (e) {
    //         throw e;
    //     }
    // }

    public async getImage<T>(relativePath: string, data: any, convert: (da: any, ex?: any) => T) {

        data = Object.keys(data).length == 0 ? {} : data;
        convert = convert ?? function (data) {
            return data;
        };

        const completePath = `${environment.Server}${relativePath}${this.getParams(data)}`;

        try {
            return this._http.get(completePath, { responseType: 'text' })
                .pipe(
                    map((res: any) => {
                        try {
                            return convert(res);
                        }
                        catch (e) {
                            throw e;
                        }

                    }),
                    catchError((err: any) => {
                        return err;

                    }))
                .toPromise();
        } catch (e) {
            throw e;
        }
    }


    async post<T>(relativePath: string, data: any, convert: (da: any) => T) {

        data = Object.keys(data).length == 0 ? {} : data;
        convert = convert ?? function (data) {
            return data;
        };

        const completePath = `${environment.Server}${relativePath}`;
        const body: string = JSON.stringify(data);

        try {
            return this._http.post(completePath, body)
                .pipe(
                    map((res: any) => {
                        try {
                            return convert(res);
                        }
                        catch (e) {
                            throw e;
                        }

                    }),
                    catchError((err: any) => {
                        return err;

                    }))
                .toPromise();
        } catch (e) {
            throw e;
        }
    }
}
