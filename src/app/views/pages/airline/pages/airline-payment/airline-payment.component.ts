import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../../../auth/login/login.service';
import { Airline } from '../../airline';
import { LocalStorage } from '../../../../../shared/storage/local-storage';
import { AirlineOrderService } from '../../services/airline-order.service';
import { DialogComponent } from '../../../../../shared/dialog/dialog.component';
import { DialogService } from '../../../../../shared/dialog/dialog.service';
import { environment } from '../../../../../../environments/environment';
import { AirlineRetrieveService } from '../../services/airline-retrieve.service';
import { AirlineOrderViewModel } from '../../viewmodels/airline-order';
import { AirlineOrderStatus } from '../../models/order/airline-order-status';
import { AirlinePaymentService } from '../../services/airline-payment.service';
import { AirlinePaymentFormComponent } from '../../partials/airline-payment-form/airline-payment-form.component';

@Component({
  selector: 'app-airline-payment',
  templateUrl: './airline-payment.component.html',
  styleUrls: ['./airline-payment.component.css']
})
export class AirlinePaymentComponent extends Airline {

  @ViewChild(AirlinePaymentFormComponent) airlinePaymentFormComponent : AirlinePaymentFormComponent;

  public errors: any;
  public isSubmitted = false;
  public order = {
    flightSegment: [],
    passengerList: [],
    contactList: []
  };
  public orderId;

  orderViewModel: AirlineOrderViewModel;
  
  constructor(private router: Router, loginService: LoginService,
    private airlineOrderService: AirlineOrderService, private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private airlineRetrieveService: AirlineRetrieveService,
    private airlinePaymentService: AirlinePaymentService) { 
    super(loginService);
    document.body.style.backgroundSize = "100% 165px";
    this.activatedRoute.params.subscribe(params => {
      this.orderId = params.id;
    });

    if(this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.orderViewModel){
      this.orderViewModel = this.router.getCurrentNavigation().extras.state.orderViewModel;
    }
    else{
      this.airlineRetrieveService.getOrderById(this.orderId).subscribe((data: AirlineOrderStatus) => {
        this.orderViewModel = this.airlineOrderService.getOrderViewModel(data);
      });
    }
  }

  backToOrderDetails(){
    this.router.navigateByUrl('/Airlines/Orders/' + this.orderId, { state: { orderViewModel: this.orderViewModel }});
  }

  pay() {
    this.isSubmitted = true;
    
    if(this.airlinePaymentFormComponent.isPaymentFormValid()) {
      this.airlinePaymentService.pay(this.airlinePaymentFormComponent.creditCardFG.value, this.orderId).subscribe((data: AirlineOrderStatus) => {
        
          let orderViewModel = this.airlineOrderService.getOrderViewModel(data);
          this.router.navigateByUrl('/Airlines/Orders/' + this.orderId, { state: { orderViewModel: orderViewModel }});
      });
    } else {
      this.airlinePaymentFormComponent.markAllAsTouched();
    }
  }
}
