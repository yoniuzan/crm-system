/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpService } from './http.service';
import { Language } from '../../crm-common/enums';
import { LangEn } from '../../crm-common/constants/languages/en/lang-en';
import { LangHe } from '../../crm-common/constants/languages/he/lang-he';
import { DOCUMENT } from '@angular/common';
import { Constants } from 'src/app/crm-common/constants/languages/contstans';
import { StorageService } from './storage.service';
import { Injectable, Inject } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    private _source: any;
    private _langs: Array<Language>;

    private _isRtl: boolean;
    private _lang: Language | undefined;

    constructor(private _storageService: StorageService, @Inject(DOCUMENT) private document: Document, private _httpService: HttpService) {
        
        // set everything towards translations
        this._isRtl = false;
        this._langs = [Language.English, Language.Hebrew];
        this.setLang(this.getLang(), true);
    }

    public getLang(): Language {
        if (this._lang)
            return this._lang;

        // current lang not set, try get from cookies
        const lang = this._storageService.get(Constants.Cookies.Language);
        if (lang != null)
            return parseInt(lang);

        // first time? default lang
        return this.getDefaultLang();
    }

    public getActiveLangs(): Array<Language> {
        return this._langs;
    }

    // noinspection JSMethodCanBeStatic
    private getDefaultLang(): Language {
        
        return Language.Hebrew;
    }

    private setLangFromLocal(lang: Language): void {
        this._source = this.getLocalSource(lang);
    }

    private getLocalSource(lang: Language): any {
        switch (lang) {
            case Language.English:
                return LangEn;
            case Language.Hebrew:
            default:
                return LangHe;
        }
    }

    public async setLang(lang: Language, isInitial?: boolean): Promise<boolean> {
        switch (lang) {
            case Language.English:
                this._source = LangEn;
                break;
            case Language.Hebrew:
            default:
                this._source = LangHe;
                break;
        }

        // if not initial meaning we go into refresh, then don't do anything else
        if (!isInitial) {
            this._lang = lang;
            await this._storageService.set(Constants.Cookies.Language, lang.toString());
            this.setDirectionCss();

            return Promise.resolve(true);
        }

        this._storageService.set(Constants.Cookies.Language, lang.toString());
        this._lang = lang;
        this.setDirectionCss();

        return true;
    }

    public onChengeLang(lang: Language): void {
        
        this._storageService.set(Constants.Cookies.Language, lang.toString());
        this.setDirectionCss();

        const isChanged = this._lang != lang && this._lang != null;
        this._lang = lang;
        if (isChanged)
            location.reload();
    }

    private loadStyle(styleName: string): void {
        const head = this.document.getElementsByTagName('head')[0];
        const themeLink = this.document.getElementById('client-theme') as HTMLLinkElement;
        if (themeLink)
            themeLink.href = styleName;
        else {
            const style = this.document.createElement('link');
            // style.rel = 'stylesheet'; // get red error in console 'Refused to apply style from..'
            style.href = `${styleName}`;

            head.appendChild(style);
        }
    }

    private setDirectionCss(): void {
        const currentLang = this.getLang();
        const rtlLangs = [Language.Hebrew];
        if (rtlLangs.indexOf(currentLang) >= 0) {
            this.loadStyle('global-rtl.css');
            document.body.classList.remove('ltr');
            document.body.classList.add('rtl');
            this._isRtl = true;

        } else {
            this.loadStyle('global-ltr.css');
            document.body.classList.remove('rtl');
            document.body.classList.add('ltr');
            this._isRtl = false;
        }
    }

    private fill(str: string, params: any): string {
        if (!params)
            return str;

        const jsonParam = params;// JSON.parse(params);

        Object.keys(jsonParam).forEach(paramKey => {

            // let dat = JSON.stringify(params)//JSON.parse('{BetsCount:0}');
            const paramValue = jsonParam[paramKey];
            const paramKeyRegex = new RegExp('@@@' + paramKey + '@@@', 'g');
            str = str.replace(paramKeyRegex, paramValue);
        });

        const notAllReplaced = str.indexOf('$') >= 0;
        if (notAllReplaced) {

            // error
        }

        return str;
    }

    private changeInternalVars(str: string,): string {

        // noinspection RegExpRedundantEscape
        const regex = /###\w+###/gm;
        let res: string[] | null = str.match(regex);

        if (!res)
            return str;

        res = res.map(x => x.substr(3, x.length - 6));

        for (let i = 0; i < res.length; i++) {
            const replaceValue = this._source?.Internal[res[i]];

            // if error, don't replace
            if (isEmpty(replaceValue))
                continue;

            const repRegex = new RegExp('###' + res[i] + '###', 'gm');
            str = str.replace(repRegex, replaceValue);
        }

        return str;
    }

    public processFoundString(str: string, params: any): string {
        str = this.changeInternalVars(str);

        return this.fill(str, params);
    }

    public getStr(key: string, params?: object): string {
        if (!this._source)
            this._source = LangHe;

        return this.getStrFromSource(this._source, this._lang ?? this.getDefaultLang(), key, params);
    }

    private getStrFromSource(source: any, sourceLang: Language, key: string, params?: object): string {
        if (!key)
            return '';
        let foundStr: string | null;

        const keysArray = key.split('.');
        if (keysArray.length == 1)
            foundStr = source[keysArray[0]];
        else {
            let possibleStr: string | null;
            if (keysArray.length == 2 && source[keysArray[0]])
                possibleStr = source[keysArray[0]][keysArray[1]];
            else
                possibleStr = this.getRecursiveStr(source, keysArray);

            foundStr = possibleStr ? this.processFoundString(possibleStr, params) : null;
        }

        return foundStr ?? key;
    }

    private getRecursiveStr(obj: any, keysArray: Array<string>): string | null {
        const temp: any = keysArray[0];
        if (!obj[temp])
            return null;

        if (keysArray.length == 1)
            return obj[temp];

        keysArray.shift();

        return this.getRecursiveStr(obj[temp], keysArray);
    }

    private getStrParentWithSource(source: any, key: string): any {
        const keysArray = key.split('.');
        let values = {};
        if (keysArray.length == 1)
            values = source[keysArray[0]];
        else if (keysArray.length == 2)
            values = source[keysArray[0]][keysArray[1]];

        return values;
    }

    public getStrParent(key: string, params?: any): any {
        const keysArray = key.split('.');
        let values = {};
        if (keysArray.length == 1)
            values = this._source[keysArray[0]];
        else if (keysArray.length == 2)
            values = this._source[keysArray[0]][keysArray[1]];

        if (!values)
            values = this.getStrParentWithSource(LangEn, key);

        if (params) {
            const val: any = Object.assign({}, values);
            Object.keys(params).forEach(param => {
                Object.keys(val).forEach((key: any) => {
                    if (val[key].indexOf(param) >= 0)
                        val[key] = val[key].replaceAll('@@@' + param + '@@@', params[param]);
                });
            });

            return val;
        }

        return values;

        // return this.getRecursiveStr(this._source, keysArray);
    }

    public getAlertsText(key: string): { Title: string, Content: string } {
        const keysArray = key.split('.');
        const texts = {
            Title: this._source[keysArray[0]] && this._source[keysArray[0]][keysArray[1]] ? this._source[keysArray[0]][keysArray[1]].Title : '',
            Content: this._source[keysArray[0]] && this._source[keysArray[0]][keysArray[1]] ? this._source[keysArray[0]][keysArray[1]].Content : ''
        };

        return texts;
    }

    // noinspection JSMethodCanBeStatic
    public getLangName(lang: Language): string {
        switch (lang) {
            case Language.English:
                return 'en';
            case Language.Hebrew:
            default:
                return 'he';
        }
    }

    // noinspection JSMethodCanBeStatic
    private isObject(item: any): boolean {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }

    public mergeDeep(target: any, source: any): void {
        const output = Object.assign({}, target);
        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach(key => {
                if (this.isObject(source[key])) {
                    if (!(key in target))
                        Object.assign(output, { [key]: source[key] });
                    else
                        output[key] = this.mergeDeep(target[key], source[key]);

                } else
                    Object.assign(output, { [key]: source[key] });
            });
        }

        return output;
    }

    // private getLanguage(path: string, exp: string): Promise<any> {
    //     return this._http.getExternal(path, {}, exp).then((result: any) => {
    //         return result;
    //     }, () => {
    //         return Promise.resolve(null);
    //     });
    // }

    public getLocalLang(lang: Language): string {
        switch (lang) {
            case Language.English:
                return this.getStr('Languages.English');
            case Language.Hebrew:
                return this.getStr('Languages.Hebrew');
            default:
                throw new Error(`invalid position: ${lang}`);
        }
    }

    public isRtlLanguage(): boolean {
        return this._isRtl;
    }
}
