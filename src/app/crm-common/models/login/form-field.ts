import { FormControl, Validators } from "@angular/forms";
import { Enums } from "../../enums";
import { EMPTY_STRING } from "../../constants/generalConstants";

export class FormField {
    public Label: string;
    public Placeholder: string;
    public FormControl: FormControl;
    public Type: Enums.FormFieldType;
    public FormName: Enums.FormFieldName;
    public IsRequired: boolean;
    public MinLength: number;

    constructor(label: string, placeholder: string, isRequired: boolean, minLength: number, type: Enums.FormFieldType, formName: Enums.FormFieldName) {
        this.Label = label;
        this.Placeholder = placeholder;
        this.FormControl = new FormControl(EMPTY_STRING, [isRequired ? Validators.required : Validators.nullValidator, Validators.minLength(minLength)]);
        this.Type = type;
        this.FormName = formName;
        this.IsRequired = isRequired;
        this.MinLength = minLength;
    }
}