import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TransportationRetrieveService } from './transportation-retrieve.service';
import { LoginService } from '../../auth/login/login.service';
import { EncrDecrService } from 'src/app/shared/services/EncrDecr.service';
import { CookieStorage } from '../../../../shared/storage/cookie-storage';
import { LocalStorage } from '../../../../shared/storage/local-storage';
import { SessionStorage } from '../../../../shared/storage/session-storage';

describe('TransportationRetrieveService', () => {
  let service: TransportationRetrieveService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule],
      providers: [ LoginService, EncrDecrService, CookieStorage, LocalStorage, SessionStorage]
    });
    service = TestBed.inject(TransportationRetrieveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
