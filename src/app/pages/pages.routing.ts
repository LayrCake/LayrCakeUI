import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'pages/register/register.module#RegisterModule'
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: 'pages/dashboard/dashboard.module#DashboardModule' },
      { path: 'customers', loadChildren: 'pages/customers/customers.module#CustomersModule' },
      { path: 'company', loadChildren: 'pages/company/company.module#CompanyModule' },
      { path: 'components', loadChildren: 'pages/components/components.module#ComponentsModule' },
      { path: 'charts', loadChildren: 'pages/charts/charts.module#ChartsModule' },
      { path: 'ui', loadChildren: 'pages/ui/ui.module#UiModule' },
      { path: 'forms', loadChildren: 'pages/forms/forms.module#FormsModule' },
      { path: 'tables', loadChildren: 'pages/tables/tables.module#TablesModule' },
      { path: 'maps', loadChildren: 'pages/maps/maps.module#MapsModule' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
