import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EncrDecrService } from 'src/app/shared/services/EncrDecr.service';
import { CookieStorage } from 'src/app/shared/storage/cookie-storage';
import { LocalStorage } from 'src/app/shared/storage/local-storage';
import { SessionStorage } from 'src/app/shared/storage/session-storage';
import { LoginService } from '../../auth/login/login.service';
import { AirlineOrderService } from './airline-order.service';

describe('AirlineOrderService', () => {
  let service: AirlineOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ ],
      providers: [LoginService, EncrDecrService, CookieStorage, LocalStorage, SessionStorage]
    });
    service = TestBed.inject(AirlineOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
