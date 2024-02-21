import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LoginService } from '../../auth/login/login.service';
import { RailViewComponent } from './rail-view.component';
import { EncrDecrService } from '../../../../shared/services/EncrDecr.service';
import { CookieStorage } from '../../../../shared/storage/cookie-storage';
import { LocalStorage } from '../../../../shared/storage/local-storage';
import { SessionStorage } from '../../../../shared/storage/session-storage';

describe('RailViewComponent', () => {
  let component: RailViewComponent;
  let fixture: ComponentFixture<RailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, MatSnackBarModule ],
      declarations: [ RailViewComponent ],
      providers: [LoginService, EncrDecrService, CookieStorage, LocalStorage, SessionStorage]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
