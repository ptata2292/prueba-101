import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams  } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { config } from '../../../../shared/config';
import { LoginService } from '../../auth/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class GolfRetrieveService {

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getGolfs(golfQuery) {
    return this.httpClient.post( environment.golfApiEndpoint +  'golfing/retrieveAll', golfQuery).pipe(
      catchError(this.handleError)
    );
  }

  searchAirport(airportCode) {
    let params = new HttpParams();
    params = params.append('query', airportCode);
    return this.httpClient.get( environment.golfApiEndpoint +  'airport/dropdown', {params: params}).pipe(
      catchError(this.handleError)
    );
  }

  searchGolfs(golfQuery) {
    return this.httpClient.post( environment.golfApiEndpoint +  'airshopping', golfQuery).pipe(
      catchError(this.handleError)
    );
  }

  getAllAirport() {
    return this.httpClient.get( environment.golfApiEndpoint +  'airport/all').pipe(
      catchError(this.handleError)
    );
  }

  saveFavoriteGolfs(golfingId) {
    // console.log('favourite' + golfingId);
    return this.httpClient.post( environment.golfApiEndpoint +  'golfing/favorite', { favoriteGolfing: golfingId });
  }

  saveUnfavoriteGolfs(golfingId) {
    // console.log('unfavourite' + golfingId);
    return this.httpClient.post( environment.golfApiEndpoint +  'golfing/unfavorite', { unfavoriteGolfing: golfingId });
  }

  handleError(error) {
    console.log(error);
    let errorMessage = {};
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = {code:'-1', Error: `${error.error.message}`};
    } else {
      // server-side error
      errorMessage = {code:'-1', status: error.status, Error: error.message};
    }
    return throwError(errorMessage);
  }
}
