import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '_services/auth.service';
import { ValidationService } from 'core/services/validation.service';
import { IUserLogin } from '_models/interfaces';
import { GrowlerService, GrowlerMessageType } from 'core/growler/growler.service';

@Component({
    selector: 'forgot-account',
    templateUrl: 'forgot-account.component.html',
    styleUrls: ['forgot-account.component.scss']
})
export class ForgotAccountComponent {
    public form: FormGroup;
    public errorMessage: string;
    public submitted: boolean = false;

    public email: AbstractControl;

    constructor(private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private growlService: GrowlerService) { }

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        this.form = this.fb.group({
            email: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
        });

        this.email = this.form.controls['email'];
    }

    public onSubmit({ value, valid }: { value: IUserLogin, valid: boolean }) {
        this.submitted = true;
        if (this.form.valid) {
            this.authService.forgotPassword(value)
                .subscribe((status: boolean) => {
                    if (status) {
                        this.growlService.growl('An email has been sent', GrowlerMessageType.Info);
                        if (this.authService.redirectUrl) {
                            const redirectUrl = this.authService.redirectUrl;
                            this.authService.redirectUrl = '';
                            this.router.navigate([redirectUrl]);
                        } else {
                            this.router.navigate(['/login']);
                        }
                    }
                    else {
                        const loginError = 'Username or Password is incorrect. Please try again.';
                        this.errorMessage = loginError;
                        this.growlService.growl(loginError, GrowlerMessageType.Danger);
                    }
                }, (loginError: any) => {
                    this.errorMessage = loginError;
                    this.growlService.growl(loginError, GrowlerMessageType.Danger);
                });
        }
    }
}
