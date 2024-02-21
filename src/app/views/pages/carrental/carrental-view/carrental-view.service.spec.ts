/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CarrentalViewService } from './carrental-view.service';
import { LoginService } from '../../auth/login/login.service';
import { EncrDecrService } from '../../../../shared/services/EncrDecr.service';
import { CookieStorage } from '../../../../shared/storage/cookie-storage';
import { LocalStorage } from '../../../../shared/storage/local-storage';
import { SessionStorage } from '../../../../shared/storage/session-storage';

describe('Service: CarrentalView', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule],
      providers: [CarrentalViewService, LoginService, EncrDecrService, CookieStorage, LocalStorage, SessionStorage]
    });
  });

  it('should ...', inject([CarrentalViewService], (service: CarrentalViewService) => {
    expect(service).toBeTruthy();
  }));
});
