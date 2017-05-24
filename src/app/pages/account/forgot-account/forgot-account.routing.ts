import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ForgotAccountComponent } from './forgot-account.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ForgotAccountComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
