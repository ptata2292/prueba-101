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
export class SpaViewService {

constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getSpaByID(codeVersion, skipACL=false) {
    const userinfo = this.loginService.getUserSession();
    return this.httpClient.post( environment.spaApiEndpoint + 'spaing/spaByID', {user: userinfo.userCode, objectCode: codeVersion, skipACL: skipACL});
  }

  spaSave(spa: any) {
    const userinfo = this.loginService.getUserSession();
    let reqbody = {
      user: userinfo.userCode,
      objectCode: spa.objectCode,
      version: spa.version,
      saveMode: '0',
      Spaing: spa
    };
    return this.httpClient.post( environment.spaApiEndpoint +  'spaing/save', reqbody);
  }

  searchSpas(spaQuery) {
    return this.httpClient.post( environment.spaApiEndpoint +  'spaing/search', spaQuery).pipe(
      catchError(this.handleError)
    );
  }

  getObjectList(){
    return this.httpClient.get( environment.spaApiEndpoint +  'spaing/objectList').pipe(
      catchError(this.handleError)
    );
  }

  searchProperties(propertyQuery) {
    return this.httpClient.post( environment.spaApiEndpoint +  'property/search', propertyQuery).pipe(
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
