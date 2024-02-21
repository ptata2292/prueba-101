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
export class CruiseRetrieveService {

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getCruises(cruiseQuery) {
    return this.httpClient.post( environment.cruiseApiEndpoint +  'cruiseing/retrieveAll', cruiseQuery).pipe(
      catchError(this.handleError)
    );
  }

  searchAirport(airportCode) {
    let params = new HttpParams();
    params = params.append('query', airportCode);
    return this.httpClient.get( environment.cruiseApiEndpoint +  'airport/dropdown', {params: params}).pipe(
      catchError(this.handleError)
    );
  }

  searchCruises(cruiseQuery) {
    return this.httpClient.post( environment.cruiseApiEndpoint +  'airshopping', cruiseQuery).pipe(
      catchError(this.handleError)
    );
  }

  getAllAirport() {
    return this.httpClient.get( environment.cruiseApiEndpoint +  'airport/all').pipe(
      catchError(this.handleError)
    );
  }

  saveFavoriteCruises(cruiseingId) {
    // console.log('favourite' + cruiseingId);
    return this.httpClient.post( environment.cruiseApiEndpoint +  'cruiseing/favorite', { favoriteCruiseing: cruiseingId });
  }

  saveUnfavoriteCruises(cruiseingId) {
    // console.log('unfavourite' + cruiseingId);
    return this.httpClient.post( environment.cruiseApiEndpoint +  'cruiseing/unfavorite', { unfavoriteCruiseing: cruiseingId });
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
