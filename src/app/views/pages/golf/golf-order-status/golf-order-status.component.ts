import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../../auth/login/login.service';
import { Golf } from '../golf';
import { LocalStorage } from '../../../../shared/storage/local-storage';
import { GolfOrderService } from '../golf-order.service';

@Component({
  selector: 'app-golf-order-status',
  templateUrl: './golf-order-status.component.html',
  styleUrls: ['./golf-order-status.component.css']
})
export class GolfOrderStatusComponent extends Golf implements OnInit {

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
    private golfOrderService: GolfOrderService, private _snackBar: MatSnackBar,
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
      this.golfOrderService.gerOrderById(this.orderId).subscribe((data: any) => {
        // console.log('gerOrderByName');
        // console.log(data);
        this.isLoading = false;      
        this.order = this.getOrderData(data, this.order);
      });
    }
  }  
}
