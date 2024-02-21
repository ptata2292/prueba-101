import { Component, Input, OnInit } from '@angular/core';
import { collapseAnimation } from '../../../../../animations';
import { LoginService } from '../../../auth/login/login.service';
import { Airline } from '../../airline';
import { AirlineOrderService } from '../../services/airline-order.service';
import { AirlinePassengerSummaryViewModel } from '../../viewmodels/airline-passenger';

@Component({
  selector: 'app-airline-order-summary',
  templateUrl: './airline-order-summary.component.html',
  animations: [
    collapseAnimation
  ],
  styleUrls: ['./airline-order-summary.component.css']
})

export class AirlineOrderSummaryComponent extends Airline implements OnInit {
  @Input() passengers: Array<AirlinePassengerSummaryViewModel>;

  constructor(loginService: LoginService, private orderService: AirlineOrderService) {
    super(loginService);

  }
 
  ngOnInit(): void {
  } 

  calculatePassengerSeatsAmount(passenger: AirlinePassengerSummaryViewModel) : number{
    let totalAmount = this.orderService.calculatePassengerSeatsAmount(passenger);
    return totalAmount;
  }

  calculatePassengerAmount(passenger: AirlinePassengerSummaryViewModel) : number{
    let totalAmount = this.orderService.calculatePassengerAmount(passenger);
    return totalAmount;
  }

  calculateTotalAmount() : number{
    let totalAmount = this.orderService.calculateTotalAmount(this.passengers);
    return totalAmount;
  }
}

