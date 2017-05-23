import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from 'theme/validators';

import { AuthService } from '_services/auth.service';
import { IUserRegister } from '_models/interfaces';
import { GrowlerService, GrowlerMessageType } from 'core/growler/growler.service';

//import 'style-loader!./register.scss';

@Component({
    selector: 'register',
    templateUrl: './register.html',
    styleUrls: ['./register.scss']
})
export class Register {
  public form:FormGroup;
  public errMessages: string[];

  public name:AbstractControl;
  public email:AbstractControl;
  public password:AbstractControl;
  public confirmPassword:AbstractControl;
  public passwords:FormGroup;

  public submitted:boolean = false;

  constructor(private fb:FormBuilder,
      private router: Router,
      private authService: AuthService,
      private growlService: GrowlerService) {
  }

  ngOnInit() {
    this.errMessages = [];
    this.buildForm();
  }

  buildForm() {
      this.form = this.fb.group({
        //'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'confirmPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'confirmPassword')});

      //this.name = this.form.controls['name'];
      this.email = this.form.controls['email'];
      this.password = this.form.controls['password'];
      this.confirmPassword = this.form.controls['confirmPassword'];
  }

  public onSubmit({ value, valid }: { value: IUserRegister, valid: boolean }) {
        this.submitted = true;
        if (this.form.valid) {
            this.errMessages = [];
            this.authService.register(value)
                .subscribe((status: boolean) => {
                    if (status) {
                        debugger;
                        this.growlService.growl('Registration Success, Welcome', GrowlerMessageType.Info);
                        this.router.navigate(['/login']);
                    }
                    else {
                        const loginError = 'Username or Password is incorrect. Please try again.';
                        this.errMessages.push(loginError);
                        this.growlService.growl(loginError, GrowlerMessageType.Danger);
                    }
                }, (registerError: any) => {
                    this.errMessages = registerError;
                    this.growlService.growl(registerError, GrowlerMessageType.Danger);
                });
        }
  }
}
