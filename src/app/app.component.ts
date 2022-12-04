import { LanguageService } from './services/common/language.service';
import { Component } from '@angular/core';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { Constants } from './crm-common/constants/languages/contstans';
import { StorageService } from './services/common/storage.service';
import { Enums } from './crm-common/enums';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterLinkWithHref, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'crm-system';

    constructor(private _storageService: StorageService, private _languageService: LanguageService) {
        this.initialize();
    }

    private async initialize(): Promise<void> {
         // setting language preferences
         await this.setLanguageByCountry();
         if (!this._storageService.get(Constants.Cookies.SessionToken))
             await this._languageService.loadDefaultLang();
    }

    public setLanguageByCountry(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            let lang = Number(this._storageService.get(Constants.Cookies.Language));
            // if (!lang) {
            //     const country = await this._registration.getCountry();
            //     lang = this._languageService.getLanguageByCountry(country);
            // }
            lang = lang ? lang : Enums.Language.English;
            await this._languageService.setLang(lang, undefined, true);
            resolve();
        });
    }
}
