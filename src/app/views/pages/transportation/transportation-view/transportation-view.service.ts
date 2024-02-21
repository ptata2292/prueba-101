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
export class TransportationViewService {

constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getTransportationByID(codeVersion, skipACL=false) {
    const userinfo = this.loginService.getUserSession();
    return this.httpClient.post( environment.transportationApiEndpoint + 'transportationing/transportationByID', {user: userinfo.userCode, objectCode: codeVersion, skipACL: skipACL});
  }

  transportationSave(transportation: any) {
    const userinfo = this.loginService.getUserSession();
    let reqbody = {
      user: userinfo.userCode,
      objectCode: transportation.objectCode,
      version: transportation.version,
      saveMode: '0',
      Transportationing: transportation
    };
    return this.httpClient.post( environment.transportationApiEndpoint +  'transportationing/save', reqbody);
  }

  searchTransportations(transportationQuery) {
    return this.httpClient.post( environment.transportationApiEndpoint +  'transportationing/search', transportationQuery).pipe(
      catchError(this.handleError)
    );
  }

  getObjectList(){
    return this.httpClient.get( environment.transportationApiEndpoint +  'transportationing/objectList').pipe(
      catchError(this.handleError)
    );
  }

  searchProperties(propertyQuery) {
    return this.httpClient.post( environment.transportationApiEndpoint +  'property/search', propertyQuery).pipe(
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
