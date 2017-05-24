import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanyComponent }   from './customer.component';
import { CompanyDetailsComponent } from './customer-details.component';
import { CompanyEditComponent } from './customer-edit.component';

import { AuthGuard } from '_guards/index';

const routes: Routes = [
  { 
    path: '', 
    component: CompanyComponent,
    children: [
      { path:'details', component: CompanyDetailsComponent },
      { path:'edit', 
        component: CompanyEditComponent, canActivate: [AuthGuard] 
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers:    [  ]
})
export class CustomerRoutingModule { 
  static components = [ CompanyComponent, CompanyDetailsComponent, CompanyEditComponent ];
}

