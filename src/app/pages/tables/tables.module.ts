import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
//import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DataTableModule } from "angular2-datatable";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpModule, Http } from '@angular/http';

import { routing } from './tables.routing';
import { Tables } from './tables.component';
//import { BasicTables } from './components/basicTables/basicTables.component';
//import { BasicTablesService } from './components/basicTables/basicTables.service';
//import { ResponsiveTable } from './components/basicTables/components/responsiveTable';
//import { StripedTable } from './components/basicTables/components/stripedTable';
//import { BorderedTable } from './components/basicTables/components/borderedTable';
//import { HoverTable } from './components/basicTables/components/hoverTable';
//import { CondensedTable } from './components/basicTables/components/condensedTable';
//import { ContextualTable } from './components/basicTables/components/contextualTable';
//import { SmartTables } from './components/smartTables/smartTables.component';
//import { SmartTablesService } from './components/smartTables/smartTables.service';
import { ElementTables } from './components/elementTables/elementTables.component';
import { ElementTables2 } from './components/elementTables/elementTables2.component';
import { ElementTables3 } from './components/elementTables/elementTables3.component';
import { ElementTables4 } from './components/elementTables/elementTables4.component';
import { ElementGoJS } from './components/elementTables/elementGoJS.component';

/** Components used in example */
import { AppComponent } from './app.component';
//import { LazyComponent } from './lazy/lazy.component';
//import { RestComponent } from './rest/rest.component';
//import { CustomRowComponent } from './custom-row/custom-row.component';
//import { BasicComponent } from './basic/basic.component';
//import { ExamplesComponent } from './examples/examples.component';
//import { AppRoutingModule } from './app-routing.module';
//import { ExemplifyModule } from "angular-exemplify";
//import { LocalizationComponent } from './localization/localization.component';
//import { CustomColumnComponent, NameComponent, AgeComponent } from './custom-column/custom-column.component';

/** Only needed when using ng2-translate */
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/** Import generic table module */
import { GenericTableModule } from '@angular-generic-table/core';
import { ColumnSettingsModule } from '@angular-generic-table/column-settings/column-settings.module';
//import { ChangeColumnSettingsComponent } from './change-column-settings/change-column-settings.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing,
        DataTableModule,
        NgxDatatableModule,
        HttpModule,
        GenericTableModule, /** ADD THIS LINE TO YOUR APP MODULE! */
        //ColumnSettingsModule,
        //AppRoutingModule, /** holds routes used in examples */
        //ExemplifyModule, /** used for generating examples */
        /** translate module only needed for localization when using ngx */
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [Http]
            }
        })
    ],
    /** add components used by your table i.e. for expanding rows etc. as entry components */
   /* entryComponents: [
        CustomRowComponent,
        NameComponent,
        AgeComponent
    ],*/
    declarations: [
        Tables,
        //BasicTables,
        //HoverTable,
        //BorderedTable,
        //CondensedTable,
        //StripedTable,
        //ContextualTable,
        //ResponsiveTable,
        //SmartTables,
        ElementTables,
        ElementTables2,
        ElementTables3,
        ElementTables4,
        ElementGoJS,
      /*  LocalizationComponent,
        ChangeColumnSettingsComponent,*/
    ],
    providers: [
        //BasicTablesService,
        //SmartTablesService,
    ]
})
export class TablesModule {
}
