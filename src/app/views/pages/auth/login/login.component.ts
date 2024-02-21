import { Component, OnInit, NgModule, ViewEncapsulation, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormsModule} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import {getLogo, getTenantName, getTenantLoginLogos, getHotelsAPI} from '../../../../shared/tenant/tenant';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  matcher: MyErrorStateMatcher;
  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';
  serverError = false;
  public actionsLayout = 'normal';
  public tenantName;
  @Input() isLoading: boolean;
  @Output() isLoadingChange: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('userCode', {static: false}) usercodeElement: ElementRef;
  @ViewChild('password', {static: false}) passwordElement: ElementRef;

  constructor(private loginService: LoginService, private router: Router, private _snackBar: MatSnackBar) {
    this.isLoading = false;
    this.matcher = new MyErrorStateMatcher();
    this.tenantName = getTenantName();
    console.log(getTenantLoginLogos())
  }

  get getLogo() {
    return getLogo;
  }

  get getTenantLoginLogos() {
    return getTenantLoginLogos;
  }


  ngOnInit() {
    // console.log('LoginComponent');
    this.loginForm = new FormGroup({
      userCode: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  get password() { return this.loginForm.get('password'); }

  Login() {
    this.submitted = true;
    this.isLoading = true;
    this.isLoadingChange.emit(this.isLoading);
    const formValue = this.loginForm.value;
    if(formValue.userCode == "" && formValue.password == "") {
      this.snackBar("Email & Password is Required"); return;
    } else if (formValue.userCode == "") {
      this.snackBar("Email is Required"); return;
    } else if (formValue.password == "") {
      this.snackBar("Password is Required"); return;
    }
    const user = {
      username:this.loginForm.value.userCode,
      password:this.loginForm.value.password
    };
    // this.loginService.login(user, 'hotelsApiEndpoint').
    //   subscribe((data: any) => {
    //     if(data.jwt != null && data.jwt != ""){
    //       this.errorMessage = '';
    //       // console.log(JSON.stringify(data));
    //       this.loginService.setUserSession(data, "hotelsTokenName");
    //       this.isLoading = false;
    //       this.isLoadingChange.emit(this.isLoading);
    //       this.router.navigateByUrl('/Hotels');
    //     } else {
    //       this.snackBar("Something Wrong Happend");
    //     }
    //   },
    //   error => {
    //     this.isLoading = false;
    //     this.isLoadingChange.emit(this.isLoading);
    //     this.errorMessage = error.Error;
    //     if(error.status!=500){
    //       this.password.setErrors([{'password is incorrect': true}]);
    //     }else{
    //       this.serverError = true;
    //       this.errorMessage ='Server is unavailable.';
    //     }
    //     this.snackBar("Server is unavailable.");
    //   }
    // );
    this.loginService.setUserSession('c8b129c2e8c53de7adc8e2d1ede8d5d3', "hotelsTokenName");
    this.isLoading = false;
    this.isLoadingChange.emit(this.isLoading);
    this.router.navigateByUrl('/Hotels');
  }

  public close(status) {
    console.log(`Dialog result: ${status}`);
    this.serverError = false;
  }

  public open() {
    this.serverError = true;
  }

  keyEnter(event, formName) {
    console.log(formName);
    if (formName === 'userCode') {
      this.passwordElement.nativeElement.focus();
    } else if (formName === 'password') {
      console.log(this.loginForm.valid);
      if (this.loginForm.valid) {
        this.Login();
      }
    }
  }

  snackBar(message, action = "OK", duration = 2000){
    this._snackBar.open(message, "OK", { duration: duration});
  }
}
