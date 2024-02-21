import { Component, OnInit, EventEmitter, ViewChild, AfterViewInit} from '@angular/core';
import { trigger, style, transition, query } from '@angular/animations';
import { config } from '../../../../../shared/config';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SpaRetrieveService } from '../spa-retrieve.service';
import { slideInOutAnimation, slideUpDownAnimation } from '../../../../../animations';
import { LoginService } from '../../../auth/login/login.service';
import { Spa } from '../../spa';
import { DaterangepickerComponent, DaterangepickerConfig } from 'ng2-daterangepicker';
import * as moment from 'moment';
import { debounceTime, distinct, filter, switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

type trip = 'one' | 'round';

@Component({
  selector: 'app-spa-subheader',
  templateUrl: './spa-subheader.component.html',
  styleUrls: ['./spa-subheader.component.css'],
  animations: [
    slideInOutAnimation,
    slideUpDownAnimation
  ]
})
export class SpaSubheaderComponent extends Spa implements OnInit {

  public response = {};
  public radioSelected : trip = "one";
  qry = {
    "Flights":[
       {
          "DepartureAirportCode":"ORD",
          "ArrivalAirportCode":"DFW",
          "TravelDate":"2021-01-13T00:00:00"
       },
       {
          "DepartureAirportCode":"DFW",
          "ArrivalAirportCode":"ORD",
          "TravelDate":"2021-01-21T00:00:00"
       }
    ],
    "Passengers":[
       {
          "PassengerID":"T1"
       }
    ]
  }
  public loadingLeavingFrom = false;
  public loadingLeavingTo = false;

  @ViewChild(DaterangepickerComponent) private picker: DaterangepickerComponent;
  public mainInput = {
      start: moment(),
      end: ''
  } as any;
  public singleDatePicker = true;
  public singlePicker = {
    singleDatePicker: true,
    showDropdowns: false,
    opens: "left"
  }
  public singleDate: any;

  public minDate = new Date();
  public maxDate = new Date(this.minDate.getTime() +  1000 * 60 * 60 * 24 * 90);
  
  public filteredFromOptions: Observable<any[]>;
  public filteredToOptions: Observable<any[]>;
  public spaSearchFormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
    from: new FormControl(),
    to: new FormControl()
  });

  constructor(private router: Router, 
              private spaRetrieveService:SpaRetrieveService, loginService:LoginService,
              private daterangepickerOptions: DaterangepickerConfig) {    
      super(loginService);
      this.daterangepickerOptions.settings = {
          autoApply : true,
          minDate: new Date(),
          maxDate: moment().add(2, 'month'),
          startDate : new Date(),
          endDate :  new Date()
      }; 
      this.singleDate = Date.now();
      this.spaSearchFormGroup.controls['start'].setValue(new Date());
  }
  
  ngOnInit() {
    this.filteredFromOptions = this.spaSearchFormGroup.get('from').valueChanges
      .pipe(
        debounceTime(500),
        filter((keyWord) => keyWord != null && keyWord.length >= 3),
        switchMap((keyWord) => {
          this.loadingLeavingFrom = true;
          return this.spaRetrieveService.searchAirport(keyWord)
            .pipe(map((data: any) => {
                this.loadingLeavingFrom = false;
                return data.suggestions;
            }));
      }));
    this.filteredToOptions = this.spaSearchFormGroup.get('to').valueChanges
      .pipe(
        debounceTime(500),
        filter((keyWord) => keyWord != null && keyWord.length >= 3),
        switchMap((keyWord) => {
          this.loadingLeavingTo = true;
          return this.spaRetrieveService.searchAirport(keyWord)
            .pipe(map((data: any) => {
                this.loadingLeavingTo = false;
                return data.suggestions;
            }));
      }));
  }

  displayFn(airport): string {
    return airport && airport.data ? airport.data : '';
  }

  serachSpaService() {
    this.spaRetrieveService.searchSpas(this.qry).subscribe((data: any) => {
      this.response = data;
    });
  }

  radioChange(event) {
    if(event.value === 'one') {
      this.singleDatePicker = true;
      this.mainInput.end = '';
      this.spaSearchFormGroup.controls['end'].setValue('');
    } else if(event.value === 'round') {
      this.singleDatePicker = false;
      this.mainInput.end = this.mainInput.start;
      this.spaSearchFormGroup.controls['end'].setValue(
        this.spaSearchFormGroup.get('start').value );
    }
  }
  
  enableEndDate() {
    this.singleDatePicker = false;
    this.radioSelected = "round";
  }

  public selectedDate(value: any, dateInput: any) {
      dateInput.start = value.start;
      if(this.singleDatePicker == true) {
        dateInput.end = '';
      } else {
        dateInput.end = value.end;
      }
      
  }

  private singleSelect(value: any) {
    this.singleDate = value.start;
    this.mainInput.start = value.start;
  }

  startDateChange(event) {
    console.log(event);
  }

  endDateChange(event) {
    console.log(event);
  }
}