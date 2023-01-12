import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Enums } from 'src/app/crm-common/enums';
import { EnumsUtils } from 'src/app/utils/enums-utils';
import { BaseComponent } from 'src/app/crm-common/components/base/base/base.component';
import { Constants } from 'src/app/crm-common/constants/languages/contstans';
import { LanguageService } from 'src/app/services/common/language.service';
import { StorageService } from 'src/app/services/common/storage.service';
import { LanguagePipe } from 'src/app/pipes/language.pipe';

@Component({
    selector: 'settings',
    standalone: true,
    imports: [TranslatePipe, LanguagePipe, CommonModule, MatFormFieldModule, MatSelectModule],
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends BaseComponent {

    public _currentLanguage: Enums.Language = Enums.Language.Hebrew;
    public _activeLanguages: Array<Enums.Language> = EnumsUtils.getEnumValues(Enums.Language);

    constructor(private _languageService: LanguageService, private _storageService: StorageService) {
        super();
        const lang = this._storageService.get(Constants.Cookies.Language);
        this._currentLanguage = lang ? Number(lang) : Enums.Language.Hebrew;
        this.onLanguageClick(this._currentLanguage);
    }

    private onLanguageClick(language: Enums.Language): void {
        this._languageService.setLang(language, true).then(() => {
            this._currentLanguage = language;
        });
    }

    public onChaneLang(selectedLang: Enums.Language): void {       
        this._languageService.onChengeLang(selectedLang);
    }
}
