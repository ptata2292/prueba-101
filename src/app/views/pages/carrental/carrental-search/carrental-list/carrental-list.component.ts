import { Component, OnInit, Input, ViewChild, EventEmitter, OnDestroy, SimpleChanges, SimpleChange, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { CarrentalRetrieveService } from '../../carrental-dashboard/carrental-retrieve.service';
import { config } from '../../../../../shared/config';
import { CarrentalItem } from './carrental-item/carrental-item';
import { LoginService } from '../../../auth/login/login.service';
import { collapseAnimation } from '../../../../../animations';
import { MyErrorStateMatcher, trip } from '../../../../../shared/models/carrental.model';
import { LocalStorage } from '../../../../../shared/storage/local-storage';
import { Carrental } from '../../carrental';

@Component({
  selector: 'app-carrental-list',
  templateUrl: './carrental-list.component.html',
  styleUrls: ['./carrental-list.component.css'],
  animations: [
    collapseAnimation
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CarrentalListComponent extends Carrental implements OnInit, AfterViewInit, OnDestroy {
  public props;
  public isLoading = false;
  private searchSubscription: Subscription;
  public radioSelected: trip = 'one';
  public carList = [];
  public errorMessage = '';

  @Input() search: Observable<any>;
  constructor(private carrentalRetrieveService: CarrentalRetrieveService, private router: Router,
              loginService: LoginService, private localStorage: LocalStorage) {
    super(loginService);
  }

  ngOnInit() {
    this.searchSubscription = this.search.subscribe((query) => {
      if(query != null) {
        this.searchCarRental(query);
      }
    });
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  searchCarRental(query) {
    this.isLoading = true;
    this.errorMessage = ''
    this.carrentalRetrieveService.getCarAvailability(query).
      subscribe((carData: any) => {
        console.log(carData);
        if(carData.offer != null && carData.offer.length > 0){
          this.carList = this.createFinalHotelOffers(carData.offer);
        }else if(carData.extensionPoint != null && carData.extensionPoint.any
          && carData.extensionPoint.any.length > 0){
            if(carData.offer != null && carData.offer.length == 0){
              this.isLoading = false;
              this.errorMessage = 'No Cars Are Available In Selected Location';
            }
        }else {
          if(carData.offer != null && carData.offer.length == 0){
            this.isLoading = false;
            this.errorMessage = 'No Cars Are Available In Selected Location';
          }
          console.log('response is not correct format');
        }
        this.isLoading = false;
      }, error=>{
        this.isLoading = false;
        console.log(error.Error.offer[0].extensionPoint.any[0].reason);
        this.errorMessage = error.Error.offer[0].extensionPoint.any[0].reason;
      });
  }

  public createFinalHotelOffers(cars) {
    let carsArray = [];
    for(let carObj of cars) {
      for(let index = 0; index < carObj.product.length; index++){
        if(carObj.product[index] != null && carObj.totalPrice.productPrice[index] != null){
          let finalCarObj = carObj;
          finalCarObj.product = carObj.product[index] || {};
          finalCarObj.productPrice = carObj.totalPrice.productPrice[index] || {};
          carsArray.push(finalCarObj);
        }
      }
    }
    carsArray = carsArray.sort((a, b) => a.totalPrice.total.value - b.totalPrice.total.value);
    return carsArray;
  }

  getTimeDiff(pFlightSegment, flightSegment) {
    const pFlightSegmentDate = new Date(pFlightSegment.arrivalDate + "T" + pFlightSegment.arrivalTime + ":00")
    const FlightSegmentDate = new Date(flightSegment.departureDate + "T" + flightSegment.departureTime + ":00")
    var diff = pFlightSegmentDate.getTime() - FlightSegmentDate.getTime();
    var diff_as_date = new Date(diff);
    // diff_as_date.getSeconds(); // second
    const hours = diff_as_date.getHours() < 9 ? "0" + diff_as_date.getHours() : diff_as_date.getHours();
    const minutes = diff_as_date.getMinutes() < 9 ? "0" + diff_as_date.getMinutes() : diff_as_date.getMinutes();
    const timeDiff = hours + "H " + minutes + "M";
    /*
    Plane change
    New Delhi (DEL) | 7hr 5mins Layover

    Terminal change
    Rome - Fiumicino Apt (FCO) ( 3 to 1 ) | 9hr 10mins Layover
    */
    //const str = "Stop:" + flightSegment.departureAirportCode + " waiting time:" + timeDiff;
    const str = flightSegment.departureAirportCode + " | " + timeDiff + " Layover";
    // console.log(str);
    return str;
  }

  bookNow(selectedCar) {
    console.log('Book Now');
    let carSearchFormGroup = this.localStorage.getItem('carSearchFormGroup');
    selectedCar['formGroup'] = JSON.parse(carSearchFormGroup);
    this.localStorage.setItem('selectedCar', JSON.stringify(selectedCar));
    this.router.navigateByUrl('/CarRental/Booking');
  }
































  filterAirOffers(offers)  {
    const offersMap = {};
    if (offers[0].flightsPlusSegments.length === 1) {
      for (let offer of offers) {
        if (offer.flightsPlusSegments[0].flight.flightKey in offersMap) {
          offersMap[offer.flightsPlusSegments[0].flight.flightKey].departureFlight.flightFares.push(this.getFlightFare(offer));
        } else {
          offersMap[offer.flightsPlusSegments[0].flight.flightKey] = this.createFinalizedOffers(offer);
        }
      }
    } else {
      for (let offer of offers) {
        if (offer.flightsPlusSegments[0].flight.flightKey.concat(offer.flightsPlusSegments[1].flight.flightKey) in offersMap) {
          offersMap[offer.flightsPlusSegments[0].flight.flightKey.concat(offer.flightsPlusSegments[1].flight.flightKey)].departureFlight.flightFares.push(this.getFlightFare(offer));
        } else {
          offersMap[offer.flightsPlusSegments[0].flight.flightKey.concat(offer.flightsPlusSegments[1].flight.flightKey)] = this.createFinalizedOffers(offer);
        }
      }
    }
    //console.log(offersMap);
    const offersMapKeys = Object.keys(offersMap);
    let filteredAirOffers = [];
    for (let offerKey of offersMapKeys) {
      filteredAirOffers = filteredAirOffers.concat(offersMap[offerKey]);
    }
    // console.log(filteredAirOffers);
    return filteredAirOffers;
  }

  getFlightFare(offer) {
    let flightFare = {
      totalPrice: (Number(offer.totalPrice.detailCurrencyPrice.total.text) * 0.01),
      cabinType: offer.offerItem.fareDetail.fareComponent[0].fareBasis.cabinType.cabinTypeName.includes("COACH") ? "Coach Economy" : "First Class",
      offerID: offer.offerID,
      offerItemID: offer.offerItem.offerItemID
    };
    /*for(let t of offer.offerItem.fareDetail.price.taxes.breakdown.tax) {
      t.amount.text =(Number(t.amount.text) * 0.01)
    }
    let flightFare = {
      totalPrice: (Number(offer.offerItem.totalPriceDetail.totalAmount.detailCurrencyPrice.total.text) * 0.01),
      priceCode: Number(offer.offerItem.totalPriceDetail.totalAmount.detailCurrencyPrice.total.code),
      cabinType: offer.offerItem.fareDetail.fareComponent[0].fareBasis.cabinType.cabinTypeName.includes("COACH") ? "Coach Economy" : "First Class",
      offerID: offer.offerID,
      offerItemID: offer.offerItem.offerItemID,
      baseAmount: (Number(offer.offerItem.fareDetail.price.baseAmount.text) * 0.01),
      tax: offer.offerItem.fareDetail.price.taxes.breakdown.tax
    };*/
    return flightFare;
  }

  createFinalizedOffers(offer) {
    let finalizedOffers = [];
    for (let flightsPlusSegment of offer.flightsPlusSegments) {
      let flightSegments = flightsPlusSegment.flightSegments.map(segment => {
        return {
          carrentalID: segment.flightSegment.marketingCarrier.carrentalID,
          flightNumber: segment.flightSegment.marketingCarrier.flightNumber,
          aircraftName: segment.flightSegment.equipment.name,
          departureAirportCode: segment.flightSegment.departure.airportCode,
          arrivalAirportCode: segment.flightSegment.arrival.airportCode,

          departureDate: segment.flightSegment.departure.date,
          departureTime: segment.flightSegment.departure.time,
          departureAirportName: segment.flightSegment.departure.airportName,
          departureTerminal: segment.flightSegment.departure.terminal,
          arrivalDate: segment.flightSegment.arrival.date,
          arrivalTime: segment.flightSegment.arrival.time,
          arrivalAirportName: segment.flightSegment.arrival.airportName,
          arrivalTerminal: segment.flightSegment.arrival.terminal,
          carrentalName: segment.flightSegment.marketingCarrier.name
        }
      });
      let flightFareOld = {
        totalPrice: (Number(offer.totalPrice.detailCurrencyPrice.total.text) * 0.01),
        cabinType: offer.offerItem.fareDetail.fareComponent[0].fareBasis.cabinType.cabinTypeName.includes("COACH") ? "Coach Economy" : "First Class",
        offerID: offer.offerID,
        offerItemID: offer.offerItem.offerItemID
      };
      let flightFare = {
        totalPrice: (Number(offer.totalPrice.detailCurrencyPrice.total.text) * 0.01),
        cabinType: offer.offerItem.fareDetail.fareComponent[0].fareBasis.cabinType.cabinTypeName.includes("COACH") ? "Coach Economy" : "First Class",
        offerID: offer.offerID,
        offerItemID: offer.offerItem.offerItemID,
        baseAmount: (Number(offer.offerItem.fareDetail.price.baseAmount.text) * 0.01),
        tax: offer.offerItem.fareDetail.price.taxes.breakdown.tax
      };
      let flightFares = [];
      flightFares.push(flightFare);
      let finalizedOffer = {
        flightKey: flightsPlusSegment.flight.flightKey,
        shoppingResponseID: this.props.flightSearchResult.shoppingResponseID,
        departureAirportCode: flightsPlusSegment.flight.segmentReferences.onPoint,
        arrivalAirportCode: flightsPlusSegment.flight.segmentReferences.offPoint,
        departureTime: flightsPlusSegment.flightSegments[0].flightSegment.departure.time,
        arrivalTime: flightsPlusSegment.flightSegments.length > 1 ?
          flightsPlusSegment.flightSegments[flightsPlusSegment.flightSegments.length-1].flightSegment.arrival.time :
          flightsPlusSegment.flightSegments[0].flightSegment.arrival.time,
        flightDuration: `${flightsPlusSegment.flight.journey.time.substring(2,5)} ${flightsPlusSegment.flight.journey.time.substring(5)}`,
        numberOfStops: flightsPlusSegment.flightSegments.length === 1 ? "Nonstop" : `${flightsPlusSegment.flightSegments.length-1} Stop(s)`,
        flightSegments: flightSegments,
        flightFares: flightFares,



        departureAirportName: flightsPlusSegment.flightSegments[0].flightSegment.departure.airportName,
        arrivalAirportName: flightsPlusSegment.flightSegments[flightsPlusSegment.flightSegments.length-1].flightSegment.arrival.airportName
      };
      finalizedOffers.push(finalizedOffer);
    }
    if (finalizedOffers.length > 1) {
      return {
        departureFlight: finalizedOffers[0],
        returnFlight: finalizedOffers[1]
      };
    } else {
      return {
        departureFlight: finalizedOffers[0]
      }
    }
  }

}
