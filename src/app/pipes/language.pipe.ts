import { Enums } from 'src/app/crm-common/enums';
import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/common/language.service';

@Pipe({
    name: 'language',
    standalone: true
})
export class LanguagePipe implements PipeTransform {
    constructor(private _languageService: LanguageService) {

    }

    public transform(value: Enums.Language): string {
        if (!value)
            return '';
        switch (value) {
            case Enums.Language.English:
                return this._languageService.getStr('Languages.English');
            case Enums.Language.Hebrew:
                return this._languageService.getStr('Languages.Hebrew');
   
            default:
                throw new Error(`invalid languages: ${value}`);
        }
    }

}
