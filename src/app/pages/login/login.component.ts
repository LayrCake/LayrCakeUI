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
    public loginForm: FormGroup;
    public errorMessage: string;

    public email: AbstractControl;
    public password: AbstractControl;
    public submitted: boolean = false;

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private growlService: GrowlerService) { }

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
        });

        this.email = this.loginForm.controls['email'];
        this.password = this.loginForm.controls['password'];
    }

    public onSubmit({ value, valid }: { value: IUserLogin, valid: boolean }) {
        this.submitted = true;
        if (this.loginForm.valid) {
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
            //(err: any) => console.log(err));).catch(error: any){;


            //.subscribe((status: boolean) => {
            //    if (status) {
            //        this.growler.growl('Logged in', GrowlerMessageType.Info);
            //        if (this.authService.redirectUrl) {
            //            const redirectUrl = this.authService.redirectUrl;
            //            this.authService.redirectUrl = '';
            //            this.router.navigate([redirectUrl]);
            //        } else {
            //            this.router.navigate(['/dashboard']);
            //        }
            //    } else {
            //        const loginError = 'Unable to login';
            //        this.errorMessage = loginError;
            //        this.growler.growl(loginError, GrowlerMessageType.Danger);
            //    }
            //},
            //(err: any) => console.log(err));
        }
    }
}
