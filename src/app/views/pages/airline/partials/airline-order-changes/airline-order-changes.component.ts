import { Component, Input, OnInit } from '@angular/core';
import { AirlineChangeOrderService } from '../../services/airline-change-order.service';
import { AirlineOrderChangeViewModel } from '../../viewmodels/airline-order-change';

@Component({
  selector: 'app-airline-order-changes',
  templateUrl: './airline-order-changes.component.html',
  styleUrls: ['./airline-order-changes.component.scss']
})
export class AirlineOrderChangesComponent implements OnInit {

  @Input() orderId;
  
  constructor(private airlineChangeOrderService: AirlineChangeOrderService) { 

  }

  orderChanges(): Array<AirlineOrderChangeViewModel>{
    return this.airlineChangeOrderService.viewOrderChanges(this.orderId);
  }

  ngOnInit(): void {
  }

}
