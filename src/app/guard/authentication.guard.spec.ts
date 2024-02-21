import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthenticationGuard } from './authentication.guard';
import { LoginService } from '../views/pages/auth/login/login.service';
import { EncrDecrService } from '../shared/services/EncrDecr.service';
import { CookieStorage } from '../shared/storage/cookie-storage';
import { LocalStorage } from '../shared/storage/local-storage';
import { SessionStorage } from '../shared/storage/session-storage';

describe('AuthenticationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [AuthenticationGuard, LoginService, EncrDecrService, CookieStorage, LocalStorage, SessionStorage],
      declarations: [ ]
    });
  });

  it('should ...', inject([AuthenticationGuard], (guard: AuthenticationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
