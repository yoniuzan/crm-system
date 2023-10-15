import { LanguageService } from 'src/app/services/common/language.service';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LanguagePipe } from 'src/app/pipes/language.pipe';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { BaseComponent } from '../../components/base/base/base.component';
import { Enums } from '../../enums';

export type CrmMatFormField = { label: string, placeholder: string, formControl: FormControl, type: Enums.FormFieldType }

@Component({
    selector: 'form-field',
    standalone: true,
    templateUrl: './form-field.component.html',
    styleUrls: ['./form-field.component.scss'],
    imports: [TranslatePipe, CommonModule, LanguagePipe, FormsModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule]
})
export class FormFieldComponent extends BaseComponent {

    @Input('crm-form-field') public _crmFormField: CrmMatFormField;

    constructor(private _languageService: LanguageService) {
        super();
    }

    public getErrorMessage(): string {
        switch (this._crmFormField.type) {
            case Enums.FormFieldType.Text:
                return this.getErrorUserNameMessage();
            case Enums.FormFieldType.Password:
                return this.getErrorPasswordMessage();
            default:
                return '';
        }
    }

    private getErrorUserNameMessage(): string {
        return this._crmFormField.formControl.hasError('required') || this._crmFormField.formControl.hasError('minlength') ? this._languageService.getStr('ErrorMessage.MinUserNameLength') : '';
    }

    private getErrorPasswordMessage(): string {
        return this._crmFormField.formControl.hasError('required') || this._crmFormField.formControl.hasError('minlength') ? this._languageService.getStr('ErrorMessage.MinPasswordLength') : '';
    }

}
