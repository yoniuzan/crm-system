import { LanguageService } from 'src/app/services/common/language.service';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LanguagePipe } from 'src/app/pipes/language.pipe';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { BaseComponent } from '../../components/base/base/base.component';
import { Enums } from '../../enums';
import { FormField } from '../../models/login/form-field';
import { EMPTY_STRING, FormControlError } from '../../constants/generalConstants';

@Component({
    selector: 'form-field',
    standalone: true,
    templateUrl: './form-field.component.html',
    styleUrls: ['./form-field.component.scss'],
    imports: [TranslatePipe, CommonModule, LanguagePipe, FormsModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule]
})
export class FormFieldComponent extends BaseComponent {

    @Input('form-field') public _formField: FormField;

    constructor(private _languageService: LanguageService) {
        super();
    }

    public getErrorMessage(): string {
        switch (this._formField.Type) {
            case Enums.FormFieldType.Text:
                return this.getErrorUserNameMessage();
            case Enums.FormFieldType.Password:
                return this.getErrorPasswordMessage();
            default:
                return EMPTY_STRING;
        }
    }

    private getErrorUserNameMessage(): string {
        return this._formField.FormControl.hasError(FormControlError.Required) || this._formField.FormControl.hasError(FormControlError.Minlength) ? this._languageService.getStr('ErrorMessage.MinUserNameLength') : EMPTY_STRING;
    }

    private getErrorPasswordMessage(): string {
        return this._formField.FormControl.hasError(FormControlError.Required) || this._formField.FormControl.hasError(FormControlError.Minlength) ? this._languageService.getStr('ErrorMessage.MinPasswordLength') : EMPTY_STRING;
    }

}
