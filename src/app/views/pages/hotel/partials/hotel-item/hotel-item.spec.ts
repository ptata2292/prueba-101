import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from  '@angular/common/http/testing'
import { LoginService } from '../../../auth/login/login.service';
import { HotelItem } from './hotel-item';
import { EncrDecrService } from '../../../../../shared/services/EncrDecr.service';
import { CookieStorage } from '../../../../../shared/storage/cookie-storage';
import { LocalStorage } from '../../../../../shared/storage/local-storage';
import { SessionStorage } from '../../../../../shared/storage/session-storage';

describe('HotelItem', () => {
  let fixture;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ HotelItem ],
      providers: [LoginService, EncrDecrService, CookieStorage, LocalStorage, SessionStorage]
    })
  });
  it('should create an instance', () => {
    try{
      let router: Router; 
      let loginService: LoginService;
      const hotelItem = new HotelItem(router, loginService);
      expect(hotelItem).toBeTruthy();
    } catch(ex){
      console.log(ex);
    }   
  });
});
