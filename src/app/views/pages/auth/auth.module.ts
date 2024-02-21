import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../../../shared/shared.module';

const secondaryRoutes: Routes = [
  { path: '',  component: AuthComponent }
];

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(secondaryRoutes),
    SharedModule
  ],
  exports: [
    AuthComponent
  ]

})
export class AuthModule { }
