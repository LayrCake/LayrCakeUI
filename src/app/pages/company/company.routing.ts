import { Routes, RouterModule }  from '@angular/router';

import { CompanyComponent } from './company.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: CompanyComponent
  }
];

export const routing = RouterModule.forChild(routes);
