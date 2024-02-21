import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LocalStorage } from '../../../../../shared/storage/local-storage';
import { LoginService } from '../../../auth/login/login.service';
import { Airline } from '../../airline';
import { collapseAnimation } from '../../../../../animations';
import { AirlineOrderSummaryComponent } from '../../partials/airline-order-summary/airline-order-summary.component';
import { AirlinePassengerFormComponent } from '../../partials/airline-passenger-form/airline-passenger-form.component';
import { AirlinePaymentFormComponent } from '../../partials/airline-payment-form/airline-payment-form.component';
import { AirlineOfferViewModel } from '../../viewmodels/airline-offer';
import { AirlineOrderService } from '../../services/airline-order.service';
import { AirlineContactFormComponent } from '../../partials/airline-contact-form/airline-contact-form.component';
import {AirlineFareService} from '../../services/airline-fare.service';
import {AirlineFlightRuleViewModel} from '../../viewmodels/airline-flight-rule';
import { AirlineFlightService } from '../../services/airline-flight.service';
import { AirlineOrderStatus } from '../../models/order/airline-order-status';
import { AirlinePaymentService } from '../../services/airline-payment.service';
 
@Component({
  selector: 'app-airline-create-order',
  templateUrl: './airline-create-order.component.html',
  styleUrls: ['./airline-create-order.component.scss'],
  animations: [
    collapseAnimation
  ]
})
export class AirlineCreateOrderComponent extends Airline implements OnInit {
  @ViewChild(AirlineOrderSummaryComponent) airlineOrderSummaryComponent: AirlineOrderSummaryComponent;
  @ViewChild(AirlinePassengerFormComponent) airlinePassengerFormComponent : AirlinePassengerFormComponent;
  @ViewChild(AirlinePaymentFormComponent) airlinePaymentFormComponent : AirlinePaymentFormComponent;
  @ViewChild(AirlineContactFormComponent) airlineContactFormComponent: AirlineContactFormComponent;

  public offerViewModel: AirlineOfferViewModel;
  public flightFaresInfo: AirlineFlightRuleViewModel[];


  public isSubmitted = false;
  public maxDate = new Date();

  constructor(
      private router: Router,
      private localStorage: LocalStorage,
      private _snackBar: MatSnackBar,
      private orderService: AirlineOrderService,
      private flightService: AirlineFlightService,
      private paymentService: AirlinePaymentService,
      loginService: LoginService,
  ) {
    super(loginService);
    document.body.style.backgroundSize = "100% 165px";

  }

  ngOnInit() {
    let offerViewModelTxt = this.localStorage.getItem(this.localStorage.keys.airline.offerViewModel);
    if(!offerViewModelTxt){
      this.router.navigateByUrl('/Airlines/Search');
      return;
    }

    this.offerViewModel = JSON.parse(offerViewModelTxt);
    const [fareDetail] = this.offerViewModel.offerItems?.[0]?.fareDetail || [];
    this.flightFaresInfo = this.flightService.getPriceRules(fareDetail?.fareComponent);
  }

  cancel() {
    this.router.navigateByUrl('/Airlines/Search');
  }

  bookFlight(){
    this.isSubmitted = true;
    if(this.airlinePassengerFormComponent.passengersFormGroup.valid && this.airlineContactFormComponent.contactFG.valid && this.airlinePaymentFormComponent.isPaymentFormValid()) {
      let payments = this.airlinePaymentFormComponent.paymentType === AirlinePaymentService.paymentTypeCreditCard ? this.paymentService.preparePaymentRequestBody(this.airlinePaymentFormComponent.creditCardFG.value) : null;
      let passengers = this.airlinePassengerFormComponent.getPassengers();
      let contacts = this.airlineContactFormComponent.getContacts();
      this.orderService.bookFlight(this.offerViewModel, passengers, contacts, payments).subscribe((data: AirlineOrderStatus) => {
          let orderViewModel = this.orderService.getOrderViewModel(data);
          this.router.navigateByUrl('/Airlines/Orders/'+ data.response.order[0].orderID, {state: {orderViewModel: orderViewModel}});
      });
    } else {
      this.airlineContactFormComponent.markAllAsTouched();
      this.airlinePassengerFormComponent.markAllAsTouched();
      this.airlinePaymentFormComponent.markAllAsTouched();
    }
  }
}
