import { Component, OnInit, ViewChild, OnDestroy, Renderer2, ElementRef, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, distinct, filter, map, switchMap } from 'rxjs/operators';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { ErrorStateMatcher } from '@angular/material/core';
import { of } from 'rxjs';
import { HttpClient  } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { HotelRetrieveService } from '../../services/hotel-retrieve.service';
import { MyErrorStateMatcher } from '../../../auth/login/login.component';
import { LoginService } from '../../../auth/login/login.service';
import { Hotel } from '../../hotel';
import { SetSearchCriteriaData } from 'src/app/store/hotel/hotel.actions';

@Component({
  selector: 'app-hotel-dashboard',
  templateUrl: './hotel-dashboard.component.html',
  styleUrls: ['./hotel-dashboard.component.css']
})
export class HotelDashboardComponent extends Hotel implements OnInit, OnDestroy {
  public hotelData = {};
  public hotelLoading = false;
  public loadingPlace = false;
  public loadingLeavingTo = false;

  public minToDate = new Date();
  public maxToDate = new Date(this.minToDate.getTime() +  1000 * 60 * 60 * 24 * 150);
  public minFromDate = new Date();
  public maxFromDate = new Date(this.minFromDate.getTime() +  1000 * 60 * 60 * 24 * 150);
  
  public filteredPlaceOptions: Observable<any[]>;
  errorMatcher = new MyErrorStateMatcher();

  public hotelSearchFormGroup = new FormGroup({   
    place: new FormControl('', Validators.required),
    start: new FormControl(new Date(), Validators.required),
    end: new FormControl(new Date(new Date().getTime() + 1000*60*60*24 ), Validators.required),
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
  
  @ViewChild('hotelPlaceDiv', { read: ElementRef, static: false }) hotelPlaceDiv: ElementRef;
  @ViewChild('countPopupDiv', { read: ElementRef, static: false }) countPopupDiv: ElementRef;
  @ViewChild('travellersDiv', { read: ElementRef, static: false }) travellersDiv: ElementRef;
  @ViewChildren('placeInput') placeInput;

  public click = {
    place: true,
    start: true,
    end: true,
    count: true
  }
  
  private docClickSubscription: any;
  public isLoading = false;
  public isSubmitted = false;
  public isSearchPage = false;
  public rangeNames = [
    "Check-In",
    "Check-Out"
  ];

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
    private renderer: Renderer2, private store: Store, private router: Router) {    
    super(loginService);  
    // this.hotelSearchFormGroup.get('place').disable();
    // this.hotelSearchFormGroup.get('end').disable();
  }
  
  ngOnInit() {
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
            //return this.searchHotelCity(hotelCode);
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
  }

  public ngOnDestroy(): void {
    this.docClickSubscription();
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
    } else if(event.target.className.indexOf("cdk-overlay-backdrop") != -1) {
      // console.log("overlay clicks");
      this.startDateChange(null, null);   
      this.endDateChange(null, null); 
      // has to uncomment after travel popup
      this.countChange(null); 
    } else if(event.target.id == "place"
              || event.target.id == "hotelDiv"
              || this.hotelPlaceDiv.nativeElement.contains(event.target)) {
      // console.log("search_inputField from clicks");
      let json = this.hotelSearchFormGroup.value;
      const placeValue = json.place;
      json.place = '';
      this.hotelSearchFormGroup.patchValue(json);
      json.place = placeValue;
      this.hotelSearchFormGroup.patchValue(json);   
      this.placeInput.first.nativeElement.focus();
    } /* else if (event.target.className.indexOf("mat-option-text dismiss") == -1) {
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

  searchHotelCity(cityString) {
    const code = cityString.data != null ? cityString.data : cityString;
    return this.hotelRetrieveService.searchCity(code)
      .pipe(map((data: any) => {
          this.loadingLeavingTo = false;
          this.loadingPlace = false;
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

  truncateTime(time){
    const timeStr = time.toISOString()
    return timeStr.substring(0, timeStr.lastIndexOf('T')) + 'T00:00:00';
  }
  
  search(){
    // if(this.hotelSearchFormGroup.valid) {
      // this.searchHotelsService();
      // console.log(this.hotelSearchFormGroup.value)
      let hotelSearchFormGroupValue = this.hotelSearchFormGroup.value;
      if (hotelSearchFormGroupValue.place) {
        this.store.dispatch(new SetSearchCriteriaData(hotelSearchFormGroupValue));
        this.router.navigateByUrl('/Hotels/Search');         
      }
    // } else {
    //   this.hotelSearchFormGroup.markAllAsTouched();
    //   this.isSubmitted = true;
    // }
  }
}
