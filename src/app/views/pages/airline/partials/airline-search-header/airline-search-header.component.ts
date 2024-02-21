import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { debounceTime, distinct, filter, map, switchMap } from 'rxjs/operators';
import { LocalStorage } from 'src/app/shared/storage/local-storage';
import { LoginService } from '../../../auth/login/login.service';
import { Airline } from '../../airline';
import { AirlineRetrieveService } from '../../services/airline-retrieve.service';
import { SetSearchCriteriaData } from '../../../../../store/airline/airline.actions';
import { AirlinePassengerService } from '../../services/airline-passenger.service';
import { AirlineSearch, TripType } from '../../viewmodels/airline-search';
import { AirlineStateModule } from 'src/app/store/airline/airline.state';
import { AirlineSearchFlight } from '../../models/flight/airline-search-flight';
import { AirlineDatetimeService } from '../../services/airline-datetime.service';
import { AirlineAirport } from '../../models/flight/airline-airport';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-airline-search-header',
  templateUrl: './airline-search-header.component.html',
  styleUrls: ['./airline-search-header.component.css']
}) 
export class AirlineSearchHeaderComponent implements OnInit, AfterViewInit  {
  @Input() showSearchButton;
  @Input() fontStyle;
  @Input() blockClass;
  @Input() loadLatestSearch: boolean;
  @Input() hidePtc: boolean;
  @Input() from: string;

  @Output() search = new EventEmitter();
  @ViewChild('tripSelect') tripSelect;

  public maxNumberOfFlights = 5;
  public airLinesData = {};
  public airlineLoading = false;
  public loadingLeavingFrom = false;
  public loadingLeavingTo = false;

  public minToDate = new Date();
  public maxToDate = new Date(this.minToDate.getTime() +  1000 * 60 * 60 * 24 * 150);
  public minFromDate = new Date();
  public maxFromDate = new Date(this.minFromDate.getTime() +  1000 * 60 * 60 * 24 * 150);
  
  public isSubmitted = false;

  public displayLabel = {
    to: 'Going To',
    from: 'Leaving From'
  }
  
  @Input() airlineSearch: AirlineSearch; 
  
  @Select(AirlineStateModule.getSearchCriteria) searchCriteria$: Observable<any>;

  constructor(loginService: LoginService,
    private renderer: Renderer2, 
    private localStorage: LocalStorage,
    private passengerService: AirlinePassengerService,
    private airlineDatetimeService: AirlineDatetimeService,
    private store: Store) { 

    document.body.style.backgroundSize = "100% 165px";
  }

  
  protected defaultTo() : AirlineAirport {
    return {
      "id": "ORD",
      "icao": "KORD",
      "iata": "ORD",
      "name": "ORD - Chicago OHare International Airport",
      "city": "Chicago",
      "state": "Illinois",
      "country": "US",
      "elevation": 672,
      "lat": 41.97859955,
      "lon": -87.90480042,
      "tz": "America/Chicago",
      "value":"ORD - Chicago OHare International Airport",
      "data":"ORD"
    };
  }

  protected defaultFrom() : AirlineAirport {
      return { "id": "DFW",
      "icao": "KDFW",
      "iata": "DFW",
      "name": "DFW - Dallas Fort Worth International Airport",
      "city": "Dallas-Fort Worth",
      "state": "Texas",
      "country": "US",
      "elevation": 607,
      "lat": 32.89680099,
      "lon": -97.03800201,
      "tz": "America/Chicago",
      "value":"DFW - Dallas Fort Worth International Airport",
      "data":"DFW"
    };
  }

  getAirlineSearch() : AirlineSearch{
    return JSON.parse(JSON.stringify(this.airlineSearch));
  }

  ngAfterViewInit(): void {
    if(this.loadLatestSearch && this.airlineSearch){
      setTimeout(() => this.validateAndSearch(), 100);
    }
  }

