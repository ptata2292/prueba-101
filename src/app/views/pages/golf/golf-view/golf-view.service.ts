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
export class GolfViewService {

constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getGolfByID(codeVersion, skipACL=false) {
    const userinfo = this.loginService.getUserSession();
    return this.httpClient.post( environment.golfApiEndpoint + 'golfing/golfByID', {user: userinfo.userCode, objectCode: codeVersion, skipACL: skipACL});
  }

  golfSave(golf: any) {
    const userinfo = this.loginService.getUserSession();
    let reqbody = {
      user: userinfo.userCode,
      objectCode: golf.objectCode,
      version: golf.version,
      saveMode: '0',
      Golfing: golf
    };
    return this.httpClient.post( environment.golfApiEndpoint +  'golfing/save', reqbody);
  }

  searchGolfs(golfQuery) {
    return this.httpClient.post( environment.golfApiEndpoint +  'golfing/search', golfQuery).pipe(
      catchError(this.handleError)
    );
  }

  getObjectList(){
    return this.httpClient.get( environment.golfApiEndpoint +  'golfing/objectList').pipe(
      catchError(this.handleError)
    );
  }

  searchProperties(propertyQuery) {
    return this.httpClient.post( environment.golfApiEndpoint +  'property/search', propertyQuery).pipe(
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
