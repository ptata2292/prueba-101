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

import { CarrentalRetrieveService } from '../carrental-dashboard/carrental-retrieve.service';
import { CarrentalListComponent } from './carrental-list/carrental-list.component';
import { Carrental } from '../carrental';
import { LoginService } from '../../auth/login/login.service';
import { SetSearchCriteriaData } from '../../../../store/carrental/carrental.actions';
import { CarrentalStateModule } from '../../../../store/carrental/carrental.state';
import { MyErrorStateMatcher, trip } from '../../../../shared/models/carrental.model';
import { LocalStorage } from '../../../../shared/storage/local-storage';

@Component({
  selector: 'app-carrental-search',
  templateUrl: './carrental-search.component.html',
  styleUrls: ['./carrental-search.component.css']
})

export class CarrentalSearchComponent extends Carrental implements OnInit, AfterViewInit, OnDestroy {
  public response = {};
  public carRentalData = {};
  public carrentalLoading = false;
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

  //public tripType: trip[] = [ 'one', 'round'];

  public carSearchFormGroup = new FormGroup({
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    start: new FormControl(new Date(), Validators.required),
    end: new FormControl(new Date(new Date().getTime() + 1000*60*60*24 ), Validators.required),
    pickupTime: new FormControl((new Date().getHours() == 23 ? '00': new Date().getHours()+1)+':00', Validators.required),
    dropoffTime: new FormControl((new Date().getHours() == 23 ? '00': new Date().getHours()+1)+':00', Validators.required)
  }, {
    validators: [this.sameStartEndValidator, this.toSelected, this.fromSelected]//[ this.sameToFromValidator, this.sameStartEndValidator, this.toSelected, this.fromSelected]
  });

  public query = {};
  public airPortList = [];
  @ViewChild('picker1') private picker1;
  @ViewChild('picker2') private picker2;
  @ViewChild('pickupTimeSelect') pickupTimeSelect;
  @ViewChild('dropoffTimeSelect') dropoffTimeSelect;
  
  @ViewChild('fromDiv', { read: ElementRef, static: false }) fromDiv: ElementRef;
  @ViewChild('toDiv', { read: ElementRef, static: false }) toDiv: ElementRef;
  @ViewChild('pickupTimePopupDiv', { read: ElementRef, static: false }) pickupTimePopupDiv: ElementRef;
  @ViewChild('pickupTimeDiv', { read: ElementRef, static: false }) pickupTimeDiv: ElementRef;
  @ViewChild('dropoffTimeDiv', { read: ElementRef, static: false }) dropoffTimeDiv: ElementRef;
  @ViewChildren('fromInput') fromInput;
  @ViewChildren('toInput') toInput;
  
  public click = {
    to: true,
    from: true,
    start: true,
    end: true,
    pickupTime: true,
    dropoffTime: true
  }
  
  @ViewChild('carrentalListComponent', {static : false}) carrentalListComponentRef: CarrentalListComponent;
  private docClickSubscription: any;
  public isLoading = false;
  public isSubmitted = false;
  @Select(CarrentalStateModule.getSearchCriteria) searchCriteria$: Observable<any>;
  searchSubject: Subject<any> = new Subject<any>();

  constructor(loginService: LoginService, private carrentalRetrieveService: CarrentalRetrieveService,
         private renderer: Renderer2, private httpClient: HttpClient, private store: Store,
         private router: Router, private localStorage: LocalStorage) {    
    super(loginService);
    document.body.style.backgroundSize = "100% 165px";
    this.searchCriteria$.subscribe((searchCriteria) => { 
      if(searchCriteria != null){
        this.updateFormGroup(searchCriteria);
        this.localStorage.setItem('carSearchFormGroup', JSON.stringify(searchCriteria));
      } else {
        const searchCriteriaTxt = this.localStorage.getItem('carSearchFormGroup');
        if(searchCriteriaTxt != null) {
          let searchCriteriaJSON = JSON.parse(searchCriteriaTxt);
          searchCriteriaJSON = this.checkDate(searchCriteriaJSON);
          this.updateFormGroup(searchCriteriaJSON);
        }
      }
    });
  }
  
