import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EncrDecrService } from '../shared/services/EncrDecr.service';
import { CookieStorage } from '../shared/storage/cookie-storage';
import { LoginService } from '../views/pages/auth/login/login.service';
import { security } from './security';

describe('security', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [  ],
      providers: [LoginService, EncrDecrService, CookieStorage, localStorage, sessionStorage]
    })
  }));

  it('should create an instance', () => {   
    let loginService: LoginService;
    expect(new security(loginService)).toBeTruthy();
  });
});
