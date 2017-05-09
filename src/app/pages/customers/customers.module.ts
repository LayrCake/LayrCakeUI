import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { CKEditorModule } from 'ng2-ckeditor';
import { NgaModule } from '../../theme/nga.module';
import { SharedModule } from '../../shared/shared.module';
import { GenericTableModule } from '@angular-generic-table/core';

import { routing } from './customers.routing';
import { CustomersComponent } from './customers.component';
import { CustomersCardComponent } from './customers-card.component';
import { CustomersGridComponent } from './customers-grid.component';
import { CustomersGridGenericComponent } from './components/generic/customers-generic.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        GenericTableModule,
        //CKEditorModule,
        SharedModule,
        routing,
    ],
    declarations: [
        CustomersComponent,
        CustomersCardComponent,
        CustomersGridComponent,
        CustomersGridGenericComponent
    ]
})
export class CustomersModule {
}
