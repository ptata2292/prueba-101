import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';

import { AirlineSearchComponent } from './airline-search.component';
import { LoginService } from '../../../auth/login/login.service';
import { STATES_MODULES, OPTIONS_CONFIG } from '../../../../../store/store.config';
import { EncrDecrService } from '../../../../../shared/services/EncrDecr.service';
import { CookieStorage } from '../../../../../shared/storage/cookie-storage';
import { LocalStorage } from '../../../../../shared/storage/local-storage';
import { SessionStorage } from '../../../../../shared/storage/session-storage';
import { AngularMaterialModule } from 'src/app/material.module';

describe('AirlineSearchComponent', () => {
  let component: AirlineSearchComponent;
  let fixture: ComponentFixture<AirlineSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, AngularMaterialModule, NgxsModule.forRoot(STATES_MODULES, OPTIONS_CONFIG) ],
      declarations: [ AirlineSearchComponent ],
      providers: [LoginService, EncrDecrService, CookieStorage, LocalStorage, SessionStorage]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
