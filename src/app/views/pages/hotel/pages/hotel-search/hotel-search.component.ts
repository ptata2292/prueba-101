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

import { HotelRetrieveService } from '../../services/hotel-retrieve.service';
import { HotelListComponent } from '../../partials/hotel-list/hotel-list.component';
import { LocalStorage } from 'src/app/shared/storage/local-storage';
import { getTenantModule } from 'src/app/shared/tenant/tenant';
import { HotelStateModule } from 'src/app/store/hotel/hotel.state';
import { MyErrorStateMatcher } from '../../../auth/login/login.component';
import { LoginService } from '../../../auth/login/login.service';
import { HotelData } from '../../data/hotel-data';
import { Hotel } from '../../hotel';
import { SetSearchCriteriaData } from 'src/app/store/hotel/hotel.actions';

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.css']
})

export class HotelSearchComponent extends Hotel implements OnInit, AfterViewInit, OnDestroy {
  public hotelData = {};
  public hotelLoading = false;
  public loadingLeavingFrom = false;
  public loadingLeavingTo = false;

  public isHotelListLoading = true;
  public isSearchPage = true;
  public rangeNames = [
    "Check-In",
    "Check-Out"
  ];

  hotelList = [];
  searchList = [];
  selectedAll:any;
  errorMessage = '';
  public showFares = false;

  public minToDate = new Date();
  public maxToDate = new Date(this.minToDate.getTime() +  1000 * 60 * 60 * 24 * 150);
  public minFromDate = new Date();
  public maxFromDate = new Date(this.minFromDate.getTime() +  1000 * 60 * 60 * 24 * 150);

  public filteredPlaceOptions: Observable<any[]>;
  errorMatcher = new MyErrorStateMatcher();

  public hotelSearchFormGroup = new FormGroup({
    //trip: new FormControl(this.tripType[0], Validators.required),
    place: new FormControl('', Validators.required),
    start: new FormControl(new Date(), Validators.required),
    end: new FormControl(new Date(new Date().getTime() + 1000*60*60*24 ).toISOString(), Validators.required),
    count: new FormControl(1, Validators.required),
    adults: new FormControl(1, Validators.required),
    childrens: new FormControl(0, Validators.required),
    rooms: new FormControl(1, Validators.required)
  }, {
    validators: [ this.sameStartEndValidator, this.fromSelected]
  });

  public query = {};
  public airPortList = [];
  @ViewChild('picker1') private picker1;
  @ViewChild('picker2') private picker2;
  @ViewChild('travellersSelect') travellersSelect;
  //@ViewChild('tripSelect') tripSelect;
  @ViewChild('hotelPlaceDiv', { read: ElementRef, static: false }) hotelPlaceDiv: ElementRef;
  @ViewChild('countPopupDiv', { read: ElementRef, static: false }) countPopupDiv: ElementRef;
  @ViewChild('travellersDiv', { read: ElementRef, static: false }) travellersDiv: ElementRef;
  @ViewChildren('placeInput') placeInput;

  public click = {
    place: true,
    start: true,
    end: true,
    count: true,
    trip: true
  }

  @ViewChild('hotelListComponent', {static : false}) hotelListComponentRef: HotelListComponent;
  private docClickSubscription: any;
  public isLoading = false;
  public isHotelsLoading = false;
  public isHotelListFetching = true;
  public isSubmitted = false;
  @Select(HotelStateModule.getSearchCriteria) searchCriteria$: Observable<any>;
  searchSubject: Subject<any> = new Subject<any>();

  //Method to be invoked everytime we receive a new instance
  //of the address object from the onSelect event emitter.
  setAddress(addrObj) {
    //We are wrapping this in a zone method to reflect the changes
    //to the object in the DOM.
    this.click.place = true;
    this.placeChange(null);
    let json = this.hotelSearchFormGroup.value;
    json.place = addrObj;
    this.hotelSearchFormGroup.patchValue(json);
    this.placeInput.first.nativeElement.focus();

  }

