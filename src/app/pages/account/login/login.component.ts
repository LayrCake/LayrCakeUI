import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '_services/auth.service';
import { ValidationService } from 'core/services/validation.service';
import { IUserLogin } from '_models/interfaces';
import { GrowlerService, GrowlerMessageType } from 'core/growler/growler.service';

import 'style-loader!./login.scss';

@Component({
    selector: 'login',
    templateUrl: './login.html'
})
export class Login implements OnInit {
    public form: FormGroup;
    public errorMessage: string;

    public email: AbstractControl;
    public password: AbstractControl;
    public submitted: boolean = false;

    constructor(private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private growlService: GrowlerService) { }

    ngOnInit() {
        this.authService.logout();
        this.buildForm();
    }

    buildForm() {
        this.form = this.fb.group({
            email: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
        });

        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
    }

    public onSubmit({ value, valid }: { value: IUserLogin, valid: boolean }) {
        this.submitted = true;
        if (this.form.valid) {
            this.authService.login(value)
                .subscribe((status: boolean) => {
                    if (status) {
                        this.growlService.growl('Login Success, Welcome', GrowlerMessageType.Info);
                        if (this.authService.redirectUrl) {
                            const redirectUrl = this.authService.redirectUrl;
                            this.authService.redirectUrl = '';
                            this.router.navigate([redirectUrl]);
                        } else {
                            this.router.navigate(['/dashboard']);
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
