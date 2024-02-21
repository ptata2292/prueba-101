import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderInterceptor } from './header-interceptor.interceptor';
import { EncrDecrService } from './shared/services/EncrDecr.service';
import { CookieStorage } from './shared/storage/cookie-storage';
import { LocalStorage } from './shared/storage/local-storage';
import { SessionStorage } from './shared/storage/session-storage';
import { LoginService } from './views/pages/auth/login/login.service';

describe('HeaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ RouterTestingModule, HttpClientTestingModule],
    providers: [HeaderInterceptor, LoginService, EncrDecrService, CookieStorage, LocalStorage, SessionStorage]
  }));

  it('should be created', () => {
    const interceptor: HeaderInterceptor = TestBed.inject(HeaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
