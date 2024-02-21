import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { config } from 'src/app/shared/config';
import { EncrDecrService } from '../../../../shared/services/EncrDecr.service';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieStorage } from '../../../../shared/storage/cookie-storage';
import { LocalStorage } from '../../../../shared/storage/local-storage';
import { environment } from '../../../../../environments/environment';
import {getEnvironment} from "../../../../shared/tenant/tenant";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient, private encrypt: EncrDecrService, private router: Router,
              private cookieStorage: CookieStorage, private localStorage: LocalStorage) {
  }

  getLogggedInStatus(tokenName = "airlinesTokenName") {
    return this.cookieStorage.check(config[tokenName]);
  }

  setUserSession(tokenObj, tokenName = "airlinesTokenName") {
    if(tokenName != "airlinesTokenName") {
      const token = {
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhMDA5MzliYy1iZjdmLTQxMjAtYTQwMi05YjI2ZWJlN2JhMjMiLCJqdGkiOiIyZDEwNmUzNy03MWY1LTRhNGUtOGI0OC1kYmQxNmYyZWJiM2UiLCJyb2xlcyI6WyJ1c2VyIiwiYWRtaW4iXSwibmJmIjoxNjM0ODk1MDg1LCJleHAiOjE2NjY0MzEwODUsImlzcyI6Imlzc3VlciIsImF1ZCI6ImF1ZGllbmNlIn0.8nw033EMjhlechyC3yPfopk9akCzYtKFfzD_Tgu6NLI"
      };
      this.setToken(token, "airlinesTokenName");
    }
    this.setToken(tokenObj, tokenName);
    /*this.cookieStorage.removeItem(config[tokenName], '/');
    let userinfo = {
      token: tokenObj.token
    };
    this.cookieStorage.setItem(config[tokenName], JSON.stringify(userinfo), config.sessionexpiration * (1 / 24) / 60, '/', undefined, false, 'Strict');*/
  }

  setToken(tokenObj, tokenName) {
    this.cookieStorage.removeItem(config[tokenName], '/');
    if(tokenName == "airlinesTokenName") {
      this.cookieStorage.setItem(config[tokenName], JSON.stringify(tokenObj), config.sessionexpiration * (1 / 24) / 60, '/', undefined, false, 'Strict');
    }else{
      this.cookieStorage.setItem(config[tokenName], JSON.stringify(tokenObj), config.hotelSessionexpiration * (1 / 24) / 60, '/', undefined, false, 'Strict');
    }
  }

  updateUserSession(tokenName = "airlinesTokenName") {
    const token = this.cookieStorage.getItem(config[tokenName]);
    this.cookieStorage.removeItem(config[tokenName], '/');
    if(tokenName == "airlinesTokenName") {
      this.cookieStorage.setItem(config[tokenName], token, config.sessionexpiration * (1 / 24) / 60, '/', undefined, false, 'Strict');
    }else{
      this.cookieStorage.setItem(config[tokenName], token, config.hotelSessionexpiration * (1 / 24) / 60, '/', undefined, false, 'Strict');
    }
  }

  getUserSession(tokenName = "airlinesTokenName"): any {
    // this.updateUserSession();
    let token = this.cookieStorage.getItem(config[tokenName]) || null;
    if (token == null) {
      this.router.navigateByUrl('/login');
    }
    return JSON.parse(token);
  }

  getUserName(tokenName = "airlinesTokenName"): any {
    this.updateUserSession();
    let token = this.cookieStorage.getItem(config[tokenName]) || null;
    if (token == null) {
      this.router.navigateByUrl('/login');
    }
    let userObj = JSON.parse(token) || {};
    return userObj.userName || '';
  }

  deleteUserSession(tokenName = "airlinesTokenName") {
    this.localStorage.removeItem('searchFormGroup');
    this.localStorage.removeItem('hotelSearchFormGroup');
    this.cookieStorage.removeItem(config[tokenName])
    return this.cookieStorage.removeItem(config["airlinesTokenName"]);
  }

  login(user: any, endPoint = "airlinesApiEndpointNET"): Observable<object> {
    const headerDict = {
      'Content-Type': 'application/json'
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    const ep = "object" === typeof environment[endPoint] ? environment[endPoint][getEnvironment()] : environment[endPoint];
    return this.httpClient.post(ep + 'authenticate', user).pipe(
      catchError(this.handleError)
    );
  }
  handleError(error) {
    let errorMessage = {};
    if (error.error instanceof ErrorEvent) {
      //  client-side error
      errorMessage = { code: '-1', Error: `${error.error.message}` };
    } else {
      //  server-side error
      errorMessage = { code: '-1', status: error.status, Error: error.message };

    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

  logout(endPoint = "airlinesApiEndpointNET"): Observable<object> {
    let userinfo = this.getUserSession();
    const headerDict = {
      'Content-Type': 'application/json',
      'token': userinfo.token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.httpClient.post(environment[endPoint] + 'logout', {}, requestOptions).pipe(
      catchError(this.handleError)
    );
  }
}
