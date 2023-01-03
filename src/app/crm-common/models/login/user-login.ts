import { FormControl, Validators } from "@angular/forms";

export class UserLogin {

    public UserName: FormControl<string | null>;
    public Password: FormControl<string | null>;

    constructor() {
        this.UserName = new FormControl('', [Validators.required, Validators.minLength(2)]);
        this.Password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    }
}