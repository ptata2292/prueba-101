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

import { SpaRetrieveService } from '../spa-dashboard/spa-retrieve.service';
import { SpaListComponent } from './spa-list/spa-list.component';
import { Spa } from '../spa';
import { LoginService } from '../../auth/login/login.service';
import { SetSearchCriteriaData } from '../../../../store/spa/spa.actions';
import { SpaStateModule } from '../../../../store/spa/spa.state';
import { MyErrorStateMatcher, trip } from '../../../../shared/models/spa.model';
import { LocalStorage } from '../../../../shared/storage/local-storage';

@Component({
  selector: 'app-spa-search',
  templateUrl: './spa-search.component.html',
  styleUrls: ['./spa-search.component.css']
})

export class SpaSearchComponent extends Spa implements OnInit, AfterViewInit, OnDestroy {
  public response = {};
  public spaData = {};
  public spaLoading = false;
  public radioSelected : trip = "one";
  public loadingLeavingFrom = false;
  public loadingLeavingTo = false;

  public minToDate = new Date();
  public maxToDate = new Date(this.minToDate.getTime() +  1000 * 60 * 60 * 24 * 150);
  public minFromDate = new Date();
  public maxFromDate = new Date(this.minFromDate.getTime() +  1000 * 60 * 60 * 24 * 150);
  
  public filteredFromOptions: Observable<any[]>;
  public filteredToOptions: Observable<any[]>;
  errorMatcher = new MyErrorStateMatcher();

  public tripType: trip[] = [ 'one', 'round'];

  public searchFormGroup = new FormGroup({   
    trip: new FormControl(this.tripType[0], Validators.required), 
    from: new FormControl(this.defaultFrom, Validators.required),
    to: new FormControl(this.defaultTo, Validators.required),
    start: new FormControl(new Date(), Validators.required),
    end: new FormControl(new Date(), Validators.required),
    count: new FormControl(1, Validators.required),
    adults: new FormControl(1, Validators.required),
    childrens: new FormControl(0, Validators.required),
    infants: new FormControl(0, Validators.required)
  }, {
    validators: [ this.sameToFromValidator, this.sameStartEndValidator, this.toSelected, this.fromSelected]
  });

  public query = {};
  public airPortList = [];
  @ViewChild('picker1') private picker1;
  @ViewChild('picker2') private picker2;
  @ViewChild('travellersSelect') travellersSelect;
  @ViewChild('tripSelect') tripSelect;
  @ViewChild('fromDiv', { read: ElementRef, static: false }) fromDiv: ElementRef;
  @ViewChild('toDiv', { read: ElementRef, static: false }) toDiv: ElementRef;
  @ViewChild('countPopupDiv', { read: ElementRef, static: false }) countPopupDiv: ElementRef;
  @ViewChild('travellersDiv', { read: ElementRef, static: false }) travellersDiv: ElementRef;
  @ViewChildren('fromInput') fromInput;
  @ViewChildren('toInput') toInput;
  
  public click = {
    to: true,
    from: true,
    start: true,
    end: true,
    count: true,
    trip: true
  }
  
  @ViewChild('spaListComponent', {static : false}) spaListComponentRef: SpaListComponent;
  private docClickSubscription: any;
  public isLoading = false;
  public isSubmitted = false;
  @Select(SpaStateModule.getSearchCriteria) searchCriteria$: Observable<any>;
  searchSubject: Subject<any> = new Subject<any>();

  constructor(loginService: LoginService, private spaRetrieveService: SpaRetrieveService,
         private renderer: Renderer2, private httpClient: HttpClient, private store: Store,
         private router: Router, private localStorage: LocalStorage) {    
    super(loginService);
    document.body.style.backgroundSize = "100% 165px";
    this.searchCriteria$.subscribe((searchCriteria) => { 
      if(searchCriteria != null){
        this.updateFromGroup(searchCriteria);
        this.localStorage.setItem('searchFormGroup', JSON.stringify(searchCriteria));
      } else {
        const searchCriteriaTxt = this.localStorage.getItem('searchFormGroup');
        if(searchCriteriaTxt != null) {
          let searchCriteriaJSON = JSON.parse(searchCriteriaTxt);
          searchCriteriaJSON = this.checkDate(searchCriteriaJSON);
          this.updateFromGroup(searchCriteriaJSON);
        }
      }
    });
  }
  
