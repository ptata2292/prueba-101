import { Component, OnInit, Input, ViewChild, EventEmitter, OnDestroy, SimpleChanges, SimpleChange, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { TransportationRetrieveService } from '../../transportation-dashboard/transportation-retrieve.service';
import { config } from '../../../../../shared/config';
import { TransportationItem } from './transportation-item/transportation-item';
import { LoginService } from '../../../auth/login/login.service';
import { collapseAnimation } from '../../../../../animations';
import { MyErrorStateMatcher, trip } from '../../../../../shared/models/transportation.model';
import { LocalStorage } from '../../../../../shared/storage/local-storage';
import { Transportation } from '../../transportation';

@Component({
  selector: 'app-transportation-list',
  templateUrl: './transportation-list.component.html',
  styleUrls: ['./transportation-list.component.css'],
  animations: [
    collapseAnimation
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TransportationListComponent extends Transportation implements OnInit, AfterViewInit, OnDestroy {

  public flightList = [];
  public props;
  public isLoading = false;
  public selectedFlight: any;
  private searchSubscription: Subscription;
  public radioSelected : trip = "one";

  @Input() search: Observable<any>;
  constructor(private transportationRetrieveService: TransportationRetrieveService, private router: Router, 
              loginService: LoginService, private localStorage: LocalStorage) {
    super(loginService);
  }

  ngOnInit() {
    this.searchSubscription = this.search.subscribe((query) => {
      if(query != null) {
        this.searchTransportation(query);
      }
    });
  }
  
  ngAfterViewInit() {  
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  searchTransportation(query) {
    this.isLoading = true;
    this.selectedFlight = null;
    this.flightList = [];
    if(query.Flights.length > 1) {
      this.radioSelected = "round";
    } else {
      this.radioSelected = "one";
    }
    this.transportationRetrieveService.searchTransportations(query).
      subscribe((data: any) => {
        const offersWithDetails = data.offersWithDetails;
        if( offersWithDetails != null && offersWithDetails.length > 0
          && offersWithDetails[0].flightsPlusSegments != null && offersWithDetails[0].flightsPlusSegments.length > 0) {
            this.getSortedData(data);
            // console.log('flightList' + this.flightList.length);        
        } else {
          console.log('response is not correct format');  
        }
        this.isLoading = false;
      });
  }

  toggleFare(flightObj) {
    if(flightObj.showPrices == null){
      flightObj.showPrices = false;
    }
    flightObj.showPrices = !flightObj.showPrices; 
  }

  selectFare(flight, flightFare) {
    if(this.selectedFlight != null){
      for(let selectedFlight of this.selectedFlight.departureFlight.flightFares){
        selectedFlight.selectedFare = false;
      }  
      this.selectedFlight.selected = false;
    }
    this.selectedFlight = flight;
    this.selectedFlight.selected = true;
    this.selectedFlight.radioSelected = this.radioSelected;
    for(let selectedFlight of this.selectedFlight.departureFlight.flightFares){
      selectedFlight.selectedFare = false;
    }    
    flightFare.selectedFare = true;
  }

  getSortedData(data) {
    this.props = {
      flightSearchResult: data
    };
    let list = [];
    list = this.filterAirOffers(this.props.flightSearchResult.offersWithDetails);
    list = list.sort((a, b) => a.departureFlight.flightFares[0].totalPrice - b.departureFlight.flightFares[0].totalPrice);
    for(let flight of list) {
      if(flight.departureFlight.flightSegments.length > 1){
        // console.log(flight.departureFlight.flightSegments);
        flight.departureFlight.popUpMessage = "";
        let departureStops = [];       
        let popUpMessage = [];
        for(let i=1; i < flight.departureFlight.flightSegments.length; i++) {
          const flightSegment = flight.departureFlight.flightSegments[i];
          const pFlightSegment = flight.departureFlight.flightSegments[i-1];
          departureStops.push(flightSegment.departureAirportCode);
          popUpMessage.push(this.getTimeDiff(pFlightSegment, flightSegment));
        }
        flight.departureFlight.numberOfStops = flight.departureFlight.numberOfStops +  " via " + departureStops.join(", ");      
        flight.departureFlight.popUpMessage = popUpMessage.join("\n");   
      }
      if(this.radioSelected == 'round' && flight.returnFlight.flightSegments.length > 1){
        // console.log(flight.returnFlight.flightSegments);
        flight.returnFlight.popUpMessage = "";
        let returnStops = [];
        let popUpMessage = [];
        for(let i=1; i < flight.returnFlight.flightSegments.length; i++) {
          const flightSegment = flight.returnFlight.flightSegments[i];
          const pFlightSegment = flight.departureFlight.flightSegments[i-1];
          returnStops.push(flightSegment.departureAirportCode);
          popUpMessage.push(this.getTimeDiff(pFlightSegment, flightSegment));
        }
        flight.returnFlight.numberOfStops = flight.returnFlight.numberOfStops +  " via " + returnStops.join(", ");       
        flight.returnFlight.popUpMessage = popUpMessage.join("\n");      
      }
      /* 
      aircraftName: "Embraer 175"
      transportationID: "AA"
      arrivalAirportCode: "STL"
      arrivalAirportName: "St Louis Lambert Intl Apt, US"
      arrivalDate: "2020-10-01"
      arrivalTerminal: {name: "1"}
      arrivalTime: "16:42"
      departureAirportCode: "DFW"
      departureAirportName: "Dallas Dallas-Fort Worth Intl Apt, US"
      departureDate: "2020-10-01"
      departureTerminal: {name: "0"}
      departureTime: "15:00"
      flightNumber: "3400"
      
      Plane change
      New Delhi (DEL) | 7hr 5mins Layover
      
      Terminal change
      Rome - Fiumicino Apt (FCO) ( 3 to 1 ) | 9hr 10mins Layover */

      this.getSortedCabinTypeData(flight, 'departureFlight');
      /*if(this.radioSelected == "round"){
        this.getSortedCabinTypeData(flight, 'returnFlight');
      }*/

    }
    this.flightList = list;
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

  getSortedCabinTypeData(flight, type) {
    let flightFares = flight[type].flightFares;
    let fares = {
      "Economy":[],
      "First Class": []
    };
    for(const flightFare of flightFares){
      flightFare.cabinType = flightFare.cabinType == "Coach Economy" ? "Economy" : flightFare.cabinType;
      fares[flightFare.cabinType] = fares[flightFare.cabinType] || [];
      fares[flightFare.cabinType].push(flightFare);
    }
    for(const fare in fares){
      fares[fare] = fares[fare].sort((a, b) => a.totalPrice - b.totalPrice);
    }
    let sortedFlightFares = [];
    sortedFlightFares.push(...fares["Economy"]);
    sortedFlightFares.push(...fares["First Class"]);
    flight[type].flightFares = sortedFlightFares;
  }

  bookNow() {
    console.log('Book Now');
    this.localStorage.setItem('selectedFlight', JSON.stringify(this.selectedFlight));
    this.router.navigateByUrl('/Transportations/Booking');
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
          transportationID: segment.flightSegment.marketingCarrier.transportationID,
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
          transportationName: segment.flightSegment.marketingCarrier.name
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
