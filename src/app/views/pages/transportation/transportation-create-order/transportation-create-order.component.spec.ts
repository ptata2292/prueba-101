import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { TransportationCreateOrderComponent } from './transportation-create-order.component';
import { LoginService } from '../../auth/login/login.service';
import { EncrDecrService } from '../../../../shared/services/EncrDecr.service';
import { CookieStorage } from '../../../../shared/storage/cookie-storage';
import { LocalStorage } from '../../../../shared/storage/local-storage';
import { SessionStorage } from '../../../../shared/storage/session-storage';
import { OPTIONS_CONFIG, STATES_MODULES } from '../../../../store/store.config';
import { AngularMaterialModule } from 'src/app/material.module';

describe('TransportationCreateOrderComponent', () => {
  let component: TransportationCreateOrderComponent;
  let fixture: ComponentFixture<TransportationCreateOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, MatSnackBarModule, AngularMaterialModule, NgxsModule.forRoot(STATES_MODULES, OPTIONS_CONFIG) ],
      declarations: [ TransportationCreateOrderComponent ],
      providers: [LoginService, EncrDecrService, CookieStorage, LocalStorage, SessionStorage]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportationCreateOrderComponent);
    component = fixture.componentInstance;
    component.isLoading = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.isLoading = true;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
