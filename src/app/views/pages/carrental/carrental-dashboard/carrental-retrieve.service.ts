import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams  } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { config } from '../../../../shared/config';
import { LoginService } from '../../auth/login/login.service';
import {getCarsAPI} from "../../../../shared/tenant/tenant";

@Injectable({
  providedIn: 'root'
})
export class CarrentalRetrieveService {

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getCarAvailability(carAvailabilityQuery) {
    let params = new HttpParams();
    params = params.append('pickupLocation', carAvailabilityQuery.pickupLocation);
    params = params.append('dropoffLocation', carAvailabilityQuery.dropoffLocation);
    params = params.append('chainCode', carAvailabilityQuery.chainCode);
    params = params.append('brand', carAvailabilityQuery.brand);
    params = params.append('pickupDate', carAvailabilityQuery.pickupDate);
    params = params.append('dropoffDate', carAvailabilityQuery.dropoffDate);
    params = params.append('pickupTime', carAvailabilityQuery.pickupTime);
    params = params.append('dropoffTime', carAvailabilityQuery.dropoffTime);
    params = params.append('countryCode', carAvailabilityQuery.countryCode);

    return this.httpClient.get( getCarsAPI() +  'api/v1/car/availability', {params: params}).pipe(
      catchError(this.handleError)
    );
  }

  searchCarrentals(searchCity) {
    let params = new HttpParams();
    params = params.append('chainCode', 'AV');
    params = params.append('brand', 'Avis');
    params = params.append('keyword',searchCity);
    return this.httpClient.get( getCarsAPI() +  'api/v1/car/location', {params: params}).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error) {
    console.log(error);
    let errorMessage = {};
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = {code:'-1', Error: `${error.error}`};
    } else {
      // server-side error
      errorMessage = {code:'-1', status: error.status, Error: error.error};
    }
    return throwError(errorMessage);
  }
}
