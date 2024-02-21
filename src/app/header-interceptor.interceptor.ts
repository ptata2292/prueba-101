import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { LoginService } from './views/pages/auth/login/login.service';
import { config } from './shared/config';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {environment} from '../environments/environment';
import {getHotelsAPI} from "./shared/tenant/tenant";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor( private loginService: LoginService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url.indexOf('v1/auth') === -1 && request.url.indexOf(environment.airlinesApiEndpointNET) != -1) {
      const userinfo = this.loginService.getUserSession();
      // const appendedObj = {
      //   user: userinfo.userCode
      // };
      // const reqBody: any = request.body;
      const authReq = request.clone({
        headers: request.headers
                    .set('Authorization', 'Bearer ' + userinfo.token)
                    .set('content-type', 'application/json'),
        // body: { ...reqBody, ...appendedObj}
      });
      return next.handle(authReq).pipe(catchError(x=> this.handleAuthError(x)));
    } else if (request.url.indexOf('authenticate') === -1 && request.url.indexOf(getHotelsAPI()) != -1) {
      const userinfo = this.loginService.getUserSession('hotelsTokenName');
      // const appendedObj = {
      //   user: userinfo.userCode
      // };
      // const reqBody: any = request.body;
      const authReq = request.clone({
        headers: request.headers
                    .set('Authorization', 'Bearer ' + userinfo.jwt)
                    .set('content-type', 'application/json'),
        // body: { ...reqBody, ...appendedObj}
      });
      return next.handle(authReq).pipe(catchError(x=> this.handleAuthError(x)));
    } else {
      return next.handle(request);
    }
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
        //navigate /delete cookies or whatever
        alert('Unauthorized Access');
        this.router.navigateByUrl("/login");
        // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
        return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(err);
  }
}
