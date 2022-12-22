import { Pipe, PipeTransform } from '@angular/core';
import { Enums } from '../crm-common/enums';
import { LanguageService } from '../services/common/language.service';

@Pipe({
    name: 'language',
    standalone: true
})
export class LanguagePipe implements PipeTransform {
    constructor(private _languageService: LanguageService) {

    }

    transform(value: any, args?: any): any {
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
