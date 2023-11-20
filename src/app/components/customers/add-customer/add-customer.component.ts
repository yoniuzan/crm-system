import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { GenderPipe } from 'src/app/pipes/gender.pipe';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerFormComponent } from 'src/app/crm-common/components/dialog/forms/add-customer-form/add-customer-form.component';
import { AddCustomerFormWidth } from 'src/app/crm-common/constants/generalConstants';

@Component({
    selector: 'add-customer',
    standalone: true,
    imports: [MatPaginatorModule, MatTableModule, GenderPipe, TranslatePipe, CommonModule, MatFormFieldModule, MatDatepickerModule, FormsModule],
    templateUrl: './add-customer.component.html',
    styleUrls: ['./add-customer.component.scss']
})

export class AddCustomerComponent {

    constructor(public dialog: MatDialog) {}

    public addRow(): void {
        const dialogRef = this.dialog.open(AddCustomerFormComponent, {
            width: AddCustomerFormWidth
        });

        dialogRef.afterClosed();
    }
}
