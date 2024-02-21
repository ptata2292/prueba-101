import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams  } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { config } from '../../../shared/config';
import { LoginService } from '../auth/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class GolfOrderService {
  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  gerOrderById(orderId: string) {
    let params = new HttpParams();
    // params = params.append('query', airportCode);
    return this.httpClient.get( environment.golfApiEndpoint +  'orders/'+ orderId, {params: params}).pipe(
      catchError(this.handleError)
    );
  }

  cancelOrderById(orderId: string) {
    let params = new HttpParams();
    // params = params.append('query', airportCode);
    return this.httpClient.delete( environment.golfApiEndpoint +  'orders/'+ orderId, {params: params}).pipe(
      catchError(this.handleError)
    );
  }


  gerOrderByName(firstName: string, lastName: string) {
    let params = new HttpParams();
    params = params.append('firstName', firstName);
    params = params.append('lastName', lastName);
    return this.httpClient.get( environment.golfApiEndpoint +  'orders/name', {params: params}).pipe(
      catchError(this.handleError)
    );
  }

  createOrder(golfOrderQuery) {
    return this.httpClient.post( environment.golfApiEndpoint +  'orders', golfOrderQuery).pipe(
      catchError(this.handleError)
    );
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
