import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams  } from '@angular/common/http';
// import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { config } from '../../../../shared/config';
import { LoginService } from '../../auth/login/login.service';
import {getHotelsAPI, getTenantModule} from '../../../../shared/tenant/tenant';
import { HotelData } from '../data/hotel-data';

@Injectable({
  providedIn: 'root'
})
export class HotelRetrieveService {

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getHotelFare(hotelOffersQuery) {
    const headers = new HttpHeaders().set('access-control-allow-origin', '*')
                                       .set('api_key', 'c8b129c2e8c53de7adc8e2d1ede8d5d3');

    return this.httpClient.post(
      'https://hotel-api-2445583353637.production.gw.apicast.io:443/api/v2/hotel/offers', 
      hotelOffersQuery,
      {headers}).pipe(
      // catchError(this.handleError)
    );
  }

  searchCity(cityString) {
    let params = new HttpParams();
    params = params.append('input', cityString);
    params = params.append('key', 'AIzaSyAGFsQyzAPZ4hzlfTK8Vi5CIxFCg0SE9UE');
    params = params.append('types', '(cities)');
    const headers = new HttpHeaders().set('access-control-allow-origin', '*');
    return this.httpClient.get( 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=boston&key=AIzaSyAGFsQyzAPZ4hzlfTK8Vi5CIxFCg0SE9UE&types=(cities)', { headers }).pipe(
      // catchError(this.handleError)
    );
  }

  async getHotelDescriptions(hotels: Array<HotelData>){
    try{
      let query = {
        hotelDescriptionRQArray: hotels.map(i => {
          return{
            chainCode: i.basicPropertyInfo.chainCode,
            brandCode: i.basicPropertyInfo.brandCode,
            facilityCode: i.basicPropertyInfo.code
          };
        })
      };

      const headers = new HttpHeaders().set('access-control-allow-origin', '*')
                                       .set('api_key', 'c8b129c2e8c53de7adc8e2d1ede8d5d3');

      const res = await this.httpClient.post(
        'https://hotel-api-2445583353637.production.gw.apicast.io:443/api/v2/hotel/description', 
        query,
        {headers}).pipe(
          // catchError(this.handleError)
        ).toPromise();
        return JSON.parse(JSON.stringify(res));
    } catch (ex){
      throw ex;
    }
  }

  async getHotelDescription(hotelQuery) {
    try{
      let params = new HttpParams();
      params = params.append('chainCode', hotelQuery.chainCode);
      params = params.append('facilityCode', hotelQuery.code);
      if (hotelQuery.brandCode != undefined) {
        params = params.append('brandCode', hotelQuery.brandCode);
      }
      // const headers = new HttpHeaders().set('access-control-allow-origin', '*')
      // .set('api_key', 'c8b129c2e8c53de7adc8e2d1ede8d5d3');
      const res = await this.httpClient.get( getHotelsAPI() +  'api/v2/hotel/description', {params}).pipe(
        // catchError(this.handleError)
      ).toPromise();
      return JSON.parse(JSON.stringify(res));
    } catch (ex){
      throw ex;
    }
  }

  searchHotels(hotelQuery) {
    const headers = new HttpHeaders().set('access-control-allow-origin', '*')
                                      .set('api_key', 'c8b129c2e8c53de7adc8e2d1ede8d5d3');
    return this.httpClient.get( 'https://hotel-api-2445583353637.production.gw.apicast.io:443/api/v2/hotel?city='+hotelQuery.city+'&state=FL&country=US&distance=5&distanceunit=M', { headers }).pipe(
      // catchError(this.handleError)
    );
  }

  getAllAirport() {
    const headers = new HttpHeaders().set('access-control-allow-origin', '*')
                                      .set('api_key', 'c8b129c2e8c53de7adc8e2d1ede8d5d3');
    return this.httpClient.get( 'https://hotel-api-2445583353637.production.gw.apicast.io:443/api/v2/airport/all', {headers}).pipe(
      // catchError(this.handleError)
    );
  }



  // Hotel Image
  private isHilton(code) {
    return code.toUpperCase() === 'EH';
  }
  private isBW(code) {
    return ['BW', 'UR'].includes(code.toUpperCase());
  }

  private async getHotelImageURL(chain, facility) {
    if (!chain || !facility) {
      return null;
    }

    try {
      let params = new HttpParams();
      params = params.append('chain_code', chain);
      params = params.append('hotel_code', facility);
      const res = await this.httpClient.get(environment.hotelsImgEndpoint, {params}).pipe(
        // catchError(this.handleError)
      ).toPromise();
      if (typeof res === 'string') {
        const resObj = JSON.parse(res);
        if (resObj.Success.toUpperCase() === 'Y') {
          return resObj.PicUrl || resObj.ThumbUrl;
        }
      }
      // no image was there
      return null;
    } catch (ex) {
      return null;
    }
  }

  private getFakePropertyImage(chain) {
    let logoBW = "assets/media/Hotels/images.png";
    let logoHE = "assets/media/Hotels/noImageHilton.png";
    let logoOther = "assets/media/Hotels/images.png";

    return this.isHilton(chain) ? logoHE : (this.isBW(chain) ? logoBW : logoOther);
  }

  async getHotelImage(chain, facility) {
    const img = await this.getHotelImageURL(chain, facility);
    return img ? this.getFakePropertyImage('XE') : this.getFakePropertyImage(chain);
  }

  handleError(error) {
    console.log(error);
    let errorMessage = {};
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = {code: '-1', Error: `${error.error.message}`};
    } else {
      // server-side error
      errorMessage = {code: '-1', status: error.status, Error: error.message};
    }
    return throwError(errorMessage);
  }
}
