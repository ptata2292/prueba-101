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
import { AirlineRetrieveService } from '../../services/airline-retrieve.service';
import { AirlineOrderViewModel } from '../../viewmodels/airline-order';
import { AirlineOrderStatus } from '../../models/order/airline-order-status';
import { AirlineChangeOrderService } from '../../services/airline-change-order.service';
import { AirlinePassengerFormComponent } from '../../partials/airline-passenger-form/airline-passenger-form.component';
import { AirlineLoaderService } from '../../services/airline-loader.service';
import { getAirAPI } from 'src/app/shared/tenant/tenant';

@Component({
  selector: 'app-airline-order',
  templateUrl: './airline-order.component.html',
  styleUrls: ['./airline-order.component.scss']
})
export class AirlineOrderComponent extends Airline implements OnInit ,AfterViewInit {

  @ViewChild(AirlinePassengerFormComponent) airlinePassengerFormComponent : AirlinePassengerFormComponent;
  
  public isSubmitted = false;
  public orderId;
  public orderViewModel: AirlineOrderViewModel;

  displayedColumns: string[] = ['Index', 'Name', 'Gender', 'DOB', 'TicketNo'];
  @ViewChild('appDialog') appDialog: DialogComponent;

  constructor(private router: Router, loginService: LoginService, private localStorage: LocalStorage,
    private airlineOrderService: AirlineOrderService,
    private airlineLoaderService: AirlineLoaderService,
    private activatedRoute: ActivatedRoute, private dialogService: DialogService,
    private retrieveService: AirlineRetrieveService,
    private airlineChangeOrderService: AirlineChangeOrderService,
    private cdRef: ChangeDetectorRef) {

    super(loginService);

    document.body.style.backgroundSize = "100% 165px";
    this.activatedRoute.params.subscribe(params => {
      this.orderId = params.id;
    });

    if(this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.orderViewModel){
      this.orderViewModel = this.router.getCurrentNavigation().extras.state.orderViewModel;
    }
    else{
      this.retrieveService.getOrderById(this.orderId).subscribe((data: AirlineOrderStatus) => {
        this.orderViewModel = this.airlineOrderService.getOrderViewModel(data);
        this.orderChanged(data);
      });
    }
  }

  ngOnInit(){
  }

  public ngAfterViewInit(): void {
    this.dialogService.register(this.appDialog, "Cancel order", "Are you sure you want to cancel the current order?", "Yes", "No");
    this.cdRef.detectChanges();
  }

  passengerChanges(data: boolean){
    if(data){
      this.orderViewModel.changedPassengerList = {
        passenger: this.airlinePassengerFormComponent.getPassengers()
      };
      this.airlineChangeOrderService.addChange('ChangePassengerInfo', this.orderId);
    }
    else{
      this.orderViewModel.changedPassengerList = null;
      this.airlineChangeOrderService.clearPassengerChanges(this.orderId);
    }
  }

  getTotalPassengerCount() : number{
    return this.orderViewModel.passengers.length;
  }
  
  orderChanged(data): void{
    this.orderViewModel = this.airlineOrderService.getOrderViewModel(data);
  }

  showDialog() {
    this.dialogService.show()
      .then((res) => {
        console.log('ok clicked');
        this.cancelOrder();
      })
      .catch((err) => {
        console.log('cancel clicked');
      });
  }

  public cancelOrder() {
    this.retrieveService.cancelOrderById(this.orderId).subscribe((data: any) => {
      this.orderViewModel = null;
    });
  }

  cancelChanges(){
    this.orderViewModel.editMode = false;
    this.airlineChangeOrderService.clearChanges(this.orderId, this.orderViewModel);
  }
 
  saveChanges(){
    if(!this.isSaveChangesEnabled()){ 
      return; 
    }
    let result = null;
    this.airlineChangeOrderService.acceptChanges(this.orderId, this.orderViewModel).subscribe(
      (data) => { 
        result = data; 
      }, 
      () => {}, 
      () => {
        this.airlineChangeOrderService.clearChanges(this.orderId, this.orderViewModel);
        this.airlineLoaderService.hideLoader();
        if(result){
          this.orderViewModel = this.airlineOrderService.getOrderViewModel(result);
        }
    });
  }

  editOrder(){
    this.orderViewModel.editMode = true;
  }

  editFlights(){
    this.router.navigateByUrl('/Airlines/Reshop/' + this.orderId, { state: { orderViewModel: this.orderViewModel }});
  }

  isSaveChangesEnabled(): boolean{
    return this.airlineChangeOrderService.anyChanges(this.orderId);
  }

  makePayment() {
    this.router.navigateByUrl('/Airlines/Payment/' + this.orderId, {state: { orderViewModel: this.orderViewModel }});
  }

  navigateToOrderList(){
    this.router.navigateByUrl('/Airlines/Orders');
  }

  navigateToSearch(){
    this.router.navigateByUrl('/Airlines/Search');
  }
}
