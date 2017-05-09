import { Routes, RouterModule }  from '@angular/router';

import { Company } from './company.component';
//import { Ckeditor } from './components/ckeditor/ckeditor.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Company,
    //children: [
    //  { path: 'ckeditor', component: Ckeditor }
    //]
  }
];

export const routing = RouterModule.forChild(routes);
