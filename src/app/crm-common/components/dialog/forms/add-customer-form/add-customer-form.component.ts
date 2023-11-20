import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Enums } from 'src/app/crm-common/enums';
import { EnumsUtils } from 'src/app/utils/enums-utils';
import { GenderPipe } from "../../../../../pipes/gender.pipe";
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { Customer } from 'src/app/crm-common/models/customer/customer';

@Component({
    selector: 'add-customer-form',
    standalone: true,
    templateUrl: './add-customer-form.component.html',
    styleUrls: ['./add-customer-form.component.scss'],
    imports: [MatFormFieldModule, MatSelectModule, MatInputModule, GenderPipe, FormsModule, CommonModule]
})
export class AddCustomerFormComponent {

    public _genderList: number[] = EnumsUtils.getEnumValues(Enums.Gender);
    public _genderSelect: Enums.Gender;
    public _newCustomer: Customer= new Customer();

}
