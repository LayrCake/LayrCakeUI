import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from '_guards/index';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'pages/account/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'pages/account/register/register.module#RegisterModule'
  },
  {
    path: 'forgotpass',
    loadChildren: 'pages/account/forgot-account/forgot-account.module#ForgotAccountModule'
  },
  {
    path: 'activate',
    loadChildren: 'pages/account/activate-account/activate-account.module#ActivateAccountModule'
  },
  {
    path: 'pages',
    component: Pages, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: 'pages/dashboard/dashboard.module#DashboardModule',  },
      { path: 'customers', loadChildren: 'pages/customers/customers.module#CustomersModule', canActivate: [AuthGuard] },
      { path: 'company', loadChildren: 'pages/company/company.module#CompanyModule', canActivate: [AuthGuard] },
      { path: 'components', loadChildren: 'pages/components/components.module#ComponentsModule', canActivate: [AuthGuard] },
      { path: 'charts', loadChildren: 'pages/charts/charts.module#ChartsModule', canActivate: [AuthGuard] },
      { path: 'ui', loadChildren: 'pages/ui/ui.module#UiModule', canActivate: [AuthGuard] },
      { path: 'forms', loadChildren: 'pages/forms/forms.module#FormsModule', canActivate: [AuthGuard] },
      { path: 'tables', loadChildren: 'pages/tables/tables.module#TablesModule', canActivate: [AuthGuard] },
      { path: 'maps', loadChildren: 'pages/maps/maps.module#MapsModule', canActivate: [AuthGuard] }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
