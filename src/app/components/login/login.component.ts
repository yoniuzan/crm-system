import { HttpService } from './../../services/common/http.service';
import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormsModule, Validators } from "@angular/forms";
import { RouterLinkWithHref, RouterOutlet } from "@angular/router";
import { Constants } from "src/app/crm-common/constants/languages/contstans";
import { FormFieldType, Language } from "src/app/crm-common/enums";
import { LanguagePipe } from "src/app/pipes/language.pipe";
import { TranslatePipe } from "src/app/pipes/translate/translate.pipe";
import { LanguageService } from "src/app/services/common/language.service";
import { StorageService } from "src/app/services/common/storage.service";
import { EnumsUtils } from "src/app/utils/enums-utils";
import { MatCardModule } from '@angular/material/card';
import { CrmMatFormField, FormFieldComponent } from 'src/app/crm-common/mat-components/form-field/form-field.component';
import { BaseComponent } from 'src/app/crm-common/components/base/base/base.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/services/common/auth.service';
import { EMPTY_STRING, NUMBER_ONE, NUMBER_SIX, NUMBER_TWO, NUMBER_ZERO } from 'src/app/crm-common/constants/generalConstants';

@Component({
    selector: 'login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [FormFieldComponent, TranslatePipe, CommonModule, RouterLinkWithHref, RouterOutlet, LanguagePipe, FormsModule, MatCardModule, MatButtonModule],
})
export class LoginComponent extends BaseComponent {
    @Output('is-authenticated') private _isAuthenticated: EventEmitter<boolean> = new EventEmitter();

    public _currentLanguage: Language = Language.Hebrew;
    public _showLogin = true;
    public _activeLanguages: Array<Language> = EnumsUtils.getEnumValues(Language);
    public _userLoginForm: Array<CrmMatFormField> = [];
    public _isValidating = false;
    public _loading = false;
    private _username = EMPTY_STRING;
    private _password = EMPTY_STRING;

    constructor(private _languageService: LanguageService, private _storageService: StorageService, private _httpService: HttpService, private _authService: AuthService) {
        super();
        const lang = this._storageService.get(Constants.Cookies.Language);
        this._currentLanguage = lang ? Number(lang) : Language.Hebrew;
        this.initUserLoginForm();
        this.onLanguageClick(this._currentLanguage);
    }

    private initUserLoginForm(): void {
        this._userLoginForm.push(
            { label: 'Login.EnterUserName', placeholder: 'Login.UserName', formControl: new FormControl(EMPTY_STRING, [Validators.required, Validators.minLength(NUMBER_TWO)]), type: FormFieldType.Text },
            { label: 'Login.EnterPassword', placeholder: 'Login.Password', formControl: new FormControl(EMPTY_STRING, [Validators.required, Validators.minLength(NUMBER_SIX)]), type: FormFieldType.Password }
        );
    }

    private onLanguageClick(language: Language): void {
        this._languageService.setLang(language, true).then(() => {
            this._currentLanguage = language;
        });
    }

    public onChaneLang(e: Event): void {
        const selectedLang = Number((e.target as HTMLInputElement).value);
        this._languageService.onChengeLang(selectedLang);
    }

    public login(): void {
        this._isValidating = true;
        this._username = this._userLoginForm[NUMBER_ZERO].formControl.value;
        this._password = this._userLoginForm[NUMBER_ONE].formControl.value;
        this._loading = true;
        this._authService.login(this._username, this._password)
            .then((isAuthenticated) => {
                this._loading = false; // Reset loading flag
                if (isAuthenticated) {
                    const user = this._authService.getUserByUsername(this._username);
                    console.log('Logged in user:', user);
                    this._isAuthenticated.emit(true);
                } else {
                    console.log('Authentication failed');
                    this._isValidating = false;
                }
            })
            .catch((error) => {
                this._isValidating = false;
                this._loading = false; // Reset loading flag
                console.error(error);
            });
    }
}
