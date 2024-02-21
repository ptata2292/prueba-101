import { Component, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { LoginService } from '../../../auth/login/login.service';
import { Airline } from '../../airline';
import { AirlineSearchFlight } from '../../models/flight/airline-search-flight';

@Component({
  selector: 'app-airport-search-date',
  templateUrl: './airport-search-date.component.html',
  styleUrls: ['./airport-search-date.component.css']
})
export class AirportSearchDateComponent extends Airline implements OnInit, OnDestroy {
  @ViewChild('datepicker') private datepicker;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() public flight: AirlineSearchFlight;
  @Input() public field: string;
  @Input() showLabel: boolean;
  @Input() label: string;
  @Input() fontStyle: string;

  isDateEditorShown: boolean;
  docClickSubscription: any;

  constructor(loginService: LoginService, private renderer: Renderer2) { 
    super(loginService);
  }
 
  ngOnInit(): void {
    this.docClickSubscription = this.renderer.listen('document', 'click', this.onDocumentClick.bind(this));
  }

 showPicker(){
    let self = this;
    this.isDateEditorShown = true;
    setTimeout(() => self.datepicker.open(), 100);
 }
 hidePicker(){
   this.isDateEditorShown = false;
 }

 public ngOnDestroy() {
   this.docClickSubscription();
 }

 private onDocumentClick(event: any): void {
    if (event.target.className.indexOf("mat-calendar-body-cell-content") != -1) {
      this.hidePicker()
    } else if(event.target.className.indexOf("cdk-overlay-backdrop") != -1) {
      this.hidePicker() 
    }
  }
}
