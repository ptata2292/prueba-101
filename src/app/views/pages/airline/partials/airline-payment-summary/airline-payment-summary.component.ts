import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { collapseAnimation } from '../../../../../animations';
import { AirlinePayment } from '../../models/payment/airline-payment';
import { AirlineOrderService } from '../../services/airline-order.service';
import { AirlinePaymentService } from '../../services/airline-payment.service';
import { AirlineOrderViewModel } from '../../viewmodels/airline-order';
import { AirlinePassengerSummaryViewModel } from '../../viewmodels/airline-passenger';
import { AirlinePaymentViewModel } from '../../viewmodels/airline-payment';

@Component({
  selector: 'app-airline-payment-summary',
  templateUrl: './airline-payment-summary.component.html', 
  animations: [
    collapseAnimation
  ],
  styleUrls: ['./airline-payment-summary.component.css']
})
export class AirlinePaymentSummaryComponent implements OnInit {
  @Input() orderViewModel: AirlineOrderViewModel;
  @Input() payments: Array<AirlinePaymentViewModel>;
  @Input() passengers: Array<AirlinePassengerSummaryViewModel>;
  @Output() makePayment = new EventEmitter();

  constructor(private airlineOrderService: AirlineOrderService, private airlinePaymentService: AirlinePaymentService) { }

  ngOnInit(): void {
  }

  calculateOrderPayedAmount(): number{
    let total = 0;
    if(this.payments){
      this.payments.forEach(i => total += i.amount);
    }
    return total;
  }

  calculateDue(): number{
    let due: number = this.airlinePaymentService.calculateDue(this.payments, this.passengers);

    // sometimes have floating problems on big numbers
    if(Math.abs(due) < 0.01){
      due = 0;
    }
    return due;
  }

  calculateOrderTotal(): number{
    return this.airlineOrderService.calculateTotalAmount(this.passengers);
  }

  pay() {
    this.makePayment.emit();
  }
}
