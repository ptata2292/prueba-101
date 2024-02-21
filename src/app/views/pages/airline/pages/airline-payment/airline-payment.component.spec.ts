import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';

import { AirlinePaymentComponent } from './airline-payment.component';
import { STATES_MODULES, OPTIONS_CONFIG } from '../../../../../store/store.config';
import { LoginService } from '../../../auth/login/login.service';
import { EncrDecrService } from '../../../../../shared/services/EncrDecr.service';
import { CookieStorage } from '../../../../../shared/storage/cookie-storage';
import { LocalStorage } from '../../../../../shared/storage/local-storage';
import { SessionStorage } from '../../../../../shared/storage/session-storage';
import { DialogService } from '../../../../../shared/dialog/dialog.service';
import { AngularMaterialModule } from 'src/app/material.module';
import { of } from 'rxjs';

describe('AirlinePaymentComponent', () => {
  let component: AirlinePaymentComponent;
  let fixture: ComponentFixture<AirlinePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, AngularMaterialModule, NgxsModule.forRoot(STATES_MODULES, OPTIONS_CONFIG) ],
      declarations: [ AirlinePaymentComponent ],
      providers: [LoginService, EncrDecrService, CookieStorage, LocalStorage, SessionStorage, DialogService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlinePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
