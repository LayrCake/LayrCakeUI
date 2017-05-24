import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from 'theme/nga.module';
import { SharedModule } from 'shared/shared.module';
import { routing } from './company.routing';

import { CompanyComponent } from './company.component';
import { CompaniesCardComponent } from './company-card.component';
import { CompaniesGridComponent } from './company-grid.component';
import { CompanyEditComponent } from '_controllers/_gen/_edit/company.component';

import { GenericTableModule } from '@angular-generic-table/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        SharedModule,
        routing,
        GenericTableModule, 
    ],
    declarations: [
        CompanyComponent,
        CompaniesCardComponent,
        CompaniesGridComponent,
        CompanyEditComponent
    ]
})
export class CompanyModule {
}
