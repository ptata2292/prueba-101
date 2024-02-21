import { Component, OnInit, ViewChild, OnDestroy, Renderer2, ElementRef, ViewChildren, Input, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { debounceTime, distinct, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable, of, Subject, Subscriber, Subscription } from 'rxjs';
import { HttpClient  } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';

import { LoginService } from '../../../auth/login/login.service';
import { Airline } from '../../airline';
import { AirlineRetrieveService } from '../../services/airline-retrieve.service';
import { AirlineAirport } from '../../models/flight/airline-airport';
import { AirlineSearchFlight } from '../../models/flight/airline-search-flight';

@Component({
  selector: 'airport-code-search',
  templateUrl: './airport-code-search.component.html',
  styleUrls: ['./airport-code-search.component.css']
})
export class AirportCodeSearchComponent implements OnInit, OnDestroy {

  public searchChangeSubscriber;
  public isLoading = false;
  public isAutocompleteShown: boolean = false;
  public filteredOptions: Observable<any>;

  @Input() public flight: AirlineSearchFlight;
  @Input() public field: string;
  @Input() public isSubmitted: boolean;
  @Input() public fontStyle: string;
  @Input() public label: string;
  @Input() public showLabel: boolean;

  @ViewChildren('airportCodeInput') airportCodeInput;
  docClickSubscription: any;

  constructor(loginService: LoginService, private renderer: Renderer2, private airlineRetrieveService: AirlineRetrieveService) {
  }

  ngOnInit(): void {
    this.filteredOptions = new Observable(subscriber => {
      this.searchChangeSubscriber = subscriber;
    }).pipe(
      debounceTime(300), // wait 300ms after the last event before emitting last event
      switchMap((airlineCode) => {
          if(this.filter(airlineCode)){
            return of([]);
          } else {
            this.isLoading = true;
            return this.searchAirportSearchService(airlineCode);
        }
      }));

    this.docClickSubscription = this.renderer.listen('document', 'click', this.onDocumentClick.bind(this));
  }

  public ngOnDestroy() {
    this.docClickSubscription();
  }

  private onDocumentClick(event: any): void {
    if(event.target.className.indexOf("cdk-overlay-container") != -1) {
      this.hideAutocomplete() 
    }
  }

  onSearchChange(searchValue: string) {
    this.searchChangeSubscriber.next(searchValue);
  }  

  searchAirportSearchService(airlineCode) {
    const code = airlineCode.data != null ? airlineCode.data : airlineCode;
    return this.airlineRetrieveService.searchAirport(code)
            .pipe(map((data: any) => {
                this.isLoading = false;
                return data.suggestions;
            }));
  }
  
  displayFn(airport: AirlineAirport): string {
    return airport && airport.data ? airport.data : (airport && airport.name ? airport.name : '');
  }

  getAirPortDisplayName(suggestion) {
    const value = suggestion ? suggestion.value || suggestion.name || '' : '';
    const data = suggestion ? suggestion.data || suggestion.id || '' : '';
    if(value == '' && data == '') {
      return 'Please Select'; 
    } else {
      const AirPortDisplayName =  value + '(' + data + ')'
      return AirPortDisplayName;
    }
  }

  filter(airlineCode) {
    if(airlineCode == '' || airlineCode == null ){
      return true;
    } else if(airlineCode.data != null){
      return false;
    } else if (airlineCode.length >= 1){
      return false;
    } else {
      return true;
    }
  }

 showAutocomplete(){
  this.isAutocompleteShown = true;
  setTimeout(() => {
    this.airportCodeInput.first.nativeElement.focus();  
  }, 10);
 }

 hideAutocomplete(){
   this.isAutocompleteShown = false;
 }
}
