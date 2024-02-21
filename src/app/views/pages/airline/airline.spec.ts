import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from '../auth/login/login.service';
import { Airline } from './airline';
import { EncrDecrService } from '../../../shared/services/EncrDecr.service';
import { CookieStorage } from '../../../shared/storage/cookie-storage';
import { LocalStorage } from '../../../shared/storage/local-storage';
import { SessionStorage } from '../../../shared/storage/session-storage';


describe('Airline', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [  ],
      providers: [LoginService, EncrDecrService, CookieStorage, LocalStorage, SessionStorage]
    })
    .compileComponents();
  }));
  it('should create an instance', () => {
    let loginService: LoginService;
    expect(new Airline(loginService)).toBeTruthy();
  });
});
