import { Inject, Injectable } from '@angular/core';
import { Enums } from '../../crm-common/enums';
import { LangEn } from '../../crm-common/constants/languages/en/lang-en';
import { LangHe } from '../../crm-common/constants/languages/he/lang-he';
import { DOCUMENT } from '@angular/common';
import { Constants } from 'src/app/crm-common/constants/languages/contstans';
import { Dictionary } from 'src/app/crm-common/models/structures/dictionary/dictionary';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    private _source: any;
    private _langs: Array<Enums.Language>;
    private _languagesSizes: { [lang: number]: { Locale: string, Size: string } } = {};
    private _countryToLang: Dictionary<Enums.Language>;
    private readonly _sizes = {
        None: '',
        Small: 'sm.css',
        Medium: 'md.css',
        ExtraSmall: 'xsm.css'
    };
    private _isRtl: boolean;
    private _lang: Enums.Language = Enums.Language.English;

    constructor(private _storageService: StorageService, @Inject(DOCUMENT) private document: Document) {
        this._languagesSizes[Enums.Language.Hebrew] = { Size: this._sizes.Medium, Locale: 'he-he' };
        this._languagesSizes[Enums.Language.English] = { Size: this._sizes.Medium, Locale: 'en-en' };
        // set everything towards translations
        this._isRtl = false;
        this._langs = [Enums.Language.English, Enums.Language.Hebrew];
        this._countryToLang = new Dictionary({ 'Israel': Enums.Language.Hebrew });
        this.setLangFromLocal(this.getLang());

    }

    public get Locale(): string {
        return this._languagesSizes[this._lang].Locale;
    }

    public langBlackList(blackList: Array<number>): void {
        blackList.forEach(lang => {
            this._langs.deleteFirst((x: Enums.Language) => x === lang);
        });

    }

    public getLang(): Enums.Language {
        if (this._lang)
            return this._lang;

        // current lang not set, try get from cookies
        const lang = this._storageService.get(Constants.Cookies.Language);
        if (lang != null)
            return parseInt(lang);

        // first time? default lang
        return this.getDefaultLang();
    }

    public async loadDefaultLang(): Promise<void> {
        const lang = this.getLang();
        await this.setLang(lang, Date.now().toString(), true);
    }

    public getActiveLangs(): Array<Enums.Language> {

        // Arabic WiteList        
        // if (!Constants.WhiteList.LangWhiteList[9].contains(this._session.UserId))
        //     return this._langs.filter(lang => lang != Enums.Language.Arabic);

        return this._langs;
    }

    // noinspection JSMethodCanBeStatic
    private getDefaultLang(): Enums.Language {
        return Enums.Language.English;
    }

    private setLangFromLocal(lang: Enums.Language): void {
        this._source = this.getLocalSource(lang);
    }

    private getLocalSource(lang: Enums.Language): any {
        switch (lang) {
            case Enums.Language.Hebrew:
                return LangHe;
            case Enums.Language.English:
                return LangEn;
            default:
                return LangEn;
        }
    }

    // public async setLang(lang: Enums.Language, version?: string, initial?: boolean): Promise<boolean> {
    //     if (lang == this._lang)
    //         return Promise.resolve(false);

    //     if (!version && this._langVersions?.containsKey(lang.toString()))
    //         version = this._langVersions.get(lang);

    //     if (!version)
    //         version = (new Date()).LanguageVersion();

    //     // if not initial meaning we go into refresh, then don't do anything else
    //     if (!initial) {
    //         this._lang = lang;
    //         await this._storage.set(Constants.Cookies.Language, lang.toString());
    //         this.setDirectionCss();

    //         return Promise.resolve(true);
    //     }

    //     const url = environment.ConfigLang + 'languages/' + 'lang-' + this.getLangName(lang) + '.json';

    //     return this.getLanguage(url, version).then(async result => {
    //         if (!result)
    //             result = LangEn;

    //         await this._storage.set(Constants.Cookies.Language, lang.toString());
    //         const source = this.getLocalSource(lang);
    //         this._source = this.mergeDeep(Object.assign({}, source), result);

    //         this._lang = lang;
    //         this.setDirectionCss();

    //         return true;
    //     });
    // }

    public async setLang(lang: Enums.Language, version?: string, initial?: boolean): Promise<boolean> {
        if (lang == this._lang)
            return Promise.resolve(false);

        // if not initial meaning we go into refresh, then don't do anything else
        if (!initial) {
            this._lang = lang;
            await this._storageService.set(Constants.Cookies.Language, lang.toString());
            this.setDirectionCss();

            return Promise.resolve(true);
        }

        this._lang = lang;
        this.setDirectionCss();

        return true;
    }

    private loadStyle(styleName: string): void {
        const head = this.document.getElementsByTagName('head')[0];

        const themeLink = this.document.getElementById('client-theme') as HTMLLinkElement;
        if (themeLink)
            themeLink.href = styleName;
        else {
            const style = this.document.createElement('link');
            style.rel = 'stylesheet';
            style.href = `${styleName}`;

            head.appendChild(style);
        }
    }

    private setDirectionCss(): void {
        const currentLang = this.getLang();

        const rtlLangs = [Enums.Language.Hebrew];
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

        if (this._languagesSizes[currentLang].Size)
            this.loadStyle('size-' + this._languagesSizes[currentLang].Size);
    }

    public GetBCP47Locale(): string {
        switch (this._lang) {
            case Enums.Language.Hebrew: return "he-IL";
            case Enums.Language.English:
            default:
                return "en-US";
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
        const regex = /\#\#\#\w+\#\#\#/gm;

        let res = str.match(regex);

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
            this._source = LangEn;

        return this.getStrFromSource(this._source, this._lang, key, params);
    }

    private getStrFromSource(source: any, sourceLang: Enums.Language, key: string, params?: object): string {
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

        return foundStr ? foundStr : key;
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
    public getLangName(lang: Enums.Language): string {
        switch (lang) {
            case Enums.Language.English:
                return 'en';
            case Enums.Language.Hebrew:
                return 'he';
            default:
                return 'en';
        }
    }

    public getCurrentLangName(): string {
        return this.getLangName(this._lang);
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

    public getLocalLang(lang: Enums.Language): string {
        switch (lang) {
            case Enums.Language.English:
                return this.getStr('Languages.English');
            case Enums.Language.Hebrew:
                return this.getStr('Languages.Hebrew');
            default:
                throw new Error(`invalid position: ${lang}`);
        }
    }

    public isRtlLanguage(): boolean {
        return this._isRtl;
    }

    public getLanguageByCountry(country: string): Enums.Language {
        return this._countryToLang.getOrDefault(country, Enums.Language.English);
    }
}
