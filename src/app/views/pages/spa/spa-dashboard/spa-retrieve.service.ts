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
export class SpaRetrieveService {

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getSpas(spaQuery) {
    return this.httpClient.post( environment.spaApiEndpoint +  'spaing/retrieveAll', spaQuery).pipe(
      catchError(this.handleError)
    );
  }

  searchAirport(airportCode) {
    let params = new HttpParams();
    params = params.append('query', airportCode);
    return this.httpClient.get( environment.spaApiEndpoint +  'airport/dropdown', {params: params}).pipe(
      catchError(this.handleError)
    );
  }

  searchSpas(spaQuery) {
    return this.httpClient.post( environment.spaApiEndpoint +  'airshopping', spaQuery).pipe(
      catchError(this.handleError)
    );
  }

  getAllAirport() {
    return this.httpClient.get( environment.spaApiEndpoint +  'airport/all').pipe(
      catchError(this.handleError)
    );
  }

  saveFavoriteSpas(spaingId) {
    // console.log('favourite' + spaingId);
    return this.httpClient.post( environment.spaApiEndpoint +  'spaing/favorite', { favoriteSpaing: spaingId });
  }

  saveUnfavoriteSpas(spaingId) {
    // console.log('unfavourite' + spaingId);
    return this.httpClient.post( environment.spaApiEndpoint +  'spaing/unfavorite', { unfavoriteSpaing: spaingId });
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
