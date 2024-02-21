import { Component, Input, OnInit } from '@angular/core';
import { LocalStorage } from 'src/app/shared/storage/local-storage';
import { LoginService } from '../../../auth/login/login.service';
import { Airline } from '../../airline';
import { AirlineBookingReference } from '../../models/order/airline-booking-reference';

@Component({
  selector: 'app-airline-order-rloc',
  templateUrl: './airline-order-rloc.component.html',
  styleUrls: ['./airline-order-rloc.component.css']
})
export class AirlineOrderRlocComponent extends Airline implements OnInit {

  rlocs = [{
    id: 'OrderId',
    text: 'Order Id'
  }, {
    id: 'Firelogix', 
    text: 'Firelogix',
  }, {
    id: 'Airline',
    text: 'Airline'
  }];

  selectedRloc: { id: string, text: string};
  firelogixRloc: string;
  airlineRlocs: Array<{ id: string, text: string}>;

  @Input() bookingReferences: Array<AirlineBookingReference>
  @Input() orderId: string;
  @Input() payments: any;

  constructor(private localStorage: LocalStorage, loginService: LoginService) {
    super(loginService)
   }

  ngOnInit(): void {
    let selectedRlocId = this.localStorage.getItem(this.localStorage.keys.airline.selectedRlocId);
    if (selectedRlocId){
      this.selectedRloc = this.rlocs.find(i => i.id == selectedRlocId);
    }
    if (!this.selectedRloc){
      this.selectedRloc = this.rlocs[0];
    }
      
    this.firelogixRloc = this.bookingReferences.find(i => i.otherID && i.otherID.value == 'F1')?.id;
    this.airlineRlocs = this.bookingReferences
        .filter(i => i.airlineID)
        .map(i => { return {
          id: i.id,
          text: this.getOperatedCarrierText(i.airlineID.value, i.airlineID.name)
        }
    }); 
  }

  selectedRlocChanged() {
    if(this.selectedRloc){
      this.localStorage.setItem(this.localStorage.keys.airline.selectedRlocId, this.selectedRloc.id);
    }
  }
}
