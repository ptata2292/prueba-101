import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';

import { HotelListComponent } from './hotel-list.component';
import { STATES_MODULES, OPTIONS_CONFIG } from '../../../../../store/store.config';
import { LoginService } from '../../../auth/login/login.service';
import { EncrDecrService } from '../../../../../shared/services/EncrDecr.service';
import { CookieStorage } from '../../../../../shared/storage/cookie-storage';
import { LocalStorage } from '../../../../../shared/storage/local-storage';
import { SessionStorage } from '../../../../../shared/storage/session-storage';
import { AngularMaterialModule } from 'src/app/material.module';
import { of } from 'rxjs';


describe('HotelListComponent', () => {
  let component: HotelListComponent;
  let fixture: ComponentFixture<HotelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, AngularMaterialModule, NgxsModule.forRoot(STATES_MODULES, OPTIONS_CONFIG) ],
      declarations: [ HotelListComponent ],
      providers: [LoginService, EncrDecrService, CookieStorage, LocalStorage, SessionStorage]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelListComponent);
    component = fixture.componentInstance;
    component.search = of(null);
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});

