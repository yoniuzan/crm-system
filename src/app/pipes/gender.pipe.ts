import { Enums } from 'src/app/crm-common/enums';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'gender',
    standalone: true
})
export class GenderPipe implements PipeTransform {
    
    public transform(value: Enums.Gender): string {
        if (!value)
            return '';
        switch (value) {
            case Enums.Gender.Man:
                return 'Gender.Man';
            case Enums.Gender.Female:
                return 'Gender.Female';
            default:
                return 'Gender.Other';
        }
    }

}
