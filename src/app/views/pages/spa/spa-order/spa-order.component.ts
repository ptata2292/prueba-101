import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../../auth/login/login.service';
import { Spa } from '../spa';
import { LocalStorage } from '../../../../shared/storage/local-storage';
import { SpaOrderService } from '../spa-order.service';
import { DialogComponent } from '../../../../shared/dialog/dialog.component';
import { DialogService } from '../../../../shared/dialog/dialog.service';

@Component({
  selector: 'app-spa-order',
  templateUrl: './spa-order.component.html',
  styleUrls: ['./spa-order.component.css']
})
export class SpaOrderComponent extends Spa implements OnInit, AfterViewInit {

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
    private spaOrderService: SpaOrderService, private _snackBar: MatSnackBar,
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
      this.spaOrderService.gerOrderById(this.orderId).subscribe((data: any) => {
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
    this.spaOrderService.cancelOrderById(this.orderId).subscribe((data: any) => {
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
