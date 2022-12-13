import { StorageService } from './../../services/common/storage.service';
import { LanguageService } from 'src/app/services/common/language.service';
import { AfterContentInit, Component } from '@angular/core';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { Enums } from 'src/app/crm-common/enums';
import { Constants } from 'src/app/crm-common/constants/languages/contstans';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [
        TranslatePipe
    ]
})
export class LoginComponent implements AfterContentInit {

    // public _preloaderTrigger: boolean;
    public _currentLanguage: Enums.Language = Enums.Language.English;
    public _currentCountry: string;
    public _showLogin = true;

    // private _languages: Array<Enums.Language>;
    
    constructor(private _languageService: LanguageService, private _storageService: StorageService) {
        
        this._currentCountry = this._storageService.getValue(Constants.Cookies.AppParams.Country);
    }

    public async ngAfterContentInit(): Promise<void> {
        console.log("LoginComponent:");
        console.log("ngAfterContentInit:");
        
        // this._languages = this._languageService.getActiveLangs();

        let country = this._storageService.getValue(Constants.Cookies.AppParams.Country) ?? Enums.Language.Hebrew;
        // if (!country) {
        //     country = await this._registrationService.getCountry();
        //     await this._storageService.setValue(Constants.Cookies.AppParams.Country, country);
        // }

        const lang = this._storageService.get(Constants.Cookies.Language);
        this._currentLanguage = lang ? Number(lang) : this._languageService.getLanguageByCountry(country);
        this.onLanguageClick(this._currentLanguage);
        this._currentCountry = country;
    }

    private onLanguageClick(language: Enums.Language): void {
        this._languageService.setLang(language).then(() => {
            this._currentLanguage = language;
        });
    }

}
