import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GolfRetrieveService } from './golf-retrieve.service';
import { LoginService } from '../../auth/login/login.service';
import { EncrDecrService } from 'src/app/shared/services/EncrDecr.service';
import { CookieStorage } from '../../../../shared/storage/cookie-storage';
import { LocalStorage } from '../../../../shared/storage/local-storage';
import { SessionStorage } from '../../../../shared/storage/session-storage';

describe('GolfRetrieveService', () => {
  let service: GolfRetrieveService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule],
      providers: [ LoginService, EncrDecrService, CookieStorage, LocalStorage, SessionStorage]
    });
    service = TestBed.inject(GolfRetrieveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