  constructor(loginService: LoginService, private hotelRetrieveService: HotelRetrieveService,
         private renderer: Renderer2, private httpClient: HttpClient, private store: Store,
         private router: Router, private localStorage: LocalStorage) {
    super(loginService);
    document.body.style.backgroundSize = "100% 165px";
    this.searchCriteria$.subscribe((searchCriteria) => {
      if(searchCriteria != null){
        this.updateFormGroup(searchCriteria);
        this.localStorage.setItem('hotelSearchFormGroup', JSON.stringify(searchCriteria));
      } else {
        const searchCriteriaTxt = this.localStorage.getItem('hotelSearchFormGroup');
        if(searchCriteriaTxt != null) {
          let searchCriteriaJSON = JSON.parse(searchCriteriaTxt);
          searchCriteriaJSON = this.checkDate(searchCriteriaJSON);
          this.updateFormGroup(searchCriteriaJSON);
        }
      }
    });
  }

  ngOnInit() {
    this.showFares = false;
    //this.getAllAirportSearchService(); //need to uncomment when location search available
    this.docClickSubscription = this.renderer.listen('document', 'click', this.onDocumentClick.bind(this));
    this.filteredPlaceOptions = this.hotelSearchFormGroup.get('place').valueChanges
      .pipe(
        debounceTime(500),
        switchMap((hotelCode) => {
          if(this.filter(hotelCode)){
            return of([]);
          } else {
            return of([]);
            //this.loadingLeavingFrom = true;
            //return this.searchAirportSearchService(hotelCode);
          }
      }));
    /*
    this.filteredFromOptions = this.hotelSearchFormGroup.get('place').valueChanges
      .pipe(
        switchMap((hotelCode) => {
          if(hotelCode == '' || hotelCode == null ) {
            return of(this.airPortList);
          } else {
            this.loadingLeavingFrom = true;
            return this.searchOfflineAirportSearch(hotelCode);
          }
      })); */

    this.hotelSearchFormGroup.get('start').valueChanges.subscribe(val => {
      this.minFromDate = val;
    });
    this.hotelSearchFormGroup.get('end').valueChanges.subscribe(val => {
    });
    this.search();
  }

