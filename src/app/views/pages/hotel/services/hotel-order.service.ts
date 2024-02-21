import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams  } from '@angular/common/http';
// import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { config } from '../../../../shared/config';
import { LoginService } from '../../auth/login/login.service';
import {getHotelsAPI} from "../../../../shared/tenant/tenant";

@Injectable({
  providedIn: 'root'
})
export class HotelOrderService {
  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getOrderById(orderQuery) {
    let params = new HttpParams();
    params = params.append('confirmationId', orderQuery.confirmationId);
    params = params.append('surname', orderQuery.surname);
    params = params.append('chainCode', orderQuery.chainCode);
    return this.httpClient.get( getHotelsAPI() +  'api/v2/hotel/order', {params: params}).pipe(
      // catchError(this.handleError)
    );
  }

  cancelOrderById(orderId: string) {
    let params = new HttpParams();
    // params = params.append('query', airportCode);
    return this.httpClient.delete( getHotelsAPI() +  'api/v2/hotel/order' + orderId, {params: params}).pipe(
      // catchError(this.handleError)
    );
  }


  getOrderByName(firstName: string, lastName: string) {
    let params = new HttpParams();
    params = params.append('firstName', firstName);
    params = params.append('lastName', lastName);
    return this.httpClient.get( getHotelsAPI() +  'orders/name', {params: params}).pipe(
      // catchError(this.handleError)
    );
  }

  createOrder(hotelOrderQuery) {
    return this.httpClient.post( getHotelsAPI() +  'api/v2/hotel/order', hotelOrderQuery).pipe(
      // catchError(this.handleError)
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
