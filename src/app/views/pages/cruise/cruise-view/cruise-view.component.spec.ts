import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LoginService } from '../../auth/login/login.service';
import { CruiseViewComponent } from './cruise-view.component';
import { EncrDecrService } from '../../../../shared/services/EncrDecr.service';
import { CookieStorage } from '../../../../shared/storage/cookie-storage';
import { LocalStorage } from '../../../../shared/storage/local-storage';
import { SessionStorage } from '../../../../shared/storage/session-storage';

describe('CruiseViewComponent', () => {
  let component: CruiseViewComponent;
  let fixture: ComponentFixture<CruiseViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, MatSnackBarModule ],
      declarations: [ CruiseViewComponent ],
      providers: [LoginService, EncrDecrService, CookieStorage, LocalStorage, SessionStorage]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CruiseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
