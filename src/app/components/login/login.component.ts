import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLinkWithHref, RouterOutlet } from "@angular/router";
import { Constants } from "src/app/crm-common/constants/languages/contstans";
import { Enums } from "src/app/crm-common/enums";
import { LanguagePipe } from "src/app/pipes/language.pipe";
import { TranslatePipe } from "src/app/pipes/translate/translate.pipe";
import { LanguageService } from "src/app/services/common/language.service";
import { StorageService } from "src/app/services/common/storage.service";
import { EnumsUtils } from "src/app/utils/enums-utils";


@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [TranslatePipe, CommonModule, RouterLinkWithHref, RouterOutlet, LanguagePipe, FormsModule],
})
export class LoginComponent {

    public _currentLanguage: Enums.Language = Enums.Language.Hebrew;
    public _showLogin = true;

    public _activeLanguages: Array<Enums.Language> = EnumsUtils.getEnumValues(Enums.Language);

    constructor(private _languageService: LanguageService, private _storageService: StorageService) {
        const lang = this._storageService.get(Constants.Cookies.Language);
        this._currentLanguage = lang ? Number(lang) : Enums.Language.Hebrew;
        this.onLanguageClick(this._currentLanguage);
    }

    private onLanguageClick(language: Enums.Language): void {
        this._languageService.setLang(language, true).then(() => {
            this._currentLanguage = language;
        });
    }

    public onChaneLang(e: Event): void {
        const selectedLang = Number((e.target as HTMLInputElement).value)
        this._languageService.onChengeLang(selectedLang);
    }

}
