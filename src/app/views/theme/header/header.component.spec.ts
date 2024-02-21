import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatMenuModule } from '@angular/material/menu';

import { HeaderComponent } from './header.component';
import { LoginService } from '../../pages/auth/login/login.service';
import { EncrDecrService } from '../../../shared/services/EncrDecr.service';
import { CookieStorage } from '../../../shared/storage/cookie-storage';
import { LocalStorage } from '../../../shared/storage/local-storage';
import { SessionStorage } from '../../../shared/storage/session-storage';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, MatMenuModule ],
      declarations: [ HeaderComponent ],
      providers: [LoginService, EncrDecrService, CookieStorage, LocalStorage, SessionStorage]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