  ngOnInit() {
    //this.getAllAirportSearchService();
    this.docClickSubscription = this.renderer.listen('document', 'click', this.onDocumentClick.bind(this));
    this.filteredToOptions = this.carSearchFormGroup.get('to').valueChanges
      .pipe(
        debounceTime(500),
        switchMap((carrentalCode) => {
          if(this.filter(carrentalCode)){
            return of([]);
          } else {
            this.loadingLeavingTo = true;
            return this.searchCity(carrentalCode);
          }
      }));
    this.filteredFromOptions = this.carSearchFormGroup.get('from').valueChanges
      .pipe(
        debounceTime(500),
        switchMap((carrentalCode) => {
          if(this.filter(carrentalCode)){
            return of([]);
          } else {
            this.loadingLeavingFrom = true;
            return this.searchCity(carrentalCode);
          }
      })); 
    /* this.filteredToOptions = this.carSearchFormGroup.get('to').valueChanges
      .pipe(
        switchMap((carrentalCode) => {
          if(carrentalCode == '' || carrentalCode == null ) {
            return of(this.airPortList);
          } else {
            this.loadingLeavingTo = true;
            return this.searchOfflineAirportSearch(carrentalCode);
          }
      }));
    this.filteredFromOptions = this.carSearchFormGroup.get('from').valueChanges
      .pipe(
        switchMap((carrentalCode) => {
          if(carrentalCode == '' || carrentalCode == null ) {
            return of(this.airPortList);
          } else {
            this.loadingLeavingFrom = true;
            return this.searchOfflineAirportSearch(carrentalCode);
          }
      })); */
       
    this.carSearchFormGroup.get('start').valueChanges.subscribe(val => {
      this.minFromDate = val;
    });
    this.carSearchFormGroup.get('end').valueChanges.subscribe(val => {
    });
  }

