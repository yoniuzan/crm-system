import { Pipe, PipeTransform } from '@angular/core';
import { Language } from '../crm-common/enums';
import { LanguageService } from '../services/common/language.service';

@Pipe({
    name: 'language',
    standalone: true
})
export class LanguagePipe implements PipeTransform {
    constructor(private _languageService: LanguageService) {

    }

    public transform(value: Language): string {
        if (!value)
            return '';
        switch (value) {
            case Language.English:
                return this._languageService.getStr('Languages.English');
            case Language.Hebrew:
                return this._languageService.getStr('Languages.Hebrew');
   
            default:
                throw new Error(`invalid languages: ${value}`);
        }
    }

}
