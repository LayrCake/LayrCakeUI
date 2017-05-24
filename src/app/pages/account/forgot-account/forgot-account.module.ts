// Angular Imports
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// This Module's Components
import { ForgotAccountComponent } from './forgot-account.component';

@NgModule({
    imports: [
        ReactiveFormsModule,
    ],
    declarations: [
        ForgotAccountComponent,
    ],
    exports: [
        ForgotAccountComponent,
    ]
})
export class ForgotAccountModule {

}
