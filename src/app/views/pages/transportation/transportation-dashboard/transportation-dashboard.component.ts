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

import { environment } from '../../../../../environments/environment';
import { TransportationRetrieveService } from './transportation-retrieve.service';
import { Transportation } from '../transportation';
import { LoginService } from '../../auth/login/login.service';
import { SetSearchCriteriaData } from '../../../../store/transportation/transportation.actions';
import { MyErrorStateMatcher, trip } from '../../../../shared/models/transportation.model';

@Component({
  selector: 'app-transportation-dashboard',
  templateUrl: './transportation-dashboard.component.html',
  styleUrls: ['./transportation-dashboard.component.css']
})
export class TransportationDashboardComponent extends Transportation implements OnInit, OnDestroy {
  public response = {};
  public transportationData = {};
  public transportationLoading = false;
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

  public searchFormGroup = new FormGroup({   
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    start: new FormControl(new Date(), Validators.required),
    end: new FormControl('', Validators.required),
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
    count: true
  }
  
  private docClickSubscription: any;
  public isLoading = false;
  public isSubmitted = false;
  constructor(loginService: LoginService, private transportationRetrieveService: TransportationRetrieveService, 
    private renderer: Renderer2, private store: Store, private router: Router) {    
    super(loginService);  
    // this.searchFormGroup.get('from').disable();
    this.searchFormGroup.get('end').disable();
  }
  
  ngOnInit() {
    this.getAllAirportSearchService();
    this.docClickSubscription = this.renderer.listen('document', 'click', this.onDocumentClick.bind(this));
    this.filteredToOptions = this.searchFormGroup.get('to').valueChanges
      .pipe(
        debounceTime(500),
        switchMap((transportationCode) => {
          if(this.filter(transportationCode)){
            return of([]);
          } else {
            this.loadingLeavingTo = true;
            return this.serachAirportSearchService(transportationCode);
          }
      }));
    this.filteredFromOptions = this.searchFormGroup.get('from').valueChanges
      .pipe(
        debounceTime(500),
        switchMap((transportationCode) => {
          if(this.filter(transportationCode)){
            return of([]);
          } else {
            this.loadingLeavingFrom = true;
            return this.serachAirportSearchService(transportationCode);
          }
      })); 
    /* this.filteredToOptions = this.searchFormGroup.get('to').valueChanges
      .pipe(
        switchMap((transportationCode) => {
          if(transportationCode == '' || transportationCode == null ) {
            return of(this.airPortList);
          } else {
            this.loadingLeavingTo = true;
            return this.serachOfflineAirportSearch(transportationCode);
          }
      }));
    this.filteredFromOptions = this.searchFormGroup.get('from').valueChanges
      .pipe(
        switchMap((transportationCode) => {
          if(transportationCode == '' || transportationCode == null ) {
            return of(this.airPortList);
          } else {
            this.loadingLeavingFrom = true;
            return this.serachOfflineAirportSearch(transportationCode);
          }
      })); */
       
    this.searchFormGroup.get('start').valueChanges.subscribe(val => {
      this.minFromDate = val;
    });
    this.searchFormGroup.get('end').valueChanges.subscribe(val => {
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

  swipBtn() {
    let json = this.searchFormGroup.value;
    const fromValue = json.from;
    json.from = json.to;
    json.to = fromValue;
    this.searchFormGroup.patchValue(json);
  }

  serachAirportSearchService(transportationCode) {
    const code = transportationCode.data != null ? transportationCode.data : transportationCode;
    return this.transportationRetrieveService.searchAirport(code)
            .pipe(map((data: any) => {
                this.loadingLeavingTo = false;
                this.loadingLeavingFrom = false;
                return data.suggestions;
            }));
  }

  serachOfflineAirportSearch(transportationCode) {
    let suggestions = [];
    if(this.airPortList.length == 0){
      const code = transportationCode.data != null ? transportationCode.data : transportationCode;
      return this.transportationRetrieveService.searchAirport(code)
            .pipe(map((data: any) => {
                this.loadingLeavingTo = false;
                this.loadingLeavingFrom = false;
                return data.suggestions;
            }));
    } else {
      this.loadingLeavingTo = false;
      this.loadingLeavingFrom = false;
      const filterAirports = this.filterAirport(transportationCode);
      return of(filterAirports);
    }    
  }

  filterAirport(transportationCode) {
    let suggestions = [];
    let airPortCode = transportationCode.name || transportationCode.value;
    airPortCode = airPortCode == null ? transportationCode : airPortCode;
    for(const airPort of this.airPortList) {
      if( airPort.name.toLowerCase().indexOf(airPortCode.toLowerCase()) === 0
            || airPort.id.toLowerCase().includes(airPortCode.toLowerCase())) {
        suggestions.push(airPort);
      }
    }
    return suggestions;
  }

  getAllAirportSearchService() {
    this.transportationRetrieveService.getAllAirport().
      subscribe((data: any) => {
        this.airPortList = data;
        this.isLoading = false;
      });
  }

  serachTransportationsService() {
      this.transportationLoading = true;
      this.transportationRetrieveService.searchTransportations(this.getSearchQuery()).
          subscribe((data: any) => {
            this.transportationData = data;
            this.transportationLoading = false;
          });
  }

  filter(transportationCode) {
    if(transportationCode == '' || transportationCode == null ){
      return true;
    } else if(transportationCode.data != null){
      return false;
    } else if (transportationCode.length >= 1){
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
      "DepartureAirportCode": toAirPortCode,
      "ArrivalAirportCode": fromAirPortCode,
      "TravelDate": this.truncateTime(formGroupValue.start)      
    });
    if(this.radioSelected == 'round'){
      qry.Flights.push({
        "DepartureAirportCode": fromAirPortCode,
        "ArrivalAirportCode": toAirPortCode,
        "TravelDate": this.truncateTime(formGroupValue.end)
      });
    }
    this.query = qry;
    return qry;
  }

  truncateTime(time){
    const timeStr = time.toISOString()
    return timeStr.substring(0, timeStr.lastIndexOf('T')) + 'T00:00:00';
  }
  
  serach(){
    if(this.searchFormGroup.valid) {
      // this.serachTransportationsService();
      let searchFormGroupValue = this.searchFormGroup.value;
      searchFormGroupValue.trip = this.radioSelected;
      this.store.dispatch(new SetSearchCriteriaData(searchFormGroupValue));
      this.router.navigateByUrl('/Transportations/Search');
    } else {
      this.searchFormGroup.markAllAsTouched();
      this.isSubmitted = true;
    }
  }
}
