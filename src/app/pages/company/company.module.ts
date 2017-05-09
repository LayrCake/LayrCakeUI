import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './company.routing';
import { Company } from './company.component';
//import { Ckeditor } from './components/ckeditor/ckeditor.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    //CKEditorModule,
    routing
  ],
  declarations: [
    Company,
    //Ckeditor
  ]
})
export class CompanyModule {
}
