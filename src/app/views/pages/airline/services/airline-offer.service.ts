import { Injectable } from '@angular/core';
import { timeFormat } from 'src/app/shared/models/airline.model';
import { ArrayHelperService } from 'src/app/shared/services/array-helper.service';
import { AirlineOfferWithDetails } from '../models/offer/airline-offer-details';
import { AirlineOfferItem } from '../models/offer/airline-offer-item';
import { AirlinePricedOfferResponse } from '../models/offer/airline-priced-offer';
import { AirlineReshopOffer } from '../models/order/airline-reshop';
import { AirlinePassenger } from '../models/passenger/airline-passenger';
import { AirlineFareViewModel } from '../viewmodels/airline-fare-price';
import { AirlineFlightViewModel } from '../viewmodels/airline-flight';
import { AirlineFlightFareViewModel } from '../viewmodels/airline-flight-fare';
import { AirlineGrouppedFlightsViewModel } from '../viewmodels/airline-groupped-flights';
import { AirlineOfferViewModel } from '../viewmodels/airline-offer';
import { AirlinePassengerSummaryViewModel } from '../viewmodels/airline-passenger';
import { AirlineSearch } from '../viewmodels/airline-search';
import { AirlineSearchResult } from '../viewmodels/airline-search-result';
import { AirlineDatetimeService } from './airline-datetime.service';
import { AirlineFareService } from './airline-fare.service';
import { AirlineFlightService } from './airline-flight.service';
import { AirlinePassengerService } from './airline-passenger.service';
import { AirlineRetrieveService } from './airline-retrieve.service';

@Injectable({
  providedIn: 'root'
})
export class AirlineOfferService {
  
  constructor(private airlineDatetimeService : AirlineDatetimeService,
    private passengerService: AirlinePassengerService,
    private airlineFlightService: AirlineFlightService,
    private airlineFareService: AirlineFareService,
    private airlineRetrieveService: AirlineRetrieveService,
    private arrayHelperService: ArrayHelperService) { }
    private sortByCabinTypeAndPrice: Array<(fare: AirlineFlightFareViewModel) => number> = [
      el => ["Economy", "First Class"].indexOf(el.cabinType),
      el => el.totalPrice, 
    ];


  findOffers(airlineSearch: AirlineSearch) {
    let passengers = [];
    this.arrayHelperService.groupBy(airlineSearch.travellers, k => k.ptc).forEach(group => {
      group.value.forEach((el, idx) => {
        passengers.push({ passengerID: this.passengerService.titleByPtc(group.key, idx + 1), ptc: group.key })
      });
    });

    let query = {
      Flights:[ ],
      Passengers: this.passengerService.setLoyaltyProgramPassengers(passengers, airlineSearch)
    }

    airlineSearch.flights.forEach((item) => {

      let departureAirportCode = item.from.data || item.from.id || item.from;
      let arrivalAirportCode = item.to.data || item.to.id || item.to;
      let departureDate = this.airlineDatetimeService.truncateTime(item.departureDate);

      query.Flights.push({
        "departure":{
          airportCode:{
            value: departureAirportCode
          },
          date: departureDate,
        },
        "arrival": {
          airportCode:{
            value: arrivalAirportCode
          }
        }
      });
    });

    return this.airlineRetrieveService.searchAirlines(query);
  }

  getPricedOffer(searchResult: AirlineSearchResult) {

    let offer = {
      offerItem: [],
      offerID: searchResult.selectedOffer.offerID,
      owner: searchResult.selectedOffer.originalOffer.owner,
      responseID: searchResult.responseID
    }

    let offerQuery = {
      "query": {
        "offer": []
      },
      "dataLists": {
        "passengerList": {
          "passenger": []
        },
      }
    }

    let passengers = [];
    this.arrayHelperService.groupBy(searchResult.airlineSearch.travellers, k => k.ptc).forEach(group => {
      let offerItem = {
          offerItemID: searchResult.selectedOffer.offerID + "-" + (offer.offerItem.length + 1),
          passengerRefs: []
      }
      group.value.forEach((el, idx) => {
        let passengerObj = {
          ptc: group.key,
          passengerID: this.passengerService.titleByPtc(group.key, idx + 1)
        }
        passengers.push(passengerObj);
        offerItem.passengerRefs.push(passengerObj.passengerID);
      });
      offer.offerItem.push(offerItem);
    });

    offerQuery.dataLists.passengerList.passenger = passengers;
    offerQuery.query.offer.push(offer);

    return this.airlineRetrieveService.getOfferPrice(offerQuery);
  }

