import { Injectable } from '@angular/core';
import { config } from '../../../../shared/config';
import { LoginService } from '../../auth/login/login.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CruiseViewService {

constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getCruiseByID(codeVersion, skipACL=false) {
    const userinfo = this.loginService.getUserSession();
    return this.httpClient.post( environment.cruiseApiEndpoint + 'cruiseing/cruiseByID', {user: userinfo.userCode, objectCode: codeVersion, skipACL: skipACL});
  }

  cruiseSave(cruise: any) {
    const userinfo = this.loginService.getUserSession();
    let reqbody = {
      user: userinfo.userCode,
      objectCode: cruise.objectCode,
      version: cruise.version,
      saveMode: '0',
      Cruiseing: cruise
    };
    return this.httpClient.post( environment.cruiseApiEndpoint +  'cruiseing/save', reqbody);
  }

  searchCruises(cruiseQuery) {
    return this.httpClient.post( environment.cruiseApiEndpoint +  'cruiseing/search', cruiseQuery).pipe(
      catchError(this.handleError)
    );
  }

  getObjectList(){
    return this.httpClient.get( environment.cruiseApiEndpoint +  'cruiseing/objectList').pipe(
      catchError(this.handleError)
    );
  }

  searchProperties(propertyQuery) {
    return this.httpClient.post( environment.cruiseApiEndpoint +  'property/search', propertyQuery).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = {};
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = {code:'-1', Error: `${error.error.message}`};
    } else {
      // server-side error
      errorMessage = {code:'-1', status: error.status, Error: error.message};

    }
    //window.alert(errorMessage);
    console.log(error)
    return throwError(errorMessage);
  }
}
