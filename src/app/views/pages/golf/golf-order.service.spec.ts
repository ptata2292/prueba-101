import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GolfOrderService } from './golf-order.service';
import { LoginService } from '../auth/login/login.service';
import { EncrDecrService } from '../../../shared/services/EncrDecr.service';
import { CookieStorage } from '../../../shared/storage/cookie-storage';
import { LocalStorage } from '../../../shared/storage/local-storage';
import { SessionStorage } from '../../../shared/storage/session-storage';

describe('GolfOrderService', () => {
  let service: GolfOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ ],
      providers: [LoginService, EncrDecrService, CookieStorage, LocalStorage, SessionStorage]
    });
    service = TestBed.inject(GolfOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
