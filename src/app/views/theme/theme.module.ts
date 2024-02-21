import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { HeaderComponent } from './header/header.component';
import { PagesModule } from '../pages/pages.module';
import { SharedModule } from '../../shared/shared.module';
import { from } from 'rxjs';

const secondaryRoutes: Routes = [
  { path: '',  component: BaseComponent }
];

@NgModule({
  declarations: [BaseComponent, HeaderComponent],
  imports: [
    CommonModule,
    PagesModule,
    SharedModule,
    RouterModule.forChild(secondaryRoutes),
  ],
  exports: [
    BaseComponent
  ]
})
export class ThemeModule { }
