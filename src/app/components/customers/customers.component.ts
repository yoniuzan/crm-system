import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class CustomersComponent implements OnInit, AfterViewInit {

    public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'delete'];
    private customers: Customer[] = customers;
    public dataSource = new MatTableDataSource<Customer>(this.customers);

    @ViewChild(MatPaginator, { static: true }) private paginator: MatPaginator;

    public isRtl: boolean;

    constructor(private _languageService: LanguageService) {
        this.isRtl = this._languageService.isRtlLanguage();
    }

    public ngOnInit(): void {
        this.paginator._intl.itemsPerPageLabel = this._languageService.getStr('Customers.NumberToShow');
        this.paginator._intl.lastPageLabel = this._languageService.getStr('Customers.LastPage');
        this.paginator._intl.nextPageLabel = this._languageService.getStr('Customers.Next');
        this.paginator._intl.previousPageLabel = this._languageService.getStr('Customers.Previous');
        this.paginator._intl.firstPageLabel = this._languageService.getStr('Customers.FirstPage');
    }

    public ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.getRangeLabel = this.getRangeDisplayText;
    }

    public onCccc(customer: Customer): void {
        console.log(customer);
        console.log(typeof customer);

    }

    private getRangeDisplayText = (page: number, pageSize: number, length: number): string => {
        const initialText = this._languageService.getStr('Customers.Display');
        const to = this._languageService.getStr('Customers.To');
        const of = this._languageService.getStr('Customers.Of');
        if (length == 0 || pageSize == 0)
            return `${initialText} 0 ${of} ${length}`;

        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length
            ? Math.min(startIndex + pageSize, length)
            : startIndex + pageSize;

        return `${initialText} ${startIndex + 1} ${to} ${endIndex} ${of} ${length}`; // customize this line
    };
}
