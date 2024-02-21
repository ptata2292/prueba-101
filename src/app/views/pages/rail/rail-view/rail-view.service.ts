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
export class RailViewService {

constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getRailByID(codeVersion, skipACL=false) {
    const userinfo = this.loginService.getUserSession();
    return this.httpClient.post( environment.railApiEndpoint + 'railing/railByID', {user: userinfo.userCode, objectCode: codeVersion, skipACL: skipACL});
  }

  railSave(rail: any) {
    const userinfo = this.loginService.getUserSession();
    let reqbody = {
      user: userinfo.userCode,
      objectCode: rail.objectCode,
      version: rail.version,
      saveMode: '0',
      Railing: rail
    };
    return this.httpClient.post( environment.railApiEndpoint +  'railing/save', reqbody);
  }

  searchRails(railQuery) {
    return this.httpClient.post( environment.railApiEndpoint +  'railing/search', railQuery).pipe(
      catchError(this.handleError)
    );
  }

  getObjectList(){
    return this.httpClient.get( environment.railApiEndpoint +  'railing/objectList').pipe(
      catchError(this.handleError)
    );
  }

  searchProperties(propertyQuery) {
    return this.httpClient.post( environment.railApiEndpoint +  'property/search', propertyQuery).pipe(
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
