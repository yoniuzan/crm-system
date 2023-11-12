import { HttpService } from './../../services/common/http.service';
import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLinkWithHref, RouterOutlet } from "@angular/router";
import { Constants } from "src/app/crm-common/constants/languages/contstans";
import { LanguagePipe } from "src/app/pipes/language.pipe";
import { TranslatePipe } from "src/app/pipes/translate/translate.pipe";
import { LanguageService } from "src/app/services/common/language.service";
import { StorageService } from "src/app/services/common/storage.service";
import { EnumsUtils } from "src/app/utils/enums-utils";
import { MatCardModule } from '@angular/material/card';
import { FormFieldComponent } from 'src/app/crm-common/mat-components/form-field/form-field.component';
import { BaseComponent } from 'src/app/crm-common/components/base/base/base.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/services/common/auth.service';
import { AlertWidth, NUMBER_SIX, NUMBER_TWO } from 'src/app/crm-common/constants/generalConstants';
import { Enums } from 'src/app/crm-common/enums';
import { LoaderComponent } from 'src/app/crm-common/components/loader/loader.component';
import { DialogComponent } from 'src/app/crm-common/components/dialog/dialog/dialog.component';
import { AlertComponent, IAlertComponentInput } from 'src/app/crm-common/components/dialog/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { FormField } from 'src/app/crm-common/models/login/form-field';
import { FormHelper } from 'src/app/helpers/formHelper';

@Component({
    selector: 'login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [FormFieldComponent, TranslatePipe, CommonModule, RouterLinkWithHref, RouterOutlet, LanguagePipe, FormsModule, MatCardModule, MatButtonModule, LoaderComponent, DialogComponent],
})
export class LoginComponent extends BaseComponent {
    @Output('is-authenticated') private _isAuthenticated: EventEmitter<boolean> = new EventEmitter();

    public _currentLanguage: Enums.Language = Enums.Language.Hebrew;
    public _showLogin = true;
    public _activeLanguages: Array<Enums.Language> = EnumsUtils.getEnumValues(Enums.Language);
    public _userLoginForm: Array<FormField> = [];
    public _isValidating = false;
    public _loading = false;
    public _alertData: IAlertComponentInput;

    constructor(private _languageService: LanguageService, private _storageService: StorageService, private _httpService: HttpService, private _authService: AuthService, public dialog: MatDialog) {
        super();
        const lang = this._storageService.get(Constants.Cookies.Language);
        this._currentLanguage = lang ? Number(lang) : Enums.Language.Hebrew;
        this.initUserLoginForm();
        this.onLanguageClick(this._currentLanguage);
    }

    private initUserLoginForm(): void {
        this._userLoginForm.push(
            new FormField('Login.EnterUserName', 'Login.UserName', true, NUMBER_TWO, Enums.FormFieldType.Text, Enums.FormFieldName.UserName),
            new FormField('Login.EnterPassword', 'Login.Password', true, NUMBER_SIX, Enums.FormFieldType.Password, Enums.FormFieldName.Password),
        );
    }

    private onLanguageClick(language: Enums.Language): void {
        this._languageService.setLang(language, true).then(() => {
            this._currentLanguage = language;
        });
    }

    public onChaneLang(e: Event): void {
        const selectedLang = Number((e.target as HTMLInputElement).value);
        this._languageService.onChengeLang(selectedLang);
    }

    public login(): void {
        const username: FormField | null = this._userLoginForm.firstOrNull(form => form.FormName === Enums.FormFieldName.UserName);
        const password: FormField | null = this._userLoginForm.firstOrNull(form => form.FormName === Enums.FormFieldName.Password);
        const formFields: FormField[] = username && password ? [username, password] : [];
        if (!formFields.length || !FormHelper.isValidLoginForm(formFields)) {
            this.getErrorAlertData();
            
            return;
        }
        this._loading = true;
        this._isValidating = true;
        this._authService.login(username?.FormControl.value, password?.FormControl.value)
            .then((isAuthenticated) => {
                this._loading = false;
                if (isAuthenticated) {
                    const user = this._authService.getUserByUsername(username?.FormControl.value);
                    console.log('Logged in user:', user);
                    this._isAuthenticated.emit(true);
                } else {
                    this.getErrorAlertData();
                    this._isValidating = false;
                }
            })
            .catch((error) => {
                this.getErrorAlertData();
                this._isValidating = false;
                this._loading = false;
                console.error(error);
            });
    }

    private getErrorAlertData(): void {
        const alertInput = { Type: Enums.AlertType.Error, Message: { Title: 'Login.ErrorLogin', Content: 'Alert.ErrorContect', CancelButton: 'Alert.Ok' } };
        this.openAlert(alertInput);
    }

    private openAlert(alertData: IAlertComponentInput): void {
        const dialogRef = this.dialog.open(AlertComponent, {
            width: AlertWidth,
            data: alertData
        });

        dialogRef.afterClosed();
    }
}
