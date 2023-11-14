import { Enums } from 'src/app/crm-common/enums';
import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/common/language.service';

@Pipe({
    name: 'gender',
    standalone: true
})
export class GenderPipe implements PipeTransform {
    constructor(private _langService: LanguageService) {

    }
    
    public transform(value: Enums.Gender): string {
        if (!value)
            return '';
        switch (value) {
            case Enums.Gender.Man:
                return this._langService.getStr('Customers.Man');
            case Enums.Gender.Female:
                return this._langService.getStr('Customers.Female');
            default:
                return this._langService.getStr('Customers.Other');
        }
    }

}
