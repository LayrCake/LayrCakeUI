import { Injectable } from '@angular/core';

import { ICustomer, IOrder } from '_models/interfaces';
import { ICompany } from '_models/_gen/modelInterfaces';

@Injectable()
export class TrackByService {
  
  customer(index:number, customer: ICustomer) {
    return customer.id;
  }

  company(index:number, company: ICompany) {
    debugger;
    return company.id;
  }

  order(index:number, order: IOrder) {
    return index;
  }
}