import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { LocalStorage } from 'src/app/shared/storage/local-storage';
import { LoginService } from '../../../auth/login/login.service';
import { Airline } from '../../airline';
import { AirlineSearch } from '../../viewmodels/airline-search';
import { AirlineRetrieveService } from '../../services/airline-retrieve.service';
import { AirlinePassengerService } from '../../services/airline-passenger.service';

@Component({
  selector: 'app-airline-search-travellers',
  templateUrl: './airline-search-travellers.component.html',
  styleUrls: ['./airline-search-travellers.component.css']
})


export class AirlineSearchTravellersComponent extends Airline implements OnInit, OnDestroy, AfterViewInit {

  @Input() airlineSearch: AirlineSearch;
  @Input() fontStyle: string;
  
  @ViewChild('travellersSelect') travellersSelect;
  @ViewChild('countPopupDiv') countPopupDiv;
  @ViewChild('travellersDiv') travellersDiv;

  supportedPtcs: Array<string>; 
  numbers: Array<Number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  
  showPTC: boolean; 
  private docClickSubscription: any;

  constructor(loginService: LoginService, private renderer: Renderer2, private passengerService: AirlinePassengerService) { 
    super(loginService);
    this.supportedPtcs = this.passengerService.getSupportedPtcs();
  }
  
  ngOnInit(): void {
    this.docClickSubscription = this.renderer.listen('document', 'click', this.onDocumentClick.bind(this));
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
    this.docClickSubscription();
  }

  private onDocumentClick(event: any): void {
       
    if(this.countPopupDiv != null && (this.countPopupDiv.nativeElement.contains(event.target)
       || event.target.className.indexOf("mat-option-text") != -1) 
       || event.target.className.indexOf("search_inputField h2 count") != -1
       || event.target.className.indexOf("display6 count") != -1 
       || this.travellersDiv.nativeElement.contains(event.target)) {
    } else {
      this.showPTC = false;
    }
 }

 totalNumberChanged(t){
    for(let i = 0; i < this.airlineSearch.travellers.length; i++){
      if(!this.airlineSearch.travellers[i]){
        this.airlineSearch.travellers[i] = {
          index: i,
          ptc: this.passengerService.getAdult().ptcCode
        };
      }
    }
 } 
 
 travellerPtcChanged($event, index: number){
   this.airlineSearch.travellers[index] = $event.value;
 }
 
  getPtcLabel(ptcCode: string){
    return this.passengerService.getPtcLabel(ptcCode);
  }
}
