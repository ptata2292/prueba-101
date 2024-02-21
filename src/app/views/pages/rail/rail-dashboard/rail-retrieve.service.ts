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
export class RailRetrieveService {

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getRails(railQuery) {
    return this.httpClient.post( environment.railApiEndpoint +  'railing/retrieveAll', railQuery).pipe(
      catchError(this.handleError)
    );
  }

  searchAirport(airportCode) {
    let params = new HttpParams();
    params = params.append('query', airportCode);
    return this.httpClient.get( environment.railApiEndpoint +  'airport/dropdown', {params: params}).pipe(
      catchError(this.handleError)
    );
  }

  searchRails(railQuery) {
    return this.httpClient.post( environment.railApiEndpoint +  'airshopping', railQuery).pipe(
      catchError(this.handleError)
    );
  }

  getAllAirport() {
    return this.httpClient.get( environment.railApiEndpoint +  'airport/all').pipe(
      catchError(this.handleError)
    );
  }

  saveFavoriteRails(railingId) {
    // console.log('favourite' + railingId);
    return this.httpClient.post( environment.railApiEndpoint +  'railing/favorite', { favoriteRailing: railingId });
  }

  saveUnfavoriteRails(railingId) {
    // console.log('unfavourite' + railingId);
    return this.httpClient.post( environment.railApiEndpoint +  'railing/unfavorite', { unfavoriteRailing: railingId });
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
