import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LoginService } from '../../../auth/login/login.service';
import { Airline } from '../../airline';
import { AirlinePassenger } from '../../models/passenger/airline-passenger';
import { AirlinePtcCount } from '../../viewmodels/airline-ptc';
import { AirlinePassengerService } from '../../services/airline-passenger.service';
import { AirlinePassengerSummaryViewModel } from '../../viewmodels/airline-passenger';
import { AirlinePassengerFormComponent } from '../airline-passenger-form/airline-passenger-form.component';
import { AirlineOrderStatus } from '../../models/order/airline-order-status';
import { AirlineOrderViewModel } from '../../viewmodels/airline-order';

@Component({
  selector: 'app-airline-passenger-list',
  templateUrl: './airline-passenger-list.component.html',
  styleUrls: ['./airline-passenger-list.component.css']
})
export class AirlinePassengerListComponent extends Airline implements OnInit {

  @Input() orderViewModel: AirlineOrderViewModel;
  @Input() orderId: string;
  @ViewChild(AirlinePassengerFormComponent) airlinePassengerFormComponent : AirlinePassengerFormComponent;
    
  displayedColumns: string[] = ['Index', 'Name', 'Gender', 'DOB', 'TicketNo'];

  constructor(loginService: LoginService, private passengerService: AirlinePassengerService) {
    super(loginService) 
  }

  ngOnInit(): void { 
  }
  
  getName(passenger){
    const name =
    (passenger.individual.nameTitle || "") + " " + 
    (passenger.individual.givenName || "") + " " + 
    (passenger.individual.middleName || "") + " " + 
    (passenger.individual.surname || "");
    return name;
  }
}