  ngOnInit() {
    this.getAllAirportSearchService();
    this.docClickSubscription = this.renderer.listen('document', 'click', this.onDocumentClick.bind(this));
    this.filteredToOptions = this.searchFormGroup.get('to').valueChanges
      .pipe(
        debounceTime(500),
        switchMap((spaCode) => {
          if(this.filter(spaCode)){
            return of([]);
          } else {
            this.loadingLeavingTo = true;
            return this.serachAirportSearchService(spaCode);
          }
      }));
    this.filteredFromOptions = this.searchFormGroup.get('from').valueChanges
      .pipe(
        debounceTime(500),
        switchMap((spaCode) => {
          if(this.filter(spaCode)){
            return of([]);
          } else {
            this.loadingLeavingFrom = true;
            return this.serachAirportSearchService(spaCode);
          }
      })); 
    /* this.filteredToOptions = this.searchFormGroup.get('to').valueChanges
      .pipe(
        switchMap((spaCode) => {
          if(spaCode == '' || spaCode == null ) {
            return of(this.airPortList);
          } else {
            this.loadingLeavingTo = true;
            return this.serachOfflineAirportSearch(spaCode);
          }
      }));
    this.filteredFromOptions = this.searchFormGroup.get('from').valueChanges
      .pipe(
        switchMap((spaCode) => {
          if(spaCode == '' || spaCode == null ) {
            return of(this.airPortList);
          } else {
            this.loadingLeavingFrom = true;
            return this.serachOfflineAirportSearch(spaCode);
          }
      })); */
       
    this.searchFormGroup.get('start').valueChanges.subscribe(val => {
      this.minFromDate = val;
    });
    this.searchFormGroup.get('end').valueChanges.subscribe(val => {
    });
  }

  public ngAfterViewInit() {
    // this.spaListComponentRef.searchSpa(this.getSearchQuery());
    // console.log('ngAfterViewInit');
    this.emitEventToSpaList();
  }

  public ngOnDestroy() {
    this.docClickSubscription();
  }

  checkDate(searchCriteriaJSON) {
    const time = this.truncateTime(null);
    let dateChange = false;
    if(Date.parse(this.truncateTime(searchCriteriaJSON.start)) < Date.parse(time)) {
      searchCriteriaJSON.start = time; 
      dateChange = true;
    }
    if(Date.parse(this.truncateTime(searchCriteriaJSON.end)) < Date.parse(time)) {
      searchCriteriaJSON.end = time;
      dateChange = true;
    }
    if(Date.parse(searchCriteriaJSON.end) < Date.parse(searchCriteriaJSON.start)) {
      searchCriteriaJSON.start = searchCriteriaJSON.end;
      dateChange = true;
    }
    if(dateChange) {
      this.localStorage.setItem('searchFormGroup', JSON.stringify(searchCriteriaJSON));
    }
    return searchCriteriaJSON;
  }

  updateFromGroup(searchCriteria){
    let json = this.searchFormGroup.value;
    json = {
      ...json,
      ...searchCriteria
    }
    this.radioSelected = json.trip == "round"  ? "round" : "one";
    if(this.radioSelected == 'one'){
      this.searchFormGroup.get('end').disable();
    }
    this.searchFormGroup.patchValue(json);
  }

  emitEventToSpaList() {
    this.searchSubject.next(this.getSearchQuery());
  }

