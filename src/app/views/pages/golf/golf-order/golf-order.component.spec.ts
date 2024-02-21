import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { GolfOrderComponent } from './golf-order.component';
import { STATES_MODULES, OPTIONS_CONFIG } from '../../../../store/store.config';
import { EncrDecrService } from '../../../../shared/services/EncrDecr.service';
import { CookieStorage } from '../../../../shared/storage/cookie-storage';
import { LocalStorage } from '../../../../shared/storage/local-storage';
import { SessionStorage } from '../../../../shared/storage/session-storage';
import { LoginService } from '../../auth/login/login.service';
import { AngularMaterialModule } from 'src/app/material.module';
import { DialogService } from '../../../../shared/dialog/dialog.service';

describe('GolfOrderComponent', () => {
  let component: GolfOrderComponent;
  let fixture: ComponentFixture<GolfOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, MatSnackBarModule, AngularMaterialModule, NgxsModule.forRoot(STATES_MODULES, OPTIONS_CONFIG) ],
      declarations: [ GolfOrderComponent ],
      providers: [LoginService, EncrDecrService, CookieStorage, LocalStorage, SessionStorage, DialogService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GolfOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