  public ngAfterViewInit() {
    // this.hotelListComponentRef.searchHotels(this.getSearchQuery());
    // console.log('ngAfterViewInit');
    this.emitEventToHotelList();
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
      this.localStorage.setItem('hotelSearchFormGroup', JSON.stringify(searchCriteriaJSON));
    }
    return searchCriteriaJSON;
  }

  updateFormGroup(searchCriteria){
    let json = this.hotelSearchFormGroup.value;
    json = {
      ...json,
      ...searchCriteria
    };
    /* this.radioSelected = json.trip == "round"  ? "round" : "one";
    if(this.radioSelected == 'one'){
      this.hotelSearchFormGroup.get('end').disable();
    } */
    this.hotelSearchFormGroup.patchValue(json);
  }

  emitEventToHotelList() {
    let searchObj = {
      selectedHotelList: this.selectHotels(),
      searchForm: this.hotelSearchFormGroup.value
    }
    this.searchSubject.next(searchObj);
  }

  private onDocumentClick(event: any): void {
    // console.log(event.target.className);
     if (event.target.className.indexOf("mat-calendar-body-cell-content") != -1) {
      // console.log("mat-calendar clicks");
      this.startDateChange(null, null);
      this.endDateChange(null, null);
    } else if (event.target.className.indexOf("mat-option-text") != -1) {
      // console.log("mat-option clicks");
      // has to uncomment after travel popup
      this.countChange(null);
      //this.tripChange(null);
    } else if(event.target.className.indexOf("cdk-overlay-backdrop") != -1) {
      // console.log("overlay clicks");
      this.startDateChange(null, null);
      this.endDateChange(null, null);
      // has to uncomment after travel popup
      this.countChange(null);
      //this.tripChange(null);
    } else if(event.target.id == "place"
              || event.target.id == "placeDiv"
              || this.hotelPlaceDiv.nativeElement.contains(event.target)) {
      // console.log("search_inputField from clicks");
      let json = this.hotelSearchFormGroup.value;
      const fromValue = json.from;
      json.from = '';
      this.hotelSearchFormGroup.patchValue(json);
      json.from = fromValue;
      this.hotelSearchFormGroup.patchValue(json);
      this.placeInput.first.nativeElement.focus();
    } /*else if (event.target.className.indexOf("mat-option-text dismiss") == -1) {
      // console.log("mat-option-text dismiss clicks");
      this.placeChange(null);
      this.toChange(null);
    } */ else if(!this.hotelPlaceDiv.nativeElement.contains(event.target)) {
      if(!this.hotelPlaceDiv.nativeElement.contains(event.target)) {
        // console.log("outside hotelPlaceDiv");
        this.placeChange(null);
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
    this.placeChange(null);
    this.countChange(null);
    //this.tripChange(null);
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
    } //else if(objType == 'trip') {
    //   this.openTrip();
    // }
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
    if(!this.hotelSearchFormGroup.get('start').hasError('required')){
      this.click.start = true;
      let json = this.hotelSearchFormGroup.value;
      if(new Date(json.start).getTime() > new Date(json.end).getTime()){
        json.end = new Date(json.start.getTime() + 1000*60*60*24);
        this.hotelSearchFormGroup.patchValue(json);
      }
    }
  }

  endDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    if(!this.hotelSearchFormGroup.get('end').hasError('required')
        && !this.hotelSearchFormGroup.hasError('startEndMatch')){
      this.click.end = true;
    }
  }

  placeChange($event) {
    if(!this.hotelSearchFormGroup.get('place').hasError('required')){
      this.click.place = true;
    }
  }

  countChange($event) {
    // has to uncomment after travel popup
    if(!this.hotelSearchFormGroup.get('count').hasError('required')){
      this.click.count = true;
    }
    /*let json = this.hotelSearchFormGroup.value;
    json.count = json.adults + json.childrens + json.rooms;
    this.hotelSearchFormGroup.patchValue(json);
    this.click.count = true;*/
  }

  searchAirportSearchService(hotelCode) {
    const code = hotelCode.data != null ? hotelCode.data : hotelCode;
    return this.hotelRetrieveService.searchCity(code)
            .pipe(map((data: any) => {
                this.loadingLeavingTo = false;
                this.loadingLeavingFrom = false;
                return data.predictions;
            }));
  }

  filterAirport(hotelCode) {
    let suggestions = [];
    let airPortCode = hotelCode.name || hotelCode.value;
    airPortCode = airPortCode == null ? hotelCode : airPortCode;
    for(const airPort of this.airPortList) {
      if( airPort.name.toLowerCase().indexOf(airPortCode.toLowerCase()) === 0
            || airPort.id.toLowerCase().includes(airPortCode.toLowerCase())) {
        suggestions.push(airPort);
      }
    }
    return suggestions;
  }

  getAllAirportSearchService() {
    this.hotelRetrieveService.getAllAirport().
      subscribe((data: any) => {
        this.airPortList = data;
        this.isLoading = false;
      });
  }

  searchHotelsService() {
      this.hotelLoading = true;
      this.hotelRetrieveService.searchHotels(this.getSearchQuery()).
          subscribe((data: any) => {
            this.hotelData = data;
            this.hotelLoading = false;
          });
  }

  filter(hotelCode) {
    if(hotelCode == '' || hotelCode == null ){
      return true;
    } else if(hotelCode.data != null){
      return false;
    } else if (hotelCode.length >= 1){
      return false;
    } else {
      return true;
    }
  }

  isUS(country) {
    return country.toUpperCase() === 'US' || country.toUpperCase() === 'UNITED STATES';
  }

  getSearchQuery() {
    const searchCriteriaTxt = this.localStorage.getItem('hotelSearchFormGroup');
    const formGroupValue = this.hotelSearchFormGroup.value;
    let qry = {
      city: formGroupValue.place ? formGroupValue.place : 'miami',
      state: 'FL',
      country: 'US',
      chainCode: ''
    };
    // const place = formGroupValue.place; // formGroupValue.place.data || formGroupValue.place.id|| formGroupValue.place;
    // qry.city = place.locality;
    // qry.state =  this.isUS(place.country) ? place.admin_area_l1 : place.country;
    // qry.country = place.country;
    // this.query = qry;
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

  search(){
    let tenantConfig = getTenantModule();
    this.selectedAll = false;
    // if(this.hotelSearchFormGroup.valid) {
      this.isHotelsLoading = true;
      this.isHotelListLoading = true;
      // this.searchHotelsService();
      // let hotelSearchFormGroupValue = this.hotelSearchFormGroup.value;
      // this.localStorage.setItem('hotelSearchFormGroup', JSON.stringify(hotelSearchFormGroupValue));
      // this.store.dispatch(new SetSearchCriteriaData(hotelSearchFormGroupValue));
      //this.hotelListComponentRef.searchHotels(this.getSearchQuery());
      this.hotelList = [];
      this.errorMessage = '';
      return this.hotelRetrieveService.searchHotels(this.getSearchQuery()).subscribe((hotelData: Array<HotelData>) => {
        this.showFares = false;
        if(hotelData.length == 0) {
          this.errorMessage = 'No Hotels Are Available In Specified Location';
          this.isHotelListLoading = false;
          this.isHotelsLoading = false;
          this.isHotelListFetching = false;
        } else {
          for(let hotel of hotelData){
            hotel.selected = false;
            this.hotelList.push(hotel);
          }
          this.searchList = this.hotelList;
          if(tenantConfig.hotel && tenantConfig.hotel.skipHotelSearchSelectionStep){
            this.toggleShowFare();
          }
          this.isHotelsLoading = false;
          //console.log(this.hotelList);
        }
      }, error=>{
        this.isHotelListLoading = false;
        this.isLoading = false;
        this.isHotelListFetching = false;
        if(error.Error.extensionPoint){
          this.errorMessage = error.Error.extensionPoint.any[0].errors[0].notifications[0].message;
        }else{
          this.errorMessage = 'No Hotels Are Available In Specified Location';
        }
      });
    // } else {
    //   this.hotelSearchFormGroup.markAllAsTouched();
    //   this.isSubmitted = true;
    // }
  }

  toggleShowFare() {
    this.showFares = !this.showFares;
    if(this.showFares){
      this.emitEventToHotelList();
    }
  }

  selectHotels(){
    let selectedHotels = [];
    for(let hotel of this.hotelList) {
      if(hotel.selected){
        selectedHotels.push(hotel);
      }
    }
    return selectedHotels.length == 0 ? this.hotelList : selectedHotels;
  }

  selectAll() {
    for (var i = 0; i < this.searchList.length; i++) {
      this.searchList[i].selected = this.selectedAll;
    }
  }

  checkIfAllSelected() {
    this.selectedAll = this.searchList.every(function(item:any) {
        return item.selected == true;
      })
  }

  searchHotelName(hotelString: string){
    this.searchList = this.hotelList.filter(function(item:any) {
      if(item.basicPropertyInfo.name.toLowerCase().indexOf(hotelString.toLowerCase()) != -1){
        return item;
      }
    });
    this.checkIfAllSelected();
    //console.log(this.searchList);
  }

  isLoadingChange(loading){
    this.isHotelListLoading = loading;
  }

  isHotelListFetchingChange(loading) {
    this.isHotelListFetching = loading;
  }
}
