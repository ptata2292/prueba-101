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
export class TransportationRetrieveService {

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getTransportations(transportationQuery) {
    return this.httpClient.post( environment.transportationApiEndpoint +  'transportationing/retrieveAll', transportationQuery).pipe(
      catchError(this.handleError)
    );
  }

  searchAirport(airportCode) {
    let params = new HttpParams();
    params = params.append('query', airportCode);
    return this.httpClient.get( environment.transportationApiEndpoint +  'airport/dropdown', {params: params}).pipe(
      catchError(this.handleError)
    );
  }

  searchTransportations(transportationQuery) {
    return this.httpClient.post( environment.transportationApiEndpoint +  'airshopping', transportationQuery).pipe(
      catchError(this.handleError)
    );
  }

  getAllAirport() {
    return this.httpClient.get( environment.transportationApiEndpoint +  'airport/all').pipe(
      catchError(this.handleError)
    );
  }

  saveFavoriteTransportations(transportationingId) {
    // console.log('favourite' + transportationingId);
    return this.httpClient.post( environment.transportationApiEndpoint +  'transportationing/favorite', { favoriteTransportationing: transportationingId });
  }

  saveUnfavoriteTransportations(transportationingId) {
    // console.log('unfavourite' + transportationingId);
    return this.httpClient.post( environment.transportationApiEndpoint +  'transportationing/unfavorite', { unfavoriteTransportationing: transportationingId });
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
