import { LanguageService } from 'src/app/services/common/language.service';
import { Enums } from 'src/app/crm-common/enums';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LanguagePipe } from 'src/app/pipes/language.pipe';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';

export type CrmMatFormField = { label: string, placeholder: string, formControl: FormControl, type: Enums.FormFieldType }

@Component({
    selector: 'form-field',
    standalone: true,
    templateUrl: './form-field.component.html',
    styleUrls: ['./form-field.component.scss'],
    imports: [TranslatePipe, CommonModule, LanguagePipe, FormsModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule]
})
export class FormFieldComponent {

    @Input('crm-form-field') _crmFormField: CrmMatFormField;

    public enums = Enums;

    constructor(private _languageService: LanguageService) {
    }

    public getErrorMessage(): string {
        switch (this._crmFormField.type) {
            case Enums.FormFieldType.Text:
                return this.getErrorUserNameMessage();
            case Enums.FormFieldType.Password:
                return this.getErrorPasswordMessage();
            default:
                return ''
        }
    }

    private getErrorUserNameMessage(): string {
        return this._crmFormField.formControl.hasError('required') || this._crmFormField.formControl.hasError('minlength') ? this._languageService.getStr('ErrorMessage.MinUserNameLength') : '';
    }

    private getErrorPasswordMessage(): string {
        return this._crmFormField.formControl.hasError('required') || this._crmFormField.formControl.hasError('minlength') ? this._languageService.getStr('ErrorMessage.MinPasswordLength') : '';
    }

}
