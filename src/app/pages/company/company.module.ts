import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from 'theme/nga.module';
import { SharedModule } from 'shared/shared.module';
import { routing } from './company.routing';
import { Ng2Bs3ModalModule, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { CompanyComponent } from './company.component';
import { CompaniesCardComponent } from './company-card.component';
import { CompaniesGridComponent } from './company-grid.component';
//import { CompanyEditComponent } from '_controllers/_gen/_edit/company.component';
import { modalHtml } from './components/company-edit-modal';

import { GenericTableModule } from '@angular-generic-table/core';
import { ColumnSettingsModule } from '@angular-generic-table/column-settings';
//import { ChangeColumnSettingsComponent } from './change-column-settings/change-column-settings.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        SharedModule,
        routing,
        GenericTableModule,
 //       ColumnSettingsModule, 
        Ng2Bs3ModalModule,
    ],
    declarations: [
        CompanyComponent,
        CompaniesCardComponent,
        CompaniesGridComponent,
        modalHtml
       // CompanyEditComponent
    ]
})
export class CompanyModule {
}
