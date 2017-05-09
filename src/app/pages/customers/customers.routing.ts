import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersComponent } from './customers.component';
import { CustomersGridGenericComponent } from './components/generic/customers-generic.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    children: [
        { path: '', component: CustomersComponent },
        { path: 'generic', component: CustomersGridGenericComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