  private onDocumentClick(event: any): void {
     console.log(event.target.className);
     if (event.target.className.indexOf("mat-calendar-body-cell-content") != -1) {
      // console.log("mat-calendar clicks");
      this.startDateChange(null, null);   
      this.endDateChange(null, null); 
    } else if (event.target.className.indexOf("mat-option-text") != -1) {
      // console.log("mat-option clicks");
      // has to uncomment after travel popup
      this.countChange(null);  
      this.tripChange(null); 
    } else if(event.target.className.indexOf("cdk-overlay-backdrop") != -1) {
      // console.log("overlay clicks");
      this.startDateChange(null, null);   
      this.endDateChange(null, null); 
      // has to uncomment after travel popup
      this.countChange(null);
      this.tripChange(null);  
    } else if(event.target.id == "fromCity"
              || event.target.id == "fromCityDiv"
              || this.fromDiv.nativeElement.contains(event.target)) {
      // console.log("search_inputField from clicks");
      let json = this.searchFormGroup.value;
      const fromValue = json.from;
      json.from = '';
      this.searchFormGroup.patchValue(json);
      json.from = fromValue;
      this.searchFormGroup.patchValue(json);   
      this.fromInput.first.nativeElement.focus();
      this.toChange(null);
    } else if(event.target.id == "toCity"
              || event.target.id == "toCityDiv"
              || this.toDiv.nativeElement.contains(event.target)) {
      // console.log("search_inputField to clicks");
      let json = this.searchFormGroup.value;
      const toValue = json.to;
      json.to = '';
      this.searchFormGroup.patchValue(json);
      json.to = toValue;
      this.searchFormGroup.patchValue(json);  
      this.toInput.first.nativeElement.focus();  
      this.fromChange(null);   
    } /*else if (event.target.className.indexOf("mat-option-text dismiss") == -1) {
      // console.log("mat-option-text dismiss clicks");
      this.fromChange(null);    
      this.toChange(null);
    } */ else if(!this.fromDiv.nativeElement.contains(event.target) || !this.toDiv.nativeElement.contains(event.target)) {
      if(!this.fromDiv.nativeElement.contains(event.target)) {
        // console.log("outside fromDiv");
        this.fromChange(null);    
      }
      if(!this.toDiv.nativeElement.contains(event.target)) {
        // console.log("outside toDiv");
        this.toChange(null);
      }   
    }
    
    // has to uncomment after travel popup
    /*if(this.countPopupDiv != null && (this.countPopupDiv.nativeElement.contains(event.target)
       || event.target.className.indexOf("mat-option-text") != -1) 
       || event.target.className.indexOf("search_inputField h2 count") != -1
       || event.target.className.indexOf("display6 count") != -1
       || this.travellersDiv.nativeElement.contains(event.target)) {
      // console.log("inside countPopupDiv");
    } else {
      // console.log("outside countPopupDiv");
      this.countChange(null);
    }*/
  }

  changeEvents() {
    console.log("changeEvents");
    this.startDateChange(null, null);   
    this.endDateChange(null, null);      
    this.fromChange(null);    
    this.toChange(null);
    this.countChange(null);
    this.tripChange(null);
  }

  clickChange(objType) {
    this.click[objType] = false;
    if(objType == 'start') {
      this.openStart();
    } else if(objType == 'end') {
      this.openEnd();
    } else if(objType == 'count') {    
      // has to uncomment after travel popup
      this.openTravellers();
    } else if(objType == 'trip') {    
      this.openTrip();
    }  
  }

  openTravellers(){
    let self = this;
       setTimeout(
           ()=>{                
               self.travellersSelect.open();
           },
           50
       );
  }

  openTrip(){
    let self = this;
       setTimeout(
           ()=>{                
               self.tripSelect.open();
           },
           50
       );
  }

  openStart(){
    let self = this;
       setTimeout(
           ()=>{                
               self.picker1.open();
           },
           50
       );
  }

  openEnd(){
    let self = this;
       setTimeout(
           ()=>{                
               self.picker2.open();
           },
           50
       );
  }

  startDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    if(!this.searchFormGroup.get('start').hasError('required')){
      this.click.start = true;
    }
  }

  endDateChange(type: string, event: MatDatepickerInputEvent<Date>) {   
    if(!this.searchFormGroup.get('end').hasError('required')
        && !this.searchFormGroup.hasError('startEndMatch')){
      this.click.end = true;
    }
  }

  fromChange($event) {
    if(!this.searchFormGroup.get('from').hasError('required')){
      this.click.from = true;
    }
  }

  toChange($event) {
    if(!this.searchFormGroup.get('to').hasError('required') &&
      !this.searchFormGroup.get('to').hasError('toFromMatch')){
      this.click.to = true;
    }
  }

  countChange($event) {
    // has to uncomment after travel popup
    if(!this.searchFormGroup.get('count').hasError('required')){
      this.click.count = true;
    }
    /*let json = this.searchFormGroup.value;
    json.count = json.adults + json.childrens + json.infants;
    this.searchFormGroup.patchValue(json);
    this.click.count = true;*/
  }

  tripSelectionChange($event){
    this.radioSelected = $event;
    this.radioChange($event);
  }

  tripChange($event) {
    if(!this.searchFormGroup.get('trip').hasError('required')){
      this.click.trip = true;
    }
  }

  swipBtn() {
    let json = this.searchFormGroup.value;
    const fromValue = json.from;
    json.from = json.to;
    json.to = fromValue;
    this.searchFormGroup.patchValue(json);
  }

  serachAirportSearchService(spaCode) {
    const code = spaCode.data != null ? spaCode.data : spaCode;
    return this.spaRetrieveService.searchAirport(code)
            .pipe(map((data: any) => {
                this.loadingLeavingTo = false;
                this.loadingLeavingFrom = false;
                return data.suggestions;
            }));
  }

  serachOfflineAirportSearch(spaCode) {
    let suggestions = [];
    if(this.airPortList.length == 0){
      const code = spaCode.data != null ? spaCode.data : spaCode;
      return this.spaRetrieveService.searchAirport(code)
            .pipe(map((data: any) => {
                this.loadingLeavingTo = false;
                this.loadingLeavingFrom = false;
                return data.suggestions;
            }));
    } else {
      this.loadingLeavingTo = false;
      this.loadingLeavingFrom = false;
      const filterAirports = this.filterAirport(spaCode);
      return of(filterAirports);
    }    
  }

  filterAirport(spaCode) {
    let suggestions = [];
    let airPortCode = spaCode.name || spaCode.value;
    airPortCode = airPortCode == null ? spaCode : airPortCode;
    for(const airPort of this.airPortList) {
      if( airPort.name.toLowerCase().indexOf(airPortCode.toLowerCase()) === 0
            || airPort.id.toLowerCase().includes(airPortCode.toLowerCase())) {
        suggestions.push(airPort);
      }
    }
    return suggestions;
  }

  getAllAirportSearchService() {
    this.spaRetrieveService.getAllAirport().
      subscribe((data: any) => {
        this.airPortList = data;
        this.isLoading = false;
      });
  }

  serachSpasService() {
      this.spaLoading = true;
      this.spaRetrieveService.searchSpas(this.getSearchQuery()).
          subscribe((data: any) => {
            this.spaData = data;
            this.spaLoading = false;
          });
  }

  filter(spaCode) {
    if(spaCode == '' || spaCode == null ){
      return true;
    } else if(spaCode.data != null){
      return false;
    } else if (spaCode.length >= 1){
      return false;
    } else {
      return true;
    }
  }

  radioChange(event) {
    const value = event.value || event;
    if(value === 'one') {
      // this.searchFormGroup.get('from').disable();
      this.searchFormGroup.get('end').disable();
      this.searchFormGroup.controls['end'].setValue('');
      this.click.end = true;
    } else if(value === 'round') {
      let json = this.searchFormGroup.value;
      json.trip = 'round';
      this.searchFormGroup.patchValue(json);

      // this.searchFormGroup.get('from').enable();
      this.searchFormGroup.get('end').enable();
      if(this.searchFormGroup.get('end').value == '') {
        this.searchFormGroup.controls['end'].setValue(this.searchFormGroup.get('start').value);
      }
    }
  }
  
  enableRoundTrip() {
    this.radioSelected = "round";
    this.radioChange("round");
    this.click.end = false;
    this.openEnd();
  }

  toggleTrip() {
    this.radioSelected = this.radioSelected == "round"  ? "one" : "round";
    this.radioChange(this.radioSelected);
  }

  getSearchQuery() {
    let qry = {
      Flights:[        
      ],
      Passengers:[    
        {
          PassengerID: "T1"
        }
      ]   
    }
    const formGroupValue = this.searchFormGroup.value;
    const toAirPortCode = formGroupValue.to.data || formGroupValue.to.id || formGroupValue.to;
    const fromAirPortCode = formGroupValue.from.data || formGroupValue.from.id|| formGroupValue.from;
    qry.Flights.push({
      "DepartureAirportCode": fromAirPortCode,
      "ArrivalAirportCode": toAirPortCode,
      "TravelDate": this.truncateTime(formGroupValue.start)      
    });
    if(this.radioSelected == 'round'){
      qry.Flights.push({ 
        "DepartureAirportCode": toAirPortCode,
        "ArrivalAirportCode": fromAirPortCode,
        "TravelDate": this.truncateTime(formGroupValue.end)
      });
    }
    this.query = qry;
    return qry;
  }

  truncateTime(time){
    if(time == null) {
      time = new Date()
    } else {
      time = new Date(time)  
      var userTimezoneOffset = time.getTimezoneOffset() * 60000;
      time = new Date(time.getTime() - userTimezoneOffset);
      // time = new Date(time)  
    }
    const timeStr = time.toISOString()
    return timeStr.substring(0, timeStr.lastIndexOf('T')) + 'T00:00:00';
  }
  
  serach(){
    if(this.searchFormGroup.valid) {
      // this.serachSpasService();
      let searchFormGroupValue = this.searchFormGroup.value;
      this.localStorage.setItem('searchFormGroup', JSON.stringify(searchFormGroupValue));
      this.store.dispatch(new SetSearchCriteriaData(searchFormGroupValue));
      //this.spaListComponentRef.searchSpa(this.getSearchQuery());
      this.emitEventToSpaList();
    } else {
      this.searchFormGroup.markAllAsTouched();
      this.isSubmitted = true;
    }
  }
}
