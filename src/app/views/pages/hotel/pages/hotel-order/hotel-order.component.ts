import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { LocalStorage } from 'src/app/shared/storage/local-storage';
import { LoginService } from '../../../auth/login/login.service';
import { Hotel } from '../../hotel';
import { HotelOrderService } from '../../services/hotel-order.service';

@Component({
  selector: 'app-hotel-order',
  templateUrl: './hotel-order.component.html',
  styleUrls: ['./hotel-order.component.css']
})
export class HotelOrderComponent extends Hotel implements OnInit, AfterViewInit {

  public isSubmitted = false;
  public isLoading = false;
  public order = {
    flightSegment: [],
    passengerList: [],
    contactList: []
  };
  public orderId;
  public flightSegmentList = [];

  displayedColumns: string[] = ['Index', 'Name', 'Gender', 'DOB'];
  @ViewChild('appDialog') appDialog: DialogComponent;
  
  constructor(private router: Router, loginService: LoginService, private localStorage: LocalStorage,
    private hotelOrderService: HotelOrderService, private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute, private dialogService: DialogService,
    private cdRef: ChangeDetectorRef) { 
    super(loginService);
    document.body.style.backgroundSize = "100% 165px";
    this.activatedRoute.params.subscribe(params => {
      this.orderId = params.id;
      //this.ngOnInit();
    });
  }

  ngOnInit(): void {
    if(this.orderId != null){
      this.isLoading = true;
      this.hotelOrderService.getOrderById(this.orderId).subscribe((data: any) => {
        // console.log('gerOrderByName');
        // console.log(data);
        this.isLoading = false;      
        this.order = this.getOrderData(data, this.order);
      });     
    }
  } 

  public ngAfterViewInit(): void {
    this.dialogService.register(this.appDialog, "Alert", "Do you want to cancel the order?");
    this.cdRef.detectChanges();
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
    this.isLoading = true;  
    this.hotelOrderService.cancelOrderById(this.orderId).subscribe((data: any) => {
      // console.log('gerOrderByName');
      // console.log(data);
      this.isLoading = false;  
      this.order = {
        flightSegment: [],
        passengerList: [],
        contactList: []
      };    
      this.order = this.getOrderData(data, this.order);
    }); 
  }
}
