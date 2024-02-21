import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../auth/login/login.service';
import { collapseAnimation } from '../../../../../animations';
import { timeFormat } from '../../../../../shared/models/airline.model';
import { LocalStorage } from '../../../../../shared/storage/local-storage';
import { Airline } from '../../airline';
import { AirlineFlightFareViewModel } from '../../viewmodels/airline-flight-fare';
import { AirlineGrouppedFlightsViewModel } from '../../viewmodels/airline-groupped-flights';
import { AirlineOfferService } from '../../services/airline-offer.service';
import { AirlineSearchResult } from '../../viewmodels/airline-search-result';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AirlinePricedOfferResponse } from '../../models/offer/airline-priced-offer';
import {FlightFarePriceInfoViewType} from '../../enums/flight-fare-price-info-view.enum';
import { AirlineLoaderService } from '../../services/airline-loader.service';

@Component({
  selector: 'app-airline-search-result',
  templateUrl: './airline-search-result.component.html',
  styleUrls: ['./airline-search-result.component.scss'],
  animations: [
    collapseAnimation
  ],
})
export class AirlineSearchResultComponent extends Airline {

  @Input() searchResult: AirlineSearchResult;
  @Input() selectButtonText: string;

  FlightFarePriceInfoViewType = FlightFarePriceInfoViewType;
  selectedFare: AirlineFlightFareViewModel;
  @Output() selectionDone = new EventEmitter();

  constructor(
      public airlineLoaderService: AirlineLoaderService,
      private airlineOfferService: AirlineOfferService,
      loginService: LoginService,
      private localStorage: LocalStorage) {
    super(loginService);
  }

  toggleFare(groupFlight: AirlineGrouppedFlightsViewModel): void {
    
    if (groupFlight.showPrices === null){
      groupFlight.showPrices = false;
    }
    if(groupFlight.showPrices === false) {
      groupFlight.flightList.forEach(i => i.stopShow = false);
    }
    groupFlight.showPrices = !groupFlight.showPrices;
  }

  selectFare(groupFlight: AirlineGrouppedFlightsViewModel, flightFare: AirlineFlightFareViewModel) {
    this.selectedFare = flightFare;
    this.searchResult.selectedOffer = {
      originalOffer: this.selectedFare.originalOffer,
      flightList: groupFlight.flightList,
      offerID: flightFare.offerID,
    };
  }

  bookNow() {
    this.removeStopShowDisplay();
    this.selectionDone.emit();
  }

  removeStopShowDisplay() {
    if(this.searchResult.selectedOffer){
      this.searchResult.selectedOffer.flightList.forEach(flight => flight.stopShow = false);
    }
  }

  changeFlightsTimeFormat(e) {
    this.searchResult.timeFormat = e.target.value;
    localStorage.setItem('timeFormat', this.searchResult.timeFormat);
    this.airlineOfferService.changeFlightTimeFormat(this.searchResult.grouppedFlightList, this.searchResult.timeFormat);
  }

  getDuePrice(fare: AirlineFlightFareViewModel){
    if(!fare.reshopPrices){
      return fare.totalPrice;
    }

    return fare.reshopPrices.reshopDue - fare.reshopPrices.original;
  }
}

