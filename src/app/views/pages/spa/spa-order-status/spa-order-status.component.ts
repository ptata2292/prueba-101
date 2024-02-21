import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../../auth/login/login.service';
import { Spa } from '../spa';
import { LocalStorage } from '../../../../shared/storage/local-storage';
import { SpaOrderService } from '../spa-order.service';

@Component({
  selector: 'app-spa-order-status',
  templateUrl: './spa-order-status.component.html',
  styleUrls: ['./spa-order-status.component.css']
})
export class SpaOrderStatusComponent extends Spa implements OnInit {

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

  constructor(private router: Router, loginService: LoginService, private localStorage: LocalStorage,
    private spaOrderService: SpaOrderService, private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute) { 
    super(loginService);
    document.body.style.backgroundSize = "100% 165px";
    this.activatedRoute.params.subscribe(params => {
      this.orderId = params.id;
      //this.ngOnInit();
    });
  }

  ngOnInit(): void {
    if(this.orderId != null){
      this.spaOrderService.gerOrderById(this.orderId).subscribe((data: any) => {
        // console.log('gerOrderByName');
        // console.log(data);
        this.isLoading = false;      
        this.order = this.getOrderData(data, this.order);
      });
    }
  }  
}
