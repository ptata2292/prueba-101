import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { catchError, retry, switchMap, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { getAirAPI } from 'src/app/shared/tenant/tenant';
import { AirlineErrorService } from './airline-error.service';
import { AirlineLoaderService } from './airline-loader.service';

@Injectable({
  providedIn: 'root'
})
export class AirlineRetrieveService {
  
  private maxRetryCount: number = 4;

  constructor(private httpClient: HttpClient,
    private airlineLoaderService: AirlineLoaderService,
    private errorService: AirlineErrorService) { }

  // GET methods
  searchAirport(airportCode) { 
    let url =  environment.airlinesApiEndpointNET +  'airport/dropdown';
    let params = new HttpParams();
    params = params.append('query', airportCode);
    this.errorService.hideErrors();
    return this.httpClient.get(url, {params: params}).pipe(
      switchMap(data => this.catchFailResponse(data, url)),
      retry(this.maxRetryCount),
      catchError(e => this.handleError(e)),
    );
  }

  getOrderByName(firstName: string, lastName: string) {
    let url =  getAirAPI() +  'orders/name';
    let params = new HttpParams();
    if(!firstName){
      firstName = ' ';
    }
    if(!lastName){
      lastName = ' ';
    }
    params = params.append('firstName', firstName);
    params = params.append('lastName', lastName);
    this.errorService.hideErrors();
    this.airlineLoaderService.showSearchResultLoader("Loading orders...");
    return this.httpClient.get(url, {params: params}).pipe(
      switchMap(data => this.catchFailResponse(data, url)),
      retry(this.maxRetryCount),
      catchError(e => this.handleError(e))
    );
  }
  
  getOrderById(orderId: string) {
    let url =  getAirAPI() +  'orders/'+ orderId;
    this.errorService.hideErrors();
    this.airlineLoaderService.showLoader("Loading order info...");
    return this.httpClient.get(url).pipe(
      switchMap(data => this.catchFailResponse(data, url)),
      retry(this.maxRetryCount),
      catchError(e => this.handleError(e))
    );
  } 

  getOrderByRefId(aaId: string, firelogixId: string) {
    let url = getAirAPI() +  'orders/refid';
    let params = new HttpParams();
    params = params.append('AAID', aaId);
    params = params.append('FLXID', firelogixId);
    this.errorService.hideErrors();
    this.airlineLoaderService.showLoader();
    return this.httpClient.get(url, {params: params}).pipe(
      switchMap(data => this.catchFailResponse(data, url)),
      retry(this.maxRetryCount),
      catchError(e => this.handleError(e))
    );
  } 

  // POST methods
  searchAirlines(query) {
    let url = getAirAPI() +  'airshopping';
    this.errorService.hideErrors();
    this.airlineLoaderService.showSearchResultLoader("Searching best flights...");
    return this.httpClient.post(url, query).pipe(
      switchMap(data => this.catchFailResponse(data, url, query)),
      retry(this.maxRetryCount),
      catchError(e => this.handleError(e))
    );
  }


  getOfferPrice(query) {
    let url =  getAirAPI() +  'offerprice';
    this.errorService.hideErrors();
    this.airlineLoaderService.showLoader("Booking selected offer...");
    return this.httpClient.post(url, query).pipe(
      switchMap(data => this.catchFailResponse(data, url, query)),
      retry(this.maxRetryCount),
      catchError(e => this.handleError(e))
    );
  }
  
  createOrder(query) {
    let url =  getAirAPI() +  'orders';
    this.errorService.hideErrors();
    this.airlineLoaderService.showLoader("Creating order...");
    return this.httpClient.post(url, query).pipe(
      switchMap(data => this.catchFailResponse(data, url, query)),
      retry(this.maxRetryCount),
      catchError(e => this.handleError(e))
    );
  }

  orderChange(query, text, skipHideLoader?: boolean) {
    let url =  getAirAPI() +  'orderchange';
    this.airlineLoaderService.showLoader(text);
    return this.httpClient.post(url, query).pipe(
      switchMap(data => this.catchFailResponse(data, url, query, skipHideLoader)),
      retry(this.maxRetryCount),
      catchError(e => this.handleError(e))
    );
  }

  orderReshop(query) {
    let url =  getAirAPI() +  'reshop';
    this.errorService.hideErrors();
    this.airlineLoaderService.showSearchResultLoader("Searching best flights...");
    return this.httpClient.post(url, query).pipe(
      switchMap(data => this.catchFailResponse(data, url, query)),
      retry(this.maxRetryCount),
      catchError(e => this.handleError(e))
    );
  }
  
  getSeatAvailability(query) {
    let url = getAirAPI() +  'seatavailability';
    this.errorService.hideErrors();
    this.airlineLoaderService.showSearchResultLoader("Loading available seats...");
    return this.httpClient.post(url, query).pipe(
      switchMap(data => this.catchFailResponse(data, url, query)),
      retry(this.maxRetryCount),
      catchError(e => this.handleError(e))
    );
  } 

  // DELETE methods
  cancelOrderById(orderId: string) {
    let url =  getAirAPI() + 'orders/'+ orderId;
    this.errorService.hideErrors();
    this.airlineLoaderService.showLoader("Cancelling order...");
    return this.httpClient.delete(url).pipe(
      switchMap(data => this.catchFailResponse(data, url)),
      retry(this.maxRetryCount),
      catchError(e => this.handleError(e))
    );
  }

  // helpers
  private catchFailResponse(data: any, url: string, query?: any, skipHideLoader?: boolean) {
    
    let warnings = [];
    let errors = [];
    let generalErrors = [];
    let showErrorInfo = false;
    let throwErrorRequired = false;
    if(!data){
      generalErrors.push({ value: "Empty response from " + url, data: query});
      showErrorInfo = true;
      throwErrorRequired = true;
    }
    if(data && data.errors){
      showErrorInfo = true;
      throwErrorRequired = true;
      data.errors.error.forEach(e => errors.push(e));
    }
    
    if(data && data.warnings){
      showErrorInfo = true;
      data.warnings.warning.forEach(w => warnings.push(w));
    }
    if(showErrorInfo){
      if(throwErrorRequired){
        return throwError({linksrezError: { errors, warnings, generalErrors}});
      }
      this.errorService.showErrors(errors, warnings, generalErrors);
    }
    
    if(!skipHideLoader){
      this.airlineLoaderService.hideLoader();
      this.airlineLoaderService.hideSearchResultLoader();
    }

    return of(data);
  }

  private handleError(error) {
    this.airlineLoaderService.hideLoader();
    this.airlineLoaderService.hideSearchResultLoader();
    if(!error){
      return throwError(error);
    }

    if(error.linksrezError){
      this.errorService.showErrors(error.linksrezError.errors, error.linksrezError.warnings, error.linksrezError.generalErrors);
      return;
    }

    let errors = [];
    let warnings = [];
    let generalErrors = [];
    if (error.error instanceof ErrorEvent) {
      // client-side error
      generalErrors.push({ value: `${error.error.message}`});
    } else {
      // server-side error
      errors.push({status: error.status, value: error.message});
    }
    
    this.errorService.showErrors(errors, warnings, generalErrors);
  }
}
