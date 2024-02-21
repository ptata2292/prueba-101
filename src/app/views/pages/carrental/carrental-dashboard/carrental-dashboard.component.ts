import { Component, OnInit, ViewChild, OnDestroy, Renderer2, ElementRef, ViewChildren, NgZone } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, debounceTime, distinct, filter, map, switchMap } from 'rxjs/operators';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { ErrorStateMatcher } from '@angular/material/core';
import { of } from 'rxjs';
import { HttpClient  } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';

import { CarrentalRetrieveService } from './carrental-retrieve.service';
import { Carrental } from '../carrental';
import { LoginService } from '../../auth/login/login.service';
import { SetSearchCriteriaData } from '../../../../store/carrental/carrental.actions';
import { MyErrorStateMatcher, trip } from '../../../../shared/models/carrental.model';

@Component({
  selector: 'app-carrental-dashboard',
  templateUrl: './carrental-dashboard.component.html',
  styleUrls: ['./carrental-dashboard.component.css']
})
export class CarrentalDashboardComponent extends Carrental implements OnInit, OnDestroy {
  public response = {};
  public carRentalData = {};
  public carrentalLoading = false;
  //public radioSelected : trip = "one";
  public loadingLeavingFrom = false;
  public loadingLeavingTo = false;

  public minToDate = new Date();
  public maxToDate = new Date(this.minToDate.getTime() +  1000 * 60 * 60 * 24 * 150);
  public minFromDate = new Date();
  public maxFromDate = new Date(this.minFromDate.getTime() +  1000 * 60 * 60 * 24 * 150);
  
  public filteredFromOptions: Observable<any[]>;
  public filteredToOptions: Observable<any[]>;
  errorMatcher = new MyErrorStateMatcher();

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
  @ViewChild('picker1') private picker1;
  @ViewChild('picker2') private picker2;
  @ViewChild('pickupTimeSelect') pickupTimeSelect;
  @ViewChild('dropoffTimeSelect') dropoffTimeSelect;
  
  @ViewChild('fromDiv', { read: ElementRef, static: false }) fromDiv: ElementRef;
  @ViewChild('toDiv', { read: ElementRef, static: false }) toDiv: ElementRef;
  @ViewChild('countPopupDiv', { read: ElementRef, static: false }) countPopupDiv: ElementRef;
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
  
  private docClickSubscription: any;
  public isLoading = false;
  public isSubmitted = false;

  address: Object;
  formattedAddress: string;

  constructor(loginService: LoginService, private carrentalRetrieveService: CarrentalRetrieveService, 
    private renderer: Renderer2, private store: Store, private router: Router, public zone: NgZone) {    
    super(loginService);  
    // this.carSearchFormGroup.get('from').disable();
    //this.carSearchFormGroup.get('end').disable();
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
      this.pickupTimeChange(null);
      this.dropoffTimeChange(null);   
    } else if(event.target.className.indexOf("cdk-overlay-backdrop") != -1) {
      // console.log("overlay clicks");
      this.startDateChange(null, null);   
      this.endDateChange(null, null); 
      // has to uncomment after travel popup
      this.pickupTimeChange(null);
      this.dropoffTimeChange(null);   
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
    } /* else if (event.target.className.indexOf("mat-option-text dismiss") == -1) {
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
       || event.target.className.indexOf("search_inputField h2 pickupTime") != -1
       || event.target.className.indexOf("display6 pickupTime") != -1
       || this.pickupTimeDiv.nativeElement.contains(event.target)) {
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
    this.pickupTimeChange(null);
    this.dropoffTimeChange(null);
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
        // has to uncomment after travel popup  
        this.openDropoffTime();
      } 
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
      //json.pickupTime = this.getValidPickupTime(json.start, json.from);//uncomment when pickuptime fixed
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
    json.dropoffTime = json.adults + json.childrens + json.infants;
    this.carSearchFormGroup.patchValue(json);
    this.click.dropoffTime = true;*/
  }

  swipBtn() {
    let json = this.carSearchFormGroup.value;
    const fromValue = json.from;
    json.from = json.to;
    json.to = fromValue;
    this.carSearchFormGroup.patchValue(json);
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
      // this.carSearchFormGroup.get('from').enable();
      this.carSearchFormGroup.get('end').enable();
      if(this.carSearchFormGroup.get('end').value == '') {
        this.carSearchFormGroup.controls['end'].setValue(this.carSearchFormGroup.get('start').value);
      }
    }
  }
  
  // enableRoundTrip() {
  //   this.radioSelected = "round";
  //   this.radioChange("round");
  //   this.click.end = false;
  //   this.openEnd();
  // }

  // toggleTrip() {
  //   this.radioSelected = this.radioSelected == "round"  ? "one" : "round";
  //   this.radioChange(this.radioSelected);
  // }

  truncateTime(time){
    const timeStr = time.toISOString()
    return timeStr.substring(0, timeStr.lastIndexOf('T')) + 'T00:00:00';
  }
  
  search(){
    if(this.carSearchFormGroup.value.to == ""){
      let json = this.carSearchFormGroup.value;
      json.to = json.from;
      this.carSearchFormGroup.patchValue(json);
    }
    if(this.carSearchFormGroup.valid) {
      // this.searchCarrentalsService();
      let carSearchFormGroupValue = this.carSearchFormGroup.value;
      //carSearchFormGroupValue.trip = this.radioSelected;
      this.store.dispatch(new SetSearchCriteriaData(carSearchFormGroupValue));
      this.router.navigateByUrl('/CarRental/Search');
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
        }),
        catchError((err, caught) => {
          this.loadingLeavingTo = false;
          this.loadingLeavingFrom = false;
          //this.errorMessage = error.Error;
          if(err.status!=500){
            //this.password.setErrors([{'password is incorrect': true}]);
          }else{
            //this.serverError = true;
            //this.errorMessage ='Server is unavailable.';
          }
          //this.snackBar("Server is unavailable.");
          return [];
        })); 
  }

  getAddress(place: object) {
    this.address = place['formatted_address'];
    this.formattedAddress = place['formatted_address'];
    this.zone.run(() => this.formattedAddress = place['formatted_address']);
  }
}
