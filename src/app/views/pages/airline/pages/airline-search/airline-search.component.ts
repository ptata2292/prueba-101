import { Component, OnInit, ViewChild, OnDestroy, Renderer2, ElementRef, ViewChildren, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, distinct, filter, map, switchMap } from 'rxjs/operators';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { ErrorStateMatcher } from '@angular/material/core';
import { of, Subject } from 'rxjs';
import { HttpClient  } from '@angular/common/http';
import { Select, Store } from '@ngxs/store';
import { Router } from '@angular/router';

import { AirlineRetrieveService } from '../../services/airline-retrieve.service';
import { Airline } from '../../airline';
import { LoginService } from '../../../auth/login/login.service';
import { MyErrorStateMatcher, timeFormat } from '../../../../../shared/models/airline.model';
import { LocalStorage } from '../../../../../shared/storage/local-storage';
import { AirlineSearchHeaderComponent } from '../../partials/airline-search-header/airline-search-header.component';
import { AirlineOrderService } from '../../services/airline-order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AirlineSelectedOfferViewModel } from '../../viewmodels/airline-selected-offer';
import { AirlinePassengerService } from '../../services/airline-passenger.service';
import { AirlineGrouppedFlightsViewModel } from '../../viewmodels/airline-groupped-flights';
import { AirlineSearch } from '../../viewmodels/airline-search';
import { AirlineSearchResult } from '../../viewmodels/airline-search-result';
import { AirlineOfferService } from '../../services/airline-offer.service';
import { AirlineOfferWithDetails } from '../../models/offer/airline-offer-details';
import { AirlinePassenger } from '../../models/passenger/airline-passenger';
import { AirlinePricedOfferResponse } from '../../models/offer/airline-priced-offer';

@Component({
  selector: 'app-airline-search',
  templateUrl: './airline-search.component.html',
  styleUrls: ['./airline-search.component.css']
})

export class AirlineSearchComponent extends Airline implements OnInit {

  @ViewChild(AirlineSearchHeaderComponent) airlineSearchHeader: AirlineSearchHeaderComponent;

  public searchResult: AirlineSearchResult;
  
  constructor(private router: Router,
    loginService: LoginService, 
    private offerService: AirlineOfferService,
    private localStorage: LocalStorage) {    
    super(loginService);
    document.body.style.backgroundSize = "100% 165px";
  }
  
  ngOnInit() {
    this.searchResult = {
      dataLists: null,
      isSearchCompleted: false,
      timeFormat: localStorage.getItem('timeFormat') as timeFormat || '24',
      selectedOffer: null,
      grouppedFlightList: null,
      airlineSearch: null,
    };
  }
  
  searchAirlines() {
    this.searchResult.selectedOffer = null;
    this.searchResult.grouppedFlightList = null;
 
    let airlineSearch = this.airlineSearchHeader.getAirlineSearch()
    this.offerService.findOffers(airlineSearch).subscribe((data: any) => {
      this.searchResult.responseID = data.ShoppingResponseID.responseID.value;
      this.searchResult.airlineSearch = airlineSearch;
      this.searchResult.dataLists = data.dataLists;

      let offersWithDetails: Array<AirlineOfferWithDetails> = data.OffersWithDetails;
      if( offersWithDetails != null && offersWithDetails.length > 0
        && offersWithDetails[0].flightsPlusSegments != null && offersWithDetails[0].flightsPlusSegments.length > 0) {
          this.searchResult.grouppedFlightList = this.offerService.groupOffersByFlights(offersWithDetails, this.searchResult.timeFormat);
      }
      this.searchResult.isSearchCompleted = true;
    });
  }

  bookNow(){
    this.offerService.getPricedOffer(this.searchResult).subscribe((data: AirlinePricedOfferResponse) => {
        let offerViewModel = this.offerService.getPricedOfferViewModel(data);
        this.localStorage.setItem(this.localStorage.keys.airline.offerViewModel, JSON.stringify(offerViewModel));
        this.router.navigateByUrl('/Airlines/Booking');
    });
  }
} 
