import { Injectable } from '@angular/core';
import { config } from '../../../../shared/config';
import { LoginService } from '../../auth/login/login.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {getCarsAPI} from "../../../../shared/tenant/tenant";

@Injectable({
  providedIn: 'root'
})
export class CarrentalViewService {

constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getCarrentalByID(codeVersion, skipACL=false) {
    const userinfo = this.loginService.getUserSession();
    return this.httpClient.post( getCarsAPI() + 'carrentaling/carrentalByID', {user: userinfo.userCode, objectCode: codeVersion, skipACL: skipACL});
  }

  carrentalSave(carrental: any) {
    const userinfo = this.loginService.getUserSession();
    let reqbody = {
      user: userinfo.userCode,
      objectCode: carrental.objectCode,
      version: carrental.version,
      saveMode: '0',
      Carrentaling: carrental
    };
    return this.httpClient.post( getCarsAPI() +  'carrentaling/save', reqbody);
  }

  searchCarrentals(carrentalQuery) {
    return this.httpClient.post( getCarsAPI() +  'carrentaling/search', carrentalQuery).pipe(
      catchError(this.handleError)
    );
  }

  getObjectList(){
    return this.httpClient.get( getCarsAPI() +  'carrentaling/objectList').pipe(
      catchError(this.handleError)
    );
  }

  searchProperties(propertyQuery) {
    return this.httpClient.post( getCarsAPI() +  'property/search', propertyQuery).pipe(
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
