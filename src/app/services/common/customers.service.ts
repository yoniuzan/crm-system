import { Injectable } from '@angular/core';
import { Customer } from 'src/app/crm-common/models/customer/customer';
import { customers } from 'src/app/mock-data/customersMockData';

@Injectable({
    providedIn: 'root'
})
export class CustomersService {

    private _allCustomers: Customer[];

    public getCustomers(): Customer[] {
        return this._allCustomers;
    }

    public getAllCustomers(): Promise<Customer[]> {
        const mockCustomers: Customer[] = customers;
        this._allCustomers = mockCustomers;

        return Promise.resolve(mockCustomers);

        // TODO http req
        // return this._httpService.get()
    }
}
