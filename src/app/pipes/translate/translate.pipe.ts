import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from 'src/app/services/common/language.service';

@Pipe({
  name: 'translate',
  standalone: true
})
export class TranslatePipe implements PipeTransform {

    constructor (private _languageService: LanguageService) {}

  transform(value: any, ...args: any[]): any {
    return this._languageService.getStr(value, args);
  }

}