  public ngAfterViewInit() {
    // this.carrentalListComponentRef.searchCarRental(this.getSearchQuery());
    // console.log('ngAfterViewInit');
    this.emitEventToCarrentalList();
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
      this.localStorage.setItem('carSearchFormGroup', JSON.stringify(searchCriteriaJSON));
    }
    return searchCriteriaJSON;
  }

  updateFormGroup(searchCriteria){
    let json = this.carSearchFormGroup.value;
    json = {
      ...json,
      ...searchCriteria
    }
    this.radioSelected = json.trip == "round"  ? "round" : "one";
    if(this.radioSelected == 'one'){
      //this.carSearchFormGroup.get('end').disable();
    }
    this.carSearchFormGroup.patchValue(json);
  }

  emitEventToCarrentalList() {
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
      this.pickupTimeChange(null);
      this.dropoffTimeChange(null);
      //this.tripChange(null); 
    } else if(event.target.className.indexOf("cdk-overlay-backdrop") != -1) {
      // console.log("overlay clicks");
      this.startDateChange(null, null);   
      this.endDateChange(null, null); 
      // has to uncomment after travel popup
      this.pickupTimeChange(null);
      this.dropoffTimeChange(null);
      //this.tripChange(null);  
    } else if(event.target.id == "fromCity"
              || event.target.id == "fromCityDiv"
              || this.fromDiv.nativeElement.contains(event.target)) {
      // console.log("search_inputField from clicks");
      let json = this.carSearchFormGroup.value;
      const fromValue = json.from;
      json.from = '';
      this.carSearchFormGroup.patchValue(json);
      json.from = fromValue;
      this.carSearchFormGroup.patchValue(json);   
      this.fromInput.first.nativeElement.focus();
      this.toChange(null);
    } else if(event.target.id == "toCity"
              || event.target.id == "toCityDiv"
              || this.toDiv.nativeElement.contains(event.target)) {
      // console.log("search_inputField to clicks");
      let json = this.carSearchFormGroup.value;
      const toValue = json.to;
      json.to = '';
      this.carSearchFormGroup.patchValue(json);
      json.to = toValue;
      this.carSearchFormGroup.patchValue(json);  
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
    /*if(this.pickupTimePopupDiv != null && (this.pickupTimePopupDiv.nativeElement.contains(event.target)
       || event.target.className.indexOf("mat-option-text") != -1) 
       || event.target.className.indexOf("search_inputField h2 pickupTime") != -1
       || event.target.className.indexOf("display6 pickupTime") != -1
       || this.travellersDiv.nativeElement.contains(event.target)) {
      // console.log("inside pickupTimePopupDiv");
    } else {
      // console.log("outside pickupTimePopupDiv");
      this.pickupTimeChange(null);
    }*/
  }

  changeEvents() {
    console.log("changeEvents");
    this.startDateChange(null, null);   
    this.endDateChange(null, null);      
    this.fromChange(null);    
    this.toChange(null);
    this.pickupTimeChange(null);
    this.dropoffTimeChange(null);
    //this.tripChange(null);
  }

  clickChange(objType) {
    this.click[objType] = false;
    if(objType == 'start') {
      this.openStart();
    } else if(objType == 'end') {
      this.openEnd();
    } else if(objType == 'pickupTime') {    
      // has to uncomment after travel popup
      this.openPickupTime();
    } else if(objType == 'dropoffTime') {    
      this.openDropoffTime();
    } //else if(objType == 'trip') {    
      //this.openTrip();
    //}  
  }

  openPickupTime(){
    let self = this;
    setTimeout(
        ()=>{                
            self.pickupTimeSelect.open();
        },
        50
    );
  }

  openDropoffTime(){
    let self = this;
    setTimeout(
        ()=>{                
            self.dropoffTimeSelect.open();
        },
        50
    );
  }

  // openTrip(){
  //   let self = this;
  //      setTimeout(
  //          ()=>{                
  //              self.tripSelect.open();
  //          },
  //          50
  //      );
  // }

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
    if(!this.carSearchFormGroup.get('start').hasError('required')){
      this.click.start = true;
      let json = this.carSearchFormGroup.value;
      if(new Date(json.start).getTime() > new Date(json.end).getTime()){
        json.end = new Date(json.start.getTime() + 1000*60*60*24);
        this.carSearchFormGroup.patchValue(json);
      }
    }
  }

  endDateChange(type: string, event: MatDatepickerInputEvent<Date>) {   
    if(!this.carSearchFormGroup.get('end').hasError('required')
        && !this.carSearchFormGroup.hasError('startEndMatch')){
      this.click.end = true;
    }
  }

  fromChange($event) {
    if(!this.carSearchFormGroup.get('from').hasError('required')){
      this.click.from = true;
    }
    if ($event != null){
      let json = this.carSearchFormGroup.value;
      json.to = $event.option.value;
      this.carSearchFormGroup.patchValue(json);
    }
  }

  toChange($event) {
    if(!this.carSearchFormGroup.get('to').hasError('required') &&
      !this.carSearchFormGroup.get('to').hasError('toFromMatch')){
      this.click.to = true;
    }
  }

  pickupTimeChange($event) {
    // has to uncomment after travel popup
    if(!this.carSearchFormGroup.get('pickupTime').hasError('required')){
      this.click.pickupTime = true;
    }
    /*let json = this.carSearchFormGroup.value;
    json.pickupTime = json.adults + json.childrens + json.infants;
    this.carSearchFormGroup.patchValue(json);
    this.click.pickupTime = true;*/
  }

  dropoffTimeChange($event) {
    // has to uncomment after travel popup
    if(!this.carSearchFormGroup.get('dropoffTime').hasError('required')){
      this.click.dropoffTime = true;
    }
    /*let json = this.carSearchFormGroup.value;
    json.pickupTime = json.adults + json.childrens + json.infants;
    this.carSearchFormGroup.patchValue(json);
    this.click.pickupTime = true;*/
  }



  // tripSelectionChange($event){
  //   this.radioSelected = $event;
  //   this.radioChange($event);
  // }

  // tripChange($event) {
  //   if(!this.carSearchFormGroup.get('trip').hasError('required')){
  //     this.click.trip = true;
  //   }
  // }

  swipBtn() {
    let json = this.carSearchFormGroup.value;
    const fromValue = json.from;
    json.from = json.to;
    json.to = fromValue;
    this.carSearchFormGroup.patchValue(json);
  }

  searchCarrentalsService() {
      this.carrentalLoading = true;
      this.carrentalRetrieveService.searchCarrentals(this.getSearchQuery()).
          subscribe((data: any) => {
            this.carRentalData = data;
            this.carrentalLoading = false;
          });
  }

  filter(carrentalCode) {
    if(carrentalCode == '' || carrentalCode == null ){
      return true;
    } else if(carrentalCode.data != null){
      return false;
    } else if (carrentalCode.length >= 1){
      return false;
    } else {
      return true;
    }
  }

  radioChange(event) {
    const value = event.value || event;
    if(value === 'one') {
      // this.carSearchFormGroup.get('from').disable();
      this.carSearchFormGroup.get('end').disable();
      this.carSearchFormGroup.controls['end'].setValue('');
      this.click.end = true;
    } else if(value === 'round') {
      let json = this.carSearchFormGroup.value;
      json.trip = 'round';
      this.carSearchFormGroup.patchValue(json);

      // this.carSearchFormGroup.get('from').enable();
      this.carSearchFormGroup.get('end').enable();
      if(this.carSearchFormGroup.get('end').value == '') {
        this.carSearchFormGroup.controls['end'].setValue(this.carSearchFormGroup.get('start').value);
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
    const formGroupValue = this.carSearchFormGroup.value;
    const dropoffLocation = formGroupValue.to.facilityKey && formGroupValue.to.facilityKey.locationCode;
    const pickupLocation = formGroupValue.from.facilityKey && formGroupValue.from.facilityKey.locationCode;
    let qry = {
      "pickupLocation": pickupLocation,
      "dropoffLocation": dropoffLocation,
      "chainCode": formGroupValue.from.facilityKey && formGroupValue.from.facilityKey.chainCode,
      "brand": formGroupValue.from.facilityKey && formGroupValue.from.facilityKey.brandCode,
      "pickupDate": this.getDate(formGroupValue.start),
      "dropoffDate": this.getDate(formGroupValue.end),
      "pickupTime": formGroupValue.pickupTime,
      "dropoffTime": formGroupValue.dropoffTime,
      "countryCode": formGroupValue.from.location && formGroupValue.from.location.address && formGroupValue.from.location.address.country && formGroupValue.from.location.address.country.value
    }
    this.query = qry;
    return qry;
  }

  getDate(date){
    return typeof(date) == 'object' ? (date.toISOString()).split('T')[0] : new Date(date).toISOString().split('T')[0];
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
  
  search(){
    if(this.carSearchFormGroup.valid) {
      // this.searchCarrentalsService();
      let carSearchFormGroupValue = this.carSearchFormGroup.value;
      this.localStorage.setItem('carSearchFormGroup', JSON.stringify(carSearchFormGroupValue));
      this.store.dispatch(new SetSearchCriteriaData(carSearchFormGroupValue));
      //this.carrentalListComponentRef.searchCarRental(this.getSearchQuery());
      this.emitEventToCarrentalList();
    } else {
      this.carSearchFormGroup.markAllAsTouched();
      this.isSubmitted = true;
    }
  }

  searchCity(searchCity){
    return this.carrentalRetrieveService.searchCarrentals(searchCity)
        .pipe(map((data: any) => {
            this.carRentalData = data;
            this.loadingLeavingTo = false;
            this.loadingLeavingFrom = false;
            return data;
        })); 
  }
}
