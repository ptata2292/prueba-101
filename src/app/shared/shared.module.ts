import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HttpClient } from '@angular/common/http';

import { AngularMaterialModule } from '../material.module';;
// import { DaterangeModule } from './daterange/daterange.module';

import { CookieService } from 'ngx-cookie-service';
import { CookieStorage } from './storage/cookie-storage';
import { LocalStorage } from './storage/local-storage';
import { SessionStorage } from './storage/session-storage';
import { EncrDecrService } from './services/EncrDecr.service';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { CreditCardDirective } from './directives/credit-card.directive';
import { UppercaseDirective } from './directives/uppercase.directive';
import { TooltipDirective } from './directives/tooltip.directive';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from './dialog/dialog.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GooglePlacesDirective } from './directives/google-places.directive';

import { FormsModule } from '@angular/forms';
import { DatepickerRangeComponent } from './components/datepicker-range/datepicker-range.component';
import { ArrayHelperService } from './services/array-helper.service';
import { VarDirective } from './directives/var.directive';

@NgModule({
  declarations: [
    OnlyNumberDirective, CreditCardDirective, UppercaseDirective, UppercaseDirective,
    TooltipDirective , DialogComponent,
    GooglePlacesDirective, DatepickerRangeComponent, VarDirective
  ],
  imports: [
    CommonModule,
    AngularMaterialModule, 
    NgbModule,
    FormsModule
    // DaterangeModule
  ],
  providers: [
    CookieService, CookieStorage, LocalStorage, SessionStorage, EncrDecrService,
    DialogService, ArrayHelperService
  ],
  exports: [
    AngularMaterialModule, OnlyNumberDirective, CreditCardDirective, UppercaseDirective,
    VarDirective,
    UppercaseDirective , TooltipDirective, DialogComponent,
    GooglePlacesDirective, DatepickerRangeComponent
    // DaterangeModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