  groupReshopOffers(reshopOffers: AirlineReshopOffer[], timeFormat: timeFormat): AirlineGrouppedFlightsViewModel[] {
    let list: Array<AirlineGrouppedFlightsViewModel> = this.arrayHelperService.groupBy(reshopOffers, 
      (k: AirlineReshopOffer) => k.flightsOverview.flightRef.map(fl => fl.value.flightKey).join(''),
      (val: AirlineReshopOffer) => val,
      (group: Array<AirlineReshopOffer>) => {
        return {
          flightList: group[0].flightsOverview.flightRef.map(i => this.airlineFlightService.createFlightViewModel(i.value.segmentReferences.value)),
          flightFares: this.arrayHelperService.sortBy(group.map(i => this.airlineFareService.flightFareFromReshop(i)), this.sortByCabinTypeAndPrice)
        };
      }).map(i => ({
        key: i.key,
        flightFares: i.total.flightFares,
        flightList: i.total.flightList,
      }));
      
    if (timeFormat === '12') {
      this.changeFlightTimeFormat(list, timeFormat);
    }

    list = list.sort((a, b) => a.flightFares[0].totalPrice - b.flightFares[0].totalPrice);
    return list;
  }
  

  groupOffersByFlights(offersWithDetails: Array<AirlineOfferWithDetails>, timeFormat: timeFormat): Array<AirlineGrouppedFlightsViewModel> {
    let list = this.arrayHelperService.groupBy(offersWithDetails,
      (key: AirlineOfferWithDetails) => key.flightsPlusSegments.map((segment) => segment.flight.flightKey).join(''),
      (val: AirlineOfferWithDetails) => val,
      (group: Array<AirlineOfferWithDetails>) => {
        return {
          flightList: group[0].flightsPlusSegments.map(i => this.airlineFlightService.createFlightViewModel(i.flight.segmentReferences.value)),
          flightFares: this.arrayHelperService.sortBy(group.map(i => this.airlineFareService.flightFareFromOffer(i)), this.sortByCabinTypeAndPrice),
        };
      }).map(i => ({
        key: i.key,
        flightFares: i.total.flightFares,
        flightList: i.total.flightList,
      }));

    if (timeFormat === '12') {
      this.changeFlightTimeFormat(list, timeFormat);
    }

    list = list.sort((a, b) => a.flightFares[0].totalPrice - b.flightFares[0].totalPrice);
    return list;
  }

  changeFlightTimeFormat(data: Array<AirlineGrouppedFlightsViewModel>, timeFormat: timeFormat) {
    data.forEach(group => group.flightList.forEach(flight => {

      flight.departureTime = this.airlineDatetimeService.changeTimeFormat(flight.departureTime, timeFormat);
      flight.arrivalTime = this.airlineDatetimeService.changeTimeFormat(flight.arrivalTime, timeFormat);

      if(flight.flightSegments && flight.flightSegments.length) {
        flight.flightSegments.forEach(segment => {
          segment.departureTime = this.airlineDatetimeService.changeTimeFormat(segment.departureTime, timeFormat);
          segment.arrivalTime = this.airlineDatetimeService.changeTimeFormat(segment.arrivalTime, timeFormat);
        });
      }
    }));
  }

  getPricedOfferViewModel(data: AirlinePricedOfferResponse): AirlineOfferViewModel {
    return this.getOfferViewModel(data.pricedOffer.offerItem, data.dataLists, data.shoppingResponseID.responseID.value, data.pricedOffer.owner, data.pricedOffer.offerID);
  }

  getReshopOfferViewModel(offer: AirlineReshopOffer, dataLists, responseID: string) {
    return this.getOfferViewModel(offer.addOfferItem, dataLists, responseID, offer.owner, offer.offerID);
  }

  getOfferViewModel(offerItems: AirlineOfferItem[], dataLists, responseID: string, owner: string, offerID: string){
    let flights = this.airlineFareService.getFlightList(offerItems[0].fareDetail[0].fareComponent);
    let passengers = dataLists.passengerList.passenger.map(i => this.getPassengerViewModel(i, offerItems));
    let viewModel: AirlineOfferViewModel = {
      dataLists: dataLists,
      responseID: responseID,
      offerID: offerID,
      owner: owner,
      flights: flights,
      passengers: passengers,
      offerItems: offerItems
    };

    if(passengers.length){
      passengers[0].showDetails = true;
    }

    return viewModel;
  }

  getPassengerViewModel(passenger: AirlinePassenger, offerItems: AirlineOfferItem[]) : AirlinePassengerSummaryViewModel {
    let fare = this.getPassengerFlightFare(passenger, offerItems);
    let result: AirlinePassengerSummaryViewModel = {
      data: passenger,
      label: passenger.passengerID,
      orderSummary: {
        fare: fare,
        selectedSeats: []
      }
    };
    return result;
  }

  getPassengerFlightFare(passenger: AirlinePassenger, offerItems: AirlineOfferItem[]) : AirlineFareViewModel {
    let offerItem = offerItems.find(i => i.fareDetail && i.fareDetail[0].passengerRefs.value.find(p => p.passengerID == passenger.passengerID));
    let vm : AirlineFareViewModel = null;
    if(offerItem){
      vm = this.airlineFareService.fromPricedOfferItem(offerItem);
    }
    return vm;
  }
}