  ngOnInit(): void {
    if(this.airlineSearch){
      return;
    }
    
    this.airlineSearch = {
      flights: [],
      travellers: [{
        index: 0,
        ptc: this.passengerService.getAdult().ptcCode
      }],
      tripType: "one",
      loyaltyAccountNumber: '',
      isLoyaltyAccountEnabled: false
    };
    this.addFlight();
      
    this.searchCriteria$.subscribe((airlineSearch: AirlineSearch) => { 
      if(!this.loadLatestSearch){
        return;
      }
      if(airlineSearch != null){
        this.airlineSearch = JSON.parse(JSON.stringify(airlineSearch));
        this.localStorage.setItem(this.localStorage.keys.airline.search, JSON.stringify(airlineSearch));
      } else {
        let airlineSearchTxt = this.localStorage.getItem(this.localStorage.keys.airline.search);
        if(airlineSearchTxt != null) {
          let airlineSearch : AirlineSearch = JSON.parse(airlineSearchTxt);
          this.checkDate(airlineSearch);
          this.airlineSearch = airlineSearch;
        }
      }
    }); 
  }

  setTripType(tripType: TripType){
    this.airlineSearch.tripType = tripType;
    switch (tripType)
    {
      case  "one": 
        this.airlineSearch.flights.splice(1);
        break;
      
      case "round":
        this.airlineSearch.flights.splice(1);
        this.addFlight();
        break;

      case "multi":
        break;
    }
  }

  addFlight() {
    if(this.airlineSearch.flights.length >= this.maxNumberOfFlights){
      return;
    }
    if(this.airlineSearch.flights.length == 0){

      this.airlineSearch.flights.push(
        {   
          from: !environment.production ? this.defaultFrom() : null,
          to: !environment.production ? this.defaultTo() : null,
          departureDate: new Date()
      });
    }
    else{
      let lastAirport = this.airlineSearch.flights[this.airlineSearch.flights.length - 1].to;
      let firstAirport = this.airlineSearch.flights[0].from;
      this.airlineSearch.flights.push({   
          from: JSON.parse(JSON.stringify(lastAirport)),
          to: JSON.parse(JSON.stringify(firstAirport)),
          departureDate: this.airlineSearch.flights[this.airlineSearch.flights.length - 1].departureDate
      });
    }
  }
   
  removeFlight(index){
    this.airlineSearch.flights.splice(index, 1);
  }

  validateAndSearch(){
    // if(this.searchFormGroup.valid) {
      // let searchFormGroupValue = this.searchFormGroup.value;
      this.localStorage.setItem(this.localStorage.keys.airline.search, JSON.stringify(this.airlineSearch));

      // copy to avoid read-only problems
      this.store.dispatch(new SetSearchCriteriaData(JSON.parse(JSON.stringify(this.airlineSearch))));
      this.search.emit();
    // } else {
      // this.searchFormGroup.markAllAsTouched();
      // this.isSubmitted = true;
    // }
  }

  checkDate(airlineSearch: AirlineSearch) {
    var now = new Date();
    const time = this.airlineDatetimeService.truncateTime(now);
    let dateChange = false;

    airlineSearch.flights.forEach((flight) => {
      if(Date.parse(this.airlineDatetimeService.truncateTime(flight.departureDate)) < Date.parse(time)) {
        flight.departureDate = now; 
        dateChange = true;
      }
    })
    
    if(dateChange) {
      this.localStorage.setItem('searchFormGroup', JSON.stringify(airlineSearch));
    }
  }

 swipBtn(flight: AirlineSearchFlight) {
  if(this.airlineSearch.tripType === 'round'){
    this.airlineSearch.flights.forEach(i => this.switchFromTo(i));
  }
  else{
    this.switchFromTo(flight);
  }
 }

 private switchFromTo(flight: AirlineSearchFlight){
  let fromValue = flight.from;
  flight.from = flight.to;
  flight.to = fromValue;
 }
}
