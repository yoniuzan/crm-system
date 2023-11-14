import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Customer } from 'src/app/crm-common/models/customer/customer';
import { customers } from 'src/app/mock-data/customersMockData';
import { GenderPipe } from 'src/app/pipes/gender.pipe';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { LanguageService } from 'src/app/services/common/language.service';

@Component({
    selector: 'app-customers',
    standalone: true,
    imports: [MatPaginatorModule, MatTableModule, GenderPipe, TranslatePipe, CommonModule],
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements AfterViewInit {

    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'delete'];
    customers: Customer[] = customers;    
    dataSource = new MatTableDataSource<Customer>(this.customers);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    public isRtl: boolean;

    constructor(private _languageService: LanguageService) {
        this.isRtl = this._languageService.isRtlLanguage();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    onCccc(customer: any) {
        console.log(customer);
        console.log(typeof customer);
        
    }
}

