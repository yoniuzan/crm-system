import { FormField } from 'src/app/crm-common/models/login/form-field';

export class FormHelper {

    public static isValidLoginForm(formFields: FormField[]): boolean {
        return formFields.every(form => !form.IsRequired || form.FormControl.value.length >= form.MinLength);
    }

}
