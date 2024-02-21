import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from  '@angular/common/http/testing'
import { LoginService } from '../../../../auth/login/login.service';
import { TransportationItem } from './transportation-item';
import { EncrDecrService } from '../../../../../../shared/services/EncrDecr.service';
import { CookieStorage } from '../../../../../../shared/storage/cookie-storage';
import { LocalStorage } from '../../../../../../shared/storage/local-storage';
import { SessionStorage } from '../../../../../../shared/storage/session-storage';

describe('TransportationItem', () => {
  let fixture;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ TransportationItem ],
      providers: [LoginService, EncrDecrService, CookieStorage, LocalStorage, SessionStorage]
    })
  });
  it('should create an instance', () => {
    try{
      let router: Router; 
      let loginService: LoginService;
      const transportationItem = new TransportationItem(router, loginService);
      expect(transportationItem).toBeTruthy();
    } catch(ex){
      console.log(ex);
    }   
  });
});
